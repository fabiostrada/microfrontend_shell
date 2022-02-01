import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'my-authenticator-lib';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public authenticatorService: AuthenticatorService,
              public router: Router) { }

  ngOnInit(): void {
  }

  public logout(): void {
    console.log('Logout');
    this.authenticatorService.logout()        
        .subscribe(() => {          
          this.router.navigate(['/login/login-page'])          
        });      
  }
}
