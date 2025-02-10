import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  http = inject(HttpClient)

  constructor() { }
  private baseUrl = environment.apiUrl;

  
  // get brand
  getBrands(){
    return this.http.get<Brand[]>(`${this.baseUrl}/brands`)
  }
  // add brand
  addBrand(name:any){
    return this.http.post<Brand[]>(`${this.baseUrl}/brands`,{
      name:name
    })
  }
// update brand
  updateBrand(id:any,name:any){
    return this.http.put<Brand[]>(`${this.baseUrl}/brands/` + id,{
      name:name
    })
  }
// delete brand
  deleteBrand(id:any){
    return this.http.delete<Brand[]>(`${this.baseUrl}/brands/` + id)
  }

  //get brand by id
  getBrandById(id:any){
    return this.http.get<Brand[]>(`${this.baseUrl}/brands/` + id)
  }
}
