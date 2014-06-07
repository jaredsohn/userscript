// ==UserScript==
// @name           dA Shout Style
// @namespace      http://solitude12.deviantart.com/
// @description    Gives the dA Shout a new look. I like it! XD <_<
// @include        http://shout.deviantart.com/*
// ==/UserScript==

var newstyle='@import "ht'+'tp://download.botdom.com/5s9k2/dAShoutBox.css";';
var s = document.createElement('style')
s.type ="text/css";
s.innerHTML = newstyle;
document.getElementsByTagName('head')[0].appendChild(s);