import { Component, Inject } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-toggle-favorite',
  imports: [],
  templateUrl: './toggle-favorite.component.html',
  styleUrl: './toggle-favorite.component.scss',
})
export class ToggleFavoriteComponent {
  movie: any;
  user: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar
  ) {
    const storedData = localStorage.getItem('user');
    this.user = JSON.parse(storedData || '');
    this.movie = data;
  }

  ngOnInit(): void {}

  addFavorite(movie: any): void {
    this.fetchApiData
      .addFavorite(this.user.Username, movie._id)
      .subscribe((result) => {
        console.log(result);
        this.user.FavMovies.push(movie._id);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.snackBar.open('Movie added to favorites', 'OK', {
          duration: 2000,
        });
      });
  }
}
