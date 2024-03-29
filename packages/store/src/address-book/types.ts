import { BlockchainCode } from '@emeraldwallet/core';

export const moduleName = 'addressBook';

export enum ActionTypes {
  LOAD = 'ADDRESSBOOK/LOAD',
  LOADING = 'ADDRESSBOOK/LOADING',
  LOADED = 'ADDRESSBOOK/LOADED',
  ADD_CONTACT = 'ADDRESSBOOK/ADD_ADDRESS',
  NEW_ADDRESS_ADDED = 'ADDRESSBOOK/NEW_CONTACT_ADDED',
  DELETE_ADDRESS = 'ADDRESSBOOK/DELETE_ADDRESS',
  ADDRESS_DELETED = 'ADDRESSBOOK/ADDRESS_DELETED',
  SET_BOOK = 'ADDRESSBOOK/SET_BOOK'
}

export interface IAddressBookState {
  loading: boolean;
  contacts: {
    [chain in BlockchainCode]?: any
  };
}

export interface AddContactAction {
  type: ActionTypes.ADD_CONTACT;
  payload: any;
}

export interface ContactAddedAction {
  type: ActionTypes.NEW_ADDRESS_ADDED;
  payload: any;
}

export interface SetLoadingAction {
  type: ActionTypes.LOADING;
  payload: boolean;
}

export interface DeleteContactAction {
  type: ActionTypes.DELETE_ADDRESS;
  payload: {
    blockchain: any;
    address: string;
  };
}

export interface ContactDeletedAction {
  type: ActionTypes.ADDRESS_DELETED;
  payload: {
    blockchain: any;
    address: string;
  };
}

export interface LoadContactsAction {
  type: ActionTypes.LOAD;
  payload: any;
}

export interface SetAddressBookAction {
  type: ActionTypes.SET_BOOK;
  payload: {
    blockchain: any;
    contacts: any;
  };
}

export type AddressBookAction =
  | AddContactAction
  | ContactAddedAction
  | SetLoadingAction
  | DeleteContactAction
  | ContactDeletedAction
  | LoadContactsAction
  | SetAddressBookAction;
