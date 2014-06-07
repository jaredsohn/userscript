// ==UserScript==
// @name       Tumblr Notifications Highlightable (December 2012)
// @namespace  http://metalmetalland.com, http://ebol4.tumblr.com
// @version    1.0
// @include www.tumblr.com/* 
// @include http://tumblr.com/* 
// @include http://www.tumblr.com/* 
// @description  Allows you to highlight (and copy) the text in Tumblr's notifications after the December 2012 update
// @copyright  ebol4 created this
// ==/UserScript==

function etnn(){
    var docHead = document.getElementsByTagName('head')[0];
    var theStyle = document.createElement('style');
    theStyle.type = 'text/css';
    theStyle.id = 'tumblr_notes_highlightable';
    var styleInner = 'ol.notes li.note { -webkit-user-select:all; -moz-user-select:-moz-all; user-select:all; } .notification { -webkit-user-select:all; -moz-user-select:-moz-all; user-select:all; }';
    theStyle.innerHTML = styleInner;
    docHead.appendChild(theStyle);
}

window.addEventListener("DOMContentLoaded", etnn, true);