// ==UserScript==
// @name           Safari Books Max Font
// @namespace      http://www.yankovic.org/happy/gmonkey/
// @description    Automatically increases fonts to max size
// @include        http://search.safaribooksonline.com/*
// ==/UserScript==
(function() {
	function maxFontSize(s) {
		s=s.replace(/[&?]i=1?/g, ''); // remove any font sizes
		return s+(s?'&':'?')+'i=2';  // add to end
	};
	
	if (location.search.match(/\bi=2\b/) == null) {
		location.replace(maxFontSize(location.search));
	} else {
		for ( var i = 0; i < document.links.length; i++ ) {
			var l = document.links[i];	
			if ( l.hostname == location.hostname && l.search.match(/\bi=2\b/) == null ) { 
				l.search = maxFontSize(l.search); 
			}
		}
	}
})();
