import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BpmnFlowsComponent } from './bpmn-flows.component';
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
    component.fileUrl = 'assets/all.bpmn';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not print warn to console', function(){
    component.ngOnInit();
    fixture.detectChanges();
    (expect(console.warn).toHaveBeenCalledTimes(0));
  })
});
