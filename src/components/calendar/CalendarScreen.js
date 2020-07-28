import React, { useState, useEffect } from 'react';
import { NavBar } from '../ui/NavBar';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui';
import { setActive, eventClearActiveEvent, eventStartLoading } from '../../redux/actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector(state => state.calendar);
	const { uid } = useSelector(state => state.auth);

	const [ lastView, setlastView ] = useState(localStorage.getItem('lastView') || 'month');

	const onDoubleClick = () => {
		dispatch(uiOpenModal());
	};

	const onSelectEvent = (note) => {
		dispatch(setActive(note));
	};

	const onViewChange = (e) => {
		setlastView(e);
		localStorage.setItem('lastView', e);
	};

	const onSelectSlot = (e) => {
		dispatch(eventClearActiveEvent());
	}

	const eventStyleGetter = (event, start, end, isSelected) => {



		const style = {
			backgoundColor: (uid === event.user._id) ? '#366CF7' : '#465660',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block'
		};

		return {
			style
		};
	};

	useEffect(() => {
		dispatch(eventStartLoading());
	}, [dispatch])

	return (
		<div className="calendar-screen">
			<NavBar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
				eventPropGetter={eventStyleGetter}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
				view={lastView}
				onSelectSlot={ onSelectSlot }
				selectable={true}
				components={{
					event: CalendarEvent
				}}
			/>
			{ 
				activeEvent && <DeleteEventFab /> 
			}
            <AddNewFab />
			<CalendarModal />
		</div>
	);
};
