import { SET_EXPERIMENTS, REMOVE_EXPERIMENT, EXPERIMENT_ADDED, START_ADD_EXPERIMENT } from '../actions/actionsType';

const initialState = {
    experiments: [],
    experimentAdded: false
};

const reducer = ( state = initialState, action ) => {
    switch (action.type) {

        case SET_EXPERIMENTS: 
            return {
                ...state,
                experiments: action.experiments
            };

        case EXPERIMENT_ADDED:
            return {
                ...state,
                experimentAdded: true
            };

        case START_ADD_EXPERIMENT:
            return {
                ...state,
                experimentAdded: false
            }

        case REMOVE_EXPERIMENT:
            return {
                ...state,
                experiments: state.experiments.filter( experiment => {
                    return experiment.key !== action.key;
                }),
            };

        default:
            return state;
    }
};

export default reducer;