"use strict";
var core_1 = require('@angular/core');
var ng_uploader_1 = require('../services/ng-uploader');
var NgFileDropDirective = (function () {
    function NgFileDropDirective(el) {
        var _this = this;
        this.el = el;
        this.onUpload = new core_1.EventEmitter();
        this.onPreviewData = new core_1.EventEmitter();
        this.onFileOver = new core_1.EventEmitter();
        this.files = [];
        this.uploader = new ng_uploader_1.NgUploader();
        setTimeout(function () {
            _this.uploader.setOptions(_this.options);
        });
        this.uploader._emitter.subscribe(function (data) {
            _this.onUpload.emit(data);
            if (data.done) {
                _this.files = _this.files.filter(function (f) { return f.name !== data.originalName; });
            }
        });
        this.uploader._previewEmitter.subscribe(function (data) {
            _this.onPreviewData.emit(data);
        });
        setTimeout(function () {
            if (_this.events instanceof core_1.EventEmitter) {
                _this.events.subscribe(function (data) {
                    if (data === 'startUpload') {
                        _this.uploader.uploadFilesInQueue();
                    }
                });
            }
        });
        this.initEvents();
    }
    Object.defineProperty(NgFileDropDirective.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this._options = value;
            this.uploader.setOptions(this.options);
        },
        enumerable: true,
        configurable: true
    });
    NgFileDropDirective.prototype.initEvents = function () {
        var _this = this;
        this.el.nativeElement.addEventListener('drop', function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.files = Array.from(e.dataTransfer.files);
            if (_this.files.length) {
                _this.uploader.addFilesToQueue(_this.files);
            }
        }, false);
        this.el.nativeElement.addEventListener('dragenter', function (e) {
            e.stopPropagation();
            e.preventDefault();
        }, false);
        this.el.nativeElement.addEventListener('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
        }, false);
    };
    NgFileDropDirective.prototype.filterFilesByExtension = function () {
        var _this = this;
        this.files = this.files.filter(function (f) {
            if (_this.options.allowedExtensions.indexOf(f.type) !== -1) {
                return true;
            }
            var ext = f.name.split('.').pop();
            if (_this.options.allowedExtensions.indexOf(ext) !== -1) {
                return true;
            }
            return false;
        });
    };
    NgFileDropDirective.prototype.onChange = function () {
        this.files = Array.from(this.el.nativeElement.files);
        if (this.options.filterExtensions && this.options.allowedExtensions) {
            this.filterFilesByExtension();
        }
        if (this.files.length) {
            this.uploader.addFilesToQueue(this.files);
        }
    };
    NgFileDropDirective.prototype.onDragOver = function () {
        this.onFileOver.emit(true);
    };
    NgFileDropDirective.prototype.onDragLeave = function () {
        this.onFileOver.emit(false);
    };
    NgFileDropDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[ngFileDrop]'
                },] },
    ];
    /** @nocollapse */
    NgFileDropDirective.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    NgFileDropDirective.propDecorators = {
        'events': [{ type: core_1.Input },],
        'onUpload': [{ type: core_1.Output },],
        'onPreviewData': [{ type: core_1.Output },],
        'onFileOver': [{ type: core_1.Output },],
        'options': [{ type: core_1.Input, args: ['options',] },],
        'onChange': [{ type: core_1.HostListener, args: ['change',] },],
        'onDragOver': [{ type: core_1.HostListener, args: ['dragover', ['$event'],] },],
        'onDragLeave': [{ type: core_1.HostListener, args: ['dragleave', ['$event'],] },],
    };
    return NgFileDropDirective;
}());
exports.NgFileDropDirective = NgFileDropDirective;
//# sourceMappingURL=ng-file-drop.js.map