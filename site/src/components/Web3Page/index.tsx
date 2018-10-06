import React from 'react';
import Web3Container, { Web3RenderProps } from 'lib/Web3Container';
import { connect } from 'react-redux';
import { AppState } from 'store/reducers';
import { Spin } from 'antd';
import AntWrap, { Props as AntWrapProps } from 'components/AntWrap';
import { web3Actions } from 'modules/web3';
const MetamaskIcon = require('static/images/metamask.png');
const WrongNetworkIcon = require('static/images/wrong-network.png');
import './style.less';

interface OwnProps extends AntWrapProps {
  render(props: Web3RenderProps & any): React.ReactNode;
}

interface StateProps {
  isMissingWeb3: boolean;
  isWeb3Locked: boolean;
  isWrongNetwork: boolean;
}

interface ActionProps {
  setAccounts: typeof web3Actions['setAccounts'];
}

type Props = OwnProps & StateProps & ActionProps;

const Web3Page = (props: Props) => {
  const { render, isMissingWeb3, isWeb3Locked, isWrongNetwork, ...rest } = props;
  let content;
  let centerContent = false;
  if (isMissingWeb3) {
    centerContent = true;
    content = (
      <div className="Web3Page-error">
        <img className="Web3Page-error-icon" src={MetamaskIcon} />
        <p className="Web3Page-error-message">
          This page requires a web3 client to use. Either unlock or install the MetaMask
          browser extension and refresh to continue.
        </p>
        <a
          className="Web3Page-error-metamaskButton"
          href="https://metamask.io/"
          target="_blank"
          rel="noopener nofollow"
        >
          Get MetaMask
        </a>
      </div>
    );
  } else if (isWeb3Locked) {
    centerContent = true;
    content = (
      <div className="Web3Page-error">
        <img className="Web3Page-error-icon" src={MetamaskIcon} />
        <p className="Web3Page-error-message">
          It looks like your MetaMask account is locked. Please unlock it and click the
          button below to continue.
        </p>
        <a className="Web3Page-error-metamaskButton" onClick={props.setAccounts}>
          Try again
        </a>
          <a
              className="Web3Page-error-metamaskButton"
              href="https://metamask.io/"
              target="_blank"
              rel="noopener nofollow"
          >
              Get MetaMask
          </a>
      </div>
    );
  } else if (isWrongNetwork) {
    centerContent = true;
    content = (
      <div className="Web3Page-error">
        <img className="Web3Page-error-icon" src={WrongNetworkIcon} />
        <p className="Web3Page-error-message">
          The ETHTip.io smart contract is currently only supported on the{' '}
          <strong>Ropsten</strong> network. Please change your network to continue.
        </p>
      </div>
    );
  } else {
    content = (
      <Web3Container
        render={render}
        renderLoading={() => (
          <div className="Web3Page-loading">
            <Spin size="large" />
          </div>
        )}
      />
    );
  }

  return (
    <AntWrap centerContent={centerContent} {...rest}>
      <div className="Web3Page">{content}</div>
    </AntWrap>
  );
};

function mapStateToProps(state: AppState): StateProps {
  return {
    isMissingWeb3: state.web3.isMissingWeb3,
    isWeb3Locked: state.web3.isWeb3Locked,
    isWrongNetwork: state.web3.isWrongNetwork,
  };
}

export default connect(
  mapStateToProps,
  {
    setAccounts: web3Actions.setAccounts,
  },
)(Web3Page);
