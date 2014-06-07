// ==UserScript==
// @name           ask.com wikipedia redirect to wikipedia
// @namespace      http://www.michaelpollmeier.com
// @description    redirect from ask.com/wiki to wikipedia
// @include        http://www.ask.com/wiki/*
// ==/UserScript==

var left = 'http://www.ask.com/wiki/';
var articleName = (window.location.href.substr(left.length));
window.location = 'http://en.wikipedia.org/wiki/' + articleName;
