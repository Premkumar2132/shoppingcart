import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ShoppingService } from '../../Services/shopping.service';
import { CommonModule } from '@angular/common';
import { Products } from '../../home/content/contentInterface.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [NzModalModule,NzMessageModule,CommonModule,ReactiveFormsModule,NzFormModule,NzTableModule,],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  form: FormGroup;
  products: any[] = [];
  showForm: boolean = false;
  editProduct: any = null;
  confirmDeleteVisible: boolean = false;
  deleteProductId: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private message: NzMessageService,
    private shoppingService: ShoppingService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      gender: ['male' || 'women'],
      price: [null, Validators.required],
      quantity: [null],
      brand: [''],
      image: [''] // Changed from Image to image
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.shoppingService.getAllProducts().subscribe(
      response => {
        this.products = response;
      },
      error => {
        console.error('Error fetching products:', error);
        this.message.error('Failed to fetch products');
      }
    );
  }

  onFinish(values: any): void {
    try {
      if (this.editProduct) {
        this.shoppingService.updateProduct(this.editProduct.id, values).subscribe(
          () => {
            const updatedProducts = this.products.map(product =>
              product.id === this.editProduct.id ? { ...product, ...values } : product
            );
            this.products = updatedProducts;
            this.message.success('Product updated successfully');
            this.editProduct = null;
            this.form.reset();
            this.showForm = false;
          },
          error => {
            console.error('Error updating product:', error);
            this.message.error('Failed to update product');
          }
        );
      } else {
        this.shoppingService.addProduct(values).subscribe(
          response => {
            this.products.push(response);
            this.message.success('Product added successfully');
            this.form.reset();
            this.showForm = false;
          },
          error => {
            console.error('Error adding product:', error);
            this.message.error('Failed to add product');
          }
        );
      }
    } catch (error) {
      console.error('Error saving product:', error);
      this.message.error('Failed to save product');
    }
  }

  handleEdit(record: any): void {
    this.editProduct = record;
    this.showForm = true;
    this.form.patchValue(record);
  }

  handleDelete(productId: string | null): void {
    if (productId) {
      this.shoppingService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter(product => product['id'] !== productId);
          this.message.success('Product deleted successfully');
          this.confirmDeleteVisible = false;
          this.deleteProductId = null; // Reset deleteProductId after deletion
        },
        error => {
          console.error('Error deleting product:', error);
          this.message.error('Failed to delete product');
        }
      );
    }
  }
  

  cancelDelete(): void {
    this.confirmDeleteVisible = false;
    this.deleteProductId = null;
  }

  openConfirmDeleteModal(productId: string | null): void {
    if (productId) {
      this.confirmDeleteVisible = true;
      this.deleteProductId = productId;
    }
  }
}