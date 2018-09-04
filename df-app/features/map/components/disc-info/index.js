import { 
	Button, 
	StyleSheet, 
	TouchableOpacity, 
	Text,
	Switch 
} from 'react-native';
import React from 'react';
import {
	Right,
	Left,
	Icon,
	View,
	} from 'native-base';

export default class DiscInfo extends React.Component {
	handlePress() {
		console.log(this.props)
		this.props.toggleModal(false);
	}

	render() {
		return (
			<View style={styles.modalContent}>
	      <Text>HOW</Text>
	      <TouchableOpacity onPress={() => this.handlePress()}>
		      <View style={styles.button}>
		        <Text>Close</Text>
		      </View>
		    </TouchableOpacity>
	    </View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'lightblue',
		padding: 12,
		margin: 16,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)',
	},
});