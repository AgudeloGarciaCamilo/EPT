import { TestBed } from '@angular/core/testing';

import { MostradorUsuariosService } from './mostrador-usuarios.service';

describe('MostradorUsuariosService', () => {
  let service: MostradorUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostradorUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
