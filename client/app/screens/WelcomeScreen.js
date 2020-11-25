import * as Google from 'expo-google-app-auth';
import { Button, Form, Icon, Input, Item, Text } from 'native-base';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
function WelcomeScreen({ navigation }) {
  const [ signedIn, setSignedIn] = useState(false);
  const [ userName, setUsername] = useState('');
  const [ photoURL, setPhotoURL] = useState('');

  async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: '125836658126-6cu0d8ev7a8fgafoo0bacp420ufnjjev.apps.googleusercontent.com',
      iosClientId: '125836658126-ugma6ltitouscgu0flpbabp3qocc6ava.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log(result);
      setSignedIn(true);
      setUsername(result.user.name);
      setPhotoURL(result.user.photoUrl);
      if(signedIn) {
      navigation.navigate('Login', {signedIn, userName, photoURL});
      }
      // return result.accessToken;
    } else {
      console.log('cancelled');
    }
  } catch (e) {
    console.log('Error', e)
  }
}

function handleLogin() {
  signInWithGoogleAsync();
}

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/bg.jpg')}
    >
      <View style={{ marginTop: 40 }}>
        <Text style={styles.heading}>Beer</Text>
        <Text style={styles.heading}>Bulletin</Text>
      </View>
      <View style={{ width: 300, alignSelf: 'center', paddingBottom: 40 }}>
        <Form>
            <Item inlineLabel>
              <Icon active name='person' />
              <Input style={styles.fontStyle} />
            </Item>
            <Item inlineLabel last>
              <Icon active name='lock' />
              <Input style={styles.fontStyle} />
            </Item>
            <Button
              block
              onPress={() => {
                navigation.navigate('Home');
              }}
              style={{
                backgroundColor: '#000',
                marginTop: 30,
              }}
            >
              <Text style={{ color: '#FFF', fontWeight: '600' }}>Login</Text>
            </Button>
            <Button
              block
              onPress={handleLogin}
              style={{
                backgroundColor: '#000',
                marginTop: 10,
              }}
            >
              <Text style={{ color: '#FFF', fontWeight: '600' }}>Login with Google</Text>
            </Button>
          </Form>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  heading: {
    alignSelf: 'center',
    fontSize: 50,
    color: '#FFF',
    fontWeight: '600',
  },
  loginButton: {
    width: '100',
    height: 70,
    backgroundColor: '#FFF',
    paddingBottom: 100,
  },
  RegisterButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#33658A',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonMiddle: {
    display: 'flex',
    alignSelf: 'center',
    marginBottom: 100,
  },
  fontStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  labelStyle: {
    color: '#FFF',
  }
});
export default WelcomeScreen;
