import {User} from '../../models/user';
import {ShowResponse} from './showResponse';

export interface RegisterResponse {
  _id: string;
  message?: string;
  token: string;
  user: ShowResponse<User>;
}
