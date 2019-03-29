import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createEpicMiddleware, ofType, } from 'redux-observable';
import { delay, map } from 'rxjs/operators'
import uuid from 'uuidv4';
import './index.css';
import App from './App';

const createItems = (numberToCreate, { startIndex, endIndex }) => {
    const newItems = Array.from({ length: numberToCreate }, (v, k) => {
        const newId = uuid().toString() + startIndex.toString();
        return {
            id: newId,
            title: `title-${newId}`
        }
    });

    return newItems;
}

//create arbitary sized array
export const totalItems = 6000; //you can set this to a larger number
const initialState = new Array(totalItems).fill(null);

const items = (state = initialState, action) => {
    switch (action.type) {
        case 'MORE_LOADED':
            console.log(action.payload)
            if (action.payload.startIndex > 0) {
                return [
                    ...state.slice(0, action.payload.startIndex),
                    ...action.payload.items,
                    ...state.slice(action.payload.endIndex, totalItems)
                ]
            }
            else {
                return [
                    ...action.payload.items,
                    ...state.slice(action.payload.endIndex+1, totalItems)
                ]
            }
        default:
            return state
    }
}

//if needed, don't load more until previous fetch request completed
/*
const isFetching = (state = false, action) => {
    switch (action.type) {
        case 'LOAD_MORE':
            return true;
        case 'MORE_LOADED':
            return false;
        default:
            return state
    }
}*/

const rootEpic = action$ => action$.pipe(
    ofType('LOAD_MORE'),
    delay(Math.floor(Math.random() * 301 + 200)), // Asynchronously wait then continue
    //use switchmap/mergemap - in real world scenario, could use observable.ajax that is cancelable
    map(action => {
        const { startIndex, endIndex } = action.payload;
        let numItemsToCreate = endIndex - startIndex;

        if (startIndex === 0)
            numItemsToCreate = numItemsToCreate + 1;

        console.log("creating", numItemsToCreate, startIndex, endIndex);
        return ({
            type: 'MORE_LOADED',
            payload: {
                items: createItems(numItemsToCreate, action.payload),
                startIndex,
                endIndex,
                totalItems: totalItems
            }
        })
    })
);

//to use with Chrome redux dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    combineReducers({ items }),
    {}, //initial state
    composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

ReactDOM.render(<Provider store={store}><App /></Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
