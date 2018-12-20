import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
//import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase';
import BackgroundImage from './../components/BackgroundImage';
import AppButton from './../components/AppButton';
import facebook from './../utils/facebook';


class Start extends Component {
	static navigationOptions = {
		title: 'App'
	};

	login() {
		const navigateAction = NavigationActions.navigate({
			routeName: 'Login'
		});
		this.props.navigation.dispatch( navigateAction );
	}

	register () {
		const navigateAction = NavigationActions.navigate({
			routeName: 'Register'
		});
		this.props.navigation.dispatch( navigateAction );

	}

	async facebook (){
		const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
			facebook.config.aplication_id, { permissions:  facebook.config.permissions }
		);
		if( type === 'success') {
			const credentials = firebase.auth.FacebookAuthProvider.credential( token );
			firebase.auth().signInWithCredential( credentials )
			.catch( error => {
				//Toast.showWithGravity( 'Error accediendo a Facebook', Toast.LONG, Toast.BOTTOM );
			})
		}else if (type === 'cancel') {
			//Toast.showWithGravity( 'Inicio de sesión cancelado', Toast.LONG, Toast.BOTTOM );
		}else {
			//Toast.showWithGravity( 'Error desconocido', Toast.LONG, Toast.BOTTOM );
		}
	}

	render() {
		return (
			<BackgroundImage source = { require ('../../assets/images/bg3.jpg') }>
				<View style = {{ justifyContent: 'center', flex: 1, alignItems: 'center'  }}>


					<AppButton
						bgColor = 'rgba(111, 38, 74, 0.9)'
						title = 'Entrar'
						action = { this.login.bind( this ) }
						iconName = 'sign-in'
						iconSize = { 30 }
						iconColor = '#fff'
						
					 />
					<AppButton
						bgColor = 'rgba(111, 38, 74, 0.9)'
						title = 'Registrar'
						action = { this.register.bind( this ) }
						iconName = 'user-plus'
						iconSize = { 30 }
						iconColor = '#fff'
					/>

					<AppButton
						bgColor = 'rgba(67, 67, 146, 0.7)'
						title = 'Entrar con Facebook'
						action = { this.facebook.bind( this ) }
						iconName = 'facebook'
						iconSize = { 30 }
						iconColor = '#fff'
					/>


				</View>
			</BackgroundImage>
		);
	}
}




export default Start;
