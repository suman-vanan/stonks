import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import {RootTabParamList} from '../navigation/RootNavigator';

import SearchScreen from '../screens/SearchScreen';
import DetailsScreen from '../screens/DetailsScreen';

export type SearchStackParamList = {
  Search: NavigatorScreenParams<RootTabParamList>;
  Details: {symbol: string};
};

const SearchStack = createStackNavigator<SearchStackParamList>();

const SearchStackNavigator = () => (
  <SearchStack.Navigator initialRouteName="Search">
    <SearchStack.Screen name="Search" component={SearchScreen} />
    <SearchStack.Screen name="Details" component={DetailsScreen} />
  </SearchStack.Navigator>
);

export default SearchStackNavigator;
