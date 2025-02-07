import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/**
 * ProfileEditComponent provides a form for users to update their profile information.
 *
 * This component allows users to edit their username, password, email, and birthday.
 * After a successful update, the changes are saved both in the backend and in local storage.
 *
 * @class ProfileEditComponent
 */
@Component({
  selector: 'app-profile-edit',
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent implements OnInit {
  /**
   * Stores the username of the user.
   *
   * @property {string}
   */
  Username = '';

  /**
   * Holds user input data for updating their profile.
   *
   * @property {string} Username - The updated username.
   * @property {string} Password - The updated password.
   * @property {string} Email - The updated email.
   * @property {string} Birthday - The updated birthday.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of ProfileEditComponent.
   *
   * @param {UserRegistrationService} fetchApiData - Service to handle user profile updates.
   * @param {MatDialogRef<ProfileEditComponent>} dialogRef - Reference to the dialog window.
   * @param {MatSnackBar} snackBar - Snackbar service for displaying notifications.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that runs when the component initializes.
   *
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Sends updated user data to the backend.
   * - Updates the local storage with the new user information.
   * - Closes the dialog after a successful update.
   * - Reloads the page to reflect changes.
   *
   * @returns {void}
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result: any) => {
        this.userData = result;
        this.dialogRef.close();
        this.snackBar.open('User information updated', 'OK', {
          duration: 2000,
        });
        //save updated user data to local storage
        const newUser = JSON.stringify(result);
        localStorage.setItem('user', newUser);
        //Reload the page to apply changes
        window.location.reload();
      },
      (error: any) => {
        this.snackBar.open(error, 'OK', { duration: 2000 });
      }
    );
  }
}
