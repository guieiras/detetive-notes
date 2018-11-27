import React, { Component } from 'react';
import {
  BlockTitle,
  Button,
  Chip,
  Link,
  List,
  ListItem,
  Navbar,
  NavRight,
  Page,
} from 'framework7-react';
import currentGame from '../../boundaries/currentGame';

export default class GamesCurrentPage extends Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.state = { game: currentGame.fetch() };
  }

  selectItem(item, idx) {
    return () => {
      this.sheet = this.$f7.actions.create({
        grid: true,
        buttons: [this.state.game.players.map((player) => {
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
            onClick: this.pushItem(item, idx, 'owners', player).bind(this)
          }
        }), [
          {
            text: 'Confidencial',
            icon: '<i class="icon material-icons" style="font-size: 48px">fingerprint</i>',
            color: 'green',
            onClick: this.pushItem(item, idx, 'flags', { icon: 'fingerprint', color: 'green' }).bind(this)
          },
          {
            text: 'Dúvida',
            icon: '<i class="icon material-icons" style="font-size: 48px">visibility</i>',
            color: 'yellow',
            onClick: this.pushItem(item, idx, 'flags', { icon: 'visibility', color: 'yellow' }).bind(this)
          },
          {
            text: 'Atenção',
            icon: '<i class="icon material-icons" style="font-size: 48px">warning</i>',
            color: 'red',
            onClick: this.pushItem(item, idx, 'flags', { icon: 'warning', color: 'red' }).bind(this)
          },
        ]]
      });
      this.sheet.on('close', () => { this.sheet.destroy() });
      this.sheet.open();
    }
  }

  pushItem(item, itemIdx, type, value) {
    return () => {
      const { game } = this.state;
      game[item][itemIdx][type].push(value);
      currentGame.save(game);
      this.setState({ game });
    }
  }

  removeItem(item, itemIdx, type, positionIdx) {
    return () => {
      const { game } = this.state;
      game[item][itemIdx][type].splice(positionIdx, 1);
      currentGame.save(game);
      this.setState({ game });
    }
  }

  render() {
    return <Page>
      <Navbar title="Ficha de Suspeitos">
        <NavRight>
          <Link iconMaterial="delete" />
        </NavRight>
      </Navbar>
      <p>{ JSON.stringify(this.state.game) }</p>
      <BlockTitle>Personagens</BlockTitle>
      <List>
        { this.state.game.characters.map((char, idx) => <ListItem key={idx} title={char.name}>
          <div slot="after" style={{ marginRight: '8px' }}>
            { char.flags.map((flag, flagIdx) => <Link style={{ margin: '0 2px' }} iconMaterial={flag.icon} key={flagIdx} color={flag.color} onClick={this.removeItem('characters', idx, 'flags', flagIdx)} />) }
          </div>
          <div slot="after" style={{ marginRight: '8px' }}>
            { char.owners.map((owner, ownerIdx) => <Chip style={{ margin: '0 2px' }} key={ownerIdx} text={owner} deleteable onClick={ this.removeItem('characters', idx, 'owners', ownerIdx) } />) }
          </div>
          <Button slot="after" onClick={this.selectItem('characters', idx)} iconMaterial="flag" />
        </ListItem>) }
      </List>
    </Page>
  }
}
