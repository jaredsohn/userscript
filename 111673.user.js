// ==UserScript==

// @name           tiss

// @include        https://tiss.tuwien.ac.at/*


// ==/UserScript==


var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
   if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
   else { $ = unsafeWindow.jQuery; jq(); }
}
GM_wait();

function jq() {
    $.each($("td a img"),function(){
	if($(this).attr("alt")=="angemeldet"){ //anmeldungen suchen

		if($(this).attr("title").match(/Prüfung/)){
        		var t = $(this).attr("title").match(/\d\d\.\d\d\.\d\d\d\d/); //Datum filtern
		
		
//        		var td = $(this).parent();
//	       		td.append('<font color="green">'+t+'</font>');
			$(this).after('<font color="green">'+t+'</font>');
			$(this).remove();
		}

		else{
		$(this).wrapAll('<center />');

		}
	}
	
    });

// Gruppen und Anmelungsplätze zentrieren
$.each($("td a span"),function(){

	if($(this).attr("title").match(/Plätze/))
		$(this).wrapAll('<center />');

});


}