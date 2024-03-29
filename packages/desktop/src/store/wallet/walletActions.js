import { screen, addresses } from '@emeraldwallet/store';

/**
 * Shows account details page if address in the vault or notification otherwise.
 */
export const showAccountDetails = (address) => {
  return (dispatch, getState) => {
    const state = getState();
    const acc = addresses.selectors.find(state, address, '');
    if (!acc) {
      dispatch(screen.actions.showNotification(`Account ${address} not found in the vault`, 'warning', 3000));
    } else {
      dispatch(screen.actions.gotoScreen('account', acc));
    }
  };
};
