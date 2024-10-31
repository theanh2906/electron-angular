
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app.config';

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
    enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch(console.error)
