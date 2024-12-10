import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkPriceComponent } from './network-price.component';

describe('NetworkPriceComponent', () => {
  let component: NetworkPriceComponent;
  let fixture: ComponentFixture<NetworkPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
