// ==UserScript==
// @name			Play without ads
// @description		remove ads layers
// @version			3.0
// @author			Shorty & mikskape coorect bumrise.info
// @include			http://www.menelgame.pl*
// @include			http://www.mendigogame.es*
// @include			http://www.clodogame.fr*
// @include			http://www.bumrise.com*
// @include			http://www.pennergame.de*
// @include			http://berlin.pennergame.de*
// @include			http://www.dossergame.co.uk*
// @include			http://www.serserionline.com*
// @include			http://www.faveladogame.com*
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

function remove_layer_addsa() {
	try {
		removeElement( document.getElementById('google_js_1') );
	} catch( error ) {
		stack.push( error );
	}
}

function remove_layer_addsb() {
	try {
		removeElement( document.getElementById('google_js_2') );
	} catch( error ) {
		stack.push( error );
	}
}


function init() {
	remove_iframe_adds();
	remove_flash_adds();
	remove_layer_adds();
	remove_layer_addsa();
	remove_layer_addsb();
}

init();
window.addEventListener("load", init, false);
init();
window.addEventListener("load", init, false);
