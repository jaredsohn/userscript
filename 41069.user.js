// ==UserScript==
// @name			PennergameNoAds
// @description		Removes the most advertisings from pennergame and shows the site like a premium gold account
// @version			2.0
// @namespace		http://bitcrunch.de/pennergame/
// @author			Shorty
// @homepage		http://bitcrunch.de
// @include			http://*pennergame.de*
// @exclude			http://*pennergame.de/profil/id:*
// @license			GPLv3
// ==/UserScript==


/**
 * PennergameNoAds Copyright (C) 2009 Shorty, Marco Müller
 * 
 * GNU GENERAL PUBLIC LICENSE, Version 3, 29 June 2007
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or any
 * later version.
 * 
 * PennergameNoAds is distributed in the hope that it will be
 * useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the NU General
 * Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 */
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