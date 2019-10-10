import { PrimitiveRect } from './primitive.rect';

export class CallActivityTaskRect extends PrimitiveRect {
    constructor( ) {
        super();
        this.cssClass = 'bpmn-flows-call-activity-task-rect';
        this.icon = 'fas fa-bell';
    }
}
