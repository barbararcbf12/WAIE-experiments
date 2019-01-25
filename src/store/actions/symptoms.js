import { ADD_SYMPTOM, DELETE_SYMPTOM, SET_SYMPTOMS, REMOVE_SYMPTOM, SYMPTOM_ADDED, START_ADD_SYMPTOM } from './actionsType';
import { uiStartLoading, uiStoptLoading, authGetToken, loggedUser } from './index'; 

export const startAddSymptom = () => {
    return {
        type: START_ADD_SYMPTOM
    };
};

export const addSymptom = (symptomName, location, image, date, comments) => {
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
                console.log(parsedRes); 

                const symptomData = {
                    name: symptomName,
                    location: location,
                    image: image,
                    date: date,
                    type: "symptom",
                    comments: comments
                };
                
                return fetch("https://waie-experiments-1539095380011.firebaseio.com/users/" + loggedUser + "/symptoms.json?auth=" + 
                    authToken,
                {
                    method: "POST",
                    body: JSON.stringify(symptomData)
                });
            })
            .then(res => res.json())
            .then(parseRes => {
                console.log(parseRes);
                dispatch(uiStoptLoading());
                dispatch(symptomAdded());
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!!!");
                dispatch(uiStoptLoading());
            });
    };
};

export const symptomAdded = () => {
    return {
        type: SYMPTOM_ADDED
    }
}

export const getSymptoms = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch("https://waie-experiments-1539095380011.firebaseio.com/users/" + loggedUser + "/symptoms.json?auth=" + token);
            })
            .catch(() => {
                alert("No valid token found!");
            })
            .then(res => res.json())
            .then(parsedRes => {
                const symptoms = [];
                for(let key in parsedRes) {
                    symptoms.push({
                        ...parsedRes[key],
                        key: key
                    });
                }
                dispatch(setSymptoms(symptoms));
            })
            .catch(err => {
                alert("Something went wrong, sorry!");
                console.log(err);
            });
    };
};

export const setSymptoms = symptoms => {
    return {
        type: SET_SYMPTOMS,
        symptoms: symptoms
    };
};

export const deleteSymptom = (key) => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(token => {
                dispatch(removeSymptom(key));
                return fetch("https://waie-experiments-1539095380011.firebaseio.com/users/" + loggedUser + "/symptoms/" + key + ".json?auth=" + token,{
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

export const removeSymptom = key => {
    return {
        type: REMOVE_SYMPTOM,
        key: key
    };
};