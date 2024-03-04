import { Component } from '@angular/core';
import { Products } from '../../../home/content/contentInterface.component';
import { CommonModule } from '@angular/common';
import { ShoppingService } from '../../../Services/shopping.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  productsWomen : Products[] = []
  productRows: any[] = [];
  gender: string = '';

  constructor(private route: ActivatedRoute, private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.gender = data['gender'];
      this.fetchProducts(this.gender);
    });
  }

  fetchProducts(gender: string): void {
    this.shoppingService.getProductsByGender(gender).subscribe({
      next: (products: Products[]) => {
        this.productsWomen = products;
        this.productRows = this.chunkArray(this.productsWomen, 3);
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }

chunkArray(array: any[], size: number): any[] {
  return array.reduce((acc, _, i) => (i % size ? acc : [...acc, array.slice(i, i + size)]), []);
}

buyNow(product: Products) {
  console.log('Buy Now:', product);
}

addToCart(product: Products) {
  console.log('Add to Cart:', product);
}
}
