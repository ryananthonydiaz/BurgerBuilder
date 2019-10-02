import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions';

const App = props => {
	const { onTryAutoSignup } = props;
	useEffect(() => {
		onTryAutoSignup();
	}, [onTryAutoSignup]);

	let routes = (
		<Switch>
			<Route path="/auth" component={Auth} />
			<Route path="/" exact component={BurgerBuilder} />
			<Redirect to="/" />
		</Switch>
	);

	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/checkout" render={props => <Checkout {...props} />} />
				<Route path="/orders" render={props => <Orders {...props} />} />
				<Route path="/logout" render={props => <Logout {...props} />} />
				<Route path="/auth" render={props => <Auth {...props} />} />
				<Route path="/" exact render={props => <BurgerBuilder {...props} />} />
			</Switch>
		);
	}

	return (
		<div>
			<Layout>{routes}</Layout>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(authCheckState()),
	};
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
