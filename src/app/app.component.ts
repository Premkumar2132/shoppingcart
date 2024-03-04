import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
import { RegitserComponent } from './Login/regitser/regitser.component';
import { HomeComponent } from './home/home.component';
import { ProductsMenComponent } from './Products/products-men/products-men.component';
import { ProductsWomenComponent } from './Products/products-women/products-women.component'
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent,LoginComponent,RegitserComponent,ProductsMenComponent,ProductsWomenComponent,HttpClientModule]
})
export class AppComponent {
  title = 'shopping-cart';
}
