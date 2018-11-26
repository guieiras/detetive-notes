import React, { Component } from 'react';
import { Page } from 'framework7-react';
import currentGame from '../../boundaries/currentGame';

export default class GamesNewPage extends Component {
  constructor(props) {
    super(props);
    this.state = { game: null };
  }

  componentDidMount() {
    this.setState({ game: currentGame.fetch() });
  }

  render() {
    return <Page>
    </Page>
  }
}
