// Heise.de Kurz-URLs anzeigen
// Format: http://ct.de/-<ID>
// @author usch
// @mail   usch@ueoeaeh.de
// @date   08.02.2011
// @todo   Unterstützung für http://www.heise.de/tp/
// @todo   Unterstützung für http://www.cttv.de/

// ==UserScript==
// @name        heise.de Short URL
// @namespace   http://ueoeaeh.de/
// @description Zeigt Kurz-URLs zu Beiträgen auf heise.de an
// @include     http://www.heise.de/newsticker/meldung/*
// @include     http://www.heise.de/newsticker/artikel/*
// @include     http://www.heise.de/ct/meldung/*
// @include     http://www.heise.de/ct/artikel/*
// @include     http://www.heise.de/ix/meldung/*
// @include     http://www.heise.de/ix/artikel/*
// @include     http://www.heise.de/tr/meldung/*
// @include     http://www.heise.de/tr/artikel/*
// @include     http://www.heise.de/autos/meldung/*
// @include     http://www.heise.de/autos/artikel/*
// @include     http://www.heise.de/developer/meldung/*
// @include     http://www.heise.de/developer/artikel/*
// @include     http://www.heise.de/foto/meldung/*
// @include     http://www.heise.de/foto/artikel/*
// @include     http://www.heise.de/mac-and-i/meldung/*
// @include     http://www.heise.de/mac-and-i/artikel/*
// @include     http://www.heise.de/mobil/meldung/*
// @include     http://www.heise.de/mobil/artikel/*
// @include     http://www.heise.de/security/meldung/*
// @include     http://www.heise.de/security/artikel/*
// @include     http://www.heise.de/netze/meldung/*
// @include     http://www.heise.de/netze/artikel/*
// @include     http://www.heise.de/open/meldung/*
// @include     http://www.heise.de/open/artikel/*
// @include     http://www.heise.de/resale/meldung/*
// @include     http://www.heise.de/resale/artikel/*
// ==/UserScript==

var urlPrefix = 'http://heise.de/';

function go() {
	var url = location.href;
	
	// Param-String abschneiden, falls vorhanden (alles ab '?')
	var paramIndex = url.indexOf('?');
	if (paramIndex > -1) {
		url = url.substring(0, paramIndex);
	}
	
	// ID aus der URL herausfiltern und neue URL erzeugen
	var from = url.lastIndexOf('-');
	var to = url.lastIndexOf('.');
	var id = url.substring(from, to);
	var newUrl = urlPrefix + id;
	
	// Neues Element erzeugen und in die Artikelüberschrift einfügen
	var shortUrlElement = document.createElement('div');
	shortUrlElement.id = 'short_url';
	shortUrlElement.innerHTML = '<small><a href="' + newUrl + '">' + newUrl + '</a></small>';
	
	var mitteElement = document.getElementById('mitte');
	var headline = mitteElement.getElementsByTagName('h1')[0];
	if (typeof headline == 'undefined') { headline = mitteElement.getElementsByTagName('h2')[0]; }
	if (typeof headline == 'undefined') { headline = mitteElement.getElementsByTagName('h3')[0]; }
	
	// Variante 1: Überschrift in Link umwandeln
	//var headlineText = headline.innerHTML;
	//headline.innerHTML = '<a href="' + newUrl + '">' + headlineText + '</a>';
	
	// Variante 2: Link an Überschrift anhängen
	headline.appendChild(shortUrlElement);
}

go();
