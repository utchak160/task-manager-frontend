import {State, reducer, _getUser, _getMember, _isLoading, _isLoggedIn, _isRegistered} from './auth.reducer';
import {ActionReducerMap, createSelector} from '@ngrx/store';
import {counterReducer} from '../../counter.reducer';

export interface AppState {
  user: State;
  count: number;
}

export const rootReducer: ActionReducerMap<AppState> = {
  user: reducer,
  count: counterReducer
};

export const getUserState = state => state.user;

export const getUser = createSelector(
  getUserState,
  _getUser
);

export const getMember = createSelector(
  getUserState,
  _getMember
);

export const getIsLoading = createSelector(
  getUserState,
  _isLoading
);

export const getIsLoggedIn = createSelector(
  getUserState,
  _isLoggedIn
);

export const getIsRegistered = createSelector(
  getUserState,
  _isRegistered
);
