import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitpractiseComponent } from './gitpractise.component';

describe('GitpractiseComponent', () => {
  let component: GitpractiseComponent;
  let fixture: ComponentFixture<GitpractiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GitpractiseComponent]
    });
    fixture = TestBed.createComponent(GitpractiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
