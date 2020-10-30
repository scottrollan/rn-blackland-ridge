import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import DirectoryScreen from './src/screens/DirectoryScreen';
import DiscussionScreen from './src/screens/DiscussionScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import { UserProvider } from './src/context/UserContext';

const navigator = createStackNavigator(
  {
    Loading: LoadingScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    Directory: DirectoryScreen,
    Discussion: DiscussionScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Blackland Ridge',
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};
