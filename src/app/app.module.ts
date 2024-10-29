import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
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
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProfileComponent } from './profile/profile.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { TransactionTypeComponent } from './transaction-type/transaction-type.component';
import { CategorySelectionComponent } from './category-selection/category-selection.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { SkeletonModule } from 'primeng/skeleton';
import { LottieComponent, provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

// Export this factory to be used by ngx-lottie
export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    TransactionTypeComponent,
    CategorySelectionComponent,
    TransactionDetailsComponent,
    LoadingScreenComponent
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
    ToolbarModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    DialogModule,
    SkeletonModule,
    LottieComponent,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    provideLottieOptions({
      player: playerFactory,
    }),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
