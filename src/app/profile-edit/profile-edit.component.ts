import { Component, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-profile-edit',
  imports: [MatCardModule, FormsModule, MatFormFieldModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result: any) => {
        this.dialogRef.close();
        this.snackBar.open('User information updated', 'OK', {
          duration: 2000,
        });
      },
      (error: any) => {
        this.snackBar.open(error, 'OK', { duration: 2000 });
      }
    );
  }
}
