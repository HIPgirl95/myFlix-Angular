import { Component } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToggleFavoriteComponent } from '../toggle-favorite/toggle-favorite.component';
import { MatButtonModule } from '@angular/material/button';

/**
 * MovieCardComponent is responsible for displaying movie cards with information
 * such as genre, director, synopsis, and allows users to toggle movies as favorites.
 *
 * @class MovieCardComponent
 */
@Component({
  selector: 'app-movie-card',
  // standalone: false,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    MatDialogModule,
    NavbarComponent,
    MatButtonModule,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  movies: any[] = []; // List of movies to display in the card
  user: any = {}; // The current logged-in user
  favoriteMovies: any[] = []; // List of the user's favorite movies

  /**
   * Creates an instance of MovieCardComponent.
   *
   * @param {any} fetchApiData - Service to handle fetching movie and user data.
   * @param {any} dialog - Dialog service for opening movie-related dialogs.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) {}

  /**
   * Initializes the component by loading favorite movies and all movies.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.getFavs();
    this.getMovies();
  }

  /**
   * Fetches all movies from the backend and updates the `movies` array.
   *
   * @returns {void}
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.isFavorite();
      return this.movies;
    });
  }

  /**
   * Fetches the current user's data and updates the `favoriteMovies` list.
   *
   * @returns {void}
   */
  getFavs(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.user = result;
      this.favoriteMovies = this.user.FavMovies;
    });
  }

  /**
   * Updates each movie in the `movies` array with the appropriate icon based on whether
   * it is a favorite or not.
   *
   * @returns {void}
   */
  isFavorite(): void {
    setTimeout(() => {
      this.movies.forEach((movie) => {
        this.favoriteMovies.includes(movie._id)
          ? (movie.icon = 'favorite') // If movie is in favorites, show the 'favorite' icon
          : (movie.icon = 'add'); // Otherwise, show the 'add' icon
      });
    }, 1000);
  }

  /**
   * Opens the GenreInfoComponent dialog with the selected genre's data.
   *
   * @param {any} genre - The genre data to pass to the dialog.
   * @returns {void}
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreInfoComponent, {
      data: genre,
    });
  }

  /**
   * Opens the DirectorInfoComponent dialog with the selected director's data.
   *
   * @param {any} director - The director data to pass to the dialog.
   * @returns {void}
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: director,
    });
  }

  /**
   * Opens the SynopsisComponent dialog with the selected movie's synopsis data.
   *
   * @param {any} synopsis - The synopsis data to pass to the dialog.
   * @returns {void}
   */
  openSynopsisDialog(synopsis: any): void {
    this.dialog.open(SynopsisComponent, {
      data: synopsis,
    });
  }

  /**
   * Opens the ToggleFavoriteComponent dialog to toggle the selected movie as a favorite.
   *
   * @param {any} movie - The movie to toggle as a favorite.
   * @returns {void}
   */
  executeToggleFavorite(movie: any): void {
    this.dialog.open(ToggleFavoriteComponent, {
      data: movie,
    });
  }
}
