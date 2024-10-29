import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionTypeComponent } from './transaction-type/transaction-type.component';
import { CategorySelectionComponent } from './category-selection/category-selection.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

const routes: Routes = [
  { path: '', redirectTo: '/loading', pathMatch: 'full' },
  { path: 'loading', component: LoadingScreenComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'home', component: HomeComponent },
  { path: 'transactionType', component: TransactionTypeComponent},
  { path: 'categorySelection', component: CategorySelectionComponent},
  { path: 'transactionDetails', component: TransactionDetailsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
