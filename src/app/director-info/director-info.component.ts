import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

/**
 * DirectorInfoComponent is responsible for displaying information about a specific movie director.
 * It fetches director data and displays it in a dialog window.
 *
 * @class DirectorInfoComponent
 */
@Component({
  selector: 'app-director-info',
  imports: [MatCardModule],
  templateUrl: './director-info.component.html',
  styleUrl: './director-info.component.scss',
})
export class DirectorInfoComponent {
  director: any; // Holds the director data to be displayed in the dialog

  /**
   * Creates an instance of directorInfoComponent.
   *
   * @param {any} data - Injected data, which contains the director information to be displayed.
   * @param {UserRegistrationService} fetchApiData - Service to fetch additional director data if necessary.
   * @param {MatDialogRef<DirectorInfoComponent>} dialogRef - Reference to the dialog instance to control dialog behavior.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<DirectorInfoComponent>
  ) {}

  /**
   * Initializes the component. Currently empty as no initial setup is needed.
   *
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Fetches additional information about a specific director from the backend.
   * Updates the `director` property with the fetched data.
   *
   * @param {any} director - The director for which to fetch additional information.
   * @returns {void}
   */
  getDirectorInfo(director: any): void {
    this.fetchApiData.getDirector(director).subscribe((result: any) => {
      this.director = result; // Store the fetched director data
      return this.director;
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
