import { Component } from '@angular/core';
import '../../../assets/scripts/src.js'
import {UserPanelContentComponent} from "../user-panel-content/user-panel-content.component";
import {RouterLink, RouterOutlet} from "@angular/router";
@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [
    UserPanelContentComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css'
})
export class UserPanelComponent {

}
