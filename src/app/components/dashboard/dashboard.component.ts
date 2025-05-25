import { TaskService } from './../../services/task/task.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/userService/user-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FileManagerDialogComponent } from '../file-manager-dialog/file-manager-dialog.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  members: any[] = [];
  tasks: any[] = [];
  authService = inject(AuthService);
  userService = inject(UserService);
  taskService = inject(TaskService);
  router = inject(Router);
  user: any = null;
  constructor(private dialog: MatDialog) {

  }
  ngOnInit() {
    this.user = this.authService.getUserInfo()
    this.getAllUsers();
    this.getAllTasks();

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
  getAllTasks() {
    this.taskService.getAllTasks().pipe(first()).subscribe({
      next: (res) => {
        this.tasks = res as any[];
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(FileManagerDialogComponent, {
      width: '400px',
      data: { name: 'Upload File' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openTaskDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { name: 'Create Task' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.createTask(result).pipe(first()).subscribe({
          next: (res) => {
            console.log(res);
            this.getAllTasks();
          },
          error: (err) => {
            console.error(err);
          }
        })
      }
      console.log('The dialog was closed');
    });
  }
  openTaskDetails(task: any) {
    this.dialog.open(TaskDetailsComponent, {
      data: task,
      width: '400px',
      panelClass: 'task-dialog-panel'
    });
  }
}
