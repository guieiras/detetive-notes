import React, { Component } from 'react';
import {
  Block,
  BlockTitle,
  List,
  ListItem,
  Navbar,
  Page,
} from 'framework7-react';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }
  render() {
    return <Page>
      <Navbar title="Detetive - Ficha de Palpites"></Navbar>
      <Block strong>
        <p>Bem-vindo à Ficha de Palpites. Você pode iniciar um novo jogo ou carregar uma configuração existente.</p>
      </Block>
      <BlockTitle>Iniciar novo Jogo</BlockTitle>
      <Block>
        <List>
          <ListItem title="Novo Jogo" link="/jogos/novo"></ListItem>
          <ListItem title="Carregar Jogo" link="/jogos/carregar"></ListItem>
        </List>
      </Block>
      <BlockTitle>Meus Jogos</BlockTitle>
      <Block>
        <List>
          {
            this.state.games.length === 0 ?
              <ListItem title="Nenhum jogo encontrado" /> :
              this.state.games.map((game) => <ListItem title={game.title} />)
          }
        </List>
      </Block>

    </Page>
  }
}
