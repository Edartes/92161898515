import { fromJS } from 'immutable';
import { ActionTypes, ConnAction, SetStatus } from './types';

export const initialState = fromJS({
  status: 'CONNECTED'
});

function onSetStatus (state: any, action: SetStatus) {
  if (action.type === ActionTypes.SET_STATUS) {
    return state.set('status', action.status);
  }
  return state;
}

export function reducer (state: any, action: ConnAction): any {
  state = state || initialState;
  state = onSetStatus(state, action);
  return state;
}
