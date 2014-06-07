// nasza-klasa.pl - Lepsza kolejność elementów na stronie głównej
// version 1.1
// 2008-12-17
// Copyright (c) 2008, Mati
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          nasza-klasa.pl - Lepsza kolejność (PL)
// @description   Lepsza kolejność elementów na stronie głównej n-k (zdjęcia, goście, powiadomienia, ...). Usunięto główny banner.
// @include       http://nasza-klasa.pl/
// ==/UserScript==

// Usuń główny banner reklamowy
banner = document.getElementById('content_banner');
banner.style.display = 'none';

var td;
/*
td = document.evaluate(
    "td[@class='first']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
*/
td = document.getElementsByTagName('td');
td = td[0];

if (td) {
	// Przewiń nagłówek
	td.scrollIntoView(true);
	
	divs = td.childNodes;
	content_main = document.getElementById('content_main');
	
	wiadomosci = td.removeChild(document.getElementById('last_news_box')); // divs[1]
	aukcje = td.removeChild(document.getElementById('allegro_box friends')); // divs[6]
	// there are 2 id=school_class_mates_box elements
	goscie = td.removeChild(document.getElementById('school_class_mates_box'));
	if (document.getElementById('school_class_mates_box') != null)
		ostatnioDoKlas = td.removeChild(document.getElementById('school_class_mates_box'));
	ostatnioDoSzkol = td.removeChild(document.getElementById('school_mates_box')); // divs[8]
	powiadomienia = content_main.removeChild(document.getElementById('last_events_box')); // content_main.childNodes[2]
	powiadomienia.style.width = '477px';
	
	td.appendChild(goscie);
	td.appendChild(powiadomienia);
	td.appendChild(wiadomosci);
	td.appendChild(ostatnioDoKlas);
	td.appendChild(ostatnioDoSzkol);
	//td.appendChild(aukcje);
}
