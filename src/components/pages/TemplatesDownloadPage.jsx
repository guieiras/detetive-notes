import React, { Component } from 'react';
import {
  Block,
  BlockTitle,
  List,
  ListItem,
  Navbar,
  Page,
} from 'framework7-react';

export default class TemplatesDownloadPage extends Component {
  constructor(props) {
    super(props);
    this.state = { templates: [] };
  }

  render() {
    return <Page>
      <Navbar backLink="Voltar" title="Baixar Templates"></Navbar>
      <BlockTitle>Templates Online</BlockTitle>
      <Block>
        <List>
          { this.state.templates.map(game => <ListItem key={game.id} title={game.title}>
            <img slot="media" alt={game.title} src={game.imageUrl} width="44" />
          </ListItem>) }
        </List>
      </Block>
    </Page>
  }
}
