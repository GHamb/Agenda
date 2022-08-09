import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../../service/api';






export default function ListContact() {

    const navigate = useNavigate();
    const [contacts, setContact] = useState([]);
    const [search, setSearch] = useState("");


    function goToPage(params) {
        navigate(params)
    }

    async function getAllContact() {
        let { data } = await api.get('contatos')
        setContact(data);
    }

    function searchContact(params) {
        if (params == "") {
            getAllContact();
        } else {
            var search = contacts.filter((contact) =>
                contact.firstName.toLowerCase().includes(params.toLowerCase()) ||
                contact.lastName.toLowerCase().includes(params.toLowerCase()) ||
                contact.phone.includes(params)
            );
            setContact(search);
        }

    }


    useEffect(() => {
        getAllContact();
    }, [])

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center p-5">

                <div className="card" style={{ width: "50rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Lista de Contatos</h5>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label className="form-label">Buscar</label>
                                    <input type="text" className="form-control"
                                        placeholder="Digite o nome do contato"
                                        onChange={(e) => searchContact(e.target.value)}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="list-group">
                                    {contacts.map((contact, key) => {
                                        return (
                                            <Link key={key} to={`/contact/${contact.id}/edit`} className="list-group-item list-group-item-action d-flex gap-3 py-3"
                                                aria-current="true">
                                                <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32"
                                                    className="rounded-circle flex-shrink-0" />
                                                <div className="d-flex gap-2 w-100 justify-content-between">
                                                    <div>
                                                        <h6 className="mb-0">{contact.firstName} {contact.lastName}</h6>
                                                        <p className="mb-0 opacity-75">{contact.phone}</p>
                                                    </div>
                                                    <small className="opacity-50 text-nowrap">now</small>
                                                </div>
                                            </Link>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: '10px' }}>
                            <div className="col-md-12">
                                <button type="button" className="btn btn-primary" onClick={(e) => goToPage('create')}>Adicionar Novo</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </>
    )
}