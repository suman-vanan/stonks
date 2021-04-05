import React from 'react';

import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import {RootTabParamList} from '../navigation/RootNavigator';
import {View} from 'react-native';
import {Headline, Subheading} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

type AccountScreenProps = MaterialBottomTabScreenProps<
  RootTabParamList,
  'Account'
>;

const AccountScreen = ({route, navigation}: AccountScreenProps) => {
  const user = auth().currentUser;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Headline>My Account</Headline>
      <Subheading>User ID: {user?.uid}</Subheading>
      <Subheading>Phone Number: {user?.phoneNumber}</Subheading>
    </View>
  );
};

export default AccountScreen;
