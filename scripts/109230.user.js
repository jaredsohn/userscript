// ==UserScript==
// @name           The West Petee's utilities Language Pack - [Your language in English] - [Your language, in your language :)]
// @namespace      http://userscripts.org/scripts/show/96584
// @description    [Your language] language pack for The West Petee's utilities - the full market multisale solution and bank fee calculator
// @author         [Petee]
// @version        0.5
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

//			do not translate...	|	translate the texts below
var TWPU_lang = {
			'error_already_loaded':		"Script already loaded, you'll probably have to uninstall the older version!",
			'error_atypical_function':	"Script could not modify a function, because it's atypical",
			'error_not_that_many':		"There are not that many items!",
			'error_code_load_failed':	"The script was not able to load it's code :-(... Please, report this game world and your browser version to Petee on .net forums or at userscripts.org.",
			'made_by':			"Made by",
			'translator_text':		"Translator",
			'repeat_sale':			"Repeat this sale",
			'repeat_sale_extra':		"Repeat this same auction the specified number of times.",
			'repeat_bid':			"Repeat this bid",
			'disable_grouping':		"Click to disable the grouping feature",
			'reload':			"Reload the data",
			'max_price':			"Instant buy",
			'count':			"Count",
			'walkthere':			"Walk there",
			'centermap':			"Center map",
			'lang':				"English",
			'translator_name':		"Petee" // yes, put your own nick here
		};

var twpulpjs = document.createElement('script');
twpulpjs.setAttribute('type', 'text/javascript');
twpulpjs.setAttribute('language', 'javascript'); 
twpulpjs.setAttribute('id', 'TWPU_LP_js');
twpulpjs.innerHTML = "if(typeof TWPU=='undefined') TWPU = {};"
	+ "TWPU.lang_pack = " + JSON.stringify(TWPU_lang) + ";";
document.getElementsByTagName('head')[0].appendChild(twpulpjs);