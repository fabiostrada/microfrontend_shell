import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppConfig } from './app/config/app-config';
import { environment } from './environments/environment';

declare global {
  interface Window { appConfig: AppConfig; }
}

fetch(`/assets/config.json?v=${environment.appVersion}`)
  .then(response => response.json())
  .then((config) => {

    if (environment.production) {
      enableProdMode();
    }
    
    window.appConfig = config || {};   
    console.log(window.appConfig); 

    platformBrowserDynamic([
      { provide: AppConfig, useValue: config }        
    ]).bootstrapModule(AppModule)
      .catch(err => console.error(err));

});