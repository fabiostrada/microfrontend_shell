import { TestBed } from '@angular/core/testing';

import { OnlyOneGuard } from './only-one.guard';

describe('OnlyOneGuard', () => {
  let guard: OnlyOneGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyOneGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
