import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';

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
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard] 
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
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard]   
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
