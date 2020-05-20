import {Member, User} from '../../models/user';
import {Action, createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.action';

export interface State {
  user: User;
  member: Member;
  profile: User;
  isRegistered: boolean;
  isLoggedIn: boolean;
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  user: null,
  member: null,
  profile: null,
  isRegistered: false,
  isLoggedIn: false,
  loading: false,
  loaded: false
};

const AuthReducer = createReducer(
  initialState,
  on(AuthActions.RegisterSent, state => ({...state, loading: true})),
  on(AuthActions.RegisterSuccess, (state, {user}) => ({...state, loaded: true, loading: false, isRegistered: true, user})),
  on(AuthActions.RegisterFailed, state => ({...state, loading: false, isRegistered: false})),
  on(AuthActions.LoginSent, state => ({...state, loading: true})),
  on(AuthActions.LoginSuccess, (state, {member}) => ({...state, loaded: true, loading: false, isLoggedIn: true, member})),
  on(AuthActions.LoginFailed, state => ({...state, loading: false, isLoggedIn: false})),
  on(AuthActions.LogoutSent, AuthActions.ProfileFetchStart, state => ({...state, loading: true})),
  on(AuthActions.LogoutSuccess, state => ({...state, loading: false, isLoggedIn: false})),
  on(AuthActions.LogoutFailed, AuthActions.ProfileFetchFail, state => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(AuthActions.ProfileFetched, (state, {profile}) => {
    return {
      ...state,
      loading: false,
      profile
    };
  }),
  on(AuthActions.ProfileDeleted, state => {
    return {
      ...state,
      initialState
    };
  }),
  on(AuthActions.ProfileDeleteFail, state => {
    return {
      ...state
    };
  })
);

export function reducer(state: State = initialState, action: Action) {
  return AuthReducer(state, action);
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

export const _getUser = (state: State) => state.user;
export const _getMember = (state: State) => state.member;
export const _isLoading = (state: State) => state.loading;
export const _isLoggedIn = (state: State) => state.isLoggedIn;
export const _isRegistered = (state: State) => state.isRegistered;
export const _getProfile = (state: State) => state.profile;
