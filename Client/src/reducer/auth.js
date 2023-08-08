import * as actionType from '../action/action';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({...action.data }));
            return {...state, authData: action.data, loading: false, errors: null };


        case 'USER_LOGIN_FAILED':
            console.log(action.payload)
            return {
                errors: action.payload
            }


        case actionType.LOGOUT:
            localStorage.clear();
            return {...state, authData: null, loading: false, errors: null };

        default:
            return state;
    }
};

export default authReducer;