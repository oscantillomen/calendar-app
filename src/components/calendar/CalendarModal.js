import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from './../../redux/actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../redux/actions/events';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
	title: '',
	notes: '',
	start: now.toDate(),
	end: nowPlus1
};

export const CalendarModal = () => {
	const [ dateStart, setdateStart ] = useState(now.toDate());
	const [ dateEnd, setdateEnd ] = useState(nowPlus1.toDate());
	const [ titleValid, settitleValid ] = useState(true);

	const dispatch = useDispatch();
	const { modalOpen } = useSelector((state) => state.ui);
	const { activeEvent } = useSelector((state) => state.calendar);

	const [ formValues, setformValues ] = useState(initEvent);

	const { notes, title, start, end } = formValues;

	useEffect(
		() => {
			if (activeEvent) {
				setformValues(activeEvent);
			} else {
				setformValues(initEvent);
			}
		},
		[ activeEvent, setformValues ]
	);

	const closeModal = () => {
		dispatch(uiCloseModal());
		dispatch(eventClearActiveEvent());
		setformValues(initEvent);
	};

	const handleStartDateChange = (date) => {
		setdateStart(date);
		setformValues({
			...formValues,
			start: date
		});
	};
	const handleEndDateChange = (date) => {
		setdateEnd(date);
		setformValues({
			...formValues,
			end: date
		});
	};

	const handleInputChange = ({ target }) => {
		setformValues({
			...formValues,
			[target.name]: target.value
		});
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();
		const momentStart = moment(start);
		const momentEnd = moment(end);

		if (momentStart.isSameOrAfter(momentEnd)) {
			return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
		}

		if (title.trim().length < 2) {
			return settitleValid(false);
		}

		if (activeEvent) {
			dispatch(eventStartUpdate(formValues));
		} else {
			dispatch(eventStartAddNew(formValues));
		}

		settitleValid(true);
		closeModal();
	};

	return (
		<Modal
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
			isOpen={modalOpen}
			//   onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<h1>{activeEvent ? 'Editar evento' : 'Nuevo evento'} </h1>
			<hr />
			<form className="container" onSubmit={handleSubmitForm}>
				<div className="form-group">
					<label>Fecha y hora inicio</label>
					<DateTimePicker onChange={handleStartDateChange} value={dateStart} className="form-control" />
				</div>

				<div className="form-group">
					<label>Fecha y hora fin</label>
					<DateTimePicker
						onChange={handleEndDateChange}
						value={dateEnd}
						className="form-control"
						minDate={dateStart}
					/>
				</div>

				<hr />
				<div className="form-group">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={`form-control ${!titleValid && 'is-invalid'}`}
						placeholder="Título del evento"
						value={title}
						onChange={handleInputChange}
						name="title"
						autoComplete="off"
					/>
					<small id="emailHelp" className="form-text text-muted">
						Una descripción corta
					</small>
				</div>

				<div className="form-group">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						value={notes}
						onChange={handleInputChange}
					/>
					<small id="emailHelp" className="form-text text-muted">
						Información adicional
					</small>
				</div>

				<button type="submit" className="btn btn-outline-primary btn-block">
					<i className="far fa-save" />
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};
