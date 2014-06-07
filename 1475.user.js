// ==UserScript==
// @namespace     tag:
// @name          NewsLinksToGoogleGroups
// @description   This script changes news:// urls in links to the corresponding Google Groups url.
// @include       *
// ==/UserScript==

(function() {
	var ggurl = 'http://groups.google.com/group/';
	var al = document.getElementsByTagName('a');
	var m_url = RegExp('^news://(.*)/(.*)');
	var m_grp = RegExp('^news:(.*)');
	for ( var i = 0; i < al.length; i++ ) {
		if ( r = m_url.exec( al[i] ) ) {
			al[i].href = ggurl +r[2];
		} else if ( r = m_grp.exec( al[i] ) ) {
			al[i].href = ggurl +r[1];
		}
	}
})()
