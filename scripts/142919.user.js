// ==UserScript==
// @id             YouTube - New Video Page@mustangfan1995
// @name           YouTube - New Video Page
// @namespace      mustangfan1995
// @author         mustangfan1995
// @description    Join the beta test for the new youtube video page
// @include        http://www.youtube.com*
// @include        https://www.youtube.com*
// @include        http://www.youtube.com/watch?v*
// @include        https://www.youtube.com/watch?v*
// @run-at         document-end
// ==/UserScript==

(function() {
	if(/youtube.com/i.test(location.host)) {
		var cookie = "VISITOR_INFO1_LIVE=jZNC3DCddAk";
		if(document.cookie.search(cookie) == -1) {
			cookie += "; expires=" + (new Date(2020, 1, 1)).toGMTString();
			cookie += "; domain=.youtube.com";
			document.cookie = cookie;
			location.reload();
		}
	}
})()