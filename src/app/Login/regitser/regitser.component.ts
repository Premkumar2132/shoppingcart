import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserData } from '../../home/content/contentInterface.component';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ShoppingService } from '../../Services/shopping.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-regitser',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './regitser.component.html',
  styleUrl: './regitser.component.css'
})
export class RegitserComponent {
  registerForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private shoppingService: ShoppingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.checkPasswords
    });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData: UserData = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      this.shoppingService.register(userData).subscribe(
        () => {
          this.router.navigateByUrl('/login');
        },
        error => {
          this.errorMessage = error.message;
        }
      );
    }
  }
}
