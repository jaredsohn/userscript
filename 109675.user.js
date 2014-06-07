// ==UserScript==
// @name           The West Petee's utilities Language Pack - [Hungarian] - [Magyar]
// @namespace      http://userscripts.org/scripts/show/96584
// @description    [Hungarian] language pack for The West Petee's utilities - the full market multisale solution and bank fee calculator/ Magyar nyelvcsomag a Petee eszközök nevű szkripthez - együttes eladás, átvétel és banki adó számolás
// @author         [laccy]
// @version        0.5
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

//	do not translate...	|	translate the texts below
var TWPU_lang = {
	'error_already_loaded':		"A szkript már hbe volt töltve, valószínűleg le kell telepítsd a régebbi verziót!",
	'error_atypical_function':	"A szkript nem tud módosítani egy funkciót mert az eltér a megszokottól",
	'error_not_that_many':		"Nincs annyi tárgy!",
	'error_code_load_failed':	"A szkript nem tudta betölteni a kódját :-(... Kérlek jelentsd a világot és a böngésződ típusát Peete-nek a .net fórumon vagy az userscripts.org oldalán.",
	'made_by':			"Készítette",
	'translator_text':		"Fordította",
	'repeat_sale':			"Ismétlés ennyiszer",
	'repeat_sale_extra':		"Ismételje meg ezt az aukciót annyiszor, amennyi megadott szám",
	'repeat_bid':			"Ismételje az ajánlatot",
	'disable_grouping':		"Kattints hogy deaktiválja a csoportosítás funkciót",
	'reload':			"Adatok újratöltése",
	'max_price':			"Instant vásárlás",
	'count':			"Mennyiség",
	'lang':				"Magyar",
	'translator_name':		"laccy" // yes, put your own nick here
};

var twpulpjs = document.createElement('script');
twpulpjs.setAttribute('type', 'text/javascript');
twpulpjs.setAttribute('language', 'javascript'); 
twpulpjs.setAttribute('id', 'TWPU_LP_js');
twpulpjs.innerHTML = "if(typeof TWPU=='undefined') TWPU = {};"
	+ "TWPU.lang_pack = " + JSON.stringify(TWPU_lang) + ";";
document.getElementsByTagName('head')[0].appendChild(twpulpjs);