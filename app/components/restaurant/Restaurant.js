import React, { Component } from 'react';
import AppButton from '../AppButton';
import { Card, Text } from 'react-native-elements';
import { View } from 'react-native';
import RestaurantRating from './RestaurantRating';

export default class Restaurant extends Component {
	render() {
		const { editRestaurant, goHome, restaurant } = this.props;

		return(
			<Card
				title = { restaurant.name }
				image = { require('../../../assets/images/restauranteDetail.jpeg') }
			>
				<RestaurantRating restaurantId = { restaurant.id } />
				<Text style = {{ marginTop:10 }}> { restaurant.description } </Text>
				<View style = {{ alignItems: 'center', }}>
					<AppButton
						bgColor = 'rgba(255, 38, 74, 0.9)'
						title = 'Editar restaurante'
						action = { editRestaurant }
						iconName = 'pencil'
						iconSize = { 30 }
						iconColor = '#fff'

					/>
					<AppButton
						bgColor = 'rgba(255, 38, 74, 0.9)'
						title = 'Volver'
						action = { goHome }
						iconName = 'arrow-left'
						iconSize = { 30 }
						iconColor = '#fff'

					/>
				</View>
			</Card>	
		)
	}
}