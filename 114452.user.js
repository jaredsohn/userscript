// ==UserScript==
// @name           The West Petee's utilities Language Pack - Finnish - Suomi
// @namespace      http://userscripts.org/scripts/show/96584
// @description    Finnish language pack for The West Petee's utilities - the full market multisale solution and bank fee calculator
// @author         Block1312
// @version        0.5.1
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

//	do not translate...	|	translate the texts below
var TWPU_lang = {
	'error_already_loaded':		"Ohjelma on jo ladannut, sinun pitää todennäköisesti poistaa vanhempi versio, jotta uudempi toimisi!",
	'error_atypical_function':	"Ohjelma ei voinut muokata tarkoitusta,koska se on vieras",
	'error_not_that_many':		"Sinulla ei ole niin monta tavaraa!",
	'error_code_load_failed':	"Tämä ohjelma ei voinut ladata sen koodausta. :( Voisitko ilmoittaa sinun maailmasi ja selaimesi tarkan version joko Petee on .net forums tai userscripts.org.",
	'made_by':			"Tekijä on",
	'translator_text':		"Kääntäjä",
	'repeat_sale':			"Toista tämä tarjous",
	'repeat_sale_extra':		"Toista tämä kauppa tietty määrä kertoja",
	'repeat_bid':			"Toista tämä huuto",
	'disable_grouping':		"Paina poistaaksesi ryhmistys toiminto käytöstä",
	'reload':			"lataa tieto uudelleen",
	'max_price':			"välitön ostos",
	'count':			"määrä",
	'walkthere':			"kävele sinne",
	'centermap':			"keskitä kartta",
        'lang':				"Suomi",
	'translator_name':		"Block1312"
};

var twpulpjs = document.createElement('script');
twpulpjs.setAttribute('type', 'text/javascript');
twpulpjs.setAttribute('language', 'javascript'); 
twpulpjs.setAttribute('id', 'TWPU_LP_js');
twpulpjs.innerHTML = "if(typeof TWPU=='undefined') TWPU = {};"
	+ "TWPU.lang_pack = " + JSON.stringify(TWPU_lang) + ";";
document.getElementsByTagName('head')[0].appendChild(twpulpjs);