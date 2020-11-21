import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native';

function HomeScreen ({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/bg.jpg')}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile', { name: 'ggg' });
        }}
      >
        <View style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#2F4858',
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
});
export default HomeScreen;
