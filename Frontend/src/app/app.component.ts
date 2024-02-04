import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {AuthLoginEndpoint} from "./Auth/Login/auth-login-endpoint";
import {AuthLogoutEndpoint} from "./Auth/Logout/auth-logout-endpoint";
import {PermissionsService} from "./Auth/Guards/auth-guard";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {UserPanelComponent} from "./User/user-panel/user-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    RouterLinkActive
  ],
  providers:[
    AuthLoginEndpoint,
    AuthLogoutEndpoint,
    PermissionsService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SpineWise';
}
