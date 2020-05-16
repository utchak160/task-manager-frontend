import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthRepository} from '../repositories/auth.repository';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private authRepository: AuthRepository, private router: Router) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    console.log('[Login Called]', form.value);
    this.authRepository.login(form.value).subscribe((res) => {
      console.log('[Submit]', res);
      this.router.navigateByUrl('/counter');
      console.log(form.value);
      this.form.reset();
    }, (error) => {
      form.reset();
      alert(error);
    });
  }
}
