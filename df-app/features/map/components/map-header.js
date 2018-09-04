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

//import MultiSwitch from 'rn-slider-switch';
import MultiSwitch from './mySwitch/MultiSwitch';

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

				<MultiSwitch
					currentStatus={'Open'}
					disableScroll={value => {
							console.log('scrollEnabled', value);
							// this.scrollView.setNativeProps({
							//     scrollEnabled: value
							// });
					}}
					isParentScrollEnabled={false}
					onStatusChanged={val => {this.props.toggleMap(val)}}
					styl/>

				<View style={{width: 50, height: 40, left: 25}}>
					<Icon
						active
						name="add"
						onPress={() => this.props.navigation.navigate("NewDisc")}
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