"use strict";
var core_1 = require('@angular/core');
var ng_uploader_1 = require('../services/ng-uploader');
var NgFileSelectDirective = (function () {
    function NgFileSelectDirective(el) {
        var _this = this;
        this.el = el;
        this.onUpload = new core_1.EventEmitter();
        this.onPreviewData = new core_1.EventEmitter();
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
            if (_this.events) {
                _this.events.subscribe(function (data) {
                    if (data === 'startUpload') {
                        _this.uploader.uploadFilesInQueue();
                    }
                });
            }
        });
    }
    Object.defineProperty(NgFileSelectDirective.prototype, "options", {
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
    NgFileSelectDirective.prototype.filterFilesByExtension = function () {
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
    NgFileSelectDirective.prototype.onChange = function () {
        this.files = Array.from(this.el.nativeElement.files);
        if (this.options.filterExtensions && this.options.allowedExtensions) {
            this.filterFilesByExtension();
        }
        if (this.files.length) {
            this.uploader.addFilesToQueue(this.files);
        }
    };
    NgFileSelectDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[ngFileSelect]'
                },] },
    ];
    /** @nocollapse */
    NgFileSelectDirective.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    NgFileSelectDirective.propDecorators = {
        'events': [{ type: core_1.Input },],
        'onUpload': [{ type: core_1.Output },],
        'onPreviewData': [{ type: core_1.Output },],
        'options': [{ type: core_1.Input, args: ['options',] },],
        'onChange': [{ type: core_1.HostListener, args: ['change',] },],
    };
    return NgFileSelectDirective;
}());
exports.NgFileSelectDirective = NgFileSelectDirective;
//# sourceMappingURL=ng-file-select.js.map