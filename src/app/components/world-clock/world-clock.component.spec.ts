/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorldClockComponent } from './world-clock.component';

describe('WorldClockComponent', () => {
  let component: WorldClockComponent;
  let fixture: ComponentFixture<WorldClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
