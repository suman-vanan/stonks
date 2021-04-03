import 'react-native-gesture-handler/jestSetup';

// See: https://reactnavigation.org/docs/testing

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// RN Firebase stuff
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter'); // See: https://github.com/invertase/react-native-firebase/issues/4081
