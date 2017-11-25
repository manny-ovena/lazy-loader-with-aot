import {
    NgModule,
    NgModuleFactoryLoader,
    SystemJsNgModuleLoader,
} from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { provideRoutes, RouterModule } from '@angular/router';

import { HomeView } from 'app/home-view.component';
import { AppComponent } from './app.component';

const lazyLoadablePaths = [
  { path: 'lazy', loadChildren: './lazy.module#LazyModule' },
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeView,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeView},
    ]),
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
    provideRoutes(lazyLoadablePaths),
  ],
})
export class AppModule { }
