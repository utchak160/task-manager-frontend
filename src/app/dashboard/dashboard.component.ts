import { Component, OnInit } from '@angular/core';
import {AuthRepository} from '../auth/repositories/auth.repository';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authRepository: AuthRepository) { }

  ngOnInit(): void {
  }

}
