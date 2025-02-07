import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

/**
 * NavbarComponent is responsible for rendering the navigation bar in the application.
 * It includes a logout button that removes user credentials from localStorage.
 *
 * @class NavbarComponent
 */
@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatListModule, RouterLink, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  /**
   * Logs out the current user by removing user data and token from localStorage.
   * After logout, the user's session data is cleared.
   *
   * @returns {void} This method doesn't return any value.
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log(localStorage.getItem('user'));
  }
}
