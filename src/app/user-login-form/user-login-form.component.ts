import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/**
 * UserLoginFormComponent is responsible for filling a dialog with form fields
 * to log in an existing user
 *
 * @class UserLoginFormComponent
 * @implements OnInit
 */
@Component({
  selector: 'app-user-login-form',
  // standalone: false,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Holds user input data for logging in.
   *
   * @property {Object} userData
   * @property {string} userData.Username - The user's chosen username.
   * @property {string} userData.Password - The user's password.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   *
   * @param {UserRegistrationService} fetchApiData - Service to handle user login requests.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the dialog window.
   * @param {MatSnackBar} snackBar - Snackbar service for displaying notifications.
   * @param {Router} router - Router service for navigation.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that runs when the component initializes.
   *
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Sends user login data to the backend.
   * On successful login, stores the user data and token in local storage.
   * Closes the dialog on success and displays a confirmation message.
   * Navigates to the welcome page after successful login.
   *
   * @returns {void}
   */
  loginUser(): void {
    this.fetchApiData.loginUser(this.userData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open('Successfully logged in!', 'OK', { duration: 2000 });
        this.router.navigate(['users']);
      },
      (error) => {
        this.snackBar.open(error, 'OK', { duration: 2000 });
      }
    );
  }
}
