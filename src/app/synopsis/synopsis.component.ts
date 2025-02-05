import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

/**
 * SynopsisComponent is responsible for displaying a movie's synopsis inside a dialog.
 * It retrieves movie details from the backend when necessary.
 *
 * @class SynopsisComponent
 */
@Component({
  selector: 'app-synopsis',
  imports: [MatCardModule],
  templateUrl: './synopsis.component.html',
  styleUrl: './synopsis.component.scss',
})
export class SynopsisComponent {
  /**
   * Stores the retrieved synopsis data for the movie.
   *
   * @type {any}
   */
  synopsis: any;

  /**
   * Creates an instance of SynopsisComponent.
   *
   * @param {any} data - Data passed into the dialog, typically containing movie details.
   * @param {UserRegistrationService} fetchApiData - Service for retrieving movie data from the backend.
   * @param {MatDialogRef<SynopsisComponent>} dialogRef - Reference to the dialog window.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<SynopsisComponent>
  ) {}

  /**
   * Lifecycle hook that runs when the component initializes.
   *
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Fetches the synopsis of a movie from the backend and stores it.
   *
   * @param {any} synopsis - The movie identifier used to fetch data.
   * @returns {void}
   */
  getSynopsisInfo(synopsis: any): void {
    this.fetchApiData.getMovie(synopsis).subscribe((result: any) => {
      this.synopsis = result;
      return this.synopsis;
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
