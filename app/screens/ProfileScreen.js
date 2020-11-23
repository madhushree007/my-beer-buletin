import {
  Body,
  Button,

  Content,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { getBeers } from '../apiService';
// import data from '../../data.json';
import Bottom from '../components/Bottom';

function ProfileScreen({ navigation, route }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBeers()
      .then(result => {
        setLists(result.data.beers);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  // useEffect(() => {
  //   setLists(data);
  //   setLoading(false);
  // });
  return (
    <>
      <Content>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          lists.map(item => (
            <List key={item._id}>
              
                <ListItem thumbnail>
                  <Left>
                    <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Details', { id: item._id });
                }}
              >
                    <Thumbnail square source={{ uri: item.beer_label }} />
                    </TouchableOpacity>
                  </Left>
                  <Body>
                    <Text>{item.beerName}</Text>
                    <Text note numberOfLines={1}>
                      {item.beer_slug}
                    </Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              
            </List>
          ))
        )}
      </Content>
      <Bottom />
    </}
export default ProfileScreen;
