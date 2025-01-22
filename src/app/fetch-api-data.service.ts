import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs';

const apiUrl = 'https://hannah-hogan-movie-api-ea6c47e0093b.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  //Inject the HttpClient module to the constructor params
  // This will provice HttpClient to the entire class, making it available via this.http

  constructor(private http: HttpClient) {}

  private getStoredToken(): any {
    return localStorage.getItem('token');
  }

  //GET a list of movies
  public getAllMovies(): Observable<any> {
    const token = this.getStoredToken();
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //GET details about a movie by title
  public getMovie(title: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //GET details about a director
  public getDirector(name: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http
      .get(apiUrl + 'directors/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //GET details about a genre
  public getGenre(name: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http
      .get(apiUrl + 'genres/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //GET a user by username
  public getUser(username: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //POST movie to favorites list
  public addFavorite(username: string, movieId: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http
      .post(apiUrl + 'users/' + username + '/movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //DELETE movie to favorites list
  public removeFavorite(username: string, movieId: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //DELETE user
  public removeUser(username: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //PUT new user details
  public editUser(username: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //login user
  public loginUser(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //making the api call for the user registration output
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
