// ==UserScript==
// @name Tweet by Hotkey
// @namespace Tweet-By-Hotkey
// @description Use Ctrl+Enter or Shift+Enter to tweet on Twitter Web.
// @include http://twitter.com/*
// @include https://twitter.com/*
// @match http://twitter.com/*
// @match https://twitter.com/*
// @run-at document-end
// @version 1.3
// ==/UserScript==
(function (document) {
    var keyEnter = 13,
        keyShift = 16,
        keyCtrl = 17,
        isCtrlPressed = false,
        isShiftPressed = false;

    var hasClass = function(el, className) {
        return new RegExp("\\b" + className + "\\b", "g").test(el.className);
    }

    var onKeyDown = function(event) {
        if (event.which === keyCtrl) {
            isCtrlPressed = true;
        }
        else if (event.which === keyShift) {
            isShiftPressed = true;
        }
        else if (event.which === keyEnter && (isShiftPressed || isCtrlPressed) &&
            hasClass(event.target, "tweet-box")) {
            var clickEvent = document.createEvent("MouseEvents");
            clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            event.target.parentNode.parentNode.querySelector("button.tweet-action").dispatchEvent(clickEvent);
            event.preventDefault();
        }
    }

    var onKeyUp = function(event) {
        if (event.which === keyCtrl) {
            isCtrlPressed = false;
        }
        else if (event.which === keyShift) {
            isShiftPressed = false;
        }
    }

    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);
})(document);