// ==UserScript==
// @name           The West Petee's utilities Language Pack - Italian - Italiano
// @namespace      http://userscripts.org/scripts/show/96584
// @description    Italian language pack for The West Petee's utilities - the full market multisale solution and bank fee calculator
// @author         Narulez
// @version        0.5
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

var TWPU_lang = {
	'error_already_loaded':		"Lo script è già stato caricato, probabilmente devi disinstallare le vecchie versioni!",
	'error_atypical_function':	"Lo script non può modificare una funzione perché atipica",
	'error_not_that_many':		"Non ci sono così tanti oggetti!",
	'error_code_load_failed':	"Lo script non riesce ad eseguire il codice :-(... Per favore, riporta il mondo di gioco e la versione del tuo browser nel forum di The West .net o in userscripts.org.",
	'made_by':					"Autore:",
	'translator_text':			"Traduttore",
	'repeat_sale':				"Ripeti questa vendita",
	'repeat_sale_extra':		"Ripeti la stessa offerta di vendita per il numero di volte specificato.",
	'repeat_bid':				"Repeat questa offerta",
	'disable_grouping':			"Clicca per diabilitare la funzione di raggruppamento",
	'reload':					"Ricarica i dati",
	'max_price':				"Acquisto immediato",
	'count':					"Quantità",
	'walkthere':				"Vai qui",
	'centermap':				"Centra la mappa",
	'lang':						"Italiano",
	'translator_name':			"Narulez" // yes, put your own nick here
};

var twpulpjs = document.createElement('script');
twpulpjs.setAttribute('type', 'text/javascript');
twpulpjs.setAttribute('language', 'javascript'); 
twpulpjs.setAttribute('id', 'TWPU_LP_js');
twpulpjs.innerHTML = "if(typeof TWPU=='undefined') TWPU = {};" + "TWPU.lang_pack = " + JSON.stringify(TWPU_lang) + ";";
document.getElementsByTagName('head')[0].appendChild(twpulpjs);