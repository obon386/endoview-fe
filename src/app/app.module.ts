import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialExampleModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { NaviComponent } from './navi/navi.component';
import { WeeksComponent } from './weeks/weeks.component';
import { AttributeDirective } from './weeks/attribute.directive';
import {LoadingInterceptor} from './service/loading/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    WeeksComponent,
    AttributeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
