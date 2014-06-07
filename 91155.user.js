// ==UserScript==
// @name          Facebook tweaks
// @namespace     http://sharpsan.com
// @description   A collection of Facebook tweaks created for personal use.
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// @include       http://www.*.facebook.com/*
// @include       http://*.facebook.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#pageHead, #blueBar { position: fixed; top: 0; !important; } #blueBar { z-index: 100; } #pageHead { z-index: 101; width: 90%; margin: 0 5% 0 5%; !important }  #globalContainer #content { padding-top: 41px; }'); //Pull primary navigation bar to front