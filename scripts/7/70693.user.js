// HabraImprover.rich v1.5 alpha
// 2009-07-28
// Copyright (c) 2008-2009 Nikita Kovaliov
// http://dev.maizy.ru, http://nikita.habrahabr.ru/
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html


// ==UserScript==
// @name           HabraImprover.rich v1.5 alpha
// @namespace      http://userscripts.org/users/62694
// @description    Makes habrahabr.ru more usefull (IMHO).
// @include        http://*.habrahabr.ru/*
// @include        http://habrahabr.ru/*
// ==/UserScript==

/* TODO LIST 
	- навигация в "новых топиках"
	- смешать новые и захабренные и все вместе с навигацией
	- автоопределение кармы (но только чтобы с кэшем, а не отдельный запрос каждый раз)

*/
var opts = {

	//возможности
	features: {
		habracutExpander: true	// развёртование топиков без перехода к странице (через AJAX)
	}, 
	//скрытие элементов
	hide: {
		ads: true 				// скрывать блоки с рекламой
	}

};




// ------------------------------------
// Maizy Greasemonkey Lib
// v0.1
//
var gmLib = {};

/**
 * Global id prefix
 */
gmLib.prefix = '__maizy_';


//-- Compatibility functions --
gmLib.Compatibility = {};

/**
 * Get real window object
 * @return {Object}
 */
gmLib.Compatibility.getWindow = function () {
	if (typeof unsafeWindow != 'undefined') {
		return unsafeWindow;
	}
	return window;
};

/**
 * Run with Jquery
 * ATTENTION: black magic
 */
gmLib.runWithJquery = function (feedBack) {
	//@todo - check avalable jQuery
	var startLoad = false;
	var dollarBefore = unsafeWindow.$;
    (function loadJquery() {
    	
        if(typeof unsafeWindow.jQuery == 'undefined') 
        { 
        	if (!startLoad) {
				startLoad = true;
				var jQueryScript = document.createElement('script');
				jQueryScript.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
				jQueryScript.type = 'text/javascript';
				document.getElementsByTagName('head')[0].appendChild(jQueryScript);
            }
            
            unsafeWindow.setTimeout(loadJquery,100);
        } else { 
        	unsafeWindow.jQuery.noConflict(); //work with other js libraries
        	unsafeWindow.$ = dollarBefore;
	    	$ = unsafeWindow.jQuery; 
	    	feedBack.apply();
    	}
    })();
};

//-- Utils --
gmLib.Utils = {};

/**
 * Debug type
 * 
 * TODO: 'div'	 - abs div
 */
gmLib.Utils.debugType = false;
//gmLib.Utils.debugType = 'firebug';  // firebug console
//gmLib.Utils.debugType = 'alert';    // alert function

gmLib.Utils.debug = function(variable, label) {
	if (gmLib.Utils.debugType == 'firebug') {
		var wind = gmLib.Compatibility.getWindow();
		if (typeof wind.console !== 'undefined') {
			wind.console.debug.apply(null,arguments);
		}
		
	} else if (gmLib.Utils.debugType == 'alert') {
		var alertText = '';
		
		if (typeof label != 'undefined') {
			alertText += '['+label+']:\n';
		}
		alertText += gmLib.Utils.dump(variable);
		alert(alertText);
	}
};

/**
 * Dump function
 * 
 * @param arr - variable
 * @param level - max dump level
 * 
 * Based on http://binnyva.blogspot.com/2005/10/dump-function-javascript-equivalent-of.html
 */
gmLib.Utils.dump = function (arr, maxLevel, level) {
	var res = "";
	if(typeof level == 'undefined') {
		level = 0;
	}
	maxLevel = maxLevel || 5;
	if (level > maxLevel) {
		return '';
	}
	var padding = '';
	for(var j=0;j<level+1;j++) {
		padding += '   ';
	}
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects
		for(var key in arr) {
			var value = arr[key];
	
			if(typeof(value) == 'object') { //If it is an array,
				res += padding + '\'' + key + '\' ...\n';
				res += gmLib.Utils.dump(value, maxLevel, level+1);
			} else {
				res += padding + '\'' + key + '\' => ' + gmLib.Utils.dump(value) + '\n';
			}
		}
	} else { //Stings/Chars/Numbers etc.
		res = '"'+arr+'" ('+(typeof arr)+')';
	}
	return res;
}; 

gmLib.debug = gmLib.Utils.debug; //alias

// -- Traversing --
gmLib.Trv = {};

/**
 * @param {Integer} deepLevel
 * @return {jQuery|undefined}
 * 
 * (jQuery required)
 */
gmLib.Trv.getParent = function(object, deepLevel) {
	deepLevel = deepLevel || 1;
	var p = object;
	while(deepLevel > 0) {
		deepLevel -= 1;
		p = p.parent();
		if (!p) {
			break;
		}
	}
	
	if (deepLevel == 0 && p) {
		return p;
	}
	return undefined;
};

// -- Application object --
/**
 * @param {Object} opts
 * @constructor
 */
gmLib.Application = function(opts) {
	this._opts = opts;
	
	this._init();
};

/**
 * Run Application
 */
gmLib.Application.prototype.dispatch = function() {
	var self = this;
	gmLib.runWithJquery(function() {
		self._run();
	});
};

/**
 * Application Opts
 * @return {Object}
 */
gmLib.Application.prototype.getOpts = function() {
	return this._opts;
};

/**
 * Init
 */
gmLib.Application.prototype._init = function() {};

/**
 * Run application (abstract method)
 * 
 * You can use jQuery here.
 */
gmLib.Application.prototype._run = function() {
	throw 'Abstract method';
};


// ------------------------------------



// ------------------------------------
// HabraImprover
// v1.5 beta
//


var habraImprover = new gmLib.Application(opts);
habraImprover._run = function() {
	var self = this;
	gmLib.Utils.debugType = 'firebug';
	//скрываем всё лишнее	
	this.hide();
	
	//активируем фичи
	this.addFeatures();

};

/**
 * Скрываем различные части страницы
 */
habraImprover.hide = function() {
	if (this.getOpts().hide) {
	
		// реклама
		if (this.getOpts().hide.ads) {			
			//simple banner
			$('a[href*=madbanner\.ru]').hide();
			$('a[href*=imho\.ru]').hide();
			
			//flash banner
			$('object param[name=movie][value*=madbanner\.ru]').parent().hide();
			$('iframe[src*=imho\.ru]').hide();
	
			
			//right
			
			$('div.banner').hide();
		}
	}
};


/**
 * Добавляем фичи
 */
habraImprover.addFeatures = function() {
	if (this.getOpts().features) {
		
		//разворачивание топиков через AJAX
		if (this.getOpts().features.habracutExpander) {
			this.habracutExpander();
		}
	}
};





// -- Модуль: Разворачивание топиков, без перехода --

/**
 * Добавление хуков
 */
habraImprover.habracutExpander = function() {
	var self = this;
	var module = this.habracutExpander;
	var links = $('a.habracut');
	//клик по кату
	links.click(function(){ return module.linkClick($(this));}).css('cursor', 's-resize');
	
	//доп. ссылка в топике
	$.each(links, function(index, link) {
		link = $(link);
		
		//развернуть
		var div1 = $('<div>').addClass(gmLib.prefix+'expand');
		var expand = $('<a>').text('развернуть').css({color: '#555', cursor: 's-resize'});
		expand.click(function(){return module.linkClick(link); });
		div1.append(expand);
		
		var topic = gmLib.Trv.getParent(link, 3);
		self._appendToTopicBar(topic, div1);
	});
};

/**
 * Открыть топик
 * 
 * @param {jQuery} link
 * @return {Boolean}
 */
habraImprover.habracutExpander.linkClick = function(link) {
	var url = link.attr('href');
	var app = habraImprover;
	var topic = gmLib.Trv.getParent(link, 3);
	//иконка загрузки
	var div = $('<div>').addClass(gmLib.prefix+'load').append(
			$('<img src="'+app.media.load+'">').css('margin-top', '2px')
	);
	//заменяем текст "развернуть"
	$('.'+gmLib.prefix+'expand', topic).replaceWith(div);
	
	var content = gmLib.Trv.getParent(link, 2); //link -> div wrapper -> div.content
	if (content) {
		//загружаем и вынимаем нужное содержание
		var tmpCont = $('<div>');
		tmpCont.load(url+' div.content:first', null, function() {
			content.replaceWith($('div.content', tmpCont));
			$('.'+gmLib.prefix+'load', topic).remove();
		});
	} else {
		$('.'+gmLib.prefix+'load', topic).css('color', 'red').text('Упс! Что-то не то :(');
	}
	return false;
};

/**
 * Добавить что-то в строку топика
 * @param {jQuery} topic
 * @param {jQuery} element
 * @return {jQuery}
 */
habraImprover._appendToTopicBar = function(topic, element) {
	return $('.entry-info-wrap', topic).append(element);
};

/**
 * Медиа файлы
 */
habraImprover.media = {};
//картинка загрузки
habraImprover.media.load = 'data:image/gif;base64,R0lGODlhEAAQAPQAAP%2F%2F%2FwAAAPj4%2BDg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbGxkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla%2BKIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK%2Bo2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC%2B0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU%2FNXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK%2BkCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm%2F4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg%2BboUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC%2BRAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA%3D%3D';

//-- / Модуль--




habraImprover.dispatch();