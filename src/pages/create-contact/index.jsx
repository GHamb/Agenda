import React from 'react';
import {useState} from 'react'
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import api from '../../service/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CreateContact() {


    const schema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        phone: yup.string().required(),
        cep: yup.string().required(),
        logradouro: yup.string().required(),
        city: yup.string().required(),



    })

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });
    const [dataCep, setDataCep] = useState({})
    const [cep, setCep] = useState()

    function goToPage(params) {
        navigate(params)
    }


    function createContact(contact) {
        const dto = {
            "firstName": contact.firstName,
            "lastName": contact.lastName,
            "phone": contact.phone,
            "address":{
                "cep": contact.cep,
                "logradouro": contact.logradouro,
                "localidade": contact.city
            }
            
        }
        api.post('/contatos', dto).then(function (response) {
            toast.success("Contato Criado !",{
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
        createContact(data)

    }

    const catchCep = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
            setDataCep(data)
            setValue('logradouro', data.logradouro);
            setValue('city', data.localidade);
            
          });
    }

    

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center p-5">

                <div className="card" style={{ width: "50rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Cadastrar Contato</h5>
                        <div className="row">
                            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                <div className="col-md-6">
                                    <label className="form-label">Nome:</label>
                                    <input type="text" className="form-control" id="FirstName" {...register('firstName', { required: true })} />
                                    <>{errors.firstName && errors.firstName?.message}</>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Sobrenome:</label>
                                    <input type="text" className="form-control" id="LastName" {...register('lastName', { required: true })} />
                                    <>{errors.lastName && errors.lastName?.message}</>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Telefone</label>
                                    <input type="text" className="form-control" id="phone" {...register('phone', { required: true })} />
                                    <>{errors.phone && errors.phone?.message}</>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">CEP</label>
                                    <input type="text" className="form-control" id="cep" {...register('cep', { required: true })} onBlur={catchCep}/>
                                    <>{errors.cep && errors.cep?.message}</>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Logradouro</label>
                                    <input type="text" className="form-control" id="logradouro" {...register('logradouro', { required: true })} />
                                    <>{errors.logradouro && errors.logradouro?.message}</>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Cidade</label>
                                    <input type="text" className="form-control" id="city" {...register('city', { required: true })}/>
                                    <>{errors.city && errors.city?.message}</>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                                    <button type="button" className="btn btn-primary ms-2" onClick={(e) => goToPage('/')}>Voltar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer position="bottom-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss/>
                </div>
           
            
        </>
    )
}