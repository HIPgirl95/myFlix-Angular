import { Component } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toggle-favorite',
  imports: [],
  templateUrl: './toggle-favorite.component.html',
  styleUrl: './toggle-favorite.component.scss',
})
export class ToggleFavoriteComponent {
  favorites: any[] = [];
  movie: any;
  userData: any = {};
  // user = localStorage.getItem('user');

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar
  ) {
    const storedData = localStorage.getItem('user');
    this.userData = JSON.parse(storedData || '');
  }

  ngOnInit(): void {}

  isFavorite(movie: any): boolean {
    const favorite = this.favorites.filter((title) => title === movie.Title);
    return favorite.length ? true : false;
  }

  // addFavorite(movie: any): void {
  //   this.fetchApiData.addFavorite(movie.Title).subscribe((result) => {
  //     console.log(result);
  //     const user = JSON.parse(localStorage.getItem('user') || '');
  //     user.FavMovies.push(movie.Title);
  //     this.favorites.push(movie);
  //     this.snackBar.open('Movie added to favorites', 'OK', {
  //       duration: 2000,
  //     });
  //   });
  // }

  toggleFavorite(movie: any): void {
    this.fetchApiData.removeFavorite(movie).subscribe((movies: any) => {
      this.favorites = movies.filter((movie: any) =>
        this.userData.FavMovies.includes(movie._id)
      );
    });
  }
}
