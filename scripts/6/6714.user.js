// ==UserScript==
// @author		tomasz.frelik (at) enzo.pl
// @namespace	http://frelo.enzo.pl/userscript
// @name		Travian: Custom Links In Menu
// @description	Add any links you want to the left hand menu. Edit this file to do so.
// @include		http://s*.travian*/*
// ==/UserScript==

// remove comments (//) or and new elements
// remember about commas at lines' end,
// last line is without the coma
// EDIT HERE
var customLinks = new Array(
	new Array( 'Alliance',        'allianz.php' ),
	new Array( 'Alliance Forum',  'allianz.php?s=2&f=xxx' ),
	new Array( 'Marketplace',     'build.php?id=xx' )
);
// STOP EDITING


var menuFindPattern = "//table[@id='navi_table']/tbody[1]/tr[1]/td[1]/br[2]";

links_start();

function links_start() {
			
	var resultLinks = document.evaluate( menuFindPattern, document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	//alert( resultLinks.snapshotLength );
	res = resultLinks.snapshotItem( 0 );
	//alert( res );
	
	// additional vertical space
	//var brElement = document.createElement( 'br' );
	//res.parentNode.insertBefore( brElement, res );

	// define and add links
	var linkElement;
	for ( var i = 0; i < customLinks.length; i++ ) {
		linkElement = document.createElement( 'a' );
		linkElement.appendChild( document.createTextNode( customLinks[i][0] ));
		linkElement.href = customLinks[i][1];
		res.parentNode.insertBefore( linkElement, res );
	}
	return;

}

