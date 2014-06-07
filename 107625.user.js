// ==UserScript==
// @namespace       heroeswm
// @name            HWM Autologin
// @description     Автоматический вход со стартовой страницы.
// @version         2.6.9
// @include         http://www.heroeswm.ru/
// @include         http://www.heroeswm.ru/index.php
// @include         http://www.heroeswm.ru/home.php
// @require         http://code.jquery.com/jquery.min.js
// ==/UserScript==


/*
 * JQuery URL Parser plugin, v2.2.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */ 

;(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD available; use anonymous module
		if ( typeof jQuery !== 'undefined' ) {
			define(['jquery'], factory);	
		} else {
			define([], factory);
		}
	} else {
		// No AMD available; mutate global vars
		if ( typeof jQuery !== 'undefined' ) {
			factory(jQuery);
		} else {
			factory();
		}
	}
})(function($, undefined) {
	
	var tag2attr = {
			a       : 'href',
			img     : 'src',
			form    : 'action',
			base    : 'href',
			script  : 'src',
			iframe  : 'src',
			link    : 'href'
		},
		
		key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], // keys available to query
		
		aliases = { 'anchor' : 'fragment' }, // aliases for backwards compatability
		
		parser = {
			strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
			loose :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
		},
		
		toString = Object.prototype.toString,
		
		isint = /^[0-9]+$/;
	
	function parseUri( url, strictMode ) {
		var str = decodeURI( url ),
		res   = parser[ strictMode || false ? 'strict' : 'loose' ].exec( str ),
		uri = { attr : {}, param : {}, seg : {} },
		i   = 14;
		
		while ( i-- ) {
			uri.attr[ key[i] ] = res[i] || '';
		}
		
		// build query and fragment parameters		
		uri.param['query'] = parseString(uri.attr['query']);
		uri.param['fragment'] = parseString(uri.attr['fragment']);
		
		// split path and fragement into segments		
		uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/');     
		uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/');
		
		// compile a 'base' domain attribute        
		uri.attr['base'] = uri.attr.host ? (uri.attr.protocol ?  uri.attr.protocol+'://'+uri.attr.host : uri.attr.host) + (uri.attr.port ? ':'+uri.attr.port : '') : '';      
		  
		return uri;
	};
	
	function getAttrName( elm ) {
		var tn = elm.tagName;
		if ( typeof tn !== 'undefined' ) return tag2attr[tn.toLowerCase()];
		return tn;
	}
	
	function promote(parent, key) {
		if (parent[key].length == 0) return parent[key] = {};
		var t = {};
		for (var i in parent[key]) t[i] = parent[key][i];
		parent[key] = t;
		return t;
	}

	function parse(parts, parent, key, val) {
		var part = parts.shift();
		if (!part) {
			if (isArray(parent[key])) {
				parent[key].push(val);
			} else if ('object' == typeof parent[key]) {
				parent[key] = val;
			} else if ('undefined' == typeof parent[key]) {
				parent[key] = val;
			} else {
				parent[key] = [parent[key], val];
			}
		} else {
			var obj = parent[key] = parent[key] || [];
			if (']' == part) {
				if (isArray(obj)) {
					if ('' != val) obj.push(val);
				} else if ('object' == typeof obj) {
					obj[keys(obj).length] = val;
				} else {
					obj = parent[key] = [parent[key], val];
				}
			} else if (~part.indexOf(']')) {
				part = part.substr(0, part.length - 1);
				if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
				parse(parts, obj, part, val);
				// key
			} else {
				if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
				parse(parts, obj, part, val);
			}
		}
	}

	function merge(parent, key, val) {
		if (~key.indexOf(']')) {
			var parts = key.split('['),
			len = parts.length,
			last = len - 1;
			parse(parts, parent, 'base', val);
		} else {
			if (!isint.test(key) && isArray(parent.base)) {
				var t = {};
				for (var k in parent.base) t[k] = parent.base[k];
				parent.base = t;
			}
			set(parent.base, key, val);
		}
		return parent;
	}

	function parseString(str) {
		return reduce(String(str).split(/&|;/), function(ret, pair) {
			try {
				pair = decodeURIComponent(pair.replace(/\+/g, ' '));
			} catch(e) {
				// ignore
			}
			var eql = pair.indexOf('='),
				brace = lastBraceInKey(pair),
				key = pair.substr(0, brace || eql),
				val = pair.substr(brace || eql, pair.length),
				val = val.substr(val.indexOf('=') + 1, val.length);

			if ('' == key) key = pair, val = '';

			return merge(ret, key, val);
		}, { base: {} }).base;
	}
	
	function set(obj, key, val) {
		var v = obj[key];
		if (undefined === v) {
			obj[key] = val;
		} else if (isArray(v)) {
			v.push(val);
		} else {
			obj[key] = [v, val];
		}
	}
	
	function lastBraceInKey(str) {
		var len = str.length,
			 brace, c;
		for (var i = 0; i < len; ++i) {
			c = str[i];
			if (']' == c) brace = false;
			if ('[' == c) brace = true;
			if ('=' == c && !brace) return i;
		}
	}
	
	function reduce(obj, accumulator){
		var i = 0,
			l = obj.length >> 0,
			curr = arguments[2];
		while (i < l) {
			if (i in obj) curr = accumulator.call(undefined, curr, obj[i], i, obj);
			++i;
		}
		return curr;
	}
	
	function isArray(vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	}
	
	function keys(obj) {
		var keys = [];
		for ( prop in obj ) {
			if ( obj.hasOwnProperty(prop) ) keys.push(prop);
		}
		return keys;
	}
		
	function purl( url, strictMode ) {
		if ( arguments.length === 1 && url === true ) {
			strictMode = true;
			url = undefined;
		}
		strictMode = strictMode || false;
		url = url || window.location.toString();
	
		return {
			
			data : parseUri(url, strictMode),
			
			// get various attributes from the URI
			attr : function( attr ) {
				attr = aliases[attr] || attr;
				return typeof attr !== 'undefined' ? this.data.attr[attr] : this.data.attr;
			},
			
			// return query string parameters
			param : function( param ) {
				return typeof param !== 'undefined' ? this.data.param.query[param] : this.data.param.query;
			},
			
			// return fragment parameters
			fparam : function( param ) {
				return typeof param !== 'undefined' ? this.data.param.fragment[param] : this.data.param.fragment;
			},
			
			// return path segments
			segment : function( seg ) {
				if ( typeof seg === 'undefined' ) {
					return this.data.seg.path;
				} else {
					seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
					return this.data.seg.path[seg];                    
				}
			},
			
			// return fragment segments
			fsegment : function( seg ) {
				if ( typeof seg === 'undefined' ) {
					return this.data.seg.fragment;                    
				} else {
					seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
					return this.data.seg.fragment[seg];                    
				}
			}
	    	
		};
	
	};
	
	if ( typeof $ !== 'undefined' ) {
		
		$.fn.url = function( strictMode ) {
			var url = '';
			if ( this.length ) {
				url = $(this).attr( getAttrName(this[0]) ) || '';
			}    
			return purl( url, strictMode );
		};
		
		$.url = purl;
		
	} else {
		window.purl = purl;
	}

});





/** Библиотека строк
*
* Реализует функции работы со строками.
*
* @file libString.js
* @version 2.1.1
* @author hotamateurxxx
* @link http://userscripts.org/users/362572
* @license GPL
*/


/** Возвращает символ в юникоде
* @param String s
* @return String
*/
function uchar(s) {
    switch (s[0]) {
        case 'А': return '\u0410';
        case 'Б': return '\u0411';
        case 'В': return '\u0412';
        case 'Г': return '\u0413';
        case 'Д': return '\u0414';
        case 'Е': return '\u0415';
        case 'Ж': return '\u0416';
        case 'З': return '\u0417';
        case 'И': return '\u0418';
        case 'Й': return '\u0419';
        case 'К': return '\u041a';
        case 'Л': return '\u041b';
        case 'М': return '\u041c';
        case 'Н': return '\u041d';
        case 'О': return '\u041e';
        case 'П': return '\u041f';
        case 'Р': return '\u0420';
        case 'С': return '\u0421';
        case 'Т': return '\u0422';
        case 'У': return '\u0423';
        case 'Ф': return '\u0424';
        case 'Х': return '\u0425';
        case 'Ц': return '\u0426';
        case 'Ч': return '\u0427';
        case 'Ш': return '\u0428';
        case 'Щ': return '\u0429';
        case 'Ъ': return '\u042a';
        case 'Ы': return '\u042b';
        case 'Ь': return '\u042c';
        case 'Э': return '\u042d';
        case 'Ю': return '\u042e';
        case 'Я': return '\u042f';
        case 'а': return '\u0430';
        case 'б': return '\u0431';
        case 'в': return '\u0432';
        case 'г': return '\u0433';
        case 'д': return '\u0434';
        case 'е': return '\u0435';
        case 'ж': return '\u0436';
        case 'з': return '\u0437';
        case 'и': return '\u0438';
        case 'й': return '\u0439';
        case 'к': return '\u043a';
        case 'л': return '\u043b';
        case 'м': return '\u043c';
        case 'н': return '\u043d';
        case 'о': return '\u043e';
        case 'п': return '\u043f';
        case 'р': return '\u0440';
        case 'с': return '\u0441';
        case 'т': return '\u0442';
        case 'у': return '\u0443';
        case 'ф': return '\u0444';
        case 'х': return '\u0445';
        case 'ц': return '\u0446';
        case 'ч': return '\u0447';
        case 'ш': return '\u0448';
        case 'щ': return '\u0449';
        case 'ъ': return '\u044a';
        case 'ы': return '\u044b';
        case 'ь': return '\u044c';
        case 'э': return '\u044d';
        case 'ю': return '\u044e';
        case 'я': return '\u044f';
        case 'Ё': return '\u0401';
        case 'ё': return '\u0451';
        default: return s[0];
    }
}


/** Возвращает строку в юникоде
* @param String s
* @return String
*/
function ustring(s) {
    s = String(s);
    var result = '';
    for (var i = 0; i < s.length; i++)
        result += uchar(s[i]);
    return result;
}


/** Строковое представление
* @param Object obj
* @return String
*/
function toStr(object) {
    if (object === undefined)
        return 'undefined';
    if (object === null)
        return 'null';
    return String(object);
}


/** Усечение по краям
* @param String str
* @param String charlist
* @return String
*/
function trim(str, charlist) {
    charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
    return str.replace(re, '');
}


/** Форматированная строка
* @param String text
* @param Number length
* @param String align
* @return String
*/
function formString(text, length, align) {
    var result = toStr(text);
    while (result.length < length)
        switch (align) {
            case 'right':
                result = ' ' + result;
                break;
            case 'center':
                result = ' ' + result + ' ';
                break;
            default:
                result = result + ' ';
        }
    return (result);
}


/** Записи в строке
* @param Array records
* @param Array aligns
* @param Boolean border
* @return String
*/
function recordsStr(records, aligns, border) {
    
    if ((records === undefined) || (records.length === 0))
        return '';
    
    // Выравнивания
    if (aligns === undefined)
        aligns = [];
    
    // Ширина колонок
    var lengths = [];
    for (var j = 0; j < records[0].length; j++)
        lengths[j] = 0;
    for (var i = 0; i < records.length; i++)
        for (var j = 0; j < records[i].length; j++)
            lengths[j] = Math.max(lengths[j], toStr(records[i][j]).length);
    
    // Результирующая строка
    var str = '';
    for (var i = 0; i < records.length; i++) {
        str += (i == 0) ? '' : '\n';
        for (var j = 0; j < records[i].length; j++) {
            str += formString(records[i][j], lengths[j], aligns[j]) + ' ';
        }
    }
    
    // Возврат результата
    return str;
    
}


/** Колонки в строке
* @param Array columns
* @param Array aligns
* @param Boolean border
* @return String
*/
function columnsStr(columns, aligns, border) {
    
    if ((columns === undefined) || (columns.length === 0))
        return '';
    
    // Выравнивания
    if (aligns === undefined)
        aligns = [];
    
    // Ширина колонок
    var lengths = [];
    for (var j = 0; j < columns.length; j++)
        lengths[j] = 0;
    for (var j = 0; j < columns.length; j++)
        for (var i = 0; i < columns[j].length; i++)
            lengths[j] = Math.max(lengths[j], toStr(columns[j][i]).length);
    
    // Результирующая строка
    var str = '';
    for (var i = 0; i < columns[0].length; i++) {
        str += (i == 0) ? '' : '\n';
        for (var j = 0; j < columns.length; j++)
            str += formString(columns[j][i], lengths[j], aligns[j]) + ' ';
    }
    
    // Возврат результата
    return str;
    
}


/** Объекты в строке
* @param Array objescts
* @param Object aligns
* @param Boolean border
* @return String
*/
function objectsStr(objescts, aligns, border) {
    
    if ((objescts === undefined) || (objescts.length === 0))
        return '';
    
    // Выравнивания
    if (aligns === undefined)
        aligns = [];
    
    // Ширина колонок
    var lengths = [];
    for (var j in objescts[0])
        lengths[j] = 0;
    for (var i = 0; i < objescts.length; i++)
        for (var j in objescts[i])
            lengths[j] = Math.max(lengths[j], toStr(objescts[i][j]).length);
    
    // Результирующая строка
    var str = '';
    for (var i = 0; i < objescts.length; i++) {
        str += (i == 0) ? '' : '\n';
        for (var j in objescts[i])
            str += formString(objescts[i][j], lengths[j], aligns[j]) + ' ';
    }
    
    // Возврат результата
    return str;
    
}



/** Функции работы со временем
*
* @file libTime.js
* @version 1.0.3
* @author hotamateurxxx
* @license GPL
*/


/** Строка текущего времени
* @param Number time
* @return String
*/
function getTimeStr(time) { 
    return (new Date(time)).toLocaleTimeString(); 
}


/**
*/
function Time() {}


/** Строка времени
* @param Date time
* @return String
*/
Time.toString = function(time) {
    time = (time === undefined) ? (new Date()) : time;
    return (time).toLocaleTimeString(); 
}


/**
* @param Date time
* @return Number
*/
Time.toNumber = function(time) {
    time = (time === undefined) ? (new Date()) : time;
    return Math.floor(time.getTime() / 1000);
}


/**
* @param Number num
* @return Date
*/
Time.fromNumber = function(num) {
    return new Date(num * 1000);
}


/** Интервал времени строкой
* @param Number value Интервал в милисекундах
* @return String
*/
Time.delayString = function(value) {
    var sign = (value < 0) ? '-' : '';
    value = Math.abs(value);
    var unit = 'милисекунд';
    var divs = [
        {value: 1000, unit: 'секунд'},
        {value: 60, unit: 'минут'},
        {value: 60, unit: 'часов'},
        {value: 24, unit: 'суток'}
    ]
    var text = value.toFixed(1) + ' ' + unit;
    for (var i in divs) {
        if (value < divs[i].value)
            break;
        value = value / divs[i].value;
        unit = divs[i].unit;
        text = value.toFixed(1) + ' ' + unit;
    }
    return sign + text;
}



/** Оболочка пользовательских скриптов
*
* @file libUserScriptGUI.js
* @version 2.1.17
* @author hotamateurxxx
* @license GPL
*/


/** Оболочка пользовательских скриптов
* @param Document context
*/
function UserScriptGUI(context) {
    
    
    /** Разрешение конфликта имен для обработчиков
    * @var UserScriptGUI
    */
    var self = this;
    
    
    /** Документ
    * @var contextument
    */
    this.context = context;    
    
    
    /** Создание кнопки
    * @param Array path Путь
    * @param String title Заголовок
    * @param String desc Описание
    * @return jQuery
    */
    this.createMenuButton = function(path, title, desc) {
        //GM_log('UserScriptGUI.createMenuButton([' + path.join(', ') + '], ' + title + ', ' + desc +')');
        title = (title === undefined) ? path[path.length - 1] : title;
        desc = (desc === undefined) ? '' : desc;
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        var ppath = fpath.slice(0, fpath.length - 1);
        var pid = ppath.join('_');   
        if ($('#b' + fid, context).length === 0) {
            if (path.length > 1)
                this.createMenu(path.slice(0, path.length - 1));
            $('#m' + pid, context).append("<input id='b" + fid + "' type='button' value='" + title + "' title='" + desc + "'/>");
            $('#b' + fid, context).css({'display': 'block', 'width': '95%', 'border': 'solid 1px #999999', 'margin': '2px', 'padding': '1px', 'background': '#cccccc', 'font-size': '12px', 'cursor': 'pointer'});
            $('#b' + fid, context).hover(
                function(){ $('#b' + fid, context).css({'background': '#ccffcc'}); },
                function(){ 
                    $('#b' + fid, context).css({'background': '#cccccc'}); 
                    $('#b' + fid + '.Active', context).css({'background': '#ffffcc'}); 
                }
            );
            $('#b' + fid, context).addClass('Button');
        }
        return $('#b' + fid, context);
    }
    
    
    /** Создание меню
    * @param Array path Путь
    * @return jQuery
    */
    this.createMenu = function(path) {
        //GM_log('UserScriptGUI.createMenu([' + path.join(', ') + '])');
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        var ppath = fpath.slice(0, fpath.length - 1);
        var pid = ppath.join('_');        
        if ($('#m' + fid, context).length === 0) {
            $('#m' + pid, context).append("<div id='m" + fid + "'/>");
            $('#m' + fid, context).css({'position': 'fixed'});
            $('#m' + fid, context).hide();
            $('#b' + fid, context).click( function(){ self.toggleMenu(path); } );
            $('#m' + fid, context).addClass('Menu');
        }
        return $('#m' + fid, context);
    }
    
    
    /** Переключение меню
    * @param Array path Путь
    */
    this.toggleMenu = function(path) {
        //GM_log('UserScriptGUI.toggleMenu([' + path.join(', ') + '])');
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        var ppath = fpath.slice(0, fpath.length - 1);
        var pid = ppath.join('_');        
        var show = ($('#m' + fid, context).css('display') == 'none');
        $('#m' + pid + ' .Menu', context).hide();
        $('#m' + pid + ' .Button', context).css({'background': '#cccccc'}).removeClass('Active');
        if (show) {
            $('#m' + fid, context).show();
            $('#b' + fid, context).css({'background': '#ffffcc'}).addClass('Active');
        }
        var top = parseInt($('#m' + pid, context).css('top'));
        var right = parseInt($('#m' + pid, context).css('right'));
        var width = $('#b' + fid, context).width();
        $('#m' + fid, context).css({'top': top + 'px', 'right': right + width + 10 + 'px'});
    }
    
    
    /** Создание кнопки окна
    * @param Array path Путь
    * @param String title Заголовок
    * @param String desc Описание
    * @return jQuery
    */
    this.createWindowButton = function(path, title, desc) {
        //GM_log('UserScriptGUI.createWindowButton([' + path.join(', ') + '], ' + title + ', ' + desc +')');
        title = (title === undefined) ? path[path.length - 1] : title;
        desc = (desc === undefined) ? '' : desc;
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        var ppath = fpath.slice(0, fpath.length - 1);
        var pid = ppath.join('_');   
        if ($('#b' + fid, context).length === 0) {
            $('#w' + pid + ' .Footer', context).append("<input id='b" + fid + "' type='button' value='" + title + "' title='" + desc + "'/>");
            $('#b' + fid, context).css({'width': '80px', 'border': 'solid 1px #999999', 'margin': '2px', 'padding': '1px', 'background': '#cccccc', 'font-size': '12px', 'cursor': 'pointer', 'margin-left': '10px'});
            $('#b' + fid, context).hover(
                function(){ $('#b' + fid, context).css({'background': '#ccffcc'}); },
                function(){ 
                    $('#b' + fid, context).css({'background': '#cccccc'}); 
                    $('#b' + fid + '.Active', context).css({'background': '#ffffcc'}); 
                }
            );
            $('#b' + fid, context).addClass('Button');
        }
        return $('#b' + fid, context);
    }
    
    
    /** Создание опции в окне
    * @param Array path Путь
    * @param String title Заголовок
    * @param String desc Описание
    * @param String def По уиолчанию
    * @return jQuery
    */
    this.createWindowOption = function(path, title, desc, def) {
        //GM_log('UserScriptGUI.createWindowOption([' + path.join(', ') + '], ' + title + ', ' + desc +')');
        title = (title === undefined) ? path[path.length - 1] : title;
        desc = (desc === undefined) ? '' : desc;
        def = (def === undefined) ? '' : def;
        var name = path[path.length - 1];
        var value = GM_getValue(name, def);
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        var ppath = fpath.slice(0, fpath.length - 1);
        var pid = ppath.join('_');   
        if ($('#o' + fid, context).length === 0) {
            $('#w' + pid + ' .Body', context).append("<div class='Option' id='o" + fid + "' title='" + desc + "'><input type='text' name='" + name + "' value='" + value + "' def='" + def + "'/><b style='color: #000000;'>" + title + "</b></div>");
            $('#o' + fid + ' input', context).css({'width': '100px', 'border': 'solid 1px #999999', 'margin': '2px', 'padding': '1px', 'background': '#ffffff', 'font-size': '12px', 'color': '#000000', 'margin-right': '10px'});
            $('#o' + fid, context).addClass('Option');
        }
        return $('#o' + fid, context);
    }
        
    
    /** Создание опции в окне (логического типа)
    * @param Array path Путь
    * @param String title Заголовок
    * @param String desc Описание
    * @param Boolean def По уиолчанию
    * @return jQuery
    */
    this.createWindowOptionBool = function(path, title, desc, def) {
        //GM_log('UserScriptGUI.createWindowOption([' + path.join(', ') + '], ' + title + ', ' + desc +')');
        title = (title === undefined) ? path[path.length - 1] : title;
        desc = (desc === undefined) ? '' : desc;
        def = (def === undefined) ? false : def;
        var name = path[path.length - 1];
        var value = GM_getValue(name, def);
        var valueStr = value ? 'true' : 'false';
        var defStr = def ? 'true' : 'false';
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        var ppath = fpath.slice(0, fpath.length - 1);
        var pid = ppath.join('_');   
        //GM_log('path == [' + path.join(', ') + ']');
        //GM_log('fpath == [' + fpath.join(', ') + ']');
        //GM_log('ppath == [' + ppath.join(', ') + ']');
        if ($('#o' + fid, context).length === 0) {
            $('#w' + pid + ' .Body', context).append("<div class='OptionBool' id='o" + fid + "' title='" + desc + "'><input type='button' name='" + name + "' value='" + valueStr + "' def='" + defStr + "'/><b style='color: #000000;'>" + title + "</b></div>");
            $('#o' + fid + ' input', context).css({'width': '100px', 'color': '#000000', 'border': 'solid 1px #999999', 'margin': '2px', 'padding': '1px', 'background': '#cccccc', 'font-weight': 'bold', 'font-size': '12px', 'cursor': 'pointer', 'margin-right': '10px'});
            $('#o' + fid + ' input', context).click(function() {this.value = (this.value == 'true') ? 'false' : 'true';});
            $('#o' + fid, context).addClass('Option');
        }
        return $('#o' + fid, context);
    }
    
    
    /** Создание окна
    * @param Array path Путь
    * @param String title Заголовок
    * @param String content Содержание
    * @return jQuery
    */
    this.createWindow = function(path, title, content) {
        //GM_log('UserScriptGUI.createWindow([' + path.join(', ') + '], ' + title + ', ' + content + ')');
        title = (title === undefined) ? '' : title;
        content = (content === undefined) ? '' : content;        
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        var ppath = fpath.slice(0, fpath.length - 1);
        var pid = ppath.join('_');        
        if ($('#w' + fid, context).length === 0) {
            $('#wUserScriptGUI', context).append(
                "<div id='w" + fid + "'>" + 
                    "<div class='Header' style='font-weight: bold; font-size: 14px; margin-bottom: 10px;'>" + title + "</div>" + 
                    "<div class='Body' style='text-align: left; background: #ffffff;'>" + content + "</div>" + 
                    "<div class='Footer' style='text-align: right; margin-top: 10px;'></div>" + 
                "</div>"
            );
            $('#w' + fid, context).css({'position': 'fixed', 'border': 'solid 2px #666666', 'background': '#ffffff', 'text-align': 'center', 'font-size': '12px', 'color': '#000000', 'padding': '10px', 'width': '320px', 'top': '80px'});
            $('#w' + fid, context).hide();
            $('#w' + fid, context).addClass('Window');
        }
        return $('#w' + fid, context);
    }
    
    
    /** Создание окна описания
    * @param Array path Путь
    * @return jQuery
    */
    this.createWindowDesc = function(path, params) {
        var win = this.createWindow(path, 'Описание');
        // <col width='25%'/><col width='75%'/>
        $('#' + win.attr('id') + ' .Body', context).append("<table></table>");
        
        function createLink(link, title) {
            if (link === undefined)
                return title;
            if (title === undefined)
                return "<a href='" + link + "'>" + link + "</a>";
            return "<a href='" + link + "'>" + title + "</a>";
        }
        
        var data = {};
        if (params.title !== undefined) {data.title = {name: 'Скрипт', value: params.title}};
        if (params.version !== undefined) {data.version = {name: 'Версия', value: params.version}};
        if (params.hint !== undefined) {data.hint = {name: 'Описание', value: params.hint}};
        if (params.details !== undefined) {data.details = {name: 'Детали', value: params.details}};
        if (params.homepage !== undefined) {data.homepage = {name: 'Домашняя страница', value: createLink(params.homepage.link, params.homepage.title)}};
        if (params.author !== undefined) {data.author = {name: 'Автор', value: createLink(params.author.link, params.author.title)}};
        if (params.license !== undefined) {data.license = {name: 'Лицензия', value: createLink(params.license.link, params.license.title)}};
        if (params.updated !== undefined) {data.updated = {name: 'Обновлено', value: params.updated}};
        
        for (var i in data) {
            if (data[i].name !== undefined) {
                var row = "<tr><th>" + data[i].name + "</th><td>" + data[i].value + "</td></tr>";
            } else {
                var row = "<tr><td colspan='2'>" + data[i].value + "</td></tr>";
            }
            $('#' + win.attr('id') + ' .Body table', context).append(row);
        }
        
        $('#' + win.attr('id'), context).css({'width': '480px'});
        $('#' + win.attr('id') + ' .Body table', context).css({'width': '100%', 'border': 'none'});
        $('#' + win.attr('id') + ' .Body th', context).css({'color': '#000000', 'font-size': '12px', 'text-align': 'left', 'vertical-align': 'top'});
        $('#' + win.attr('id') + ' .Body td', context).css({'color': '#000000', 'font-size': '12px', 'text-align': 'left', 'vertical-align': 'top'});
        $('#' + win.attr('id') + ' .Body a', context).css({'color': 'blue', 'font-size': '12px', 'text-decoration': 'none'});
        
        var bClose = this.createWindowButton(path.concat(['Close']), 'Закрыть');
        bClose.click( function(){ self.toggleWindow(path); } );
        return win;
    }
    
    
    /** Создание окна конфигурации
    * @param Array path Путь
    * @param Object options Опции
    * @return jQuery
    */
    this.createWindowConf = function(path, options) {
        var win = this.createWindow(path, 'Конфигурация');     
        
        for (var i in options) {
            var opath = path.concat(i);
            switch (options[i].type) {
                case 'bool':
                    this.createWindowOptionBool(opath, options[i].title, options[i].desc, options[i].def);
                    break;
                default:
                    this.createWindowOption(opath, options[i].title, options[i].desc, options[i].def);
            }
        }
        
        var bSave = this.createWindowButton(path.concat(['Save']), 'Сохранить');
        var bClose = this.createWindowButton(path.concat(['Close']), 'Закрыть');
        var self = this;
        bSave.click( function(){ self.saveWindowConf(path); } );
        bClose.click( function(){ self.toggleWindowConf(path); } );
        return win;
    }
    
    
    /** Создание окна отладки
    * @param Array path Путь
    * @return jQuery
    */
    this.createWindowDebug = function(path) {
        var win = this.createWindow(path, 'Отладка');
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        
        $('#w' + fid + ' .Body', context).css({'overflow': 'auto', 'max-height': '480px', 'border': 'solid 1px #cccccc'});
        
        var bReset = this.createWindowButton(path.concat(['Reset']), 'Сбросить');
        var bClose = this.createWindowButton(path.concat(['Close']), 'Закрыть');
        bReset.click( function(){ self.resetWindowDebug(path); } );
        bClose.click( function(){ self.toggleWindowDebug(path); } );
        return win;
    }
    
    
    /** Переключение окна
    * @param Array path Путь
    */
    this.toggleWindow = function(path) {
        //GM_log('UserScriptGUI.toggleWindow([' + path.join(', ') + '])');
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        var show = ($('#w' + fid, context).css('display') == 'none');
        $('#libUserScriptGUI .Window', context).hide();
        if (show) {
            $('#w' + fid, context).show();
        }
        var selfWidth = parseInt($('#w' + fid, context).css('width'));
        var bodyWidth = $('body', context).width();
        var left = (bodyWidth - selfWidth) / 2;
        $('#w' + fid, context).css({'left': left + 'px'});
    }
    
    
    /** Переключение окна конфигурации
    * @param Array path Путь
    */
    this.toggleWindowConf = function(path) {
        this.toggleWindow(path);
        this.updateWindowConf(path);
    }
    
    
    /** Переключение окна отладки
    * @param Array path Путь
    */
    this.toggleWindowDebug = function(path) {
        this.toggleWindow(path);
        this.updateWindowDebug(path);
    }
    
    
    /** Сохранение окна конфигурации
    * @param Array path Путь
    */
    this.saveWindowConf = function(path) {
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        var inputs = $('#w' + fid + ' .Body input[type="text"]', context);
        var values = [];
        var aligns = {name: 'right', value: 'left'};
        for (var i = 0; i < inputs.length; i++) {
            var name = inputs[i].name;
            var value = inputs[i].value;
            GM_setValue(name, value);
            values[values.length] = {indent: '    ', name: name + ':', value: value};
        }
        var inputs = $('#w' + fid + ' .Body input[type="button"]', context);
        for (var i = 0; i < inputs.length; i++) {
            var name = inputs[i].name;
            var value = (inputs[i].value == 'true');
            GM_setValue(name, value);
            values[values.length] = {indent: '    ', name: name + ':', value: value};
        }
        GM_log(getTimeStr() + ' ' + 'Сохранение значений:' + '\n' + objectsStr(values, aligns));
    }
    
    
    /** Сброс окна отладки
    * @param Array path Путь
    */
    this.resetWindowDebug = function(path) {
        var list = GM_listValues();
        var values = [];
        for (var i = 0; i < list.length; i++)
            GM_deleteValue(list[i]);
        this.updateWindowDebug(path);
    }
    
    
    /** Обновление окна отладки
    * @param Array path Путь
    */
    this.updateWindowDebug = function(path) {
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        if ($('#w' + fid, context).css('display') == 'none') 
            return false;
        
        var list = GM_listValues();
        var values = [];
        for (var i = 0; i < list.length; i++)
            values[values.length] = {indent: '    ', name: list[i] + ':', value: GM_getValue(list[i])};
        var aligns = {name: 'right', value: 'left'};        
        GM_log(getTimeStr() + ' ' + 'Список сохраненных значений:' + '\n' + objectsStr(values, aligns));
        
        $('#w' + fid + ' .Body', context).html('');
        $('#w' + fid + ' .Body', context).append('<table><tr><th>Переменная</th><th>Значение</th></tr></table>');
        $('#w' + fid + ' .Body table', context).css({'width': '100%'});
        for (var i = 0; i < list.length; i++)
            $('#w' + fid + ' .Body table', context).append('<tr><td class="Name">' + list[i] + '</td><td class="Value">' + GM_getValue(list[i]) + '</td></tr>');
        $('#w' + fid + ' .Body table *', context).css({'font-face': 'Courier New', 'font-size': '10px', 'color': '#000000'});
        $('#w' + fid + ' .Body table td.Name', context).css({'text-align': 'right', 'padding-right': '10px'});
        $('#w' + fid + ' .Body table th', context).css({'font-weight': 'bold'});
        
        return true;
    }
    
    
    /** Обновление окна конфигурации
    * @param Array path Путь
    */
    this.updateWindowConf = function(path) {
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        if ($('#w' + fid, context).css('display') == 'none') 
            return false;
        
        var inputs = $('#w' + fid + ' .Body .Option input', context);
        for (var i = 0; i < inputs.length; i++) {
            var def = inputs[i].attributes['def'].value;
            var value = GM_getValue(inputs[i].name, def);
            inputs[i].value = value;
        }
        
        var inputs = $('#w' + fid + ' .Body .OptionBool input', context);
        for (var i = 0; i < inputs.length; i++) {
            var def = (inputs[i].attributes['def'].value == 'true');
            var value = GM_getValue(inputs[i].name, def);
            var valueStr = value ? 'true' : 'false';
            inputs[i].value = valueStr;
        }
        
        return true;
    }
    
    
    /** Создание набора по умолчанию
    * @param Object desc
    * @param Object conf
    */
    this.createDefaultSet = function(desc, conf) {
        var name = GM_info.script.name.replace(/\s/g, '');
        var title = GM_info.script.name;
        var hint = GM_info.script.description;
        var version = GM_info.script.version;
        
        desc = (desc === undefined) ? {} : desc;
        desc.title = (desc.title === undefined) ? title : desc.title;
        desc.hint = (desc.hint === undefined) ? hint : desc.hint;
        desc.version = (desc.version === undefined) ? version : desc.version;
        
        conf = (conf === undefined) ? {} : conf;
        
        var bScript = this.createMenuButton(['Scripts', name], title, hint);
        var bDesc = this.createMenuButton(['Scripts', name, 'Desc'], 'Описание');
        var bConf = this.createMenuButton(['Scripts', name, 'Conf'], 'Конфигурация');
        var bDebug = this.createMenuButton(['Scripts', name, 'Debug'], 'Отладка');
        
        var wDesc = this.createWindowDesc([name, 'Desc'], desc);
        var wConf = this.createWindowConf([name, 'Conf'], conf);
        var wDebug = this.createWindowDebug([name, 'Debug']);
        
        bDesc.click(function() { self.toggleWindow([name, 'Desc']); });
        bConf.click(function() { self.toggleWindowConf([name, 'Conf']); });
        bDebug.click(function() { self.toggleWindowDebug([name, 'Debug']); });
        
    }
    
    
    /** Создание всплывающего окна
    * @param Array path Путь
    * @param String title Заголовок
    * @param String content Содержание
    * @return jQuery
    */
    this.createPopup = function(path, title, content) {
        //GM_log('UserScriptGUI.createPopup([' + path.join(', ') + '], ' + title + ', ' + content + ')');
        title = (title === undefined) ? '' : title;
        content = (content === undefined) ? '' : content;        
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        
        this.destroyPopup(path);
        $('#pUserScriptGUI', context).prepend(
            "<div id='p" + fid + "' class='Popup'>" + 
                "<div class='Header' style='font-weight: bold; font-size: 14px; margin-bottom: 10px;'>" + title + "</div>" + 
                "<div class='Body' style='text-align: left; background: #ffffff;'>" + content + "</div>" + 
                "<div class='Footer' style='text-align: right; margin-top: 10px;'></div>" + 
            "</div>"
        );
        $('#p' + fid, context).css({'border': 'solid 1px #666666', 'background': '#ffffff', 'text-align': 'center', 'font-size': '12px', 'color': '#000000', 'padding': '5px', 'margin': '0px', 'margin-bottom': '10px'});
        $('#p' + fid + ' .Footer', context).append("<a class='Close'>Закрыть</a>");
        $('#p' + fid + ' .Footer .Close', context).css({'font-style': 'italic', 'cursor': 'pointer'});
        $('#p' + fid + ' .Footer .Close', context).click(function() { self.destroyPopup(path); });
        $('#p' + fid, context).attr('popupClass', path[path.length - 1]);
        
        return $('#p' + fid, context);
    }
    
    
    /** Извлечение всплывающего окна
    * @param Array path Путь
    * @return jQuery
    */
    this.getPopup = function(path) {
        //GM_log('UserScriptGUI.getPopup([' + path.join(', ') + '])');
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        return $('#p' + fid, context);
    }
    
    
    /** Удаление всплывающего окна
    * @param Array path Путь
    * @return jQuery
    */
    this.destroyPopup = function(path) {
        //GM_log('UserScriptGUI.destroyPopup([' + path.join(', ') + '])');
        var fpath = ['UserScriptGUI'].concat(path);
        var fid = fpath.join('_');
        var popup = $('#p' + fid, context);
        popup.remove();
    }
    
    
    /** Удаление класса всплывающих окон
    * @param String popupClass Класс
    * @return jQuery
    */
    this.destroyPopupClass = function(popupClass) {
        //GM_log('UserScriptGUI.destroyPopupClass(' + className + ')');
        if (popupClass === undefined) {
            var popup = $('#pUserScriptGUI *', context);
        } else {
            var popup = $('#pUserScriptGUI [popupClass="' + popupClass + '"]', context);
        }
        popup.remove();
    }
    
    
    /** Установка таймера на всплывающем окне
    * @param String id
    * @param String text
    */
    this.setPopupTimer = function(id, text) {
        var popup = tgui.getPopup(['Timer']);
        if (popup.length === 0)
            popup = tgui.createPopup(['Timer'], 'Таймеры', '<ul></ul>');
        var row = $('.Body li#' + id, popup);
        if (row.length === 0)
            $('.Body ul', popup).append('<li id="' + id + '"></li>');
        $('.Body li#' + id, popup).html(text);
    }
    
    
    /** Удаление таймера на всплывающем окне
    * @param String id
    */
    this.unsetPopupTimer = function(id) {
        var popup = tgui.getPopup(['Timer']);
        if (popup.length > 0)
            $('.Body li#' + id, popup).remove();
    }
    
    
    // Инициализация
    if ($('#libUserScriptGUI', context).length === 0) {
        $('body', context).append("<div id='libUserScriptGUI'/>");
        $('#libUserScriptGUI', context).append("<div id='mUserScriptGUI'/>");
        $('#libUserScriptGUI', context).append("<div id='pUserScriptGUI'/>");
        $('#libUserScriptGUI', context).append("<div id='wUserScriptGUI'/>");
        $('#mUserScriptGUI', context).css({'position': 'fixed', 'top': '5px', 'right': '5px'});
        $('#pUserScriptGUI', context).css({'position': 'fixed', 'top': '0px', 'left': '0px', 'width': '420px'});
        //$('#wUserScriptGUI', context).css();
        var bScripts = this.createMenuButton(['Scripts'], 'Скрипты', 'Быстрый и удобный доступ к конфигурации пользовательских скриптов.');
        var bPopup = this.createMenuButton(['Popup'], 'Сообщения', 'Показать/спрятать всплывающие сообщения.');
        bPopup.click(function() { $('#pUserScriptGUI', context).toggle(); });
    }
    return this;
    
}



// Создаем интерфейс
if (window === top) {
    
    var desc = {
        'homepage': {'title': 'userscripts.org', 'link': 'http://userscripts.org/'},
        'author': {'title': 'hotamateurxxx', 'link': 'http://userscripts.org/users/hotamateurxxx'},
        'updated': '2012.09.30'
    };
    
    var conf = {
        'disabled': {'type': 'bool', 'title': 'Отключение', 'def': false, 'desc': 'Отключение работы скрипта.'},
        'login': {'title': 'Логин', 'desc': 'Логин для автоматического входа со страницы авторизации.'},
        'pass': {'title': 'Пароль', 'desc': 'Пароль для автоматического входа со страницы авторизации.'}
    }
    
    var gui = UserScriptGUI(document);
    gui.createDefaultSet(desc, conf);
    
}


var disabled = GM_getValue('disabled', false);
if (!disabled) {
    
    
    // Парсим url
    var url = $.url(window.location.href);
    //GM_log(getTimeStr() + '\n' + 'path == ' + url.attr('path'));
    
    
    // Если мы на странице авторизации
    if (
        (url.attr('path') === '/') ||
        (url.attr('path') === '/index.php')
    ) {
        //GM_log(getTimeStr() + '\n' + 'Обнаружена страница авторизации.');

        var login = GM_getValue('login', '');
        var pass = GM_getValue('pass', '');
        
        
        // Ищем форму
        // <form method="post" action="login.php" style="display: inline;" name="log">
        var form = null;
        for (var i = 0; i < document.forms.length; i++) {
            if (document.forms[i].name == 'log') {
                form = document.forms[i];
                break;
            }
        }
        
        
        // Если указаны логин и пароль
        if ((login.length > 0) && (pass.length > 0)) {
            
            // Заполняем и отсылаем форму
            var inputs = form.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++)
                switch (inputs[i].name) {
                    case 'login': inputs[i].value = login; break;
                    case 'pass': inputs[i].value = pass; break;
                }
            //GM_log(getTimeStr() + '\n' + 'Отсылка формы.');
            form.submit();
        }

    }
    
}