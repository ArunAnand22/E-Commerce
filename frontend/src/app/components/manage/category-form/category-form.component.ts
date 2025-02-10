import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule,MatInputModule,MatFormFieldModule,MatButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  name!: string;
  categoryService = inject(CategoryService)
  router = inject(Router)

  add() {
    this.categoryService.addCategory(this.name).subscribe({
      next:(result: any) => {
        console.log(result)
          this.router.navigateByUrl("/admin/categories")
      },
      error:(err: any) => {},
      complete:() => {}
    })
  }
}
