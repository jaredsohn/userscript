// ==UserScript==
// @name           klawisz do zgłoszeń
// @namespace      http://www.fotka.pl/profil/Bozar/
// @include        http://www.fotka.pl/profil/*
// ==/UserScript==

const $ = unsafeWindow.$;

$(document).keypress(function(e){
	if(e.keyCode == 9){
		e.preventDefault();
		$("#profil_regulamin_new").click();
	}
});