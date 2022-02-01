import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleType } from 'my-authenticator-lib';
import { NotAuthorizedComponent } from './common-page/not-authorized/not-authorized.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
        loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:2000/remoteEntry.js',
            exposedModule: './Module'
        })
        .then(m => m.AppModule)  
  },  
  {
    path: 'admin',
    loadChildren: () =>
        loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:3000/remoteEntry.js',
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
            remoteEntry: 'http://localhost:4000/remoteEntry.js',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
