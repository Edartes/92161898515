import { Blockchains } from '@emeraldwallet/core';

export const fiatCurrency = (state: any) => state.wallet.settings.get('localeCurrency');
export const fiatRate = (chain: string, state: any) => state.wallet.settings.getIn(['rates', chain.toUpperCase()]);

export const currentChains = (state: any) => state.wallet.settings.getIn(['mode', 'chains'])
  .toJS()
  .map((chain: any) => Blockchains[chain.toLowerCase()]);

export const showHiddenAccounts = (state: any): boolean => state.wallet.settings.get('showHiddenAccounts', false);

export const numConfirms = (state: any) => state.wallet.settings.get('numConfirmations');
