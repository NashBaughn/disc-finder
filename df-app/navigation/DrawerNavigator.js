import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import HomeScreen from '../features/home/containers';
import SettingsScreen from '../features/settings/containers';
import MapScreen from '../features/map/containers';
import NewDiscScreen from '../features/newdisc/containers';

const HomeStack = createStackNavigator({
	Home: HomeScreen,
});

HomeStack.navigationOptions = {
	title: "Home",
}

const SettingsStack = createStackNavigator({
	Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
	title: "Settings",
}

const MapStack = createStackNavigator({
	MapView: MapScreen,
	NewDisc: NewDiscScreen,
});

MapStack.navigationOptions = {
	title: "Map",
}

export default createDrawerNavigator(
	{
		MapStack,
		HomeStack,
		SettingsStack,
	},
);

