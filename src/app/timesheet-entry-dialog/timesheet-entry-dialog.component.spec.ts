import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetEntryDialogComponent } from './timesheet-entry-dialog.component';

describe('TimesheetEntryDialogComponent', () => {
  let component: TimesheetEntryDialogComponent;
  let fixture: ComponentFixture<TimesheetEntryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimesheetEntryDialogComponent]
    });
    fixture = TestBed.createComponent(TimesheetEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
