// ==UserScript==
// @name           Flickr Photo Actions on Flickr Threads
// @namespace      http://www.flickr.com/alesadam
// @description    Provides a menu for Flickr photos found in Discuss thread with options to add as a favorite, invite to a group, add a comment, ...
// @include        http://www.flickr.com/groups/*/discuss/*
// @include	   http://www.flickr.com/photos/*
// @include	   http://www.flickr.com/groups/*/admin/pending*
// @include	   http://www.flickr.com/groups/*/pool*
// @include	   http://www.flickr.com/groups/*
//
// @run-at	   document-end
//
// @version	   6.4
// @author	   Alesa Dam (http://flickr.com/alesadam)
// @date	   Jun 19, 2011
// @modified	   Aug 21, 2013
//
// @downloadURL	   https://userscripts.org/scripts/source/105131.user.js
// @updateURL	   https://userscripts.org/scripts/source/105131.meta.js
// @icon	   http://s3.amazonaws.com/uso_ss/icon/105131/large.png?1350039684
//
// @run-at         document-end
//
// @copyright	2011-2012 Alesa Dam
// @license	GPL v3+
// @licstart	The following is the entire license notice for this script.
/*
 * Copyright (C) 2009-2011 Alesa Dam
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
// @licend
//
// ==/UserScript==
//
// The project page can be found at http://code.google.com/p/flickr-photo-actions-on-thread-pages/
// That is the place to get the latest (beta) version, see known issues listed, or provide 
// feature requests, and patches :-)
//
//
(function () {
var version="6.4";
var scriptNumber = 105131;

// configuration:

// the Flickr 'small' size is 240 wide, 160 heigh
// the script will reject images that have both dimensions set (or computed) to less than these thresholds:
COMBINED_WIDTH_TRESHOLD=240;
COMBINED_HEIGHT_TRESHOLD=160;

// the script will also reject images that have one of their dimensions set (or computed) below these thresholds:
STRICT_WIDTH_TRESHOLD=30;
STRICT_HEIGHT_TRESHOLD=30;

if (!document.location.href.match(/flickr\.com\/groups\/[^\/]+\/discuss\/\d+/) && // can not use document.location.href.test in Firefox
	!document.location.href.match(/flickr\.com\/photos\/[^\/]+\/\d+/) &&
	!document.location.href.match(/flickr\.com\/groups\/[^\/]+\/admin\/pending/) &&
	!document.location.href.match(/flickr\.com\/groups\/[^\/]+\/pool/) &&
	!document.location.href.match(/flickr\.com\/groups\/[^\/]+\/?$/)) {
	throw new Error("not on a supported page; aborting");
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

		trident: function(){
			return (!window.ActiveXObject) ? false : ((window.XMLHttpRequest) ? ((document.querySelectorAll) ? 6 : 5) : 4);
		},

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

var images = {
	updating: 'http://www.flickr.com/images/pulser2.gif',
	error:    'http://l.yimg.com/g/images/icon_error_x_small.png',
	check:    'http://l.yimg.com/g/images/icon_check_small.png',
	check_big:    'http://l.yimg.com/g/images/icon_check.png',
	editadd: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFpElEQVRYhbWXy4tlVxWHv7X2455z' +
	    'H1XV1ZVqOpVWE7sSCBEVhKgERCVKEMSBoBBwEIiGgI6dOFEc+Bc4UkFBhUgwOhJHNpoWFUxUbMUk' +
	    'TXdidaW6vbfu+zz2w8GtdIg4qDuoAz/OPnDOWt9Z7P1be0vOmdNe931q74sLmX9jPB2TIpCBtLob' +
	    'Ve7Z3mW33P3Oyz9/+YenjWlPnR0YxdHXvvKFpx4+XowZjoer5BEkKXs7e1zefpBv/uhbXwXOBmBR' +
	    'L+ONxQ0+8/jnuHN4C4tFjUFFeNcD7+X5H/yM0fg4rBNzLQAEpjphbqdMdIypLCYYVJTpbMpoOVor' +
	    '3PoACqY0aCGkQSRpIs0t2ioxBcQJyFkCCGgpOO8wHUPILSEmpFHaGMgmnzGAgpaK6zhcx5JSpClb' +
	    'WEIbW7JJZw9gSsV5i/EGDUK2ieAjgZas61dA131bC8E6g3oBI2AywbQECWRJ62VfG0BAOiBGQCFr' +
	    'IkoiSEtLS+KMKyBC6vgOSRKJSCQSckubW9rU0BuUqF2vDHbv8b3PP/zQQ8+++I8X769zDYb/K1Xy' +
	    '9qXB9nbeoYoVTWpoYkN7omWz5PKlB7l030uPdD5pX2vbKG85ZQ5A4K5td6znyceevP6ba1e+ZxeL' +
	    '2fsOZgcf/9gzH6HoFWz2N+n3e5S9Lt1uQd8OKE0PUYhEunbAtJqybJZU7ZIqVNR1Q2Mb7n/3Azzz' +
	    '7Jc3lvVyI4WMZkWioEkhCZIURTg32OKnP37uPaM7wz/Y8WTS9CvP9TDHO8e93T32Nvfob/YoeiW+' +
	    '47GiCEKKkeHiTSbTGfNqzryas6gWxCpx6z+vMzw4wlmPMw5rDEYtRg3WGNSvnlFlWcxppxXHk3Fj' +
	    'c4Z63lLdmNIua47nQ27N3uD8dIfdwS7b3W1K20VQYog0dUO9qKkWFYvlgmbWwkQJ8wlzo1hvMc5g' +
	    'nD2BMBgMJltMMphs6HX7jJohSRKWDLlJ5GMhWli4BUYNKSVm1ZQ3O4f0fJ++DvDZE9tEvaxZLpfU' +
	    'swYZCjKzWJ+xXUPsgnQy6iCZjEhGyEgEQoY2EyUgpYADu5ooApWQDqGhZRzHtE1LtaiY+RmqtxER' +
	    'TDJ0UoFLHbRWGAkyNpgiw0aEnkVLhzhFraz+XgyKkFMixUxqIyE35CKBOQEw2RJcQ64hHkEKkbA1' +
	    'ZdGdY71FjZIzhBhoq4AulcFkk814jo1zG+iWRzYsrnQUvqTjO3jjsepQUQRFEqSYiCGRSJierAC8' +
	    'enYv7DL6xC00niwVBfEZ8SAWMBkySCuUuUv/YIdb124y3BjRO1dyj93hkfPv59LGPoUvKFyBMw6j' +
	    'BkWRLOQMOSZiTBhR7r34d/5V3MBubW65D+09yi+/+wKLZlUW9EQCIpAVXMex0RvwxNOf5a+b1zgs' +
	    'bqLb0PZqRjLkjj2gPxpw5fmrLNKcmBNysu7JkOPKC3KAQgqeePTT/G37n85OwuRXL1z5xe3j0Til' +
	    'nO8m/l+ptnW7E79++Orhvp4XZAC6KXR7XQb9Ad2yxxuj6/z7lYPXFrebb2PpwNsApHfqJ68+p9W8' +
	    '+bNd/ml5Fbh6Kiv+qHzp6Pho310soA++tJRFSVmWDLoDbubXWS6aw/zb/P3TWvF6zShjYh0RB1qC' +
	    '8x7vPUVRUHQKRIQs68VcDyABrYAFdeCsxXuPcw7vPAazKveZAWSgWX0lRlc7YlWMMRhjkHV78doA' +
	    'CXLF3Z4vCCJv661ud7YAzWqYcyblREonyoncnjVAhhzzSY/PxBiJMRJCIMRArOOqCmcGABgMmUxo' +
	    'oY41dThRrNCw/iRca1dsjHKhvEB9u+LcdAvbMbjcQYOlLlvOs4sTu9ZMXAvg8tb+767/5ZXHpr8+' +
	    'ZtzU0M0Mu3PowMHWEee7F9nfu/z7dWLKOsdz/wH/4RzzB0MKqwOo8A7r9t5ZyfpS9cfqVM4K8F9A' +
	    'RbDwFmjR/wAAAABJRU5ErkJggg==',
	editpaste: 'data:image/png;base64,' +
	    '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' +
	    'AAAASUVORK5CYII=',
	editdelete: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAJv0lEQVRYhZWXa2wc13XHf/femdk3' +
	    'ueSSIilKlEhKpmrJiuNETWTXsuwKkZwYSdoYTVP3g13ATZsUdRG3QFu0TYD2S9sAReE+4MRtarcw' +
	    'GvcVJ5JjR5YV25KiNGndWBZkURYp8a3d5b64j9mdmXv6gauYdhLXPcBgzh1gzv8/557zv3PUn/NW' +
	    '04DpXhqIA0H33g/kIW1gh4FJBTkBBMohzEYwPQi1AtBef04ItLrrdjeWswFvo/9OlgA+JfDA7mx6' +
	    '/8DYZpMa3UyiN0sk0FmrUV9ZYXV2nuXy2mngCeBJoP5/BVbvIgOf25qJf2Hq1lszm498BOfAbTC0' +
	    'FVAQ+mBBtEJ12kitQvSdMywfO8r5U99pXaq3vhDAn/nvkIF3InDDoObfbjl4+56JX/oUenIn0mgQ' +
	    'lSvQCUAJWAFrsWJQrkHFPUwmgzIu0fIcC0/+EydfOH1pWfi5Npz//xC4YzyTPHnXg/er1G0HkHwB' +
	    'v9FAK42jNWIM2jhgQIkCUQgRUWixUQgCOpHEHe7Df/k03/zS3/ODevOeNhx7NwRun9zU89KR3/hN' +
	    '3L4hGvklrAiOUphYjDURFopFVgp5yvUaFiEdTzLcl2V7X46+RJLIWqwVlEBieIiotMjRR77EdwuV' +
	    'jwTwzDsRGBvqSc78/Kd/xcS9NMVqGVA4roMfi3Ph0iVef+W/uba0TL0dVjpCLQJBk9We7h2YnOCW' +
	    'PTdx69AwHhAB1kI2myVsVPnnx77Ca2utKQemrwO+pQuMo/71wIc/ZGgLcwtXEANuLM61juKVo8eY' +
	    'uTTrz8NX5+HrebgQwBoAllTOt5N7p6/cO7j7lgeivhyNy5cQrRFgqVxhaLCPDx8+xNWvHfuPVmh3' +
	    '/5BAu+tYuO+nd9+wb1NvltmZGXwFnufRiiJ+8OxznC/XXvy+4g/OCaf2vW3bTgCPwcXDjvs7NyaT' +
	    '5KcvEDYaiNKICKIUM7UyE0ObObhr/MbHX7v8mRj8DYD6k24QL+HN//KRQ1tqpSpLIjgieJs2Mf3i' +
	    'i5wpVp46Dr8+oiidE9gHFIBvAEmgA7FYLP7t4PChDxYJkFIZi8EqQbShYy0doE8bhnoTPHL8ZCXf' +
	    'CkcAX/uAD3duHR3cIqs1LhdLlMtlOlqzevEirxYr338Ofg0oXf/i39XweNcXBdbok7U7bv3gUrlI' +
	    'a/YKfqNBp5RHb9/G/N69rJVLNGs1ZkurRNUmNw0PZCtwpAI4CggUnxhJpllYXqbQaeMoyGQyzF2+' +
	    'zHfh94HydfBHDesaCwiKplFH7S03788X8thKCVEaEwWYiR18a2GBqwtLTPktxiPLGjDTChlPp0go' +
	    'Pvk/wtccABNzPtTbaXM5X6QiQiadorO6yvlWcPRVOH4d/HPOerFct7Yxz8jUjruvrSxCvYrgQGjx' +
	    'du7kqcUrnLm8+Fd9sdhwNeHcm7OKJnA5LPKeXI5BTx+ibY3jQ1/acyZ7Gz5LtToVBclEjLVymWn4' +
	    'l+tgvx3v9lU3AU1jnm1vGzpcX7yK+C1AYUIfZ2ILXy0t89JC/rGrwkO3Nds/W1DhvddEo8OQSih0' +
	    'nBp9jhlw23abbsOwdRydijo0gY4CUFR9n3n4z1Fg9G1V7zvmuD+SO1wq5okaLaxSaCuobaM83fJ5' +
	    'eS7/d69GfBawW+BChKLsOQQitDT4UUTcGFwY1T70rBjDahByoVtp7SiiEUZ+HEox4HACVBe8ofXz' +
	    'Ops+1KmWUZ0A6yiUCDIyzNMdn1MrxUdfEz4LdO6z4MAqsNp2PSKBUMBai1UQQcKxEBkRXMclz/rZ' +
	    'nei02YyY2Ju4AKqh9Qv9qdhB1agThRFKKxwBlevnhN/ie6vVv33N8pBaP3MIr7+ptWm76/FXBfJa' +
	    'sSCCBasjqPlRQG/cZVwgpaAZBBjEDSGXW9dKXVPqhOfqg+1Wm9UwoqagKYKf7uFcs8N/Fap//eoG' +
	    '8AfsuhPAJuU62abSzEfr0uk6mpa13YTCSsMPmwXHZbuGfgU6CgFhyOh9AE3FyV64MxmGBGIJuyhR' +
	    'PM5qx+fsWv0vz8JDdMEBGm9e+zOZNOkwJKZgTCBlHFqhpQbXtIJa2AnOvR5ZbnA1/UDcgvU89u2Y' +
	    '/K1N/T0ntok6sEWEOJBiXf16XZdUO+Rsvf0Xz0Y8/GaPwEftmz80Lc1nxrL9pOtr9BjYZRRrrqIc' +
	    'hLMVmNcANuLYdKfJTekMWyykNNhWi117brx5XyJx11gopICMQEprssZhqB1xsh1+8SnhYQciBRyx' +
	    '8IkNOgHc3TMyePt4GOG0AgaAXYkYb3QsaxHPAYEurjM9+nqpjtffyw1Aj4I4QuO5Y/SsXCOlIaY1' +
	    '2nVIasOEH3I6sI8/Ifye7uri/W8FBkjj6if2jo+TnJsnYWAcGMwkudRsUYanRwCnex6/UvSDUy9F' +
	    'wc/clUlQa7RoGYgHIUkFjjaghB7gp9rwdMSTf6p40IPwDoHYj2Az4Cme3/O+mwe2Ls6z2vLJafhA' +
	    'zOF7kbDSCl5fgZfobhMAofCHzy4VaW8Z4n1akQMSWuEZg9aKzPAw227ax1ei8Isvw333CMFd8qPI' +
	    'wC9OJuJvHLjtA++ZqlVhYZleB3Yrhcn18+3qGovCHwNNALOjWz0OXKmHdnhZovffs2mQ+GqNNdeA' +
	    'MThK4Wb7WBnZzGytvrXcqGcMeBbiAoMO3ByH+3d57pffPzHx4O49u+I9Swu0F+ZxHMOWjmXnSI4v' +
	    'Vxqcb3T+/Rx8PgQJAfXRDdSLqJ4h5OWDwwN7fzUbY/nqMnOeR+A6KBEc18VkelEWgjBEhRZPaZxE' +
	    'Are3B9WTol2v0Zq7Sqfj46IZCkK29mV5wm9zPF+dfwUOVOAKrKvc2weT2qJS9566Vnw+YmDs01M7' +
	    '2LS4xKVIqHsebiJGyjXEkwm8eALH89BaEwGdVgu/sEK7XscoRdY4jGlNcniAfyhUeaFYLVyAX1Bw' +
	    'ZaO8mqkNiyYKUZQKqGcajeb+i83m5p1jW5lMJMmqEDeeJJ5KkUgkScRjxBwHzxjcKMIIuEaTVpox' +
	    'x2FrJk0pnuLRuRXOVhvT51Cf1HA2AvwNmG/fAiIFHaAB/RPwR6NaPXT7YD8f372TTCoLrqBEI67T' +
	    'nQ0UiCBhBGFE2KizXCjx4twip1bLvGHlH6eFzycUs1qENlD5cQQUUHgrARoijCh15yjy8LBSd0/F' +
	    'Evq92zazfXSYXH8/bioDyuI3GlQKq7yxtMLF5TwX6nXmrZy8otQjMyJfz6KihIIfS+BjGxY/gQAz' +
	    'ImpYqf0DyJGccEcfTKWhL6aUBxCIBDUoV2G6CKdXlPrWssjZ7Uo1Z0TIovhJBN7VdLw+fHHGwJkT' +
	    '4PTBUEypnPxQ8lXQQqo1KLy329/v1v4XuY6HoKlYamoAAAAASUVORK5CYII=',
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
	filesave: 'data:image/png;base64,' +
	    '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' +
	    'vFqmAAAAAElFTkSuQmCC',
	db: 'data:image/png;base64,' +
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
	    'gwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAL8SURBVHjaTJNNbxtVFIafe++M7ST+ih3H' +
	    'bQiIUtMuQFQiQREsUCTEgkJJpRYEShf9C12x4B+wYsMaVhSQIpAaWCEBUREfScuqhYKzaGgcj+vi' +
	    'uHYznpk797DIB5z1Oc95X+l9lYggIhxOs7n5nNbqVd/3F+I4fkJEdDab3Y7jZMOm9tvTp079crir' +
	    'lEKJCM3mJiJyOhyFH9RqtTcmy2Xt+z5KKQBEBGstu7t9gk7ne2XMey5Jfz1z5lm8A9gzrfbO2uxj' +
	    'sxVrLTtBgDiHEg0GcKC1whjDZLm8eHfr7lohX3oN+E6JCCtffvXDzMzxl402WOswRu3LUwAKEET2' +
	    'lRilUJ7H31tbm+eX3mx4AL1/ei9OVqrsPRpitEZrgzIardTBOSBCKoI4ITc+hoicBPYthGGY3O8E' +
	    'vrUWYwye8TBGo7RGKQ6+O1InuDQlHIX0+30B0ADlckkFQQfnBJumWGux1pKmKTZ1pM7hrMOlFm0M' +
	    'nZ2AifwERwpGo5Eq5PPEcUStWiWTG8P3PZQ2KH1gwwmJTbjf7WCMIrVOHQHG83nZabWJoxFGa8pl' +
	    'YTBIKRQm0J4hHO4BMHz0kOadTfxclqlajSMLGuU1Tp4gCDqsXf8RZTyO1adJRhHhcI9isUgmk+Gn' +
	    'nzdoBW2ebjyF52f+s9Dr9Qb9vq7Mzz+PUprmn3fQniYaWRBhbCKLs46FF+axNqXdfkCpFKVHgFu3' +
	    'b/32+tmzr1xb/RqF5vLlS9TrddrtAFJHdbrGcDDk6uef0el0Ob90jvWNG38B+1FeWVm5cPv3Pz5u' +
	    'NBqFKI5ob7fJjeeIIgtayGWzRFHEdG0KrQ1bW/eSE08+fmV5efkjdVCm+vr6+lufXv3ifUEfu3hh' +
	    'ienaNA8HuzgHhUKB/m6Pa6vf0O12++++8/aHi4uLnwD3DgEeMBWG4cKNmzfPtbZbL+VyudnBcC/r' +
	    'nFAq5eM4ijrVamV9bm5utVgsXgdaQKz+V2cFZIAKMJMkyfHU2pKAMsYMMplMAGwDD4DwMOH/DgDs' +
	    '6oMXhZyxlQAAAABJRU5ErkJggg==',
	paypal: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ' +
	    'bWFnZVJlYWR5ccllPAAAAulJREFUeNqUU1tIFGEU/mZ2VnfL1Ex3XV3HMRfTpFR00/IhoigtEVKI' +
	    'LlSGJfagSUUU9GL0WEFUDxElPQRSqNhDD0nZSkEXy8xuVOtlNHe9rbq2u9rOzPb/s4tpPnXgMMP8' +
	    '3/nO95/zDXP59r3s9BS+JclkFPAf0Tv4s98+OLyb403GlsINuYKsBOYPZUkCswDMctwSAj7JLODF' +
	    'q1YuwRgn+Ob88wedLz+itakdLMOAUmpYBjl5GSgq2YQwnW4RSbwhlmcDgQAkWZ7P+w+eoM8xgcio' +
	    'CMTEREKnC0dTiw2n665icmJqEZaUgpNkBbKiqIxzXh/E4XHUVJWhvHwz2jveI2vdamjDtDhw6ALu' +
	    'NjxCdU05GJZV8ZSEVUixTF5oOp0uzHhnYc1PRzPpWlVxEfUX7mDFcj3SUhPx+pMdbY/fqDOieFrL' +
	    'ylRBKL99FWGIjgRvNoIhM9i6LQ9HKnbBNelGZ7cdycZVaGxswwhRKYeUBxWEsufDDwi8UZVnta5B' +
	    '7al9sH8fwt6D9fD5ZlFXu4d0VCD2O1U8reWUQPAKkl/CgOhEaXEh/JKMY8cvQRxxgdOwyEiOx7Ur' +
	    'JzA99QvOGR9ijStDVwiAg7oFBTNuD8SxaWRmWWDr6Ebf8ARqK0uRvzETsWQbHbYu3Lj1EMVbchBn' +
	    'ilFrQBbNUQNROZ97euF2e3H2/E14ySCFuCikpJpw8sx1zPoV+EnHsp0FxA8FkFTTBYIKqF2onFhD' +
	    'NOrP7Ydz2AXHqAsl2wvQbuuGlvigqmoHkngD9BF61VwUHwxCQM1Ah5EoxENLLGuzNaOLDHNoYBRf' +
	    'BkZw9HARLOlJKlwJ+WVhECNJqm3p4LTE8lm5aUixJEAhzNnWdKzN5NWV/RtaTkNqJHDO0fH+NItF' +
	    'cHu88BAnrs9JXQL+KzkYYcSZEcv0eOcYGeCmpj2VT589bzCbTTxDvU1kzM3+BkvWRztryJMlP5Tk' +
	    'lxEWroVElNJvb4ccojg4Vv1HgAEAmtl7FxNc9+MAAAAASUVORK5CYII=',
	amazon: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAB' +
	    'y0lEQVQ4jY2TP2hTURjFf09zM1UbcGmID9xEFEyyCTo1b6uLxuCS1e4Fg4tuIlhczMMti0NwadOh' +
	    'o9DNf7wpCCYdDEL7njWgiU87NOBxeGmavryKB+5wv8t3vnPuuRdJaUnPJO3o/7Ez7klbkp4AD5jC' +
	    '9vY2jUaDz70elmVxc2mJarVKAlaRFExTe56n08YoFVu1Wi1JSYCkwXTl3vKyUsao5DjqdDqT/Xnb' +
	    'TiIYWJIGwPyhpiAI8H2f4XDIzzCk2WzSarUAGB0cxC0MZxR0u13li8UZCyljEhXMENypVJQyRvli' +
	    'Ub7vq+66/yQ4Fdd0KLdcLpPNZmm325OzMAxnc4gryBcKk4klxzmWSN11T7Dw259UPM9TzraVMkY5' +
	    '21bddVWuVLToOAq/B/rTeSl9WInWJIXNy/NcX4fMxaTHcoSt2zB3AdIZ+PQI7mqcwu5r6RXS+xUp' +
	    '9OMyj/BrV+qtST860tq52Dv40oJ3t6JJmRuw4IA5CwIsC/a2YG8Drq1H9f4buPpwaEkKgAUA+h58' +
	    'fAzfNqJGxv0Ac5eg8BxyJRiN0zBnvlqSngL3j3kddKH/FkbDiCFzBXKLSbeyiqLv/ELS/snmZ7A/' +
	    '7kn/BXFbL8ajtAhKAAAAAElFTkSuQmCC',
	bitcoin: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
	    '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wHBg0ZNfsIC1AAAAIxSURBVDjL' +
	    'tZNPSJRRFMV/930z4zAzJuaYmqNBFlGQELaTaGnSplUU7oIUygShRZQxTBZFRJRCgotatKpV2MJt' +
	    'C+0fVOjGRUE0WYmWfyb7Rme+990Wps0Mtuws333nvvPOPVfYBO5AfUKRdsE0qfhZ4+tYOOy/kK5v' +
	    'buldKT1YHky0OzhDitQIGgBQxAOd8T17JtY7Pbppg49JwnVVDbcU5zSGEACqIAVvKDnBDpfp5/PS' +
	    'wypAYL1WG6+/qOKcXWvroMEYZmcbSAD1XHj/BISQ4nS7tnEe0skNBXqDimx0R1pEtgBQvZ9g2z0I' +
	    'RfFn3sJSGjt+pUCILmXnfjZWpeYzBiAbbUhukAFmJ7FTjxC16MIHzK52TGtfwb+lIhKPXgYw2knQ' +
	    'GHO81Fqn6Qj69RX+69v4U48J7DtR7Laak2seNMXD+MSK5hGOY+J7se48gaMPMNsP4r0ZKuET0wHK' +
	    'DO73Xxb+zjdYjjQcAt/ivbyJN9oJeRenurlYpOoyPeSMpPAdsU83KnUtBA73g3FwDnTitJyDQAT1' +
	    'c8UKVEYE1AD4i+5VRTMApJ+RH+nAzkxgtu5G7Qr23TDe8+sFZM2oZ68VBckdTNwRcXpAhMg2iNTg' +
	    '7DmGHe8vyaqqoncj3eneoiBlVvKXysOmyggduLOCO4udmyxOIqqofZhZyfdtuguaJLQaT3T56pwS' +
	    'oRkR84fnKzph1L9f9mN6WFLk/rlM6/h0gcp4bX0rQG7hy1hlikX+B34Dh8Le3aZfDNEAAAAASUVO' +
	    'RK5CYII=',
	fasttag: 'http://l.yimg.com/g/images/icon_tag.gif'
};

// get version asynchronously
function getVersion(callbackId, callbackEvent) {
	$(callbackId).fireEvent(callbackEvent, { version: version });
}
// end get version asynchronously

// greasemonkey functions
//
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

var GM_getSessionKey = function () {
    return getJSVariable(/\"api_key\"[ :]+\"([^\"]+)\"/);
}

var GM_getAuthHash = function () {
    return getJSVariable(/\"auth_hash\"[ :]+\"([^\"]+)\"/);
}

var GM_getAuthToken = function () {
    return getJSVariable(/\"auth_token\"[ :]+\"([^\"]+)\"/);
}

var GM_getUserNsid = function () {
    return getJSVariable(/\"nsid\"[ :]+\"([^\"]+)\"/);
}

if (Browser.Engine.presto) { // Opera
    var keyPrefix = 'FlickrPhotoActionsOnThreadPages.';

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
        return retval;
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

    GM_listValuesWithMatch = function(match) {
        var list = [];
        var reKey = new RegExp("^" + keyPrefix);
        for (var i = 0, il = window.localStorage.length; i < il; i++) {
            // only use the script's own keys
            var key = window.localStorage.key(i);
            if (key.match(reKey)) {
		var shortKey = key.replace(reKey, '');
	    	if ($chk(match)) {
			if (!shortKey.match(match)) {
				continue; // skip
			}
		}
                list.push(shortKey);
            }
        }
        return list;
    }

    GM_getObject = function (key) {
        var value = GM_getValue(key);
        if ($chk(value)) {
            return JSON.parse(value);
        }
        return null;
    }

    GM_storeObject = function (key, value) {
        GM_setValue(key, JSON.stringify(value));
    }

} else {

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

    GM_listValuesWithMatch = function(match) {
        var list = [];
	var keys = GM_listValues();
	for each(var key in keys) {
	    if ($chk(match)) {
		if (!key.match(match)) {
			continue; // skip
		}
	    }
            list.push(key);
        };
        return list;
    }

}
// end greasemonkey functions

var threadPage  = document.location.href.match(/flickr\.com\/groups\/[^\/]+\/discuss\/\d+/);
var pendingPage = document.location.href.match(/flickr\.com\/groups\/[^\/]+\/admin\/pending/);
var poolPage    = document.location.href.match(/flickr\.com\/groups\/[^\/]+\/pool/) || document.location.href.match(/flickr\.com\/groups\/[^\/]+\/?$/);
var photoPage   = !threadPage && !pendingPage && !poolPage;

if (document.location.href.match(/view=ju/)) { // skip justified view
	throw new Error("not supported on justivied view pages; aborting");
}
if ($$('body')[0].hasClass('breakout-justified')) { // skip justified view
	throw new Error("not supported on justivied view pages; aborting");
}

// upgrade stored data
var add_referrer = GM_getValue("add_referrer");
if (add_referrer == undefined) {
	GM_log("upgrade: set 'add_referrer' to 'none' (was not defined)");
	GM_setValue("add_referrer", "none");
} else if (add_referrer == 'false' || add_referrer == false) {
	GM_log("upgrade: set 'add_referrer' to 'none' (was set to false)");
	GM_setValue("add_referrer", "none");
} else if (add_referrer == true || add_referrer == 'true') {
	if ($chk(GM_getValue("referrer"))) {
		GM_log("upgrade: set 'add_referrer' to 'custom'");
		GM_setValue("add_referrer", "custom");
	} else {
		GM_log("upgrade: set 'add_referrer' to 'default'");
		GM_setValue("add_referrer", "default");
	}
} // else: already upgraded

function searchGroupName() {
	var groupNameElement = $('main').getElement('span.group-title-holder').clone(true);
	groupNameElement.getElements('*').dispose();
	return groupNameElement.get('text');
}

function searchThreadTitle() {
	var threadTitleElement = $('main').getElement('div.group-topic-detail-col h2').clone(true);
	threadTitleElement.getElements('*').dispose();
	return threadTitleElement.get('text');
}

// this extension first had support for 'stored comments',
// which still reflects in the storage of 'stored tags':
// . fastcomment, would mean 'fasttag' for tags
// . comment, would mean 'tag' for tags

function createFastItemIcon(key, photoId, injectionPoint, type) {
	try {
		var lastLeft = parseInt($('FPAOTP_bar_' + photoId).getElements('span.FPAOTPCommentIcon, span.FPAOTPTagIcon').pop().getStyle('left').match(/(\d+)/)[1], 10); // getLast does not work?
		var lastWidth = parseInt($('FPAOTP_bar_' + photoId).getElements('span.FPAOTPCommentIcon,span.FPAOTPTagIcon').pop().getStyle('width').match(/(\d+)/)[1], 10);
	} catch (e) {
		lastLeft = 80;
		lastWidth = 0;
	}
	if (isNaN(lastLeft)) { lastLeft = 80; }

	var storedItem = GM_getObject(key);
	new Element('span', {
		title: 'Fast ' + (type == 'comments' ? 'comment': 'tag') + ': ' + storedItem.title,
		id: 'FPAOTP_fastitem_' + key + '_' + photoId,
		'class': type == 'comments' ? 'FPAOTPCommentIcon' : 'FPAOTPTagIcon',
		html: storedItem.shortlabel,
		styles: {
			backgroundColor: storedItem.bgcolor,
			left: poolPage ? '1px' : (lastLeft + lastWidth) + 'px',
			width: ($chk(storedItem.width) ? storedItem.width : 12) + 'px',
			'text-align': 'center',
			'line-height': '11px',
			'vertical-align': 'top'
		},
		events: {
			click: function (evt) {
				var ids = this.get('id').match(/FPAOTP_fastitem_([^_]+)_(.*)$/);
				var key = ids[1];
				var photoId = ids[2];
				var storedItem = GM_getObject(key);
				var content = storedItem.comment;
				if (threadPage && type == 'Comment' && (GM_getValue("add_referrer") == 'default' || GM_getValue("add_referrer") == 'custom')) {
					var referrer = GM_getValue("add_referrer") == 'default' ? defaultReferrer : $chk(GM_getValue("referrer")) ? GM_getValue("referrer") : defaultReferrer; // a user could have chosen for custom, but never customized
					var threadUrl = document.location.href;
					var threadTitle = searchThreadTitle();
					var groupName = searchGroupName();
					var groupUrl = threadUrl.match(/(.*flickr\.com\/groups\/[^\/]+\/)/)[1];
					referrer = referrer.replace('%__thread_url__%', threadUrl)
							.replace('%__thread_title__%', threadTitle)
							.replace('%__group_url__%', groupUrl)
							.replace('%__group_name__%', groupName)
							.replace(/\n/g, '<br>');
					content = content + '<br>' + referrer;
				}
				if ($chk(content) && content.length > 0) {
					var itemIcon = $('FPAOTP_fastitem_' + key + '_' + photoId);
					itemIcon.empty();
					new Element('img', { src: images.updating, title: 'posting data' }).inject(itemIcon);
					var type = key.match(/stored(.*)\.\d+/)[1];
					if (type == 'Comment') {
					    postComment(photoId, key, content.replace(/<br[^>]*>/g, '\n'), function (retval) {
						var photoId = retval.photoId;
						var key = retval.key;
						var success = retval.success;
						var msg = retval.msg;
						var itemIcon = $('FPAOTP_fastitem_' + key + '_' + photoId);
						itemIcon.empty();
						new Element('img', {
							src: success ? images.check : images.error,
							title: success ? 'comment posted' : msg
						}).inject(itemIcon);
					    });
					} else { //'Tag'
					    postTags(photoId, key, content.replace(/(?:<br[^>]*>|\n)/g, ' '), function (retval) {
						var photoId = retval.photoId;
						var key = retval.key;
						var success = retval.success;
						var msg = retval.msg;
						var itemIcon = $('FPAOTP_fastitem_' + key + '_' + photoId);
						itemIcon.empty();
						new Element('img', {
							src: success ? images.check : images.error,
							title: success ? 'tag posted' : msg
						}).inject(itemIcon);
					    });
					}
				} else {
					new Element('img', {
						src: images.error,
						title: 'nothing to post!'
					}).inject(itemIcon);
				}
			}
		}
	}).inject(injectionPoint);
}

// cache storedComments and storedTags
var storedCommentsCache;
var storedTagsCache;

function reFillCommentsCache() {
	storedCommentsCache = GM_listValuesWithMatch(/^storedComment\./).sort(function(a,b) { var aTitle = GM_getObject(a).title.toLowerCase(); var bTitle = GM_getObject(b).title.toLowerCase(); if (aTitle < bTitle) return -1; if (aTitle > bTitle) return 1; return 0; });
}
function reFillTagsCache() {
	storedTagsCache = GM_listValuesWithMatch(/^storedTag\./).sort(function(a,b) { var aTitle =  GM_getObject(a).title.toLowerCase(); var bTitle = GM_getObject(b).title.toLowerCase(); if (aTitle < bTitle) return -1; if (aTitle > bTitle) return 1; return 0; });
}

reFillCommentsCache();
reFillTagsCache();

function showButtons() {
    $$('img.notsowide[src*=static.flickr.com], img.notsowide[src*=staticflickr.com], div.photo-div img[id*=liquid-photo-buffer], div.gPend * img.pc_img, div.thumb * img.pc_img, span.photo_container * img[src*=flickr.com]').each( function (img) {
	try {
		var width = parseInt(img.get('width').match(/(\d+)/)[1],10);
	} catch (e) {
		try {
			var computedWidth = img.getComputedStyle('width');
			width = parseInt(computedWidth.match(/(\d+)/)[1],10);
		} catch (e) {
			width = 0;
		}
	}
	if (isNaN(width)) width = 0;

	try {
		var height = parseInt(img.get('height').match(/(\d+)/)[1],10);
	} catch (e) {
		try {
			var computedHeight = img.getComputedStyle('height');
			height = parseInt(computedHeight.match(/(\d+)/)[1],10);
		} catch (e) {
			height = 0;
		}
	}
	if (isNaN(height)) height = 0;

	if (width > 0 && width < COMBINED_WIDTH_TRESHOLD &&
	    height > 0 && height < COMBINED_HEIGHT_TRESHOLD) { 
		return;
	}

	if (width > 0 && width < STRICT_WIDTH_TRESHOLD) {
		return;
	}
	if (height > 0 && height < STRICT_HEIGHT_TRESHOLD) { 
		return;
	}
	
	var srcMatch = img.get('src').match(/flickr\.com\/\d+\/(\d+).*jpg/);
	if (!srcMatch) {
		//alert("could not determine Flickr photo id from image 'src' attribute: " + img.get('src'));
		return;
	}
	var photoId = srcMatch[1];
	if (photoPage) {
		var urlPhotoId = document.location.href.match(/flickr\.com\/photos\/[^\/]+\/(\d+)\//)[1];
		if (urlPhotoId != photoId) return; // only do the photo itself (for now)
	}
	if ($chk($('FPAOTP_bar_' + photoId))) return; // already there
	
	if (threadPage) {
		var injectionPoint = img.getParent('a') ? img.getParent('a') : img;
		var injectionDirection = 'before';
	} else if (photoPage) {
	    injectionPoint = new Element('div', {
	    	html: ' ', // some magic
	    	styles: {
			position: 'relative',
			display: 'block'
		}
	    }).inject($('comment-form'), 'before');
	} else if (pendingPage) {
		injectionPoint = img.getParent('td.gPendPic');
		injectionDirection = 'top';
	} else { // poolPage
		injectionPoint = img.getParent('div.hover-target');
		injectionDirection = 'bottom';
	}

	var buttonBar = new Element('div', {
		id: 'FPAOTP_bar_' + photoId,
		styles: {
			display: threadPage || pendingPage || poolPage ? 'block' : 'inline',
			position: 'relative',
			//width: '100px',
			height: '25px'
		},
		events: {
			'item-added': function (evt) {
				var key = evt;
				var storedItem = GM_getObject(key);
					// called twice??
				if (storedItem.fastcomment == true || storedItem.fastcomment == 'true') {
					createFastItemIcon(key, photoId, this, $('FPAOTP_management_dialog').get('FPAOTP-type'));
				}
			},
			'item-updated': function (evt) {
				var key = evt;
				var storedItem = GM_getObject(key);
				var fastitemButton = $('FPAOTP_fastitem_' + key + '_' + photoId);
				if ($chk(fastitemButton)) {
					if (storedItem.fastcomment != true && storedItem.fastcomment != 'true') {
						this.fireEvent('item-removed', key);
					} else {
						try {
							var width = parseInt(fastitemButton.getStyle('width').match(/(\d+)/)[1], 10);
						} catch (e) {
							width = 40 + 1;
						}
						if (storedItem.width <= width) {
							// update label, title, bg-color, width
							fastitemButton.set('title', ($('FPAOTP_management_dialog').get('FPAOTP-type') == 'comments' ? 'Fast comment: ' : 'Fast tag: ') +
								storedItem.title);
							fastitemButton.set('html', storedItem.shortlabel);
							fastitemButton.setStyle('background-color', storedItem.bgcolor);
							fastitemButton.setStyle('width', storedItem.width);
						} else { // add it to the end
							fastitemButton.destroy();
							this.fireEvent('item-added', key);
						}
					}
				} else { // not available
					if (storedItem.fastcomment == true || storedItem.fastcomment == 'true') {
						this.fireEvent('item-added', key);
					}
				}
			},
			'item-removed': function (evt) {
				var key = evt;
				try {
					$('FPAOTP_fastitem_' + key + '_' + photoId).destroy();
				} catch (e) {
				}
			}
		}
	}).inject(injectionPoint, injectionDirection);

	if (threadPage || pendingPage) {
	    new Element('span', {
		id: 'FPAOTP_fav_' + photoId,
		'class': 'FPAOTP_unknown',
		styles: {
			cursor: 'pointer',
			position: 'absolute',
			left: '0px',
			background: 'url(http://l.yimg.com/g/images/photo-sprite.png.v8) no-repeat 0 0',
			'background-position': '-1053px -11px',
			width: '16px',
			height: '16px'
		},
		events: {
			'click': function (evt) {
				var span = $(evt.target);
				if (span.get('class').match('_unknown')) { return; }
				var photoId = span.get('id').replace('FPAOTP_fav_', '');
				if (span.get('class').match('_faved')) {
					unFavorite(photoId);
				} else {
					favorite(photoId);
				}
			}
		}
	    }).inject(buttonBar);
	}
	if (!poolPage) { // no tag or comment dialog on pool pages, only fast tags/comments
	    var tagSpan = new Element('span', {
		title: 'Add a tag',
		id: 'FPAOTP_tag_' + photoId,
		styles: {
			cursor: 'pointer',
			position: 'absolute',
			left: '22px',
			width: '16px',
			height: '16px',
			background: 'url(http://l.yimg.com/g/images/photo-sprite.png.v8) no-repeat -1812px -11px'
		},
		events: {
			'click': function (evt) {
				var span = $(this);
				var photoId = span.get('id').replace('FPAOTP_tag_', '');
				toggleTagDialog(photoId);
			}
		}
	    }).inject(buttonBar);
	
	    var commentSpan = new Element('span', {
		title: 'Add comment',
		id: 'FPAOTP_comment_' + photoId,
		styles: {
			cursor: 'pointer',
			position: 'absolute',
			left: '44px',
			width: '16px',
			height: '16px',
			background: 'url(http://l.yimg.com/g/images/photo-sprite.png.v8) no-repeat 0 0',
			'background-position': '-1732px -51px'
		},
		events: {
			'click': function (evt) {
				var span = $(this);
				var photoId = span.get('id').replace('FPAOTP_comment_', '');
				toggleCommentDialog(photoId);
			}
		}
	    }).inject(buttonBar);
	}

	if (photoPage) {
		new Element('i', {
			html: '&emsp;',
			styles: {
				paddingLeft: '12px',
				paddingRight: '3px'
			}
		}).inject(commentSpan, 'before');
	}

	try {
		var left = parseInt(commentSpan.getComputedStyle('left').match(/(\d+)/)[1], 10);
		if (left < 10) left = undefined;
		else left = left + 16 + 20; // 20: margin; 16: image width
	} catch (e) {
	}
	if (isNaN(left)) { left = 80; }
	// show fast comments and tags
	storedCommentsCache.forEach( function (key, idx) {
		var storedComment = GM_getObject(key);
		if (storedComment.fastcomment == true || storedComment == 'true') {
			createFastItemIcon(key, photoId, buttonBar, 'comments');
		}
	});
	storedTagsCache.forEach( function (key, idx) {
		var storedComment = GM_getObject(key);
		if (storedComment.fastcomment == true || storedComment == 'true') {
			createFastItemIcon(key, photoId, buttonBar, 'tags');
		}
	});
	if (threadPage || pendingPage) {
		checkIfFaved(photoId);
		checkIfCommented(photoId);
	}
	
    });

    // using DOMNodeInserted event handler could be used
/*    if (photoPage && $$('span[id*=FPAOTP_comment]').length == 0 && count < 10) {
    	//GM_log("DEBUG: count=" + count);
	window.setTimeout( function () { showButtons(count+1); }, 1000);
    }
*/
}

if (photoPage) {
	$$('body')[0].addEventListener('DOMNodeInserted', function(event) {
	    setTimeout(function() { // workaround: addEventListener callback gets called in unsafeWindow!
                try {  
                        var target = event.target;
                        if (target.nodeName == 'DIV' && (target.className.match('pool-photo') || target.className.match('fave') || target.className.match('photo-display-item'))) {  
                                showButtons();
                        }
                } catch (e) {
                        GM_log("error on insert: " + e);
                }
            }, 0);
	}, true);
}
if (poolPage) {
	var photos = $$('span.photo_container * img[src*=flickr.com]').length;
	$$('body')[0].addEventListener('DOMSubtreeModified', function(event) {
	    setTimeout(function () {
		try {
			var rPhotos = $$('span.photo_container * img[src*=flickr.com]').length;
			if (rPhotos > photos) {
				photos = rPhotos;
				showButtons();
			}
		} catch (e) {
			GM_log("error insert: " + e);
		}
	    }, 0);
	}, true);
}

//var count = 0;
showButtons();


    function toggleTagDialog(photoId) {
	var tagDialog = $('FPAOTP_tagdialog_' + photoId);
	if ($chk(tagDialog)) {
		tagDialog.destroy();
		return;
	}

	tagDialog = new Element('div', {
            id: 'FPAOTP_tagdialog_' + photoId,
            styles: {
                overflow: 'auto',
                background: '#BFBFBF',
                '-moz-border-radius': '4px',
                '-webkit-border-radius': '4px',
                '-khtml-border-radius': '4px',
                'border-radius': '4px',
                border: 'grey solid 1px',
                padding: '2px 4px',
                display: 'block',
                visibility: 'visible',
		width: '500px',
		'margin-bottom': '5px',
		'text-align': 'left'
            }
        }).inject('FPAOTP_bar_' + photoId, 'after');
	tagDialog.adopt(
	    new Element('label', { html: 'Enter your tag(s): ' }),
	    new Element('select', { 
	    	id: 'FPAOTP_stored_tags_' + photoId,
		events: {
			change: function (evt) {
			    var combo = $(evt.target);
			    var photoId = combo.get('id').replace('FPAOTP_stored_tags_', '');
			    var selected = combo.getSelected();
			    if (selected.get('value') == -1) {
				$('FPAOTP_tagsinput_' + photoId).empty();
			    } else {
				var key = selected.get('value');
				$('FPAOTP_tagsinput_' + photoId).set('value', GM_getObject(key).comment.replace(/\n/g, ' '));
			    }
			},
			'tag-added': function (evt) {
				new Element('option', {
					value: evt,
					html: GM_getObject(evt).title
				}).inject(this);
			},
			'tag-updated': function (evt) {
				this.getElements('option').some(function(option) {
					if (option.get('value') == evt) {
						option.set('html', GM_getObject(evt).title);
						return true; // stop as soon as possible
					}
					return false;
				});
			},
			'tag-removed': function (evt) {
				this.getElements('option').some(function(option) {
					if (option.get('value') == evt) {
						option.dispose();
						return true; // stop as soon as possible
					}
					return false;
				});
			}
		}
	    }),
	    new Element('img', {
		src: images.db,
		title: 'manage your stored tags',
		styles: {
			cursor: 'pointer'
		},
		events: {
			click: function (evt) {
			    toggleManagementDialog('tags');
			}
		}
	    }),
	    new Element('br'),
	    new Element('input', {
		id: 'FPAOTP_tagsinput_' + photoId,
		styles: {
			width: '300px'
		},
	    }),
	    new Element('button', {
		'class': 'Butt',
		html: 'Add tag(s)',
		id: 'FPAOTP_tagbutton_' + photoId,
		styles: {
			margin: '2px'
		},
		events: {
			click: function (evt) {
				var photoId = evt.target.id.replace('FPAOTP_tagbutton_', '');
				var tags = $('FPAOTP_tagsinput_' + photoId).get('value');
				$('FPAOTP_tagdialog_' + photoId).destroy();
				if ($chk(tags) && tags.length > 0) {
					var tagIcon = $('FPAOTP_tag_' + photoId);
					tagIcon.empty();
					new Element('img', { src: images.updating, title: 'posting tags' }).inject(tagIcon);
					postTags(photoId, null, tags, function (retval) {
						var photoId = retval.photoId;
						var success = retval.success;
						var msg = retval.msg;
						var tagIcon = $('FPAOTP_tag_' + photoId);
						tagIcon.empty();
						new Element('img', {
							src: success ? images.check : images.error,
							title: success ? 'tags posted' : msg
						}).inject(tagIcon);
					});
				}
			}
		}
	    }),
	    new Element('button', {
		'class': 'DisabledButt',
		'html': 'Cancel',
		id: 'FPAOTP_cancel_tag_' + photoId,
		styles: {
			margin: '2px'
		},
		events: {
			click: function(evt) {
				var button = $(evt.target);
				var photoId = button.get('id').replace('FPAOTP_cancel_tag_', '');
				toggleTagDialog(photoId);
			}
		},
		styles: {
			cursor: 'pointer'
		}
	    }),
	    new Element('br'),
	    new Element('small', {
		html: 'Separate each tag with a space: <i>cameraphone urban moblog</i>. Or to join 2 words together in one tag, use double quotes: <i>"daily commute"</i>.'
	    })
	);
	// fill the combo
	new Element('option', {
		value: -1,
		html: '--select a stored tag--'
	}).inject($('FPAOTP_stored_tags_' + photoId));
	storedTagsCache.forEach( function (key, idx) {
			new Element('option', {
				value: key,
				html: GM_getObject(key).title
			}).inject($('FPAOTP_stored_tags_' + photoId));
		});
	
	checkIfAllowedToTag(photoId, function(retval) {
		var photoId = retval.photoId;
                var tagIcon = $('FPAOTP_tag_' + photoId);
		tagIcon.empty();
		if (!retval.success) {
			    new Element('img', {
				src: images.error,
				title: retval.msg
			    }).inject(tagIcon);
		}
        });

    }

    function checkIfAllowedToTag(photoId, callback) {
        var tagIcon = $('FPAOTP_tag_' + photoId);
	tagIcon.empty();
	new Element('img', { src: images.updating }).inject(tagIcon);

    	var retval = false;
	var apiData = {
            api_key: GM_getSessionKey(),
            auth_hash: GM_getAuthHash(),
            auth_token: GM_getAuthToken(),
            format: 'json',
            method: 'flickr.photos.getInfo',
	    photo_id: photoId,
            nojsoncallback: 1
        };
	new Request({
		url: 'http://www.flickr.com/',
		onFailure: function (response) {
			callback({ photoId: photoId, success: false, msg: response.statusText });
		},
		onSuccess: function (responseText, responseXml) {
			var result;
                        try {
                            result = JSON.parse(responseText);
                        } catch (e) {
                            result = eval('(' + responseText + ')');
                        }
                        if (result.stat === 'fail') {
				callback({ photoId: photoId, success: false, msg: result.code + " - " + result.message });
                            return;
                        }
			var cantag = result.photo.editability.canaddmeta;
			if (cantag == 1) {
				callback({ photoId: photoId, success: true });
			} else {
				callback({ photoId: photoId, success: false, msg: "no permission to add tags" });
			}
		}
	}).get("/services/rest/", apiData);
    }

    function postTags(photoId, key, tags, callback) {
	var apiData = {
                    api_key: GM_getSessionKey(),
                    auth_hash: GM_getAuthHash(),
                    auth_token: GM_getAuthToken(),
                    format: 'json',
                    nojsoncallback: 1,
                    method: 'flickr.photos.addTags',
                    photo_id: photoId,
                    tags: tags
                };
	new Request({
                    url: "http://www.flickr.com/",
                    onFailure: function (response) {
                        callback({ photoId: photoId, key: key, success: false, msg: response.statusText });
                    },
                    onSuccess: function (responseText, responseXML) {
                        var result;
                        try {
                            result = JSON.parse(responseText);
                        } catch (e) {
                            result = eval('(' + responseText + ')');
                        }  
                        if (result.stat === 'fail') {
                            callback({ photoId: photoId, key: key, success: false, msg: result.code + " - " + result.message });
                        } else {
                            callback({ photoId: photoId, key: key, success: true });
                        }
                    }
                }).get("/services/rest", apiData);
    }

// DEFAULT REFERRER
    var defaultReferrer = '--<br><i>Seen in discussion <a href="%__thread_url__%">%__thread_title__%</a> of the group <a href="%__group_url__%">%__group_name__%</a></i>';

GM_addStyle('img.FPAOTPDisabled { opacity: 0.5; ! important } ');
GM_addStyle('img.FPAOTPEnabled { opacity: 1.0; cursor: pointer ! important } ');
if (poolPage) {
	GM_addStyle('span.FPAOTPCommentIcon { display: inline-block; word-wrap: break-word; cursor: pointer; position: relative; max-width: 24px; height: 10px; background: url(http://l.yimg.com/g/images/photo-sprite.png.v8) no-repeat 0 0; background-position: -55px -15px; } ');
	GM_addStyle('span.FPAOTPTagIcon { display: inline-block; word-wrap: break-word; cursor: pointer; position: relative; max-width: 24px; height: 12px; background: url(http://l.yimg.com/g/images/icon_tag.gif) no-repeat 0 0; background-position: -3px 0px; background-size: contain; } ');
} else {
	GM_addStyle('span.FPAOTPCommentIcon { word-wrap: break-word; cursor: pointer; position: absolute; left: 44px; width: 24px; height: 10px; background: url(http://l.yimg.com/g/images/photo-sprite.png.v8) no-repeat 0 0; background-position: -55px -15px; } ');
	GM_addStyle('span.FPAOTPTagIcon { word-wrap: break-word; cursor: pointer; position: absolute; left: 44px; width: 24px; height: 12px; background: url(http://l.yimg.com/g/images/icon_tag.gif) no-repeat 0 0; background-position: -3px 0px; background-size: contain; } ');
}

    function toggleManagementDialog(type) {
	var managementDialog = $('FPAOTP_management_dialog');
	if ($chk(managementDialog) && managementDialog.get('FPAOTP-type') == type) {
		return;
	}
	if ($chk(managementDialog)) {
		managementDialog.fireEvent('switch-type', type);
	} else {
	    var topline = 30;
	    managementDialog = new Element('div', {
        	id: 'FPAOTP_management_dialog',
		'FPAOTP-type': type,
        	styles: {
			overflow: 'auto',
			maxHeight: (window.innerHeight - topline - 20),
                        maxWidth: Math.min((window.innerWidth - 50),800),
			minWidth: 640,
			width: (window.innerWidth - 50),
            		padding: '2px 4px',
            		background: '#bfbfbf none repeat scroll 0% 0%',
            		display: 'block',
                	'-moz-border-radius': '4px',
                	'-webkit-border-radius': '4px',
                	'-khtml-border-radius': '4px',
                	'border-radius': '4px',
                	border: 'grey solid 1px',
            		'-moz-background-clip': 'border',
            		'-moz-background-origin': 'padding',
            		'-moz-background-inline-policy': 'continuous',
            		position: 'fixed',
            		opacity: '0.98',
           		'z-index': 1014,
            		top: '5px',
            		left: 25
        	},
		events: {
			'switch-type': function (evt) {
				this.set('FPAOTP-type', evt);
				this.getElements('*[id^=FPAOTP]').fireEvent('switch-type', evt);
			},
			'create-new-item': function (evt) {
				this.getElements('*[id^=FPAOTP]').fireEvent('create-new-item', evt);
			},
			'item-added': function (evt) {
				this.getElements('*[id^=FPAOTP]').fireEvent('item-added', evt);
				$$('select[id^=FPAOTP_stored_comments]').fireEvent('item-added', evt);
				$$('div[id^=FPAOTP_bar_]').fireEvent('item-added', evt);
			},
			'item-updated': function (evt) {
				this.getElements('*[id^=FPAOTP]').fireEvent('item-updated', evt);
				$$('select[id^=FPAOTP_stored_comments]').fireEvent('item-updated', evt);
				$$('div[id^=FPAOTP_bar_]').fireEvent('item-updated', evt);
			},
			'item-copy': function (evt) {
				this.getElements('*[id^=FPAOTP]').fireEvent('item-copy', evt);
			},
			'item-edit': function (evt) {
				this.getElements('*[id^=FPAOTP]').fireEvent('item-edit', evt);
			},
			'item-removed': function (evt) {
				this.getElements('*[id^=FPAOTP]').fireEvent('item-removed', evt);
				$$('select[id^=FPAOTP_stored_comments]').fireEvent('item-removed', evt);
				$$('div[id^=FPAOTP_bar_]').fireEvent('item-removed', evt);
			},
			'update-selection': function (evt) {
				this.getElements('*[id^=FPAOTP]').fireEvent('update-selection', evt);
			}
		}
    	}).inject($(document).getElement("body"));
	managementDialog.adopt(
	    new Element('div').adopt(
	    	new Element('span', {
			title: 'consider a donation',
			html: 'donate:',
			styles: {
				'float': 'left',
				'font-style': 'italic',
				'font-size': 'smaller',
				'vertical-align': 'middle'
			}
		}).adopt(
			new Element('a', {
				href: 'https://www.paypal.com/be/cgi-bin/webscr?cmd=_send-money&email=alesadam@ymail.com&amount_ccode=USD&payment_type=S',
				title: 'donate with Paypal',
				target: '_blank'
			}).adopt(
				new Element('img', { src: images.paypal, styles: { 'vertical-align': 'middle' } })
			),
			new Element('a', {
				href: 'http://www.amazon.co.uk/registry/wishlist/RWKOXV8NS09I/',
				title: 'buy me something from my Amazon wishlist (UK)',
				target: '_blank'
			}).adopt(
				new Element('img', { src: images.amazon, styles: { 'vertical-align': 'middle' } })
			),
			new Element('a', {
				href: 'http://www.amazon.com/gp/wishlist/2FWKY0A7NVSOJ/',
				title: 'buy me something from my Amazon wishlist (US)',
				target: '_blank'
			}).adopt(
				new Element('img', { src: images.amazon, styles: { 'vertical-align': 'middle' } })
			),
			new Element('a', {
				href: 'javascript:void(O);',
				title: 'donate Bitcoins',
				events: {
					click: function (evt) {
						// based on http://leo.bogert.de/2012/02/22/simple-bitcoin-donate-button/
						window.prompt ('Please copy-paste my Bitcoin address to your Bitcoin software - I cannot do it automatically.\nTo copy it, right-click the selected text and select \'Copy\'.\nThen right-click the address field in your Bitcoin software and select \'Paste\'.', '19DvtjDgiSx9991xVkXSYSovsSoreSGDC7');
					}
				}
			}).adopt(
				new Element('img', { src: images.bitcoin, styles: { 'vertical-align': 'middle' } })
			)
		),
	    	new Element('h2', { 
			html: 'Photo Actions on Thread Pages',
			id: 'FPAOTP.preferences_title',
			styles: {
				display: 'inline',
				'float': 'center',
				'padding': '1px 20px'
			},
			events: {
				'version': function(evt) {
					this.set('html', this.get('html') + ' v' + evt.version);
				}
			}
	    	}),
		new Element('button', {
			html: 'Close',
			'class': 'DeleteButt',
			events: {
				click: function (evt) {
					$('FPAOTP_management_dialog').destroy();
				}
			},
			styles: {
				'float': 'right'
			}
	    	}),
		new Element('a', {
			href: "http://www.flickr.com/groups/flickrhacks/discuss/72157626999092722/lastpage",
			html: "feedback thread",
			target: "_blank",
			styles: {
				'float': 'right',
				'font-size': 'smaller',
				'font-style': 'italic',
				padding: '5px 9px'
			}
		})
	    ),
	    new Element('hr', { styles: { width: '100%' } }),
	    new Element('div', {
	    		align: 'left',
			width: '100%',
			styles: {
				'margin-bottom': '2px'
			}
		}).adopt(
	    		new Element('span', {
	    			html: 'Comments',
				id: 'FPAOTP_management_comments_tab',
				styles: {
					padding: '6px',
					margin: '6px'
				},
				events: {
					'click': function (evt) {
						$('FPAOTP_management_dialog').fireEvent('switch-type', 'comments');
					},
					'switch-type': function (evt) {
						this.setStyles({ 'background-color': evt == 'comments' ? '' : 'lightgrey', color: evt == 'comments' ? '' : 'blue', cursor: evt == 'comments' ? '' : 'pointer' });
					}
				}
			}),
			new Element('span', {
	    			html: 'Tags',
				id: 'FPAOTP_management_tags_tab',
				styles: {
					padding: '6px',
					margin: '6px'
				},
				events: {
					'click': function (evt) {
						$('FPAOTP_management_dialog').fireEvent('switch-type', 'tags');
					},
					'switch-type': function (evt) {
						this.setStyles({ 'background-color': evt == 'tags' ? '' : 'lightgrey', color: evt == 'tags' ? '' : 'blue', cursor: evt == 'tags' ? '' : 'pointer' });
					}
				}
			})
	    	)
	    );
	    getVersion('FPAOTP.preferences_title', 'version');
	    new Element('table', { id: 'FPAOTP_management_table', border: 0, width: '100%' }).adopt(
		new Element('tr', { valign: 'top' }).adopt(
		    new Element('td', { align: 'left', styles: { padding: '1px 1px' } }).adopt(
			new Element('select', {
				id: 'FPAOTP_management_select',
				size: 16,
				multiple: true,
				styles: {
					minWidth: '300px'
				},
				events: {
					change: function (evt) {
						var selection = $('FPAOTP_management_select').getSelected();
						$('FPAOTP_management_dialog').fireEvent('update-selection', selection.length);
			    		},
					'item-added': function (evt) {
						new Element('option', {
							value: evt,
							html: GM_getObject(evt).title
						}).inject(this);
					},
					'item-updated': function (evt) {
						var selection = this.getSelected();
						if (selection.get('value') == evt) { // should always be the case
							selection.set('html', GM_getObject(evt).title);
							this.selectedIndex = -1;
							$('FPAOTP_management_dialog').fireEvent('update-selection', 0);
						}
					},
					'item-removed': function (evt) {
						this.getElements('option').some(function (option) {
							if (option.get('value') == evt) {
								option.dispose();
								return true; // stop as soon as possible
							}
							return false;
						});
						$('FPAOTP_management_dialog').fireEvent('update-selection', 0);
					},
					'switch-type': function (evt) {
						this.empty();
						if (evt == 'comments') {
							storedCommentsCache.forEach( function (key, idx) {
								new Element('option', {
									value: key,
									html: GM_getObject(key).title
								}).inject($('FPAOTP_management_select'));
							});
						} else { // evt == 'tags'
							storedTagsCache.forEach( function (key, idx) {
								new Element('option', {
									value: key,
									html: GM_getObject(key).title
								}).inject($('FPAOTP_management_select'));
							});
						}
					}
				}
			}),
			new Element('br'),
			new Element('img', {
				src: images.editadd,
				id: 'FPAOTP_management_create',
				styles: {
					cursor: 'pointer'
				},
				events: {
					click: function (evt) {
						$('FPAOTP_management_dialog').fireEvent('create-new-item');
					},
					'update-selection': function (evt) {
						// nothing to do
					},
					'switch-type': function (evt) {
						this.set('title', 'create a new stored ' + (evt == 'comments' ? 'comment' : 'tag'));
					}
				}
			}),
			new Element('span', { html: ' ' }),
			new Element('img', {
				id: 'FPAOTP_management_paste',
				src: images.editpaste,
				'class': 'FPAOTPDisabled',
				events: {
					click: function (evt) {
						if (this.hasClass('FPAOTPDisabled')) {
							return;
						}
						var key = $('FPAOTP_management_select').getSelected().get('value');
						$('FPAOTP_management_dialog').fireEvent('item-copy', key);
					},
					'update-selection': function (evt) {
						var selection = parseInt(evt, 10);
						this.set('class', selection == 1 ? 'FPAOTPEnabled' : 'FPAOTPDisabled');
					},
					'switch-type': function (evt) {
						this.set('title', 'create a new stored ' + (evt == 'comments' ? 'comment' : 'tag') + ' based on the selected one');
					}
				}
			}),
			new Element('span', { html: ' ' }),
			new Element('img', {
				id: 'FPAOTP_management_edit',
				src: images.edit,
				'class': 'FPAOTPDisabled',
				events: {
					click: function (evt) {
						if (this.hasClass('FPAOTPDisabled')) {
							return;
						}
						var key = $('FPAOTP_management_select').getSelected().get('value');
						$('FPAOTP_management_dialog').fireEvent('item-edit', key);
					},
					'update-selection': function (evt) {
						var selection = parseInt(evt, 10);
						this.set('class', selection == 1 ?  'FPAOTPEnabled' : 'FPAOTPDisabled');
					},
					'switch-type': function (evt) {
						this.set('title', 'edit the selected stored ' + (evt == 'comments' ? 'comment' : 'tag'));
					}
				}
			}),
			new Element('span', { html: ' ' }),
			new Element('img', {
				id: 'FPAOTP_management_delete',
				src: images.editdelete,
				'class': 'FPAOTPDisabled',
				events: {
					click: function (evt) {
						if (this.hasClass('FPAOTPDisabled')) {
							return;
						}
						$('FPAOTP_management_select').getSelected().forEach( function (selection) {
                                                        GM_deleteValue(selection.get('value'));
							$('FPAOTP_management_dialog').get('FPAOTP-type') == 'comments' ?
								reFillCommentsCache() : reFillTagsCache();
                                                        $('FPAOTP_management_dialog').fireEvent('item-removed', selection.get('value'));
                                                });
					},
					'update-selection': function (evt) {
						var selection = parseInt(evt, 10);
                                                this.set('class', selection > 0 ? 'FPAOTPEnabled' : 'FPAOTPDisabled');
					},
					'switch-type': function (evt) {
						this.set('title', 'remove the selected stored ' + evt);
					}
				}
			}),
			new Element('br'),
			new Element('fieldset', {
				id: 'FPAOTP_referrer_fieldset',
				styles: {
					'margin-top': '30px',
					padding: '2px 4px',
					border: 'black solid 1px'
				},
				events: {
					'switch-type': function (evt) {
						this.setStyles({ display: evt == 'comments' ? 'block' : 'none', visibility: evt == 'comments' ? 'visible': 'hidden' });
					}
				}
			}).adopt(
				new Element('legend', { html: 'referrer' }),
				new Element('div', {
					html: 'When invoked on discussion thread pages, you have the option to use a \'referrer\'.<br>' +
						'This referrer can dynamically fill in the thread\'s URL and title, and the link to the ' +
						'group\'s home page, with the group\'s name.'
					}
				),
				new Element('br'),
				new Element('input', {
					type: 'radio',
					id: 'FPAOTP_management_noreferrer',
					name: 'FPAOTP_management_referrer',
					events: {
						click: function (evt) {
							$$('*.FPAOTP_management_referrer').fireEvent('using-no-referrer');
							GM_setValue("add_referrer", "none");
						},
						'switch-type': function (evt) {
							if (evt == 'comments') {
								var addRef = GM_getValue("add_referrer");
								if (!$chk(addRef) || (addRef != 'default' && addRef != 'custom')) {
									this.click(); // fireEvent does not 'select' the radio button
								}
							}
						}
					}
				}),
				new Element('label', {
					'for': 'FPAOTP_management_noreferrer',
					html: 'don\'t use a referrer'
				}),
				new Element('br'),
				new Element('input', {
					type: 'radio',
					id: 'FPAOTP_management_scriptreferrer',
					name: 'FPAOTP_management_referrer',
					events: {
						click: function (evt) {
							$$('*.FPAOTP_management_referrer').fireEvent('using-default-referrer');
							GM_setValue("add_referrer", "default");
						},
						'switch-type': function (evt) {
							if (evt == 'comments') {
								var addRef = GM_getValue("add_referrer");
								if ($chk(addRef) && addRef == "default") {
									this.click(); // fireEvent does not 'select' the radio button
								}
							}
						}
					}
				}),
				new Element('label', {
					'for': 'FPAOTP_management_scriptreferrer',
					html: 'use script\'s default referrer'
				}),
				new Element('br'),
				new Element('input', {
					type: 'radio',
					id: 'FPAOTP_management_customreferrer',
					name: 'FPAOTP_management_referrer',
					events: {
						click: function (evt) {
							$$('*.FPAOTP_management_referrer').fireEvent('using-custom-referrer');
							GM_setValue("add_referrer", "custom");
						},
						'switch-type': function (evt) {
							if (evt == 'comments') {
								var addRef = GM_getValue("add_referrer");
								if ($chk(addRef) && addRef == "custom") {
									this.click(); // fireEvent does not 'select' the radio button
								}
							}
						}
					}
				}),
				new Element('label', {
					'for': 'FPAOTP_management_customreferrer',
					html: 'define your own referrer'
				}),
				new Element('br'),
				new Element('div', {
	    				id: 'FPAOTP_management_referrer_preview',
					'class': 'FPAOTP_management_referrer',
					styles: {
						border: 'solid black 1px',
						'min-height': '60px',
						'min-width': '380px'
					},
					events: {
						'using-no-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
							this.set('html', '');
						},
						'using-default-referrer': function (evt) {
							this.setStyles({ visibility: 'visible', display: 'inline-block' });
							this.set('html', defaultReferrer);
						},
						'using-custom-referrer': function (evt) {
							this.setStyles({ visibility: 'visible', display: 'inline-block' });
							var referrer = GM_getValue("referrer");
							if (!$chk(referrer)) referrer = defaultReferrer;
							this.set('html', referrer.replace(/\n/g, '<br>'));
						},
						'edit-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
						},
						'save-referrer': function (evt) {
							this.setStyles({ visibility: 'visible', display: 'inline-block' });
							this.set('html', GM_getValue("referrer").replace(/\n/g, '<br>'));
						}
					}
	    			}),
	    			new Element('textarea', {
					id: 'FPAOTP_management_referrer_edit',
					'class': 'FPAOTP_management_referrer',
					styles: {
						'min-height': '60px',
						'min-width': '380px'
					},
					events: {
						'using-no-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
							this.set('value', '');
						},
						'using-default-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
							this.set('value', defaultReferrer.replace(/<br>/g, '\n'));
						},
						'using-custom-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
							var referrer = GM_getValue("referrer");
							if (!$chk(referrer)) referrer = defaultReferrer;
							this.set('value', referrer.replace(/<br>/g, '\n'));
						},
						'edit-referrer': function (evt) {
							this.setStyles({ visibility: 'visible', display: 'inline-block' });
						},
						'save-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
						}
					}
	    			}),
	    			new Element('img', { 
					id: 'FPAOTP_management_referrer_action_edit',
					src: images.edit,
					'class': 'FPAOTP_management_referrer',
					height: '16px',
					events: {
						click: function(evt) {
							$$('*.FPAOTP_management_referrer').fireEvent('edit-referrer');
						},
						'using-no-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
						},
						'using-default-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
						},
						'using-custom-referrer': function (evt) {
							this.setStyles({ visibility: 'visible', display: 'inline-block' });
						},
						'edit-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
						},
						'save-referrer': function (evt) {
							this.setStyles({ visibility: 'visible', display: 'inline-block' });
						}
					},
					styles: {
						cursor: 'pointer'
					}
				}),
	    			new Element('img', { 
					id: 'FPAOTP_management_referrer_action_save',
					src: images.filesave,
					'class': 'FPAOTP_management_referrer',
					height: '16px',
					events: {
						click: function(evt) {
							GM_setValue("referrer", $('FPAOTP_management_referrer_edit').get('value'));
							$$('*.FPAOTP_management_referrer').fireEvent('save-referrer');
						},
						'using-no-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
						},
						'using-default-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
						},
						'using-custom-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
						},
						'edit-referrer': function (evt) {
							this.setStyles({ visibility: 'visible', display: 'inline-block' });
						},
						'save-referrer': function (evt) {
							this.setStyles({ visibility: 'hidden', display: 'none' });
						}
					},
					styles: {
						cursor: 'pointer'
					}
				})
			),
			    new Element('fieldset', { 
				id: 'FPAOTP_browserautocomplete_fieldset',
				styles: { 
					'margin-top': '30px', 
					padding: '2px 4px', 
					border: 'black solid 1px' 
				},
				events: {
					'switch-type': function (evt) {
						this.setStyles({ display: evt == 'tags' ? 'block' : 'none', visibility: evt == 'tags' ? 'visible': 'hidden' });
					}
				}
			    }).adopt(
				new Element('legend', { html: 'browser autocomplete' }),
				new Element('div', {
					html: 'On photo pages, Flickr has implemented a feature to suggest tags as you type. '+
						'This option restores the default browser \'autocomplete\' behaviour.<br>' +
						'<i>when you click the \'add a tag\' link, the script waits \'timeout\' milliseconds before doing its magic</i>' +
						' (a good value would be 300ms)'
					}
			),
				new Element('br'),
				new Element('input', {
					type: 'checkbox',
					id: 'FPAOTP_management_tag_autocomplete',
					checked: GM_getValue("restore_autocomplete") == true || GM_getValue("restore_autocomplete") == 'true',
					events: {
						change: function (evt) {
							GM_setValue("restore_autocomplete", this.checked);
						}
					}
				}),
				new Element('label', {
					'for': 'FPAOTP_management_tag_autocomplete',
					html: 'override Flickr\'s tag suggestions'
				}),
				new Element('br'),
				new Element('span', {
					html: 'timeout: '
				}),
				new Element('input', {
					type: 'number',
					value: (function () { 
							var value = GM_getValue("autocomplete_timeout");
							if (!$chk(value)) return 300;
							return value;
						})(),
					events: {
						change: function (evt) {
							GM_setValue("autocomplete_timeout",this.get('value'));
						}
					}
				}),
				new Element('label', { html: 'ms' })

			    )

		    ),
		    new Element('td', { 
			align: 'left',
			styles: { 
				padding: '1px 1px', 
				'background-color': '#DFDFDF'
			} 
		    }).adopt(
		    	new Element('label', { html: 'Name: ' }),
		    	new Element('input', { 
				type: 'text', 
				id: 'FPAOTP_management_name',
				disabled: true,
				events: {
					'update-selection': function (evt) {
						this.set('value', '');
						this.set('disabled', true);
						var selection = parseInt(evt, 10);
						if (selection != 1) {
							return;
						}
						selection = $('FPAOTP_management_select').getSelected();
                                                this.set('value', GM_getObject(selection.get('value')).title);
					},
					'create-new-item': function (evt) {
						this.set('disabled', false);
						this.set('value', 'Name of new ' + ($('FPAOTP_management_dialog').get('FPAOTP-type') == 'comments' ? 'comment' : 'tag'));
					},
					'item-added': function (evt) {
						this.set('value', '');
						this.set('disabled', true);
					},
					'item-updated': function (evt) {
						this.set('value', '');
						this.set('disabled', true);
					},
					'item-copy': function (evt) {
						this.set('value', GM_getObject(evt).title);
						this.set('disabled', false);
					},
					'item-edit': function (evt) {
						this.set('disabled', false);
					}
				}
			}),
		    	new Element('br'),
		    	new Element('textarea', { 
				id: 'FPAOTP_management_item_edit',
				styles: {
					minWidth: '380px',
					height: '350px',
					visibility: 'hidden',
					display: 'none'
				},
				events: {
					'update-selection': function (evt) {
						this.set('value', '');
						this.setStyle('visibility', 'hidden');
						this.setStyle('display', 'none');
					},
					'create-new-item': function (evt) {
						this.set('value', '');
						this.setStyle('visibility', 'visible');
						this.setStyle('display', 'inline-block');
					},
					'item-added': function (evt) {
						this.set('value', '');
						this.setStyle('visibility', 'invisible');
						this.setStyle('display', 'none');
					},
					'item-updated': function (evt) {
						this.set('value', '');
						this.setStyle('visibility', 'invisible');
						this.setStyle('display', 'none');
					},
					'item-copy': function (evt) {
						this.set('value', GM_getObject(evt).comment);
						this.setStyle('visibility', 'visible');
						this.setStyle('display', 'inline-block');
					},
					'item-edit': function (evt) {
						this.fireEvent('item-copy', evt);
					}
				}
			}),
			new Element('div', {
				id: 'FPAOTP_management_item_preview',
				styles: {
					minWidth: '380px',
					height: '350px',
					border: 'solid black 1px'//,
					//display: 'inline-block'
				},
				events: {
					'update-selection': function (evt) {
						this.set('html', '');
						this.setStyle('visibility', 'visible');
						this.setStyle('display', 'inline-block');
						var selection = parseInt(evt, 10);
						if (selection != 1) {
							return;
						}
						selection = $('FPAOTP_management_select').getSelected();
						this.set('html', GM_getObject(selection.get('value')).comment.replace(/\n/g, '<br>'));
					},
					'create-new-item': function (evt) {
						this.empty();
						this.setStyle('visibility', 'hidden');
						this.setStyle('display', 'none');
					},
					'item-added': function (evt) {
						this.empty();
						this.setStyle('visibility', 'visible');
						this.setStyle('display', 'inline-block');
					},
					'item-updated': function (evt) {
						this.empty();
						this.setStyle('visibility', 'visible');
						this.setStyle('display', 'inline-block');
					},
					'item-copy': function (evt) {
						this.setStyle('visibility', 'hidden');
						this.setStyle('display', 'none');
					},
					'item-edit': function (evt) {
						this.fireEvent('item-copy', evt);
					}
				}
			}),
			new Element('br'),
			new Element('div', { // more options
				styles: {
					display: 'inline-block'
				}
			}).adopt(
			    new Element('fieldset', { styles: { border: 'black solid 1px', padding: '2px 4px' } }).adopt(
				new Element('legend').adopt(
				    new Element('input', {
					type: 'checkbox',
					checked: false,
					id: 'FPAOTP_management_fastcomment',
					disabled: true,
					events: {
						click: function (evt) {
							this.getParent('fieldset').getElements('input').set('disabled', !this.checked);
							this.set('disabled', false);
						},
						'update-selection': function (evt) {
							this.set('checked', false);
							this.set('disabled', true);
							this.getParent('fieldset').getElements('input').set('disabled', true);
							var selection = parseInt(evt, 10);
							if (selection != 1) {
								return;
							}
							selection = $('FPAOTP_management_select').getSelected();
							var storedItem = GM_getObject(selection.get('value'));
							this.set('checked', storedItem.fastcomment == true || storedItem.fastcomment == 'true');
						},
						'create-new-item': function (evt) {
							this.set('disabled', false);
							this.set('checked', false);
						},
						'item-added': function (evt) {
							this.set('checked', false);
							this.getParent('fieldset').getElements('input').set('disabled', true);
						},
						'item-updated': function (evt) {
							this.set('checked', false);
							this.getParent('fieldset').getElements('input').set('disabled', true);
						},
						'item-copy': function (evt) {
							this.set('checked', GM_getObject(evt).fastcomment == true || GM_getObject(evt).fastcomment == 'true');
							this.getParent('fieldset').getElements('input').set('disabled', false);
						},
						'item-edit': function (evt) {
							this.getParent('fieldset').getElements('input').set('disabled', false);
						}
					}
				    }),
				    new Element('label', {
					id: 'FPAOTP_management_fastcomment_label',
					'for': 'FPAOTP_management_fastcomment',
					html: 'list as a <i>fast comment</i>',
						events: {
							'switch-type': function (evt) {
								this.set('html', this.get('html').replace(/(comment|tag)/, evt.replace(/s$/, '')));
							}
						}
				    })
				),
				new Element('label', {
					'for': 'FPAOTP_management_shortlabel',
					html: 'Short label:'
				}),
				new Element('input', {
					id: 'FPAOTP_management_shortlabel', 
					disabled: true,
					events: {
						'update-selection': function (evt) {
							this.set('value', '');
							var selected = parseInt(evt, 10);
							if (selected != 1) {
								this.set('value', '');
								return;
							}
							var selection = $('FPAOTP_management_select').getSelected();
							this.set('value', GM_getObject(selection.get('value')).shortlabel);
						},
						'create-new-item': function (evt) {
							this.set('value', '');
						},
						'item-added': function (evt) {
							this.set('value', '');
						},
						'item-updated': function (evt) {
							this.set('value', '');
						},
						'item-copy': function (evt) {
							this.set('value', GM_getObject(evt).shortlabel);
						}
					}
				}),
				new Element('br'),
				new Element('label', {
					'for': 'FPAOTP_management_bgcolor',
					html: 'Color:'
				}),
				new Element('input', {
					id: 'FPAOTP_management_bgcolor',
					disabled: true,
					events: {
						'update-selection': function (evt) {
							this.set('value', '');
							var selected = parseInt(evt, 10);
							if (selected != 1) {
								this.set('value', '');
								return;
							}
							var selection = $('FPAOTP_management_select').getSelected();
							this.set('value', GM_getObject(selection.get('value')).bgcolor);
						},
						'create-new-item': function (evt) {
							this.set('value', '');
						},
						'item-added': function (evt) {
							this.set('value', '');
						},
						'item-updated': function (evt) {
							this.set('value', '');
						},
						'item-copy': function (evt) {
							this.set('value', GM_getObject(evt).bgcolor);
						}
					}
				}),
				new Element('br'),
				new Element('label', {
					'for': 'FPAOTP_management_width',
					html: 'Width:'
				}),
				new Element('input', {
					type: 'number',
					min: '16',
					max: '40',
					id: 'FPAOTP_management_width',
					disabled: true,
					events: {
						'change': function (evt) {
							var value = this.get('value');
							if (isNaN(value)) {
								this.set('value', '');
							} else {
								value = parseInt(value, 10);
								if (value < 16) {
									this.set('value', 16);
								} else if (value > 40) {
									this.set('value', 40);
								} else {
									this.set('value', value);
								}
							}
						},
						'update-selection': function (evt) {
							this.set('value', '');
							var selected = parseInt(evt, 10);
							if (selected != 1) {
								this.set('value', '');
								return;
							}
							var selection = $('FPAOTP_management_select').getSelected();
							this.set('value', GM_getObject(selection.get('value')).width);
						},
						'create-new-item': function (evt) {
							this.set('value', '');
						},
						'item-added': function (evt) {
							this.set('value', '');
						},
						'item-updated': function (evt) {
							this.set('value', '');
						},
						'item-copy': function (evt) {
							this.set('value', GM_getObject(evt).width);
						}
					}
				})
			    )
			),
			new Element('div', {
				html: ' ',
				styles: {
					display: 'inline-block',
					verticalAlign: 'bottom',
					align: 'right'
				}
			}).adopt(
			    new Element('img', {
				id: 'FPAOTP_management_save',
				src: images.filesave,
				'class': 'FPAOTPDisabled',
				alt: 'new-item',
				events: {
					click: function (evt) {
						if (this.hasClass('FPAOTPDisabled')) {
							return;
						}
						this.set('class', 'FPAOTPDisabled'); // prevent double click
						var storagePrefix = 'stored' + $('FPAOTP_management_dialog').get('FPAOTP-type').replace(/s$/, '').replace(/^([a-z])/, function ($1) { return $1.toUpperCase(); });
						var key = this.get('alt') == 'new-item' ? 
								storagePrefix + '.' + new Date().getTime().toString() :
								$('FPAOTP_management_select').getSelected().get('value');
						GM_storeObject(key, {
							title: $('FPAOTP_management_name').get('value'),
							comment: $('FPAOTP_management_item_edit').get('value'),
							fastcomment: $('FPAOTP_management_fastcomment').checked,
							shortlabel: $('FPAOTP_management_shortlabel').get('value'),
							bgcolor: $('FPAOTP_management_bgcolor').get('value'),
							width: $('FPAOTP_management_width').get('value')
						});
						$('FPAOTP_management_dialog').get('FPAOTP-type') == 'comments' ?
							reFillCommentsCache() : reFillTagsCache();
						$('FPAOTP_management_dialog').fireEvent(this.get('alt') == 'new-item' ? 'item-added' : 'item-updated', key);
					},
					'update-selection': function (evt) {
						this.set('class', 'FPAOTPDisabled');
					},
					'create-new-item': function (evt) {
						this.set('class', 'FPAOTPEnabled');
						this.set('alt', 'new-item');
						this.set('title', 'save as new item');
					},
					'item-added': function (evt) {
						this.set('class', 'FPAOTPDisabled');
					},
					'item-updated': function (evt) {
						this.set('class', 'FPAOTPDisabled');
					},
					'item-copy': function (evt) {
						this.set('class', 'FPAOTPEnabled');
						this.set('alt', 'new-item');
						this.set('title', 'save as new item');
					},
					'item-edit': function (evt) {
						this.set('class', 'FPAOTPEnabled');
						this.set('alt', 'edit-item');
						this.set('title', 'save updates');
					}
				}
			    })
			)
		    )
		)
	    ).inject(managementDialog);
	    managementDialog.fireEvent('switch-type', type);
	}
    }
    
    function insertAtCursor(field, value) {
	if (field.selectionStart || field.selectionStart == '0') {
		var startPos = field.selectionStart;
		var endPos = field.selectionEnd;
		var prePart = field.get('value').substring(0, startPos);
		var postPart = field.get('value').substring(endPos, field.get('value').length);
		if (!$chk(postPart)) postPart = '';
		field.set('value', prePart + value + postPart);
	} else {
		field.set('value', field.get('value') + value);
	}
    }

    function toggleCommentDialog(photoId) {
	var commentDialog = $('FPAOTP_commentdialog_' + photoId);
	if ($chk(commentDialog)) {
		commentDialog.destroy();
		return;
	}
	commentDialog = new Element('div', {
            id: 'FPAOTP_commentdialog_' + photoId,
            styles: {
                overflow: 'auto',
                background: '#BFBFBF',
                '-moz-border-radius': '4px',
                '-webkit-border-radius': '4px',
                '-khtml-border-radius': '4px',
                'border-radius': '4px',
                border: 'grey solid 1px',
                padding: '2px 4px',
                display: 'block',
                visibility: 'visible',
		width: '500px',
		'margin-bottom': '5px',
		'text-align': 'left'
            }
        }).inject('FPAOTP_bar_' + photoId, 'after');
	commentDialog.adopt(
	    new Element('label', { html: 'Enter your comment: ' }),
	    new Element('select', { 
	    	id: 'FPAOTP_stored_comments_' + photoId,
		events: {
			change: function (evt) {
			    var combo = $(evt.target);
			    var photoId = combo.get('id').replace('FPAOTP_stored_comments_', '');
			    var selected = combo.getSelected();
			    if (selected.get('value') == -1) {
				$('FPAOTP_commentinput_' + photoId).empty();
			    } else {
				var key = selected.get('value');
				$('FPAOTP_commentinput_' + photoId).set('value', GM_getObject(key).comment);
			    }
			},
			'item-added': function (evt) {
				new Element('option', {
					value: evt,
					html: GM_getObject(evt).title
				}).inject(this);
			},
			'item-updated': function (evt) {
				this.getElements('option').some(function(option) {
					if (option.get('value') == evt) {
						option.set('html', GM_getObject(evt).title);
						return true; // stop as soon as possible
					}
					return false;
				});
			},
			'item-removed': function (evt) {
				this.getElements('option').some(function(option) {
					if (option.get('value') == evt) {
						option.dispose();
						return true; // stop as soon as possible
					}
					return false;
				});
			}
		}
	    }),
	    new Element('img', {
		src: images.db,
		title: 'manage your stored comments',
		styles: {
			cursor: 'pointer'
		},
		events: {
			click: function (evt) {
			    toggleManagementDialog('comments');
			}
		}
	    }),
	    new Element('br'),
	    new Element('textarea', {
		id: 'FPAOTP_commentinput_' + photoId,
		styles: {
			width: '480px',
			height: '100px'
		}
	    })
	);
	if (threadPage) {
	    commentDialog.adopt(
	    	new Element('br'),
	    	new Element('input', { 
	    		type: 'checkbox', 
			id: 'FPAOTP_referrer_check_' + photoId,
			events: {
				click: function(evt) {
					var target = $(evt.target);
					var photoId = target.get('id').replace('FPAOTP_referrer_check_', '');
					if (target.checked) {
						$('FPAOTP_referrer_preview_' + photoId).setStyle('visibility', 'visible');
						$('FPAOTP_referrer_preview_' + photoId).setStyle('display', 'inline-block');
						$('FPAOTP_referrer_action_' + photoId).setStyle('visibility', 'visible');
						$('FPAOTP_referrer_action_' + photoId).setStyle('display', 'inline');
						var referrer = $('FPAOTP_referrer_edit_' + photoId).get('value');
						var threadUrl = document.location.href;
						var threadTitle = searchThreadTitle();
						var groupName = searchGroupName();
						var groupUrl = threadUrl.match(/(.*flickr\.com\/groups\/[^\/]+\/)/)[1];
						referrer = referrer.replace('%__thread_url__%', threadUrl)
							.replace('%__thread_title__%', threadTitle)
							.replace('%__group_url__%', groupUrl)
							.replace('%__group_name__%', groupName)
							.replace(/\n/g, '<br>');
						$('FPAOTP_referrer_preview_' + photoId).set('html', referrer);
					} else {
						$('FPAOTP_referrer_preview_' + photoId).setStyle('visibility', 'hidden');
						$('FPAOTP_referrer_preview_' + photoId).setStyle('display', 'none');
						$('FPAOTP_referrer_action_' + photoId).setStyle('visibility', 'hidden');
						$('FPAOTP_referrer_action_' + photoId).setStyle('display', 'none');
					}
				}
			}
		    }),
		    new Element('label', { 
		    	html: 'add referrer ',
			'for': 'FPAOTP_referrer_check_' + photoId,
			id: 'FPAOTP_referrer_label_' + photoId
	    	    }),
	    	    new Element('span', {
	    		html: ' (in order to save changes, use the management console)',
			styles: {
				'font-style': 'italic',
				cursor: 'pointer'
			},
			events: {
				click: function (evt) {
					toggleManagementDialog('comments');
				}
			}
		    }),
		    new Element('br'),
		    new Element('div', {
	    		id: 'FPAOTP_referrer_preview_' + photoId,
			styles: {
				border: 'solid black 1px',
				width: '480px',
				visibility: 'hidden',
				display: 'none'
			}
		    }),
		    new Element('textarea', {
			id: 'FPAOTP_referrer_edit_' + photoId,
			value: GM_getValue("add_referrer") == "custom" ? GM_getValue("referrer") : defaultReferrer,
			styles: {
				visibility: 'hidden',
				display: 'none',
				width: '480px',
				height: '60px'
			}
		    }),
		    new Element('img', { 
			id: 'FPAOTP_referrer_action_' + photoId,
			src: images.edit,
			'class': 'preview_mode',
			height: '16px',
			events: {
				click: function(evt) {
				    var target = $(evt.target);
				    var photoId = target.get('id').replace('FPAOTP_referrer_action_', '');
				    if (target.hasClass('preview_mode')) { // switch to edit mode
					target.set('class', 'edit_mode');
					$('FPAOTP_referrer_check_' + photoId).set('disabled', true);
					$('FPAOTP_referrer_label_' + photoId).setStyle('color', 'grey');
					$('FPAOTP_referrer_preview_' + photoId).setStyle('visibility', 'hidden');
					$('FPAOTP_referrer_preview_' + photoId).setStyle('display', 'none');
					target.set('src', images.filesave);
					$('FPAOTP_commentbutton_' + photoId).set('class', 'DisabledButt');
					var referrer = $('FPAOTP_referrer_edit_' + photoId).get('value');
					if (!$chk(referrer) || referrer.length == 0) {
						referrer  = GM_getValue("referrer");
					}
					if (!$chk(referrer) || referrer.length < 1) {
						referrer = defaultReferrer;
					}
					$('FPAOTP_referrer_edit_' + photoId).setStyle('visibility', 'visible');
					$('FPAOTP_referrer_edit_' + photoId).setStyle('display', 'inline-block');
					$('FPAOTP_referrer_reset_' + photoId).setStyle('visibility', 'visible');
					$('FPAOTP_referrer_reset_' + photoId).setStyle('display', 'inline-block');
					$('FPAOTP_referrer_edit_' + photoId).set('value', referrer.replace(/<br>/g, '\n'));
				    } else { // switch to preview mode
					target.set('class', 'preview_mode');
					$('FPAOTP_referrer_check_' + photoId).set('disabled', false);
					$('FPAOTP_referrer_label_' + photoId).setStyle('color', '');
					$('FPAOTP_referrer_preview_' + photoId).setStyle('visibility', 'visible');
					$('FPAOTP_referrer_preview_' + photoId).setStyle('display', 'inline-block');
					$('FPAOTP_referrer_edit_' + photoId).setStyle('visibility', 'invisible');
					$('FPAOTP_referrer_edit_' + photoId).setStyle('display', 'none');
					$('FPAOTP_referrer_reset_' + photoId).setStyle('visibility', 'hidden');
					$('FPAOTP_referrer_reset_' + photoId).setStyle('display', 'none');
					target.set('src', images.edit);
					$('FPAOTP_commentbutton_' + photoId).set('class', 'Butt');
					// click the check button twice
					$('FPAOTP_referrer_check_' + photoId).click();
					$('FPAOTP_referrer_check_' + photoId).click();
				    }
				}
			},
			styles: {
				visibility: 'hidden',
				display: 'none',
				cursor: 'pointer'
			}
		    }),
		    new Element('div', {
			id: 'FPAOTP_referrer_reset_' + photoId,
			styles: {
				width: '100%',
				'text-align': 'right',
				'font-style': 'italic',
				'cursor': 'pointer',
				'visibility': 'hidden',
				'display': 'none'
			},
			html: 'reset to default referrer',
			events: {
				click: function(evt) {
					var target = $(evt.target);
					var photoId = target.get('id').replace('FPAOTP_referrer_reset_', '');
					$('FPAOTP_referrer_edit_' + photoId).set('value', defaultReferrer.replace(/<br>/g, '\n'));
				}
			}
		    })
	    );
	}
	commentDialog.adopt( new Element('br'));
	if (photoPage) {
	    commentDialog.adopt(
	    	new Element('br'),
	    	new Element('button', {
			'class': 'Butt',
		    	html: 'USE COMMENT',
		    	title: 'copy the comment into Flickr\'s comment box',
		    	id: 'FPAOTP_usebutton_' + photoId,
			styles: {
				margin: '2px'
			},
		    	events: {
			    click: function (evt) {
				if (this.hasClass('DisabledButt')) {
					return;
				}
				var photoId = this.get('id').replace('FPAOTP_usebutton_', '');
				var comment = $('FPAOTP_commentinput_' + photoId).get('value');
				$('FPAOTP_commentdialog_' + photoId).destroy();
				if ($chk(comment) && comment.length > 0) {
					insertAtCursor($('comment-form').getElement('textarea'), comment);
				}
			    }
		    	}
	    	})
	    )
	}
	commentDialog.adopt(
	    new Element('button', {
		'class': 'Butt',
			html: 'POST COMMENT',
			id: 'FPAOTP_commentbutton_' + photoId,
			styles: {
				margin: '2px'
			},
			events: {
			    click: function (evt) {
				var target = $(evt.target);
				if (target.hasClass('DisabledButt')) {
					return;
				}
				var photoId = evt.target.id.replace('FPAOTP_commentbutton_', '');
				var comment = $('FPAOTP_commentinput_' + photoId).get('value');
				if (threadPage && $('FPAOTP_referrer_check_' + photoId).checked) {
					var referrer = $('FPAOTP_referrer_preview_' + photoId).get('html');
					comment = comment + '<br>' + referrer;
				}
				$('FPAOTP_commentdialog_' + photoId).destroy();
				if ($chk(comment) && comment.length > 0) {
				var commentIcon = $('FPAOTP_comment_' + photoId);
				commentIcon.empty();
				new Element('img', { src: images.updating, title: 'posting comment' }).inject(commentIcon);
					postComment(photoId, null, comment.replace(/<br[^>]*>/g, '\n'), function (retval) {
						var photoId = retval.photoId;
						var success = retval.success;
						var msg = retval.msg;
						var commentIcon = $('FPAOTP_comment_' + photoId);
						commentIcon.empty();
						new Element('img', {
							src: success ? images.check : images.error,
							title: success ? 'comment posted' : msg
						}).inject(commentIcon);
					});
				}
			    }
			}
	    	}),
	    	new Element('button', {
		    'class': 'DisabledButt',
		    html: 'Cancel',
		    id: 'FPAOTP_cancel_comment_' + photoId,
		    styles: {
			margin: '2px'
		    },
		    events: {
			click: function(evt) {
				var button = $(evt.target);
				var photoId = button.get('id').replace('FPAOTP_cancel_comment_', '');
				toggleCommentDialog(photoId);
				checkIfCommented(photoId);
			}
		    },
		    styles: {
			cursor: 'pointer'
		    }
	    	})
	    );
	// show referrer preview
	if (threadPage && (GM_getValue("add_referrer") == 'custom' || GM_getValue("add_referrer") == 'default')) {
		$('FPAOTP_referrer_check_' + photoId).click();
	}
	// fill the combo
	new Element('option', {
		value: -1,
		html: '--select a stored comment--'
	}).inject($('FPAOTP_stored_comments_' + photoId));
	storedCommentsCache.forEach( function (key, idx) {
			new Element('option', {
				value: key,
				html: GM_getObject(key).title
			}).inject($('FPAOTP_stored_comments_' + photoId));
		});
	  
	checkIfAllowedToComment(photoId, function (retval) {
		var photoId = retval.photoId;
                var commentIcon = $('FPAOTP_comment_' + photoId);
		commentIcon.empty();
		if (!retval.success) {
			    new Element('img', {
				src: images.error,
				title: retval.msg,
			    }).inject(commentIcon);
		}
	}); // allowed to comment
    }

    function checkIfAllowedToComment(photoId, callback) {
        var commentIcon = $('FPAOTP_comment_' + photoId);
	commentIcon.empty();
	new Element('img', { src: images.updating }).inject(commentIcon);

    	var retval = false;
	var apiData = {
            api_key: GM_getSessionKey(),
            auth_hash: GM_getAuthHash(),
            auth_token: GM_getAuthToken(),
            format: 'json',
            method: 'flickr.photos.getInfo',
	    photo_id: photoId,
            nojsoncallback: 1
        };
	new Request({
		url: 'http://www.flickr.com/',
		onFailure: function (response) {
			callback({ photoId: photoId, success: false, msg: response.statusText });
		},
		onSuccess: function (responseText, responseXml) {
			var result;
                        try {
                            result = JSON.parse(responseText);
                        } catch (e) {
                            result = eval('(' + responseText + ')');
                        }
                        if (result.stat === 'fail') {
				callback({ photoId: photoId, success: false, msg : result.code + " - " + result.message });
                            return;
                        }
			var cancomment = result.photo.editability.cancomment;
			if (cancomment == 1) {
				callback({ photoId: photoId, success: true });
			} else {
				callback({ photoId: photoId, success: false, msg: "no permission to add comments" });
			}
		}
	}).get("/services/rest/", apiData);
    }

    function postComment(photoId, key, comment, callback) {
	var apiData = {
                    api_key: GM_getSessionKey(),
                    auth_hash: GM_getAuthHash(),
                    auth_token: GM_getAuthToken(),
                    format: 'json',
                    nojsoncallback: 1,
                    method: 'flickr.photos.comments.addComment',
                    photo_id: photoId,
                    comment_text: comment
                };
	new Request({
                    url: "http://www.flickr.com/",
                    onFailure: function (response) {
                        callback({ photoId: photoId, key: key, success: false, msg: response.statusText });
                    },
                    onSuccess: function (responseText, responseXML) {
                        var result;
                        try {
                            result = JSON.parse(responseText);
                        } catch (e) {
                            result = eval('(' + responseText + ')');
                        }  
                        if (result.stat === 'fail') {
                            callback({ photoId: photoId, key: key, success: false, msg: result.code + " - " + result.message });
                        } else {
                            callback({ photoId: photoId, key: key, success: true });
                        }
                    }
                }).get("/services/rest", apiData);
    }

    function showUpdatingIcon(iconId, title, element) {
	new Element('img', {
		src: images.updating,
		id: iconId,
		title: title,
		width: 16,
		styles: {
			position: 'relative',
			top: 6
		}
	}).inject(element);
    }
    function changeImageIntoError(imgElement, error) {
	imgElement.set('src', images.error);
	imgElement.set('title', error);
    }

    function checkIfFaved(photoId, page) {
	// if we already faved this photo, show it
    	if (!$chk(page)) {
		page = 1;
	}
	if (page == 1) {
		showUpdatingIcon('FPAOTP_fav_updating_' + photoId, 'checking fav status for this photo', 'FPAOTP_fav_' + photoId);
	}
	new Request({
		url: 'http://www.flickr.com',
		onFailure: function(response) {
			changeImageIntoError($('FPAOTP_fav_' + photoId).getElement('img'), response.statusText);
		},
		onSuccess: function(responseText, responseXml) {
		    try {
			var result;
			try {
                            result = JSON.parse(responseText);
                        } catch (e) {
                            result = eval('(' + responseText + ')');
                        }
                        //GM_log("result: " + responseText);
                        if (result.stat === 'fail') {
				changeImageIntoError($('FPAOTP_fav_' + photoId).getElement('img'), "ERROR reading favorites: " + result.code + " - " + result.message);
                        	return;
                        }
			var photoSummary = result.photo;
			var myNsid = GM_getUserNsid();
			var faved = photoSummary.person.some(function (person) {
					return person.nsid == myNsid;
				});
			if (faved) {
				var favStar = $('FPAOTP_fav_' + photoId);
				favStar.getElement('img').dispose();
				favStar.set('title', 'Faved');
				favStar.setStyle('background-position', '-1053px -51px');
				favStar.set('class', 'FPATOP_faved');
				return;
			}
			if (photoSummary.pages > page) {
				checkIfFaved(photoId, page+1);
			} else {
				var favStar = $('FPAOTP_fav_' + photoId);
				favStar.getElement('img').dispose(); // show the fav star image
				favStar.set('title', 'Favorite');
				favStar.set('class', 'FPAOTP_unfaved');
			}
		    } catch (e) {
			GM_log("error parsing fav result: " + e);
		    }
		}
	}).get('/services/rest', {
		api_key: GM_getSessionKey(),
                auth_hash: GM_getAuthHash(),
                auth_token: GM_getAuthToken(),
		method: 'flickr.photos.getFavorites',
		photo_id: photoId,
		page: page,
		per_page: 50,
		nojsoncallback: 1,
		format: 'json'
	});
    }

    function checkIfCommented(photoId) {
	// if we already commented on this photo, show it
	showUpdatingIcon('FPAOTP_comment_updating_' + photoId, 'checking comments on this photo', 'FPAOTP_comment_' + photoId);
	new Request({
		url: 'http://www.flickr.com',
		onFailure: function(response) {
			changeImageIntoError($('FPAOTP_comment_' + photoId).getElement('img'), response.statusText);
		},
		onSuccess: function(responseText, responseXml) {
		    try {
			var result;
			try {
                            result = JSON.parse(responseText);
                        } catch (e) {
                            result = eval('(' + responseText + ')');
                        }
                        if (result.stat === 'fail') {
				changeImageIntoError($('FPAOTP_comment_' + photoId).getElement('img'), "ERROR listing photo comments: " + result.code + " - " + result.message);
                        	return;
                        }

			if (!$chk(result.comments) || !$chk(result.comments.comment)) {
				var comments = [];
			} else {
				comments = result.comments.comment;
			}
			var myNsid = GM_getUserNsid();
                        
			var commented = $chk(comments) && comments.some(function (comment) {
				return comment.author == myNsid;
			});
			var commentIcon = $('FPAOTP_comment_' + photoId);
			commentIcon.getElement('img').dispose(); // spinning balls
			if (commented) {
				commentIcon.set('title', 'Already commented');
				commentIcon.adopt(new Element('img', { src: images.check_big }));
				commentIcon.set('class', 'FPATOP_commented');
				return;
			} else {
				commentIcon.set('class', 'FPAOTP_uncommented');
			}
		    } catch (e) {
			GM_log("error parsing comment result: " + e);
		    }
		}
	}).get('/services/rest', {
		api_key: GM_getSessionKey(),
                auth_hash: GM_getAuthHash(),
                auth_token: GM_getAuthToken(),
		method: 'flickr.photos.comments.getList',
		photo_id: photoId,
		nojsoncallback: 1,
		format: 'json'
	});
    }

    function favorite(photoId) {
	showUpdatingIcon('FPAOTP_faving_' + photoId, 'fav\'ing this photo', 'FPAOTP_fav_' + photoId);
	new Request({
		url: 'http://www.flickr.com',
		onFailure: function(response) {
			changeImageIntoError($('FPAOTP_faving_' + photoId), response.statusText);
		},
		onSuccess: function(responseText, responseXml) {
		    try {
			var result;
			try {
                            result = JSON.parse(responseText);
                        } catch (e) {
                            result = eval('(' + responseText + ')');
                        }
                        //GM_log("result: " + responseText);
                        if (result.stat === 'fail') {
				changeImageIntoError($('FPAOTP_faving_' + photoId), "ERROR adding favorite: " + result.code + " - " + result.message);
                        	return;
                        } else {
				$('FPAOTP_faving_' + photoId).dispose();
				var favStar = $('FPAOTP_fav_' + photoId);
				favStar.set('title', 'Faved');
				favStar.setStyle('background-position', '-1053px -51px');
				favStar.set('class', 'FPAOTP_faved');
				return;
			}
		    } catch (e) {
			GM_log("error parsing faving result: " + e);
		    }
		}
	}).get('/services/rest', {
		api_key: GM_getSessionKey(),
                auth_hash: GM_getAuthHash(),
                auth_token: GM_getAuthToken(),
		method: 'flickr.favorites.add',
		photo_id: photoId,
		nojsoncallback: 1,
		format: 'json'
	});
    }

    function unFavorite(photoId) {
	showUpdatingIcon('FPAOTP_unfaving_' + photoId, 'unfav\'ing this photo', 'FPAOTP_fav_' + photoId);
	new Request({
		url: 'http://www.flickr.com',
		onFailure: function(response) {
			changeImageIntoError($('FPAOTP_unfaving_' + photoId), response.statusText);
		},
		onSuccess: function(responseText, responseXml) {
		    try {
			var result;
			try {
                            result = JSON.parse(responseText);
                        } catch (e) {
                            result = eval('(' + responseText + ')');
                        }
                        //GM_log("result: " + responseText);
                        if (result.stat === 'fail') {
				changeImageIntoError($('FPAOTP_unfaving_' + photoId), "ERROR removing favorite: " + result.code + " - " + result.message);
                        	return;
                        } else {
				$('FPAOTP_unfaving_' + photoId).dispose();
				var favStar = $('FPAOTP_fav_' + photoId);
				favStar.set('title', 'Favorite');
				favStar.setStyle('background-position', '-1053px -11px');
				favStar.set('class', 'FPAOTP_unfaved');
				return;
			}
		    } catch (e) {
			GM_log("error parsing unfaving result: " + e);
		    }
		}
	}).get('/services/rest', {
		api_key: GM_getSessionKey(),
                auth_hash: GM_getAuthHash(),
                auth_token: GM_getAuthToken(),
		method: 'flickr.favorites.remove',
		photo_id: photoId,
		nojsoncallback: 1,
		format: 'json'
	});
    }

// update code

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
        html: 'Flickr Photo Actions on Thread Pages: ' + (beta ? 'beta ' + version : onlineVersion + ' available'),
        href: 'http://userscripts.org/scripts/show/' + scriptNumber,
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
        href: 'http://www.flickr.com/groups/flickrhacks/discuss/72157626999092722/lastpage',
        styles: {
            'text-decoration': 'none'
        },
        target: '_blank'
    }).inject(updater);
}

function outOfDate(version, onlineVersion) {
        var reVersionMatch      = /(\d+)\.(\d+)/;
        var onlineVersionParts  = reVersionMatch.exec(onlineVersion);
        var currentVersionParts = reVersionMatch.exec(version);
        var onlineVersionMajor, onlineVersionMinor;
        //[ onlineVersion, onlineVersionMajor, onlineVersionMinor, onlineVersionBuild ] = onlineVersionParts; 'invalid left-hand side' in Chrome
        onlineVersionMajor = onlineVersionParts[1];
        onlineVersionMinor = onlineVersionParts[2];
        var currentVersionMajor, currentVersionMinor;
        //[ currentVersion, currentVersionMajor, currentVersionMinor, currentVersionBuild] = currentVersionParts;
        currentVersionMajor = currentVersionParts[1];
        currentVersionMinor = currentVersionParts[2];
        // first check major: important update! => rewrite, flickr updates, greasemonkey updates
        if (parseInt(onlineVersionMajor, 10) > parseInt(currentVersionMajor, 10)) {
            return true;
        } else if (parseInt(onlineVersionMajor, 10) === parseInt(currentVersionMajor, 10)) { // we don't want to downgrade  
            // minor version update => new functionality
            if (parseInt(onlineVersionMinor, 10) > parseInt(currentVersionMinor, 10)) {
                return true;
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
                                        GM_log("ERROR processing result: " + e);
                                        callback({ threadId: threadId, success: false, message: "ERROR processing result: " + e });
                                    }
                                },
                                onFailure: function (response) {
                                        GM_log("error: " + response.statusText);
                                        callback({ threadId: threadId, success: false, message: response.statusText });
                                }
                }).get('/services/rest', {
            		api_key: GM_getSessionKey(),
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

function checkVersion(version) {
    var lastVersionCheckTime = GM_getValue("lastVersionCheckTime");
    var elapsedtime;
    var CPStartTime = new Date();
    if ($chk(lastVersionCheckTime)) {
        elapsedtime = CPStartTime.getTime() - lastVersionCheckTime;
    }
    if (!$chk(lastVersionCheckTime) || elapsedtime / 1000 > 60 * 60 * 12) { //more then 12h ago
	getThreadInfo({ threadId: '72157626999092722', callback: function(retval) {
                        var success = retval.success;
                        var message = retval.message;
                        if (!success) {
                                GM_log("error getting version info: " + message);
                                GM_deleteValue("onlineVersion");
                                GM_deleteValue("lastVersionCheckTime");
                                return;
                        }
                        var onlineVersion = message.split(/<i>current stable version:\s*/)[1].split(/<\/i>/)[0];
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
        } else if (version != onlineVersion) { // not out of date, but still different => beta
	    showUpdateNotification({ version: version, beta: true });
	}
    }
}

	new Element('span', {
		id: 'FPAOTP-updatenotifier',
		styles: {
			display: 'none',
			visibility: 'hidden'
		},
		events: {
			'checkversion': function (evt) {
				checkVersion(evt.version);
			}
		}
	}).inject($$('body')[0], 'bottom');
	getVersion('FPAOTP-updatenotifier', 'checkversion');

// end update code

    if (photoPage) {
	var restore_autocomplete = GM_getValue("restore_autocomplete");
	if (restore_autocomplete == true || restore_autocomplete == 'true') {
		try {
			$$('a.tagadderlink').each(function(anchor) { 
				anchor.addEventListener('click', function(evt) {
					setTimeout(function() {
						var input = document.getElementById('addtagbox');
						//var new_input = input.cloneNode(true); // remove any event listeners
						var new_input = document.createElement('input');
						new_input.setAttribute('class', input.getAttribute('class'));
						new_input.setAttribute('id', input.id);
						new_input.setAttribute('type', input.type);
						new_input.setAttribute('name', input.name);
						new_input.setAttribute('value', input.value);
						input.parentNode.replaceChild(new_input,input);
						new_input.setAttribute('autocomplete', 'on');

						new Element('input', { type: 'submit', value: 'add tag', 'class': 'Butt' }).inject($(new_input).getParent('form'));
						$(input).dispose();
						new_input.focus();
					}, (function() { 
						var timeout = GM_getValue("autocomplete_timeout"); 
						if (!$chk(timeout)) return 300;
						try {
							timeout = parseInt(timeout,10);
						} catch (e) {
							return 300;
						}
						if (isNaN(timeout)) return 300;
						return timeout;
					   })());
				}, true);
			});
		} catch (e) {
			GM_log("ERROR: unable to add event listener: " + e);
		}
    	}
    }
})();

