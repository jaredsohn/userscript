// ==UserScript==
// @name           Bungie.net MyTestLogo
// @namespace      Bungie.net MyTestLogo
// @description    do not download. this is just a test.
// @author         XBLmonster
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

addGlobalStyle('.top_logo_bungie { background: transparent url(http://i565.photobucket.com/albums/ss92/XBLmonster/Bungie_Logo_Noon.png) !important; no-repeat !important; }');

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

addGlobalStyle('.top_logo_bungie { background: transparent url(http://i565.photobucket.com/albums/ss92/XBLmonster/Bungie_Logo_Noon.png) !important; no-repeat !important; }');

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

addGlobalStyle('.top_logo_bungie { background: transparent url(http://i565.photobucket.com/albums/ss92/XBLmonster/Bungie_Logo_Noon.png) !important; no-repeat !important; }');

}