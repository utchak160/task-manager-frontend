import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Store} from '@ngrx/store';
import {AppState, getIsLoading, getIsLoggedIn, getUser } from '../store';
import {Observable} from 'rxjs';
import {LoginResponse} from '../response/member';
import {catchError, filter, map, switchMap, take, tap} from 'rxjs/operators';
import {
  LoginFailed,
  LoginSent,
  LoginSuccess, LogoutFailed,
  LogoutSent,
  LogoutSuccess,
  RegisterFailed,
  RegisterSent,
  RegisterSuccess
} from '../store/auth.action';
import {Constants} from '../../utils/constants';
import {RegisterResponse} from '../response/user';
import {ShowResponse} from '../response/showResponse';

@Injectable({
  providedIn: 'root'
})

export class AuthRepository {
  constructor(private authService: AuthService,
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
          localStorage.setItem(Constants.USER_MESSAGE, res.message);
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

  // logout(): Observable<ShowResponse<string>> {
  //   return this.store.select(getUser).pipe(
  //     take(1),
  //     filter(i => !i),
  //     switchMap(() => {
  //       this.store.dispatch(LogoutSent());
  //       return this.authService.logout();
  //     }),
  //     tap((res) => {
  //       localStorage.removeItem(Constants.AUTH_TOKEN);
  //       localStorage.removeItem(Constants.USER_MESSAGE);
  //       console.log(res);
  //       this.store.dispatch(LogoutSuccess());
  //     }, e => {
  //       console.log('[Repo]', e);
  //       this.store.dispatch(LogoutFailed());
  //     })
  //   );
  // }

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
        localStorage.removeItem(Constants.USER_MESSAGE);
        this.store.dispatch(LogoutSuccess());
      }, e => {
        this.store.dispatch(LogoutFailed());
        alert(e.message);
        console.log('[Auth]', e);
      })
    );
  }

  // getProfile(): Observable<LoginResponse> {
  //   return this.store.select(getUser).pipe(
  //     take(1),
  //     filter(i => !i),
  //     switchMap(() => {
  //
  //     })
  //   )
  // }
}
