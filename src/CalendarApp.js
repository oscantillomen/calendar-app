import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { AppRouter } from './components/router/AppRouter';

export const CalendarApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
