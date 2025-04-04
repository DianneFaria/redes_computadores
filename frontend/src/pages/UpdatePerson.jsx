import './style.css';
import React, { useState } from "react";
import api from '../services/api';

function UpdatePerson() {
    const [updatePerson, setUpdatePerson] = useState({
        id: "",
        nome: "",
        email: "",
    });
   
    const [error, setError] = useState(""); 
   
    const [successMessage, setSuccessMessage] = useState("");

    const registerPerson = async () => {
        setError("");
        setSuccessMessage("");

        try {
           
            const response = await api.put(`/users/${updatePerson.id}`, {
                nome: updatePerson.nome,
                email: updatePerson.email,
            });
            
            setSuccessMessage("Person successfully updated!");
        } catch (error) {
           
            console.error("Error when updating person:", error);
            setError("Error when updating person. Please, try again.");
        }
    };

    return (
        <div className="card-container">
            <h2 className="title">Atualizar usuário</h2>

            <div className="label-container">
                <input 
                    value={updatePerson.id} 
                    onChange={(e) => setUpdatePerson({ ...updatePerson, id: e.target.value })} 
                    placeholder="ID" />
            </div>
    
            <div className="label-container">
                <input 
                    value={updatePerson.nome} 
                    onChange={(e) => setUpdatePerson({ ...updatePerson, nome: e.target.value })} 
                    placeholder="Nome" />
            </div>
            
            <div className="label-container">
                <input 
                    value={updatePerson.email} 
                    onChange={(e) => setUpdatePerson({ ...updatePerson, email: e.target.value })} 
                    placeholder="Email" />
            </div>
          
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          
            <div className='button-register'>
                <button className='button' onClick={registerPerson}>Atualizar</button>
            </div>
        </div>
    );
}

export default UpdatePerson;