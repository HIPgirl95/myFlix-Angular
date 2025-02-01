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
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  toggleFavorite(movie: any): boolean {
    this.fetchApiData.addFavorite;
    return false;
  }
}
