import { Component } from '@angular/core';
import { AuthenticatorService, Role, RoleType, User } from 'my-authenticator-lib';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(public authenticator: AuthenticatorService) {
    
    authenticator.setCurrentUser(
      new User(1, "fabio", "strada", "fabiostrada77", [new Role(1, RoleType.ADMIN), new Role(2, RoleType.DASHBOARD)])
    ).subscribe();
  }

}
