// ==UserScript==
// @name           habr
// @namespace      habr
// @description    Expand habr content
// @include        http://habrahabr.ru/*
// ==/UserScript==

var styleSheets = document.styleSheets;
var s = styleSheets[styleSheets.length - 1];
s.insertRule(".content_left {width: 99%}", s.cssRules.length); 
