import {Task} from '../../models/task';
import {Action, createReducer, on} from '@ngrx/store';
import * as TaskAction from '../store/dashboard.action';


export interface TaskState {
  task: Task[];
  isFetched: boolean;
  isCreated: boolean;
  loading: boolean;
  loaded: boolean;
}

export const initialState: TaskState = {
  task: [],
  isFetched: false,
  isCreated: false,
  loading: false,
  loaded: false
};

const taskReducer = createReducer(
  initialState,
  on(TaskAction.TaskFetching, state => ({...state, loading: true})),
  on(TaskAction.TaskFetched, (state, { task}) => ({...state, loading: false, loaded: true, isFetched: true, task: [...state.task, ...task]})),
  on(TaskAction.TaskFetchFailed, state => ({...state, loading: false})),
  on(TaskAction.TaskSent, state => ({...state, loading: true})),
  on(TaskAction.TaskSuccess, (state,  { task }) => ({...state, loading: false, loaded: true, task: [...state.task, task]})),
  on(TaskAction.TaskFailed, state => ({...state, loading: false}))
);

export function TaskReducer(state: TaskState = initialState, action: Action) {
  return taskReducer(state, action);
}

export const _getTask = (state: TaskState) => state.task;
export const _getLoadingTask = (state: TaskState) => state.loading;

// on(UserActions.loginSuccess, (state, { user }) => {
//     return {
//       ...state,
//       isLoading: false,
//       isLoggedIn: true,
//       user
//     };
//   }
// ),
