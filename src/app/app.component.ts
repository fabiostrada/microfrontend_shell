import { Component } from '@angular/core';
import { AuthenticatorService } from 'my-authenticator-lib';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(public authenticator: AuthenticatorService) {
  
  }

}
