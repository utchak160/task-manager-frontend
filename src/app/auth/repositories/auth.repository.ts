import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Store} from '@ngrx/store';
import {AppState, getIsLoading, getIsLoggedIn, getProfile, getUser} from '../store';
import {Observable} from 'rxjs';
import {LoginResponse} from '../response/member';
import {catchError, filter, map, switchMap, take, tap} from 'rxjs/operators';
import {
  LoginFailed,
  LoginSent,
  LoginSuccess, LogoutFailed,
  LogoutSent,
  LogoutSuccess, ProfileDeleted, ProfileDeleteFail, ProfileFetched, ProfileFetchFail, ProfileFetchStart,
  RegisterFailed,
  RegisterSent,
  RegisterSuccess
} from '../store/auth.action';
import {Constants} from '../../utils/constants';
import {RegisterResponse} from '../response/user';
import {ShowResponse} from '../response/showResponse';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {ClearStore} from '../../dashboard/store/dashboard.action';

@Injectable({
  providedIn: 'root'
})

export class AuthRepository {
  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  login(member): Observable<LoginResponse | ShowResponse<LoginResponse>> {
    return this.store.select(getIsLoading).pipe(
      take(1),
      filter(i => !i),
      switchMap(() => {
        this.store.dispatch(LoginSent());
        return this.authService.login(member);
      }),
      tap((res) => {
        // const token = res.token.toString();
        if ('token' in res) {
          localStorage.setItem(Constants.AUTH_TOKEN, res.token);
        }
        console.log('[Res]', res);
        console.log('[Member]', member);
        this.store.dispatch(LoginSuccess(member));
      }, (e) => {
        this.store.dispatch(LoginFailed());
        console.log('[Error]', e);
      })
    );
  }

  register(user): Observable<RegisterResponse | ShowResponse<RegisterResponse>> {
    return this.store.select(getIsLoading).pipe(
      take(1),
      filter(i => !i),
      switchMap(() => {
        this.store.dispatch(RegisterSent());
        return this.authService.register(user);
      }),
      tap((res) => {
        console.log(res);
        this.store.dispatch(RegisterSuccess(user));
      }, e => {
        console.log('repo error');
        this.store.dispatch(RegisterFailed());
        console.log('[Error]', e);
      })
    );
  }
  logout(): Observable<ShowResponse<string>> {
    return this.store.select(getUser).pipe(
      take(1),
      filter(i => !i),
      switchMap(() => {
        this.store.dispatch(LogoutSent());
        return this.authService.logout();
      }),
      tap((res) => {
        console.log('[Auth]', res);
        localStorage.removeItem(Constants.AUTH_TOKEN);
        this.store.dispatch(LogoutSuccess());
        this.store.dispatch(ClearStore());
      }, e => {
        this.store.dispatch(LogoutFailed());
        alert(e.message);
        console.log('[Auth]', e);
      })
    );
  }

 getProfile(): Observable<User> {
    return this.store.select(getIsLoading).pipe(
      take(1),
      filter(i => !i),
      switchMap(() => {
        this.store.dispatch(ProfileFetchStart());
        return this.authService.getProfile();
      }),
      tap((res) => {
        this.store.dispatch(ProfileFetched({profile: res}));
        console.log('[Fetch Success]', res);
      }, e => {
        this.store.dispatch(ProfileFetchFail());
        console.log('[Fetch Failed]', e);
        alert(e.message);
      })
    );
 }
 deleteProfile(): Observable<string> {
    return this.store.select(getIsLoggedIn).pipe(
      switchMap(() => {
        return this.authService.deleteProfile();
      }),
      tap((res) => {
        this.store.dispatch(ProfileDeleted());
        this.store.dispatch(ClearStore());
        console.log('[Profile Deleted]', res);
        this.logout();
      }, e => {
        this.store.dispatch(ProfileDeleteFail());
        console.log('[Delete Fail]');
        alert(e.message);
      })
    );
 }
}
