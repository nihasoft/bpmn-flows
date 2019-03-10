import { PrimitiveCircle } from './primitive.circle';

export class BoundaryEventCircle extends PrimitiveCircle {
    constructor() {
        super();
        this.cssClass += ' bpmn-flows-end-event-circle';
    }
}