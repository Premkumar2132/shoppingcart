import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
import { RegitserComponent } from './Login/regitser/regitser.component';
import { HomeComponent } from './home/home.component';
import { ProductsMenComponent } from './Products/products-men/products-men.component';
import { ProductsWomenComponent } from './Products/products-women/products-women.component';
import { CartComponent } from './Cart/cart/cart.component';
import { AdminLoginComponent } from './adminlogin/admin-login/admin-login.component';
import { AdminPanelComponent } from './adminlogin/admin-panel/admin-panel.component';

export const routes: Routes = [
    {path:'register', component:RegitserComponent},
    {path:'login',component:LoginComponent},
    {path:'', component:HomeComponent},
    {path:'products',component:ProductsMenComponent, data:{'gender':'male'}},
    {path:'productsWomen',component:ProductsWomenComponent, data:{'gender':'women'}},
    {path:'cart',component:CartComponent},
    {path:'admin-login', component:AdminLoginComponent},
    {path:'admin-panel',component:AdminPanelComponent}
];
