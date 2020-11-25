import { Button, Container, Content, Form, Text, Textarea } from 'native-base';
import React from 'react';
import { postBeerReview } from '../apiService';
import Bottom from '../components/Bottom';
function DetailsScreen({ navigation, route }) {
  const [value, onChangeText] = React.useState('Placeholder');
  function handleSubmit(){
    postBeerReview({
      bid: route.params.bid,
      username: route.params.username,
      body: value
    })
    .then(data => console.log(data));
    navigation.navigate('Details', { id: route.params.bid});
    onChangeText('');
  }
  return (
    <Container>
      <Content padder>

            <Text style={{ alignSelf: 'center', fontWeight: '600', paddingBottom: 20}}>Post a review on </Text>
 
            <Form>
                <Textarea rowSpan={5} bordered placeholder="Textarea" onChangeText={text => onChangeText(text)} value={value} />
              <Button onPress={handleSubmit}style={{ alignSelf: 'center', marginTop: 20}}>
                <Text>Submit</Text>
              </Button>
            </Form>

      </Content>
      <Bottom />
    </Container>
  );
}
export default DetailsScreen;
