import {State, reducer, _getUser, _getMember, _isLoading, _isLoggedIn, _isRegistered} from './auth.reducer';
import {ActionReducerMap, createSelector} from '@ngrx/store';
import {counterReducer} from '../../counter.reducer';
import { _getLoadingTask, _getTask, TaskReducer, TaskState} from '../../dashboard/store/dashboard.reducer';

export interface AppState {
  user: State;
  task: TaskState;
  count: number;
}

export const rootReducer: ActionReducerMap<AppState> = {
  user: reducer,
  task: TaskReducer,
  count: counterReducer
};

export const getMemberState = state => state.member;
export const getUserState = state => state.user;
export const getTaskState = state => state.task;

export const getUser = createSelector(
  getUserState,
  _getUser
);

export const getMember = createSelector(
  getUserState,
  _getMember
);

export const getTask = createSelector(
  getTaskState,
  _getTask,
);

export const getTaskLoading = createSelector(
  getUserState,
  getTaskState,
  _getLoadingTask
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
