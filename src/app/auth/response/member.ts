import {ShowResponse} from './showResponse';
import {Member} from '../../models/user';

export interface LoginResponse {
  token: any;
  message?: string;
  member: ShowResponse<Member>;
}
