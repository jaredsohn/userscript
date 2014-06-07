// ==UserScript==
// @name          New Youtube theme activator
// @namespace     http://forum.shiftdelete.net
// @description	  For users who see the old youtube theme when restart their browsers.
// @version        0.1
// @author        __kadıköyRAP__
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
if (document.cookie.search("VISITOR_INFO1_LIVE=ST1Ti53r4fU")==-1)
{
	document.cookie="VISITOR_INFO1_LIVE=ST1Ti53r4fU";
	window.location.reload();
}
})();
