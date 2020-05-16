import {createReducer, on} from '@ngrx/store';
import {decreament, increament, reset} from './counter.action';

export const initialState = 0;

const _counterReducer = createReducer(initialState,
  on(increament, state => state + 1),
  on(decreament, state => state - 1),
  on(reset, state => initialState),
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
