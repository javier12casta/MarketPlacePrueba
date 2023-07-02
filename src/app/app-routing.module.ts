import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/pages/home/home.component';
import { ProductsComponent } from './modules/pages/products/products.component';
import { ProductsDetailComponent } from './modules/pages/products-detail/products-detail.component';
import { CategoriesComponent } from './modules/pages/categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'products/:id', component: ProductsDetailComponent},
  { path: 'categories', component: CategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
