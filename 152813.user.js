// ==UserScript==
// @name           Personal Google menu
// @namespace      http://userscripts.org/users/111111111111111111111
// @include        *google.pl*
// @include        *google.com*
// ==/UserScript==


	
	
function dodajStyl(toStyl){
	(function() {
		var css = toStyl;
		if (typeof GM_addStyle != "undefined") {
			GM_addStyle(css);
		} else if (typeof PRO_addStyle != "undefined") {
			PRO_addStyle(css);
		} else if (typeof addStyle != "undefined") {
			addStyle(css);
		} else {
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("style");
				node.type = "text/css";
				node.appendChild(document.createTextNode(css));
				heads[0].appendChild(node); 
			}
		}
	})();
}
	
	
 // Zmniejszenie logo do ikony "G"
dodajStyl("#gbql.gbem, #gb.gbemi #gbql, #gbql.gbes, #gb.gbesi #gbql {width: 24px !important;}"+
"#gbq1 #ikonspan .gbtb2 {top: 1px !important;}"+
"#ikonspan .gbts {display: none !important;}"
);

function dodIkon(nrLinka){ 
	link = document.querySelector("#gb_"+nrLinka);
	document.querySelector("#gb_"+nrLinka+" .gbtb2").title = document.querySelector("#gb_"+nrLinka+" .gbts").firstChild.nodeValue;
	
	odStep += 32;
	dodajStyl("#gbq1 #ikonspan #gb_"+nrLinka+" .gbtb2 {left: "+odStep+"px !important;}");
	spanIkon.appendChild(link);
}

spanIkon = document.createElement("span");
spanIkon.id = "ikonspan";

odStep = 0;

var browser = {}
browser.explorer = /*@cc_on!@*/false;
browser.webkit = /Apple|KDE/i.test(navigator.vendor);

if (browser.explorer) {
	document.write('<script id="_defer" defer="true" src="//:"><\/script>');
}

function dokGotow(callback) {
	//Firefox, Opera
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", callback, false);
	}
	//Internet Explorer
	if (browser.explorer) {
		var deferScript = document.getElementById('_defer');
		if (deferScript) {
			deferScript.onreadystatechange = function() {
				if (this.readyState == 'complete') {
					callback();
				}
			};
			deferScript.onreadystatechange();
			deferScript = null;
		}
	}
	//Safari, Konqueror
	if (browser.webkit) {
		var _timer = setInterval(function() {
			if (/loaded|complete/.test(document.readyState)) {
				clearInterval(_timer);
				callback();
			}
		}, 10);
	}
	window.onload = callback;	
}

function glFun() { // Główna funkcja
	if (arguments.callee.done) { return; }
	arguments.callee.done = true;
	
	// TUTAJ ZACZYNA SIĘ FUNKCJA


 // Dodanie ikon-linków w zwolnione miejsce

logoPole = document.querySelector("#gbq1");
logoPole.appendChild(spanIkon);

dodIkon(1); // Wszystko
dodIkon(2); // Grafika
dodIkon(51); // Tlumacz
dodIkon(8); // Mapy


}; // Koniec głównej funkcji

dokGotow(glFun); // wywołanie głównej funkcji
