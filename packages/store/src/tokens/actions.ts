import { tokenContract } from './erc20';
import { ActionTypes, ITokenBalance, RequestTokenBalanceAction, SetTokenBalanceAction } from './types';

export function setTokenBalance (chain: any, tokenBalance: ITokenBalance, address: any): SetTokenBalanceAction {
  return {
    type: ActionTypes.SET_TOKEN_BALANCE,
    payload: {
      chain,
      address,
      balance: tokenBalance
    }
  };
}

export function requestTokenBalance (chain: any, token: any, address: string): RequestTokenBalanceAction {
  return {
    type: ActionTypes.REQUEST_TOKEN_BALANCE,
    payload: {
      chain,
      token,
      address
    }
  };
}

export function createTokenTxData (to: string, amount: any, isTransfer: boolean): string {
  const value = amount.toString(10);
  if (isTransfer) {
    return tokenContract.functionToData('transfer', { _to: to, _value: value });
  }
  return tokenContract.functionToData('approve', { _spender: to, _amount: value });
}
