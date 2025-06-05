# VPN

### PASSO 1 – Instalação do OpenVPN e Easy-RSA no Servidor

```
sudo apt update
sudo apt-cache search openvpn
sudo apt install openvpn easy-rsa -y
```

### PASSO 2 – Criar infraestrutura da Autoridade Certificadora (CA)

```
mkdir vpn
cd vpn
mkdir easy-rsa
```

### Precisa pegar o easy-rsa baixado e passar para a pasta easy-rsa criada

```
cp -r /usr/share/easy-rsa/* ~/aplicacao/vpn/easy-rsa
```

```
cd easy-rsa
sudo ./easyrsa init-pki
```

```
./easyrsa build-ca
```

Defina um nome comum (CN), por exemplo: `vpn-ca`

### PASSO 3 – Gerar Certificados e Chaves

#### Servidor:

```
./easyrsa gen-req servidor nopass
./easyrsa sign-req server servidor
```

#### Cliente:

```
./easyrsa gen-req cliente1 nopass
./easyrsa sign-req client cliente1
```

#### Outras chaves utilizando diffie-hellman:

```
./easyrsa gen-dh
```

#### Essa chave ajuda a proteger contra ataques DoS e de escaneamento de porta

```
openvpn --genkey secret ta.key
```

### PASSO 4 – Copiar Certificados para OpenVPN

```
sudo cp pki/ca.crt pki/issued/servidor.crt pki/issued/cliente1.crt pki/private/servidor.key pki/private/cliente1.key dh.pem ta.key /etc/openvpn/server/
```

### PASSO 5 – Liberar permissão

```
sudo chown root:root /etc/openvpn/server/{ca.crt,servidor.crt,servidor.key,
dh.pem,ta.key}
sudo chmod 600 /etc/openvpn/server/servidor.key
sudo chmod 644 /etc/openvpn/server/{ca.crt,servidor.crt,dh.pem}
sudo chmod 600 /etc/openvpn/server/ta.key
```

### PASSO 6 – Criar Configuração do Servidor VPN

Crie /etc/openvpn/server/server.conf:

```
port 1194
proto udp
dev tun
tls-server

ca ca.crt
cert server.crt
key server.key
dh dh.pem
tls-auth ta.key 0

server 10.8.0.0 255.255.255.0

# Rota interna para o docker-compose
push "route 172.18.0.0 255.255.0.0"  # ou veja com `docker network inspect`

# DNS
push "dhcp-option DNS 8.8.8.8"
push "redirect-gateway def1"

keepalive 10 120
cipher AES-256-CBC
persist-key
persist-tun
status openvpn-status.log
verb 3
explicit-exit-notify 1
```

#### Entre no arquivo de sysctl

```
sudo vim /etc/sysctl.conf
```

#### Adicione ou modifique a seguinte variavel

```
net.ipv4.ip_forward = 1
```

#### Depois de modificar rode o comando

```
sudo sysctl -p
```

#### Descubra o seu tipo no item 2 : exemplo (enX0)

```
ip link show
```

#### Agora modifique a regras do iptablesm, substitua enX0 pela interface correta.

```
sudo iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o enX0 -j MASQUERADE
```

#### Para tornar as configurações permanentes instale iptables-persistent

```
sudo apt install iptables-persistent
```

#### e use o seguinte comando

```
sudo netfilter-persistent save
```

### PASSO 7 – Iniciar e Habilitar o Servidor

```
sudo systemctl enable openvpn-server@vpn
sudo systemctl start openvpn-server@vpn
```

#### Verifique se está rodando com:

```
sudo systemctl status openvpn-server@vpn
```

### PASSO 8 – Criar Arquivo do Cliente (client.ovpn)

```
client
dev tun
proto udp
remote <ip-da-instancia> 5000
ifconfig 10.0.0.2 10.0.0.1
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
auth SHA256
cipher AES-256-CBC
verb 3
<ca>
ca.crt
</ca>
<cert>
cliente1.crt
</cert>
<key>
cliente1.key
</key>
<tls-auth>
ta.key
</tls-auth>
key-direction 1
```

### Passo 9 - Baixe o OpenVPN
Coloque as chaves na pasta config do openvpn



