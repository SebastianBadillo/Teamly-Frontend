import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  uploadFile(formData: FormData) {
    return this.http.post<any>(`${this.baseUrl}/api/files/upload`, formData);
  }

  getAllFiles() {
    return this.http.get<any[]>(`${this.baseUrl}/api/files`);
  }

  downloadFile(id: number) {
    return this.http.get(`${this.baseUrl}/api/files/${id}`, { responseType: 'blob' });
  }

  deleteFile(id: number) {
    return this.http.delete(`${this.baseUrl}/api/files/delete/${id}`);
  }
}
