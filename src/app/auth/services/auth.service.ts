import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {RegisterResponse} from '../response/user';
import {LoginResponse} from '../response/member';
import {ShowResponse} from '../response/showResponse';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpService) {
  }

  login(data): Observable<ShowResponse<LoginResponse>> {
    return this.http.post<LoginResponse>('/users/login', data, true);
  }

  register(data): Observable<ShowResponse<RegisterResponse>> {
    return this.http.post<RegisterResponse>('/users', data, false);
  }

  logout(): Observable<ShowResponse<string>> {
    return this.http.post<string>('/users/logout', { }, true);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>('/users/profile', {}, true);
  }

  deleteProfile(): Observable<string> {
    return this.http.delete<string>('/users/profile', true);
  }

  uploadProfile(formData): Observable<ShowResponse<string>> {
    return this.http.post<string>('/user/profile/avatar', formData, true);
  }
}
