import {createAction, props} from '@ngrx/store';
import {Task} from '../../models/task';

export const TaskFetching = createAction(
  '[Task] Task Fetching'
);
export const TaskFetched = createAction(
  '[Task] Task Fetched',
  props<{ task: Task[] }>()
);
export const TaskFetchFailed = createAction(
  '[Task] Task Fetching'
);
export const TaskSent = createAction(
  '[Task] Task sent'
);
export const TaskSuccess = createAction(
  '[Task] Task Success',
  props<{ task: Task }>()
);
export const TaskFailed = createAction(
  '[Task] Task failed'
);
export const TaskRemoved = createAction(
  '[Task] Task Removed',
  props<{index: number}>()
);
export const TaskUpdated = createAction(
  '[Task] Task Update',
  props<{index: number, task: Task}>()
);
export const ClearStore = createAction(
  '[Task] Clear Store'
);

// export const loginSuccess = createAction<string, { user: IUser }>(
//   '[User] Login Success',
//   props<{ user: IUser }>()
// );
