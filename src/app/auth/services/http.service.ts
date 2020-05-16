import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ShowResponse} from '../response/showResponse';
import {Constants} from '../../utils/constants';
import {catchError, map} from 'rxjs/operators';
import {of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  get<T>(endPoint: string, data?: any, useAuthHeader?: boolean) {
    const option = {
      headers: this.buildHeader(useAuthHeader),
      params: data
    };
    return this.http.get<ShowResponse<T>>(this.baseUrl + endPoint, option)
      .pipe(map(res => res.data),
        catchError(this.handleError)
      );
  }

  post<T>(endPoint: string, data: any, useAuthHeader?: boolean) {
    const option = {
      headers: this.buildHeader(useAuthHeader)
    };
    return this.http.post<ShowResponse<T>>(this.baseUrl + endPoint, data, option)
      .pipe(map(res => res),
        catchError(this.handleError)
      );
  }

  put<T>(endPoint: string, data: any, useAuthHeader: boolean) {
    const option = {
      headers: this.buildHeader(useAuthHeader)
    };
    return this.http.put<ShowResponse<T>>(this.baseUrl + endPoint, data, option)
      .pipe(map(res => res.data));
  }

  delete<T>(endPoint: string, useAuthHeader: boolean) {
    const option = {
      headers: this.buildHeader(useAuthHeader)
    };
    return this.http.delete<ShowResponse<T>>(this.baseUrl + endPoint, option)
      .pipe(map(res => res.data),
        catchError(this.handleError)
      );
  }

  private buildHeader(useAuthHeader): HttpHeaders {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    if (!useAuthHeader) {
      return headers;
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(Constants.AUTH_TOKEN)}`
    });

    // headers.set('Authorization', `Bearer ${localStorage.getItem(Constants.AUTH_TOKEN)}`);
    // return headers;
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(Constants.AUTH_TOKEN)}`
    });
  }

  private handleError(httpErrorResponse: HttpErrorResponse) {
    if (httpErrorResponse.status === 401) {
      console.log(httpErrorResponse.error);
      localStorage.removeItem(Constants.AUTH_TOKEN);
      localStorage.removeItem(Constants.USER_MESSAGE);
      return throwError(httpErrorResponse);
    } else {
      const error = httpErrorResponse.error;
      let message = error.error ? error.error[0][Object.keys(error.error[0])[0]] : error.message;
      if (!message) {
        message = 'Something went wrong.Please try again.';
      }
      return throwError({message, httpErrorResponse});
    }
  }
}

