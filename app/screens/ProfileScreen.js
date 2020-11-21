import React, { useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import data from '../../data.json';

function ProfileScreen ({ navigation, route }) {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    setLists(data)
  })
  return (
    <Container>
      <Content>
        {lists.map(item => (
          <List key={item._id}>
            <ListItem thumbnail>
              <Left>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Details', { id: item._id });
                  }}
                ><Thumbnail square source={{ uri: item.beer_label }} />
                </TouchableOpacity>
              </Left>
              <Body>
                <Text>{item.beerName}</Text>
                <Text note numberOfLines={1}>{item.beer_slug}</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>

          </List>
          
        ))}

      </Content>
    </Container>
  
  );
}
export default ProfileScreen;
