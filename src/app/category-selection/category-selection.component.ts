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
    { label: 'Eletrônicos', value: 'Eletrônicos' },
    { label: 'Gasolina', value: 'Transporte' },
    { label: 'Pedagio', value: 'Transporte' },
    { label: 'Viagem', value: 'Viagem' },
    { label: 'Cinema', value: 'Lazer' },
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
