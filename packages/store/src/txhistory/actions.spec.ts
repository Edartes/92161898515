import { IApi } from '@emeraldwallet/core';
import { ipcRenderer } from 'electron';
import { fromJS } from 'immutable';
import { refreshTrackedTransactions } from './actions';

describe('historyActions/refreshTrackedTransactions', () => {
  const getState = () => ({
    blockchains: fromJS({
      eth: {
        height: 100
      }
    }),
    wallet: {
      settings: fromJS({
        numConfirmations: 10
      }),
      history: fromJS({
        chainId: 'morden',
        trackedTransactions: [{ numConfirmations: 0, hash: '0x123', blockchain: 'ETH' }]
      })
    }
  });

  it('should subscribe through electron', () => {
    const dispatch = jest.fn();
    const hash = '0x123';

    refreshTrackedTransactions()(dispatch, getState, {} as IApi);

    expect(ipcRenderer.send).toHaveBeenCalledWith('subscribe-tx', 'ETH', '0x123');
  });
});
