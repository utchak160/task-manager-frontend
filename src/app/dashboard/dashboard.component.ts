import { Component, OnInit } from '@angular/core';
import {TaskRepository} from '../auth/repositories/task.repository';
import { Subscription} from 'rxjs';
import {Task} from '../models/task';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {getProfile, getTask} from '../auth/store';
import * as fromApp from '../auth/store/index';
import {AuthRepository} from '../auth/repositories/auth.repository';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: FormGroup;
  profile: User;
  isFetched = false;
  tasks: Task[];
  fetch: Subscription;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private taskRepository: TaskRepository,
              private authRepository: AuthRepository,
              private store: Store<fromApp.AppState>) {
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
     this.store.pipe(select('user')).pipe(map(UserState => UserState.profile)).subscribe((res) => {
      this.profile = res;
    });
     console.log('[Select]', this.tasks);
     this.fetch = this.taskRepository.getTask().subscribe((res) => {
      console.log('[Task]', res);
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

  getProfile() {
    this.authRepository.getProfile().subscribe((res) => {
      console.log('[Dashboard]', res);
      // this.profile = res;
      console.log('[Profile]', this.profile);
      this.isFetched = true;
    }, error => {
      this.isFetched = false;
      alert(error.message);
      console.log('[Dashboard]', error);
    });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete?')) {
      this.authRepository.deleteProfile().subscribe((res) => {
        console.log('[Delete Success]', res);
        this.router.navigateByUrl('/register');
      }, error => {
        console.log('[Delete Fail]', error);
        alert(error.message);
      });
    }
  }

  onRemove(i: number, id: string) {
    console.log(i);
    // this.tasks.splice(i, 1);
    // this.store.select('task').pipe(map(state => state.task.filter(task => task._id === id)))
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.taskRepository.removeTask(id, i);
    //   }, error => {
    //     console.log(error);
    //   });
    this.taskRepository.removeTask(id, i).subscribe((res) => {
      console.log(res);
    });
  }
}

