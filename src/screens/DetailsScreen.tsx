import React from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {SearchStackParamList} from '../navigation/SearchStackNavigator';
import {SafeAreaView} from 'react-native';
import {Headline, Subheading} from 'react-native-paper';

type DetailsScreenProps = StackScreenProps<SearchStackParamList, 'Details'>;

const DetailsScreen = ({route, navigation}: DetailsScreenProps) => {
  const {symbol} = route.params;

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Headline>Financial Instrument Symbol: {symbol}</Headline>
      <Subheading>This feature is under construction</Subheading>
      <Headline>👷🏽‍♂️🚧👷🏻‍♀️</Headline>
    </SafeAreaView>
  );
};

export default DetailsScreen;
