// ==UserScript==
// @name           The West Petee's utilities Language Pack - italian - italiano
// @namespace      http://userscripts.org
// @description    lingua Italiano per The West Petee's utilities - Gestisce comodamente la vendita e le offerte multi dello stesso articolo, visualizza le spese bancarie
// @author         argo81
// @version        0.5.1
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

//	do not translate...	|	translate the texts below
var TWPU_lang = {
	'error_already_loaded':		"Script già caricato, potrebbe essere necessario disinstallare la versione  precedente!",
	'error_atypical_function':	"lo Script non può modificare una funzione, perché è atipico",
	'error_not_that_many':		"Non ci sono molti articoli!",
	'error_code_load_failed':	"Lo script non è riuscito a caricare il codice :-(... Si prega di denunciare  questo mondo di gioco e la versione del browser a Petee via Forum.net o su userscripts.org.",
	'made_by':					"Autore:",
	'translator_text':		"traduttore",
	'repeat_sale':				"Ripetere la vendita",
	'repeat_sale_extra':		"Ripetere questa vendita per un determinato numero di volte.",
	'repeat_bid':				"Ripetere questa offerta",
	'disable_grouping':		"Clicca per disattivare la funzione di raggruppamento",
	'reload':			"Ricaricare i dati",
	'max_price':			"acquisto immediato",
	'count':					"offerta",
	'walkthere':			"vai alla città",
	'centermap':			"centra nella mappa",
	'lang':						"italiano",
	'translator_name':			"argo81"
};

var twpulpjs = document.createElement('script');
twpulpjs.setAttribute('type', 'text/javascript');
twpulpjs.setAttribute('language', 'javascript'); 
twpulpjs.setAttribute('id', 'TWPU_LP_js');
twpulpjs.innerHTML = "if(typeof TWPU=='undefined') TWPU = {};"
	+ "TWPU.lang_pack = " + JSON.stringify(TWPU_lang) + ";";
document.getElementsByTagName('head')[0].appendChild(twpulpjs);