import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  value: number | null = null;
  formattedValue: string = 'R$ 0,00';
  selectedMonth: string | null = null;
  isLoading: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.selectedMonth = localStorage.getItem('selectedMonth'); // Recuperar o mês selecionado do localStorage
    if (!this.selectedMonth) {
      console.error('No month selected, cannot proceed with transaction');
      this.router.navigate(['/']);
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  saveTransaction() {
    this.isLoading = true;
    const type = localStorage.getItem('transactionType');
    const category = localStorage.getItem('transactionCategory');
    const year = new Date().getFullYear();
    const month = this.selectedMonth;
    const transaction = { type, category, value: this.value, year, month };

    console.log('Saving transaction:', transaction);
    this.http.post(`${environment.apiUrl}/api/transactions`, transaction).subscribe(response => {
      console.log('Transaction saved:', response);
      this.isLoading = false;
      this.router.navigate(['/home']);
    }, error => {
      console.error('Error saving transaction:', error);
      this.isLoading = false;
    });
  }

  updateValue() {
    if (this.value !== null) {
      this.formattedValue = `R$ ${this.value.toFixed(2).replace('.', ',')}`;
    } else {
      this.formattedValue = 'R$ 0,00';
    }
  }
}
