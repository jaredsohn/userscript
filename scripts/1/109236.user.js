// ==UserScript==
// @name           The West Petee's utilities Language Pack - Slovak - Slovensky
// @namespace      http://forum.the-west.net/member.php?u=16928
// @description    Slovenský jazykový balík pre The West Petee's utilities - kompletné riešenie viacnásobného predaja na trhu a kalkulátor bankových poplatkov
// @author         Petee
// @version        0.5.1
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

//	do not translate...	|	translate the texts below
var TWPU_lang = {
	'error_already_loaded':		"Script už je načítaný, zrejme budete musieť odinštalovať staršiu verziu!",
	'error_atypical_function':	"Script nemohol upraviť hernú funkciu, keďže je atypická",
	'error_not_that_many':		"Až toľko vecí tam nie je!",
	'error_code_load_failed':	"Scriptu sa nepodarilo správne načítať jeho kód :-(... Prosím, oznámte váš svet a verziu vášho prehliadača Peteemu na .sk, .net fórach alebo na userscripts.org.",
	'made_by':					"Autor: ",
	'translator_text':		"Prekladateľ",
	'repeat_sale':				"Opakovať tento predaj",
	'repeat_sale_extra':		"Opakuj takýto istý predaj zadaný počet krát.",
	'repeat_bid':				"Opakovať túto ponuku",
	'disable_grouping':		"Klikni sem pre vypnutie funkcie zoskupovania",
	'reload':			"Znovu načítať dáta",
	'max_price':			"Okamžitá kúpa",
	'count':					"Počet",
	'walkthere':			"Ísť tam",
	'centermap':			"Ukázať na mape",
	'lang':						"Slovensky",
	'translator_name':			"Petee"
};

var twpulpjs = document.createElement('script');
twpulpjs.setAttribute('type', 'text/javascript');
twpulpjs.setAttribute('language', 'javascript'); 
twpulpjs.setAttribute('id', 'TWPU_LP_js');
twpulpjs.innerHTML = "if(typeof TWPU=='undefined') TWPU = {};"
	+ "TWPU.lang_pack = " + JSON.stringify(TWPU_lang) + ";";
document.getElementsByTagName('head')[0].appendChild(twpulpjs);