// ==UserScript==
// @name        ReEnable Copy/Paste
// @namespace   http://userscripts.org/users/chintan
// @include     https://infinity.icicibank.co.in/*
// @version     1
// @grant       none
// ==/UserScript==

var sections = document.getElementsByTagName('input');
var mySection = null;
for(var i = 0; i < sections.length; ++i) {
    if(sections[i].type == "text" || sections[i].type == "password") {
        if(sections[i].getAttribute("oncopy")=="return false") sections[i].setAttribute("oncopy", null);
        if(sections[i].getAttribute("onpaste")=="return false") sections[i].setAttribute("onpaste", null);
    }
}