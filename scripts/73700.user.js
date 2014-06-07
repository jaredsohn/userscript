// ==UserScript==
// @name           CheckBoxMate for Greasemonkey
// @namespace      http://macdougalmedia.com/2010/04/07/checkboxmate-for-greasemonkey/
// @description    "Check multiple checkboxes with ease by drawing a box around them to automatically select them all." Converted from nrlz's amazing CheckBoxMate Firefox Add-on (https://addons.mozilla.org/en-US/firefox/addon/9740). Works with Firefox 3.6.3.
// @author         scottmweaver
// @date           2010-04-07
// @include        *
// ==/UserScript==

const CheckBoxMate = {
    active: false,
    scrollX: 0,
    scrollY: 0,
    pageX: 0,
    pageY: 0,

    addEvt: function(e, f, c) {
        document.addEventListener(e, f, c ? true : false, true);
    },

    delEvt: function(e, f, c) {
        document.removeEventListener(e, f, c ? true : false, true);
    },

    init: function() {
        this.addEvt("mousedown", this.onDown);
    },

    uninit: function() {
        var d = CheckBoxMate;
        d.doc = 0;
        d.boxes = [];
        d.selected = [];
        d.delEvt("mousedown", d.onDown);
        d.delEvt("mousemove", d.onMove, 1);
        d.delEvt("mouseup", d.onUp, 1);
        removeEventListener("unload", arguments.callee, false);
    },

    onDown: function(e) {
        var t = e.target, d = CheckBoxMate;

        if(d.active) {
            d.clear();

        } else if(t && // t instanceof HtmlInputText &&
           (t.type == "checkbox" || t.type == "CHECKBOX")) {

            d.doc = t.ownerDocument;

            if(d.doc.getBoxObjectFor) {
                d.startX = e.screenX;
                d.startY = e.screenY;
                d.scrollX = e.pageX - e.screenX;
                d.scrollY = e.pageY - e.screenY;
            } else {
                d.startX = e.pageX;
                d.startY = e.pageY;
            }

            d.boxes = [];
            d.selected = [];
            d.addEvt("mousemove", d.onMove, 1);
            d.addEvt("mouseup", d.onUp, 1);
            d.active = 0;
        }
    },

    onMove: function(e) {
        var d = CheckBoxMate;

        if(!d.active && !e.nodeType) {
            var delta = (e.pageX - d.startX)*(e.pageY - d.startY);
            if(delta < -2 || delta > 2) {
                d.active = 1;
            } else return;
        }

        if(e.nodeType) {
            var p = --d.pending;
            if(p) {
                setTimeout(d.onMove, 200, e);
            } else {
                if(d.active) d.calc();
            }
            if(d.active) d.update();

        } else {
            if(!d.pending) {
                d.calc();
                setTimeout(d.onMove, 200, e.target);
            }
            d.pending = 2;
            if(d.doc.getBoxObjectFor) {
                d.endX = e.screenX;
                d.endY = e.screenY;
            } else {
                d.endX = e.pageX;
                d.endY = e.pageY;
            }

            var rect = d.doc.getElementById("checkboxmate_24601");
            
            if(!rect) {
              rect = d.doc.documentElement.appendChild(d.doc.createElement("div"));
              rect.id = "checkboxmate_24601";
              rect.style.cssText = "outline:1px dotted #fff; border:1px dotted #000; position:absolute; padding:0px; margin:0px";
            }
            rect = rect.style;
            rect.left = d.scrollX + ((d.startX < d.endX) ? d.startX : d.endX) - 7 + "px";
            rect.top  = d.scrollY + ((d.startY < d.endY) ? d.startY : d.endY) - 7 + "px";
            rect.width  = Math.abs(d.startX - d.endX) + 14 + "px";
            rect.height = Math.abs(d.startY - d.endY) + 14 + "px";
        }
    },

    onUp: function(e) {
        var d = CheckBoxMate;
        if(d.active) {
            d.calc();
            d.update();
        }
        d.clear();
    },

    clear: function() {
        var d = CheckBoxMate;
        d.active = 0;
        d.delEvt("mousemove", d.onMove, 1);
        d.delEvt("mouseup", d.onUp, 1);
        var rect = d.doc.getElementById("checkboxmate_24601");
        if(rect) rect.parentNode.removeChild(rect);
        d.doc = 0;
        d.boxes = [];
        d.selected = [];
    },

    boxes: [],
    selected: [],

    update: function() {
        var arr = this.boxes, y, y2, x, x2, sel = [], n;

        y = this.endY > this.startY;
        y2 = y ? this.endY : this.startY;
        y  = y ? this.startY : this.endY;
        
        // Added scroll offset
        y = y - window.pageYOffset;
        y2 = y2 - window.pageYOffset;
        
        x = this.endX > this.startX;
        x2 = x ? this.endX : this.startX;
        x  = x ? this.startX : this.endX;
        
        // Added side scroll offset
        x = x - window.pageXOffset;
        x2 = x2 - window.pageXOffset;

        var i = this.binary(arr, {key: y});

        while(i > 0 && arr[i - 1].y2 > y) --i;

        while((n = arr[i++]) && y < n.y2 && y2 > n.y) {
            if(x < n.x2 && x2 > n.x) {
                sel.push(n.n);
                n.n.cbm = 1;
            }
        }

        arr = this.selected;
        this.selected = sel;

        for(i = arr.length - 1; i >= 0; i--) {
            if(!arr[i].cbm) {
                var e = this.doc.createEvent("MouseEvents");
                e.initMouseEvent("click", 1, 1, this.doc.defaultView, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
                arr[i].dispatchEvent(e);
            } else {
                arr[i].cbm = 0;
            }
        }

        for(i = sel.length - 1; i >= 0; i--) {
            if(sel[i].cbm) {
                sel[i].cbm = 0;
                var e = this.doc.createEvent("MouseEvents");
                e.initMouseEvent("click", 1, 1, this.doc.defaultView, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
                sel[i].dispatchEvent(e);
            }
        }
    },

    calc: function() {
        var obj, d = this.doc,
            elms = d.getElementsByTagName("input"),
            arr = this.boxes = [],
            gbof = d.getBoxObjectFor && 1;

        for(var i=0, n; (n = elms[i]); i++) {
            if(n.type == "checkbox" || n.type == "CHECKBOX") {
                if(gbof) {
                    obj = d.getBoxObjectFor(n);
                    obj = {y:obj.screenY, y2:obj.height, x:obj.screenX, x2:obj.width, n:n, key:obj.screenY};
                    obj.y2 += obj.y;
                    obj.x2 += obj.x;
                } else {
                    obj = n.getBoundingClientRect();
                    obj = {y:obj.top, y2:obj.bottom, x:obj.left, x2:obj.right, n:n, key:obj.top};
                }
                arr.splice(this.binary(arr, obj), 0, obj);
            }
        }
    },

    binary: function(arr, item, r1, r2) {
        var i = item.key;
        if(arr.length == 0) return 0;
        if(!r2) {
            r1 = 0;
            r2 = arr.length;
            if(i < arr[0].key) return 0;
            if(i >= arr[r2 - 1].key) return r2;
        }
        switch(r2 - r1) {
            case 3: return (i < arr[r1].key) ? r1 : (i > arr[r2 - 1].key) ? r2 : (i < arr[r1 + 1].key) ? r1 + 1 : r2 - 1;
            case 2: return (i < arr[r1].key) ? r1 : (i > arr[r2 - 1].key) ? r2 : r2 - 1;
            case 1: return (i < arr[r1].key) ? r1 : r2;
            default:
                var m = Math.round((r2 + r1)/2);
                return this.binary(arr, item, (i < arr[m].key) ? r1 : m, (i < arr[m].key) ? m : r2);
        }
    }
};

addEventListener("load", function() {
    CheckBoxMate.init();
    addEventListener("unload", CheckBoxMate.uninit, false);
    removeEventListener("load", arguments.callee, false);
}, false);
