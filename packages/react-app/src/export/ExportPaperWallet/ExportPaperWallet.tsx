import { addresses, screen } from '@emeraldwallet/store';
import { ExportPaperWallet } from '@emeraldwallet/ui';
import * as React from 'react';
import { connect } from 'react-redux';

export default connect(
  (state, ownProps) => ({
  }),
  (dispatch, ownProps: any) => ({
    onSubmit: (password: string) => {
      const address = ownProps.accountId;
      const chain = ownProps.blockchain;
      dispatch(addresses.actions.exportPrivateKey(chain, password, address))
        .then((privKey: string) => {
          return dispatch(screen.actions.gotoScreen('paper-wallet', { address, privKey, blockchain: chain }));
        })
        .catch((err: any) => dispatch(screen.actions.showError(err)));
    },
    onBack: () => {
      dispatch(screen.actions.gotoScreen('home'));
    }

  })
)(ExportPaperWallet);
