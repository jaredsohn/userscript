// ==UserScript==
// @name           CNET Japan Opener
// @namespace      http://www.hidetan.com
// @description    CNET Japan Opener
// @version        0.0.1
// @include        http://japan.cnet.com/*
// ==/UserScript==
// Referred        http://userscripts.org/scripts/review/53618
if(document.URL.search("-0") != -1) {
	window.location = document.URL.replace("-0", "");
}
