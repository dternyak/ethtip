import React from 'react';
import { Spin, Icon, Button, Input } from 'antd';
import * as Styled from './styled';
import { subscribeToNewsletter } from 'api/api';

import validator from 'validator';

const isEmail = (twitterHandle: string) => {
  return validator.isEmail(twitterHandle);
};

interface State {
  twitterHandle: string;
  amount: string;
  isLoading: boolean;
  isSuccess: boolean;
  isFailure: boolean;
  badValidation: string | null;
}

export default class NewsletterForm extends React.PureComponent<any, State> {
  state: State = {
    twitterHandle: '',
    amount: '',
    isLoading: false,
    isSuccess: false,
    isFailure: false,
    badValidation: null
  };

  private handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = ev.currentTarget;

    this.setState({
      isFailure: false,
      badValidation: null,
      [name as any]: value
    } as any);
  };

  handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (this.state.isLoading || this.state.isSuccess) {
      return;
    }

    this.setState({ isLoading: true });

    let delay = 1000;

    let badValidation: string | null = null;

    if (!isEmail(this.state.twitterHandle)) {
      badValidation = 'Oops! This twitterHandle is invalid.';
      delay = 500;
    }

    if (!badValidation) {
      this.setState({ isLoading: true });
      try {
        await subscribeToNewsletter(this.state.twitterHandle);
      } catch (e) {
        /* tslint:disable-next-line:no-console */
        console.error(e);
        badValidation =
          'Oops! Something went wrong :(. Please come back and try again!';
      }
    }

    setTimeout(() => {
      this.setState({
        isLoading: false,
        isSuccess: !badValidation,
        isFailure: !!badValidation,
        badValidation
      });
    }, delay);
  };

  render() {
    const {
      twitterHandle,
      isLoading,
      isSuccess,
      isFailure,
      badValidation,
      amount
    } = this.state;
    const { account } = this.props;

    let buttonText = <span>Submit</span>;
    if (isLoading) {
      buttonText = (
        <Styled.ButtonIcon key="loading">
          <Spin
            indicator={<Icon spin type="loading" style={{ color: '#FFF' }} />}
          />
        </Styled.ButtonIcon>
      );
    } else if (isSuccess) {
      buttonText = (
        <Styled.ButtonIcon key="check">
          <Icon type="check" style={{ fontSize: 24 }} />
        </Styled.ButtonIcon>
      );
    } else if (isFailure) {
      buttonText = (
        <Styled.ButtonIcon key="failure">
          <Icon type="close" style={{ fontSize: 24 }} />
        </Styled.ButtonIcon>
      );
    }

    let message = <span>Tip a twitter user!</span>;
    if (isSuccess) {
      message = (
        <Styled.SuccessMessage>
          Thanks! Stay tuned, ROP is on the way.
        </Styled.SuccessMessage>
      );
    } else if (isFailure) {
      message = (
        <Styled.ErrorMessage>
          {badValidation ||
            'Oops! Something went wrong, refresh and try again.'}
        </Styled.ErrorMessage>
      );
    }

    return (
      <React.Fragment>
        <Styled.Form onSubmit={this.handleSubmit}>
          <Input
            name="twitterHandle"
            value={twitterHandle}
            placeholder="@jack"
            onChange={this.handleChange}
          />
          <br />
          <Input
            name="amount"
            value={amount}
            placeholder="satoshi@nakamoto.com"
            onChange={this.handleChange}
          />
          <br />
          <Button
            isLoading={isLoading}
            isSuccess={isSuccess}
            isFailure={isFailure}
          >
            {buttonText}
          </Button>
        </Styled.Form>

        <Styled.Message>{message}</Styled.Message>
      </React.Fragment>
    );
  }
}
