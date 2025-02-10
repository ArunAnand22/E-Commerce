import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient)
  constructor() { }

  // get categories
  getCategories(){
    return this.http.get('http://localhost:3000/category')
  }
  // add categories
  addCategory(name:any){
    return this.http.post('http://localhost:3000/category',{
      name:name
    })
  }
// update category
  updateCategory(id:any,name:any){
    return this.http.put('http://localhost:3000/category/' + id,{
      name:name
    })
  }
// delete category
  deleteCategory(id:any){
    return this.http.delete('http://localhost:3000/category/' + id)
  }

  //get category by id
  getCategoryById(id:any){
    return this.http.get('http://localhost:3000/category/' + id)
  }
}
