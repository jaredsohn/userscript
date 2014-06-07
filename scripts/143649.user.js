// ==UserScript==
// @name           viglink redirect remover
// @namespace      org.benzworld
// @description    Removes ad redirects that are added to links on forums.
// @include        http://www.benzworld.org/*
// @grant          GM_log
// ==/UserScript==


(function() {
  var a = document.getElementsByTagName("a");
  for (var i=0; i<a.length; i++) {
	// Example: document.getElementsByTagName("a")[104].href
    if (a[i].href.match(/apicdn\.viglink\.com/)) {
	  var realurl = /[?&]out=([^&]*)/.exec(a[i].search)[1];
	  if (realurl) {
	    a[i].href = decodeURIComponent(realurl);
	  } else {
        GM_log("Hmm, maybe the parameter name 'out' changed and broke things");
	  }
	}
  }
})();
