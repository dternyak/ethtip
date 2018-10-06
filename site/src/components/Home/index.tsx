import React from 'react';
import BasicHead from 'components/BasicHead';
import SendForm from 'components/SendForm/index';
import * as Styled from './styled';
import { Spin } from 'antd';
import Web3Container, { Web3RenderProps } from 'lib/Web3Container';

class Home extends React.Component<any, any> {
  render() {
    const { web3, account } = this.props;
    return (
      <BasicHead>
        <Styled.Container>
          <Styled.Background />
          <Styled.Title>ETHTip.io</Styled.Title>
          <Styled.Tagline>Tip on twitter</Styled.Tagline>

          <SendForm web3={web3} account={account} />
        </Styled.Container>
      </BasicHead>
    );
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <Spin />}
    render={({ web3, accounts }: Web3RenderProps) => (
      <Home web3={web3} account={accounts[0]} />
    )}
  />
);
