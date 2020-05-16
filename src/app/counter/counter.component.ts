import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {decreament, increament, reset} from '../counter.action';
import {AuthRepository} from '../auth/repositories/auth.repository';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {Constants} from '../utils/constants';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  count$: Observable<number>;
  profile$: Observable<User>;

  constructor(private store: Store<{ count: number }>, private authRepository: AuthRepository, private router: Router) {
    this.count$ = store.pipe(select('count'));
  }

  ngOnInit(): void {
  }

  increament() {
    this.store.dispatch(increament());
  }

  decreament() {
    this.store.dispatch(decreament());
  }

  reset() {
    this.store.dispatch(reset());
  }

  Logout() {
    console.log('[Logout Called]');
    this.authRepository.logout().subscribe(() => {
      console.log('[Logout success]');
      this.router.navigateByUrl('/login').then(r => {
        console.log(r);
      });
    }, error => {
      console.log('[Logout]', error);
      alert(error.message);
    });
  }
}
