import { BehaviorSubject } from 'rxjs';
import { BpmnElements } from '../elements/bpmn.elements';
import { BpmnElement } from '../elements/shape/shape.model';
import { LaneRect } from '../elements/shape/lane.rect';

export class BpmnImporter {
    private process: any;
    private diagram: any;
    private collaboration: any;
    private bpmnElements = new BpmnElements();

    public bpmnElements$ = new BehaviorSubject<BpmnElements>(null);

    constructor(xml: any) {
        this.getElements(xml);
    }
    private createLane(dom: any, type: string, father: any): BpmnElement {
        const childs = this.htmlCollectionToArray( dom.children );
        if (type === 'laneSet') {
            for (const lane of childs) {
                this.importElement(lane, null);
            }
            return;
        }

        const bpmnDocumentElement = {
            id: dom.getAttribute( 'id' ),
            name: dom.getAttribute( 'name' ),
            type: type
        };
        const shape = this.bpmnElements.createElement(bpmnDocumentElement);
        const element = <LaneRect>shape.element;

        if ( father ) {
            shape.father = father;
        }

        for (const child of childs) {
            if (child.tagName === 'bpmn:flowNodeRef') {
                element.flowRefs.push('' + child.childNodes[0]);
            } else if (child.tagName === 'bpmn:childLaneSet') {
                const laneChilds = this.htmlCollectionToArray( child.children );
                for (const laneChild of laneChilds) {
                    shape.childrens.push(this.importElement(laneChild, shape));
                }
            }
        }
        return shape;
    }
    private createShape(dom: HTMLElement, type: string, father: any): BpmnElement {
        try {
            const bpmnDocumentElement: any = {
                id: dom.getAttribute( 'id' ),
                name: dom.getAttribute( 'name' ),
                type: type,
                data: {}
            };

            // Todo get the childs that isn't incoming or outcoming because the child can be a condition
            const childs = this.htmlCollectionToArray(dom.children);
            for (const child of childs) {
                if (type.includes('process')) {
                    this.proccessSubProccessChild(child, bpmnDocumentElement);
                    if (dom.getAttribute('triggeredByEvent=')) {
                        bpmnDocumentElement.data.triggered = this.isSubProccessTriggered(dom);
                    }
                } else if (type.includes('startEvent')) {
                    this.proccessStartEventChild(child, bpmnDocumentElement);
                } else if (type.includes('endEvent')) {
                    this.proccessEndEventChild(child, bpmnDocumentElement);
                } else if (type.includes('intermediateThrowEvent')) {
                    this.proccessIntermediateThrowEvent(child, bpmnDocumentElement);
                } else if (type.includes('intermediateCatchEvent')) {
                    this.proccessIntermediateCatchEvent(child, bpmnDocumentElement);
                } else if (type.includes('boundaryEvent')) {
                    this.proccessBoundaryEvent(child, bpmnDocumentElement);
                }
            }

            if (dom.getAttribute('cancelActivity')) {
                bpmnDocumentElement.data.cancelActivity = (dom.getAttribute('cancelActivity') === 'true') ? true : false;
            }

            const shape = this.bpmnElements.createElement( bpmnDocumentElement );

            if (father) {
                shape.father = father;
            }

            return shape;
        } catch (ex) {
            console.warn(dom);
            console.warn('Shape has not a known type: ' + type);
        }
    }
    private isSubProccessTriggered(dom: HTMLElement): boolean {
        return (dom.getAttribute('triggeredByEvent=') && dom.getAttribute('triggeredByEvent=') === 'true') ? true : false;
    }
    private proccessBoundaryEvent(child: HTMLElement, bpmnDocumentElement: any): void {
        const childType = child.tagName.split(':')[1];
        if (childType === 'escalationEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'escalation';
        } else if (childType === 'conditionalEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'conditional';
            bpmnDocumentElement.data.condition = child.getElementsByTagName('bpmn:condition');
        } else if (childType === 'messageEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'far fa-envelope';
        } else if (childType === 'timerEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'far fa-clock';
        } else if (childType === 'scalationEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'scalation';
        } else if (childType === 'errorEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'error';
        } else if (childType === 'signalEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'signal';
        } else if (childType === 'compensateEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'compensate';
        } else {
            console.warn('Event type not known: ' + childType);
            return;
        }
        bpmnDocumentElement.data.eventType = childType;
    }
    private proccessIntermediateCatchEvent(child: HTMLElement, bpmnDocumentElement: any): void {
        const childType = child.tagName.split(':')[1];
        if (childType === 'timerEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'far fa-clock';
        } else if (childType === 'messageEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'far fa-envelope';
        } else if (childType === 'signalEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'signal';
        } else {
            console.warn('Event type not known: ' + childType);
            return;
        }
        bpmnDocumentElement.data.eventType = childType;
    }
    private proccessIntermediateThrowEvent(child: HTMLElement, bpmnDocumentElement: any): void {
        const childType = child.tagName.split(':')[1];
        if (childType === 'timerEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'fas fa-clock';
        } else if (childType === 'messageEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'fas fa-envelope';
        } else if (childType === 'signalEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'signal';
        } else if (childType === 'escalationEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'signal';
        } else {
            console.warn('Event type not known: ' + childType);
            return;
        }
        bpmnDocumentElement.data.eventType = childType;
    }
    private proccessStartEventChild(child: HTMLElement, bpmnDocumentElement: any): void {
        const childType = child.tagName.split(':')[1];
        if (childType === 'signalEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'far fa-clock';
        } else if (childType === 'messageEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'far fa-envelope';
        } else if (childType === 'timerEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'far fa-clock';
        } else {
            console.warn('Event type not known: ' + childType);
            return;
        }
        bpmnDocumentElement.data.eventType = childType;
    }
    private proccessEndEventChild(child: HTMLElement, bpmnDocumentElement: any): void {
        const childType = child.tagName.split(':')[1];
        if (childType === 'signalEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'signal';
        } else if (childType === 'messageEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'fas fa-envelope';
        } else if (childType === 'timerEventDefinition') {
            bpmnDocumentElement.data.eventIcon = 'fas fa-clock';
        } else {
            console.warn('Event type not known: ' + childType);
            return;
        }
        bpmnDocumentElement.data.eventType = childType;
    }
    private proccessSubProccessChild(child: HTMLElement, bpmnDocumentElement: any): void {
        const childType = child.tagName.split(':')[1];
        if (childType === 'standardLoopCharacteristics') {
            bpmnDocumentElement.data.multiple = 'repeat';
        } else if (childType === 'multiInstanceLoopCharacteristics') {
            if (child.getAttribute('isSequential')) {
                bpmnDocumentElement.data.multiple = 'multipleSequence';
            } else {
                bpmnDocumentElement.data.multiple = 'multiple';
            }
        }
    }
    private createSubProcess(dom: any, type: string, father: any): BpmnElement {
        const childs = this.htmlCollectionToArray( dom.children );
        const sequenceIn = [];
        const sequenceOut = [];
        const sequences = [];

        const xmlElement = {
            id: dom.getAttribute( 'id' ),
            name: dom.getAttribute( 'name' ),
            type: type
        };
        const bpmnElement: BpmnElement = this.bpmnElements.createElement( xmlElement );

        if ( father ) {
            bpmnElement.father = father;
        }

        childs.forEach(( child ) => {
            const tagName = child.tagName;
            if ( tagName === 'bpmn:incoming' ) {
                sequenceIn.push( child );
            } else if ( tagName === 'bpmn:outgoing' ) {
                sequenceOut.push( child );
            } else  if ( tagName === 'bpmn:sequenceFlow') {
                sequences.push( child );
            } else if (child.tagName !== 'bpmn:multiInstanceLoopCharacteristics') {
                bpmnElement.childrens.push(this.importElement( child, bpmnElement ));
            }
        });

        sequences.forEach(( sequence ) => {
            this.importSequenceFlow( sequence );
        });
        return bpmnElement;
    }
    private getElements(xml: any): void {
        this.collaboration = xml.getElementsByTagName('bpmn:collaboration')[0];
        this.process = xml.getElementsByTagName('bpmn:process')[0];
        this.diagram = xml.getElementsByTagName('bpmndi:BPMNDiagram')[0];
        this.processCollaboration();
        this.processBpmnProcess();
        this.processDiagram();
        this.bpmnElements.bindElementAndSequence();
        this.bpmnElements$.next(this.bpmnElements);
    }
    private getNodePosition(node: any): any {
        return {x: parseInt(node.getAttribute('x'), 10), y: parseInt( node.getAttribute('y'), 10)};
    }
    private htmlCollectionToArray(doms: HTMLCollection): Array<HTMLElement> {
        const childs = [];
        for (let i = 0; i < doms.length; i++ ) {
            childs.push(doms[i]);
        }
        return childs;
    }
    private importElement(dom: any, father: any): BpmnElement {
        const type = dom.tagName.split(':')[1];
        if (type === 'subProcess' || type === 'adHocSubProcess') {
            return this.createSubProcess(dom, type, father);
        } else if (type === 'laneSet' || type === 'lane') {
            return this.createLane(dom, type, father);
        } else {
            return this.createShape(dom, type, father);
        }
    }
    private importSequenceFlow(sequence: any): void {
        const source: string = sequence.getAttribute('sourceRef');
        const target: string = sequence.getAttribute('targetRef');
        const id: string = sequence.getAttribute('id');
        const name: string = sequence.getAttribute('name');

        this.bpmnElements.createSequence(id, name, source, target);
    }
    private processCollaboration(): void {
        const childs: any = this.htmlCollectionToArray( this.collaboration.children );
        for (const child of childs) {
            if ( child.tagName === 'bpmn:participant' ) {
                this.importElement( child, null );
            } else {
                console.warn('Collaboration not known: ' + child.tagName);
            }
        }
    }
    private processBpmnProcess(): void {
        const childs: any = this.htmlCollectionToArray(this.process.children);
        const sequenceFlows: any = childs.filter((child: any) => child.tagName === 'bpmn:sequenceFlow' );
        const elements: any = childs.filter((child: any) => child.tagName !== 'bpmn:sequenceFlow' );

        this.bpmnElements.processId = this.process.getAttribute('id');
        this.bpmnElements.processName = this.process.getAttribute('name');

        elements.forEach((element: any) => this.importElement( element, null ));
        sequenceFlows.forEach((sequence: any) => this.importSequenceFlow( sequence ));
    }
    private processDiagram(): void {
        const plane = this.diagram.getElementsByTagName('bpmndi:BPMNPlane')[0];
        const childs = plane.childNodes;
        childs.forEach((child) => {
            if (child.tagName) {
                if (child.tagName === 'bpmndi:BPMNShape') {
                    this.processShapes(child);
                } else if (child.tagName === 'bpmndi:BPMNEdge') {
                    this.processSequences(child);
                } else {
                    console.warn('Diagram element not known: ' + child.tagName);
                }
            }
        });
    }
    private processSequences(child): void {
        const id = child.getAttribute( 'bpmnElement' );
        const childNodes = child.childNodes;

        childNodes.forEach(( node ) => {
            this.processSequenceChild(id, node);
        });
    }
    private processSequenceChild(id: string, node: any) {
        if (node.nodeName !== '#text') {
            if (node.tagName === 'di:waypoint')  {
                const position = this.getNodePosition(node);
                this.bpmnElements.setSequenceWaypoints(id, position);
            } else if (node.tagName === 'bpmndi:BPMNLabel') {
                const position = this.getNodePosition(node.childNodes[1]);
                this.bpmnElements.setSequenceNamePlacement(id, position);
            }
        }
    }
    private processShapes(child: any): void {
        const id: any = child.getAttribute( 'bpmnElement' );
        const childNodes: any = child.childNodes;

        const bpmnElement: BpmnElement = this.bpmnElements.getBpmnElementById(id);
        if (bpmnElement) {
            if (bpmnElement.type.search('process') > -1) {
                bpmnElement.data.expanded = (child.getAttribute('isExpanded') ? child.getAttribute('isExpanded') : false);
            }
            childNodes.forEach((node: any) => {
                this.processShapeChild(id, node);
            });
        }
    }
    private processShapeChild(id: string, node: any) {
        if (node.nodeName !== '#text') {
            if (node.tagName === 'dc:Bounds') {
                const position: any = this.getNodePosition(node);
                const height: number = parseInt(node.getAttribute( 'height' ), 10);
                const width: number = parseInt(node.getAttribute( 'width' ), 10);
                this.bpmnElements.setShapeAttributes(id, width, height, position);
            } else if (node.tagName === 'bpmndi:BPMNLabel') {
                const position = this.getNodePosition(node.childNodes[1]);
                this.bpmnElements.setShapeNamePlacement(id, position);
            } else {
                console.warn(node);
                console.warn('Element not known');
            }
        }
    }
}
