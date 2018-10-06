import { combineReducers } from 'redux';

import clock, { ClockState } from 'modules/clock';
import auth, { AuthState } from 'modules/auth';
import profile, { ProfileState } from 'modules/profile';
import web3, { Web3State, INITIAL_STATE as web3InitialState } from 'modules/web3';


export interface AppState {
  clock: ClockState;
  web3: Web3State;
  auth: AuthState;
  profile: ProfileState;
}

export const combineInitialState: AppState = {
  web3: web3InitialState,
};

export default combineReducers<AppState>({
  web3,
});
