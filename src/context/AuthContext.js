import createDataContext from './createDataContext';
import { AsyncStorage } from 'react-native';
import trackerAPI from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'signout':
            return { token:null, errorMessage:''};
        case 'clear_error_message':
            return { ...state, errorMessage:''};
        default:
            return state;
    }

};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if(token){
        dispatch({ type: 'signin', payload: token});
        navigate('TrackList');
    }else{
        navigate('Signup');
    }

};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'});
};

const signup = dispatch => async ({ email, password }) => {
        //make API request to signup with those credentials
    try {
        const response = await trackerAPI.post('/signup', { email, password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload: response.data.token});
        navigate('TrackList');
    } catch (error) {
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'})
    }
        //if we sign up, modify our state, and say that we are auth
        //if we sign up fails, error message
};



const signin = (dispatch) => async ({ email, password }) => {
    //make API request to signin with those credentials
    //if we sign in, modify our state, and say that we are auth
    //if we sign in fails, error message
    try {
        const response = await trackerAPI.post('/signin',{ email, password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload: response.data.token});
        navigate('TrackList');
    } catch (error) {
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign in'})
    }

};




const signout = (dispatch) =>  async () => {
    //make API request to signout
    await AsyncStorage.removeItem('token');
    dispatch({ type:'signout'});
    navigate('loginFlow');
};



export const { Provider, Context } = createDataContext(authReducer,
                                 { signin, signup, signout, clearErrorMessage, tryLocalSignin },
                                  {token: null, errorMessage: ''});