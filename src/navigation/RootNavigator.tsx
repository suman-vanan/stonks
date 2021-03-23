import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {View} from 'react-native';
import {Headline, Subheading} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Portfolio: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

const HomeScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Headline>Welcome!</Headline>
    <Subheading>This app is under construction</Subheading>
    <Headline>👷🏽‍♂️🚧👷🏻‍♀️</Headline>
  </View>
);

const SearchScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Headline>Search</Headline>
    <Subheading>This feature is under construction</Subheading>
    <Headline>👷🏽‍♂️🚧👷🏻‍♀️</Headline>
  </View>
);

const PortfolioScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Headline>Portfolio</Headline>
    <Subheading>This feature is under construction</Subheading>
    <Headline>👷🏽‍♂️🚧👷🏻‍♀️</Headline>
  </View>
);

const RootNavigator = () => {
  return (
    <NavigationContainer>
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
          name="Search"
          component={SearchScreen}
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
              <MaterialCommunityIcons
                name="baby-face-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
