import { BpmnElement } from './shape/shape.model';
import { SequenceFlow } from './sequence/sequence.flow.model';
import { PrimitiveRect } from './shape/primitive.rect';
import { PrimitiveCircle } from './shape/primitive.circle';
import { PrimitiveSequence } from './sequence/primitive.sequence';
import { PrimitiveRhombus } from './shape/primitive.rhombus';

export class BpmnElements {
    elements = {};
    sequences = {};
    processName: string;
    processId: string;
    
    bindElementAndSequence(): void {
        const sequenceKeys = Object.keys( this.sequences );
        for( const sequenceKey of sequenceKeys) {
            const sequence:SequenceFlow = this.sequences[ sequenceKey ];
            sequence.source.out.push( sequence );
            sequence.target.in.push( sequence );
        }
    }
    calculateRhombusPoints(size: number): any {
        return size/2 + ',0 ' + size + ',' + size/2 + ' ' + size/2 + ',' + size + ' 0,' + size/2;
    }
    createElement( bpmnDocumentElement: any ): BpmnElement {
        try {
            const bpmnElement = new BpmnElement( bpmnDocumentElement );
            this.elements[ bpmnElement.id ] = bpmnElement;
            return bpmnElement;
        } catch (ex) {
            console.warn('BpmnElement type not found id: ' + bpmnDocumentElement.id + ', type: ' + bpmnDocumentElement.id);
        }
    }
    createSequence(id, name, source, target): void {
        const sourceShape: BpmnElement = this.elements[ source ];
        const targetShape: BpmnElement = this.elements[ target ];

        if (!sourceShape || !targetShape) {
            console.warn('Sequence cannnot be created: ' + source + ', ' + target + ' ID: ' + id);
            return;
        }

        const sequence = new SequenceFlow(id, name, sourceShape, targetShape);
        this.sequences[ id ] = sequence;
    }
    getBpmnElementById(id: string): BpmnElement {
        return this.elements[id];
    }
    setSequenceNamePlacement(id, position) {
        const sequence: SequenceFlow = this.sequences[id];

        if (!sequence) {
            console.warn('Sequence not found:' + id);
            return;
        }

        sequence.element.textPosition = position;
    }
    setSequenceWaypoints(id, waypoints) {
        const sequence: SequenceFlow = this.sequences[id];

        if (!sequence) {
            console.warn('Sequence has not created.: ' + id);
            return;
        }
        const element: PrimitiveSequence = sequence.element;
        element.waypoints.push(waypoints);
    }
    setShapeAttributes(id: string, width: number, height: number, position: any): void {
        const shape:BpmnElement = this.elements[ id ];
        if ( !shape ) {
            console.warn( 'BpmnElement not found: ' + id );
            return;
        }

        if ( shape.element instanceof PrimitiveRect ) {
            const element: PrimitiveRect = shape.element;
            element.width = width;
            element.height = height;
            element.position = position;
        } else if ( shape.element instanceof PrimitiveCircle ) {
            const element: PrimitiveCircle = shape.element;
            let ratio = ((width + height) /4);
            element.setRatio(ratio);
            element.position = position;
            
        } else if ( shape.element instanceof PrimitiveRhombus ) {
            const element: PrimitiveRhombus = shape.element;
            element.width = width;
            element.height = height;
            element.position = position;
            element.points = this.calculateRhombusPoints(element.width);
        } else {
            console.warn( shape.element );
            throw new Error('Dont know this shape');
        }
    }
    setShapeNamePlacement(id: string, position) : void {
        let shape: BpmnElement = this.elements[id];

        if (!shape) {
            console.warn('BpmnElement not found: ' + id);
            return;
        }

        shape.element.textPosition = position;
    }
}