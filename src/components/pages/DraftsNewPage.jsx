import React, { Component } from 'react';
import {
  Block,
  Button,
  List,
  ListInput,
  Navbar,
  Page,
} from 'framework7-react';
import db from '../../boundaries/db';

export default class DraftsNewPage extends Component {
  constructor(props) {
    super(props);
    this.state = { template: null, players: [] };
    this.handleInput = this.handleInput.bind(this);
    this.createDraft = this.createDraft.bind(this);
  }

  componentDidMount() {
    const templateId = this.$f7route.params.id;
    db.templates.get(templateId).then((template) => {
      this.setState({ template });
    });
  }

  createDraft() {
    const { template, players } = this.state;
    db.drafts.put({ template, players }).then((draftId) => { alert(draftId + " criado"); });
  }

  handleInput(index) {
    return (ev) => {
      const players = this.state.players;
      
      players[index] = ev.target.value;
      this.setState({ players });
    }
  }

  render() {
    return <Page>
      <Navbar backLink="Voltar" title="Novo Jogo"></Navbar>
      <List>
        {this.state.template && this.state.template.bundle.players.map((_, index) =>
          <ListInput key={index} label={`Jogador ${index + 1}`} type="text" onChange={this.handleInput(index)} />
        )}
      </List>
      <Block>
        <Button big fill text="Criar" onClick={this.createDraft}></Button>
      </Block>
    </Page>
  }
}
