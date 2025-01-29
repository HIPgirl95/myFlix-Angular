import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-info',
  imports: [],
  templateUrl: './genre-info.component.html',
  styleUrl: './genre-info.component.scss',
})
export class GenreInfoComponent {
  genre: any;

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<GenreInfoComponent>
  ) {}

  ngOnInit(): void {}

  getGenreInfo(name: string): void {
    this.fetchApiData.getGenre(name).subscribe((result: any) => {
      this.genre = result;
      return this.genre;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
