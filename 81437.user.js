// ==UserScript==
// @name           Reddit 2.0
// @namespace      www3.telus.net/sb/
// @include        htt*://*.reddit.*
// @exclude		   htt*://*.reddit.com/r/redditv2/*
// ==/UserScript==

var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://www.reddit.com/r/redditv2/stylesheet.css?v=68f522a589a069c97b36c3b41c25c4be';
document.getElementsByTagName('head')[0].appendChild(link);