import { Component, Inject } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toggle-favorite',
  imports: [MatButtonModule],
  templateUrl: './toggle-favorite.component.html',
  styleUrl: './toggle-favorite.component.scss',
})
export class ToggleFavoriteComponent {
  movie: any;
  user: any = {};

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

  ngOnInit(): void {}

  getDynamicText(movie: any): string {
    if (this.user.FavMovies.includes(movie._id)) {
      return 'Remove from Favorites?';
    } else {
      return 'Add to Favorites?';
    }
  }

  toggleFavorite(movie: any): void {
    if (this.user.FavMovies.includes(movie._id)) {
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
