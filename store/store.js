import { combineReducers, createStore } from "redux";
import profileReducer from './profileReducer'
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

const reducers = combineReducers({
	profile: profileReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

// window.store = store
export default store;
