import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamsSwiperComponent } from './streams-swiper.component';

describe('StreamsSwiperComponent', () => {
  let component: StreamsSwiperComponent;
  let fixture: ComponentFixture<StreamsSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamsSwiperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamsSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
