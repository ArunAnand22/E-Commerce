import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

import { BrandsService } from '../../../services/brands.service';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [FormsModule,MatInputModule,MatFormFieldModule,MatButtonModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css'
})
export class BrandFormComponent {
name!: string;
  brandService = inject(BrandsService)
  router = inject(Router)
  route = inject(ActivatedRoute)
  isEdit = false;
  initialName: string = '';
  id: string = '';
  isChanged = false;

  ngOnInit(){
    this.id = this.route.snapshot.params['id']
    if(this.id){
      this.isEdit = true;
      this.brandService.getBrandById(this.id).subscribe({
        next:(result: any) => {
          this.name = result.data.name;
          this.initialName = result.data.name;
        },
        error:(err: any) => {},
        complete:() => {}
      })
    }
  }


  add() {
    this.brandService.addBrand(this.name).subscribe({
      next:(result: any) => {
        console.log(result)
          this.router.navigateByUrl("/admin/brands")
      },
      error:(err: any) => {},
      complete:() => {}
    })
  }

  modify() {
    this.isChanged = this.name.trim() !== this.initialName.trim();
    if (this.isChanged) {
      console.log('Category modified:', this.name);
      this.brandService.updateBrand(this.id,this.name).subscribe({
        next:(result:any) => {
          this.router.navigateByUrl("/admin/brands")
        },
        error:(err:any) => {},
        complete:() => {}
      })
    }else{
      console.log('There is no change to submit');

    }
  }
}
