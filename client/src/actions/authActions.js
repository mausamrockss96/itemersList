import axios from 'axios';
import { returnErrors } from './errorActions';
 
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR, 
    // LOGIN_SUCCESS,
    // LOGIN_FAIL,
    // LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,

} from '../actions/types';



//since we are making async req we need to to call dispatch, i want to be able to get the token from the state so along with dispatch, gbetstate also so that we can get certain
//parts of our state, calling userloading to set it from false to true from authreducer.js
//now we r going to fetch the user so using axios
//getting token from ,localstorage from authreducer
//adding headers
//if there is token, setting x-auth-token to token and hence passing congig in the get req

//check for the token and load the user
export const loadUser = () => (dispatch, getState) => {
    //user Loading
    dispatch({
        type: USER_LOADING
    });

    
    
      


    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => 
            dispatch({
            type: USER_LOADED,
            payload: res.data               //user and the token itself
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));         //returnErrors just returns an object like this with the type but it takes the couple of parameters like msg,status, and a possible id
            dispatch({  
                type: AUTH_ERROR
            });
        });
}






//here we r doing it right after the register in registerModal
//REGISTER USER
export const register = ({ name, email, password }) => (dispatch) => {

    
    //headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

//REQUEST BODY
//turns javascript object to json
const body = JSON.stringify({ name, email, password });
 
axios.post("/api/users", body, config)
.then((res) => dispatch({
    type: REGISTER_SUCCESS,
    payload: res.data                     //we want to send the payload to the reducer along with data and the token
}))

.catch((err) => {
    dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );         //returnErrors just returns an object like this with the type but it takes the couple of parameters like msg,status, and a possible id
    dispatch({
        type: REGISTER_FAIL
    });
});

}







//SETUP config/headers and token

export const tokenConfig = getState => {
        //GET TOKEN FROM THE localStorage
        const token = getState().auth.token;

    
    
        //ADd users to headers
        const config = {
                headers: {
                    'Content-type': 'application/json'
            }

        };   

        //if token, add to headers
        if(token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    }