import { TestBed } from '@angular/core/testing';

import { LoadDotaCharactersService } from './load-dota-characters.service';

describe('LoadDotaCharactersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadDotaCharactersService = TestBed.get(LoadDotaCharactersService);
    expect(service).toBeTruthy();
  });
});
