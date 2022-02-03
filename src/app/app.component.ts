import { Component, HostListener } from '@angular/core';
import { AuthenticatorService } from 'my-authenticator-lib';
import { RoutingService } from './services/routing.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  constructor(public authenticator: AuthenticatorService,
              private routingService: RoutingService) {
  
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
      console.log(event);
      this.routingService.closeOnlyOne();
      debugger;
  }
  
}
