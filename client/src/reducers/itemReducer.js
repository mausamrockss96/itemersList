//Reducer is where our actual state is gonna go and thjis is where we check our actions like get,add action item


// import { v4 as uuidv4 } from 'uuid';     no need after mongo connected
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING } from '../actions/types';
// uuidv4();


//commented for connection with backend
// const initialState = {
//     items: [
//         { id: uuidv4(), name:"egg" },
//         { id: uuidv4(), name:"milk" },
//         { id: uuidv4(), name:"meat" },
//         { id: uuidv4(), name:"milkshake" }

//     ]
// };





const initialState = {
    items: [],
    loading: false
};



//we r using the spread operator like this because we cannot actually mutate the state and we cant directly change it and hence we have to make a copy of this
export default function (state = initialState, action) {
    switch (action.type) 
    {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };

            //before we made the request we called setItemsLoading which makes a request to the reducer with items loading
            //as the type which sets loading to true so it sets to tue where we make the request, after we make the request and we get the items back
            //and we get that payload we also want to set back to false
            case ADD_ITEM:
                return {
                    ...state,
                    items: [action.payload, ...state.items]
                  };
            
            case DELETE_ITEM:   
                return {
                    ...state,
                    items: state.items.filter(item => item._id !== action.payload)
                };


                case ITEMS_LOADING:
                    return {
                        ...state,
                        loading: true
                    }
                    default:
                        return state;
    }
}