import { Button, Icon, Text } from 'native-base';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/bg.jpg')}
    >
      <View style={{ marginTop: 40 }}>
        <Text style={styles.heading}>Beer</Text>
        <Text style={styles.heading}>Bulletin</Text>
      </View>
      <View style={styles.buttonMiddle}>
        <Button
          primary
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Icon name="beer" />
          <Text>Enter</Text>
        </Button>
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
});
export default WelcomeScreen;
