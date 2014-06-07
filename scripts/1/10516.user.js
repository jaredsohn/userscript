// ==UserScript==
// @author		Nekura
// @namespace		http://dvdliste.frac.dk/travian/
// @name		Travian: Stop overlap
// @description		Fixes the overlaping of troops and building projects
// @include		http://s*.travian*/dorf1.php*
// ==/UserScript==

if ( navigator.appName == 'Opera' ) {
	eventSource = document;
} else {
	eventSource = window;
}

eventSource.addEventListener( 'load', function( e ) {
			
	var path = document.evaluate( '//p[@class="f10"]', document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	res = path.snapshotItem( 0 );

	// Add number of newlines
	var Element;
	for ( var i = 0; i < 5; i++ ) {
		Element = document.createElement( 'br' );
		res.parentNode.insertBefore( Element, res );
	}
	return;

}, false );