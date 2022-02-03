import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyOneComponent } from './only-one.component';

describe('OnlyOneComponent', () => {
  let component: OnlyOneComponent;
  let fixture: ComponentFixture<OnlyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlyOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
