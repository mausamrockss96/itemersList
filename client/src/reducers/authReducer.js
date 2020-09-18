import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,

} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'), //we have a token which comes from the localstorage
    isAuthenticated: null,
    isLoading: false, //where user is loading        
    user: null
}



export default function (state = initialState, action) {
    switch (action.type) {
        //userloading is just the point from where we r get the user from the backend to the point to where we actually fetch the user
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }

            //when the user is actually loaded, we want the set isAuthenticated to true because we went and validated on the backend, got that user set that to true.
            //isloading should then set back to false because the user is now loaded and then now user is nbow loaded and then user will be set to action.payload
            //which we r gonna send the user as the payload
            //so this USER_LOADED is gonna run basicaaly all the time with every request to see if we r logged in or not
            case USER_LOADED:
                return {
                    ...state,
                    isAuthenticated: true,
                    isLoading: false,
                    user: action.payload
                }
                case LOGIN_SUCCESS:
                case REGISTER_SUCCESS:
                    localStorage.setItem('token', action.payload.token);

                    return {
                        ...state,
                        ...action.payload, //thats gonna have user and the token
                        isAuthenticated: true,
                        isLoading: false,
                    }

                    case AUTH_ERROR:
                    case LOGIN_FAIL:
                    case LOGOUT_SUCCESS:
                    case REGISTER_FAIL:
                        localStorage.removeItem('token');
                        return {
                            ...state,
                            token: null,
                            user: null,
                            isloading: false,
                            isAuthenticated: false
                        }
                        default:
                            return state;


    }
}