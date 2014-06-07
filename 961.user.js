// ==UserScript==
// @name           MetaFilter TurboPost
// @namespace      http://www.jerrykindall.com/
// @description    Changes the Preview button to a Post button so you can post without previewing.
// @include        http://metafilter.com/mefi/*
// @include        http://*.metafilter.com/mefi/*
// ==/UserScript==

(function () {
	document.forms["mefi"].elements["post"].value="Post";
})();
