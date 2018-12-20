import React, { Component } from 'react';
import { AsyncStorage, Text, View, StyleSheet } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import { Card, Input } from 'react-native-elements';
import AppButton from '../components/AppButton';

export default class Profile extends Component {
	constructor() {
		super();
		
		this.state = {
			user: {
				name: '',
				age: '',
			},
			visible: false,
		};
	}

	componentDidMount() {
	  	this.fetch().then( () => {
			console.log('component did mount');
	  }); 
	}

	async save (){
		try {
			const user = {
				name: this.state.user.name,
				age: this.state.user.age,
			};

			await AsyncStorage.setItem( 'user', JSON.stringify( user ));
			this.setState({visible:true});

		} catch ( error ) {
			console.log('save error');
		}
	}

	async fetch () { //Devuelve la info guardada en el dispositivo del usuario
		try {
			let user = await AsyncStorage.getItem( 'user' );
			if( user ){

				let parsed = JSON.parse( user );
				console.log(parsed);
				this.setState({
					user: parsed,
				});
			console.log('fetch try');
			}

		} catch ( error ){
			console.log('fetch error');
		}
	}

	updateName (valor) {
		let state = this.state.user;
		this.setState({
			//Modificamos solo el valor nombre del objeto
			user: Object.assign( {}, state, {
				name: valor,
			})
		})
	}

	updateAge (valor) {
		let state = this.state.user;
		this.setState({
			//Modificamos solo el valor age del objeto
			user: Object.assign( {}, state, {
				age: valor,
			})
		})
	}

	render () {
		const { user, visible } = this.state;

		if( visible ){
			return (
				<BackgroundImage source = { require('./../../assets/images/bg5.jpg') }>
					<Card>
						<Input
							placeholder = 'Nombre del usuario'
							shake = { true }
							value = { user.name }
							onChangeText = { (value) => this.updateName( value ) } 
						/>
						<Input
							placeholder = 'Edad del usuario'
							shake = { true }
							value = { user.age }
							onChangeText = { (value) => this.updateAge( value ) } 
						/>
						<View style = {{ marginTop: 12, alignItems: 'center', }}>
							<AppButton
									bgColor = 'rgba(255, 38, 74, 0.9)'
									title = 'Guardar'
									action = { this.save.bind( this ) }
									iconName = 'save'
									iconSize = { 30 }
									iconColor = '#fff' 
								/>
						</View>
					</Card>
					<View style={{ marginTop: 12, alignItems: 'center', }}>
						<View style = { styles.viewGuardado }>
							<Text style = { styles.textStile }>Usuario guardado</Text>
						</View>
					</View>
					
				</BackgroundImage>
			);
		}
		return (
				<BackgroundImage source = { require('./../../assets/images/bg5.jpg') }>
					<Card>
						<Input
							placeholder = 'Nombre del usuario'
							shake = { true }
							value = { user.name }
							onChangeText = { (value) => this.updateName( value ) } 
						/>
						<Input
							placeholder = 'Edad del usuario'
							shake = { true }
							value = { user.age }
							onChangeText = { (value) => this.updateAge( value ) } 
						/>
						<View style = {{ marginTop: 12, alignItems: 'center', }}>
							<AppButton
									bgColor = 'rgba(255, 38, 74, 0.9)'
									title = 'Guardar'
									action = { this.save.bind( this ) }
									iconName = 'save'
									iconSize = { 30 }
									iconColor = '#fff' 
								/>
						</View>
					</Card>
				</BackgroundImage>
			);
		
	}

}
const styles = StyleSheet.create({
	viewGuardado: {
		borderRadius: 20,
		backgroundColor: 'rgba(138, 219, 138, 0.7)',
		width: '60%',
		padding: 10,
		marginTop: 10,
		alignItems: 'center',
		
	},
	textStile: {
		color: 'white',
	}
})