import React, { Component } from 'react';
import Preloader from '../Preloader';
import CommentEmpty from './CommentEmpty';
import CommentComp from './Comment';
import BackgroundImage from '../BackgroundImage';
import { options, Comment } from '../../forms/comment';
import { Card, Divider, Text } from 'react-native-elements';
import { View, ScrollView, KeyboardAvoidingView, StyleSheet, FlatList } from 'react-native';
import * as firebase from 'firebase';

export default class CommentList extends Component {
	constructor() {
	  super();
	
	  this.state = {
	  	comments: [],
	  	loaded: false,
	  };

	}

	componentDidMount() {
		firebase.database().ref(`comments/${this.props.restaurantId}`).on('value', snapshot => {
			let comments = [];
			snapshot.forEach( row => {
				comments.push({
					id: row.key,
					rating: row.val().rating,
					comment: row.val().comment,
				});
			});
			this.setState({
				comments,
				loaded: true,
			});
		})
	}

	renderComment( comment ) {
		return (
			<CommentComp commentText = {comment.comment} />
		)
	}

	render() {
		const { comments, loaded } = this.state;
		
		if( !loaded ){
			return (
				<Preloader />
			)	
		}

		if( !comments.length ){
			return(
				<View>
					<CommentEmpty />
				</View>
			)
		}
		return (
			<View style = { styles.container }>
				<Text style = { styles.title } >Opiniones</Text>
				<Divider style = { styles.divider } />
				<Card>
					<FlatList
						data = { comments }
						renderItem = { ( data ) => this.renderComment( data.item ) }
					/>
				</Card>
			</View>
		)
		
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		flex: 1,
		marginTop: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: 22,
		color: 'white',
		textAlign: 'center',
	},
	divider: {
		backgroundColor: 'red',
	},
});