import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * WelcomePageComponent is responsible for displaying the welcome page and
 * opening the login and registration dialog windows
 *
 * @class WelcomePageComponent
 */

@Component({
  selector: 'app-welcome-page',
  imports: [MatButtonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  /**
   * Creates an instance of WelcomePageComponent
   * @param {MatDialog} dialog - dialog service to manage opening of dialogs
   */

  constructor(public dialog: MatDialog) {}

  /**
   * Initializes the component
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Open the user registration dialog when called. width is set to 280px
   *
   * @returns {void}
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
  }

  /**
   * Open the user login dialog when called. width is set to 280px
   *
   * @returns {void}
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, { width: '280px' });
  }
}
