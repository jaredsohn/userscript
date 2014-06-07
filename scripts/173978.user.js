// ==UserScript==
// @name        Yahoo Remove Top Bar
// @namespace   http://glenncarr.com/greasemonkey
// @include     http://*yahoo.com*
// @version     2
// ==/UserScript==

var bar = document.evaluate( '//div[@id="yucsHead"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
if ( bar && bar.snapshotLength > 0 )
{
	bar = bar.snapshotItem( 0 );
	bar.parentNode.removeChild( bar );
}
	
