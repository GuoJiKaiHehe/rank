import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {logger} from 'redux-logger';
import rootReducer from '../reducers/index';
var middlewares=[];
middlewares.push(thunkMiddleware);
if(__DEV__){
	middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	return store;
}
