// ==UserScript==
// @name         tumblr.com21
// @namespace     test@meat
// @include       *
// ==/UserScript==
var is = document.querySelectorAll('img[id^=aimg][src^="/^http:\/\/\d{1,2}\.media\.tumblr\.com/"]');
Array.prototype.forEach.call(is, function (i) {
    i.src = i.src.replace('http:\/\/\d{1,2}\.', 'http:\/\/21\.');
});
