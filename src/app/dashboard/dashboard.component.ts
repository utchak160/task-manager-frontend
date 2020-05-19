import { Component, OnInit } from '@angular/core';
import {TaskRepository} from '../auth/repositories/task.repository';
import {Observable, Subscription} from 'rxjs';
import {Task} from '../models/task';
import {ShowResponse} from '../auth/response/showResponse';
import {TaskResponse} from '../auth/response/task';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState, getTask} from '../auth/store';
import {TaskFetched, TaskSuccess} from './store/dashboard.action';
import {HttpService} from '../auth/services/http.service';
import {TaskState} from './store/dashboard.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: FormGroup;
  tasks: Task[];
  task$: Task[];
  fetch: Subscription;
  constructor(private formBuilder: FormBuilder,
              private taskRepository: TaskRepository,
              private store: Store<AppState>) {
    // this.tasks = store.pipe(select('task'));
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.email]],
      completed: ['', Validators.required]
    });
  }
  ngOnInit() {
     this.store.pipe(select(getTask)).subscribe((res) => {
       this.tasks = res;
     });
     console.log('[Select]', this.tasks);
     this.fetch = this.taskRepository.getTask().subscribe((res) => {
      console.log('[Task]', res);
      this.task$ = res;
    }, error => {
      console.log('[Task]', error);
      alert(error.member);
    });
  }

  onSubmit(form) {
    this.taskRepository.addTask(form.value).subscribe((res) => {
      console.log('[Select]', this.tasks);
      console.log(res);
      this.form.reset();
    }, error => {
      console.log('[Task]', error);
      alert(error.member);
    });
  }
}

