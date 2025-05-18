import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/userService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  members: any[] = [];
  tasks = [{ title: 'Task 1', description: 'Description 1' }, { title: 'Task 2', description: 'Description 2' }];
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  user: any = null;
  constructor() {

  }
  ngOnInit() {
    this.user = this.authService.getUserInfo()
    this.getAllUsers();

  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.members = res as any[];
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  sendToChat(id: number) {
    this.router.navigate(['/chat', id]);

  }
}
