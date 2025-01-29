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

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss',
  // standalone: false,
  imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  //this is the function responsible for sending the form inputs to the backend
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
