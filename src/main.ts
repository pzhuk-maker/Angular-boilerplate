import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// import { App } from './app/app';
import TargetComponent from './app/target.component';

bootstrapApplication(TargetComponent, appConfig)
  .catch((err) => console.error(err));
