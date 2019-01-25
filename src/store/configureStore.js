import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import placesReducer from "./reducers/places";
import symptomsReducer from "./reducers/symptoms";
import experimentsReducer from "./reducers/experiments";
import uiReducer from "./reducers/ui";
import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
    places: placesReducer,
    ui: uiReducer,
    auth: authReducer,
    symptoms: symptomsReducer,
    experiments: experimentsReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;