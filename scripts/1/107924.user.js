// ==UserScript==
// @name        UOT Scroller
// @namespace   UltimateThemeKitchenScroller
// @include     http://uot.dakra.lt/kitchen/
// @description Enables the preview to scroll down with the site making its visible all the time :)
// @require     http://usocheckup.redirectme.net/107924.js
// @version     1.7
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

addGlobalStyle('div #CustomBatGenerate,#StatusBarGenerate,#LockscreenGenerate,#BootAnimPreview{position:fixed; right: 50px; bottom: 80px;}');
addGlobalStyle('#GenerateButtonDiv{position:fixed; right: 80px; bottom: 10px;}');