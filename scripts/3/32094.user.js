// ==UserScript==
// @name           IMDB Show Spoiler Alert
// @namespace      http://jobson.us/
// @include        http://imdb.com/*
// @include        http://*.imdb.com/*
// ==/UserScript==
if (!document.getElementById('tn15plotkeywords')) return;
document.getElementById('tn15plotkeywords').parentNode.insertBefore(document.getElementById('tn15plotkeywords').getElementsByTagName('span')[0].cloneNode(true),document.getElementById('tn15plotkeywords'));
document.getElementById('tn15plotkeywords').parentNode.removeChild(document.getElementById('tn15plotkeywords'));
