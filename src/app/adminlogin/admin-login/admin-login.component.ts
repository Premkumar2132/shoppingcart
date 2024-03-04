import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ShoppingService } from '../../Services/shopping.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private shoppingService: ShoppingService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.shoppingService.adminLogin(this.loginForm.value)
      .subscribe(
        (response: { isAdmin: any; }) => {
          if (response.isAdmin) {
            console.log('Login successful');
            this.router.navigateByUrl('/admin-panel');
          } else {
            console.log('You are not an admin');
          }
          this.loading = false;
        },
        (        error: any) => {
          console.error('Error logging in:', error);
          this.loading = false;
        }
      );
  }

}
