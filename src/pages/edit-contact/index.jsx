import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import api from '../../service/api';

//use-hook-form
import { useForm } from "react-hook-form";

//yup validator
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function EditContact() {

    const schema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        phone: yup.string().required(),
        cep: yup.string().required(),
        logradouro: yup.string().required(),
        localidade: yup.string().required(),



    })

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const [firstName, setFirstName] = useState("");

    const [contact, setContact] = useState({

    });
    let { id } = useParams();

    function goToPage(params) {

        navigate(params)
    }

    function getContactById(id) {
        api.get(`contatos/${id}`).then((res) => {

            setContact(res.data)

            setValue('firstName', res.data.firstName)
            setValue('lastName', res.data.lastName)
            setValue('cep', res.data.address.cep)
            setValue('logradouro', res.data.address.logradouro)
            setValue('phone', res.data.phone)
            setValue('localidade', res.data.address.localidade)
        })
    }

    function updateContact(params) {

        const dto = {
            "firstName": params.firstName,
            "lastName": params.lastName,
            "phone": params.phone,
            "address":{
                "cep": params.cep,
                "logradouro": params.logradouro,
                "localidade": params.localidade
            }

        }

        api.put(`contatos/${id}`, dto).then(function (response) {
                toast.success("Contato Alterado !",{
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,})
            setTimeout(() => {
                goToPage('/')
            }, 2900);
            
        }).catch(function (error) {
            console.log(error);
        });
    }


    function onSubmit(data) {
        updateContact(data)
    }

    function deletar() {
        api.delete(`contatos/${id}`).then(function (response) {
            toast.success("Contato Deletado !",{
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,})
            setTimeout(() => {
                goToPage('/')
            }, 2900);
        }).catch(function (error) {
            console.log(error);
        });
    }


    useEffect(() => {
        getContactById(id);
    }, []);

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center p-5">

                <div className="card" style={{ width: "50rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Editar Contato</h5>
                        <div className="row">
                            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                <div className="col-md-6">
                                    <label className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="FirstName"
                                        {...register('firstName', {
                                            onChange: (e) => setContact({ ...contact, firstName: e.target.value }),
                                        })}
                                    />
                                    <>{errors.firstName && errors.firstName?.message}</>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Sobrenome</label>
                                    <input type="text" className="form-control" id="LastName"
                                        {...register('lastName', {
                                            onChange: (e) => setContact({ ...contact, lastName: e.target.value })
                                        })} />
                                    <>{errors.lastName && errors.lastName?.message}</>
                                    
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Telefone</label>
                                    <input type="text" className="form-control" id="phone"
                                        {...register('phone', {
                                            onChange: (e) => setContact({ ...contact, phone: e.target.value }),
                                        })} />
                                    <>{errors.phone && errors.phone?.message}</>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">CEP</label>
                                    <input type="text" className="form-control" id="cep"
                                        {...register('cep', {
                                            onChange: (e) => setContact({ ...contact, address: { ...contact.address, cep: e.target.value } }),
                                        })} />
                                    <>{errors.cep && errors.cep?.message}</>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Logradouro</label>
                                    <input type="text" className="form-control" id="logradouro"
                                        {...register('logradouro', {
                                            onChange: (e) => setContact({ ...contact, address: { ...contact.address, logradouro: e.target.value } })
                                        })} />
                                    <>{errors.logradouro && errors.logradouro?.message}</>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Cidade</label>
                                    <input type="text" className="form-control" id="localidade"
                                        {...register('localidade', {
                                            onChange: (e) => setContact({ ...contact, address: { ...contact.address, localidade: e.target.value } }),
                                        })} />
                                    <>{errors.localidade && errors.localidade?.message}</>
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary">Editar</button>
                                    <button type="button" className="btn btn-danger ms-2" onClick={(e) => deletar()}>Deletar</button>
                                    <button type="button" className="btn btn-primary ms-2" onClick={(e) => goToPage('/')}>Voltar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}