import {Task} from '../../models/task';
import {Action, createReducer, on} from '@ngrx/store';
import * as TaskAction from '../store/dashboard.action';


export interface State {
  task: Task[];
  isFetched: boolean;
  isCreated: boolean;
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  task: [],
  isFetched: false,
  isCreated: false,
  loading: false,
  loaded: false
};

const taskReducer = createReducer(
  initialState,
  on(TaskAction.TaskFetching, state => ({...state, loading: true})),
  on(TaskAction.TaskFetched, (state) => ({...state, loading: false, loaded: true, isFetched: true, tasks: [...state.task]})),
  on(TaskAction.TaskFetchFailed, state => ({...state, loading: false})),
  on(TaskAction.TaskSent, state => ({...state, loading: true})),
  on(TaskAction.TaskSuccess, (state, {task}) => ({...state, loading: false, loaded: true, tasks: [...state.task, task]})),
  on(TaskAction.TaskFailed, state => ({...state, loading: false}))
);

export function TaskReducer(state: State = initialState, action: Action) {
  return taskReducer(state, action);
}


// on(UserActions.loginSuccess, (state, { user }) => {
//     return {
//       ...state,
//       isLoading: false,
//       isLoggedIn: true,
//       user
//     };
//   }
// ),
