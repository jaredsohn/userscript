// ==UserScript==
// @name       clipboardData Emulator
// @namespace  com.ayanamist.clipboardData
// @version    0.4
// @description  emulate clipboardData in non-IE browser
// @include http*
// @run-at         document-start
// @grant unsafeWindow
// ==/UserScript==

(function () {
    'use strict';
    if (unsafeWindow.window.clipboardData) {
        return;
    }
    var textareaId = 'clipboardEmu';
    unsafeWindow.window.clipboardData = {
        clearData: function () {
            return true;
        },
        getData: function () {
            return '';
        },
        setData: function (format, data) {
            // Prevent multiple textarea instance.
            var clipboard = document.getElementById(textareaId);
            if (!clipboard) {
                clipboard = document.createElement("textarea");
                clipboard.style.float = 'left';
                clipboard.style.position = 'fixed';
                clipboard.style.left = 0;
                clipboard.style.top = 0;
                clipboard.style.width = '400px';
                clipboard.style.height = '300px';
                clipboard.style.zIndex = 9999;
                clipboard.id = textareaId;
                clipboard.readOnly = true;
                document.getElementsByTagName('body')[0].appendChild(clipboard);
            }
            clipboard.textContent = data;
            clipboard.focus();
            clipboard.select();
            var closeClipboard = function () {
                clipboard.parentNode.removeChild(clipboard);
                clipboard = null;
            };
            clipboard.onkeydown = function (evt) {
                if(evt.which == 27){ // Esc
                    closeClipboard();
    			}
            };
            clipboard.oncut = clipboard.oncopy = function () {
                setTimeout(closeClipboard, 0);
                return true;
            };
            return true;
        },
        files: [],
    };
})();