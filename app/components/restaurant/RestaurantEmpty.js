import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class RestaurantEmpty extends Component {

  render () {
    const { text } = this.props;
    return(
      <View style = { styles.restaurantEmptyView }>
        <Text style = { styles.restaurantEmptyText }>
          { text }
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  restaurantEmptyView: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  restaurantEmptyText: {
      backgroundColor: 'rgba(128, 35, 60, 0.7)',
      color: 'white',
      textAlign: 'center',
      padding: 20,
      borderRadius: 25,
  }
})
