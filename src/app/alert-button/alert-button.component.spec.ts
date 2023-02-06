import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AlertButtonComponent } from './alert-button.component';

import { MessageService } from '../message.service';
import { of } from 'rxjs';

describe('AlertButtonComponent', () => {
  let component: AlertButtonComponent;
  let fixture: ComponentFixture<AlertButtonComponent>;
  let de: DebugElement;


  let serviceStub: any;

  let service: MessageService;
  let spy: jasmine.Spy;


  beforeEach(async () => {
    // let serviceStub = {
  //   getContent: () => of('You have been warned'),
  // }

    await TestBed.configureTestingModule({
      declarations: [ AlertButtonComponent ],
      //providers: [ { provice: MessageService, useValue: serviceStub }]
      providers: [ MessageService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    service = de.injector.get(MessageService);
    spy = spyOn(service, 'getContent').and.returnValue(of('You have been warned'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //  it('should have a message with `warn`', () => {
  //    expect(component.content).toContain('warn');
  //  });

  it('should have a serverity greater than 2', () => {
    expect(component.severity).toBeGreaterThan(2);
  });

  it('should have a H1 tag of  `Alert Button`', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Alert Button');
  });

  it('should toggle the message boolean', () => {
    expect(component.hideContent).toBeTruthy();
    component.toggle();
    expect(component.hideContent).toBeFalsy();
  });

  it('should toggle the message boolean asynchronously', fakeAsync(() => {
    expect(component.hideContent).toBeTruthy();
    component.toggleAsync();
    tick(500);
    expect(component.hideContent).toBeFalsy();
  }));

  it('should have a message defined from an observable', () => {
    component.content.subscribe(content => {
      expect(content).toBeDefined();
      expect(content).toBe('You have been warned');
    });

  });

  it('should call getContent one time', () => {

    expect(spy).toHaveBeenCalled();
    expect( spy.calls.all().length).toEqual(1);

    expect(de.query(By.css('.message-body')).nativeElement.innerText).toContain('You have been warned');


  });

});
