import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import DetailsScreen from './app/screens/DetailsScreen';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import PostReview from './app/screens/PostReview';
import WelcomeScreen from './app/screens/WelcomeScreen';

// Andriod ID = 125836658126-6cu0d8ev7a8fgafoo0bacp420ufnjjev.apps.googleusercontent.com
// Ios id = 125836658126-ugma6ltitouscgu0flpbabp3qocc6ava.apps.googleusercontent.com

const Stack = createStackNavigator();

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const getFonts = async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
    };
    getFonts();
    setIsReady(true);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="PostReview" component={PostReview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
