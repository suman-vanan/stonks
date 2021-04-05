import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SearchScreen from '../SearchScreen';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {ALPHA_VANTAGE_API_KEY} from '@env';
import {expect, it, beforeEach} from '@jest/globals';

jest.mock('axios');

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

beforeEach(() => {
  // @ts-ignore
  useNavigation.mockReset();
});

it('renders default elements', () => {
  const {getByPlaceholderText, getAllByA11yRole} = render(<SearchScreen />);

  getByPlaceholderText('Search for financial instruments');

  expect(getAllByA11yRole('button').length).toBe(2); // 'Search' and 'Clear' buttons are present
});

it('allows user to search for financial instruments', async () => {
  const data = JSON.parse(`{
    "data" : {
      "bestMatches": [
        {
            "1. symbol": "StonkA",
            "2. name": "International Business Machines Corp",
            "3. type": "Equity",
            "4. region": "United States",
            "5. marketOpen": "09:30",
            "6. marketClose": "16:00",
            "7. timezone": "UTC-04",
            "8. currency": "USD",
            "9. matchScore": "1.0000"
        },
        {
            "1. symbol": "StonkB",
            "2. name": "iShares iBonds Dec 2021 Term Muni Bond ETF",
            "3. type": "ETF",
            "4. region": "United States",
            "5. marketOpen": "09:30",
            "6. marketClose": "16:00",
            "7. timezone": "UTC-04",
            "8. currency": "USD",
            "9. matchScore": "0.8571"
        }
      ]
    }
  }`);

  axios.get.mockImplementationOnce(() => Promise.resolve(data));

  const {getByPlaceholderText, getAllByA11yRole, findByText, debug} = render(
    <SearchScreen />,
  );

  const CHANGE_TEXT = 'stonk';

  fireEvent.changeText(
    getByPlaceholderText('Search for financial instruments'),
    CHANGE_TEXT,
  );
  fireEvent.press(getAllByA11yRole('button')[0]);

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${CHANGE_TEXT}&apikey=${ALPHA_VANTAGE_API_KEY}`,
  );

  await expect(findByText('StonkA')).resolves.toBeTruthy();
  await expect(findByText('StonkB')).resolves.toBeTruthy();
});
