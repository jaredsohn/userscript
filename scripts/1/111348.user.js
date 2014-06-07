// ==UserScript==
// @name           The West Petee's utilities Language Pack - [Spanish] - [Español] by William Manney
// @namespace      http://userscripts.org/scripts/show/96584
// @description    [Spanish] Pack de lenguanje para The West Petee's utilities - Solución total para multicompras en el mercado y calculador de intereses bancarios.
// @author         [William Manney]
// @version        0.5.1.1
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

//	do not translate...	|	translate the texts below
var TWPU_lang = {
	'error_already_loaded':		"Script cargado, deberías desinstalar la versión anterior!",
	'error_atypical_function':	"El script no puede modificar la función, porque es atípica",
	'error_not_that_many':		"No hay ningún artículo!",
	'error_code_load_failed':	"El script no pudo cargarse :-(... Por favor reporta tu mundo de juego y la versión de tu navegador a Petee en los foros .net o en userscripts.org.",
	'made_by':			"Realizado por",
	'translator_text':		"Traductor",
	'repeat_sale':			"Repetir esta venta",
	'repeat_sale_extra':		"Repetir la misma subasta el numero de veces especificado",
	'repeat_bid':			"Repetir esta oferta",
	'disable_grouping':		"Desactivar la característica Agrupar",
	'reload':			"Actualizar datos",
	'max_price':			"Compra Inmediata",
	'count':			"Nº Items",
        'walkthere':			"Caminar hasta allí",
	'centermap':			"Centrar el mapa", 
	'lang':				"Spanish",
	'translator_name':		"William Manney" 
};

var twpulpjs = document.createElement('script');
twpulpjs.setAttribute('type', 'text/javascript');
twpulpjs.setAttribute('language', 'javascript'); 
twpulpjs.setAttribute('id', 'TWPU_LP_js');
twpulpjs.innerHTML = "if(typeof TWPU=='undefined') TWPU = {};"
	+ "TWPU.lang_pack = " + JSON.stringify(TWPU_lang) + ";";
document.getElementsByTagName('head')[0].appendChild(twpulpjs);