import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import AppButton from './../AppButton';

export default class RestaurantAddButton extends Component {

  render(){
    const { addRestaurant } = this.props;
    return(
      <View style = { styles.buttonContainer }>
        <AppButton
          bgColor = 'rgba(255, 38, 74, 0.9)'
          title = 'Añadir un restaurante'
          action = { addRestaurant }
          iconName = 'plus'
          iconSize = { 30 }
          iconColor = '#fff'
          
        />
      </View>
    )
  }
};

const styles = StyleSheet.create ({
  buttonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    justifyContent: 'center',
    flex: 1,
  }
})
