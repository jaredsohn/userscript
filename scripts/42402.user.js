// ==UserScript==
// @name			PennergameNoAdds
// @description		Removes the most advertisings from pennergame and shows the site like a premium gold account
// @version			2.0
// @namespace		http://bitcrunch.de/pennergame/
// @author			Shorty
// @homepage		http://bitcrunch.de
// @include			http://*pennergame.de*
// @license			http://creativecommons.org/licenses/by/3.0/de/	
// ==/UserScript==

function removeElement( element ) {
	try {
    	element.parentNode.removeChild( element );
	} catch( error ){
		//
	}
}

function remove_iframe_adds() {
	try {
		var adds = document.getElementsByTagName('iframe');
		for( var i = 0; i < adds.length; i++ ){
			removeElement(adds[ i ]);
		}
	} catch( error ) {
		stack.push( error );
	}
}

function remove_flash_adds() {
	try {
		var adds = document.getElementsByTagName('object');
		for( var i = 0; i < adds.length; i++ ){
			removeElement(adds[ i ]);
		}
	} catch( error ) {
		stack.push( error );
	}
}

function remove_layer_adds() {
	try {
		removeElement( document.getElementById('ad2gameslayer') );
	} catch( error ) {
		stack.push( error );
	}
}


function init() {
	remove_iframe_adds();
	remove_flash_adds();
	remove_layer_adds();
}

init();
window.addEventListener("load", init, false);