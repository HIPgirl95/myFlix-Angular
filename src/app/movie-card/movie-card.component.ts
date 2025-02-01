import { Component } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-movie-card',
  // standalone: false,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    MatDialogModule,
    NavbarComponent,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreInfoComponent, {
      data: genre,
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: director,
    });
  }

  openSynopsisDialog(synopsis: any): void {
    this.dialog.open(SynopsisComponent, {
      data: synopsis,
    });
  }

  executeToggleFavorite(): void {}
}
