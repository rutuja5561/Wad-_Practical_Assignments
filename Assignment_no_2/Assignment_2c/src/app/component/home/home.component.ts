import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: any = null;
  backgroundImage = 'background.jpg';

  constructor(private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
