// ==UserScript==
// @name           Linkify QDB nicks
// @namespace      http://userscripts.org/users/103478
// @description    Makes links from people's nicks on bash.org/qdb.us/xkcdb.com.
// @include        http://qdb.us/*
// @include        http://*.qdb.us/*
// @include        http://bash.org/*
// @include        http://*.bash.org/*
// @include        http://xkcdb.com/*
// @include        http://*.xkcdb.com/*
// ==/UserScript==

// (C) 2009 Mike Smith; released under the WTFPL.

(function() {
	var searchurl, quotes;
	if (window.location.href.match(/qdb.us/i)) {
		quotes = document.getElementsByClassName('qt');
		searchurl = '/search?q=$2';
	}
	else if (window.location.href.match(/bash.org/i)) {
		quotes = document.getElementsByClassName('qt');
		searchurl = '/?search=$2&sort=0&show=25';
	}
	else if (window.location.href.match(/xkcdb.com/i)) {
		quotes = document.getElementsByClassName('quote');
		searchurl = '/?search=$2';
	}
	
	
	for (var e in quotes) {
		quotes[e].innerHTML = quotes[e].innerHTML.replace(/&lt;([ +@%~]|&amp;)?([a-zA-Z0-9_|{}\[\]\\-]+)&gt;/g,
			'&lt;$1<a href="' + searchurl + '">$2</a>&gt;');
	}
})();