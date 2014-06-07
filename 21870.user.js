// ==UserScript==
// @Author	Nekura
// @name	Travian: Stop Overlap v.2
// @namespace	Travian
// @description	Fixes the overlaping of troops and building projects
// @include	http://*travian*/dorf1*
// ==/UserScript==

// Regular expressions
bReg = /gid=16/; // find gid=16, the querystring for units url, only units href will show true
	
// Event listener starts things off once the page is done loading
window.addEventListener("load",init,false);

function init() {

	// Check links and increment counter everytime it finds a units link
	var j = 0;
	for (var i = 0; i < document.links.length; i++) {
	if (bReg.test(document.links[i].href)){j++}
	}
	
	var resultLinks = document.evaluate( '//p[@class="f10"]', document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	res = resultLinks.snapshotItem( 0 );

	var linkElement;
	if (j < 6) {
	k = 0;
	}
	if (j > 6) {
	k = j - 6;
	}
	if (j > 9) {
	k = j - 5;
	}
	if (j > 12) {
	k = j - 4;
	}
	if (j > 15) {
	k = j - 3;
	}
	if (j > 18) {
	k = j - 2;
	}
	if (j > 21) {
	k = j - 1;
	}
	if (j > 24) {
	k = j;
	}

	// Add newlines
	for ( var l = 0; l < k; l++ ) {
	linkElement = document.createElement( 'br' );
	res.parentNode.insertBefore( linkElement, res );
	}

}