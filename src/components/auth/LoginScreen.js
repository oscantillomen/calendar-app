import React from 'react';
import './login.css';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';


export const LoginScreen = () => {
    const dispatch = useDispatch()

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: 'oscantillomen@gmail.com',
        lPassword: '123456'
    });
    
    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: 'Eduardo',
        rEmail: 'oscantillomen@misena.edu.co',
        rPassword: '123456',
        rConfirm: '123456'
    });

    const { lEmail, lPassword } = formLoginValues;
    const { rEmail, rPassword, rConfirm, rName } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(rPassword !== rConfirm) {
            return Swal.fire('Error', 'Las contraseñas deben coincidir', 'error');
        } 

        dispatch(startRegister(rEmail, rPassword, rName));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                onChange={handleLoginInputChange}
                                value={lEmail}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                onChange={handleLoginInputChange}
                                value={lPassword}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                onChange={handleRegisterInputChange}
                                value={rName}
                                name="rName"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                onChange={handleRegisterInputChange}
                                value={rEmail}
                                name="rEmail"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                onChange={handleRegisterInputChange}
                                value={rPassword}
                                name="rPassword"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                onChange={handleRegisterInputChange}
                                value={rConfirm}
                                name="rConfirm"
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}