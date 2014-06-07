// Navbar Reincarnate
// version 1.0
// script created by CAVX
//
// ==UserScript==
// @name          Navbar Reincarnate
// @description   Sometimes the best ideas are from the past.
// @include       http://*bungie.net/*
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
function addGlobalScript(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('script');
    style.innerHTML = css;
    head.appendChild(style);
}
var docURL = location.href;

addGlobalStyle('.sContentAlt {position:fixed; z-index:500; top:0px;}'+
'.bgRepeat {padding-top:70px;}'+
'#ctl00_dashboardNav { margin-left:32px; margin-top:-70px;}'+
'.sContent {padding-top:70px;}');