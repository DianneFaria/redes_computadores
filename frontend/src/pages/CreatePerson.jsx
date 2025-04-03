import './style.css';
import React, { useState } from "react";
import api from '../services/api';

function CreatePerson() {
    const [newPerson, setNewPerson] = useState({
        nome: "",
        email: "",
    });
   
    const [error, setError] = useState(""); 
   
    const [successMessage, setSuccessMessage] = useState("");

    const registerPerson = async () => {
       
        setError("");
        setSuccessMessage("");

        try {
           
            const response = await api.post("/users", {
                nome: newPerson.nome,
                email: newPerson.email,
            });
            
            setSuccessMessage("Person successfully registered!");
        } catch (error) {
           
            console.error("Error when registering person:", error);
            setError("Error when registering person. Please, try again.");
        }
    };

    return (
        <div className="card-container">
            <h2 className="title">Cadastro de usuário</h2>
    
            <div className="label-container">
                <input 
                    value={newPerson.nome} 
                    onChange={(e) => setNewPerson({ ...newPerson, nome: e.target.value })} 
                    placeholder="Nome" />
            </div>
            
            <div className="label-container">
                <input 
                    value={newPerson.email} 
                    onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })} 
                    placeholder="Email" />
            </div>
          
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          
            <div className='button-register'>
                <button className='button' onClick={registerPerson}>Cadastrar</button>
            </div>
        </div>
    );
}

export default CreatePerson;