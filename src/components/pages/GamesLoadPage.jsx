import React, { Component } from 'react';
import { Page } from 'framework7-react';
import QrReader from 'react-qr-reader';

export default class GamesLoadPage extends Component {
  handleScan(data) {
    if (data) {
      alert(data);
    }
  }
  
  handleError(err) {
    alert(err);
  }

  render() {
    return <Page>
      <QrReader delay={300}
        onError={this.handleError}
        onScan={this.handleScan} />
    </Page>
  }
}
