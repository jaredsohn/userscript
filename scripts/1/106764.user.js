// ==UserScript==
// @name        Muted CSS for Google Search
// @author      Byron Dumbrill
// @version    	0.01
// @namespace   http://dumbrill.net
// @include     htt*://www.google.com/*
// @description A script that applies a muted css to Google Search
//
// ==/UserScript==
//END USERSCRIPT AREA

var link = document.createElement('LINK');
link.rel = 'stylesheet';
link.href = 'http://www.dumbrill.net/code/gsearch_muted.css';
link.type = 'text/css';
document.body.insertBefore(link, null);