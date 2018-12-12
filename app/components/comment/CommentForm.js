import React, { Component } from 'react';
import AppButton from '../AppButton';
import { options, Comment } from '../../forms/comment';
import { Card } from 'react-native-elements';
import { View, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import Toast from 'react-native-simple-toast'; 
import t from 'tcomb-form-native';

const Form = t.form.Form;

export default class CommentForm extends Component {
	constructor() {
	  super();
	
	  this.state = {
			comment: {
				comment: '',
				rating: 1,
			}
		};
	}

	addComment () {
		const validate = this.refs.form.getValue();
		
		if( validate ){
			let data = {};
			const comment = Object.assign( {}, validate);
			comment.restaurant_id = this.props.restaurantId;
			let ref = firebase.database().ref().child('comments');
			const key = ref.push().key;
			data[`${this.props.restaurantId}/${key}`] = comment;
			ref.update(data).then(() => {

				this.setState( ( prevState, props ) => {
					return {
						comment: {
							comment: '',
							rating: 1,
						}
					}
				});
				Toast.showWithGravity( 'Comentario publicado', Toast.LONG, Toast.TOP );
			});
		}
	}

	onChange ( comment ) {
		this.setState({ comment });
	}

	render () {
		const { comment } = this.state;
		return (
			<KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={80}>
			
			<Card 
				title = 'Danos tu opinión'
			>
				<View>
					<Form
						ref = "form"
						type = { Comment }
						options = { options }
						onChange = { ( data ) => this.onChange( data ) }
						value = { comment }
					/>
				</View>
				<View style = {{ alignItems: 'center' }}>
					<AppButton
						bgColor = 'rgba(255, 38, 74, 0.9)'
						title = 'Comentar'
						action = { this.addComment.bind( this ) }
						iconName = 'comments'
						iconSize = { 30 }
						iconColor = '#fff'
					/>
				</View>

			</Card>
			
			</KeyboardAvoidingView>
		)
	}


}

