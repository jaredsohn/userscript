// ==UserScript==
// @name           UNIFIED ChekPlay For Challenge Group Administration
// @namespace      http://www.flickr.com/alesadam
// @description    UNIFIED ChekPlay For Challenge Group Administration
// @author	   Alesa Dam (http://flickr.com/alesadam/)
// @contributor    Martin Heimburger (http://flickr.com/vispillo/)
// @contributor	   Kris Vangeel (http://flickr.com/kvgl69/)
// @date           03/1/2010
// @version        3.2.6
// @modified       Mar. 13, 2014
// @downloadURL	   https://userscripts.org/scripts/source/66993.user.js
// @updateURL	   https://userscripts.org/scripts/source/66993.meta.js
// @icon	   https://lh6.googleusercontent.com/wfYmnEgmnk0OM5vnxypqttuqPJNZ8CkiiCA5PJ4uQwhVcPLrQEBpHYuG8_PwI-4jSM6PGT1JI_0=s128-h128-e365
//
// @include        http://www.flickr.com/groups/*/discuss*
// @match          http://www.flickr.com/groups/*/discuss*
// @include        http://www.flickr.com/groups/*/admin/pending*
// @match          http://www.flickr.com/groups/*/admin/pending*
// @exclude        http://www.flickr.com/groups/*/?search*
//
// @include        https://www.flickr.com/groups/*/discuss*
// @match          https://www.flickr.com/groups/*/discuss*
// @include        https://www.flickr.com/groups/*/admin/pending*
// @match          https://www.flickr.com/groups/*/admin/pending*
// @exclude        https://www.flickr.com/groups/*/?search*
//
// @run-at         document-end
//
// @copyright	2009-2014 Alesa Dam
// @license	GPL v3+
// @licstart	The following is the entire license notice for this script.
/*
 * Copyright (C) 2009-2012 Alesa Dam
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details 
 * at <http://www.gnu.org/licenses/>.
 */
// @licend	End of license
//
// ==/UserScript==
//
// Changelog: http://www.flickr.com/groups/unified_checkplay/discuss/72157623838711730/
// Documentation: http://www.flickr.com/groups/unified_checkplay/discuss/72157623759768824/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
// If you have any suggestions for improvement, encounter bugs, have patches available , or you play in a 
// challenge group that is not supported, please FlickrMail me, and I will take care of it.
// We try to keep this as UNIFIED as possible.
// Contact: 
// - Alesa Dam (http://flickr.com/alesadam/)

/*jslint browser: true, maxerr: 500, onevar: false, regexp: false, plusplus: false, bitwise: false, newcap: false */
/*global window, document, GM_setValue, GM_getValue, GM_listValues, GM_deleteValue, GM_log, XPathResult, ucpUniversalHash, */

(function () {
var CPtoolversion="3.2.6";
var installPage = 'http://userscripts.org/scripts/show/66993';

var debug = false;
function GM_debug(message) {
    if (debug) {
        GM_log("UCPA DEBUG - " + message);
    }
}

// Greased MooTools:
/*
---

script: Core.js

description: The core of MooTools, contains all the base functions and the Native and Hash implementations. Required by all the other scripts.

license: MIT-style license.

copyright: Copyright (c) 2006-2008 [Valerio Proietti](http://mad4milk.net/).

authors: The MooTools production team (http://mootools.net/developers/)

inspiration:
- Class implementation inspired by [Base.js](http://dean.edwards.name/weblog/2006/03/base/) Copyright (c) 2006 Dean Edwards, [GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)
- Some functionality inspired by [Prototype.js](http://prototypejs.org) Copyright (c) 2005-2007 Sam Stephenson, [MIT License](http://opensource.org/licenses/mit-license.php)

provides: [MooTools, Native, Hash.base, Array.each, $util]

...
*/

var MooTools = {
	'version': '1.2.5dev',
	'build': '168759f5904bfdaeafd6b1c0d1be16cd78b5d5c6'
};

var Native = function(options){
	options = options || {};
	var name = options.name;
	var legacy = options.legacy;
	var protect = options.protect;
	var methods = options.implement;
	var generics = options.generics;
	var initialize = options.initialize;
	var afterImplement = options.afterImplement || function(){};
	var object = initialize || legacy;
	generics = generics !== false;

	object.constructor = Native;
	object.$family = {name: 'native'};
	if (legacy && initialize) object.prototype = legacy.prototype;
	if (!object.prototype) object.prototype = {};
	object.prototype.constructor = object;

	if (name){
		var family = name.toLowerCase();
		object.prototype.$family = {name: family};
		Native.typize(object, family);
	}

	var add = function(obj, name, method, force){
		if (!protect || force || !obj.prototype[name]) obj.prototype[name] = method;
		if (generics) Native.genericize(obj, name, protect);
		afterImplement.call(obj, name, method);
		return obj;
	};

	object.alias = function(a1, a2, a3){
		if (typeof a1 == 'string'){
			var pa1 = this.prototype[a1];
			if ((a1 = pa1)) return add(this, a2, a1, a3);
		}
		for (var a in a1) this.alias(a, a1[a], a2);
		return this;
	};

	object.implement = function(a1, a2, a3){
		if (typeof a1 == 'string') return add(this, a1, a2, a3);
		for (var p in a1) add(this, p, a1[p], a2);
		return this;
	};

	if (methods) object.implement(methods);

	return object;
};

Native.genericize = function(object, property, check){
	if ((!check || !object[property]) && typeof object.prototype[property] == 'function') object[property] = function(){
		var args = Array.prototype.slice.call(arguments);
		return object.prototype[property].apply(args.shift(), args);
	};
};

Native.implement = function(objects, properties){
	for (var i = 0, l = objects.length; i < l; i++) objects[i].implement(properties);
};

Native.typize = function(object, family){
	if (!object.type) object.type = function(item){
		return ($type(item) === family);
	};
};

(function(){
	var natives = {'Array': Array, 'Date': Date, 'Function': Function, 'Number': Number, 'RegExp': RegExp, 'String': String};
	for (var n in natives) new Native({name: n, initialize: natives[n], protect: true});

	var types = {'boolean': Boolean, 'native': Native, 'object': Object};
	for (var t in types) Native.typize(types[t], t);

	var generics = {
		'Array': ["concat", "indexOf", "join", "lastIndexOf", "pop", "push", "reverse", "shift", "slice", "sort", "splice", "toString", "unshift", "valueOf"],
		'String': ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "match", "replace", "search", "slice", "split", "substr", "substring", "toLowerCase", "toUpperCase", "valueOf"]
	};
	for (var g in generics){
		for (var i = generics[g].length; i--;) Native.genericize(natives[g], generics[g][i], true);
	}
})();

var Hash = new Native({

	name: 'Hash',

	initialize: function(object){
		if ($type(object) == 'hash') object = $unlink(object.getClean());
		for (var key in object) this[key] = object[key];
		return this;
	}

});

Hash.implement({

	forEach: function(fn, bind){
		for (var key in this){
			if (this.hasOwnProperty(key)) fn.call(bind, this[key], key, this);
		}
	},

	getClean: function(){
		var clean = {};
		for (var key in this){
			if (this.hasOwnProperty(key)) clean[key] = this[key];
		}
		return clean;
	},

	getLength: function(){
		var length = 0;
		for (var key in this){
			if (this.hasOwnProperty(key)) length++;
		}
		return length;
	}

});

Hash.alias('forEach', 'each');

Array.implement({

	forEach: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++) fn.call(bind, this[i], i, this);
	}

});

Array.alias('forEach', 'each');

function $A(iterable){
	if (iterable.item){
		var l = iterable.length, array = new Array(l);
		while (l--) array[l] = iterable[l];
		return array;
	}
	return Array.prototype.slice.call(iterable);
};

function $arguments(i){
	return function(){
		return arguments[i];
	};
};

function $chk(obj){
	return !!(obj || obj === 0);
};

function $clear(timer){
	clearTimeout(timer);
	clearInterval(timer);
	return null;
};

function $defined(obj){
	return (obj != undefined);
};

function $each(iterable, fn, bind){
	var type = $type(iterable);
	((type == 'arguments' || type == 'collection' || type == 'array') ? Array : Hash).each(iterable, fn, bind);
};

function $empty(){};

function $extend(original, extended){
	for (var key in (extended || {})) original[key] = extended[key];
	return original;
};

function $H(object){
	return new Hash(object);
};

function $lambda(value){
	return ($type(value) == 'function') ? value : function(){
		return value;
	};
};

function $merge(){
	var args = Array.slice(arguments);
	args.unshift({});
	return $mixin.apply(null, args);
};

function $mixin(mix){
	for (var i = 1, l = arguments.length; i < l; i++){
		var object = arguments[i];
		if ($type(object) != 'object') continue;
		for (var key in object){
			var op = object[key], mp = mix[key];
			mix[key] = (mp && $type(op) == 'object' && $type(mp) == 'object') ? $mixin(mp, op) : $unlink(op);
		}
	}
	return mix;
};

function $pick(){
	for (var i = 0, l = arguments.length; i < l; i++){
		if (arguments[i] != undefined) return arguments[i];
	}
	return null;
};

function $random(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
};

function $splat(obj){
	var type = $type(obj);
	return (type) ? ((type != 'array' && type != 'arguments') ? [obj] : obj) : [];
};

var $time = Date.now || function(){
	return +new Date;
};

function $try(){
	for (var i = 0, l = arguments.length; i < l; i++){
		try {
			return arguments[i]();
		} catch(e){}
	}
	return null;
};

function $type(obj){
	if (obj == undefined) return false;
	if (obj.$family) return (obj.$family.name == 'number' && !isFinite(obj)) ? false : obj.$family.name;
	if (obj.nodeName){
		switch (obj.nodeType){
			case 1: return 'element';
			case 3: return (/\S/).test(obj.nodeValue) ? 'textnode' : 'whitespace';
		}
	} else if (typeof obj.length == 'number'){
		if (obj.callee) return 'arguments';
		else if (obj.item) return 'collection';
	}
	return typeof obj;
};

function $unlink(object){
	var unlinked;
	switch ($type(object)){
		case 'object':
			unlinked = {};
			for (var p in object) unlinked[p] = $unlink(object[p]);
		break;
		case 'hash':
			unlinked = new Hash(object);
		break;
		case 'array':
			unlinked = [];
			for (var i = 0, l = object.length; i < l; i++) unlinked[i] = $unlink(object[i]);
		break;
		default: return object;
	}
	return unlinked;
};

/*
---

script: Browser.js

description: The Browser Core. Contains Browser initialization, Window and Document, and the Browser Hash.

license: MIT-style license.

requires: 
- /Native
- /$util

provides: [Browser, Window, Document, $exec]

...
*/

var Browser = $merge({

	Engine: {name: 'unknown', version: 0},

	Platform: {name: (window.orientation != undefined) ? 'ipod' : (navigator.platform.match(/mac|win|linux/i) || ['other'])[0].toLowerCase()},

	Features: {xpath: !!(document.evaluate), air: !!(window.runtime), query: !!(document.querySelector)},

	Plugins: {},

	Engines: {

		presto: function(){
			return (!window.opera) ? false : ((arguments.callee.caller) ? 960 : ((document.getElementsByClassName) ? 950 : 925));
		},

		/* reports Safari as using trident (IE engine)
		trident: function(){
			return (!window.ActiveXObject) ? false : ((window.XMLHttpRequest) ? ((document.querySelectorAll) ? 6 : 5) : 4);
		},*/

		webkit: function(){
			if (window.mozInnerScreenX != undefined) return false; // FF9 returns webkit = true!!
			return (navigator.taintEnabled) ? false : ((Browser.Features.xpath) ? ((Browser.Features.query) ? 525 : 420) : 419);
		},

		gecko: function(){
			return (!document.getBoxObjectFor && window.mozInnerScreenX == null) ? false : ((document.getElementsByClassName) ? 19 : 18);
		}

	}

}, Browser || {});

Browser.Platform[Browser.Platform.name] = true;

Browser.detect = function(){

	for (var engine in this.Engines){
		var version = this.Engines[engine]();
		if (version){
			this.Engine = {name: engine, version: version};
			this.Engine[engine] = this.Engine[engine + version] = true;
			break;
		}
	}

	return {name: engine, version: version};

};

Browser.detect();

Browser.Request = function(){
	return $try(function(){
		return new XMLHttpRequest();
	}, function(){
		return new ActiveXObject('MSXML2.XMLHTTP');
	}, function(){
		return new ActiveXObject('Microsoft.XMLHTTP');
	});
};

Browser.Features.xhr = !!(Browser.Request());

Browser.Plugins.Flash = (function(){
	var version = ($try(function(){
		return navigator.plugins['Shockwave Flash'].description;
	}, function(){
		return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
	}) || '0 r0').match(/\d+/g);
	return {version: parseInt(version[0] || 0 + '.' + version[1], 10) || 0, build: parseInt(version[2], 10) || 0};
})();

function $exec(text){
	if (!text) return text;
	if (window.execScript){
		window.execScript(text);
	} else {
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script[(Browser.Engine.webkit && Browser.Engine.version < 420) ? 'innerText' : 'text'] = text;
		document.head.appendChild(script);
		document.head.removeChild(script);
	}
	return text;
};

Native.UID = 1;

var $uid = (Browser.Engine.trident) ? function(item){
	return (item.uid || (item.uid = [Native.UID++]))[0];
} : function(item){
	return item.uid || (item.uid = Native.UID++);
};

var Window = new Native({

	name: 'Window',

	legacy: (Browser.Engine.trident) ? null: window.Window,

	initialize: function(win){
		$uid(win);
		if (!win.Element){
			win.Element = $empty;
			if (Browser.Engine.webkit) win.document.createElement("iframe"); //fixes safari 2
			win.Element.prototype = (Browser.Engine.webkit) ? window["[[DOMElement.prototype]]"] : {};
		}
		win.document.window = win;
		return $extend(win, Window.Prototype);
	},

	afterImplement: function(property, value){
		window[property] = Window.Prototype[property] = value;
	}

});

Window.Prototype = {$family: {name: 'window'}};

new Window(window);

var Document = new Native({

	name: 'Document',

	legacy: (Browser.Engine.trident) ? null: window.Document,

	initialize: function(doc){
		$uid(doc);
		doc.head = doc.getElementsByTagName('head')[0];
		doc.html = doc.getElementsByTagName('html')[0];
		if (Browser.Engine.trident && Browser.Engine.version <= 4) $try(function(){
			doc.execCommand("BackgroundImageCache", false, true);
		});
		if (Browser.Engine.trident) doc.window.attachEvent('onunload', function(){
			doc.window.detachEvent('onunload', arguments.callee);
			doc.head = doc.html = doc.window = null;
		});
		return $extend(doc, Document.Prototype);
	},

	afterImplement: function(property, value){
		document[property] = Document.Prototype[property] = value;
	}

});

Document.Prototype = {$family: {name: 'document'}};

new Document(document);

/*
---

script: Array.js

description: Contains Array Prototypes like each, contains, and erase.

license: MIT-style license.

requires:
- /$util
- /Array.each

provides: [Array]

...
*/

Array.implement({

	every: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++){
			if (!fn.call(bind, this[i], i, this)) return false;
		}
		return true;
	},

	filter: function(fn, bind){
		var results = [];
		for (var i = 0, l = this.length; i < l; i++){
			if (fn.call(bind, this[i], i, this)) results.push(this[i]);
		}
		return results;
	},

	clean: function(){
		return this.filter($defined);
	},

	indexOf: function(item, from){
		var len = this.length;
		for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++){
			if (this[i] === item) return i;
		}
		return -1;
	},

	map: function(fn, bind){
		var results = [];
		for (var i = 0, l = this.length; i < l; i++) results[i] = fn.call(bind, this[i], i, this);
		return results;
	},

	some: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++){
			if (fn.call(bind, this[i], i, this)) return true;
		}
		return false;
	},

	associate: function(keys){
		var obj = {}, length = Math.min(this.length, keys.length);
		for (var i = 0; i < length; i++) obj[keys[i]] = this[i];
		return obj;
	},

	link: function(object){
		var result = {};
		for (var i = 0, l = this.length; i < l; i++){
			for (var key in object){
				if (object[key](this[i])){
					result[key] = this[i];
					delete object[key];
					break;
				}
			}
		}
		return result;
	},

	contains: function(item, from){
		return this.indexOf(item, from) != -1;
	},

	extend: function(array){
		for (var i = 0, j = array.length; i < j; i++) this.push(array[i]);
		return this;
	},
	
	getLast: function(){
		return (this.length) ? this[this.length - 1] : null;
	},

	getRandom: function(){
		return (this.length) ? this[$random(0, this.length - 1)] : null;
	},

	include: function(item){
		if (!this.contains(item)) this.push(item);
		return this;
	},

	combine: function(array){
		for (var i = 0, l = array.length; i < l; i++) this.include(array[i]);
		return this;
	},

	erase: function(item){
		for (var i = this.length; i--; i){
			if (this[i] === item) this.splice(i, 1);
		}
		return this;
	},

	empty: function(){
		this.length = 0;
		return this;
	},

	flatten: function(){
		var array = [];
		for (var i = 0, l = this.length; i < l; i++){
			var type = $type(this[i]);
			if (!type) continue;
			array = array.concat((type == 'array' || type == 'collection' || type == 'arguments') ? Array.flatten(this[i]) : this[i]);
		}
		return array;
	},

	hexToRgb: function(array){
		if (this.length != 3) return null;
		var rgb = this.map(function(value){
			if (value.length == 1) value += value;
			return value.toInt(16);
		});
		return (array) ? rgb : 'rgb(' + rgb + ')';
	},

	rgbToHex: function(array){
		if (this.length < 3) return null;
		if (this.length == 4 && this[3] == 0 && !array) return 'transparent';
		var hex = [];
		for (var i = 0; i < 3; i++){
			var bit = (this[i] - 0).toString(16);
			hex.push((bit.length == 1) ? '0' + bit : bit);
		}
		return (array) ? hex : '#' + hex.join('');
	}

});

/*
---

script: String.js

description: Contains String Prototypes like camelCase, capitalize, test, and toInt.

license: MIT-style license.

requires:
- /Native

provides: [String]

...
*/

String.implement({

	test: function(regex, params){
		return ((typeof regex == 'string') ? new RegExp(regex, params) : regex).test(this);
	},

	contains: function(string, separator){
		return (separator) ? (separator + this + separator).indexOf(separator + string + separator) > -1 : this.indexOf(string) > -1;
	},

	trim: function(){
		return this.replace(/^\s+|\s+$/g, '');
	},

	clean: function(){
		return this.replace(/\s+/g, ' ').trim();
	},

	camelCase: function(){
		return this.replace(/-\D/g, function(match){
			return match.charAt(1).toUpperCase();
		});
	},

	hyphenate: function(){
		return this.replace(/[A-Z]/g, function(match){
			return ('-' + match.charAt(0).toLowerCase());
		});
	},

	capitalize: function(){
		return this.replace(/\b[a-z]/g, function(match){
			return match.toUpperCase();
		});
	},

	escapeRegExp: function(){
		return this.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
	},

	toInt: function(base){
		return parseInt(this, base || 10);
	},

	toFloat: function(){
		return parseFloat(this);
	},

	hexToRgb: function(array){
		var hex = this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
		return (hex) ? hex.slice(1).hexToRgb(array) : null;
	},

	rgbToHex: function(array){
		var rgb = this.match(/\d{1,3}/g);
		return (rgb) ? rgb.rgbToHex(array) : null;
	},

	stripScripts: function(option){
		var scripts = '';
		var text = this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){
			scripts += arguments[1] + '\n';
			return '';
		});
		if (option === true) $exec(scripts);
		else if ($type(option) == 'function') option(scripts, text);
		return text;
	},

	substitute: function(object, regexp){
		return this.replace(regexp || (/\\?\{([^{}]+)\}/g), function(match, name){
			if (match.charAt(0) == '\\') return match.slice(1);
			return (object[name] != undefined) ? object[name] : '';
		});
	}

});

/*
---

script: Function.js

description: Contains Function Prototypes like create, bind, pass, and delay.

license: MIT-style license.

requires:
- /Native
- /$util

provides: [Function]

...
*/

Function.implement({

	extend: function(properties){
		for (var property in properties) this[property] = properties[property];
		return this;
	},

	create: function(options){
		var self = this;
		options = options || {};
		return function(event){
			var args = options.arguments;
			args = (args != undefined) ? $splat(args) : Array.slice(arguments, (options.event) ? 1 : 0);
			if (options.event) args = [event || window.event].extend(args);
			var returns = function(){
				return self.apply(options.bind || null, args);
			};
			if (options.delay) return setTimeout(returns, options.delay);
			if (options.periodical) return setInterval(returns, options.periodical);
			if (options.attempt) return $try(returns);
			return returns();
		};
	},

	run: function(args, bind){
		return this.apply(bind, $splat(args));
	},

	pass: function(args, bind){
		return this.create({bind: bind, arguments: args});
	},

	bind: function(bind, args){
		return this.create({bind: bind, arguments: args});
	},

	bindWithEvent: function(bind, args){
		return this.create({bind: bind, arguments: args, event: true});
	},

	attempt: function(args, bind){
		return this.create({bind: bind, arguments: args, attempt: true})();
	},

	delay: function(delay, bind, args){
		return this.create({bind: bind, arguments: args, delay: delay})();
	},

	periodical: function(periodical, bind, args){
		return this.create({bind: bind, arguments: args, periodical: periodical})();
	}

});

/*
---

script: Number.js

description: Contains Number Prototypes like limit, round, times, and ceil.

license: MIT-style license.

requires:
- /Native
- /$util

provides: [Number]

...
*/

Number.implement({

	limit: function(min, max){
		return Math.min(max, Math.max(min, this));
	},

	round: function(precision){
		precision = Math.pow(10, precision || 0);
		return Math.round(this * precision) / precision;
	},

	times: function(fn, bind){
		for (var i = 0; i < this; i++) fn.call(bind, i, this);
	},

	toFloat: function(){
		return parseFloat(this);
	},

	toInt: function(base){
		return parseInt(this, base || 10);
	}

});

Number.alias('times', 'each');

(function(math){
	var methods = {};
	math.each(function(name){
		if (!Number[name]) methods[name] = function(){
			return Math[name].apply(null, [this].concat($A(arguments)));
		};
	});
	Number.implement(methods);
})(['abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor', 'log', 'max', 'min', 'pow', 'sin', 'sqrt', 'tan']);

/*
---

script: Hash.js

description: Contains Hash Prototypes. Provides a means for overcoming the JavaScript practical impossibility of extending native Objects.

license: MIT-style license.

requires:
- /Hash.base

provides: [Hash]

...
*/

Hash.implement({

	has: Object.prototype.hasOwnProperty,

	keyOf: function(value){
		for (var key in this){
			if (this.hasOwnProperty(key) && this[key] === value) return key;
		}
		return null;
	},

	hasValue: function(value){
		return (Hash.keyOf(this, value) !== null);
	},

	extend: function(properties){
		Hash.each(properties || {}, function(value, key){
			Hash.set(this, key, value);
		}, this);
		return this;
	},

	combine: function(properties){
		Hash.each(properties || {}, function(value, key){
			Hash.include(this, key, value);
		}, this);
		return this;
	},

	erase: function(key){
		if (this.hasOwnProperty(key)) delete this[key];
		return this;
	},

	get: function(key){
		return (this.hasOwnProperty(key)) ? this[key] : null;
	},

	set: function(key, value){
		if (!this[key] || this.hasOwnProperty(key)) this[key] = value;
		return this;
	},

	empty: function(){
		Hash.each(this, function(value, key){
			delete this[key];
		}, this);
		return this;
	},

	include: function(key, value){
		if (this[key] == undefined) this[key] = value;
		return this;
	},

	map: function(fn, bind){
		var results = new Hash;
		Hash.each(this, function(value, key){
			results.set(key, fn.call(bind, value, key, this));
		}, this);
		return results;
	},

	filter: function(fn, bind){
		var results = new Hash;
		Hash.each(this, function(value, key){
			if (fn.call(bind, value, key, this)) results.set(key, value);
		}, this);
		return results;
	},

	every: function(fn, bind){
		for (var key in this){
			if (this.hasOwnProperty(key) && !fn.call(bind, this[key], key)) return false;
		}
		return true;
	},

	some: function(fn, bind){
		for (var key in this){
			if (this.hasOwnProperty(key) && fn.call(bind, this[key], key)) return true;
		}
		return false;
	},

	getKeys: function(){
		var keys = [];
		Hash.each(this, function(value, key){
			keys.push(key);
		});
		return keys;
	},

	getValues: function(){
		var values = [];
		Hash.each(this, function(value){
			values.push(value);
		});
		return values;
	},

	toQueryString: function(base){
		var queryString = [];
		Hash.each(this, function(value, key){
			if (base) key = base + '[' + key + ']';
			var result;
			switch ($type(value)){
				case 'object': result = Hash.toQueryString(value, key); break;
				case 'array':
					var qs = {};
					value.each(function(val, i){
						qs[i] = val;
					});
					result = Hash.toQueryString(qs, key);
				break;
				default: result = key + '=' + encodeURIComponent(value);
			}
			if (value != undefined) queryString.push(result);
		});

		return queryString.join('&');
	}

});

Hash.alias({keyOf: 'indexOf', hasValue: 'contains'});

/*
---

script: Element.js

description: One of the most important items in MooTools. Contains the dollar function, the dollars function, and an handful of cross-browser, time-saver methods to let you easily work with HTML Elements.

license: MIT-style license.

requires:
- /Window
- /Document
- /Array
- /String
- /Function
- /Number
- /Hash

provides: [Element, Elements, $, $$, Iframe]

...
*/

var Element = new Native({

	name: 'Element',

	legacy: window.Element,

	initialize: function(tag, props){
		var konstructor = Element.Constructors.get(tag);
		if (konstructor) return konstructor(props);
		if (typeof tag == 'string') return document.newElement(tag, props);
		return document.id(tag).set(props);
	},

	afterImplement: function(key, value){
		Element.Prototype[key] = value;
		if (Array[key]) return;
		Elements.implement(key, function(){
			var items = [], elements = true;
			for (var i = 0, j = this.length; i < j; i++){
				var returns = this[i][key].apply(this[i], arguments);
				items.push(returns);
				if (elements) elements = ($type(returns) == 'element');
			}
			return (elements) ? new Elements(items) : items;
		});
	}

});

Element.Prototype = {$family: {name: 'element'}};

Element.Constructors = new Hash;

var IFrame = new Native({

	name: 'IFrame',

	generics: false,

	initialize: function(){
		var params = Array.link(arguments, {properties: Object.type, iframe: $defined});
		var props = params.properties || {};
		var iframe = document.id(params.iframe);
		var onload = props.onload || $empty;
		delete props.onload;
		props.id = props.name = $pick(props.id, props.name, iframe ? (iframe.id || iframe.name) : 'IFrame_' + $time());
		iframe = new Element(iframe || 'iframe', props);
		var onFrameLoad = function(){
			var host = $try(function(){
				return iframe.contentWindow.location.host;
			});
			if (!host || host == window.location.host){
				var win = new Window(iframe.contentWindow);
				new Document(iframe.contentWindow.document);
				if(!win.Element.prototype) win.Element.prototype = {};
				$extend(win.Element.prototype, Element.Prototype);
			}
			onload.call(iframe.contentWindow, iframe.contentWindow.document);
		};
		var contentWindow = $try(function(){
			return iframe.contentWindow;
		});
		((contentWindow && contentWindow.document.body) || window.frames[props.id]) ? onFrameLoad() : iframe.addListener('load', onFrameLoad);
		return iframe;
	}

});

var Elements = new Native({

	initialize: function(elements, options){
		options = $extend({ddup: true, cash: true}, options);
		elements = elements || [];
		if (options.ddup || options.cash){
			var uniques = {}, returned = [];
			for (var i = 0, l = elements.length; i < l; i++){
				var el = document.id(elements[i], !options.cash);
				if (options.ddup){
					if (uniques[el.uid]) continue;
					uniques[el.uid] = true;
				}
				if (el) returned.push(el);
			}
			elements = returned;
		}
		return (options.cash) ? $extend(elements, this) : elements;
	}

});

Elements.implement({

	filter: function(filter, bind){
		if (!filter) return this;
		return new Elements(Array.filter(this, (typeof filter == 'string') ? function(item){
			return item.match(filter);
		} : filter, bind));
	}

});

Document.implement({

	newElement: function(tag, props){
		if (Browser.Engine.trident && props){
			['name', 'type', 'checked'].each(function(attribute){
				if (!props[attribute]) return;
				tag += ' ' + attribute + '="' + props[attribute] + '"';
				if (attribute != 'checked') delete props[attribute];
			});
			tag = '<' + tag + '>';
		}
		return document.id(this.createElement(tag)).set(props);
	},

	newTextNode: function(text){
		return this.createTextNode(text);
	},

	getDocument: function(){
		return this;
	},

	getWindow: function(){
		return this.window;
	},
	
	id: (function(){
		
		var types = {

			string: function(id, nocash, doc){
				id = doc.getElementById(id);
				return (id) ? types.element(id, nocash) : null;
			},
			
			element: function(el, nocash){
				$uid(el);
				if (!nocash && !el.$family && !(/^object|embed$/i).test(el.tagName)){
					var proto = Element.Prototype;
					for (var p in proto) el[p] = proto[p];
				};
				return el;
			},
			
			object: function(obj, nocash, doc){
				if (obj.toElement) return types.element(obj.toElement(doc), nocash);
				return null;
			}
			
		};

		types.textnode = types.whitespace = types.window = types.document = $arguments(0);
		
		return function(el, nocash, doc){
			if (el && el.$family && el.uid) return el;
			var type = $type(el);
			return (types[type]) ? types[type](el, nocash, doc || document) : null;
		};

	})()

});

if (window.$ == null) Window.implement({
	$: function(el, nc){
		return document.id(el, nc, this.document);
	}
});

Window.implement({

	$$: function(selector){
		if (arguments.length == 1 && typeof selector == 'string') return this.document.getElements(selector);
		var elements = [];
		var args = Array.flatten(arguments);
		for (var i = 0, l = args.length; i < l; i++){
			var item = args[i];
			switch ($type(item)){
				case 'element': elements.push(item); break;
				case 'string': elements.extend(this.document.getElements(item, true));
			}
		}
		return new Elements(elements);
	},

	getDocument: function(){
		return this.document;
	},

	getWindow: function(){
		return this;
	}

});

Native.implement([Element, Document], {

	getElement: function(selector, nocash){
		return document.id(this.getElements(selector, true)[0] || null, nocash);
	},

	getElements: function(tags, nocash){
		tags = tags.split(',');
		var elements = [];
		var ddup = (tags.length > 1);
		tags.each(function(tag){
			var partial = this.getElementsByTagName(tag.trim());
			(ddup) ? elements.extend(partial) : elements = partial;
		}, this);
		return new Elements(elements, {ddup: ddup, cash: !nocash});
	}

});

(function(){

var collected = {}, storage = {};
var props = {input: 'checked', option: 'selected', textarea: (Browser.Engine.webkit && Browser.Engine.version < 420) ? 'innerHTML' : 'value'};

var get = function(uid){
	return (storage[uid] || (storage[uid] = {}));
};

var clean = function(item, retain){
	if (!item) return;
	var uid = item.uid;
	if (Browser.Engine.trident){
		if (item.clearAttributes){
			var clone = retain && item.cloneNode(false);
			item.clearAttributes();
			if (clone) item.mergeAttributes(clone);
		} else if (item.removeEvents){
			item.removeEvents();
		}
		if ((/object/i).test(item.tagName)){
			for (var p in item){
				if (typeof item[p] == 'function') item[p] = $empty;
			}
			Element.dispose(item);
		}
	}	
	if (!uid) return;
	collected[uid] = storage[uid] = null;
};

var purge = function(){
	Hash.each(collected, clean);
	if (Browser.Engine.trident) $A(document.getElementsByTagName('object')).each(clean);
	if (window.CollectGarbage) CollectGarbage();
	collected = storage = null;
};

var walk = function(element, walk, start, match, all, nocash){
	var el = element[start || walk];
	var elements = [];
	while (el){
		if (el.nodeType == 1 && (!match || Element.match(el, match))){
			if (!all) return document.id(el, nocash);
			elements.push(el);
		}
		el = el[walk];
	}
	return (all) ? new Elements(elements, {ddup: false, cash: !nocash}) : null;
};

var attributes = {
	'html': 'innerHTML',
	'class': 'className',
	'for': 'htmlFor',
	'defaultValue': 'defaultValue',
	'text': (Browser.Engine.trident || (Browser.Engine.webkit && Browser.Engine.version < 420)) ? 'innerText' : 'textContent'
};
var bools = ['compact', 'nowrap', 'ismap', 'declare', 'noshade', 'checked', 'disabled', 'readonly', 'multiple', 'selected', 'noresize', 'defer'];
var camels = ['value', 'type', 'defaultValue', 'accessKey', 'cellPadding', 'cellSpacing', 'colSpan', 'frameBorder', 'maxLength', 'readOnly', 'rowSpan', 'tabIndex', 'useMap'];

bools = bools.associate(bools);

Hash.extend(attributes, bools);
Hash.extend(attributes, camels.associate(camels.map(String.toLowerCase)));

var inserters = {

	before: function(context, element){
		if (element.parentNode) element.parentNode.insertBefore(context, element);
	},

	after: function(context, element){
		if (!element.parentNode) return;
		var next = element.nextSibling;
		(next) ? element.parentNode.insertBefore(context, next) : element.parentNode.appendChild(context);
	},

	bottom: function(context, element){
		element.appendChild(context);
	},

	top: function(context, element){
		var first = element.firstChild;
		(first) ? element.insertBefore(context, first) : element.appendChild(context);
	}

};

inserters.inside = inserters.bottom;

Hash.each(inserters, function(inserter, where){

	where = where.capitalize();

	Element.implement('inject' + where, function(el){
		inserter(this, document.id(el, true));
		return this;
	});

	Element.implement('grab' + where, function(el){
		inserter(document.id(el, true), this);
		return this;
	});

});

Element.implement({

	set: function(prop, value){
		switch ($type(prop)){
			case 'object':
				for (var p in prop) this.set(p, prop[p]);
				break;
			case 'string':
				var property = Element.Properties.get(prop);
				(property && property.set) ? property.set.apply(this, Array.slice(arguments, 1)) : this.setProperty(prop, value);
		}
		return this;
	},

	get: function(prop){
		var property = Element.Properties.get(prop);
		return (property && property.get) ? property.get.apply(this, Array.slice(arguments, 1)) : this.getProperty(prop);
	},

	erase: function(prop){
		var property = Element.Properties.get(prop);
		(property && property.erase) ? property.erase.apply(this) : this.removeProperty(prop);
		return this;
	},

	setProperty: function(attribute, value){
		var key = attributes[attribute];
		if (value == undefined) return this.removeProperty(attribute);
		if (key && bools[attribute]) value = !!value;
		(key) ? this[key] = value : this.setAttribute(attribute, '' + value);
		return this;
	},

	setProperties: function(attributes){
		for (var attribute in attributes) this.setProperty(attribute, attributes[attribute]);
		return this;
	},

	getProperty: function(attribute){
		var key = attributes[attribute];
		var value = (key) ? this[key] : this.getAttribute(attribute, 2);
		return (bools[attribute]) ? !!value : (key) ? value : value || null;
	},

	getProperties: function(){
		var args = $A(arguments);
		return args.map(this.getProperty, this).associate(args);
	},

	removeProperty: function(attribute){
		var key = attributes[attribute];
		(key) ? this[key] = (key && bools[attribute]) ? false : '' : this.removeAttribute(attribute);
		return this;
	},

	removeProperties: function(){
		Array.each(arguments, this.removeProperty, this);
		return this;
	},

	hasClass: function(className){
		return this.className.contains(className, ' ');
	},

	addClass: function(className){
		if (!this.hasClass(className)) this.className = (this.className + ' ' + className).clean();
		return this;
	},

	removeClass: function(className){
		this.className = this.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1');
		return this;
	},

	toggleClass: function(className){
		return this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
	},

	adopt: function(){
		Array.flatten(arguments).each(function(element){
			element = document.id(element, true);
			if (element) this.appendChild(element);
		}, this);
		return this;
	},

	appendText: function(text, where){
		return this.grab(this.getDocument().newTextNode(text), where);
	},

	grab: function(el, where){
		inserters[where || 'bottom'](document.id(el, true), this);
		return this;
	},

	inject: function(el, where){
		inserters[where || 'bottom'](this, document.id(el, true));
		return this;
	},

	replaces: function(el){
		el = document.id(el, true);
		el.parentNode.replaceChild(this, el);
		return this;
	},

	wraps: function(el, where){
		el = document.id(el, true);
		return this.replaces(el).grab(el, where);
	},

	getPrevious: function(match, nocash){
		return walk(this, 'previousSibling', null, match, false, nocash);
	},

	getAllPrevious: function(match, nocash){
		return walk(this, 'previousSibling', null, match, true, nocash);
	},

	getNext: function(match, nocash){
		return walk(this, 'nextSibling', null, match, false, nocash);
	},

	getAllNext: function(match, nocash){
		return walk(this, 'nextSibling', null, match, true, nocash);
	},

	getFirst: function(match, nocash){
		return walk(this, 'nextSibling', 'firstChild', match, false, nocash);
	},

	getLast: function(match, nocash){
		return walk(this, 'previousSibling', 'lastChild', match, false, nocash);
	},

	getParent: function(match, nocash){
		return walk(this, 'parentNode', null, match, false, nocash);
	},

	getParents: function(match, nocash){
		return walk(this, 'parentNode', null, match, true, nocash);
	},
	
	getSiblings: function(match, nocash){
		return this.getParent().getChildren(match, nocash).erase(this);
	},

	getChildren: function(match, nocash){
		return walk(this, 'nextSibling', 'firstChild', match, true, nocash);
	},

	getWindow: function(){
		return this.ownerDocument.window;
	},

	getDocument: function(){
		return this.ownerDocument;
	},

	getElementById: function(id, nocash){
		var el = this.ownerDocument.getElementById(id);
		if (!el) return null;
		for (var parent = el.parentNode; parent != this; parent = parent.parentNode){
			if (!parent) return null;
		}
		return document.id(el, nocash);
	},

	getSelected: function(){
		return new Elements($A(this.options).filter(function(option){
			return option.selected;
		}));
	},

	getComputedStyle: function(property){
		if (this.currentStyle) return this.currentStyle[property.camelCase()];
		var computed = this.getDocument().defaultView.getComputedStyle(this, null);
		return (computed) ? computed.getPropertyValue([property.hyphenate()]) : null;
	},

	toQueryString: function(){
		var queryString = [];
		this.getElements('input, select, textarea', true).each(function(el){
			if (!el.name || el.disabled || el.type == 'submit' || el.type == 'reset' || el.type == 'file') return;
			var value = (el.tagName.toLowerCase() == 'select') ? Element.getSelected(el).map(function(opt){
				return opt.value;
			}) : ((el.type == 'radio' || el.type == 'checkbox') && !el.checked) ? null : el.value;
			$splat(value).each(function(val){
				if (typeof val != 'undefined') queryString.push(el.name + '=' + encodeURIComponent(val));
			});
		});
		return queryString.join('&');
	},

	clone: function(contents, keepid){
		contents = contents !== false;
		var clone = this.cloneNode(contents);
		var clean = function(node, element){
			if (!keepid) node.removeAttribute('id');
			if (Browser.Engine.trident){
				node.clearAttributes();
				node.mergeAttributes(element);
				node.removeAttribute('uid');
				if (node.options){
					var no = node.options, eo = element.options;
					for (var j = no.length; j--;) no[j].selected = eo[j].selected;
				}
			}
			var prop = props[element.tagName.toLowerCase()];
			if (prop && element[prop]) node[prop] = element[prop];
		};

		if (contents){
			var ce = clone.getElementsByTagName('*'), te = this.getElementsByTagName('*');
			for (var i = ce.length; i--;) clean(ce[i], te[i]);
		}

		clean(clone, this);
		return document.id(clone);
	},

	destroy: function(){
		Element.empty(this);
		Element.dispose(this);
		clean(this, true);
		return null;
	},

	empty: function(){
		$A(this.childNodes).each(function(node){
			Element.destroy(node);
		});
		return this;
	},

	dispose: function(){
		return (this.parentNode) ? this.parentNode.removeChild(this) : this;
	},

	hasChild: function(el){
		el = document.id(el, true);
		if (!el) return false;
		if (Browser.Engine.webkit && Browser.Engine.version < 420) return $A(this.getElementsByTagName(el.tagName)).contains(el);
		return (this.contains) ? (this != el && this.contains(el)) : !!(this.compareDocumentPosition(el) & 16);
	},

	match: function(tag){
		return (!tag || (tag == this) || (Element.get(this, 'tag') == tag));
	}

});

Native.implement([Element, Window, Document], {

	addListener: function(type, fn){
		if (type == 'unload'){
			var old = fn, self = this;
			fn = function(){
				self.removeListener('unload', fn);
				old();
			};
		} else {
			collected[this.uid] = this;
		}
		if (this.addEventListener) this.addEventListener(type, fn, false);
		else this.attachEvent('on' + type, fn);
		return this;
	},

	removeListener: function(type, fn){
		if (this.removeEventListener) this.removeEventListener(type, fn, false);
		else this.detachEvent('on' + type, fn);
		return this;
	},

	retrieve: function(property, dflt){
		var storage = get(this.uid), prop = storage[property];
		if (dflt != undefined && prop == undefined) prop = storage[property] = dflt;
		return $pick(prop);
	},

	store: function(property, value){
		var storage = get(this.uid);
		storage[property] = value;
		return this;
	},

	eliminate: function(property){
		var storage = get(this.uid);
		delete storage[property];
		return this;
	}

});

window.addListener('unload', purge);

})();

Element.Properties = new Hash;

Element.Properties.style = {

	set: function(style){
		this.style.cssText = style;
	},

	get: function(){
		return this.style.cssText;
	},

	erase: function(){
		this.style.cssText = '';
	}

};

Element.Properties.tag = {

	get: function(){
		return this.tagName.toLowerCase();
	}

};

Element.Properties.html = (function(){
	var wrapper = document.createElement('div');

	var translations = {
		table: [1, '<table>', '</table>'],
		select: [1, '<select>', '</select>'],
		tbody: [2, '<table><tbody>', '</tbody></table>'],
		tr: [3, '<table><tbody><tr>', '</tr></tbody></table>']
	};
	translations.thead = translations.tfoot = translations.tbody;

	var html = {
		set: function(){
			var html = Array.flatten(arguments).join('');
			var wrap = Browser.Engine.trident && translations[this.get('tag')];
			if (wrap){
				var first = wrapper;
				first.innerHTML = wrap[1] + html + wrap[2];
				for (var i = wrap[0]; i--;) first = first.firstChild;
				this.empty().adopt(first.childNodes);
			} else {
				this.innerHTML = html;
			}
		}
	};

	html.erase = html.set;

	return html;
})();

if (Browser.Engine.webkit && Browser.Engine.version < 420) Element.Properties.text = {
	get: function(){
		if (this.innerText) return this.innerText;
		var temp = this.ownerDocument.newElement('div', {html: this.innerHTML}).inject(this.ownerDocument.body);
		var text = temp.innerText;
		temp.destroy();
		return text;
	}
};

/*
---

script: Element.Style.js

description: Contains methods for interacting with the styles of Elements in a fashionable way.

license: MIT-style license.

requires:
- /Element

provides: [Element.Style]

...
*/

Element.Properties.styles = {set: function(styles){
	this.setStyles(styles);
}};

Element.Properties.opacity = {

	set: function(opacity, novisibility){
		if (!novisibility){
			if (opacity == 0){
				if (this.style.visibility != 'hidden') this.style.visibility = 'hidden';
			} else {
				if (this.style.visibility != 'visible') this.style.visibility = 'visible';
			}
		}
		if (!this.currentStyle || !this.currentStyle.hasLayout) this.style.zoom = 1;
		if (Browser.Engine.trident) this.style.filter = (opacity == 1) ? '' : 'alpha(opacity=' + opacity * 100 + ')';
		this.style.opacity = opacity;
		this.store('opacity', opacity);
	},

	get: function(){
		return this.retrieve('opacity', 1);
	}

};

Element.implement({

	setOpacity: function(value){
		return this.set('opacity', value, true);
	},

	getOpacity: function(){
		return this.get('opacity');
	},

	setStyle: function(property, value){
		switch (property){
			case 'opacity': return this.set('opacity', parseFloat(value));
			case 'float': property = (Browser.Engine.trident) ? 'styleFloat' : 'cssFloat';
		}
		property = property.camelCase();
		if ($type(value) != 'string'){
			var map = (Element.Styles.get(property) || '@').split(' ');
			value = $splat(value).map(function(val, i){
				if (!map[i]) return '';
				return ($type(val) == 'number') ? map[i].replace('@', Math.round(val)) : val;
			}).join(' ');
		} else if (value == String(Number(value))){
			value = Math.round(value);
		}
		this.style[property] = value;
		return this;
	},

	getStyle: function(property){
		switch (property){
			case 'opacity': return this.get('opacity');
			case 'float': property = (Browser.Engine.trident) ? 'styleFloat' : 'cssFloat';
		}
		property = property.camelCase();
		var result = this.style[property];
		if (!$chk(result)){
			result = [];
			for (var style in Element.ShortStyles){
				if (property != style) continue;
				for (var s in Element.ShortStyles[style]) result.push(this.getStyle(s));
				return result.join(' ');
			}
			result = this.getComputedStyle(property);
		}
		if (result){
			result = String(result);
			var color = result.match(/rgba?\([\d\s,]+\)/);
			if (color) result = result.replace(color[0], color[0].rgbToHex());
		}
		if (Browser.Engine.presto || (Browser.Engine.trident && !$chk(parseInt(result, 10)))){
			if (property.test(/^(height|width)$/)){
				var values = (property == 'width') ? ['left', 'right'] : ['top', 'bottom'], size = 0;
				values.each(function(value){
					size += this.getStyle('border-' + value + '-width').toInt() + this.getStyle('padding-' + value).toInt();
				}, this);
				return this['offset' + property.capitalize()] - size + 'px';
			}
			if ((Browser.Engine.presto) && String(result).test('px')) return result;
			if (property.test(/(border(.+)Width|margin|padding)/)) return '0px';
		}
		return result;
	},

	setStyles: function(styles){
		for (var style in styles) this.setStyle(style, styles[style]);
		return this;
	},

	getStyles: function(){
		var result = {};
		Array.flatten(arguments).each(function(key){
			result[key] = this.getStyle(key);
		}, this);
		return result;
	}

});

Element.Styles = new Hash({
	left: '@px', top: '@px', bottom: '@px', right: '@px',
	width: '@px', height: '@px', maxWidth: '@px', maxHeight: '@px', minWidth: '@px', minHeight: '@px',
	backgroundColor: 'rgb(@, @, @)', backgroundPosition: '@px @px', color: 'rgb(@, @, @)',
	fontSize: '@px', letterSpacing: '@px', lineHeight: '@px', clip: 'rect(@px @px @px @px)',
	margin: '@px @px @px @px', padding: '@px @px @px @px', border: '@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)',
	borderWidth: '@px @px @px @px', borderStyle: '@ @ @ @', borderColor: 'rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)',
	zIndex: '@', 'zoom': '@', fontWeight: '@', textIndent: '@px', opacity: '@'
});

Element.ShortStyles = {margin: {}, padding: {}, border: {}, borderWidth: {}, borderStyle: {}, borderColor: {}};

['Top', 'Right', 'Bottom', 'Left'].each(function(direction){
	var Short = Element.ShortStyles;
	var All = Element.Styles;
	['margin', 'padding'].each(function(style){
		var sd = style + direction;
		Short[style][sd] = All[sd] = '@px';
	});
	var bd = 'border' + direction;
	Short.border[bd] = All[bd] = '@px @ rgb(@, @, @)';
	var bdw = bd + 'Width', bds = bd + 'Style', bdc = bd + 'Color';
	Short[bd] = {};
	Short.borderWidth[bdw] = Short[bd][bdw] = All[bdw] = '@px';
	Short.borderStyle[bds] = Short[bd][bds] = All[bds] = '@';
	Short.borderColor[bdc] = Short[bd][bdc] = All[bdc] = 'rgb(@, @, @)';
});

/*
---

script: Element.Dimensions.js

description: Contains methods to work with size, scroll, or positioning of Elements and the window object.

license: MIT-style license.

credits:
- Element positioning based on the [qooxdoo](http://qooxdoo.org/) code and smart browser fixes, [LGPL License](http://www.gnu.org/licenses/lgpl.html).
- Viewport dimensions based on [YUI](http://developer.yahoo.com/yui/) code, [BSD License](http://developer.yahoo.com/yui/license.html).

requires:
- /Element

provides: [Element.Dimensions]

...
*/

(function(){

Element.implement({

	scrollTo: function(x, y){
		if (isBody(this)){
			this.getWindow().scrollTo(x, y);
		} else {
			this.scrollLeft = x;
			this.scrollTop = y;
		}
		return this;
	},

	getSize: function(){
		if (isBody(this)) return this.getWindow().getSize();
		return {x: this.offsetWidth, y: this.offsetHeight};
	},

	getScrollSize: function(){
		if (isBody(this)) return this.getWindow().getScrollSize();
		return {x: this.scrollWidth, y: this.scrollHeight};
	},

	getScroll: function(){
		if (isBody(this)) return this.getWindow().getScroll();
		return {x: this.scrollLeft, y: this.scrollTop};
	},

	getScrolls: function(){
		var element = this, position = {x: 0, y: 0};
		while (element && !isBody(element)){
			position.x += element.scrollLeft;
			position.y += element.scrollTop;
			element = element.parentNode;
		}
		return position;
	},

	getOffsetParent: function(){
		var element = this;
		if (isBody(element)) return null;
		if (!Browser.Engine.trident) return element.offsetParent;
		while ((element = element.parentNode) && !isBody(element)){
			if (styleString(element, 'position') != 'static') return element;
		}
		return null;
	},

	getOffsets: function(){
		if (this.getBoundingClientRect){
			var bound = this.getBoundingClientRect(),
				html = document.id(this.getDocument().documentElement),
				htmlScroll = html.getScroll(),
				//htmlScroll = { x: 0, y: 0},
				elemScrolls = this.getScrolls(),
				elemScroll = this.getScroll(),
				isFixed = (styleString(this, 'position') == 'fixed');

			return {
				x: bound.left.toInt() + elemScrolls.x - elemScroll.x + ((isFixed) ? 0 : htmlScroll.x) - html.clientLeft,
				y: bound.top.toInt()  + elemScrolls.y - elemScroll.y + ((isFixed) ? 0 : htmlScroll.y) - html.clientTop
			};
		}

		var element = this, position = {x: 0, y: 0};
		if (isBody(this)) return position;

		while (element && !isBody(element)){
			position.x += element.offsetLeft;
			position.y += element.offsetTop;

			if (Browser.Engine.gecko){
				if (!borderBox(element)){
					position.x += leftBorder(element);
					position.y += topBorder(element);
				}
				var parent = element.parentNode;
				if (parent && styleString(parent, 'overflow') != 'visible'){
					position.x += leftBorder(parent);
					position.y += topBorder(parent);
				}
			} else if (element != this && Browser.Engine.webkit){
				position.x += leftBorder(element);
				position.y += topBorder(element);
			}

			element = element.offsetParent;
		}
		if (Browser.Engine.gecko && !borderBox(this)){
			position.x -= leftBorder(this);
			position.y -= topBorder(this);
		}
		return position;
	},

	getPosition: function(relative){
		if (isBody(this)) return {x: 0, y: 0};
		var offset = this.getOffsets(),
				scroll = this.getScrolls();
		var position = {
			x: offset.x - scroll.x,
			y: offset.y - scroll.y
		};
		var relativePosition = (relative && (relative = document.id(relative))) ? relative.getPosition() : {x: 0, y: 0};
		return {x: position.x - relativePosition.x, y: position.y - relativePosition.y};
	},

	getCoordinates: function(element){
		if (isBody(this)) return this.getWindow().getCoordinates();
		var position = this.getPosition(element),
				size = this.getSize();
		var obj = {
			left: position.x,
			top: position.y,
			width: size.x,
			height: size.y
		};
		obj.right = obj.left + obj.width;
		obj.bottom = obj.top + obj.height;
		return obj;
	},

	computePosition: function(obj){
		return {
			left: obj.x - styleNumber(this, 'margin-left'),
			top: obj.y - styleNumber(this, 'margin-top')
		};
	},

	setPosition: function(obj){
		return this.setStyles(this.computePosition(obj));
	}

});


Native.implement([Document, Window], {

	getSize: function(){
		if (Browser.Engine.presto || Browser.Engine.webkit){
			var win = this.getWindow();
			return {x: win.innerWidth, y: win.innerHeight};
		}
		var doc = getCompatElement(this);
		return {x: doc.clientWidth, y: doc.clientHeight};
	},

	getScroll: function(){
		var win = this.getWindow(), doc = getCompatElement(this);
		return {x: win.pageXOffset || doc.scrollLeft, y: win.pageYOffset || doc.scrollTop};
	},

	getScrollSize: function(){
		var doc = getCompatElement(this), min = this.getSize();
		return {x: Math.max(doc.scrollWidth, min.x), y: Math.max(doc.scrollHeight, min.y)};
	},

	getPosition: function(){
		return {x: 0, y: 0};
	},

	getCoordinates: function(){
		var size = this.getSize();
		return {top: 0, left: 0, bottom: size.y, right: size.x, height: size.y, width: size.x};
	}

});

// private methods

var styleString = Element.getComputedStyle;

function styleNumber(element, style){
	return styleString(element, style).toInt() || 0;
};

function borderBox(element){
	return styleString(element, '-moz-box-sizing') == 'border-box';
};

function topBorder(element){
	return styleNumber(element, 'border-top-width');
};

function leftBorder(element){
	return styleNumber(element, 'border-left-width');
};

function isBody(element){
	return (/^(?:body|html)$/i).test(element.tagName);
};

function getCompatElement(element){
	var doc = element.getDocument();
	return (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html : doc.body;
};

})();

//aliases
Element.alias('setPosition', 'position'); //compatability

Native.implement([Window, Document, Element], {

	getHeight: function(){
		return this.getSize().y;
	},

	getWidth: function(){
		return this.getSize().x;
	},

	getScrollTop: function(){
		return this.getScroll().y;
	},

	getScrollLeft: function(){
		return this.getScroll().x;
	},

	getScrollHeight: function(){
		return this.getScrollSize().y;
	},

	getScrollWidth: function(){
		return this.getScrollSize().x;
	},

	getTop: function(){
		return this.getPosition().y;
	},

	getLeft: function(){
		return this.getPosition().x;
	}

});

/*
---

script: Selectors.js

description: Adds advanced CSS-style querying capabilities for targeting HTML Elements. Includes pseudo selectors.

license: MIT-style license.

requires:
- /Element

provides: [Selectors]

...
*/

Native.implement([Document, Element], {

	getElements: function(expression, nocash){
		expression = expression.split(',');
		var items, local = {};
		for (var i = 0, l = expression.length; i < l; i++){
			var selector = expression[i], elements = Selectors.Utils.search(this, selector, local);
			if (i != 0 && elements.item) elements = $A(elements);
			items = (i == 0) ? elements : (items.item) ? $A(items).concat(elements) : items.concat(elements);
		}
		return new Elements(items, {ddup: (expression.length > 1), cash: !nocash});
	}

});

Element.implement({

	match: function(selector){
		if (!selector || (selector == this)) return true;
		var tagid = Selectors.Utils.parseTagAndID(selector);
		var tag = tagid[0], id = tagid[1];
		if (!Selectors.Filters.byID(this, id) || !Selectors.Filters.byTag(this, tag)) return false;
		var parsed = Selectors.Utils.parseSelector(selector);
		return (parsed) ? Selectors.Utils.filter(this, parsed, {}) : true;
	}

});

var Selectors = {Cache: {nth: {}, parsed: {}}};

Selectors.RegExps = {
	id: (/#([\w-]+)/),
	tag: (/^(\w+|\*)/),
	quick: (/^(\w+|\*)$/),
	splitter: (/\s*([+>~\s])\s*([a-zA-Z#.*:\[])/g),
	combined: (/\.([\w-]+)|\[(\w+)(?:([!*^$~|]?=)(["']?)([^\4]*?)\4)?\]|:([\w-]+)(?:\(["']?(.*?)?["']?\)|$)/g)
};

Selectors.Utils = {

	chk: function(item, uniques){
		if (!uniques) return true;
		var uid = $uid(item);
		if (!uniques[uid]) return uniques[uid] = true;
		return false;
	},

	parseNthArgument: function(argument){
		if (Selectors.Cache.nth[argument]) return Selectors.Cache.nth[argument];
		var parsed = argument.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);
		if (!parsed) return false;
		var inta = parseInt(parsed[1], 10);
		var a = (inta || inta === 0) ? inta : 1;
		var special = parsed[2] || false;
		var b = parseInt(parsed[3], 10) || 0;
		if (a != 0){
			b--;
			while (b < 1) b += a;
			while (b >= a) b -= a;
		} else {
			a = b;
			special = 'index';
		}
		switch (special){
			case 'n': parsed = {a: a, b: b, special: 'n'}; break;
			case 'odd': parsed = {a: 2, b: 0, special: 'n'}; break;
			case 'even': parsed = {a: 2, b: 1, special: 'n'}; break;
			case 'first': parsed = {a: 0, special: 'index'}; break;
			case 'last': parsed = {special: 'last-child'}; break;
			case 'only': parsed = {special: 'only-child'}; break;
			default: parsed = {a: (a - 1), special: 'index'};
		}

		return Selectors.Cache.nth[argument] = parsed;
	},

	parseSelector: function(selector){
		if (Selectors.Cache.parsed[selector]) return Selectors.Cache.parsed[selector];
		var m, parsed = {classes: [], pseudos: [], attributes: []};
		while ((m = Selectors.RegExps.combined.exec(selector))){
			var cn = m[1], an = m[2], ao = m[3], av = m[5], pn = m[6], pa = m[7];
			if (cn){
				parsed.classes.push(cn);
			} else if (pn){
				var parser = Selectors.Pseudo.get(pn);
				if (parser) parsed.pseudos.push({parser: parser, argument: pa});
				else parsed.attributes.push({name: pn, operator: '=', value: pa});
			} else if (an){
				parsed.attributes.push({name: an, operator: ao, value: av});
			}
		}
		if (!parsed.classes.length) delete parsed.classes;
		if (!parsed.attributes.length) delete parsed.attributes;
		if (!parsed.pseudos.length) delete parsed.pseudos;
		if (!parsed.classes && !parsed.attributes && !parsed.pseudos) parsed = null;
		return Selectors.Cache.parsed[selector] = parsed;
	},

	parseTagAndID: function(selector){
		var tag = selector.match(Selectors.RegExps.tag);
		var id = selector.match(Selectors.RegExps.id);
		return [(tag) ? tag[1] : '*', (id) ? id[1] : false];
	},

	filter: function(item, parsed, local){
		var i;
		if (parsed.classes){
			for (i = parsed.classes.length; i--; i){
				var cn = parsed.classes[i];
				if (!Selectors.Filters.byClass(item, cn)) return false;
			}
		}
		if (parsed.attributes){
			for (i = parsed.attributes.length; i--; i){
				var att = parsed.attributes[i];
				if (!Selectors.Filters.byAttribute(item, att.name, att.operator, att.value)) return false;
			}
		}
		if (parsed.pseudos){
			for (i = parsed.pseudos.length; i--; i){
				var psd = parsed.pseudos[i];
				if (!Selectors.Filters.byPseudo(item, psd.parser, psd.argument, local)) return false;
			}
		}
		return true;
	},

	getByTagAndID: function(ctx, tag, id){
		if (id){
			var item = (ctx.getElementById) ? ctx.getElementById(id, true) : Element.getElementById(ctx, id, true);
			return (item && Selectors.Filters.byTag(item, tag)) ? [item] : [];
		} else {
			return ctx.getElementsByTagName(tag);
		}
	},

	search: function(self, expression, local){
		var splitters = [];

		var selectors = expression.trim().replace(Selectors.RegExps.splitter, function(m0, m1, m2){
			splitters.push(m1);
			return ':)' + m2;
		}).split(':)');

		var items, filtered, item;

		for (var i = 0, l = selectors.length; i < l; i++){

			var selector = selectors[i];

			if (i == 0 && Selectors.RegExps.quick.test(selector)){
				items = self.getElementsByTagName(selector);
				continue;
			}

			var splitter = splitters[i - 1];

			var tagid = Selectors.Utils.parseTagAndID(selector);
			var tag = tagid[0], id = tagid[1];

			if (i == 0){
				items = Selectors.Utils.getByTagAndID(self, tag, id);
			} else {
				var uniques = {}, found = [];
				for (var j = 0, k = items.length; j < k; j++) found = Selectors.Getters[splitter](found, items[j], tag, id, uniques);
				items = found;
			}

			var parsed = Selectors.Utils.parseSelector(selector);

			if (parsed){
				filtered = [];
				for (var m = 0, n = items.length; m < n; m++){
					item = items[m];
					if (Selectors.Utils.filter(item, parsed, local)) filtered.push(item);
				}
				items = filtered;
			}

		}

		return items;

	}

};

Selectors.Getters = {

	' ': function(found, self, tag, id, uniques){
		var items = Selectors.Utils.getByTagAndID(self, tag, id);
		for (var i = 0, l = items.length; i < l; i++){
			var item = items[i];
			if (Selectors.Utils.chk(item, uniques)) found.push(item);
		}
		return found;
	},

	'>': function(found, self, tag, id, uniques){
		var children = Selectors.Utils.getByTagAndID(self, tag, id);
		for (var i = 0, l = children.length; i < l; i++){
			var child = children[i];
			if (child.parentNode == self && Selectors.Utils.chk(child, uniques)) found.push(child);
		}
		return found;
	},

	'+': function(found, self, tag, id, uniques){
		while ((self = self.nextSibling)){
			if (self.nodeType == 1){
				if (Selectors.Utils.chk(self, uniques) && Selectors.Filters.byTag(self, tag) && Selectors.Filters.byID(self, id)) found.push(self);
				break;
			}
		}
		return found;
	},

	'~': function(found, self, tag, id, uniques){
		while ((self = self.nextSibling)){
			if (self.nodeType == 1){
				if (!Selectors.Utils.chk(self, uniques)) break;
				if (Selectors.Filters.byTag(self, tag) && Selectors.Filters.byID(self, id)) found.push(self);
			}
		}
		return found;
	}

};

Selectors.Filters = {

	byTag: function(self, tag){
		return (tag == '*' || (self.tagName && self.tagName.toLowerCase() == tag));
	},

	byID: function(self, id){
		return (!id || (self.id && self.id == id));
	},

	byClass: function(self, klass){
		return (self.className && self.className.contains && self.className.contains(klass, ' '));
	},

	byPseudo: function(self, parser, argument, local){
		return parser.call(self, argument, local);
	},

	byAttribute: function(self, name, operator, value){
		var result = Element.prototype.getProperty.call(self, name);
		if (!result) return (operator == '!=');
		if (!operator || value == undefined) return true;
		switch (operator){
			case '=': return (result == value);
			case '*=': return (result.contains(value));
			case '^=': return (result.substr(0, value.length) == value);
			case '$=': return (result.substr(result.length - value.length) == value);
			case '!=': return (result != value);
			case '~=': return result.contains(value, ' ');
			case '|=': return result.contains(value, '-');
		}
		return false;
	}

};

Selectors.Pseudo = new Hash({

	// w3c pseudo selectors

	checked: function(){
		return this.checked;
	},
	
	empty: function(){
		return !(this.innerText || this.textContent || '').length;
	},

	not: function(selector){
		return !Element.match(this, selector);
	},

	contains: function(text){
		return (this.innerText || this.textContent || '').contains(text);
	},

	'first-child': function(){
		return Selectors.Pseudo.index.call(this, 0);
	},

	'last-child': function(){
		var element = this;
		while ((element = element.nextSibling)){
			if (element.nodeType == 1) return false;
		}
		return true;
	},

	'only-child': function(){
		var prev = this;
		while ((prev = prev.previousSibling)){
			if (prev.nodeType == 1) return false;
		}
		var next = this;
		while ((next = next.nextSibling)){
			if (next.nodeType == 1) return false;
		}
		return true;
	},

	'nth-child': function(argument, local){
		argument = (argument == undefined) ? 'n' : argument;
		var parsed = Selectors.Utils.parseNthArgument(argument);
		if (parsed.special != 'n') return Selectors.Pseudo[parsed.special].call(this, parsed.a, local);
		var count = 0;
		local.positions = local.positions || {};
		var uid = $uid(this);
		if (!local.positions[uid]){
			var self = this;
			while ((self = self.previousSibling)){
				if (self.nodeType != 1) continue;
				count ++;
				var position = local.positions[$uid(self)];
				if (position != undefined){
					count = position + count;
					break;
				}
			}
			local.positions[uid] = count;
		}
		return (local.positions[uid] % parsed.a == parsed.b);
	},

	// custom pseudo selectors

	index: function(index){
		var element = this, count = 0;
		while ((element = element.previousSibling)){
			if (element.nodeType == 1 && ++count > index) return false;
		}
		return (count == index);
	},

	even: function(argument, local){
		return Selectors.Pseudo['nth-child'].call(this, '2n+1', local);
	},

	odd: function(argument, local){
		return Selectors.Pseudo['nth-child'].call(this, '2n', local);
	},
	
	selected: function(){
		return this.selected;
	},
	
	enabled: function(){
		return (this.disabled === false);
	}

});

/*
---

script: Event.js

description: Contains the Event Class, to make the event object cross-browser.

license: MIT-style license.

requires:
- /Window
- /Document
- /Hash
- /Array
- /Function
- /String

provides: [Event]

...
*/

var Event = new Native({

	name: 'Event',

	initialize: function(event, win){
		win = win || window;
		var doc = win.document;
		event = event || win.event;
		if (event.$extended) return event;
		this.$extended = true;
		var type = event.type;
		var target = event.target || event.srcElement;
		while (target && target.nodeType == 3) target = target.parentNode;

		if (type.test(/key/)){
			var code = event.which || event.keyCode;
			var key = Event.Keys.keyOf(code);
			if (type == 'keydown'){
				var fKey = code - 111;
				if (fKey > 0 && fKey < 13) key = 'f' + fKey;
			}
			key = key || String.fromCharCode(code).toLowerCase();
		} else if (type.match(/(click|mouse|menu)/i)){
			doc = (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html : doc.body;
			var page = {
				x: event.pageX || event.clientX + doc.scrollLeft,
				y: event.pageY || event.clientY + doc.scrollTop
			};
			var client = {
				x: (event.pageX) ? event.pageX - win.pageXOffset : event.clientX,
				y: (event.pageY) ? event.pageY - win.pageYOffset : event.clientY
			};
			if (type.match(/DOMMouseScroll|mousewheel/)){
				var wheel = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
			}
			var rightClick = (event.which == 3) || (event.button == 2);
			var related = null;
			if (type.match(/over|out/)){
				switch (type){
					case 'mouseover': related = event.relatedTarget || event.fromElement; break;
					case 'mouseout': related = event.relatedTarget || event.toElement;
				}
				if (!(function(){
					while (related && related.nodeType == 3) related = related.parentNode;
					return true;
				}).create({attempt: Browser.Engine.gecko})()) related = false;
			}
		}

		return $extend(this, {
			event: event,
			type: type,

			page: page,
			client: client,
			rightClick: rightClick,

			wheel: wheel,

			relatedTarget: related,
			target: target,

			code: code,
			key: key,

			shift: event.shiftKey,
			control: event.ctrlKey,
			alt: event.altKey,
			meta: event.metaKey
		});
	}

});

Event.Keys = new Hash({
	'enter': 13,
	'up': 38,
	'down': 40,
	'left': 37,
	'right': 39,
	'esc': 27,
	'space': 32,
	'backspace': 8,
	'tab': 9,
	'delete': 46
});

Event.implement({

	stop: function(){
		return this.stopPropagation().preventDefault();
	},

	stopPropagation: function(){
		if (this.event.stopPropagation) this.event.stopPropagation();
		else this.event.cancelBubble = true;
		return this;
	},

	preventDefault: function(){
		if (this.event.preventDefault) this.event.preventDefault();
		else this.event.returnValue = false;
		return this;
	}

});

/*
---

script: Element.Event.js

description: Contains Element methods for dealing with events. This file also includes mouseenter and mouseleave custom Element Events.

license: MIT-style license.

requires: 
- /Element
- /Event

provides: [Element.Event]

...
*/

Element.Properties.events = {set: function(events){
	this.addEvents(events);
}};

Native.implement([Element, Window, Document], {

	addEvent: function(type, fn){
		var events = this.retrieve('events', {});
		events[type] = events[type] || {'keys': [], 'values': []};
		if (events[type].keys.contains(fn)) return this;
		events[type].keys.push(fn);
		var realType = type, custom = Element.Events.get(type), condition = fn, self = this;
		if (custom){
			if (custom.onAdd) custom.onAdd.call(this, fn);
			if (custom.condition){
				condition = function(event){
					if (custom.condition.call(this, event)) return fn.call(this, event);
					return true;
				};
			}
			realType = custom.base || realType;
		}
		var defn = function(){
			return fn.call(self);
		};
		var nativeEvent = Element.NativeEvents[realType];
		if (nativeEvent){
			if (nativeEvent == 2){
				defn = function(event){
					event = new Event(event, self.getWindow());
					if (condition.call(self, event) === false) event.stop();
				};
			}
			this.addListener(realType, defn);
		}
		events[type].values.push(defn);
		return this;
	},

	removeEvent: function(type, fn){
		var events = this.retrieve('events');
		if (!events || !events[type]) return this;
		var pos = events[type].keys.indexOf(fn);
		if (pos == -1) return this;
		events[type].keys.splice(pos, 1);
		var value = events[type].values.splice(pos, 1)[0];
		var custom = Element.Events.get(type);
		if (custom){
			if (custom.onRemove) custom.onRemove.call(this, fn);
			type = custom.base || type;
		}
		return (Element.NativeEvents[type]) ? this.removeListener(type, value) : this;
	},

	addEvents: function(events){
		for (var event in events) this.addEvent(event, events[event]);
		return this;
	},

	removeEvents: function(events){
		var type;
		if ($type(events) == 'object'){
			for (type in events) this.removeEvent(type, events[type]);
			return this;
		}
		var attached = this.retrieve('events');
		if (!attached) return this;
		if (!events){
			for (type in attached) this.removeEvents(type);
			this.eliminate('events');
		} else if (attached[events]){
			while (attached[events].keys[0]) this.removeEvent(events, attached[events].keys[0]);
			attached[events] = null;
		}
		return this;
	},

	fireEvent: function(type, args, delay){
		var events = this.retrieve('events');
		if (!events || !events[type]) return this;
		events[type].keys.each(function(fn){
			fn.create({'bind': this, 'delay': delay, 'arguments': args})();
		}, this);
		return this;
	},

	cloneEvents: function(from, type){
		from = document.id(from);
		var fevents = from.retrieve('events');
		if (!fevents) return this;
		if (!type){
			for (var evType in fevents) this.cloneEvents(from, evType);
		} else if (fevents[type]){
			fevents[type].keys.each(function(fn){
				this.addEvent(type, fn);
			}, this);
		}
		return this;
	}

});

Element.NativeEvents = {
	click: 2, dblclick: 2, mouseup: 2, mousedown: 2, contextmenu: 2, //mouse buttons
	mousewheel: 2, DOMMouseScroll: 2, //mouse wheel
	mouseover: 2, mouseout: 2, mousemove: 2, selectstart: 2, selectend: 2, //mouse movement
	keydown: 2, keypress: 2, keyup: 2, //keyboard
	focus: 2, blur: 2, change: 2, reset: 2, select: 2, submit: 2, //form elements
	load: 1, unload: 1, beforeunload: 2, resize: 1, move: 1, DOMContentLoaded: 1, readystatechange: 1, //window
	error: 1, abort: 1, scroll: 1 //misc
};

(function(){

var $check = function(event){
	var related = event.relatedTarget;
	if (related == undefined) return true;
	if (related === false) return false;
	return ($type(this) != 'document' && related != this && related.prefix != 'xul' && !this.hasChild(related));
};

Element.Events = new Hash({

	mouseenter: {
		base: 'mouseover',
		condition: $check
	},

	mouseleave: {
		base: 'mouseout',
		condition: $check
	},

	mousewheel: {
		base: (Browser.Engine.gecko) ? 'DOMMouseScroll' : 'mousewheel'
	}

});

})();

/*
---

script: Class.js

description: Contains the Class Function for easily creating, extending, and implementing reusable Classes.

license: MIT-style license.

requires:
- /$util
- /Native
- /Array
- /String
- /Function
- /Number
- /Hash

provides: [Class]

...
*/

function Class(params){
	
	if (params instanceof Function) params = {initialize: params};
	
	var newClass = function(){
		Object.reset(this);
		if (newClass._prototyping) return this;
		this._current = $empty;
		var value = (this.initialize) ? this.initialize.apply(this, arguments) : this;
		delete this._current; delete this.caller;
		return value;
	}.extend(this);
	
	newClass.implement(params);
	
	newClass.constructor = Class;
	newClass.prototype.constructor = newClass;

	return newClass;

};

Function.prototype.protect = function(){
	this._protected = true;
	return this;
};

Object.reset = function(object, key){
		
	if (key == null){
		for (var p in object) Object.reset(object, p);
		return object;
	}
	
	delete object[key];
	
	switch ($type(object[key])){
		case 'object':
			var F = function(){};
			F.prototype = object[key];
			var i = new F;
			object[key] = Object.reset(i);
		break;
		case 'array': object[key] = $unlink(object[key]); break;
	}
	
	return object;
	
};

new Native({name: 'Class', initialize: Class}).extend({

	instantiate: function(F){
		F._prototyping = true;
		var proto = new F;
		delete F._prototyping;
		return proto;
	},
	
	wrap: function(self, key, method){
		if (method._origin) method = method._origin;
		
		return function(){
			if (method._protected && this._current == null) throw new Error('The method "' + key + '" cannot be called.');
			var caller = this.caller, current = this._current;
			this.caller = current; this._current = arguments.callee;
			var result = method.apply(this, arguments);
			this._current = current; this.caller = caller;
			return result;
		}.extend({_owner: self, _origin: method, _name: key});

	}
	
});

Class.implement({
	
	implement: function(key, value){
		
		if ($type(key) == 'object'){
			for (var p in key) this.implement(p, key[p]);
			return this;
		}
		
		var mutator = Class.Mutators[key];
		
		if (mutator){
			value = mutator.call(this, value);
			if (value == null) return this;
		}
		
		var proto = this.prototype;

		switch ($type(value)){
			
			case 'function':
				if (value._hidden) return this;
				proto[key] = Class.wrap(this, key, value);
			break;
			
			case 'object':
				var previous = proto[key];
				if ($type(previous) == 'object') $mixin(previous, value);
				else proto[key] = $unlink(value);
			break;
			
			case 'array':
				proto[key] = $unlink(value);
			break;
			
			default: proto[key] = value;

		}
		
		return this;

	}
	
});

Class.Mutators = {
	
	Extends: function(parent){

		this.parent = parent;
		this.prototype = Class.instantiate(parent);

		this.implement('parent', function(){
			var name = this.caller._name, previous = this.caller._owner.parent.prototype[name];
			if (!previous) throw new Error('The method "' + name + '" has no parent.');
			return previous.apply(this, arguments);
		}.protect());

	},

	Implements: function(items){
		$splat(items).each(function(item){
			if (item instanceof Function) item = Class.instantiate(item);
			this.implement(item);
		}, this);

	}
	
};

/*
---

script: Class.Extras.js

description: Contains Utility Classes that can be implemented into your own Classes to ease the execution of many common tasks.

license: MIT-style license.

requires:
- /Class

provides: [Chain, Events, Options]

...
*/

var Chain = new Class({

	$chain: [],

	chain: function(){
		this.$chain.extend(Array.flatten(arguments));
		return this;
	},

	callChain: function(){
		return (this.$chain.length) ? this.$chain.shift().apply(this, arguments) : false;
	},

	clearChain: function(){
		this.$chain.empty();
		return this;
	}

});

var Events = new Class({

	$events: {},

	addEvent: function(type, fn, internal){
		type = Events.removeOn(type);
		if (fn != $empty){
			this.$events[type] = this.$events[type] || [];
			this.$events[type].include(fn);
			if (internal) fn.internal = true;
		}
		return this;
	},

	addEvents: function(events){
		for (var type in events) this.addEvent(type, events[type]);
		return this;
	},

	fireEvent: function(type, args, delay){
		type = Events.removeOn(type);
		if (!this.$events || !this.$events[type]) return this;
		this.$events[type].each(function(fn){
			fn.create({'bind': this, 'delay': delay, 'arguments': args})();
		}, this);
		return this;
	},

	removeEvent: function(type, fn){
		type = Events.removeOn(type);
		if (!this.$events[type]) return this;
		if (!fn.internal) this.$events[type].erase(fn);
		return this;
	},

	removeEvents: function(events){
		var type;
		if ($type(events) == 'object'){
			for (type in events) this.removeEvent(type, events[type]);
			return this;
		}
		if (events) events = Events.removeOn(events);
		for (type in this.$events){
			if (events && events != type) continue;
			var fns = this.$events[type];
			for (var i = fns.length; i--; i) this.removeEvent(type, fns[i]);
		}
		return this;
	}

});

Events.removeOn = function(string){
	return string.replace(/^on([A-Z])/, function(full, first){
		return first.toLowerCase();
	});
};

var Options = new Class({

	setOptions: function(){
		this.options = $merge.run([this.options].extend(arguments));
		if (!this.addEvent) return this;
		for (var option in this.options){
			if ($type(this.options[option]) != 'function' || !(/^on[A-Z]/).test(option)) continue;
			this.addEvent(option, this.options[option]);
			delete this.options[option];
		}
		return this;
	}

});

/*
---

script: Request.js

description: Powerful all purpose Request Class. Uses XMLHTTPRequest.

license: MIT-style license.

requires:
- /Element
- /Chain
- /Events
- /Options
- /Browser

provides: [Request]

...
*/

var Request = new Class({

	Implements: [Chain, Events, Options],

	options: {/*
		onRequest: $empty,
		onComplete: $empty,
		onCancel: $empty,
		onSuccess: $empty,
		onFailure: $empty,
		onException: $empty,*/
		url: '',
		data: '',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
		},
		async: true,
		format: false,
		method: 'post',
		link: 'ignore',
		isSuccess: null,
		emulation: true,
		urlEncoded: true,
		encoding: 'utf-8',
		evalScripts: false,
		evalResponse: false,
		noCache: false
	},

	initialize: function(options){
		this.xhr = new Browser.Request();
		this.setOptions(options);
		this.options.isSuccess = this.options.isSuccess || this.isSuccess;
		this.headers = new Hash(this.options.headers);
	},

	onStateChange: function(){
		if (this.xhr.readyState != 4 || !this.running) return;
		this.running = false;
		this.status = 0;
		$try(function(){
			this.status = this.xhr.status;
		}.bind(this));
		this.xhr.onreadystatechange = $empty;
		if (this.options.isSuccess.call(this, this.status)){
			this.response = {text: this.xhr.responseText, xml: this.xhr.responseXML};
			this.success(this.response.text, this.response.xml);
		} else {
			this.response = {text: null, xml: null};
			this.failure();
		}
	},

	isSuccess: function(){
		return ((this.status >= 200) && (this.status < 300));
	},

	processScripts: function(text){
		if (this.options.evalResponse || (/(ecma|java)script/).test(this.getHeader('Content-type'))) return $exec(text);
		return text.stripScripts(this.options.evalScripts);
	},

	success: function(text, xml){
		this.onSuccess(this.processScripts(text), xml);
	},

	onSuccess: function(){
		this.fireEvent('complete', arguments).fireEvent('success', arguments).callChain();
	},

	failure: function(){
		this.onFailure();
	},

	onFailure: function(){
		this.fireEvent('complete').fireEvent('failure', this.xhr);
	},

	setHeader: function(name, value){
		this.headers.set(name, value);
		return this;
	},

	getHeader: function(name){
		return $try(function(){
			return this.xhr.getResponseHeader(name);
		}.bind(this));
	},

	check: function(){
		if (!this.running) return true;
		switch (this.options.link){
			case 'cancel': this.cancel(); return true;
			case 'chain': this.chain(this.caller.bind(this, arguments)); return false;
		}
		return false;
	},

	send: function(options){
		if (!this.check(options)) return this;
		this.running = true;

		var type = $type(options);
		if (type == 'string' || type == 'element') options = {data: options};

		var old = this.options;
		options = $extend({data: old.data, url: old.url, method: old.method}, options);
		var data = options.data, url = String(options.url), method = options.method.toLowerCase();

		switch ($type(data)){
			case 'element': data = document.id(data).toQueryString(); break;
			case 'object': case 'hash': data = Hash.toQueryString(data);
		}

		if (this.options.format){
			var format = 'format=' + this.options.format;
			data = (data) ? format + '&' + data : format;
		}

		if (this.options.emulation && !['get', 'post'].contains(method)){
			var _method = '_method=' + method;
			data = (data) ? _method + '&' + data : _method;
			method = 'post';
		}

		if (this.options.urlEncoded && method == 'post'){
			var encoding = (this.options.encoding) ? '; charset=' + this.options.encoding : '';
			this.headers.set('Content-type', 'application/x-www-form-urlencoded' + encoding);
		}

		if (this.options.noCache){
			var noCache = 'noCache=' + new Date().getTime();
			data = (data) ? noCache + '&' + data : noCache;
		}

		var trimPosition = url.lastIndexOf('/');
		if (trimPosition > -1 && (trimPosition = url.indexOf('#')) > -1) url = url.substr(0, trimPosition);

		if (data && method == 'get'){
			url = url + (url.contains('?') ? '&' : '?') + data;
			data = null;
		}

		this.xhr.open(method.toUpperCase(), url, this.options.async);

		this.xhr.onreadystatechange = this.onStateChange.bind(this);

		this.headers.each(function(value, key){
			try {
				this.xhr.setRequestHeader(key, value);
			} catch (e){
				this.fireEvent('exception', [key, value]);
			}
		}, this);

		this.fireEvent('request');
		this.xhr.send(data);
		if (!this.options.async) this.onStateChange();
		return this;
	},

	cancel: function(){
		if (!this.running) return this;
		this.running = false;
		this.xhr.abort();
		this.xhr.onreadystatechange = $empty;
		this.xhr = new Browser.Request();
		this.fireEvent('cancel');
		return this;
	}

});

(function(){

var methods = {};
['get', 'post', 'put', 'delete', 'GET', 'POST', 'PUT', 'DELETE'].each(function(method){
	methods[method] = function(){
		var params = Array.link(arguments, {url: String.type, data: $defined});
		return this.send($extend(params, {method: method}));
	};
});

Request.implement(methods);

})();

Element.Properties.send = {

	set: function(options){
		var send = this.retrieve('send');
		if (send) send.cancel();
		return this.eliminate('send').store('send:options', $extend({
			data: this, link: 'cancel', method: this.get('method') || 'post', url: this.get('action')
		}, options));
	},

	get: function(options){
		if (options || !this.retrieve('send')){
			if (options || !this.retrieve('send:options')) this.set('send', options);
			this.store('send', new Request(this.retrieve('send:options')));
		}
		return this.retrieve('send');
	}

};

Element.implement({

	send: function(url){
		var sender = this.get('send');
		sender.send({data: this, url: url || sender.options.url});
		return this;
	}

});

/*
---

script: Request.HTML.js

description: Extends the basic Request Class with additional methods for interacting with HTML responses.

license: MIT-style license.

requires:
- /Request
- /Element

provides: [Request.HTML]

...
*/

Request.HTML = new Class({

	Extends: Request,

	options: {
		update: false,
		append: false,
		evalScripts: true,
		filter: false
	},

	processHTML: function(text){
		var match = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
		text = (match) ? match[1] : text;

		var container = new Element('div');

		return $try(function(){
			var root = '<root>' + text + '</root>', doc;
			if (Browser.Engine.trident){
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = false;
				doc.loadXML(root);
			} else {
				doc = new DOMParser().parseFromString(root, 'text/xml');
			}
			root = doc.getElementsByTagName('root')[0];
			if (!root) return null;
			for (var i = 0, k = root.childNodes.length; i < k; i++){
				var child = Element.clone(root.childNodes[i], true, true);
				if (child) container.grab(child);
			}
			return container;
		}) || container.set('html', text);
	},

	success: function(text){
		var options = this.options, response = this.response;

		response.html = text.stripScripts(function(script){
			response.javascript = script;
		});

		var temp = this.processHTML(response.html);

		response.tree = temp.childNodes;
		response.elements = temp.getElements('*');

		if (options.filter) response.tree = response.elements.filter(options.filter);
		if (options.update) document.id(options.update).empty().set('html', response.html);
		else if (options.append) document.id(options.append).adopt(temp.getChildren());
		if (options.evalScripts) $exec(response.javascript);

		this.onSuccess(response.tree, response.elements, response.html, response.javascript);
	}

});

Element.Properties.load = {

	set: function(options){
		var load = this.retrieve('load');
		if (load) load.cancel();
		return this.eliminate('load').store('load:options', $extend({data: this, link: 'cancel', update: this, method: 'get'}, options));
	},

	get: function(options){
		if (options || ! this.retrieve('load')){
			if (options || !this.retrieve('load:options')) this.set('load', options);
			this.store('load', new Request.HTML(this.retrieve('load:options')));
		}
		return this.retrieve('load');
	}

};

Element.implement({

	load: function(){
		this.get('load').send(Array.link(arguments, {data: Object.type, url: String.type}));
		return this;
	}

});

/*
---

script: Fx.js

description: Contains the basic animation logic to be extended by all other Fx Classes.

license: MIT-style license.

requires:
- /Chain
- /Events
- /Options

provides: [Fx]

...
*/

var Fx = new Class({

	Implements: [Chain, Events, Options],

	options: {
		/*
		onStart: $empty,
		onCancel: $empty,
		onComplete: $empty,
		*/
		fps: 50,
		unit: false,
		duration: 500,
		link: 'ignore'
	},

	initialize: function(options){
		this.subject = this.subject || this;
		this.setOptions(options);
		this.options.duration = Fx.Durations[this.options.duration] || this.options.duration.toInt();
		var wait = this.options.wait;
		if (wait === false) this.options.link = 'cancel';
	},

	getTransition: function(){
		return function(p){
			return -(Math.cos(Math.PI * p) - 1) / 2;
		};
	},

	step: function(){
		var time = $time();
		if (time < this.time + this.options.duration){
			var delta = this.transition((time - this.time) / this.options.duration);
			this.set(this.compute(this.from, this.to, delta));
		} else {
			this.set(this.compute(this.from, this.to, 1));
			this.complete();
		}
	},

	set: function(now){
		return now;
	},

	compute: function(from, to, delta){
		return Fx.compute(from, to, delta);
	},

	check: function(){
		if (!this.timer) return true;
		switch (this.options.link){
			case 'cancel': this.cancel(); return true;
			case 'chain': this.chain(this.caller.bind(this, arguments)); return false;
		}
		return false;
	},

	start: function(from, to){
		if (!this.check(from, to)) return this;
		this.from = from;
		this.to = to;
		this.time = 0;
		this.transition = this.getTransition();
		this.startTimer();
		this.onStart();
		return this;
	},

	complete: function(){
		if (this.stopTimer()) this.onComplete();
		return this;
	},

	cancel: function(){
		if (this.stopTimer()) this.onCancel();
		return this;
	},

	onStart: function(){
		this.fireEvent('start', this.subject);
	},

	onComplete: function(){
		this.fireEvent('complete', this.subject);
		if (!this.callChain()) this.fireEvent('chainComplete', this.subject);
	},

	onCancel: function(){
		this.fireEvent('cancel', this.subject).clearChain();
	},

	pause: function(){
		this.stopTimer();
		return this;
	},

	resume: function(){
		this.startTimer();
		return this;
	},

	stopTimer: function(){
		if (!this.timer) return false;
		this.time = $time() - this.time;
		this.timer = $clear(this.timer);
		return true;
	},

	startTimer: function(){
		if (this.timer) return false;
		this.time = $time() - this.time;
		this.timer = this.step.periodical(Math.round(1000 / this.options.fps), this);
		return true;
	}

});

Fx.compute = function(from, to, delta){
	return (to - from) * delta + from;
};

Fx.Durations = {'short': 250, 'normal': 500, 'long': 1000};

/*
---

script: Fx.CSS.js

description: Contains the CSS animation logic. Used by Fx.Tween, Fx.Morph, Fx.Elements.

license: MIT-style license.

requires:
- /Fx
- /Element.Style

provides: [Fx.CSS]

...
*/

Fx.CSS = new Class({

	Extends: Fx,

	//prepares the base from/to object

	prepare: function(element, property, values){
		values = $splat(values);
		var values1 = values[1];
		if (!$chk(values1)){
			values[1] = values[0];
			values[0] = element.getStyle(property);
		}
		var parsed = values.map(this.parse);
		return {from: parsed[0], to: parsed[1]};
	},

	//parses a value into an array

	parse: function(value){
		value = $lambda(value)();
		value = (typeof value == 'string') ? value.split(' ') : $splat(value);
		return value.map(function(val){
			val = String(val);
			var found = false;
			Fx.CSS.Parsers.each(function(parser, key){
				if (found) return;
				var parsed = parser.parse(val);
				if ($chk(parsed)) found = {value: parsed, parser: parser};
			});
			found = found || {value: val, parser: Fx.CSS.Parsers.String};
			return found;
		});
	},

	//computes by a from and to prepared objects, using their parsers.

	compute: function(from, to, delta){
		var computed = [];
		(Math.min(from.length, to.length)).times(function(i){
			computed.push({value: from[i].parser.compute(from[i].value, to[i].value, delta), parser: from[i].parser});
		});
		computed.$family = {name: 'fx:css:value'};
		return computed;
	},

	//serves the value as settable

	serve: function(value, unit){
		if ($type(value) != 'fx:css:value') value = this.parse(value);
		var returned = [];
		value.each(function(bit){
			returned = returned.concat(bit.parser.serve(bit.value, unit));
		});
		return returned;
	},

	//renders the change to an element

	render: function(element, property, value, unit){
		element.setStyle(property, this.serve(value, unit));
	},

	//searches inside the page css to find the values for a selector

	search: function(selector){
		if (Fx.CSS.Cache[selector]) return Fx.CSS.Cache[selector];
		var to = {};
		Array.each(document.styleSheets, function(sheet, j){
			var href = sheet.href;
			if (href && href.contains('://') && !href.contains(document.domain)) return;
			var rules = sheet.rules || sheet.cssRules;
			Array.each(rules, function(rule, i){
				if (!rule.style) return;
				var selectorText = (rule.selectorText) ? rule.selectorText.replace(/^\w+/, function(m){
					return m.toLowerCase();
				}) : null;
				if (!selectorText || !selectorText.test('^' + selector + '$')) return;
				Element.Styles.each(function(value, style){
					if (!rule.style[style] || Element.ShortStyles[style]) return;
					value = String(rule.style[style]);
					to[style] = (value.test(/^rgb/)) ? value.rgbToHex() : value;
				});
			});
		});
		return Fx.CSS.Cache[selector] = to;
	}

});

Fx.CSS.Cache = {};

Fx.CSS.Parsers = new Hash({

	Color: {
		parse: function(value){
			if (value.match(/^#[0-9a-f]{3,6}$/i)) return value.hexToRgb(true);
			return ((value = value.match(/(\d+),\s*(\d+),\s*(\d+)/))) ? [value[1], value[2], value[3]] : false;
		},
		compute: function(from, to, delta){
			return from.map(function(value, i){
				return Math.round(Fx.compute(from[i], to[i], delta));
			});
		},
		serve: function(value){
			return value.map(Number);
		}
	},

	Number: {
		parse: parseFloat,
		compute: Fx.compute,
		serve: function(value, unit){
			return (unit) ? value + unit : value;
		}
	},

	String: {
		parse: $lambda(false),
		compute: $arguments(1),
		serve: $arguments(0)
	}

});

/*
---

script: Fx.Tween.js

description: Formerly Fx.Style, effect to transition any CSS property for an element.

license: MIT-style license.

requires: 
- /Fx.CSS

provides: [Fx.Tween, Element.fade, Element.highlight]

...
*/

Fx.Tween = new Class({

	Extends: Fx.CSS,

	initialize: function(element, options){
		this.element = this.subject = document.id(element);
		this.parent(options);
	},

	set: function(property, now){
		if (arguments.length == 1){
			now = property;
			property = this.property || this.options.property;
		}
		this.render(this.element, property, now, this.options.unit);
		return this;
	},

	start: function(property, from, to){
		if (!this.check(property, from, to)) return this;
		var args = Array.flatten(arguments);
		this.property = this.options.property || args.shift();
		var parsed = this.prepare(this.element, this.property, args);
		return this.parent(parsed.from, parsed.to);
	}

});

Element.Properties.tween = {

	set: function(options){
		var tween = this.retrieve('tween');
		if (tween) tween.cancel();
		return this.eliminate('tween').store('tween:options', $extend({link: 'cancel'}, options));
	},

	get: function(options){
		if (options || !this.retrieve('tween')){
			if (options || !this.retrieve('tween:options')) this.set('tween', options);
			this.store('tween', new Fx.Tween(this, this.retrieve('tween:options')));
		}
		return this.retrieve('tween');
	}

};

Element.implement({

	tween: function(property, from, to){
		this.get('tween').start(arguments);
		return this;
	},

	fade: function(how){
		var fade = this.get('tween'), o = 'opacity', toggle;
		how = $pick(how, 'toggle');
		switch (how){
			case 'in': fade.start(o, 1); break;
			case 'out': fade.start(o, 0); break;
			case 'show': fade.set(o, 1); break;
			case 'hide': fade.set(o, 0); break;
			case 'toggle':
				var flag = this.retrieve('fade:flag', this.get('opacity') == 1);
				fade.start(o, (flag) ? 0 : 1);
				this.store('fade:flag', !flag);
				toggle = true;
			break;
			default: fade.start(o, arguments);
		}
		if (!toggle) this.eliminate('fade:flag');
		return this;
	},

	highlight: function(start, end){
		if (!end){
			end = this.retrieve('highlight:original', this.getStyle('background-color'));
			end = (end == 'transparent') ? '#fff' : end;
		}
		var tween = this.get('tween');
		tween.start('background-color', start || '#ffff88', end).chain(function(){
			this.setStyle('background-color', this.retrieve('highlight:original'));
			tween.callChain();
		}.bind(this));
		return this;
	}

});

/*
---

script: Fx.Transitions.js

description: Contains a set of advanced transitions to be used with any of the Fx Classes.

license: MIT-style license.

credits:
- Easing Equations by Robert Penner, <http://www.robertpenner.com/easing/>, modified and optimized to be used with MooTools.

requires:
- /Fx

provides: [Fx.Transitions]

...
*/

Fx.implement({

	getTransition: function(){
		var trans = this.options.transition || Fx.Transitions.Sine.easeInOut;
		if (typeof trans == 'string'){
			var data = trans.split(':');
			trans = Fx.Transitions;
			trans = trans[data[0]] || trans[data[0].capitalize()];
			if (data[1]) trans = trans['ease' + data[1].capitalize() + (data[2] ? data[2].capitalize() : '')];
		}
		return trans;
	}

});

Fx.Transition = function(transition, params){
	params = $splat(params);
	return $extend(transition, {
		easeIn: function(pos){
			return transition(pos, params);
		},
		easeOut: function(pos){
			return 1 - transition(1 - pos, params);
		},
		easeInOut: function(pos){
			return (pos <= 0.5) ? transition(2 * pos, params) / 2 : (2 - transition(2 * (1 - pos), params)) / 2;
		}
	});
};

Fx.Transitions = new Hash({

	linear: $arguments(0)

});

Fx.Transitions.extend = function(transitions){
	for (var transition in transitions) Fx.Transitions[transition] = new Fx.Transition(transitions[transition]);
};

Fx.Transitions.extend({

	Pow: function(p, x){
		return Math.pow(p, x[0] || 6);
	},

	Expo: function(p){
		return Math.pow(2, 8 * (p - 1));
	},

	Circ: function(p){
		return 1 - Math.sin(Math.acos(p));
	},

	Sine: function(p){
		return 1 - Math.sin((1 - p) * Math.PI / 2);
	},

	Back: function(p, x){
		x = x[0] || 1.618;
		return Math.pow(p, 2) * ((x + 1) * p - x);
	},

	Bounce: function(p){
		var value;
		for (var a = 0, b = 1; 1; a += b, b /= 2){
			if (p >= (7 - 4 * a) / 11){
				value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
				break;
			}
		}
		return value;
	},

	Elastic: function(p, x){
		return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
	}

});

['Quad', 'Cubic', 'Quart', 'Quint'].each(function(transition, i){
	Fx.Transitions[transition] = new Fx.Transition(function(p){
		return Math.pow(p, [i + 2]);
	});
});

/*
---

script: Fx.Morph.js

description: Formerly Fx.Styles, effect to transition any number of CSS properties for an element using an object of rules, or CSS based selector rules.

license: MIT-style license.

requires:
- /Fx.CSS

provides: [Fx.Morph]

...
*/

Fx.Morph = new Class({

	Extends: Fx.CSS,

	initialize: function(element, options){
		this.element = this.subject = document.id(element);
		this.parent(options);
	},

	set: function(now){
		if (typeof now == 'string') now = this.search(now);
		for (var p in now) this.render(this.element, p, now[p], this.options.unit);
		return this;
	},

	compute: function(from, to, delta){
		var now = {};
		for (var p in from) now[p] = this.parent(from[p], to[p], delta);
		return now;
	},

	start: function(properties){
		if (!this.check(properties)) return this;
		if (typeof properties == 'string') properties = this.search(properties);
		var from = {}, to = {};
		for (var p in properties){
			var parsed = this.prepare(this.element, p, properties[p]);
			from[p] = parsed.from;
			to[p] = parsed.to;
		}
		return this.parent(from, to);
	}

});

Element.Properties.morph = {

	set: function(options){
		var morph = this.retrieve('morph');
		if (morph) morph.cancel();
		return this.eliminate('morph').store('morph:options', $extend({link: 'cancel'}, options));
	},

	get: function(options){
		if (options || !this.retrieve('morph')){
			if (options || !this.retrieve('morph:options')) this.set('morph', options);
			this.store('morph', new Fx.Morph(this, this.retrieve('morph:options')));
		}
		return this.retrieve('morph');
	}

};

Element.implement({

	morph: function(props){
		this.get('morph').start(props);
		return this;
	}

});

/*
---

script: DomReady.js

description: Contains the custom event domready.

license: MIT-style license.

requires:
- /Element.Event

provides: [DomReady]

...
*/

Element.Events.domready = {

	onAdd: function(fn){
		if (Browser.loaded) fn.call(this);
	}

};

(function(){

	var domready = function(){
		if (Browser.loaded) return;
		Browser.loaded = true;
		window.fireEvent('domready');
		document.fireEvent('domready');
	};
	
	window.addEvent('load', domready);

	if (Browser.Engine.trident){
		var temp = document.createElement('div');
		(function(){
			($try(function(){
				temp.doScroll(); // Technique by Diego Perini
				return document.id(temp).inject(document.body).set('html', 'temp').dispose();
			})) ? domready() : arguments.callee.delay(50);
		})();
	} else if (Browser.Engine.webkit && Browser.Engine.version < 525){
		(function(){
			(['loaded', 'complete'].contains(document.readyState)) ? domready() : arguments.callee.delay(50);
		})();
	} else {
		document.addEvent('DOMContentLoaded', domready);
	}

})();

/*
---

script: Cookie.js

description: Class for creating, reading, and deleting browser Cookies.

license: MIT-style license.

credits:
- Based on the functions by Peter-Paul Koch (http://quirksmode.org).

requires:
- /Options

provides: [Cookie]

...
*/

var Cookie = new Class({

	Implements: Options,

	options: {
		path: false,
		domain: false,
		duration: false,
		secure: false,
		document: document
	},

	initialize: function(key, options){
		this.key = key;
		this.setOptions(options);
	},

	write: function(value){
		value = encodeURIComponent(value);
		if (this.options.domain) value += '; domain=' + this.options.domain;
		if (this.options.path) value += '; path=' + this.options.path;
		if (this.options.duration){
			var date = new Date();
			date.setTime(date.getTime() + this.options.duration * 24 * 60 * 60 * 1000);
			value += '; expires=' + date.toGMTString();
		}
		if (this.options.secure) value += '; secure';
		this.options.document.cookie = this.key + '=' + value;
		return this;
	},

	read: function(){
		var value = this.options.document.cookie.match('(?:^|;)\\s*' + this.key.escapeRegExp() + '=([^;]*)');
		return (value) ? decodeURIComponent(value[1]) : null;
	},

	dispose: function(){
		new Cookie(this.key, $merge(this.options, {duration: -1})).write('');
		return this;
	}

});

Cookie.write = function(key, value, options){
	return new Cookie(key, options).write(value);
};

Cookie.read = function(key){
	return new Cookie(key).read();
};

Cookie.dispose = function(key, options){
	return new Cookie(key, options).dispose();
};

/*
---

script: Swiff.js

description: Wrapper for embedding SWF movies. Supports External Interface Communication.

license: MIT-style license.

credits: 
- Flash detection & Internet Explorer + Flash Player 9 fix inspired by SWFObject.

requires:
- /Options
- /$util

provides: [Swiff]

...
*/

var Swiff = new Class({

	Implements: [Options],

	options: {
		id: null,
		height: 1,
		width: 1,
		container: null,
		properties: {},
		params: {
			quality: 'high',
			allowScriptAccess: 'always',
			wMode: 'transparent',
			swLiveConnect: true
		},
		callBacks: {},
		vars: {}
	},

	toElement: function(){
		return this.object;
	},

	initialize: function(path, options){
		this.instance = 'Swiff_' + $time();

		this.setOptions(options);
		options = this.options;
		var id = this.id = options.id || this.instance;
		var container = document.id(options.container);

		Swiff.CallBacks[this.instance] = {};

		var params = options.params, vars = options.vars, callBacks = options.callBacks;
		var properties = $extend({height: options.height, width: options.width}, options.properties);

		var self = this;

		for (var callBack in callBacks){
			Swiff.CallBacks[this.instance][callBack] = (function(option){
				return function(){
					return option.apply(self.object, arguments);
				};
			})(callBacks[callBack]);
			vars[callBack] = 'Swiff.CallBacks.' + this.instance + '.' + callBack;
		}

		params.flashVars = Hash.toQueryString(vars);
		if (Browser.Engine.trident){
			properties.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
			params.movie = path;
		} else {
			properties.type = 'application/x-shockwave-flash';
			properties.data = path;
		}
		var build = '<object id="' + id + '"';
		for (var property in properties) build += ' ' + property + '="' + properties[property] + '"';
		build += '>';
		for (var param in params){
			if (params[param]) build += '<param name="' + param + '" value="' + params[param] + '" />';
		}
		build += '</object>';
		this.object = ((container) ? container.empty() : new Element('div')).set('html', build).firstChild;
	},

	replaces: function(element){
		element = document.id(element, true);
		element.parentNode.replaceChild(this.toElement(), element);
		return this;
	},

	inject: function(element){
		document.id(element, true).appendChild(this.toElement());
		return this;
	},

	remote: function(){
		return Swiff.remote.apply(Swiff, [this.toElement()].extend(arguments));
	}

});

Swiff.CallBacks = {};

Swiff.remote = function(obj, fn){
	var rs = obj.CallFunction('<invoke name="' + fn + '" returntype="javascript">' + __flash__argumentsToXML(arguments, 2) + '</invoke>');
	return eval(rs);
};

// end Greased MooTools
// hack to circumvent 'bug' when overriding toString (and others):
// https://mootools.lighthouseapp.com/projects/2706/tickets/651-classtostring-broken-on-122-big-regression
['toString', 'toLocaleString', 'valueOf', 'toSource', 'watch', 'unwatch', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable'].each(function (method) {
	Class.Mutators[method] = $arguments(0);
});

//GM_addStyle('.InlineEditorOpen { background-color: #000000 ! important } ');
GM_addStyle('.hidden_from_view { display: none; visibility: hidden; }');
GM_addStyle('.ucpDialogStyle { background: #BFBFBF; -moz-border-radius: 1em; -webkit-border-radius: 1em; -khtml-border-radius: 1em; border-radius: 1em; border: grey solid 1px; text-align: left;}');
GM_addStyle('.ucpa_warning { color: darkviolet }');
GM_addStyle('.ucpa_error { color: red }');

// Greasemonkey helpers and wrappers:
var getJSVariable = function (regex) {
        // Thanks to Vispillo for this compact code
        var retval;
        $$('script').each( function (script) {
            if (retval != undefined) {
                return;
            }
            var html = script.innerHTML;
            try {
                retval = html.match(regex)[1];
            } catch (e) {
            }
        });
        return retval;
}

var convertEscapedUnicode = function (str) {
	if (str.match('\\u[0-9a-f]{4}')) {
		var match = str.match(/(.*)\\u([0-9a-f]{4})(.*)/);
		if ($chk(match)) { // with both ends
			return convertEscapedUnicode(match[1]) + String.fromCharCode(parseInt(match[2],16)) + convertEscapedUnicode(match[3]);
		}
		match = str.match(/(.*)\\u([0-9a-f]{4})/);
		if ($chk(match)) { // only front end
			return convertEscapedUnicode(match[1]) + String.fromCharCode(parseInt(match[2],16));
		}
		match = str.match(/\\u([0-9a-f]{4})(.*)/);
		if ($chk(match)) { // only back end
			return String.fromCharCode(parseInt(match[1],16)) + convertEscapedUnicode(match[2]);
		}
		match = str.match(/\\u([0-9a-f]{4})/);
		if ($chk(match)) { // sanity check
			return String.fromCharCode(parseInt(match[1],16));
		}
		return str;
	} else {
		return str;
	}
}

GM_getLoggedInUser = function () {
	var username = getJSVariable(/[\"\']user[\"\'][ :]+{[^}]*\"name\"[ :]+[\'\"]([^\'\"]+)[\'\"]/);
	if (!$chk(username)) {
		username = getJSVariable(/global_name\s*=\s*\'([^\']+)\'/);
	}
	if (!$chk(username)) {
		try {
			username = $('TopBar').getElement('table.Header').getElement('td.Status').getElement('a.Pale').get('text'); // use 'text', not 'html' (replaces &amp; with & ..)
		} catch (e) {
			try {
				username = $('TopBar').getElement('table.Header').getElement('td.Status').getElement('a.ywa-track').get('text');
			} catch (e) {
				GM_log("unable to retrieve user (" + e + ")");
			}
		}
	}
	return convertEscapedUnicode(username);
}

GM_getGlobalNsid = function () {
	var usernsid = getJSVariable(/[\"\']user[\"\'][ :]+{[^}]*\"nsid\"[ :]+[\'\"]([^\'\"]+)[\'\"]/);
        if (!$chk(usernsid)) {
                usernsid = getJSVariable(/global_nsid\s*=\s*\'([^\']+)\'/);
        }
        return usernsid;
}

GM_getPublicKey = function () {
        // the following api_key is reserved for this application
        // if you need an api_key for your own application, please request one at 
        // http://www.flickr.com/services/apps/create/apply/
        // if you request a Non-Commercial key, you'll get it instantly
        return 'b96f5648216fc3599b3b5fc96e218504'; // the app's own key
}

GM_getPrivateKey = function() {
	return getJSVariable(/[\'\"]api_key[\'\"][ :]+[\'\"]([^\'\"]+)[\'\"]/);
}

GM_getAuthHash = function () {
        var authhash = getJSVariable(/[\"\']auth_hash[\"\'][ :]+[\"\']([^\"\']+)[\"\']/);
        if (!$chk(authhash)) {
                authhash = getJSVariable(/global_auth_hash[ =]+\'([^\']+)\'/);
        }
        return authhash;
}

GM_getAuthToken = function () {
        var authtoken = getJSVariable(/[\"\']auth_token[\"\'][ :]+[\"\']([^\"\']*)[\"\']/);
        if (!$chk(authtoken)) {
                authtoken = getJSVariable(/global_auth_token[ =]+\'([^\']*)\'/);
        }
        return authtoken;
}

GM_getGroupId = function () {
	var groupID = getJSVariable(/[\"\']group[\"\'][: ]+{[^}]*[\"\']nsid[\"\'][: ]+[\"\'](\d+@\w\d{2})[\"\']/);
	if (!$chk(groupID)) {
    		groupID = getJSVariable(/\"search_scope\"[ :]+\"([^\"]+)\"/);
	}
	return groupID;
}

if (Browser.Engine.webkit || // Chrome, Safari
    Browser.Engine.presto) { // Opera

    var keyPrefix = 'UNIFIEDChallengesCheckPlayAdminTool.';

    GM_log = function (message) {
        if (Browser.Engine.webkit) {
            console.info(message);
        } else {
            opera.postError(message);
        }
    }

    GM_getValue = function(key, defValue) {
        var retval = window.localStorage.getItem(keyPrefix + key);
        if (retval == null) {
            return defValue;
        }
        return undefined;
    }

    GM_setValue = function(key, value) {
        try {
            window.localStorage.setItem(keyPrefix + key, value);
        } catch (e) {
            GM_log("error setting value: " + e);
        }
    }

    GM_deleteValue = function(key) {
        try {
            window.localStorage.removeItem(keyPrefix + key);
        } catch (e) {
            GM_log("error removing value: " + e);
        }
    }

    GM_addStyle = function(css) {
            var style = document.createElement('style');
            style.textContent = css;
            document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_listKeys = function(regexp, callback) {
        var list = [];
        var reKey = new RegExp("^" + keyPrefix); // first, make sure we only use our own keys
        for (var i = 0, il = window.localStorage.length; i < il; i++) {
            // only use the script's own keys
            var key = window.localStorage.key(i);
	    try {
	            if (key && key.match(reKey)) {
			var unprefixedKey = key.replace(keyPrefix, '');
			if (regexp) {
				if (unprefixedKey.match(regexp)) {
					if (callback) {
						callback(unprefixedKey);
					} else {
						list.push(unprefixedKey);
					}
				}
			} else {
				if (callback) {
					callback(unprefixedKey);
				} else {
					list.push(unprefixedKey);
				}
			}
            	    }
	    } catch (e) {
		GM_log("error in listKeys: " + e);
	    }
        }
        return list;
    }

    GM_getObject = function (key) {
        var value = GM_getValue(key);
        if ($chk(value)) {
            return JSON.parse(value);
        }
        return undefined;
    }

    GM_storeObject = function (key, value) {
        GM_setValue(key, JSON.stringify(value));
    }

} else { // Firefox

    GM_listKeys = function(regexp, callback) {
        var list = [];
        for each (var key in GM_listValues()) {
                try {
                        if (regexp) {
                                if (key && key.match(regexp)) {
                                        if (callback) {
                                                callback(key);
                                        } else {
                                                list.push(key);
                                        }
                                }
                        } else {
                                if (callback) {
                                        callback(key);
                                } else {
                                        list.push(key);
                                }
                        }
                } catch(e) {
			GM_log("error in listKeys: " + e);
                }
        }
        return list;
    }

    GM_getObject = function (key) {
        var value = GM_getValue(key);
        if ($chk(value)) {
            try {
                return JSON.parse(value);
            } catch(e) {
                return eval('(' + value + ')');
            }
        }
        return null;
    }

    GM_storeObject = function (key, value) {
        try {
            GM_setValue(key, JSON.stringify(value));
        } catch (e) {
            GM_setValue(key, uneval(value));
        }
    }

}
// end Greasemonkey helpers and wrappers

// background page connection
// * Chrome only *
// end background page connection

// version check:
function getVersion(callbackId, callbackEvent) {
	$(callbackId).fireEvent(callbackEvent, { stat: "success", version: CPtoolversion });
}

function showUpdateNotification(data) {
	var onlineVersion = data.onlineVersion;
	var version = data.version;
	var beta = data.beta;

    var color = 'white';
    var updatespan = $('AlesaDams_updates_span');
    if (!$chk(updatespan)) {
	updatespan = new Element('span', {
		id: 'AlesaDams_updates_span',
		// copied from Google++ userscript:
		styles: {
		    'background': '#E0E0E0',
		    padding: '2px 4px',
		    display: 'block',
		    '-moz-background-clip': 'border',
		    '-moz-background-origin': 'padding',
		    '-moz-background-inline-policy': 'continuous',
		    position: 'fixed',
		    opacity: '0.7',
		    'z-index': 1011,
		    bottom: '5px',
		    right: '5px',
		    left: '5px'
		}
    	}).inject($(document).getElement("body"));
    } else {
	updatespan.setStyle('background', '#E0E0E0');
    }
    var bgColor = beta ? 'grey' : 'black';
    var updater = new Element('span', {
        styles: {
                background: bgColor + ' none repeat scroll 0% 0%',
                margin: '2px 5px',
                position: 'relative',
                'float': beta ? 'left' : 'right',
                opacity: beta ? '0.5' : ''
        }
    }).inject(updatespan);
    new Element('a', {
        html: 'UNIFIED CheckPlay Admin Tool: ' + (beta ? 'beta ' + version : onlineVersion + ' available'),
        href: installPage,
        target: '_blank',
        title:  'to the ' + (beta ? 'stable version' : '') + ' install page (opens in new tab)',
        styles: {
            'color': color,
            'text-decoration': 'none'
        }
    }).inject(updater);
    new Element('a', {
        html: beta ? ' (feedback)' : ' (Changes)',
        title: 'opens in new tab',
        href: beta ? 'http://www.flickr.com/groups/unified_checkplay/discuss/72157623759768824/' :
                      'http://www.flickr.com/groups/unified_checkplay/discuss/72157623838711730/',
        styles: {
            'text-decoration': 'none'
        },
        target: '_blank'
    }).inject(updater);
}

function outOfDate(version, onlineVersion) {
        var reVersionMatch      = /(\d+)\.(\d+)\.(\d+)/;
        var onlineVersionParts  = reVersionMatch.exec(onlineVersion);
        var currentVersionParts = reVersionMatch.exec(version);
        var onlineVersionMajor, onlineVersionMinor, onlineVersionBuild;
        //[ onlineVersion, onlineVersionMajor, onlineVersionMinor, onlineVersionBuild ] = onlineVersionParts; 'invalid left-hand side' in Chrome
        onlineVersionMajor = onlineVersionParts[1];
        onlineVersionMinor = onlineVersionParts[2];
        onlineVersionBuild = onlineVersionParts[3];
        var currentVersionMajor, currentVersionMinor, currentVersionBuild;
        //[ currentVersion, currentVersionMajor, currentVersionMinor, currentVersionBuild] = currentVersionParts;
        currentVersionMajor = currentVersionParts[1];
        currentVersionMinor = currentVersionParts[2];
        currentVersionBuild = currentVersionParts[3];
        // first check major: important update! => rewrite, flickr updates, greasemonkey updates
        if (parseInt(onlineVersionMajor, 10) > parseInt(currentVersionMajor, 10)) {
            return true;
        } else if (parseInt(onlineVersionMajor, 10) === parseInt(currentVersionMajor, 10)) { // we don't want to downgrade
            // minor version update => new functionality
            if (parseInt(onlineVersionMinor, 10) > parseInt(currentVersionMinor, 10)) {
                return true;
            } else if (parseInt(onlineVersionMinor, 10) === parseInt(currentVersionMinor, 10)) { // we don't want to downgrade
                // build version update => bugfixes
                if (parseInt(onlineVersionBuild, 10) > parseInt(currentVersionBuild, 10)) {
                    return true;
                }
            }
        }
        return false;
}

function getThreadInfo(data) {
        var threadId = data.threadId;
        var callback = data.callback;

        try {  
                new Request({
                        url: 'http://www.flickr.com',
                        onSuccess: function (responseText, responseXML) {
                                    try {
                                        var result;
                                        try {
                                            result = JSON.parse(responseText);
                                        } catch (e) {
                                                GM_log("error parsing JSON reply for thread " + threadId + " (" + e + "): '" + responseText);
                                                callback({ threadId: threadId, success: false, message: e });
                                                return;
                                        }
                                        if (result.stat === 'fail') {
                                                callback({ threadId: threadId, success: false, message: result.message });
                                        } else {
                                                callback({ threadId: threadId, success: true, message: result.topic.message._content });
                                        }
                                    } catch (e) {
                                        GM_log("ERROR processing thread info result: " + e);
                                        callback({ threadId: threadId, success: false, message: "ERROR processing thread info result: " + e });
                                    }
                                },
                                onFailure: function (response) {
                                        GM_log("error: " + response.statusText);
                                        callback({ threadId: threadId, success: false, message: response.statusText });
                                }
                }).get('/services/rest', {
                        api_key: GM_getPublicKey(), // as long as we use the function in checkVersion only
                        auth_hash: GM_getAuthHash(),
                        auth_token: GM_getAuthToken(),
                        format: 'json',
                        method: 'flickr.groups.discuss.topics.getInfo',
                        nojsoncallback: 1,
                        topic_id: threadId
                });
        } catch (e) {
                callback({ threadId: threadId, success: false, message: 'Exception: ' + e });
        }
}

function getThreadReplies(data) {
        var threadId = data.threadId;
        var callback = data.callback;

        try {  
                new Request({
                        url: 'http://www.flickr.com',
                        onSuccess: function (responseText, responseXML) {
                                    try {
                                        var result;
                                        try {
                                            result = JSON.parse(responseText);
                                        } catch (e) {
                    				GM_log("error parsing JSON reply for thread " + threadId + " (" + e + "): '" + responseText);
		    				callback({ threadId: threadId, success: false, message: e });
						return;
                                        }
                                        if (result.stat === 'fail') {
                                                callback({ threadId: threadId, success: false, message: result.message });
                                        } else {
                                                callback({ threadId: threadId, success: true, topic: result.replies.topic, replies: result.replies.reply });
                                        }
                                    } catch (e) {
                                        GM_log("ERROR processing thread replies result: " + e);
                                        callback({ threadId: threadId, success: false, message: "ERROR processing thread replies result: " + e });
                                    }
                                },
                                onFailure: function (response) {
                                        GM_log("error: " + response.statusText);
                                        callback({ threadId: threadId, success: false, message: response.statusText });
                                }
		}).get('/services/rest', {
			api_key: GM_getPrivateKey(),
			auth_hash: GM_getAuthHash(),
			auth_token: GM_getAuthToken(),
			method: 'flickr.groups.discuss.replies.getList',
			format: 'json',
			nojsoncallback: 1,
			topic_id: threadId,
			page: 1,
			per_page: 500
		});
        } catch (e) {
                callback({ threadId: threadId, success: false, message: 'Exception: ' + e });
        }
}

function checkVersion(version) {
try {
    var lastVersionCheckTime = GM_getValue("lastVersionCheckTime");
    var elapsedtime;
    var CPStartTime = new Date();
    if ($chk(lastVersionCheckTime)) {
        elapsedtime = CPStartTime.getTime() - lastVersionCheckTime;
    }
    if (!$chk(lastVersionCheckTime) || elapsedtime / 1000 > 60 * 60 * 12) { //more then 12h ago
	getThreadInfo({ threadId: '72157623759768824', callback: function(retval) {
                        var success = retval.success;
                        var message = retval.message;
                        if (!success) {
                                GM_log("error getting version info: " + message);
                                GM_deleteValue("onlineVersion");
                                GM_deleteValue("lastVersionCheckTime");
                                return;
                        }
                        var onlineVersion = message.split(/<i>current stable script version:\s*/)[1].split(/<\/i>/)[0];
                        GM_setValue("onlineVersion", onlineVersion);
                        GM_setValue("lastVersionCheckTime", (new Date()).getTime().toString());
                }
        });
        GM_setValue("lastVersionCheckTime", CPStartTime.getTime().toString());
    }

    var onlineVersion = GM_getValue("onlineVersion");
    if ($chk(onlineVersion)) {
        var updateAvailable = outOfDate(version, onlineVersion);
        if (updateAvailable) {
            showUpdateNotification({ onlineVersion: onlineVersion });
        } else if (version != onlineVersion) {// not out of date, but different version => beta
            showUpdateNotification({ onlineVersion: onlineVersion, version: version, beta: true });
	}
    }
} catch (e) {
	GM_log("ERROR checking version: " + e);
}
}
// end of version check


var CPStartTime = new Date();

var UCPprefix = 'UCPA';
// old common library:
var UCPGroupConfigReader = new Class({
    timeBetweenReads: 12 * 60 * 60 * 1000, // 12 hours
    groupListingURL: 'http://www.flickr.com/groups/1307178@N20/discuss/72157623452533109/',
    initialize: function () {
    },
    checkForUpdates: function (groupname, force, callback) {
	if (!$chk(GM_getValue(UCPprefix + ".groupConfig.list"))) {
        	this.readGrouplistURL(false, function (result) {
			if (result.stat == 'error') {
                        	if ($chk(callback)) {
					callback( { stat: 'error', 'error': 'unable to read group list: ' + result.error} );
				} else {
					alert("unable to read group list: " + result.error);
				}
				return;
			}
		});
	}
        if ($chk(GM_getValue(UCPprefix + ".groupConfig." + groupname))) {
            var lastReadTime = GM_getValue(UCPprefix + ".groupConfig.lastReadTime." + groupname);
            var now = new Date().getTime();
            var elapsedTime = $chk(lastReadTime) ? now - lastReadTime : this.timeBetweenReads + 1;
            if (elapsedTime > this.timeBetweenReads || force) {
                GM_log("updating " + groupname + " definitions");
                this.readGroupConfigURL(groupname, force === true ? true : false, callback);
            }
        } else {
            this.readGroupConfigURL(groupname, true, callback);
        }
    },
    createGroupConfig: function (groupname) {
        if (!$chk(groupname)) {
            var reGroupnameMatch = /.*flickr.com\/groups\/([^\/]*)\//;
            groupname = reGroupnameMatch.exec(document.location.href)[1];
        }
        //GM_log("reading config for '" + groupname + "'");
        var storedConfig;
        if ($chk(GM_getValue(UCPprefix + ".groupConfig." + groupname))) {
            storedConfig = GM_getValue(UCPprefix + ".groupConfig." + groupname);
        }
        if ($chk(storedConfig) && storedConfig.match('groupId')) { // test on groupId for versions prior to CL v0.0.7
            try {
                return new UCPGroupConfig(GM_getObject(UCPprefix + ".groupConfig." + groupname));
            } catch (e) {
                // parse error?
                GM_deleteValue(UCPprefix + ".groupConfig." + groupname);
                return null;
            }
        } else {
            // if not available, read from URL, synchronously
            //GM_log("reading configURL for '" + groupname + "' synchronously");
            // make sure the group list is read also: a new group should not have to hit F5 twice, just to get support!
            GM_deleteValue(UCPprefix + ".groupConfig.list");
            this.readGroupConfigURL(groupname, true);
            storedConfig = GM_getValue(UCPprefix + ".groupConfig." + groupname);
            if ($chk(storedConfig)) {
                try {
                    return new UCPGroupConfig(GM_getObject(UCPprefix + ".groupConfig." + groupname));
                } catch (e) {
                    // parse error?
                    GM_deleteValue(UCPprefix + ".groupConfig." + groupname);
                    return null;
                }
            }
            GM_log("did not find definitions for " + groupname);
            return null;
        }
    },
    readGroupConfigURL: function (groupname, synchronous, callback) {
        //GM_log("reading group url for '" + groupname + "' - synchronous: " + synchronous);
        if (synchronous) {
            this.readGrouplistURL(true, function (result) {
		if (result.stat == 'error') {
			GM_log(result.error);
			if ($chk(callback)) callback(result);
			return;
		}
	    });
        }
        var groupList = this.groupList();
        if (!$chk(groupList[groupname]) || !$chk(groupList[groupname].definitions)) {
            return;
        }
        var groupUrl = groupList[groupname].definitions;
        //GM_log("reading group definitions for '" + groupname + "' (" + groupList[groupname].groupId + ") from '" + groupUrl + "'");
        var request = new Request({
            url: groupUrl,
            async: !synchronous,
            onSuccess: function (responseText, responseXML) {
                var discussionHTML = responseText;
                var tempDiv = new Element('div', {
                    html: discussionHTML.stripScripts()
                });

                var problem = tempDiv.getElement('p.Problem');
                if ($chk(problem)) {
                        if ($chk(callback)) {
                            callback( { stat: 'error', 'error': problem.innerHTML } );
                        }
			return;
		}
                var announcement = tempDiv.getElement('td.Said p');
                announcement.getElements('small').each(function (small) { 
                    small.dispose(); 
                });
                var groupConfiguration = announcement.textContent
                                            .trim()
                                            .replace(/\n/g, '') // Flickr changes
                                            .replace(/\"/g, '&quot;')
                                            .replace(/\\\'/g, '&#39;') // replace \' with its html number
                                            .replace(/\'{2}/g, "\"\"")
                                            // make the definitions strict JSON (use ' instead of " -> no &quot;)
                                            .replace(/\'([^\']+)\'/g, '\"$1\"') // replace ' with " for valid JSON
                                            // reset
                                            .replace(/&quot;/g, "\'");
                //GM_log("groupConfiguration: " + groupConfiguration);
                var onlineConfig;
                try {
                    onlineConfig = JSON.parse(groupConfiguration);
                    // make the definitions json-valid (use ' instead of " -> no &quot;)
                } catch (e) {
                    GM_log("json error in group config def: " + e); // JSON can't handle 'reName': /^d.../
                    GM_log("onlineConfig: " + groupConfiguration);
                    // Chrome only uses JSON!!
                    try {
                        onlineConfig = eval('(' + groupConfiguration + ')');
                    } catch (f) {
                        GM_log("error evaluating onlineConfig: " + e);
                        GM_log("onlineConfig: " + groupConfiguration);
                        if ($chk(callback)) {
                            callback( { stat: 'error', 'error': 'error evaluating onlineConfig: ' + e } );
                        }
                        return;
                    }
                }
                //GM_log("preparing default states");
                // reset defaults for non-defined states
                // TODO: document
                var defaultStates = {
                    open: "OPEN", // no photos yet
                    waitingForEntries: "OPEN", // at least one photo; some groups use "ON HOLD", ..
                    vote: /VOTE/i, // some groups use "VOTING", ..
                    closed: "CLOSED", // 
                    expired: "EXPIRED",
                    voided: "VOIDED"
                };
                // inject group list items
                for (var item in groupList[groupname]) {
                    if (groupList[groupname].hasOwnProperty(item)) {
                        onlineConfig[item] = groupList[groupname][item];
                    }
                }
                if (!$chk(onlineConfig.states)) {
                    onlineConfig.states = defaultStates;
                    // special case: vote is defined as a regexp in the defaults => Chrome won't have a vote state!
                    onlineConfig.states.voteRegExp = {
                        expression: 'VOTE',
                        flags: 'i'
                    };
                } else {
                // warning: special case: vote is defined as a regexp in the defaults!
                    for (var state in defaultStates) {
                        if (defaultStates.hasOwnProperty(state)) {
                            if (!$chk(onlineConfig.states[state])) {
                                if (state === 'vote' && !$chk(onlineConfig.states['voteRegExp'])) {
                                    onlineConfig.states.voteRegExp = {
                                        expression: 'VOTE',
                                        flags: 'i'
                                    };
                                } else {
                                    onlineConfig.states[state] = defaultStates[state];
                                }
                            }
                        }
                    }
                }
                GM_storeObject(UCPprefix + ".groupConfig." + groupname, onlineConfig);
                GM_setValue(UCPprefix + ".groupConfig.lastReadTime." + groupname, new Date().getTime().toString());
                if ($chk(callback)) {
                    callback( { stat: 'ok' } );
                }
            }.bind(this),
	    onFailure: function (response) {
		GM_log("error reading group config url: " + response.statusText);
		if ($chk(callback)) {
			callback({ stat: 'error', error: 'error reading group config url: ' + response.statusText });
		}
	    }
        }).get();
    },
    readGrouplistURL: function (synchronous, callback) {
        //GM_log("reading group list");
        var request = new Request({
            method: 'get', 
            url: this.groupListingURL,
            async: !synchronous, 
            onSuccess: function (responseText, responseXML) {
                var discussionHTML = responseText;
                var tempDiv = new Element('div', {
                    html: discussionHTML.stripScripts()
                });
                
                var announcement = tempDiv.getElement('td.Said p');
                announcement.getElements('small').each(function (small) { 
                    small.dispose(); 
                });
                // turn it into strict JSON
                var groupList = announcement.textContent.trim().replace(/\n/g, '')
                                            // make the definitions strict JSON (use ' instead of " -> no &quot;)
                                            .replace(/\'([^\']+)\'/g, '\"$1\"'); // replace ' with " for valid JSON
                var groups = {};
                try {
                    groups = JSON.parse(groupList);
                } catch(e) {
                    GM_log("json error in group list: " + e);
                    GM_log("groupList: " + groupList);
                    try {
                        groups = eval('(' + groupList + ')');
                    } catch (f) {
                        GM_log("error parsing groupList result: " + e);
                        GM_log("groupList: " + groupList);
                        if ($chk(callback)) {
                            callback( { stat: 'error', error: 'error parsing groupList result: ' + e });
                        }
                        return;
                    }
                }
                // inject groupname
                $each(groups, function (value, key) {
                    value.groupname = key;
                });
                //ucpStoredGrouplist = groups;
                //GM_log("storing group list");
                GM_storeObject(UCPprefix + ".groupConfig.list", groups);
                if ($chk(callback)) {
                    callback( { stat: 'ok' } );
                }
            }.bind(this),
	    onFailure: function (response) {
		GM_log("error reading group list url: " + response.statusText);
		if ($chk(callback)) {
			callback({ stat: 'error', error: 'UCPA error reading groupList: ' + response.statusText });
		}
	    }
        }).send();
    },
    groupList: function () {
        if ($chk(GM_getValue(UCPprefix + ".groupConfig.list"))) {
            //GM_log("working with storage value, and update in background");
            try {
                return GM_getObject(UCPprefix + ".groupConfig.list");
            } catch (e) { // parse error?
                GM_deleteValue(UCPprefix + ".groupConfig.list");
                //return null; continue: reread
            }
        }
        //GM_log("reading list url");
        this.readGrouplistURL(true);
        //GM_log("returning stored dict: '" + ucpStoredGrouplist + "'");
        try {
            return GM_getObject(UCPprefix + ".groupConfig.list");
        } catch (e) { // parse error?
            GM_deleteValue(UCPprefix + ".groupConfig.list");
            return null;
        }
    }
});


var UCPMedalListReader = new Class({
    timeBetweenReads: 7 * 24 * 60 * 60 * 1000, // a week
    medalListingURL: 'http://www.flickr.com/groups/unified_checkplay/discuss/72157625730082807/',
    initialize: function () {
    },
    checkForUpdates: function (force, callback) {
        var list = GM_getValue("UCPA.medalList");
        if ($chk(list)) {
            var lastReadTime = GM_getValue("UCPA.medalList.lastReadTime");
            var now = new Date().getTime();
            var elapsedTime = $chk(lastReadTime) ? now - lastReadTime : this.timeBetweenReads + 1;
            if (elapsedTime > this.timeBetweenReads || force) {
                GM_log("updating medal definitions");
                this.readMedalsURL(callback);
            } else {
	    	callback({ success: true });
	    }
        } else {
            this.readMedalsURL(callback);
        }
    },
    createMedalsList: function (callback) {
        var storedList = GM_getValue("UCPA.medalList");
        if ($chk(storedList)) {
            try {
		callback({ success: true, medals: GM_getObject("UCPA.medalList") });
            } catch (e) {
                // parse error?
                GM_deleteValue("UCPA.medalList");
                callback({ success: false, message: e });
            }
        } else {
            this.readMedalsURL(function (retval) {
	        if (retval.success) {
		    storedList = GM_getValue("UCPA.medalList");
		    if ($chk(storedList)) {
			try {
			    callback({ success: true, medals: GM_getObject("UCPA.medalList") });
			} catch (e) {
			    // parse error?
			    GM_deleteValue("UCPA.medalList");
			    callback({ success: false, message: e });
			}
		    } else {
		    	callback({ success: false, message: "did not find definitions for medals!!" });
		    }
		} else {
			callback({ success: false, message: retval.message });
		}
	    });
        }
    },
    readMedalsURL: function (callback) {
        var request = new Request({
            url: this.medalListingURL,
            onSuccess: function (responseText, responseXML) {
                var discussionHTML = responseText;
                var tempDiv = new Element('div', {
                    html: discussionHTML.stripScripts()
                });

                var medalList = {};
                var medalListingParts = tempDiv.getElements('td.Said p').each(function (medalListingPart) {
                    medalListingPart.getElements('small, br').each(function (el) { 
                        el.dispose(); 
                    });
                    var medalListingPartHTML = medalListingPart.textContent
                                                .trim()
                                                .replace(/\n/g, '') // flickr changes
                                                .replace(/\"/g, '&quot;')
                                                .replace(/\\\'/g, '&#39;') // replace \' with its html number
                                                .replace(/\'{2}/g, "\"\"")
                                                // make the definitions strict JSON (use ' instead of " -> no &quot;)
                                                .replace(/\'([^\']+)\'/g, '\"$1\"') // replace ' with " for valid JSON
                                                // reset
                                                .replace(/&quot;/g, "\"");
                    var onlineMedalPart;
                    try {
                        onlineMedalPart = JSON.parse(medalListingPartHTML);
                        // make the definitions json-valid (use ' instead of " -> no &quot;)
                    } catch (e) {
                        GM_log("json error: " + e + " - trying with eval");
                        GM_log("onlineConfig: " + medalListingPartHTML);
                        try {
                            onlineMedalPart = eval('(' + medalListingPartHTML + ')');
                        } catch (f) {
                            GM_log("error evaluating onlineConfig: " + e);
                            GM_log("onlineConfig: " + medalListingPartHTML);
                            callback( { success: false, message: 'error evaluating onlineConfig: ' + e } );
                            return;
                        }
                    }
                    $each(onlineMedalPart, function(group, idx) {
                        //GM_log("adding group " + idx);
                        medalList[idx] = group;
			$each(group, function (medal, medalId) { // inject medal id into object
				medal.medalId = medalId;
			});
                    });
                });
                GM_storeObject("UCPA.medalList", medalList);
                GM_setValue("UCPA.medalList.lastReadTime", new Date().getTime().toString());
                if ($chk(callback)) {
                    callback( { success: true } );
                }
            }.bind(this),
	    onFailure: function (response) {
		GM_log("failed reading medals url");
		if ($chk(callback)) {
			callback({ success: false, message: 'error reading medals url: ' + response.statusText });
		}
	    }
        }).get();
    }
});

var UCPGroupConfig = new Class({
    Implements: [Options],
    options: {
        challengeDefinitions: {},
        groupLimit: -1,
        states: {},
        allowsPhotoInAnnouncement: false,
        nonPhotoImages: {},
        groupLimitLabelAddon: "",
        skipFirstReply: false, // FavesContest shows last winning score in first reply => Finished
        skipFirstTwoRepliesForVotes: false, // FavesContest have a second reply '... 25-50 faves...', recognized as a vote
        mandatoryGroupLabels: false,
        automaticVoteStart: true,
        languageOverrides: {},
        legacyLabels: null,
        groupname: null, // the part of the Flickr URL
        name: null, // the human name
        groupId: null,
        awardWinnersGroup: false, // only used in UCP Admin
        primaryGroup: null, // only used in UCP Admin
	bumpMessage: "", //<i>This is a comment to bump the thread to the top of the list</i>"
	workflow: undefined,
	usesTimeConstraints: false,
	challengeNumberingRegExp: null, // Admin only
	challengeNumberingLabel: null, // for challenge groups that don't number: check for name format
	similarThemesRegExp: null, // Admin only
	debug: false
    },
    initialize: function (options) {
        this.setOptions(options);
        // override states with RegExp's
        [ 'open', 'waitingForEntries', 'closed', 'vote', 'expired', 'voided' ].each(function (state) {
            // override states with RegExp's
            if ($chk(options.states[state + 'RegExp'])) {
                //GM_log("creating " + state + " regexp");
                this.options.states[state] = 
                    new RegExp(options.states[state + 'RegExp'].expression, options.states[state + 'RegExp'].flags);
            }
            if (!$chk(this.options.states[state])) {
                GM_log("!!! no definition for state '" + state + "' !!!");
            }
        }, this);
        if (this.options.debug == true || this.options.debug == 'true') {
            // force re-read
            GM_setValue(UCPprefix + ".groupConfig.lastReadTime." + this.groupname(), 1);
        }
    },
    // accessors
    groupname: function () {
        return this.options.groupname;
    },
    challengeDefinitions: function () {
        return this.options.challengeDefinitions;
    },
    groupLimit: function () {
        return this.options.groupLimit;
    },
    groupLimitLabelAddon: function () {
        return this.options.groupLimitLabelAddon;
    },
    states: function () {
        return this.options.states;
    },
    legacyLabels: function () {
        return this.options.legacyLabels;
    },
    skipFirstReply: function () {
        return this.options.skipFirstReply;
    },
    skipFirstTwoRepliesForVotes: function () {
        return this.options.skipFirstTwoRepliesForVotes;
    },
    hasLegacyLabels: function () {
        return $chk(this.options.legacyLabels);
    },
    mandatoryGroupLabels: function () {
        return this.options.mandatoryGroupLabels;
    },
    automaticVoteStart: function () {
        return this.options.automaticVoteStart;
    },
    languageOverrides: function () {
        return this.options.languageOverrides;
    },
    allowsPhotoInAnnouncement: function () {
        return this.options.allowsPhotoInAnnouncement;
    },
    nonPhotoImages: function () {
        return this.options.nonPhotoImages;
    },
    groupId: function () {
        return this.options.groupId;
    },
    awardWinnersGroup: function () {
        return this.options.awardWinnersGroup;
    },
    primaryGroup: function () {
        return this.options.primaryGroup;
    },
    bumpMessage: function () {
    	return this.options.bumpMessage;
    },
    workflow: function() {
	if ($chk(this.options.workflow) && this.options.workflow.stickyChallenges == undefined) {
		this.options.workflow.stickyChallenges = true; // if not defined: sticky
	}
    	return this.options.workflow;
    },
    reExcludeMatch: function () {
        if ($chk(this.reExcludeMatchRegExp)) {
            return this.reExcludeMatchRegExp;
        }

        if (!$chk(this.options.excludes) || !$chk(this.options.excludes.matches) || !$chk(this.options.excludes.indexes)) {
            return /[^.]/; // match nothing
        }

        if ($chk(this.options.excludes.matches.reMatchRegExp)) { // only one
            this.reExcludeMatchRegExp = new RegExp(this.options.excludes.matches.reMatchRegExp.expression,
                                                    this.options.excludes.matches.flags);
            return this.reExcludeMatchRegExp;
        }

        var reMatches = [];
        for (var name in this.options.excludes.matches) {
            if (this.options.excludes.matches.hasOwnProperty(name)) {
                reMatches.push(this.options.excludes.matches[name]);
            }
        }
//        GM_log("creating regexp with '" + reMatches.join("|") + "'");
        return new RegExp(reMatches.join("|"), "ig");
    },
    excludeReplyIndexes: function () {
        if (!$chk(this.options.excludes) || !$chk(this.options.excludes.matches) || !$chk(this.options.excludes.indexes)) {
            return [];
        }
        var retval = [];
        for (var index in this.options.excludes.indexes) {
            if (this.options.excludes.indexes.hasOwnProperty(index)) {
                retval.push(this.options.excludes.indexes[index]);
            }
        }
        //GM_log("debug: " + retval);
        return retval;
    },
    challengeNumberingRegExp: function () {
	var storedRegExp = GM_getValue('UCPA.CrossCheckChallengeNumberingRegExp.' + this.groupname());
	if ($chk(storedRegExp)) return storedRegExp;
	return this.options.challengeNumberingRegExp;
    },
    challengeNumberingLabel: function () {
    	if (this.options.challengeNumberingLabel) {
		return this.options.challengeNumberingLabel;
	}
	return 'check the challenge numbering';
    },
    similarThemesRegExp: function () {
    	var storedRegExp = GM_getValue('UCPA.CrossCheckSimilarThemesRegExp.' + this.groupname());
	if ($chk(storedRegExp)) return storedRegExp;
	else return this.options.similarThemesRegExp;
    },
    extractChallengeDefinition: function (challengeName) {
        // do not run .each()! must stop after the first match: priorities
        if (!$chk(this.challengeDefinitions())) {
            GM_log("no challenge definitions for this group");
            return new UCPChallengeDefinition({
                scoreType: "UNKNOWN"
            });
        }
        for (var name in this.challengeDefinitions()) {
            if (this.challengeDefinitions().hasOwnProperty(name)) {
                var challengeDef = this.challengeDefinitions()[name];
                // TMOACG still uses reName (and others)
                var nameIndication = challengeDef.reName; // challengeDef is a simple JSON object
                if ($chk(challengeDef.reNameRegExp)) {
                    if (!$chk(challengeDef.reNameRegExpObject)) {
                        challengeDef.reNameRegExpObject = 
                                new RegExp(challengeDef.reNameRegExp.expression, challengeDef.reNameRegExp.flags);
                    }
                    nameIndication = challengeDef.reNameRegExpObject;
                }
                if (!$chk(nameIndication)) {
                    GM_log("!! missing reName, or reNameRegExp !!");
                } else {
                    var theMatch = challengeName.match(nameIndication);
                    // DEBUG
                    //GM_log("comparing "+challengeName+" with "+nameIndication+": "+theMatch);
                    if ($chk(theMatch)) {
                        // inject name
                        challengeDef.name = name;
                        return new UCPChallengeDefinition(challengeDef);
                    }
                }
            }
        }
        // none found!
        GM_log("NOT FOUND: " + challengeName + " not found in definitions");
        return new UCPChallengeDefinition({
            scoreType: "UNKNOWN"
        });
    },
    skipChallenge: function (challengeName) {
        if (challengeName.match(this.states().closed))  {
            return true;
        }
        if (challengeName.match(this.states().expired)) {
            return true;
        }
        if (challengeName.match(this.states().voided))  {
            return true;
        }
        for (var name in this.challengeDefinitions()) {
            if (this.challengeDefinitions().hasOwnProperty(name)) {
                var challengeDef = this.challengeDefinitions()[name];
                var specialName = ( $chk(challengeDef.reNameRegExpObject) ? challengeDef.reNameRegExpObject : challengeDef.reName);
                if (challengeName.match(specialName)) {
                    return false;
                }
            }
        }
        if (challengeName.match(this.states().open))    {
            return false;
        }
        if (challengeName.match(this.states().waitingForEntries)) {
            return false;
        }
        if (challengeName.match(this.states().vote))    {
            return false;
        }
        return true;
    },
    usesTimeConstraints: function () {
           return this.options.usesTimeConstraints == true || this.options.usesTimeConstraints == 'true';
    },
    hasTimeConstrainedChallenges: function () {
    	for (var name in this.challengeDefinitions()) {
		if (this.challengeDefinitions().hasOwnProperty(name)) {
			var challengeDef = this.challengeDefinitions()[name];
			// challengeDef is a simple JSON object
			if ($chk(challengeDef.usesTimeConstraints)) {
				return true;
			}
		}
	}
	return false;
    }
});

function isGroupAdministratorOrModerator (userNsid, someGroupId, callback) { // removed from UCPGroupConfig to allow bumping in non-challenge groups
	var groupId = groupConfig.groupId();
	if ($chk(someGroupId)) {
		groupId = someGroupId;
	}
	var groupname = GM_getValue("UCPA.groupname." + groupId);
        var administrator = GM_getValue("UCPA.groupAdministrator." + groupId + "." + userNsid);
	var moderator = GM_getValue("UCPA.groupModerator." + groupId + "." + userNsid);
        var lastReadTime = GM_getValue("UCPA.groupAdminOrMod." + groupId + "." + userNsid + ".lastReadTime");
	var elapsedTime = ($chk(lastReadTime) ? new Date().getTime() - parseInt(lastReadTime,10) : 60 * 60 * 1000 + 1);
	if ((administrator != undefined || moderator != undefined || groupname != undefined) && elapsedTime < 60 * 60 * 1000) {
		callback({ success: true, administrator: administrator == true || administrator == 'true', moderator: moderator == true || moderator == 'true' });
		return;
	}

        var magisterLudi = GM_getPrivateKey();
        var apiNameData = {
            api_key: magisterLudi,
            auth_hash: GM_getAuthHash(),
            auth_token: GM_getAuthToken(),
            format: 'json',
            nojsoncallback: 1,
            method: 'flickr.groups.getInfo',
            group_id: groupId
        };
        new Request({
            url: "http://www.flickr.com/",
            onFailure: function (response) {
                GM_log("failed reading info from group: " + response.statusText);
            },
            onSuccess: function (responseText, responseXML) {
                var result;
                try {
                    result = JSON.parse(responseText);
                } catch (e) {
			try {
				result = eval('(' + responseText + ')');
			} catch (f) {
				GM_log("ERROR processing group info: " + e);
				return;
			}
                }
                if (result.stat === 'fail') {
                    GM_log("failed reading info from group: " +result.code + " - " + result.message);
                    return;
                }
		GM_setValue("UCPA.groupname." + groupId, result.group.name._content);
            }
        }).get("/services/rest", apiNameData);

        var apiData = {
            api_key: magisterLudi,
            auth_hash: GM_getAuthHash(),
            auth_token: GM_getAuthToken(),
            format: 'json',
            nojsoncallback: 1,
            method: 'flickr.groups.members.getList',
            group_id: groupId,
            membertypes: '3,4',
            per_page: 500 // one page should be sufficient?
        };
        new Request({
            url: "http://www.flickr.com/",
            onFailure: function (response) {
                GM_log("failed reading members from group: " + response.statusText);
	    	callback({ success: false, message: response.statusText });
            },
            onSuccess: function (responseText, responseXML) {
                var result;
		var moderator = false;
		var administrator = false;
                try {
                    result = JSON.parse(responseText);
                } catch (e) {
			try {
				result = eval('(' + responseText + ')');
			} catch (f) {
				GM_log("failed processing members from group: " + e);
				callback({ success: false, message: e });
				return;
			}
                }
                if (result.stat === 'fail') {
                    GM_log("failed reading members from group: " + result.code + " - " + result.message);
		    callback({ success: false, message: result.message });
                    return;
                }
                var members = result.members;
                $each(members.member, function (member) {
                    if (member.nsid === userNsid) {
		    	if (member.membertype == 3) { // moderator
				moderator = true;
			} else if (member.membertype == 4) { // administrator
				administrator = true;
			}
                    }
                });
		GM_setValue("UCPA.groupModerator." + groupId + "." + userNsid, moderator);
		GM_setValue("UCPA.groupAdministrator." + groupId + "." + userNsid, administrator);
                GM_setValue("UCPA.groupAdminOrMod." + groupId + "." + userNsid + ".lastReadTime", 
                            new Date().getTime().toString());
		callback({ success: true, administrator: administrator, moderator: moderator });
            }
        }).get("/services/rest", apiData);
    }

function isInPool(photoId, groupId, callback) {
	var apiData = {
	    api_key: GM_getPrivateKey(),
	    auth_hash: GM_getAuthHash(),
	    auth_token: GM_getAuthToken(),
	    format: 'json',
	    method: 'flickr.groups.pools.getContext',
	    photo_id: photoId,
	    group_id: groupId,
	    nojsoncallback: 1
	};
	new Request({
	    url: "http://www.flickr.com/",
	    onSuccess: function (responseText, responseXML) {
		var result;
		try {
		    result = JSON.parse(responseText);
		} catch (e) {
			try {
				result = eval('(' + responseText + ')');
			} catch (f) {
				callback({ success: false, message: "ERROR parsing json reply: " + e, photoId: photoId });
				return;
			}
		}
		if (result.stat === 'fail') {
			// special case: flickr.groups.pools.getContext returns { "stat":"fail", "code":2, "message":"Photo not in pool"}
			if (result.code == 2) {
				callback({ success: true, found: false });
			} else {
				callback({ success: false, message: "ERROR: " + result.code + " - " + result.message });
			}
			return;
		}
		callback({ success: true, found: true });
	    }
	}).get("/services/rest", apiData); // funtion, apiCallback
}

var UCPThreadDecoratorFactory = new Class({
    initialize: function () {
    }
});

var UCPTopicListingThreadDecoratorFactory = new Class({
    Extends: UCPThreadDecoratorFactory,
    initialize: function () {
    },
    createStatusDecorator: function(newchlgstatus, ucpGroupPreferences) {
        return new UCPTopicListingThreadStatusDecorator();
    },
    createPhotoDecorator: function () {
        return new UCPEmptyDecorator();
    },
    createExcludeDecorator: function () {
        return new UCPExcludeReplyDecorator();
    }
});

var UCPTopicListingReplyDecoratorFactory = new Class({
    Extends: UCPThreadDecoratorFactory,
    initialize: function () {
    },
    createPhotoDecorator: function () {
        return new UCPPhotoReplyDecorator();
    },
    createVoteDecorator: function () {
        return new UCPVoteReplyDecorator();
    },
    createExcludeDecorator: function () {
        return new UCPEmptyDecorator();
    }
});

var UCPTopicListingThreadStatusDecorator = new Class({
    decorateThread: function (ucpThread) {
    // TODO
    }
});

var UCPEmptyDecoratorFactory = new Class({
    Extends: UCPThreadDecoratorFactory,
    initialize: function() {
    },
    createVoteDecorator: function () {
        return new UCPEmptyDecorator();
    }
});

var UCPWorkflowThreadDecoratorFactory = new Class({
    Extends: UCPThreadDecoratorFactory,
    initialize: function () {
    }
});

var UCPExcludeReplyDecorator = new Class({
    initialize: function () {
    },
    decorateThread: function (ucpThread) {
        var feedbackElement = ucpThread.feedbackElement();
        $each(ucpThread.excludedPlayers(), function (excludedPlayer) {
            new Element('p', {
                html: "excluded: " + excludedPlayer
            }).inject(feedbackElement);
        });
    }
});

var UCPEmptyDecorator = new Class({
    initialize: function () {
    },
    decorateReply: function () {
        // do nothing
    },
    decorateThread: function () {
        // do nothing
    }
});

var UCPPhotoReplyDecorator = new Class({
    initialize: function () {
    },
    decorateReply: function (ucpCompetitor) {
        var feedbackElement = ucpCompetitor.ucpThread().feedbackElement();
        var firstSmall = ucpCompetitor.node().getElement('small').get('html').split(/\.|\(/)[0];

        var commentAnchor = new Element('div', { 
            html: '(' + firstSmall + '): ' + ucpCompetitor.poster().username 
        }).inject(feedbackElement);
        // ucpCompetitor.checkForValidPoster(); not! already done in processing of collectVotes
        ucpCompetitor.options.comments.each(function (comment) {
            commentAnchor.adopt(
                new Element('span', {
                    html: " - " + comment.msg
                }).addClass(comment.type === 'comment' ? '' :
                               comment.type === 'warning' ? 'ucpa_warning' :
                               ucpCompetitor.poster().admin ? 'ucpa_warning' : 'ucpa_error')
            );
        });
    }
});

var UCPVoteReplyDecorator = new Class({
    initialize: function () {
    },
    decorateReply: function (ucpVote) {
    try {
        var feedbackElement = ucpVote.ucpThread().feedbackElement();
        var voteFeedback = new Element('div', {
            html: ucpVote.poster().username
        }).inject(feedbackElement);
        ucpVote.messages().each(function (message) {
            new Element('span', {
                html: " - " + message.msg
            }).addClass('ucpa_' + message.type).inject(voteFeedback);
        });
    } catch (e) {
        GM_log("error: " + e);
    }
    }
});

var UCPCommentReplyDecorator = new Class({
    Implements: Options,
    options: {
    },
    initialize: function (options) {
        //this.setOptions(options);
    },
    decorateReply: function (ucpComment) {
        var pageAnchor = ucpComment.node().getElements('small').getLast();
        if ($chk(pageAnchor) && $chk(pageAnchor.getParent('div.ucpdiv'))) {
            pageAnchor = pageAnchor.getParent('div.ucpdiv');
        }
        if (!$chk(pageAnchor)) {
	    pageAnchor = this.node().getParent('td.Said').getElements('small').getLast();
        }
        if (!$chk(pageAnchor)) {
            pageAnchor = this.options.node;
        }
        if (ucpComment.ucpThread.challengeDefinition().scoreType() === "MEETANDGREET") {
            var message = "found a greeting from <b>" + ucpComment.poster().username;
        } else {
            if ($chk(ucpComment.options.comments) && ucpComment.options.comments.length > 0) {
                ucpComment.options.comments.each(function (comment) {
                    message = ($chk(message) ? " - " : "") + comment.msg; // TODO: type: error
                });
            } else {
                message = "found a regular comment (no photo, no votes)";
            }
            message = message + " from " + ucpComment.poster().username;
        }
        new Element('small', {
            html: "UCheckPlayNG: " + message + "<br/>"
        }).inject(new Element('div', { 'class': 'ucpdiv' }).inject(pageAnchor, 'after'));
    }
});

var UCPChallengeDefinition = new Class({
    Implements: [Options],
    options: {
        name: undefined,
        reName: /.*/,
        reNameRegExp: undefined,
        neededPhotos: -1,
        neededScore: -1,
        scoreType: undefined,
        countsToLimit: false,
        limitPerPlayer: -1,
        playerVoting: 'mayvote',
        scoresAdded: true,
        iconChallenge: false,
	thumbnailView: false,
	usesTimeConstraints: undefined,
	postDeadline: undefined,
	voteDeadline: undefined,
	equalWeights: false,
	workflow: undefined // admin script only
    },
    initialize: function (options) {
        this.setOptions(options);
    },
    name: function () {
        return this.options.name;
    },
    reName: function () {
        if ($chk(this.options.reNameRegExp)) {
            return this.options.reNameRegExp;
        }
        return this.options.reName;
    },
    neededPhotos: function () {
        return this.options.neededPhotos;
    },
    setNeededPhotos: function (n) {
        this.options.neededPhotos = n;
    },
    neededScore: function () {
        return this.options.neededScore;
    },
    setNeededScore: function (n) {
        this.options.neededScore = n;
    },
    scoreType: function () {
        return this.options.scoreType;
    },
    setScoreType: function (s) {
        this.options.scoreType = s;
    },
    countsToLimit: function () {
        return this.options.countsToLimit;
    },
    setCountsToLimit: function (b) {
        this.options.countsToLimit = b;
    },
    limitPerPlayer: function () {
        return this.options.limitPerPlayer;
    },
    setLimitPerPlayer: function (n) {
        this.options.limitPerPlayer = n;
    },
    playerVoting: function () {
        return this.options.playerVoting;
    },
    setPlayerVoting: function (p) {
        this.options.playerVoting = p;
    },
    scoresAdded: function () {
        return this.options.scoresAdded;
    },
    setScoresAdded: function (s) {
        this.options.scoresAdded = s;
    },
    iconChallenge: function () {
        return this.options.iconChallenge;
    },
    setIconChallenge: function (b) {
        this.options.iconChallenge = b;
    },
    thumbnailView: function() {
        return this.options.thumbnailView;
    },
    setThumbnailView: function(b) {
        this.options.thumbnailView = b;
    },
    usesTimeConstraints: function () {
    	return this.options.usesTimeConstraints;
    },
    setUsesTimeConstraints: function (u) {
    	this.options.usesTimeConstraints = u;
    },
    postDeadline: function () {
    	return this.options.postDeadline;
    },
    setPostDeadline: function (deadline) {
    	this.options.postDeadline = deadline;
    },
    voteDeadline: function () {
    	return this.options.voteDeadline;
    },
    setVoteDeadline: function (deadline) {
    	this.options.voteDeadline = deadline;
    },
    equalWeights: function() {
	return this.options.equalWeights;
    },
    workflow: function() {
    	if ($chk(this.options.workflow)) {
		return this.options.workflow;
	}
	return {}
    },
    toString: function () {
        return [ 'reName: ' + this.reName(), 
                 'neededPhotos: ' + this.neededPhotos(), 
                 'neededScore: ' + this.neededScore(), 
                 'scoreType: ' + this.scoreType() ].join(","); 
    },
    clone: function () {
        return new UCPChallengeDefinition(this.options);
    },
    nonChallengeType: function () {
        switch (this.scoreType()) {
        case "CHAT":
        case "SHOWROOM":
        case "GAME":
        case "MEETANDGREET":
        case "INFO":
        case "UNKNOWN":
            return true;
        default:
            return false;
        }
        return true;
    },
    originalChallengeDefinition: function () {
    	if (!$chk(this.options.originalChallengeDefinition)) {
		this.options['originalChallengeDefinition'] = this.clone();
	}
	return this.options.originalChallengeDefinition;
    },
    readChallengeDefinitionOverrides: function (announcementNode) {
	this.originalChallengeDefinition(); // create backup, if not available yet
        var overrides = announcementNode.getElements('img[alt*=UCPoverride]');
        var overridesDefined = false;
        if ($chk(overrides) && overrides.length > 0) {
            overrides.each(function (overrideImg) {
                var override = overrideImg.alt;

                var photosOverrideMatch        = override.match(/:photos:(-{0,1}\d+)$/);
                if (photosOverrideMatch) {
                    var neededPhotosOverride = parseInt(photosOverrideMatch[1], 10);
                    if (this.neededPhotos() !== neededPhotosOverride) {
                        overridesDefined = true;
                        this.setNeededPhotos(neededPhotosOverride);
                        if (this.neededPhotos() < 0) {
                            this.setNeededPhotos(65535);
                        }
                    }
                }
                var votesOverrideMatch         = override.match(/:votes:(-{0,1}\d+)$/);
                if (votesOverrideMatch) {
                    var neededScoreOverride = parseInt(votesOverrideMatch[1], 10);
                    if (this.neededScore() !== neededScoreOverride) {
                        overridesDefined = true;
                        this.setNeededScore(neededScoreOverride);
                        if (this.neededScore() < 0) {
                            this.setNeededScore(65535);
                        }
                    }
                }
                var scoreTypeOverrideMatch     = override.match(/:type:(.*)$/);
                if (scoreTypeOverrideMatch) {
                    var scoreTypeOverride = scoreTypeOverrideMatch[1];
                    if (this.scoreType() !== scoreTypeOverride) {
                        overridesDefined = true;
                        this.setScoreType(scoreTypeOverride);
                    }
                }
                var maxPhotosOverrideMatch     = override.match(/:max:(-{0,1}\d+)/);
                if (maxPhotosOverrideMatch) {
                    var limitPerPlayerOverride = parseInt(maxPhotosOverrideMatch[1], 10);
                    if (this.limitPerPlayer() !== limitPerPlayerOverride) {
                        overridesDefined = true;
                        this.setLimitPerPlayer(limitPerPlayerOverride);
                    }
                }
                var playerVotingOverrideMatch  = override.match(/:voting:(n\a|mustvote|mayvote|maynotvote)$/);
                if (playerVotingOverrideMatch) {
                    var playerVotingOverride = playerVotingOverrideMatch[1];
                    if (this.playerVoting() !== playerVotingOverride) {
                        overridesDefined = true;
                        this.setPlayerVoting(playerVotingOverride);
                    }
                }
                var countsToLimitOverrideMatch = override.match(/:grouplimit:(true|false)$/);
                if (countsToLimitOverrideMatch) {
                    var countsToLimitOverride = (countsToLimitOverrideMatch[1] === "true");
                    if (this.countsToLimit() !== countsToLimitOverride) {
                        overridesDefined = true;
                        this.setCountsToLimit(countsToLimitOverride);
                    }
                }
                var scoresAddedOverrideMatch   = override.match(/:added:(true|false)$/);
                if (scoresAddedOverrideMatch) {
                    var scoresAddedOverride = (scoresAddedOverrideMatch[1] === "true");
                    if (this.scoresAdded() !== scoresAddedOverride) {
                        overridesDefined = true;
                        this.setScoresAdded(scoresAddedOverride);
                    }
                }
                var iconChallengeOverrideMatch   = override.match(/:icons:(true|false)$/);
                if (iconChallengeOverrideMatch) {
                    var iconChallengeOverride = (iconChallengeOverrideMatch[1] === "true");
                    if (this.iconChallenge() !== iconChallengeOverride) {
                        overridesDefined = true;
                        this.setIconChallenge(iconChallengeOverride);
                    }
                }
		var thumbnailViewOverrideMatch = override.match(/:thumbnailview:(true|false)$/);
                if (thumbnailViewOverrideMatch) {
                    var thumbnailViewOverride = (thumbnailViewOverrideMatch[1] === "true");
                    if (this.thumbnailView() !== thumbnailViewOverride) {
                        overridesDefined = true;
                        this.setThumbnailView(thumbnailViewOverride);
                    }
                }
		var postDeadlineDefinitionMatch = override.match(/:postdeadline:(\d+)$/);
                if (postDeadlineDefinitionMatch) {
                    var postDeadlineDefinition = postDeadlineDefinitionMatch[1];
                    this.setPostDeadline(postDeadlineDefinition);
                }
                var voteDeadlineDefinitionMatch = override.match(/:votedeadline:(\d+)$/);
                if (voteDeadlineDefinitionMatch) {
                    var voteDeadlineDefinition = voteDeadlineDefinitionMatch[1];
                    this.setVoteDeadline(voteDeadlineDefinition);
                }
            }, this);
        }
        return overridesDefined;
    }
});

function ucpCreateChallengeThread(options) {
    if (!challengeGroup) {
    	return new UCPUnknownThread(options);
    }
    var groupConfig = options.groupConfig;
    var chlgname = options.chlgname;
    var challengeDefinition = $chk(options.challengeDefinition) ? options.challengeDefinition : groupConfig.extractChallengeDefinition(chlgname);
    options.challengeDefinition = challengeDefinition;
    switch (challengeDefinition.scoreType()) {
    case "CHAT":
        return new UCPChatThread(options);
    case "SHOWROOM":
        return new UCPShowroomThread(options);
    case "GAME":
        return new UCPGameThread(options);
    case "MEETANDGREET":
        return new UCPMeetAndGreetThread(options);
    case "INFO":
        return new UCPInformationThread(options);
    case "UNKNOWN":
        return new UCPUnknownThread(options);
    default:
        return new UCPChallengeThread(options);
    }
}

var UCPThread = new Class({
    Implements: [Options],
    options: {
        groupConfig: undefined,
        chlgname: undefined,
	lastedit: undefined,
        feedbackElement: undefined,
        chlgstatus: "none",
        challengeDefinition: undefined,
        replies: 0,
        votingErrors: [],
	photoErrors: [],
        validVotingAsStored: true,
        excludedPlayers: [],
        url: undefined,
        topic: undefined,
        scoreSummary: undefined,
	cummulativeScore: undefined,
        decoratorFactory: undefined,
        replyDecoratorFactory: undefined
    },
    initialize: function (options) {
        this.setOptions(options);
        var reTopicMatch = /.*flickr.com\/groups\/[^\/.]*\/discuss\/([0-9]+)/;
        if (this.options.topic === undefined) {
            this.options.topic = reTopicMatch.exec(this.options.url)[1];
        }
    },
    toString: function () {
        return  [ "url:          " + this.url(),
                  "group:        " + this.groupname(),
                  "topic:        " + this.topic(),
                  "chlgname:     " + this.challengeName(),
                  "scroreSummary:" + this.scoreSummary(),
                  "chlgstatus:   " + this.challengeStatus(),
                  "validVoting:  " + this.validVoting(),
                  "votingErrors: " + this.votingError(),
		  "photoErrors:  " + this.photoErrors()].join('\n');
    },
    // accessors
    groupConfig: function () {
        return this.options.groupConfig;
    },
    challengeName: function () {
        return this.options.chlgname;
    },
    setChallengeName: function (name) {
        this.options.chlgname = name;
    },
    lastedit: function () {
	return this.options.lastedit;
    },
    setLastEdit: function (editedThisTopicSomeTimeAgoString) {
	if ($chk(editedThisTopicSomeTimeAgoString)) {
		this.options.lastedit = editedThisTopicSomeTimeAgoString.replace(/\n/mg, '').replace(/^.*edited this topic (\d+ \w+ ago).*$/, '$1');
	}
    },
    feedbackElement: function (element) {
        return this.options.feedbackElement;
    },
    setFeedbackElement: function (element) {
        this.options.feedbackElement = element;
    },
    challengeStatus: function () {
        return this.options.chlgstatus;
    },
    setChallengeStatus: function (newstatus) {
        this.options.chlgstatus = newstatus;
    },
    challengeDefinition: function () {
        return this.options.challengeDefinition;
    },
    replies: function () {
        return this.options.replies;
    },
    setReplies: function (replies) {
        this.options.replies = replies;
    },
    validVoting: function () {
        return (this.options.votingErrors.length === 0);
    },
    validVotingAsStored: function () {
        return this.options.validVotingAsStored;
    },
    votingError: function () {
        return this.options.votingErrors.join(" | ");
    },
    addVotingError: function (error) {
        if ($chk(error)) {
            this.options.votingErrors.include(error);
        }
    },
    photoErrors: function () {
    	return this.options.photoErrors.join(" | ");
    },
    addPhotoError: function (error) {
    	if ($chk(error)) {
		this.options.photoErrors.include(error);
	}
    },
    addExcludedPlayer: function (username) {
        if ($chk(username)) {
            this.options.excludedPlayers.include(username);
        }
    },
    excludedPlayers: function () {
        return this.options.excludedPlayers;
    },
    isExcluded: function (username) {
        if ($chk(username)) {
            return this.options.excludedPlayers.contains(username);
        }
        return false;
    },
    findExcludesInDOMNode: function (node) {
        reExcludeMatch = this.groupConfig().reExcludeMatch();
        var excludedMatch = reExcludeMatch.exec(node.innerHTML);
        if ($chk(excludedMatch)) {
            for (var exclMatchIdx = 1, exclMatchLen = excludedMatch.length; exclMatchIdx < exclMatchLen; ++exclMatchIdx) {
                var excludedPlayer = excludedMatch[exclMatchIdx];
                if (excludedPlayer) {
                    // special cases: admin, admins, administrators, I, me: ignore
                    this.addExcludedPlayer(excludedPlayer.replace(/&amp;/g, '&').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim());
                }
            }
        }
    },
    url: function () {
        return this.options.url;
    },
    topic: function () {
        return this.options.topic;
    },
    scoreSummary: function () {
        return this.options.scoreSummary;
    },
    setScoreSummary: function (summ) {
        this.options.scoreSummary = summ;
    },
    cummulativeScore: function () {
    	return this.options.cummulativeScore;
    },
    setCummulativeScore: function (vote) {
    	this.options.cummulativeScore = vote;
    },
    groupname: function () {
        return this.groupConfig().groupname();
    },
    updateStatus: function (value) {
    //GM_log("current status: " + this.options.chlgstatus + ", value: " + value);
        if (this.challengeStatus() === "UPDATING") {
            this.setChallengeStatus("none");
        }
        if (value === "closed") {
            this.setChallengeStatus("Closed");
            return;
        }
        if (value === "voided") {
            this.setChallengeStatus("Voided");
            return;
        }
	if (value === "expired") {
	    this.setChallengeStatus("Expired");
	    return;
	}
        if ((this.challengeStatus() === "none") && (value === "open")) {
            this.setChallengeStatus("Open");
            return;
        }
        if ((this.challengeStatus() === "none") && (value === "filled")) {
            this.setChallengeStatus("Filled");
            return;
        }
        if (value === "finished") {
            this.setChallengeStatus("Finished");
            return;
        }
        if ((this.challengeStatus() === "none") && (value === "Unknown")) {
            this.setChallengeStatus("Unknown");
            return;
        }
    },
    decoratorFactory: function () {
        return this.options.decoratorFactory;
    },
    replyDecoratorFactory: function () {
        return this.options.replyDecoratorFactory;
    },
    printStatus: function (newchlgstatus) {
        if (!newchlgstatus || newchlgstatus.length === 0) {
            newchlgstatus = this.challengeStatus();
        }
        this.decoratorFactory().createStatusDecorator().decorateThread(this);
    },
    printExcludes: function () {
    try {
        if ($chk(this.options.excludedPlayers) && this.options.excludedPlayers.length > 0) {
            this.decoratorFactory().createExcludeDecorator().decorateThread(this);
        }
    } catch (e) {
        GM_log("error: " + e);
    }
    },
    checkStatus: function () {
        if (this.challengeName().match(this.groupConfig().states().closed)) {
            this.updateStatus("closed");
        }
        if (this.challengeName().match(this.groupConfig().states().voided)) {
            this.updateStatus("voided");
        }
	if (this.challengeName().match(this.groupConfig().states().expired)) {
	    this.updateStatus("expired");
	}
	if ((this.challengeStatus() === "none") && this instanceof UCPChallengeThread) {
        	if (this.filled()) {
            		this.updateStatus("filled");
		}
        	if (this.open()) {
            		this.setChallengeStatus("Open");
        	} 
        	if (this.waitingForEntries()) {
            		this.setChallengeStatus("Open");
        	}
	}
        if (  (this.challengeStatus() === "none") 
            && $chk(this.challengeName().match(this.groupConfig().states().vote))) {
            this.setChallengeStatus("--VOTE--");
        }
    },
    resetStatus: function () {
        this.setChallengeStatus("none");
        this.options.votingErrors = [];
	this.options.photoErrors = [];
    },
    guessLasteditTime: function(callback) {
        var ucpThread = this;
        new Request({
            url: ucpThread.url(),
            headers: {
                "Accept": "text/html",                    // If not specified, browser defaults will be used.
            },
            onFailure: function (response) {
                GM_log("error loading " + ucpThread.challengeName() + ": " + response.statusText);
                callback({ success: false, msg: "error loading: " + response.statusText });
            },
            onSuccess: function (responseText, responseXML) {
                this.cancel(); // stop downloading images

                var tempDiv = new Element('div', {
                    html: responseText.stripScripts()
                });
		var discussTopic = tempDiv.getElement('td.Said');
		var small = discussTopic.getElement('small');
		var memberEditedThisTopicElement = small.getElement('i');
		if (!$chk(memberEditedThisTopicElement)) {
			callback({ success: true, msg: "not found edited element" });
			return;
		}
		callback({ success: true, lastedit: memberEditedThisTopicElement.get('text').trim() });
            } // onload
        }).get(); // xmlHttpRequest
    }, // loadthread
    apiloadthread: function(processDiscussionTopicCallback) {
        var ucpThread = this;
	getThreadReplies({ threadId: ucpThread.topic(), callback: processDiscussionTopicCallback });
    }, // apiloadthread
    collectApiVotes: function (discussionTopic, challengeEntries) {
        apiCollectVotes(this, 
            this.groupConfig().allowsPhotoInAnnouncement() ? discussionTopic : null,
            challengeEntries
        );
    },
    isClosed: function (bodyElement) {
	if (!$chk(bodyElement)) {
		bodyElement = $$('body')[0];
	}
	var closed = $chk(bodyElement.getElement('p.Focus * a[href*=unlock]'));
	if (!closed) {
		return { closed: false };
	}
	var closer = bodyElement.getElement('p.Focus');
	return {
		closed: true,
		closer: closer
	};
    },
    isUnanimous: function () {
    	switch (this.challengeDefinition().scoreType()) {
		case 'HORIZONTAL':
		case 'VERTICAL':
			return this.votes().length == 0 ? false : this.votes()[this.votes().length - 1].isUnanimous();
		case 'PIC-V-1':
			var unanimous = undefined;
			/* this.votes().each( function (vote) {
				GM_log("DEBUG: vote=" + vote);
			}); TODO: implement :-)
			*/
			return false;
		case 'PIC-P-1':
			// TODO
		default: 
			return false; // PIC-P-n, PIC-V-n, PIC-H-n with n > 1 are never anonimous
	}
					// same for RATE-PHOTO, VERTICAL-WEIGHTED
    }
});

var UCPNonChallengeThread = new Class({
    Extends: UCPThread,
    initialize: function (options) {
        this.parent(options);
    },
    printStatus: function (newchlgstatus) {




















    },
    getLabelPrefix: function () {},

    photos: function () {
	return [];
    },
    votes: function () {
	return [];
    },
    comments: function () {
	return [];
    },
    hasError: function () {
    	return false;
    },
    hasWarning: function () {
    	return false;
    }
});


var UCPChatThread = new Class({
    Extends: UCPNonChallengeThread,
    initialize: function (options) {
        this.parent(options);
    },
    resetStatus: function () {
        this.parent();
        this.setChallengeStatus("Chat");
    },
    getLabelPrefix: function () {
        return "chat";
    }
});

var UCPShowroomThread = new Class({
    Extends: UCPNonChallengeThread,
    initialize: function (options) {
        this.parent(options);
    },
    resetStatus: function () {
        this.parent();
        this.setChallengeStatus("Showroom");
    },
    getLabelPrefix: function () {
        return "showroom";
    }
});

var UCPGameThread = new Class({
    Extends: UCPNonChallengeThread,
    initialize: function (options) {
        this.parent(options);
    },
    resetStatus: function () {
        this.parent();
        this.setChallengeStatus("Game");
    },
    getLabelPrefix: function () {
        return "game";
    }
});

var UCPMeetAndGreetThread = new Class({
    Extends: UCPNonChallengeThread,
    initialize: function (options) {
        this.parent(options);
    },
    resetStatus: function () {
        this.parent();
        this.setChallengeStatus("MeetAndGreet");
    },
    getLabelPrefix: function () {
        return "meetAndGreet";
    }
});

var UCPInformationThread = new Class({
    Extends: UCPNonChallengeThread,
    initialize: function (options) {
        this.parent(options);
    },
    resetStatus: function () {
        this.parent();
        this.setChallengeStatus("Info");
    },
    getLabelPrefix: function () {
        return "info";
    }
});

/*var UCPVoidedThread = new Class({
    Extends: UCPNonChallengeThread,
    initialize: function (options) {
        this.parent(options);
    },
    resetStatus: function () {
        this.parent();
        this.setChallengeStatus("Voided");
    },
    getLabelPrefix: function () {
        return "ignore";
    }
});*/

var UCPUnknownThread = new Class({
    Extends: UCPNonChallengeThread,
    initialize: function (options) {
        this.parent(options);
    },
    resetStatus: function () {
        this.parent();
        this.setChallengeStatus("Unknown");
    },
    getLabelPrefix: function () {
        return  "ignore";
    }
});

var UCPChallengeThread = new Class({
    Extends: UCPThread,
    initialize: function(options) {
        this.parent(options);
    },
    filled: function () {
        if (this.challengeDefinition().neededPhotos() <= 0) {
	    if (this.challengeName().match(this.groupConfig().states().open) || this.challengeName().match(this.groupConfig().states().waitingForEntries)) {
		if ($chk(this.postDeadline()) || this.usesTimeConstraints()) {
		    var flickrClock = calculateFlickrClock();
		    if ($chk(flickrClock)) {
			if ($chk(this.postDeadline())) {
				var postDeadlineMillis = this.postDeadline();
			} else {
				var filledRegExp = this.groupConfig().states().filledRegExp;
				if (!$chk(filledRegExp) || !$chk(filledRegExp.replacement_function)) {
					GM_log("ERROR: missing 'filledFunction'");
					return false;
				}
				postDeadlineMillis = this.challengeName().replace(new RegExp(filledRegExp.expression, filledRegExp.flags),
									new Function(filledRegExp.replacement_function));
				this.setPostDeadline(postDeadlineMillis);
			}
			var timeleft = postDeadlineMillis - flickrClock.getTime();
			if (timeleft <= 0) {
				return true;
			}
			return false;
		    }
		    return false;
		}
	    }
            return false;
        }
        if (this.photos().length >= this.challengeDefinition().neededPhotos() &&
                (this.challengeName().match(this.groupConfig().states().open) || 
                 this.challengeName().match(this.groupConfig().states().waitingForEntries))) {
            return true;
        }
        return false;
    },
    open: function () {
        //GM_log("checking name against open states: " + this.chlgname + " - " + states.open + " - " + states.waitingForEntries);
        if (this.photos().length === 0 && 
                (this.challengeName().match(this.groupConfig().states().open) || 
                 this.challengeName().match(this.groupConfig().states().waitingForEntries))) {
            return true;
        }
        return false;
    },
    waitingForEntries: function () {
        if (this.photos().length == 0) {
            return false;
        }
        if (this.challengeDefinition().neededPhotos() < 0 &&
                (this.challengeName().match(this.groupConfig().states().open) || 
                 this.challengeName().match(this.groupConfig().states().waitingForEntries))) {
            return true;
        }
        if (this.challengeDefinition().neededPhotos() < 0) {
            return false;
        }
        return (this.photos().length < this.challengeDefinition().neededPhotos()
                && (this.challengeName().match(this.groupConfig().states().waitingForEntries) ||
                    this.challengeName().match(this.groupConfig().states().open)));
    },
    finished: function(vote) {
    	if (!$chk(vote)) { // vote is normally the cummulative score
		if (this.votes().length == 0) {
			return false;
		}
		vote = this.votes()[this.votes().length - 1];
	}
        // special case: PIC-P requires a diff of 2 points
        if (this.challengeDefinition().scoreType().match(/PIC-P-/) && this.challengeDefinition().neededScore() > 0) {
            if (vote.topDiff() >= 2 &&
                this.challengeDefinition().scoresAdded() && 
                vote.maxVote >= this.challengeDefinition().neededScore()) {
                return true;
            }
            return false;
        }
        if (this.challengeDefinition().neededScore() === -1) {
	    if (this.challengeName().match(this.groupConfig().states().vote)) {
	    	if (this.usesTimeConstraints() || $chk(this.voteDeadline()) ) {
	    	    var flickrClock = calculateFlickrClock();
		    if ($chk(flickrClock)) {
		        if ($chk(this.voteDeadline())) {
			    var voteDeadlineMillis = this.voteDeadline();
		        } else {
			    var finishedRegExp = this.groupConfig().states().finishedRegExp;
			    if (!$chk(finishedRegExp) || !$chk(finishedRegExp.replacement_function)) {
				GM_log("ERROR: missing 'finishedFunction'");
				return false;
			    }
			    voteDeadlineMillis = this.challengeName().replace(new RegExp(finishedRegExp.expression, finishedRegExp.flags),
									new Function(finishedRegExp.replacement_function));
			    this.setVoteDeadline(voteDeadlineMillis);
		        }
		        var timeleft = voteDeadlineMillis - flickrClock.getTime();
		        if (timeleft <= 0) {
			    return true;
		        }
		        return false;
		    } 
		    return false;
	        }
                return false;
	    }
	    return false;
        }
        if (this.challengeDefinition().scoresAdded() && 
            vote.maxVote >= this.challengeDefinition().neededScore()) {
            return true;
        }
        if (!this.challengeDefinition().scoresAdded() && vote.isUnanimous()) {
            return true;
        }
        return false;
    },
    resetStatus: function() {
        this.parent();
        this.checkStatus();
    },
    hasError: function () {
	if (this.votes().some(function(vote) {
			return vote.hasError();
		})) {
		return true;
	}
	if (this.photos().some(function(photo) {
			return photo.hasError();
		})) {
		return true;
	}
	return false;
    },
    hasWarning: function () {
	if (this.votes().some(function(vote) {
			return vote.hasWarning();
		})) {
		return true;
	}
	if (this.photos().some(function(photo) {
			return photo.hasWarning();
		})) {
		return true;
	}
	return false;
    },
    photos: function () {
	if (this.photosArray == undefined) {
		return [];
	}
	return this.photosArray;
    },
    votes: function () {
	if (this.votesArray == undefined) {
		return [];
	}
	return this.votesArray;
    },
    comments: function () {
	if (this.commentsArray == undefined) {
		return [];
	}
	return this.commentsArray;
    },
    error: function () {
	var retval = "";
	this.photos().each(function (photo) {
		if (photo.hasError()) {
		    if (retval.length > 0) retval += " - ";
		    retval += photo.poster().username + ": " + photo.error()
		}
	});
	this.votes().each(function (vote) {
		if (vote.hasError()) {
		    if (retval.length > 0) retval += " - ";
		    retval += vote.poster().username + ": " + vote.error()
		}
	});
	return retval;
    },
    warning: function () {
	var retval = "";
	this.photos().each(function (photo) {
		if (photo.hasWarning()) {
		    if (retval.length > 0) retval += " - ";
		    retval += photo.poster().username + ": " + photo.warning()
		}
	});
	this.votes().each(function (vote) {
		if (vote.hasWarning()) {
		    if (retval.length > 0) retval += " - ";
		    retval += vote.poster().username + ": " + vote.warning()
		}
	});
	return retval;
    },
    usesTimeConstraints: function () {
    	if ($chk(this.challengeDefinition().usesTimeConstraints())) {
		return this.challengeDefinition().usesTimeConstraints();
	}
	return this.groupConfig().usesTimeConstraints();
    },
    setUsesTimeConstraints: function (u) {
    	this.challengeDefinition().setUsesTimeConstraints(u);
    },
    postDeadline: function () {
        return this.challengeDefinition().postDeadline();
    },
    setPostDeadline: function (millis) {
        this.challengeDefinition().setPostDeadline(millis);
    },
    voteDeadline: function () {
        return this.challengeDefinition().voteDeadline();
    },
    setVoteDeadline: function (millis) {
        this.challengeDefinition().setVoteDeadline(millis);
    }
});

var UCPGroupPreferences = new Class({
    Implements: [Options],
    options: {
        groupConfig: null, // mandatory
        // UCheckPlay Admin preferences
        hideNonWonMedals: false,
        stopAtFirstFoundMedal: false,
        defaultAwardsGroup: null,
        defaultAwardsGroupInPendingItems: null,
        bumpAndReload: false,
        bumpAndReturnToFirstPage: false,
        smartPhotoBoxes: true,
	workflowAutoClaimOwnership: false,
	useLevenshteinToMarkUsedThemes: true,
	levenshteinDistanceInUsedThemes: 3,
	checkPhotoNumbering: true,
	checkPhotoNumberingGently: false,
	CrossCheckChallengeNumbering: 'default', // start with capital: double use
	CrossCheckSimilarThemes: 'default',
	CrossCheckCountPlayerEntries: 'default',
	CrossCheckMultipleChallenges: 'default',
	CrossCheckNonVoters: 'default'
    },
    initialize: function(options) {
        this.setOptions(options);
        // admin prefs
        var storedHideNonWonMedals = GM_getValue("UCPA.hideNonWonMedals." + this.groupConfig().groupname());
        this.options.hideNonWonMedals = (storedHideNonWonMedals === true || storedHideNonWonMedals === 'true');
        var storedStopAtFirstFoundMedal = GM_getValue("UCPA.stopAtFirstFoundMedal." + this.groupConfig().groupname());
        this.options.stopAtFirstFoundMedal = (storedStopAtFirstFoundMedal === true || storedStopAtFirstFoundMedal === 'true');
        var storedDefaultAwardsGroup = GM_getValue("UCPA.defaultAwardsGroup." + this.groupConfig().groupname());
        if ($chk(storedDefaultAwardsGroup)) {
            this.options.defaultAwardsGroup = storedDefaultAwardsGroup;
        } else {
            this.options.defaultAwardsGroup = this.groupConfig().groupname();
        }
        var storedDefaultAwardsGroupInPendingItems = GM_getValue("UCPA.defaultAwardsGroupInPendingItems." + this.groupConfig().groupname());
        if ($chk(storedDefaultAwardsGroupInPendingItems)) {
            this.options.defaultAwardsGroupInPendingItems = storedDefaultAwardsGroupInPendingItems;
        } else if (this.groupConfig().awardWinnersGroup()) {
            this.options.defaultAwardsGroupInPendingItems = this.groupConfig().primaryGroup();
        } else {
            this.options.defaultAwardsGroupInPendingItems = this.groupConfig().groupname();
        }
        var storedBumpAndReload = GM_getValue("UCPA.bumpAndReload." + this.groupConfig().groupname());
        this.options.bumpAndReload = (storedBumpAndReload === true || storedBumpAndReload === 'true');
        var storedBumpAndReturnToFirstPage = GM_getValue("UCPA.bumpAndReturnToFirstPage." + this.groupConfig().groupname());
        this.options.bumpAndReturnToFirstPage = (storedBumpAndReturnToFirstPage == true || storedBumpAndReturnToFirstPage == 'true');
        var storedSmartPhotoBoxes = GM_getValue("UCPA.smartPhotoBoxes." + this.groupConfig().groupname());
        this.options.smartPhotoBoxes = (storedSmartPhotoBoxes === undefined || storedSmartPhotoBoxes === true || storedSmartPhotoBoxes === 'true');
	// workflow prefs
	var storedWorkflowAutoClaimOwnership = GM_getValue("UCPA.workflowAutoClaimOwnership." + this.groupConfig().groupname());
	this.options.workflowAutoClaimOwnership = (storedWorkflowAutoClaimOwnership === true || storedWorkflowAutoClaimOwnership === 'true');
	// levenshtein
	var storedUseLevenshteinToMarkUsedThemes = GM_getValue("UCPA.useLevenshteinToMarkUsedThemes." + this.groupConfig().groupname());
	this.options.useLevenshteinToMarkUsedThemes = (storedUseLevenshteinToMarkUsedThemes === false || storedUseLevenshteinToMarkUsedThemes === 'false') ? false : true;
	var storedLevenshteinDistanceInUsedThemes = GM_getValue("UCPA.levenshteinDistanceInUsedThemes." + this.groupConfig().groupname());
	if ($chk(storedLevenshteinDistanceInUsedThemes)) {
		this.options.levenshteinDistanceInIsedThemes = storedLevenshteinDistanceInUsedThemes;
	}
	// cross inspection
	var storedCrossCheckChallengeNumbering = GM_getValue("UCPA.CrossCheckChallengeNumbering." + this.groupConfig().groupname());
	if ($chk(storedCrossCheckChallengeNumbering)) {
		this.setCrossCheckChallengeNumbering(storedCrossCheckChallengeNumbering);
	}
	var storedCrossCheckSimilarThemes = GM_getValue("UCPA.CrossCheckSimilarThemes." + this.groupConfig().groupname());
	if ($chk(storedCrossCheckSimilarThemes)) {
		this.setCrossCheckSimilarThemes(storedCrossCheckSimilarThemes);
	}
	var storedCrossCheckCountPlayerEntries = GM_getValue("UCPA.CrossCheckCountPlayerEntries." + this.groupConfig().groupname());
	if ($chk(storedCrossCheckCountPlayerEntries)) {
		this.setCrossCheckCountPlayerEntries(storedCrossCheckCountPlayerEntries);
	}
	var storedCrossCheckMultipleChallenges = GM_getValue("UCPA.CrossCheckMultipleChallenges." + this.groupConfig().groupname());
	if ($chk(storedCrossCheckMultipleChallenges)) {
		this.setCrossCheckMultipleChallenges(storedCrossCheckMultipleChallenges);
	}
	var storedCrossCheckNonVoters = GM_getValue("UCPA.CrossCheckNonVoters." + this.groupConfig().groupname());
	if ($chk(storedCrossCheckNonVoters)) {
		this.setCrossCheckNonVoters(storedCrossCheckNonVoters);
	}
    },
    groupConfig: function () {
        return this.options.groupConfig;
    },
    setBumpAndReload: function (bumpAndReload) {
        if (bumpAndReload !== this.options.bumpAndReload) {
            GM_setValue("UCPA.bumpAndReload." + this.groupConfig().groupname(), bumpAndReload);
            return true;
        }
        return false;
    },
    setBumpAndReturnToFirstPage: function (b) {
        if (b !== this.options.bumpAndReturnToFirstPage) {
            GM_setValue("UCPA.bumpAndReturnToFirstPage." + this.groupConfig().groupname(), b);
            return true;
        }
        return false;
    },
    setSmartPhotoBoxes: function (smartPhotoBoxes) {
        if (smartPhotoBoxes !== this.options.smartPhotoBoxes) {
            GM_setValue("UCPA.smartPhotoBoxes." + this.groupConfig().groupname(), smartPhotoBoxes);
            return true;
        }
        return false;
    },
    setWorkflowAutoClaimOwnership: function (workflowAutoClaimOwnership) {
    	if (workflowAutoClaimOwnership !== this.options.workflowAutoClaimOwnership) {
		GM_setValue("UCPA.workflowAutoClaimOwnership." + this.groupConfig().groupname(), workflowAutoClaimOwnership);
		return true;
	}
	return false;
    },
    setHideNonWonMedals: function (hideNonWonMedals) {
        if (hideNonWonMedals !== this.options.hideNonWonMedals) {
            GM_setValue("UCPA.hideNonWonMedals." + this.groupConfig().groupname(), hideNonWonMedals);
            return true;
        }
        return false;
    },
    setStopAtFirstFoundMedal: function (stopAtFirstFoundMedal) {
        if (stopAtFirstFoundMedal !== this.options.stopAtFirstFoundMedal) {
            GM_setValue("UCPA.stopAtFirstFoundMedal." + this.groupConfig().groupname(), stopAtFirstFoundMedal);
            return true;
        }
        return false;
    },
    setDefaultAwardsGroup: function (groupname) {
        if (groupname !== this.options.defaultAwardsGroup) {
            GM_setValue("UCPA.defaultAwardsGroup." + this.groupConfig().groupname(), groupname);
            return true;
        }
        return false;
    },
    setDefaultAwardsGroupInPendingItems: function (groupname) {
        if (groupname !== this.options.defaultAwardsGroupInPendingItems) {
            GM_setValue("UCPA.defaultAwardsGroupInPendingItems." + this.groupConfig().groupname(), groupname);
            return true;
        }
        return false;
    },
    setUseLevenshteinToMarkUsedThemes: function (b) {
	if (b != this.options.useLevenshteinToMarkUsedThemes) {
		GM_setValue("UCPA.useLevenshteinToMarkUsedThemes." + this.groupConfig().groupname(), b);
		return true;
	}
	return false;
    },
    setLevenshteinDistanceInUsedThemes: function (d) {
	if (d != this.options.levenshteinDistanceInUsedThemes) {
		GM_setValue("UCPA.levenshteinDistanceInUsedThemes." + this.groupConfig().groupname(), d);
		return true;
	}
	return false;
    },
    hideNonWonMedals: function () {
        return this.options.hideNonWonMedals;
    },
    stopAtFirstFoundMedal: function () {
        return this.options.stopAtFirstFoundMedal;
    },
    defaultAwardsGroup: function () {
        return this.options.defaultAwardsGroup;
    },
    defaultAwardsGroupInPendingItems: function () {
        return this.options.defaultAwardsGroupInPendingItems;
    },
    bumpAndReload: function () {
        return this.options.bumpAndReload;
    },
    bumpAndReturnToFirstPage: function () {
        return this.options.bumpAndReturnToFirstPage;
    },
    smartPhotoBoxes: function () {
        return this.options.smartPhotoBoxes;
    },
    workflowAutoClaimOwnership: function () {
    	return this.options.workflowAutoClaimOwnership;
    },
    useLevenshteinToMarkThemesInUse: function () {
	return this.options.useLevenshteinToMarkThemesInUse;
    },
    levenshteinDistanceInUsedThemes: function () {
	return this.options.levenshteinDistanceInUsedThemes;
    },
    checkPhotoNumbering: function () {
        return this.options.checkPhotoNumbering == true || this.options.checkPhotoNumbering == "true";
    },
    checkPhotoNumberingGently: function () {
        return this.options.checkPhotoNumberingGently == true || this.options.checkPhotoNumberingGently == "true";
    },
    privateSetCrossCheckValue: function (s, name) {
    	switch (s) {
		case 'always':
		case 'never':
		case 'default':
			this.options[name] = s;
			GM_setValue("UCPA." + name + "." + groupConfig.groupname(), s);
			break;
		default:
			this.options[name] = 'default';
		}
    },
    crossCheckChallengeNumbering: function () {
    	return this.options.CrossCheckChallengeNumbering;
    },
    setCrossCheckChallengeNumbering: function (s) {
    	this.privateSetCrossCheckValue(s, "CrossCheckChallengeNumbering");
    },
    crossCheckSimilarThemes: function () {
    	return this.options.CrossCheckSimilarThemes;
    },
    setCrossCheckSimilarThemes: function (s) {
    	this.privateSetCrossCheckValue(s, "CrossCheckSimilarThemes");
    },
    crossCheckCountPlayerEntries: function () {
    	return this.options.CrossCheckCountPlayerEntries;
    },
    setCrossCheckCountPlayerEntries: function (s) {
    	this.privateSetCrossCheckValue(s, "CrossCheckCountPlayerEntries");
    },
    crossCheckMultipleChallenges: function () {
    	return this.options.CrossCheckMultipleChallenges;
    },
    setCrossCheckMultipleChallenges: function (s) {
    	this.privateSetCrossCheckValue(s, "CrossCheckMultipleChallenges");
    },
    crossCheckNonVoters: function () {
    	return this.options.CrossCheckNonVoters;
    },
    setCrossCheckNonVoters: function (s) {
    	this.privateSetCrossCheckValue(s, "CrossCheckNonVoters");
    }
});

function ucpCheckPhoto(photoNode, index, array) { // expects 'this' to be of type UCPChallengeDefinition
    try {
	    var src = photoNode.getAttribute('src');
        if (!$chk(src) || src.length === 0) {
            return false;
        }
	try {
            if (photoNode.getAttribute('alt') === 'UCPthumbnail') {
                return false;
            }
	    if (photoNode.getAttribute('alt').match('UCPANG:bump')) {
	        return false;
	    }
	} catch (e) {
	    // ignore
	}
        if (src.contains("buddyicons")) {
            return false;
        } 
        if (src.contains("coverphoto")) {
            return false;
        } 
        if (!src.match(/static\.?flickr\.com/) && !src.match(/.*yimg\.com/)) {
            return false;
        }
	if (!src.match(/.*\/\d+_[\da-z]+(?:_\w)?\.jpg/)) {
		return false;
	}
        if (!this.iconChallenge()) {
            // ignore the height attribute: Flickr adds class="notsowide":
            // img.notsowide: {
            //     height: auto;
            //     max-width: 500px;
            //  }
            //  => even if specified, 'height' does nothing
	    try {
                var width = photoNode.getAttribute('width');
                // this.width returns bogus info if attribute 'width' is missing
                if ($chk(width) && width < 275) {
                    return false;
                }
	    } catch (e) {
	        // ignore
	    }
            // thumbnails, square, .. from flickr are not medium
            if (src.match(/_t.jpg$|_s.jpg$/)) {
                return false;
            }
        }
        if ($chk(groupConfig)) {
            if ($chk(groupConfig.nonPhotoImages()[src])) {
                return false;
            }
        }
        return true;
    } catch (e) {
        GM_log("error checking photo: " + e);
        return false;
    }
	return false;
}

function ucpAddCPheader() {
try {
    if (challengeGroup) { // only show on challenge groups :=> bump
        new Element('span', {
            html: 'UNIFIED&nbsp;CP&nbsp;Admin&nbsp;-&nbsp;',
            title: 'UNIFIED CheckPlay For Challenge Group Administration',
	    id: 'UCPA_version_header',
	    events: {
		showversion: function (evt) {
			if (evt.stat == "success") {
				this.set('html', 'UNIFIED&nbsp;CP&nbsp;Admin&nbsp;v' + evt.version + '&nbsp;-&nbsp;');
				this.set('title', 'UNIFIED CheckPlay For Challenge Group Administration v' + evt.version);
			} else {
				this.set('html', 'UNIFIED&nbsp;CP&nbsp;Admin&nbsp;' + evt.statusText + '&nbsp;-&nbsp;');
			}
		}
	    }
        }).inject($("TopBar").getElement("td.Status"), 'top');
	getVersion('UCPA_version_header', 'showversion');
    }

} catch (e) {
	// ignore
}
}

function ucpCheckPendingPhoto (photoNode, index, array) {
    try {
	    var src = photoNode.src;
        if (!$chk(src) || src.length === 0) {
            return false;
        }
        if (photoNode.alt === 'UCPthumbnail') {
            return false;
        }
        if (src.contains("buddyicons")) {
            return false;
        } 
	if (src.contains("coverphoto")) {
	    return false;
	}
        if (!src.match(/static\.?flickr\.com/)) {
            return false;
        }
	if (!$chk(photoNode.getParent('td.gPendPic'))) {
		return false;
	}
        return true;
    } catch (e) {
        GM_log(e);
        return false;
    }
	return false;
}

function ucpCheckBuddyicon (photoNode) {
    try {
        var src = photoNode.src;
        if (src.match(/https?:\/\/.*flickr.com\/\d+\/buddyicons\/\d+@\w+.jpg/)) {
            return true;
        }
        // if none set, the default from flickr (old 'grey face')
        if (src.match(/https?:\/\/.*\/buddyicon.(?:gif|jpg)#\d+@\w+/)) {
            return true;
        }
	// newer, colorful camera icons
	if (src.match(/https?:\/\/.*\/buddyicon\d+\.png#\d+@\w+/)) {
		return true;
	}
        // if a user is deleted, the default from flickr, without 
        var _class = photoNode.getAttribute('class');
        if (_class.match('xBuddyIconX') && src.match(/https?:\/\/.*\/buddyicon.jpg$/)) {
            return true;
        }
    } catch (e) {
        GM_log(e);
        return false;
    }
    return false;
}

// from http://pmav.eu/stuff/javascript-hashing-functions/source.html
function ucpUniversalHash(s, tableSize) {
    if (!tableSize) {
        tableSize = 65534;
    }
    var b = 27183, h = 0, a = 31415;

    if (tableSize > 1) {
        for (var i = 0; i < s.length; i++) {
            h = (a * h + s[i].charCodeAt()) % tableSize;
            a = ((a % tableSize) * (b % tableSize)) % (tableSize);
        }
    }
    return h;
}

var UCPVote = new Class({
    Implements: [Options],
    options: {
        chlgname: null,
        ucpThread: null,
        node: null,
	replyId: null,
        poster: null,
        voteText: null,
	content: null,
        votesArray: [],
        messages: [],
        errorIdx: null,
        votedFor: []
    },
    initialize: function(options) {
        this.setOptions(options);
        this.maxVote = 0;
        if (options.votesArray !== null) {
            for (var oIdx = 0, oLen = options.votesArray.length; oIdx < oLen; oIdx++) {
                if (!isNaN(options.votesArray[oIdx])) {
                    this.maxVote = Math.max(options.votesArray[oIdx], this.maxVote);
                    this.options.votesArray[oIdx] = options.votesArray[oIdx];
                } else {
                    this.options.votesArray[oIdx] = 0;
                }
            }
        }
    },
    poster: function () {
        return this.options.poster;
    },
    voteText: function () {
	return this.options.voteText;
    },
    node: function () {
        return this.options.node;
    },
    replyId: function () {
	return this.options.replyId;
    },
    content: function () {
	return this.options.content;
    },
    ucpThread: function () {
        return this.options.ucpThread;
    },
    isUnanimous: function () {
        var scoreIdx = 0;
        for (var oIdx = 1, oLen = this.options.votesArray.length; oIdx < oLen; ++oIdx) {
            if (!isNaN(this.options.votesArray[oIdx]) && this.options.votesArray[oIdx] > 0) {
                if (scoreIdx === 0) { // first vote found
                    scoreIdx = oIdx;
                } else {
                    if (scoreIdx !== oIdx) {
                        return false;
                    }
                }
            }
        }
        return scoreIdx !== 0; // no score found = no voting = not unanimous
    },
    isVoid: function () {
        return false;
    },
    add: function (other) {
        other.options.votesArray.each(function (vote, oIdx) {
            if (oIdx === 0) {
                return;
            }
            if (vote && !isNaN(vote)) {
                if (this.options.votesArray[oIdx] && !isNaN(this.options.votesArray[oIdx])) {
                    this.options.votesArray[oIdx] += vote;
                } else {
                    this.options.votesArray[oIdx] = vote;
                }
                if (this.options.votesArray[oIdx] > this.maxVote) {
                    this.maxVote = this.options.votesArray[oIdx];
                }
            }
        }, this);
    },
    topDiff: function () { // returns the difference between the two top scores
        var secondBest = 0;
        // this.maxVote should be set, but we don't have its index
        var theBest = 0;
        this.options.votesArray.each(function (score, oIdx) {
            if (oIdx === 0) {
                return;
            }
            if (score > theBest) {
                secondBest = theBest;
                theBest = score;
            } else if (score > secondBest) {
                secondBest = score;
            }
        }, this);
        return theBest - secondBest;
    },
    toString: function () {
        var retval = this.options.poster.username + ' ' + this.options.voteText + ' =(';
        this.options.votesArray.each(function (vote, idx) {
	    if (idx == 0) return;
            retval = retval + ' ' + vote;
        }, this);
        retval = retval + ') => ' + this.maxVote;
        return retval;
    },
    votedFor: function () {
        var votedForString;
        if (this.options.votedFor.length > 0) {
            votedForString = "(";
            this.options.votedFor.each( function(value,idx) {
                if (idx == 0) return;
                if (value != undefined && value > 0) {
                    if (votedForString.length > 1) votedForString += ",";
                    votedForString += (idx);
                }
            });
            votedForString += ")";
        }
        return votedForString;
    },
    showVotes: function (sort) {
        var retval = undefined;
        // create an array with objects {idx,vote}
        var showArray = this.options.votesArray.map( function (vote, idx) {
            return { photo: idx, points: vote };
        });
        if (sort) {
            // sort on points
            showArray.sort(function (a,b) {
                return b.points - a.points;
            });
        }
        showArray.each(function (vote, oIdx) {
            if (isNaN(vote.points) || vote.points <= 0) {
                return;
            }
            var part = vote.photo + ":" + vote.points + "pt";
            if (this.options.errorIdx === vote.photo) {
                part = "<b>" + part + "</b>";
            }
            if (retval === undefined) {
                retval = part;
            } else {
                retval = retval + ", "  + part;
            }
        }, this);
        return "(" + retval + ")";
    },
    showPicResult: function (sort) {
        // first, sort the result
        var sorted = [];
        var vote;
        for (var oIdx = 1, oLen = this.options.votesArray.length; oIdx < oLen; ++oIdx) {
            vote = this.options.votesArray[oIdx];
            if (!isNaN(vote)) {
                var added = false;
                for (var sIdx = 0, sLen = sorted.length; sIdx < sLen; ++sIdx) {
                    if (sorted[sIdx].value <= vote) {
                        // insert element => move the rest to the end
                        for (var rIdx = sorted.length; rIdx > sIdx; --rIdx) {
                            sorted[rIdx] = sorted[rIdx - 1];
                        }
                        sorted[sIdx] = { photo: oIdx, value: vote };
                        added = true;
                        break;
                    }
                }
                if (!added) {
                    sorted[sorted.length] = { photo: oIdx, value: vote };
                }
            }
        }
        var retval = "";
        sorted.each(function (vote) {
            retval = retval + (retval.length > 0 ? ", " : "") + vote.photo + ":" + vote.value;
        }, this);
        return "(" + retval + ")";
    },
    messages: function() {
        return this.options.messages;
    },
    addMessage: function (message) {
        this.options.messages.include({msg: message, type: 'message'});
    },
    addWarning: function (warning) {
        this.options.messages.include({msg: warning, type: 'warning'});
    },
    hasWarning: function () {
        return this.options.messages.some( function (msg) {
            return msg.type == 'warning';
        });
    },
    warning: function() {
        var retval = '';
        this.options.messages.each(function (message) {
            if (message.type === 'warning') {
		if (retval.length > 0) retval += " - ";
                retval += message.msg;
            }
        });
        return retval;
    },
    hasError: function () {
        return this.options.messages.some( function (msg) {
            return msg.type == 'error';
        });
    },
    addError: function (error) {
        this.options.messages.include({msg: error, type: 'error'});
    },
    error: function() {
        var retval = '';
        this.options.messages.each(function (message) {
            if (message.type === 'error') {
		if (retval.length > 0) retval += " - ";
                retval += message.msg;
            }
        });
        return retval;
    },
    printStatus: function (decoratorFactory) {
        if (!$chk(this.decorator)) {
            this.decorator = decoratorFactory.createVoteDecorator();
        }
        this.decorator.decorateReply(this);
    }
});

var UCPVerticalVote = new Class({
    Extends: UCPVote,
    valid: function (previousVote, nPhotos, voteCommentNumber) { 
        // numbers in vote == nPhotos ??
        var challengeConfig = this.ucpThread().challengeDefinition();
        if (challengeConfig.neededPhotos() > 0 && nPhotos == challengeConfig.neededPhotos()) {
            // we need an entry for each vote, numbered sequentially
            if (this.options.votesArray.length - 1 < nPhotos) {
                this.addError('did not provide a vote line for every photo');
                return false;
            }
            if (this.options.votesArray.length - 1 > nPhotos) {
                this.addError('provided too much vote lines');
                return false;
            }
        }
        if (!previousVote && this.isExampleVote()) {
            return true;
        }
        if (!previousVote || (voteCommentNumber == 1 && previousVote.isExampleVote())) { // first (real) vote
            // unless it is an example vote, the first vote entry should contain only 1 vote
            var nVotes = this.options.votesArray.filter( function(vote, idx) {
                if (vote && vote > 0) {
                    this.options.votedFor[idx] = vote;
                    return true;
                }
                return false;
            }, this).length;
            if (nVotes > 1) {
                this.addError('voted on more than 1 photo');
                return false;
            }

            var maxOne = this.options.votesArray.every( function(vote, idx) {
                if (idx == 0) return true;
                if (vote == undefined) return true;
                if (vote > 1) return false;
                return true;
            });
            if (!maxOne) {
                this.addError('voted too much for the same photo');
                return false;
            }
        } else { // compare with previous vote: all votes should remain the same, except for one increment
	    nVotes = 0;
            this.options.votedFor = [];
            this.options.votesArray.each( function(vote, idx) {
                var prevVote = previousVote.options.votesArray[idx];
                if (idx == 0) return;
                if (vote == undefined && prevVote == undefined) return;
                if (prevVote != undefined) {
                    if (vote == undefined) {
                        this.addError('dropped a vote on photo ' + idx);
                    } else {
                        if (vote > ( prevVote + 1 )) {
                            this.options.votedFor[idx] = vote;
			    ++nVotes;
                            this.addError('voted too much on photo ' + idx);
                        } else if (vote < prevVote) {
                            this.addError('dropped a vote on photo ' + idx);
                        } else if (vote == (prevVote + 1)) {
                            this.options.votedFor[idx] = vote;
			    ++nVotes;
                        }
                    }
                } else {
                    if (vote > 1) {
		    	this.options.votedFor[idx] = vote;
			++nVotes;
                        this.addError('voted too much on photo ' + idx);
                    }
                }
            }, this);
	    if (this.options.votedFor.length == 0) {
                this.addError('did not really vote');
            }
	    if (nVotes > 1) {
	    	this.addError('voted for ' + nVotes + ' photos');
	    }
            if (!this.hasError()) {
                if (this.options.votesArray.length !== previousVote.options.votesArray.length) {
                    this.addError('but provided ' + (this.options.votesArray.length - 1) + ' vote lines while \'' + 
                            previousVote.poster().username + '\' provided ' + (previousVote.options.votesArray.length - 1));
                }
            }
            if (this.hasError()) return false;
        }
        
        return true;
    },
    isExampleVote: function () {
        // in VERTICAL, the example vote is empty
        return this.options.votesArray.every( function (vote, idx) {
            if (idx == 0) return true;
            return !vote || vote == 0;
        });
    }
});

var UCPHorizontalVote = new Class({
    Extends: UCPVote,
    valid: function (previousVote, nPhotos, voteCommentNumber) {
        this.options.votedFor = [];
        // numbers in vote == nPhotos ??
        var challengeConfig = this.ucpThread().challengeDefinition();
        if (challengeConfig.neededPhotos() > 0 && nPhotos == challengeConfig.neededPhotos()) {
            // we need an entry for each vote, numbered sequentially
            if (this.options.votesArray.length - 1 < nPhotos) {
                this.addError('did not provide a vote for every photo');
                return false;
            }
            if (this.options.votesArray.length - 1 > nPhotos) {
                this.addError('provided too much votes ');
                return false;
            }
        }
        if (!previousVote && this.isExampleVote()) {
            return true;
        }
        if (!previousVote || (voteCommentNumber == 1 && previousVote.isExampleVote()) &&
            this.ucpThread().challengeDefinition().scoresAdded()) { // first (real) vote
            // unless it is an example vote, the first vote entry should contain only 1 vote (0-0-1)
            var nVotes = this.options.votesArray.filter( function(vote, idx) {
                if (vote && vote > 0) {
                    this.options.votedFor[idx] = vote;
                    return true;
                }
                return false;
            }, this).length;
            if (nVotes > 1) {
                this.addError('voted on more than 1 photo');
                return false;
            }
            var maxOne = this.options.votesArray.every( function(vote, idx) {
                if (idx == 0) return true;
                if (vote == undefined) return true;
                if (vote > 1) return false;
                return true;
            });
            if (!maxOne) {
                this.addError('voted too much for the same photo');
                return false;
            }
        } else { // compare with previous vote: all votes should remain the same, except for one increment/decrement
	    nVotes = 0;
            if (this.ucpThread().challengeDefinition().scoresAdded()) {
                this.options.votesArray.each( function(vote, idx) {
                    var prevVote = previousVote.options.votesArray[idx];
                    if (idx == 0) return;
                    if (vote == undefined && prevVote == undefined) return;
                    if (prevVote != undefined) {
                        if (vote == undefined) {
                            this.addError('dropped a vote on photo ' + idx);
                        } else {
                            if (vote > ( prevVote + 1 )) {
                                this.options.votedFor[idx] = vote;
				++nVotes;
                                this.addError('voted too much on photo ' + idx);
                            } else if (vote < prevVote) {
                                this.addError('dropped a vote on photo ' + idx);
                            } else if (vote == (prevVote + 1)) {
                                this.options.votedFor[idx] = vote;
				++nVotes;
                            }
                        }
                    } else {
                        if (vote > 1) {
                            this.options.votedFor[idx] = vote;
			    ++nVotes;
                            this.addError('voted too much on photo ' + idx);
                        }
                    }
                }, this);
            } else { // constructive challenges
                this.options.votesArray.each( function(vote, idx) {
                    var prevVote = previousVote.options.votesArray[idx];
                    if (idx == 0) return;
                    if (vote == undefined && prevVote == undefined) return;
                    if (prevVote != undefined) {
                        if (vote == undefined) {
                            this.addError('dropped a vote on photo ' + idx);
                        } else {
                            if (vote < ( prevVote - 1 )) {
                                this.options.votedFor[idx] = vote;
				++nVotes;
                                this.addError('voted too much on photo ' + idx);
                            } else if (vote > prevVote) {
                                this.addError('dropped a vote on photo ' + idx);
                            } else if (vote == (prevVote - 1)) {
                                this.options.votedFor[idx] = vote;
				++nVotes;
                            }
                        }
                    } else {
                        if (vote < 5) {
                            this.options.votedFor[idx] = vote;
			    ++nVotes;
                            this.addError('voted too much on photo ' + idx);
                        }
                    }
                }, this);
            }
	    if (this.options.votedFor.length == 0) {
                this.addError('did not really vote');
            }
	    if (nVotes > 1) {
	    	this.addError('voted for ' + nVotes + ' photos');
	    }
            if (!this.hasError()) {
                if (previousVote && this.options.votesArray.length !== previousVote.options.votesArray.length) {
                    this.addError('but provided ' + (this.options.votesArray.length - 1) + ' votes while \'' + 
                            previousVote.poster().username + '\' provided ' + (previousVote.options.votesArray.length - 1));
                }
            }
            if (this.hasError()) return false;
        }
        return true;
    },
    isExampleVote: function () {
        // in HORIZONTAL, the example vote is 1-2-3
        // unless in constructive challenges, which start at 5-5-5
        if (!this.ucpThread().challengeDefinition().scoresAdded()) {
            return this.options.votesArray.every( function (vote, idx) {
                if (idx == 0) return true;
                return vote == 5;
            });
        }
        return this.options.votesArray.every( function (vote, idx) {
            if (idx == 0) return true;
            return vote == idx;
        });
    }
});

var UCPVerticalWeightedVote = new Class({
    Extends: UCPVote,
    valid: function (previousVote, nPhotos, voteCommentNumber) { 
        var challengeConfig = this.ucpThread().challengeDefinition();
        // numbers in vote == nPhotos ??
        if (challengeConfig.neededPhotos() > 0 && nPhotos == challengeConfig.neededPhotos()) {
            // we need an entry for each vote, numbered sequentially
            if (this.options.votesArray.length - 1 < nPhotos) {
                this.addWarning('did not provide a vote line for every photo');
            }
            if (this.options.votesArray.length - 1 > nPhotos) {
                this.addWarning('provided too much vote lines');
            }
        }
        if (!previousVote && this.isExampleVote()) {
            return true;
        }
        if (!previousVote || (voteCommentNumber == 1 && previousVote.isExampleVote())) { // first (real) vote
            // unless it is an example vote, the first vote entry should contain only 3 votes
            var nVotes = this.options.votesArray.filter( function(vote, idx) {
                if (vote && vote > 0) {
                    this.options.votedFor[idx] = vote;
                    return true;
                }
                return false;
            }, this).length;
            if (nVotes < 3) {
                this.addError('voted on only ' + nVotes + ' photo' + (nVotes > 1 ? 's' : ''));
                return false;
            }
            if (nVotes > 3) {
                this.addError('voted on ' + nVotes + ' photos');
                return false;
            }

            // the first vote should contain 3 ratings: 1, 2 and 3
            var ratings = this.options.votesArray.filter( function(vote, idx) {
                if (idx == 0) return false;
                if (vote && vote > 0) {
                    this.options.votedFor[idx] = vote;
                    return true;
                }
                return false;
            }, this);
            if (ratings.length > 3) {
                this.addError('provided too much ratings');
                return false;
            }
            if (ratings.length < 3) {
                this.addError('did not provide enough ratings');
                return false;
            }
            var validRatings = this.options.votesArray.filter( function(vote, idx) {
                if (idx == 0) return false;
                if (vote && (vote == 3 || vote == 2 || vote == 1)) return true;
                return false;
            });
            // there can not be more than 3: already filtered in above test
            if (validRatings.length < 3) {
                this.addError('did not provide enough valid ratings');
                return false;
            }
            // check for duplicates
            validRatings.sort(function(a,b){return a - b});
            if (!validRatings.every(function (value, idx) { return value == idx + 1; })) {
                this.addError('provided duplicate ratings');
                return false;
            }
        
        } else { // compare with previous vote: all votes should remain the same, except for 3 ratings
            var voteArray = [];
            voteArray[1] = voteArray[2] = voteArray[3] = 0;
            this.options.votesArray.each( function(vote, idx) {
                if (idx == 0) return;
                var prevVote = previousVote.options.votesArray[idx];
                if ((vote == undefined || vote == 0) && (prevVote == undefined || prevVote == 0)) return;
                if (prevVote == undefined || prevVote == 0) { // first vote on this photo
                    this.options.votedFor[idx] = vote;
                    if (vote > 3) {
                        this.addError('voted too much on photo ' + idx);
                        return;
                    }
                    if (vote < 1) {
                        this.addError('voted negative on photo ' + idx);
                        return;
                    }
                    voteArray[vote] = ++voteArray[vote];
                } else {
                    if (prevVote == vote) return;
                    // new ratings on this one
                    voteArray[vote - prevVote] = ++voteArray[vote - prevVote];
                    this.options.votedFor[idx] = vote - prevVote;
                    if ((vote - prevVote) > 3) {
                        this.addError('voted too much on photo ' + idx);
                        return;
                    }
                    if (prevVote > vote) {
                        this.addError('dropped a vote on photo ' + idx);
                        return;
                    }
                }
            }, this);
            if (!this.hasError()) {
                if (this.options.votesArray.length !== previousVote.options.votesArray.length) {
                    this.addWarning('but provided ' + (this.options.votesArray.length - 1) + ' vote lines while \'' + 
                            previousVote.poster().username + '\' provided ' + (previousVote.options.votesArray.length - 1));
                }
            }
            if (!voteArray.every(function(vote,idx){
                if (idx == 0) return true;
                return vote == 1;
            })) {
                this.addError('invalid rating');
                // TODO: show doubles or missing ones
                GM_log("invalid rating: " + voteArray);
            }
        }
        
        return !this.hasError();
    },
    isExampleVote: function () {
        // in VERTICAL-WEIGHTED, the example vote is empty
        return this.options.votesArray.every( function (vote, idx) {
            if (idx == 0) return true;
            return !vote || vote == 0;
        });
    },
    votedFor: function () {
        // the same as for the base class, but the weight should show
        var votedForString;
        if (this.options.votedFor.length > 0) {
            votedForString = "(";
            this.options.votedFor.each( function(value,idx) {
                if (idx == 0) return;
                if (value != undefined && value > 0) {
                    if (votedForString.length > 1) votedForString += ",";
                    votedForString += (idx + ":" + value + "pt");
                }
            });
            votedForString += ")";
        }
        return votedForString;
    }
});

var UCPRatePhotoVote = new Class({
    Extends: UCPVote,
    valid: function (previousVote, nPhotos, voteCommentNumber) {
        this.options.votedFor = [];
        if (!previousVote && this.isExampleVote()) {
            return true;
        }
        this.options.votesArray.each( function(vote, idx) {
            if (vote && vote > 0) {
                this.options.votedFor[idx] = vote;
            }
        }, this);
            // none of the votes should be for a non-existing photo
            // => does not work: if photo 14 is removed from the challenge, later entries may keep their number
        return true;
    },
    isExampleVote: function () {
        // 1 - 3pt
        // 2 - 2pt
        // 3 - 3pt
        // => votesArray (0,3,2,1)
        return this.options.votesArray.every( function (value, idx) {
                if (idx == 0) return true;
                return (idx + value) == 4;
        });
    },
    votedFor: function () {
        // the same as for the base class, but the weight should show
        var votedForString;
        if (this.options.votedFor.length > 0) {
            votedForString = "(";
            this.options.votedFor.each( function(value,idx) {
                if (idx == 0) return;
                if (value != undefined && value > 0) {
                    if (votedForString.length > 1) votedForString += ",";
                    votedForString += (idx + ":" + value + "pt");
                }
            });
            votedForString += ")";
        }
        return votedForString;
    }
});

var UCPPICHorizontalVote = new Class({
    Extends: UCPVote,
    valid: function (previousVote, nPhotos, voteCommentNumber) {
        this.options.votedFor = [];
        if (!previousVote && this.isExampleVote()) {
            return true;
        }
        this.options.votesArray.each( function(vote, idx) {
            if (vote && vote > 0) {
                this.options.votedFor[idx] = 1;
            }
        }, this);
            // none of the votes should be for a non-existing photo
            // => does not work: if photo 14 is removed from the challenge, later entries may keep their number
        return true;
    },
    isExampleVote: function () {
        return false;
    }
});

var UCPPICVerticalVote = new Class({
    Extends: UCPVote,
    valid: function (previousVote, nPhotos, voteCommentNumber) {
        this.options.votedFor = [];
        if (!previousVote && this.isExampleVote()) {
            return true;
        }
        this.options.votesArray.each( function(vote, idx) {
            if (vote && vote > 0) {
                this.options.votedFor[idx] = 1;
            }
        }, this);
            // none of the votes should be for a non-existing photo
            // => does not work: if photo 14 is removed from the challenge, later entries may keep their number
        return true;
    },
    isExampleVote: function () {
        return false;
    }
});

var UCPPICPlayerVote = new Class({
    Extends: UCPVote,
    valid: function (previousVote, nPhotos, voteCommentNumber) {
        this.options.votedFor = [];
        if (!previousVote && this.isExampleVote()) {
            return true;
        }
        this.options.votesArray.each( function(vote, idx) {
            if (vote && vote > 0) {
                this.options.votedFor[idx] = 1;
            }
        }, this);
            // none of the votes should be for a non-existing photo
            // => does not work: if photo 14 is removed from the challenge, later entries may keep their number
        return true;
    },
    isExampleVote: function () {
        return false;
    }
});

function extractPhotoId(srcUrl) {
	// old url http://www.flickr.com/123/1234_5678.jgp
	// old url http://farmX.staticflickr.com/123/1234_5678.jpg
	// new url http://c5.staticflickr.com/sm/123/1234_5678.jpg
	var match = srcUrl.match(/https?:\/\/[^\/]*flickr.com\/.+\/(\d+)_.*/);
	if (match) {
		return match[1];
	}
	// new url http://v4s2.yimg.com/so/1234/1234_5678.jpg"
	match = srcUrl.match(/https?:\/\/[^\/]*yimg.com\/.*\/(\d+)_.*/);
	if (match) {
		return match[1];
	}
	return null;
}

function apiCheckPhotoApproval(photo, photoTextNode, topicId) {
// TODO: 
// - fails in case there two or three photo entries: 
// http://www.flickr.com/groups/thumbsup_challenges/discuss/72157625215597037/
        // returns
        // {
        //      approved: true/false,
        //      approver: string,
        //      version: number,
        //      checksum: true/false,
        //      photoChecksum: true/false,
        //      error: string
        //      photoId: string
        //  }

    var photoId = extractPhotoId(photo.get('src'));
/*return {
        approved: true,
        approver: "todo",
        photoId: photoId
    }; */
    try {
        var approvedNode = photoTextNode.getElement("img[src=http://l.yimg.com/g/images/spaceout.gif][alt*=UCPAapproved]");
    } catch (e) {
        GM_log("error: " + e);
        return true;
    }
    if (!approvedNode) {
        return { approved: false };
    }
    var approvedString = approvedNode.get('alt');
    var ignore, name, photoChecksum, checksum, version;
    try {
        var approveMatch = /UCPAapproved:([^:]*):([^:]*):([^:]*):(\d+)/.exec(approvedString);
        ignore = approveMatch[0];
        name = decodeURIComponent(approveMatch[1]);
        photoChecksum = approveMatch[2];
        checksum = approveMatch[3];
        version = approveMatch[4];
    } catch (e) {
        return { approved: false,
                 error: "checksum has been modified!",
                 photoId: photoId
        };
    }
    if ($chk(ignore)) {
        var goodPhotoChecksum = ucpUniversalHash(photo.src.replace(/^https/,"http"));
        if (goodPhotoChecksum !== parseInt(photoChecksum, 10)) {
            return { approved: false,
                     version: version,
                     checksum: true,
                     photoChecksum: false,
                     error: "photo has been changed after approval!",
                     photoId: photoId
            };
        }
        var goodChecksum = ucpUniversalHash(photoId + name + topicId);
        //GM_log("good: " + goodChecksum + " - photo: " + checksum);
        if (goodChecksum !== parseInt(checksum, 10)) {
            return { approved: false,
                     version: version,
                     checksum: false,
                     error: "checksum has been tampered with!",
                     photoId: photoId
            };
        }
        return { 
            approved: true,
            approver: name,
            version: version,
            checksum: true,
            photoChecksum: true,
            photoId: photoId
        };
    } else {
        return { approved: false, error: "failed to process UCPA approved entry"};
    }
}

var ucpReHorizontalVoteMatch;
function ucpGetReHorizontalVoteMatch() {
    // TODO: if challengeConfig.neededPhotos === ucpThread.photosposted => limit reMatch to nPhotos
    if (!ucpReHorizontalVoteMatch) {
	// xX: when a photo is removed once voting has started, it may be replaced with x: 1-2-x-0
        // when split with a character, it can be double digits
        var reVoteMatchSplit  = "(?:\\b|\\s)(\\d+|[xX]{1})(?:\\s*)?[^xX\\d]{1,2}(?:\\s*)?(\\d+|[xX]{1})"; // at least 2
        // when stuck to each other, it should be single digits
        var reVoteMatchJoined = "(?:\\b|\\s)(\\d{1}|[xX]{1})(\\d{1}|[xX]{1})"; // at least 2
                
        // limit the seperation characters to non-alphabet characters:
        for (var p = 1; p < 10; ++p) {
            reVoteMatchSplit  = reVoteMatchSplit  + "(?:\\s*)?(?:[^xX\\d]{1,2})?(?:\\s*)?(\\d+|[xX]{1})?";
            reVoteMatchJoined = reVoteMatchJoined + "(\\d{1}|[xX]{1})?";
        }
        reVoteMatchSplit  = reVoteMatchSplit  + "(?:\\s|\\b)";
        reVoteMatchJoined = reVoteMatchJoined + "(?:\\s|\\b)";
        ucpReHorizontalVoteMatch = new RegExp(reVoteMatchSplit + "|" + reVoteMatchJoined, "ig");
    }
    return ucpReHorizontalVoteMatch;
}

function parseVerticalVote(data) {
    var replytxt = data.replytxt;
    var challengeEntry = data.challengeEntry;
    var replyId = data.replyId;
    var ucpThread = data.ucpThread;
    var challengeConfig = ucpThread.challengeDefinition();
    var poster = data.poster;
    var exampleVote = data.exampleVote;

    var vVotesArray = [];
    var vVoteLines = replytxt.split(/\n\s*/);
    // voteLines is an array:
    // #01- 1
    // #02- 1+2+3
    // ..
    // others use 1:
    var reVoteMatch1 = /(\d{1,2})#/; // 01-
    var reVoteMatch2 = /(\d{1,2})#(\d+)/; // '01-1'
    var reVoteMatch3 = /(\d{1,2})#(\d+)([^0-9azA-Z](\d+))+/; // '01-1+2' && '01- 1+2+3'
    var vVotesFound = 0;
    var vVoided = false;
    // it misses the first votes: 01-1 or 06-1, but that's to be ignored :)
    for (var j = 0, vVoteLinesLength = vVoteLines.length; j < vVoteLinesLength; ++j) {
        var vVoteLine = vVoteLines[j];
        // remove any leading spaces
        vVoteLine = vVoteLine.replace(/^\s*/, '');
        // ignore lines that are comment text
        if (vVoteLine.match(/^\s*[a-zA-Z\s\.\,\(]{6}/)) { // 6? arbitrary
            continue;
        }
        // first seperate the photo number from the votes, in case it was seperated with a space
        var reVReplaceMatch = /#(\d{1,2})/;
        vVoteLine = vVoteLine.replace(reVReplaceMatch, "$1"); // remove leading #
        reVReplaceMatch = /(\d{1,2})([\-:+\. ]+|\.{2,3})/; // faves contest uses '...', adding it to [] creates havoc in other places, even with escaping (or escaping double)
        vVoteLine = vVoteLine.replace(reVReplaceMatch, "$1#"); // insert # after photonumber
        // remove spaces, but first replace spaces between votes, if any
        vVoteLine = vVoteLine.replace(/(\d)\s+(\d)/g, "$1+$2");
        vVoteLine = vVoteLine.replace(/\s/g, '');
        // remove any character before first vote in voteLine 00#-1+2
        vVoteLine = vVoteLine.replace(/(\d{1,2}#)[^0-9]*/, "$1");
        if (vVoteLine.match(/^\s*\d{1,2}\s*$/)) {
            vVoteLine = vVoteLine.replace(/^\s*(\d{1,2})\s*$/, "$1#0");
        }
        if (vVoteLine.match(/void/i) && !vVoteLine.match(/^\d/)) {
            // Skip replies where the vote has been voided
            vVoided = true;
            break;
        }
        var matchedString, photoNumber, photoScore;
        var verticalVotes = reVoteMatch3.exec(vVoteLine);
        if (verticalVotes) {
            photoNumber = verticalVotes[1];
            photoScore = verticalVotes[4];
            vVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = parseInt(verticalVotes[4], 10);
            ++vVotesFound;
            continue;
        }
        verticalVotes = reVoteMatch2.exec(vVoteLine);
        if (verticalVotes) {
            photoNumber = verticalVotes[1];
            photoScore = verticalVotes[2];
            vVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = parseInt(photoScore, 10);
            ++vVotesFound;
            continue;
        }
        verticalVotes = reVoteMatch1.exec(vVoteLine);
        if (verticalVotes) {
            photoNumber = verticalVotes[1];
            vVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = 0;
            ++vVotesFound;
            continue;
        }
        // thisvotes is still null => normal comment
    }       
    //GM_log(vVotesArray);
    if (vVoided) {
        var voidedVote = new UCPVote({
            poster: poster, 
            voteText: vVoteLines, 
	    replyId: replyId,
	    content: replytxt,
            votesArray: vVotesArray, 
            node: challengeEntry,
            ucpThread: ucpThread
        });
        voidedVote.isVoid = function () {
            return true;
        };
        return voidedVote;
    } else {
        if (vVotesFound <= 1) { // voting for one photo makes no sense
            return new UCPVoteComment({
                poster: poster,
                node: challengeEntry,
		replyId: replyId,
		content: replytxt,
                ucpThread: ucpThread
            });
        } else {
            var vote = new UCPVerticalVote({
                chlgname: challengeConfig.reName(), 
                poster: poster, 
		replyId: replyId,
		content: replytxt,
                voteText: vVoteLines, 
                votesArray: vVotesArray, 
                node: challengeEntry,
                ucpThread: ucpThread
            });
            if (exampleVote) {
                vote.isExampleVote = function () {
                    return true;
                };
            }
            return vote;
        }
    }
}

function parseHorizontalVote(data) {
    var ucpThread = data.ucpThread;
    var picType = ucpThread.challengeDefinition().scoreType().match('PIC-H');
    var exampleVote = data.exampleVote;
    var poster = data.poster;
    var replyId = data.replyId;
    var challengeEntry = data.challengeEntry;
    var replytxt = data.replytxt;

    // first: cleanup the comment, to ease the vote recognition

    // in The mother of all challenge group, the 'local' CP script has no way to handle '10'; 
    // they use ten instead
    // people that use this hack, also use it in other groups:
    replytxt = replytxt.replace(/[\s,-]+ten[\s,-]+/g,  "-10-");
    replytxt = replytxt.replace(/[\s,-]+nine[\s,-]+/g,  "-9-");
    replytxt = replytxt.replace(/[\s,-]+eight[\s,-]+/g, "-8-");
    replytxt = replytxt.replace(/[\s,-]+seven[\s,-]+/g, "-7-");
    replytxt = replytxt.replace(/[\s,-]+six[\s,-]+/g,   "-6-");
    replytxt = replytxt.replace(/[\s,-]+five[\s,-]+/g,  "-5-");
    replytxt = replytxt.replace(/[\s,-]+four[\s,-]+/g,  "-4-");
    replytxt = replytxt.replace(/[\s,-]+three[\s,-]+/g, "-3-");
    replytxt = replytxt.replace(/[\s,-]+two[\s,-]+/g,   "-2-");
    replytxt = replytxt.replace(/[\s,-]+one[\s,-]+/g,   "-1-");
    replytxt = replytxt.replace(/[\s,-]+nil[\s,-]+/g,   "-0-");
    replytxt = replytxt.replace(/[\s,-]+zero[\s,-]+/g,  "-0-");
    replytxt = replytxt.replace(/[\s,-]+o[\s,-]+/g,     "-0-");
    var replyLines = replytxt.split(/\n\s*/);
    var horizontalVotes = null;
    $each(replyLines, function (replyLine) {
        if (replyLine.match(/void/i)) {
            // Skip lines where the vote has been voided
            return;
        }
        // check for comments before any other manipulations
        // corrections of the form 'corrected:', 'correction:' (need the ':' -> '1-2-3 with correction')
        replyLine = replyLine.replace(/cor(?:r)?ected:|correction:/, '&gt;&gt;'); // corrected sometimes mis-spelled
//      removed: vote after misvote '1-2-3 (with correction)' where seen as regular comments
        if (!replyLine || replyLine.replace(/<[^>]*>/g, '')          // remove html tags
                                       .replace(/^\s*/g, '')             // remove leading spaces
                                       .replace(/^foto[^\d]*|^photo[^\d]*/i, '')     // remove 'photo' in 'photo 2: 1-1-1'
                                       .replace(/(&gt;)+/, '') // don't ignore corrections (>> or -->)
                                       .match(/^[^\d]{6}/)) { // 6? arbitrary
            return;
        }
        replyLine = replyLine.replace(/<a[^<]*<\/a>/g, ''); // removes links
        replyLine = replyLine.replace(/\s*<[^>]*>\s*/g, ''); // removes html tags

        // remove any leading white space
        replyLine = replyLine.replace(/^\s*/g, '');
        replyLine = replyLine.replace(/^foto[^\d]*|^photo[^\d]*/i, '');
        if (!replyLine) {
            return;
        }
        replyLine = replyLine.replace(/^.*(?:&gt;|\||→)+\s*/g, ''); // correction
        // some like voting with extra spaces '0 - 1 - 2'
        // must be done after correction characters
        //replyLine = replyLine.replace(/(\d+)\s+[^a-zA-Z0-9]/g, "$1-");
        // remove the trailing '-'
        replyLine = replyLine.replace(/-$/, '');
        // ignore lines that are comment text
        if (!replyLine || replyLine.match(/^\s*[a-zA-Z\s\.\,\(]{6}/)) { // 6? arbitrary
            return;
        }

        // catches multiple votes, or comment, on multiple lines
        var matchVotes = ucpGetReHorizontalVoteMatch().exec(replyLine);
        while (matchVotes) { // catches multiple votes (correction?) on one line
            horizontalVotes = matchVotes;
            matchVotes = ucpGetReHorizontalVoteMatch().exec(replyLine);
        }
    });
    if (horizontalVotes) {
        var nvotes = horizontalVotes.length - 1;
        // vote: 1-2-3
        //    if (nvotes >= neededPhotos) {
        var hVotesArray = [];
        var voteIdx     = 1; // 0: the input string
        while (!horizontalVotes[voteIdx]) {
            ++voteIdx; // skip the non matching part
        }
        var arrayIdx = 1;
        while (true) {
            if (picType) {
                hVotesArray[parseInt(horizontalVotes[voteIdx], 10)] = 1;
            } else {
                hVotesArray[arrayIdx] = parseInt(horizontalVotes[voteIdx], 10);
            }
            if (voteIdx + 1 >= horizontalVotes.length) {
                break;
            }
            if (!horizontalVotes[voteIdx + 1]) {
                break;
            }
            ++voteIdx;
            ++arrayIdx;
        }
        var retval = picType ?
                        new UCPPICHorizontalVote({
                            chlgname: ucpThread.challengeName(), 
                            poster: poster, 
                            voteText: horizontalVotes, 
                            votesArray: hVotesArray,
                            node: challengeEntry,
			    replyId: replyId,
			    content: replytxt,
                            ucpThread: ucpThread
                        }) :
                        new UCPHorizontalVote({
                            chlgname: ucpThread.challengeName(), 
                            poster: poster, 
                            voteText: horizontalVotes, 
                            votesArray: hVotesArray,
                            node: challengeEntry,
			    replyId: replyId,
			    content: replytxt,
                            ucpThread: ucpThread
                        });
        if (exampleVote) {
            retval.isExampleVote = function () {
                return true;
            };
        }
        return retval;
    } else {
        return new UCPVoteComment({
            poster: poster,
            node: challengeEntry,
	    replyId: replyId,
	    content: replytxt,
            ucpThread: ucpThread
        });
    }
}

function parseVerticalWeightedVote(data) {
    var ucpThread = data.ucpThread;
    var exampleVote = data.exampleVote;
    var poster = data.poster;
    var replyId = data.replyId;
    var challengeEntry = data.challengeEntry;
    var replytxt = data.replytxt;
    var challengeConfig = ucpThread.challengeDefinition();

    var vwVotesArray = [];
    var vwVoteLines = replytxt.split(/\n\s*/);
    // voteLines is an array:
    // #01: 3+1 (4)
    // #02: 3 (3)
    // ..
    // others use 1:
    var reVwVoteMatch1 = /(\d{1,2})#/;          // 01: -> no rating on this photo
    var reVwVoteMatch2 = /(\d{1,2})#(\d+)/;     // '01:1' --> simple rating on this photo
    var reVwVoteMatch3 = /(\d{1,2})#\d(\d|\s|\+)+\d+/; // sometimes, someone forgets the sum: 01:1+2
    var reVwVoteMatch4 = /(\d{1,2})#(\d|\s|\+|\(\d+\))*\((\d+)\)/; // '01:1+2(3)' && '01:1+2+3(4)' && '01:(2)' && '01:1+2(3)+2(5)'
    var vwVotesFound = 0;
    var vwVoided = false;
    for (var j = 0, vwVoteLinesLength = vwVoteLines.length; j < vwVoteLinesLength; ++j) {
        var vwVoteLine = vwVoteLines[j];
        // remove any leading spaces
        vwVoteLine = vwVoteLine.replace(/^\s*/, '');
        // ignore lines that are comment text
        if (vwVoteLine.match(/^\s*[a-zA-Z\s\.\,\(]{6}/)) { // 6? arbitrary
            continue;
        }
        // first seperate the photo number from the votes, in case it was seperated with a space
        var reVwReplaceMatch = /#(\d{1,2})/;
        vwVoteLine = vwVoteLine.replace(reVwReplaceMatch, "$1"); // remove leading #
        reVwReplaceMatch = /^(\d{1,2})([\-:+ ]+|\.{2,3})/;
        vwVoteLine = vwVoteLine.replace(reVwReplaceMatch, "$1#"); // insert # after photonumber
        // remove spaces
        vwVoteLine = vwVoteLine.replace(/\s/g, '');
        // remove any character before first vote in voteLine 00#-1+2
        vwVoteLine = vwVoteLine.replace(/(\d{1,2}#)[^0-9]*/, "$1"); // a remaining '-' would make it a negative vote :)
        if (vwVoteLine.match(/^\s*\d{1,2}\s*$/)) {
            vwVoteLine = vwVoteLine.replace(/^s*(\d{1,2})\s*$/, "$1#0"); // add a 0 as vote, where no rating is given
        }
        if (vwVoteLine.match(/void/i) && !vwVoteLine.match(/^\d/)) {
            // Skip replies where the vote has been voided
            vwVoided = true;
            break;
        }
        var matchedString, photoNumber, photoScore;
        var verticalWVotes = reVwVoteMatch4.exec(vwVoteLine);
        if (verticalWVotes) {
            photoNumber = verticalWVotes[1];
            photoScore = verticalWVotes[3];
            vwVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = parseInt(photoScore, 10);
            ++vwVotesFound;
            continue;
        }
        verticalWVotes = reVwVoteMatch3.exec(vwVoteLine);
        if (verticalWVotes) {
            photoNumber = verticalWVotes[1];
            reVwVoteMatch = /(\d{1,2})#([\d\s\+]+)/.exec(vwVoteLine);
            try {
                verticalWVotes = eval(reVwVoteMatch[2]);
                vwVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = verticalWVotes;
                ++vwVotesFound;
                continue;
            } catch (e) {
                // well, we tried, didn't we
            }
        }
        verticalWVotes = reVwVoteMatch2.exec(vwVoteLine);
        if (verticalWVotes) {
            photoNumber = verticalWVotes[1];
            photoScore = verticalWVotes[2];
            vwVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = parseInt(photoScore, 10);
            ++vwVotesFound;
            continue;
        }
        verticalWVotes = reVwVoteMatch1.exec(vwVoteLine);
        if (verticalWVotes) {
            photoNumber = verticalWVotes[1];
            vwVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = 0;
            ++vwVotesFound;
            continue;
        }
        // thisvotes is still null => normal comment
    }       
    //GM_log(vwVotesArray);
    if (vwVoided) {
        var voidedWVote = new UCPVote({
            poster: poster, 
	    replyId: replyId,
	    content: replytxt,
            voteText: vwVoteLines, 
            votesArray: vwVotesArray, 
            node: challengeEntry,
            ucpThread: ucpThread
        });
        voidedWVote.isVoid = function () {
            return true;
        };
        return voidedWVote;
    } else {
        if (vwVotesFound <= 1) { // voting for one photo makes no sense
            return new UCPVoteComment({
                           poster: poster,
			   replyId: replyId,
			   content: replytxt,
                           node: challengeEntry,
                           ucpThread: ucpThread
                       });
        } else {
            var vote = new UCPVerticalWeightedVote({
                                chlgname: challengeConfig.reName(), 
                                poster: poster, 
				replyId: replyId,
				content: replytxt,
                                voteText: vwVoteLines, 
                                votesArray: vwVotesArray, 
                                node: challengeEntry,
                                ucpThread: ucpThread
                            });
            if (exampleVote) {
                vote.isExampleVote = function () {
                    return true;
                };
            }
            return vote;
        }
    }
}

function parseRatePhotoVote(data) {
    var ucpThread = data.ucpThread;
    var exampleVote = data.exampleVote;
    var poster = data.poster;
    var replyId = data.replyId;
    var challengeEntry = data.challengeEntry;
    var replytxt = data.replytxt;
    var challengeConfig = ucpThread.challengeDefinition();
    var rVotesArray = [];
    var rVoteLines = replytxt.split(/\n\s*/);
    // voteLines is an array (olho no lance):
    // photo 01: 7 pontos
    // photo 02: 4 pontos
    // ..
    // or (20 temas fotograficos)
    // 3 puntos: #12
    // 2 puntos: #2
    // ..
    // or (NA Nature)
    // 1°-#8
    // 2°-#1
    // 3°-#5
    var reVoteMatch1 = /(?:photo|foto|#)?\s*(\d+)[^\d]*(\d+)\s*p/i;
    var reVoteMatch2 = /(\d+)\s*p[^\d]*(\d+)/i;
    var reVoteMatch3 = /^#?(\d+)/;
    var reVoteMatch4 = /(\d+)\s*[,-]\s*(\d+)[,-]\s*(\d+)/;
    var reVoteMatch5 = /^(?:1|2|3)[^\d]+(\d+)/; // NA Nature
    var rVotesFound = 0;
    var weight = 3; // the top one is worth 3p
    rVoteLines.forEach(function (rVoteLine) {
        // remove any leading spaces
        rVoteLine = rVoteLine.replace(/^\s*/, '');
        if (rVoteLine.match(/void/i)) {
            // Skip replies where the vote has been voided
            return;
        }
        var matchedString, photoNumber, photoScore;
        var rateVotes = reVoteMatch1.exec(rVoteLine);
        if (rateVotes) {
            photoNumber = rateVotes[1];
            photoScore = rateVotes[2];
            rVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = parseInt(photoScore, 10);
            ++rVotesFound;
            return;
        }
        rateVotes = reVoteMatch2.exec(rVoteLine);
        if (rateVotes) {
            photoScore = rateVotes[1];
            photoNumber = rateVotes[2];
            rVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = parseInt(photoScore, 10);
            ++rVotesFound;
            return;
        }
        rateVotes = reVoteMatch4.exec(rVoteLine);
        if (rateVotes) {
            rVotesArray[parseInt(rateVotes[1].replace(/^0/, ''), 10)] = challengeConfig.equalWeights() ? 2 : 3;
            rVotesArray[parseInt(rateVotes[2].replace(/^0/, ''), 10)] = 2;
            rVotesArray[parseInt(rateVotes[3].replace(/^0/, ''), 10)] = challengeConfig.equalWeights() ? 2 : 1;
            ++rVotesFound;
            return;
        }
	rateVotes = reVoteMatch5.exec(rVoteLine);
        if (rateVotes) {
            photoNumber = rateVotes[1];
            rVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = weight;
            weight--;
            ++rVotesFound;
            return;
        }
        rateVotes = reVoteMatch3.exec(rVoteLine); // as last: matches above two
        if (rateVotes) {
            photoNumber = rateVotes[1];
            rVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = weight;
            ++rVotesFound;
            weight--;
            return;
        }
        // thisvotes is still null => normal comment
    });
    //my_log(vVotesArray);
    if (rVotesFound <= 0) {
        return new UCPVoteComment({
                    poster: poster, 
		    replyId: replyId,
		    content: replytxt,
                    node: challengeEntry,
                    ucpThread: ucpThread
                });
    } else {
        var vote = new UCPRatePhotoVote({
                    chlgname: challengeConfig.chlgname, 
                    poster: poster, 
		    replyId: replyId,
		    content: replytxt,
                    voteText: rVoteLines, 
                    votesArray: rVotesArray, 
                    node: challengeEntry,
                    ucpThread: ucpThread
                });
        if (exampleVote) {
            vote.isExampleVote = function () {
                return true;
            };
        }
        return vote;
    }
}

function parsePICVerticalVote(data) {
    var ucpThread = data.ucpThread;
    var exampleVote = data.exampleVote;
    var poster = data.poster;
    var replyId = data.replyId;
    var challengeEntry = data.challengeEntry;
    var replytxt = data.replytxt;
    var challengeConfig = ucpThread.challengeDefinition();
    var picX = data.picX;

    // scores are a single number, on separate lines
    var pvVotesArray = [];
    var pvVoteLines = replytxt.split(/\n\s*/);
    var pVotesFound = 0;
    var possibleExampleVote = true; 
    // BUG: http://www.flickr.com/groups/the-storybook-challenge-group/discuss/72157625609019459/
    // 1. pic-v-3 with vote 2 3 1, is not an example vote
    // 2. the second vote is considered an example vote; should never happen
    pvVoteLines.each(function (pvVoteLine, k) {
        var pvVoteLine = pvVoteLines[k];
        // remove any leading spaces
        pvVoteLine = pvVoteLine.replace(/^\s*/, '').replace(/#\s+(\d+)/, "$1");
        pvVoteLine = pvVoteLine.replace(/^foto[^\d]*|^photo[^\d]*/i, '');
        pvVoteLine = pvVoteLine.replace(/^n°[^\d]*/i, '');
        // ignore lines that are comment text
        if (pvVoteLine.match(/^\s*[a-zA-Z\s\.\,\(]{6}/)) { // 6? arbitrary
            return;
        }
        var reReplaceMatch = /#(\d{1,2})/;
        pvVoteLine = pvVoteLine.replace(reReplaceMatch, "$1"); // remove leading #
        var picVoteMatch = /^\s*(\d+)/.exec(pvVoteLine);
        if (picVoteMatch) {
            var voteIdx = parseInt(picVoteMatch[1].replace(/^0(\d+)/, '$1'), 10);
            if (voteIdx < 256) { // if someone enters a 'summary' of the scores (2302042141) => oom
                pvVotesArray[voteIdx] = 1;
                ++pVotesFound;
                return;
            }
        }
    });
    if (picX === undefined || pVotesFound <= 0) {
        return new UCPVoteComment({
                       poster: poster, 
		       replyId: replyId,
		       content: replytxt,
                       node: challengeEntry,
                       ucpThread: ucpThread
                   });
    } else { // picX defined
        if (pVotesFound < picX) {
            return new UCPVoteComment({
                       poster: poster,
		       replyId: replyId,
		       content: replytxt,
                       node: challengeEntry,
                       ucpThread: ucpThread
                   });
        } else {
            var picVVote = new UCPPICVerticalVote({
                       chlgname: challengeConfig.reName(), 
                       poster: poster, 
		       replyId: replyId,
		       content: replytxt,
                       voteText: pvVoteLines, 
                       votesArray: pvVotesArray, 
                       node: challengeEntry,
                       ucpThread: ucpThread
                   });
            // also catches rules:
            // 1) ...
            // 2) ...
            // so, try to remove these
            /*
            if (!exampleVote) {
                var picExampleVote = picX > 1; // assume an example vote, only if voting for multiple
                                              // voting for photo 1 results in example vote otherwise
                GM_log("checking for example vote: ");
                pvVotesArray.each(function (vote, idx) {
                // TODO: check
                GM_log("idx: " + idx + " - vote: " + vote);
                    if (idx == 0) return; // skip index 0: 1-based voting
                    if (picExampleVote && (!vote || isNaN(vote))) {
                        picExampleVote = false;
                        return;
                    }
                });
            }*/
            if (/*picExampleVote ||*/ exampleVote) {
                picVVote.isExampleVote = function () {
                    return true;
                }; // override default behaviour
            }
            return picVVote;
        }
    }
}

function parsePICPlayerVote(data) {
    var ucpThread = data.ucpThread;
    //var exampleVote = data.exampleVote;
    var poster = data.poster;
    var replyId = data.replyId;
    var challengeEntry = data.challengeEntry;
    var replytxt = data.replytxt;
    var photoArray = data.photoArray;
    var challengeConfig = ucpThread.challengeDefinition();
    var picX = data.picX;

    // used in MatchPoint (http://www.flickr.com/groups/matchpoint/discuss/)
    // and in F64 Challenge (http://www.flickr.com/groups/flickr64challenge/discuss/)
    var ppVoteLines = replytxt.split(/\n\s*/);
    var player;
    var ppVote = undefined;
    var ppVotesFound = 0;
    var ppVotesArray = []; // [challengeConfig.options.neededPhotos + 1];
    ppVoteLines.each(function (ppVoteLine, l) {
	if (ppVoteLine.length < 3) {
		return;
	}
	// TODO: add new variable to challengeDefinition: voteWithBuddyIcon
        // (remove buddyicons first: contains @)
        ppVoteLine = ppVoteLine.replace(/<img[^>]+>/g, '');
        // ignore lines that are comment text
        if (!ppVoteLine.match(/@|#|p(oi)?nt/i) && document.location.href.match('matchpoint')) {
            return;
        }
        // remove any leading spaces
        ppVoteLine = ppVoteLine.replace(/^\s*/, '');
        // remove html, which does not fit in a username
        ppVoteLine = ppVoteLine.replace(/[@#](\s*[^<]*)/, '@ $1');
	// MatchPoint
        var picPVoteMatch = /\d+[^\d]*[@#]\s*([^<]*)/.exec(ppVoteLine);
        if (!picPVoteMatch) {
            picPVoteMatch = ppVoteLine.match(/(?:point|pnt)[^\d]*\d+[^@#]*[@#]\s*([^<]*)/i);
        }
	// F64
	if (!picPVoteMatch) {
		picPVoteMatch = ppVoteLine.match(/vote:?\s*(.*)/i);
	}
	if (!picPVoteMatch && nameOnly) {
		// sometimes, only the name is given
		picPVoteMatch = ppVoteLine.match(/(.*)/);
	}
        var ppVotesArray = []; //[challengeConfig.options.neededPhotos + 1];
        if (picPVoteMatch) {
            player = picPVoteMatch[1];
            // cleanup player
            player = player.replace(/\)/g, ''); // smiley's !!
            player = player.replace(/<[^>]*>/g, '').replace(/\s*$/, '');
            player = player.replace(/&nbsp;/g, ' ');
            // remove insignificant characters at the end of the player entry
            player = player.replace(/(?:\.|\!|\s)+$/, '');
            // compensate for spaces, and underscores in usernames, or the lack of them
	    player = player.replace(/(?:_|\s\.|\)|\()+/g, '');
            // people tend to mistype usernames with numbers
            if (player.replace(/\d/g, '').length > 0 ) {
                player = player.replace(/\d/g, '');
            }
            photoArray.each(function (photo, ppPhotoIdx) {
                var photo = photoArray[ppPhotoIdx];
                if (!(photo instanceof UCPCompetitor)) {
                    return;
                }
		var challenger = photo.poster().username.replace(/(?:_|\s|\)|\(|\.)+/g, '');
                if (challenger.replace(/\d/g, '').length > 0) {
                    challenger = challenger.replace(/\d/g, '');
                }
                // voters make shortcuts for usernames, and don't care for case
                // they also misspell Mustela, and anglerove
                if (photo && (
                        (challenger.match(/Mustela.Nivalis/) && player.match(/Must(e|a)l?a/i)) ||
                        (challenger.match(/anglerove/) && player.match(/angelrove/i))
                    )) {
                    ppVotesArray[ppPhotoIdx + 1] = 1; //parseInt(score, 10);
		    ++ppVotesFound;
                    return; // go to next vote line
                }
        try {
                if (photo && challenger.toLowerCase().match(player.toLowerCase())) {
                    ppVotesArray[ppPhotoIdx + 1] = 1; // parseInt(score, 10);
                }
		++ppVotesFound;
} catch (e) {
    GM_log("error: " + e);
        GM_log("challenger='" + challenger + "' - player='" + player + "'");
}
            });
        }
    });
    if (ppVotesFound == 0) {
        ppVote = new UCPVoteComment({
                        poster: poster,
			replyId: replyId,
			content: replytxt,
                        node: challengeEntry,
                        ucpThread: ucpThread
                    });
    } else {
	ppVote = new UCPPICPlayerVote({
		chlgname: challengeConfig.reName(),
		poster: poster,
		replyId: replyId,
		content: replytxt,
		voteText: ppVoteLines, 
		votesArray: ppVotesArray, 
		node: challengeEntry,
		ucpThread: ucpThread
	});
	if (exampleVote) {
		ppVote.isExampleVote = function() {
			return true;
		}; // override default behaviour
	} else {
		if (picX != undefined && picX < ppVotesFound) {
			ppVote.addError("voted for too many players");
		}
		if (picX != undefined && picX > ppVotesFound) {
			ppVote.addError("did not vote for " + picX + " players (" + ppVotesFound + ")");
		}
	}	
    }
    return ppVote;
}

// The challenger or competitor's photo in  one of the challenges.
var UCPCompetitor = new Class({
    Implements: [Options],
    options: {
        node: null,
	message: null, // reply.message._content
        photo: null,
	replyId: null,
        poster: null,
        owner: null,
	datecreated: null,
	dateupdated: null,
        photoId: null,
	photoTitle: null,
	photoNumber: null,
        comments: [],
	approved: false,
	approvedBy: null,
        ucpThread: null
    },
    initialize: function (options) {
        this.setOptions(options);
    },
    ucpThread: function () {
        return this.options.ucpThread;
    },
    toString: function () {
        return this.options.poster.username;
    },
    // accessors
    node: function () {
        return this.options.node;
    },
    message: function () {
	return this.options.message;
    },
    photo: function () {
        return this.options.photo;
    },
    replyId: function () {
	return this.options.replyId;
    },
    poster: function () {
        return this.options.poster;
    },
    owner: function () {
        return this.options.owner;
    },
    datecreated: function () {
	return this.options.datecreated;
    },
    dateupdated: function () {
	return this.options.dateupdated;
    },
    photoId: function () {
        return this.options.photoId;
    },
    photoTitle: function () {
    	return this.options.photoTitle;
    },
    photoNumber: function () {
    	return this.options.photoNumber;
    },
    approved: function () {
    	return this.options.approved;
    },
    approvedBy: function () {
    	return this.options.approvedBy;
    },
    hasError: function () {
        return this.options.comments.some( function (msg) {
            return msg.type == 'error';
        });
    },
    hasWarning: function () {
        return this.options.comments.some( function (msg) {
            return msg.type == 'warning';
        });
    },
    error: function () {
	var retval = '';
        this.options.comments.each(function (comment) {
            if (comment.type === 'error') {
                if (retval.length > 0) retval += " - ";
		retval += comment.msg;
            }
        });
        return retval;
    },
    warning: function () {
	var retval = '';
        this.options.comments.each(function (comment) {
            if (comment.type === 'warning') {
                if (retval.length > 0) retval += " - ";
		retval += comment.msg;
            }
        });
        return retval;
    },
    printStatus: function (ucpReplyDecoratorFactory) {
        if (!$chk(this.replyDecorator)) {
            this.replyDecorator = ucpReplyDecoratorFactory.createPhotoDecorator();
        }
        this.replyDecorator.decorateReply(this);
    },
    addError: function (error) {
        this.options.comments.include({ msg: error, type: 'error' });
    },
    addWarning: function (warning) {
        this.options.comments.include({ msg: warning, type: 'warning' });
    },
    addComment: function (comment) {
        this.options.comments.include({ msg: comment, type: 'comment' });
    },
    checkForValidPoster: function () {
	// only used in UCheckPlay
    }
});

var UCPVoteComment = new Class({
    Implements: [Options],
    options: {
        ucpThread: null,
        poster: null,
	replyId: null,
	content: null,
        comments: [],
        node: null
    },
    initialize: function (options) {
        this.setOptions(options);
    },
    toString: function () {
        return this.options.poster.username;
    },
    poster: function () {
        return this.options.poster;
    },
    replyId: function () {
	return this.options.replyId;
    },
    content: function () {
	return this.options.content;
    },
    node: function() {
        return this.options.node;
    },
    ucpThread: function () {
        return this.options.ucpThread;
    },
    printStatus: function (ucpReplyDecoratorFactory) {
        if (!$chk(this.replyDecorator)) {
            this.replyDecorator = ucpReplyDecoratorFactory.createCommentDecorator();
        }
        this.replyDecorator.decorateReply(this);
    }
});

function apiCreateCompetitor(data) {
	var photoNode = data.node;
	var message = data.message;
	var replyId = data.replyId;
	var poster = data.poster;
	var datecreated = data.created;
	var dateupdated = data.updated;
	var photoNumber = data.number;
	var ucpThread = data.ucpThread;

    var ownerId;
    var photoId = extractPhotoId(photoNode.get('src'));
    var photoTitle = $chk(photoNode.get('alt')) ? photoNode.get('alt') : photoNode.get('title');
    if (photoNode.getParent('a') && photoNode.getParent('a').get('href')) {
        ownerId = photoNode.getParent('a').get('href').split('/')[4];
        //GM_log("ownerId: " + ownerId);
        var owner;
        if (ownerId === poster.userid) {
            owner = poster;
        } else {
            owner = { username: "", userid: ownerId };
        }
        var textNode = photoNode;
	while ($chk(textNode.getParent('p'))) {
		textNode = textNode.getParent('p'); // alternative: pass the created 'p' node
	}
        var approvalImg = textNode.getElement('img[alt*="UCPAapproved"]');
        if (approvalImg && ucpThread.topic()) {
            var approvalCheck = apiCheckPhotoApproval(photoNode, textNode, ucpThread.topic());
            // returns
            // {
            //      approved: true/false,
            //      approver: string,
            //      version: number,
            //      checksum: true/false,
            //      photoChecksum: true/false,
            //      error: string
            //      photoId: string
            //  }
            var retval;
            var photoText;
            var comment;
            if (approvalCheck.approved) {
                comment = { msg: " approved by " + approvalCheck.approver, type: 'comment' };
                return new UCPCompetitor({
                    node: textNode,
		    message: message,
		    replyId: replyId,
                    photo: photoNode,
                    photoId: photoId,
		    photoTitle: photoTitle,
		    photoNumber: photoNumber,
                    comments: [ comment ],
                    poster: poster,
                    owner: owner,
		    datecreated: datecreated,
		    dateupdated: dateupdated,
		    approved: true,
		    approvedBy: approvalCheck.approver,
                    ucpThread: ucpThread
                });
            } else if (approvalCheck.ignored) {
                comment = { msg: "non competing image (by " + approvalCheck.approver + ")", type: 'comment' };
                return new UCPVoteComment({
                    node: textNode,
		    replyId: replyId,
		    content: photoNode.get('html'),
                    poster: poster,
                    comments: [ comment ],
                    ucpThread: ucpThread
                });
            } else {
                retval = new UCPCompetitor({
                    node: textNode,
		    message: message,
		    replyId: replyId,
                    photo: photoNode,
                    photoId: photoId,
		    photoTitle: photoTitle,
		    photoNumber: photoNumber,
                    poster: poster,
                    owner: owner,
		    datecreated: datecreated,
		    dateupdated: dateupdated,
		    approved: true,
		    approvedBy: approvalCheck.approver,
                    ucpThread: ucpThread
                });
		// if (adminOrMod) {
                	retval.addError(approvalCheck.error);

                	return retval;
		//}
            }
        } else {
            retval = new UCPCompetitor({
                node: textNode,
		message: message,
		replyId: replyId,
                photo: photoNode,
                photoId: photoId,
		photoTitle: photoTitle,
		photoNumber: photoNumber,
                poster: poster,
                owner: owner,
		datecreated: datecreated,
		dateupdated: dateupdated,
                ucpThread: ucpThread
            });
	    retval.addWarning("not formally approved");
	    return retval;
        }
    } else {
        comment = { msg: "photo has no link to photo page", type: 'error' };
        return new UCPCompetitor({
            node: textNode,
	    message: message,
	    replyId: replyId,
            photo: photoNode,
            photoId: photoId,
	    photoTitle: photoTitle,
	    photoNumber: photoNumber,
            poster: poster,
	    datecreated: datecreated,
	    dateupdated: dateupdated,
            comments: [ comment ],
            ucpThread: ucpThread
        });
    }
}

    function apiFindPhotos(entry, ucpThread, all, poster) {
        var photoArray = [];
        if (ucpThread.challengeDefinition().scoreType() === "MEETANDGREET" && !all) { // don't bother
            return photoArray;
        }

        // there are posters that don't add the 'a' anchor
        // needs a 'p//a': some scripts add <b> around image
        //var photos = node.getElement('p').getElements("(a img, img)(not[src*=buddyicons] and [src*=static.flickr.com] and [src$=jpg] and (not[height] or [height > 100]) and (not[width] or [width > 100]))");//, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var node = new Element('p', { html: entry.message._content });
        var photos = node.getElements("img").filter(ucpCheckPhoto, ucpThread.challengeDefinition());
        var potentialCompetitor;
        photos.each(function(photoNode) {
            if (potentialCompetitor !== undefined && !all) {
                return;
            }
	    var photoNumber = undefined;
	    if (groupPreferences.checkPhotoNumbering()) {
			node.get('text').split('\n').some( function (line) {
                            try {
                                photoNumber = line.trim().replace(/^(&nbsp;|&emsp;)+/, '').match(/^#?\s*(\d+)/)[1];
				return true;
                            } catch (e) {
                                // ignore: most lines won't match
                            }
			    return false;
			});
            }
            potentialCompetitor = apiCreateCompetitor({
		node: photoNode,
		message: entry.message._content,
		replyId: entry.id,
		poster: $chk(poster) ? poster : apiGetUsername(entry),
		created: entry.datecreate,
		updated: entry.lastedit,
		number: photoNumber, 
		ucpThread: ucpThread
	    });
            if (potentialCompetitor) {
                photoArray.push(potentialCompetitor);
            }
        });
        return photoArray;
    }

    function apiGetUsername(node) {
        return { username: node.authorname, userid: node.author, admin: node.role == 'admin' || node.role == 'moderator' };
    }

    function apiCollectVotes(ucpThread, discussionTopic, challengeEntries) {

        var groupConfig = ucpThread.groupConfig();
        var challengeConfig = ucpThread.challengeDefinition();
        var topic = ucpThread.topic();
        var voteArray = [];
        var commentArray = [];
        var photoArray = [];
   
        if (discussionTopic) {
            photoArray.combine(apiFindPhotos(discussionTopic, ucpThread, false));
        }
	if (challengeEntries && challengeEntries.length > 0) {
		challengeEntries.each(function (challengeEntry, i) {
		    if (i === 0 && groupConfig.skipFirstReply()) { 
			return;
		    }
		    //GM_log("["+i+"]: "+challengeEntry.innerHTML);
		    // admins have an image before there name, surrounded with an 'a' tag without 'href' attribute :> skip
		    var poster = apiGetUsername(challengeEntry);

		    var usercomment = challengeEntry.message ? challengeEntry.message._content ? challengeEntry.message._content : null : null;

		    if (!$chk(usercomment) || usercomment.length == 0) {
			GM_log("no usercomment in " + challengeConfig.reName());
			return;
		    }

		    var photosInNode = apiFindPhotos(challengeEntry, ucpThread, false, poster);
		    if (photosInNode.length > 0) {
			photoArray.combine(photosInNode);
		    } else {
			// This should be a vote or user comment
			if (i === 1 && groupConfig.skipFirstTwoRepliesForVotes()) {
			    return;
			}
			// only consider votes that are after the last photo (only approximate)
			// if the next comment has a photo, skip!
			if (voteArray.length === 0) {
			    var nextComment = challengeEntries[i + 1];
			    if (nextComment && apiFindPhotos(nextComment, ucpThread, false, poster).length > 0) { // poster will be ignored; may as well use the wrong one :-)
				commentArray.include(new UCPVoteComment({
				    node: challengeEntry,
				    poster: poster,
				    replyId: challengeEntry.id,
				    content: challengeEntry.message._content,
				    ucpThread: ucpThread
				}));
				return;
			    }
			}
			// first remove striked votes, image icons, banners
			var usercommentClone = new Element('p', { html: challengeEntry.message._content });
			// TODO: skip votes before last photo (see UCP script)
			var strikesAndStuff = usercommentClone.getElements("s, del, strike, img, a");
			strikesAndStuff.each(function (strike) {
			    strike.dispose();
			});
			var replytxt = usercommentClone.innerHTML;
		
			var exampleVote = false;
			if (replytxt.match(/sample vote|example|ejemplo/i) && !challengeConfig.scoreType().match("PIC-P-")) {
			    // in PIC-P-n commenting is encouraged, often leading to "nice example of", or similar
			    exampleVote = true;
			}

			switch (challengeConfig.scoreType()) {
			case "VERTICAL":
			    var vote = parseVerticalVote({
					   replytxt: replytxt, 
					   challengeEntry: usercommentClone,
					   ucpThread: ucpThread,
					   poster: poster, 
					   replyId: challengeEntry.id,
					   exampleVote: exampleVote
				 });
			    if (vote) {
				if (vote instanceof UCPVoteComment) {
				    commentArray.include(vote);
				} else {
				    voteArray.include(vote);
				}
			    }
			    break;
			
			case "VERTICAL-WEIGHTED":
			    var vote = parseVerticalWeightedVote({
					    replytxt: replytxt, 
					    challengeEntry: usercommentClone,
					    ucpThread: ucpThread,
					    poster: poster,
					    replyId: challengeEntry.id,
					    exampleVote: exampleVote
					});
			    if (vote) {
				if (vote instanceof UCPVoteComment) {
				    commentArray.include(vote);
				} else {
				    voteArray.include(vote);
				}
			    }
			    break;

			case "RATE-PHOTO":
			    var vote = parseRatePhotoVote({
					    replytxt: replytxt, 
					    challengeEntry: usercommentClone,
					    ucpThread: ucpThread,
					    poster: poster,
					    replyId: challengeEntry.id,
					    exampleVote: exampleVote
					});
			    if (vote) {
				if (vote instanceof UCPVoteComment) {
				    commentArray.include(vote);
				} else {
				    voteArray.include(vote);
				}
			    }
			    break;
		       
			case "HORIZONTAL":
			    var vote = parseHorizontalVote({
					    replytxt: replytxt, 
					    challengeEntry: usercommentClone,
					    ucpThread: ucpThread,
					    poster: poster,
					    replyId: challengeEntry.id,
					    exampleVote: exampleVote
					});
			    if (vote) {
				if (vote instanceof UCPVoteComment) {
				    commentArray.include(vote);
				} else {
				    voteArray.include(vote);
				}
			    }
			    break;

			case "MEETANDGREET":
			    commentArray.include(new UCPVoteComment({
				poster: poster, 
				node: usercommentClone,
				replyId: challengeEntry.id,
				content: challengeEntry.message._content,
				ucpThread: ucpThread
			    }));
			    break;

			default:
			//case "PIC-*":
			    if (/PIC-/.test(challengeConfig.scoreType())) {
				// PIC-V-n: pic n photos, score vertically
				// PIC-H-n: pic n photos, score horizontally
				// PIC-P-x: give a point to the player
				var picXmatch = /PIC-([HVP])-(\d+)/.exec(challengeConfig.scoreType());
				var picX = undefined;
				var picOrientation = undefined;
				if (picXmatch && picXmatch.length > 2) {
				    picX = parseInt(picXmatch[2], 10);
				}
				if (picXmatch && picXmatch.length > 1) {
				    picOrientation = picXmatch[1];
				}
				if (picOrientation === 'H') {
				    var createdPicHVote = parseHorizontalVote({
							    exampleVote: exampleVote,
							    ucpThread: ucpThread, 
							    poster: poster, 
							    replyId: challengeEntry.id,
							    challengeEntry: usercommentClone, 
							    replytxt: replytxt
							});
				    if (createdPicHVote instanceof UCPVoteComment) {
					commentArray.include(createdPicHVote);
				    } else {
					voteArray.include(createdPicHVote);
				    }
				} else if (picOrientation === 'V') {
				    // PIC-V
				    var createdPicVVote = parsePICVerticalVote({ 
							    exampleVote: exampleVote,
							    ucpThread: ucpThread, 
							    poster: poster, 
							    replyId: challengeEntry.id,
							    challengeEntry: usercommentClone, 
							    replytxt: replytxt,
							    picX: picX
							});
				    if (createdPicVVote instanceof UCPVoteComment) {
					commentArray.include(createdPicVVote);
				    } else {
					voteArray.include(createdPicVVote);
				    }
				} else if (picOrientation === 'P') {
				    var createdPicPVote = parsePICPlayerVote({
							    exampleVote: exampleVote,
							    ucpThread: ucpThread,
							    poster: poster,
							    replyId: challengeEntry.id,
							    challengeEntry: usercommentClone,
							    replytxt: replytxt,
							    photoArray: photoArray,
							    picX: picX
							});
				    if (createdPicPVote instanceof UCPVoteComment) {
					commentArray.include(createdPicPVote);
				    } else {
					voteArray.include(createdPicPVote);
				    }
				}
			    }
			}
		    }
		}); // each entry
	}

        ucpThread.votesArray = voteArray;
	ucpThread.commentsArray = commentArray;
	ucpThread.photosArray = photoArray;
    }

    function ucpProcessVotes(ucpThread) {
	var photos = ucpThread.photos();
	var votes = ucpThread.votes();
        var doubleVotesHash = new Hash();

        var cummulativeScore = new UCPVote({
            chlgname: null, 
            poster: "flickr", 
            voteText: "none", 
            votesArray: [], 
            commentAnchor: null,
            ucpThread: ucpThread
        });
        var previousVote = undefined;
        $each(votes, function (vote, j) {
            if (vote.isVoid()) {
                vote.addMessage("found a voided vote");
                vote.printStatus(ucpThread.options.replyDecoratorFactory);
                return;
            }
            var theFirstAndExampleVote = previousVote === undefined && vote.isExampleVote();
            if (theFirstAndExampleVote) {
                vote.addMessage("found an example vote");
                vote.printStatus(ucpThread.options.replyDecoratorFactory);
            } else {
		if (ucpThread.finished(cummulativeScore)) {
			vote.addError("voted after voting had finished");
			ucpThread.addVotingError("'" + vote.poster().username + "' voted after voting had finished");
		}
                vote.addMessage(
                        "<b>" + 

                            vote.poster().username


                        + 
                        (
                            vote.poster().admin ?
                            " (admin/mod)" : ""
                        ) +
                        "</b> voted");
                if (doubleVotesHash.has(vote.poster().userid)) { // this member already voted!
                    vote.addError("voted more than once");
                    //ucpThread.addVotingError("'" + vote.poster().username + "' voted more than once");
                } else {
                    doubleVotesHash.set(vote.poster().userid, vote.poster().username); // whatever
                }



                if (ucpThread.challengeDefinition().scoreType().match(/PIC-[PHV]-/) ||
                    ucpThread.challengeDefinition().scoreType().match(/RATE-PHOTO/)) {
                        
                    cummulativeScore.add(vote);
                } else { // HORIZONTAL, VERTICAL, VERTICAL-WEIGHTED
                    cummulativeScore = vote; // last vote contains the full score
                }
                if (ucpThread.finished(cummulativeScore)) {
                    ucpThread.updateStatus("finished");
                }
            }
            var currentValidVoting = vote.valid(previousVote, photos.length, j); // use the previousVote, even if it is an example
            if (!theFirstAndExampleVote) {
                var votedForString = vote.votedFor();
                if (votedForString) {
                    vote.addMessage("for photo" + (votedForString.match(/,/) ? "s " : " ") + votedForString);
                }
                if (!currentValidVoting && !ucpThread.challengeDefinition().scoreType().match(/PIC-P/)) {
                    ucpThread.addVotingError("'" + vote.poster().username + "' " + vote.error());
                    if (!ucpThread.validVoting()) { // already in error from previous vote
                        vote.messages().each(function (message) {
                            message.type = 'warning';
                        });
                    }
                }
                // any PIC type should not show the intermediate result
                if (!ucpThread.challengeDefinition().scoreType().match(/PIC-[HV]/) &&
                    !ucpThread.challengeDefinition().scoreType().match(/RATE-PHOTO/)) {
                    var votingResult = ucpThread.challengeDefinition().scoreType().match(/PIC-P/) ? 
                        cummulativeScore.showPicResult() : cummulativeScore.showVotes();
                    vote.addMessage(votingResult);
                }
                if (ucpThread.challengeDefinition().playerVoting() === "maynotvote") {
                    if (photos.some(function (photo) { return vote.poster().userid == photo.poster().userid; })) {
                        ucpThread.addVotingError(
                             "'" + vote.poster().username + "' voted in a challenge he/she plays in");
                        vote.addError("in a challenge he/she plays in");
                    }
                }
                vote.printStatus(ucpThread.options.replyDecoratorFactory);
            }
            if (ucpThread.challengeDefinition().scoreType().match(/PIC-P/)) {
                previousVote = cummulativeScore;
                previousVote.options.poster = vote.options.poster;
            } else {
                previousVote = vote;
            }
        });
        previousVote = undefined;

        //overwrite some base statusses if challenge is in voting.
        if (ucpThread.challengeName().match(groupConfig.states().closed)) { // should never happen
            ucpThread.updateStatus("closed");
        }
        if (ucpThread.finished(cummulativeScore)) {
            ucpThread.updateStatus("finished");
        }
        ucpThread.checkStatus();
        
        //if (ucpThread.challengeStatus() === "Finished"    || ucpThread.challengeStatus() === "Closed" ) {


            if (ucpThread.challengeDefinition().scoreType().match(/PIC-P/)) {
                ucpThread.setScoreSummary(cummulativeScore.showPicResult(true));
            } else {
                ucpThread.setScoreSummary(cummulativeScore.showVotes(true));
            }
        //}
        //let's go and change the update status on screen
	ucpThread.setCummulativeScore(cummulativeScore)

	// if at least one entry of at least three entries is numbered, check the numbering
	if (groupPreferences.checkPhotoNumbering() && photos.length >= 3) {
		if (photos.some(function (competitor) {
					return $chk(competitor.photoNumber());
				})) {
			photos.each(function (competitor, idx) {
			    try {
				if (!$chk(competitor.photoNumber())) {
					competitor.addWarning("did not number his/her entry");
					ucpThread.addPhotoError("did not number his/her entry");
				} else if (competitor.photoNumber() != (idx + 1) ) {
					competitor.addWarning("numbered incorrectly");
					ucpThread.addPhotoError("numbered incorrectly");
				}
			    } catch (e) {
			    	alert("error: " + e);
			    }
			});
		}
        }
    }

// end former common library

function updateClock(callback) {
	var lastchecked = GM_getValue(UCPprefix + ".clock.lastcheck");
	var interval = 2 * 60 * 60; // only refresh every 2 hours
	var now = parseInt(new Date().getTime() / 1000); // API returns time in seconds
	if ($chk(lastchecked) && (parseInt(lastchecked) + parseInt(interval) > now)) {
		callback({ success: true });
		return;
	}
	readFlickrClock(callback);
}

function readFlickrClock(callback) {
	// get the latest upload using the API
	// use the Flickr API to get its correct upload time
	new Request({
		onSuccess: function (responseText, responseXML) {
			var result = JSON.parse(responseText);
			if (result.stat != 'ok') {
				callback({ success: false, message: "ERROR reading photo info: " + result.message });
				return;
			}
			var lastupdate = result.photos.photo.sort(function(photoA, photoB) {
				return parseInt(photoB.dateupload) - parseInt(photoA.dateupload); // sort latest first
			})[0].dateupload;
			var stored = GM_getValue(UCPprefix + ".clock.lastupdate");
			if (!$chk(stored) || (parseInt(stored) !== parseInt(lastupdate))) {
				var now = parseInt(new Date().getTime() / 1000); // API returns time in seconds
				GM_setValue(UCPprefix + ".clock.lastupdate", lastupdate);
				GM_setValue(UCPprefix + ".clock.lastcheck", now);
			}
			callback({ success: true });
		},
		onFailure: function (response) {
			callback({ success: false, message: "ERROR reading recent photos: " + response.statusText });
		}
	}).get('/services/rest', {
		api_key: GM_getPublicKey(),
		auth_hash: GM_getAuthHash(),
		auth_token: GM_getAuthToken(),
		format: 'json',
		nojsoncallback: 1,
		method: 'flickr.photos.getRecent',
		extras: 'date_upload',
		per_page: 10,
		page: 1
	});
}

function calculateFlickrClock() {
        var flickrClockSeconds = GM_getValue(UCPprefix + ".clock.lastupdate");
        if ($chk(flickrClockSeconds)) {
                var oldFlickrClock = new Date(parseInt(flickrClockSeconds) * 1000);
                var flickrClockLastCheck = new Date(parseInt(GM_getValue(UCPprefix + ".clock.lastcheck")) * 1000);
		if (flickrClockLastCheck.toString().match(/invalid/i)) {
			GM_deleteValue(UCPprefix + ".clock.lastcheck");
			GM_deleteValue(UCPprefix + ".clock.lastupdate");
			return undefined;
		}
                var now = new Date();
                var timeElapsed = now - flickrClockLastCheck;
                var estimatedFlickrClock = new Date(oldFlickrClock.getTime() + timeElapsed);
                //GM_log("DEBUG: storedClock='" + oldFlickrClock + "' - lastCheck='" + flickrClockLastCheck + "' - elapsed='" + timeElapsed + "' - estimated='" + estimatedFlickrClock + "'");
                return estimatedFlickrClock;
        }
        return undefined;
}

// defaults
var username = GM_getLoggedInUser();
var user;
var userNsid;
var groupConfig;
var groupPreferences;
var ucpGroupConfigReader = new UCPGroupConfigReader(); 
var topicListingTable;
var challengeGroup = false;

function initialize() {
    try {
        groupConfig = ucpGroupConfigReader.createGroupConfig();
    } catch (e) {
        GM_log("non-challenge group; tweaking for regular group");
    }

    if ($chk(groupConfig)) {
        challengeGroup = true;
	if (groupConfig.usesTimeConstraints() || groupConfig.hasTimeConstrainedChallenges()) {
	try {
	    updateClock(function (retval) {
		if (!retval.success) {
			GM_log("failed to update flickr clock: " + retval.message);
		} else {
	    		GM_log("DEBUG: Flickr clock is '" + calculateFlickrClock() + "'");
		}
	    });
	} catch (e) {
	    GM_log("Exception: " + e);
	  }
	}
    } else {
    	groupConfig = {
        	groupname: function () {
			return /.*flickr.com\/groups\/([^\/]+)\/discuss/.exec(document.location.href)[1];
		},
		groupId: function () {
			return GM_getGroupId();
		},
		extractChallengeDefinition: function () {
		},
		storeBumpMessage: function (message) {
			GM_setValue('bumpMessage.' + this.groupname(), message);
		},
		bumpMessage: function () {
			return GM_getValue('bumpMessage.' + this.groupname(), "");
		}
	}
    }

    if (!$chk(username) || username === "") {
        GM_log("Sign in to your Flickr account if you want to take part in challenges in this group");
        return false;
    }

    if (challengeGroup) {
	ucpAddCPheader();

	groupPreferences = new UCPGroupPreferences({ groupConfig: groupConfig });
    }

    userNsid = GM_getGlobalNsid();

    try { 
        topicListingTable = document.getElement('ul.topic-list');
    } catch (e) {
    }

    return true;
}
        
    // if you copy any of this source, please use your own flick api_key
    // you can easily generate one on http://www.flickr.com/services/apps/create/
    var updatingIcon = 'http://www.flickr.com/images/pulser2.gif';
    var defaultCheckIconSmall = 'http://l.yimg.com/g/images/icon_check_small.png';
    var errorIcon = 'http://l.yimg.com/g/images/icon_error_x_small.png';

    var images = {
        down: 'data:image/png;base64,' +
            'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACD0lEQVQ4ja2TT0hUYRTFf9/33jzf' +
            'OM6kDqOjJBUYBkm1iQpcFLQJgsJWMbWLoha1ipbt22dR0sJNGLQMA0GCTNSysmyypBBRZxpzNGdM' +
            'nffed1sY9G9qY3d57jnnwrn3KhFhI6U3pP4fBip6bqA7MLlGrQVlBIyBQBBjECNIEEAQIN8x/HUc' +
            'EdpaN2fseHVLtLWypi26p5bBD1+x/AA8Hyn5mEAIJWLoiIN2HZTrYICYA8edIr19r57by81B6vXE' +
            'zPjeoKYOhLmCByUfs+qBCBW1CttysNwwViyMCUHI87l+r39uOm8f1bkziYWlLTuPDQyN+TuSDpGw' +
            'jbY1lq3RtkYDSgQlghghAnx+8MTkihUpuX84owHyF5KD+dls95Kv2V4fwrI1ohVKK1DrYQkQchQq' +
            'Pc385Gzn2t1Dvb9sYaUrdepl//CzsGvTFLdRWoNWP9IOWYSzi8z0jwzbia3ny65xber9lRfp6dmm' +
            'uEN8k4Wo9bZRmkipxKdHT+elqr69ePuAKWvg9Vzu+zL18eqbiWzQkqwg4moCUVRaUBgaZVXHThdu' +
            '7Z/5WfPHIa10nezMZOY7lkqK5gYH19Ho3CILmbk7hRv7en7nl73E5ZtHLo6OTT6uiznsrjZk0u9G' +
            'nOS2s+W4djkQQMUbTrwdL415+WyVjje2L17bFZTl/esbo5fSB8UzbrGj9eFfB230nb8B9+jhZWYd' +
            'CrIAAAAASUVORK5CYII=',
        up: 'data:image/png;base64,' +
            'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB/ElEQVQ4jaVTTWsTURQ972OmDZOZ' +
            'pEk6SVvbJqTYkhSFQqG4UKkVrHSjCPoDiqAbkYAKooi4cO3CjR8UseAvcCW4EMSiiwpBiKlUaRXb' +
            'OsbQjFNn3rznoqCIjQZy4e7OPfecw71EKYV2irY1/T8C42z5iHnuzcF/YUgzC+aF1wN5rbMccOat' +
            'EjFavzay0bKCeGmR0VA9GBkzzEMTps0ovd9MwY4EKhDXs/nYgURPDJNDBqaGozPxG0sXW7JgnlmY' +
            'TvXFHpPBNAwI9MKDyQQqNSpWN9Vk7VLuWVOC6OkXfVas45U1PpSpfxeQ3xr4sVZHymIoDhpYXMey' +
            'G2L8S2nA+ctCdPY51YmaS4zlMq6ugyi5vUFKOPUQK46Pgs1ylNE7O2fgB1fTe/unvEwcSoS/EVJB' +
            'SYkVR8DbEtidZMeStz6d/4Og49TTw9251BVV2IXAVyC/0gSUVCBSIRQS1TUfFpfImPRm4vbnCQCg' +
            '5PiTnnzWnNtzdJiGAAglUGS7JQApJEIhIYWE64VYrvmYzkb0Yrf20L630cVP7rMfzezv701mCe5W' +
            'XFQcCbkVQIY+FFMILB2UERCdAxpHOh7BiUIE9oKf//jOn+eRTl4uzS+9L452oVr9ioarQDgH0Rmo' +
            'zkE0DURjIIwBjOFDI8Tlly7ergfwONtsesqtVtvf+BMch8Tnh4oYeAAAAABJRU5ErkJggg==',
        viewmag: 'data:image/png;base64,' +
            'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACFElEQVQ4jZWT30tTcRjGn+85Lo7T' +
            '2XJ1PG79MH9gBI2xiIggatRVRasbQxndRGBRQpdGF0KIF7srm0iLCKI/wLqREKHIm4ygoqDmNsd+' +
            'lLa1zdX0cPZ0sQyjnWAPPLzw5eXDA8/7FSSxrsHBa3Ik+qm5VCypirLpW1dX78rk5Pga/iOxDrh4' +
            '6Yq2UshenpmZtaiaRkM3oLW1Ojq79zwI35uYMyWQhP9cn8131BciuURymWSY5BOSU979h+/3ne8/' +
            'QBK1LAkhpHQyfn0i/EgBkATwEAABFAGk5l+9cKyW9VsnT/mlWgEkAI0tW1y9PZ3aXgAzleobAOwA' +
            'sB1AqkxrOZNOOMwA2/Z5DtkA6ABaJKBZB6wAPgJIA+hwunbLsmxRzQBLAroKYKcB9GQAuwX4UQFO' +
            'AHgJQHW5tG5dX82ZAX5OP338NrOGVhnwSIC3Up2tAILPY2grZhcLkiR9MW0BgDYWDMW+GvxL0RVy' +
            'LDjOQGBgxKyFht+QjBDi2OyzqZDnoO+40qjKhlGiUcrMj46OJPoHBm5GFmJH2p3aWauifP8nwUbb' +
            'bDYFQEdTk3Wz2+2WSMJisUyfPuPnu/cfFkju2rhfM1Yt2+32uUDgAj9Hosu5fN5aN4AkNKfzzdWh' +
            'IebyhVQ8vqjUDQAgVFV9PTx8gyQjyWS6vaFmNSZileLdqqrzxVIpcffO7eyf31iPhBAyqjdk/AIE' +
            'L4Xptl+gaQAAAABJRU5ErkJggg==',
	edit: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADbklEQVRYhcWXS08TURTH/zMtBVuI' +
	    'IbKQR0oiwWjloQmpulEsogsTKsEAAQsu+hVwxwdgQ9y5wY/AhgQHqDxiAKMwpRBtKaA8pJC4ANqm' +
	    'LWnovS6wOJ3OnU6LhpNM7jzuPed3/vc5HKUUF2n8hUYHoFd6OTIy8t9kaWlp4TIC/Kn4z4ISQkAp' +
	    'xejoaNo3JkA8HgfHcaCUguNOoaWl0jsAoJSmXISQMwAl09+6fgOdjpc4jh0jGo2C44DGR41nDeQN' +
	    'k1DSe2kpBSKEgOd5RT9JYw5CaQMpDOteWiZBeJ4/K3U6XXYArCBqQPJ6coisALIJqAYhBckKgOVc' +
	    'KZCW7mBZTgpkq0ROAJmc5todmgHk2aoFTCQSODg4yAmCuRDJYVjzf2ZmBvv7+wjsBtD3uo9Z71wK' +
	    'yLOglCIUCuHN4CCam5thNpvR+6o3LWstCmjaDeVOw6EwFhZFPH7yFBvr6xAEASUlJapjgmXMLpA6' +
	    'kUoZDAbh8XhQaDLB51vF+LiAgYEBxUyl3XEugGTwWCwGt3sJl4xGbG/vYG3Nj/7+fhQXF2cMRAjJ' +
	    'DkAePBwOw73kQUF+AXZ/7mJtzQ+7vQUVFRXMzUmLaVqIIpEIRNENQ54BgcAefL5vaG19DovFknGF' +
	    'VPIntYxdEAqF4HYvQa/XYy8QwKp/FT09DpjNZtXpqVUJBQX+NggeBSEuulF/5zYOD4/g9XrR3d2V' +
	    'IrvaVq1lNqQBJCvGYjEsiCLu3r8Hv9cPj8eNjs52VFZWKgZUCiz/pmQpXXC6rJ4gHo9jbv4TrFYr' +
	    'RFHE9PQUOtrbUVVVlSa31M4xCCkIoTg5OUFenqE8Go3BarViZXkZkx9ceNHWhurq6ozO1LJVV4AC' +
	    'iUQCBoOhtK6+TrA1NWHZswKXawJOpxPl5eWKTuSZ5qzAaSNcq62rn7A1NdUsfFmAyzUGp9OJsrIy' +
	    'zVnlMg15juMRiUSuFhUVTttsjRav15cQhFHY7fa0zDNtzaxSdTMyFZpK8/Pzv5qMRvPYe4F7NzS0' +
	    '0tDQgNra2pwOJNlC6Le3Nls/z85deWB7iMmpqR/CmNDucHRvmEymlIryM7/az4rSM8v0vw4P3n6c' +
	    'n332fWvz8k4g0EUI2QGA4eHhcUopl+lAIYVgPQMAz/MghCjLUGQ0ouamJeWd9EdCp9MxnSoZ6zin' +
	    'dP0Gjp1i+u8w+ggAAAAASUVORK5CYII=',
	save: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAK' +
	    'T2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AU' +
	    'kSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXX' +
	    'Pues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgAB' +
	    'eNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAt' +
	    'AGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3' +
	    'AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dX' +
	    'Lh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+' +
	    '5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk' +
	    '5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd' +
	    '0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA' +
	    '4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzA' +
	    'BhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/ph' +
	    'CJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5' +
	    'h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+' +
	    'Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhM' +
	    'WE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQ' +
	    'AkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+Io' +
	    'UspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdp' +
	    'r+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZ' +
	    'D5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61Mb' +
	    'U2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY' +
	    '/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllir' +
	    'SKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79u' +
	    'p+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6Vh' +
	    'lWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1' +
	    'mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lO' +
	    'k06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7Ry' +
	    'FDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3I' +
	    'veRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+B' +
	    'Z7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/' +
	    '0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5p' +
	    'DoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5q' +
	    'PNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIs' +
	    'OpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5' +
	    'hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQ' +
	    'rAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9' +
	    'rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1d' +
	    'T1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aX' +
	    'Dm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7' +
	    'vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3S' +
	    'PVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKa' +
	    'RptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO' +
	    '32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21' +
	    'e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfV' +
	    'P1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i' +
	    '/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8' +
	    'IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACA' +
	    'gwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAISSURBVHjanJK7TlRRFIa/febMOXNzUKkE' +
	    'Ejt8ACtNaMTLIxjtTXgDOwufwNqCJzASTSQQE6NigEJCYmVIpBNIwHgiw5zLXmsvi5mRAGrB3+7s' +
	    'L/9luYmJqdtew/zs7K3o4YP7BeAsGH9T5JypBbe8/PbC2vrnfHNj7WrcL4rO2Nj4VLfbdffu3iFJ' +
	    'Uv6nX1nGwsIr2t3LAMQOC0mSqlkU+0oQBVEF3ImPZkaaJgQzzMCX5QBgBpWvCCqIGT6vEFWcOwsI' +
	    '5lAzNCgadAQwVBUJgb4P+Mqj8g8AjhAMVUO8HwDCEKAhUBRCkReoKtEpQDBD1HDOETQgXgYADIIo' +
	    'VVlh5mh3uvjh42kHjWaDo6NDKl/hRw4sKEmasrX1ladPHtNotIYlgvtTpGFAHMf0j3psb38jSdPj' +
	    'CHG9htcaHz+uU+R9osiR1tNhWQEIqASiWkTaaJKmKWlaGzkwxAshBJqtFjM3rzN9bRo1aDeb1Osx' +
	    'DqjHMRubX/jwaZ08zwnDY4sNEPEc9Q5ptZrMzT3ixcvXLC69Y/75sxM9lCK8X1nFe8FF5fGMIgJR' +
	    'RVVGAOzu7LG3s3umyOxnRlVWqHosxKMVQqyqMd4j8SBXr9ejyHtnAL4SxAuiitkwgpdqvyj6Wb+3' +
	    'f7HdafJmcYmZmRtMTl5hZWWV8fFLqCqdTpssy/hx8J2yyDkgGS41iCGcU25k5bz6PQCXUFUR3b1h' +
	    '6AAAAABJRU5ErkJggg==',
	sticky: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACPklEQVQ4jaWTy0tVURTGf2vvfW5S' +
	    'lnI1KzIhg7qRZpT0EiIhp9GwQeMgmjRp0rB/oEFB0KwggmgS0YMeOikLNEXBqwmaPTSs64Nzw9O9' +
	    '95y9Glw1ehBJi7XZ32Kt/a31sdiiqvyPuVv3u7KrXJABxKOU6bTs5QtZLDZGEJFyLILXZNQVYl+3' +
	    'f2+zABTiGO8VRIhLigp4wABiwIghsBAIWGt42T+40SUYnwu/ApAkHlRJ4hI2CFCvOGOI4xJiHcYa' +
	    'ioUizjkQKHnxTkVqJifeArBSCSpSxfVH3YkuWmfPsK4E3+7s9YZ/WIL6hO4XT8g+ugTAWM+VpQRy' +
	    '48HzpH59jfkbQX6qj+Mda8hNjfF6oplU1RYAcmGoRlHaWzO0t2YAfsOHMhtYF3XDt/fUpgOSQp4j' +
	    'exppb82gAs5a+8euMnqNgY+O1UHI0YNrIXwPPk2TPGPg5jOqa2pJ5StxItDVO7L8cAlXLgzR0rYb' +
	    'WFtOhPPg52nYKDSsDgmzfcxqB857vzxyV+/IMn4Ynmeg8ypNdZPYhubFPQJzWWYmE760nKXa78JY' +
	    'RKIoIoqinyRUrKsnSG/Fzn6GmeEf58MU05VtZA6fAlWcMRq/GnoX/CoBYGg8z47tdViAgXFoaSRJ' +
	    '1zE0mme6dwRRTdzsTO5eKinuQ9lcTGL1Hrz3KJBSNXaNs3efVjCTOubTTyY50YHZOd+jbz69i2aj' +
	    '0mP523e+dSZ1Ogrtjv65b5cvP9CJcyekYlulPbnJ2AODC8ULF+/o3HdAEz+jITZpfwAAAABJRU5E' +
	    'rkJggg==' /*
	    'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAD1UlEQVRIibWVS2xbRRSGv5l7bSdx' +
	    'nKRpnSdJGkhDIbEjISoRtagsaNVFBQskxAapQixYILYsWCBYsIJF2SMoD4HUimdJRaUmBEofFEKc' +
	    'SG0DNOkrb9txIju2e+/MsLi264iEllT9dRf/3Kv5zzn/OXdGGGO4n5D3VR2wP/1+8KOFxeR+11WO' +
	    'NgZjNFobjAGtNbpQodIGjPZ2CYkUIIRASoElJX6fjTEGBNiW7WtpCn/7woG9r9hLieTug0/1N+cd' +
	    'hdIaVymUq3G1RimN0hqlDForlPIELCmQUmJJSU/XA1ybibOjo5nphQStDVtZTC5x8udzewBs5Tj3' +
	    '1ITLUzNIKZlZTAIwu5DEtgVor1pbWILOljCWXSgRUXw2BSEEruMgCgI2gGVbjI+P30sha9DT82iJ' +
	    'r5mi3t5eensjAEQiESKRzfFy2OULITZrzMZYE6DcpjtxYzQXjr/G8opFY+SlDS1eY9HdlB+NRolG' +
	    'oyzd+JXH9vay64lWlhcnS+//M4AHzyYhRMmycl7M3l79HZ/IsaWhCbl8ft3soWiR+bcVY2NjG/K5' +
	    'K+fZ/YgFKw4EVtnZFeDsj8cJ1revH8AUIvT19QEQi8VKfOTCaba3biM+P8Ol0V9oDDp0+y9R7WuE' +
	    '/CqsptkW9JOZOcGNi83Ecz5C1hK+W3OBr98I1xYq2Phnzlz5At/8RbqDlXT3haGqGkQLGB+4CrQC' +
	    'I+loD9MRmISFeczYMM/rbNex2fyrNprSgRaLxUrCRa5CUSamRnk8ugWsSpAVICS4WXDTXgAscA3Y' +
	    'DlT7EYkVBidSubHpzNCaHqxnUQyo2f4gseF36HsoA9UGAgFQeXAdUMo7d1wFORfyFfyRq+Fq+77p' +
	    'w++OnrHL9DdEZ8/TTBk4893r9LdlELUBb/60Bm1AaVAadUvzW7KFtoNvETg9mSs02ZQOtvUsus3D' +
	    'pFoPoBIfYusABCwwwuufMmAgm9Gk256joS0KXPWmSNqWiCeXCDc04WqN0QZtTOGyobDWGCBUYWMr' +
	    'DVnXy94I0LeHJOBotobqSMXTSOHlbTuITz748sSTSmllChNlinsK3hm8G65nbiBCvW4hryCnURkH' +
	    'iUAE/SA1tqs5e+rzv+KX9fWaUNUpAHG3l/77L8uq/oqqH3a11u5ROcHIzeWbQ4nsN5UWwX3Ntc/s' +
	    'bKmpRzoMXUt89lM89+KbRz1h+07CRQhBQ530dU7MOqmT06ljf2edI5aPEWnwfTybPPrw0uqh/XXV' +
	    'z9a4codrCALp/xXA+E1mMJN+73rS/TMnGD48YNJlnwfePiTOHUnlvvK5MuR6nQHgH0wf5+oUM4WQ' +
	    'AAAAAElFTkSuQmCC' */
	    ,
	queued: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
	    '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wECgw2KIam8LsAAAK9SURBVDjL' +
	    'fZJZSFRxFMZ//ztz73XSbNCZQrMdpcDICluQJIiiosJ2iOohKoqQioiKKDIKiuhFK+qhjQZNpcVB' +
	    'bmn0UKEt1GhGCzGWmblMmdR1dMbR+fcgI2rW93Q43wLn4wBQlDmXCKSUfXOzu2RHs7tk11DcjfQ0' +
	    'AKwA6x4/pfGeMcMixHIhRI6UEiEEnbXew1KGAc5Hdt/Ly46HkLcSFy1+DaBEEhuKXIVKKHTs04W8' +
	    'IiEEAN3mbxk2TQCEEHw5l2vQ4T/y9abLFfH1BRgF+QXfSorRo2PWfDxzshCgx2/KcHtvwKcjhwxV' +
	    'ysVN7tuUFbhuMRj7otD22kRe9fbN0nevVO6HuEfpKV8q0lPqT0RbHa3FhbJmy0Z50MalA1FoEZ8Y' +
	    'HLRH5YRTJ80bYLXTwmwFLAHBs0QLxs8QnlNd7OuvF97dO3P1OOdKqVqk0DUC5s+Hc46d2doKPf2F' +
	    'GWC5sn/32egR8avCgU6CbhfB9rYH1uY31RmO0eOS0DWEquLzvl8x2AxQAT3fnlcuS5yUMibc0oh0' +
	    'JtCm2jJFjk62TZIlQSKhXVfuZ1e9uzEyeXJL/4C2z95Rp1OTV9hDci0gEChBeDCgA99Mu27GTvZp' +
	    'abNiy/IvDs966BEQxlg+XyzYvONXsMZjjmipdsZXNgf/KvHp1IQYZ9KUVotjpPbZU8nqt/UxL7KW' +
	    '1gBi4V1j2pW0Sb+TszbQ9bamy+d9FT+3qqF9wB/EZSwptyYkqR2vK8JGbf2mNvDLseM1OXa8Wgem' +
	    '8a52i7+sWKrjJqr2WYvcEZ81MtSVlwYm6BrX6xo2RSvkAwybl9lL5l5gmIVrl6s+yG2//FfrOwPd' +
	    'f52QreGwKiTEKrzJ6ejd/fC8/IpQcEyfMQbgqA1hSlK7wzTldfGjr7zDNobEbYf2+I5TfzIU9y/P' +
	    'AKwX2NcJ7P/T/AEtxhn4rk6s8QAAAABJRU5ErkJggg==',
	update: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANkE3LLaAgAAAmhJREFU' +
	    'eJyVkk1IVFEYhp9zz517xxnHf8RGG0H8GYYKCiEiCMWkItq2diUE5aZFf8sWEVQE4qZFyxZCbVpE' +
	    'RIug3JiKhKEzlalkpkwzNnPnXufeuaeFY/lDRc/yPd/78PFxBDsJxgZiD+OJeKfruptJJU0AUtdZ' +
	    'WPy8nLqdOgVktgr6LkGop7en/9LZiw15J7+Z+OUHM8To+GjT3fv36tn4swDXKzjfC6tYjrUjd/wK' +
	    'nFJ+A1Db870CYbPupbE9C0Q5VFDUKnCxdo/vEXietMmX0tjK/t1X4JYKuJoFAm+3QAJhAEzqPJkT' +
	    'edIUcbYvgIdJUeYEJrU4ZNjczxLmUQYPX+i4WaWHhJK+aItFa/fXxaTCQysbfAUoybfcipqbX8xo' +
	    'rizlsZl+lBzWNZP2cNRpTDQeJBww8SlisYqmgyZUWSDwPUFVZUh0H0jUpe3vfFifQZh+l27PMjb3' +
	    'Zsk1etcDLbUJQgETXYeAriM0HZTC9Ys4yiFTzLJirWHbaZanwJrklcRiNv+Rr2bLRl9VW84oGFnQ' +
	    'PAxhIIXEVx6Wn2XNm2fVXyKoFcm+U15qhOveJ0YkgPrBZGaGLzUdpf7W9hrDkNVEtBoispagFkKK' +
	    'AELTqDEM0tOOO37Lu7qR5M7mZcr4OaZXpvxUQ9w/3R0/YjbqnTTozVTLBkwtTHUwQGoy6b64lhty' +
	    'Ugxv9X4JAEo53i9MFJOReLrvWOJ4KCoPEZH1BIMur98+LTy5vDJUSPJgz2/ajRHl3OCz5rUZ/7FK' +
	    '+s/VlbFEPtLFwD+L2zGjnBx6uW/1xkSbVdXJ+f8qbxFs4kSolTN/m/kJ0mH+2AHDp/kAAAAASUVO' +
	    'RK5CYII=',
	lock: 'data:image/png;base64,' + // lock icon
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ' +
	    'bWFnZVJlYWR5ccllPAAAAGNJREFUeNpiYKAFYGFn9wfi+0D8H4pBbH9iNdsjaTwPxPuR+PbEGHAe' +
	    'qjgezUVgA4kxAKtCmEvQxZlwmPOB2PBiombI5yMFFiGcj80FAiTYJ0A1L4wagGrABxL0faBa+gEI' +
	    'MADz0iKXhglKDAAAAABJRU5ErkJggg==',
	random: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ' +
	    'bWFnZVJlYWR5ccllPAAAAJBJREFUeNpiYBiKQB+Zw0SGAQFAPB/GYYHS9VgUHgDig1B2PxAXoMkL' +
	    'AHEgjPMfB9aH2oZNbj6yCxzQTDeAOhVkSwIQf4CquQh1rQIQJxLyKz8Q34faFo8rEPGBeqjm/fhi' +
	    'AQbs0XA+kl/toS7RRzJ4ProBuAIxHs0wnIHYQCAaFXBEI1kAqxfITsoDDwACDAA+SzAr9DWWrQAA' +
	    'AABJRU5ErkJggg==',
	reload: 'data:image/png;base64,' + 
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
	    '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEGBMyHsAa238AAANdSURBVDjL' +
	    'bZNdaFtlGMf/56M5yUnSD7ulTT8SXJJuxbU2lipeFHGMKGWGiei8Gc4JcwyEgOxmF8NKBxNFEOZw' +
	    'VxOFWbeJTlhFkbrRidbaurXpR7amadJ8tcvycc5yknNOzvt6Zahj/6vngd8DDzzPj8FjsnNHw36X' +
	    'xxZwOERvtaop8cTD6fh69UdDpfFHWWZ7I5pZ1/B+17kjh99+pde9G6S0ha3EbWxt3sWdjVT221/S' +
	    'o8mY+sX2Ga5esEzLy0HvtU/OnN/nf9IPObmEYvwfsEoG3WYDg52CrdvFHJiNKbGyZNypb/BUvy3k' +
	    '3bUjQFFzhE6cGvS1e7A+P4l8dgnh1FqtWFFK3U1c67PtZlg5BpeWcrmPvtx8jlTJGgBwrx70XXrv' +
	    'tTeH+tpaOiyVPAqJv1HOreL6Srh87pvYOzf/KL4/tViazkD1+trNzn6nKE5F5fyDXO0mAHAOJxfo' +
	    'czT5eL0ArhyHzUihkZPQKIKLF7WtREK9olXIciSqjy/mlea93ZZnVBDz7ZXKV6Ag7OJyYSKdW4Ud' +
	    'ZdgaNJhYAo5l4GkVOIuZ6QTLMABAdUOKhCufX1mUshDQC8AGAGwyoV2eiaU2BK4ME6MBPBAuKTj1' +
	    'ffKn36bkEAilopntDYzsuXjh4tnfx8YmnD5/sLHJyg7UT+HptYx+dtJNx097tRNvOdbaXKaTYBkT' +
	    'AHR0Ci+Njr2R2UwtUE3OUTkbpfN/jtPnh1u/AwAeACoyndkw9eDrX2duzE5Lh6hBCgDQ0MA4jx0Z' +
	    'Hj+8L9icnb+BqHwfmlIEbyh4wd82MjtT6OMAQFeJcfzY0eP+gf7Oubm/UlLJmAUAhmEYpxMHRXXD' +
	    'yRaWwZYiMKvrsKkpiBaNv7UqxzgAqBlUsljzLx4NHupxd/EHpGpm7wNJkwgLnnBq1+4u+2CH3QIL' +
	    'qwCoQmFqMEBw697De/VXbu8wvf5hKHB5wOFCspBAJB2Drqnanp2NJrddAAcdAk9xdSVLJuakSYGH' +
	    'Gl6ofLzdBdY/ZD0fCva8628WwNIaqKEDHKkDk2kJn17dPBNfU0+DUPI/FwDQbLb2c7RYahGbak/b' +
	    'rZTneUBlCNZlDT/cLUgXruXOJmPqB6Agj7Xxv5hs7NAutzDyRDPvMQxqZO7rkXRKv16rkoVH2X8B' +
	    'DhSMbKu1q+IAAAAASUVORK5CYII=',
	mark: 'data:image/png;base64,' + // black cross
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0' +
	    'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGkSURBVHjalJM9SEJRFMd9+tQSIj+hIXBx' +
	    'qKGmoqkagogQohwCIWhKgqA5iMYWg2iIILAhgjD62htbaojIPV4OEkUtJggqz34nrmXqM7rw49x3' +
	    '7vmfd95552rVatVWW+FwuAvTAW/ZbPbnoM3SJAHCEHuvpmlRrIkvhS1YaIJ2u13irgzDyOnKOQgn' +
	    'CP3YCrZEsj2LBIumaa5zvsz+2K6cUoFfqvF4PLrL5dpmP9cg9MEpJKGb85g4awnOYQgSlUrlPRAI' +
	    'uB0OR4qgEXUucTsQU885OKtPUII7ytovFovRfD6f8fl8XnxH0KPECyr2Gqal/PoE34s33xQKhSlI' +
	    '67oeUYIVaS5swARkavF6qy7R5WcqiWNdPM4q8RKkmmKt/i/iAcy4EktcpFWcbqEPqe+XCmbUs7z9' +
	    'Fi7/StAJaQjAGNwrv0zoLjyA0fQJ/IEvWIfQC6N1YlkyWBew1dQDETI8Nrq+qeZhEh5bVLcGwzDf' +
	    'VAHjGWeI+pX4yaI3HwzXgdPpXP3VA5x95XJZtgl4bXv7NC1JrLvxNgZlhuDF9o/Flbd9CjAA9aSJ' +
	    'Cs6w1hQAAAAASUVORK5CYII=',
	info: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACi0lEQVR42l1TTYhSURSeq0/fjAyM' +
	    'otL4k1AwuowBoUIZG4bG2ZSLdtKqgmnTahaCYFGuCmcX2CxqY7gIooWbHIhy0JqBKFoEapGmhiJP' +
	    'ZMD/374zvFdvvPBx7zs/3/nOue+yudPLAGwBHuACYAH+AN+AFPAWEOQJTHb2KBSK29Pp9ArOA2AM' +
	    'TAAFoATUjLEPk8nkuUj2nwAODxDAcQV7jxLVanXJYrHs12o1T7fbXSEikM9j/4H9MZASc5mB47hd' +
	    'GC7j3BUrK71e771EIvElEomcCQaDb2AbkR1xC4j7NBqNdnAWmEqlugnHQxhbAAXNwQEB6ietVivG' +
	    '8/w6vp+KysjHAYs4PhgOhy+ZRqN5hr7W0H+f/GKQajweL8IuINEIhUQ+kNqGnUf8QafTuUsEB3Au' +
	    'AWNpMCBQQlnZaDQmG43GRr/fPzfrB45BsEYEOVToIGAqBaAC5/P57sRise+BQMAWjUZfoeJQRsAw' +
	    'Aw0IHEyn09E0lyT5tCB/3mw2b2Wz2d9Op1OXz+c/KpXK3sz1HzebTQ8zmUx7g8HgEhRMJC/YF7Ra' +
	    '7WaxWCw5HA4trvIQLXVlChQY8mG1Wt1mdrv9FvrcQYV/EjFdIrhaKBROCOr1+pGcAApVer1+F8pe' +
	    'ML/fb81kMo8wKKekggiwrpfL5ZzNZltut9spVOxK1XG1n10u1/14PF5hZHC73ZuVSmUbiedpmNh5' +
	    'EP5Ea3EkXkPCKhT0aXjYf1mt1r10Or1PBZnIym9glUqlG/htL1IgkUAqh9ZGlEzEUHUERa/fYeG7' +
	    'f+oxEUk4HD6bTCbXBUFYBZEDw1zGFdeQmDMYDF/xe78PhUJlKXn2NZ70h40eDA+oAE58AzRgSurJ' +
	    'b4vWXxbUXSASOlGMAAAAAElFTkSuQmCC',
	bump: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0' +
	    'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMbSURBVHjadFNbSBRRGP5mXdsd75q6XtAt' +
	    'tUiK0tKCohIMSrAU0S5UdHmIXutFqYegjKKolyCKqKCkDMlICilN6CKB6IqatgRmlm66lxn3Mpfd' +
	    'nZnTmRH3QejAxzlz/u///u//Z4YhhGD56t9+aYO1IOV8NCBuiywIJpkXh0Ke4O0G32PHci6zXGCw' +
	    '9uaZ1IrCq0RQMsXvblARqGoUwrzf7+f9Vxp8j279V8BRe+NR6tbVp8xsEtJ2roW1IIMyGIRneMw9' +
	    'H4Dr1QC8QU9Ho+/JwViSLqBjsKq1eezkPeJ69pUogkz05Xs3QbxvxoyzKobJfOcQ+VjaQtpXHru2' +
	    'lGc4GGm6vUoLqc78s9WW7APlRlXP+3F4u78BJgYZu9bAVlduFPT2jmP49H1lIcRVNHFtI2b9Ugsr' +
	    'F9l1hZasfRuN5LnuUfy80xNzyU38hqKqyG+owMrdpSg8usssPOxupaH9hoAaF1dvaygDUQh+vfyC' +
	    '8cudILQyUbXFQZlM4FraIPr8KDq8A7lNWzDbN1ylx0wGISclLcmeCb/zD4JTc9RuGeSIhADHGRDF' +
	    'IGy0NeEvB/7bNFhbCpI2FbB67mILVoYw0JBebEP6+TpqV8PPXgdEr08fMxKsVpRdaMSKBAsQjkAN' +
	    'itAsRu1FB4LHP6OGJCASNQhECoN3z0EmMhSzRncJSlCgsbDBUUUJIhfgYgLz36ea3ePTiwQ5DEIJ' +
	    'UUGG2WyGtTAZFnsivZNpLGLEuR8ueJzT12MtuCZ/dw639/3KWW9fZWY1xGka7Hs3IyJJiM9MAJuW' +
	    'jHi9FHWmUhHH8163a3L6bszBuYUudeLDQN3Qi76IQkmaFEXIzSPgpgMMBCGFBGg0UY+NdPWro2/7' +
	    '62mObDgozrUZLwIsnJ47odqAj2+vPFSdkVdZAn7GbXwXiWwipICA4defA90PO050sk7Hg1wbo0+Y' +
	    'KcrJ1g9WijyKklRiKT9SWXO8umZPic2eF69re/7MK596+qaefulq40zyIOVNUsxSiLrA0iwSKdIp' +
	    'sqhiFmGI/iclgRj+RLrTqRMPfaC2wFOEKJR/AgwAlWOjeZLZz98AAAAASUVORK5CYII='
    };

    function applyPreferences() {
        var groupname = groupConfig.groupname();
        var somethingChanged = false;

        somethingChanged = groupPreferences.setHideNonWonMedals($('showallmedals_ng').checked) || somethingChanged;
        somethingChanged = groupPreferences.setStopAtFirstFoundMedal($('stopatfirstmedal_ng').checked) || somethingChanged;
        somethingChanged = groupPreferences.setSmartPhotoBoxes($('smartphotoboxes_ng').checked) || somethingChanged;
        somethingChanged = groupPreferences.setBumpAndReload($('bumpandreload_ng').checked) || somethingChanged;
        somethingChanged = groupPreferences.setBumpAndReturnToFirstPage($('bumpandreturn_ng').checked) || somethingChanged;
        somethingChanged = groupPreferences.setDefaultAwardsGroup($('defaultawardsgroup_ng').value) || somethingChanged;
        somethingChanged = groupPreferences.setDefaultAwardsGroupInPendingItems(
                                            $('defaultawardsgroupinpendingitems_ng').value) || somethingChanged;

	somethingChanged = groupPreferences.setWorkflowAutoClaimOwnership($('workflowautoclose_ng').checked) || somethingChanged;

        if (somethingChanged) { 
            window.location.reload();
        } else {
            togglePreferencesDialog();
        }        
    };

    function togglePreferencesDialog() {
        var configDialog = $("UCPANGConfigDialogDiv");
        if (configDialog) {
            configDialog.destroy();
        } else {
            
            var table = new Element('table', {
                border: '0',
                cellPadding: '5'
            }).adopt(
		new Element('tr').adopt(
			new Element('td', { html: "&nbsp;" }),
			new Element('td', {
				noWrap: 'nowrap',
				valign: 'top'
			}).adopt( new Element('span', {
					styles: {
						fontWeight: 'bold'
					},
					html: "UNIFIED CheckPlay Admin Preferences for this group"
				})
			),
			new Element('td', { align: 'right' }).adopt(
			    new Element('a', {
				target: '_blank',
				html: 'help',
				href: 'http://www.flickr.com/groups/1307178@N20/discuss/72157623759768824/#comment72157623761169572',
				styles: {
				    fontWeight: 'normal',
				    cursor: 'help'
				}
			    })
			)
		    ),
                    // smart photo boxes
                    new Element('tr').adopt(
                        new Element('th', {
                            colSpan: '3',
                            noWrap: 'nowrap',
                            valign: 'top',
                            html: "Photo Information Boxes:",
                            styles: {
                                background: '#CFCFCF'
                            }
                        })
                    ),
                    new Element('tr').adopt(
                        new Element('td', {
                            noWrap: 'nowrap',
                            vAlign: 'top'
                        }).adopt(
                            new Element('input', {
                                type: 'checkbox',
                                id: 'smartphotoboxes_ng',
                                checked: groupPreferences.smartPhotoBoxes()
                            }),
                            new Element('label', {
                                'for': "smartphotoboxes_ng",
                                html: "'smart' photo information boxes"
                            })
                        ),
                        new Element('td', {
                            styles: {
                                fontStyle: 'italic',
                            },
                            html: "When selected, photos that have not been approved yet, will have their photo " +
                                  "information box shown automatically"
                        })
                    ),
                    new Element('tr').adopt(
                        new Element('th', {
                            colSpan: '3',
                            noWrap: 'nowrap',
                            valign: 'top',
                            html: "Awarded medals:",
                            styles: {
                                background: '#CFCFCF'
                            }
                        })),
                    // non-won medals
                    new Element('tr').adopt(
                        new Element('td', {
                            noWrap: 'nowrap',
                            vAlign: 'top'
                        }).adopt(new Element('input', {
                                        type: 'checkbox',
                                        id: 'showallmedals_ng',
                                        checked: groupPreferences.hideNonWonMedals(),
                                    }),
                                  new Element('label', {
                                        'for': 'showallmedals_ng',
                                        html: 'only show won medals'
                                    })
                        ),
                        new Element('td', {
                            styles: {
                                fontStyle: 'italic'
                            },
                            html: "By default, all the medals for the chosen group are shown when " +
                                  "checking for 'awards in group', even if the photo did not win the " +
                                  "medal (they are clearly marked to see the difference).<br/>" +
                                  "This way, admins/mods can see which medals are known by the script.<br/>" +
                                  "(if there are any missing, please let us know)"
                        })
                    ),
                    new Element('tr').adopt(
                        new Element('td', {
                            noWrap: 'nowrap',
                            vAlign: 'top'
                        }).adopt(new Element('input', {
                                        type: 'checkbox',
                                        id: 'stopatfirstmedal_ng',
                                        checked: groupPreferences.stopAtFirstFoundMedal(),
                                    }),
                                 new Element('label', {
                                        'for': 'stopatfirstmedal_ng',
                                        html: 'stop at first medal'
                                    })
                        ),
                        new Element('td', {
                            styles: {
                                fontStyle: 'italic'
                            },
                            html: "When searching for medals, stop at the first found medal. " +
                                  "This is especially useful when searching in all groups."
                        })
                    ),
                    // default group for awards
                    new Element('tr').adopt(
                        new Element('td', {
                            noWrap: 'nowrap',
                            vAlign: 'top'
                        }).adopt(awardsCombo = new Element('select', {
                                        title: 'Choose default awards group',
                                        id: 'defaultawardsgroup_ng'
                                    })
                        ),
                        new Element('td', {
                            styles: {
                                fontStyle: 'italic'
                            },
                            html: "By default, the current group is used as the group to test for awards in challenge threads. " +
                                  "<br/>Choose another group as the default."
                        })
                    ),
                    // default group for awards in Pending Items
                    new Element('tr').adopt(
                        new Element('td', {
                            noWrap: 'nowrap',
                            vAlign: 'top'
                        }).adopt(awardsComboInPendingItems = new Element('select', {
                                        title: 'Choose default awards group for Pending Items page',
                                        id: 'defaultawardsgroupinpendingitems_ng'
                                    })
                        ),
                        new Element('td', {
                            styles: {
                                fontStyle: 'italic'
                            },
                            html: "By default, the current group is used as the group to test for awards on the Pending Items page. " +
                                  "<br/>Choose another group as the default."
                        })
                    ),
                    
                    // bump & reload
                    new Element('tr').adopt(
                        new Element('th', {
                            colSpan: '3',
                            noWrap: 'nowrap',
                            valign: 'top',
                            html: "Bump:",
                            styles: {
                                background: '#CFCFCF'
                            }
                        })
                    ),
                    new Element('tr').adopt(
                        new Element('td', {
                            noWrap: 'nowrap',
                            vAlign: 'top'
                        }).adopt(
                            new Element('input', {
                                type: 'checkbox',
                                id: 'bumpandreload_ng',
                                checked: groupPreferences.bumpAndReload(),
                                events: {
                                    change: function(e) {
                                        $('bumpandreturn_ng').set('disabled', !this.checked);
                                        $('bumpandreturnlabel').setStyle('color', this.checked ? 'black' : 'grey');
                                    }
                                }
                            }),
                            new Element('label', {
                                'for': "bumpandreload_ng",
                                html: "reload after bumping"
                            })
                        ),
                        new Element('td', {
                            styles: {
                                fontStyle: 'italic',
                            },
                            html: "Automatically reload the discussion page after successful bumping."
                        })
                    ),
                    new Element('tr').adopt(
                        new Element('td', {
                            noWrap: 'nowrap',
                            vAlign: 'top'
                        }).adopt(
                            new Element('span', {
                                html: '&nbsp;&nbsp;&nbsp;&nbsp;'
                            }),
                            new Element('input', {
                                type: 'checkbox',
                                id: 'bumpandreturn_ng',
                                disabled: !groupPreferences.bumpAndReload(),
                                checked: groupPreferences.bumpAndReturnToFirstPage()
                            }),
                            new Element('label', {
                                'for': "bumpandreturn_ng",
                                id: 'bumpandreturnlabel',
                                html: "return to first page after bumping",
                                styles: {
                                    'color': groupPreferences.bumpAndReload() ? '' : 'grey'
                                }
                            })
                        ),
                        new Element('td', {
                            styles: {
                                fontStyle: 'italic',
                            },
                            html: "Automatically return to the first discussion page after successful bumping."
                        })
                    ),
                    // workflow
                    new Element('tr').adopt(
                        new Element('th', {
                            colSpan: '3',
                            noWrap: 'nowrap',
                            valign: 'top',
                            html: "Workflow:",
			    'class': groupConfig.workflow() ? '' : 'hidden_from_view',
                            styles: {
                                background: '#CFCFCF'
                            }
                        })
                    ),
                    new Element('tr', {
			'class': groupConfig.workflow() ? '' : 'hidden_from_view'
		    }).adopt(
                        new Element('td', {
                            noWrap: 'nowrap',
                            vAlign: 'top'
                        }).adopt(
                            new Element('input', {
                                type: 'checkbox',
                                id: 'workflowautoclose_ng',
                                checked: groupPreferences.workflowAutoClaimOwnership()
                            }),
                            new Element('label', {
                                'for': "workflowautoclose_ng",
				html: 'auto-close in workflow'
                            })
                        ),
                        new Element('td', {
                            styles: {
                                fontStyle: 'italic',
                            },
                            html: "Automatically click the CLOSE button in the <i>Claim ownership..</i> step"
                        })
                    ),
                    // apply/cancel
                    new Element('tr').adopt(
                        new Element('td', {
                            colSpan: '3',
                            align: 'right'
                        }).adopt(
                            new Element('button', {
                                type: 'submit',
                                html: 'OK',
                                'class': 'Butt',
                                events: {
                                    click: applyPreferences
                                }
                            }),
                            document.createTextNode(' '),
                            new Element('button', {
                                type: 'submit',
                                html: 'Cancel',
                                'class': 'DeleteButt',
                                events: {
                                    click: togglePreferencesDialog
                                }
                            })
                        )
                    )
                );
            awardsCombo.adopt(
                new Element('option', {
                    html: '-- Any --',
                    value: "Any"
                })
            );
            var awardsGroupPreference = groupPreferences.defaultAwardsGroup();
            $each(ucpGroupConfigReader.groupList(), function (group) {
                if (!$chk(group.hideFromAwardsList) || group.hideFromAwardsList !== true) {
                    awardsCombo.adopt(new Element('option', {
                        html: group.name,
                        value: group.groupname,
                        selected: (group.groupname === awardsGroupPreference ? "selected" : "")
                    }));
                }
            });
            awardsComboInPendingItems.adopt(
                new Element('option', {
                    html: '-- Any --',
                    value: "Any"
                })
            );
            awardsGroupPreference = groupPreferences.defaultAwardsGroupInPendingItems();
            $each(ucpGroupConfigReader.groupList(), function (group) {
                if (!$chk(group.hideFromAwardsList) || group.hideFromAwardsList !== true) {
                    awardsComboInPendingItems.adopt(new Element('option', {
                        html: group.name,
                        value: group.groupname,
                        selected: (group.groupname === awardsGroupPreference ? "selected" : "")
                    }));
                }
            });
            // group definitions
            new Element('tr').inject(table).adopt(
                new Element('th', {
                    colSpan: '3',
                    noWrap: 'nowrap',
                    vAling: 'top',
                    html: "Definitions:",
                    styles: {
                        background: '#CFCFCF'
                    }
                }));
            new Element('tr').inject(table).adopt(
                new Element('td', { noWrap: 'nowrap' }).adopt(
                    new Element('img', {
                        src: images.update,
                        id: 'ucpa_groupReload',
			title: 'click to update the group\'s challenge definitions',
			styles: {
				height: '12px',
				cursor: 'pointer'
			},
			events: {
				click: function (evt) {
				    this.set('src', updatingIcon);
                                    ucpGroupConfigReader.checkForUpdates(groupConfig.groupname(), true, function (result) {
                                        $('ucpa_groupReload').set('src', result.stat == 'ok' ? defaultCheckIconSmall : errorIcon);
                                        $('ucpa_groupReload').set('title', result.stat == 'ok' ? 'updated' : result.error);
					$('ucpa_groupReloadLabel').set('title', result.stat == 'ok' ? 'updated' : result.error);
                                    });
				}
			}
                    }),
                    new Element('label', {
                        html: '&nbsp;update&nbsp;challenge&nbsp;definitions',
			title: 'click to update the group\'s challenge definitions',
			id: 'ucpa_groupReloadLabel',
			styles: {
				cursor: 'pointer'
			},
			events: {
				click: function (evt) {
					$('ucpa_groupReload').fireEvent('click');
				}
			}
                    })
                ),
                new Element('td', {
                    styles: {
                        fontStyle: 'italic'
                    },
                    html: "The definitions for the group are every 12 hours. With this button, you can update them now."
                })
            );
            new Element('tr').inject(table).adopt(
                new Element('td', { noWrap: 'nowrap' }).adopt(
                    new Element('img', {
                        src: images.update,
                        id: 'medalsReload',
			title: 'click to update the script\'s medal definitions',
			styles: {
				height: '12px',
				cursor: 'pointer'
			},
			events: {
				click: function (evt) {
					this.set('src', updatingIcon);
					new UCPMedalListReader().checkForUpdates(true, function(result) {
                                        	$('medalsReload').set('src', result.success ? defaultCheckIconSmall : errorIcon);
                                        	$('medalsReload').set('title', result.success ? 'updated' : result.message);
                                    	});
				}
			}
                    }),
                    new Element('label', {
                        html: '&nbsp;update&nbsp;medal&nbsp;definitions',
			styles: {
				cursor: 'pointer'
			},
			events: {
				click: function (evt) {
					$('medalsReload').fireEvent('click');
				}
			}
                    })
                ),
                new Element('td', {
                    styles: {
                        fontStyle: 'italic'
                    },
                    html: "The medal definitions are updated once a week. With this option, you " +
                          "can update them now."
                })
            );
            $('UCheckPlayNGAdminPreferences').getParent().adopt(
                new Element('div', {
                    id: 'UCPANGConfigDialogDiv',
		    'class': 'ucpDialogStyle'
                }).adopt(table));
        }
    }

    function stripChallengeAnnouncement(challengeAnnouncement) { // used for regular replies too (in Approve)
        // strip everything from the challenge header
        challengeAnnouncement.getElements('h4').dispose();
	challengeAnnouncement.getElements('div[id*=FPAOTP_bar]').dispose();
	challengeAnnouncement.getElements('span.FPAOTP_unfaved').each(function (span) { if ($chk(span.getParent('div'))) span.getParent('div').dispose(); });
	challengeAnnouncement.getElements('div.ucpdiv').dispose();
        // keep everything uptil the first 'small' element
	var smallFound = false;
	challengeAnnouncement.getElements('*').forEach(function (el) {
		if (el.get('tag') == 'small') {
			smallFound = true;
		}
		if (smallFound) el.dispose();
	});
	var children = challengeAnnouncement.getChildren();
	if (children[children.length - 1].nodeName == 'BR') {
		challengeAnnouncement.getChildren('br').getLast().dispose();
	}
	var retval = challengeAnnouncement.getChildren().length == 1 ? // no blockquote, no div, ..
			challengeAnnouncement.getChildren()[0].get('html') :
			challengeAnnouncement.get('html');
	// remove horizontal tabs
	retval = retval.replace(/\t/g, '');
	// remove leading and trailing whitespace
	retval = retval.replace(/^(?:<br[^>]*>|\s|\n|\t)+/, ''); // doing both replacements in one statement makes the script hang
	retval = retval.replace(/(?:<br>|\s|\n)+$/, ''); // not \t ! => unresponsive script
	// remove line breaks
	// 'p' elements are not allowed
	retval = retval.replace(/<p[^>]*>/g, '');
	return retval;
    }

    function updateChallengeHeader(title, message, buttonCell, editLink, callback) {
        // strip the starting 'p' tag
        message = message.replace(/^\s*<p[^>]*>/,'');
        new Request({
            method: "post",
            url: editLink,
            headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Referer": editLink
            },
            data: "magic_cookie=" + GM_getAuthHash() + 
                                "&done=1" +
                                "&subject=" + encodeURIComponent(title) +
                                "&message=" + encodeURIComponent(message),
            onFailure: function (response) {
		buttonCell.empty();
		new Element('img', {
			src: errorIcon,
			title: response.statusText
		}).inject(buttonCell);
		buttonCell.set('title', response.statusText);
                GM_log("error updating challenge header: " + response.statusText);
		callback({ success: false, message: response.statusText } );
            },
            onSuccess: function (responseText, responseXML) {
                var tempDiv = new Element('div');
                tempDiv.innerHTML = responseText.stripScripts();
                var problem = tempDiv.getElement('p.Problem');
                if ($chk(problem)) {
                    callback({ success: false, message: problem.innerHTML });
		} else {
			callback({ success: true });
		}
            }
        }).send();
    }

    function updateChallengeTitle(title, callback) {
        var buttonCell = $('UCPANG-promote-wizard-save-button');
        buttonCell.empty();
        buttonCell.adopt(spin = new Element('img', {
            src: updatingIcon
        }));
        // but first, get the edit link
	var challengeAnnouncement = $('DiscussTopic').getElement('td.Said');
        var editLink = challengeAnnouncement.getElement('small a[href*=edit]');
        if (!$chk(editLink)) {
	    callback({
	    	success: false,
		message: 'error fetching edit link; aborting'
	    });
	    return;
        }
	var challengeAnnouncementHtml = stripChallengeAnnouncement(challengeAnnouncement);
	updateChallengeHeader(title, challengeAnnouncementHtml, buttonCell, editLink.href, callback);
    }

    function closeChallengeThread(callback) {
    	var lockHRefs = $$('a[href*=/lock/]');
	if (!$chk(lockHRefs) || lockHRefs.length == 0) {
		callback({ success: false, message: 'unable to close thread: no \'lock\' link found' });
	} else {
		var lockHRef = lockHRefs[0].href;
		new Request({
			url: lockHRef,
			onSuccess: function (responseText, responseXML) {
                            var tempDiv = new Element('div');
                            tempDiv.innerHTML = responseText.stripScripts();
                            var problem = tempDiv.getElement('p.Problem');
                            if ($chk(problem)) {
                                callback({ success: false, message: problem.innerHTML });
                            } else {
			    	var form = tempDiv.getElement('form[action*=lock]');
				new Request({
					url: form.action,
					method: form.method,
					data: {
						magic_cookie: form.getElement('input[name=magic_cookie]').value,
						done: 1,
						lock: 1
					},
					onSuccess: function (responseText, responseXML) {
		                            var tempDiv = new Element('div');
                		            tempDiv.innerHTML = responseText.stripScripts();
		                            var problem = tempDiv.getElement('p.Problem');
                		            if ($chk(problem)) {
                                		callback({ success: false, message: problem.innerHTML });
		                            } else {
						callback({ success: true });
					    }
					},
					onFailure: function (response) {
			    			callback({ success: false, message: response.statusText });
					}
				}).send();
			    }
			},
			onFailure: function (response) {
				callback({ success: false, message: response.statusText });
			}
		}).post();
	}
    }

    function unstickyChallengeThread(callback) {
    	// var lockHRefs = $$('a[href*=/unstick/]'); has been removed when removing the 'small' elements
	var normalizedHref = /(.*flickr.com\/groups\/[^\/]+\/discuss\/\d+)/.exec(document.location.href)[1];
	var lockHRef = normalizedHref + '/unstick/';
		new Request({
			url: lockHRef,
			onSuccess: function (responseText, responseXML) {
                            var tempDiv = new Element('div');
                            tempDiv.innerHTML = responseText.stripScripts();
                            var problem = tempDiv.getElement('p.Problem');
                            if ($chk(problem)) {
                                callback({ success: false, message: problem.innerHTML });
                            } else {
			    	callback({ success: true });
			    }
			},
			onFailure: function (response) {
				callback({ success: false, message: response.statusText });
			}
		}).post();
    }

    function stickifyChallengeThread(threadId, callback) {
	var normalizedHref = /(.*flickr.com\/groups\/[^\/]+\/discuss\/)\d+/.exec(document.location.href)[1];
	var lockHRef = normalizedHref + threadId + '/stick/';
	new Request({
		url: lockHRef,
		onSuccess: function (responseText, responseXML) {
		    var tempDiv = new Element('div');
		    tempDiv.innerHTML = responseText.stripScripts();
		    var problem = tempDiv.getElement('p.Problem');
		    if ($chk(problem)) {
			callback( { success: false, error: problem.innerHTML });
		    } else {
			callback( { success: true, threadId: threadId });
		    }
		},
		onFailure: function (response) {
			callback( { success: false, error: response.statusText });
		}
	}).post();
    }

    function saveOverrides(challengeDefinitionUI, challengeAnnouncement, callback) {
        // empty buttonCell
        //buttonCell.style.backgroundColor = "white";
        var buttonCell = $('UCPANG:saveoverrides_button');
        buttonCell.empty();
        buttonCell.adopt(spin = new Element('img', {
            src: updatingIcon
        }));
        // read current content of announcement
        //var content = challengeAnnouncement.innerHTML;
        // remove all UCPoverrides, and <small> elements
        // but first, get the edit link
        var editLink = challengeAnnouncement.getElement('small a[href*=edit]');
        if (!$chk(editLink)) {
            buttonCell.empty();
            buttonCell.set('html', 'ERROR fetching edit link; aborting');
            buttonCell.style.color = 'red';
            return;
        }
        challengeAnnouncement.getElements('img[alt*=UCPoverride]').dispose();
	var challengeAnnouncementHtml = stripChallengeAnnouncement(challengeAnnouncement);
        // append the new overrides
        $('ucpng_overrides_title_panel').set('html', "checking overrides..");
        for (var key in challengeDefinitionUI.ui) {
            if (challengeDefinitionUI.ui.hasOwnProperty(key)) {
                if (!$chk(challengeDefinitionUI.ui[key])) {
                    continue;
                }
                var inputElement = challengeDefinitionUI.ui[key].element;
                var value = undefined; // reset each time
                switch (challengeDefinitionUI.ui[key].createInput.type) {
                case "numbers": // selectbox
                    value = parseInt(inputElement.value, 10); 
                    break;
                case "strings": // selectbox
                    value = inputElement.value;
                    break;
                case "boolean": // checkbox
                    value = inputElement.checked;
                    break;
                default:
                    messageSpan.set('html', "<br>input element for key '" + key + "' not found");
                }
                if (value !== challengeDefinitionUI.challengeDefinition.options[key]) {
                    challengeAnnouncementHtml += '<img ' +
		                                 'src="http://l.yimg.com/g/images/spaceout.gif" ' +
                                                 'alt="UCPoverride:' + challengeDefinitionUI.ui[key].overrideLabel + ':' + value + '" ' +
						 '/>';
                }
            }
        }
        // post: based on the ideas found in 'Inline Comment Editor' by steev 
        // (http://www.flickr.com/groups/flickrhacks/discuss/72157600231591623/)
        var title = challengeDefinitionUI.chlgname;
        var editLinkHref = editLink.href;

        $('ucpng_overrides_title_panel').set('html', "sending updates to Flickr, please wait..");
	updateChallengeHeader(title, challengeAnnouncementHtml, buttonCell, editLinkHref, callback);
    }

    var UCPChallengeDefinitionUI = new Class({
        initialize: function (challengeDefinition, chlgname) {
            this.challengeDefinition = challengeDefinition;
            this.chlgname = chlgname;
            this.ui = {
                neededPhotos:   {
                    label:          "photos",
                    overrideLabel:  "photos",
                    title:          "the number of photos needed in this challenge",
                    appendLabel:    "photos",
                    element:        undefined,
                    createInput:    {
                        type:   "numbers",
                        min:    -1,
                        max:    50
                    }
                },
                neededScore:    {
                    label:          "score",
                    overrideLabel:  "votes",
                    title:          "the score needed to call a winner",
                    appendLabel:    "votes wins",
                    element:        undefined,
                    createInput:    {
                        type:   "numbers",
                        min:    -1,
                        max:    50
                    }
                },
                scoreType:      {
                    label:          "voting",
                    overrideLabel:  "type",
                    title:          "the type of voting",
                    element:        undefined,
                    createInput:    {
                        type:   "strings",
                        values: [
                            [ "HORIZONTAL", "horizontal voting (1-1-0)" ],
                            [ "PIC-P-1", "pick player (only seen in MatchPoint & F64)" ],
                            [ "PIC-P-2", "pick 2 players" ],
                            [ "PIC-P-3", "pick 3 players (only seen in F64)" ],
                            [ "PIC-V-1", "pick your favorite" ],
                            [ "PIC-V-2", "pick your 2 favorites (vertical voting)" ],
                            [ "PIC-V-3", "pick your 3 favorites (vertical voting)" ],
                            [ "PIC-V-4", "pick your 4 favorites (vertical voting)" ],
                            [ "PIC-V-5", "pick your 5 favorites (vertical voting)" ],
                            [ "PIC-H-2", "pick your 2 favorites (horizontal voting)" ],
                            [ "PIC-H-3", "pick your 3 favorites (horizontal voting)" ],
                            [ "PIC-H-4", "pick your 4 favorites (horizontal voting)" ],
                            [ "PIC-H-5", "pick your 5 favorites (horizontal voting)" ],
                            [ "RATE-PHOTO", "give points to some (or all) of the challengers" ],
                            [ "VERTICAL", "vertical voting" ],
                            [ "VERTICAL-WEIGHTED", "vertical voting, with weighted votes" ]
                        ]
                    }
                },
                countsToLimit:  {
                    label:          "group\nlimit",
                    overrideLabel:  "grouplimit",
                    title:          "indicates if playing in this challenge counts toward the limit",
                    element:        undefined,
                    createInput:    {
                        type:   "boolean",
                        title:  "counts towards the group limit"
                    }
                },
                limitPerPlayer: {
                    label:          "photos&nbsp;per\nchallenger",
                    overrideLabel:  "max",
                    title:          "maximum number of entries per player",
                    appendLabel:    "photos per challenger (max.)",
                    element:        undefined,
                    createInput:    {
                        type:   "numbers",
                        min:    -1,
                        max:    10
                    }
                },
                playerVoting: {
                    label:          "player&nbsp;voting",
                    overrideLabel:  "voting",
                    title:          "player participation",
                    element:        undefined,
                    createInput:    {
                        type:   "strings",
                        values: [
                            [ "n/a", "not applicable" ],
                            [ "mayvote", "a player in this challenge is allowed to vote in this challenge" ],
                            [ "mustvote", "a player in this challenge must also vote in this challenge" ],
                            [ "maynotvote", "a player in this challenge can not vote in this challenge" ]
                        ]
                    }
                },
                scoresAdded: {
                    label:          "incremental&nbsp;&nbsp;",
                    overrideLabel:  "added",
                    title:          "'Constructive' challenges should set this to 'false'",
                    element:        undefined,
                    createInput:    {
                        type:   "boolean"
                    }
                },
                iconChallenge: {
                    label:          "icon",
                    overrideLabel:  "icons",
                    title:          "Icon challenge?",
                    element:        undefined,
                    createInput: {
                        type:   "boolean"
                    }
                }
            }
        },
        printAsTableWithDiff: function (other, challengeAnnouncement, element, admin) {
            var table = new Element('table', {
                border: '0',
                cellSpacing: '0',
                cellPadding: '0',
		styles: {
			width: '100%'
		}
            }).inject(element);
            table.adopt(new Element('tr').adopt(
                    new Element('th', { 
                        colSpan: 3,
                        html: "&nbsp;Challenge&nbsp;configuration"
                    }),
                    new Element('th', { colSpan: 5 }).adopt(
                        titlePanel = new Element('small', {
                            styles: {
                                color: "green"
                            },
                            id: "ucpng_overrides_title_panel",
                            html: " "
                        })
                    ),
                    new Element('th', { align: 'right' }).adopt(new Element('a', {
                        target: '_blank',
                        html: 'help',
                        href: 'http://www.flickr.com/groups/1307178@N20/discuss/72157623759768824/#comment72157623775144916',
                        styles: {
                            cursor: 'help'
                        }
                    }))
            ));
            table.adopt(row = new Element('tr', {
                    styles: {
                        background: '#CFCFCF'
                    },
                    cellPadding: 0 
                })
            );
            new Element('th', {
                html: " "
            }).inject(row);
            $each(this.ui, function (value, key) {
                    new Element('small', {
                        html: value.label,
                        events: {
                            'mouseover': function () {
                                titlePanel.set('html', value.title);
                            },
                            'mouseout': function () {
                                titlePanel.empty();
                            }
                        }
                    }).inject(new Element('th', { 
                                        styles: { 
                                            'border-left': 'solid white 1px',
                                            backgroundColor: value.debug ? 'orange' : undefined
                                        }
                                    }).inject(row));
                }
            );
            row = new Element('tr').inject(table);
            new Element('td', {
                html: "default:",
                styles: {
                    color: '#6F6F6F'
                },
                events: {
                    'mouseover': function () {
                        titlePanel.set('html', "the default values defined by UCheckPlay");
                    },
                    'mouseout': function () {
                        titlePanel.empty();
                    }
                }
            }).inject(row);
            var value;
            $each(this.ui, function (uiValue, key) {
                    value = this.challengeDefinition.options[key];
                    if (parseInt(value, 10) < 0 || parseInt(value, 10) === 65535) {
                        value = "n/a";
                    }
                    row.adopt(new Element('td', {
                        styles: {
                            backgroundColor: uiValue.debug ? 'orange' : undefined
                        }
                    }).adopt(new Element('small', {
                        html: value,
                        events: {
                            'mouseover': function () {
                                titlePanel.set('html', uiValue.title);
                            },
                            'mouseout': function () {
                                titlePanel.empty();
                            }
                        }
                    })));
                },
                this
            );
            if (this.challengeDefinition.nonChallengeType()) {
                return table;
            }
            overrideRow = new Element('tr').inject(table);
            var showOverrides = false; // only show override row when needed for non-admins/non-mods
            valueColumn = new Element('th', {
                html: 'override:',
                events: {
                    'mouseover': function () {
                        titlePanel.set('html', "overriden values are colored red");
                    },
                    'mouseout': function () {
                        titlePanel.empty();
                    }
                },
                valign: "top"
            }).inject(overrideRow);
            $each(this.ui, function (uiValue, key) {
                    var override = false;
                    var otherValue;
                    value = this.challengeDefinition.options[key];
                    if (other) {
                        otherValue = other.challengeDefinition.options[key];
                        override = otherValue !== value;
                        if (override) {
                            showOverrides = true;
                        }
                    }
                    if (parseInt(otherValue, 10) < 0 || parseInt(otherValue, 10) === 65535) {
                        value = "n/a";
                    }
                    valueColumn = new Element('td', {
                        styles: {
                            backgroundColor: uiValue.debug ? 'orange' : undefined
                        }
                    }).inject(overrideRow);
                    var small = new Element('small').inject(valueColumn);
                    switch (uiValue.createInput.type) {
                    case "numbers": 
                        var numbersSelect = new Element('select').inject(small);
                        uiValue.element = numbersSelect;
                        if (!admin) {
                            numbersSelect.disabled = 'true';
                        }
                        if (override) {
                            numbersSelect.style.color = "Red";
                        }
                        var min = uiValue.createInput.min;
                        var max = uiValue.createInput.max;
                        for (var n = min; n <= max; ++n) {
                            if (n === 0) {
                                continue;
                            }
                            var optionName = (n === -1 ? "n/a" : n);
                            var optionValue = n;
                            var numberOption = new Element('option', {
                                value: optionValue,
                                html: optionName,
                                selected: ((!override && n === this.challengeDefinition.options[key]) ||
                                 (override && n === other.challengeDefinition.options[key])) ?
                                    "selected" : "",
                                events: {
                                    'mouseover': function () {
                                        titlePanel.set('html', (parseInt(this.value, 10) === -1 ? 
                                                                "no limit" : this.value + " " + uiValue.appendLabel));
                                    },
                                    'mouseout': function () {
                                        titlePanel.empty();
                                    }
                                }
                            }).inject(numbersSelect);
                        }
                        break; 
                    case "strings":
                        var stringsSelect = new Element('select', {
                            styles: {
                                'max-width': '110px'
                            }
                        }).inject(small);
                        uiValue.element = stringsSelect;
                        if (!admin) {
                            stringsSelect.disabled = true;
                        }
                        if (override) {
                            stringsSelect.style.color = "Red";
                        }
                        $each(uiValue.createInput.values, function(stringArray) {
                            var optionName = stringArray[0];
                            var optionTitle = stringArray[1];
                            var stringOption = new Element('option', {
                                value: optionName,
                                html: optionName,
                                events: {
                                    'mouseover': function () {
                                        titlePanel.set('html', optionTitle);
                                    },
                                    'mouseout': function () {
                                        titlePanel.empty();
                                    },
                                },
                                selected: ((!override && optionName === this.challengeDefinition.options[key]) ||
                                 (override && optionName === other.challengeDefinition.options[key])) ?
                                    "selected": ""
                            }).inject(stringsSelect);
                        }, this);
                        break;
                    case "boolean":
                        if (override) {
                            var colorSpan = new Element('span').inject(small);
                            colorSpan.setStyle("background-color", "red");
                        }
                        var checkBox = new Element('input', {
                            disabled: !admin,
                            type: 'checkbox',
                            name: key,
                            id: key,
                            title: uiValue.debug ? uiValue.title : undefined,
                            checked: ((!override && this.challengeDefinition.options[key]) || 
                                            (override && other.challengeDefinition.options[key])),
                            events: {
                                'mouseover': function () {
                                    titlePanel.set('html', uiValue.title);
                                },
                                'mouseout': function () {
                                    titlePanel.empty();
                                }
                            }
                        }).inject(override ? colorSpan : small);
                        uiValue.element = checkBox;
                        break;
                    }
                },
                this
            );
            if (showOverrides || admin) {
                overrideRow.inject(table);
            }
            if (admin) {
                (buttonCell = new Element('button', {
                    'class': "Butt",
                    html: 'SAVE',
                    id: "UCPANG:saveoverrides_button",
                    events: {
                        'click': function () { 
                            saveOverrides(this, challengeAnnouncement, function (retval) {
                               if (retval.success) {
                                       document.location.href = /(.*flickr.com\/groups\/[^\/]+\/discuss\/\d+)/.exec(document.location.href)[1] + '/';
                               } else {
                                       alert(retval.message);
                               }
                           });
                        }.bind(this),
                        'mouseover': function () {
                            titlePanel.set('html', "Store overrides in challenge announcement");
                        },
                        'mouseout': function () {
                            titlePanel.empty();
                        }
                    }
                })).inject(new Element('td', {
                    colSpan: 20,
                    align: "right"
                }).inject(new Element('tr').inject(table)));
            }
            return table;
        }
    });


    function cleanupUCPAvariables() {
        GM_listKeys(null, function (key) {
            if (//key.match(/UCPA/) &&
                    !key.match(/UCPA.hideNonWonMedals/) &&
                    !key.match(/UCPA.stopAtFirstFoundMedal/) &&
                    !key.match(/UCPA.defaultAwardsGroup/) &&
                    !key.match(/UCPA.defaultAwardsGroupInPendingItems/) &&
                    !key.match(/UCPA.bumpAndReload/) &&
                    !key.match(/UCPA.bumpAndReturnToFirstPage/) &&
                    !key.match(/UCPA.smartPhotoBoxes/) &&
		    !key.match(/UCPA.workflowAutoClaimOwnership/) &&
		    !key.match(/UCPA.useLevenshteinToMarkUsedThemes/) &&
		    !key.match(/UCPA.levenshteinDistanceInUsedThemes/) &&
                    !key.match(/UCPA.lastVersionCheckTime/) &&
		    !key.match(/UCPA.onlineVersion/) &&
		    !key.match(/UCPA.groupAdministrator/) &&
		    !key.match(/UCPA.groupModerator/) &&
		    !key.match(/UCPA.CrossCheck/) &&
		    !key.match(/UCPA.bumpAndReload/) &&
		    !key.match(/UCPA.bumpAndReturnToFirstPage/) &&
		    !key.match(/UCPA.smartPhotoBoxes/) &&
		    !key.match(/UCPA.workflowAutoClaimOwnership/) &&
		    !key.match(/UCPA.hideNonWonMedals/) &&
		    !key.match(/UCPA.stopAtFirstFoundMedal/) &&
		    !key.match(/UCPA.defaultAwardsGroup/) &&
		    !key.match(/UCPA.defaultAwardsGroupInPendingItems/) &&
		    !key.match(/UCPA.useLevenshteinToMarkUsedThemes/) &&
		    !key.match(/UCPA.levenshteinDistanceInUsedThemes/)) {
                GM_deleteValue(key);
            }
        });
    }

    function deleteThreadReply(data) {
    	var deleteCommentUrl = data.replyPermalink + "/delete";
	var callback = data.callback;
	var referrer = data.referrer;

        new Request({
            url: deleteCommentUrl,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": referrer
	    },
            onFailure: function (response) {
	    	callback({ success: false, message: response.statusText });
            },
            onSuccess: function (responseText, responseXML) {
	        var tempDiv = new Element('div');
        	tempDiv.innerHTML = responseText.stripScripts();
                var problem = tempDiv.getElement('p.Problem');
                if ($chk(problem)) {
                    callback({ success: false, message:  problem.innerHTML });
	        } else {
		    callback({ success: true });
		}
	    }
        }).post({
            magic_cookie: GM_getAuthHash(),
            done: 1
	});
    }

    function apiPostThreadReply(data) {
    	var topicId = data.topicId;
	var message = data.message;
	var callback = data.callback;

	new Request({
		url: 'http://www.flickr.com/',
		onFailure: function (response) {
			GM_log("ERROR: failure posting reply: " + response.statusText);
			callback({ success: false, message: response.statusText });
		},
		onSuccess: function (responseText, responseXML) {
			var result;
			try {
			    result = JSON.parse(responseText);
			} catch (e) {
				try {
			    		result = eval('(' + responseText + ')');
				} catch (f) {
					GM_log("ERROR: unable to parse response: '" + responseText + "'");
					callback({ success: false, message: e });
					return;
				}
			}
			if (result.stat === 'fail') {
				callback({ success: false, message: result.code + ' - ' + result.message });
				return;
			}
			callback({ success: true });
		}
	}).post('/services/rest', {
		method: 'flickr.groups.discuss.replies.add',
		api_key: GM_getPrivateKey(),
	        auth_hash: GM_getAuthHash(),
        	auth_token: GM_getAuthToken(),
		topic_id: topicId,
		format: 'json',
		nojsoncallback: 1,
		message: message
	})
			
    }

    function updateThreadReply(data) {
	var async = data.async;
	var editLink = data.replyUrl + '/edit/';
	var message = data.message;
	var callback = data.callback;
        // strip the starting 'p' tag
        message = message.replace(/^\s*<p[^>]*>/,'');
        new Request({
            method: "post",
            url: editLink,
	    async: async,
            headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Referer": editLink
            },
            data: "magic_cookie=" + GM_getAuthHash() + 
                                "&done=1" +
                                "&message=" + encodeURIComponent(message),
            onFailure: function (response) {
		callback({ success: false, msg: response.statusText } );
            },
            onSuccess: function (responseText, responseXML) {
                var tempDiv = new Element('div');
                tempDiv.innerHTML = responseText.stripScripts();
                var problem = tempDiv.getElement('p.Problem');
                if ($chk(problem)) {
                    callback({ success: false, msg: problem.innerHTML });
		} else {
		    callback({ success: true });
		}
            }
        }).send();
    }

    function bumpThread(data) {
    	var topicId = data.topicId;
	var majorButton = data.majorButton;

	$('UCPANG-bump-thread-' + topicId).fireEvent('start-updating');
	
	apiPostThreadReply({
		topicId: topicId,
		message: groupConfig.bumpMessage() + '<img src=http://l.yimg.com/g/images/spaceout.gif alt=UCPANG:bump:'+new Date().getTime()+'/>',
		callback: function(result) {
			if (!result.success) {
                		GM_log("error bumping '" + topicId + "': " + result.message);
                		$('UCPANG-bump-thread-' + topicId).fireEvent('done', { success: false, message: "error while posting bump message: " + result.message });
				return;
			}

			createProgressImage({ idPrefix: 'UCPANG-fetch-old-bumps-', id: topicId, startTitle: 'queued for retrieval',
				busyTitle: 'retrieving old bump replies..', doneTitle: 'old bump replies retrieved', majorButtonId: majorButton.get('id') }).inject('UCPANG-bump-thread-' + topicId, 'after').fireEvent('start-updating');
			new Request({
				url: 'http://www.flickr.com/',
				onFailure: function (response) {
					$('UCPANG-bump-thread-' + topicId).fireEvent('done', { success: true });
					$('UCPANG-fetch-old-bumps-' + topicId).fireEvent('done', { success: false, message: 'faild to retrieve list of replies: ' + response.statusText });
				},
				onSuccess: function (responseText, responseXML) {
					var result;
					try {
					    result = JSON.parse(responseText);
					} catch (e) {
						try {
						    result = eval('(' + responseText + ')');
						} catch (f) {
							GM_log("ERROR parsing replies list: " + e);
							$('UCPANG-bump-thread-' + topicId).fireEvent('done', { success: true });
							$('UCPANG-fetch-old-bumps-' + topicId).fireEvent('done', { success: false, message: "error while parsing list: " + e });
							return;
						}
					}
					if (result.stat === 'fail') {
						$('UCPANG-bump-thread-' + topicId).fireEvent('done', { success: true });
					    $('UCPANG-fetch-old-bumps-' + topicId).fireEvent('done', { success: false, message: "failed fetching replies: " + result.code + " " + result.message });
					    return;
					}
					var bumpMessages = [];
					if ($chk(result.replies) && $chk(result.replies.reply)) {
						bumpMessages = result.replies.reply.filter(function (reply) {
							if (reply.message._content.match(/<img.*UCPANG:bump:/)) {
								createProgressImage({
									idPrefix: 'UCPANG-bump-remove-',
									id: reply.id,
									startTitle: 'bump reply ' + reply.id + ' queued for removal',
									busyTitle: 'removing bump reply ' + reply.id + '..',
									doneTitle: 'removed bump reply ' + reply.id,
									majorButtonId: majorButton.get('id')
								}).inject($('UCPANG-fetch-old-bumps-' + topicId), 'after');
								return true;
							}
							return false;
						});
					}
					if (bumpMessages.length == 0) { // there should at least be one
						$('UCPANG-bump-thread-' + topicId).fireEvent('done', { success: true });
						$('UCPANG-fetch-old-bumps-' + topicId).fireEvent('done', { success: false, message: "error searching bump messages: none found" });
						return;
					}
					bumpMessages.forEach(function (bumpMessage, idx) {
						$('UCPANG-bump-remove-' + bumpMessage.id).fireEvent('start-updating');
						if (idx == bumpMessages.length - 1) { // leave the one we just created!
							$('UCPANG-bump-remove-' + bumpMessage.id).fireEvent('done', { success: true, message: 'kept last bump message' });
							return;
						}
						// revert back to the non-api version: delete another's reply is not allowed
						deleteThreadReply( {
							replyPermalink: 'http://www.flickr.com/groups/' + result.replies.topic.group_id + '/discuss/' + topicId + '/' + bumpMessage.id,
							referrer: document.location.href.match(/(.*flickr.com\/groups\/[^\/]+\/discuss)/)[1] + '/' + topicId,
							callback: function (data) {
								$('UCPANG-bump-remove-' + bumpMessage.id).fireEvent('done', { success: data.success, message: data.success ? "removed old bump reply " + bumpMessage.id + " successfully" : "error removing old bump reply " + bumpMessage.id + " (" + data.message + ")" });
								if (data.success) {
									if ($$('a[name=comment' + bumpMessage.id + ']').length > 0) {
										var oldBump = $$('a[name=comment' + bumpMessage.id + ']')[0].getParent('tr');
										oldBump.setStyle('opacity', 0.3);
									}
								}
							}
						});
					});
					$('UCPANG-bump-thread-' + topicId).fireEvent('done', { success: true });
					$('UCPANG-fetch-old-bumps-' + topicId).fireEvent('done', { success: true });
				}
			}).get('/services/rest', {
				api_key: GM_getPrivateKey(),
				auth_hash: GM_getAuthHash(),
				auth_token: GM_getAuthToken(),
				method: 'flickr.groups.discuss.replies.getList',
				format: 'json',
				nojsoncallback: 1,
				topic_id: topicId,
				page: 1,
				per_page: 500
			});
		}
	});

    }

    function createProgressImage(data) {
    	var idPrefix = data.idPrefix;
    	var id = data.id;
	var startTitle = data.startTitle;
	var busyTitle = data.busyTitle;
	var doneTitle = data.doneTitle;
	var majorButtonId = data.majorButtonId;

	return new Element('img', {
		id: idPrefix + id,
		src: images.queued,
		'class': 'queued',
		title: startTitle,
		events: {
			'start-updating': function (evt) {
				this.set('class', 'busy');
				this.set('src', updatingIcon);
				this.set('title', $chk(evt) && $chk(evt.message) ? evt.message : busyTitle);
			},
			'done': function (evt) {
				this.set('class', evt.success ? 'done' : 'error');
				this.set('src', evt.success ? defaultCheckIconSmall : errorIcon);
				this.set('title', evt.success ? ($chk(evt.message) ? evt.message : doneTitle) : evt.message);
				if ($$('img.queued[id^=' + idPrefix + '], img.busy[id^=' + idPrefix + ']').length == 0) {
					if (!$chk($(majorButtonId))) {
						GM_log("ERROR: no element found with id='" + majorButtonId + "'");
					} else {
						$(majorButtonId).fireEvent('done', { success: $$('img.error[id^=' + idPrefix + ']').length == 0 });
					}
				}
			}
		}
	});
    }

    function startBumping(checkBoxes) {
	$$('img[id^=UCPANG-bump-thread], img[id^=UCPANG-fetch-old], img[id^=UCPANG-bump-remove]').dispose();
	if (checkBoxes.length > 0) {
	        checkBoxes.each(function (checkBox) {
			createProgressImage({ idPrefix: 'UCPANG-bump-thread-', id: checkBox.name, startTitle: 'queued for bumping',
				busyTitle: 'bumping..', doneTitle: 'bumped', majorButtonId: 'UCPANG-bump-button'
			}).inject(checkBox, 'after');
		});
		checkBoxes.each(function (checkBox) {
			bumpThread({ topicId: checkBox.name, majorButton: $('UCPANG-bump-button') });
		});
	}
    }

    function makeSticky(selectedCheckBoxes) {
	$$('img[id^=UCPANG-stickify-thread]').dispose();
	if (selectedCheckBoxes.length > 0) {
		$('UCPANG-make-sticky-button').fireEvent('start-updating');
		selectedCheckBoxes.each(function (checkBox) {
			createProgressImage({ idPrefix: 'UCPANG-stickify-thread-', id: checkBox.name, startTitle: 'queued to make sticky',
				busyTitle: 'making sticky..', doneTitle: 'made sticky', majorButtonId: 'UCPANG-make-sticky-button'
			}).inject(checkBox, 'after');
		});
		selectedCheckBoxes.each(function (checkBox) {
			$('UCPANG-stickify-thread-' + checkBox.name).fireEvent('start-updating');
			var lockHRef = document.location.href.replace(/(.*flickr.com\/groups\/[^\/]+\/discuss).*$/, '$1/') + checkBox.name + '/stick/';
			new Request({
				url: lockHRef,
				onSuccess: function (responseText, responseXML) {
				    var tempDiv = new Element('div');
				    tempDiv.innerHTML = responseText.stripScripts();
				    var problem = tempDiv.getElement('p.Problem');
				    if ($chk(problem)) {
					$('UCPANG-stickify-thread-' + checkBox.name).fireEvent('done', { success: false, message: "error while making thread sticky: " + problem.innerHTML });
				    } else {
					$('UCPANG-stickify-thread-' + checkBox.name).fireEvent('done', { success: true });
				    }
				},
				onFailure: function (response) {
				    $('UCPANG-stickify-thread-' + checkBox.name).fireEvent('done', { success: false, message: response.statusText });
				}
			}).post();
		});
	}
    }

    function startExpanding(checkBoxes) {
        checkBoxes.each(function (checkBox) {
                var id = 'UCPANG.arrow.' + checkBox.name;
                $(id).click();
        });
    }
    function startCrossInspect(checkBoxes) {
	/*
	for each selectedThread
		read selectedThread
		collect players, with playtime
		collect voters, with votetime
		guess start of voting
	report
		for each player, number of entered challenges
		for each entry, show if player has voted in VOTE challenges
	*/

	if ($chk($('UCPANG-cross-inspect-dialog'))) {
		$('UCPANG-cross-inspect-dialog').destroy();
		return;
	}
	failedRemoteActions = [];
        var crossDialog = new Element('div', { // put into a table to get the CSS styles right
		width: '100%',
		id: 'UCPANG-cross-inspect-dialog',
                'class': 'ucpDialogStyle',
		styles: {
			display: 'block',
			clear: 'both'
		}
	}).inject(topicListingTable, 'before');
	var readingProgressRow = new Element('div').inject(crossDialog);
	var readingProgressLabel = new Element('span', { html: 'reading threads: ', styles: { fontWeight: 'bold' } }).inject(readingProgressRow);
	var collectingProgressRow = new Element('div').inject(crossDialog);
	var collectingProgressLabel = new Element('span', { html: 'collecting data: ', styles: { fontWeight: 'bold' } }).inject(collectingProgressRow);
	var availableDiv = new Element('div', { html: 'Available Cross-Inspection checks: ', styles: { fontWeight: 'bold' } }).inject(crossDialog);
	new Element('img', {
		src: images.info,
		styles: {
			cursor: 'pointer',
			height: '14px'
		}
	}).inject(new Element('a', {
		href: 'http://www.flickr.com/groups/unified_checkplay/discuss/72157623759768824/#comment72157629450524932',
		target: '_blank',
		title: 'click to get more information',
		styles: {
			backgroundColor: 'transparent'
		}
	}).inject(availableDiv));
	var labelsTable = new Element('table').inject(crossDialog);
	var checkLabels = {
		numbering:      { label: groupConfig.challengeNumberingLabel(), value: groupPreferences.crossCheckChallengeNumbering(), setF: 'setCrossCheckChallengeNumbering' },
		similarThemes:  { label: 'check for similar themes',            value: groupPreferences.crossCheckSimilarThemes(), setF: 'setCrossCheckSimilarThemes' },
		playerEntries:  { label: 'count player entries',                value: groupPreferences.crossCheckCountPlayerEntries(), setF: 'setCrossCheckCountPlayerEntries' },
		multiChallenge: { label: 'check for photos that participate in multiple challenges',     value: groupPreferences.crossCheckMultipleChallenges(), setF: 'setCrossCheckMultipleChallenges' },
		nonVoters:      { label: 'check for players that didn\'t vote (yet) in VOTE challenges', value: groupPreferences.crossCheckNonVoters(), setF: 'setCrossCheckNonVoters' }
	};
	for (var check in checkLabels) {
		if (checkLabels.hasOwnProperty(check)) {
			var labelRow = new Element('tr').inject(labelsTable);
			new Element('td', { html: '&emsp;' }).inject(labelRow);
			new Element('td', { html: '&bull; ' + checkLabels[check].label }).inject(labelRow);
			var runTypeCell = new Element('td').inject(labelRow);
			var runTypeSelect = new Element('select', {
				id: 'UCPANG-CrossCheck-runtype-' + check,
				events: {
					change: function (evt) {
						var check = this.get('id').replace('UCPANG-CrossCheck-runtype-', '');
						groupPreferences[checkLabels[check].setF].apply(groupPreferences,this.getSelected().get('value'));
					}
				}
			}).inject(runTypeCell);
			[ { html: 'always run this check', value: 'always' },
			  { html: 'never run this check', value: 'never' },
			  { html: 'default: only run this check in auto-mode', value: 'default' }
			].each(function (option) {
				new Element('option', {
					html: option.html,
					value: option.value,
					selected: (option.value == checkLabels[check].value ? "selected" : "")
				}).inject(runTypeSelect);
			});
		}
	};

	var ucpThreads = [];
	// if no checkbox is checked, pretend they all are
	var noThreadsSelected = !checkBoxes.some(function (checkbox) { return checkbox.checked; });
	checkBoxes.each(function (checkBox) { 
		if (checkBox.checked || noThreadsSelected) { 
			new Element('span', { html: ' ' }).inject(readingProgressRow);
			createProgressImage({ idPrefix: 'UCPANG-cross-inspect-read-', id: checkBox.name, startTitle: 'queued for retrieval',
				busyTitle: 'retrieving thread..', doneTitle: 'thread read', majorButtonId: 'UCPANG-start-cross-reading'
			}).inject(readingProgressRow);
			new Element('span', { html: ' ' }).inject(collectingProgressRow);
			createProgressImage({ idPrefix: 'UCPANG-cross-inspect-collect-', id: checkBox.name, startTitle: 'queued for collecting info',
				busyTitle: 'collecting info..', doneTitle: 'info collected', majorButtonId: 'UCPANG-start-cross-inspect'
			}).inject(collectingProgressRow);
		}
	});
	new Element('button', {
		id: 'UCPANG-start-cross-reading',
		'class': 'hidden_from_view',
		events: {
			done: function(evt) {
				if (evt.success) {
					// ignore
				}
			}
		}
	}).inject($$('body')[0]);
	new Element('button', {
		id: 'UCPANG-start-cross-inspect',
		'class': 'hidden_from_view',
		events: {
			done: function(evt) {
				if (evt.success) {
					if ($$('img.error[id^=UCPANG-cross-inspect]').length == 0) {
						performCrossChecks(ucpThreads, failedRemoteActions, noThreadsSelected, checkLabels);
					}
				}
			}
		}
	}).inject($$('body')[0]);
	// collect data
        checkBoxes.each(function (checkBox) {
            if (checkBox.checked || noThreadsSelected) {
		$('UCPANG-cross-inspect-read-' + checkBox.name).fireEvent('start-updating');
                var challengeUrl = document.location.href.replace(/(.*flickr.com\/groups\/[^\/]+\/discuss).*$/, '$1/' + checkBox.name);
		var challengeName = checkBox.getParent('li').getElements('a')[0].textContent;
            	var ucpThread = ucpCreateChallengeThread({
                	groupConfig: groupConfig,
                	url: challengeUrl,
			chlgname: challengeName,
                	replyDecoratorFactory: new UCPEmptyDecoratorFactory() /*,
                	decoratorFactory: ucpDecoratorFactory*/
            	});
		ucpThreads.push(ucpThread);

		if (groupConfig.skipChallenge(ucpThread.challengeName()) || !(ucpThread instanceof UCPChallengeThread)) {
			$('UCPANG-cross-inspect-read-' + checkBox.name).fireEvent('done', { success: true, message:  'challenge thread \'' + ucpThread.challengeName() + '\' read' });
			// no need to collect anything
			$('UCPANG-cross-inspect-collect-' + checkBox.name).fireEvent('done', { success: true, message: 'no need to collect data from \'' + ucpThread.challengeName() + '\'' });
			return;
		}
            	ucpThread.apiloadthread(function(result) {
			var success = result.success;
			var message = result.message;
			var discussionTopic = result.topic;
			var challengeEntries = result.replies;
			if (!success) {
				GM_log("ERROR: " + message);
				$('UCPANG-cross-inspect-read-' + ucpThread.topic()).fireEvent('done', { success: false, message: message + ' (' + ucpThread.challengeName() + ')' });
				return;
			}
			ucpThread.guessLasteditTime(function (result) {
				if (!result.success) {
					GM_log("ERROR guessing last edit time: " + result.message);
					$('UCPANG-cross-inspect-read-' + ucpThread.topic()).fireEvent('done', { success: false, message: result.message + ' (' + ucpThread.challengeName() + ')' });
					return;
				}
				ucpThread.setLastEdit(result.lastedit); // contains 'Alesa Dam edited this topic 2 days ago.'
				$('UCPANG-cross-inspect-read-' + ucpThread.topic()).fireEvent('done', { success: true, message: 'challenge thread \'' + ucpThread.challengeName() + '\' read' });
				// collect photos, and votes
				$('UCPANG-cross-inspect-collect-' + ucpThread.topic()).fireEvent('start-updating', { message: 'collecting data from \'' + ucpThread.challengeName() + '\'' });
				if (ucpThread.photos().length == 0) {
				    try {
					ucpThread.challengeDefinition().readChallengeDefinitionOverrides(new Element('div', { html: discussionTopic.message._content}));
					ucpThread.collectApiVotes(discussionTopic, challengeEntries);
					ucpThread.setChallengeStatus("none");
					try {
						ucpProcessVotes(ucpThread);
					} catch (e) {
						// throws exception in non-challenge threads
					}
				    } catch (e) {
					$('UCPANG-cross-inspect-collect-' + ucpThread.topic()).fireEvent('done', { success: false, message: e + ' (' + ucpThread.challengeName() + ')' });
					return;
				    }
				}
				$('UCPANG-cross-inspect-collect-' + ucpThread.topic()).fireEvent('done', { success: true, message: 'data collected for \'' + ucpThread.challengeName() + '\'' });
			});
	    	});
	    }
    	});
    }

    function printThreadList(data) {
	var threads = data.threads;
	var title = data.title;
	var color = data.color;
	var entriesBold = data.entriesBold;
	var showStatus = data.status;
	var element = data.element;

	if (threads.length > 0) {
		var div = new Element('div', { styles: { 'margin-left': '20px' } } ).inject(element);
		var label = new Element('label', {
			html: '&emsp;found ' + (entriesBold ? '<b>' : '') + threads.length + (entriesBold ? '</b>' : '') + ' ' + title,
			styles: {
				fontWeight: color != '' ? 'bold' : '',
				color: color,
				cursor: 'pointer'
			},
			'class': 'UCPANG-collapsed',
			events: {
				click: function (evt) {
					if ($(this).hasClass('UCPANG-expanded')) {
						return;
					}
					this.addClass('UCPANG-expanded');
					this.getElement('img').dispose();
					var list = new Element('p', { styles: { 'margin-left': '20px' } }).inject(this.getParent('div'));
					threads.sort(function (a,b) {
						var nameA = a.challengeName().toLowerCase( );
						var nameB = b.challengeName().toLowerCase( );
						if (nameA < nameB) {return -1}
						if (nameA > nameB) {return 1}
						return 0;
					}).each(function (ucpThread) {
						var item = new Element('span', { styles: { display: 'block' } }).inject(list);
						new Element('a', {
							href: ucpThread.url(),
							html: ucpThread.challengeName(),
							target: '_blank',
							styles: {
								fontWeight: 'normal',
								color: color
							}
						}).inject(item);
						if (showStatus && ucpThread.challengeStatus) { // function check
							new Element('label', { html: ' == ' + ucpThread.challengeStatus() }).inject(item);
						}
					});
				}
			}
		}).inject(div);
		new Element('img', {
			src: images.down,
			'class': 'UCPANG-collapsed',
			styles: {
				cursor: 'pointer',
				'max-height': '10px'
			},
			events: {
				click: function (evt) {
					this.getParent('label').fireEvent('click');
				}
			}
		}).inject(label);
		if (color != '') {
			label.fireEvent('click');
		}
	}
    }
    function performCrossChecks(ucpThreads, failedActions, automode, checkLabels) {
	var crossInspectDialog = $('UCPANG-cross-inspect-dialog');
	if (failedActions.length > 0) {
		new Element('div', { html: 'errors have occurred - aborting', styles: { fontWeight: 'bold', color: 'red' } }).inject(crossInspectDialog);
		new Element('div', { html: '(you could try again with the offending challenge removed from your selection)' }).inject(crossInspectDialog);
		return;
	}
	// challenge numbering
	new Element('img', {
		src: images.down,
		id: 'UCPANG-cross-inspect-challenge-numbering',
		title: 'click to ' + checkLabels.numbering.label + ', using RegExp ',
		alt: checkLabels.numbering.value,
		'class': 'UCPANG-collapsed',
		styles: {
			cursor: 'pointer'
		},
		events: {
			click: function (evt) {
				var detail = $('UCPANG-cross-inspect-challenge-numbering-detail');
				if (this.hasClass('UCPANG-collapsed')) {
					this.set('class', 'UCPANG-expanded');
					this.set('src', images.up);
					var regExp = $('UCPANG-cross-inspect-challenge-numbering-regexp').value;
					detail.removeClass('hidden_from_view');
					if (!$chk(regExp)) {
						new Element('label', {
							html: 'can not check without a regular expression',
							styles: {
								color: 'red'
							}
						}).inject(detail);
						return;
					}
					var numberingRegExp = new RegExp(regExp);
					if (!$chk(numberingRegExp)) {
						new Element('label', {
							html: 'invalid regular expression',
							styles: {
								color: 'red'
							}
						}).inject(detail);
						return;
					}
					var list = new Element('p', { styles: { 'margin-left': '20px' } }).inject(detail);
					var lastNumber = -1;
					var missingNumbers = [];
					var irrelevantThreads = [];
					var nonChallengeThreads = [];
					var invalidFormatThreads = [];
					var invalidStateThreads = [];
					ucpThreads.filter(function (ucpThread) {
						if (ucpThread instanceof UCPNonChallengeThread) {
							ucpThread.resetStatus();
							nonChallengeThreads.push(ucpThread);
							return false;
						}
						if (ucpThread instanceof UCPChallengeThread) {
							ucpThread.checkStatus();
							switch(ucpThread.challengeStatus()) {
        							case "UPDATING":
            							case "none":
            							case "Unknown":
									invalidStateThreads.push(ucpThread);
									return false;

								case "Closed":
								case "Voided":
								case "Expired":
									irrelevantThreads.push(ucpThread);
									return false;
    
								case "Open":
								case "Filled":
								case "Finished":
								case "--VOTE--":
									if (!ucpThread.challengeName().match(numberingRegExp)) {
										invalidFormatThreads.push(ucpThread);
										return false;
									}
									return true;
							}	
						} else { // instanceof UCPUnknownThread
							invalidFormatThreads.push(ucpThread);
							return false;
						}
						return ucpThread.challengeName().match(numberingRegExp);
					}).sort(function (thread1, thread2) {
						var name1 = thread1.challengeName();
						var name2 = thread2.challengeName();
						var number1 = numberingRegExp.exec(name1)[1];
						var number2 = numberingRegExp.exec(name2)[1];
						if (!isNaN(number1) && !isNaN(number2)) {
							try {
								return parseInt(number1, 10) - parseInt(number2, 10);
							} catch (e) {
								// ignore: sort alphabetically
							}
						}
						return name1 < name2 ? -1 : (name2 < name1 ? 1 : 0);
					}).each(function (ucpThread) {
						var color = '';
						var challengeNumber = parseInt(numberingRegExp.exec(ucpThread.challengeName())[1], 10);
						ucpThread.checkStatus();
						if (lastNumber == -1) { // first one to process
							lastNumber = challengeNumber - 1; // begin with the lowest
						}
						if (challengeNumber <= lastNumber) color = 'red';
						if (challengeNumber > lastNumber + 1) { // numbers missing ?
							if (challengeNumber == lastNumber + 2) { missingNumbers.push(lastNumber + 1); }
							else { missingNumbers.push((lastNumber + 1) + '-' + (challengeNumber - 1)); }
						}
						new Element('a', {
							href: ucpThread.url(),
							html: ucpThread.challengeName(),
							target: '_blank',
							styles: {
								color: color
							}
						}).inject(new Element('span', { styles: { display: 'block' } }).inject(list));
						lastNumber = challengeNumber;
					});
					if (missingNumbers.length > 0) {
						new Element('div', { 
							html: '&emsp;possibly missing: ' + missingNumbers, 
							styles: { 
								color: 'red',
								fontWeight: 'bold'
							}
						}).inject(detail);
						new Element('p').inject(detail);
					}

					[ { threads: invalidFormatThreads, title: 'non-matching threads:' ,                      color: 'red', status: false, element: detail },
					  { threads: nonChallengeThreads , title: 'non-challenge threads (chat, showroom, ..):', color: '',    status: true,  element: detail },
					  { threads: invalidStateThreads , title: 'invalid states:',                             color: 'red', status: true,  element: detail },
					  { threads: irrelevantThreads   , title: 'irrelevant threads (closed, voided, ..):',    color: '',    status: true,  element: detail }].each(function (nmt) {
						printThreadList(nmt);
					});
				} else {
					this.set('class', 'UCPANG-collapsed');
					this.set('src', images.down);
					detail.empty();
					detail.addClass('hidden_from_view');
				}
			}
		}
	}).inject(crossInspectDialog);
	new Element('label', {
		id: 'UCPANG-cross-inspect-challenge-numbering-label',
		html: ' ' + checkLabels.numbering.label + ' ',
		title: 'click to ' + checkLabels.numbering.label,
		styles: {
			cursor: 'pointer'
		},
		events: {
			click: function (evt) {
				$('UCPANG-cross-inspect-challenge-numbering').fireEvent('click');
			}
		}
	}).inject(crossInspectDialog);
	new Element('input', {
		id: 'UCPANG-cross-inspect-challenge-numbering-regexp',
		value: groupConfig.challengeNumberingRegExp(),
		disabled: true,
		'class': 'UCPANG-disabled'
	}).inject(crossInspectDialog);
	new Element('span', { html: ' ' }).inject(crossInspectDialog);
	new Element('img', {
		src: images.edit,
		title: 'click to edit regular expression',
		styles: {
			cursor: 'pointer',
			height: '14px'
		},
		events: {
			click: function (evt) {
				var input = $('UCPANG-cross-inspect-challenge-numbering-regexp');
				var toEditmode = input.hasClass('UCPANG-disabled');
				input.set('class', toEditmode ? 'UCPANG-enabled' : 'UCPANG-disabled');
				input.set('disabled', !toEditmode);
				this.set('src', toEditmode ? images.save : images.edit);
				this.set('title', 'click ' + ( toEditmode ? 'to save' : 'to edit' ) + ' this regular expression');
				// save?
				if (!toEditmode) { // clicked save
					GM_setValue('UCPA.CrossCheckChallengeNumberingRegExp.' + groupConfig.groupname(), input.value);
					if (input.value == groupConfig.options.challengeNumberingRegExp || input.value.length == 0) {
						GM_deleteValue('UCPA.CrossCheckChallengeNumberingRegExp');
					}
					$('UCPANG-cross-inspect-challenge-numbering-reset-button').fireEvent('check-default');
				}
			}
		}
	}).inject(crossInspectDialog);
	new Element('span', { html: ' ' }).inject(crossInspectDialog);
	var challengeNumberingButton = new Element('img', {
		src: images.reload,
		id: 'UCPANG-cross-inspect-challenge-numbering-reset-button',
		styles: {
			cursor: 'pointer',
			height: '14px'
		},
		events: {
			click: function (evt) {
				GM_deleteValue('UCPA.CrossCheckChallengeNumberingRegExp.' + groupConfig.groupname());
				$('UCPANG-cross-inspect-challenge-numbering-regexp').set('value', groupConfig.challengeNumberingRegExp());
				this.fireEvent('check-default');
			},
			'check-default': function (evt) {
				var groupValue = groupConfig.options.challengeNumberingRegExp;
				if (!$chk(groupValue) || groupValue.length == 0) {
					this.setStyles({ opacity: 0.3 });
					this.set('title', 'default value not configured (yet) for this group');
				} else {
					var currentValue = $('UCPANG-cross-inspect-challenge-numbering-regexp').get('value');
					if (currentValue == groupValue) {
						this.setStyles({ opacity: 0.3, cursor: '' });
						this.set('title', 'using group\'s default value');
					} else {
						this.setStyles({ opacity: 1.0, cursor: 'pointer' });
						this.set('title', 'reset to group\'s default value');
					}
				}
			}
		}
	}).inject(crossInspectDialog);
	challengeNumberingButton.fireEvent('check-default');
	new Element('span', { html: ' ' }).inject(crossInspectDialog);
	new Element('img', {
		src: images.info,
		styles: {
			cursor: 'pointer',
			height: '14px'
		}
	}).inject(new Element('a', {
		href: 'http://www.flickr.com/groups/unified_checkplay/discuss/72157623759768824/#cross-inspect-challenge-numbering',
		target: '_blank',
		title: 'click to get more information',
		styles: {
			backgroundColor: 'transparent'
		}
	}).inject(crossInspectDialog));
	new Element('div', {
		id: 'UCPANG-cross-inspect-challenge-numbering-detail',
		'class': 'hidden_from_view'
	}).inject(crossInspectDialog);
	new Element('br').inject(crossInspectDialog);

	// similar themes
	if ($chk(groupConfig.similarThemesRegExp())) {
	    new Element('img', {
		src: images.down,
		id: 'UCPANG-cross-inspect-similar-themes',
		title: 'click to ' + checkLabels.similarThemes.label,
		alt: checkLabels.similarThemes.value,
		'class': 'UCPANG-collapsed',
		styles: {
			cursor: 'pointer'
		},
		events: {
			click: function (evt) {
				var detail = $('UCPANG-cross-inspect-similar-themes-detail');
				if (this.hasClass('UCPANG-collapsed')) {
					this.set('class', 'UCPANG-expanded');
					this.set('src', images.up);
					var regExp = $('UCPANG-cross-inspect-similar-themes-regexp').value;
					detail.removeClass('hidden_from_view');
					if (!$chk(regExp)) {
						new Element('label', {
							html: 'can not check without a regular expression',
							styles: {
								color: 'red'
							}
						}).inject(detail);
						return;
					}
					var similarThemesRegExp = new RegExp(groupConfig.similarThemesRegExp());
					//similarThemesRegExp.compile(groupConfig.similarThemesRegExp());
					//GM_log("DEBUG: compiled='" + similarThemesRegExp + "'");
					if (!$chk(similarThemesRegExp)) {
						new Element('label', {
							html: 'invalid regular expression',
							styles: {
								color: 'red'
							}
						}).inject(detail);
						return;
					}
					var similarThreads = [];
					var skippedThreads = [];
					var nonChallengeThreads = [];
					var nonMatchingThreads = [];
					ucpThreads.filter(function (ucpThread) { // only check threads that are OPEN or VOTE
						if (!(ucpThread instanceof UCPChallengeThread)) {
							ucpThread.resetStatus();
							nonChallengeThreads.push(ucpThread);
							return false;
						}
						ucpThread.checkStatus();
						switch(ucpThread.challengeStatus()) {
							case "Open":
							case "Filled":
							case "--VOTE--":
								if (ucpThread.challengeName().match(similarThemesRegExp)) {
									return true;
								} else {
									nonMatchingThreads.push(ucpThread);
									return false;
								}
							default:
								skippedThreads.push(ucpThread);
								return false; // ignore [Finished] ones too
						}
					}).each(function (ucpThread) {
						var foundMatch = false;
						var ucpTheme = normalizeTheme(ucpThread.challengeName().match(similarThemesRegExp)[1]);
						similarThreads.each(function (similarCollection) {
							if (foundMatch) return;
							similarCollection.each(function (scannedThread) {
								if (foundMatch) return;
								var scannedTheme = normalizeTheme(scannedThread.challengeName().match(similarThemesRegExp)[1]);
								if (scannedTheme == ucpTheme) {
									foundMatch = true;
									return;
								}
								if (scannedTheme.length > 6 && ucpTheme.length > 6 &&
								    levenshtein(scannedTheme, ucpTheme) < 5) {
									foundMatch = true;
									return;
								}
								if (scannedTheme.length > 0 && ucpTheme > 0) { // empty string is part of any other string
									if (scannedTheme.indexOf(ucpTheme) != -1) { // part of
										foundMatch = true;
									}
									if (ucpTheme.indexOf(scannedTheme) != -1) { // part of
										foundMatch = true;
									}
								}
							});
							if (foundMatch) similarCollection.push(ucpThread);
						});
						if (!foundMatch) { // no similar one found
							similarThreads.push([ ucpThread ]); // store it in its own slot
						}
					});
					var similarityList = new Element('p').inject(detail);
					var uniqueThemeThreads = [];
					if (similarThreads.length > 0 && 
						similarThreads.length + nonChallengeThreads.length + skippedThreads.length + nonMatchingThreads.length != ucpThreads.length) { // => at least one entry in similarThreads contains 2 or more threads
						similarThreads.each(function (similarCollection) {
							if (similarCollection.length > 1) {
								var item = new Element('span', {
									html: 'similar to <i>' + similarCollection[0].challengeName().match(similarThemesRegExp)[1] + '</i>:',
									styles: {
										'margin-left': '20px',
										display: 'block'
									}
								}).inject(similarityList);
								var itemList = new Element('p').inject(item);
								similarCollection.sort(function (thread1, thread2) {
									var name1 = thread1.challengeName();
									var name2 = thread2.challengeName();
									return name1 < name2 ? -1 : (name2 < name1 ? 1 : 0);
								}).each(function(similarThread) {
									new Element('a', {
										html: similarThread.challengeName(),
										href: similarThread.topic(),
										target: '_blank'
									}).inject(new Element('span', { styles: { display: 'block', 'margin-left': '20px'} }).inject(itemList));
								});
							} else {
								uniqueThemeThreads.push(similarCollection[0]);
							}
						});
					}
					if (!$chk(similarityList.getElement('span'))) {
						new Element('span', { html: 'no similar themes found', styles: { 'margin-left': '20px' } }).inject(similarityList);
						uniqueThemeThreads = similarThreads.map(function (similarCollection) {
							return similarCollection[0];
						});
					}

					[{ threads: nonChallengeThreads, title: 'non-challenge threads (chat, showroom, ..):', color: '',      element: similarityList },
					 { threads: skippedThreads,      title: 'irrelevant threads (closed, voided, ..):',    color: '',      element: similarityList }, 
					 { threads: uniqueThemeThreads,  title: 'unique theme threads:',                       color: '',      element: similarityList },
					 { threads: nonMatchingThreads,  title: 'non-matching threads:',                       color: 'brown', element: similarityList }].each(function (th) {
						printThreadList(th);
					});
				} else {
					this.set('class', 'UCPANG-collapsed');
					this.set('src', images.down);
					detail.empty();
					detail.addClass('hidden_from_view');
				}
			}
		}
	    }).inject(crossInspectDialog);
	    new Element('label', {
		id: 'UCPANG-cross-inspect-similar-themes-label',
		html: ' ' + checkLabels.similarThemes.label + ' ',
		title: 'click to ' + checkLabels.similarThemes.label,
		styles: {
			cursor: 'pointer'
		},
		events: {
			click: function (evt) {
				$('UCPANG-cross-inspect-similar-themes').fireEvent('click');
			}
		}
	    }).inject(crossInspectDialog);
	    new Element('input', {
		id: 'UCPANG-cross-inspect-similar-themes-regexp',
		value: groupConfig.similarThemesRegExp(),
		'class': 'UCPANG-disabled',
		disabled: true
	    }).inject(crossInspectDialog);
	    new Element('span', { html: ' ' }).inject(crossInspectDialog);
	    new Element('img', {
		src: images.edit,
		title: 'click to edit regular expression',
		styles: {
			cursor: 'pointer',
			height: '14px'
		},
		events: {
			click: function (evt) {
				var input = $('UCPANG-cross-inspect-similar-themes-regexp');
				var toEditmode = input.hasClass('UCPANG-disabled');
				input.set('class', toEditmode ? 'UCPANG-enabled' : 'UCPANG-disabled');
				input.set('disabled', !toEditmode);
				this.set('src', toEditmode ? images.save : images.edit);
				this.set('title', 'click ' + ( toEditmode ? 'to save' : 'to edit' ) + ' regular expression');
				// save?
				if (!toEditmode) { // clicked save
					GM_setValue('UCPA.CrossCheckSimilarThemesRegExp.' + groupConfig.groupname(), input.value);
					if (input.value == groupConfig.options.similarThemesRegExp || input.value.length == 0) {
						GM_deleteValue('UCPA.CrossCheckSimilarThemesRegExp');
					}
					$('UCPANG-cross-inspect-similar-themes-reset-button').fireEvent('check-default');
				}
			}
		}
	    }).inject(crossInspectDialog);
	    new Element('span', { html: ' ' }).inject(crossInspectDialog);
	    var similarThemesResetButton = new Element('img', {
		src: images.reload,
		id: 'UCPANG-cross-inspect-similar-themes-reset-button',
		styles: {
			cursor: 'pointer',
			height: '14px'
		},
		events: {
			click: function (evt) {
				GM_deleteValue('UCPA.CrossCheckSimilarThemesRegExp.' + groupConfig.groupname());
				$('UCPANG-cross-inspect-similar-themes-regexp').set('value', groupConfig.similarThemesRegExp());
				this.fireEvent('check-default');
			},
			'check-default': function (evt) {
				var groupValue = groupConfig.options.similarThemesRegExp;
				if (!$chk(groupValue) || groupValue.length == 0) {
					this.setStyles({ opacity: 0.3 });
					this.set('title', 'default value not configured (yet) for this group');
				} else {
					var currentValue = $('UCPANG-cross-inspect-similar-themes-regexp').get('value');
					if (currentValue == groupValue) {
						this.setStyles({ opacity: 0.3, cursor: '' });
						this.set('title', 'using group\'s default value');
					} else {
						this.setStyles({ opacity: 1.0, cursor: 'pointer' });
						this.set('title', 'reset to group\'s default value');
					}
				}
			}
		}
	    }).inject(crossInspectDialog);
	    similarThemesResetButton.fireEvent('check-default');
	    new Element('span', { html: ' ' }).inject(crossInspectDialog);
	    new Element('img', {
		src: images.info,
		styles: {
			cursor: 'pointer',
			height: '14px'
		}
	    }).inject(new Element('a', {
		href: 'http://www.flickr.com/groups/unified_checkplay/discuss/72157623759768824/#cross-inspect-similar-themes',
		target: '_blank',
		title: 'click to get more information',
		styles: {
			backgroundColor: 'transparent'
		}
	    }).inject(crossInspectDialog));
	    new Element('span', {
	    	html: ' (themes are considered \'similar\' when their spelling is similar, not their meaning)',
		styles: {
			fontStyle: 'italic'
		}
	    }).inject(crossInspectDialog);
	    new Element('div', {
		id: 'UCPANG-cross-inspect-similar-themes-detail',
		'class': 'hidden_from_view'
	    }).inject(crossInspectDialog);
	    new Element('br').inject(crossInspectDialog);
	} // if similarThemesExpression

function setLength(set) {
	var length = 0;
	for (var t in set) {
		if (set.hasOwnProperty(t)) {
			++length;
		}
	}
	return length;
}

	// count player entries
	new Element('img', { 
		src: images.down, 
		id: 'UCPANG-cross-inspect-playerentry-count',
		title: 'click to ' + checkLabels.playerEntries.label,
		alt: checkLabels.playerEntries.value,
		'class': 'UCPANG-collapsed',
		styles: {
			cursor: 'pointer'
		},
		events: {
			click: function (evt) {
				var detail = $('UCPANG-cross-inspect-player-entry-detail');
				if (this.hasClass('UCPANG-collapsed')) {
					this.set('class', 'UCPANG-expanded');
					this.set('src', images.up);
					detail.removeClass('hidden_from_view');
					var playerEntryCount = new Hash();
					ucpThreads.filter(function (ucpThread) {
						if (groupConfig.skipChallenge(ucpThread.challengeName())) {
							return false;
						}
						if (ucpThread instanceof UCPNonChallengeThread) {
							return false;
						}
						ucpThread.checkStatus();
						if (ucpThread.challengeStatus().match(/Finished/)) {
							return false;
						}
						switch (ucpThread.challengeStatus()) {
							case "Closed":
							case "Voided":
							case "Expired":
								return false;
							default:
								return true;
						}
					}).each( function (ucpThread) {
						ucpThread.photos().each( function (competitor) {
							var playerentries = playerEntryCount.get(competitor.poster().userid);
							if (!$chk(playerentries)) {
								playerentries = { username: competitor.poster().username, challenges: new Hash() };
								playerEntryCount.set(competitor.poster().userid, playerentries);
							}
							if (!playerentries.challenges.has(ucpThread.topic())) {
								playerentries.challenges.set(ucpThread.topic(), ucpThread);
							}
						});
					});
					var threshold = 0;
					if ($('UCPANG-cross-inspect-player-entry-threshold-check').checked) {
						threshold = $('UCPANG-cross-inspect-player-entry-threshold').value;
						if (!$chk(threshold) || isNaN(threshold)) {
							threshold = 0;
						}
					}
					var expandAll = new Element('div', {
						html: '&emsp;&emsp;<u>click to expand all</u> ',
						'class': 'UCPANG-collapsed hidden_from_view',
						styles: {
							cursor: 'pointer',
							fontStyle: 'italic'
						},
						events: {
							click: function(evt) {
								this.getParent().getElement('p').getElements('img.UCPANG-collapsed').each( function (img) {
									img.fireEvent('click');
								});
								this.addClass('hidden_from_view');
							}
						}
					}).inject(detail);
					var playerList = new Element('p').inject(detail);
					playerEntryCount.getValues().sort(function (value1, value2) {
						return value2.challenges.getLength() - value1.challenges.getLength();
					}).each(function (value) {
						if (value.challenges.getLength() > threshold) {
							expandAll.removeClass('hidden_from_view');
							printThreadList({ threads: value.challenges.getValues(), title: 'entries by <b>' + value.username + '</b> in the selected challenges ', color: '', entriesBold: true, element: playerList});
						}
					});
					if (playerList.getChildren().length == 0) {
						playerList.destroy();
						new Element('label', { html: '--none found--' }).inject(detail);
					}
				} else {
					this.set('class', 'UCPANG-collapsed');
					this.set('src', images.down);
					detail.empty();
					detail.addClass('hidden_from_view');
				}
			}
		} 
	}).inject(crossInspectDialog);
	new Element('label', {
		id: 'UCPANG-cross-inspect-playerentry-label',
		html: ' ' + checkLabels.playerEntries.label + ' ',
		title: 'click to ' + checkLabels.playerEntries.label,
		styles: {
			cursor: 'pointer'
		},
		events: {
			click: function (evt) {
				$('UCPANG-cross-inspect-playerentry-count').fireEvent('click');
			}
		}
	}).inject(crossInspectDialog);
	// threshold
	new Element('label', { html: ' (' }).inject(crossInspectDialog);
	var usedThresholdLastInvocation = GM_getValue('UCPA.CrossCheckUsedPlayerEntryThreshold.' + groupConfig.groupname());
	usedThresholdLastInvocation = usedThresholdLastInvocation === true || usedThresholdLastInvocation === 'true';
	new Element('input', {
		type: 'checkbox',
		id: 'UCPANG-cross-inspect-player-entry-threshold-check',
		checked: usedThresholdLastInvocation,
		events: {
			change: function (evt) {
				GM_setValue('UCPA.CrossCheckUsedPlayerEntryThreshold.' + groupConfig.groupname(), this.checked);
			}
		}
	}).inject(crossInspectDialog);
	new Element('label', {
		'for': 'UCPANG-cross-inspect-player-entry-threshold-check',
		html: 'only show players with more than '
	}).inject(crossInspectDialog);
	new Element('input', {
		type: 'number',
		min: 1,
		id: 'UCPANG-cross-inspect-player-entry-threshold',
		value: GM_getValue('UCPA.CrossCheckPlayerEntryThreshold.' + groupConfig.groupname()),
		styles: {
			width: '35px'//,
			// height: 15px,
			//font-size: 9px;
		},
		events: {
			change: function (evt) {
				GM_setValue('UCPA.CrossCheckPlayerEntryThreshold.' + groupConfig.groupname(), this.value);
			}
		}
	}).inject(crossInspectDialog);
	new Element('label', {
		html: ' entries)'
	}).inject(crossInspectDialog);
	if ($chk(groupConfig.groupLimit()) && groupConfig.groupLimit() > 0) {
		new Element('span', { 
			html: ' -- (this check does not (yet) warn for group limit violations)',
			styles: {
				fontStyle: 'italic'
			}
		}).inject(crossInspectDialog);
	}
	new Element('span', { html: ' ' }).inject(crossInspectDialog);
	new Element('img', {
		src: images.info,
		styles: {
			cursor: 'pointer',
			height: '14px'
		}
	}).inject(new Element('a', {
		href: 'http://www.flickr.com/groups/unified_checkplay/discuss/72157623759768824/#cross-inspect-count-player-entries',
		target: '_blank',
		title: 'click to get more information',
		styles: {
			backgroundColor: 'transparent'
		}
	}).inject(crossInspectDialog));
	new Element('div', {
		id: 'UCPANG-cross-inspect-player-entry-detail',
		'class': 'hidden_from_view'
	}).inject(crossInspectDialog);
	new Element('br').inject(crossInspectDialog);
	// double entries
	new Element('img', {
                src: images.down,
                id: 'UCPANG-cross-inspect-photo-count',
                title: 'click to ' + checkLabels.multiChallenge.label,
		alt: checkLabels.multiChallenge.value,
                'class': 'UCPANG-collapsed',
		styles: {
			cursor: 'pointer'
		},
                events: {
			click: function (evt) {
				var detail = $('UCPANG-cross-inspect-photo-count-detail');
				if (this.hasClass('UCPANG-collapsed')) {
					this.set('class', 'UCPANG-expanded');
					this.set('src', images.up);
					detail.removeClass('hidden_from_view');
					var photoEntryCount = new Hash();
					ucpThreads.filter(function (ucpThread) {
						if (groupConfig.skipChallenge(ucpThread.challengeName())) {
							return false;
						}
						if (ucpThread instanceof UCPNonChallengeThread) {
							return false;
						}
						ucpThread.checkStatus();
						if (ucpThread.challengeStatus().match(/Finished/)) {
							return false;
						}
						switch (ucpThread.challengeStatus()) {
							case "Closed":
							case "Voided":
							case "Expired":
								return false;
							default:
								return true;
						}
					}).each( function (ucpThread) {
						ucpThread.photos().each( function (competitor) {
							var photoentries = photoEntryCount.get(competitor.photoId());
							if (!$chk(photoentries)) {
								photoentries = { username: competitor.poster().username, photoId: competitor.photoId(), title: competitor.photoTitle(), challenges: [] };
								photoEntryCount.set(competitor.photoId(), photoentries);
							}
							if (!photoentries.challenges.some(function (challenge) {
									return challenge.topic() == ucpThread.topic();
								})) {
								photoentries.challenges.push(ucpThread);
							}
						});
					});
					var threshold = 2;
					var multiPhotos = photoEntryCount.getValues().sort(function (value1, value2) {
						return value2.challenges.length - value1.challenges.length;
					}).filter(function (photoEntry) {
						return photoEntry.challenges.length > 1;
					});
					if (multiPhotos.length > 0) {
						var list = new Element('p', { styles: { 'margin-left': '20px' } }).inject(detail);
						multiPhotos.each(function (value) {
							var info = new Element('span', { styles: { display: 'block' } }).inject(list);
							new Element('label', {
								html: 'photo <b>' + value.title + '</b> (id: ' + value.photoId + ', poster: ' + value.username + ') has been entered in <b>' + value.challenges.length + '</b> of the selected challenges ',
								'class': 'UCPANG-collapsed',
								events: {
									click: function (evt) {
										if (this.hasClass('UCPANG-collapsed')) {
											this.set('class', 'UCPANG-expanded');
											this.getParent('p').getElement('img').dispose();
											var threadList = new Element('span', {
												styles: {
													display: 'block',
													'margin-left': '20px'
												}
											}).inject(info);
											value.challenges.each(function (challenge) {
												new Element('a', {
													href: challenge.url(),
													html: challenge.challengeName(),
													target: '_blank',
													events: {
														click: function (evt) {
															$(evt).stopPropagation();
														}
													}
												}).inject(new Element('span', { styles: { display: 'block' } }).inject(threadList));
											});
										}
									}
								},
								styles: { 
									cursor: 'pointer'
								}
							}).inject(info);
							new Element('img', {
								src: images.down,
								events: {
									click: function (evt) {
										this.getParent().getElement('label').fireEvent('click');
									}
								},
								styles: { 
									cursor: 'pointer'
								}
							}).inject(info);
						});
					} else {
						new Element('span', { html: '--none found--' }).inject(detail);
					}
				} else {
					this.set('class', 'UCPANG-collapsed');
					this.set('src', images.down);
					detail.empty();
					detail.addClass('hidden_from_view');
				}
			}
		}
	}).inject(crossInspectDialog);
	new Element('label', {
		html: ' ' + checkLabels.multiChallenge.label,
		title: 'click to ' + checkLabels.multiChallenge.label,
		styles: {
			cursor: 'pointer'
		},
		events: {
			click: function (evt) {
				$('UCPANG-cross-inspect-photo-count').fireEvent('click');
			}
		}
	}).inject(crossInspectDialog);
	new Element('span', { html: ' ' }).inject(crossInspectDialog);
	new Element('img', {
		src: images.info,
		styles: {
			cursor: 'pointer',
			height: '14px'
		}
	}).inject(new Element('a', {
		href: 'http://www.flickr.com/groups/unified_checkplay/discuss/72157623759768824/#cross-inspect-duplicates',
		target: '_blank',
		title: 'click to get more information',
		styles: {
			backgroundColor: 'transparent'
		}
	}).inject(crossInspectDialog));
	new Element('div', {
		id: 'UCPANG-cross-inspect-photo-count-detail',
		'class': 'hidden_from_view'
	}).inject(crossInspectDialog);
	new Element('br').inject(crossInspectDialog);
	// check for non-voters
	new Element('img', {
                src: images.down,
                id: 'UCPANG-cross-inspect-non-voters',
                title: 'click to ' + checkLabels.nonVoters.label,
		alt: checkLabels.nonVoters.value,
                'class': 'UCPANG-collapsed',
		styles: {
			cursor: 'pointer'
		},
                events: {
			click: function (evt) {
				var detail = $('UCPANG-cross-inspect-non-voters-detail');
				if (!this.hasClass('UCPANG-collapsed')) {
					this.set('class', 'UCPANG-collapsed');
					this.set('src', images.down);
					detail.empty();
					detail.addClass('hidden_from_view');
					return;
				}
				this.set('class', 'UCPANG-expanded');
				this.set('src', images.up);
				detail.removeClass('hidden_from_view');
				new Element('img', { src: updatingIcon }).inject(detail);
				new Element('span', { html: ' processing..' }).inject(detail);
				// we only need to check the OPEN challenges: VOTE challenges have been approved, and should have been checked
				// => not all admods use the script => also check VOTE challenges
				var voteThreads = [];
				var openThreads = ucpThreads.filter(function (ucpThread) {
					if (groupConfig.skipChallenge(ucpThread.challengeName())) {
						return false;
					}
					if (ucpThread instanceof UCPNonChallengeThread) {
						return false;
					}
					ucpThread.checkStatus();
					if (ucpThread.challengeStatus().match(/Finished/)) {
						return false;
					}
					if (ucpThread.challengeStatus().match('--VOTE--')) {
						//if (!ucpThread.finished()) {
							voteThreads.push(ucpThread);
						//}
						return false;
					}
					return true;
				});
				// a player that plays in another challenge, or has voted in that other challenge, need not be checked
				var nonVoters = new Hash();
				var votedThreads = new Hash();
				var playerThreads = new Hash();
				[openThreads,voteThreads].each(function (challengeThreads) {
				    challengeThreads.each(function (challengeThread) {
					challengeThread.photos().filter(function (competitor) {
						var posterId = competitor.poster().userid;
						var nonVotedThreads = voteThreads.filter(function (voteThread) {
							var isCompetitorInThread = voteThread.photos().some(function (competitor) { return competitor.poster().userid == posterId; });
							var isVoterInThread = voteThread.votes().some(function (vote) { return vote.poster().userid == posterId; });
							if (isVoterInThread) {
								var votedTopics = votedThreads.get(posterId);
								if (!$chk(votedTopics)) {
									votedTopics = {}; // implement as a set
									votedThreads.set(posterId, votedTopics);
								}
								votedTopics[ voteThread.topic() ] = true;
							}
							if (isCompetitorInThread) {
								var competitorTopics = playerThreads.get(posterId);
								if (!$chk(competitorTopics)) {
									competitorTopics = {}; // implement as a set
									playerThreads.set(posterId, competitorTopics);
								}
								competitorTopics[ voteThread.topic() ] = true;
							}
							return !isCompetitorInThread && !isVoterInThread
						});
						if (nonVotedThreads.length > 0) {
							var entries = nonVoters.get(posterId);
							if (!$chk(entries)) {
								entries = [];
								nonVoters.set(posterId, entries);
							}
							entries.push({ photo: competitor, nonVotedThreads: nonVotedThreads });
						}
					});
				    });
				});
				detail.empty();
				if (nonVoters.getLength() == 0) {
					new Element('span', { html: '--none found--' }).inject(detail);
				} else {
					try {
						var threshold = parseInt($('UCPANG-cross-inspect-non-voters-threshold').value, 10);
					} catch (e) {
						threshold = 0;
					}
					
					if (threshold <= 0 || isNaN(threshold)) {
						new Element('div', {
							html: '--no check with empty or invalid threshold--',
							styles: {
								color: 'red'
							}
						}).inject(detail);
						return;
					}
					var beyondThreshold = new Hash();
					var withinThreshold = new Hash();
					var undecidedList = new Hash();
					nonVoters.getKeys().each(function (posterId) {
						nonVoters.get(posterId).each(function (nonVoter) {
							var postedTime = new Date(nonVoter.photo.datecreated() * 1000);
							var timeByWhichToVote = new Date(postedTime.getTime() + threshold * 60 * 1000);
							var beyondThresholdForPhoto = [];
							var withinThresholdForPhoto = [];
							var undecidedListForPhoto = [];
							nonVoter.nonVotedThreads.each( function (nonVotedThread) {
								var votingTime = nonVotedThread.lastedit();
								try { // try to compare
									var votingTimeNumber = parseInt(votingTime, 10);
									var timeOfVotingStart = new Date();
									if (votingTime.match('second')) {
										timeOfVotingStart.setSeconds(timeOfVotingStart.getSeconds() - votingTimeNumber);
									} else if (votingTime.match('minute')) {
										timeOfVotingStart.setMinutes(timeOfVotingStart.getMinutes() - votingTimeNumber);
									} else if (votingTime.match('hour')) {
										// flickr will round 90 minutes into 2 hours, 2h30 to 3 hours
										timeOfVotingStart.setHours(timeOfVotingStart.getHours() - votingTimeNumber);
										timeOfVotingStart.setMinutes(timeOfVotingStart.getMinutes() + 30);
									} else if (votingTime.match('day')) {
										timeOfVotingStart.setHours(timeOfVotingStart.getHours() - votingTimeNumber * 24);
										timeOfVotingStart.setHours(timeOfVotingStart.getHours() + 12);
									} else if (votingTime.match('week')) {
										// 12d20h = 2 weeks
										timeOfVotingStart.setHours(timeOfVotingStart.getHours() - votingTimeNumber * 7 * 24);
										timeOfVotingStart.setHours(timeOfVotingStart.getHours() + 4 * 24); // probably does not matter much
									} else if (votingTime.match('month')) timeOfVotingStart.setHours( timeOfVotingStart.getHours() - votingTimeNumber * 30 * 24);
									if (postedTime < timeOfVotingStart) {
										return;
									}
									if (timeByWhichToVote.getTime() > (new Date()).getTime()) {
										withinThresholdForPhoto.push({ nonVotedThread: nonVotedThread, votingTime: votingTime });
									} else {
										beyondThresholdForPhoto.push({ nonVotedThread: nonVotedThread, votingTime: votingTime });
									}
								} catch (e) {
									GM_log("DEBUG: error converting: " + e);
									undecidedListForPhoto.push({ nonVotedThread: nonVotedThread, postedTime: postedTime, votingTime: votingTime });
								}
							});
							[ { globalList: beyondThreshold, localList: beyondThresholdForPhoto },
							  { globalList: withinThreshold, localList: withinThresholdForPhoto },
							  { globalList: undecidedList, localList: undecidedListForPhoto }].each (function (data) {
								if (data.localList.length > 0) {
									var userEntry = data.globalList.get(nonVoter.photo.poster().userid);
									if (!$chk(userEntry)) {
										userEntry = { photos: [], nonVotedThreads: [] };
										data.globalList.set(nonVoter.photo.poster().userid, userEntry);
									}
									userEntry.photos.push({ photo: nonVoter.photo, postedTime: postedTime });
									userEntry.nonVotedThreads = data.localList; // they are the same for every photo
								}
							});
						});
					});
					[ { thresholdList: beyondThreshold, label: 'Passed the given threshold:', exact: true, severe: true  },
					  { thresholdList: withinThreshold, label: 'Still within the given threshold:', exact: true, severe: false },
					  { thresholdList: undecidedList, label: 'Failed calculating threshold:', exact: false, severe: false } ].each (function (th) {
						if (th.thresholdList.getLength() > 0) {
							new Element('span', {
								html: '&emsp;' + th.label,
								styles: {
									fontWeight: 'bold',
									color: th.severe ? 'red' : ''
								}
							}).inject(detail);
							var userList = new Element('p', { styles: { 'margin-left': '20px' } } ).inject(detail);
							th.thresholdList.getKeys().each(function (posterId) { // 'sorted' by user
								var userEntry = th.thresholdList.get(posterId);
									var photo = userEntry.photo;
									var postedTime = userEntry.postedTime;
									var nonVotedThreads = userEntry.nonVotedThreads;
								
								var userItem = new Element('span', {
									styles: {
										'margin-left': '20px',
										display: 'block'
									}
								}).inject(userList);
								new Element('label', {
									html: '<b>' + userEntry.photos[0].photo.poster().username + '</b> posted an entry '
								}).inject(userItem);
								var photoDetail = new Element('p', { styles: { 'margin-left': '20px' } }).inject(userItem);
								userEntry.photos.each(function (photo) {
									var postedTime = photo.postedTime;
									var competitor = photo.photo;
									var photoElement = new Element('span', { styles: { display: 'block' } }).inject(photoDetail);
									new Element('label', {
										html: timeAgo(Math.floor(postedTime.getTime() / 1000)) + ' in <i>'
									}).inject(photoElement);
									new Element('a', {
										href: competitor.ucpThread().url(),
										html: competitor.ucpThread().challengeName(),
										target: '_blank'
									}).inject(photoElement);
									new Element('label', {
										html: '</i>'
									}).inject(photoElement);
								});
								new Element('label', {
									html: 'but has ' + (th.exact ? '<u>' : 'probably ') + 'not' + (th.exact ? '</u>' : ' ') + ' (yet) voted in <i>',
									styles: {
										color: th.severe ? 'red' : ''
									}
								}).inject(userItem);

								var violation = new Element('p', { styles: { 'margin-left': '20px' } } ).inject(userItem);
								nonVotedThreads.each(function (nvt) {
									var votingTime = nvt.votingTime;
									var nonVotedThread = nvt.nonVotedThread;
									var nvtElement = new Element('span', { styles: { 'margin-left': '20px', display: 'block' } }).inject(violation);
									new Element('a', {
										href: nonVotedThread.url(),
										html: nonVotedThread.challengeName(),
										target: '_blank'
									}).inject(nvtElement);
									new Element('label', {
										html: '</i>'
									}).inject(nvtElement);
									new Element('label', {
										html: '&nbsp;which was presumably set to VOTE ' + votingTime
									}).inject(nvtElement);
								});
								var votedThreadsForPoster = votedThreads.get(posterId);
								if (!$chk(votedThreadsForPoster) || setLength(votedThreadsForPoster) <= 0) {
									new Element('div', {
										html: '=> has not voted in any other VOTE thread'
									}).inject(userItem);
								} else {
									new Element('div', {
										html: '=> but has voted in ' + setLength(votedThreadsForPoster) + ' other VOTE threads'
									}).inject(userItem);
								}
								var playerThreadsForPoster = playerThreads.get(posterId);
								if ($chk(playerThreadsForPoster) && setLength(playerThreadsForPoster) > 0) {
									new Element('div', {
										html: '=> plays in ' + setLength(playerThreadsForPoster) + ' VOTE threads'
									}).inject(userItem);
								}
								new Element('p').inject(userItem);
							});
						}
					});
					if (beyondThreshold.getLength() == 0 && withinThreshold.getLength() == 0 && undecidedList.getLength() == 0) {
						new Element('span', {
							html: '--no violators found--'
						}).inject(detail);
					}
				}
			}
		}
	}).inject(crossInspectDialog);
	new Element('label', {
		html: ' ' + checkLabels.nonVoters.label + ' (timeframe to vote in: ',
		title: 'click to ' + checkLabels.nonVoters.label,
		styles: {
			cursor: 'pointer'
		},
		events: {
			click: function (evt) {
				$('UCPANG-cross-inspect-non-voters').fireEvent('click');
			}
		}
	}).inject(crossInspectDialog);
	new Element('input', {
		type: 'number',
		min: 0,
		id: 'UCPANG-cross-inspect-non-voters-threshold',
		value: GM_getValue('UCPA.CrossCheckNonVotingThreshold.' + groupConfig.groupname()),
		styles: {
			width: '35px'
		},
		events: {
			change: function (evt) {
				if ($chk(this.value) && this.value.length > 0) {
					GM_setValue('UCPA.CrossCheckNonVotingThreshold.' + groupConfig.groupname(), this.value);
				} else {
					GM_deleteValue('UCPA.CrossCheckNonVotingThreshold.' + groupConfig.groupname());
				}
			}
		}
	}).inject(crossInspectDialog);
	new Element('label', {
		html: 'minutes)',
		events: {
			click: function (evt) {
				$('UCPANG-cross-inspect-non-voters').fireEvent('click');
			}
		}
	}).inject(crossInspectDialog);
	new Element('span', { html: ' ' }).inject(crossInspectDialog);
	new Element('img', {
		src: images.info,
		styles: {
			cursor: 'pointer',
			height: '14px'
		}
	}).inject(new Element('a', {
		href: 'http://www.flickr.com/groups/unified_checkplay/discuss/72157623759768824/#cross-inspect-non-voters',
		target: '_blank',
		title: 'click to get more information',
		styles: {
			backgroundColor: 'transparent'
		}
	}).inject(crossInspectDialog));
				
	new Element('div', {
		id: 'UCPANG-cross-inspect-non-voters-detail',
		'class': 'hidden_from_view'
	}).inject(crossInspectDialog);

	if (automode) { // click all buttons
		crossInspectDialog.getElements('img.UCPANG-collapsed').each(function (img) {
			if (img.get('alt').match('never')) return;
			img.fireEvent('click');
		});
	} else {
		crossInspectDialog.getElements('img.UCPANG-collapsed').each(function (img) {
			if (img.get('alt').match('always')) img.fireEvent('click');
		});
	}
    }

    function processTopicListingTable(topicListingTable) {
	new Element('br').inject(topicListingTable, 'before');
	topicListingHeaderRow = new Element('div', { styles: { clear: 'both', 'float': 'left' } }).inject(topicListingTable, 'before');
	challengeColumnHeader = topicListingHeaderRow;

        challengeColumnHeader.adopt(document.createTextNode(' | select '));
        var checkAllAnchor = challengeColumnHeader.adopt(new Element('a', {
                html: 'all',
                title: 'click to select all threads',
                styles: {
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                },
                events: {
                    'click': function () {
                        $$('input.UCPANG-thread').each(function (checkbox) {
                            checkbox.checked = true;
                        })
                    }
                }
            }));

    if (challengeGroup) {
        challengeColumnHeader.adopt(document.createTextNode('  '));
        var checkOpenAnchor = challengeColumnHeader.adopt(new Element('a', {
                html: 'open',
                title: 'click to select threads in \'open\' status',
                styles: {
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                },
                events: {
                    'click': function () {
                        $$('input.open-challenge').each(function (checkbox) {
                            checkbox.checked = true;
                        })
                    }
                }
            }));

        challengeColumnHeader.adopt(document.createTextNode('  '));
        var checkVoteAnchor = challengeColumnHeader.adopt(new Element('a', {
                html: 'vote',
                title: 'click to select threads in \'vote\' status',
                styles: {
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                },
                events: {
                    'click': function () {
                        $$('input.vote-challenge').each(function (checkbox) {
                            checkbox.checked = true;
                        })
                    }
                }
            }));

        challengeColumnHeader.adopt(document.createTextNode('  '));
        var checkNonClosedAnchor = challengeColumnHeader.adopt(new Element('a', {
                html: 'non-closed',
                title: 'click to select threads that are not closed',
                styles: {
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                },
                events: {
                    'click': function () {
                        $$('input.non-closed-challenge').each(function (checkbox) {
                            checkbox.checked = true;
                        })
                    }
                }
            }));

    }
        challengeColumnHeader.adopt(document.createTextNode(' | unselect '));
        var uncheckAllAnchor = challengeColumnHeader.adopt(new Element('a', {
                html: 'all',
                title: 'click to unselect all threads',
                styles: {
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                },
                events: {
                    'click': function () {
                        $$('input.UCPANG-thread').each(function (checkbox) {
                            checkbox.checked = false;
                        })
                    }
                }
            }));

        challengeColumnHeader.adopt(document.createTextNode('  '));
        challengeColumnHeader.adopt(new Element('button', {
	    id: 'UCPANG-make-sticky-button',
            'class': 'CancelButt',
            title: 'make selected threads sticky',
	    events: {
		click: function () {
			makeSticky($$('input.UCPANG-thread:checked'));
		},
		'start-updating': function (evt) {
			this.getElement('img').set('src', updatingIcon);
		},
		'done': function (evt) {
			this.getElement('img').set('src', images.sticky);
		}
	    }
        }).adopt(
            new Element('span', { html: ' ' }),
            new Element('img', { src: images.sticky, height: 14 }),
            new Element('span', { html: ' ' })
        ));
        challengeColumnHeader.adopt(document.createTextNode('  '));
        challengeColumnHeader.adopt(bumpButton = new Element('button', {
	    id: 'UCPANG-bump-button',
            'class': 'CancelButt',
            title: 'bump selected threads',
            events: {
                'click': function () {
		    if (!challengeGroup) {
		    	var bumpMessage = $('UCPANG-bump-message').get('value');
			groupConfig.storeBumpMessage(bumpMessage);
		    }
                    startBumping($$('input.UCPANG-thread:checked'));
                },
		'done': function (evt) {
			if ($$('img.queued[id^=UCPANG-bump-thread], img.queued[id^=UCPANG-fetch-old], img.queued[id^=UCPANG-bump-remove]').length > 0) {
				return;
			}
			if ($$('img.busy[id^=UCPANG-bump-thread], img.busy[id^=UCPANG-fetch-old], img.busy[id^=UCPANG-bump-remove]').length > 0) {
				return;
			}
			if ($$('img.error[id^=UCPANG-bump-thread], img.error[id^=UCPANG-fetch-old], img.error[id^=UCPANG-bump-remove]').length > 0) {
				return;
			}
			if (groupPreferences.bumpAndReload()) {
			    if (groupPreferences.bumpAndReturnToFirstPage()) {
				document.location.href = 'http://www.flickr.com/groups/' + groupPreferences.groupConfig().groupname() + '/discuss/';
			    } else {
				document.location.href = document.location.href;
			    }
			}
		}
            }
        })); // already needed here

        bumpButton.adopt(
            new Element('span', { html: ' ' }),
            new Element('img', { src: images.bump, height: 14 }),
            new Element('span', { html: ' ' })
        );

        challengeColumnHeader.adopt(new Element('span', { html: '&nbsp;' }));

    if (challengeGroup) {

        challengeColumnHeader.adopt(expandButton = new Element('button', {
            'class': 'CancelButt',
            title: 'expand/collapse selected threads'
        }).adopt(
            new Element('span', { html: ' ' }),
            new Element('img', { src: images.down, height: 14 }),
            new Element('img', { src: images.up, height: 14 }),
            new Element('span', { html: ' ' })
        ));
        expandButton.addEvent('click', function () {
		var tickedCheckboxes = $$('input.UCPANG-thread:checked');
		if (tickedCheckboxes && tickedCheckboxes.length > 0) {
			startExpanding(tickedCheckboxes);
		} else {
			startExpanding($$('input.UCPANG-thread')); // expand all
		}
        });

        // cross inspect
        challengeColumnHeader.adopt(new Element('span', { html: '&nbsp;' }));

        challengeColumnHeader.adopt(crossInspectButton = new Element('button', {
            'class': 'CancelButt',
            title: 'cross-inspect selected threads',
	    events: {
			click: function (evt) {
				startCrossInspect($$('input.UCPANG-thread:checked').length == 0 ? $$('input.UCPANG-thread') : $$('input.UCPANG-thread:checked'));
			}
	    }
        }).adopt(
            new Element('span', { html: ' ' }), // makes the button the right size
            new Element('img', { src: images.viewmag, height: 14 }),
            new Element('span', { html: ' ' }) // makes the button the right size
        ));

        var ucpDecoratorFactory = new UCPTopicListingThreadDecoratorFactory();
        var ucpReplyDecoratorFactory = new UCPTopicListingReplyDecoratorFactory();
    } else {
    	var bumpMessage = groupConfig.bumpMessage();
	new Element('label', {
	    html: ' bump message:'
	}).inject(challengeColumnHeader);
	var bumpMessageInput = new Element('input', {
	    type: 'text',
	    name: 'UCPANG-bump-message',
	    id: 'UCPANG-bump-message',
	    value: groupConfig.bumpMessage()
	}).inject(challengeColumnHeader);
    }

        var topicListingRows = topicListingTable.getElements('li');
        var infoImg = new Element('input', {
            type: 'image',
            src: images.down,
            width: '12',
            title: 'show UCP Admin tool info',
            styles: {
                cursor: 'pointer'
            }
        });
        // let's loop the table and start processing
        $each(topicListingRows, function(topicRow, topicRowIdx) {
            var challengeColumn = topicRow.getElement('div.hd h3');
            var topic = challengeColumn.getElement('a');
            var chlgname = topic.textContent;

            var challengeDefinition = groupConfig.extractChallengeDefinition(chlgname);
            var ucpThread = ucpCreateChallengeThread({
                groupConfig: groupConfig,
                url: topic.href,
                chlgname: chlgname,
		challengeDefinition: challengeDefinition,
                replyDecoratorFactory: ucpReplyDecoratorFactory,
                decoratorFactory: ucpDecoratorFactory
            });
            // TODO: check if we need to reread
	    if (challengeGroup) {
                var threadInfoImg = infoImg.clone();
                new Element('span', { html: ' ' }).inject(challengeColumn.getFirst(), 'before');
                threadInfoImg.inject(challengeColumn.getFirst(), 'before');
                // don't create a row below the challenge to show the data: should be moved with UCPstyle
                var infoCell = new Element('div', {
                    'class': 'hidden_from_view ucpDialogStyle',
                    id: 'UCPANG.info.' + ucpThread.topic()
                }).inject(topicRow);
                ucpThread.setFeedbackElement(infoCell);

                threadInfoImg.set('id', 'UCPANG.arrow.' + ucpThread.topic());
                threadInfoImg.addEvent('click', function () {
                    var visible = !infoCell.hasClass('hidden_from_view');
                    if (visible) {
                        threadInfoImg.src = images.down;
                        threadInfoImg.title = 'show UCP Admin tool info';
                        infoCell.addClass('hidden_from_view');
                    } else {
                        threadInfoImg.src = images.up;
                        threadInfoImg.title = 'hide UCP Admin tool info';
                        infoCell.removeClass('hidden_from_view');
                        // create spinner in infoCell
                        var spinner = new Element('img', {
                                src: updatingIcon
                        }).inject(infoCell);
                        // replace down arrow with spinner
                        threadInfoImg.set('src', updatingIcon);
                        ucpThread.apiloadthread(function(result) {
				if (!result.success) {
					spinner.set('src', errorIcon);
					threadInfoImg.set('src', images.up);
					new Element('span', { html: ' ' + result.message, styles: { fontColor: 'red', fontWeight: 'bold' } }).inject(infoCell);
				} else {
					processDiscussionTopicInList(result.topic, result.replies, ucpThread);
				}
			});
                    }
                }, false);
	    }
            var checkbox = new Element('input', {
                type: 'checkbox',
		'class': 'UCPANG-thread',
                name: topic.href.match(/.*flickr.com\/groups\/[^\/]+\/discuss\/(\d+)/)[1],
            }).inject(challengeColumn.getFirst(), 'before');
	    if (challengeGroup) {
                if (!challengeDefinition.nonChallengeType() && 
                    (chlgname.match(groupConfig.states().open) || chlgname.match(groupConfig.states().waitingForEntries))) {
                    	checkbox.addClass('open-challenge');
                }
                if (!challengeDefinition.nonChallengeType() &&
                    (chlgname.match(groupConfig.states().vote))) {
                    	checkbox.addClass('vote-challenge');
                }
                if (challengeDefinition.nonChallengeType() ||
                    chlgname.match(groupConfig.states().open) ||
                    chlgname.match(groupConfig.states().waitingForEntries) ||
                    chlgname.match(groupConfig.states().vote)) {
                
                    	checkbox.addClass('non-closed-challenge');
                }
	    }
        });
    }    

    function addAwardsCombo(cell, label, resultCell, defaultAwardsGroup, apiMethod, apiArguments, callback) {
        var waitingImg = new Element('img', {
            src: updatingIcon
        });
        
        var photoId = apiArguments.photo_id;
        var awardsCheckTable = new Element('table', {
            border: 0
        });
        cell.adopt(awardsCheckTable);
        awardsCheckTable.adopt(
            new Element('tr').adopt(
                new Element('td', { colspan: 2 , styles: { background: 0, padding: 0 } }).adopt( // padding 0 needed in pending queue
                    newButton = new Element('button', {
                        'class': 'CancelButt',
			id: 'won_awards-' + photoId,
                        html: label
                    }),
                    document.createTextNode(' '),
                    (newCombo = new Element('select', { id: photoId+".select" })).adopt(
                        new Element('option', {
                            html: '-- Any --',
                            value: "Any"
                        })
                    )
                )
            )
        );
        $each(ucpGroupConfigReader.groupList(), function (group) {
            var showGroupInList = true;
            // don't show groups that should not be shown
            if ($chk(group.hideFromAwardsList)) {
                // TODO: allow if group == thisGroup
                showGroupInList = false;
            }
            // unless we're in (the pending items of) an award group, and the group happens to be it's primary group
            // (allows cascading)
            if ($chk(groupConfig.awardWinnersGroup()) && groupConfig.primaryGroup() === group.groupname) {
                showGroupInList = true;
            }
            if (showGroupInList) {
                newCombo.adopt(new Element('option', {
                    html: group.name,
                    value: group.groupname,
                    selected: (group.groupname === defaultAwardsGroup ? "selected" : "")
                }));
            }
        });
        awardsCheckTable.adopt(
            new Element('tr').adopt(
                new Element('td', { styles: { 'padding-top': 0, background: 0 } }).adopt( // left column: hide & stop -- padding needed on pending queue
                    new Element('input', {
                        type: 'checkbox',
                        checked: groupPreferences.hideNonWonMedals(),
                        id: "UCPANG:hidemedals_" + apiArguments.photo_id
                    }),
                    new Element('label', {
                        'for': "UCPANG:hidemedals_" + apiArguments.photo_id,
                        html: 'only show won medals'
                    }),
                    new Element('br'),
                    new Element('input', {
                        type: 'checkbox',
                        checked: groupPreferences.stopAtFirstFoundMedal(),
                        id: "UCPANG:stopatfirstmedal_" + apiArguments.photo_id
                    }),
                    new Element('label', {
                        'for': "UCPANG:stopatfirstmedal_" + apiArguments.photo_id,
                        html: 'stop at first found medal'
                    })
                ),
                new Element('td', { valign: 'top', styles: { 'padding-top': 0, background: 0 } } ).adopt( // right column: types of medals
                    new Element('span', {
                        html: 'only show:',
                        styles: {
                            display: 'block'
                        }
                    }),
                    new Element('input', {
                        type: 'checkbox',
                        id: 'UCPANG:sweepmedal_' + apiArguments.photo_id
                    }),
                    new Element('label', {
                        'for': "UCPANG:sweepmedal_" + apiArguments.photo_id,
                        html: 'sweep / unanimous medals'
                    }),
                    new Element('br'),
                    new Element('input', {
                        type: 'checkbox',
                        id: 'UCPANG:iconmedal_' + apiArguments.photo_id
                    }),
                    new Element('label', {
                        'for': "UCPANG:iconmedal_" + apiArguments.photo_id,
                        html: 'icon challenge medals'
                    })
                )
            )
        );
        newButton.addEvent('click', function (event) {
		if (event && event.preventDefault) {
	                event.preventDefault(); // on the 'pending items' page, the button click would trigger the form 'submit'
		}
                resultCell.getChildren().dispose();
                var waitingClone = waitingImg.clone();
                resultCell.adopt(waitingClone);
                var selectedGroup = $(photoId+".select").value;
                var apiData = {
                    api_key: GM_getPublicKey(),
                    auth_hash: GM_getAuthHash(),
//                    auth_token: GM_getAuthToken(),
                    format: 'json',
                    nojsoncallback: 1,
                    method: apiMethod
                };
                for (var apiArgument in apiArguments) {
                    if (apiArguments.hasOwnProperty(apiArgument)) {
                        apiData[apiArgument] = apiArguments[apiArgument];
                    }
                }
                //var apiCallback = {};
                //apiCallback[apiMethod.replace(/\./g, '_') + '_onLoad'] = 
                //    function (success, responseXML, responseText, params) {
                new Request({
                    url: "http://www.flickr.com/",
                    onSuccess: function (responseText, responseXML) {
                        var result;
                        try {
                            result = JSON.parse(responseText);
                        } catch (e) {
				try {
					result = eval('(' + responseText + ')');
				} catch (f) {
					resultCell.adopt(document.createTextNode("ERROR: " + e));
					return;
				}
                        }
                        if (result.stat === 'fail') {
                            resultCell.adopt(document.createTextNode("ERROR: " + result.code + " - " + result.message));
                            return;
                        }
                        if (callback !== undefined) {
                            callback(resultCell, result, responseText, {
                                    selectedGroup: selectedGroup,
                                    hideNonWon: $("UCPANG:hidemedals_" + apiArguments.photo_id).checked, 
                                    stopAtFirstFound: $('UCPANG:stopatfirstmedal_' + apiArguments.photo_id).checked,
                                    sweepMedals: $('UCPANG:sweepmedal_' + apiArguments.photo_id).checked,
                                    iconMedals: $('UCPANG:iconmedal_' + apiArguments.photo_id).checked,
				    photoId: photoId
                                });
                        }
                        waitingClone.dispose();
                    }
                }).get("/services/rest", apiData);
            }); // addEvent
        return newButton;
    } // function

// the medals used in the photo information box
var UCPMedal = new Class({
    Implements: [ Options ],
    options: {
        name: undefined,
	replaced_with: undefined,
        img: undefined,
        imgmatch: undefined,
        imgRegExp: undefined,
        text: undefined,
        textRegExp: undefined,
        sweep: false,
        icon: false
    },
    initialize: function (options) {
        this.setOptions(options);
    },
    name: function () {
        return this.options.name;
    },
    img: function () {
        return this.options.img;
    },
    hasTextMatch: function () {
        return $chk(this.options.text) || $chk(this.options.textRegExp);
    },
    containedIn: function (text) {
        if ($chk(this.options.imgRegExp)) {
            return text.match(new RegExp(this.options.imgRegExp.expression, this.options.imgRegExp.flags));
        }
        if ($chk(this.options.imgmatch)) {
            return text.match(this.options.imgmatch);
        }
        if ($chk(this.options.textRegExp)) {
            return text.match(new RegExp(this.options.textRegExp.expression, this.options.textRegExp.flags));
        }
        if ($chk(this.options.text)) {
            return text.match(this.options.text);
        }
        return text.match(this.options.img);
    }
});

    var allAwardsCallback = function (awardsCell, comments, commentsAsText, options) {
        var selectedGroup = options.selectedGroup;
        var hideNonWon = options.hideNonWon;
        var stopAtFirstFound = options.stopAtFirstFound;
        var onlySweepMedals = options.sweepMedals;
        var onlyIconMedals = options.iconMedals;
	var photoId = options.photoId;

        var commentList = comments.comments;
        var localGroupname = groupConfig.groupname();
        var groupDefinitions = ucpGroupConfigReader.groupList();
        if ($chk(selectedGroup) && selectedGroup !== "Any") {
            // only show for a particular group
            var onlyGroupDef = groupDefinitions[selectedGroup];
            groupDefinitions = {};
            groupDefinitions[selectedGroup] = onlyGroupDef;
        }
        var foundAMedal = false;
        new UCPMedalListReader().checkForUpdates(false, function(retval) { /* TODO */ });
        new UCPMedalListReader().createMedalsList(function (retval) {
		var success = retval.success;
		if (!success) {
			var message = retval.message;
			GM_log("error reading medals: " + message);
			// TODO: put it on the screen!!
			return;
		}
		var medals = retval.medals;
		$each(groupDefinitions, function (groupDefinition, idx) {
		    if (groupDefinition.hideFromAwardsList) {
			return;
		    }
		    if (foundAMedal && stopAtFirstFound) {
			return;
		    }
		    var groupMedals = medals[idx];
		    if (!$chk(groupMedals)) {
			return;
		    }
		    $each(groupMedals, function (medal, medal_id) {
		    // important: medals that replace older medals should be defined before the old ones
			if (foundAMedal && stopAtFirstFound) {
			    return;
			}
			if (!$chk(medal.name)) { // comment in 'medals' block
			    return;
			}
			if (onlyIconMedals && !medal.icon) {
			    return;
			}
			if (onlySweepMedals && !medal.sweep) {
			    return;
			}
			var wonThisMedal = false;
			var permalink = null;
			var time = null;
			var aMedal = new UCPMedal(medal);
			try {
			    if ($chk(commentList.comment) && // no need to replace '/' for text (HOF winner works without)
				aMedal.containedIn(commentsAsText.replace(/\\\//g, '\/')) ) {
				    // important: special characters should be replaced with .* !!
				    // but this would result in 'unresponsive script' if searching commentsAsText
				    // => never use .* in medal.imgmatch!!
				// with $each, and a return on wonThisMedal, all comments are processed
				// with a for loop, the loop stops if wonThisMedal = true
				for (var cIdx = 0, cLen = commentList.comment.length; cIdx < cLen && !wonThisMedal; ++cIdx) {
				    var comment = commentList.comment[cIdx];
				    var commentText = comment._content;
				    if (aMedal.containedIn(commentText)) {
					wonThisMedal = true;
					foundAMedal = true;
					time = comment.datecreate;
					// the given permalink does not work over multiple pages
					// removing the '#', does
					permalink = comment.permalink.replace('#', '');
				    }
				}
			    }
			} catch (e) {
			    GM_log("error: " + e);
			}
			var medalId = medal.replaced_with ? 
				'ucp_medal_' + groupDefinition.groupId + '_' + photoId + '_' + groupMedals[medal.replaced_with].medalId :
				'ucp_medal_' + groupDefinition.groupId + '_' + photoId + '_' + medal.medalId;
			if (wonThisMedal || !hideNonWon) {
			    var medalSpan = $(medalId);
			    if (!$chk(medalSpan)) { // not there => create it
				    awardsCell.adopt(medalSpan = new Element('span', { styles: { 'white-space': 'nowrap' }, id: medalId }),
						document.createTextNode(" ")); // allow breaks between medals
				    var anchor = new Element('a', {
					target: "_blank"
				    }).inject(medalSpan);
				    if ($chk(medal.img)) {
					anchor.adopt(new Element('img', {
					    src: medal.img,
					    alt: 'medal_img',
					    styles: {
						'max-height': '32px'
					    }
					}));
				    } else {
					anchor.adopt(new Element('span', {
					    html: medal.name.replace(' ', '&nbsp;'),
					    styles: {
						'white-space': 'nowrap'
					    }
					}));
				    }
			    }
			    var medalImg = medalSpan.getElement('img[alt=medal_img]');
			    anchor = medalSpan.getElement('a');
			}
			if (wonThisMedal) {
			    var title = (groupDefinition.groupname !== localGroupname ? 
						groupDefinition.name + ": " : '') +
						medal.name.replace(/&#39;/g,"\'") + ": " + new Date(time * 1000);
			    if (!medalSpan.hasClass('medal_won')) {
			    // if already clear for a newer version of the medal, leave as is
				anchor.href = permalink;
				anchor.title = title;
				medalSpan.set('class', 'medal_won');
			    }
			    medalSpan.adopt(wonImg = new Element('img', {
				src: "http://l.yimg.com/g/images/icon_check_small.png",
				title: title
			    }));
			    if ($chk(medalImg)) {
				medalImg.set('style', 'border: 3px solid green; max-height: 32px; opacity: 1.0;');
				wonImg.set('style', 'position: relative; left: -9px');
			    } else {
				anchor.set('style', 'border: 3px solid green; opacity: 1.0;');
				wonImg.set('style', 'position: relative; left: -6px');
			    }
			} else if (!hideNonWon) {
			    title = (groupDefinition.groupname !== localGroupname ? 
							    groupDefinition.name + ": " : '') +
						    medal.name.replace(/&#39;/g,"\'") + " (not found)";
			    if (!medalSpan.hasClass('medal_won') && !medal.replaced_with) { // leave the newer title
				anchor.title = title;
			    }
			    medalSpan.adopt(nonImg = new Element('img', {
				src: errorIcon,
				title: title,
				height: "12"
			    }));
			    if ($chk(medalImg)) {
				if (!medalSpan.hasClass('medal_won')) {
					medalImg.set('style', 'border: 1px solid red; max-height: 32px; opacity: 0.3');
				}
				nonImg.set('style', 'position: relative; left: -9px');
			    } else {
				if (!medalSpan.hasClass('medal_won')) {
					anchor.set('style', 'border: 1px solid red; opacity: 0.3');
				}
				nonImg.set('style', 'position: relative; left: -6px');
			    }
			}
		    });
		});
		if (awardsCell.getChildren().length <= 1) { // spinImage
		    awardsCell.adopt(awardsCellImg = new Element('img', {
			src: errorIcon,
			height: "12"
		    }));
		    if (!groupPreferences.hideNonWonMedals() && !hideNonWon) {
			awardsCellImg.title = "no awards defined";
		    } else {
			awardsCellImg.title = "no awards found or none defined";
		    }
		}
	});
    };

    function getPhotoEntrySize(ucpCompetitor, callback) {
	var width = parseInt(ucpCompetitor.photo().getComputedStyle('width'));
	var height = parseInt(ucpCompetitor.photo().getComputedStyle('height'));
	if (!$chk(width) || width <= 0) { width = parseInt(ucpCompetitor.photo().getAttribute('width')); }
	if (!$chk(height) || height <= 0){ height= parseInt(ucpCompetitor.photo().getAttribute('height')); }
	callback({ success: true, photoId: ucpCompetitor.photoId(), width: width, height: height });
    }

    function getPhotoPositionInStream(ucpCompetitor, callback) {
	var apiData = {
	    api_key: GM_getPrivateKey(),
	    auth_hash: GM_getAuthHash(),
	    auth_token: GM_getAuthToken(),
	    format: 'json',
	    nojsoncallback: 1
	};
	var userId = ucpCompetitor.owner().userid;
	if (!$chk(userId) || !userId.match(/\d+@N\d{2}/)) {
		apiData.method  = 'flickr.photos.getInfo';
		apiData.photo_id = ucpCompetitor.photoId();
		new Request({
		    url: "http://www.flickr.com/",
		    onSuccess: function (responseText, responseXML) {
			var result;
			try {
			    result = JSON.parse(responseText);
			} catch (e) {
				try {
					result = eval('(' + responseText + ')');
				} catch (f) {
					button.callback({ success: false, message: "ERROR parsing json reply for position: " + e, photoId: photoId });
					return;
				}
			}
			if (result.stat === 'fail') {
				button.callback({ success: false, message: "ERROR: " + result.code + " - " + result.message, photoId: photoId });
				return;
			}
			var userId = result.photo.owner.nsid;
			if (!userId.match(/\d+@N\d{2}/)) { // don't recurse endlessly
				button.callback({ success: false, message: "Could not determine the owner's id", photoId: ucpCompetitor.photoId() });
				return;
			}
			ucpCompetitor.owner().userid = userId;
			getPhotoPositionInStream(ucpCompetitor, callback);
		    }
		}).get("/services/rest", apiData);
	} else {
		apiData.method = 'flickr.people.getPublicPhotos';
		apiData.user_id = userId;
		new Request({
		    url: "http://www.flickr.com/",
		    onSuccess: function (responseText, responseXML) {
			var result;
			try {
			    result = JSON.parse(responseText);
			} catch (e) {
				try {
					result = eval('(' + responseText + ')');
				} catch (f) {
					button.callback({ success: false, message: "ERROR parsing json reply for position: " + e, photoId: photoId });
					return;
				}
			}
			if (result.stat === 'fail') {
				button.callback({ success: false, message: "ERROR: " + result.code + " - " + result.message, photoId: photoId });
				return;
			}
			callback({ success: true, data: result, photoId: ucpCompetitor.photoId() });
		    }
		}).get("/services/rest", apiData);
	}
    }

    function drawPhotoInformationBox(ucpCompetitor) {
        var photoId = ucpCompetitor.photoId();
        if ($chk($('UCPANG:' + photoId + '.table'))) { // it's already there
            return;
        }
	if (ucpCompetitor.replyId()) {
		var photoRow = $('DiscussTopic').getElement('tr td.Who a[name=comment' + ucpCompetitor.replyId() + ']').getParent('tr');
	} else { // photo in challenge announcement
		photoRow = $('DiscussTopic').getElement('tr td.Who').getParent('tr');
	}
        // the 'Inline editor' from steev considers everything that comes before the first 'small' element as content
        //var firstSmall = photoParagraph.getElement('small');
        var outerDiv = new Element('div', {
            id: "UCPANG:" + photoId + ".table"
        }).inject(new Element('p', {
            border: '0',
            'class': "ucpDialogStyle UCPANG:" + photoId + ".p" // to be able to remove in approve function
        }).inject(new Element('td', { 
            colspan: 2 
        }).inject(new Element('tr', {
            id: 'UCPANG:' + photoId + '.row'
        }).inject(photoRow, 'after'))));
        // headers
        outerDiv.adopt(new Element('tr').adopt(
                        new Element('th', { align: 'right' }).adopt(new Element('a', {
                                target: '_blank',
                                html: 'help',
                                href: 'http://www.flickr.com/groups/1307178@N20/discuss/72157623759768824/#comment72157623782159508',
                                styles: {
                                    cursor: 'help'
                                }
                            })),
                        new Element('th', { html: 'taken', title: 'date taken' }),
			new Element('th', { html: 'size', title: 'size' }),
			new Element('th', { html: '#', title: 'position in photo stream' }),
                        new Element('th', { html: 'public', title: 'photo is public?' }),
                        new Element('th', { html: 'edit', title: 'can comment, can add tags?' }),
                        new Element('th', { html: 'popularity', title: 'popularity: views, comments, favs', colspan: 3 }),
                        new Element('th', { html: 'pool', title: 'photo in pool?' })
                    ),
                    new Element('tr', { vAlign: 'top' }).adopt(
                        new Element('td', { styles: { padding: 1 } }).adopt(
                            new Element('button', {
                                'class': 'CancelButt check-all-button',
                                html: 'check all',
                                events: {
                                    click: function () {
                                        $(this).dispose();
					[ $('taken_date-' + photoId).getElement('button'),
					  $('size-' + photoId).getElement('button'),
					  $('position-' + photoId).getElement('button'),
					  $('nfaves-' + photoId).getElement('button'),
					  $('pool-' + photoId).getElement('button'),
					  $('won_awards-' + photoId) ].each(function (button) {
						try {
							button.fireEvent('click');
						} catch (e) { // the button can be gone already
							GM_log("unable to fire 'click' on some button for photo " + photoId + " (" + e + ")");
						}
					});
                                    }
                                }
                            })
                        ),
                        new Element('td', { styles: { 'padding-right': '10px' }, class: 'basic_info-' + photoId, id: 'taken_date-' + photoId }),
                        new Element('td', { styles: { 'padding-right': '10px' }, class: 'size_info-' + photoId, id: 'size-' + photoId }),
                        new Element('td', { styles: { 'padding-right': '10px' }, class: 'position_info-' + photoId, id: 'position-' + photoId }),
                        new Element('td', { styles: { 'padding-right': '10px' }, class: 'basic_info-' + photoId, id: 'privacy-' + photoId }),
                        new Element('td', { styles: { 'padding-right': '10px' }, class: 'basic_info-' + photoId, id: 'editable-' + photoId }),
                        new Element('td', { styles: { 'padding-right': '10px' }, class: 'basic_info-' + photoId, id: 'nviews-' + photoId }),
                        new Element('td', { styles: { 'padding-right': '10px' }, class: 'basic_info-' + photoId, id: 'ncomments-' + photoId }),
                        new Element('td', { styles: { 'padding-right': '10px' }, class: 'faves_info-' + photoId, id: 'nfaves-' + photoId }),
                        new Element('td', { styles: { 'padding-right': '10px' }, class: 'pool_info-'  + photoId, id: 'pool-' + photoId })
                    ),
                    new Element('tr', {
		    		'valign': 'top'
		    	}).adopt(
	                        thumbnailCell = new Element('td'),
        	                allAwardsCell = new Element('td', { colSpan: 10 })
                    ),
		    new Element('tr', { 'valign': 'top' }).adopt(
			new Element('td', { html: 'medals: ' }),
                        awardsCell     = new Element('td', { styles: { 'padding-right': '10px' }, colspan: 10 })
		    ),
                    new Element('tr').adopt(
                        exifCell = new Element('td', { class: 'exif_info-' + photoId } )
                    )
                );
        var imgClone = ucpCompetitor.photo().clone();
        imgClone.setStyles({ 'max-width': '75px', 'max-height': '75px' });
        imgClone.setAttribute("alt", "UCPthumnail");
	imgClone.removeAttribute("width");
	imgClone.removeAttribute("height");
        thumbnailCell.adopt(imgClone);

        var basicInfoCallback = function (retval) {
		$$('td.basic_info-' + retval.photoId).each(function (basicCell) {
			basicCell.empty();
		});
		var takenCell = $('taken_date-' + retval.photoId);
		if (!retval.success) {
			takenCell.adopt(new Element('span', { html: retval.message }));
			return;
		}
		var time = retval.data.photo.dates.taken;
		var uploaded = retval.data.photo.dates.posted;
		var dateSpan = new Element('span', {
			html: time,
			title: 'posted: ' + new Date(uploaded * 1000).toLocaleString()
		}).inject(takenCell);		
		var publicCell = $('privacy-' + retval.photoId);
		var ispublic = retval.data.photo.visibility.ispublic;
		publicCell.adopt(new Element('img', { src:   ispublic === 1 ? "http://l.yimg.com/g/images/icon_check_small.png" : errorIcon, title: ispublic === 1 ? "photo is public" : "photo is NOT public", height: "12" }));
		var canCommentCell = $('editable-' + retval.photoId);
		canCommentCell.valign = "top";
		var cancomment = retval.data.photo.editability.cancomment;
		var commentImg = canCommentCell.adopt(new Element('img', { src: cancomment === 1 ? "http://l.yimg.com/g/images/icon_check_small.png" : errorIcon, title: cancomment === 1 ? "can comment on photo" : "can NOT comment on photo", height: "12" }));
		var cantag = retval.data.photo.editability.canaddmeta;
		var tagImg = canCommentCell.adopt(new Element('img', { src: cantag === 1 ? "http://l.yimg.com/g/images/icon_check_small.png" : errorIcon, title: cantag === 1 ? "can add tags" : "can NOT add tags", height: "12" }));
		var numberOfViewsCell = $('nviews-' + retval.photoId);
		var views = retval.data.photo.views;
		if ($chk(views)) {
			numberOfViewsCell.adopt(document.createTextNode(views + "v"));
		} else {
			numberOfViewsCell.adopt(document.createTextNode('0v'));
		}
		numberOfViewsCell.title = 'views';
		var numberOfCommentsCell = $('ncomments-' + photoId);
		var comments = retval.data.photo.comments._content;
		if ($chk(comments)) {
			numberOfCommentsCell.adopt(document.createTextNode(comments + "c"));
		} else {
			numberOfCommentsCell.adopt(document.createTextNode('0c'));
		}
		numberOfCommentsCell.title = 'comments';
        };
	var sizeInfoCallback = function (retval) {
		var sizeCell = $('size-' + retval.photoId);
		sizeCell.empty();
		if (!retval.success) {
			sizeCell.adopt(new Element('span', { html: retval.message }));
			return;
		}
		sizeCell.adopt(
			new Element('span', { html: retval.width }),
			document.createTextNode("x"),
			new Element('span', { html: retval.height })
		);
		if (retval.width > 500 || retval.height > 500) {
			sizeCell.setStyles( { 'font-weight': 'bold', color: 'red' });
		}
	};
	var positionInfoCallback = function (retval) {
		var positionCell = $('position-' + retval.photoId);
		positionCell.empty();
		if (!retval.success) {
			positionCell.adopt(new Element('span', { html: retval.message }));
			return;
		}
		var data = retval.data;
		var perpage = data.photos.perpage;
		for (var idx = 0; idx < perpage; ++idx) {
			if (data.photos.photo[idx].id == photoId) {
				break;
			}
		}	
		var position = idx + 1;
		positionCell.adopt(
			new Element('span', { 
				html: position >= perpage ? perpage + '+' : position,
				title: position >= perpage ? 'not in first ' + perpage + ' photos' : position + 'th photo in stream'
			})
		);
	};
        var exifCallback = function (retval) {
		var exifCell = $$('td.exif_info-' + retval.photoId)[0];
		exifCell.getElements('img').dispose();
		exifCell.getElement('button').removeClass('hidden_from_view').set('disabled', false);
		if (!retval.success) {
			exifCell.adopt(new Element('span', { html: retval.message }));
			return;
		}
		var exifData = retval.data;
            var exifDataDiv = $('UCPANG:exifdata');
            if ($chk(exifDataDiv)) {
                exifDataDiv.empty();
            } else {
                exifDataDiv = new Element('div', {
                    id: 'UCPANG:exifdata',
                    styles: {
                        overflow: 'auto',
                        width: 500,
                        height: 333,
                        'z-index': 1024,
                        position: 'fixed',
                        top: '80px',
                        left: '10px',
                        display: 'block',
                        background: '#BFBFBF',
                        opacity: '.7',
                        '-moz-border-radius': '1em',
                        border: 'grey solid 1px',
			'text-align': 'left'
                    }
                }).inject($(document).getElement('body'));
            }
            new Element('button', {
                html: 'close',
                'class': 'DeleteButt',
                events: {
                    click: function() {
                        $('UCPANG:exifdata').dispose();
                    }
                }
            }).inject(exifDataDiv);
            exifDataTable = new Element('table', { border: 0 }).inject(exifDataDiv);
            exifDataTable.adopt(
                new Element('tr').adopt(
                    new Element('th', {
                        html: 'label'
                    }),
                    new Element('th', {
                        html: 'value'
                    }),
                    new Element('th', {
                        html: 'clean'
                    })
                )
            );
    for (var exifIdx = 0, exifLen = exifData.photo.exif.length; exifIdx < exifLen; ++exifIdx) {
                try {
                    var exif = exifData.photo.exif[exifIdx];
                    var inBold = $chk(exif.clean) || 
                            exif.tag === 'DateTimeOriginal' ||
                            exif.tag === 'CreateDate';
                    exifDataTable.adopt(
                        new Element('tr').adopt(
                            new Element('td', {
                                html: exif.label,
                                styles: {
                                    'font-weight': inBold ? 'bold' : 'normal'
                                }
                            }),
                            new Element('td', {
                                html: exif.raw._content,
                                styles: {
                                    'font-weight': inBold ? 'bold' : 'normal'
                                }
                            }),
                            new Element('td', {
                                html: ($chk(exif.clean) ? exif.clean._content : ' '),
                                styles: {
                                    'font-weight': inBold ? 'bold' : 'normal'
                                }
                            })
                        )
                    );
                } catch (e) {
                    GM_log("error: " + e);
                }
            }
            new Element('button', {
                html: 'close',
                'class': 'DeleteButt',
                events: {
                    click: function() {
                        $('UCPANG:exifdata').dispose();
                    }
                }
            }).inject(exifDataDiv);
        };
        var favoritesCallback = function (retval) {
		var favoritesCell = $('nfaves-' + retval.photoId);
		favoritesCell.empty();
		if (!retval.success) {
			favoritesCell.adopt(new Element('span', { html: retval.message }));
			return;
		}
		var favs = retval.data.photo.total;
            if ($chk(favs)) {
                favoritesCell.adopt(document.createTextNode(favs + "f"));
            } else {
                favoritesCell.adopt(document.createTextNode('0f'));
            }
            favoritesCell.title = 'favs';
        };
        var poolCallback = function (retval) {
		var poolCell = $('pool-' + retval.photoId);
		poolCell.empty();
		if (!retval.success) {
			poolCell.adopt(new Element('span', { html: retval.message }));
			return;
		}
		poolCell.adopt(new Element('img', {
			src: retval.data.found ? "http://l.yimg.com/g/images/icon_check_small.png" : errorIcon,
			height: "12",
			title: retval.data.found ? "photo is in the pool" : "photo is not in the pool"
		}));
        };
	[ { cell: 'taken_date-' + photoId, label: "taken",    apiMethod: 'flickr.photos.getInfo',      apiData: { photo_id: photoId }, eventClass: 'basic_info-' + photoId, callback: basicInfoCallback },
	  { cell: 'size-'       + photoId, label: "size",     jsMethod:  getPhotoEntrySize,            photo: ucpCompetitor,           eventClass: 'size_info-'      + photoId, callback: sizeInfoCallback  },
	  { cell: 'position-'   + photoId, label: "position", jsMethod:  getPhotoPositionInStream,     photo: ucpCompetitor,           eventClass: 'position_info-'  + photoId, callback: positionInfoCallback  },
	  { cell: 'privacy-'    + photoId, label: "public",   apiMethod: 'flickr.photos.getInfo',      apiData: { photo_id: photoId }, eventClass: 'basic_info-' + photoId, callback: basicInfoCallback },
	  { cell: 'editable-'   + photoId, label: "edit",     apiMethod: 'flickr.photos.getInfo',      apiData: { photo_id: photoId }, eventClass: 'basic_info-' + photoId, callback: basicInfoCallback },
	  { cell: 'nviews-'     + photoId, label: "views",    apiMethod: 'flickr.photos.getInfo',      apiData: { photo_id: photoId }, eventClass: 'basic_info-' + photoId, callback: basicInfoCallback },
	  { cell: 'ncomments-'  + photoId, label: "comments", apiMethod: 'flickr.photos.getInfo',      apiData: { photo_id: photoId }, eventClass: 'basic_info-' + photoId, callback: basicInfoCallback },
	  { cell: exifCell,                label: "EXIF",     apiMethod: 'flickr.photos.getExif',      apiData: { photo_id: photoId }, eventClass: 'exif_info-'  + photoId, callback: exifCallback },
	  { cell: 'nfaves-'     + photoId, label: "favs",     apiMethod: 'flickr.photos.getFavorites', apiData: { photo_id: photoId }, eventClass: 'faves_info-' + photoId, callback: favoritesCallback },
	  { cell: 'pool-'       + photoId, label: "pool",     apiMethod: 'flickr.groups.pools.getContext', apiData: { photo_id: photoId, group_id: groupConfig.groupId() }, eventClass: 'pool_info-' + photoId, callback: poolCallback } ].each(function (button) {
	$(button.cell).adopt(new Element('button', {
                'class': 'CancelButt ' + button.eventClass,
                html: button.label,
                events: {
                    'click': function () {
			var eventClass = button.eventClass;
			$$('button.' + eventClass).each(function (groupButton) {
				var cell = groupButton.getParent('td');
				cell.getElement('button').addClass('hidden_from_view').set('disabled', true);
				cell.adopt(new Element('img', { src: updatingIcon }));
			});
			if ($chk(button.apiMethod)) {
				var apiData = {
				    api_key: GM_getPrivateKey(), // canComment, canTag: only for logged in users
				    auth_hash: GM_getAuthHash(),
				    auth_token: GM_getAuthToken(),
				    format: 'json',
				    method: button.apiMethod,
				    nojsoncallback: 1
				};
				for (var apiArgument in button.apiData) {
				    if (button.apiData.hasOwnProperty(apiArgument)) {
					apiData[apiArgument] = button.apiData[apiArgument];
				    }
				}
				new Request({
				    url: "http://www.flickr.com/",
				    onSuccess: function (responseText, responseXML) {
					var result;
					try {
					    result = JSON.parse(responseText);
					} catch (e) {
						try {
							result = eval('(' + responseText + ')');
						} catch (f) {
							button.callback({ success: false, message: "ERROR parsing json reply: " + e, photoId: photoId });
							return;
						}
					}
					if (result.stat === 'fail') {
						// special case: flickr.groups.pools.getContext returns { "stat":"fail", "code":2, "message":"Photo not in pool"}
						if (button.apiMethod == 'flickr.groups.pools.getContext' && result.code == 2) {
							button.callback({ success: true, data: { found: false }, photoId: photoId });
						} else {
							button.callback({ success: false, message: "ERROR: " + result.code + " - " + result.message, photoId: photoId });
						}
						return;
					}
					if (button.apiMethod == 'flickr.groups.pools.getContext') result.found = true;
					button.callback({ success: true, data: result, photoId: apiData.photo_id });
				    }
				}).get("/services/rest", apiData); // funtion, apiCallback
			} else {
				button.jsMethod(button.photo, button.callback);
			}
                    }
                }
            }));
	});

        //allAwardsCell.align = "right";
        var allAwardsButton = addAwardsCombo(allAwardsCell, 
            "awards in group", 
            awardsCell,
            groupPreferences.defaultAwardsGroup(),
            'flickr.photos.comments.getList', 
            { photo_id: photoId },
            allAwardsCallback
        );
        new Element('td', {
            colspan: 7,
            id: "UCPANG:" + photoId + ".cell",
            align: 'right'
        }).inject(exifCell, 'after');
        return photoId;
    }

    function drawPhotoInformationBoxes(challengeDefinition, discussionTopic, challengeEntries, onlyNonApproved) {
        var photoReplies = [];
	
        if (ucpThread.groupConfig().allowsPhotoInAnnouncement()) {
            photoReplies.extend(apiFindPhotos(discussionTopic, ucpThread, true));
        }
        // replies
	if (challengeEntries && challengeEntries.length > 0) {
		$each(challengeEntries, function (entry) {
		    photoReplies.extend(apiFindPhotos(entry, ucpThread, true));
		});
	}
        var photoId;
        // decorate photos with information
        photoReplies.each( function (ucpCompetitor, photoIdx) {
                if (!$chk(ucpCompetitor) || !$chk(ucpCompetitor.photoId())) {
                    return;
                }
                var topicId = ucpThread.topic();
                var photoSrc = ucpCompetitor.photo().get('src');
                var approvedNode = $chk(ucpCompetitor.node()) ? ucpCompetitor.node().getElement('img[alt*=UCPAapproved]') : null;
                if ($chk(approvedNode) && onlyNonApproved) {
                    return;
                }
                var tmpPhotoId = drawPhotoInformationBox(ucpCompetitor);
                if ($chk(tmpPhotoId)) {
                    photoId = tmpPhotoId;
                } else {
                    return;
                }
                var approveButton = new Element('button', {
                    'class': 'Butt approve-button',
                    id: "UCPANG:" + photoId + ".approvebutton",
                    html: 'Approve',
                    title: "Mark as approved",
		    styles: {
			margin: '0px 20px'
		    },
                    events: {
                        click: function (evt) {
			    var approveButton = $(evt.target);
                            // strip photoId
                            var photoId = approveButton.id.replace('UCPANG:', '').replace('.approvebutton', '');
                            var button = $('UCPANG:' + photoId + '.button');
                            var buttonCell = $('UCPANG:' + photoId + '.cell');
                            var infoBoxRow = $('UCPANG:' + photoId + '.row');
                            var photoTextNode = infoBoxRow.getPrevious('tr').getElement('td.Said');
                            buttonCell.empty();
                            var challengeNode = photoTextNode.clone(true, true); // copy children, copy id's
                            buttonCell.adopt(messageSpan = new Element('span'));
                            buttonCell.adopt(spin = new Element('img', {
                                src: updatingIcon
                            }));
                            // read current content of photoNode
                            //var content = challengeAnnouncement.innerHTML;
                            // remove all UCPapprovals, and <small> elements
                            // but first, get the edit link
                            var editLink = photoTextNode.getElement('small a[href*=edit]');
                            if (!$chk(editLink)) {
                                messageSpan.style.color = "red";
                                messageSpan.set('html', 'ERROR fetching edit link; aborting');
                                spin.dispose();
                                return;
                            }
                            // work with the clone from here on
                            challengeNode.getElements('img[alt*=UCPAapproved], p[class*=UCPANG], div.ucpdiv').dispose();
                            // more cleanup: trim left and right 
                            // adding to a div.innerHTML creates extra spaces and line breaks
                            //
			    var approvedNodeHtml = stripChallengeAnnouncement(challengeNode);

                            var approval = "<img " +  // seems not to work with a created element
                                   "src='http://l.yimg.com/g/images/spaceout.gif' " +
                                   "alt="; 
                            var username = GM_getLoggedInUser().replace(/:/g, '_')
                                                               .replace(/\'/g, '&#39;');
                            //[ ignore, name, photoChecksum, checksum, version ] = 
                            approval += "'UCPAapproved:" + 
                                encodeURIComponent(username) + ":" + 
                                ucpUniversalHash(photoSrc.replace(/^https/,"http")) + ":" +
                                ucpUniversalHash(photoId + username + topicId) + ":" + 
                                "1' />"; // append 'version'
                            // post: based on the ideas found in 'Inline Comment Editor' by steeev 
                            // (http://www.flickr.com/groups/flickrhacks/discuss/72157600231591623/)
			    approvedNodeHtml += "\n<i>[approved by " + GM_getLoggedInUser() + "]</i>" + approval;
			    
                            // need to send subject?
                            if (groupConfig.allowsPhotoInAnnouncement() && 
                                !$chk(challengeNode.getParent('table.TopicReply'))) { // announcement
                                
                                var subject = ucpThread.challengeName();
                            }
                
			    var message = approvedNodeHtml
                            var hostname = window.location.hostname;
                            var editLinkHref = editLink.href;
                            var apiUrl = editLinkHref;
                            messageSpan.adopt(document.createTextNode("sending updates to Flickr, please wait.."));
                            new Request({
                                method: "post",
                                url: apiUrl,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "Referer": apiUrl
                                },
                                data: "magic_cookie=" + GM_getAuthHash() + 
                                    "&done=1" +
                                    "&message=" + encodeURIComponent(message) +
                                    ($chk(subject) ? "&subject=" + encodeURIComponent(subject) : ""),
                                onFailure: function (response) {
                                    buttonCell.empty();
                                    buttonCell.adopt(new Element('img', { 
                                                            src: errorIcon,
							    title: response.statusText
                                                        }),
                                                     document.createTextNode("Failed: " + response.statusText)
                                                    );
                                },
                                onSuccess: function (responseText, responseXML) {
                                    var tempDiv = new Element('div');
                                    tempDiv.innerHTML = responseText.replace(/<script(.|\s)*?\/script>/g, '');
                                    var problem = tempDiv.getElement('p.Problem');
                                    if ($chk(problem)) {
                                        buttonCell.empty();
                                        buttonCell.adopt(
                                            new Element('img', { 
                                                src: errorIcon
                                            }),
                                            document.createTextNode("Failed: " + problem.get('html'))
                                        );
                                        return;
                                    }
                                    buttonCell.empty();
                                    buttonCell.adopt(
                                        new Element('img', { 
                                            src: "http://l.yimg.com/g/images/icon_check_small.png" 
                                        }),
                                        document.createTextNode("Approved")
                                    );
				    // cooperate with the 'workflow'
                                    var workflowLink = $('UCPANG-workflow-wizard-photo-approved-' + photoId);
                                    if ($chk(workflowLink)) {
					workflowLink.fireEvent('approved-by', username);
                                    }
				    var hiddenApproval = $('UCPANG-workflow-wizard-hidden-photo-approved-' + photoId);
				    if (!$chk(hiddenApproval)) {
					new Element('input', {
						type: 'hidden',
						id: 'UCPANG-workflow-wizard-hidden-photo-approved-' + photoId,
						value: true,
						alt: username
					}).inject($$('body')[0]);
				    } else {
				    	hiddenApproval.set('value', true);
				    	hiddenApproval.set('alt', username);
				    }
                                }
                            }).send();
                        }
                    }
                });
    
                var approvalCell = $('UCPANG:' + photoId + '.cell');
                if (!approvalCell) {
                    return;
                }
                if (!approvedNode) {
                    approvalCell.adopt(approveButton);
                    approvalCell.adopt(document.createTextNode(" "));
                } else { // already approved by an UCPA admin/mod
                    var approvalCheck = apiCheckPhotoApproval(ucpCompetitor.photo(), ucpCompetitor.node(), ucpThread.topic());
                // returns
                // {
                //      approved: true/false,
                //      approver: string,
                //      version: number,
                //      checksum: true/false,
                //      photoChecksum: true/false,
                //      error: string
                //      photoId: string
                //  }
                    if (approvalCheck.approved) {
                        approvalCell.adopt(document.createTextNode("approved by " + approvalCheck.approver + " "));
                    } else if (!approvalCheck.checkSum || !approvalCheck.photoCheckSum) {
                        approvalCell.adopt(document.createTextNode(approvalCheck.error));
                        approvalCell.adopt(approveButton);
                    } else if (approvalCheck.ignored) {
                        approvalCell.adopt(document.createTextNode(
                                "non competing image (by " + approvalCheck.approver + ")"));
                        approvalCell.adopt(approveButton);
                    } else {
                        approvalCell.style.color = 'red';
                        approvalCell.adopt(document.createTextNode("failed to process UCPA approved entry"));
                        approvalCell.adopt(approveButton);
                    }
                }
            }); // photo loop
            if (!$chk(photoId)) {
                return;
            }
            // redraw the last
            $('UCPANG:'+photoId+'.table').addClass('hidden_from_view');
            $('UCPANG:'+photoId+'.table').offsetHeight;
            $('UCPANG:'+photoId+'.table').removeClass('hidden_from_view');

            allAllCell.adopt(
                $chk($('checkAllPhotosButton')) ? document.createTextNode("") : // smartPhotoBoxes
                new Element('button', {
                    'class': "Butt",
                    id: 'checkAllPhotosButton',
                    html: "check all photos",
                    events: {
                        'click': function () {
                            this.empty();
                            new Element('img', {
                                src: updatingIcon,
                            }).inject(this);
                            $$('button.check-all-button').each(function (button) {
                                button.click();
                            });
                            this.set('html', 'results are below each photo');
                            this.set('enabled', false);
			    var workflowCheckAll = $('checkAllPhotosButton2');
			    if ($chk(workflowCheckAll)) {
				workflowCheckAll.fireEvent('go-float');
			    }
                        },
                        'mouseover': function () {
                            $('ucpng_overrides_title_panel').set('html', "run all checks on all photos");
                        },
                        'mouseout': function () {
                            $('ucpng_overrides_title_panel').empty();
                        }
                    }
                }),
                document.createTextNode("  "),
                $chk($('approveAllPhotosButton')) ? document.createTextNode("") : // smartPhotoBoxes!
                new Element('button', {
                    'class': 'Butt approve-all-button',
                    id: 'approveAllPhotosButton',
                    html: "approve all photos",
                    events: {
                        'click': function (evt) {
                            var approveAllButton = $(evt.target);
			    approveAllButton.empty();
                            new Element('img', {
                                src: updatingIcon,
                            }).inject(approveAllButton);
                            $$('button.approve-button').each(function (button) {
                                button.click();
                            });
                            approveAllButton.dispose();
                        },
                        'mouseover': function () {
                            $('ucpng_overrides_title_panel').set('html', "approve all photos");
                        },
                        'mouseout': function () {
                            $('ucpng_overrides_title_panel').empty();
                        }
                    }
                })
            );
    }

    function togglePhotoInformationBoxes(challengeDefinition, discussionTopic, challengeEntries) {
        var allAllCell = $('allAllCell');
        var showInfoBoxesCheckbox = $('showInfoBoxes');
        if ($chk(showInfoBoxesCheckbox) && !showInfoBoxesCheckbox.checked) {
            // clean up
            if ($chk($('checkAllPhotosButton'))) {
                $('checkAllPhotosButton').dispose();
            }
            if ($chk($('approveAllPhotosButton'))) {
                $('approveAllPhotosButton').dispose();
            }
            $$('table[id^=UCPANG:][id$=.table]').getParent().dispose();
        } else {
            drawPhotoInformationBoxes(challengeDefinition, discussionTopic, challengeEntries, false);
        }
    }

    var UCPAVoteOverride = new Class({
        Implements: [Options],
        options: {
            vote: undefined,
            uiElement: undefined,
            id: undefined
        },
        initialize: function (options) {
            this.setOptions(options);
            this.options.id = this.options.uiElement.getParent('td.Said').
                                                     getParent('tr').
                                                     getElement('td.Who').
                                                     getElement('a').get('name');
        },
        handleEvent: function (e) {
            this.options.uiElement.empty();
            var div = new Element('div', {
                id: "UCPANG:replyOverrideDialogDiv:" + this.options.id,
                'class': 'ucpDialogStyle'
            }).inject(this.options.uiElement);
            var table = new Element('table', {
                border: '0',
                cellPadding: '5',
                cellSpacing: '0'
            }).inject(div);
            table.adopt(
                new Element('tr').adopt(
                    new Element('td', {
                        html: this.options.vote.poster().username
                    })
                )
            );
        }
    });

    var UCPACommentOverride = new Class({
        Implements: [Options],
        options: {
            comment: undefined,
            uiElement: undefined,
            id: undefined
        },
        initialize: function (options) {
            this.setOptions(options);
            this.options.id = this.options.uiElement.getParent('td.Said').
                                                     getParent('tr').
                                                     getElement('td.Who').
                                                     getElement('a').get('name');
        },
        handleEvent: function (e) {
            this.options.uiElement.empty();
            var div = new Element('div', {
                id: "UCPANG:replyOverrideDialogDiv:" + this.options.id,
                'class': 'ucpDialogStyle'
            }).inject(this.options.uiElement);
            var table = new Element('table', {
                border: '0',
                cellPadding: '5',
                cellSpacing: '0'
            }).inject(div);
            table.adopt(
                new Element('tr').adopt(
                    new Element('td', {
                        html: this.options.node.poster().username
                    })
                )
            );
        }
    });

    function timeAgo(seconds) {
	var diff = Math.floor(new Date().getTime() / 1000) - seconds;
	var monthsAgo = Math.floor(diff / (30 * 24 * 60 * 60));
		diff = diff - monthsAgo * (30 * 24 * 60 * 60);
	var daysAgo = Math.floor(diff / (24 * 60 * 60));
		diff = diff - daysAgo * (24 * 60 * 60);
	var hoursAgo = Math.floor(diff / (60 * 60));
		diff = diff - hoursAgo * (60 * 60);
	var minutesAgo = Math.floor(diff / 60);
	var secondsAgo = diff - minutesAgo * 60;

	var retval = undefined;
	if (monthsAgo > 0)    retval = monthsAgo + " months";
	if (daysAgo > 0)    { retval = (retval ? retval + ", " + daysAgo    : daysAgo    ) + " days"; }
	if (hoursAgo > 0)   { retval = (retval ? retval + ", " + hoursAgo   : hoursAgo   ) + " hours"; }
	if (minutesAgo > 0) { retval = (retval ? retval + ", " + minutesAgo : minutesAgo ) + " minutes"; }
	                      retval = (retval ? retval + ", " + secondsAgo : secondsAgo ) + " seconds ago";
	return retval;
    }

    function processDiscussionTopicInList(discussionTopic, replies, ucpThread) {
        var infoCell = $('UCPANG.info.' + ucpThread.topic());
        if (!$chk(infoCell)) {
            GM_log("no infoP!!");
            return;
        }
        var threadInfoImg = $('UCPANG.arrow.' + ucpThread.topic());
        threadInfoImg.set('src', images.up); // replace spinning balls
        infoCell.empty();
        var challengeDefinition = ucpThread.challengeDefinition();
        var overridesDefined = challengeDefinition.readChallengeDefinitionOverrides(new Element('div', { html: discussionTopic.message._content }));
        if (overridesDefined) {
            threadInfoImg.style.background = 'yellow';
        }
        try {
            var okImg = new Element('img', {
                src: defaultCheckIconSmall
            });
            var failImg = new Element('img', {
                src: errorIcon
            });
            if (challengeDefinition.scoreType() === "UNKNOWN") {
                infoCell.adopt(document.createTextNode('could not find a match'));
                infoCell.adopt(failImg.clone());
                threadInfoImg.style.background = 'red';
            } else {
                infoCell.adopt(
                    new Element('i').adopt(
                        new Element('span', {
                            html: challengeDefinition.name()
                        })
                    ),
                    new Element('span', {
                        html: " (score type "
                    }),
                    new Element('i').adopt(
                        new Element('span', {
                            html: challengeDefinition.scoreType()
                        })
                    ),
                    document.createTextNode(") "),
                    okImg.clone()
                );
            }
            // state check
            if (challengeDefinition.nonChallengeType()) {
                // no state to check
            } else { // (nameOk && isChallenge) || !nameOk
                infoCell.adopt(new Element('span', {
                    html: " --- "
                    })
                );
                // sometime, in some groups, normal challenges are numbered, closed ones not anymore
                var stateOk = false;
                var state;
                for (state in groupConfig.states()) {
                    if (!state.match(/RegExp$/) && groupConfig.states().hasOwnProperty(state)) {
                        if (ucpThread.challengeName().match(groupConfig.states()[state])) {
                            stateOk = true;
                            break;
                        }
                    }
                }
                if (stateOk) {
                    infoCell.adopt(
                        new Element('span', {
                            html: "status ("
                        }),
                        new Element('i').adopt(
                            new Element('span', {
                                html: state
                            })
                        ),
                        new Element('span', {
                            html: ") "
                        }),
                        okImg.clone()
                    );
                    if (challengeDefinition.scoreType() === "UNKNOWN") { // infoImg has red background
                        threadInfoImg.style.background = 'darkviolet';
                    }
                } else {
                    infoCell.adopt(
                        document.createTextNode("no matching status found "),
                        failImg.clone()
                    );
                    threadInfoImg.style.background = 'red';
                }
            }
        } catch (e) {
            GM_log("error: " + e);
        }
        if (ucpThread.challengeDefinition().nonChallengeType()) {
            return;
        }
        ucpThread.printStatus(); // TODO: this one should do what's been done above
        groupConfig.excludeReplyIndexes().each(function (index) {
		if (index == 0) {
                	ucpThread.findExcludesInDOMNode(new Element('div', { html: discussionTopic.message._content }));
			return;
		}
		if ($chk(replies) && replies.length > 0) {
			var challengeEntry = replies[index - 1];
			if (challengeEntry) {
				ucpThread.findExcludesInDOMNode(new Element('div', { html: challengeEntry.message._content }));
			}
		}
        });
        //GM_log("ready to print excludes");
        ucpThread.printExcludes();

        ucpThread.collectApiVotes(discussionTopic, replies);
        var votes  = ucpThread.votes();
        var comments = ucpThread.comments();
        var photos = ucpThread.photos();
        infoCell.adopt(
            new Element('br'),
            new Element('b', {
                html: 'photos:'
            })
        );
        photos.each(function (photo) {
            try {
		var commentAnchor = new Element('div', { 
			    html: timeAgo(photo.datecreated()) + ": " + photo.poster().username
		}).inject(infoCell);
		photo.options.comments.each(function (comment) {
			    commentAnchor.adopt(
				new Element('span', {
				    html: " - " + comment.msg
				}).addClass(comment.type === 'comment' ? '':
					    comment.type === 'warning' ? 'ucpa_warning' :
					    photo.poster().admin ? 'ucpa_warning' : 'ucpa_error')
			    );
		});
            } catch (e) {
                GM_log("error: " + e);
            }
        });
        infoCell.adopt(
            new Element('br'),
            new Element('b', {
                html: 'votes:'
            })
        );
        try {
            ucpProcessVotes(ucpThread);
        } catch (e) {
            GM_log("error processing votes: " + e);
        }
    }

    function processDiscussionTopic(discussionTopic, challengeEntries, ucpThread) {
        // announcement overrides
        try {
            var challengeAnnouncementCell = $('DiscussTopic').getElement('table td.Said');
            var challengeAnnouncementRow = challengeAnnouncementCell.getParent('tr');
        } catch (e) {
            // ignore
        }
        if (!discussionTopic) {
            ucpThread.setChallengeStatus("ERRORPARSING");
            return "none";
        }
        (new Element('tr').adopt(
            new Element('td', {
                colspan: 2
            }).adopt(
                ucpNewCell = new Element('p', { 
                    border: '0', 
                    'class': 'ucpDialogStyle'
                })
            ))
        ).inject(challengeAnnouncementRow, 'after');
        var challengeDefinition = ucpThread.challengeDefinition();
        var challengeAnnouncementWithBlockquote = $chk(challengeAnnouncementCell.getElement('blockquote'));
        var challengeAnnouncement = challengeAnnouncementCell;//.getElement('p');
        // reading overrides: we can use the 'td' element
        challengeDefinition.readChallengeDefinitionOverrides(challengeAnnouncement);
	isGroupAdministratorOrModerator(userNsid, groupConfig.groupId(), function (adminOrMod) {
		// print challenge config summary
		var challengeDefinitionTable = new UCPChallengeDefinitionUI(challengeDefinition.originalChallengeDefinition(), ucpThread.challengeName())
						.printAsTableWithDiff(
						    new UCPChallengeDefinitionUI(challengeDefinition, ucpThread.challengeName()), 
						    challengeAnnouncement, 
						    ucpNewCell, 
						    adminOrMod.moderator || adminOrMod.administrator);
		if (ucpThread.challengeDefinition().nonChallengeType() || ! (adminOrMod.moderator || adminOrMod.administrator ) ) {
		    return;
		}
		challengeDefinitionTable.adopt(allAllRow = new Element('tr'));
		allAllRow.adopt(allAllCell = new Element('td', {
		    colSpan: 10,
		    id: 'allAllCell'
		}));
		allAllCell.adopt(
		    allAllCheck = new Element('input', {
			type: 'checkbox',
			id: 'showInfoBoxes',
			events: {
			    click: function () {
				togglePhotoInformationBoxes(challengeDefinition, discussionTopic, challengeEntries);
			    }
			}
		    }),
		    new Element('label', {
			html: 'show photo information boxes ',
			'for': 'showInfoBoxes'
		    })
		);
		if (groupPreferences.smartPhotoBoxes()) {
		    drawPhotoInformationBoxes(challengeDefinition, discussionTopic, challengeEntries, true);
		}
	});
    }    

    function newNodeHandler(evt) {
        var target = $(evt.target);
        if (target.nodeName == 'DIV') {
		var div = $(target);
		if (div.get('id') == 'ined_edit') {
			// disable the workflow's SAVE button
			var saveButton = $('UCPANG-promote-wizard-save-button');
			if ($chk(saveButton)) {
				saveButton.set('class', 'DisabledButt');
				saveButton.set('title', 'close the inline edit box');
			}
		}
	}
    }
    function removedNodeHandler(evt) {
	var target = $(evt.target);
	if (target.nodeName == 'DIV') {
		var tarea = $(target);
		if (tarea.get('id') == 'ined_edit') {
			var saveButton = $('UCPANG-promote-wizard-save-button');
			if ($chk(saveButton)) {
				saveButton.set('title', '');
				if ($$('img.UCPANG-workflow-wizard-save-button').length == 0) {
					$('UCPANG-promote-wizard-save-button').set('class', 'Butt');
				}
			}
		}
	}
    }

    function addWorkflowDialog(discussionTopic, ucpThread) {
        (new Element('tr').adopt(
            new Element('td', {
                colspan: 2
            }).adopt(
                ucpWorkflowCell = new Element('p', { 
                    border: '0', 
		    id: 'UCPANG-workflow-cell',
                    'class': 'ucpDialogStyle'
                })
            ))
        ).inject($chk($('UCPANG-bump-button')) ? $('UCPANG-bump-button') : $('main').getElement('div.group-topic-detail-col h2'), 'after');
        var votes  = ucpThread.votes();
        var comments = ucpThread.comments();
        var photos = ucpThread.photos();
	photos.forEach( function (photo) {
		if (!$chk($('UCPANG-workflow-wizard-hidden-photo-approved-' + photo.photoId()))) {
		    new Element('input', { 
			type: 'hidden', 
			id: 'UCPANG-workflow-wizard-hidden-photo-approved-' + photo.photoId(), 
			value: photo.approved(),
			alt: photo.approvedBy()
		    }).inject($$('body')[0]);
		}
	});
	ucpWorkflowCell.adopt(new Element('p', {
		html: 'UCP workflow:',
		styles: {
			fontWeight: 'bold'
		}
	}));
        var challengeDefinition = ucpThread.challengeDefinition();
	ucpWorkflowCell.adopt(new Element('div', {
		html: 'found ' + photos.length + ' photo' + (photos.length == 1 ? '' : 's') + 
		      (challengeDefinition.neededPhotos() > 0 ? ' (' + challengeDefinition.neededPhotos() + ' needed)' : '')
	}));
	if (votes.length > 0) {
		var lastvote = votes[votes.length - 1];
		ucpWorkflowCell.adopt(new Element('div', {
			html: 'score: <b>' + ucpThread.scoreSummary(false) + '</b> (last vote by ' + lastvote.poster().username + ')'
		}));
	}
	ucpWorkflowCell.adopt(new Element('div', {
		html: 'status: ' + ucpThread.challengeStatus()
	}));
	if (ucpThread.hasError()) {
		new Element('div', {
			html: 'error(s): ' + ucpThread.error(),
			styles: {
				color: 'red'
			}
		}).inject(ucpWorkflowCell);
	}
	if (ucpThread.hasWarning()) {
		new Element('div', {
			html: 'warning(s): ' + ucpThread.warning(),
			styles: {
				color: 'red'
			}
		}).inject(ucpWorkflowCell);
	}
	switch (ucpThread.challengeStatus()) {
		case "Open":
			provideOpenToVoteWizard(ucpThread.filled(), ucpWorkflowCell);
			provideVoteToClosedWizard(false, ucpThread, ucpWorkflowCell);
			challengeDefinition.workflow().recycle_thread == true ? 
				provideClosedToCleaningWizard(false, ucpThread, ucpWorkflowCell) :
				provideClosedToAwardedWizard(false, ucpThread, ucpWorkflowCell);
			provideAwardedToNewWizard(false, ucpThread, ucpWorkflowCell);
			break;
		case "Filled":
			provideOpenToVoteWizard(true, ucpWorkflowCell);
			provideVoteToClosedWizard(false, ucpThread, ucpWorkflowCell);
			challengeDefinition.workflow().recycle_thread == true ? 
				provideClosedToCleaningWizard(false, ucpThread, ucpWorkflowCell) :
				provideClosedToAwardedWizard(false, ucpThread, ucpWorkflowCell);
			provideAwardedToNewWizard(false, ucpThread, ucpWorkflowCell);
			break;
		case "--VOTE--":
			provideOpenToVoteWizard(false, ucpWorkflowCell);
			provideVoteToClosedWizard(challengeDefinition.workflow().recycle_thread ? false : ucpThread.finished(), ucpThread, ucpWorkflowCell);
			challengeDefinition.workflow().recycle_thread == true ? 
				provideClosedToCleaningWizard(false, ucpThread, ucpWorkflowCell) :
				provideClosedToAwardedWizard(false, ucpThread, ucpWorkflowCell);
			provideAwardedToNewWizard(false, ucpThread, ucpWorkflowCell);
			break;
		case "Finished":
			provideOpenToVoteWizard(false, ucpWorkflowCell);
			provideVoteToClosedWizard(challengeDefinition.workflow().recycle_thread ? false : !ucpThread.isClosed().closed, ucpThread, ucpWorkflowCell);
			challengeDefinition.workflow().recycle_thread == true ? 
				provideClosedToCleaningWizard(ucpThread.finished(), ucpThread, ucpWorkflowCell) :
				provideClosedToAwardedWizard(ucpThread.isClosed().closed && ucpThread.isClosed().closer.innerHTML.match(GM_getLoggedInUser()), ucpThread, ucpWorkflowCell);
			provideAwardedToNewWizard(false, ucpThread, ucpWorkflowCell);
			break;
		case "Closed":
			provideOpenToVoteWizard(false, ucpWorkflowCell);
			provideVoteToClosedWizard(false, ucpThread, ucpWorkflowCell);
			challengeDefinition.workflow().recycle_thread == true ? 
				provideClosedToCleaningWizard(false, ucpThread, ucpWorkflowCell) :
				provideClosedToAwardedWizard(false, ucpThread, ucpWorkflowCell);
			provideAwardedToNewWizard(ucpThread.isClosed().closed && ucpThread.isClosed().closer.innerHTML.match(GM_getLoggedInUser()), ucpThread, ucpWorkflowCell);
			break;
		case "Unknown":
			provideAwardedToNewWizard(false, ucpThread, ucpWorkflowCell);
			break;
		case "none":
			if (ucpThread instanceof UCPChatThread) {
				provideOpenToVoteWizard(false, ucpWorkflowCell);
				provideVoteToClosedWizard(false, ucpThread, ucpWorkflowCell);
				provideClosedToAwardedWizard(false, ucpThread, ucpWorkflowCell);
				provideAwardedToNewWizard(false, ucpThread, ucpWorkflowCell);
				break;
			}
			new Element('div', {
				html: 'no workflow defined for this type of thread '
			}).inject(ucpWorkflowCell);
			break;
		default:
			new Element('div', {
				html: 'error: was unable to calculate challenge status - please report (state=\'' + ucpThread.challengeStatus() + '\')'
			}).inject(ucpWorkflowCell);
			return; // leave
	}

    }

    function provideWorkflowAction(enabled, ucpWorkflowCell, idInfix, label, buttonText, toggleWizardCallback) {
        var elementDiv = new Element('div').inject(ucpWorkflowCell);
	new Element('input', {
            type: 'radio',
            id: 'UCPANG-' + idInfix + 'Wizard-checkbox',
	    name: 'UCPANG-workflow-action',
            checked: enabled,
	    events: {
		'change': function (evt) {
			$$('label[id*=Wizard-label]').forEach(function (el) {
				el.setStyle('color', 'grey');
			});
			$$('button[id*=Wizard-button]').forEach(function (el) {
				el.set('class', 'DisabledButt');
			});
			$('UCPANG-' + idInfix + 'Wizard-label').setStyle('color', '');
			$('UCPANG-' + idInfix + 'Wizard-button').set('class', 'Butt');
			}
		}
        }).inject(elementDiv);
	new Element('label', {
		'for': 'UCPANG-' + idInfix + 'Wizard-checkbox',
		id: 'UCPANG-' + idInfix + 'Wizard-label',
		html: label,
		styles: {
		    color: enabled ? '' : 'grey'
		}
	}).inject(elementDiv);
	new Element('span', { html: ' ' }).inject(elementDiv);
	new Element('button', {
		'class': enabled ? 'Butt' : 'DisabledButt',
		id: 'UCPANG-' + idInfix + 'Wizard-button',
		html: buttonText,
		title: 'opens the \'' + buttonText + '\' dialog',
		events: {
			'click': function () {
				if ( ! $('UCPANG-' + idInfix + 'Wizard-checkbox').checked) {
					return;
				}
				toggleWizardCallback(ucpThread);
			}
		}
	}) .inject(elementDiv);
	new Element('span', { html: ' ' }).inject(elementDiv);
    }
    
    function provideOpenToVoteWizard(enabled, ucpWorkflowCell) {
	provideWorkflowAction(enabled, ucpWorkflowCell, 
		'openToVote', 
		'1. change challenge title from state \'open\' to state \'vote\'', 
		'Promote..', 
		toggleOpenToVoteWizardDialog);
    }

    function provideVoteToClosedWizard(enabled, ucpThread, ucpWorkflowCell) {
    	provideWorkflowAction(enabled, ucpWorkflowCell,
		'voteToClosed',
		'2. close the challenge thread',
		'Claim ownership..',
		toggleVoteToClosedWizardDialog);
    }

    function provideClosedToCleaningWizard(enabled, ucpThread, ucpWorkflowCell) {
    	provideWorkflowAction(enabled, ucpWorkflowCell,
		'closedToCleaning',
		'3. clean challenge (remove votes, add losing thumbnail, ..)',
		'Clean..',
		toggleClosedToCleaningWizardDialog);
    }

    function provideClosedToAwardedWizard(enabled, ucpThread, ucpWorkflowCell) {
    	provideWorkflowAction(enabled, ucpWorkflowCell,
		'closedToAwarded',
		'3. finalize challenge (award, tag, invite..)',
		'Finalize..',
		toggleClosedToAwardedWizardDialog);
    }

    function provideAwardedToNewWizard(enabled, ucpThread, ucpWorkflowCell) {
    	provideWorkflowAction(enabled, ucpWorkflowCell,
                'awardedToNew',
		'4. start a new challenge',
		'Create..',
		toggleAwardedToNewWizardDialog);
    }

    function createEditableLabelElement(parent, id, defaultValue, validateFunction) {
    	    var newValueValidation = {
	    	color: 'black',
		valid: true,
		error: undefined
	    };
	    if ($chk(validateFunction)) {
	    	newValueValidation = validateFunction(defaultValue);
	    }
	    new Element('b', {
		html: defaultValue,
		id: id,
		styles: {
			color: newValueValidation.color
		},
		title: newValueValidation.title,
		events: {
			'update-theme': function (evt) {
					var newTheme = evt;
					var placeholder = '%__theme__%';
					this.set('html', $(id + '-hidden').get('value').replace(placeholder, newTheme));
				}
		}
	    }).inject(parent);
	    new Element('input', {
	    	type: 'hidden',
		id: id + '-hidden', // contains the templated version (%__theme__% or %__username__%)
		value: defaultValue,
		events: {
			'reset-default': function (evt) {
					var defaultValue = evt;
					this.set('value', defaultValue);
				}
		}
	    }).inject(parent);
	    new Element('span', {
	    	html: '    '
	    }).inject(parent);
	    new Element('img', {
		src: images.edit,
		id: id + '-edit-button',
		height: 16,
		title: 'edit',
		'class': 'UCPANG-workflow-wizard-edit-button',
		styles: {
			cursor: 'pointer'
		},
		events: {
			'click': function (evt) {
				var editImg = $(evt.target);
				var id = editImg.id.replace('-edit-button', '');
				if (editImg.hasClass('UCPANG-workflow-wizard-edit-button')) {
					$('UCPANG-promote-wizard-save-button').set('class', 'DisabledButt');
					$('UCPANG-promote-wizard-save-button').set('title', 'first close any edit fields');
					$(id).addClass('hidden_from_view');
					editImg.set('src', images.save);
					editImg.set('title', 'save');
					editImg.addClass('UCPANG-workflow-wizard-save-button');
					editImg.removeClass('UCPANG-workflow-wizard-edit-button');
					var cell = $(evt.target).getParent();
					new Element('input', {
						type: 'text',
						id: id + '-input',
						value: $(id).get('text'), // not 'html': 'text' decodes html entities
						styles: {
							width: '80%'
						}
					}).inject(editImg, 'before');
				} else {
					$(id).removeClass('hidden_from_view');
					editImg.set('src', images.edit);
					editImg.set('title', 'edit');
					editImg.addClass('UCPANG-workflow-wizard-edit-button');
					editImg.removeClass('UCPANG-workflow-wizard-save-button');
					var editedTitle = $(id + '-input').value;
					$(id + '-input').dispose();
					$(id).set('html', editedTitle);
					var validation = newValueValidation;
					if ($chk(validateFunction)) validation = validateFunction(editedTitle);
					$(id).setStyle('color', validation.color);
					$(id).set('title', validation.title);
					if ($$('img.UCPANG-workflow-wizard-save-button').length == 0 && !$chk($('ined_edit'))) {
						$('UCPANG-promote-wizard-save-button').set('class', 'Butt');
						$('UCPANG-promote-wizard-save-button').set('title', '');
					}
				}
			}
		}
	    }).inject(parent);
    }

    function createEditableTextElement(parent, id, bgColor, defaultValue) {
	    new Element('div', {
		html: $chk(defaultValue) ? defaultValue : '<b>--none--</b>',
		id: id,
		styles: {
			border: '1px solid',
			width: '500px',
			backgroundColor: ($chk(bgColor) ? bgColor : '')
		}
	    }).inject(parent);
	    new Element('span', {
	    	html: '    '
	    }).inject(parent);
	    new Element('img', {
		src: images.edit,
		id: id + '-edit-button',
		height: 16,
		title: 'edit',
		'class': 'UCPANG-workflow-wizard-edit-button',
		styles: {
			cursor: 'pointer'
		},
		events: {
			'click': function (evt) {
				var editImg = $(evt.target);
				var id = editImg.id.replace('-edit-button', '');
				if (editImg.hasClass('UCPANG-workflow-wizard-edit-button')) {
					$('UCPANG-promote-wizard-save-button').set('class', 'DisabledButt');
					$('UCPANG-promote-wizard-save-button').set('title', 'first close any edit fields');
					$(id).addClass('hidden_from_view');
					editImg.set('src', images.save);
					editImg.addClass('UCPANG-workflow-wizard-save-button');
					editImg.removeClass('UCPANG-workflow-wizard-edit-button');
					var cell = $(evt.target).getParent();
					new Element('textarea', {
						rows: 20,
						cols: 80,
						id: id + '-input',
						value: $(id).get('html').replace(/\n/g, '').replace(/<br[^>]*>/g, '\n') // here we need the 'html': 'text' strips images
					}).inject(editImg, 'before');
				} else {
					$(id).removeClass('hidden_from_view');
					editImg.set('src', images.edit);
					editImg.addClass('UCPANG-workflow-wizard-edit-button');
					editImg.removeClass('UCPANG-workflow-wizard-save-button');
					var editedText = $(id + '-input').value;
					$(id + '-input').dispose();
					$(id).set('html', editedText.replace(/\n/g, '<br>'));
					if ($$('img.UCPANG-workflow-wizard-save-button').length == 0 && !$chk($('ined_edit'))) {
						$('UCPANG-promote-wizard-save-button').set('class', 'Butt');
						$('UCPANG-promote-wizard-save-button').set('title', '');
					}
				}
			}
		}
	    }).inject(parent);
    }

    function provideTitleChangeRow(data) {
    	var table = data.table;
	var titleReplacer = data.titleReplacer;
	var nextStepChecker = data.nextStepChecker;
	
	var currentTitleRow = new Element('tr', { id: 'UCPANG-workflow-wizard-current-title-row' }).inject(table);
	var currentTitle = ucpThread.challengeName();
	var currentTitleLabelCell = new Element('td', {
		html: 'current&nbsp;title:',
		id: 'UCPANG-workflow-wizard-current-title-label-cell'
	    }).inject(currentTitleRow);
	var currentTitleCell = new Element('td', {
		html: '<b>' + currentTitle + '</b>',
		colspan: 2, // 3 moves the titles too much to the rigth in the promote dialog (1 is also fine)
		id: 'UCPANG-workflow-wizard-current-title-cell'
	    }).inject(currentTitleRow);

	var newTitleRow = new Element('tr', { id: 'UCPANG-workflow-wizard-new-title-row' }).inject(table);
	var newTitleLabelCell = new Element('td', { html: 'new title:',
				id: 'UCPANG-workflow-wizard-new-title-label' }).inject(newTitleRow);
	var newTitleCell = new Element('td', {
				colspan: 3,
				id: 'UCPANG-workflow-wizard-new-title-cell' }).inject(newTitleRow);

	    var newTitle = currentTitle;
	    if (currentTitle.match(new RegExp(titleReplacer.expression, titleReplacer.flags))) {
	    	newTitle = currentTitle.replace(new RegExp(titleReplacer.expression, titleReplacer.flags),
			$chk(titleReplacer.template_replacement) ? titleReplacer.template_replacement :
			$chk(titleReplacer.replacement) ? titleReplacer.replacement :
							    new Function(titleReplacer.replacement_function));
	    } else if ($chk(titleReplacer.expression2) && currentTitle.match(new RegExp(titleReplacer.expression2, titleReplacer.flags2))) {
	    	newTitle = currentTitle.replace(new RegExp(titleReplacer.expression2, titleReplacer.flags2), 
			$chk(titleReplacer.template_replacement2) ? titleReplacer.template_replacement2 :
			$chk(titleReplacer.replacement2) ? titleReplacer.replacement2 :
							     new Function(titleReplacer.replacement2_function)
			);
	    }

    	    createEditableLabelElement(newTitleCell, 'UCPANG-workflow-wizard-newtitle', newTitle, function (title) {
	    	if (title.match(new RegExp(nextStepChecker.expression, nextStepChecker.flags))) {
			return {
				color: 'black'
			}
		} else if ($chk(nextStepChecker.expression2) && title.match(new RegExp(nextStepChecker.expression2, nextStepChecker.flags2))) {
			return {
				color: 'black'
			}
		} else {
			return {
				color: 'red',
				title: 'this title will not be recognized in the next step'
			}
		}
	    });
	    return { currentTitle: currentTitle, newTitle: newTitle };
    }

    function toggleOpenToVoteWizardDialog() {
	if ($chk($('UCPANG-promote-wizard-dialog'))) {
		$('UCPANG-promote-wizard-dialog').destroy();
	} else {
	    var wizardDialogContainer = new Element('p', { // ucpDialogStyle draws border on table
                'class': 'ucpDialogStyle',
		id: 'UCPANG-promote-wizard-dialog'
	    });
            var wizardDialog = new Element('table', {
		border: 0
	    });
	    var titles = provideTitleChangeRow({
	    	table: wizardDialog,
	    	titleReplacer: groupConfig.workflow().fromOpenToVoteRegExp,
	    	nextStepChecker: groupConfig.workflow().fromVoteToClosedRegExp
	    });
	    var newTitle = titles.newTitle;
	    var currentTitle = titles.currentTitle;

	    var photoRow = new Element('tr').inject(wizardDialog);
	    var photoCell = new Element('td', { colspan: 3, align: 'left', styles: { 'min-width': '300px' } }).inject(photoRow);
	    var allApproved = true;
	    ucpThread.photos().forEach(function (photo) {
	    	try {
			var approved = $('UCPANG-workflow-wizard-hidden-photo-approved-' + photo.photoId()).get('value');
			approved = (approved == true || approved == 'true');
			allApproved = allApproved && approved;
			var approvedBy = $('UCPANG-workflow-wizard-hidden-photo-approved-' + photo.photoId()).get('alt');
		    	new Element('a', {
				html: 'photo by ' + photo.poster().username + (approved ? ' approved by ' + approvedBy : ' (not formally approved)'),
				href: '#comment' + photo.replyId(),
				id: 'UCPANG-workflow-wizard-photo-approved-' + photo.photoId(),
				'class': approved ? 'UCPANG-workflow-approved' : 'UCPANG-workflow-notapproved',
				styles: {
					color: approved ? '' : 'red'
				},
				events: {
					click: function(evt) {
						var target = this;
						// place the dialog next to the photo
						var topline = 30;
						var float = new Element('div', {
					            styles: {
					                overflow: 'auto',
					                zIndex: 1014,
					                maxHeight: (window.innerHeight - topline - 20) + 'px',
					                maxWidth: (window.innerWidth - 50) + 'px',
					                minWidth: 640,
					                position: 'fixed',
					                opacity: '0.98',
					                left: '10px', //evt.event.pageX,
					                top: topline,
					                display: 'block',
					                visibility: 'visible'
					            }
					        }).inject($(document).getElement('body'));
						float.adopt($('UCPANG-promote-wizard-dialog'));
					},
					'approved-by': function (evt) {
						this.set('html',  this.get('html').replace(' (not formally approved)', ' approved by ' + GM_getLoggedInUser()));
						this.setStyle('color', '');
						this.set('class', 'UCPANG-workflow-approved');
					}
				}
			}).inject(new Element('div').inject(photoCell));
		} catch (e) {
			GM_log("error listing approvals: " + e);
		}
	    });

	    var buttonRow = new Element('tr', { valign: 'top' }).inject(wizardDialog);
	    var buttonCell = new Element('td', {
		colspan: 4,
		align: 'right',
		valign: 'top'
	    }).inject(buttonRow);
	    if (!allApproved) {
            	new Element('button', {
                	'class': "Butt",
                	id: 'checkAllPhotosButton2',
                	html: "check all photos",
                	events: {
                    		'click': function () {
                        		this.empty();
                        		new Element('img', {
                            			src: updatingIcon,
                        		}).inject(this);
                        		$$('button.check-all-button').each(function (button) {
                            			button.click();
                        		});
                        		this.set('html', 'results are below each photo');
                        		this.set('enabled', false);
					this.fireEvent('go-float');
                    		},
                    		'mouseover': function () {
                        		$('ucpng_overrides_title_panel').set('html', "run all checks on all photos");
                    		},
                    		'mouseout': function () {
                        		$('ucpng_overrides_title_panel').empty();
                    		},
				'go-float': function (evt) {
					var nonApprovedPhotos = $$('.UCPANG-workflow-notapproved');
					if ($chk(nonApprovedPhotos) && nonApprovedPhotos.length > 0) {
						nonApprovedPhotos[0].click();
					}
				}
                	}
	    	}).inject(buttonCell);
	    	new Element('span', {
			html: ' '
	    	}).inject(buttonCell);
	    }
	    new Element('button', {
		'class': 'CancelButt',
		html: 'Cancel',
		events: {
			'click': function (evt) {
				$('UCPANG-promote-wizard-dialog').destroy();
			}
		}
	    }).inject(buttonCell);
	    new Element('span', {
		html: ' '
	    }).inject(buttonCell);
	    new Element('button', {
		'class': $chk($('ined_edit')) ? 'DisabledButt' : 'Butt', // prevent posting the edit box from Steeev's inline editor
		html: 'SAVE',
		id: 'UCPANG-promote-wizard-save-button',
		events: {
			'click': function (evt) {
				var saveButton = $('UCPANG-promote-wizard-save-button');
				if (saveButton.hasClass('Butt')) {
					saveButton.set('class', 'DisabledButt');
					updateChallengeTitle($('UCPANG-workflow-wizard-newtitle').get('text'), function (retval) { // use 'text', not 'html'
					    try {
						var threadURL = /(.*flickr.com\/groups\/[^\/]+\/discuss\/\d+)/.exec(document.location.href)[1] + '/';
						new Element('a', {
							href: threadURL,
							html: 'click here to reload the page'
						}).inject(new Element('td', { colspan: 4 }).inject(new Element('tr').inject($('UCPANG-promote-wizard-dialog'))));
                                                if (retval.success) {
							saveButton.getElement('img').set('src', defaultCheckIconSmall);
                                                        document.location.href = threadURL;
                                                } else {
							saveButton.getElement('img').set('src', errorIcon);
							saveButton.set('title', retval.message)
                                                        new Element('label', {
								html: retval.message,
								styles: {
									color: 'red',
									weight: 'bold'
								}
							}).inject(new Element('td', { colspan: 4 }).inject(new Element('tr').inject($('UCPANG-promote-wizard-dialog'))));
                                                }
					    } catch (e) {
						alert(e);
					    }
                                        });
				}
			}
		}
	    }).inject(buttonCell);

	    wizardDialog.inject(wizardDialogContainer);
	    wizardDialogContainer.inject($('UCPANG-workflow-cell'), 'after');
	}
    }

    function loadMedals(callback) {
	var loadedMedals = undefined;
    	var workflow = groupConfig.workflow();
	if (!$chk(workflow)) {
		callback({
			success: false,
			error: 'no workflow for this group'
		});
		return;
	}
	var medalThread = workflow.medalThread;
	if (!$chk(medalThread)) {
		callback({
			success: false,
			error: 'no medal thread defined in workflow - contact Alesa Dam for support'
		});
		return;
	}
	new Request({
                method:"GET",
                url:medalThread,
                headers:{
                        "User-Agent":"monkeyagent",
                        "Accept":"text/monkey,text/xml"
                },
                onSuccess:function(responseText, responseXML) {
          	    try {
                	var tempDiv = new Element('div', {
                    		html: responseText.stripScripts()
                	});

			if ($chk(tempDiv.getElement('p.Problem'))) {
				callback({
					success: false,
					error: tempDiv.getElement('p.Problem').innerHTML
				});
				return;
			}
			try {
            			var replies = tempDiv.getElement('div[id=DiscussTopic]').getElement('table.TopicReply').getElements('td.Said');
			} catch (e) {
				callback({
					success: false,
					error: 'no replies found in medal thread'
				});
				return;
			}
			loadedMedals = {
				success: true,
				reportMissingTagTopic: undefined,
				reportMissingInviteTopic: undefined,
				reportSweepTopics: [],
				reportWinnerTopics: [],
				medals: []
			};
            		replies.each(function (reply, idx) {
                		try {
					if (reply.innerHTML.match("===Start of ReportTopics===")) {
					/* => per medal there could be multiple report threads:
					1. post to chat
					2. post to showroom thread
					3. post to back room HOF thread
					===Start of ReportWinnerTopic===
					topicId: 9876543210
					html: %__winner__username__% has won <a href="%__challenge__url__%">%__challenge__title__%</a> with
					<a href="%__winner__photourl__%"><img src="%__winner__image__url__%"/></a>
					===End of ReportWinnerTopic===
					===Start of ReportWinnerTopic===
					topicId: ...
					...
					===End of ReportWinnerTopic===

					===Start of MissingInviteTopic===
					topicId: 0123456789
					html: .. needs invite for group %__groupname__%
					===End of MissingInviteTopic===

					...
					*/ // TODO
					    var reportTopics = reply.innerHTML.split("===Start of ReportTopics===")[1]
									.split("===End of ReportTopics===")[0]
									.replace('/<br>/g', '\n');
					    if ($chk(reportTopics)) {
						var reports = [];
						// TODO
					    }
					    return; // there is only one ReportTopics reply in the medals thread
					}
                    			var title = reply.innerHTML.split("===Start of Title===")[1]
                                       				   .split("===End of Title===")[0]
                                       				   .replace(/<[^>]+>/g, '');
                    			var medal = reply.innerHTML.split("===Start of Medal===")[1]
                                              			   .split("===End of Medal===")[0]
								   .replace(/\n/g, '')
								   .replace(/^<br>/g, '')
                                               			   .replace(/<br>/g, '\n');
					if (reply.innerHTML.match("===Start of Tag===")) {
	                    			var tags = reply.innerHTML.split("===Start of Tag===")[1]
                                               			  .split("===End of Tag===")[0]
                                               			  .replace(/<br>/g, '\n');
					}
					if (reply.innerHTML.match("===Start of Tags===")) {
						/* => per medal
						tags: "challenge winner" test
						reportMissing: http://www.flickr.com/groups/some_backroom/discuss/987654321
						html: unable to tag [%__photo_url__%] with %__tags__% (%__reason__%)
						*/
						// TODO
					}
					if (reply.innerHTML.match("===Start of GroupID===")) {
	                    			var groupIdBlock = reply.innerHTML.split("===Start of GroupID===")[1]
                                               			     .split("===End of GroupID===")[0]
                                               			     .replace(/<br>/g, '\n');
						var groupInvites = [];
						if ($chk(groupIdBlock)) {
							groupInvites = groupIdBlock.split(/(?:\n| )/).filter( function (groupId) {
								return groupId.match(/\d+@\w\d{2}/);
							}).map( function (groupId) {
								return { groupId: groupId.match(/(\d+@\w\d{2})/)[1] };
							});
						}
					}
					if (reply.innerHTML.match("===Start of Invites===")) {
						/* => per medal
						groupId: 0123456789@N01
						groupId: 1234567890@N34
						reportMissing: http://www.flickr.com/groups/some_backroom/discuss/987654321/
						html: unable to invite [%__photo__url__%] to group 
						<a href="%__invite__group__url__%">%__invite__group__name__%</a> (%__reason__%)
						*/
						// TODO
					}
					if (reply.innerHTML.match("===Start of Referrer===")) {
						var referrer = reply.innerHTML.split("===Start of Referrer===")[1]
									.split("===End of Referrer===")[0]
								   	.replace(/\n/g, '')
									.replace(/^<br>/g, '')
									.replace(/<br>/g, '\n')
									.replace(/\n$/, '');
						if (reply.innerHTML.match("===Start of ReferrerReplacement===")) {
							var referrerReplacement = reply.innerHTML.split("===Start of ReferrerReplacement===")[1]
									.split("===End of ReferrerReplacement===")[0]
									.replace(/\n/g, '')
									.replace(/^<br>/g, '')
									.replace(/<br>/g, '\n')
									.replace(/\n$/, '');
						}
					}
					loadedMedals.medals[loadedMedals.medals.length] = { // don't use array index: there could be a regular comment between medals
						title: title,
						medal: medal,
						tags: tags,
						groupInvites: groupInvites,
						referrer: referrer,
						referrerReplacement : referrerReplacement,
						reports: reports
					};
                		} catch (e) {
                    			GM_log("error reading medal entry - skipping (" + e + ")");
                		}
			});
			GM_log( "Loading medals complete" );
			callback(loadedMedals);
			return;
          	    } catch (e) {
            		callback({
				success: false,
				error: e
			});
			return;
          	    }
               	},
		onFailure: function (response) {
			callback({
				success: false,
				error: response.statusText
			});
			return;
		}
	}).send(); // end Request
    }

    function loadThemes(callback) {
    	var workflow = groupConfig.workflow();
	if (!$chk(workflow)) {
		callback({
			success: false,
			error: 'no workflow for this group'
		});
	}
	var themesThread = workflow.themesThread;
	if (!$chk(themesThread)) {
		callback({
			success: false,
			error: 'no themes comment defined in workflow'
		});
	}
	new Request({
                method:"GET",
                url:themesThread,
                headers:{
                        "User-Agent":"monkeyagent",
                        "Accept":"text/monkey,text/xml"
                },
                onSuccess:function(responseText, responseXML) {
          	    try {
                	var tempDiv = new Element('div', {
                    		html: responseText.stripScripts()
                	});
			if ($chk(tempDiv.getElement('p.Problem'))) {
				callback({
					success: false,
					error: tempDiv.getElement('p.Problem').innerHTML
				});
				return;
			}

            		var themesHTML = tempDiv.getElement('div[id=DiscussTopic]').get('html');
			if (!$chk(themesHTML)) {
				callback({
					success: false,
					error: 'no data found in theme thread'
				});
				return;
			}
			var retval = {
				success: true,
				themes: []
			};
			themesHTML.split("===Start of theme list===").each(function (block) {
			    try {
			    	if (block.match("===End of theme list===")) {
					var themelist = block.split( "===End of theme list===" )[ 0 ];
					themelist = themelist.replace(/\n/g, '').split( /<br[^>]*>/ ); //into array
					retval.themes = retval.themes.concat(themelist);
				}
			    } catch (e) {
			    	// ignore
			    }
			});

			GM_log( "Loading themes complete" );
			callback(retval);
          	    } catch (e) {
            		callback({
				success: false,
				error: e
			});
          	    }
               	},
		onFailure: function (response) {
			callback({
				success: false,
				error: response.statusText
			});
		}
	}).send(); // end Request
    }

    function loadHeaders(callback) {
    	var workflow = groupConfig.workflow();
	if (!$chk(workflow)) {
		callback({
			success: false,
			error: 'no workflow for this group'
		});
		return;
	}
	var headersThread = workflow.headersThread;
	if (!$chk(headersThread)) {
		callback({
			success: false,
			error: 'no header thread defined in workflow'
		});
		return;
	}
	new Request({
                method:"GET",
                url:headersThread,
                headers:{
                        "User-Agent":"monkeyagent",
                        "Accept":"text/monkey,text/xml"
                },
                onSuccess:function(responseText, responseXML) {
          	    try {
                	var tempDiv = new Element('div', {
                    		html: responseText.stripScripts()
                	});

			if ($chk(tempDiv.getElement('p.Problem'))) {
				callback({
					success: false,
					error: tempDiv.getElement('p.Problem').innerHTML
				});
				return;
			}
			try {
            			var replies = tempDiv.getElement('div[id=DiscussTopic]').getElement('table.TopicReply').getElements('td.Said');
			} catch (e) {
				callback({
					success: false,
					error: 'no replies found in medal thread'
				});
				return;
			}
			if (replies.snapshotLength == 0) {
				callback({
					success: false,
					error: 'no replies found in header thread'
				});
				return;
			}
			var retval = {
				success: true,
				headers: []
			};
            		replies.each(function (reply) {
                		try {
		                    var title = reply.innerHTML.split("===Start of Title===")[1]
                                               .split("===End of Title===")[0]
					       .replace(/<br>/g, '\n')
                                               .replace(/<[^>]+>/g, '');
		                    var header = reply.innerHTML.split("===Start of Header===")[1]
                                                .split("===End of Header===")[0]
						.replace(/\n/g, '')
						.replace(/^<br>/, '');
		                    if (reply.innerHTML.match("===Start of Theme===")) {
                		        var theme = reply.innerHTML.split("===Start of Theme===")[1]
                                                   .split("===End of Theme===")[0]
						   .replace(/\n/g, '')
						   .replace(/^\s*(.*)\s*$/, '$1')
                                                   .replace(/<[^>]+>/g, '');
				    }
				    var titles = undefined; //title.split(/\n/g);
				    if (!$chk(titles)) {
				    	//GM_log("single line title");
				    	titles = [];
					titles[0] = title;
				    }
				    var themes = undefined; // $chk(theme) ? theme.split(/\n/g) : [];
				    if (!$chk(themes)) {
				    	//GM_log("single line theme");
				    	themes = [];
					themes[0] = theme;
				    }
				    if (themes.length <= 1 && titles.length == 1) { // the most common case
				    	retval.headers[retval.headers.length] = {	// don't use array index: there could be a regular comment between medals
						title: titles[0],
						header: header,
						theme: themes.length > 0 ? themes[0] : undefined
					};
				    } else {
				    // TODO
				    GM_log("multiple titles, or multiple themes per header not supported yet");
				    	// it makes sense to have multiple titles to share the same header, and free theme:
					// #1 - #10: Regular challenge
					// could be defined as 
					// #1: Regular challenge
					// #2: Regular challenge
					// ...
					// all with the same header, and no fixed theme
					//
					// it makes sense to have multiple titles to share the same header, with one fixed theme:
					// #1: Regular challenge
					// #2: Regular challenge
					// ...
					// theme: 
					// OPEN - 
					//
					// it does not make sense to have 1 title with multiple fixed themes: the script would not know which one to choose
					// possible solution: replace the theme list, with a 'fixed theme list'
					//
					// it makes sense to have n titles share the same header, with n fixed themes; 1-1 relationship
					// #13: Diamond Heart Challenge
					// #14: Diamond Heart Challenge
					// themes:
					// 13 - OPEN - Diamond Heart Challenge - Anything Goes!
					// 14 - OPEN - Diamond Heart Challenge 
				    }
                		} catch (e) {
                    			GM_log("error reading header entry - skipping (" + e + ")");
					//GM_log("html: " + reply.innerHTML);
                		}
			});
			GM_log( "Loading headers complete" );
			callback(retval);
          	    } catch (e) {
		    	callback({
            			success: false,
				error: e
			});
			return;
          	    }
               	},
		onFailure: function (response) {
			callback({
				success: false,
				error: response.statusText
			});
			return;
		}
	}).send(); // end Request
    }

var remoteActions = [];
var failedRemoteActions = [];
var expectedRemoteActions = new Hash();
var winnersHashes = [];

    function listPlayers(data) {
	var playersElement = data.playersElement;
	var playerHash = data.playerHash;
	var ucpThread = data.ucpThread;
	var idPrefix = data.idPrefix;
	var radio = data.radio;
	var winnerChangeCallback = data.winnerChangeCallback;

	try {
		if (idPrefix.match('winner')) {
			var votesInLastvote = ucpThread.votes()[ucpThread.votes().length - 1].options.votesArray.length - 1;
			if (votesInLastvote > ucpThread.photos().length) {
				new Element('label', {
					html: 'there are votes for ' + votesInLastvote + ' entries, but the script found ' + ucpThread.photos().length + ' photos - automatic winner detection could be wrong',
					styles: {
						color: 'red'
					}
				}).inject(new Element('td', { colspan: 3 }).inject(new Element('tr').inject($('UCPANG-workflow-wizard-current-title-row'), 'before')));
			}
		}
	} catch (e) {
		GM_log("error checking number of entries: " + e);
	}

	ucpThread.photos().each( function (competitor, idx) {
		playersElement.adopt(
		     new Element('div').adopt(
			new Element('input', {
				type: radio == true ? 'radio' : 'checkbox',
				name: idPrefix,
				id: idPrefix + idx,
				value: idx,
				events: {
					change: function (evt) {
						var button = $(evt.target);
						if (radio == true) {
							var idx = button.value
							playerHash.empty();
							playerHash.set(idx, ucpThread.photos()[idx]);
						} else {
							var idx = parseInt(button.id.replace(idPrefix, ''), 10);
							if (button.checked) {
								playerHash.set(idx, ucpThread.photos()[idx]);
							} else {
								playerHash.erase(idx);
							}
						}
						if (winnerChangeCallback) {
							winnerChangeCallback(playerHash);
						}
					}
				}
			}),
			new Element('label', {
				html: competitor.poster().username + " (" + ($chk(competitor.photoTitle()) ? competitor.photoTitle() : "<i>--untitled--</i>") + ")",
				'for': idPrefix + idx
			})
		    )
		);
	    });
    }

    function listMedals(data) {
    	var idPrefix = data.idPrefix;
	var medalElement = data.medalElement;
	var medalPreviewElement = data.medalPreviewElement;
	var place = data.place;

	var loadingMedalsImg = new Element('img', { src: updatingIcon, title: 'loading medals..' }).inject(medalElement);
	var loadingMedalsLabel = new Element('i', { html: ' loading medals..' }).inject(medalElement);

	loadMedals(function (loadedMedals) {
		loadingMedalsImg.dispose();
		loadingMedalsLabel.dispose();

		    if (loadedMedals.success == false) {
			new Element('p', { html: '<i>' + loadedMedals.error + '</i>' }).inject(medalElement);
		    } else if (loadedMedals.medals.length == 0) {
		    	new Element('p', { html: '<i>no medals are defined for this group - contact Alesa Dam for support</i>' }).inject(medalElement);
		    } else {
		    	var medalCombo = new Element('select', {
				id: idPrefix + 'medal-combo',
				events: {
					'change': function (evt) {
						var combo = $(evt.target);
						var selected = combo.getSelected().get('value');
						var tags = '--none--';
						var groups = '--none--';
						var medalText = '--none--';
						if (selected > -1) {
						    try {
							var medal = loadedMedals.medals[selected];
							var referrer = medal.referrer;
							if ($chk(referrer)) {
							    if (referrer.match('%__referrer')) {
								referrer = referrer.replace(/%__referrer__url__%/g, document.location.href);
		    						var currentTitle = ucpThread.challengeName();
								var themeExtract  = groupConfig.workflow().themeExtractRegExp;
								if ($chk(themeExtract)) {
									var theme = currentTitle.replace(new RegExp(themeExtract.expression, themeExtract.flags), themeExtract.replacement);
									referrer = referrer.replace(/%__referrer__theme__%/g, theme);
								}
								var numberExtract = groupConfig.workflow().numberExtractRegExp;
								if ($chk(numberExtract)) {
									var number = currentTitle.replace(new RegExp(numberExtract.expression, numberExtract.flags), numberExtract.replacement);
									referrer = referrer.replace(/%__referrer__number__%/g, number);
								}
							    }
							    var referrerReplacement = medal.referrerReplacement;
							    if ($chk(referrerReplacement)) {
								medalText = medal.medal.replace(referrerReplacement, referrer);
							    } else {
								medalText = medal.medal + ($chk(referrer) ? referrer : '');
							    }
							} else {
							    medalText = medal.medal;
							}
                                                        if (!$chk(medalText) || medalText.replace(/\n/g, '').length == 0) {
                                                                medalText = '--none--';
                                                        } else {
                                                                medalText = medalText.replace(/\n/g, '<br>');
                                                        }
							tags = medal.tags;
							if (!$chk(tags) || tags.replace(/\n/g, '').length == 0) {
								tags = '--none--';
							}
							groups = medal.groupInvites;
							if (!$chk(groups) || groups.length == 0) {
								groups = '--none--';
							}
						    } catch (e) {
						    	alert('error changing medal: ' + e);
						    }
						}
						if ($$('select[id*=UCPANG-workflow]').every(function (comboList) {
								if (comboList.get('id').match('medal-combo')) {
									return (comboList.getSelected().get('value') > -1);
								} else {
									// ignore other combos
									return true;
								}
							})) {
							$('UCPANG-promote-wizard-save-button').set('style', 'background-color:;');
							$('UCPANG-promote-wizard-save-button').set('html', 'SAVE');
						} else {
							$('UCPANG-promote-wizard-save-button').set('style', 'background-color: orange;');
							$('UCPANG-promote-wizard-save-button').set('html', 'SAVE without a medal?');
						}
						try {
						$(idPrefix + 'tags').set('html', tags.replace(/\n/g,'<br>'));
						$(idPrefix + 'invites').empty();
						if (groups == '--none--') {
							$(idPrefix + 'invites').set('html', groups);
						} else {
							groups.forEach( function (group, idx) {
								var groupId = group.groupId;
								var groupDiv = new Element('div', {
									id: idPrefix + '-invitegroup-' + groupId
								}).inject($(idPrefix + 'invites'));
								new Element('input', {
									type: 'checkbox',
									id: idPrefix + '-invitegroup-checkbox-' + idx,
									checked: false,
									title: 'invite'
								}).inject(groupDiv);
								new Element('label', {
									'for': idPrefix + '-invitegroup-checkbox-' + idx,
									id: idPrefix + '-invitegroup-checkbox-label-' + idx,
									html: "<i>retrieving..</i>",
									title: "invite",
									styles: {
										color: 'grey'
									}
								}).inject(groupDiv);
								isGroupAdministratorOrModerator(userNsid, groupId, function (groupAdminData) {
									$(idPrefix + '-invitegroup-checkbox-' + idx).set('checked', groupAdminData.administrator || $chk(loadedMedals.inviteThread));
									$(idPrefix + '-invitegroup-checkbox-' + idx).set('title', groupAdminData.administrator ? 'invite into group pool' : $chk(loadedMedals.inviteThread) ? 'post in invite thread' : 'you are not an administrator for this group');
									$(idPrefix + '-invitegroup-checkbox-label-' + idx).set('html', GM_getValue("UCPA.groupname." + groupId));
									$(idPrefix + '-invitegroup-checkbox-label-' + idx).set('title', groupAdminData.administrator ? 'invite into group pool' : $chk(loadedMedals.inviteThread) ? 'post in invite thread' : 'you are not an administrator for this group');
									$(idPrefix + '-invitegroup-checkbox-label-' + idx).setStyle('color', groupAdminData.administrator || $chk(loadedMedals.inviteThread) ? '' : 'grey');
								});
							});
						}
						$(idPrefix + 'medaltext').set('html', medalText);
						} catch (e) {
							alert(e);
						}
					}
				}
			}).inject(medalElement);
	    		new Element('option', { html: '--- select a medal ---', value: -1 }).inject(medalCombo);
			loadedMedals.medals.each(function (medal, idx) {
				new Element('option', { html: medal.title, value: idx }).inject(medalCombo);
			});
			// color the SAVE button
			if ($chk($('UCPANG-promote-wizard-save-button'))) {
				$('UCPANG-promote-wizard-save-button').set('style', 'background-color: orange;');
				$('UCPANG-promote-wizard-save-button').set('html', 'SAVE without a medal?');
			}
		    }
                    createEditableTextElement(medalPreviewElement, idPrefix + 'medaltext', 'white', '--none--');

		    var extrasTable = new Element('table').inject(medalPreviewElement);
		    var tagsRow = new Element('tr', { 'class': idPrefix + 'list-players-row' } ).inject(extrasTable);
		    new Element('td').inject(tagsRow);
		    new Element('td', { html: 'add&nbsp;tag(s):',
					id: idPrefix + 'tags-label' }).inject(tagsRow);
		    var tagsCell = new Element('td').inject(tagsRow);
		    createEditableLabelElement(tagsCell, idPrefix + 'tags', '--none--');

		    var invitesRow = new Element('tr', { 'class': idPrefix + 'list-players-row', valign: 'top' }).inject(tagsRow, 'after');
		    new Element('td').inject(invitesRow);
		    new Element('td', { html: 'invites:',
				id: idPrefix + 'invites-label' }).inject(invitesRow);
		    var invitesCell = new Element('td', {
		    	id: idPrefix + 'invites', 
			html: '--none--'
		    }).inject(invitesRow);
	});

    }

    function toggleVoteToClosedWizardDialog(ucpThread) {
	if ($chk($('UCPANG-promote-wizard-dialog'))) {
		$('UCPANG-promote-wizard-dialog').destroy();
	} else {
            var wizardDialogContainer = new Element('p', {
		id: 'UCPANG-promote-wizard-dialog',
                'class': 'ucpDialogStyle'
	    });
	    var wizardDialog = new Element('table', {
		border: 0
	    });
	    var closeThreadRow = new Element('tr').inject(wizardDialog);
	    new Element('td', { html: 'close thread:',
				id: 'UCPANG-workflow-wizard-close-thread-label' }).inject(closeThreadRow);
	    var closeThreadCell = new Element('td').inject(closeThreadRow);
	    new Element('input', { type: 'checkbox', disabled: true, checked: true }).inject(closeThreadCell);

	    var closingPost = groupConfig.workflow().closingPost;
	    if ($chk(closingPost)) {
	    	var closingPostRow = new Element('tr').inject(wizardDialog);
		new Element('td', { html: 'add final post:' }).inject(closingPostRow);
    		createEditableLabelElement(new Element('td').inject(closingPostRow), 'UCPANG-workflow-wizard-closingpost', closingPost.text);
	    }

	    var autoRow = new Element('tr').inject(wizardDialog);
	    var autoCell = new Element('td', {
	    	colspan: 3
	    }).inject(autoRow);
	    new Element('input', {
	    	type: 'checkbox',
		checked: groupPreferences.workflowAutoClaimOwnership(),
		id: 'UCPANG-workflow-wizard-auto-checkbox',
		events: {
			change: function (evt) {
				groupPreferences.setWorkflowAutoClaimOwnership(evt.target.checked);
			}
		}
	    }).inject(autoCell);
	    new Element('label', {
	    	html: 'close automatically on opening this dialog',
		'for': 'UCPANG-workflow-wizard-auto-checkbox'
	    }).inject(autoCell);
	    var buttonRow = new Element('tr', { valign: 'top' }).inject(wizardDialog);
	    var buttonCell = new Element('td', {
		colspan: 3,
		align: 'right',
		valign: 'top'
	    }).inject(buttonRow);
	    new Element('button', {
		'class': 'CancelButt',
		html: 'Cancel',
		events: {
			'click': function (evt) {
				$('UCPANG-promote-wizard-dialog').destroy();
			}
		}
	    }).inject(buttonCell);
	    new Element('span', {
		html: ' '
	    }).inject(buttonCell);
	    var saveButton = new Element('button', {
		'class': 'Butt',
		html: 'CLOSE',
		id: 'UCPANG-promote-wizard-save-button',
		events: {
			'click': function (evt) {
				if (!this.hasClass('Butt')) return;
				this.set('class', 'DisabledButt');
				this.empty();
				new Element('img', { src: updatingIcon }).inject(this);
				if ($chk($('UCPANG-workflow-wizard-closingpost'))) {
					this.fireEvent('post-closing-post');
				} else {
					this.fireEvent('close-thread');
				}
			},
			'post-closing-post': function (evt) {
				this.set('title', 'posting closing text');
				var closingPost = $('UCPANG-workflow-wizard-closingpost').get('html');
				apiPostThreadReply({
					topicId: ucpThread.topic(),
					message: closingPost,
					callback: function (retval) {
						this.getElement('img').set('src', retval.success ? defaultCheckIconSmall : errorIcon);
						this.set('title', retval.success ? 'closing post posted' : 'error: ' + retval.message);
						if (retval.success) {
							this.fireEvent('close-thread');
						}
					}.bind(this)
				});
			},
			'close-thread': function (evt) {
				this.set('title', 'retrieving thread');
				new Request({
					url: document.location.href,
					onFailure: function(response) {
						this.getElement('img').set('src', errorIcon);
						this.set('title', 'error: ' + response.statusText);
					}.bind(this),
					onSuccess: function (responseText, responseXML) {
                				var tempDiv = new Element('div');
					        tempDiv.innerHTML = responseText.stripScripts();
					        var problem = tempDiv.getElement('p.Problem');
					        if ($chk(problem)) {
							this.getElement('img').set('src', errorIcon);
							this.set('title', 'error: ' + problem.innerHTML);
							return;
					        }
						if (ucpThread.isClosed(tempDiv).closed) {
							this.getElement('img').set('src', errorIcon);
							this.set('title', 'already closed');
							ucpThread.isClosed(tempDiv).closer.inject(new Element('div').inject(buttonRow, 'before'));
							new Element('div', { html: 'WARNING -- already claimed<br>this person is probably cleaning up this challenge', align: 'center' }).inject(buttonRow, 'before');
							return;
						} 
						closeChallengeThread(function (retval) {
							if (!retval.success) {
								this.getElement('img').set('src', errorIcon);
								this.set('title', retval.message);
								return;
							}
							this.getElement('img').set('src', defaultCheckIconSmall);
							this.set('title', 'closed - owner now');
							document.location.href = /(.*flickr.com\/groups\/[^\/]+\/discuss\/\d+)/.exec(document.location.href)[1] + '/';
						}.bind(this));
					}.bind(this)
				}).get();
			}
		}
	    }).inject(buttonCell);

	    wizardDialog.inject(wizardDialogContainer);
	    wizardDialogContainer.inject($('UCPANG-workflow-cell'), 'after');
	    if (groupPreferences.workflowAutoClaimOwnership()) {
	    	saveButton.click();
	    }
	}
    }

    function toggleClosedToCleaningWizardDialog(ucpThread) {
	if ($chk($('UCPANG-promote-wizard-dialog'))) {
		$('UCPANG-promote-wizard-dialog').destroy();
	} else {
	    remoteActions = [];
	    failedRemoteActions = [];

	    var wizardDialogContainer = new Element('p', {
		id: 'UCPANG-promote-wizard-dialog',
                'class': 'ucpDialogStyle'
	    }).inject($('UCPANG-workflow-cell'), 'after');
            var wizardDialog = new Element('table', {
		border: 0
	    }).inject(wizardDialogContainer);

	    var lastvote = undefined;
	    var score = ucpThread.cummulativeScore();
	    if (ucpThread.votes().length == 0) {
	    	new Element('td', {
			html: 'could not determine winner: no votes found',
			colspan: 3,
			styles: {
				color: 'red'
			}
		}).inject(new Element('tr').inject(wizardDialog));
		var maxVote = 0;
	    } else {
	        lastvote = ucpThread.votes()[ucpThread.votes().length - 1];
		var lastVoteCell = new Element('td', {
			colspan: 3,
			html: 'decision based on score: <b>' + ucpThread.scoreSummary(false) + '</b> (last vote by ' + lastvote.poster().username + ')'
		}).inject(new Element('tr').inject(wizardDialog));
		maxVote = score.maxVote;
		if (ucpThread.challengeDefinition().neededScore() > 0 && maxVote != ucpThread.challengeDefinition().neededScore()) {
		    new Element('span', {
			html: '  maximum score is ' + maxVote + ', but required score is ' + ucpThread.challengeDefinition().neededScore(),
			styles: {
				color: 'red'
			}
		    }).inject(lastVoteCell);
		}
	    }
	    // when cleaning, we need to change the title *back* to OPEN!
	    var titles = provideTitleChangeRow({
	    	table: wizardDialog,
	    	titleReplacer: groupConfig.workflow().fromVoteToOpenRegExp,
	    	nextStepChecker: groupConfig.workflow().fromOpenToVoteRegExp
	    });
	    var newTitle = titles.newTitle;
	    // preview the new defender
	    var playersRow = new Element('tr', { valign: 'top' } ).inject(wizardDialog);
	    new Element('td', { html: 'winner: ' }).inject(playersRow);
	    playersElement = new Element('td', { id: 'UCPANG-workflow-winner-list-players-cell' } ).inject(playersRow);
	    if (winnersHashes['winner'] == undefined) {
		winnersHashes['winner'] = new Hash();
	    }
	    listPlayers( {
		playersElement: $('UCPANG-workflow-winner-list-players-cell'),
		playerHash: winnersHashes['winner'],
		ucpThread: ucpThread,
		idPrefix: 'UCPANG-workflow-winner-',
		radio: true,
		winnerChangeCallback: function (playerHash) {
			var winningPhoto;
			playerHash.forEach(function (photo, key) { // used a radio button: there is only one
				winningPhoto = photo;
			});
			var winner, loser;
			ucpThread.photos().each( function (photo) {
				if (photo.photoId() == winningPhoto.photoId()) {
				    if (winner == undefined) {
					winner = photo;
				    }
				} else {
				    if (loser == undefined) {
					loser = photo;
				    }
				}
			});
			var loserClone  = new Element('div', { html: loser.message().replace(/\n/mg, '<br>') });
			var winnerClone = new Element('div', { html: winner.message().replace(/\n/mg, '<br>') });
			winnerClone.getElements('img[alt*=UCPANG], img[class*=FPAOTP], *[id^=FPAOTP]').dispose();
			// add small version of the losing photo
			// if it's the first thumbnail added, insert a break
			// thumbnails, and images with a width of less than 275 are not considered photos in ucpCheckPhoto
			// => check manually
			if (winnerClone.getElements('img[src*=.jpg]').length == 1) {
//				new Element('br').inject(winnerClone);
				new Element('br').inject(winnerClone);
			}
			var loserSrc = loserClone.getElements('img').filter(ucpCheckPhoto,ucpThread.challengeDefinition())[0].get('src').replace(/(^.*flickr.com\/.*\/\d+_[^_]+)(?:_\w)?\.jpg$/, "$1_t.jpg");
			var loserUrl = loserClone.getElement('a').get('href');
			$('UCPANG-workflow-newdefender-feedback').empty();
			getThumbDimensions(loser.photoId(), function(retval) {
				var thumbDimensions = { width: 0, height: 0 };
				if (!retval.success) {
					$('UCPANG-workflow-newdefender-feedback').adopt(
						new Element('img', { src: errorIcon, title: retval.message }),
						new Element('span', { html: ' ' + retval.message })
					);
				} else {
					thumbDimensions = { width: retval.width, height: retval.height };
				}
				var loserThumb = new Element('img', { src: loserSrc, width: thumbDimensions.width > thumbDimensions.height ? 90 : 75 }).inject(new Element('a', { href: loserUrl }).inject(winnerClone));
				// print the score
				new Element('b', { html: lastvote.voteText()[0].replace(/[^\d]*(\d+)[^\d](\d+)[^\d]*/, "$1:$2") }).inject(winnerClone);
				// update the preview
				$('UCPANG-workflow-newdefender-who').set('html', '<b><u>' + winner.poster().username + '</u> says:</b>');
				$('UCPANG-workflow-newdefender-said').set('html', winnerClone.get('html'));
				// correct permalink
				var normalizedThreadURL = /(.*flickr\.com\/groups\/[^\/]+\/discuss\/\d+)/.exec(location.href)[0];
				var permalink = normalizedThreadURL + '/#comment' + winner.replyId();
				$('UCPANG-workflow-newdefender-permalink').empty();
				new Element('a', { html: 'permalink', href: permalink }).inject($('UCPANG-workflow-newdefender-permalink'));
				// update the losing image fields
				loserClone.getElement('img').set('width', 250);
				$('UCPANG-workflow-losing-image').set('html', loserClone.get('html'));
				permalink = normalizedThreadURL + '/#comment' + loser.replyId();
				$('UCPANG-workflow-losing-permalink').empty();
				new Element('a', { html: 'permalink', href: permalink }).inject($('UCPANG-workflow-losing-permalink'));
			});
		}
	    });
	    // show new defender preview
	    var newDefenderRow = new Element('tr', { valign: 'top' } ).inject(wizardDialog);
	    new Element('td', { html: 'defender&nbsp;preview:&nbsp;' }).inject(newDefenderRow);
	    new Element('td', { 'class': 'Said', id: 'UCPANG-workflow-newdefender-who' }).inject(newDefenderRow);
	    new Element('td', { id: 'UCPANG-workflow-newdefender-permalink' }).inject(newDefenderRow);
	    newDefenderRow = new Element('tr', { valign: 'top' } ).inject(wizardDialog);
	    new Element('td').inject(newDefenderRow);
	    var newDefenderPreview = new Element('td', { width: 500 }).inject(newDefenderRow);
            createEditableTextElement(newDefenderPreview, 'UCPANG-workflow-newdefender-said', 'white', '--none--');
	    new Element('span', { id: 'UCPANG-workflow-newdefender-feedback' }).inject(newDefenderPreview);

	    // list replies to be removed:
	    new Element('td', { colspan: 3, html: 'remove replies: '}).inject(new Element('tr').inject(wizardDialog));
	    // the losing image:
	    var losingImageRow = new Element('tr', { valign: 'top' }).inject(wizardDialog);
	    new Element('td').inject(losingImageRow);
	    var losingImageCell = new Element('td').inject(losingImageRow);
	    new Element('input', { type: 'checkbox', checked: false, id: 'UCPANG-delete-losing-image' }).inject(losingImageCell);
	    new Element('label', { html: '&nbsp;losing&nbsp;contestant: ', 'for': 'UCPANG-delete-losing-image'}).inject(losingImageCell);
	    var losingPermalinkCell = new Element('td', { id: 'UCPANG-workflow-losing-permalink' }).inject(losingImageRow);

	    losingImageRow = new Element('tr', { valign: 'top' }).inject(wizardDialog);
	    new Element('td').inject(losingImageRow);
	    losingImageCell = new Element('td').inject(losingImageRow);
	    new Element('div', { styles: { 'background-color': 'white', border: '1px solid' }, id: 'UCPANG-workflow-losing-image' } ).inject(losingImageCell);

	    // simulate a mouse click on the winners
	    ucpThread.photos().each( function (competitor, idx) {
	    	if (score.options.votesArray[idx+1] == maxVote) {
	    		$('UCPANG-workflow-winner-' + idx).click();
		}
	    });
	    var normalizedThreadURL = /(.*flickr\.com\/groups\/[^\/]+\/discuss\/\d+)/.exec(location.href)[0];
	    [ ucpThread.votes(), ucpThread.comments() ].each( function (replyArray, idx) {
	    	if (idx == 0) {
	    		// the votes:
	    		wizardDialog.adopt(new Element('tr').adopt(
	    			new Element('td'),
				new Element('td', { html: '<b>votes:</b>' })
	    		));
		} else {
	    		// other replies:
	    		wizardDialog.adopt(new Element('tr').adopt(
	    			new Element('td'),
				new Element('td', { html: '<b>comments:</b>' })
	    		));
		}
	    	replyArray.each( function (reply, replyidx) {
			var enabled = idx > 0 || replyidx < replyArray.length - 1;
			// remove unnecessary info
			var removeReplyRow = new Element('tr').inject(wizardDialog);
			new Element('td').inject(removeReplyRow); // empty first column
			var delCell = new Element('td', { nowrap: 'nowrap' }).inject(removeReplyRow);
			new Element('input', { type: 'checkbox', checked: enabled, id: 'UCPANG-delete-reply-' + idx + '-' + replyidx, 'class': 'UCPANG-delete-reply-check', value: reply.replyId() }).inject(delCell);
			new Element('label', { html: '&nbsp;<u><i>' + reply.poster().username + "</i></u>: ", 'for': 'UCPANG-delete-reply-' + idx + '-' + replyidx }).inject(delCell);
			new Element('span', { html: reply.content(), styles: { display: 'inline-block' } }).inject(delCell);
			new Element('span', { html: '&nbsp;' }).inject(delCell);
			new Element('a', { href: "#comment" + reply.replyId(), html: 'permalink' }).inject(new Element('td').inject(removeReplyRow));
	    	});
	    });
	    // 'xxx has voted last'
	    var closingRow = new Element('tr', { valign: 'top' }).inject(wizardDialog);
	    new Element('td', { html: '<b>add reply:</b>' }).inject(closingRow);
	    var closingReplyCell = new Element('td').inject(closingRow);
	    createEditableTextElement(closingReplyCell, 'UCPANG-workflow-wizard-closing-reply', 'white', '<b>' + lastvote.poster().username + '</b> voted last');

	    // button row
	    remoteActions = [];
	    failedRemoteActions = [];
	    var buttonRow = new Element('tr', { valign: 'top' }).inject(wizardDialog);
	    var buttonCell = new Element('td', {
		colspan: 3,
		align: 'right',
		valign: 'top'
	    }).inject(buttonRow);
	    new Element('button', {
		'class': 'CancelButt',
		html: 'Cancel',
		events: {
			'click': function (evt) {
				$('UCPANG-promote-wizard-dialog').destroy();
			}
		}
	    }).inject(buttonCell);
	    new Element('span', {
		html: ' '
	    }).inject(buttonCell);
	    new Element('button', {
		'class': 'Butt',
		html: 'SAVE',
		id: 'UCPANG-promote-wizard-save-button',
		events: {
			'click': function (evt) {
			    try {
				// show spinning balls
				var button = $(evt.target);
				if (button.hasClass('DisabledButt')) {
					return;
				}
				button.set('class', 'DisabledButt');
				button.empty();
				button.adopt(new Element('img', {
					src: updatingIcon,
					title: 'updating challenge'
				}));
				expectedRemoteActions.set('closingreply', true);
				expectedRemoteActions.set('update-title', true);

				var wizardDialog = $('UCPANG-promote-wizard-dialog');
				// update title
				remoteActions.push(true);
				expectedRemoteActions.erase('update-title');
				new Element('img', { src: updatingIcon, title: 'updating title' }).inject($('UCPANG-workflow-wizard-new-title-label'));
				updateChallengeTitle($('UCPANG-workflow-wizard-newtitle').get('text'), function (result) { // use 'text', not 'html'
					var button = $('UCPANG-workflow-wizard-new-title-label').getElement('img');
					updateRemoteAction({ success: result.success, error: 'error updating title' + result.message, buttonImg: button, title: 'title updated' });
				});
				// add closing reply
				// if successful: update new defender
				// if successful: delete replies and losing image
        			var url = /.*flickr.com\/groups\/[^\/]+\/discuss\/\d+/.exec(ucpThread.url());

				remoteActions.push(true);
				expectedRemoteActions.erase('closingreply');
				var closingReplyPosted = false;
				new Element('img', {
					src: updatingIcon,
					title: 'posting'
				}).inject($('UCPANG-workflow-wizard-closing-reply').getParent('tr').getElement('td'));
				apiPostThreadReply({
					topicId: ucpThread.topic(),
					message: $('UCPANG-workflow-wizard-closing-reply').get('html').replace(/\n/g, '').replace(/<br[^>]*>/g, '\n'),
					callback: function (result) {
						closingReplyPosted = result.success;
						if (closingReplyPosted) {
							expectedRemoteActions.set('update-defender', true);
						}
						updateRemoteAction({ success: result.success, 
							error: 'error posting closing reply: ' + result.message, 
							buttonImg: $('UCPANG-workflow-wizard-closing-reply').getParent('tr').getElement('td img'), 
							title: 'reply posted' });
						if (!closingReplyPosted) {
							return;
						}

						var newDefenderText = $('UCPANG-workflow-newdefender-said').get('html').replace(/<br[^>]*>/g, '\n');
						var newDefenderPermalink = $('UCPANG-workflow-newdefender-permalink').getElement('a').get('href').replace('#comment', '');
						remoteActions.push(true);
						expectedRemoteActions.erase('update-defender');
						new Element('img', { 
							src: updatingIcon, 
							title: 'updating defender' 
						}).inject($('UCPANG-workflow-newdefender-said').getParent('tr').getElement('td'));
						var updatedDefender = false;
						updateThreadReply({
							replyUrl: newDefenderPermalink,
							message: newDefenderText,
							callback: function (result) {
								var button = $('UCPANG-workflow-newdefender-said').getParent('tr').getElement('td img');
								updatedDefender = result.success;
								if (updatedDefender) {
									expectedRemoteActions.set('delete-votes-and-comments', 'true');
									expectedRemoteActions.set('delete-losing-contestant', 'true');
								}
								updateRemoteAction({ success: result.success,
									error: 'error posting update: ' + result.msg,
									buttonImg: button,
									title: 'update posted' });
								if (!updatedDefender) {
									return;
								}

								var deleteLoserCheckbox = $('UCPANG-delete-losing-image');
								if (!deleteLoserCheckbox.checked) {
									expectedRemoteActions.erase('delete-losing-contestant');
								}

								$$('input.UCPANG-delete-reply-check:checked').each(function (checkbox) {
									expectedRemoteActions.set(checkbox.value, 'true');
								});
								expectedRemoteActions.erase('delete-votes-and-comments');
								$$('input.UCPANG-delete-reply-check:checked').each(function (checkbox) {
									remoteActions.push(true);
									expectedRemoteActions.erase(checkbox.value);
									new Element('img', { 
										src: updatingIcon, 
										title: 'deleting reply'
									}).inject(checkbox, 'before');
									var replyUrl = checkbox.value;
									deleteThreadReply( {
										replyPermalink: replyUrl,
										referrer: ucpThread.url(),
										callback: function (result) {
											updateRemoteAction({ success: result.success, 
												error: 'error deleting reply: ' + result.message, 
												buttonImg: checkbox.getParent('td').getElement('img'), 
												title: 'reply deleted' });
										}
									});
								});

								if (deleteLoserCheckbox.checked) {
									remoteActions.push(true);
									expectedRemoteActions.erase('delete-losing-contestant');
									new Element('img', {
										src: updatingIcon,
										title: 'removing losing contestant'
									}).inject(deleteLoserCheckbox, 'before');
									deleteThreadReply( {
										replyPermalink: $('UCPANG-workflow-losing-permalink').getElement('a').get('href').replace('#comment', ''),
										referrer: ucpThread.url(),
										callback: function (result) {
											updateRemoteAction({ success: result.success,
												error: 'error removing losing contestant: ' + result.message,
												buttonImg: deleteLoserCheckbox.getParent().getElement('img'),
												title: 'contestant deleted' });
										}
									});
								}
							}
						});
					}
				});
			    } catch (e) {
			    	GM_log("error cleaning thread: " + e);
			    }
			}
		}
	    }).inject(buttonCell);
	}
    }

function createProgressElement(label, id, action) {
	var progressPanel = $('UCPANG-workflow-wizard-progress-panel');
	var progressElement = new Element('div', {
		id: id,
		events: {
			'run-action': function (evt) {
				$(id + '-icon').set('src', updatingIcon);
				$(id + '-icon').set('title', 'running..');
				action(evt)
			}
		}
	}).inject(progressPanel);
	new Element('img', { src: images.queued, id: id + '-icon', title: 'queued' }).inject(progressElement);
	new Element('span', { html: ' ' + label + ' ' }).inject(progressElement);
	return progressElement;
}

    function toggleClosedToAwardedWizardDialog(ucpThread) {
	if ($chk($('UCPANG-promote-wizard-dialog'))) {
		$('UCPANG-promote-wizard-dialog').destroy();
	} else {
	    remoteActions = [];
	    failedRemoteActions = [];

	    var wizardDialogContainer = new Element('p', {
		id: 'UCPANG-promote-wizard-dialog',
                'class': 'ucpDialogStyle'
	    }).inject($('UCPANG-workflow-cell'), 'after');
            var wizardDialog = new Element('table', {
		border: 0
	    }).inject(wizardDialogContainer);

	    var lastvote = undefined;
	    var score = ucpThread.cummulativeScore();
	    if (ucpThread.votes().length == 0) {
		new Element('td', {
			html: 'could not determine winner: no votes found',
			colspan: 3,
			styles: {
				color: 'red'
			}
		}).inject(new Element('tr').inject(wizardDialog));
		var maxVote = 0;
	    } else {
		lastvote = ucpThread.votes()[ucpThread.votes().length - 1];
		var lastVoteCell = new Element('td', {
			colspan: 3,
			html: 'decision based on score: <b>' + ucpThread.scoreSummary(false) + '</b> (last vote by ' + lastvote.poster().username + ')'
		}).inject(new Element('tr').inject(wizardDialog));
	    	maxVote = score.maxVote;
		if (ucpThread.challengeDefinition().neededScore() > 0 && maxVote != ucpThread.challengeDefinition().neededScore()) {
		    new Element('span', {
			html: '  maximum score is ' + maxVote + ', but required score is ' + ucpThread.challengeDefinition().neededScore(),
			styles: {
				color: 'red'
			}
		    }).inject(lastVoteCell);
		}
	    }

	    var fromVoteToClosed = groupConfig.workflow().fromVoteToClosedRegExp;
	    var sweep = ucpThread.isUnanimous() && ucpThread.challengeDefinition().scoresAdded();
	    if (sweep) {
	    	new Element('td', {
			html: 'found a sweep!',
			styles: {
				color: 'red'
			}
		}).inject(new Element('tr').inject(wizardDialog));
		if ($chk(fromVoteToClosed.sweepreplacement)) {
			fromVoteToClosed.replacement = fromVoteToClosed.sweepreplacement;
		}
		if ($chk(fromVoteToClosed.sweepreplacement2)) {
			fromVoteToClosed.replacement2 = fromVoteToClosed.sweepreplacement2;
		}
	    }
	    var titles = provideTitleChangeRow({
	    	table: wizardDialog,
	    	titleReplacer: fromVoteToClosed,
	    	nextStepChecker: groupConfig.workflow().fromClosedToNewRegExp,
	    });
	    var newTitle = titles.newTitle;

	    [ 'winner', 'second', 'third', 'fourth', 'fifth' ].each(function (place) {
		var nthRow = new Element('tr', { valign: 'top' }).inject(wizardDialog);
		var nthSelectCell = new Element('td', { colspan: 2 }).inject(nthRow);
		new Element('input', { 
		    type: 'checkbox', 
		    id: 'UCPANG-workflow-' + place + '-awarding',
		    events: {
			'change': function (evt) {
				var checkbox = $(evt.target);
				var place = checkbox.get('id').replace(/UCPANG-workflow-([^-]+)-awarding/, '$1');
				if (!checkbox.checked) { // un-checked
					$('UCPANG-workflow-' + place + '-list-players-cell').empty();
					$('UCPANG-workflow-' + place + '-medaltext-cell').dispose();
					return;
				}
				if (winnersHashes[place] == undefined) {
					winnersHashes[place] = new Hash();
				}
				listPlayers( {
					playersElement: $('UCPANG-workflow-' + place + '-list-players-cell'),
					playerHash: winnersHashes[place],
					ucpThread: ucpThread,
					idPrefix: 'UCPANG-workflow-' + place + '-',
					winnerChangeCallback: place == 'winner' ? function (playerHash) {
						var winnerName = "";
						playerHash.forEach(function (value, key) {
							if (winnerName.length > 0) winnerName += ' - and - ';
							winnerName += value//.poster().username
						});
						$('UCPANG-workflow-wizard-newtitle').set('html', newTitle.replace('%__username__%', winnerName));
					} : undefined
				});
				var medalTextRow = new Element('tr', { valign: 'top' }).inject(checkbox.getParent('tr'), 'after');
				new Element('td', { id: 'UCPANG-workflow-' + place + '-medal-label', align: 'right' }).inject(medalTextRow);
				var medalTextCell = new Element('td', {
					html: '',
					colspan: 2,
					id: 'UCPANG-workflow-' + place + '-medaltext-cell', 
					'class': 'Said' 
				}).inject(medalTextRow);
				listMedals( {
					medalElement: $('UCPANG-workflow-' + place + '-list-players-cell'),
					medalPreviewElement: medalTextCell,
					idPrefix: 'UCPANG-workflow-' + place + '-',
					place: place
				});
			}
		    }
		}).inject(nthSelectCell);
		new Element('label', { 
			'for': 'UCPANG-workflow-' + place + '-awarding', 
			html: place == 'winner' ? 'winner(s)' : 'award ' + place + ' place/medal'
		}).inject(nthSelectCell);
		new Element('td', {
	    	    id: 'UCPANG-workflow-' + place + '-list-players-cell'
		}).inject(nthRow);
	    });

	    // simulate 'winners' click
	    $('UCPANG-workflow-winner-awarding').click();

	    if (groupConfig.workflow().stickyChallenges) {
		    var unstickyThreadRow = new Element('tr').inject(wizardDialog);
		    new Element('td', { html: 'remove&nbsp;stickiness:' }).inject(unstickyThreadRow);
		    var unstickyThreadCell = new Element('td').inject(unstickyThreadRow);
		    new Element('input', { type: 'checkbox', disabled: true, checked: true }).inject(unstickyThreadCell);
	    }
	    var buttonRow = new Element('tr', { valign: 'top' }).inject(wizardDialog);
	    var buttonCell = new Element('td', {
		colspan: 3,
		align: 'right',
		valign: 'top'
	    }).inject(buttonRow);
	    new Element('button', {
		'class': 'CancelButt',
		html: 'Cancel',
		events: {
			'click': function (evt) {
				$('UCPANG-promote-wizard-dialog').destroy();
			}
		}
	    }).inject(buttonCell);
	    new Element('span', {
		html: ' '
	    }).inject(buttonCell);
	    new Element('button', {
		'class': 'Butt',
		html: 'SAVE without a medal?',
		id: 'UCPANG-promote-wizard-save-button',
		styles: {
			'background-color': 'orange'
		},
		events: {
			'click': function (evt) {
				if ($('UCPANG-promote-wizard-save-button').hasClass('Butt')) {
					$('UCPANG-promote-wizard-save-button').set('class', 'DisabledButt');
					expectedRemoteActions.set('title', true);
					if (groupConfig.workflow().stickyChallenges) {
						expectedRemoteActions.set('unstick', true);
					}
					[ 'winner', 'second', 'third', 'fourth', 'fifth' ].each( function (place) {
						var idPrefix = 'UCPANG-workflow-' + place + '-';
						if ($(idPrefix + 'awarding').checked) {
							expectedRemoteActions.set(idPrefix + 'medal', true);
							expectedRemoteActions.set(idPrefix + 'tags', true);
							expectedRemoteActions.set(idPrefix + 'invite', true);
						}
					});

					// show spinning balls
					var button = $(evt.target);
					button.empty();
					button.adopt(new Element('img', {
						src: updatingIcon,
						title: 'updating challenge'
					}));
					var wizardDialog = $('UCPANG-promote-wizard-dialog');
					// create a panel where we can view the progress
					var progressRow = new Element('tr').inject(this.getParent('tr'), 'after');
					var progressPanel = new Element('td', { id: 'UCPANG-workflow-wizard-progress-panel', colspan: 3 }).inject(progressRow);
					new Element('div', { html: 'actions progress:', styles: { fontWeight: 'bold' } }).inject(progressPanel);
					
					// update title
					createProgressElement('title update', 'UCPANG-workflow-progress-newtitle', function () {
						remoteActions.push(true);
						expectedRemoteActions.erase('title');
						updateChallengeTitle($('UCPANG-workflow-wizard-newtitle').get('text'), function (result) { // use 'text', not 'html'
							var button = $('UCPANG-workflow-progress-newtitle-icon');
							updateRemoteAction({ success: result.success,
								error: 'error updating title' + result.message,
								buttonImg: button,
								title: 'title updated' });
						});
					}).fireEvent('run-action');
					
					[ 'winner', 'second', 'third', 'fourth', 'fifth' ].each( function (place) {
					  	var idPrefix = 'UCPANG-workflow-' + place + '-';
						var playerHash = winnersHashes[place];

						if (!$(idPrefix + 'awarding').checked) {
							expectedRemoteActions.erase(idPrefix + 'medal');
							expectedRemoteActions.erase(idPrefix + 'tags');
							expectedRemoteActions.erase(idPrefix + 'invite');
							return;
						}
						if (playerHash == undefined || playerHash.getLength() == 0) {
							// selected the checkbox on the outer left, but did not choose a player from the list
							remoteActions.push(true);
							new Element('img', { 
								src: errorIcon, 
								title: 'forgot to select a player in the list'
							}).inject($(idPrefix + 'medal-label'));
							expectedRemoteActions.erase(idPrefix + 'medal');
							expectedRemoteActions.erase(idPrefix + 'tags');
							expectedRemoteActions.erase(idPrefix + 'invite');

							updateRemoteAction({ success: false,
								error: 'forgot to select a player in the list',
								buttonImg: button,
								title: undefined });
						}
						// award a medal
						var medalText = $(idPrefix + 'medaltext').get('html').replace(/\n/g, '').replace(/<br[^>]*>/g, '\n');
						if (medalText !== '--none--' && medalText.length > 0) {
							playerHash.forEach( function(value, key) {
								createProgressElement('posting medal \'' + place + '\' to \'<i>' + value.photoTitle() + '</i>\' by ' + value.poster().username, 'UCPANG-workflow-progress-medal-' + place + '-' + key, function () {
									remoteActions.push(true);
									expectedRemoteActions.erase(idPrefix + 'medal');
									postMedal(medalText, value, key, function (key, result) {
										var button = $('UCPANG-workflow-progress-medal-' + place + '-' + key + '-icon');
										updateRemoteAction({ success:  result.success,
											error: 'error posting medal: ' + result.msg,
											buttonImg: button,
											title: 'medal posted' });
									});
								    }
								).fireEvent('run-action');
							});
						} else {
							expectedRemoteActions.erase(idPrefix + 'medal');
						}
						
						// add tags
						var tagText = $(idPrefix + 'tags').get('text'); // use 'text', not 'html'
						if (tagText !== '--none--' && tagText.length > 0) {
							playerHash.forEach( function(value, key) {
								createProgressElement('posting tags to \'<i>' + value.photoTitle() + '</i>\' by ' + value.poster().username, 'UCPANG-workflow-progress-tags-' + place + '-' + key, function () {
									remoteActions.push(true);
									expectedRemoteActions.erase(idPrefix + 'tags');
									postTags({
										key: key,
										tags: tagText,
										photo: value,
										callback: function (key, result) {
											var button = $('UCPANG-workflow-progress-tags-' + place + '-' + key + '-icon');
											updateRemoteAction({ success: result.success,
												error: 'error adding tags: ' + result.msg,
												buttonImg: button,
												title: 'tags posted' });
										}
									});
								    }
								).fireEvent('run-action');
							});
						} else {
							expectedRemoteActions.erase(idPrefix + 'tags');
						}
					
						// drop admin invites
						var invitesCell = $(idPrefix + 'invites');
						invitesCell.getElements('div').forEach( function (groupElement, idx) {
							var groupId = groupElement.get('id').replace(idPrefix + '-invitegroup-','');
							var wanted = groupElement.getElement('input[type=checkbox]').checked;
							if (wanted && groupId && groupId.length > 0 && groupId.match(/\d+@\w\d{2}/)) {
								playerHash.forEach( function(value, key) {
									createProgressElement('dropping photo \'<i>' + value.photoTitle() + '</i>\' by ' + value.poster().username + ' an admin invite for group <i>' + GM_getValue("UCPA.groupname." + groupId) + '</i>',
										'UCPANG-workflow-progress-invite-' + key + '_' + idx,
										function () {
											remoteActions.push(true);
											expectedRemoteActions.erase(idPrefix + 'invite');
											sendAdminInvite({
												key: key + '_' + idx,
												groupId: groupId,
												photo: value,
												callback: function (key, result) {
													var button = $('UCPANG-workflow-progress-invite-' + key + '-icon');
													updateRemoteAction({ success: result.success,
														error: 'error inviting: ' + result.message,
														buttonImg: button,
														title: 'invited' });
												}
											});
										}
									).fireEvent('run-action');
								});
							}
						});
						expectedRemoteActions.erase(idPrefix + 'invite');
					});

					// un-sticky the thread
					if (groupConfig.workflow().stickyChallenges) {
						createProgressElement('remove stickiness from thread', 'UCPANG-workflow-progress-unsticky', function () {
							remoteActions.push(true);
							expectedRemoteActions.erase('unstick');
							unstickyChallengeThread(function (result) {
								var button = $('UCPANG-workflow-progress-unsticky-icon');
								updateRemoteAction({ success: result.success,
									error: 'error removing stickiness: ' + result.message,
									buttonImg: button,
									title: 'removed stickiness' });
							});
						}).fireEvent('run-action');
					}
				}
			}
		}
	    }).inject(buttonCell);

	    // simulate a mouse click on the winners
	    ucpThread.photos().each( function (competitor, idx) {
	    	if ($chk(score) && score.options.votesArray[idx+1] == maxVote) {
	    		$('UCPANG-workflow-winner-' + idx).click();
		}
	    });
	    if (winnersHashes['winner'].getLength() > 1) {
	    	new Element('td', {
			html: 'found a tie!',
			styles: {
				color: 'red'
			}
		}).inject(new Element('tr').inject($('UCPANG-workflow-wizard-current-title-row'), 'after'));
	    }
	}
    }

/* Levenshtein distance function
Calculates the 'distance' between two strings.
Is used for marking themes that are in use when creating a new challenge.

Copied from http://webreflection.blogspot.com/2009/02/levenshtein-algorithm-revisited-25.html
*/
var levenshtein = function(min, split){
    // Levenshtein Algorithm Revisited - WebReflection
    try{split=!("0")[0]}catch(i){split=true};
    return function(a, b){
        if(a == b)return 0;
        if(!a.length || !b.length)return b.length || a.length;
        if(split){a = a.split("");b = b.split("")};
        var len1 = a.length + 1,
            len2 = b.length + 1,
            I = 0,
            i = 0,
            d = [[0]],
            c, j, J;
        while(++i < len2)
            d[0][i] = i;
        i = 0;
        while(++i < len1){
            J = j = 0;
            c = a[I];
            d[i] = [i];
            while(++j < len2){
                d[i][j] = min(d[I][j] + 1, d[i][J] + 1, d[I][J] + (c != b[J]));
                ++J;
            };
            ++I;
        };
        return d[len1 - 1][len2 - 1];
    }
}(Math.min, false);

function normalizeTheme(theme) {
	if (!$chk(theme)) return "";
	return theme.replace( /\/s/, '' )
		.replace(/\s/g, '')
		.replace(/\r/,"")
		.replace(/&amp;/g,"&")
		.replace(/^(the|a|an)\s+/i, '')
		.replace(/^in\s+/i, '')
		.replace(/\s+in\s+(the|a|an)\s+/i, '')
		.replace(/\s+in\s+/i, '')
		.replace(/\s+(the|a|an)\s+/i, '')
		.toLowerCase();
}

function markThemesInPlay(callback) {
	new Request({
		url: "http://www.flickr.com/",
		onFailure: function (response) {
			callback({ success: false, msg: response.statusText });
		},
		onSuccess: function (responseText, responseXml) {
               		var result;
			try {
				result = JSON.parse(responseText);
			} catch (e) {
				try {
					result = eval('(' + responseText + ')');
				} catch (f) {
					callback({ success: false, msg: "failed parsing themes reply: " + e });
					return;
				}
			}
	                if (result.stat === 'fail') {
				callback({ success: false, msg: result.code + " - " + result.message });
				return;
	                }
			var activeThemes = [];
			var markThemeExtract  = groupConfig.workflow().markThemeExtractRegExp;
			var themeExtracter = new RegExp(markThemeExtract.expression, markThemeExtract.flags);
			result.topics.topic.forEach( function (topic) {
				var title = topic.subject;
				if (groupConfig.skipChallenge(title)) return;
				var theme = title.replace(
					themeExtracter, 
					markThemeExtract.replacement);
				theme = normalizeTheme(theme);
				activeThemes.include(theme);
			});
			$('UCPANG-workflow-wizard-theme-combo').getElements('option').forEach( function (option) {
				listedTheme = option.get('text');
				listedTheme = normalizeTheme(listedTheme);
				if (activeThemes.some(function (theme) {
					return groupPreferences.useLevenshteinToMarkThemesInUse() ? levenshtein(theme,listedTheme) <= groupPreferences.levenshteinDistanceInUsedThemes() :  (theme == listedTheme); 
				})) {
					if (Browser.Engine.webkit) { // Google Chrome
						// apparently no support for <s>
						option.setStyle('background-color', 'red');
					} else {
						var optionTheme = option.get('html');
						option.empty();
						new Element('s', { html: optionTheme }).inject(option);
					}
					option.set('class', 'marked');
				}
			});
			callback({ success: true });
		}
	}).get("/services/rest", {
		group_id: GM_getGroupId(),
		method: 'flickr.groups.discuss.topics.getList',
		api_key: GM_getPrivateKey(),
		auth_hash: GM_getAuthHash(),
		auth_token: GM_getAuthToken(),
		format: 'json',
		nojsoncallback: 1,
		page: 1,
		per_page: 20
	});
}
					
function pickRandomTheme() {
	var themeCombo = $('UCPANG-workflow-wizard-theme-combo');
	var themeList = themeCombo.getElements('option').filter(function (option) {
		return !option.hasClass('marked');
	});
	var randomIdx = $random(1,themeList.length);
	var randomTheme = themeList[randomIdx - 1];
	randomTheme.set('selected', true);
	$('UCPANG-workflow-wizard-theme-combo').fireEvent('change');
}

    function toggleAwardedToNewWizardDialog(ucpThread) {
	if ($chk($('UCPANG-promote-wizard-dialog'))) {
		$('UCPANG-promote-wizard-dialog').destroy();
	} else {
	    remoteActions = [];
	    failedRemoteActions = [];

	    var wizardDialogContainer = new Element('p', {
		id: 'UCPANG-promote-wizard-dialog',
                'class': 'ucpDialogStyle'
	    }).inject($('UCPANG-workflow-cell'), 'after');
            var wizardDialog = new Element('table', {
		border: 0
	    }).inject(wizardDialogContainer);

	    var titles = provideTitleChangeRow( {
	    	table: wizardDialog,
	    	titleReplacer: groupConfig.workflow().fromClosedToNewRegExp,
		nextStepChecker: groupConfig.workflow().fromOpenToVoteRegExp
	    });
	    var currentTitle = titles.currentTitle;
	    var newTitle = titles.newTitle;
	    var themeExtractRegExp = groupConfig.workflow().themeExtractRegExp;
	    var themeRegExp = new RegExp(themeExtractRegExp.expression, themeExtractRegExp.flags);
	    //alert("DEBUG: currentTitle='" + currentTitle + "' - regexp='" + themeRegExp + "' - match='" + currentTitle.match(themeRegExp) + "'");
	    if (currentTitle.match(themeRegExp)) {
	    	var currentTheme = currentTitle.replace(themeRegExp, themeExtractRegExp.replacement);
		$('UCPANG-workflow-wizard-newtitle').fireEvent('update-theme', currentTheme);
	    }
	    var headersRow = new Element('tr').inject(wizardDialog);
	    new Element('td', { html: 'header: ' }).inject(headersRow);
	    if ($chk(groupConfig.workflow().headersThread)) {
	    	var loadingHeadersImg = new Element('img', { src: updatingIcon, title: 'loading headers..' }).inject(new Element('td').inject(headersRow));
		var loadingHeadersText = new Element('i', { html: ' loading headers..' }).inject(loadingHeadersImg, 'after');
		loadHeaders(function (loadedHeaders) {
			loadingHeadersImg.getParent('td').dispose();
			if (!loadedHeaders.success) {
				new Element('td', { html: '<i>' + loadedHeaders.error + '</i>' }).inject(headersRow);
				return;
			}
			var headersCell = new Element('td').inject(headersRow);
			var headersCombo = new Element('select', {
				id: 'UCPANG-workflow-wizard-header-combo',
				events: {
					change: function (evt) {
						var selectedHeader = $(evt.target).getSelected().get('value');
						if (selectedHeader <= -1) {
							$('UCPANG-workflow-wizard-newheader').set('html', '--none--');
							$('UCPANG-workflow-wizard-theme-combo').set('disabled', false);
							$('UCPANG-workflow-wizard-theme-combo').setStyle('background-color', '');
							$('UCPANG-workflow-wizard-theme-combo').getChildren('option')[0].set('selected', true);
							$('UCPANG-promote-wizard-save-button').setStyle('background-color', 'orange');
							$('UCPANG-promote-wizard-save-button').set('html', 'SAVE without a header?');
							if ($chk(currentTheme)) {
								$('UCPANG-workflow-wizard-newtitle').fireEvent('update-theme', currentTheme);
							}
							return;
						}
						// clean up everything
						// this will prevent all kinds of problems:
						// 1. one selects a header with %previous% placeholder(s)
						// 2. the winner is selected, and placeholder is replaced
						// 3. another header is selected, with %previous% placeholder(s)
						// => %previous% placeholder(s) should be filled in
						// with a clean start, no such problems :-)
						if ($chk($('UCPANG-workflow-wizard-replacement-row'))) {
							$('UCPANG-workflow-wizard-replacement-row').dispose();
						}
						[ 'third', 'second', 'winner' ].each(function (place) {
							if ($chk($('UCPANG-workflow-' + place + '-row'))) {
								$('UCPANG-workflow-' + place + '-row').dispose();
								$$('tr.UCPANG-workflow-' + place + '-list-players-row').dispose();
							}
						});
						$('UCPANG-workflow-wizard-theme-combo').getChildren('option')[0].set('selected', true);
						$('UCPANG-workflow-wizard-newheader').set('html', loadedHeaders.headers[selectedHeader].header);
						// does it contain %__previous templates?
						if (loadedHeaders.headers[selectedHeader].header.match('%__previous')) {
						    var replacementRow = new Element('tr', {
								id: 'UCPANG-workflow-wizard-replacement-row'
						    }).inject($('UCPANG-workflow-wizard-newheader').getParent('tr'),'after');
						    replacementRow.adopt(
							new Element('td'),
							new Element('td', { html: 'select a player to replace the <i>%__previous</i>... placeholders with:' })
						    );
						    [ 'third', 'second', 'winner' ].each(function (place) {
							var camel = place.charAt(0).toUpperCase() + place.replace(/^.(.*)$/, '$1');
							if (loadedHeaders.headers[selectedHeader].header.match('%__previous' + camel)) {
							    if (!$chk($('UCPANG-workflow-' + place + '-row'))) {
								var placeRow = new Element('tr', { 
								    id: 'UCPANG-workflow-' + place + '-row',
								    valign: 'top'
								}).inject(replacementRow, 'after');
								new Element('td', {
									html: camel + ':'
								}).inject(placeRow);
								var playersCell = new Element('td', {
								    id: 'UCPANG-workflow-' + place + '-'
								}).inject(placeRow);
								if (!winnersHashes[place]) winnersHashes[place] = new Hash();
								listPlayers( {
								    playersElement: playersCell,
								    playerHash: winnersHashes[place],
								    ucpThread: ucpThread,
								    idPrefix: 'UCPANG-workflow-' + place + '-',
								    radio: true,
								    winnerChangeCallback: function (winnerHash) {
									// start with clean header
									var selectedHeader = $('UCPANG-workflow-wizard-header-combo').getSelected().get('value');
									var newHeader = loadedHeaders.headers[selectedHeader].header;
									[ 'winner', 'second', 'third' ].each(function (p) {
									    var c = p.charAt(0).toUpperCase() + p.replace(/^.(.*)$/, '$1');
									    // radio button => winnerHash only contains 1 player
									    if (newHeader.match('%__previous' + c)) {
										if (winnersHashes[p]) {
										    var winner; winnersHashes[p].forEach(function(player) { winner = player });
										}
										if (!winner) return;
										newHeader = newHeader.replace(new RegExp('%__previous' + c + '__name__%', 'g'), 
												winner.poster().username)
											 .replace(new RegExp('%__previous' + c + '__title__%', 'g'), 
												$chk(winner.photoTitle()) ? winner.photoTitle() : "<i>--untitled--</i>")
											 .replace(new RegExp('%__previous' + c + '__photo__%', 'g'),
												winner.photo().getParent('a').get('href'));
									    }
									});
									$('UCPANG-workflow-wizard-newheader').set('html', newHeader);
								    }
								});
							    }
							}
						    });
						}
						var dedicatedTheme = loadedHeaders.headers[selectedHeader].theme;
						var fixedTheme = false;
						if ($chk(dedicatedTheme)) { // overriding theme
							fixedTheme = !$chk(dedicatedTheme.match('%__theme__%'));
							if (dedicatedTheme.match('%__number__%')) {
								var numberExtract = groupConfig.workflow().numberExtractRegExp;
								if ($chk(numberExtract)) {
									var number = currentTitle.replace(
									    new RegExp(numberExtract.expression, numberExtract.flags), 
									    numberExtract.replacement);
									dedicatedTheme = dedicatedTheme.replace(/%__number__%/g, number);
								}
							}
						}
						if (fixedTheme) {
							$('UCPANG-workflow-wizard-newtitle').set('html', dedicatedTheme);
						} else if ($chk(dedicatedTheme)) { // templated theme
							$('UCPANG-workflow-wizard-newtitle-hidden').fireEvent('reset-default', dedicatedTheme);
							if ($chk(currentTheme)) {
								$('UCPANG-workflow-wizard-newtitle').fireEvent('update-theme', currentTheme);
							}
						} else {
							$('UCPANG-workflow-wizard-newtitle-hidden').fireEvent('reset-default', newTitle);
							$('UCPANG-workflow-wizard-newtitle').set('html', $('UCPANG-workflow-wizard-hiddentitle').get('value'));
							if ($chk(currentTheme)) {
								$('UCPANG-workflow-wizard-newtitle').fireEvent('update-theme', currentTheme);
							}
						}
						$('UCPANG-workflow-wizard-theme-combo').set('disabled', fixedTheme);
						$('UCPANG-workflow-wizard-theme-combo').setStyle('background-color', fixedTheme ? 'grey' : ''); // make it more visible in Chrome that this combo is disabled
						$('UCPANG-promote-wizard-save-button').setStyle('background-color', '');
						$('UCPANG-promote-wizard-save-button').set('html', 'SAVE');
						if ($chk($('UCPANG-promote-wizard-mark-themes-in-play'))) {
							$('UCPANG-promote-wizard-mark-themes-in-play').set('class', fixedTheme ? 'DisabledButt' : 'CancelButt');
						}
						if ($chk($('UCPANG-promote-wizard-pick-random-theme'))) {
							$('UCPANG-promote-wizard-pick-random-theme').set('class', fixedTheme ? 'DisabledButt' : 'CancelButt');
						}
					} // end change event
				} // end events
			}).inject(headersCell);
			new Element('option', {
				value: -1,
				html: '-- select a header --'
			}).inject(headersCombo);
			loadedHeaders.headers.forEach( function(header, idx) {
				new Element('option', {
					value: idx,
					html: header.title
				}).inject(headersCombo);
			});
		}); // end loadHeaders
	    } else {
		new Element('td', { html: '<i>no header list known - contact Alesa Dam for support</i>' }).inject(headersRow); // TODO: provide a means to notify Alesa Dam
	    }

	    var themesRow = new Element('tr').inject(wizardDialog);
	    new Element('td', { html: 'theme: ' }).inject(themesRow);
	    if ($chk(groupConfig.workflow().themesThread)) {
	    	var loadingThemesImg = new Element('img', { src: updatingIcon, title: 'loading themes..' }).inject(new Element('td').inject(themesRow));
		var loadingThemesLabel = new Element('i', { html: ' loading themes..' }).inject(loadingThemesImg, 'after');
	    	loadThemes(function (loadedThemes) {
			loadingThemesImg.getParent('td').dispose();
			if (loadedThemes.success == true) {
				var themesCell = new Element('td').inject(themesRow);
				var hiddenTitle = new Element('input', { type: 'hidden', id: 'UCPANG-workflow-wizard-hiddentitle', value: newTitle }).inject(themesCell);
				var themeCombo = new Element('select', {
					id: 'UCPANG-workflow-wizard-theme-combo',
					events: {
						change: function (evt) {
						    var selectedTheme = $('UCPANG-workflow-wizard-theme-combo').getSelected().get('value');
						    if (isNaN(selectedTheme)) {
							$('UCPANG-workflow-wizard-newtitle').fireEvent('update-theme', selectedTheme);
						    } else {
							if ($chk(currentTheme)) {
								$('UCPANG-workflow-wizard-newtitle').fireEvent('update-theme', currentTheme);
							}
						    }
						}
					}
				}).inject(themesCell);
				new Element('option', {
					value: -2,
					html: '-- select a theme --'
				}).inject(themeCombo);
				var themeCategoryRegExp = groupConfig.workflow().themeCategoryRegExp;
				if ($chk(themeCategoryRegExp)) {
					var themeCategoryMatcher = new RegExp(themeCategoryRegExp.expression, themeCategoryRegExp.flags);
				}
				var optgroup = undefined;
				loadedThemes.themes.forEach( function(theme, idx) {
					if (theme.length == 0) {
						return; // skip empty lines
					}
					if ($chk(themeCategoryMatcher) && theme.match(themeCategoryMatcher)) {
						optgroup = new Element('optgroup', {
							label: theme,
							styles: {
								backgroundColor: 'yellow'
							}
						}).inject(themeCombo);
					} else {
						new Element('option', {
							html: theme.replace(/<[^>]+>/g, ''), // remove any html formatting in the list - don't do this before matching!
							styles: {
								backgroundColor: 'white'
							}
						}).inject($chk(optgroup) ? optgroup : themeCombo);
					}
				});

				var markThemeExtract  = groupConfig.workflow().markThemeExtractRegExp;
				if ($chk(markThemeExtract)) {
				    new Element('img', {
					id: 'UCPANG-promote-wizard-mark-themes-in-play',
					src: images.mark,
					'class': 'CancelButt',
					title: 'mark the themes that are currently in play',
					styles: {
						height: '14px'
					},
					events: {
						click: function (evt) {
							markButton = $('UCPANG-promote-wizard-mark-themes-in-play');
							if (markButton.hasClass('DisabledButt')) return; // still busy
							markButton.set('src', updatingIcon);
							markButton.set('title', 'loading Discuss page');
							markButton.set('class', 'DisabledButt');
							var pickRandom = $('UCPANG-promote-wizard-pick-random-theme');
							if ($chk(pickRandom)) pickRandom.set('class', 'DisabledButt');
							markThemesInPlay(function (result) {
								var success = result.success;
								var msg = result.msg;
								markButton.set('src', success ? defaultCheckIconSmall : errorIcon);
								markButton.set('title', success ? 'marked themes in play' : 'error: ' + msg);
								markButton.set('class', 'CancelButt');
								var pickRandom = $('UCPANG-promote-wizard-pick-random-theme');
								if ($chk(pickRandom)) pickRandom.set('class', 'CancelButt');
							});
						}
					}
				    }).inject(themesCell);
				}
				new Element('span', { html: ' ' }).inject(themesCell);
				new Element('img', {
					id: 'UCPANG-promote-wizard-pick-random-theme',
					src: images.random,
					'class': 'CancelButt',
					title: 'pick random theme',
					styles: {
						height: '14px'
					},
					events: {
						click: function (evt) {
							if ($('UCPANG-promote-wizard-pick-random-theme').hasClass('DisabledButt')) return;
							var markButton = $('UCPANG-promote-wizard-mark-themes-in-play');
							if ($chk(markButton) && !markButton.hasClass('DisabledButt')) {
								markButton.set('src', updatingIcon);
								markButton.set('title', 'loading Discuss page');
								markButton.set('class', 'DisabledButt');
								markThemesInPlay(function (result) {
									var success = result.success;
									var msg = result.msg;
									markButton.set('src', success ? defaultCheckIconSmall : errorIcon);
									markButton.set('title', success ? 'marked themes in play' : 'error: ' + msg);
									pickRandomTheme();
								});
							} else {
								pickRandomTheme();
							}
						}
					}
				}).inject(themesCell);
			} else {
				new Element('td', { html: loadedThemes.error }).inject(themesRow);
			}
	    	}); // end loadThemes
	    } else {
		new Element('td', { html: '<i>no theme list known - contact Alesa Dam for support</i>' }).inject(themesRow); // TODO: provide a means to notify Alesa Dam
	    }

	    // move the new title row below the header and theme combos
	    $('UCPANG-workflow-wizard-new-title-row').inject(themesRow, 'after');
	    // change 'new title:' into 'preview'
	    $('UCPANG-workflow-wizard-new-title-label').set('html', 'preview:');
	    // move the new title into its own row and make it look like a title
	    var newTitleRow = new Element('tr').inject($('UCPANG-workflow-wizard-new-title-row'), 'after');
	    $('UCPANG-workflow-wizard-new-title-cell').inject(newTitleRow);
	    var header = new Element('h2');//.inject(wizardDialog); // temporary, or else it won't work
	    $('UCPANG-workflow-wizard-new-title-cell').getChildren().each(function (el) {
	    	el.inject(header);
	    });
	    header.inject('UCPANG-workflow-wizard-new-title-cell');


	    var newHeaderRow = new Element('tr', { valign: 'top' }).inject(wizardDialog);
	    var newHeaderCell = new Element('td', { 'class': 'Said', colspan: 3 } ).inject(newHeaderRow);
	    createEditableTextElement(newHeaderCell, 'UCPANG-workflow-wizard-newheader', 'white', null);

	    if (groupConfig.workflow().stickyChallenges) {
		    var stickyRow = new Element('tr').inject(wizardDialog);
		    new Element('td', { html: 'make sticky', id: 'UCPANG-workflow-wizard-sticky-label' }).inject(stickyRow);
		    var stickyCell = new Element('td').inject(stickyRow);
		    new Element('input', {
			type: 'checkbox',
			checked: true,
			id: 'UCPANG-workflow-wizard-sticky-check'
		    }).inject(stickyCell);
	    }
	    var buttonRow = new Element('tr', { valign: 'top' }).inject(wizardDialog);
	    var buttonCell = new Element('td', {
		colspan: 2,
		align: 'right',
		valign: 'top'
	    }).inject(buttonRow);
	    new Element('button', {
		'class': 'CancelButt',
		html: 'Cancel',
		events: {
			'click': function (evt) {
				$('UCPANG-promote-wizard-dialog').destroy();
			}
		}
	    }).inject(buttonCell);
	    new Element('span', {
		html: ' '
	    }).inject(buttonCell);
	    new Element('button', {
		'class': 'Butt',
		html: 'SAVE without a header?',
		styles: {
			backgroundColor: 'orange'
		},
		id: 'UCPANG-promote-wizard-save-button',
		events: {
			'click': function (evt) {
		    		remoteActions = [];
		    		failedRemoteActions = [];
				if ($('UCPANG-promote-wizard-save-button').hasClass('Butt')) {
					// show spinning balls
					var button = $(evt.target);
					button.empty();
					button.adopt(new Element('img', {
						src: updatingIcon,
						title: 'creating challenge'
					}));
					var wizardDialog = $('UCPANG-promote-wizard-dialog');
					// create challenge
					var progressRow = new Element('tr').inject(buttonRow, 'after');
					var progressPanel = new Element('td', { id: 'UCPANG-workflow-wizard-progress-panel', colspan: 3 }).inject(progressRow);
					new Element('div', { html: 'actions progress:', styles: { fontWeight: 'bold' } }).inject(progressPanel);
					
					expectedRemoteActions.set('create', true);
					expectedRemoteActions.set('stickify', true);
					var createChallengeProgressElement = createProgressElement('creating challenge',
												   'UCPANG-workflow-progress-new-challenge',
												   function () {
						createChallenge(
							$('UCPANG-workflow-wizard-newtitle').get('text'), // use 'text', not 'html'
							$('UCPANG-workflow-wizard-newheader').get('html').replace(/\n/g, '').replace(/<br[^>]*>/g, '\n'),
							function (retval) {
								remoteActions.push(true);
								expectedRemoteActions.erase('create');
								var threadId = retval.threadId;
								updateRemoteAction({ success: retval.success,
									error: 'error creating challenge: ' + retval.message,
									buttonImg: $('UCPANG-workflow-progress-new-challenge-icon'),
									title: 'challenge created',
									hreflink: /(.*flickr.com\/groups\/[^\/]+\/discuss\/)/.exec(document.location.href)[1] + threadId,
									hrefhtml: 'created thread: ' + $('UCPANG-workflow-wizard-newtitle').get('text'), // use 'text', not 'html'
									});
								var stickyCheckbox = $('UCPANG-workflow-wizard-sticky-check');
								if (retval.success && $chk(stickyCheckbox) && stickyCheckbox.checked) {
									$('UCPANG-workflow-progress-make-sticky').fireEvent('run-action',threadId);
								}
							}
						);
					});
					if (groupConfig.workflow().stickyChallenges && $('UCPANG-workflow-wizard-sticky-check').checked) {
						var stickifyElement = createProgressElement('making challenge sticky', 'UCPANG-workflow-progress-make-sticky', function (threadId) {
							stickifyChallengeThread(threadId, function (retval) {
								remoteActions.push(true);
								expectedRemoteActions.erase('stickify');
								updateRemoteAction({ success: retval.success,
									error: 'error stickifying challenge: ' + retval.error,
									buttonImg: $('UCPANG-workflow-progress-make-sticky-icon'),
									title: 'challenge thread stickified',
									hreflink: /(.*flickr.com\/groups\/[^\/]+\/discuss\/)/.exec(document.location.href)[1] + retval.threadId,
									hrefhtml: 'created thread: ' + $('UCPANG-workflow-wizard-newtitle').get('text'), // use 'text', not 'html'
									});
							});
						});
					} else {
						expectedRemoteActions.erase('stickify');
					}
					createChallengeProgressElement.fireEvent('run-action');
				}
			}
		}
	    }).inject(buttonCell);

	}
    }

    function createChallenge(title, header, callback) {
	var apiData = {
        	    api_key: GM_getPrivateKey(),
	            auth_hash: GM_getAuthHash(),
        	    auth_token: GM_getAuthToken(),
	            format: 'json',
        	    nojsoncallback: 1,
	            method: 'flickr.groups.discuss.topics.add',
		    group_id: GM_getGroupId(),
		    subject: title,
		    message: header
        	};
	new Request({
        	    url: "http://www.flickr.com/",
	            onFailure: function (response) {
        	        callback(key, { success: false, message: response.statusText });
	            },
        	    onSuccess: function (responseText, responseXML) {
                	var result;
	                try {
        	            result = JSON.parse(responseText);
                	} catch (e) {
				try {
					result = eval('(' + responseText + ')');
				} catch (f) {
					callback({ success: false, message: e });
					return;
				}
        	        }
                	if (result.stat === 'fail') {
	                    callback({ success: false, message: result.code + " - " + result.message });
                	} else {
			    callback({ success: true, threadId: result.topic.id });
			}
	            }
        }).get("/services/rest", apiData);
    }

    function updateRemoteAction(data) {
    	var result    = data.success;
	var msg       = data.error;
	var buttonImg = data.buttonImg;
	var title     = data.title;
	var hreflink  = $chk(data.hreflink) ? data.hreflink : /(.*flickr.com\/groups\/[^\/]+\/discuss\/\d+)/.exec(document.location.href)[1] + '/';
	var hrefhtml  = $chk(data.hrefhtml) ? data.hrefhtml : 'reload page to go to next step';

	if (result) {
		remoteActions.pop();
		buttonImg.set('src', defaultCheckIconSmall);
		buttonImg.set('title', title);
	} else {
		failedRemoteActions.push(true); // push to failures, before popping from active
		remoteActions.pop();
		buttonImg.set('src', errorIcon);
		buttonImg.set('title', msg);
	}
	if (remoteActions.length == 0 && expectedRemoteActions.getLength() == 0) {
	    if (failedRemoteActions.length == 0) {
       		document.location.href = hreflink;
	    } else {
	        var saveButton = $('UCPANG-promote-wizard-save-button').getElement('img');
		saveButton.set('src', errorIcon);
		$('UCPANG-promote-wizard-save-button').set('title', 'hover the red cross(es) to get individual error reports');
	    }
	    new Element('a', {
		href: hreflink,
		html: hrefhtml
	    }).inject(new Element('td', {
		colspan: 3
	    }).inject(new Element('tr').inject($('UCPANG-promote-wizard-save-button').getParent('table'))));
	}
    }

    function postMedal(medalText, photoData, key, callback) {
	var apiData = {
        	    api_key: GM_getPrivateKey(),
	            auth_hash: GM_getAuthHash(),
        	    auth_token: GM_getAuthToken(),
	            format: 'json',
        	    nojsoncallback: 1,
	            method: 'flickr.photos.comments.addComment',
		    photo_id: photoData.photoId(),
		    comment_text: medalText
        	};
	new Request({
        	    url: "http://www.flickr.com/",
	            onFailure: function (response) {
        	        callback(key, { success: false, msg: response.statusText });
	            },
        	    onSuccess: function (responseText, responseXML) {
                	var result;
	                try {
        	            result = JSON.parse(responseText);
                	} catch (e) {
				try {
					result = eval('(' + responseText + ')');
				} catch (f) {
					callback(key, { success: false, msg: e });
					return;
				}
        	        }
                	if (result.stat === 'fail') {
	                    callback(key, { success: false, msg: result.code + " - " + result.message });
                	} else {
			    callback(key, { success: true });
			}
	            }
        }).get("/services/rest", apiData);
    }

    function postTags(data) {
	var key = data.key;
	var tags = data.tags;
	var photo = data.photo;
	var callback = data.callback;

	// TODO: check if we can tag this photo
	// if not, and there is an tagThread, post it there instead of erroring out
	var apiData = {
            api_key: GM_getPrivateKey(),
	    auth_hash: GM_getAuthHash(),
            auth_token: GM_getAuthToken(),
	    format: 'json',
            nojsoncallback: 1,
	    method: 'flickr.photos.addTags',
	    photo_id: photo.photoId(),
	    tags: tags
        };
	new Request({
            url: "http://www.flickr.com/",
	    onFailure: function (response) {
                callback(key, { success: false, msg: response.statusText });
	    },
            onSuccess: function (responseText, responseXML) {
              	var result;
	        try {
                    result = JSON.parse(responseText);
              	} catch (e) {
			try {
				result = eval('(' + responseText + ')');
			} catch (f) {
				callback(key, { success: false, msg: e });
				return;
			}
                }
               	if (result.stat === 'fail') {
	            callback(key, { success: false, msg: result.code + " - " + result.message });
               	} else {
		    callback(key, { success: true });
		}
	    }
        }).get("/services/rest", apiData);
    }

    function sendAdminInvite(data) {
    	var key = data.key;
	var groupId = data.groupId;
	var photo = data.photo;
	var photoId = photo.photoId();
	var callback = data.callback;
	var force = data.force;

	isInPool(photoId, groupId, function(retval) {
		if (retval.found) {
			GM_log("photo is already in the pool; skipping");
			callback(key, { success: true });
			return;
		}
		isGroupAdministratorOrModerator(userNsid, groupId, function(groupAdminOrMod) {
			if (groupAdminOrMod.administrator || force) {
			  var apiData = {
			    api_key: GM_getPrivateKey(),
			    auth_hash: GM_getAuthHash(),
			    auth_token: GM_getAuthToken(),
			    format: 'json',
			    nojsoncallback: 1,
			    method: 'flickr.groups.invite.photo.invite',
			    group_id: groupId,
			    photo_id: photoId
			  };
			  new Request({
			    url: "http://www.flickr.com/",
			    onFailure: function (response) {
				callback(key, { success: false, message: response.statusText });
			    },
			    onSuccess: function (responseText, responseXML) {
				var result;
				try {
				    result = JSON.parse(responseText);
				} catch (e) {
					try {
						result = eval('(' + responseText + ')');
					} catch (f) {
						callback(key, { success: false, message: e });
						return;
					}
				}
				if (result.stat === 'fail') {
				    callback(key, { success: false, message: result.code + " - " + result.message });
				} else {
				    callback(key, { success: true });
				}
			    }
			  }).get("/services/rest", apiData);
			} else if ($chk(loadedMedals.inviteTopic)) {
				apiPostThreadReply({
					topicId: loadedMedals.inviteTopic,
					message: "[http://www.flickr.com/photos/" + photo.owner().userid + "/" + photoId + "]\n" +
						 "has won challenge " + document.location.href + "\n" +
						 "and needs an invite for group '" + groupAdminOrMod.groupname + "'",
					callback: function(retval) {
						callback(key, { success: retval.success, message: retval.message });
					}
				});
			} else {
				data.force = true;
				sendAdminInvite(data);
			}
		});
	});
    }

    function getThumbDimensions(photoId, callback) {
        var apiData = {
            api_key: GM_getPublicKey(),
            auth_hash: GM_getAuthHash(),
//            auth_token: GM_getAuthToken(),
            format: 'json',
            nojsoncallback: 1,
            method: 'flickr.photos.getSizes',
            photo_id: photoId
        };
        new Request({
            url: "http://www.flickr.com/",
            onFailure: function (response) {
		callback({ success: false, message: "error calling flickr.photos.getSizes: " + response.statusText });
            },
            onSuccess: function (responseText, responseXML) {
                var result;
                try {
                    result = JSON.parse(responseText);
                } catch (e) {
		    try {
                    	result = eval('(' + responseText + ')');
		    } catch (f) {
			callback({ success: false, message: "error parsing photo sizes reply: " + e });
			return;
		    }
                }
                if (result.stat === 'fail') {
                    callback({ success: false, message: "failure retrieving photo sizes: " +result.code + " - " + result.message });
                    return;
                }
                var sizes = result.sizes;
    		var found = false;
                $each(sizes.size, function (size) {
		    if (found) return;
                    if (size.label == 'Thumbnail') {
		    	found = true;
		    	callback({ success: true, width: parseInt(size.width), height: parseInt(size.height) });
                    }
                });
		if (!found) {
			callback({ success: false, message: "no Thumbnail size found", width: 0, height: 0 });
		}
            }
        }).get("/services/rest", apiData);
    }

    function processPendingItems() {
        var buttons = [];
        $$('img').filter(ucpCheckPendingPhoto).each(function (photo) {
            var photoCell = photo.getParent('td.gPendPic');
            photoCell.set('rowspan', 2);
            var photoRow = photo.getParent('tr');
            var awardsRow = new Element('tr').inject(photoRow, 'after');
            var awardsCell = new Element('td', { styles: { padding: 0, background: 0 } }).inject(awardsRow);
            var comboRow = new Element('tr').inject(awardsRow, 'after');
            var allAwardsCell = new Element('td', { colspan: 2 , styles: { padding: 0, background: 0 }}).inject(comboRow);
            var photoId = extractPhotoId(photo.get('src'));
            var allAwardsButton = addAwardsCombo(allAwardsCell, 
                "awards in group", 
                awardsCell,
                groupPreferences.defaultAwardsGroupInPendingItems(),
                'flickr.photos.comments.getList', 
                { photo_id: photoId },
                allAwardsCallback
            );
            buttons.include(allAwardsButton);
        });
        new Element('table', {
            border: '0',
            width: '100%',
            cellPadding: '0',
            cellSpacing: '0'
        }).adopt(new Element('tr', { styles: { height: '1.02em' } }).adopt(
            new Element('td', {
                align: 'right',
                vAling: 'center',
                width: '99%',
                height: '1.02em'
            }).adopt(
                new Element('button', {
                    html: 'check awards',
                    'class': 'CancelButt',
                    events: {
                        'click': function (event) {
                            event.preventDefault(); // click would trigger the form 'submit'
                            buttons.each(function (button) {
                                button.click();
                            });
                        }
                    }
                })
            ),
            new Element('td', {
                html: "&nbsp;&nbsp;",
                height: '1.02em'
            }),
            new Element('td', {
                id: 'UCPANG.gPendAll',
                nowrap: 'nowrap',
                align: 'right',
                vAlign: 'center',
                height: '1.02em',
                styles: {
                    whiteSpace :'nowrap',
                    overflow: 'hidden',
                }
            })
        )).inject($$('p.gPendAll')[0], 'before');
        $('UCPANG.gPendAll').grab($$('p.gPendAll')[0]);
    }

//the real code
// *******************
// Start of processing
// *******************

    if (window.name === 'Log page') {
        throw new Error('not processing log page');
    }

	new Element('span', {
		id: 'UCPA-updatenotifier',
		'class': 'hidden_from_view',
		events: {
			'checkversion': function (evt) {
				checkVersion(evt.version);
				// if version is newer than stored one, clear all GM variables
				var storedVersion = GM_getValue("UCPA.version");
    				if ($chk(storedVersion)) {
        				if (evt.version !== storedVersion) {
					        cleanupUCPAvariables();
					}
				} else {
            				cleanupUCPAvariables();
        			}
				GM_setValue("UCPA.version", evt.version);
    			}
		}
	}).inject($$('body')[0], 'bottom');
    	getVersion('UCPA-updatenotifier', 'checkversion');

    var discussPage = false;
    var threadPage = false;
    var pendingItemsPage = false;
    var supportedGroupOrPage = false;
    var groupNavigationMenu;
    var navigation;
    if (document.location.href.match(/.*\/edit\/?/)) {
        throw new Error("not processing edit page");
    }

    if (document.location.href.match(/.*flickr.com\/groups\/[^\/]+\/discuss(?:\/page\d+)?(?:\/)?$/)) {
        GM_log("on discuss page");
        discussPage = true;
	groupNavigationMenu = document.getElement('div.groups-header');
        navigation = groupNavigationMenu;
        supportedGroupOrPage = initialize();
    } else if (document.location.href.match(/.*flickr.com\/groups\/[^\/]+\/discuss\/\d+/)) { // can be followed with '/', '/page', '/#comment', '/#reply', ...
        GM_log("on challenge thread page");
        threadPage = true;
        navigation = $$('div#main h1#Tertiary');
        supportedGroupOrPage = initialize();
    } else if (document.location.href.match(/.*flickr.com\/groups\/[^\/]+\/admin\/pending/)) {
        GM_log("on pending stuff page");
        pendingItemsPage = true;
        var navigation = $$('div#main table#SubNav tbody tr').getElement('td.Section');
        supportedGroupOrPage = initialize();
    }

    if (!supportedGroupOrPage) {
        throw new Error("not on a supported group/page; aborting");
    }

    var ucpThread; // define globally
    var discussionTopic; // define globally
    isGroupAdministratorOrModerator(userNsid, groupConfig.groupId(), function(isAdminOrMod) {
	    if (!isAdminOrMod.moderator && !isAdminOrMod.administrator) {
		throw new Error("you are not an admin/mod for this group - aborting");
	    }

	    if (discussPage) {
		if (challengeGroup) {
		    groupNavigationMenu.adopt(
		    new Element('p', {
			'class': 'LinksNewP',
			id: 'UCheckPlayNGAdminPreferences'
		    })).adopt(preferencesSpan = new Element('span', {
			    id: 'UCPA_preferences_span',
			    styles: {
				fontWeight: 'bold'
			    },
			    html: "UCheckPlayNG Admin preferences:",
			    events: {
				'showversion': function (evt) {
					this.set('html', this.get('html').replace(/:$/, ' ' + evt.version + ':'));
				}
			    }
			})).adopt(
			new Element('a', {
			    name: '#',
			    title: "Click to change preferences",
			    styles: {
				color: "Blue",
				cursor: "pointer"
			    },
			    html: " [ " +
				(groupPreferences.smartPhotoBoxes() ? "Smart info boxes - " : "") +
				(groupPreferences.hideNonWonMedals() ? "Hide non-won medals" : "Show non-won medals") + " - " +
				(groupPreferences.bumpAndReload() ? "Bump & Reload" : "Bump") +
				" ]",
			    events: {
				'click': togglePreferencesDialog
			    }
			})
		    );
		    getVersion('UCPA_preferences_span', 'showversion');
		}

		if (topicListingTable) {
		    processTopicListingTable(topicListingTable);
		} else {
		    GM_log("not processing (no TopicListing found!)");
		}
	    } else if (threadPage && challengeGroup) { // challenge thread page
		var dummy = new UCPThread({ url: document.location.href });
		dummy.apiloadthread(function (result) {
			if (!result.success) {
				return;
			}
			var discussionTopic = result.topic;
			var challengeEntries = result.replies;
			var thread   = document.location.href;
			ucpThread = ucpCreateChallengeThread({
			    groupConfig: groupConfig,
			    url: thread, 
			    chlgname: discussionTopic.subject,
			    groupConfig: groupConfig,
			    replyDecoratorFactory: new UCPEmptyDecoratorFactory(),
			    decoratorFactory: new UCPWorkflowThreadDecoratorFactory()
			});
			if ($chk(groupConfig.workflow())) {
			    var workflowAvailable = false;
			    if (groupConfig.workflow().debug == true) {
				// when still debugging, only allow certain appointed people to help debugging
				var loggedInUserId = GM_getGlobalNsid();
				workflowAvailable = groupConfig.workflow().testers.some( function (tester) {
					return loggedInUserId == tester;
				});
			    } else {
				workflowAvailable = groupConfig.workflow().debug == undefined || groupConfig.workflow().debug == false;
			    }
			    if (workflowAvailable) {
				if (ucpThread.photos().length == 0) { // not collected yet
					ucpThread.challengeDefinition().readChallengeDefinitionOverrides(new Element('div', { html: discussionTopic.message._content }));
					ucpThread.collectApiVotes(discussionTopic, challengeEntries);
				}
				// reset status
				ucpThread.setChallengeStatus("none");
				var votes  = ucpThread.votes();
				var comments = ucpThread.comments();
				var photos = ucpThread.photos();
				try {
					ucpProcessVotes(ucpThread);
				} catch (e) {
					// throws exception in non-challenge threads
				}
				new Element('button', {
					'class': 'CancelButt',
					id: 'UCPANG-workflow-button',
					html: 'Workflow',
					title: 'open the workflow dialog',
					styles: {
						'padding-left': '5px',
						'padding-right': '5px',
						'margin-left': '5px',
						'margin-right': '5px'
					},
					events: {
						'click': function () {
							$('UCPANG-workflow-button').dispose();
							addWorkflowDialog(discussionTopic, ucpThread);
						}
					}
				}).inject($('main').getElement('div.group-topic-detail-col h2'), 'after');
				// prevent Steeev's inline editor to interfere :-)
				$('main').addEventListener('DOMNodeInserted', newNodeHandler, true);
				$('main').addEventListener('DOMNodeRemoved', removedNodeHandler, true);
				// click the workflow button when we know there is a workflow action needed
				switch (ucpThread.challengeStatus()) {
				case "Open":
					if (ucpThread.filled()) $('UCPANG-workflow-button').click();
					break;
				case "Filled":
					$('UCPANG-workflow-button').click();
					break;
				case "--VOTE--":
					if (ucpThread.finished()) $('UCPANG-workflow-button').click();
					break;
				case "Finished":
					if (!ucpThread.isClosed().closed ||
					    (ucpThread.isClosed().closed && ucpThread.isClosed().closer.innerHTML.match(GM_getLoggedInUser())))
						$('UCPANG-workflow-button').click();
					break;
				case "Closed":
					if (ucpThread.isClosed().closed && ucpThread.isClosed().closer.innerHTML.match(GM_getLoggedInUser())) $('UCPANG-workflow-button').click();
					break;
				}

			    }
			}
			var form = $$('table.TopicReply form textarea');
			if ($chk(form) && form.length > 0) {
			    // add a 'bump this' on the page
			    var bumpButton = new Element('button', {
				'class': 'Butt',
				id: 'UCPANG-bump-button',
				html: 'bump ',
				title: 'put this challenge thread at the top of the list',
				events: {
				    'click': function () {
					$$('img[id^=UCPANG-bump-thread], img[id^=UCPANG-fetch-old], img[id^=UCPANG-bump-remove]').dispose();
					createProgressImage({ idPrefix: 'UCPANG-bump-thread-', id: ucpThread.topic(), startTitle: 'queued for bumping',
						busyTitle: 'bumping..', doneTitle: 'bumped', majorButtonId: 'UCPANG-bump-button'
					}).inject(this, 'after');
					bumpThread({ topicId: ucpThread.topic(), majorButton: this });
				    },
				    'done': function (evt) {
					// ignore
				    }	
				}
			    }).inject($('main').getElement('div.group-topic-detail-col h2'), 'after');
			    new Element('img', { src: images.bump }).inject(bumpButton);
			}
			processDiscussionTopic(discussionTopic, challengeEntries, ucpThread);
		});

	    } else if (pendingItemsPage && challengeGroup) {
		processPendingItems();
	    } 
    });

    ucpGroupConfigReader.checkForUpdates(groupConfig.groupname());

    return;

    // *******************
    //  End of processing
    // *******************
})();


