import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';


const { height } = Dimensions.get('window'); 

class Preloader extends Component {
  render() {
    return (
      <View style = { [styles.preloader] }>
      	<ActivityIndicator style = {{ height: 80 }} size = 'large' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	preloader: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: height,
		backgroundColor: '#242935',
	}
});


export default Preloader;