import { Component, Inject } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * ToggleFavoriteComponent provides functionality for adding or removing a movie
 * from the user's list of favorite movies. It displays a confirmation dialog
 * with dynamic text based on whether the movie is already a favorite.
 *
 * @class ToggleFavoriteComponent
 */
@Component({
  selector: 'app-toggle-favorite',
  imports: [MatButtonModule],
  templateUrl: './toggle-favorite.component.html',
  styleUrl: './toggle-favorite.component.scss',
})
export class ToggleFavoriteComponent {
  /**
   * The movie being toggled as a favorite.
   *
   * @type {any}
   */
  movie: any;
  /**
   * The currently logged-in user and their data.
   *
   * @type {any}
   */
  user: any = {};

  /**
   * Creates an instance of ToggleFavoriteComponent.
   *
   * @param {any} data - The movie data passed into the dialog.
   * @param {UserRegistrationService} fetchApiData - Service to handle API requests.
   * @param {MatSnackBar} snackBar - Snackbar service for displaying notifications.
   * @param {MatDialogRef<ToggleFavoriteComponent>} dialgogRef - Reference to the dialog window.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialgogRef: MatDialogRef<ToggleFavoriteComponent>
  ) {
    const storedData = localStorage.getItem('user');
    this.user = JSON.parse(storedData || '');
    this.movie = data;
  }

  /**
   * Lifecycle hook that runs when the component initializes.
   *
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Returns dynamic text for the button based on whether the movie is
   * currently in the user's favorites list.
   *
   * @param {any} movie - The movie to check.
   * @returns {string} - The appropriate button text.
   */
  getDynamicText(movie: any): string {
    if (this.user.FavMovies.includes(movie._id)) {
      return 'Remove from Favorites?';
    } else {
      return 'Add to Favorites?';
    }
  }

  /**
   * Toggles the movie's favorite status. If the movie is in the user's favorites,
   * it removes it; otherwise, it adds it. Updates local storage and provides
   * user feedback through a snackbar notification.
   *
   * @param {any} movie - The movie to toggle.
   * @returns {void}
   */
  toggleFavorite(movie: any): void {
    if (this.user.FavMovies.includes(movie._id)) {
      //remove movie from favorites
      this.fetchApiData
        .removeFavorite(this.user.Username, movie._id)
        .subscribe((result) => {
          this.dialgogRef.close();
          const index = this.user.FavMovies.indexOf(movie._id);
          this.user.FavMovies.splice(index, 1);
          this.user = result;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.snackBar.open('Movie removed from favorites', 'OK', {
            duration: 2000,
          });
        });
    } else {
      //add movie to favorites
      this.fetchApiData
        .addFavorite(this.user.Username, movie._id)
        .subscribe((result) => {
          this.dialgogRef.close();
          this.user.FavMovies.push(movie._id);
          localStorage.setItem('user', JSON.stringify(this.user));
          this.snackBar.open('Movie added to favorites', 'OK', {
            duration: 2000,
          });
        });
    }
  }
}
