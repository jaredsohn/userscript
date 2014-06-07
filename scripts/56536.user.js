// ==UserScript==
// @name           wileyRemoveFrames.js
// @namespace      http://www3.interscience.wiley.com*/cgi-bin/fulltext/*/HTMLSTART*
// @include      http://www3.interscience.wiley.com*/cgi-bin/fulltext/*/HTMLSTART*
// ==/UserScript==
var mainframe = document.getElementById('main');
window.location = mainframe.src;
