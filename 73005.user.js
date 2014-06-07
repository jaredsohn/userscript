// ==UserScript==
// @name           Dagbladet information printudgave
// @namespace      http://www.userscripts.org/
// @description    Skifter automatisk til printudgaven af artikler
// @include        http://www.information.dk/*
// ==/UserScript==

	var l ;
	var url;
	var posfra;
	var postil;
	url = document.location.href;
	// Hvis vi er på en artikelside og det ikke allerede er printudgaven
	if (( url.search(/[0-9]/) > 1 ) && (url.match(/print/) == null )) {
		posfra = url.search(/[0-9]/);
		url = 'http://www.information.dk/print/' + url.substr(posfra,8)
		document.location.replace(url);
	}

	 else { // Vi er på forsiden. Alle links ændres til at linke til printudgaven
		l = document.links;
		for ( var i = 0; i < l.length; i++ ) { 
			url = l[i].href;
			if ( !(url.match(/[0-9]+/) == null ) && url.match("information.dk") ) {
				posfra = url.search(/[0-9]/)
	   		l[i].href = 'http://www.information.dk/print/' + url.substr(posfra,8)
			   l[i].target = "_blank";
			};
		}
	}