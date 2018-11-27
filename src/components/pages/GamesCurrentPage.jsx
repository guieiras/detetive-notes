import React, { Component } from 'react';
import { Page, BlockTitle, Button, List, ListItem, Icon } from 'framework7-react';
import currentGame from '../../boundaries/currentGame';

export default class GamesNewPage extends Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.state = { game: currentGame.fetch() };
  }

  selectItem(item, idx) {
    return () => {
      this.sheet = this.$f7.actions.create({
        grid: true,
        buttons: this.state.game.players.map((player) => {
          return { 
            text: player, 
            icon: `<span style="width: 45px; 
                                height: 45px; 
                                line-height: 47px; 
                                vertical-align: middle; 
                                font-size: 26px;" 
                          class="badge color-blue">
                            ${player.substring(0, 1)}
                    </span>`,
            onClick() { alert(player); }
          }
        })
      });
      this.sheet.on('close', () => { this.sheet.destroy() });
      this.sheet.open();
    }
  }

  render() {
    return <Page>
      <p>{ JSON.stringify(this.state.game) }</p>
      <BlockTitle>Personagens</BlockTitle>
      <List>
        { this.state.game.characters.map((char, idx) => <ListItem key={idx} title={char.name}>
          <Button slot="after" onClick={this.selectItem('character', idx)}>
            { char.owner.substring(0, 2) || <Icon material="person_add" /> }
          </Button>

        </ListItem>) }
      </List>
    </Page>
  }
}
