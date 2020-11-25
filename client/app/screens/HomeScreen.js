import {
  Body,
  Button,
  Container,
  Content, Form, Header, Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,

  Text,
  Thumbnail
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getBeers, searchBeerByName } from '../apiService';
// import data from '../../data.json';
import Bottom from '../components/Bottom';
function HomeScreen({ navigation, route }) {
  const [lists, setLists] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    searchBeerByName(searchText)
      .then(result => setLists(result.data.beers))
      .catch(err => console.error(err));
    setLoading(false);
    setSearchText('');
  }
  
  useEffect(() => {
    getBeers()
      .then(result => {
        setLists(result.data.beers);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <Container>
      <Content>
        <Form>
          <Header searchBar rounded>
            
          <Item>
            <Icon name="ios-search" />
            <Input 
              placeholder="Search"
              value={searchText} 
              onChangeText={text => setSearchText(text)} />
          </Item>
          <Button transparent onPress={handleSubmit}>
            <Text>Search</Text>
          </Button>
          
        </Header>
    </Form>    
      

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          lists.map(item => (
            <List key={item._id}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Details', { id: item.bid });
                }}
              >
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={{ uri: item.beer_label }} />
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
              </TouchableOpacity>
            </List>
          ))
        )}
      </Content>
      <Bottom />
    </Container>
  );
}
export default HomeScreen;
