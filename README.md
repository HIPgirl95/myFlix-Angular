# MyFlixAngularClient

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.3. It allows users to view, add, and remove movies from their favorites, update their profile, and see detailed information about genres, directors, and synopses. The app also includes features such as logging in, viewing movie details, and editing user profiles.

## Features

- **Movie List:** Display a list of movies with details such as genre, director, and synopsis.
- **Favorite Movies:** Add or remove movies from the user's favorite list.
- **User Profile:** View and edit user profile details, including username, email, and birthday.
- **Genre and Director Info:** View detailed information about movie genres and directors.
- **Responsive UI:** The app is fully responsive and works well on both desktop and mobile devices.

## Technologies
- **Frontend:** Angular
- **UI Components:** Angular Material
- **CSS Styling:** SCSS
- **Backend API:** Movie API (https://github.com/HIPgirl95/movie_api)
- **Deployment:** GitHub Pages

## Screenshots
- **Welcome Screen**
![image](https://github.com/user-attachments/assets/45d22ab0-2e87-4197-aa47-0cbd7d12f038)
- **User Profile**
![image](https://github.com/user-attachments/assets/d4174a0e-cebc-4f71-8c02-3fd03ac26e51)
- **Movie Cards**
![image](https://github.com/user-attachments/assets/f3d62d6c-8915-44d4-a81a-cbd59635e4c1)


## Documentation

This application is documented using [TypeDoc](https://typedoc.org/). The documentation includes information about the app’s components, services, and features.

- **To generate the documentation:**
  1. Make sure you have installed all dependencies (`npm install`).
  2. Run the following command to generate the documentation:
     ```bash
     npx typedoc --out docs src/
     ```
  3. The documentation will be available in the `docs/` folder. You can open `docs/index.html` in your browser to view the full documentation.

The documentation is generated based on the inline comments and TypeScript types used throughout the code. It includes descriptions of the components, methods, and classes, as well as their parameters and return types.
> **Note:** Some sections of the documentation were assisted by AI tools, specifically OpenAI’s language model, to improve clarity and consistency.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
