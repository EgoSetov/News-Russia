import { combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import profileReducer from './profileReducer'
import newsReducer from "./newsReducer";


const reducers = combineReducers({
	profile: profileReducer,
	news: newsReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

// window.store = store
export default store;
