import types from './types';
import { Dispatch } from 'redux';
import getWeb3 from 'lib/getWeb3';
// import { postProposal } from 'api/api';
import getContract, { WrongNetworkError } from 'lib/getContract';
// import { sleep } from 'utils/helpers';
// import { fetchProposal, fetchProposals } from 'modules/proposals/actions';
// import { PROPOSAL_CATEGORY } from 'api/constants';
import { AppState } from 'store/reducers';
// import { Wei } from 'utils/units';
// import { TeamMember } from 'modules/create/types';

type GetState = () => AppState;

function handleWrongNetworkError(dispatch: (action: any) => void) {
  return (err: Error) => {
    if (err.constructor === WrongNetworkError) {
      dispatch({ type: types.SET_WRONG_NETWORK });
    } else {
      throw err;
    }
  };
}

export type TSetWeb3 = typeof setWeb3;
export function setWeb3() {
  return (dispatch: Dispatch<any>) => {
    return dispatch({
      type: types.WEB3,
      payload: getWeb3(),
    });
  };
}

export type TSetContract = typeof setContract;
export function setContract(json: any, deployedAddress?: string) {
  return (dispatch: Dispatch<any>, getState: GetState) => {
    const state = getState();
    if (state.web3.web3) {
      // TODO: Type me as promise dispatch
      (dispatch as any)({
        type: types.CONTRACT,
        payload: getContract(state.web3.web3, json, deployedAddress),
      }).catch(handleWrongNetworkError(dispatch));
    } else {
      dispatch({
        type: types.CONTRACT_REJECTED,
        payload: {
          error: 'No web3 object available',
        },
      });
    }
  };
}

export type TSetAccounts = typeof setAccounts;
export function setAccounts() {
  return (dispatch: Dispatch<any>, getState: GetState) => {
    const state = getState();
    if (state.web3.web3) {
      dispatch({ type: types.ACCOUNTS_PENDING });

      state.web3.web3.eth
        .getAccounts()
        .then((accounts: any[]) => {
          if (accounts && accounts.length) {
            dispatch({
              type: types.ACCOUNTS_FULFILLED,
              payload: accounts,
            });
          } else {
            dispatch({ type: types.SET_WEB3_LOCKED });
            throw new Error('No accounts found. Make sure metamask is unlocked.');
          }
        })
        .catch((err: Error) => {
          if (err.message === 'Invalid JSON RPC response: ""') {

              dispatch({ type: types.SET_WEB3_LOCKED });
          }

          dispatch({
            type: types.ACCOUNTS_REJECTED,
            payload: err.message || err.toString(),
          });
        });
    } else {
      dispatch({
        type: types.ACCOUNTS_REJECTED,
        payload: 'No web3 object available',
        error: true,
      });
    }
  };
}

