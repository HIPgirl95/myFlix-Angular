import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile-view',
  standalone: false,
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
})
export class ProfileViewComponent {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  openProfileEditComponent(): void {
    this.dialog.open(ProfileEditComponent, { width: '280px' });
  }
}
