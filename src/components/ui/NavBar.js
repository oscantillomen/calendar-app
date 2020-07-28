import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../redux/actions/auth';

export const NavBar = () => {
    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout())
    }
    
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                { name }
            </span>

            <button 
                onClick={handleLogout}
                className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
        </div>
    )
}
