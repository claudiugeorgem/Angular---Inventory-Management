import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      description: 'A smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface',
      price: 999.99,
      quantity: 100
    },
    {
      id: 2,
      name: 'Monitor LED IPS Philips',
      description: 'An output device that displays information being processed in a computer',
      price: 299.99,
      quantity: 150
    },
    // Add more mock products as needed
  ];

  constructor() {}

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(productId: number): Observable<Product | undefined> {
    const product = this.products.find((p) => p.id === productId);
    return of(product);
  }

  addProduct(newProduct: Product): Observable<Product[]> {
    newProduct.id = this.generateProductId();
    this.products.push(newProduct);
    return of(this.products);
  }

  updateProduct(updatedProduct: Product): Observable<Product[]> {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
    return of(this.products);
  }

  deleteProduct(productId: number): Observable<Product[]> {
    this.products = this.products.filter((p) => p.id !== productId);
    return of(this.products);
  }

  private generateProductId(): number {
    // Generate a unique product ID
    const maxId = Math.max(...this.products.map((p) => p.id), 0);
    return maxId + 1;
  }
}
