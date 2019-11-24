import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storeFactory from './store'
import { Provider } from 'react-redux'
import { render } from 'react-dom';
import Routes from './routes';
import initialJSON from './initialState.json';


const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    initialJSON

const saveState = () => 
    localStorage["redux-store"] = JSON.stringify(store.getState())


const store = storeFactory(initialState)
store.subscribe(saveState);
window.store = store

render(
	<Provider store={store}>
	   <Routes/>
	</Provider>,
  document.getElementById('root')
)


