import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.scss']
})
export class CategorySelectionComponent {
  categoryOptions = [
    { label: 'Alimentação', value: 'Alimentação' },
    { label: 'Transporte', value: 'Transporte' },
    { label: 'Gasolina', value: 'Transporte' },
    { label: 'Pedagio', value: 'Transporte' },
    { label: 'Lazer', value: 'Lazer' },
    { label: 'Cinema', value: 'Lazer' },
    { label: 'Eletrônicos', value: 'Eletrônicos' },
    { label: 'Viagem', value: 'Viagem' },
    { label: 'Roupas', value: 'Vestuário' },
    { label: 'Salário', value: 'Salário' },
    { label: 'Fatura', value: 'Fatura' },
  ];

  constructor(private router: Router) {}

  selectCategory(category: string) {
    localStorage.setItem('transactionCategory', category);
    this.router.navigate(['/transactionDetails']);
  }
}
