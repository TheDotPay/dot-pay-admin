import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import application from './models/Application/reducer';

const rootReducers = combineReducers(
    {
        application,
    });

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)) );
console.log("store created")
export default store;


