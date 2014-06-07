// ==UserScript==
// @name           NUIGroup Ads free
// @namespace      nuigroupadsfree
// @include        http://nuigroup.com/forums*
// ==/UserScript==
//

(function() {

divs = document.getElementsByTagName('DIV');
for ( i = 0; i < divs.length; i++ ) {
	div = divs[i];
	if ( /^randomdiv/.test(div.id) == false )
		continue;
	child = div.getElementsByTagName('DIV')[0];
	div.removeChild(child);
}

})();
