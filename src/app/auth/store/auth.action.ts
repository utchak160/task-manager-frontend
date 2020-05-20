import {createAction, props} from '@ngrx/store';
import {Member, User} from '../../models/user';


export const RegisterSent = createAction('[User] Register Sent');
export const RegisterSuccess = createAction('[User] Register Success', props<{user: User}>());
export const RegisterFailed = createAction('[User] Register Failed');
export const LoginSent = createAction('[User] Login Sent');
export const LoginSuccess = createAction('[User] Login Success', props<{member: Member}>());
export const LoginFailed = createAction('[User] Login Failed');
export const LogoutSent = createAction('[User] Logout Sent');
export const ProfileFetchStart = createAction('[User] Profile Fetched');
export const ProfileFetched = createAction('[User] Profile Fetched', props<{ profile: User }>());
export const ProfileFetchFail = createAction('[User] Profile Fetch fail');
export const LogoutSuccess = createAction('[User] Logout Success');
export const LogoutFailed = createAction<string>('[User] Logout Failed');
export const ProfileDeleted = createAction('[User] Profile Deleted');
export const ProfileDeleteFail = createAction('[User] Profile Delete Fail');


// export const loginSuccess = createAction<string, { user: IUser }>(
//   '[User] Login Success',
//   props<{ user: IUser }>()
// );
