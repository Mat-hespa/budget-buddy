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

  totalBalance: number = 0;
  monthlyIncome: number = 0;
  monthlyExpenses: number = 0;
  expenses: { title: string; value: string; color: string, amount: number }[] = [];

  showNoMetricsMessage = false;

  transactionTypeOptions = [
    { label: 'Despesa', value: 'despesa' },
    { label: 'Receita', value: 'receita' }
  ];

  categoryOptions = [
    { label: 'Alimentação', value: 'Alimentação' },
    { label: 'Transporte', value: 'Transporte' },
    { label: 'Lazer', value: 'Lazer' },
    { label: 'Eletrônicos', value: 'Eletrônicos' },
    { label: 'Gasolina', value: 'Transporte' },
    { label: 'Pedagio', value: 'Transporte' },
    { label: 'Viagem', value: 'Viagem' },
    { label: 'Cinema', value: 'Lazer' },
    { label: 'Roupas', value: 'Vestuário' },
    { label: 'Salário', value: 'Salário' },
    { label: 'Fatura', value: 'Fatura' },
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
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#FFCD56', '#4DC9F6',
          '#F67019', '#F53794', '#537BC4', '#ECD078'
        ]
      }
    ]
  };

  bankAccounts: BankAccount[] = [];

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
    this.setDefaultMonth();
    this.fetchMonthlyData();
  }

  setDefaultMonth() {
    const currentMonthIndex = new Date().getMonth(); // Obter o índice do mês atual (0-11)
    this.selectedMonth = this.months[currentMonthIndex].value;
    localStorage.setItem('selectedMonth', this.selectedMonth); // Salvar o mês selecionado no localStorage
  }

  toggleBalanceVisibility() {
    this.isBalanceHidden = !this.isBalanceHidden;
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToAddTransaction() {
    this.router.navigate(['/transactionType']);
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

        // Verificar se há despesas, se não, usar um gráfico padrão
        if (this.expenses.length === 0) {
          this.showNoMetricsMessage = true;
        } else {
          this.showNoMetricsMessage = false;
        }
      }, error => {
        console.error('Error fetching monthly data:', error);
      });
    } else {
      console.warn('No month selected, skipping fetchMonthlyData');
      this.showNoMetricsMessage = true;
    }
  }

  onMonthChange(event: any) {
    console.log('Month changed:', event.value);
    this.selectedMonth = event.value;
    localStorage.setItem('selectedMonth', event.value); // Salvar o mês selecionado no localStorage
    this.fetchMonthlyData();
  }

  openAddAccountDialog() {
    this.router.navigate(['/add-bank-account']);
  }

  openEditAccountDialog(account: BankAccount, index: number) {
    this.router.navigate(['/edit-bank-account'], { state: { account, index } });
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
