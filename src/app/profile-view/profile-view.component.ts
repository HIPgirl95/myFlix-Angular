import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-view',
  standalone: false,
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
})
export class ProfileViewComponent implements OnInit {
  userData: any = {};
  constructor(
    public dialog: MatDialog,
    public fetchApiData: UserRegistrationService
  ) {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
  }
  ngOnInit(): void {}

  openProfileEditComponent(): void {
    this.dialog.open(ProfileEditComponent, { width: '280px' });
  }
}
