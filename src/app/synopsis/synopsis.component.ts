import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-synopsis',
  imports: [MatCardModule],
  templateUrl: './synopsis.component.html',
  styleUrl: './synopsis.component.scss',
})
export class SynopsisComponent {
  synopsis: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<SynopsisComponent>
  ) {}

  ngOnInit(): void {}

  getSynopsisInfo(synopsis: any): void {
    this.fetchApiData.getMovie(synopsis).subscribe((result: any) => {
      this.synopsis = result;
      return this.synopsis;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
