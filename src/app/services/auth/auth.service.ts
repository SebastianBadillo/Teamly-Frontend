import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../../interfaces/RegisterRequest.interface';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../interfaces/AuthResponse.interface';
import { LoginRequest } from '../../interfaces/LoginRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/auth'; // Ajusta si usas un proxy
  private userInfo: any = null;

  constructor(private http: HttpClient) { }
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data);
  }

  setUserInfo(user: any) {
    this.userInfo = user;
  }
  getUserInfo() {
    return this.userInfo;
  }
}
