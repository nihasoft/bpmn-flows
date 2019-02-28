
[![Version](https://img.shields.io/badge/Version-0.1.3-yellow.svg)](https://www.npmjs.com/package/@nihasoft/bpmn-flows)
[![License](https://img.shields.io/badge/License-MIT-red.svg)](https://raw.githubusercontent.com/nihasoft/bpmn-flows/master/LICENSE)
[![Build Status](https://travis-ci.org/nihasoft/bpmn-flows.svg?branch=master)](https://travis-ci.org/nihasoft/bpmn-flows)
[![Demo](https://img.shields.io/badge/Demo-Example-blueviolet.svg)](https://bpmnflows.nihasoft.com) 
[![Donate](https://img.shields.io/badge/%24-Donate-blue.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=96LEHU7G2Z2MC)

## BpmnFlows

BpmnFlows is an Angular lib to render a BPMN 2.0 workflow. The proposal of this lib is build a mechanism to render an existing BPMN 2.0 (.bpmn) or create a new one, enabling all the features of the bpmn 2.0 to the creation or to the edition.

In this moment, this lib only enable viewer from an existing bpmn 2.0 file.

## Status

BpmnFlows is under development and some features will come in the future. If you have some idea or got an error, please, open an issue here https://github.com/nihasoft/bpmn-flows/issues. Help me to give a great BPMN 2.0 library to the Angular.
`Angular version: 7.2.6`

## Demo

BpmnFlows live demo can be accessed in https://bpmnflows.nihasoft.com.
Also you can have more details to use in the repository especially in the directory bpmn-flows-demo.

## To install

To install this lib you only need to execute:

`npm i bpmn-flows`

## To use

This lib load a bpmn 2.0 file and render the workflow. To use this lib you need to:

- Import in your main style.scss the BpmnFlows scss:
        
        @import "~@nihasoft/bpmn-flows/bpmn-flows.component.scss";

- Import in your main style.scss this scss to the icons:

        $fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
        @import "~@fortawesome/fontawesome-free/scss/fontawesome.scss";
        @import "~@fortawesome/fontawesome-free/scss/solid.scss";

    Note: The bpmn 2.0 types icons is from the font-awesome. Then the scss import is to load this icons to use in the  library

- Import and declare the BpmnFlowsModule in you main module:

        import { BrowserModule } from '@angular/platform-browser';
        import { NgModule } from '@angular/core';
        import { BpmnFlowsModule } from 'bpmn-flows';
        import { AppComponent } from './app.component';

        @NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                BrowserModule,
                BpmnFlowsModule
            ],
            providers: [],
            bootstrap: [AppComponent]
        })
        export class AppModule {}

- In your html component put this tag:

        <bpmn-flows [fileUrl] = "fileUrl"></bpmn-flows>

    Note: the fileUrl is the path of the bpmn file(`.bpmn`) to be rendered

And that's is it.

## Enjoy.

## License

MIT License

Copyright (c) 2018 Hanor Sátiro Cintra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

