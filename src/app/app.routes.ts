import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { GenreViewComponent } from './genre-view/genre-view.component';
import { DirectorViewComponent } from './director-view/director-view.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'users', component: ProfileViewComponent },
  { path: 'genres', component: GenreViewComponent },
  { path: 'directors', component: DirectorViewComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];
