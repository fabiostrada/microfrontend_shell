import { Component, HostListener, OnInit } from '@angular/core';
import { AuthenticatorService, BaseComponent, EventService } from 'my-authenticator-lib';
import { takeUntil } from 'rxjs';
import { RoutingService } from './services/routing.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
 
  public language!: string;

  constructor(public authenticator: AuthenticatorService,
              private routingService: RoutingService,
              private eventService: EventService) {  
      super();
  }

  ngOnInit(): void {
      this.eventService.getLanguage()
          .pipe(takeUntil(this.unsubscribeAll))
          .subscribe(language => {
              this.language = language;
          });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {          
      this.routingService.closeOnlyOne();
  }
  
}

