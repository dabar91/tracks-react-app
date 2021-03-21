import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import SplashScreen from './src/screens/SplashScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import AccountScreen from './src/screens/AccountScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';

import { setNavigator } from './src/navigationRef';
import { FontAwesome } from '@expo/vector-icons';


const trackListFlow = createStackNavigator({
        TrackList: TrackListScreen,
        TrackDetail: TrackDetailScreen
});

trackListFlow.navigationOptions = {
  title: 'Tracks',
  tabBarIcon: <FontAwesome name="th-list" size={20} />  
};

const switchNavigator = createSwitchNavigator({
    splashScreen: SplashScreen,
    loginFlow: createStackNavigator({
      Signin: SigninScreen,
      Signup: SignupScreen
    }),
    mainFlow: createBottomTabNavigator({
      trackListFlow,
      CreateTrack: TrackCreateScreen,
      Account: AccountScreen
    })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App ref={(navigator) => {setNavigator(navigator)}}/>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>

  );
};