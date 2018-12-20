import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import RestaurantsScreen from './../screens/restaurants/Restaurants';
import AddRestaurantScreen from './../screens/restaurants/AddRestaurant';
import LogoutScreen from './../screens/Logout';
import DetailRestaurantScreen from './../screens/restaurants/DetailRestaurant';
import EditRestaurantScreen from './../screens/restaurants/EditRestaurant';
import ProfileScreen from './../screens/Profile';





const navigationOptions = {
	navigationOptions:{
		headerStyle: {
				backgroundColor: 'rgba(200, 38, 74, 1)',
			},
			headerTitleStyle: {
				textAlign: 'center',
				alignSelf: 'center',
				fontSize: 20,
				color: '#fff',
				fontWeight: 'bold'
			}
	}

};

const leftIcon = ( navigation, icon ) => <Icon
	name = { icon }
	style = {{ marginLeft: 20 }}
	size = { 20 }
	color = 'white'
	onPress = { () => navigation.openDrawer()}
	/>;

const rightIcon = ( navigation, icon ) => <Icon
	name = { icon }
	style = {{ marginRight: 20 }}
	size = { 30 }
	color = 'white'
	onPress = { () => navigation.navigate( 'ListRestaurants' )}
	/>;	

	

const restaurantsScreenStack = createStackNavigator( 
	{
		ListRestaurants: {
			screen: RestaurantsScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Restaurants',
				headerLeft: leftIcon( navigation, 'bars' ),
			})
		},
		AddRestaurant: {
			screen: AddRestaurantScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Añadir restaurante',
				headerRight: rightIcon( navigation, 'home' ),
				headerLeft: leftIcon( navigation, 'bars'),
			})
		},
		DetailRestaurant: {
			screen: DetailRestaurantScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Detalle del restaurante',
				headerRight: rightIcon( navigation, 'home' ),
				headerLeft: leftIcon( navigation, 'bars'),
			})
		},
		EditRestaurant: {
			screen: EditRestaurantScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Editar restaurante',
				headerRight: rightIcon( navigation, 'home' ),
			})
		},

	},
	navigationOptions
);

const profileScreenStack = createStackNavigator( 
	{
		ProfileScreen: {
			screen: ProfileScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Perfil',
				headerRight: rightIcon( navigation, 'home' ),
				headerLeft: leftIcon( navigation, 'bars'),
			})
		}
	},
	navigationOptions
);		

const logoutScreenStack = createStackNavigator(
	{
		LogoutScreen: {
			screen: LogoutScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Cerrar sesión',
			})

		}
	}
);


export default createDrawerNavigator (
	{
		RestaurantsScreen: {
			screen: restaurantsScreenStack,
			navigationOptions: ({ navigation }) => ({
				drawerLabel: 'Restaurantes',
				drawerIcon: ({ tintColor }) => (<Icon name = 'home'size = {24} style = {{ color: tintColor }} />)
			})
		},
		LogoutScreen: {
			screen: logoutScreenStack,
			navigationOptions: ({ navigation }) => ({
				drawerLabel: 'Cerrar sesión',
				drawerIcon: ({ tintColor }) => ( <Icon name = 'sign-out' size = {24} style = {{ color: tintColor }} /> ),
			})
		},
		ProfileScreen: {
			screen: profileScreenStack,
			navigationOptions: ({ navigation }) => ({
				drawerLabel: 'Perfil',
				drawerIcon: ({ tintColor }) => ( <Icon name = 'user' size = {24} style = {{ color: tintColor }} /> ),
			})
		},
	},
	{
		drawerBackgroundColor: 'rgba(128, 35, 60, 1)',
		contentOptions: {
			activeTintColor: 'white',
			activeBackgroundColor: 'transparent',
			inactiveTintColor: 'white',
			itemsContainerStyle: {
				marginVertical: 0,
			}
		},
	}
);

const styles = StyleSheet.create({

});


