import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingService } from '../../Services/shopping.service';
import { Products } from '../../home/content/contentInterface.component';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cartItems: Products[] = [];
  totalPrice: number = 0;
  userId!: number;

  constructor(private shoppingService: ShoppingService,private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userId = this.shoppingService.getUserId();
    if (!this.userId) {
      console.log("userId is not available");
      return;
    }
    this.getCartItems();
    this.shoppingService.calculateTotalPrice();
  }

  getCartItems(): void {
    this.shoppingService.getCartItems().subscribe(
      (items: Products[]) => {
        this.cartItems = items;
        console.log("this is the cart items",this.cartItems)
        this.calculateTotalPrice();
        this.changeDetectorRef.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  removeFromCart(productId: number): void {
    this.shoppingService.removeCartItem(productId).subscribe(
      () => {
        this.getCartItems();
      },
      error => {
        console.error('Error removing item from cart:', error);
      }
    );
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  addToCart(product: Products): void {
    this.shoppingService.addToCart(product.id).subscribe(
      () => {
        console.log('Product added to cart successfully');
      },
      error => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

   increaseQuantity(product: Products): void {
    this.shoppingService.increaseQuantity(product);
    this.shoppingService.calculateTotalPrice();
  }

  decreaseQuantity(product: Products): void {
    this.shoppingService.decreaseQuantity(product);
    this.shoppingService.calculateTotalPrice();
  }

  removeItem(product: Products): void {
    this.shoppingService.remove(product);
    this.shoppingService.calculateTotalPrice();
  }
}
