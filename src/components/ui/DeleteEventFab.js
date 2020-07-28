import React from 'react';
import { useDispatch } from 'react-redux';
import { eventstartDelete } from '../../redux/actions/events';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(eventstartDelete());
    }

    return (
        <button
            onClick={ handleDelete }
            className='btn btn-danger fab-danger'
        >
            <i className="fas fa-trash"></i>
            <span> Borrar Evento</span>
        </button>
    )
}
