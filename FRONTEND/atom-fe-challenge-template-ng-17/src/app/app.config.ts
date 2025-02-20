import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { routes } from "./app.routes";
import { MatIconModule } from '@angular/material/icon';
import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), 
        provideAnimationsAsync(), 
        provideAnimationsAsync(), 
        provideHttpClient(),
        importProvidersFrom(MatIconModule)  ]
};
