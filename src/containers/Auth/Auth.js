import React, { Component } from 'react'

export class Auth extends Component {

    state = {
        controls: {
            email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail Address',
				},
				value: '',
				validation: {
                    required: true,
                    isEmail: true;
				},
				valid: false,
				touched: false,
			},
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true;
            },
            valid: false,
            touched: false,
        },
    }
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Auth
