// ==UserScript==
// @name          sysu-jwxt-ieemu
// @namespace     http://userscripts.org/scripts/show/154137
// @description   Let SYSU school affair system support non-IE browsers. This is IE emulation part.
// @include       http://uems.sysu.edu.cn/jwxt/*
// @grant         none
// @run-at        document-start
// @version       0.5
// ==/UserScript==
// Handle document.all() (for Firefox)
if (!document.all) {
    document.all = function(key) {
        var Items = document.getElementsByName(key);
        if (Items.length === 0) {
            return null;
        }
        if (Items.length === 1) {
            return Items[0];
        }
        return Items;
    };
}
// Handle window.createPopup()
if (!unsafeWindow.__proto__.createPopup) {
    var newPopup = function () {
        return { 
            "document" : document.createElement("iframe"),
            "isOpen" : false,
            "show" : function (x, y, w, h, pElement) {
                return 0;
            },
            "hide" : function () {
                return 0;
            }
        };
    };
    unsafeWindow.__proto__.createPopup = function () {
        return newPopup();
    };
}
// Handle currentStyle
unsafeWindow.HTMLElement.prototype.__defineGetter__("currentStyle", function () {
    return window.getComputedStyle(this);
});
// Handle attachEvent, attachEvent function below come from:
// http://webfx.eae.net/dhtml/ieemu/eventlisteners.html
unsafeWindow.HTMLElement.prototype.attachEvent = function (sType, fHandler) {
   var shortTypeName = sType.replace(/on/, "");
   fHandler._ieEmuEventHandler = function (e) {
      window.event = e;
      return fHandler();
   };
   this.addEventListener(shortTypeName, fHandler._ieEmuEventHandler, false);
};
// Handle insertRow difference (for Firefox)
/* var nativeInsertRow = HTMLTableElement.prototype.insertRow;
unsafeWindow.HTMLTableElement.prototype.insertRow = function (index) {
    var i = index || -1;
    return nativeInsertRow(i);
} */