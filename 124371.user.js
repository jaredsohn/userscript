// ==UserScript==
// @name           The West Petee's utilities Language Pack - [PT-BR] - [ Português - Brasil ] by Glaubert Dumpierre
// @namespace      http://userscripts.org/scripts/show/96584
// @description    [PT-BR] Pacote de linguagem para The West Petee's utilities
// @author         [Glaubert Dumpierre]
// @version        0.1
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

var TWPU_lang = {
	'error_already_loaded':		"Script carregadp, deveria remover a versão anterior!",
	'error_atypical_function':	"El script no puede modificar la función, porque es atípica",
	'error_not_that_many':		"No hay ningún artículo!",
	'error_code_load_failed':	"El script no pudo cargarse :-(... Por favor reporta tu mundo de juego y la versión de tu navegador a Petee en los foros .net o en userscripts.org.",
	'made_by':			"Realizado por",
	'translator_text':		"Traductor",
	'repeat_sale':			"Repetir a venda",
	'repeat_sale_extra':		"Repetir a venda quantas vezes?",
	'repeat_bid':			"Repetir a oferta",
	'disable_grouping':		"Desativar agrupramento",
	'reload':			"Atuazar os dados",
	'max_price':			"Compra imediata",
	'count':			"Quantos itens?",
        'walkthere':			"Caminhar até aqui",
	'centermap':			"Mostrar no mapa", 
	'lang':				"PT-BR",
	'translator_name':		"Glaubert Dumpierre" 
};

var twpulpjs = document.createElement('script');
twpulpjs.setAttribute('type', 'text/javascript');
twpulpjs.setAttribute('language', 'javascript'); 
twpulpjs.setAttribute('id', 'TWPU_LP_js');
twpulpjs.innerHTML = "if(typeof TWPU=='undefined') TWPU = {};"
	+ "TWPU.lang_pack = " + JSON.stringify(TWPU_lang) + ";";
document.getElementsByTagName('head')[0].appendChild(twpulpjs);