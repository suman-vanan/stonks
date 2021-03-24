import React from 'react';

import {SafeAreaView} from 'react-native';
import {List, TouchableRipple} from 'react-native-paper';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import type {RootTabParamList} from '../navigation/RootNavigator';
import type {SearchStackParamList} from '../navigation/SearchStackNavigator';
import {dailySample} from '../constants/daily';

type SearchScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<SearchStackParamList, 'Search'>,
  MaterialBottomTabNavigationProp<RootTabParamList>
>;

const SearchScreen = () => {
  const navigation = useNavigation<SearchScreenNavigationProps>();

  return (
    <SafeAreaView style={{flex: 1}}>
      <List.Section>
        {/* sample financial instrument */}
        <TouchableRipple
          onPress={() => {
            navigation.push('Details', {symbol: 'IBM'});
          }}>
          <List.Item title="IBM" description="IBM" />
        </TouchableRipple>
      </List.Section>
    </SafeAreaView>
  );
};

export default SearchScreen;
