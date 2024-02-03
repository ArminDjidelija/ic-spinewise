import { Routes } from '@angular/router';
import {authGuardAdmin, authGuardSuperAdmin, authGuardUser} from "./Auth/Guards/auth-guard";
import {LoginComponent} from "./login/login.component";
import {UserPanelComponent} from "./User/user-panel/user-panel.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {SuperAdminPanelComponent} from "./super-admin-panel/super-admin-panel.component";
import {UserPanelContentComponent} from "./User/user-panel-content/user-panel-content.component";
import {UserChairsComponent} from "./User/user-chairs/user-chairs.component";
import {UserProfileComponent} from "./User/user-profile/user-profile.component";
import {AppComponent} from "./app.component";
import {HomepageComponent} from "./homepage/homepage.component";

export const routes: Routes = [
  {path:'', component:HomepageComponent},
  {path:'login', component:LoginComponent},
  {path:'user', component:UserPanelComponent, children:[
      {path:'dashboard', component:UserPanelContentComponent},
      {path:'chairs', component:UserChairsComponent},
      {path:'profile', component:UserProfileComponent},
    ]},
  {path:'admin-panel', component:AdminPanelComponent, canActivate:[authGuardAdmin]},
  {path:'super-admin-panel', component:SuperAdminPanelComponent, canActivate:[authGuardSuperAdmin]},
];
