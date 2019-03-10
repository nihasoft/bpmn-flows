import { PrimitiveCircle } from './primitive.circle';

export class IntermediateThrowEventCircle extends PrimitiveCircle {
    constructor() {
        super();
        this.cssClass += ' bpmn-flows-intermediate-event-circle';
    }
}