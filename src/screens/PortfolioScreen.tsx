import React from 'react';

import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import {RootTabParamList} from '../navigation/RootNavigator';
import {View} from 'react-native';
import {Headline, Subheading} from 'react-native-paper';

type PortfolioScreenProps = MaterialBottomTabScreenProps<
  RootTabParamList,
  'Portfolio'
>;

const PortfolioScreen = ({route, navigation}: PortfolioScreenProps) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Headline>Portfolio</Headline>
    <Subheading>This feature is under construction</Subheading>
    <Headline>👷🏽‍♂️🚧👷🏻‍♀️</Headline>
  </View>
);

export default PortfolioScreen;
