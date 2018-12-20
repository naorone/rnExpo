import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from './../components/BackgroundImage';
import AppButton from './../components/AppButton';
import t from 'tcomb-form-native';
import FormValidation from './../utils/validation';
import { Card } from 'react-native-elements';
import * as firebase from 'firebase';
//import Toast from 'react-native-simple-toast';
import { Dimensions } from 'react-native';


const Form = t.form.Form;

const { width, height } = Dimensions.get( 'window' );

export default class Login extends Component {
  
	constructor() {
	  super();
	
	  this.user = t.struct({
	  	email: FormValidation.email,
	  	password: FormValidation.password
	  });
	  {console.log(`${height} wid ${width}`);}

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
	  		}
	  	},
	  	stylesheet: stylesheet,
	  	//auto: 'placeholders',
	  };

	}

	login () {
		const validate = this.refs.form.getValue();
		if( validate ) {
			firebase.auth().signInWithEmailAndPassword( validate.email, validate.password )
			.then( () => {
				//Toast.showWithGravity( 'Bienvenido', Toast.LONG, Toast.BOTTOM );
			} )
			.catch( (error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				if( errorCode === 'auth/wrong-password' ){
					//Toast.showWithGravity( 'Password incorrecto', Toast.LONG, Toast.BOTTOM );
				}else{
					//Toast.showWithGravity( errorMessage, Toast.LONG, Toast.BOTTOM );
				}
			} )
			console.log( 'success' );
		}
	}

	render() {
		return (
			<BackgroundImage source = { require('../../assets/images/bg3.jpg')} >
				<View style = {{ padding: 10 }}>
					<Card containerStyle = {{backgroundColor: 'white'}}  title = 'Iniciar sesión' >
						<Form
							ref = "form"
							type = { this.user }
							options = { this.options }
						/>
						<View style = {{ alignItems: 'center', }}>
						<AppButton
							bgColor = 'rgba(111, 38, 74, 0.9)'
							title = 'Login'
							action = { this.login.bind( this ) }
							iconName = 'sign-in'
							iconSize = { 30 }
							iconColor = '#fff'
					 	/>
					 	</View>	
					</Card>
				</View>
				
			
				
			</BackgroundImage>
			
			);
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






