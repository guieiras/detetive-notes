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
  Popover,
} from 'framework7-react';
import QRCode from 'qrcode-generator';
import currentGame from '../../boundaries/currentGame';

export default class GamesCurrentPage extends Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.showQrCode = this.showQrCode.bind(this);
    this.container = React.createRef();
    this.state = { game: currentGame.fetch() };
  }

  exitGame() {
    this.$f7.dialog.confirm(
      'A ficha atual será apagada. Não é possível desfazer essa ação.', 
      'Deseja sair?',
      () => { 
        currentGame.destroy();
        this.$f7router.navigate('/'); 
      })
  }

  showQrCode() {
    const qrcode = QRCode(0, 'L');
    qrcode.addData(currentGame.toEmpty());
    qrcode.make();
    this.container.current.innerHTML = qrcode.createImgTag();
    const img = this.container.current.querySelector('img');
    img.width = 240
    img.height = 240

  }

  selectItem(item, idx) {
    return () => {
      this.sheet = this.$f7.actions.create({
        grid: true,
        buttons: [this.state.game.players.map((player) => {
          return {
            text: player,
            icon: `<span style="width: 48px;
                                height: 48px;
                                line-height: 47px;
                                vertical-align: middle;
                                font-size: 26px;"
                          class="badge color-gray">
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
    const cardTypeTranslation = { characters: 'Personagens', weapons: 'Armas', places: 'Lugares' }
    return <Page>
      <Navbar title="Ficha de Suspeitos">
        <NavRight>
          <Button iconF7="qrcode" popoverOpen=".popover-menu" />
          <Button iconF7="exit" onClick={this.exitGame} />
        </NavRight>
      </Navbar>
      {
        Object.keys(cardTypeTranslation).map((key) => <div key={key}>
          <BlockTitle>{cardTypeTranslation[key]}</BlockTitle>
          <List>
            { this.state.game[key].map((char, idx) => <ListItem key={idx} title={char.name}>
              <div slot="after" style={{ marginRight: '8px' }}>
                { char.flags.map((flag, flagIdx) => <Link style={{ margin: '0 2px' }} iconMaterial={flag.icon} key={flagIdx} color={flag.color} onClick={this.removeItem(key, idx, 'flags', flagIdx)} />) }
              </div>
              <div slot="after" style={{ marginRight: '8px' }}>
                { char.owners.map((owner, ownerIdx) => <Chip style={{ margin: '0 2px' }} key={ownerIdx} text={owner} deleteable onClick={ this.removeItem(key, idx, 'owners', ownerIdx) } />) }
              </div>
              <Button slot="after" onClick={this.selectItem(key, idx)} iconMaterial="flag" />
            </ListItem>) }
          </List>
        </div>)
      }
      <Popover className="popover-menu" onPopoverOpen={this.showQrCode}>
        <div ref={this.container} style={{ width: '245px', height: '245px', marginLeft: '11px', marginTop: '8px' }}></div>
      </Popover>
    </Page>
  }
}
