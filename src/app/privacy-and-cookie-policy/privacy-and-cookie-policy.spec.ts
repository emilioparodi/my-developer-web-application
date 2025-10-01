import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyAndCookiePolicy } from './privacy-and-cookie-policy';

describe('PrivacyAndCookiePolicy', () => {
  let component: PrivacyAndCookiePolicy;
  let fixture: ComponentFixture<PrivacyAndCookiePolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyAndCookiePolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyAndCookiePolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
