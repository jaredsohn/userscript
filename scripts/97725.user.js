// ==UserScript==
// @name			Granie bez reklam
// @description		Usuwa przeszkadzające reklamy w grze
// @version			3.1
// @author			Shorty & mikskape
// @include			http://www.menelgame.pl*
// @include			http://www.mendigogame.es*
// @include			http://www.clodogame.fr*
// @include			http://www.bumrise.com*
// @include			http://www.pennergame.de*
// @include			http://berlin.pennergame.de*
// @include			http://www.dossergame.co.uk*
// @include			http://www.serserionline.com*
// @exclude			*/profil/id:*
// @exclude			*/profil/bande:*
// ==/UserScript==
// To jest przerobiony skrypt "Menelgame bez reklam by Shorty"

var s_wersja = '3.1';
var s_info = 'http://userscripts.org/scripts/show/69437';
var s_url = 'http://userscripts.org/scripts/source/69437.user.js';

GM_xmlhttpRequest(
{
	method: 'GET',
	url: s_info,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var wersja = content.split('##[')[1].split(']##')[0];
		if (wersja != s_wersja) {
		alert('Za chwilę zostanie pobrana nowa wersja skryptu "Granie bez reklam". \nProszę potwierdzić instalację.')
		window.location.href=s_url;
		}
	}
	});

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