import React, { Component } from 'react';
import { Rating, Text } from 'react-native-elements';
import { View } from 'react-native';
import * as firebase from 'firebase';


export default class RestaurantRating extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rating: 0
		};
		const { restaurantId } = props;
		this.commentsRef = firebase.database().ref(`comments/${restaurantId}`);
	}

	componentDidMount () {
		this.commentsRef.on( 'child_added', snapshot => {
			this.commentsRef.on( 'value', snap => {
			 let comments = [];
			 snap.forEach( row => {
				comments.push( parseInt( row.val().rating ));
			 });

			 this.setState({
			 	rating: comments.reduce(( previous, current ) => previous + current, 0) / comments.length,
			 });

			 this.refs.rating.setCurrentRating( comments.reduce(( previous, current ) => previous + current, 0) / comments.length );
			})
		});
	}

	render() {
	  	const { rating } = this.state;
	  	if( rating ){
	  		return (
	      		<View >
					<Rating
						ref = 'rating'
						size = {20}
						readonly
						startingValue = { rating }
					/>
	      		</View>
	    	);	
	  	} else {
	  		return (
	      		<View >
					<Text>No hay puntuaciones</Text>
	      		</View>
	    	);	

	  	}

	}
}

