import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from './actionTypes';
import { webAPIKEY } from '../../API_KEY/apiKeys';

import axios from 'axios';

export const authStart = authData => {
	return {
		type: AUTH_START,
		authData: authData,
	};
};

export const authSuccess = authData => {
	return {
		type: AUTH_SUCCESS,
		authData: authData,
	};
};

export const authFail = error => {
	return {
		type: AUTH_FAIL,
		error: error,
	};
};

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webAPIKEY}`;
		if (!isSignup) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webAPIKEY}`;
		}
		axios
			.post(url, authData)
			.then(response => {
				console.log(response);
				dispatch(authSuccess(response.data));
			})
			.catch(err => {
				console.log(err);
				dispatch(authFail(err));
			});
	};
};
