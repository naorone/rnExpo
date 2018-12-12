import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';

class AppButton extends Component {
  render() {

  	const { action, iconName, iconColor, title, bgColor } = this.props;
  	const { width } = Dimensions.get( 'window' );
    return (	
    	<Button
			onPress = { action }
			buttonStyle = {{
				backgroundColor: bgColor,
				height: 45,
				borderBottomLeftRadius: 30,
				borderBottomRightRadius: 30,
				borderTopLeftRadius: 30,
				borderTopRightRadius: 30,
				borderWidth: 0,
				marginBottom: 5,
				width: width*0.6,
			}}
			title = { title }
			icon = {
				<Icon
					name = { iconName }
					size = { 15 }
					color = { iconColor }
				/>
			}
			text = { title }
			iconRight={true}	
    	/>
      	
    	
    );
  }
}


export default AppButton;