import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedAssetsListComponent } from './returned-assets-list.component';

describe('ReturnedAssetsListComponent', () => {
  let component: ReturnedAssetsListComponent;
  let fixture: ComponentFixture<ReturnedAssetsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnedAssetsListComponent]
    });
    fixture = TestBed.createComponent(ReturnedAssetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
