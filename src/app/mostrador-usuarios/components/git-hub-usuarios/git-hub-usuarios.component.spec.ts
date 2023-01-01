import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitHubUsuariosComponent } from './git-hub-usuarios.component';

describe('GitHubUsuariosComponent', () => {
  let component: GitHubUsuariosComponent;
  let fixture: ComponentFixture<GitHubUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitHubUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitHubUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
