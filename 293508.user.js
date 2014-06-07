// ==UserScript==
// @name			DR
// @description		dr!
// @namespace		drDRdrDRdrDRdrDR
// @include			*
// @version			0.1
// ==/UserScript==

// drdr dr dr drdrdr drdrdrdr
function dr() {

	function drdr( drdrdrdrdrdrdrdrdrdr ){
		return Object.prototype.toString.call( drdrdrdrdrdrdrdrdrdr ).slice(8,-1);
	}

	// (dr) dr dr dr dr dr dr dr
	// * drdr drdr dr drdr drdr drdrdr dr drdr drdrdr
	function drdrdrdrdr( drdrdrdrdrdrdrdr ) {

		var drdrdrdrdrdrdrdrdr = drdrdrdrdrdrdrdr.childNodes.length,
			drdrdrdrdrdrdr;

		if ( drdrdrdrdrdrdrdrdr ) {
			for ( drdrdrdrdrdrdr = 0; drdrdrdrdrdrdr < drdrdrdrdrdrdrdrdr; drdrdrdrdrdrdr++ ) {
				drdrdrdrdr( drdrdrdrdrdrdrdr.childNodes[ drdrdrdrdrdrdr ] );

				if ( drdr( drdrdrdrdrdrdrdr.childNodes[ drdrdrdrdrdrdr ] ) == 'Text' ) {
					drdrdrdrdrdr( drdrdrdrdrdrdrdr.childNodes[ drdrdrdrdrdrdr ] );
				}
			}
		}
	}

	// dr drdrdr drdr dr "DR"
	function drdrdrdrdrdr( drdrdrdrdrdrdrdrdrdrdr ) {
		var drdrdrdrdrdrdrdrdrdrdrdr = drdrdrdrdrdrdrdrdrdrdr.textContent.replace( /([\w]+)/g, 'DR' );
		drdrdrdrdrdrdrdrdrdrdr.textContent = drdrdrdrdrdrdrdrdrdrdrdr;
	}

	// dr dr drdr dr drdr drdrdrdr dr drdr dr drdrdr dr
	var drdrdr = document.getElementsByTagName('body'),
		drdrdrdr;
	for ( drdrdrdr = 0; drdrdrdr < drdrdr.length; drdrdrdr++ ) {
		drdrdrdrdr( drdrdr[ drdrdrdr ] );
	}

}

// dr drdrdr
dr();