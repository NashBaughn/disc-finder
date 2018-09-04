import React from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text, ScrollView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import t from 'tcomb-form-native';
import { Camera, Permissions } from 'expo';
import { NewDiscRoute } from '../../../constants/api-routes';

const Form = t.form.Form;

const discForm = t.struct({
	disc_brand: t.String,
	disc_type: t.String,
	hole: t.String,
	latitude: t.Number,
	longitude: t.Number,
	date: t.Date
});

export default class NewDiscScreen extends React.Component {
	state = {
		isLoading: false,
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
	};

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	handleSubmit = () => {
		console.log("- - -")
		const value = this._form.getValue(); 
    if(value != null) this.asyncAddNewDisc(value)
	}

	asyncAddNewDisc(value) {
		return fetch(NewDiscRoute, {
		  method: 'POST',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    hole:value.hole,
				disctype:value.type,
				discbrand:value.brand_name,
				founddate:value.date,
				latitude: value.latitude,
				longitude: value.longitude
		  }),
		}).then((response) => response.json())
	    .then((responseJson) => {
	      return responseJson.movies;
	    })
	    .catch((error) => {
	      console.error(error);
		});
	}

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
			return (
				<ScrollView>
				<View style={styles.container}>
					<Camera style={{ flex: 1 }} type={this.state.type}>
						<View
							style={{
								flex: 1,
								backgroundColor: 'transparent',
								flexDirection: 'row',
							}}>
							<TouchableOpacity
								style={{
									flex: 0.1,
									alignSelf: 'flex-end',
									alignItems: 'center',
								}}
								onPress={() => {
									this.setState({
										type: this.state.type === Camera.Constants.Type.back
											? Camera.Constants.Type.front
											: Camera.Constants.Type.back,
									});
								}}>
								<Text
									style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
									{' '}Flip{' '}
								</Text>
							</TouchableOpacity>
						</View>
					</Camera>
					<Form type={discForm} 
								ref={c => this._form = c}
					/> {/* Notice the addition of the Form component */}
					<TouchableOpacity onPress={this.handleSubmit}>
						<View style={styles.button}>
							<Text>Filter</Text>
						</View>
					</TouchableOpacity>
				</View>

				</ScrollView>
			);
		}
	}
}



const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginTop: 50,
		padding: 20,
		backgroundColor: '#ffffff',
	},
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