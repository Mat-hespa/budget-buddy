import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Anytown, USA'
  };

  constructor(private router: Router) {}

  navigateBack() {
    this.router.navigate(['/']);
  }

  logout() {
    // Implement logout logic here
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}