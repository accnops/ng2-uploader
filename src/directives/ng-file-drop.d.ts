import { ElementRef, EventEmitter } from '@angular/core';
import { NgUploader } from '../services/ng-uploader';
export declare class NgFileDropDirective {
    el: ElementRef;
    events: EventEmitter<any>;
    onUpload: EventEmitter<any>;
    onPreviewData: EventEmitter<any>;
    onFileOver: EventEmitter<any>;
    _options: any;
    options: any;
    files: any[];
    uploader: NgUploader;
    constructor(el: ElementRef);
    initEvents(): void;
    filterFilesByExtension(): void;
    onChange(): void;
    onDragOver(): void;
    onDragLeave(): any;
}
