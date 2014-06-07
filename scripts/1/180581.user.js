// ==UserScript==
// @name       Facebook Messenger App
// @namespace  http://gottz.de/
// @version    0.4.2
// @description  sends messages on pressing the return key within the mobile facebook messenger
// @match      https://m.facebook.com/messages/read/*
// @copyright  2013+, GottZ
// ==/UserScript==
window.onkeydown = function (e) {
    if (e.target.id == "composerInput" && e.which == 13) {
        // i tried hooking shift too but when i do it, facebook will trim line breaks.
        e.preventDefault();
        document.getElementsByName("send")[0].click();
    }
};
