// ==UserScript==
// @name			Google Reader Unread Count in Advance
// @description	Unread Items Number Comes First!
// @author			Shawnster@userscripts.org
// @version			1.1
// @include			https://www.google.com/reader/view/*
// ==/UserScript==

window.setInterval(function() {
		var title = document.title;
		if(matches = title.match(/Google Reader \((\d+\+?)\)/)) {
			ntitle = "("+matches[1]+") GReader"
		}
		document.title = ntitle;
		return(ntitle);
	}
, 500);