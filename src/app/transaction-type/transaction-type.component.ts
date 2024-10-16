import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-type',
  templateUrl: './transaction-type.component.html',
  styleUrls: ['./transaction-type.component.scss']
})
export class TransactionTypeComponent {
  constructor(private router: Router) {}

  selectType(type: string) {
    localStorage.setItem('transactionType', type);
    this.router.navigate(['/categorySelection']);
  }
}
