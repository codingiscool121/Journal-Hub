import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WriteStoryScreen from './screens/WriteStoryScreen';
import ReadStoryScreen from './screens/ReadStoryScreen';
import Login from './screens/Login';
export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<AppContainer />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 35,
		backgroundColor: '#fff',
	},
});

const BottomTab = createBottomTabNavigator(
	{
		Write: { screen: WriteStoryScreen },
		Read: { screen: ReadStoryScreen },
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: () => {
				const routeName = navigation.state.routeName;
				if (routeName === 'Write') {
					return (
						<Image
							source={require('./assets/write.png')}
							style={{ width: 40, height: 40 }}
						/>
					);
				} else if (routeName === 'Read') {
					return (
						<Image
							source={require('./assets/read.png')}
							style={{ width: 40, height: 40 }}
						/>
					);
				}
			},
		}),
	}
);

const SwitchNavigator=createSwitchNavigator({
	login:{screen:Login},
	BottomTab:{screen:BottomTab}
})
const AppContainer = createAppContainer(SwitchNavigator);
