// ==UserScript==
// @name           4chan CSS fixer
// @namespace      Zanthius
// @description    fixes 
// @include        http://boards.4chan.org/*
// ==/UserScript==


function addStyle(style) {
var head = document.getElementsByTagName("HEAD")[0];
var ele = head.appendChild(window.document.createElement( 'style' ));
ele.innerHTML = style;
return ele;
}

// If you have your own css sheet that you want to use, change this URI.

addStyle('@import "http://static.4chan.org/css/global.css";');
addStyle('@import "http://static.4chan.org/css/yotsuba.9.css";');