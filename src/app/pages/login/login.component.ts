import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SigninComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

}
