import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveFilesComponent } from './active-files.component';

describe('ActiveFilesComponent', () => {
  let component: ActiveFilesComponent;
  let fixture: ComponentFixture<ActiveFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
