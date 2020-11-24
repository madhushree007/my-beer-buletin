import { Card, CardItem, Container, Content, Text } from 'native-base';
import React from 'react';
import Bottom from '../components/Bottom';
function DetailsScreen({ navigation, route }) {
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Text>Test</Text>
          </CardItem>
        </Card>
      </Content>
      <Bottom />
    </Container>
  );
}
export default DetailsScreen;
