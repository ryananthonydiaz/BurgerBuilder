import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.module.css';

const Orders = props => {
	const { onFetchOrders, token, userId } = props;
	useEffect(() => {
		onFetchOrders(token, userId);
	}, [onFetchOrders, token, userId]);

	let orders = <Spinner />;

	if (!props.loading) {
		orders = props.orders.map(order => (
			<Order key={order.id} ingredients={order.ingredients} price={order.price} />
		));
	}
	return (
		<div>
			{orders.length === 0 ? (
				<div className={classes.NoOrder}>
					<h2 className={classes.title}>No Orders have been placed yet</h2>
					<p className={classes.body}>Use the menu in the top left corner to place an order</p>{' '}
				</div>
			) : (
				orders
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
