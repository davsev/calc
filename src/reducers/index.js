import { combineReducers } from 'redux';

import editCorsesReducer from './editCorsesReducer';
import authReducer from './authReducer';

export default combineReducers({
    user: authReducer,
    courses: editCorsesReducer
})