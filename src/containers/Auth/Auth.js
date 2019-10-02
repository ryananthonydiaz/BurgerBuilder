import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { auth, setAuthRedirectPath } from '../../store/actions/index';

const Auth = props => {
	const [authForm, setAuthForm] = useState({
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'E-Mail Address',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password',
				},
				value: '',
				validation: {
					required: true,
					minLength: 7,
				},
				valid: false,
				touched: false,
			},
		},
	});
	const [isSignup, setIsSignup] = useState(true);

	const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

	useEffect(() => {
		if (!buildingBurger && authRedirectPath !== '/') {
			onSetAuthRedirectPath();
		}
	}, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

	// eslint-disable-next-line
	const checkValidity = (value, rules) => {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength;
		}
		return isValid;
	};

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...authForm.controls,
			[controlName]: {
				...authForm.controls[controlName],
				value: event.target.value,
				valid: checkValidity(event.target.value, authForm.controls[controlName].validation),
				touched: true,
			},
		};
		setAuthForm(updatedControls);
	};

	const submitHandler = event => {
		event.preventDefault();
		props.onAuth(authForm.controls.email.value, authForm.controls.password.value, isSignup);
	};

	const switchAuthModeHandler = () => {
		setIsSignup(!isSignup);
	};

	const formElementsArray = [];

	// eslint-disable-next-line
	for (let key in authForm.controls) {
		formElementsArray.push({
			id: key,
			config: authForm.controls[key],
		});
	}

	let form = formElementsArray.map(formElement => (
		<Input
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.placeholder}
			invalid={!formElement.config.valid}
			shouldValidate={formElement.config.validation}
			touched={formElement.config.touched}
			changed={event => inputChangedHandler(event, formElement.id)}
		/>
	));

	if (props.loading) {
		form = <Spinner />;
	}

	let errorMessage = null;

	if (props.error) {
		errorMessage = <p>{props.error.message}</p>;
	}

	let authRedirect = null;
	if (props.isAuthenticated) {
		authRedirect = <Redirect to={props.authRedirectPath} />;
	}

	return (
		<div className={classes.Auth}>
			{authRedirect}
			{errorMessage}
			<form onSubmit={submitHandler}>
				{form}
				<Button btnType="Success">LOGIN</Button>
			</form>
			<Button clicked={switchAuthModeHandler} btnType="Danger">
				SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}
			</Button>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/')),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);
