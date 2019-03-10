import { PrimitiveCircle } from './primitive.circle';

export class IntermediateCatchEventCircle extends PrimitiveCircle {
    constructor() {
        super();
        this.cssClass += ' bpmn-flows-intermediate-event-circle';
    }
}