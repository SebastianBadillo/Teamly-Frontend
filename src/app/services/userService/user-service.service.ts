import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/api/users';
  constructor(private http: HttpClient) { }
  getAllUsers() {
    return this.http.get(this.url);
  }


}
