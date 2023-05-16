import {Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
//import {MainHeadingComponent} from "../main-heading/main-heading.component";
//import {StreamItemComponent} from "./stream-item/stream-item.component";
import {A11y, Mousewheel, Navigation, Pagination, SwiperOptions} from 'swiper';
import {SwiperDirective} from "../../directives/swiper.directive";

@Component({
  selector: 'app-streams-swiper',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    //MainHeadingComponent,
    //StreamItemComponent,
    SwiperDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './streams-swiper.component.html',
})
export class StreamsSwiperComponent {

  sliders: string[] = [
    'Test 1',
    'Test 2',
    'Test 3',
    'Test 4',
    'Test 5',
    'Test 6',
    'Test 7',
    'Test 8',
    'Test 9',
  ]

  public config: SwiperOptions = {
    modules: [Navigation, Pagination, A11y, Mousewheel],
    autoHeight: true,
    spaceBetween: 20,
    navigation: false,
    pagination: {clickable: true, dynamicBullets: true},
    slidesPerView: 1,
    centeredSlides: true,
    breakpoints: {
      400: {
        slidesPerView: "auto",
        centeredSlides: false
      },
    }
  }
}
