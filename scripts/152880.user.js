// ==UserScript==
// @name          OliMaTO
// @description	  Trova quando viene aggiornato il forum.
// @include       http://olimato.altervista.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @grant none
// ==/UserScript==
function ref() {
	var nr = "La ricerca ha trovato 0 risultati";
	var s = 1000;
	var t = 60*s; //1 minuto
	var myurl = "http://olimato.altervista.org/forum/unreadposts.html";
	alert("func2222");
	$.ajax({
		url: myurl,
		context: document.body,
		success: function(s,x){
			if(s.indexOf(nr)==-1) {
				alert("OliMaTO: Nuovo messaggio!");
			};
		}
	});
	alert("func");
	setTimeout(ref(), t);
}
ref();