import React from 'react';
import classes from './BuildControl.module.css';

const BuildControl = props => {
	return (
		<div className={classes.BuildControl}>
			<div className={classes.BuildControl}>
				{props.label}
				<button className={classes.less} onClick={props.removed} disabled={props.disabled}>
					Less
				</button>
				<button className={classes.More} onClick={props.added}>
					More
				</button>
			</div>
		</div>
	);
};

export default BuildControl;
