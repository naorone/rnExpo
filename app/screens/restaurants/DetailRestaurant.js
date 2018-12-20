import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import Restaurant from '../../components/restaurant/Restaurant';
import BackgroundImage from '../../components/BackgroundImage';
import CommentForm from '../../components/comment/CommentForm';
import CommentList from '../../components/comment/CommentList';

export default class DetailRestaurant extends Component{
	constructor(props) {
		super(props);

		const { params } = props.navigation.state;
		this.state = {
			restaurant: params.restaurant
		};
	}

	editRestaurant () {
		const navigateAction = NavigationActions.navigate({
			routeName: 'EditRestaurant',
			params: { restaurant: this.state.restaurant },
		});
		this.props.navigation.dispatch( navigateAction );
	}

	goHome () {
		const navigateAction = NavigationActions.navigate({
			routeName: 'ListRestaurants'
		});
		this.props.navigation.dispatch( navigateAction );
	}

	render () {
		const { restaurant } = this.state;
		return (
			<BackgroundImage source = { require('../../../assets/images/bg5.jpg') }>
				<KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={80}>
					<ScrollView>

						<Restaurant 
							goHome = { this.goHome.bind( this )} 
							editRestaurant = { this.editRestaurant.bind( this )}
							restaurant = { restaurant }
						/>	
						<CommentForm  restaurantId = { restaurant.id } />
						<CommentList restaurantId = { restaurant.id } />

					</ScrollView>
				</KeyboardAvoidingView>
			</BackgroundImage>
		)
	}
}