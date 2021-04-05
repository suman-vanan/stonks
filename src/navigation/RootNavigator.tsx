import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {View} from 'react-native';
import {Headline, Subheading, DefaultTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchStackNavigator from './SearchStackNavigator';
import PortfolioScreen from '../screens/PortfolioScreen';
import AccountScreen from '../screens/AccountScreen';

export type RootTabParamList = {
  Home: undefined;
  SearchStack: undefined;
  Portfolio: undefined;
  Account: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

const HomeScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Headline>Welcome!</Headline>
    <Subheading>This app is under construction</Subheading>
    <Headline>👷🏽‍♂️🚧👷🏻‍♀️</Headline>
  </View>
);

const RootNavigator = () => {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="SearchStack"
          component={SearchStackNavigator}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="text-search"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Portfolio"
          component={PortfolioScreen}
          options={{
            tabBarLabel: 'Portfolio',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="finance" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarLabel: 'My Account',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
