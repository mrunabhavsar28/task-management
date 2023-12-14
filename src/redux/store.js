import { createStore } from 'redux';
import reducer from './reducer';
import { loadState } from '../localStorage';



const persistedState = loadState();

const store = createStore(reducer, persistedState);

export default store;
