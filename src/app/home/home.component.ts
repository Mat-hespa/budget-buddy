import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isBalanceHidden = false;
  months: any[];
  selectedMonth: any;

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

  constructor() {
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
}
