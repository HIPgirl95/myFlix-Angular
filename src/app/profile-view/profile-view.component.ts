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

/**
 * ProfileViewComponent is responsible for displaying user profile information,
 * allowing users to edit their profile and manage favorite movies.
 *
 * @class ProfileViewComponent
 */
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
  /**
   * Stores the user's profile information
   *
   * @type any
   */
  userData: any = {};
  /**
   * Stores a list of the user's favorite movies
   *
   * @type any[]
   */
  favoriteMovies: any[] = [];

  /**
   * creates an instance of ProfileViewComponent
   *
   * @param {MatDialog} dialog - service for opening dialog components
   * @param {UserRegistrationService} fetchApiData - service for connecting to the API
   */
  constructor(
    public dialog: MatDialog,
    public fetchApiData: UserRegistrationService
  ) {
    //load user data from local storage
    const storedData = localStorage.getItem('user');
    this.userData = JSON.parse(storedData || '');
  }

  /**
   * lifecycle hook that runs when the component initializes.
   * calls API functions to load user data and favorite movies
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.fetchApiData.getUser();
    this.loadFavoriteMovies();
    this.formatBirthday();
  }

  /**
   * Formats the user's birthday to a more readable style
   *
   * @returns {void}
   */
  formatBirthday(): void {
    const [year, month, day] = this.userData.Birthday.split('T')[0].split('-');
    this.userData.Birthday = `${month}/${day}/${year}`;
  }

  /**
   * Opens the profile edit dialog to allow users to modify their information
   *
   * @returns {void}
   */
  openProfileEditComponent(): void {
    this.dialog.open(ProfileEditComponent, { width: '500px' });
  }

  /**
   * Opens the toggle favorite movie dialog, allowing users to add or remove a movie
   * from their favorites list
   *
   * @param {any} movie - the movie to be toggled in favorites list
   * @returns {void}
   */
  executeToggleFavorite(movie: any): void {
    this.dialog.open(ToggleFavoriteComponent, {
      data: movie,
    });
  }

  /**
   * Loads the user's favorite movies by filtering the full movie list
   *
   * @returns {void}
   */
  loadFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = movies.filter((movie) =>
        this.userData.FavMovies.includes(movie._id)
      );
    });
  }
}
