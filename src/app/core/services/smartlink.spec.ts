import { TestBed } from '@angular/core/testing';

import { Smartlink } from './smartlink';

describe('Smartlink', () => {
  let service: Smartlink;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Smartlink);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
