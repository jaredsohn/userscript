// ==UserScript==
// @name           Prefetch Google Ads
// @namespace      http://hublog.hubmed.org
// @description    Prefetches Google Ad Links
// @include        http://*
// ==/UserScript==

(function() {  window.addEventListener("load", function(e) {    var l = document.getElementsByTagName('a');
    for (i = 0; i < l.length; i++){
	var link = l[i].href;	
	if (link.match(/iclk\?/i)){
	    GM_xmlhttpRequest({
		method:"GET",
		url:link,
		headers: {'Referer': document.location},
		onload:function(result) {
		}
	    });
	}
    }  }, false);})();


