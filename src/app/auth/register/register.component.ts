import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {User} from '../../models/user';
import {RegisterSent, RegisterSuccess} from '../store/auth.action';
import {Observable, pipe} from 'rxjs';
import {AuthRepository} from '../repositories/auth.repository';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authRepository: AuthRepository, private router: Router) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    console.log('[Register Called]', form.value);
    this.authRepository.register(form.value).subscribe((res) => {
      this.router.navigateByUrl('/login');
      console.log(form.value);
      this.form.reset();
    }, (error) => {
      form.reset();
      alert(error.message);
    });
  }
}
