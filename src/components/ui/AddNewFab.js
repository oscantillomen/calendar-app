import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../redux/actions/ui';

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(uiOpenModal());
    }

    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="btn btn-primary fab"
            >
                <i className="fas fa-plus"></i>
            </button>
        </div>
    )
}
