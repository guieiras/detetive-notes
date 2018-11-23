import React, { Component } from 'react';
import {
  Block,
  BlockTitle,
  List,
  ListItem,
  Navbar,
  Page,
} from 'framework7-react';
import Axios from 'axios';
import config from '../../environment/config'

export default class NewGamePage extends Component {
  constructor(props) {
    super(props);
    this.state = { templates: [] };
  }

  componentDidMount() {
    console.log(config);
    Axios.get(`${config.API_URL}/templates`).then((response) => {
      this.setState({ templates: response.data });
    });
  }

  render() {
    return <Page>
      <Navbar title="Novo Jogo"></Navbar>
      <BlockTitle>Selecione o modelo do jogo</BlockTitle>
      <Block>
        <List>
          { this.state.templates.map(game => <ListItem key={game.id} title={game.title}>
            <img slot="media" src={game.imageUrl} width="44" />
          </ListItem>) }
        </List>
      </Block>
    </Page>
  }
}
