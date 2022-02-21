import { Component, HostListener } from '@angular/core';
import { AuthenticatorService, StateService } from 'my-authenticator-lib';
import { RoutingService } from './services/routing.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  public property1!: string;

  constructor(public authenticator: AuthenticatorService,
              private routingService: RoutingService) {  
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {          
      this.routingService.closeOnlyOne();
  }
  
}

