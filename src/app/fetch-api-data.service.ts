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
/**
 * This function is responsible for fetching data from the myFlix API.
 */
export class UserRegistrationService {
  //Inject the HttpClient module to the constructor params
  // This will provice HttpClient to the entire class, making it available via this.http

  constructor(private http: HttpClient) {}

  /**
   * retrieves the user's token from localStorage
   * @returns {string} the user's token
   */
  private getStoredToken(): any {
    return localStorage.getItem('token');
  }

  /**
   * retrieves the user from localstorage.
   * @returns {string} a stringified object that contains the user's data
   */
  private getUserData(): any {
    return localStorage.getItem('user');
  }

  /**
   * Requests all movie objects from API
   * @returns {array} Every movie in the database
   */
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

  /**
   * Requests a specific movie object from the API
   * @param {string} title
   * @returns {object} Data about a movie with the provided title.
   */
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

  /**
   * Requests a specific director by name.
   * @param {string} name
   * @returns {object} Data about the director with the specified name.
   */
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

  /**
   * Requests a specific genre by name.
   * @param {string} name
   * @returns {object} Data about the genre with the specified name.
   */
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

  /**
   * Requests a specific user by username. Will retrieve the current user's username and token from localStorage
   * and return a user object with a matching Username, as long as the token is valid.
   * @returns {object} All of the currently logged in user's data.
   */
  //GET a user by username
  public getUser(): Observable<any> {
    const token = this.getStoredToken();
    const user = JSON.parse(this.getUserData());
    return this.http
      .get(apiUrl + 'users/' + `${user.Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Adds a specific movie to the currently logged in user's favorites.
   * There is nothing on the back end to prevent the user from having duplicate favorites, so be careful not to allow the user to favorite a movie more than once.
   * @param {string} username
   * @param {string} movieId
   * @returns {object} The updated user object with an updated Favorites array.
   */
  //POST movie to favorites list
  public addFavorite(username: string, movieId: string): Observable<any> {
    const token = this.getStoredToken();
    const body = null;
    return this.http
      .post(apiUrl + 'users/' + username + '/movies/' + movieId, body, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Sends a request to the server to delete a movie from the currently logged in user's favorites list.
   * @param {string} movieId
   * @param {string} username
   * @returns {object} The updated user object without the specified movie in the favorites list.
   */
  //DELETE movie from favorites list
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

  //GET user's favorite movies list
  //NOT YET AN AVAILABLE ENDPOINT
  public getFavorites(username: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http
      .get(apiUrl + 'users/' + username + '/favs', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Sends a request to the server to delete a user's account. This functionality is not currently in the application, But could be added fairly easily.
   * @param {string} username
   * @returns {string} User deletion confirmation.
   */
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

  /**
   * Sends an object with user's new username, password, email, and birthday to the back end to update user profile
   * @param {object} userData
   * @returns {object} The updated user object on the server.
   */
  //PUT new user details
  public editUser(userData: any): Observable<any> {
    const token = this.getStoredToken();
    const user = JSON.parse(this.getUserData());
    return this.http
      .put(apiUrl + 'users/' + user.Username, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Sends the user's username and password to the server to retrieve a token and log in the user.
   * @param {object} userDetails
   * @returns {object} The user's data including email, birthday and favorites, and a token.
   */
  //login user
  public loginUser(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Sends the user's data to the server so it can build a user on the database and allow the user to log in.
   * @param {object} userDetails
   * @returns { object } The user's data, including a randomly generated _id and an empty array of favorites.
   */
  //making the api call for the user registration output
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Returns the response from the server, or an empty object if there is no response from the server.
   * @param {any} res
   * @returns {any} Whatever data is being requested from the server
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * This function handles any errors that may come up in the process of requesting data from the server.
   * @param {object} error
   * @returns {function throwError(error: string)} Throws an error message to let the user know their request failed.
   */
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
