import React, { Component } from 'react';
import {
  Block,
  BlockTitle,
  List,
  ListItem,
  Navbar,
  Page,
} from 'framework7-react';

export default class NewGamePage extends Component {
  constructor(props) {
    super(props);
    this.state = { availableGames: [] };
  }
  render() {
    return <Page>
      <Navbar title="Novo Jogo"></Navbar>
      <BlockTitle>Selecione o modelo do jogo</BlockTitle>
      <Block>
        <List>
          { this.state.availableGames.map(game => <ListItem title={game.title} />) }
        </List>
      </Block>
    </Page>
  }
}
