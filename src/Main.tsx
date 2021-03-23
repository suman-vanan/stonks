import React, {useState} from 'react';
import RootNavigator from './navigation/RootNavigator';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Provider as PaperProvider, Button, TextInput} from 'react-native-paper';

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  return (
    <PaperProvider>
      {isLoggedIn ? (
        <RootNavigator />
      ) : (
        <PhoneSignIn handleLogin={setIsLoggedIn} handleUser={setUser} />
      )}
    </PaperProvider>
  );
};

type PhoneSignInProps = {
  handleLogin: (isLoggedIn: boolean) => void;
  handleUser: (user: FirebaseAuthTypes.User) => void;
};

const PhoneSignIn = ({handleLogin, handleUser}: PhoneSignInProps) => {
  const [phoneNumber, setPhoneNumber] = useState('+65 ');

  // If null, no SMS has been sent
  const [
    confirm,
    setConfirm,
  ] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const [code, setCode] = useState('');

  // Handle the button press
  const signInWithPhoneNumber = async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    try {
      const userCredential = await confirm?.confirm(code);
      const user = userCredential?.user;
      if (user) {
        handleLogin(true);
        handleUser(user);
      }
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
      {confirm ? (
        <>
          <TextInput
            label="OTP Code"
            value={code}
            onChangeText={text => setCode(text)}
          />
          <Button onPress={() => confirmCode()}>Confirm Code</Button>
        </>
      ) : (
        <View style={styles.loginContainer}>
          <TextInput
            mode="outlined"
            label="Phone Number"
            placeholder="Enter your Phone Number"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
          <Button
            mode="contained"
            onPress={() => signInWithPhoneNumber(phoneNumber)}>
            Request SMS OTP
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    margin: 20,
  },
});

export default Main;
