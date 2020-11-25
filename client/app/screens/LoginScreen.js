import {
  Button,
  Container,
  Content,
  Form,
  Text,

  Thumbnail,

  View
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

function LoginScreen({ navigation, route }) {
  console.log(route.params);
  return (
    <Container style={{ backgroundColor: '#fda516' }}>
      <Content>
        <View style={{ width: 300, alignSelf: 'center', paddingTop: 80 }}>
          <Text style={{textAlign: 'center', fontSize: 20, color: '#FFF', fontWeight: '600', paddingBottom: 20 }}> Welcome {route.params.userName}</Text>
          <Thumbnail large source={{uri: route.params.photoURL}} style={{ alignSelf: 'center'}} />
          <Form>
            <Button
              block
              onPress={() => {
                navigation.navigate('Home');
              }}
              style={{
                backgroundColor: '#FFF',
                marginTop: 30,
              }}
            >
              <Text style={{ color: '#fda516', fontWeight: '600' }}>Let's explore BEERS !!</Text>
            </Button>
          </Form>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  fontStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default LoginScreen;
