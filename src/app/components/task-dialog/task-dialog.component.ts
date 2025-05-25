import { UserService } from './../../services/userService/user-service.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent implements OnInit {
  ngOnInit(): void {
    this.getAllUsers();
  }
  taskForm: FormGroup;
  selectedUserId: number = 0;
  UserService = inject(UserService);
  users: any[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      priority: [''],
      deadline: [''],
      assignedUserId: ['']
    });
  }
  getAllUsers() {
    this.UserService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res as any[];
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  saveTask() {
    if (this.taskForm.valid) {
      this.taskForm.value.deadline = new Date(this.taskForm.value.deadline).toISOString();
      const obj = { ...this.taskForm.value };
      this.dialogRef.close(obj);
    }
  }
  modelChange(event: any) {
    console.log(event);
  }
  cancel() {
    this.dialogRef.close();
  }
}
