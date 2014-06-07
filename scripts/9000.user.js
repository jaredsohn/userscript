// Google Reader always Washington Post Print Links
// version 0.2
// 2007-05-04
// Copyright (c) 2007, JAWB - spamsucks72@cox.net
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==
// @name          Google Reader always Washington Post Print Links
// @description   Replaces Washington Post links with the print version of Washington Post articles.
// @creator       JAWB - spamsucks72@cox.net
// @include       http*://*.google.com/reader/*
// @version       0.2
// ==/UserScript==

document.addEventListener('click', function(event) {
if (
	(
	(event.target.href.indexOf("/wp-dyn/content/article/") != -1)
	&& (event.target.href.indexOf("_pf.html") == -1)
	)
	|| (
		(event.target.href.indexOf("/wp-dyn/content/blog/") != -1)
		&& (event.target.href.indexOf("_pf.html") == -1)
	)
			|| (
				(event.target.href.indexOf("/wp-dyn/content/discussion/") != -1)
				&& (event.target.href.indexOf("_pf.html") == -1)
			)
	) {
		event.target.href = event.target.href.replace (/.html/g, '_pf.html');
	}
}, true);

// version 0.2 update to fix re-click problem (adding _pf.html to links that have been already updated).
