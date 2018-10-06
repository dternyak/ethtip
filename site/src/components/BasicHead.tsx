import React from 'react';
import Head from 'next/head';

import 'styles/style.less';

export default class BasicHead extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Head>
          <title>ETHTip.io - Tip Ether on Twitter</title>
          <link rel="icon" href="/static/images/favicon.ico" type="image/x-icon"/>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>

        {children}
      </div>
    );
  }
}
