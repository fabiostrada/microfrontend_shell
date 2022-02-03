import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleType } from 'my-authenticator-lib';
import { NotAuthorizedComponent } from './common-page/not-authorized/not-authorized.component';
import { OnlyOneComponent } from './common-page/only-one/only-one.component';
import { RoutingConfig } from './config/routing-config';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { OnlyOneGuard } from './guards/only-one.guard';

const router = [
  {
    path: RoutingConfig.microservices.login,      
    loadChildren: () =>
        loadRemoteModule({
            type: 'module',
            remoteEntry: buildUrlForRouter(window.appConfig.microservices.login.port),
            exposedModule: './Module'
        })
        .then(m => m.AppModule)  
  },  
  {
    path: RoutingConfig.microservices.admin,
    loadChildren: () =>
        loadRemoteModule({
            type: 'module',
            remoteEntry: buildUrlForRouter(window.appConfig.microservices.admin.port),
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
    path: RoutingConfig.microservices.dashboard,
    loadChildren: () =>
        loadRemoteModule({
            type: 'module',
            remoteEntry: buildUrlForRouter(window.appConfig.microservices.dashboard.port),
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
    path: RoutingConfig.commonpage.not_authorized,
    component: NotAuthorizedComponent
  },
  {
    path: RoutingConfig.commonpage.only_one,
    component: OnlyOneComponent,
    canActivate: [OnlyOneGuard],
    canDeactivate: [OnlyOneGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(router)],
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