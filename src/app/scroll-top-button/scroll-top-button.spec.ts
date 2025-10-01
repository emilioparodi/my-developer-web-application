import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollTopButton } from './scroll-top-button';

describe('ScrollTopButton', () => {
  let component: ScrollTopButton;
  let fixture: ComponentFixture<ScrollTopButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollTopButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollTopButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
