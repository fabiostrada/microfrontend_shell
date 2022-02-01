import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleType } from 'my-authenticator-lib';
import { NotAuthorizedComponent } from './common-page/not-authorized/not-authorized.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'login',      
      loadChildren: () =>
          loadRemoteModule({
              type: 'module',
              remoteEntry: buildUrlForRouter(window.appConfig.login.port),
              exposedModule: './Module'
          })
          .then(m => m.AppModule)  
    },  
    {
      path: 'admin',
      loadChildren: () =>
          loadRemoteModule({
              type: 'module',
              remoteEntry: buildUrlForRouter(window.appConfig.admin.port),
              exposedModule: './Module'
          })
          .then(m => m.AppModule),
      canLoad: [AuthenticationGuard, AuthorizationGuard],
      canActivate: [AuthenticationGuard, AuthorizationGuard], 
      data:{
        roles:[RoleType.ADMIN]  
      }
    },
    {
      path: 'dashboard',
      loadChildren: () =>
          loadRemoteModule({
              type: 'module',
              remoteEntry: buildUrlForRouter(window.appConfig.dashboard.port),
              exposedModule: './Module'
          })
          .then(m => m.AppModule),
      canLoad: [AuthenticationGuard, AuthorizationGuard],
      canActivate: [AuthenticationGuard, AuthorizationGuard],
      data:{
        roles:[RoleType.DASHBOARD]  
      }   
    },
    {
      path: 'not-authorized',
      component: NotAuthorizedComponent
    }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}


export const buildUrlForRouter = (portOfMicroservice: number): string => {
   return window.appConfig.protocol + '://' + 
          window.appConfig.baseUrl + ':' + 
          portOfMicroservice + '/' + 
          window.appConfig.remoteFile;
}