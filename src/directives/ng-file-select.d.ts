import { ElementRef, EventEmitter } from '@angular/core';
import { NgUploader } from '../services/ng-uploader';
export declare class NgFileSelectDirective {
    el: ElementRef;
    events: EventEmitter<any>;
    onUpload: EventEmitter<any>;
    onPreviewData: EventEmitter<any>;
    _options: any;
    options: any;
    files: any[];
    uploader: NgUploader;
    constructor(el: ElementRef);
    filterFilesByExtension(): void;
    onChange(): void;
}
