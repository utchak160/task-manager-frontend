import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {ShowResponse} from '../response/showResponse';
import {TaskResponse} from '../response/task';
import {Task} from '../../models/task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  constructor(private http: HttpService) {
  }
  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>('/tasks', {}, true);
  }
  addTask(data): Observable<ShowResponse<TaskResponse>> {
    return this.http.post<TaskResponse>('/tasks', data, true);
  }
}
