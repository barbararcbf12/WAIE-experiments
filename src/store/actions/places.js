import { ADD_PLACE, DELETE_PLACE, SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE } from './actionsType';
import { uiStartLoading, uiStoptLoading, authGetToken, loggedUser } from './index'; //, getUser } from './index';


export const startAddPlace = () => {
    return {
        type: START_ADD_PLACE
    };
};

const idUser = loggedUser;

export const addPlace = (placeName, location, image, date, type, comments) => {
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
                    body: JSON.stringify({
                        image: image.base64
                    }),
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
            .then( res => { 
                if (res.ok) {
                    return res.json();
                } else {
                    throw(new Error());
                }
            })
            .catch(() => {
                console.log("Something went wrong!");
            })
            .then(parsedRes => {
                console.log(parsedRes); //imageUrl

                const placeData = {
                    name: placeName,
                    location: location,
                    image: parsedRes.imageUrl,
                    date: date, 
                    type: type,
                    comments: comments
                };
                
                return fetch(`https://waie-experiments-1539095380011.firebaseio.com/users/${loggedUser}/places.json?auth=${authToken}`,
                {
                    method: "POST",
                    body: JSON.stringify(placeData)
                });

            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!!!");
            })
            .then(res => { 
                if (res.ok) {
                    return res.json();
                } else {
                    throw(new Error());
                }
            })
            .catch(() => {
                console.log("Something went wrong!");
            })
            .then(parseRes => {
                console.log(parseRes);
                dispatch(uiStoptLoading());
                dispatch(placeAdded());
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!!!");
                dispatch(uiStoptLoading());
            });
    };
};


export const placeAdded = () => {
    return {
        type: PLACE_ADDED
    }
}

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch("https://waie-experiments-1539095380011.firebaseio.com/users/" + loggedUser + "/places.json?auth=" + token);
            })
            .catch(() => {
                console.log("No valid token found!");
            })
            .then(res => { 
                console.log("placs res: ", res);
                if (res.ok) {
                    return res.json();
                } else {
                    throw(new Error());
                }
            })
            .catch(() => {
                console.log("Something went wrong!");
            })
            .then(parsedRes => {
                const places = [];
                for(let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        image: {
                            uri: parsedRes[key].image
                        },
                        key: key
                    });
                }
                dispatch(setPlaces(places));
            })
            .catch(err => {
                alert("You might have lost connection with the server. Please, try to close and open the app again.");
                console.log(err);
                throw err;
            });
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
};

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(() => {
                console.log("No valid token found!");
            })
            .then(token => {
                dispatch(removePlace(key));
                return fetch("https://waie-experiments-1539095380011.firebaseio.com/users/" + loggedUser + "/places/" + key + ".json?auth=" + token,{
                    method: "DELETE"
                })
            })
            .then(res => { 
                if (res.ok) {
                    return res.json();
                } else {
                    throw(new Error());
                }
            })
            .catch(() => {
                console.log("Something went wrong!");
            })
            .then(parsedRes => {
                console.log(parsedRes); 
            })
            .catch(err => {
                alert("You might have lost connection with the server. Please, try to close and open the app again.");
                console.log(err); 
            });
    };
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};
