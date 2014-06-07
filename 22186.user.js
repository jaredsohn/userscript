// ==UserScript==
// @name            Fotoalbum Download für StudiVZ, SchuelerVZ & MeinVZ 1.09
// @namespace       http://userscripts.org/scripts/show/22186
// @include         http://www.studivz.net/Photos/*
// @include         http://www.schuelervz.net/Photos/*
// @include         http://www.meinvz.net/Photos/*
// @description     Ermoeglicht es ganze Fotoalben zu downloaden
// ==/UserScript==
//
// By: Martin Pietschmann 'Schirkan'
// Email: schirkan86@gmx.de
// Last Update: 02.07.2009
//
// v1.01 : Downloadlinks erscheinen nun auch bei der Fotoalben-Uebersicht
// v1.02 : Fotoalben mit mehr als 9 Seiten werden korrekt erkannt
// v1.03 : auch zu SchuelerVZ kompatibel
// v1.04 : Anpassung an das neue Layout
// v1.05 : auch zu MeinVZ kompatibel
// v1.06 : Funktioniert jetzt auch mit Firefox 3.x und OHNE Firebug Plugin - Dank geht an Daniel Engels
// v1.07 : Anpassung an neue Fotogalerie - Dank geht an Daniel Engels
// v1.08 : Anpassung an das neue Layout
// v1.09 : Codeoptimierung

(function() {
	
if (self != top) { return; } // Don't run in frames

// Hilfsfunktion von http://wiki.greasespot.net/Code_snippets#Embed_a_function_in_the_current_page
function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

var dl_img = '<img style="margin-bottom:-3px" alt="downloaden" src="data:image/png;base64,R0lGODlhEAAQAPenADVpunqi4vf6/XOc3Ojw+vf6/nmi4/H2/Hih4Xaf3tvn9zZruneg4DltvDVqujFgpnqi4eHs+Xmi4TNms3qj4nmi4tnl9+70+7nQ7nuayWmSz9/p+I2q1+Ls+XOd3Xaf3/P3/fL2/D5qrMLV7zdrunmh4Xmh4Nvn+DptvGePzXyl5pm03Y2q1Yyq2ICdzOrw+qjB5zVptjFhqu/0/IOk1TNlsThru/f7/kNzvsnc9PD1/Mzd9azE6maNyWSMykFzv7XM7oOizmyV0058wrvM5a/D4fb6/XWe3miPyniXx3Sd3jBfp5Sv2nym51SAxXCY2L3S8F2HyPP4/eXt+tHg9zFhqTFgqNDf9tHg9jNksO70/H2n5zFgpzdqumWMyWSMyePt+e3y+2mRzZ654brQ7ztoqnqj4zFgqbfO76S84GSMyHOb2nuZyGyRy6O95Pb6/jVpuenw+nmj42+Y1muRyzRntnGb23Ka2X2n6H+p6UJzvEJ0v8HV8qzF63eh4Orx+zJkr9Hf9jJjre7z+2SLyOnx+vj6/jFiq3mh4jNlsjlsul+Eu3Ga2b3R7HWe3TRntcfZ9LzQ7Hae3jJirOvx+26TzEFyvN3o+Njl9tvm97LK7d/p+Ymm0sTY8nKa2jRntDdruTJjrmOLyPb5/cHcvoe/Yfj7/v39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKcALAAAAAAQABAAAAj/ANO0iLKnwQIHAADYQKEIhxoip2hgoWLqxigdL8KMEkBpQyMxRZwEyvPGiKhBf0KYOtDhBIZIen5cwXPggKhCFwSMInApk4QRMRrs2EKAgJc4UgzN2KTAgh8YjxbkaBIhAhgtAkBMaYopgZsJDiCpEPWlB502SAiJWrtmTCIAncwYkEMhAAQEH454sDNgRRYAfAwYCBCAAgIGCZQM8HSHSSgAUCpUkGCXgSRHAxg9mcNiEhwyiEyJHk1aCCcZXdAgKFCqtevWozQEOUMCSIkCpHLrzj0qhQsuoDSZYP3a9SgfGR4M6cODtHNTbJKI4FDJUp1PE2oAEnSoipUlD8osAgoIADs=" width="16" height="16">';

function dl_link(url) {
	return '<a href="#" onclick="return download_album(\''+url+'\');" title="Alle Fotos downloaden">' + dl_img + '</a>';
}

function anzahl_seiten_ermitteln(text) {
	var seiten = 1;
	if (Ergebnis = text.match(/\/p\/(.[^"]*)/g)) {
		for (j = 0; j < Ergebnis.length; j++) {
			zahl = parseInt(Ergebnis[j].replace(/\/p\//, ""));
			if (zahl > seiten) seiten = zahl;
		}
	}
	return seiten;
}

function download_album(url) {
	var xhr_object = new XMLHttpRequest();
	var anzahl_bilder = 0;
	var anzahl_seiten = 1;
	var bilder = new Array();
	// Anzahl der Seiten ermitteln
	if (url == "") {
		url = window.location.href;
		for (i = 0; i < document.links.length; i++) {
			temp = anzahl_seiten_ermitteln(document.links[i].href);
			if (temp > anzahl_seiten) anzahl_seiten = temp;
		}
	} else {
		xhr_object.open("GET", url, false);
		xhr_object.send(null);
		if (xhr_object.readyState == 4) {
			anzahl_seiten = anzahl_seiten_ermitteln(xhr_object.responseText);
		}
	}
	// Bilder ermitteln und URLs in Array speichern
	for (i = 1; i <= anzahl_seiten; i++) {
		xhr_object.open("GET", url.replace(/\/p\/(.*)/, "").replace(/#(.*)/, "") + "/p/" + i, false);
		xhr_object.send(null);
		if (xhr_object.readyState == 4) {
			Ergebnis = xhr_object.responseText.match(/"(.[^"]*)-m.jpg"/g);
			if (Ergebnis) {
				for (j = 0; j < Ergebnis.length; j++) {
					bilder[anzahl_bilder] = Ergebnis[j].replace(/-m/, "").replace(/"/, "");
					anzahl_bilder++;
				}
			}
		}
	}
	// Popup oeffnen und Bilder anzeigen
	popup = window.open("about:blank", "Fotoalbum","toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizeable=0,width=770,height=500");
	popup.document.write("<b>Drücke Strg+S um diese Seite mit allen Bildern zu speichern!</b><br>");
	for (i = 0; i < anzahl_bilder; i++) {
		popup.document.write('<img src="'+bilder[i]+'" height="135" />');
	}
	return false;
}

function add_link_to_albums() {
	// Fotoalbumliste durchlaufen
	lists = document.getElementsByTagName("ul");
	for (list_nr = 0; list_nr < lists.length; list_nr++) {
		if (lists[list_nr].getAttribute("class") != "photoalbums") continue;
		//Fotoalben durchlaufen
		items = lists[list_nr].getElementsByTagName("li");
		for(item_nr = 0; item_nr < items.length; item_nr++) {
			obj = items[item_nr].childNodes[5].childNodes[1].childNodes[1];
			if (obj != undefined) {
				url = items[item_nr].getElementsByTagName("a")[0].href;
				obj.innerHTML = dl_link(url) + "&nbsp;" + obj.innerHTML;
			}
		}
	}
}

// Funktionen auf in die Seite integrieren
embedFunction(anzahl_seiten_ermitteln);
embedFunction(download_album);

// Links hinzufügen
var e = document.getElementsByTagName("h2");
if (e.length > 0) {
	var obj = e[0];
	obj.innerHTML = dl_link(window.location.href) + "&nbsp;" + obj.innerHTML;
} else {
	add_link_to_albums();
}

}) ();