import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router) {}
  user = { name: '', email: '', password: '' };

  registerUser() {
    localStorage.setItem('user', JSON.stringify(this.user));
    alert('Registration Successful! User data saved in local storage.');
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
      
}
