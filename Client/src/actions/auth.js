import { AUTH } from '../action/action';
import * as api from '../service/api';

export const signin = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signin(formData);

        dispatch({ type: AUTH, data });

        navigate('/ticket');
    } catch (error) {
        // console.log(error)
        dispatch({ type: 'USER_LOGIN_FAILED', payload: error.response.data })
    }
};

export const signup = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signup(formData);
        if (data) {
            alert("Registration successful")
        }
        navigate('/login');
    } catch (error) {
        // dispatch({ type: 'USER_SIGNUP_FAILED', payload:error.response.data})
        const a = error.response.data.errors;
        if (a) {
            alert("Email is already exist")
        }
    }
};