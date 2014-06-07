// ==UserScript==
// @name        Nextdoc Doppelt-Kommentare Entfernen
// @namespace   fragensammlung@nextdoc
// @include     http://www.nextdoc.at/fragensammlung?*
// @version     1
// @require	    http://code.jquery.com/jquery-1.9.1.min.js
// @grant       none
// ==/UserScript==

$(document).ready(main);

function main() {
	doppel_kommentare = $('div.comment').filter(function(){
		return $(this).find('div.content').text().trim().toLowerCase()=="doppelt";
	});
	
	kommentare_counter = doppel_kommentare.parents('.node-quiz-question').find('.comments-number a');
	kommentare_anzahl = (kommentare_counter.text().split(' ')[1]*1-1);
	if(kommentare_anzahl > 0){
		kommentare_counter.text("Kommentare: "+ (kommentare_counter.text().split(' ')[1]*1-1) );
	}
	else { kommentare_counter.parent().remove(); }
	
	doppel_kommentare.remove();
}