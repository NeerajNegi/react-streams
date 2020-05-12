import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    form: FormReducer
});