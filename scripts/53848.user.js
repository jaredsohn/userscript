// ==UserScript==
// @name           Cooliris - Fotoalben in 3D für StudiVZ, SchuelerVZ & MeinVZ 1.01
// @namespace      http://userscripts.org/scripts/show/53848
// @description    Ermöglicht das Anzeigen von Fotoalben in Cooliris auf einer großen dreidimensionalen Fotoleinwand.
// @include        http://www.studivz.net/Photos/*
// @include        http://www.schuelervz.net/Photos/*
// @include        http://www.meinvz.net/Photos/*
// ==/UserScript==
//
// By: Martin Pietschmann 'Schirkan'
// Email: schirkan86@gmx.de
//
// V1.01 (27.12.2009) Anpassung für URLs mit "#" und Korrektur der Bildreihenfolge
// V1.00 (16.07.2009)

(function() {
	
if (self != top) { return; } // Don't run in frames

var img_cooliris = '<img style="margin-bottom:-3px" alt="cooliris" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAc1JREFUeNp0kr1PFEEYxp/ZD25hj+CZE06CAXOGQIFYqIkkxgghxkhnLOn8D/gLKKyMHaUNFbUdFFTGAhsbQtT4QQBjUFi44253dt+ZHd/JRSW69yaT2Ume+b3PPvMKYwz+KfGhQStr70+fuETaSxV0Rp0VZ+7j2yMb0/WLi7/FHv4v8/qgde/51uGlAU3wWwlUW4JiCfmziQu+uM8AdAM4dgU5ZFUrVASffBctV6CX96DkwXccef7CH0Aj/vZs98fbOU94KGNy4mY1RwkKRmmclHx8/hpD8LcxOQoBO3vrTzfevRgM/QrKQ8v43iC4OVsniau9gwhzg5QYkJtiQKaQkOqD8fqglQElKQQIoIxjJQgW5Cmxoy4OlAISaVBygVALpM0Y3JNhKWIl0YhiNKO2hQSFANIGkpsd6wSjtX0s3qpDaQnNYdbCITUzKiLrav7O2GYxwDpgALkO3myvolKuItPAabuF2QdLOzMP5x+xzPo/LATEWdZzfNZG4Duch8b+UYSUszg6a2LhJLKSg4KZ+Quo16Y+XR+7e9lz+fG4j+a0O7+lMD488dFOqB2yroDJKzdehkH/F9ZpO93Wa+fJhLg2PP6q6LKtXwIMANaW48/IuRwlAAAAAElFTkSuQmCC" width="16" height="12">';

// Hilfsfunktion von http://wiki.greasespot.net/Code_snippets#Embed_a_function_in_the_current_page
function embedFunction(s) {
	var body = document.getElementsByTagName('body')[0];
	if (body != undefined) body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function ci_link(url) {
	var link = document.createElement('a');
	link.href = 'javascript:;';
	link.title = 'Alle Bilder in Cooliris anzeigen';
	link.innerHTML = img_cooliris;
	link.addEventListener('click', function(){
		launch_cooliris(url);
	}, false);
	return link;
}

var bilder = null;
var bilder_pro_seite = 12;
var seiten_verarbeitet = 0;
var cooliris = null;

function ermittle_bilder(url, seite, max) {
	GM_xmlhttpRequest({
		method:"GET",
		url:url+"/p/"+seite,
		headers:{
			"User-Agent":"Mozilla/5.0",
			"Accept":"text/xml"
		},
		onload:function(response) {
			if (seite == 1) {
				// Variablen initialisieren
				bilder = new Array();
				seiten_verarbeitet = 0;
				// maximale Seitenzahl ermitteln
				var input = document.createElement('div');
				input.innerHTML = response.responseText;
				var links = input.getElementsByTagName('a');
				for (var i = 0; i < links.length; i++) {
					if (links[i].className == 'pager') max = parseInt(links[i].title);
				}
				links = null;
				input = null;
				if (max == undefined) max = 1;
				cooliris.document.write(max + ' Seiten gefunden<br>');
			}
			
			cooliris.document.write('lade Seite ' + seite + '<br>');
			
			var Ergebnis = response.responseText.match(/"(.[^"]*)-m.jpg"/g);
			if (Ergebnis) {
				var pos = bilder_pro_seite * (seite - 1)
				for (var j = 0; j < Ergebnis.length; j++) {
					var bild_thumb = Ergebnis[j].replace(/"/g, "");
					var bild = bild_thumb.replace(/-m/, "");
					bilder[pos + j] = bild;
					
					// Bild vorladen
					var img_loader_thumb = new Image();
					img_loader_thumb.src = bild_thumb;
					var img_loader = new Image();
					img_loader.src = bild;
				}
			}
			
			if (seite == 1) {
				for (var i = 2; i <= max; i++) {
					ermittle_bilder(url, i, max);
				}
			}
			
			seiten_verarbeitet++;
			if (max == seiten_verarbeitet) {
				load_cooliris(url);
			}
		}
	});
}

function load_cooliris(url) {
	cooliris.document.write('generiere Media-RSS...<br>');

	var title = 'Fotoalbum';
	if (window.location.href.match(/(Tags|\/a\/)/)) {
		title = document.getElementsByTagName('h2')[0].innerHTML;
	}
	
	// Daten übermitteln und Cooliris starten
	var data = 'title='+escape(title)+'&description=Fotoalbum';
	for (var i = 0; i < bilder.length; i++) {
		data += '&images[]='+bilder[i];
	}
	var feed_url = 'http://cooliris.schirkan.de/vz_media_rss.php?album_url='+url;
	
	GM_xmlhttpRequest({
		method:"POST",
		url:feed_url,
		headers:{
			"User-Agent":"Mozilla/5.0",
			"Accept":"text/xml",
			"Content-type":"application/x-www-form-urlencoded"
		},
		data:encodeURI(data),
		onload:function(response) {
			cooliris.document.write('lade Cooliris...<br>');
			cooliris.document.close();
			cooliris.location.href = 'http://www.cooliris.com/tab/#url='+escape(feed_url);
		}
	});
}

function launch_cooliris(url) {
	cooliris = window.open();
	cooliris.document.write('Bilder werden geladen...<br>');
	ermittle_bilder(url.replace(/#/, ""), 1); // # entfernen
}

function add_link_to_albums() {
	// Fotoalbumliste durchlaufen
	var lists = document.getElementsByTagName("ul");
	for (var list_nr = 0; list_nr < lists.length; list_nr++) {
		if (lists[list_nr].className == "photoalbums") {
			//Fotoalben durchlaufen
			var items = lists[list_nr].getElementsByTagName("li");
			for(var item_nr = 0; item_nr < items.length; item_nr++) {
				var obj = items[item_nr].childNodes[5].childNodes[1].childNodes[1];
				if (obj != undefined) {
					var url = items[item_nr].getElementsByTagName("a")[0].href;
					obj.insertBefore(ci_link(url), obj.firstChild);
				}
			}
		}
	}
}

embedFunction(ermittle_bilder);
embedFunction(launch_cooliris);
embedFunction(load_cooliris);

// Links hinzufügen
if (window.location.href.match(/(Tags|\/a\/)/)) {
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].className == 'photo-list-actions') {
			var link = ci_link(window.location.href);
			link.className = 'diashow';
			link.innerHTML += ' Cooliris';
			divs[i].appendChild(link);
			break;
		}
	}
} else {
	add_link_to_albums();
}
}) ();