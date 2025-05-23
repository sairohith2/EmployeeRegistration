import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFileUploadDialogComponent } from './employee-file-upload-dialog.component';

describe('EmployeeFileUploadDialogComponent', () => {
  let component: EmployeeFileUploadDialogComponent;
  let fixture: ComponentFixture<EmployeeFileUploadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeFileUploadDialogComponent]
    });
    fixture = TestBed.createComponent(EmployeeFileUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
