import React, { Component } from 'react';
import {
  Block,
  BlockTitle,
  List,
  ListItem,
  Navbar,
  Page,
} from 'framework7-react';
import currentGame from '../../boundaries/currentGame';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.state = { games: [] };
  }

  onLoad() {
    if (currentGame.isPresent()) {
      this.$f7router.navigate('/games/current');
    }
  }

  render() {
    return <Page onPageAfterIn={this.onLoad}>
      <Navbar title="Detetive - Ficha de Palpites"></Navbar>
      <Block strong>
        <p>Bem-vindo à Ficha de Palpites. Você pode iniciar um novo jogo ou carregar uma configuração existente.</p>
      </Block>
      <BlockTitle>Iniciar novo Jogo</BlockTitle>
      <Block>
        <List>
          <ListItem title="Novo Jogo" link="/games/new"></ListItem>
          <ListItem title="Carregar Jogo" link="/games/load"></ListItem>
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
