// ==UserScript==
// @name		NYTimes Access
// @namespace		http://userscripts.org/users/318110
// @description		Removes gwh= argument and anything after it
// @include		http://*.nytimes.com/*
// ==/UserScript==

if(window.location.href.match(/gwh\=/)){
window.location.href=window.location.href.replace(/[\&]?gwh\=.*/,"");}