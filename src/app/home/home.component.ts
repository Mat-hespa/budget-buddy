import { Component, OnInit } from '@angular/core';
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

interface Expense {
  category: string;
  amount: number;
  title?: string;
  value?: string;
  color?: string;
}

interface MonthlyData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  expenses: Expense[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isTotalBalanceHidden = false;
  isBalanceHidden = false;
  months: { label: string; value: string }[];
  selectedMonth: string | null = null;
  isDialogVisible = false;
  editIndex: number | null = null;

  totalBalance: number = 0;
  monthlyIncome: number = 0;
  monthlyExpenses: number = 0;
  expenses: { title: string; value: string; color: string, amount: number }[] = [];

  isTransactionDialogVisible = false;
  dialogTransaction = {
    type: null as string | null,
    description: '',
    category: null as string | null,
    value: null as number | null
  };

  transactionTypeOptions = [
    { label: 'Despesa', value: 'despesa' },
    { label: 'Receita', value: 'receita' }
  ];

  categoryOptions = [
    { label: 'Alimentação', value: 'Alimentação' },
    { label: 'Transporte', value: 'Transporte' },
    { label: 'Lazer', value: 'Lazer' },
    { label: 'Educação', value: 'Educação' }
  ];

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
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  bankAccounts: BankAccount[] = [];

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

  ngOnInit() {
    this.fetchBankAccounts();
  }

  toggleBalanceVisibility() {
    this.isBalanceHidden = !this.isBalanceHidden;
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  fetchBankAccounts() {
    console.log('Fetching bank accounts...');
    this.http.get<BankAccount[]>('http://localhost:9992/api/bankAccounts').subscribe(accounts => {
      console.log('Bank accounts fetched:', accounts);
      this.bankAccounts = accounts;
    }, error => {
      console.error('Error fetching bank accounts:', error);
    });
  }

  fetchMonthlyData() {
    if (this.selectedMonth) {
      const year = new Date().getFullYear(); // Assumindo o ano atual, você pode ajustar conforme necessário
      console.log(`Fetching monthly data for ${this.selectedMonth} ${year}`);
      this.http.get<MonthlyData>(`http://localhost:9992/api/monthlyData?month=${this.selectedMonth}&year=${year}`).subscribe(data => {
        console.log('Monthly data fetched:', data);
        this.totalBalance = data.totalBalance;
        this.monthlyIncome = data.monthlyIncome;
        this.monthlyExpenses = data.monthlyExpenses;
        this.expenses = data.expenses.map((expense: Expense) => ({
          title: expense.category,
          value: `R$ ${expense.amount}`,
          color: this.doughnutChartData.datasets[0].backgroundColor[this.categoryOptions.findIndex(option => option.label === expense.category)],
          amount: expense.amount
        }));

        this.doughnutChartData.labels = this.expenses.map(expense => expense.title);
        this.doughnutChartData.datasets[0].data = this.expenses.map(expense => expense.amount);

        // Necessário para forçar a atualização do gráfico
        this.doughnutChartData = { ...this.doughnutChartData };
      }, error => {
        console.error('Error fetching monthly data:', error);
      });
    } else {
      console.warn('No month selected, skipping fetchMonthlyData');
    }
  }

  onMonthChange(event: any) {
    console.log('Month changed:', event.value);
    this.selectedMonth = event.value;
    this.fetchMonthlyData();
  }

  openTransactionDialog() {
    this.isTransactionDialogVisible = true;
  }

  closeTransactionDialog() {
    this.isTransactionDialogVisible = false;
    this.dialogTransaction = {
      type: null,
      description: '',
      category: null,
      value: null
    };
  }

  saveTransaction() {
    if (!this.selectedMonth) {
      console.error('No month selected, cannot save transaction');
      return;
    }

    const year = new Date().getFullYear(); // Assumindo o ano atual, você pode ajustar conforme necessário
    const transaction = { ...this.dialogTransaction, month: this.selectedMonth, year };
    console.log('Saving transaction:', transaction);
    this.http.post('http://localhost:9992/api/transactions', transaction).subscribe(response => {
      console.log('Transaction saved:', response);
      this.fetchMonthlyData();
      this.closeTransactionDialog();
    }, error => {
      console.error('Error saving transaction:', error);
    });
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

      console.log('Saving account:', newAccount);
      if (this.editIndex !== null && this.editIndex >= 0) {
        this.bankAccounts[this.editIndex] = newAccount;
        this.http.put('http://localhost:9992/api/bankAccounts', newAccount).subscribe(() => {
          console.log('Account updated:', newAccount);
          this.isDialogVisible = false;
        }, error => {
          console.error('Error updating account:', error);
        });
      } else {
        this.bankAccounts.push(newAccount);
        this.http.post('http://localhost:9992/api/bankAccounts', newAccount).subscribe(() => {
          console.log('Account created:', newAccount);
          this.isDialogVisible = false;
        }, error => {
          console.error('Error creating account:', error);
        });
      }
    }
  }

  closeDialog() {
    this.isDialogVisible = false;
  }

  removeAccount(index: number) {
    if (index >= 0 && index < this.bankAccounts.length) {
      const account = this.bankAccounts[index];
      console.log('Removing account:', account);
      this.bankAccounts.splice(index, 1);
      this.http.delete(`http://localhost:9992/api/bankAccounts?name=${account.name}`).subscribe(() => {
        console.log('Account removed:', account);
      }, error => {
        console.error('Error removing account:', error);
      });
    }
  }
}