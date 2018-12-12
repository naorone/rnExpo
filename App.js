import React from 'react';
import * as firebase from 'firebase';
import { Text } from 'react-native';
import GuestNavigation from './app/navigations/guest';
import Preloader from './app/components/Preloader';
import firebaseConfig from './app/utils/firebase';
import RestaurantEmpty from './app/components/restaurant/RestaurantEmpty';
import LoggedNavigation from './app/navigations/logged.js';

firebase.initializeApp(firebaseConfig);

console.disableYellowBox = true;


export default class App extends React.Component {

	constructor() {
		super();

		this.state = {
			isLogged: false,
			loaded: false,
	  	};
	}

	async componentDidMount () {
		await firebase.auth().onAuthStateChanged(( user ) => {
			if( user !== null ){
				this.setState( {
					isLogged: true,
					loaded: true
				});
			}else{
				this.setState( {
					isLogged: false,
					loaded: true
				});
			}
		})
		//firebase.auth().signOut();

	}

	render() {
		const { isLogged, loaded } = this.state;

			if( !loaded ){
				return(
					<Preloader />
				);
			}

			if( !isLogged ) {
				return(
					<GuestNavigation />
				);
			}else{
				return(
					<LoggedNavigation />
				);
			}
  	}
}
