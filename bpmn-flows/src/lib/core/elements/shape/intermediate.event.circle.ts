import { PrimitiveCircle } from './primitive.circle';

export class IntermediateEventCircle extends PrimitiveCircle {
    constructor() {
        super();
        this.cssClass += ' bpmn-flows-intermediate-event-circle';
    }
}