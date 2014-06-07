// ==UserScript==
// @name          deredactie.be light
// @namespace     http://dweezil.be/greasemonkey
// @description   maakt deredactie.be meer leesbaar door enkele (flash)menu's en de achtergrond te verwijderen.
// @include       http://www.deredactie.be/*
// @exclude
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
addGlobalStyle('body { background: #fff ! important; }');


var extramenu = document.getElementById('ExtraMenu');
if (extramenu) {
    extramenu.parentNode.removeChild(extramenu);
}

var header = document.getElementById('Header');
if (header) {
    header.parentNode.removeChild(header);
}

var videobrowser = document.getElementById('VideoBrowser');
if (videobrowser) {
    videobrowser.parentNode.removeChild(videobrowser);
}

