import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';


const initialState = {
    msg: {},
    status: null,
    id: null
}


export const errorReducer =  function(state = initialState, action)
{
    switch(action.type)
    {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,                          //payload is an object that has a msg atteched to it that comes from the server
                status: action.payload.status,
                id: action.payload.id
            }

        case CLEAR_ERRORS:
            return{
                msg:{},                                           //msg will be an empty obj because we dont want the old errors hanging around in our state
                status: null,
                id: null
            }
        default:
            return state
    }
}