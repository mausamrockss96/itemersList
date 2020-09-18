import axios from 'axios';
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING } from './types';


// export const getItems = () => {
//     return {
//         type: GET_ITEMS
//     };

// };

//now we r gonna call this getitems from the component using reducers so removing the states from the components
//here this return returns to the itemreducers and then passes the items in the state to the shopping list





//we r going to use dispatch to send the type along with the data that is that we get from our request but for now we want to call the set items loading
//and we can do that by calling dispatch and then we call any of these actions and we want to call this right here set items loading because we want the loadung to bet set to true for now

//before we made the request we called setItemsLoading which makes a request to the reducer with items loading
//as the type which sets loading to true so it sets to true where we make the request, after we make the request and we get the items back
//and we get that payload we also want to set back to false
export const getItems = () => dispatch => {
    
    dispatch(setItemsLoading());
    axios
    .get('/api/items')
    .then(res =>
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    );
};



// export const addItem = item => dispatch => {
//     return {
//         type: ADD_ITEM,
//         payload: item
//     }
// }

export const addItem = item => dispatch => {
    axios
    .post('/api/items', item)
    .then(res => 
        dispatch({
            type: ADD_ITEM,
            payload: res.data
        })
        )
    };

    


export const deleteItem = id => dispatch => {
    axios
    .delete(`/api/items/${id}`).then(res => 
        dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
};


export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING             //which ultimately sets from false to true

    }
}





