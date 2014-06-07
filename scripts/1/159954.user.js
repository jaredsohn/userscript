// ==UserScript==
// @name        Lock Gmail Tab
// @namespace   http://idaemons.org/
// @description Lock Gmail Tab
// @include     https://mail.google.com/mail/u/*
// @version	1.0
// @grant	none
// ==/UserScript==

window.onbeforeunload = function (e) {
    var title = document.getElementsByTagName('title')[0];
    // exclude transition pages and dedicated composer windows
    if (title && title.firstChild.nodeValue.match(/ - .*@.* - /) &&
        document.querySelector('div[tabindex="0"][role="button"]'))
        return 'Are you sure you want to close Gmail?';
    return null;
};
