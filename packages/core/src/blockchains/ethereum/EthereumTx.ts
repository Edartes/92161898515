import {Address, convert, EthAddress} from '@emeraldplatform/core';
import Common from 'ethereumjs-common';
import { Transaction as EthTx } from 'ethereumjs-tx';
import { ITransaction } from '../types';

class EthereumTx implements ITransaction {

  public static fromRaw (hex: string, chainId: any): ITransaction {
    if (chainId === 62 || chainId === 61) {
      // Because ethereumjs-tx doesn't support MORDEN and ETC
      const custom = Common.forCustomChain(1, {
        chainId
      }, 'byzantium');
      return new EthereumTx(new EthTx(hex, { common: custom }));
    }
    return new EthereumTx(new EthTx(hex, { chain: chainId }));
  }
  public internalTx: EthTx;

  constructor (tx: any) {
    this.internalTx = tx;
  }

  public getHash (): string {
    return '0x' + this.internalTx.hash(true).toString('hex');
  }

  public verifySignature (): boolean {
    return this.internalTx.verifySignature();
  }

  public getSenderAddress (): Address {
    return EthAddress.fromHexString('0x' + this.internalTx.getSenderAddress().toString('hex'));
  }

  public getRecipientAddress (): Address {
    return EthAddress.fromHexString('0x' + this.internalTx.to.toString('hex'));
  }

  public getValue (): any {
    return '0x' + this.internalTx.value.toString('hex');
  }

  public getData (): any {
    return this.internalTx.data.toString('hex');
  }

  public getNonce (): any {
    return parseInt(this.internalTx.nonce.toString('hex'), 16);
  }
}

export default EthereumTx;
