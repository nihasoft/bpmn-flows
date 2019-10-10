import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BpmnImporter } from './core/importer/bpmn.importer';
import { Scene } from './core/scene/scene';
import { BpmnElements } from './core/elements/bpmn.elements';

@Injectable({
  providedIn: 'root'
})
export class BpmnFlowsService {
  public bpmnElements: BpmnElements;
  public bpmnImporter: BpmnImporter;
  public scene: Scene;

  constructor( private http: HttpClient ) {}

  public initialize( bpmnFile: string ) {
      this.getBpmnDiagram( bpmnFile );
  }
  public bpmnDiagramParser(text: string) {
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      this.bpmnImporter = new BpmnImporter(xml);
      this.eventImportedBpmn();
  }
  public eventImportedBpmn() {
      this.bpmnImporter.bpmnElements$.subscribe(
        (bpmnElements: any ) => {
          this.bpmnElements = bpmnElements;
          if ( this.bpmnElements ) {
            this.renderBpmn();
          }
        }
    );
  }
  public eventRenderedBpmn() {
      this.scene.loaded$.subscribe(
        (loaded: any ) => {
          if (loaded) {
              console.log('Loaded...');
          }
        }
    );
  }
  public getBpmnDiagram( bpmnFilePath ): void {
      this.http.get(bpmnFilePath, {responseType: 'text'}).subscribe(( response ) => {
        this.bpmnDiagramParser( response );
      });
  }
  public renderBpmn() {
      this.scene = new Scene( this.bpmnElements, 'bpmn-flows-container' );
      this.scene.init();
      this.eventRenderedBpmn();
  }
}
