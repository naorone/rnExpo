import React, {Component} from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import AppButton from '../../components/AppButton';
import { NavigationActions } from 'react-navigation';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { options, Restaurant } from '../../forms/restaurant';
import t from 'tcomb-form-native';
import { Card } from 'react-native-elements';
//import Toast from 'react-native-simple-toast';

const Form = t.form.Form;

export default class EditRestaurant extends Component {

	constructor(props) {
		super(props);
		const { params } = this.props.navigation.state;
		this.state = {
				restaurant: params.restaurant, 
			}
	}

	onChange( restaurant ) {
		this.setState({
			restaurant
		})
	}

	update() {
		const validate = this.refs.form.getValue();
		if( validate ){
			let data = Object.assign( {}, validate );
			console.log(this.state);
			const ref = firebase.database().ref().child(`restaurants/${this.state.restaurant.id}`);
			ref.update( data ).then( () => {
				const navigateActions = NavigationActions.navigate({
					routeName: 'DetailRestaurant',
					params: { restaurant: this.state.restaurant }
				});
				this.props.navigation.dispatch(navigateActions);
			})
			
		}
	}

	render(){
		const { restaurant } = this.state;
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={80}>
			<BackgroundImage source = { require('../../../assets/images/bg5.jpg') }>
				<ScrollView style = { styles.container }>
					<Card title = 'Editar restaurante'>
						<View style = { styles.formContainer }>
							<Form
								ref = 'form'
								type = { Restaurant }
								options = { options }
								value = { restaurant }
								onChange = { (v) => this.onChange( v ) }
							/>
						</View>
						<View style = { styles.buttonContainer }>
							<AppButton
								bgColor = 'rgba(255, 38, 74, 0.9)'
								title = 'Editar'
								action = { this.update.bind( this ) }
								iconName = 'plus'
								iconSize = { 30 }
								iconColor = '#fff' 
							/>
						</View>	
					</Card>					
				</ScrollView>
			</BackgroundImage>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(231, 228, 224, 0.8)',
		padding: 0,
		height: '100%',
		flex:1,
		//justifyContent: 'center', //ScrollView no permite justifyContent
	},
	buttonContainer: {
		alignItems: 'center'
	}
});
