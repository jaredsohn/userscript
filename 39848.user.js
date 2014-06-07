// ==UserScript==
// @name           Fix Reddit Search
// @namespace      http://ttam.org/
// @description    Changes the Reddit search box to search Google
// @author         Matt Bannon
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

(function() {
	if(x = document.getElementById("search")) x.action = "javascript:(function(){s = document.getElementsByName('q')[0].value;document.location.href='http://www.google.com/search?q='+s+' site:reddit.com';})()";
})();

