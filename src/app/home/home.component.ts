import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface BankOption {
  name: string;
  icon: string;
}

interface BankAccount {
  name: string;
  balance: number;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isTotalBalanceHidden = false;
  isBalanceHidden = false;
  months: any[];
  selectedMonth: any;
  isDialogVisible = false;
  editIndex: number | null = null;

  user = {
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  doughnutChartOptions = {
    plugins: {
      legend: {
        display: false
      }
    }
  };

  doughnutChartData = {
    labels: ['Alimentação', 'Transporte', 'Lazer', 'Educação'],
    datasets: [
      {
        data: [300, 500, 100, 200],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  expenses = [
    { title: 'Alimentação', value: 'R$ 300,00', color: '#FF6384' },
    { title: 'Transporte', value: 'R$ 500,00', color: '#36A2EB' },
    { title: 'Lazer', value: 'R$ 100,00', color: '#FFCE56' },
    { title: 'Educação', value: 'R$ 200,00', color: '#4BC0C0' }
  ];

  bankAccounts: BankAccount[] = [
    { name: 'Itaú', balance: 1000, icon: 'pi pi-building' },
    { name: 'Bradesco', balance: 500, icon: 'pi pi-building' },
    { name: 'Nubank', balance: 300, icon: 'pi pi-mobile' }
  ];

  dialogAccount = {
    selectedBank: null as BankOption | null,
    balance: 0
  };

  bankOptions: { label: string; value: BankOption }[] = [
    { label: 'Itaú', value: { name: 'Itaú', icon: 'pi pi-building' } },
    { label: 'Bradesco', value: { name: 'Bradesco', icon: 'pi pi-building' } },
    { label: 'Nubank', value: { name: 'Nubank', icon: 'pi pi-mobile' } },
    { label: 'Mercado Pago', value: { name: 'Mercado Pago', icon: 'pi pi-wallet' } },
    { label: 'Banco do Brasil', value: { name: 'Banco do Brasil', icon: 'pi pi-globe' } }
  ];

  constructor(private router: Router, private http: HttpClient) {
    this.months = [
      { label: 'Janeiro', value: 'Janeiro' },
      { label: 'Fevereiro', value: 'Fevereiro' },
      { label: 'Março', value: 'Março' },
      { label: 'Abril', value: 'Abril' },
      { label: 'Maio', value: 'Maio' },
      { label: 'Junho', value: 'Junho' },
      { label: 'Julho', value: 'Julho' },
      { label: 'Agosto', value: 'Agosto' },
      { label: 'Setembro', value: 'Setembro' },
      { label: 'Outubro', value: 'Outubro' },
      { label: 'Novembro', value: 'Novembro' },
      { label: 'Dezembro', value: 'Dezembro' }
    ];
  }

  toggleBalanceVisibility() {
    this.isBalanceHidden = !this.isBalanceHidden;
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  logout() {
    // Implement logout logic here
    console.log('User logged out');
    this.router.navigate(['/login']);
  }

  openAddAccountDialog() {
    this.dialogAccount = { selectedBank: null, balance: 0 };
    this.isDialogVisible = true;
    this.editIndex = null;
  }

  openEditAccountDialog(account: BankAccount, index: number) {
    this.dialogAccount = {
      selectedBank: this.bankOptions.find(option => option.value.name === account.name)?.value || null,
      balance: account.balance
    };
    this.isDialogVisible = true;
    this.editIndex = index;
  }

  saveAccount() {
    if (this.dialogAccount.selectedBank) {
      const newAccount: BankAccount = {
        name: this.dialogAccount.selectedBank.name,
        balance: this.dialogAccount.balance,
        icon: this.dialogAccount.selectedBank.icon
      };

      if (this.editIndex !== null && this.editIndex >= 0) {
        this.bankAccounts[this.editIndex] = newAccount;
      } else {
        this.bankAccounts.push(newAccount);
      }

      this.isDialogVisible = false;
    }
  }

  closeDialog() {
    this.isDialogVisible = false;
  }

  removeAccount(index: number) {
    if (index >= 0 && index < this.bankAccounts.length) {
      this.bankAccounts.splice(index, 1);
    }
  }

  updateAccountBalance(account: BankAccount) {
    // Call backend API to update account balance
    this.http.post('/api/updateAccountBalance', account).subscribe(response => {
      console.log('Account balance updated', response);
    });
  }
}
