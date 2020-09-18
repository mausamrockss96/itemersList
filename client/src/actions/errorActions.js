import {
    GET_ERRORS,
    CLEAR_ERRORS
} from './types';



//its gonna call the getErrors from errorReducer and call it sending its return objects

//return errors

export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {
            msg,
            status,
            id
        }
    };
};


// CLEAR ERRORS

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};