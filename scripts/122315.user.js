// ==UserScript==
// @id             Old Youtube White Design 2012@mustangfan1995
// @name           Old Youtube White Design 2012
// @version        1.0
// @namespace      mustangfan1995
// @author         mustangfan1995
// @description    Switch back to the old white youtube as it should be!
// @include        http://www.youtube.com/
// @include        https://www.youtube.com/
// @run-at         document-end
// ==/UserScript==

(function() {
	if(/youtube.com/i.test(location.host)) {
		var cookie = "VISITOR_INFO1_LIVE=tYJElFX0sZI";
		if(document.cookie.search(cookie) == -1) {
			cookie += "; expires=" + (new Date(2020, 1, 1)).toGMTString();
			cookie += "; domain=.youtube.com";
			document.cookie = cookie;
			location.reload();
		}
	}
})()
