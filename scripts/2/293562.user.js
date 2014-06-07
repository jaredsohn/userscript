// ==UserScript==
// @name        Uploaded.net free download autoclick on page load
// @namespace   dx
// @include     http://uploaded.net/file/*
// @version     1.2
// @grant       none
// ==/UserScript==

var h1 = window.document.querySelectorAll('#captcha button.free h1')[0];
if (h1.innerHTML == "Free Download") {
    var el = h1.parentNode;
    var event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, false);
    el.dispatchEvent(event);
}