// ==UserScript==
// @name           9gag cleaner
// @description    Removes only the social buttons from 9gag, unlike other scripts, for a much better and faster browsing.
// @namespace      9gag
// @include        http*://9gag.com/*
// @run-at document-start

// ==/UserScript==

var isLoaded = false;
(function gag9fix() {
	var elements = new Array();
	var classes = ["social-block","sharing-box","spread-bar-wrap"]
	for(var i = 0; i < classes.length; i++) {
		var els = document.getElementsByClassName(classes[i]);
		if (els && els.length >0) {
			for (var j = 0; j < els.length; j++) {
				elements.push(els[j]);
			}
		}
	}
	
	
	if (elements.length > 0) {
		for (i = 0; i < elements.length; i++ ) {
			var el = elements[i];
			if (el.parentNode) {
				el.parentNode.removeChild(el);
			}
		}
	}
	if (document.readyState != 'complete') {
		setTimeout(gag9fix, 0);
	}
})();