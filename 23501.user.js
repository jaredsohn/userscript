// ==UserScript==
// @name           Test Lemon Pen
// @namespace      http://omgis.tistory.net
// @include        http://www.daum.net/*

url = "http://script.lemonpen.com/site/lemonpen.js?sid=230b95765a5f6d25";

var myscript = document.createElement('script');
myscript.setAttribute('src', url);
myscript.setAttribute('charset', 'UTF-8');
myscript.setAttribute('type', 'text/javascript');
document.body.appendChild(myscript); 

// ex: ts=8 sts=4 sw=4 et