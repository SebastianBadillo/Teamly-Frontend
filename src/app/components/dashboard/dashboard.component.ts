import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  members = [{ name: 'John Doe', role: 'Admin' }, { name: 'Jane Smith', role: 'User' }];
  tasks = [{ title: 'Task 1', description: 'Description 1' }, { title: 'Task 2', description: 'Description 2' }];
  authService = inject(AuthService);
  user: any = null;
  constructor() {

  }
  ngOnInit() {
    this.user = this.authService.getUserInfo()
  }
}
