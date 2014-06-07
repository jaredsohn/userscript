// ==UserScript==
// @name          de-Takuan boingboing.net
// @namespace     http://userscripts.org/users/103468
// @description   removes Takuan's (or any other user's) comments from boingboing.net
// @include       http://boingboing.net/*
// @include       http://*.boingboing.net/*
// @author        aoxyjvwdfkbs
// @homepage      http://userscripts.org/scripts/show/57142
// @license       Creative Commons Attribution 3.0 United States; http://creativecommons.org/licenses/by/3.0/us/
// @copyright     2009+, aoxyjvwdfkbs (http://userscripts.org/users/103468)
// @attribution   Egypt Urnash (http://userscripts.org/scripts/show/55558)
// @attribution   Jesse Andrews (http://userscripts.org/scripts/show/870)
// @version       07 Sep 2009
// ==/UserScript==
if ( document.getElementById('comments') != null ) {
	d = document.getElementById('comments')
	k = d.childNodes;
	bad = 0
	for (i = k.length-1; i>=0; i--) {
		try {
			if ( k[i].className.match('comments-content') ) {
				m = k[i].childNodes;
				for (j = m.length-1; j>=0; j--) {
					try {
						if ( m[j].innerHTML.match('Takuan') ) {
							bad = 1;
						}
						else bad = 0;
					}
					catch (e) {
						bad = 0;
					}
					if (bad) {
						m[j].style.display="none";
					}
				}
			}
		} 
		catch (e) {
		}
	}
}
