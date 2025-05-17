import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  router = inject(Router);
  authService = inject(AuthService);
  snackbar = inject(MatSnackBar);
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {

      this.authService.login(this.form.value).subscribe({
        next: (res) => {

          this.snackbar.open('Login exitoso', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'snackbar-success'
          });
          this.authService.setUserInfo(res);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.snackbar.open('Error al iniciar sesión ' + err.error.message?.toLowerCase(), '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'snackbar-error'
          });
        }
      });
    } else {
      this.snackbar.open('Por favor completa todos los campos', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'snackbar-error'
      });

    }
  }


  goToRegister() {
    this.router.navigate(['/register']);
  }
}
