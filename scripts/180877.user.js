// ==UserScript==
// @name          Link to Simple English Wikipedia
// @include       http://en.wikipedia.org/wiki/*

// ==/UserScript==

var path = window.location.pathname;

var div = document.getElementById('contentSub');
var link = document.createElement('a');
link.innerHTML = "<a>Simple English</a>";
link.href = 'http://simple.wikipedia.org' + path;
div.appendChild(link);