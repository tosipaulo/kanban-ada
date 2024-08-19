import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RouterLink,
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenService.hasToken()) {
      this.tokenService.removeToken();
    }
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  submit() {
    this.isLoading = true;
    if (this.form.valid) {
      const { login, senha } = this.form.value;
      this.authService.authenticate({ login, senha }).subscribe({
        next: (token) => {
          this.isLoading = false;
          this.tokenService.setToken(token);
          this.router.navigate(['board']);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
        },
      });
    }
  }

}
