import React, { Component } from 'react';
import {
	Animated,
	Dimensions,
	PanResponder,
	View,
	Platform
} from 'react-native';
import Button from './Button';
import styles from './styles';
const { width } = Dimensions.get('window');
import PropTypes from 'prop-types';

export default class MultiSwitch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isComponentReady: false,
			position: new Animated.Value(0),
			posValue: 0,
			selectedPosition: 0,
			duration: 100,
			mainWidth: width - 60,
			switcherWidth: width / 2.7,
			thresholdDistance: width - 8 - width / 2.4
		};
		this.isParentScrollDisabled = false;
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onStartShouldSetPanResponderCapture: () => true,
			onMoveShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponderCapture: () => true,

			onPanResponderGrant: () => {
				// disable parent scroll if slider is inside a scrollview
				if (!this.isParentScrollDisabled) {
					this.props.disableScroll(false);
					this.isParentScrollDisabled = true;
				}
			},

			onPanResponderMove: (evt, gestureState) => {
				let finalValue = gestureState.dx + this.state.posValue;
				if (
					finalValue >= 0 &&
					finalValue <= this.state.thresholdDistance
				)
					this.state.position.setValue(
						this.state.posValue + gestureState.dx
					);
			},

			onPanResponderTerminationRequest: () => true,

			onPanResponderRelease: (evt, gestureState) => {
				let finalValue = gestureState.dx + this.state.posValue;
				this.isParentScrollDisabled = false;
				this.props.disableScroll(true);
				if (gestureState.dx > 0) {
					if (finalValue >= 0 && finalValue <= 15) {
						this.notStartedSelected();
					} else if (finalValue >= 15 && finalValue <= 60.5) {
						this.inProgressSelected();
					} else if (finalValue >= 60.5 && finalValue <= 140) {
						if (gestureState.dx > 0) {
							this.completeSelected();
						} else {
							this.inProgressSelected();
						}
					}
				} else {
					if (finalValue >= 39 && finalValue <= 87.5) {
						this.inProgressSelected();
					} else if (finalValue >= -50 && finalValue <= 39) {
						this.notStartedSelected();
					} else {
						this.completeSelected();
					}
				}
			},

			onPanResponderTerminate: () => {},
			onShouldBlockNativeResponder: () => {
				// Returns whether this component should block native components from becoming the JS
				// responder. Returns true by default. Is currently only supported on android.
				return true;
			}
		});
	}

	notStartedSelected = () => {
		Animated.timing(this.state.position, {
			toValue: Platform.OS === 'ios' ? -2 : 0,
			duration: this.state.duration
		}).start();
		setTimeout(() => {
			this.setState({
				posValue: Platform.OS === 'ios' ? -2 : 0,
				selectedPosition: 0
			});
		}, 100);
		this.props.onStatusChanged('LOST');
		// if (this.state.isComponentReady) this.props.onStatusChanged('Open');
	};

	inProgressSelected = () => {
		Animated.timing(this.state.position, {
			toValue: this.state.mainWidth / 2 - this.state.switcherWidth / 2,
			duration: this.state.duration
		}).start();
		setTimeout(() => {
			this.setState({
				posValue:
					this.state.mainWidth / 2 - this.state.switcherWidth / 2,
				selectedPosition: 1
			});
		}, 100);
		this.props.onStatusChanged('FOUND');
		// if (this.state.isComponentReady) this.props.onStatusChanged('In Progress');
	};

	completeSelected = () => {
		Animated.timing(this.state.position, {
			toValue:
				Platform.OS === 'ios'
					? this.state.mainWidth - this.state.switcherWidth
					: this.state.mainWidth - this.state.switcherWidth - 2,
			duration: this.state.duration
		}).start();
		setTimeout(() => {
			this.setState({
				posValue:
					Platform.OS === 'ios'
						? this.state.mainWidth - this.state.switcherWidth
						: this.state.mainWidth - this.state.switcherWidth - 2,
				selectedPosition: 2
			});
		}, 100);
		this.props.onStatusChanged('BOTH');
	  //   if (this.state.isComponentReady){
	  //   	this.props.onStatusChanged('Complete');
			// }
	};

	getStatus = () => {
		switch (this.state.selectedPosition) {
		case 0:
			return 'LOST';
		case 1:
			return 'FOUND';
		case 2:
			return 'BOTH';
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<Button type="LOST" onPress={this.notStartedSelected} />
				<Button type="FOUND" onPress={this.inProgressSelected} />
				<Button type="BOTH" onPress={this.completeSelected} />
				<Animated.View
					{...this._panResponder.panHandlers}
					style={[
						styles.switcher,
						{
							transform: [{ translateX: this.state.position }]
						}
					]}
				>
					<Button type={this.getStatus()} active={true} />
				</Animated.View>
			</View>
		);
	}
}

MultiSwitch.propTypes = {
	disableScroll: PropTypes.func,
	onStatusChanged: PropTypes.func
};
