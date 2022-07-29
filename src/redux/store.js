import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import application from './models/Application/reducer';
import admin from './models/Admin/reducer'
import wallet from './models/Wallet/reducer'

const rootReducers = combineReducers(
    {
        application,
        admin,
        wallet
    });

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)) );
console.log("store created")
export default store;


