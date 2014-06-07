
// ==UserScript==
// @name           Neuer werbungs blocker fuer pennergame
// @author         basti1012
// @namespace      by basti1012 (http://pennerhack.foren-city.de)
// @description    Werbungsblocker fuer pennergame dossergame und Menelgame,blockt alles an werbung was man bei pennerrgame finden kann
// @include        *pennergame*
// @include        *berlin.pennergame*
// @include        *menelgame.pl*
// @include        *dossergame.co.uk*
// @exclude        *gang*

// ==/UserScript==
if(window.location.href == "http://www.pennergame.de/overview/" || window.location.href == "http://pennergame.de/overview/")
{
var content = document.getElementById('newsticker');
content.innerHTML = '';
}
var penershop = document.getElementById('betterplace');
penershop.innerHTML = '&nbsp;';

var classes = document.getElementsByTagName("table");

for (i=0;i<classes.length;i++) {
	var class = classes[i];

	var inner = class.innerHTML;

	if(inner.match(/google/) || inner.match(/O2/) || inner.match(/partner/) || inner.match(/Google /) || inner.match(/Anzeigen/) || inner.match(/show_adsaaaaaaa/) || inner.match(/jsaaaaaaaa/) || inner.match(/Neuenaaaaaaaa/) || inner.match(/Partneraaaaaaaa/)) {

		class.style.display = "none";

		class.innerHTML = "";



	}

}


var classes = document.getElementsByTagName("object");

for (i=0;i<classes.length;i++) {
	var class = classes[i];

	var inner = class.innerHTML;

		class.style.display = "none";


	}


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

// copyright by basti1012
// werbungsblocker blockt alles was an werbung zu finden ist bei pennnergame




