// Hovering statusbar user script
// version 0.1 BETA!
// 2008-09-06
// Copyright (c) 2008, Peter Stuifzand
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hovering statusbar", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hovering statusbar
// @namespace     http://peterstuifzand.nl/statusbar/
// @description   Show a simple statusbar when hovering over a link
// @include       *
// ==/UserScript==

var sb = document.getElementById('statusbar-sb');
if (!sb) {
    sb = document.createElement('div');
    sb.id='statusbar-sb';
    sb.style.display='none';
    sb.style.position = 'fixed';
    sb.style.bottom='0px';
    sb.style.left='0px';
    sb.style.height='1.4em';
    sb.style.width='600px';
    sb.style.background='#aaf';
    sb.style.padding='3px';
    var text = document.createElement('span');
    text.id = 'statusbar-text';
    sb.appendChild(text);
    document.body.appendChild(sb);
}

var text = document.getElementById('statusbar-text');
var allLinks = document.getElementsByTagName('a');

for (var i = 0; i < allLinks.length; i++) {
    var a = allLinks[i];

    a.addEventListener('mouseover', function(event) {
        sb.style.display='block';
        text.innerHTML = event.target.getAttribute('href');
        event.stopPropagation();
        event.preventDefault();
    }, true);

    a.addEventListener('mouseout', function(event) {
        (function() {
            sb.style.display='none';
            text.innerHTML = '';
        })();
        event.stopPropagation();
        event.preventDefault();
    }, true);
}
