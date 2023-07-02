import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cards: any[] = [];
  categories: any[] =[];
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  @ViewChild('prevButton') prevButton!: ElementRef;
  @ViewChild('nextButton') nextButton!: ElementRef;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((resp: any) => {
      this.cards = resp;
    });
    this.productService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
    });
  }

  ngAfterViewInit() {
    this.prevButton.nativeElement.addEventListener('click', this.prevSlide.bind(this));
    this.nextButton.nativeElement.addEventListener('click', this.nextSlide.bind(this));
  }

  prevSlide() {
    const slider = this.sliderContainer.nativeElement;
    const cardWidth = slider.querySelector('.card').offsetWidth;
    const scrollAmount = cardWidth + 20; // Ajusta este valor según el margen entre las tarjetas

    slider.scrollLeft -= scrollAmount;
  }

  nextSlide() {
    const slider = this.sliderContainer.nativeElement;
    const cardWidth = slider.querySelector('.card').offsetWidth;
    const scrollAmount = cardWidth + 20; // Ajusta este valor según el margen entre las tarjetas

    slider.scrollLeft += scrollAmount;
  }

}
