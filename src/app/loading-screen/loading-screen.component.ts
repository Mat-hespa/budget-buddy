import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { interval, Subscription, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent {
  options: AnimationOptions = {
    path: 'assets/budget-loading.json', // caminho do arquivo Lottie
  };
  private checkDataReadySubscription: Subscription | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.checkDataReadySubscription = interval(3000) // Checar a cada 3 segundos
      .pipe(
        switchMap(() => this.http.get<{ dataReady: boolean }>(`${environment.apiUrl}/api/checkDataReady`))
      )
      .subscribe(response => {
        if (response.dataReady) {
          this.router.navigate(['/home']);
          if (this.checkDataReadySubscription) {
            this.checkDataReadySubscription.unsubscribe();
          }
        }
      }, error => {
        console.error('Error checking data readiness:', error);
      });
  }

  ngOnDestroy() {
    if (this.checkDataReadySubscription) {
      this.checkDataReadySubscription.unsubscribe();
    }
  }
}
