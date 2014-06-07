// ==UserScript==
// @name           StudiFZ Tweaks
// @namespace      http://studifz.net
// @description    Collection of tweaks for StudiVZ.net/MeinVZ.net - so far key-mappings for browsing long forum-threads with the arrow-keys
// @include        http://studivz.tld/*
// @include        http://*.studivz.tld/*
// @include        http://meinvz.tld/*
// @include        http://*.meinvz.tld/*
// ==/UserScript==

(function() {
	window.addEventListener("keyup", function(event) { 
		if(!(event.shiftKey || event.ctrlKey )) {
			return;
		}
		//alert(event.keyCode)
		pagers = unsafeWindow.$('a.pager');
		if(!pagers.length) { // no pager links here
			return
		}
		if(event.keyCode == 39) { // rechts
			if(unsafeWindow.$(pagers[pagers.length-1]).text() == '»') {
				pager = pagers[pagers.length-1];
			} else {
				pager = pagers[pagers.length-2];
			}
			if(unsafeWindow.$(pager).text() == '»') {
				window.location.href = pager.href;
			}
		} else if(event.keyCode == 37) { // links
			pager = pagers[1];
			if(unsafeWindow.$(pager).text() == '«' || unsafeWindow.$(pager).text() == '1') {
				window.location.href = pager.href;
			}
		} else if(event.keyCode == 35) { // ende
			pager = pagers[pagers.length-1];
			if(unsafeWindow.$(pager).text() == '»|' || unsafeWindow.$(pager).text() == '»') {
				window.location.href = pager.href;
			}
		} else if(event.keyCode == 36) { // erstes
			pager = pagers[0];
			if(unsafeWindow.$(pager).text() == '|«' || unsafeWindow.$(pager).text() == '«') {
				window.location.href = pager.href;
			}
		} else {
			//alert(event.keyCode);
		}
	}, false);
}());