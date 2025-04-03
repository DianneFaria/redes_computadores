import { Request, response, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import User from '../models/User';
import { request } from 'http';

class UserController {

    async create(request: Request, response: Response) {

        const userRepository = AppDataSource.getRepository(User);
        
        console.log('Request received:', request.body);
        const { nome, email } = request.body;

        const existUser = await userRepository.findOneBy({email});

        if(existUser) {
            return response.status(400).json({message: 'Usuário já existente!'})
        }

        const user = userRepository.create({
            nome,
            email,
        });

        await userRepository.save(user);

        return response.status(201).json(user);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { nome, email } = request.body;
    
        const userRepository = AppDataSource.getRepository(User);
    
        try {
            const user = await userRepository.findOneBy({ id: Number(id) });
    
            if (!user) {
                return response.status(404).json({ message: 'Usuário não encontrado' });
            }
    
            user.nome = nome;
            user.email = email;
    
            await userRepository.save(user);
    
            return response.status(200).json(user);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao atualizar usuário.' });
        }
    }

    async list(request: Request, response: Response) {
        const userRepository = AppDataSource.getRepository(User);
    
        try {
            const users = await userRepository.find();
            return response.status(200).json(users);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao buscar usuários.' });
        }
    }
    
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const userRepository = AppDataSource.getRepository(User);
    
        try {
            const user = await userRepository.findOneBy({ id: Number(id) });
    
            if (!user) {
                return response.status(404).json({ message: 'Usuário não encontrado' });
            }
    
            await userRepository.remove(user);
            return response.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao deletar usuário.' });
        }
    }
}
export default new UserController();
