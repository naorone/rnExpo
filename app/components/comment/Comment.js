import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Comment extends Component {
	render() {
		return( 
			<View style = { styles.commentEmptyView }>
				<Text style = { styles.commentEmptyText }>{ this.props.commentText }</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	commentEmptyView: {
		justifyContent: 'center',
		flex: 1,
		marginTop: 10,
		marginBottom: 10,
	},
	commentEmptyText: {
		backgroundColor: 'grey',
		color: 'white',
		textAlign: 'center',
		padding: 20,
	}
});