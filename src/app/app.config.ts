import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LocaleService } from 'ngx-daterangepicker-material';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),LocaleService]
};
