import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-genre-info',
  imports: [MatCardModule],
  templateUrl: './genre-info.component.html',
  styleUrl: './genre-info.component.scss',
})
export class GenreInfoComponent {
  genre: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<GenreInfoComponent>
  ) {}

  ngOnInit(): void {}

  getGenreInfo(genre: any): void {
    this.fetchApiData.getGenre(genre).subscribe((result: any) => {
      this.genre = result;
      return this.genre;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
