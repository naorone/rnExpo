import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from './../components/BackgroundImage';
import AppButton from './../components/AppButton';
import t from 'tcomb-form-native';
import FormValidation from './../utils/validation';
import { Card } from 'react-native-elements';
import * as firebase from 'firebase';
import Toast from 'react-native-simple-toast';
import { Dimensions } from 'react-native';


const Form = t.form.Form;

export default class Register extends Component {
	constructor() {
		super();

		this.state = {
			user: {
				email: '',
				password: '',
			}
		};

	  //Validaciones de segunda contraseña, pass y email
	  this.samePassword = t.refinement( t.String, ( value ) => {
	  	return value === this.state.user.password
	  });

	  this.user = t.struct({
	  	email: FormValidation.email,
	  	password: FormValidation.password,
	  	password_confirmation: this.samePassword,
	  });

	  this.options = {
	  	fields: {
	  		email: {
	  			//help: 'Introduce tu email',
	  			error: 'Email incorrecto',
	  			autoCapitalize: 'none',
	  			placeholder: 'Email',
	  			auto: 'none',
	  		},
	  		password: {
	  			//help: 'Introduce tu password',
	  			error: 'Password incorrecto',
	  			password: true,
	  			secureTextEntry: true,
	  			placeholder: 'Pass',
	  			auto: 'none',
	  		},
	  		password_confirmation: {
	  			error: 'Los password deben ser iguales',
	  			password: true,
	  			secureTextEntry: true,
	  			placeholder: 'Repeat pass',
	  			auto: 'none',
	  		}
	  	},
	  	stylesheet: stylesheet,
	  	//auto: 'placeholders',
	  };

	  this.validate = null;
	}

	register () {
		this.validate = this.refs.form.getValue();
		console.log( this.validate );
		if( this.validate ){
			console.log( 'validación correcta ');
			firebase.auth().createUserWithEmailAndPassword( this.state.user.email, this.state.user.password )
			.then( () => {
				Toast.showWithGravity( 'Bienvenido', Toast.LONG, Toast.BOTTOM );
			})
			.catch((error) => {
				Toast.showWithGravity( error.message );
			})
		}
	}

	//Se ejecutará cada vez que se interactue con el formulario
	onChange ( user ) {
		this.setState( { user } );
	}

	render () {
		return(
			<BackgroundImage source = { require('../../assets/images/bg3.jpg')} >
				<View style = {{ padding: 10 }}>
					<Card containerStyle = {{backgroundColor: 'white'}}  title = 'Registro' >
						<Form
							ref = "form"
							type = { this.user }
							options = { this.options }
							onChange = { ( data ) => this.onChange( data ) }
							value = { this.state.user }
						/>
						<View style = {{ alignItems: 'center', }}>
							<AppButton
								bgColor = 'rgba(111, 38, 74, 0.9)'
								title = 'Register'
								action = { this.register.bind( this ) }
								iconName = 'sign-in'
								iconSize = { 30 }
								iconColor = '#fff'
							/>
						</View>
					</Card>
				</View>
			</BackgroundImage>
			)
	}
}


var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;

stylesheet.textboxView.normal.borderColor = 'rgba(111, 38, 74, 0.9)';
