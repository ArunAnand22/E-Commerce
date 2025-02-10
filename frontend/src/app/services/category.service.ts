import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient)
  constructor() { }
  private baseUrl = environment.apiUrl;

  // get categories
  getCategories(){
    return this.http.get(`${this.baseUrl}/category`)
  }
  // add categories
  addCategory(name:any){
    return this.http.post(`${this.baseUrl}/category`,{
      name:name
    })
  }
// update category
  updateCategory(id:any,name:any){
    return this.http.put(`${this.baseUrl}/category/` + id,{
      name:name
    })
  }
// delete category
  deleteCategory(id:any){
    return this.http.delete(`${this.baseUrl}/category/` + id)
  }

  //get category by id
  getCategoryById(id:any){
    return this.http.get(`${this.baseUrl}/category/` + id)
  }
}
