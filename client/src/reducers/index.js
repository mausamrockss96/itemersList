//rootreducers helps to combine all other reducers like itemreducers,authreducers....

import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import {errorReducer} from './errorReducer';
import authReducer from './authReducer';





// pass in an object with different reducers
export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    
});
