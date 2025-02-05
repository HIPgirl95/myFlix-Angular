import { Component, OnInit, Input } from '@angular/core';

//Used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//used to fetch API
import { UserRegistrationService } from '../fetch-api-data.service';

//used to display notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/**
 * UserRegistrationFormComponent is responsible for filling a dialog with form fields to
 * register a new user's information
 *
 * @class UserRegistrationFormComponent
 * @implements OnInit
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss',
  // standalone: false,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Holds user input data for registration.
   *
   * @property {Object} userData
   * @property {string} userData.Username - The user's chosen username.
   * @property {string} userData.Password - The user's password.
   * @property {string} userData.Email - The user's email address.
   * @property {string} userData.Birthday - The user's date of birth.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   *
   * @param {UserRegistrationService} fetchApiData - Service to handle user registration requests.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog window.
   * @param {MatSnackBar} snackBar - Snackbar service for displaying notifications.
   * @param {Router} router - Router service for navigation.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
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
   * Sends user registration data to the backend.
   * Closes the dialog on success and displays a confirmation message.
   * Navigates to the welcome page after successful registration.
   *
   * @returns {void}
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result: any) => {
        this.dialogRef.close();
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['welcome']);
      },
      (error: any) => {
        this.snackBar.open(error, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
