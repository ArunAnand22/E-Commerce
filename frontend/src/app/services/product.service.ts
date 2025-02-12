import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient)

  constructor() { }
  private baseUrl = environment.apiUrl;


  // get brand
  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/products`)
  }
  // add brand
  addProduct(data: Product) {
    return this.http.post(`${this.baseUrl}/products`, {
      name: data.name,
      shortDescription: data.shortDescription,
      description: data.description,
      price: data.price,
      discount: data.discount,
      categoryId: data.categoryId
    })
  }
  // update brand
  updateProduct(id: any, data: Product) {
    return this.http.put(`${this.baseUrl}/products/` + id, {
      name: data.name,
      shortDescription: data.shortDescription,
      description: data.description,
      price: data.price,
      discount: data.discount,
      categoryId: data.categoryId
    })
  }
  // delete brand
  deleteProduct(id: any) {
    return this.http.delete(`${this.baseUrl}/products/` + id)
  }

  //get brand by id
  getProductById(id: any) {
    return this.http.get<Product>(`${this.baseUrl}/products/` + id)
  }
}
