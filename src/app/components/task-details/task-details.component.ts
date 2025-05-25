import { Component, Inject } from '@angular/core';
import { TaskResponse } from '../../services/task/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: TaskResponse, private matDialog: MatDialogRef<TaskDetailsComponent>) { }
  close() {
    this.matDialog.close();
  }
}
