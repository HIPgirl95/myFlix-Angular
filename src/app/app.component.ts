import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'myFlix-Angular-Client';
  constructor(public router: Router) {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
