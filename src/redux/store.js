import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';

function configureStore(){
    return createStore(reducer, {}, applyMiddleware(thunk, logger));
}
const store = configureStore();
export default store;