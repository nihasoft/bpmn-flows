import { PrimitiveElement } from '../primitive.element';

export class PrimitiveCircle extends PrimitiveElement {
    public type: string;
    public ratio: number;

    constructor(data?: any) {
        super();
        this.type = 'circle';
        this.ratio = null;
        this.position = { x: 0, y: 0 };
        this.cssClass = 'bpmn-flows-circle';
        this.textCssClass = 'bpmn-flows-circle-name';

        if (data && data.eventIcon) {
            this.iconCssClass = 'bpmn-flows-icon bpmn-flows-circle-icon';
            this.icon = data.eventIcon;
        }
    }

    public setRatio(ratio: number) {
        this.width = ratio;
        this.height = ratio;
        this.ratio = ratio;
    }
}
