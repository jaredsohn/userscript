// ==UserScript==
// @name         LJLive blocker
// @description	Block LJLive in Opera
// @author Konstantin Pelepelin
// @license public domain
// @version 20100929
// @include      http://*.livejournal.com/*
// ==/UserScript==

window.opera.addEventListener('BeforeExternalScript', function (e) {
    // dirty: extra comma left in url
    e.element.src = e.element.src.replace(/ljlive.js/, '');
}, false);

window.opera.addEventListener('BeforeScript', function (e) {
    // dirty: assume exactly one line per statement
    e.element.text = e.element.text.replace(/^.*LJLive.*$/gm, '');
}, false);

