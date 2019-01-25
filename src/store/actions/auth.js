import { AsyncStorage } from "react-native";
import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionsType';
import { uiStartLoading, uiStoptLoading } from "./index";
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import App from "../../../App";
import { Navigation } from "react-native-navigation";

const API_KEY = "AIzaSyCQZsL8gzi1Tn-vVpYyfOQ_mXOwORMwseE";

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + API_KEY;
        
        if(authMode === "signup"){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + API_KEY;
        }
        fetch(
            url, 
            {
                method: "POST",
                body: JSON.stringify({
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .catch( err => {
                console.log(err);
                dispatch(uiStoptLoading());
            })
            .then( res => { 
                console.log("error: ", new Error());
                if (res.ok) {
                    return res.json();
                } else {
                    throw(new Error());
                }
            } )
            .catch(() => {
                console.log("Something went wrong!");
            })
            .then( parseRes => {
                dispatch(uiStoptLoading());
                console.log(parseRes);
                if (!parseRes.idToken){
                    if(parseRes.error.message == "INVALID_EMAIL"){
                        alert("Invalid e-mail, please try again.");
                    }
                    if(parseRes.error.message == "EMAIL_EXISTS"){
                        alert("The email address is already in use by another account.");
                    }
                    if(parseRes.error.message == "OPERATION_NOT_ALLOWED"){
                        alert("Password sign-in is disabled for this project.");
                    }
                    if(parseRes.error.message == "TOO_MANY_ATTEMPTS_TRY_LATER"){
                        alert("We have blocked all requests from this device due to unusual activity. Try again later.");
                    }else{
                        alert("Authentication failed, please try again.");
                    }
                }else {
                    dispatch(
                        authStoreToken(
                            parseRes.idToken, 
                            parseRes.expiresIn,
                            parseRes.refreshToken,
                            parseRes.localId
                        ));
                    dispatch(
                        getUser(
                            parseRes.localId
                        ));
                    startMainTabs();
                }
            });
        };
};


export let loggedUser;

export const getLogedUser = () => {
    return dispatch => {
        dispatch(getUser());
    }
    
}

export const getUser = (localId) => {
    return dispatch => {
        loggedUser =  localId
    }
}

export const authStoreToken = (token, expiresIn, refreshToken, localId) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        
        dispatch(authSetToken(token, expiryDate, localId));

        AsyncStorage.setItem("waie:auth:token", token);
        AsyncStorage.setItem("waie:auth:expiryDate", expiryDate.toString());
        AsyncStorage.setItem("waie:auth:refreshToken", refreshToken);
        AsyncStorage.setItem("waie:auth:localId", localId)
    }
}

export const authSetToken = (token, expiryDate, localId) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate,
        localId: localId
    };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;

            if(!token || new Date(expiryDate) <= new Date()){
                let fetchedToken;
                AsyncStorage.getItem("waie:auth:localId")
                    .catch( err => {
                        console.log(err);
                        alert("Fetching uid failed!");
                    })
                    .then( res => 
                        loggedUser = res 
                    );
                AsyncStorage.getItem("waie:auth:token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if(!tokenFromStorage){
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem("waie:auth:expiryDate");
                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if(parsedExpiryDate > now) {
                            dispatch(authSetToken(fetchedToken));
                            resolve(fetchedToken);
                        } else {
                            reject();
                        }
                    })
                    .catch(err => reject());
            } else {
                resolve(token);
            }
        });
        return promise
          .catch(err => {
            return AsyncStorage.getItem("waie:auth:refreshToken")
                .then(refreshToken => {
                    return fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, 
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "grant_type=refresh_token&refresh_token=" + refreshToken
                    });
                })
                .then(res => { 
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw(new Error());
                    }
                })
                .catch( err => {
                    console.log(err);
                    dispatch(uiStoptLoading());
                })
                .then(parsedRes => {
                    if(parsedRes.id_token) {
                        console.log("Refresh token worked!");
                        
                        dispatch(
                            authStoreToken(
                                parsedRes.id_token, 
                                parsedRes.expires_in, 
                                parsedRes.refresh_token, 
                                parsedRes.user_id
                                )
                        );
                        return parsedRes.id_token; 
                    } else{
                        dispatch(authClearStorage());
                    }
                });
        })
        .then(token => {
            if(!token){
                throw(new Error());
            } else {
                return token;
            }
        });
    }; 
};

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                startMainTabs();
            })
            .catch(err => console.log("Failed to fetch token."));
    };
};

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("waie:auth:token");
        AsyncStorage.removeItem("waie:auth:expiryDate");
        return AsyncStorage.removeItem("waie:auth:refreshToken");
        AsyncStorage.removeItem("waie:auth:localId");
    };
};


export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    };
};

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
            .then( () => {
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: "firstApp.AuthScreen",
                        title: "Login"
                    }
                })
            });
            dispatch(authRemoveToken());
    };
};
