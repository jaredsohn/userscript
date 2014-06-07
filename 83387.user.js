// ==UserScript==
// @name           poprawka PW
// @namespace      local
// @include        http://www.fotka.pl/wiadomosci/talk/*
// @copyright	   bozar
// @version        1.0.0
// ==/UserScript==

var button = document.getElementsByClassName("button")[0];
if (button != null){
	button.addEventListener("click", function(e){
		button.value = "Wysyłanie...";
	}, false);
	var box = document.getElementById("rozmowa2");
	if (box != null){
		box.addEventListener( "DOMNodeInserted", function(){
			button.value = "Wyślij wiadomość";
			var text = document.getElementsByTagName("textarea")[0];
			if (text != null) text.focus();			
		}, false);
	}
}
