import { PrimitiveCircle } from './primitive.circle';

export class IntermediateCatchEventCircle extends PrimitiveCircle {
    constructor(data?: any) {
        super(data);
        this.cssClass += ' bpmn-flows-intermediate-event-circle';
    }
}
