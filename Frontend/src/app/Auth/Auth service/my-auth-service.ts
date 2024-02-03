import {Injectable} from "@angular/core";
import {AuthLoginEndpoint} from "../Login/auth-login-endpoint";
import {AuthLogoutEndpoint} from "../Logout/auth-logout-endpoint";
import {AuthLoginRequest} from "../Login/auth-login-request";
import {tap} from "rxjs";
import {AuthToken} from "../AuthToken/auth-token";

@Injectable({providedIn:'root'})
export class MyAuthService{
  constructor(
    private authLoginEndpoint: AuthLoginEndpoint,
    //private authGetEndpoint: AuthGetEndpoint,
    private authLogoutEndpoint: AuthLogoutEndpoint,
  ) {
  }

  signIn(loginRequest:AuthLoginRequest){
    return this.authLoginEndpoint.Login(loginRequest)
      .pipe(
        tap(r=>{
          this.setLoggedUser(r.token);
        })
      )
  }

  async signOut():Promise<void>{
    console.log("Signing out");
    const token = this.getAuthorizationToken();

    if (token) {
      try {
        await this.authLogoutEndpoint.SignOut(token.token).toPromise();
      } catch (err) {
        // Handle error if needed
      }

      this.setLoggedUser(null);
    }
    console.log("We signed out successfully");
  }
  setLoggedUser(x:AuthToken | null){
    if (x == null){
      window.localStorage.setItem("auth-token", '');
    }
    else {
      window.localStorage.setItem("auth-token", JSON.stringify(x));
    }
  }

  getAuthorizationToken():AuthToken | null {
    let tokenString = window.localStorage.getItem("auth-token")??"";
    try {
      return JSON.parse(tokenString);
    }
    catch (e){
      return null;
    }
  }
}
