// ==UserScript==
// @name           zamiana
// @namespace      localhost
// @description    zamienia nazw u|ytkownika
// @include        http://www.fotka.pl/*
// ==/UserScript==

window.addEventListener("load", function(e) {



	var co="Nazwa";
	var naCo="Lucaas";
	
	var linki = document.links;
	
	for (var i=0; i<linki.length; i++){
		if(linki[i].href.indexOf(co) > 0){ //jak znajdzie link z nazwą użytkownika
			for (var j=0; j<linki[i].getElementsByTagName("span").length; j++){
				linki[i].getElementsByTagName("span")[j].innerHTML=naCo; //login
			}
			
			
			for (var j=0; j<linki[i].getElementsByTagName("b").length; j++){													   
				linki[i].getElementsByTagName("u")[j].innerHTML=naCo; // posty na forum
			}
		}
	}

}, false);