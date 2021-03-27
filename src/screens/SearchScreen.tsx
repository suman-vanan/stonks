import React, {useState} from 'react';

import {SafeAreaView} from 'react-native';
import {
  Searchbar,
  List,
  TouchableRipple,
  ActivityIndicator,
} from 'react-native-paper';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import type {RootTabParamList} from '../navigation/RootNavigator';
import type {SearchStackParamList} from '../navigation/SearchStackNavigator';
import axios from 'axios';
import {ALPHA_VANTAGE_API_KEY} from '@env';

type SearchScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<SearchStackParamList, 'Search'>,
  MaterialBottomTabNavigationProp<RootTabParamList>
>;

const SearchScreen = () => {
  const navigation = useNavigation<SearchScreenNavigationProps>();

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResult, setSearchResult] = useState<any | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const onSubmitSearch = async () => {
    setIsError(false);
    setIsLoading(true);
    setSearchResult(null);

    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchQuery}&apikey=${ALPHA_VANTAGE_API_KEY}`,
      );
      if (response.data['Error Message']) {
        setSearchResult(null);
      } else {
        setSearchResult(response.data);
      }
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Searchbar
        placeholder="Search by ticker"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={onSubmitSearch}
      />

      {isLoading && (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        />
      )}

      {searchResult && (
        <List.Section>
          <TouchableRipple
            onPress={() => {
              navigation.push('Details', {symbol: searchResult['Symbol']});
            }}>
            <List.Item
              title={searchResult['Symbol']}
              description={searchResult['Name']}
            />
          </TouchableRipple>
        </List.Section>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
