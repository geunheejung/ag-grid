// ag-grid-enterprise v20.1.0
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("../node");
var object_1 = require("../../util/object");
var Shape = /** @class */ (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._fillStyle = Shape.defaultStyles.fillStyle; //| CanvasGradient | CanvasPattern;
        _this._strokeStyle = Shape.defaultStyles.strokeStyle;
        _this._lineWidth = Shape.defaultStyles.lineWidth;
        _this._lineDash = Shape.defaultStyles.lineDash;
        _this._lineDashOffset = Shape.defaultStyles.lineDashOffset;
        _this._lineCap = Shape.defaultStyles.lineCap;
        _this._lineJoin = Shape.defaultStyles.lineJoin;
        _this._opacity = Shape.defaultStyles.opacity;
        _this._shadow = Shape.defaultStyles.shadow;
        return _this;
    }
    /**
     * Restores the default styles introduced by this subclass.
     */
    Shape.prototype.restoreOwnStyles = function () {
        var styles = this.constructor.defaultStyles;
        var keys = Object.getOwnPropertyNames(styles);
        // getOwnPropertyNames is about 2.5 times faster than
        // for..in with the hasOwnProperty check and in this
        // case, where most properties are inherited, can be
        // more then an order of magnitude faster.
        for (var i = 0, n = keys.length; i < n; i++) {
            var key = keys[i];
            this[key] += styles[key];
        }
    };
    Shape.prototype.restoreAllStyles = function () {
        var styles = this.constructor.defaultStyles;
        for (var property in styles) {
            this[property] = styles[property];
        }
    };
    /**
     * Restores the base class default styles that have been overridden by this subclass.
     */
    Shape.prototype.restoreOverriddenStyles = function () {
        var styles = this.constructor.defaultStyles;
        var protoStyles = Object.getPrototypeOf(styles);
        for (var property in styles) {
            if (styles.hasOwnProperty(property) && protoStyles.hasOwnProperty(property)) {
                this[property] = styles[property];
            }
        }
    };
    Object.defineProperty(Shape.prototype, "fillStyle", {
        get: function () {
            return this._fillStyle;
        },
        set: function (value) {
            if (this._fillStyle !== value) {
                this._fillStyle = value;
                this.isDirty = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "strokeStyle", {
        get: function () {
            return this._strokeStyle;
        },
        set: function (value) {
            if (this._strokeStyle !== value) {
                this._strokeStyle = value;
                this.isDirty = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "lineWidth", {
        get: function () {
            return this._lineWidth;
        },
        set: function (value) {
            if (this._lineWidth !== value) {
                this._lineWidth = value;
                this.isDirty = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "lineDash", {
        get: function () {
            return this._lineDash;
        },
        set: function (value) {
            var oldValue = this._lineDash;
            if (oldValue !== value) {
                if (oldValue && value && oldValue.length === value.length) {
                    var identical = true;
                    var n = value.length;
                    for (var i = 0; i < n; i++) {
                        if (oldValue[i] !== value[i]) {
                            identical = false;
                            break;
                        }
                    }
                    if (identical) {
                        return;
                    }
                }
                this._lineDash = value;
                this.isDirty = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "lineDashOffset", {
        get: function () {
            return this._lineDashOffset;
        },
        set: function (value) {
            if (this._lineDashOffset !== value) {
                this._lineDashOffset = value;
                this.isDirty = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "lineCap", {
        get: function () {
            return this._lineCap;
        },
        set: function (value) {
            if (this._lineCap !== value) {
                this._lineCap = value;
                this.isDirty = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "lineJoin", {
        get: function () {
            return this._lineJoin;
        },
        set: function (value) {
            if (this._lineJoin !== value) {
                this._lineJoin = value;
                this.isDirty = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "opacity", {
        get: function () {
            return this._opacity;
        },
        set: function (value) {
            value = Math.min(1, Math.max(0, value));
            if (this._opacity !== value) {
                this._opacity = value;
                this.isDirty = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "shadow", {
        get: function () {
            return this._shadow;
        },
        set: function (value) {
            if (this._shadow !== value) {
                this._shadow = value;
                this.isDirty = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Shape.prototype.applyContextAttributes = function (ctx) {
        if (this.fillStyle) {
            ctx.fillStyle = this.fillStyle;
        }
        if (this.strokeStyle) {
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            if (this.lineDash) {
                ctx.setLineDash(this.lineDash);
            }
            if (this.lineDashOffset) {
                ctx.lineDashOffset = this.lineDashOffset;
            }
            if (this.lineCap) {
                ctx.lineCap = this.lineCap;
            }
            if (this.lineJoin) {
                ctx.lineJoin = this.lineJoin;
            }
        }
        if (this.opacity < 1) {
            ctx.globalAlpha = this.opacity;
        }
        var shadow = this.shadow;
        if (shadow) {
            ctx.shadowColor = shadow.color;
            ctx.shadowOffsetX = shadow.offset.x;
            ctx.shadowOffsetY = shadow.offset.y;
            ctx.shadowBlur = shadow.blur;
        }
    };
    Shape.prototype.isPointInNode = function (x, y) {
        return this.isPointInPath(x, y);
    };
    /**
     * Defaults for style properties. Note that properties that affect the position
     * and shape of the node are not considered style properties, for example:
     * `x`, `y`, `width`, `height`, `radius`, `rotation`, etc.
     * Can be used to reset to the original styling after some custom styling
     * has been applied (using the `restoreOwnStyles` and `restoreAllStyles` methods).
     * These static defaults are meant to be inherited by subclasses.
     */
    Shape.defaultStyles = object_1.chainObjects({}, {
        fillStyle: 'black',
        strokeStyle: null,
        lineWidth: 1,
        lineDash: null,
        lineDashOffset: 0,
        lineCap: null,
        lineJoin: null,
        opacity: 1,
        shadow: null
    });
    return Shape;
}(node_1.Node));
exports.Shape = Shape;
