import { Component, OnInit, inject } from '@angular/core';
import { Products } from './contentInterface.component';
import { CommonModule } from '@angular/common';
import { ShoppingService } from '../../Services/shopping.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  // cartServices = inject(ShoppingService)

  products : Products[] = [];
  // [
  //   {title:"CREASED-EFFECT SHIRT", brand:"Zara", image:"https://static.zara.net/assets/public/00ce/db42/c9aa4013b2b1/f9f389c2f0ca/07545454707-a4/07545454707-a4.jpg?ts=1706267378997&w=607",price:4990,quantity:100},
  //   {title:"STRIPED JACQUARD SHIRT", brand:"Zara", image:"https://static.zara.net/assets/public/07f3/b378/68a94bcbb22f/f9267dd96983/07545330712-a1/07545330712-a1.jpg?ts=1705651984039&w=607",price:3290,quantity:100},
  //   {title:"TIE-DYE PRINT SHIRT", brand:"Zara", image:"https://static.zara.net/assets/public/d3f6/50d7/1a804d5aa4a7/947abca82f1c/06085404500-p/06085404500-p.jpg?ts=1708686244385&w=563",price:3590,quantity:100},
  //   {title:"CROPPED CHECK SHIRT", brand:"Zara", image:"https://static.zara.net/assets/public/352e/c15e/bde341119369/5e69485b1a92/00775171400-a1/00775171400-a1.jpg?ts=1705667458823&w=443",price:3290,quantity:100},
  //   {title:"FIRM PRINT T-SHIRT", brand:"Zara", image:"https://static.zara.net/assets/public/b5ee/7205/23854c28b416/ccc957fc67f0/06224429712-p/06224429712-p.jpg?ts=1708510208819&w=563",price:2290,quantity:100},
  //   {title:"KNIT COLOUR BLOCK T-SHIRT", brand:"Zara", image:"https://static.zara.net/photos///2024/V/0/1/p/2580/400/707/2/w/563/2580400707_2_1_1.jpg?ts=1708342488009",price:3290,quantity:100},
  //   {title:"PRINTED POPLIN DRESS", brand:"Zara", image:"https://static.zara.net/assets/public/f12a/a1e4/ff6f4fb3b9b2/668831f87d80/02732131330-p/02732131330-p.jpg?ts=1708694496703&w=563",price:5990,quantity:100},
  //   {title:"BELTED STRIPED SHIRT DRESS", brand:"Zara", image:"https://static.zara.net/assets/public/5252/7e6d/43204cdbb343/f8e9d7c99870/08351025044-p/08351025044-p.jpg?ts=1708694495970&w=563",price:4990,quantity:100},
  //   {title:"SHIRT DRESS WITH BELT", brand:"Zara", image:"https://static.zara.net/assets/public/7653/bbfd/6b8845918d4e/5e099261b82e/02298068710-p/02298068710-p.jpg?ts=1708694499835&w=563",price:5590,quantity:100},
  //   {title:"T-SHIRT WITH BACK SEAM", brand:"Zara", image:"https://static.zara.net/assets/public/6820/c899/b2654d19a498/3c5c069c5229/03253321806-a2/03253321806-a2.jpg?ts=1709135492888&w=563",price:990,quantity:100},
  //   {title:"Z1975 DENIM MIDI SKIRT", brand:"Zara", image:"https://static.zara.net/assets/public/0f7d/a465/490c40d294cd/6f966c07cbf4/01879025406-p/01879025406-p.jpg?ts=1707233139871&w=1920",price:2990,quantity:100},
  //   {title:"BALLOON MIDI SKIRT", brand:"Zara", image:"https://static.zara.net/assets/public/38ce/31d3/a5c34949a6e1/16aa5356fb22/02010730600-p/02010730600-p.jpg?ts=1708679640974&w=563",price:2990,quantity:100}
  // ]
  productRows: any[] = [];

  constructor(private  cartServices: ShoppingService) {}

  ngOnInit(): void{
    this.fetchProducts();
  };


  fetchProducts(): void {
    this.cartServices.getAllProducts().subscribe({
      next: (products: Products[]) => {
        this.products = products;
        console.log('Products received in component:', this.products);
        this.productRows = this.chunkArray(this.products, 3);
      },
      error: (error: any) => {
        console.error('Error fetching products in component:', error);
      }
    });
  }

  chunkArray(array: any[], size: number): any[] {
    return array.reduce((acc, _, i) => (i % size ? acc : [...acc, array.slice(i, i + size)]), []);
  }

  buyNow(product: Products) {
    console.log('Buy Now:', product);
  }

  addToCart(product: any) {
    console.log(1)
    this.cartServices.add(product);
    console.log("cart item added",product);
  }

}

