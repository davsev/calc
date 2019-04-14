import { LOGGED_IN } from '../consts';
import { LOGGED_OUT } from '../consts';

const initialState = {
    username: '',
    password: '',
    data: [],
    auth: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOGGED_IN:
            return{
                ...state,
                auth: true,
                name: action.name 
            }
         case LOGGED_OUT:
         return{
            ...state,
            auth: false
         }
        
        default: 
            return state;
    }
}  


