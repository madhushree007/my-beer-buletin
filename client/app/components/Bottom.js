import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import React from 'react';
export default function Top() {
  return (
    <Footer>
      <FooterTab>
        <Button active vertical>
          <Icon name="home" />
          <Text>Home</Text>
        </Button>
        <Button vertical>
          <Icon name="chatboxes" />
          <Text>Reviews</Text>
        </Button>
        <Button vertical>
          <Icon active name="person" />
          <Text>Profile</Text>
        </Button>
        <Button vertical>
          <Icon name="person" />
          <Text>Contact</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}
