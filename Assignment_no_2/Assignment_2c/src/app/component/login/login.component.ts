import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor (private router: Router){}
  loginData = { email: '', password: '' };

  loginUser() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (storedUser.email === this.loginData.email && storedUser.password === this.loginData.password) {
      alert('Login Successful!');
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials!');
    }
  }

    show(){
      this.router.navigate(['register']);
    }
}
