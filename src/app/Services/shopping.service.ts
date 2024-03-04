import { Injectable } from "@angular/core";
import { Products, UserData } from "../home/content/contentInterface.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable, map, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService { 
  private baseURL = 'http://localhost:3000/api'
  public cartItems: Products[] = [];
  public totalPrice: number = 0
  userId!: number;

  constructor(private http : HttpClient) { }

  setUserId(userId: number): void {
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }


    getAllProducts(): Observable<Products[]> {
      return this.http.get<Products[]>(`${this.baseURL}/products`)
    }

    getProductsByGender(gender: string): Observable<Products[]> {
      return this.http.get<Products[]>(`${this.baseURL}/products?gender=${gender}`);
    }
    register(userData: UserData): Observable<UserData[]> {
      return this.http.post<UserData[]>(`${this.baseURL}/users/register`, userData);
    }
  
    login(credentials: any): Observable<any> {
      return this.http.post<any>(`${this.baseURL}/users/login`, credentials).pipe(
        tap((response: any) => {
          if (response && response.userId) {
            this.setUserId(response.userId); 
          }
        })
      );
    }
    
    addToCart(product: Products): Observable<any> {
      return this.http.post<any>(`${this.baseURL}/cart/add`, product).pipe(
        tap(() => {
          this.cartItems.push(product);
          this.calculateTotalPrice();
        })
      );
    }    


    adminLogin(credentials: any): Observable<any> {
      return this.http.post<any>(`${this.baseURL}/users/admin-login`, credentials);
    }
  
    addProduct(productData: Products[]): Observable<Products[]> {
      return this.http.post<Products[]>(this.baseURL + '/add', productData);
    }
  
    updateProduct(productId: string, productData: Products[]): Observable<any> {
      return this.http.put<Products[]>(`${this.baseURL}/update/${productId}`, productData);
    }
  
    deleteProduct(productId: string): Observable<Products[]> {
      return this.http.delete<Products[]>(`${this.baseURL}/delete/${productId}`);
    }
  
    getCartItems(): Observable<Products[]> {
      return this.http.get<Products[]>(`${this.baseURL}/cart`);
    }
  
    removeCartItem(productId: number): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}/cart/remove/${productId}`);
    }

  add(product: Products): void {
    const existingProduct = this.cartItems.find(item => item.title === product.title);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1; 
      this.cartItems.push(product);
    }
    this.calculateTotalPrice();
  }

  remove(product: Products): void {
    const index = this.cartItems.findIndex(item => item.title === product.title);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  increaseQuantity(product: Products): void {
    product.quantity++; 
  }

  decreaseQuantity(product: Products): void {
    if (product.quantity > 1) {
      product.quantity--; 
    } else {
      this.remove(product);
    }
  }
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
