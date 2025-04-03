import './style.css';
import api from '../services/api';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ListPeople() {
    const [people, setPeople] = useState([]);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    async function findPeople() {
        try {
            const response = await api.get("/users");
            setPeople(response.data);
        } catch (error) {
            console.error("Error when searching for people:", error);
        }
    }

    async function deletePerson(id) {
        try {
            const response = await api.delete(`/users/${id}`);
        } catch (error) {
            console.error("Error when deleting person:", error);
        } finally {
            findPeople();
            setOpenDialog(false);
        }
    }

    const handleOpenDialog = (person) => {
        setSelectedPerson(person);
        setOpenDialog(true);
      };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
 
    useEffect(() => {
        findPeople();
    }, []);

    return (
        <>
            <div>
                <h1 className="title-list">Lista de usuários</h1>
                {people.length <= 0 ? 
                    <div className='empty-list'>Não há dados para exibir</div> :
                    <div>
                        <div className='scroll-tabela'>
                            <table className="table-container">
                                <thead className="top-table">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Deletar usuário</th>
                                    </tr>
                                </thead>
                                <tbody className="body-table">
                                    {people.map((person) => (
                                        <tr key={person.id} className="line-table">
                                            <td>{person.id}</td>
                                            <td>{person.nome}</td>
                                            <td>{person.email}</td>
                                            <td><button onClick={() => handleOpenDialog(person)}>
                                                <DeleteIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                }
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmar ação</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* Texto do conteúdo do dialog */}
                        Tem certeza que deseja DELETAR o usuário abaixo? <br /> 
                        ID: {selectedPerson?.id} <br />
                        Nome: {selectedPerson?.nome} <br />
                        Idade: {selectedPerson?.email} <br />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className="cancel-button" onClick={handleCloseDialog}>
                        Cancelar
                    </button>
                    <button className="confirm-button" onClick={() => deletePerson(Number(selectedPerson?.id))}>
                        Confirmar
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ListPeople;