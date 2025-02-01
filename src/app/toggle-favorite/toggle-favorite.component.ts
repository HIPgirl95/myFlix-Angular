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
  user = localStorage.getItem('user');

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  isFavorite(movie: any): boolean {
    const favorite = this.favorites.filter((title) => title === movie.Title);
    return favorite.length ? true : false;
  }

  addFavorite(user: any, movie: any): void {
    this.fetchApiData
      .addFavorite(user.username, this.movie)
      .subscribe((result) => {
        console.log(result);
        user.FavMovies.push(movie.Title);
        localStorage.setItem('user', JSON.stringify(user));

        this.favorites.push(movie.Title);
        this.snackBar.open('Movie added to favorites', 'OK', {
          duration: 2000,
        });
      });
  }
}
