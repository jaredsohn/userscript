// ==UserScript==
// @name           mypopup blocker
// @namespace      popup
// @include        http://*/*
// ==/UserScript==


(function() {
	window = unsafeWindow;
	window.oldopen = window.open
	window.open = function(URL, windowName, windowFeatures) {
	    if(confirm("POPUP URL: " + URL)) {
	        window.oldopen(URL, windowName, windowFeatures);
	    }
	}
	links = document.getElementsByTagName("a");
	
	for (i in links) {
	    if(links[i].target) {
	        links[i].innerHTML = links[i].innerHTML + " <-!!!" ;
	    }
	}
})();