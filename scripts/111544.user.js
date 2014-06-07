// ==UserScript==
// @name           The West Petee's utilities Language Pack - Russian - Русский
// @namespace      http://userscripts.org/scripts/show/96584
// @description    Russian language pack for The West Petee's utilities - the full market multisale solution and bank fee calculator
// @author         Nikitos-barbos
// @version        0.5
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

//	do not translate...	|	translate the texts below
var TWPU_lang = {  
        'error_already_loaded':     "Скрипт установлен, если возникают проблемы, удалите старую версию",  
        'error_atypical_function':  "Не удаётся изменить функцию, так как она необычна",  
        'error_not_that_many':      "Предметов больше нет",  
        'error_code_load_failed':   "Скрипту не удалось распознать код, свяжитесь с автором скрипта Petee(http://userscripts.org/users/Petee)",  
        'made_by':          "Автор:",  
        'translator_text':      "Перевод:",  
        'repeat_sale':          "Количество",  
        'repeat_sale_extra':        "Указывайте цену за 1 предмет, не за партию",  
        'repeat_bid':           "Количество",  
        'disable_grouping':     "Отключить группировку товара(товар будет отображаться поштучно)",  
        'reload':           "Обновить данные",  
        'max_price':            "Цена без торга",  
        'count':            "Количество",  
        'lang':             "Русский",  
        'translator_name':      "Nikitos-barbos" // yes, put your own nick here  
    };

var twpulpjs = document.createElement('script');
twpulpjs.setAttribute('type', 'text/javascript');
twpulpjs.setAttribute('language', 'javascript'); 
twpulpjs.setAttribute('id', 'TWPU_LP_js');
twpulpjs.innerHTML = "if(typeof TWPU=='undefined') TWPU = {};"
	+ "TWPU.lang_pack = " + JSON.stringify(TWPU_lang) + ";";
document.getElementsByTagName('head')[0].appendChild(twpulpjs);
