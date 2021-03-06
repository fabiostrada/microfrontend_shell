import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticatorModule, StateService } from 'my-authenticator-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotAuthorizedComponent } from './common-page/not-authorized/not-authorized.component';
import { OnlyOneComponent } from './common-page/only-one/only-one.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotAuthorizedComponent,
    OnlyOneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticatorModule,
    ...MaterialModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
