import { PrimitiveCircle } from './primitive.circle';

export class BoundaryEventCircle extends PrimitiveCircle {
    constructor(data?: any) {
        super();
        this.cssClass += ' bpmn-flows-boundary-event-circle';
        if (data && data.cancelActivity === false) {
            this.cssClass += ' bpmn-flows-dashed-circle';
        }
    }
}
