// ==UserScript==
// @name           The West Petee's utilities Language Pack - Polish - Polski
// @namespace      http://userscripts.org/scripts/show/96584
// @description    Polish language pack for The West Petee's utilities - wielkokrotna sprzedaż na targu i kalkulator opłat bankowych
// @author         Darius II
// @version        0.5
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

//			do not translate...	|	translate the texts below
var TWPU_lang = {
			'error_already_loaded':		"Skrypt jest już zainstalowany, odinstaluj starszą wersję!",
			'error_atypical_function':	"Skrypt nie może zmodyfikować funkcji, prawdopodobnie zostało coś zmienione w grze.",
			'error_not_that_many':		"Nie ma zbyt wielu pozycji!",
			'error_code_load_failed':	"Skrypt nie był w stanie załadować strony :-( ... Proszę zgłosić ten świat i wersję przeglądarki do Petee na forum lub na userscripts.org",
			'made_by':					"Przez",
			'translator_text':			"Tłumacz",
			'repeat_sale':				"Powtórz tą sprzedaż",
			'repeat_sale_extra':		"Powtórz tą samą aukcję określoną ilość razy.",
			'repeat_bid':				"Powtórz tą ofertę",
			'disable_grouping':			"Wyłącz funkcję grupowania produktów",
			'reload':					"Załaduj ponownie dane",
			'max_price':				"Natychmiastowy zakup",
			'count':					"Ilości",
			'walkthere':				"Idź do miasta",
			'centermap':				"Wyśrodkuj mapę",
			'lang':						"Polski",
			'translator_name':			"Darius II"
		};

var twpulpjs = document.createElement('script');
twpulpjs.setAttribute('type', 'text/javascript');
twpulpjs.setAttribute('language', 'javascript'); 
twpulpjs.setAttribute('id', 'TWPU_LP_js');
twpulpjs.innerHTML = "if(typeof TWPU=='undefined') TWPU = {};"
	+ "TWPU.lang_pack = " + JSON.stringify(TWPU_lang) + ";";
document.getElementsByTagName('head')[0].appendChild(twpulpjs);