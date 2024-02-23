import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0
  };

  constructor(private productService: ProductService) {}

  onSubmit(): void {
    if (this.isFormValid()) {
      this.productService.addProduct(this.newProduct).subscribe(
        (products: Product[]) => {
          console.log('Product added:', this.newProduct);

          // Reset the form after adding the product
          this.resetForm();
        },
        (error: any) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }

  isFormValid(): boolean {
    // Form validation
    return (
      this.newProduct.name.trim() !== '' &&
      this.newProduct.description.trim() !== '' &&
      this.newProduct.price > 0 &&
      this.newProduct.quantity > 0
    );
  }

  resetForm(): void {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      quantity: 0
    };
  }
}
