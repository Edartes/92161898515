import { convert } from '@emeraldplatform/core';
import { Wei } from '@emeraldplatform/eth';
import { BlockchainCode, Currency } from '@emeraldwallet/core';

export function txFeeFiat (gasPrice: any, gasLimit: number, rate: number): string {
  const wei = new Wei(gasPrice).mul(convert.toBigNumber(gasLimit));
  const ether = wei.toEther(18);
  return Currency.convert(ether.toString(), rate);
}

export const traceValidate = (chain: BlockchainCode, tx: any, dispatch: any, estimateGas: any): Promise<number> => {
  return new Promise((resolve, reject) => {
    dispatch(estimateGas(chain, tx))
      .then((gasEst: number) => {
        if (!gasEst) {
          reject('Invalid Transaction');
        } else if (gasEst > tx.gas.toNumber()) {
          reject(`Insufficient Gas. Expected ${gasEst}`);
        } else {
          resolve(gasEst);
        }
      }).catch((error: any) => {
        reject(error);
      });
  });
};
