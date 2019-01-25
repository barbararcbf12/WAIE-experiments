import { SET_SYMPTOMS, REMOVE_SYMPTOM, SYMPTOM_ADDED, START_ADD_SYMPTOM } from '../actions/actionsType';

const initialState = {
    symptoms: [],
    symptomAdded: false
};

const reducer = ( state = initialState, action ) => {
    switch (action.type) {

        case SET_SYMPTOMS: 
            return {
                ...state,
                symptoms: action.symptoms
            };

        case SYMPTOM_ADDED:
            return {
                ...state,
                symptomAdded: true
            };

        case START_ADD_SYMPTOM:
            return {
                ...state,
                symptomAdded: false
            }

        case REMOVE_SYMPTOM:
            return {
                ...state,
                symptoms: state.symptoms.filter( symptom => {
                    return symptom.key !== action.key;
                }),
            };

        default:
            return state;
    }
};

export default reducer;