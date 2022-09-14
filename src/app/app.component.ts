import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Tables', url: '/tables', icon: 'cafe' },
    { title: 'Ready dishes', url: '/ready-dishes', icon: 'pizza' },
    { title: 'About', url: '/about', icon: 'information' },
  ];
}
