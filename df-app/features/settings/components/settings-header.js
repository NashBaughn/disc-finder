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

export default class LogoTitle extends React.Component {
	handleOpen() {
		console.log("opening modal")
		this.props.showModal(true);
	}

	state = {
		activeSwitch: null
	};

	render() {
		return (
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={{width: 55, height: 40, left: 15}}>
					<Icon
						active
						name="menu"
						onPress={() => this.props.navigation.openDrawer()}
					/>
				</View>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	navBar: {
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'blue',
	},
	leftContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		backgroundColor: 'green'
	},
	rightContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: 'red',
	},
	rightIcon: {
		height: 10,
		width: 10,
	}
});