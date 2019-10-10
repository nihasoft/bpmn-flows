import { PrimitiveCircle } from './primitive.circle';

export class IntermediateThrowEventCircle extends PrimitiveCircle {
    constructor(data?: any) {
        super(data);
        this.cssClass += ' bpmn-flows-intermediate-event-circle';
    }
}
