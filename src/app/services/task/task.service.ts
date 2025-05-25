import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface TaskRequest {
  name: string;
  description: string;
  priority: string;
  deadline: Date;
  assignedUserId?: number;
}

export interface TaskResponse {
  id: number;
  name: string;
  description: string;
  priority: string;
  deadline: Date;
  completed: boolean;
  assignedUserName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';
  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(this.apiUrl);
  }

  createTask(task: TaskRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.apiUrl, task);
  }
}
