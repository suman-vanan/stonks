import React, {useState} from 'react';

import {SafeAreaView} from 'react-native';
import {
  Searchbar,
  List,
  TouchableRipple,
  ActivityIndicator,
} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
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

  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const onSubmitSearch = async () => {
    setIsError(false);
    setIsLoading(true);
    setSearchResults(null);

    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${ALPHA_VANTAGE_API_KEY}`,
      );
      if (response.data['Error Message']) {
        setSearchResults(null);
      } else {
        setSearchResults(response.data['bestMatches']);
      }
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Searchbar
        placeholder="Search for financial instruments"
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

      {searchResults && (
        <ScrollView>
          <List.Section>
            {searchResults.map(result => (
              <TouchableRipple
                onPress={() => {
                  navigation.push('Details', {symbol: result['1. symbol']});
                }}
                key={result['1. symbol']}>
                <List.Item
                  title={result['1. symbol']}
                  description={`${result['2. name']}, ${result['3. type']}, ${result['4. region']}`}
                />
              </TouchableRipple>
            ))}
          </List.Section>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
