import { SequenceFlow } from '../sequence/sequence.flow.model';
import { PrimitiveElement } from '../primitive.element';
import { BpmnTypes } from '../bpmn.types';

export class BpmnElement {
    father: Element;
    form: string;
    id: string;
    name: string;
    type: string;
    position: {};
    in: Array<SequenceFlow>;
    out: Array<SequenceFlow>;
    element: PrimitiveElement;
    childrens: Array<BpmnElement> = [];
    data: any = {};

    constructor( bpmnDocumentElement: any ) {
        this.form = bpmnDocumentElement.form;
        this.id = bpmnDocumentElement.id;
        this.name = bpmnDocumentElement.name;
        this.type = bpmnDocumentElement.type;
        this.in = [];
        this.out = [];
        this.element = new BpmnTypes[bpmnDocumentElement.type](bpmnDocumentElement.data);
        this.data = bpmnDocumentElement.data;
    }
}
