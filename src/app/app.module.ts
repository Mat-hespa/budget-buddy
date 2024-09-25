import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { HomeComponent } from './home/home.component';
import { ChartModule } from 'primeng/chart';
import { DockModule } from 'primeng/dock';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    DividerModule,
    ChartModule,
    DockModule,
    ToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
