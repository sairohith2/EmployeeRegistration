import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedAssetComponent } from './returned-asset.component';

describe('ReturnedAssetComponent', () => {
  let component: ReturnedAssetComponent;
  let fixture: ComponentFixture<ReturnedAssetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnedAssetComponent]
    });
    fixture = TestBed.createComponent(ReturnedAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
