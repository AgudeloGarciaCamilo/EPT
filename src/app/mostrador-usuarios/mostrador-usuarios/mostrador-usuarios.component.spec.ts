import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostradorUsuariosComponent } from './mostrador-usuarios.component';

describe('MostradorUsuariosComponent', () => {
  let component: MostradorUsuariosComponent;
  let fixture: ComponentFixture<MostradorUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostradorUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostradorUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
