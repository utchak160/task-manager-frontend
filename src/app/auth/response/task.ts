import {ShowResponse} from './showResponse';
import {Task} from '../../models/task';

export interface TaskResponse {
  task: ShowResponse<Task>;
}
