import React from 'react';
import { Spin, Icon, Button, Input } from 'antd';
import * as Styled from './styled';
import { checkTwitterUserNameAvailability } from 'api/api';
import { Row, Col } from 'antd';
import { toWei } from 'utils/units';

// const isEmail = (twitterHandle: string) => {
//   return validator.isEmail(twitterHandle);
// };

interface State {
  twitterHandle: string;
  amount: string;
  isLoading: boolean;
  isSuccess: boolean;
  isFailure: boolean;
  badValidation: string | null;
}

import { Form } from 'antd';

function isNumeric(num) {
  return !isNaN(num);
}

const FormItem = Form.Item;

export default class SendForm extends React.PureComponent<any, State> {
  state: State = {
    twitterHandle: '',
    amount: '',
    isLoading: false,
    isSuccess: false,
    isFailure: false,
    badValidation: null
  };

  private handleChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = ev.currentTarget;

    this.setState({
      isFailure: false,
      badValidation: null,
      [name as any]: value
    } as any);
  };

  twitterValidation = async twitterHandle => {
    let badValidation = null;

    if (twitterHandle === '@') {
      twitterHandle = this.state.twitterHandle[0].substring(1);
    }

    if (twitterHandle.includes('https://twitter.com/')) {
      twitterHandle = twitterHandle.split('https://twitter.com/')[1];
    }

    if (twitterHandle === '') {
      badValidation = 'Oops! This twitter handle is not valid';
    } else {
      // const twitterHandleAvailability = await checkTwitterUserNameAvailability(
      //   twitterHandle
      // );

      if (false) {
        // if (twitterHandleAvailability.data.reason !== 'taken') {
        badValidation = 'Oops! This twitter handle does not exist';
      }
    }

    return { badValidation, twitterHandle };
  };

  amountValidation = (amount: string) => {
    let badAmountValidation = null;
    let weiAmount = null;

    if (!isNumeric(amount)) {
      badAmountValidation = 'Amount is not a number';
    } else {
      weiAmount = toWei(amount, 'ether');
    }

    return { badAmountValidation, weiAmount };
  };

  handleSubmit = async (ev: any) => {
    ev.preventDefault();
    if (this.state.isLoading || this.state.isSuccess) {
      return;
    }
    this.setState({ isLoading: true });

    let delay = 1000;

    let { badValidation, twitterHandle } = await this.twitterValidation(
      this.state.twitterHandle
    );

    let { badAmountValidation, weiAmount } = this.amountValidation(
      this.state.amount
    );

    // I'm so sorry.
    if (!badValidation) {
      badValidation = badAmountValidation;
    }

    if (!badValidation) {
      this.setState({ isLoading: true });
      try {
        console.log('Run metamask', twitterHandle);
        console.log('weiAmount', weiAmount);
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
          <Spin indicator={<Icon spin type="loading" />} />
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

    let message = <span />;
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
        <Form layout="vertical">
          <Col span={8} offset={8}>
            <FormItem label="Twitter Handle">
              <Input
                name="twitterHandle"
                value={twitterHandle}
                addonBefore={'@'}
                placeholder="jack"
                onChange={this.handleChange}
              />{' '}
            </FormItem>
            <FormItem label="Amount">
              <Input
                name="amount"
                value={amount}
                placeholder="0.01"
                addonAfter={'ETH'}
                onChange={this.handleChange}
              />{' '}
            </FormItem>
            <FormItem>
              <Button onClick={this.handleSubmit}>{buttonText}</Button>{' '}
            </FormItem>
          </Col>
        </Form>
        <Row />

        <Styled.Message>{message}</Styled.Message>
      </React.Fragment>
    );
  }
}
