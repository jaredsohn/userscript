// ==UserScript==
// @name           Bungie.net Time-Changing Logo
// @namespace      Bungie.net Time-Changing Logo
// @description    Changes the Logo depending on the time of day.
// @author         Robby118
// @contributer    PKF 647 - Logo Modifier
// @include        http://*bungie.net/*
// @exclude        http://*bungie.net/Projects/ODST/*
// ==/UserScript==

var d = new Date();
var time = d.getHours();


if (time < 10)

{

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.top_logo_bungie { background: transparent url(http://sites.google.com/site/filehost647/files/Bungie_Logo_Dawn.gif) !important; no-repeat !important; }');

}

else {

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.top_logo_bungie { background: transparent url(http://sites.google.com/site/filehost647/files/Bungie_Logo_Noon.gif) !important; no-repeat !important; }');

}

if (time > 20)

{

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.top_logo_bungie { background: transparent url(http://sites.google.com/site/filehost647/files/Bungie_Logo_Night.gif) !important; no-repeat !important; }');

}