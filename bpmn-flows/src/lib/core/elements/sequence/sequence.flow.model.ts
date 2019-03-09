import { BpmnElement } from '../shape/shape.model';
import { PrimitiveSequence } from './primitive.sequence';
import { SequenceFlowPath } from './sequence.flow.path';

export class SequenceFlow {
    source: BpmnElement;
    target: BpmnElement;
    id: string;
    element: PrimitiveSequence;
    name: string;
    constructor( id: string, name: string, source: BpmnElement, target: BpmnElement ) {
        this.id = id;
        this.name = name;
        this.source = source;
        this.target = target;
        this.element = new SequenceFlowPath();
    }
}