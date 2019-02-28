import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmnFlowsComponent } from './bpmn-flows.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BpmnFlowsService } from './bpmn-flows.service';

describe('BpmnFlowsComponent', () => {
  let component: BpmnFlowsComponent;
  let fixture: ComponentFixture<BpmnFlowsComponent>;

  beforeEach(async(() => {
    spyOn(console, 'warn');
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ BpmnFlowsComponent ],
      providers: [ BpmnFlowsService, HttpClient ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpmnFlowsComponent);
    component = fixture.componentInstance;
  }));
  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
