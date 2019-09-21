import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import BackDrop from '../BackDrop/BackDrop';

const Modal = props => {
	return (
		<Aux>
			<BackDrop show={props.show} clicked={props.modalClosed} />
			<div
				className={classes.Modal}
				style={{
					transform: props.show ? 'translate(0) ' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0',
				}}>
				{props.children}
			</div>
		</Aux>
	);
};

export default Modal;
