import {Injectable} from '@angular/core';
import {TaskService} from '../services/task.service';
import {Observable} from 'rxjs';
import {ShowResponse} from '../response/showResponse';
import {TaskResponse} from '../response/task';
import {Store} from '@ngrx/store';
import {AppState, getTask, getTaskLoading} from '../store';
import {catchError, filter, map, switchMap, take, tap} from 'rxjs/operators';
import {TaskFailed, TaskFetched, TaskFetchFailed, TaskFetching, TaskSent, TaskSuccess} from '../../dashboard/store/dashboard.action';
import {Task} from '../../models/task';

@Injectable({
  providedIn: 'root'
})

export class TaskRepository {
  constructor(private taskService: TaskService, private store: Store<AppState>) {
  }
  getTask(): Observable<Task[]> {
    return this.store.select(getTaskLoading).pipe(
      take(1),
      filter(i => !i),
      switchMap(() => {
        this.store.dispatch(TaskFetching());
        return this.taskService.getTask();
      }),
      tap((res) => {
        console.log('[Repo]', res);
        this.store.dispatch(TaskFetched({task: res}));
      }, e => {
        this.store.dispatch(TaskFetchFailed());
        console.log('[Repo]', e);
        alert(e.message);
      })
    );
  }
  addTask(task): Observable<ShowResponse<TaskResponse>> {
    return this.store.select(getTaskLoading).pipe(
      take(1),
      filter(i => !i),
      switchMap(() => {
        this.store.dispatch(TaskSent());
        return this.taskService.addTask(task);
      }),
      tap((res) => {
        console.log(task);
        this.store.dispatch(TaskSuccess({ task }));
        console.log(res);
      }, e => {
        this.store.dispatch(TaskFailed());
        console.log('[Repo]', e);
        alert(e.message);
      })
    );
  }
}
