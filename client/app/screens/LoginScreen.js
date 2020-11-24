import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text,
  View
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
function DetailsScreen({ navigation, route }) {
  return (
    <Container style={{ backgroundColor: '#fda516' }}>
      <Content>
        <View style={{ width: 300, alignSelf: 'center', paddingTop: 80 }}>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input style={styles.fontStyle} />
            </Item>
            <Item stackedLabel last style={{ marginTop: 20 }}>
              <Label>Password</Label>
              <Input style={styles.fontStyle} />
            </Item>
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
              <Text style={{ color: '#fda516', fontWeight: '600' }}>Login</Text>
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

export default DetailsScreen;
