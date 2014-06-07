/*
 My LJ Style
 version 0.5
 2005-04-04
 Copyright (c) 2005, Steven Chai (email: gm AT yankovic DOT org )
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 This is a Greasemonkey user script
 http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name          My LJ Style
// @namespace     http://www.yankovic.org/happy/gmonkey/
// @description   Modify all LiveJournals to your style.
// @include       http://*.livejournal.com/*
// @exclude       http://*.livejournal.com/*s2id=*
// @exclude       http://pics.livejournal.com/*
// @exclude       http://www.livejournal.com/*
// ==/UserScript==

(function() {
	function addMyStyle(s) {
		return (s?s+'&':'?')+'style=mine';
	};

/*
	if (
		location.pathname.indexOf('.bml') == -1
		&& location.search.indexOf('style=') == -1
	) {
		location.replace(addMyStyle(location.search));
	} else {
*/

		for ( var i = 0; i < document.links.length; i++ ) {
			var l = document.links[i];
			if (
				l.hostname.match(/\.livejournal\.com$/i)
				&& l.pathname.indexOf('.bml') == -1
				&& l.search.indexOf('style=') == -1
			) {
				l.search = addMyStyle(l.search);
			}
		}
/*
	}
*/
})();





