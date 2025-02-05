import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';

/**
 * GenreInfoComponent is responsible for displaying information about a specific movie genre.
 * It fetches genre data and displays it in a dialog window.
 *
 * @class GenreInfoComponent
 */
@Component({
  selector: 'app-genre-info',
  imports: [MatCardModule],
  templateUrl: './genre-info.component.html',
  styleUrl: './genre-info.component.scss',
})
export class GenreInfoComponent {
  genre: any; // Holds the genre data to be displayed in the dialog

  /**
   * Creates an instance of GenreInfoComponent.
   *
   * @param {any} data - Injected data, which contains the genre information to be displayed.
   * @param {UserRegistrationService} fetchApiData - Service to fetch additional genre data if necessary.
   * @param {MatDialogRef<GenreInfoComponent>} dialogRef - Reference to the dialog instance to control dialog behavior.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<GenreInfoComponent>
  ) {}

  /**
   * Initializes the component. Currently empty as no initial setup is needed.
   *
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Fetches additional information about a specific genre from the backend.
   * Updates the `genre` property with the fetched data.
   *
   * @param {any} genre - The genre for which to fetch additional information.
   * @returns {void}
   */
  getGenreInfo(genre: any): void {
    this.fetchApiData.getGenre(genre).subscribe((result: any) => {
      this.genre = result; // Store the fetched genre data
      return this.genre;
    });
  }

  /**
   * Closes the dialog window.
   *
   * @returns {void}
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
