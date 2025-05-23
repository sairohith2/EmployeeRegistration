import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetformdialogComponent } from './assetformdialog.component';

describe('AssetformdialogComponent', () => {
  let component: AssetformdialogComponent;
  let fixture: ComponentFixture<AssetformdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetformdialogComponent]
    });
    fixture = TestBed.createComponent(AssetformdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
