// ==UserScript==
// @name        Muted CSS for Google +
// @author      Byron Dumbrill
// @version    	0.01
// @namespace   http://dumbrill.net
// @include     htt*://plus.google.com/*
// @description A script that applies a muted css to Google +
//
// ==/UserScript==
//END USERSCRIPT AREA

var link = document.createElement('LINK');
link.rel = 'stylesheet';
link.href = 'http://www.dumbrill.net/code/gplus_muted.css';
link.type = 'text/css';
document.body.insertBefore(link, null);