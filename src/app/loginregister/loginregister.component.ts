import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.css']
})
export class LoginregisterComponent {

  isLoginMode = true;
  authForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      username: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['']
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.authForm.removeControl('username');
      this.authForm.removeControl('confirmPassword');
    } else {
      this.authForm.addControl('username', this.fb.control('', Validators.required));
      this.authForm.addControl('confirmPassword', this.fb.control('', Validators.required));
    }
  }
  

onSubmit() {
  // First: validate the form before doing anything
  // if (this.authForm.invalid) {
  //   console.warn(' Form is invalid');
  //   return;
  // }

  // Retrieve values
  const email = this.authForm.get('email')?.value?.trim();
  const password = this.authForm.get('password')?.value?.trim();
  const confirmPassword = this.authForm.get('confirmPassword')?.value?.trim();
  const username = this.authForm.get('username')?.value?.trim();

  if (this.isLoginMode) {
    this.loginService.loginUser(email, password).subscribe({
      next: (users) => {
        console.log(' API response:', users);
        if (users.length > 0) {
          console.log(' Login successful, navigating to dashboard');
          localStorage.setItem('user', JSON.stringify(users[0]));
          this.router.navigate(['/dashboard']);
        } else {
          alert(' Invalid email or password');
        }
      },
      error: (err) => {
        console.error(' Login API error:', err);
      }
    });

  } else {

    if (password !== confirmPassword) {
      alert(' Passwords do not match');
      return;
    }

    this.loginService.checkEmailExists(email).subscribe({
      next: (existing) => {
        if (existing.length > 0) {
          alert(' Email already exists.! Please use a different Email');
          this.authForm.reset();
          return;
        } else {
          const newUser = { email, password, username };

          this.loginService.registerUser(newUser).subscribe({
            next: () => {
              alert(' Registration successful');
              this.authForm.reset();
              this.toggleMode(); // Switch to login mode
            },
            error: (err) => {
              console.error(' Registration API error:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error(' checkEmailExists API error:', err);
      }
    });
  }
}
}

