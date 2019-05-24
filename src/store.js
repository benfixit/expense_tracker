import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('Next State', store.getState());
    return result;
}

const saver = store => next => action => {
    let result = next(action);
    localStorage['redux-store'] = JSON.stringify(store.getState());
    return result;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers, 
    localStorage['redux-store'] ? JSON.parse(localStorage['redux-store']) : [],
    composeEnhancers(
        applyMiddleware(logger, saver)
    )
);

export default store;
