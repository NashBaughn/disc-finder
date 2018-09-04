import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View } from 'react-native';
import SettingsHeader from './settings-header';

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
		return {
			headerTitle: <SettingsHeader navigation={navigation} toggleMap={navigation.getParam('toggleMap')}/>,
		}
	};

  render() {
    return (
    	<View>
    	</View>
    );
  }
}
