import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { Router } from '@angular/router';
import { FlashMessageService } from '../../../core/services/flash-message.service';
import { ValidateAllFormFields } from '../../../core/utils/CustomValidator';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login-component.html',
})
export class LoginComponent implements OnInit {
  rForm!: FormGroup;
  isLoggedIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private flashService: FlashMessageService
  ) { }

  ngOnInit(): void {
    // if user is logged in then user not redirect on '/login' page.
    if (this.tokenStorageService.isAuthenticated()) {
      this.router.navigate(['']);
      this.isLoggedIn = true;
    }

    this.rForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  // submit
  onSubmit(): void {
    if (this.rForm.valid) {
      this.authService.login(this.rForm.value).subscribe({
        next: (data) => {
          if (data.accessToken) {
            this.tokenStorageService.saveToken(data.accessToken);
            this.tokenStorageService.saveUser(data.user);
            this.router.navigate(['']);
            this.flashService.show('Welcome Back!', 'success');
          }
        },
        error: (error) => {
          this.rForm.markAsUntouched();
          this.flashService.show(error.error.message, 'error');
        },
      });
    } else {
      ValidateAllFormFields.validateAllFormFields(this.rForm);
    }
  }
}
