import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  form: FormGroup;
  message = '';
  error = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.error = false;
      },
      error: (err: any) => {
        this.message = err.error?.message || 'Login failed';
        this.error = true;
      }
    });
  }
}
