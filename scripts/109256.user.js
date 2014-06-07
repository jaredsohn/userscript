// ==UserScript==
// @name           Petee's Utilities Language Pack - PT-BR
// @namespace      http://userscripts.org/scripts/show/96584
// @description    **PT-BR** Language Pack for The West Petee's utilities - The Full Market Multisale Solution and Bank Fee Calculator
// @icon           http://img854.imageshack.us/img854/4797/iconcwalter.jpg
// @license        GNU Lesser General Public License (LGPL)
// @copyright      2011, Claudiney Walter (The-West BR8,BR10)
// @author         [Petee]
// @release        CWalter
// @include        http://*.the-west.*/game.php*
// @version        0.5.1.1
//
// @history        0.5.1.1|14/10/2011 Adicionada tradução para novas opções de redirecionamento de cidades e mapa
// @history        0.5|08/08/2011 Adicionada a tradução das novas funções da Versão 0.5
// @history        0.4.1.1|05/08/2011 Tradução Criada
// ==/UserScript==

//	do not translate...	|	|	translate the texts below
var TWPU_lang = {
	'error_already_loaded':		"Script já carregado, você provavelmente vai ter que desinstalar a versão anterior!",
	'error_atypical_function':	"Script não poderia modificar uma função do jogo, porque é atípico",
	'error_not_that_many':		"Não existem vários itens!",
	'error_code_load_failed':	"O script não foi capaz de carregar o código :-(... Por favor, informe em que mundo você joga e a versão de seu browser para Petee, no .net fóruns ou em Userscripts.org.",
	'made_by':			"Powered by",
	'translator_text':	     	"Tradutor",
	'repeat_sale':		    	"Repetir esta venda",
	'repeat_sale_extra':		"Repita este mesmo leilão o número especificado de vezes.",
	'repeat_bid':			"Repita este lance",
	'disable_grouping':		"Clique para desativar o Recurso de Agrupamento",
	'reload':			"Atualizar os Dados",
	'max_price':		     	"Compra Instantânea",
	'walkthere':			"Andar até lá",
	'centermap':	    		"Centralizar Mapa",
	'count':			"Contar",
	'lang':				"Português",
	'translator_name':	    	"CWalter" // yes, put your own nick here
};

var twpulpjs = document.createElement('script');
twpulpjs.setAttribute('type', 'text/javascript');
twpulpjs.setAttribute('language', 'javascript'); 
twpulpjs.setAttribute('id', 'TWPU_LP_js');
twpulpjs.innerHTML = "if(typeof TWPU=='undefined') TWPU = {};"
	+ "TWPU.lang_pack = " + JSON.stringify(TWPU_lang) + ";";
document.getElementsByTagName('head')[0].appendChild(twpulpjs);