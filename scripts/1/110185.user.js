// ==UserScript==
// @name           TWPU Language Pack - German - Deutsch
// @namespace      http://userscripts.org/scripts/show/110185
// @description    Language Pack "Deutsch" für The West Petee's utilities
// @Translator     DasJoergi auf Grundlage der Version von Boo123
// @version        für 0.5.1.1
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

//	do not translate...	|	|	translate the texts below
var TWPU_lang = {
	'error_already_loaded':			"Script bereits geladen; bitte die ältere Version entfernen!",
	'error_atypical_function':		"Das Script kann eine Spielfunktion nicht verändern, da es atypisch ist",
	'error_not_that_many':			"Nicht genügend Waren vorhanden!",
	'error_code_load_failed':		"Das Script konnte den Code nicht laden :-(... Bitte sende einen Bericht mit Hinweis auf die Spielwelt sowie deine Browserversion zu Petee auf .net Foren oder bei userscripts.org",
	'made_by':				"Erstellt von",
	'translator_text':			"Übersetzer",
	'repeat_sale':				"Wiederhole den Verkauf",
	'repeat_sale_extra':			"Wiederhole die gleiche Auktion die angegebene Anzahl.",
	'repeat_bid':				"Wiederhole das Gebot",
	'disable_grouping':			"Stapeln deaktivieren",
	'reload':				"Aktualisieren",
	'max_price':				"Sofortkauf",
	'count':				"Anzahl",
        'walkthere':                            "Hingehen",
        'centermap':                            "Karte zentrieren", 
	'lang':					"Deutsch",
	'translator_name':			"DasJoergi" // yes, put your own nick here
};

var twpulpjs = document.createElement('script');
twpulpjs.setAttribute('type', 'text/javascript');
twpulpjs.setAttribute('language', 'javascript'); 
twpulpjs.setAttribute('id', 'TWPU_LP_js');
twpulpjs.innerHTML = "if(typeof TWPU=='undefined') TWPU = {};"
	+ "TWPU.lang_pack = " + JSON.stringify(TWPU_lang) + ";";
document.getElementsByTagName('head')[0].appendChild(twpulpjs);