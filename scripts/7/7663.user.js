// ==UserScript==
// @name         Firefox Start Page "Altro" Link
// @namespace    none
// @description  Aggiunge il menu "Altro" nella pagina iniziale di Firefox
// @include      http://www.google.it/firefox?client=firefox-a&rls=org.mozilla:it:official*
// @include      http://www.google.com/firefox?client=firefox-a&rls=org.mozilla:it:official*
// ==/UserScript==
		 		

//By Nicola Erario
//February 23, 2007

var more = document.createElement('a');
	more.innerHTML = '<a class="q" style="font-weight: bold"' + 
			 'href="http://www.google.it/intl/it/options/">altro&nbsp&#187';
	
	var f = document.getElementsByTagName("font");
	
	f[0].appendChild(more);