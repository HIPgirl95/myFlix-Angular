import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-info',
  imports: [MatCardModule],
  templateUrl: './director-info.component.html',
  styleUrl: './director-info.component.scss',
})
export class DirectorInfoComponent {
  director: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<DirectorInfoComponent>
  ) {}

  ngOnInit(): void {}

  getDirectorInfo(director: any): void {
    this.fetchApiData.getDirector(director).subscribe((result: any) => {
      this.director = result;
      return this.director;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
