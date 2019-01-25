import { ADD_EXPERIMENT, DELETE_EXPERIMENT, SET_EXPERIMENTS, REMOVE_EXPERIMENT, EXPERIMENT_ADDED, START_ADD_EXPERIMENT } from './actionsType';
import { uiStartLoading, uiStoptLoading, authGetToken, loggedUser } from './index'; 
import { format } from 'date-fns';

export const startAddExperiment = () => {
    return {
        type: START_ADD_EXPERIMENT
    };
};

export const addExperiment = (experimentTarget, date, length) => {
    return dispatch => {
        let authToken;
    
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(token => {
                authToken = token;
                return fetch("https://us-central1-waie-experiments-1539095380011.cloudfunctions.net/storeImage", 
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + authToken
                    }
                });
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStoptLoading());
            })
            .then(
                res => 
                    res.json()
            )
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!!");
                dispatch(uiStoptLoading());
            })
            .then(parsedRes => {
                const experimentData = {
                    experimentTarget: experimentTarget,
                    length: length
                };
                
                return fetch("https://waie-experiments-1539095380011.firebaseio.com/users/" + loggedUser + "/experiments.json?auth=" + 
                    authToken,
                {
                    method: "POST",
                    body: JSON.stringify(experimentData)
                });
            })
            .then(res => res.json())
            .then(parseRes => {
                dispatch(uiStoptLoading());
                dispatch(experimentAdded());
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!!!");
                dispatch(uiStoptLoading());
            });
    };
};

export const experimentAdded = () => {
    return {
        type: EXPERIMENT_ADDED
    }
}

export const getExperiments = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch("https://waie-experiments-1539095380011.firebaseio.com/users/" + loggedUser + "/experiments.json?auth=" + token);
            })
            .catch(() => {
                alert("No valid token found!");
            })
            .then(res => res.json())
            .then(parsedRes => {
                const experiments = [];
                for(let key in parsedRes) {
                    experiments.push({
                        ...parsedRes[key],
                        key: key
                    });
                }
                dispatch(setExperiments(experiments));
            })
            .catch(err => {
                alert("Something went wrong, sorry!");
                console.log(err);
            });
    };
};

export const setExperiments = experiments => {
    return {
        type: SET_EXPERIMENTS,
        experiments: experiments
    };
};

export const deleteExperiment = (key) => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(token => {
                dispatch(removeExperiment(key));
                return fetch("https://waie-experiments-1539095380011.firebaseio.com/users/" + loggedUser + "/experiments/" + key + ".json?auth=" + token,{
                    method: "DELETE"
                })
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("Done!");
            })
            .catch(err => {
                alert("Something went wrong, sorry!");
                console.log(err);
            });
    };
};

export const removeExperiment = key => {
    return {
        type: REMOVE_EXPERIMENT,
        key: key
    };
};