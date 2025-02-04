import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToggleFavoriteComponent } from '../toggle-favorite/toggle-favorite.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-view',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    NavbarComponent,
    MatIconModule,
  ],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
})
export class ProfileViewComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];
  constructor(
    public dialog: MatDialog,
    public fetchApiData: UserRegistrationService
  ) {
    const storedData = localStorage.getItem('user');
    this.userData = JSON.parse(storedData || '');
  }
  ngOnInit(): void {
    this.fetchApiData.getUser();
    this.loadFavoriteMovies();
    this.formatBirthday();
  }

  formatBirthday(): void {
    const [year, month, day] = this.userData.Birthday.split('T')[0].split('-');
    this.userData.Birthday = `${month}/${day}/${year}`;
  }

  openProfileEditComponent(): void {
    this.dialog.open(ProfileEditComponent, { width: '500px' });
  }

  executeToggleFavorite(movie: any): void {
    this.dialog.open(ToggleFavoriteComponent, {
      data: movie,
    });
  }

  loadFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = movies.filter((movie) =>
        this.userData.FavMovies.includes(movie._id)
      );
    });
  }
}
