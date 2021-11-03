import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfermComponent } from './dialog-conferm.component';

describe('DialogConfermComponent', () => {
  let component: DialogConfermComponent;
  let fixture: ComponentFixture<DialogConfermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
