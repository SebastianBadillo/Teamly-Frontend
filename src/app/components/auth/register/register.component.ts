import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;
  router = inject(Router);
  AuthService = inject(AuthService);
  snackbar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.AuthService.register(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard']);
          this.snackbar.open('Registro exitoso', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'snackbar-success'
          });
        },
        error: (err) => {
          console.log(err);
          this.snackbar.open('Error al registrarse ' + err.error.message?.toLowerCase(), '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'snackbar-error'
          });
          console.error(err);
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

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
