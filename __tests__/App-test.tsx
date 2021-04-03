/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {beforeEach, it, jest} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

beforeEach(() => {
  jest.useFakeTimers(); // See: https://stackoverflow.com/questions/50793885/referenceerror-you-are-trying-to-import-a-file-after-the-jest-environment-has
});

it('renders correctly', () => {
  renderer.create(<App />);
});
