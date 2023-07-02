import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/components/header/header.component';
import { FooterComponent } from './modules/components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './modules/pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './modules/pages/products/products.component';
import { ProductsDetailComponent } from './modules/pages/products-detail/products-detail.component';
import { CategoriesComponent } from './modules/pages/categories/categories.component';
import { ShoppingCartComponent } from './modules/components/shoppingCart/shoppingCart.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductsDetailComponent,
    CategoriesComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
