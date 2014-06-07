// ==UserScript==
// @name            UNIFIED CHALLENGES CheckPlay Tool (Flickr)
// @namespace       http://www.flickr.com/groups/
// @description     CheckPlay Tool for Flickr CHALLENGE groups
// @date            01/06/2008
// @creator         Kris Vangeel (http://flickr.com/kvgl69/) // original script for the Photo Face-Off challenge group
// @contributor     Andrew Dunn (http://flickr.com/andrewdunn/) // for changes in CYCheckPlay (Challenge You)
// @contributor     i_need_my_blankie (http://flickr.com/25084834@N03/) // for changes in FCCheckPlay (FRIENDLY Challenges)
// @contributor     Alesa Dam (http://flickr.com/alesadam/) // for making it generic, and adding features
// @modified        Aug. 29, 2013
// @version         3.2.1
// @icon	    https://lh4.googleusercontent.com/omU17F9EckvlLhq35wVwc42s4jA6Dy8i1tFEf46JynGEOJAbhujPiG6L6vmGW4GOsqTopul_RA=s128-h128-e365
//
// @include        http://www.flickr.com/groups/*/discuss*
// @exclude        http://www.flickr.com/groups/*/?search*
// @match          http://www.flickr.com/groups/*/discuss*
//
// @updateURL	   https://userscripts.org/scripts/source/60303.meta.js
// @downloadURL    https://userscripts.org/scripts/source/60303.user.js
//
// @run-at         document-end
//
// ==/UserScript==
//
// ChangeLog: http://www.flickr.com/groups/unified_checkplay/discuss/72157623882744032/
// Documentation: http://www.flickr.com/groups/unified_checkplay/discuss/72157623600133810/
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
// challenge group that is not supported, please FlickrMail us, and we will take care of it.
// We try to keep this as UNIFIED as possible.
// Contacts: 
// - Kate G. (http://www.flickr.com/photos/25084834@N03/)
// - Alesa Dam (http://www.flickr.com/photos/alesadam/)

// move the version check upfront
// in case something goes really wrong, changes are that a version bump could still be accessible

(function() {
var CPtoolversion="3.2.1";
var installPage = 'http://userscripts.org/scripts/show/60303';

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

	var add = function(obj, l_name, method, force){
		if (!protect || force || !obj.prototype[l_name]) obj.prototype[l_name] = method;
		if (generics) Native.genericize(obj, l_name, protect);
		afterImplement.call(obj, l_name, method);
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
		}, */

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
	var version = null;
	for (var engine in this.Engines){
		version = this.Engines[engine]();
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

	setProperties: function(l_attributes){
		for (var attribute in l_attributes) this.setProperty(attribute, l_attributes[attribute]);
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
				//htmlScroll = { x: 0, y: 0 },
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
		var items = null, local = {};
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
		}
		return ctx.getElementsByTagName(tag);
	},

	search: function(self, expression, local){
		var splitters = [];

		var selectors = expression.trim().replace(Selectors.RegExps.splitter, function(m0, m1, m2){
			splitters.push(m1);
			return ':)' + m2;
		}).split(':)');

		var items = null, filtered, item;

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
		
		var client = null, page = null, rightClick = null, wheel = null, related = null, code = null, key = null;

		if (type.test(/key/)){
			code = event.which || event.keyCode;
			key = Event.Keys.keyOf(code);
			if (type == 'keydown'){
				var fKey = code - 111;
				if (fKey > 0 && fKey < 13) key = 'f' + fKey;
			}
			key = key || String.fromCharCode(code).toLowerCase();
		} else if (type.match(/(click|mouse|menu)/i)){
			doc = (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html : doc.body;
			page = {
				x: event.pageX || event.clientX + doc.scrollLeft,
				y: event.pageY || event.clientY + doc.scrollTop
			};
			client = {
				x: (event.pageX) ? event.pageX - win.pageXOffset : event.clientX,
				y: (event.pageY) ? event.pageY - win.pageYOffset : event.clientY
			};
			if (type.match(/DOMMouseScroll|mousewheel/)){
				wheel = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
			}
			rightClick = (event.which == 3) || (event.button == 2);
			related = null;
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
		var type = null;
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
		var type = null;
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
		var fade = this.get('tween'), o = 'opacity', toggle = false;
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
		var value = null;
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
GM_addStyle('.UCP_hidden_from_view { display: none; visibility: hidden; }');
GM_addStyle('.UCP_status_column { display: inline; font-size: 14px; font-weight: bold; }');
GM_addStyle('li.UCP_row_hover:hover { min-height: 15px; background-color: lightgrey; }'); // height: loupiote's script makes the li elements very tiny

// Greasemonkey helpers and wrappers:
var getJSVariable = function (regex) {
	// Thanks to Vispillo for this compact code
	var retval = null;
	$$('script').each( function (script) {
		if (retval != null) {
			return;
		}
		var html = script.innerHTML;
		try {
			retval = html.match(regex)[1];
		} catch (e) {
		}
	});
	return retval;
};

var GM_getSessionKey = function () {
	return getJSVariable(/\"api_key\"[ :]+\"([^\"]+)\"/);
};

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
};

GM_getLoggedInUser = function () {
	var username = getJSVariable(/[\"\']user[\"\'][ :]+{[^}]*\"name\"[ :]+[\'\"]([^\'\"]+)[\'\"]/);
	if (!$chk(username)) {
		username = getJSVariable(/global_name\s*=\s*\'([^\']+)\'/);
	}
	if (!$chk(username)) {
		GM_log("DEBUG: user name not found in global_variables");
	    try {
		username = $('TopBar').getElement('table.Header').getElement('td.Status').getElement('a.Pale').get('text'); // use 'text', not 'html' (replaces &amp; with & ..)
	    } catch (e) {
		try {
			username = $('TopBar').getElement('table.Header').getElement('td.Status').getElement('a.ywa-track').get('text');
		} catch (f) {
			GM_log("unable to retrieve user (" + e + ")");
		}
	    }
	}
	return convertEscapedUnicode(username);
};

GM_getGlobalNsid = function () {
	var usernsid = getJSVariable(/[\"\']user[\"\'][ :]+{[^}]*\"nsid\"[ :]+[\'\"]([^\'\"]+)[\'\"]/);
	if (!$chk(usernsid)) {
		usernsid = getJSVariable(/global_nsid\s*=\s*\'([^\']+)\'/);
	}
	return usernsid;
};

GM_getPublicKey = function () {
	return GM_getSessionKey();
        // the following api_key is reserved for this application
        // if you need an api_key for your own application, please request one at 
        // http://www.flickr.com/services/apps/create/apply/
        // if you request a Non-Commercial key, you'll get it instantly
        return 'a78ba83c374022595dc9073986735dcb'; // the app's own key
};

GM_getPrivateKey = function() {
	return getJSVariable(/[\'\"]api_key[\'\"][ :]+[\'\"]([^\'\"]+)[\'\"]/);
};

GM_getAuthHash = function () {
	var authhash = getJSVariable(/[\"\']auth_hash[\"\'][ :]+[\"\']([^\"\']+)[\"\']/);
	if (!$chk(authhash)) {
		authhash = getJSVariable(/global_auth_hash[ =]+\'([^\']+)\'/);
	}
	return authhash;
};

GM_getAuthToken = function () {
	var authtoken = getJSVariable(/[\"\']auth_token[\"\'][ :]+[\"\']([^\"\']*)[\"\']/);
	if (!$chk(authtoken)) {
		authtoken = getJSVariable(/global_auth_token[ =]+\'([^\']*)\'/);
	}
	return authtoken;
};

GM_getGroupId = function () {
	var groupID = getJSVariable(/[\"\']group[\"\'][: ]+{[^}]*[\"\']nsid[\"\'][: ]+[\"\'](\d+@\w\d{2})[\"\']/);
	if (!$chk(groupID)) {
    		groupID = getJSVariable(/\"search_scope\"[ :]+\"([^\"]+)\"/);
	}
	return groupID;
};

if (Browser.Engine.webkit || // Chrome, Safari
    Browser.Engine.presto) { // Opera

    var keyPrefix = 'UNIFIEDChallengesCheckPlayTool.';

    GM_log = function (message) {
        if (Browser.Engine.webkit) {
            console.info(message);
        } else {
            opera.postError(message);
        }
    };

    GM_getValue = function(key, defValue) {
        var retval = window.localStorage.getItem(keyPrefix + key);
        if (retval == null) {
            return defValue;
        }
        return undefined;
    };

    GM_setValue = function(key, value) {
        try {
            window.localStorage.setItem(keyPrefix + key, value);
        } catch (e) {
            GM_log("error setting value: " + e);
        }
    };

    GM_deleteValue = function(key) {
        try {
            window.localStorage.removeItem(keyPrefix + key);
        } catch (e) {
            GM_log("error removing value: " + e);
        }
    };

    GM_addStyle = function(css) {
            var style = document.createElement('style');
	    style.textContent = css;
	    document.getElementsByTagName('head')[0].appendChild(style);
    };

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
		} catch(e) {
			GM_log("error in listKeys: " + e);
		}
	}
	return list;
    };

    GM_getObject = function (key) {
        var value = GM_getValue(key);
        if ($chk(value)) {
            return JSON.parse(value);
        }
        return undefined;
    };
    
    GM_storeObject = function (key, value) {
        GM_setValue(key, JSON.stringify(value));
    };
    
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
    };

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
    };

    GM_storeObject = function (key, value) {
        try {
            GM_setValue(key, JSON.stringify(value));
        } catch (e) {
            GM_setValue(key, uneval(value));
        }
    };

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
        html: 'UNIFIED Challenges CheckPlay Tool: ' + (beta ? 'beta ' + version : onlineVersion + ' available'),
        href: installPage,
        target: '_blank',
        title:  'to the ' + (beta? 'stable version' : '') + ' install page (opens in new tab)',
        styles: {
            'color': color,
            'text-decoration': 'none'
        }
    }).inject(updater);
	new Element('a', {
		html: beta ? ' (feedback)' : ' (Changes)',
		title: 'opens in new tab',
		href: beta ? 'http://www.flickr.com/groups/unified_checkplay/discuss/72157623600133810/' :
		             'http://www.flickr.com/groups/unified_checkplay/discuss/72157623882744032/',
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
                                        GM_log("ERROR processing result: " + e);
                                        callback({ threadId: threadId, success: false, message: "ERROR processing result: " + e });
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

function checkVersion(version) {
try {
    var lastVersionCheckTime = GM_getValue("lastVersionCheckTime");
    var elapsedtime = (60 * 60 * 12 + 1) * 1000;
    var now = new Date();
    if ($chk(lastVersionCheckTime)) {
        elapsedtime = now.getTime() - lastVersionCheckTime;
    }
    if (elapsedtime / 1000 > 60 * 60 * 12) { //more then 12h ago
    	getThreadInfo({ threadId: '72157623600133810', callback: function(retval) {
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
        GM_setValue("lastVersionCheckTime", now.getTime().toString());
    }

    var onlineVersion = GM_getValue("onlineVersion");
    if ($chk(onlineVersion)) {
        var updateAvailable = outOfDate(version, onlineVersion);
        if (updateAvailable) {
            showUpdateNotification({ onlineVersion: onlineVersion });
        } else if (version != onlineVersion) { // not out of date, but different version => beta
	    showUpdateNotification({ onlineVersion: onlineVersion, version: version, beta: true });
	}
    }
} catch (e) {
	GM_log("ERROR checking version: " + e);
}
}
// end of version check

// -----------

var CPStartTime = new Date();

var UCPprefix = 'UCP';
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
	challengeNumberingLabel: null,  // for challenge groups that don't number: check for name format
	similarThemesRegExp: null,      // Admin only
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
                reMatches.push(this.options.excludes.matches[name].replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
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
    checkPlayerEntries: function (args) {
        if (this.groupLimit() <= 0) {
            return;
        }
        // TODO: for challenge groups where there is no group limit, but there is a limit for some specific challenges,
        // use the phrase "You have reached the maximum play limit in the capped competitions" (Fotocompetitions group)
        if (args.entries === this.groupLimit()) {
		reportStatus("UCheckPlayNG: You entered " + args.entries + 
                " challenges and have reached your maximum play limit! " + 
                ($chk(this.groupLimitLabelAddon()) ? this.groupLimitLabelAddon() : ""), 'warning');
        }
        if (args.entries > this.groupLimit()) {
		reportStatus("UCheckPlayNG: You entered over " + this.groupLimit() + 
                " challenges and are thus breaking the rules! Please remove your latest entry! " + 
                ($chk(this.groupLimitLabelAddon()) ? this.groupLimitLabelAddon() : ""), 'error');
        }
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
var global_group_config = null;

var UCPGroupConfigReader = new Class({
    timeBetweenReads: 12 * 60 * 60 * 1000, // 12 hours
    groupListingURL: 'http://www.flickr.com/groups/1307178@N20/discuss/72157623452533109/',
    initialize: function () {
    },
    checkForUpdates: function (data) {
	var group_name = data.group_name;
	var callback = data.callback;

    	if (!$chk(GM_getValue(UCPprefix + ".groupConfig.list"))) {
		this.readGrouplistURL(function (result) {
			if (!result.success) {
				callback({ success: false,  message: 'unable to read group list: ' + result.message });
				return;
			}
                        if (!$chk(GM_getValue(UCPprefix + ".groupConfig.list"))) { // sanity check
                                GM_log("internal error: no groupConfig list created; aborting");
                                callback({ success: false, message: "internal error: no groupConfig list created; aborting" });
                                return;
                        }
                        this.checkForUpdates(data);
                }.bind(this));
                return; // the recursive call above will get to the block below
	}
        if ($chk(GM_getValue(UCPprefix + ".groupConfig." + group_name))) {
            var lastReadTime = GM_getValue(UCPprefix + ".groupConfig.lastReadTime." + group_name);
            var now = new Date().getTime();
            var elapsedTime = $chk(lastReadTime) ? now - lastReadTime : this.timeBetweenReads + 1;
            if (elapsedTime > this.timeBetweenReads) {
                GM_log("updating " + group_name + " definitions");
                this.readGroupConfigURL(group_name, callback);
            } else {
		callback({ success: true });
	    }
        } else {
            GM_log("updating " + group_name + " definitions");
            this.readGroupConfigURL(group_name, callback);
        }
    },
    createGroupConfig: function (group_name, callback) {
        GM_log("reading config for '" + group_name + "'");
        var storedConfig = GM_getValue(UCPprefix + ".groupConfig." + group_name);
        if ($chk(storedConfig) && storedConfig.match('groupId')) { // test on groupId for versions prior to CL v0.0.7
            try {
                var retval = new UCPGroupConfig(GM_getObject(UCPprefix + ".groupConfig." + group_name));
		callback({ success: true, groupConfig: retval });
		return;
            } catch (e) {
                // parse error?
		GM_log("error parsing group config for group '" + group_name + "'; retrying");
                GM_deleteValue(UCPprefix + ".groupConfig." + group_name);
            }
        }
        // if not available, read from URL
        // make sure the group list is read also: a new group should not have to hit F5 twice, just to get support!
        GM_deleteValue(UCPprefix + ".groupConfig.list");
        this.readGroupConfigURL(group_name, function(retval) {
		if (!retval.success) {
			callback(retval);
			return;
		}
		storedConfig = GM_getValue(UCPprefix + ".groupConfig." + group_name);
		if ($chk(storedConfig)) {
			try {
				var retval = new UCPGroupConfig(GM_getObject(UCPprefix + ".groupConfig." + group_name));
				callback({ success: true, groupConfig: retval });
			} catch (e) {
				// parse error?
				GM_deleteValue(UCPprefix + ".groupConfig." + group_name);
				callback({ success: false, message: e });
			}
			return;
		}
		callback({ success: false, message: "did not find definitions for " + group_name });
	});
    },
    readGroupConfigURL: function (group_name, callback) {
        this.groupList(function(retval) {
		if (!retval.success) {
			callback(retval);
			return;
		}
		var groupList = retval.groupList;
		if (!$chk(groupList[group_name]) || !$chk(groupList[group_name].definitions)) {
		    callback({ success: false, message: 'no definitions found for group ' + group_name });
		    return;
		}
		var groupUrl = groupList[group_name].definitions;
		//GM_log("reading group definitions for '" + group_name + "' (" + groupList[group_name].groupId + ") from '" + groupUrl + "'");
		getThreadInfo({ threadId: groupUrl.match(/.*flickr.com\/groups\/[^\/]+\/discuss\/(\d+)/)[1],
		    callback: function (retval) {
			if (!retval.success) {
				callback(retval);
				return;
			}
			var groupConfiguration = retval.message
						    .trim()
						    .replace(/[\n\r]/g, '') // Flickr changes
						    .replace(/\"/g, '&quot;')
						    .replace(/\\\'/g, '&#39;') // replace \' with its html number
						    .replace(/\'{2}/g, "\"\"")
						    // make the definitions strict JSON (use ' instead of " -> no &quot;)
						    .replace(/\'([^\']+)\'/g, '\"$1\"') // replace ' with " for valid JSON
						    .replace(/&lt;/g, '<')
						    .replace(/&gt;/g, '>')
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
				callback({ success: false, message: 'error evaluating onlineConfig: ' + e });
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
			for (var item in groupList[group_name]) {
			    if (groupList[group_name].hasOwnProperty(item)) {
				onlineConfig[item] = groupList[group_name][item];
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
			GM_storeObject(UCPprefix + ".groupConfig." + group_name, onlineConfig);
			GM_setValue(UCPprefix + ".groupConfig.lastReadTime." + group_name, new Date().getTime().toString());
			callback({ success: true });
		    }
		});
	});
    },
    readGrouplistURL: function (callback) {
        //GM_log("reading group list");
	getThreadInfo({ threadId: this.groupListingURL.match(/.*flickr.com\/groups\/[^\/]+\/discuss\/(\d+)/)[1],
            callback: function (retval) {
		var success = retval.success;
		var message = retval.message;
		if (!success) {
			callback(retval);
			return;
		}
                var groupList = message.trim().replace(/[\n\r]/g, '')
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
                        callback( { success: false, message: 'error parsing groupList result: ' + e });
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
                callback( { success: true } );
            }
        });
    },
    groupList: function (callback) {
        if ($chk(GM_getValue(UCPprefix + ".groupConfig.list"))) {
            //GM_log("working with storage value, and update in background");
            try {
                var groupList = GM_getObject(UCPprefix + ".groupConfig.list");
		callback({ success: true, groupList: groupList });
		return;
            } catch (e) { // parse error?
		GM_log("error parsing group config list; retrying");
                GM_deleteValue(UCPprefix + ".groupConfig.list");
                //return null; continue: reread
            }
        }
        //GM_log("reading list url");
        this.readGrouplistURL(function(retval) {
		if (!retval.success) {
			callback(retval);
			return;
		}
		//GM_log("returning stored dict: '" + ucpStoredGrouplist + "'");
		try {
		    groupList = GM_getObject(UCPprefix + ".groupConfig.list");
		    callback({ success: true, groupList: groupList });
		} catch (e) { // parse error?
			GM_log("error parsing group config list; aborting");
			GM_deleteValue(UCPprefix + ".groupConfig.list");
			callback({ success: false, message: 'error parsing group list: ' + e });
		}
	});
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
    readChallengeDefinitionOverrides: function (announcementNode) {
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


function fetchGroupAdministratorOrModerator(user_nsid, callback) { // removed from UCPGroupConfig to align with admin script
	var groupId = global_group_config.groupId();

	var group_name = global_group_config.groupname();
	var adminOrMod = GM_getValue("UCP.groupAdminOrMod." + group_name + "." + user_nsid);
	var lastReadTime = GM_getValue("UCP.groupAdminOrMod." + group_name + "." + user_nsid + ".lastReadTime");
	var elapsedTime = ($chk(lastReadTime) ? new Date().getTime() - parseInt(lastReadTime,10) : 60 * 60 * 1000 + 1);
	if (adminOrMod != undefined && elapsedTime < 60 * 60 * 1000) {
		callback({ success: true, adminOrMod: adminOrMod == true || adminOrMod == 'true' });
		return;
	}
	var magisterLudi = GM_getPrivateKey();
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
		var adminOrMod = false;
		try {
		    result = JSON.parse(responseText);
		} catch (e) {
		    result = eval('(' + responseText + ')');
		}
		if (result.stat === 'fail') {
		    GM_log("failed reading members from group: " +result.code + " - " + result.message);
		    callback({ success: false, message: result.message });
		    return;
		}
		var members = result.members;
		$each(members.member, function (member) {
		    if (member.nsid === user_nsid) {
			adminOrMod = true;
		    }
		});
		GM_setValue("UCP.groupAdminOrMod." + group_name + "." + user_nsid, adminOrMod);
		GM_setValue("UCP.groupAdminOrMod." + group_name + "." + user_nsid + ".lastReadTime", 
			    new Date().getTime().toString());
		callback({ success: true, adminOrMod: adminOrMod });
	    }
	}).get("/services/rest", apiData);
    }

var ucpDialogStyle = {
    background: '#BFBFBF',
    '-moz-border-radius': '1em',
    '-webkit-border-radius': '1em',
    '-khtml-border-radius': '1em',
    'border-radius': '1em',
    border: 'grey solid 1px',
    'text-align': 'left'
};

var UCPLanguage = new Class({
    Implements: Options,
    options: {
        name: undefined,
        titles: undefined,
        labels: undefined
    },
    initialize: function (options) {
        this.setOptions(options);
	if (this.options.labels.voted && this.options.labels.voted.match(/icon_check.png/)) {
		this.options.labels.voted = '<img src="' + images.defaultCheck + '" style="max-height: 16px;"/>';
	}
	if (this.options.labels.updating && this.options.labels.updating.match(/pulser2.gif/)) {
		this.options.labels.updating = '<img src="' + images.updating + '" width="21" height="10" />';
	}
    },
    name: function () {
        return this.options.name;
    },
    titles: function () {
        return this.options.titles;
    },
    labels: function () {
        return this.options.labels;
    },
    useLegacyLabels: function (legacyLabels) {
        for (var label in legacyLabels) {
            if (legacyLabels.hasOwnProperty(label)) {
                this.options.labels[label] = legacyLabels[label];
            }
        }
    },
    useLanguageOverrides: function (languageOverrides) {
        if ($chk(languageOverrides)) {
            if ($chk(languageOverrides.titleOverrides)) {
                var titleOverrides = languageOverrides.titleOverrides;
                for (var titleOverride in titleOverrides) {
                    if (titleOverrides.hasOwnProperty(titleOverride)) {
                        this.options.titles[titleOverride] = this.options.titles[titleOverrides[titleOverride]];
                    }
                }
            }
            if ($chk(languageOverrides.labelOverrides)) {
                var labelOverrides = languageOverrides.labelOverrides;
                for (var labelOverride in labelOverrides) {
                    if (labelOverrides.hasOwnProperty(labelOverride)) {
                        this.options.labels[labelOverride] = this.options.labels[labelOverrides[labelOverride]];
                    }
                }
            }
        }
    }
});

var ucpLanguages = [];

var UCPLanguageConfigReader = new Class({
    timeBetweenReads: 30 * 24 * 60 * 60 * 1000, // a month
    languageListingURL: 'http://www.flickr.com/groups/1307178@N20/discuss/72157623513185619/',
    initialize: function () {
    },
    checkForUpdates: function (languagename, callback) {
        var language = GM_getValue(UCPprefix + ".languageConfig." + languagename);
        if (!$chk(language)) {
            this.readLanguageConfigURL(languagename, function (retval) {
		if (!retval.success) {
			callback({ success: false, message: 'unable to read language list: ' + retval.message });
			return;
		}
		// sanity check
		if (!$chk(GM_getValue("UCP.languageConfig.list"))) {
			callback({ success: false, message: "internal error: no language list created; aborting" });
			return;
		}
		this.checkForUpdates(languagename, callback);
	    }.bind(this));
	    return; // the recursive call above will get to the block below
        }
	if ($chk(GM_getValue(UCPprefix + ".languageConfig." + languagename))) {
            var lastReadTime = GM_getValue(UCPprefix + ".languageConfig.lastReadTime." + languagename);
            var now = new Date().getTime();
            var elapsedTime = $chk(lastReadTime) ? now - lastReadTime : this.timeBetweenReads + 1;
            if (elapsedTime > this.timeBetweenReads) {
                GM_log("updating '" + languagename + "' definitions");
                GM_deleteValue("UCP.languageConfig.list");
                this.readLanguageConfigURL(languagename, callback);
            } else {
		callback({ success: true });
	    }
        } else {
		GM_log("updating " + languagename + " definitions");
		this.readLanguageConfigURL(languagename, callback);
	}
    },
    createLanguage: function (data) {
	var languagename = data.languagename;
	var legacyLabels = data.legacyLabels;
	var languageOverrides = data.languageOverrides;
	var callback = data.callback;

        if (!$chk(languagename)) {
            languagename = 'English';
        }
        if ($chk(ucpLanguages[languagename])) {
            callback({ success: true, language: ucpLanguages[languagename] });
	    return;
        }
        //GM_log("reading config for '" + languagename + "'");
        var storedConfig = null;
        if ($chk(GM_getValue(UCPprefix + ".languageConfig." + languagename))) {
	    try {
            	storedConfig = GM_getObject(UCPprefix + ".languageConfig." + languagename);
	    } catch (e) {
		GM_deleteValue(UCPprefix + ".languageConfig." + languagename);
	    }
        }
        if (!$chk(storedConfig)) {
        //GM_log(languagename + " not found in storage, updating");
            this.readLanguageConfigURL(languagename, function(retval) {
		if (!retval.success) {
			callback({ success: false, message: 'unable to read language list: ' + retval.message });
			return;
		}
	    	// sanity check
		if (!$chk(GM_getValue(UCPprefix + ".languageConfig." + languagename))) {
			callback({ success: false, message: "internal error: no language list created; aborting" });
			return;
		}
		this.createLanguage(data);
	    }.bind(this));
	    return; // the recursive call above will get to the block below
        }
        // use the stored config, and read updates, in the background
        if ($chk(storedConfig)) {
        //GM_log("storing language " + languagename);
            GM_storeObject(UCPprefix + ".languageConfig." + languagename, storedConfig);
            // inject languagename
            storedConfig.language = languagename;
            var retval = new UCPLanguage(storedConfig);
            if ($chk(languageOverrides)) {
                retval.useLanguageOverrides(languageOverrides);
            }
            if ($chk(legacyLabels)) {
                retval.useLegacyLabels(legacyLabels);
            }
            ucpLanguages[languagename] = retval;
	    callback({ success: true, language: retval });
            return;
        }
        GM_log("result is invalid (storedConfig: " + storedConfig + ")");
        GM_deleteValue(UCPprefix + ".languageConfig." + languagename);
        // retry with English
        this.createLanguage({ languagename: 'English', legacyLabels: legacyLabels, languageOverrides: languageOverrides, callback: callback });
    },
    readLanguageConfigURL: function (languagename, callback) {
        //GM_log("reading language url for '" + languagename + "'");
	var languageList = null;
        try {
            languageList = GM_getObject("UCP.languageConfig.list");
        } catch (e) { // parse error
            GM_deleteValue("UCP.languageConfig.list");
        }
        if (!$chk(languageList)) {
            this.readLanguagelistURL(function(retval) {
		if (!retval.success) {
			callback(retval);
			return;
		}
		try {
        		languageList = GM_getObject("UCP.languageConfig.list");
		} catch (e) {
			callback({ success: false, message: 'error parsing language list: ' + e });
			return;
		}
		this.readLanguageConfigURL(languagename, callback); // recursive
		return;
	    }.bind(this));
        }
        var languageUrl = languageList[languagename].definitions;
        //GM_log("reading language definitions for '" + languagename + "': '" + languageUrl + "'");
	getThreadInfo({ threadId: languageUrl.match(/.*flickr.com\/groups\/[^\/]+\/discuss\/(\d+)/)[1],
	    callback: function(retval) {
		var success = retval.success;
		var message = retval.message;
		if (!success) {
			callback(retval);
			return;
		}
                var languageConfiguration = retval.message
                                            .trim()
                                            .replace(/[\n\r]/g, '')
                                            .replace(/\"/g, '&quot;')
                                            .replace(/\\\'/g, '&#39;') // replace \' with its html number
                                            .replace(/\'{2}/g, "\"\"")
                                            // make the definitions strict JSON (use ' instead of " -> no &quot;)
                                            .replace(/\'([^\']+)\'/g, '\"$1\"') // replace 'xx' with "xx" for valid JSON
						    .replace(/&lt;/g, '<')
						    .replace(/&gt;/g, '>')
                                            // reset
                                            .replace(/&quot;/g, "\'");
                //GM_log("languageConfiguration: " + languageConfiguration);
                var onlineConfig;
                try {
                    onlineConfig = JSON.parse(languageConfiguration);
                } catch (e) {
                    GM_log("json error in language def: " + e);
                    GM_log("language: " + languageConfiguration);
                    try {
                        onlineConfig = eval ('(' + languageConfiguration + ')');
                    } catch (f) {
                        GM_log("error reading languageConfiguration: " + e);
                        GM_log("language configuration: " + languageConfiguration);
                        callback( { success: false, message: 'error reading languageConfiguration: ' + e } );
                        return;
                    }
                }
                if (languagename !== 'English') {
                    // reset defaults for non-defined parts, or languages
                    // TODO: document
                    this.createLanguage({ languagename: 'English', callback: function(retval) {
			    var defaultLanguage = retval.language;
			    this.checkForUpdates('English', function(retval) {
				    if (!$chk(onlineConfig.titles)) {
					onlineConfig.titles = defaultLanguage.titles();
				    } else {
					for (var title in defaultLanguage.titles()) {
					    if (defaultLanguage.titles().hasOwnProperty(title)) {
						if (!$chk(onlineConfig.titles[title])) {
						//GM_log("title '" + title + "' not found, replacing with default");
						    onlineConfig.titles[title] = defaultLanguage.titles()[title];
						} else {
						    // reset the ' to &#39; conversion
						    onlineConfig.titles[title] = onlineConfig.titles[title]
							    .replace(/&#39;/g, "\\\'"); // html numbers don't work in html title attributes
						}
					    }
					}
				    }
				    if (!$chk(onlineConfig.labels)) {
					onlineConfig.labels = defaultLanguage.labels();
				    } else {
					for (var label in defaultLanguage.labels()) {
					    if (defaultLanguage.labels().hasOwnProperty(label)) {
						if (!$chk(onlineConfig.labels[label])) {
						//GM_log("label '" + label + "' not found, replacing with default (" + defaultLanguage.labels()[label] + ")");
						    onlineConfig.labels[label] = defaultLanguage.labels()[label];
						}
					    }
					}
				    }
				GM_storeObject(UCPprefix + ".languageConfig." + languagename, onlineConfig);
				GM_setValue(UCPprefix + ".languageConfig.lastReadTime." + languagename, new Date().getTime().toString()); 
				callback( { success: true } );
			     });
		    }.bind(this) });
                } else {
			for (var title in onlineConfig.titles) {
			    if (onlineConfig.titles.hasOwnProperty(title)) {
				// reset the ' to &#39; conversion
				onlineConfig.titles[title] = onlineConfig.titles[title]
						    .replace(/&#39;/g, "'"); // html numbers don't work in html title attributes
			    }
			}
			GM_storeObject(UCPprefix + ".languageConfig." + languagename, onlineConfig);
			GM_setValue(UCPprefix + ".languageConfig.lastReadTime." + languagename, new Date().getTime().toString()); 
			callback( { success: true } );
		}
            }.bind(this)
        });
    },
    readLanguagelistURL: function (callback) {
        //GM_log("reading language list");
        getThreadInfo({ threadId: this.languageListingURL.match(/.*flickr.com\/groups\/[^\/]+\/discuss\/(\d+)/)[1],
            callback: function (result) {
		if (!result.success) {
			callback(result);
			return;
		}
                var languageList = result.message
                                            .replace(/\'([^\']+)\'/g, '\"$1\"'); // replace 'xx' with "xx" for valid JSON
                this.languages = {};
                //GM_log("languageList: " + languageList);
                try {
                    this.languages = JSON.parse(languageList);
                } catch (e) {
                    GM_log("json error in language list: " + e);
                    GM_log("language list: " + languageList);
                    try {
                        this.languages = eval('(' + languageList + ')');
                    } catch (f) {
                        GM_log("error parsing languageList result: " + e);
                        GM_log("languageList: " + languageList);
                        callback( { success: false, message: 'error parsing languagelist result: ' + e } );
                        return;
                    }
                }
                GM_storeObject("UCP.languageConfig.list", this.languages);
                callback( { success: true } );
            }.bind(this)
        });
    },
    getLanguageList: function (callback) {
	var list = null;
        try {
            list = GM_getObject("UCP.languageConfig.list");
		callback({ success: true, languageList: list });
		return;	
        } catch (e) { // parse error
            GM_deleteValue("UCP.languageConfig.list");
        }
        this.readLanguagelistURL(function(retval) {
		    if (!retval.success) {
			callback(retval);
			return;
		    }
		    try {
	            	list = GM_getObject("UCP.languageConfig.list");
			callback({ success: true, languageList: list });
		    } catch (e) {
			callback({ success: false, message: 'error parsing language list: ' + e });
		    }
	});
    }
});

function createTopicListingStatusDecorator (chlgstatus, ucpGroupPreferences, ucpLanguage) {
        switch (chlgstatus) {
        case "Filled":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().filled, 
                          ucpGroupPreferences.groupConfig().automaticVoteStart() ? ucpLanguage.labels().vote : ""
                        ], 
                title: ucpLanguage.titles().filled + 
                    (ucpGroupPreferences.groupConfig().automaticVoteStart() ? ucpLanguage.titles().automaticVoteStart : ""),
                color: ucpLanguage.labels().filledColor,
                addWarning: true
            };
        case "Finished":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().finished ],
                title: ucpLanguage.titles().finished,
                color: ucpLanguage.labels().finishedColor,
                addWarning: true
            };
        case "--VOTE--": // fall through
        case "VOTE":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().vote ],
                title: ucpLanguage.titles().vote,
                color: ucpLanguage.labels().voteColor,
                addWarning: true
            };
        case "Voted":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().voted ],
                title: ucpLanguage.titles().voted,
                color: ucpLanguage.labels().votedColor,
                addWarning: true
            };
        case "Voided": 
	case "Expired":
        case "Closed":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().closed ],
                title: ucpLanguage.titles().closed,
                color: ucpLanguage.labels().ignoreColor
            };
        case "Open":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().open ],
                title: ucpLanguage.titles().open,
                color: ucpLanguage.labels().openColor,
                addWarning: true
            };
        case "OK":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().waitingForEntries ],
                title: ucpLanguage.titles().open,
                color: ucpLanguage.labels().waitingForEntriesColor,
                addWarning: true
            };
        case "Excluded":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().excluded ],
                title: ucpLanguage.titles().excluded,
                color: ucpLanguage.labels().excludedColor,
                addWarning: true
            };
        case "ErrExclPlay":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().errExcl ],
                title: ucpLanguage.titles().errExclPlay,
                color: ucpLanguage.labels().errExclColor,
                addWarning: true
            };
        case "UPDATING":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().updating ],
                title: ucpLanguage.titles().updating,
                color: ""
            };
        case "ERRORLOADING":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().errorLoading ],
                title: ucpLanguage.titles().errorLoading,
                color: ucpLanguage.labels().errorLoadingColor,
                addWarning: true
            };
        case "ERRORPARSING":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().errorParsing ],
                title: ucpLanguage.titles().errorParsing,
                color: ucpLanguage.labels().errorParsingColor,
                addWarning: true
            };
        case "Player":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().player ],
                title: ucpLanguage.titles().player,
                color: ucpLanguage.labels().playerColor,
                addWarning: true
            };
        case "PlayerVoted":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().player, ucpLanguage.labels().voted ],
                title: ucpLanguage.titles().player + " " + ucpLanguage.titles().voted,
                color: ucpLanguage.labels().votedColor,
                addWarning: true
            };
        case "PlayerMustVote":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().player, ucpLanguage.labels().vote ],
                title: ucpLanguage.titles().player + " " + ucpLanguage.titles().vote,
                color: ucpLanguage.labels().voteColor,
                addWarning: true
            };
        case "PlayerMayVote":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().player ],
                title: ucpLanguage.titles().player,
                color: ucpLanguage.labels().playerColor,
                addWarning: true
            };
        case "PlayerFilled":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().player, ucpLanguage.labels().filled ],
                title: ucpLanguage.titles().player + " " + ucpLanguage.titles().filled + 
                    (ucpGroupPreferences.groupConfig().automaticVoteStart() ? ucpLanguage.titles().automaticVoteStart : ""),
                color: ucpLanguage.labels().filledColor,
                addWarning: true
            };
        case "PlayerFinished":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().player, ucpLanguage.labels().finished ],
                title: ucpLanguage.titles().player + " " + ucpLanguage.titles().finished,
                color: ucpLanguage.labels().finishedColor,
                addWarning: true
            };
        case "UNKNOWN":
        case "Unknown":
        case "---":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().ignore ],
                title: ucpLanguage.titles().ignore,
                color: ""
            };
        case "none":
            return {
                name: chlgstatus,
                labels: [ ucpLanguage.labels().open + "?" ],
                title: ucpLanguage.titles().open,
                color: ucpLanguage.labels().openColor,
                addWarning: true
            };
        default:
            GM_log("no decorator for chlgstatus '" + chlgstatus + "'");
            return { name: "error" };
        }
}

function createChallengePageStatusDecorator (chlgstatus, ucpGroupPreferences, ucpLanguage) {
        switch (chlgstatus) {
        case "Filled":
            return { 
                name: chlgstatus,
                title: ucpLanguage.titles().filled + 
                    (ucpGroupPreferences.groupConfig().automaticVoteStart() ? ucpLanguage.titles().automaticVoteStart : "")
            };
        case "Finished":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().finished
            };
        case "--VOTE--": // fall through
        case "VOTE":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().vote
            };
        case "Voted":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().voted
            };
        case "Voided": 
	case "Expired":
        case "Closed":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().closed
            };
        case "Open":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().open
            };
        case "OK":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().open
            };
        case "Excluded":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles()
            };
        case "ErrExclPlay":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().errExclPlay
            };
        case "UPDATING":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().updating
            };
        case "ERRORLOADING":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().errorLoading
            };
        case "ERRORPARSING":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().errorParsing
            };
        case "Player":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().player
            };
        case "PlayerVoted":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().player + " " + ucpLanguage.titles().voted
            };
        case "PlayerMustVote":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().player + " " + ucpLanguage.titles().vote
            };
        case "PlayerMayVote":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().player
            };
        case "PlayerFilled":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().player + " " + ucpLanguage.titles().filled + 
                    (ucpGroupPreferences.groupConfig().automaticVoteStart() ? ucpLanguage.titles().automaticVoteStart : "")
            };
        case "PlayerFinished":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().player + " " + ucpLanguage.titles().finished
            };
        case "---":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().ignore
            };
        case "none":
            return {
                name: chlgstatus,
                title: ucpLanguage.titles().open
            };
        default:
            GM_log("don't know what to do with status '" + chlgstatus + "'");
            return { name: "error" };
        }
}

var global_group_preferences = null;

var ucpInsertionIdx = 0;

var UCPVoteComment = new Class({
    Implements: [Options],
    options: {
        ucpThread: null,
        poster: null,
        comments: [],
        node: null
    },
    initialize: function (options) {
	for (var key in options) {
        	this.options[key] = options[key];
	}
    },
    toString: function () {
        return this.options.poster.username;
    },
    poster: function () {
        return this.options.poster;
    },
    node: function() {
        return this.options.node;
    },
    ucpThread: function () {
        return this.options.ucpThread;
    },
    printStatus: function () {
        if (this.options.ucpThread.options.needsStatusOnChallengePage) {
		var pageAnchor = $$('td.Who a[name=comment' + this.options.messageId + ']')[0].getParent('tr').getElements('small').getLast();
		if ($chk(pageAnchor) && $chk(pageAnchor.getParent('div.ucpdiv'))) {
		    pageAnchor = pageAnchor.getParent('div.ucpdiv');
		}
		if (!$chk(pageAnchor)) {
		    pageAnchor = this.options.node;
		}
		var message = "";
		if (this.options.ucpThread.challengeDefinition().scoreType() === "MEETANDGREET") {
		    message = "found a greeting from <b>" + this.poster().username;
		} else {
		    if ($chk(this.options.node) && $chk(this.options.node.getElement('img[alt*=UCPANG:bump]'))) {
			message = "found a bump message";

		    } else if ($chk(this.options.comments) && this.options.comments.length > 0) {
			this.options.comments.each(function (comment) {
			    message = (message.length > 0 ? " - " : "") + comment.msg; // TODO: type: 'error'
			});
		    } else {
			message = "found a regular comment (no photo, no votes)";
		    }
		    message = message + " from " + this.poster().username;
		}
		new Element('small', {
		    html: "UCheckPlayNG: " + message + "<br/>"
		}).inject(new Element('div', { 'class': 'ucpdiv' }).inject(pageAnchor, 'after'));
	}
    }
});

var UCPThread = new Class({
    Implements: [Options],
    options: {
        groupConfig: undefined,
        chlgname: undefined,
        chlgAnchor: undefined,
        labelElement: undefined,
        feedbackElement: undefined,
        scoreAnchor: undefined,
        chlgstatus: "UPDATING",
        challengeDefinition: undefined,
        votingErrors: [],
	photoErrors: [],
        validVotingAsStored: true,
        excludedPlayers: [],
        url: undefined,
        topic: undefined,
        scoreSummary: undefined,
	cummulativeScore: undefined,
        needsStatusOnTopicListing: false,
        needsStatusOnChallengePage: false,
	reHorizontalVoteMatch: undefined
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
                  "votingErrors:  " + this.votingError(),
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
    challengeAnchor: function () {
        return this.options.chlgAnchor;
    },
    labelElement: function () {
        return this.options.labelElement;
    },
    setLabelElement: function (element) {
        this.options.labelElement = element;
    },
    scoreAnchor: function () {
        return this.options.scoreAnchor;
    },
    setScoreAnchor: function (element) {
        this.options.scoreAnchor = element;
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
    addExcludedPlayer: function (user_name) {
        if ($chk(user_name)) {
            this.options.excludedPlayers.include(user_name);
        }
    },
    excludedPlayers: function () {
        return this.options.excludedPlayers;
    },
    isExcluded: function (user_name) {
        if ($chk(user_name)) {
            return this.options.excludedPlayers.contains(user_name);
        }
        return false;
    },
    findExcludesInText: function (html) {
        reExcludeMatch = this.groupConfig().reExcludeMatch();
//    	GM_log("checking for excludes in '" + html + "' with '" + reExcludeMatch + "'");
        var excludedMatch = reExcludeMatch.exec(html);
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
        // set for photoposter (first for loop)
        if (value === "Excluded") {
            this.setChallengeStatus("Excluded");
            return;
        }
        if ((this.challengeStatus() === "none") && (value === "photoposter")) {
            this.setChallengeStatus("Player");
            return;
        }
        if ((this.challengeStatus() === "Excluded") && (value === "photoposter")) {
            this.setChallengeStatus("ErrExclPlay");
            return;
        }
        if ((this.challengeStatus() === "none") && (value === "filled")) {
            this.setChallengeStatus("Filled");
            return;
        }
        // set for voter (second for loop)
        if ((this.challengeStatus() === "none") && (value === "voter")) {
            this.setChallengeStatus("Voted");
            return;
        }
        if ((this.challengeStatus() === "Excluded") && (value === "voter")) {
            this.setChallengeStatus("Voted");
            return;
        }
        if ((this.challengeStatus() === "ErrExclPlay") && (value === "voter")) {
            this.setChallengeStatus("ErrExclPlay");
            return;
        }
        if ((this.challengeStatus() === "Player") && (value === "voter")) {
            this.setChallengeStatus("PlayerVoted");
            return;
        }
        if ((this.challengeStatus() === "Voted") && (value === "voter")) {
            this.setChallengeStatus("Voted"); //catch a comment and a vote from same player
            return;
        }
        if ((this.challengeStatus() === "Voted") && (value === "photoposter")) {
            this.setChallengeStatus("PlayerVoted");
            return;
        }
        if ((this.challengeStatus() === "Player") && (value === "mayvote")) {
            this.setChallengeStatus("PlayerMayVote");
            return;
        }
        if ((this.challengeStatus() === "Player") && (value === "mustvote")) {
            this.setChallengeStatus("PlayerMustVote");
            return;
        }
        if (this.challengeStatus().match(/^Player/) && (value === "voter")) {
            this.setChallengeStatus("PlayerVoted");
            return;
        }
        if (this.challengeStatus().match(/^Player/) && (value === "finished")) {
            this.setChallengeStatus("PlayerFinished");
            return;
        }
        if (this.challengeStatus().match("Finished") && (value === "photoposter")) {
            this.setChallengeStatus("PlayerFinished");
            return;
        }
        if (this.challengeStatus() === "Player") {
            this.setChallengeStatus("Player"); // don't overwrite in case of 'maynotvote'
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
        // this.setChallengeStatus(""); keep the status as it is! => [Finished] => RE-VOTE => voter => error!
    },
    printStatus: function (ucpGroupPreferences, ucp_language, newchlgstatus) {
        if (!newchlgstatus || newchlgstatus.length === 0) {
            newchlgstatus = this.challengeStatus();
        }
        var statusData;
        if (this.options.needsStatusOnTopicListing) {
            statusData = createTopicListingStatusDecorator(newchlgstatus, ucpGroupPreferences, ucp_language);
        } else if (this.options.needsStatusOnChallengePage) {
            statusData = createChallengePageStatusDecorator(newchlgstatus, ucpGroupPreferences, ucp_language);
        } else {
            return;
        }
        this.decorateThread(statusData);
        // TODO: part of UCPListing.printStatus
        this.groupConfig().checkPlayerEntries({
                entries: playernumber
        });
    },
    decorateThread: function (statusData) {
        if (this.options.needsStatusOnTopicListing) {
            if ($chk(this.scoreAnchor()) && $chk(this.scoreSummary()) && 
                (statusData.name === "Finished"    || statusData.name === "Voted" || 
                 statusData.name === "PlayerVoted" || statusData.name === "PlayerFinished" ||
                 statusData.name === "Closed")) {
                this.scoreAnchor().title = "UCheckPlay score summary: " + this.scoreSummary();
            }

            if (this.labelElement()) {
                this.labelElement().empty();
                this.labelElement().style.textDecoration = 'none';
                var myColor = statusData.color;
                var span = null;
                statusData.labels.each(function (label) {
                    this.labelElement().adopt(span = new Element('span', {
                        html: label,
                        styles: {
                            color: myColor
                        },
                        title: statusData.title
                    }));
                }, this);
                if (statusData.addWarning && !this.validVoting()) {
                    span.set('html', span.get('html') + '(!)');
                    span.set('title', span.get('title') + ' (!! ' + this.votingError() + ')');
                }
    	    	if (this.usesTimeConstraints()) {
		    if (statusData.name == "OK" || statusData.name == "Open" || statusData.name == "--VOTE--" || statusData.name.match("Player") || statusData.name.match("Voted") ) {
			var flickrClock = calculateFlickrClock();
			var deadline = $chk(this.voteDeadline()) ? this.voteDeadline() : this.postDeadline();
			if ($chk(flickrClock) && $chk(deadline)) {
			    var timeleft = deadline - flickrClock.getTime();
			    if (timeleft > 0) {
				var statusElement = $('UCPNG.' + this.challengeAnchor());
				var timeleftElement = $('UCPNG.timeleft.' + this.challengeAnchor());
				if ($chk(statusElement) && !$chk(timeleftElement)) {
			    		statusElement = statusElement.getParent('div.UCP_status_column');
					var minutesFactor = 1000 * 60;
					var hoursFactor = minutesFactor * 60;
					var daysFactor = hoursFactor * 24;

					var daysLeft = Math.floor(timeleft / daysFactor);
					if (daysLeft >= 1) {
						var timeleftElement = new Element('span', { 
							id: 'UCPNG.timeleft.' + this.challengeAnchor(), 
							html: daysLeft + "&nbsp;day" + (daysLeft >= 2 ? "s" : "")
						}).inject(statusElement);
					} else {
						timeleftElement = new Element('span', {
							id: 'UCPNG.timeleft.' + this.challengeAnchor(),
							html: 'final&nbsp;day!'
						}).inject(statusElement);
					}
					var hoursLeft = Math.floor((timeleft - daysLeft * daysFactor) / hoursFactor);
					var minutesLeft = Math.floor((timeleft - daysLeft * daysFactor - hoursLeft * hoursFactor) / minutesFactor);
					timeleftElement.set('title', daysLeft + 'd' + hoursLeft + 'h' + minutesLeft + 'm');
				}
			    }
	    		}
		    }
		}
            }
            if (this.challengeAnchor()) {
                this.challengeAnchor().set('title', this.options.title); // check: this.options.title does not exist?
            }
        } else if (this.options.needsStatusOnChallengePage) {
            var showSummary = $chk(this.scoreAnchor()) && $chk(this.scoreSummary()) && 
                (statusData.name === "Finished"    || statusData.name === "Voted" || 
                 statusData.name === "PlayerVoted" || statusData.name === "PlayerFinished" ||
                 statusData.name === "Closed");
            if (showSummary) {
                this.scoreAnchor().title = "UCheckPlayNG score summary: " + this.scoreSummary();
            }

            if (this.feedbackElement()) {
                this.feedbackElement().empty();
                if (statusData.title) {
                    this.feedbackElement().set('html', 'UCheckPlayNG: ' + statusData.title + '<br/>');
                }
                if ($chk(this.scoreSummary())) {
                    new Element('small', {
                        html: "UCheckPlayNG: " + this.scoreSummary() + "<br/>"
                    }).inject(this.feedbackElement(), 'after');
                }
            }
        }
    },
    printExcludes: function () {
        if (!this.options.needsStatusOnChallengePage) {
            return;
        }
        try {
            if ($chk(this.options.excludedPlayers) && this.options.excludedPlayers.length > 0) {
                var pageAnchor = $(document).getElement('td.Said').getElements('small').getLast();
                if ($chk(pageAnchor) && $chk(pageAnchor.getParent('div.ucpdiv'))) {
                    pageAnchor = pageAnchor.getParent('div.ucpdiv');
                }
                if (!$chk(pageAnchor)) {
                    var players = this.excludedPlayers().join('</b>, and <b>');
			reportStatus("UCheckPlayNG: found excludes for <b>" + players + "</b>");
                } else {
			this.excludedPlayers().each(function (excludedPlayer) {
				new Element('small', {
				    html: "UCheckPlayNG: found exclude for <b>" + excludedPlayer + "</b><br/>"
				}
			    ).inject(pageAnchor, 'after');
			});
		}
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
		} else if (this.open()) {
			this.setChallengeStatus("Open");
		} else if (this.waitingForEntries()) {
			this.setChallengeStatus("OK");
		}
        }
        if (  (this.challengeStatus() === "none" || this.challengeStatus() === "Excluded") 
            && $chk(this.challengeName().match(this.groupConfig().states().vote))) {
            this.setChallengeStatus("--VOTE--");
        }
        if ((this.challengeStatus() === "Player") && 
            (this.filled() || this.challengeName().match(this.groupConfig().states().vote))) {
            this.updateStatus(this.challengeDefinition().playerVoting());
        }
        if (this.challengeStatus() === "PlayerMayVote" || this.challengeStatus() === "Player") {
            if (this.filled()) {
                this.setChallengeStatus("PlayerFilled");
            }
            return;
        }
    },
    resetStatus: function () {
        this.setChallengeStatus("none");
        this.options.votingErrors = [];
	this.options.photoErrors = [];
    },
    loadthread: function(processDiscussionTopicCallback) {
	var ucpThread = this;
            var apiData = {
                api_key: GM_getPrivateKey(),
                auth_hash: GM_getAuthHash(),
                auth_token: GM_getAuthToken(),
                format: 'json',
                method: 'flickr.groups.discuss.replies.getList',
                nojsoncallback: 1,
                topic_id: this.topic(),
		page: 1,
		per_page: 500
            };
            new Request({
                url: "http://api.flickr.com/",
                onSuccess: function (responseText, responseXML) {
                    var result;
                    try {
                        result = JSON.parse(responseText);
                    } catch (e) {
			GM_log("error parsing JSON - evaluating");
			try {
                        	result = eval('(' + responseText + ')');
			} catch (f) {
				processDiscussionTopicCallback({ success: false, message: e, ucpThread: ucpThread });
				return;
			}
                    }
                    if (result.stat === 'fail') {
                        processDiscussionTopicCallback({ success: false, message: result.code + " - " + result.message, ucpThread: ucpThread });
			return;
                    }
		    var discussionTopic = result.replies;
		    processDiscussionTopicCallback({ success: true, discussionTopic: discussionTopic, ucpThread: ucpThread });
                },
		onFailure: function (response) {
			GM_log("error: " + response.statusText);
			processDiscussionTopicCallback({ success: false, message: response.statusText });
                }
            }).get("/services/rest/", apiData);
    },
    collectVotes: function (challengeAnnouncement, challengeEntries, callback) {
        var group_config = this.groupConfig();
        var challengeConfig = this.challengeDefinition();
        var topic = this.topic();
        var voteArray = [];
        var commentArray = [];
        var photoArray = [];
   
        if (this.groupConfig().allowsPhotoInAnnouncement()) {
            photoArray.combine(this.findPhotos({ entry: challengeAnnouncement, all: false }));
        }
        challengeEntries.each(function (challengeEntry, i) {// try to find the number of photos posted; helps with constructing the vote regexp
            if (i === 1 && group_config.skipFirstReply()) { 
                return;
            }
            //GM_log("["+i+"]: "+challengeEntry.innerHTML);
            // admins have an image before there name, surrounded with an 'a' tag without 'href' attribute :> skip
            var poster = { username: challengeEntry.authorname, userid: challengeEntry.author, admin: challengeEntry.role == "admin" || challengeEntry.role == "moderator" }; 

            var photosInNode = this.findPhotos({ entry: challengeEntry, all: false, poster: poster });

            if (photosInNode.length > 0) {
                photoArray.combine(photosInNode);
		// record for the next loop
		challengeEntry.photos = photosInNode;
		challengeEntry.poster = poster;
	    }
	},this);
        this.photosArray = photoArray;
	challengeEntries.each(function (challengeEntry, i) {
            if (i === 1 && group_config.skipFirstReply()) { 
                return;
            }
	    if ($chk(challengeEntry.photos)) {
		return;
	    }
            // This should be a vote or user comment
            var poster = { username: challengeEntry.authorname, userid: challengeEntry.author, admin: challengeEntry.role == "admin" || challengeEntry.role == "moderator" }; 

            if (i === 2 && group_config.skipFirstTwoRepliesForVotes()) {
                    return;
            }
	    
                var usercommentClone = new Element('div', { html: challengeEntry.message._content });
                // only consider votes that are after the last photo (only approximate)
                // if the next comment has a photo, skip!
                if (voteArray.length === 0 && challengeEntries.length > i) {
                    var nextComment = challengeEntries[i + 1];
                    if (nextComment && this.findPhotos({ entry: nextComment, all: false }).length > 0) {
                        commentArray.include(new UCPVoteComment({
                            node: usercommentClone,
			    messageId: challengeEntry.id,
                            poster: poster,
                            ucpThread: this
                        }));
                        return;
                    }
                }
                // first remove striked votes, image icons, banners
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
				   messageId: challengeEntry.id,
                                   ucpThread: this,
                                   poster: poster,
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
				    messageId: challengeEntry.id,
                                    ucpThread: this,
                                    poster: poster,
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
				    messageId: challengeEntry.id,
                                    ucpThread: this,
                                    poster: poster,
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
				    messageId: challengeEntry.id,
                                    ucpThread: this,
                                    poster: poster,
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
			messageId: challengeEntry.id,
                        node: usercommentClone,
                        ucpThread: this
                    }));
                    break;

                default:
                //case "PIC-*":
                    if (/PIC-/.test(challengeConfig.scoreType())) {
                        // PIC-V-n: pic n photos, score vertically
                        // PIC-H-n: pic n photos, score horizontally
                        // PIC-P-1: give a point to the player
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
                                                    ucpThread: this, 
                                                    poster: poster, 
                                                    challengeEntry: usercommentClone,
						    messageId: challengeEntry.id, 
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
                                                    ucpThread: this, 
                                                    poster: poster, 
                                                    challengeEntry: usercommentClone,
						    messageId: challengeEntry.id, 
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
                                                    ucpThread: this,
                                                    poster: poster,
                                                    challengeEntry: usercommentClone,
						    messageId: challengeEntry.id,
                                                    replytxt: replytxt,
                                                    photoArray: photoArray
                                                });
                            if (createdPicPVote instanceof UCPVoteComment) {
                                commentArray.include(createdPicPVote);
                            } else {
                                voteArray.include(createdPicPVote);
                            }
                        }
                    }
                }
        }, this); // each entry

        this.votesArray = voteArray;
        this.commentsArray = commentArray;
	callback();
    },
    findPhotos: function(data) {
    	var entry = data.entry;
	var all = data.all;
	var poster = data.poster;
	var _debug = data.debug;

        var photoArray = [];
        if (this.challengeDefinition().scoreType() === "MEETANDGREET" && !all) { // don't bother
            return photoArray;
        }
	if (!entry.message._content.test('<img')) {
		return photoArray;
	}
	if (!$chk(poster)) {
            poster = { username: entry.authorname, userid: entry.author, admin: entry.role == "admin" || entry.role == "moderator" }; 
	}
	var entryDiv = new Element('div', {
                    html: entry.message._content
                });
        var photos = entryDiv.getElements("img").filter(ucpCheckPhoto, this.challengeDefinition());
        var potentialCompetitor = null;
        photos.each(function(photoNode) {
            if (potentialCompetitor !== null && !all) {
                return;
            }
	    var photoNumber = undefined;
	    if (global_group_preferences.checkPhotoNumbering()) {
	    	var numberP = photoNode.getParent('div');
		    numberP.get('text').split('\n').some( function (line) {
    			try {
				photoNumber = line.trim().replace(/^(&nbsp;|&emsp;|\r)+/, '').match(/^[#~]?\s*(\d+)/)[1];
				return true;
		    	} catch (e) {
		    		// ignore: most lines won't match
	    		}
			return false;
	    	    });
	    }
            potentialCompetitor = ucpCreateCompetitor({
		messageId: entry.id,
	    	node: photoNode, 
		poster: poster,
		number: photoNumber,
		ucpThread: this,
		debug: _debug
	    });
            if (potentialCompetitor) {
                photoArray.push(potentialCompetitor);
            }
        }.bind(this));
        return photoArray;
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
			this.votes().each( function (vote) {
				GM_log("DEBUG: vote=" + vote);
			});
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
    printStatus: function (group_preferences, ucp_language, newchlgstatus) {
        var anchortitle = ucp_language.titles()[this.getLabelPrefix()];
        if (this.labelElement()) {
            this.labelElement().set('html', ucp_language.labels()[this.getLabelPrefix()]);
            this.labelElement().set ('style', 
                'color: ' + ucp_language.labels()[this.getLabelPrefix() + "Color"] + '; text-decoration: none');
            this.labelElement().title = anchortitle;
            this.challengeAnchor().title = anchortitle;
        }
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
	/*if (!$chk(vote)) { // vote is normally the cummulative score
                if (this.votes().length == 0) {
                        return false;
                }
                vote = this.votes()[this.votes().length - 1];
        }*/ // check: copied from admin script - needed here?
        // special case: PIC-P requires a diff of 2 points
        if (this.challengeDefinition().scoreType().match(/PIC-P-/)) {
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
                    retval += photo.poster().username + ": " + photo.error();
                }
        });
        this.votes().each(function (vote) {
                if (vote.hasError()) {
                    if (retval.length > 0) retval += " - ";
                    retval += vote.poster().username + ": " + vote.error();
                }
        });
        return retval;
    },
    warning: function () {
        var retval = "";
        this.photos().each(function (photo) {
                if (photo.hasWarning()) {
                    if (retval.length > 0) retval += " - ";
                    retval += photo.poster().username + ": " + photo.warning();
                }
        });
        this.votes().each(function (vote) {
                if (vote.hasWarning()) {
                    if (retval.length > 0) retval += " - ";
                    retval += vote.poster().username + ": " + vote.warning();
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
    },
    reHorizontalVoteMatch: function() {
	    if (!this.options.reHorizontalVoteMatch) {
		// xX: when a photo is removed once voting has started, it may be replaced with x: 1-2-x-0
		// when split with a character, it can be double digits
		var reVoteMatchSplit  = "(?:\\b|\\s)(\\d+|[xX]{1})\\s*[^xX\\d]{1,2}\\s*(\\d+|[xX]{1})"; // at least 2
		// when stuck to each other, it should be single digits
		var reVoteMatchJoined = "(?:\\b|\\s)(\\d{1}|[xX]{1})(\\d{1}|[xX]{1})"; // at least 2
			
		// limit the seperation characters to non-alphabet characters:
//GM_log("posted photos: " + this.photos().length + " - needed photos: " + this.challengeDefinition().neededPhotos());
		if (this.photos().length == this.challengeDefinition().neededPhotos()) {
			if (this.photos().length > 2) { // we already have a regexp for 2
				for (var p = 0; p < this.photos().length - 2; ++p) {
				    reVoteMatchSplit  = reVoteMatchSplit  + "\\s*(?:[^xX\\d]{1,2})\\s*(\\d+|[xX]{1})";
				    reVoteMatchJoined = reVoteMatchJoined + "(\\d{1}|[xX]{1})";
				}
			}
		} else {
			for (var p = 1; p < 10; ++p) {
			    reVoteMatchSplit  = reVoteMatchSplit  + "\\s*(?:[^xX\\d]{1,2})?\\s*(\\d+|[xX]{1})?";
			    reVoteMatchJoined = reVoteMatchJoined + "(\\d{1}|[xX]{1})?";
			}
		}
		reVoteMatchSplit  = reVoteMatchSplit  + "(?:\\s|\\b)";
		reVoteMatchJoined = reVoteMatchJoined + "(?:\\s|\\b)";
		this.options.reHorizontalVoteMatch = new RegExp(reVoteMatchSplit + "|" + reVoteMatchJoined, "ig");
//GM_log("using regexp '" + this.options.reHorizontalVoteMatch + "'");
	    }
	    return this.options.reHorizontalVoteMatch;
    }


});
function ucpCreateChallengeThread(options) {



    var cc_group_config = options.groupConfig;
    var chlgname = options.chlgname;
    var challengeDefinition = cc_group_config.extractChallengeDefinition(chlgname);
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

var UCPGroupPreferences = new Class({
/* should be completely different from other UCP script */
    Implements: [Options],
    options: {
        groupConfig: null, // mandatory
        // UCheckPlay preferences
        ucpStyle: false, // defaults to flickrStyle
        language: 'English',
        useLegacyLabels: false,
	checkPhotoNumbering: false,
	checkPhotoNumberingGently: true
    },
    initialize: function (options) {
        this.setOptions(options);
        var group_name = this.options.groupConfig.groupname();
        // layout style
        var storedUCPStyle = GM_getValue("UCP.ucpStyle." + group_name);
        this.options.ucpStyle = (storedUCPStyle === true || storedUCPStyle === 'true');
        // language
        var storedLanguage = GM_getValue("UCP.language." + group_name);
        if (storedLanguage) {
                this.options.language = storedLanguage;
        }
        // legacy labels
        var storedUseLegacyLabels = GM_getValue("UCP.useLegacyIcons." + group_name);
        this.options.useLegacyLabels = storedUseLegacyLabels == true || storedUseLegacyLabels == 'true';
        
	// photo number checking
	var storedCheckPhotoNumbering = GM_getValue("UCP.checkPhotoNumbering." + group_name);
	this.options.checkPhotoNumbering = storedCheckPhotoNumbering == true || storedCheckPhotoNumbering == 'true';
	
	var storedCheckPhotoNumberingGently = GM_getValue("UCP.checkPhotoNumberingGently." + group_name);
	this.options.checkPhotoNumberingGently = storedCheckPhotoNumberingGently == true || storedCheckPhotoNumberingGently == 'true';
    },
    groupConfig: function () {
        return this.options.groupConfig;
    },
    setStyle: function (ucpStyle) {
	if (ucpStyle !== this.ucpStyle()) {
            GM_setValue("UCP.ucpStyle." + this.groupConfig().groupname(), ucpStyle);
            this.options.ucpStyle = ucpStyle;
        }
    },
    setLanguage: function (language) {
        if (language !== this.language()) {
            GM_setValue("UCP.language." + this.groupConfig().groupname(), language);
            this.options.language = language;
        }
    },
    setUseLegacyLabels: function (useLegacyLabels) {
        if (useLegacyLabels !== this.useLegacyLabels()) {
            GM_setValue("UCP.useLegacyIcons." + this.groupConfig().groupname(), useLegacyLabels);
            this.options.useLegacyLabels = useLegacyLabels;
        }
    },
    setCheckPhotoNumbering: function (b) {
	if (b !== this.checkPhotoNumbering()) {
		GM_setValue("UCP.checkPhotoNumbering." + this.groupConfig().groupname(), b);
		this.options.checkPhotoNumbering = b;
	}
    },
    setCheckPhotoNumberingGently: function (b) {
	if (b !== this.checkPhotoNumberingGently()) {
		GM_setValue("UCP.checkPhotoNumberingGently." + this.groupConfig().groupname(), b);
		this.options.checkPhotoNumberingGently = b;
	}
    },
    // shortcuts
    useLegacyLabels: function () {
        return this.options.useLegacyLabels;
    },
    checkPhotoNumbering: function () {
	return this.options.checkPhotoNumbering;
    },
    checkPhotoNumberingGently: function () {
	return this.options.checkPhotoNumberingGently;
    },
    language: function() {
        return this.options.language;
    },
    ucpStyle: function () {
        return this.options.ucpStyle;
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
        if (!src.match(/static\.?flickr\.com/)) {
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
        if ($chk(global_group_config)) {
            if ($chk(global_group_config.nonPhotoImages()[src])) {
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
	messageId: null,
        poster: null,
        voteText: null,
        votesArray: [],
        messages: [],
        errorIdx: null,
        votedFor: []
    },
    initialize: function(options) {
	for (var key in options) {
		this.options[key] = options[key];
	}
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
        var votedForString = "";
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
        sorted.each(function (unsorted_vote) {
            retval = retval + (retval.length > 0 ? ", " : "") + unsorted_vote.photo + ":" + unsorted_vote.value;
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
    printStatus: function () {
        if (this.options.ucpThread.options.needsStatusOnChallengePage) {
            if ($chk(this.messages()) && this.messages().length > 0) {
		if ($chk(this.options.messageId)) { // the challenge announcement does not have an entry_id
			var pageAnchor = $$('td.Who a[name=comment' + this.options.messageId + ']')[0].getParent('tr').getElements('small').getLast();
		} else {
			if (!global_group_preferences.groupConfig().allowsPhotoInAnnouncement()) {
				GM_log("ERROR: found a photo entry without message id; skipping");
				return;
			}
			pageAnchor = $$('td.Who')[0].getParent('tr').getElements('small').getLast();
		}
                if ($chk(pageAnchor) && $chk(pageAnchor.getParent('div.ucpdiv'))) {
                    pageAnchor = pageAnchor.getParent('div.ucpdiv');
                }
                if (!$chk(pageAnchor)) {
                    pageAnchor = this.node();
                }
                
                var commentAnchor = new Element('small', {
                    html: "UCheckPlayNG: "
                }).inject(new Element('div', {
                    'class': 'ucpdiv'
                }).inject(pageAnchor, 'after'));
                this.messages().each(function (message, idx) {
                    var msg = (idx > 0 ? " - " : "") + message.msg;
                    var color = message.type === 'error' ? 'red' : message.type === 'warning' ? 'orange' : '';
                    commentAnchor.adopt(new Element('span', {
                        html: msg,
                        styles: {
                            color: color
                        }
                    }));
                });
            }
        }
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
            validRatings.sort(function(a,b){return a - b; });
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
        var votedForString = "";
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
        var votedForString = "";
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

function ucpCheckPhotoApproval(photo, topic) {
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

	var photoTextNode = photo;
	while ($chk(photoTextNode.getParent('div'))) {
		photoTextNode = photoTextNode.getParent('div');
	}
    var photoId = photo.get('src').match(/https?:\/\/.*flickr.com\/\d+\/(\d+)_.*/)[1];
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
        var goodPhotoChecksum = ucpUniversalHash(photo.src);
        if (goodPhotoChecksum !== parseInt(photoChecksum, 10)) {
            return { approved: false,
                     version: version,
                     checksum: true,
                     photoChecksum: false,
                     error: "photo has been changed after approval!",
                     photoId: photoId
            };
        }
        var goodChecksum = ucpUniversalHash(photoId + name + topic);
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
    }
    return { approved: false, error: "failed to process UCPA approved entry"};
}

function parseVerticalVote(data) {
    var replytxt = data.replytxt;
    var challengeEntry = data.challengeEntry;
    var messageId = data.messageId;
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
        var photoNumber, photoScore;
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
            votesArray: vVotesArray, 
            node: challengeEntry,
	    messageId: messageId,
            ucpThread: ucpThread
        });
        voidedVote.isVoid = function () {
            return true;
        };
        return voidedVote;
    }
    if (vVotesFound <= 1) { // voting for one photo makes no sense
    	return new UCPVoteComment({
    		poster: poster,
    		node: challengeEntry,
    		messageId: messageId,
    		ucpThread: ucpThread
    	});
    }
    var vote = new UCPVerticalVote({
    	chlgname: challengeConfig.reName(), 
    	poster: poster, 
    	voteText: vVoteLines, 
    	votesArray: vVotesArray, 
    	node: challengeEntry,
    	messageId: messageId,
    	ucpThread: ucpThread
    });
    if (exampleVote) {
    	vote.isExampleVote = function () {
    		return true;
    	};
    }
    return vote;
}

function parseHorizontalVote(data) {
    var ucpThread = data.ucpThread;
    var picType = ucpThread.challengeDefinition().scoreType().match('PIC-H');
    var exampleVote = data.exampleVote;
    var poster = data.poster;
    var challengeEntry = data.challengeEntry;
    var messageId = data.messageId;
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
        var matchVotes = ucpThread.reHorizontalVoteMatch().exec(replyLine);
        while (matchVotes) { // catches multiple votes (correction?) on one line
            horizontalVotes = matchVotes;
            matchVotes = ucpThread.reHorizontalVoteMatch().exec(replyLine);
        }
    });
    if (horizontalVotes) {
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
			    messageId: messageId,
                            ucpThread: ucpThread
                        }) :
                        new UCPHorizontalVote({
                            chlgname: ucpThread.challengeName(), 
                            poster: poster, 
                            voteText: horizontalVotes, 
                            votesArray: hVotesArray,
                            node: challengeEntry,
			    messageId: messageId,
                            ucpThread: ucpThread
                        });
        if (exampleVote) {
            retval.isExampleVote = function () {
                return true;
            };
        }
        return retval;
    }
    return new UCPVoteComment({
    	poster: poster,
    	node: challengeEntry,
    	messageId: messageId,
    	ucpThread: ucpThread
    });
}

function parseVerticalWeightedVote(data) {
    var ucpThread = data.ucpThread;
    var exampleVote = data.exampleVote;
    var poster = data.poster;
    var challengeEntry = data.challengeEntry;
    var messageId = data.messageId;
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
        var photoNumber, photoScore;
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
            voteText: vwVoteLines, 
            votesArray: vwVotesArray, 
            node: challengeEntry,
	    messageId: messageId,
            ucpThread: ucpThread
        });
        voidedWVote.isVoid = function () {
            return true;
        };
        return voidedWVote;
    }
    if (vwVotesFound <= 1) { // voting for one photo makes no sense
    	return new UCPVoteComment({
    		poster: poster,
    		node: challengeEntry,
    		messageId: messageId,
    		ucpThread: ucpThread
    	});
    }
    var vote = new UCPVerticalWeightedVote({
    	chlgname: challengeConfig.reName(), 
    	poster: poster, 
    	voteText: vwVoteLines, 
    	votesArray: vwVotesArray, 
    	node: challengeEntry,
    	messageId: messageId,
    	ucpThread: ucpThread
    });
    if (exampleVote) {
    	vote.isExampleVote = function () {
    		return true;
    	};
    }
    return vote;
}

function parseRatePhotoVote(data) {
    var ucpThread = data.ucpThread;
    var exampleVote = data.exampleVote;
    var poster = data.poster;
    var challengeEntry = data.challengeEntry;
    var messageId = data.messageId;
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
        var photoNumber, photoScore;
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
                    node: challengeEntry,
		    messageId: messageId,
                    ucpThread: ucpThread
                });
    }
    var vote = new UCPRatePhotoVote({
    	chlgname: challengeConfig.chlgname, 
    	poster: poster, 
    	voteText: rVoteLines, 
    	votesArray: rVotesArray, 
    	node: challengeEntry,
    	messageId: messageId,
    	ucpThread: ucpThread
    });
    if (exampleVote) {
    	vote.isExampleVote = function () {
    		return true;
    	};
    }
    return vote;
}

function parsePICVerticalVote(data) {
    var ucpThread = data.ucpThread;
    var exampleVote = data.exampleVote;
    var poster = data.poster;
    var challengeEntry = data.challengeEntry;
    var messageId = data.messageId;
    var replytxt = data.replytxt;
    var challengeConfig = ucpThread.challengeDefinition();
    var picX = data.picX;

    // scores are a single number, on separate lines
    var pvVotesArray = [];
    var pvVoteLines = replytxt.split(/\n\s*/);
    var pVotesFound = 0;
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
                       node: challengeEntry,
		       messageId: messageId,
                       ucpThread: ucpThread
                   });
    }
    //else { // picX defined
    if (pVotesFound < picX) {
    	return new UCPVoteComment({
    		poster: poster,
    		node: challengeEntry,
    		messageId: messageId,
    		ucpThread: ucpThread
    	});
    }
    var picVVote = new UCPPICVerticalVote({
    	chlgname: challengeConfig.reName(), 
    	poster: poster, 
    	voteText: pvVoteLines, 
    	votesArray: pvVotesArray, 
    	node: challengeEntry,
    	messageId: messageId,
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

//The challenger or competitor's photo in  one of the challenges.
var UCPCompetitor = new Class({
    //Implements: [Options],
    options: {
        node: null,
	messageId: null,
        photo: null,
        poster: null,
        owner: null,
        photoId: null,
	photoTitle: null,
	photoNumber: null,
        comments: [],
	approved: false,
	approvedBy: null,
        ucpThread: null
    },
    initialize: function (options) {
        //this.setOptions(options);  => hangs the Kanchenjunga challenge (cause: ucpThread)
	for (var key in options) {
		this.options[key] = options[key];
	}
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
    photo: function () {
        return this.options.photo;
    },
    poster: function () {
        return this.options.poster;
    },
    owner: function () {
        return this.options.owner;
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
    printStatus: function () {
        if (this.options.ucpThread.options.needsStatusOnChallengePage) {
		if ($chk(this.options.messageId)) { // the challenge announcement does not have an entry_id
			var pageAnchor = $$('td.Who a[name=comment' + this.options.messageId + ']')[0].getParent('tr').getElements('small').getLast();
		} else {
			if (!global_group_preferences.groupConfig().allowsPhotoInAnnouncement()) {
				GM_log("ERROR: found a photo entry without message id; skipping");
				return;
			}
			pageAnchor = $$('td.Who')[0].getParent('tr').getElements('small').getLast();
		}
            if ($chk(pageAnchor) && $chk(pageAnchor.getParent('div.ucpdiv'))) {
                pageAnchor = pageAnchor.getParent('div.ucpdiv');
            }
	    if (!$chk(pageAnchor)) {
		pageAnchor = this.node().getParent('td.Said').getElements('small').getLast();
	    }
            if (!$chk(pageAnchor)) {
                pageAnchor = this.options.node;
            }
            var message = "UCheckPlayNG: found a photo posted by <b>" + this.poster().username + "</b>";
            var commentAnchor = new Element('small', {
                html: message
            }).inject(new Element('div', {
                'class': 'ucpdiv'
            }).inject(pageAnchor, 'after'));
            this.options.comments.each(function (comment) {
                commentAnchor.adopt(
                    new Element('span', {
                        html: " - " + comment.msg,
                        styles: {
                            color: comment.type === 'comment' ? '':
                                   comment.type === 'warning' ? 'orange' :
                                   this.poster().admin ? 'orange' : 'red'
                        }
                    })
                );
            }, this);
        }
    },
    addError: function (error) {
        this.options.comments.include({ msg: error, type: 'error' });
    },
    addWarning: function (warning) {
        this.options.comments.include({ msg: warning, type: 'warning' });
    },
    addComment: function (comment) {
        this.options.comments.include({ msg: comment, type: 'comment' });
    }
});

function parsePICPlayerVote(data) {
    var ucpThread = data.ucpThread;
    //var exampleVote = data.exampleVote;
    var poster = data.poster;
    var challengeEntry = data.challengeEntry;
    var messageId = data.messageId;
    var replytxt = data.replytxt;
    var photoArray = data.photoArray;
    var challengeConfig = ucpThread.challengeDefinition();

    // used in MatchPoint (http://www.flickr.com/groups/matchpoint/discuss/)
    var ppVoteLines = replytxt.split(/\n\s*/);
    var player;
    var ppVote = undefined;
    ppVoteLines.each(function (ppVoteLine, l) {
    	// TODO: add new variable to challengeDefinition: voteWithBuddyIcon
        // (remove buddyicons first: contains @)
        ppVoteLine = ppVoteLine.replace(/<img[^>]+>/g, '');
        // ignore lines that are comment text
        if (!ppVoteLine.match(/@|#|p(oi)?nt/i)) {
            return;
        }
        // remove any leading spaces
        ppVoteLine = ppVoteLine.replace(/^\s*/, '');
        // remove html, which does not fit in a username
        ppVoteLine = ppVoteLine.replace(/[@#](\s*[^<]*)/, '@ $1');
        var picPVoteMatch = /(\d+)[^\d]*[@#]\s*([^<]*)/.exec(ppVoteLine);
        if (!picPVoteMatch) {
            picPVoteMatch = ppVoteLine.match(/(?:point|pnt)[^\d]*(\d+)[^@#]*[@#]\s*([^<]*)/i);
        }
        var ppVotesArray = []; //[challengeConfig.options.neededPhotos + 1];
        if (picPVoteMatch) {
            var score  = picPVoteMatch[1];
            player = picPVoteMatch[2];
            // cleanup player
            player = player.replace(/\)/g, ''); // smiley's !!
            player = player.replace(/<[^>]*>/g, '').replace(/\s*$/, '');
            player = player.replace(/&nbsp;/g, ' ');
            // remove insignificant characters at the end of the player entry
            player = player.replace(/(?:\.|\!|\s)+$/, '');
            // compensate for spaces, and underscores in usernames, or the lack of them
            player = player.replace(/(?:_|\s)+/g, '');
            // people tend to mistype usernames with numbers
            if (player.replace(/\d/g, '').length > 0 ) {
                player = player.replace(/\d/g, '');
            }
            photoArray.each(function (photo, ppPhotoIdx) {
                var photo = photoArray[ppPhotoIdx];
                if (!(photo instanceof UCPCompetitor)) {
                    return;
                }
                var challenger = photo.poster().username.replace(/(?:_|\s|\))+/g, '');
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
                        ppVote = new UCPPICPlayerVote({
                                    chlgname: challengeConfig.reName(), 
                                    poster: poster,
                                    voteText: ppVoteLines, 
                                    votesArray: ppVotesArray, 
                                    node: challengeEntry,
				    messageId: messageId,
                                    ucpThread: ucpThread
                                });
                    return;
                }
        try {
                if (photo && challenger.toLowerCase().match(player.toLowerCase())) {
                    ppVotesArray[ppPhotoIdx + 1] = 1; // parseInt(score, 10);
                        ppVote = new UCPPICPlayerVote({
                                    chlgname: challengeConfig.reName(), 
                                    poster: poster, 
                                    voteText: ppVoteLines, 
                                    votesArray: ppVotesArray, 
                                    node: challengeEntry,
				    messageId: messageId,
                                    ucpThread: ucpThread
                                });
                }
} catch (e) {
    GM_log("error: " + e);
        GM_log("challenger='" + challenger + "' - player='" + player + "'");
}
            });
        }
    });
    if (!ppVote) {
        ppVote = new UCPVoteComment({
                        poster: poster,
                        node: challengeEntry,
			messageId: messageId,
                        ucpThread: ucpThread
                    });
    }
    return ppVote;
}

var global_user_nsid = GM_getGlobalNsid();
var global_group_adminOrMod = false;

function ucpCreateCompetitor(data) {
	var messageId = data.messageId;
	var photoNode = data.node;
	var poster = data.poster;
	var photoNumber = data.number;
	var ucpThread = data.ucpThread;
	var _debug = data.debug;

    var ownerId;
    var photoId = photoNode.get('src').match(/https?:\/\/.*flickr.com\/\d+\/(\d+)_.*/)[1];
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
	var topNode = photoNode;
	while ($chk(topNode.getParent('div'))) {
		topNode = topNode.getParent('div');
	}
        var approvalImg = topNode.getElement('img[alt*="UCPAapproved"]');
        if (approvalImg && ucpThread.topic()) {
            var approvalCheck = ucpCheckPhotoApproval(photoNode, ucpThread.topic());
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
            var comment;
            if (approvalCheck.approved) {
                comment = { msg: " approved by " + approvalCheck.approver, type: 'comment' };
                return new UCPCompetitor({
                    node: topNode,
		    messageId: messageId,
                    photo: photoNode,
                    photoId: photoId,
		    photoTitle: photoTitle,
		    photoNumber: photoNumber,
                    comments: [ comment ],
                    poster: poster,
                    owner: owner,
		    approved: true,
		    approvedBy: approvalCheck.approver,
                    ucpThread: ucpThread
                });
            } else if (approvalCheck.ignored) {
                comment = { msg: "non competing image (by " + approvalCheck.approver + ")", type: 'comment' };
                return new UCPVoteComment({
                    node: topNode,
		    messageId: messageId,
                    poster: poster,
                    comments: [ comment ],
                    ucpThread: ucpThread
                });
            } else {
                var competitor = new UCPCompetitor({
                    node: topNode,
		    messageId: messageId,
                    photo: photoNode,
                    photoId: photoId,
		    photoTitle: photoTitle,
		    photoNumber: photoNumber,
                    poster: poster,
                    owner: owner,
		    approved: true,
                    approvedBy: approvalCheck.approver,
                    ucpThread: ucpThread
                });
			if (global_group_adminOrMod) {
				competitor.addError(approvalCheck.error);
				ucpThread.addVotingError(approvalCheck.error);
			}
		return competitor;
            }
        }
        var comp = new UCPCompetitor({
        	node: topNode,
        	messageId: messageId,
        	photo: photoNode,
        	photoId: photoId,
        	photoTitle: photoTitle,
        	photoNumber: photoNumber,
        	poster: poster,
        	owner: owner,
        	ucpThread: ucpThread,
        	debug: _debug
        });
        return comp;
    }
    comment = { msg: "photo has no link to photo page", type: 'error' };
    var competitor = new UCPCompetitor({
    	node: topNode,
    	messageId: messageId,
    	photo: photoNode,
    	photoId: photoId,
    	photoTitle: photoTitle,
    	photoNumber: photoNumber,
    	poster: poster,
    	comments: [ comment ],
    	ucpThread: ucpThread
    });
    	if (global_group_adminOrMod) {
    		competitor.addError(comment);
    		ucpThread.addVotingError(comment.msg);
    	}
    return competitor;
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
		//GM_log("DEBUG: storedClock='" + oldFlickrClock.toUTCString() + "' - lastCheck='" + flickrClockLastCheck.toUTCString() + "' - elapsed='" + timeElapsed + "' - estimated='" + estimatedFlickrClock.toUTCString() + "'");
		return estimatedFlickrClock;
	}
	return undefined;
}

// defaults
var username = GM_getLoggedInUser();
//var username = "Little_Debbie"; DEBUG
var playernumber = 0; // keep it global! passing it along as a member of groupConfig seems not to work
var global_ucp_language = null;
var global_groupname = null;
            var reGroupnameMatch = /.*flickr.com\/groups\/([^\/]*)\//;
            if (document.location.href.match(reGroupnameMatch)) {
                global_groupname = reGroupnameMatch.exec(document.location.href)[1]; // needed for version check
            }
var debug = false;

var ucpGroupConfigReader = new UCPGroupConfigReader();
var ucpLanguageConfigReader = null;
var topicListingTable = null;
    
function initialize(callback) {
    if (!$chk(username) || username === "") {
        GM_log("Sign in to your Flickr account if you want to take part in challenges in this group");
	callback({ success: false, message: "not logged in" });
        return;
    }

    try {
	topicListingTable = document.getElement('ul.topic-list');
    } catch (e) {
    }

	var FSM = new Element('div', { 
		id: 'UCP_FSM',
		'class': 'UCP_hidden_from_view'
	}).inject($$('body')[0]);
	FSM.adopt( new Element('div', { html: "UCheckPlay progress: " }));
	FSM.adopt(
		new Element('div', {
			id: 'UCP_FSM_groupconfig',
			events: {
				'groupconfig': function (evt) {
					$('UCP_FSM_groupconfig_img').set('src', images.updating);
					$('UCP_FSM_groupconfig_img').set('title', 'updating');
				    try {
					var group_name = reGroupnameMatch.exec(document.location.href)[1];
					ucpGroupConfigReader.createGroupConfig(group_name, function (retval) {
						$('UCP_FSM_groupconfig_img').set('title', 'done');
						if (!retval.success) {
							$('UCP_FSM_groupconfig_img').set('src', images.error);
							$('UCP_FSM_groupconfig_txt').set('html', "error creating group config: " + retval.message);
							callback({ success: false, message: "error creating group config: " + retval.message });
							return;
						}
						$('UCP_FSM_groupconfig_img').set('src', images.defaultCheck);
						global_group_config = retval.groupConfig;
						if (!$chk(global_group_config)) {
							GM_log("unsupported group; aborting");
							$('UCP_FSM_groupconfig_img').set('src', images.error);
							$('UCP_FSM_groupconfig_txt').set('html', "unsupported group");
							callback({ success: false, message: "unsupported group" });
							return;
						}
    						global_group_preferences = new UCPGroupPreferences({groupConfig: global_group_config});
						$('UCP_FSM_flickrclock').fireEvent('calculateclock');
					});
				    } catch (e) {
					GM_log("unsupported group; aborting (" + e + ")");
					$('UCP_FSM_groupconfig_img').set('src', images.error);
					$('UCP_FSM_groupconfig_img').set('title', 'error');
					$('UCP_FSM_groupconfig_txt').set('html', "unsupported group (" + e + ")");
					callback({ success: false, message: "unsupported group (" + e + ")" });
					return;
				    }
				}
			}
		}).adopt(
			new Element('img', { id: 'UCP_FSM_groupconfig_img', src: images.queued, title: 'queued' }),
			new Element('span',{ id: 'UCP_FSM_groupconfig_txt', html: 'read group configuration' })
		),
		new Element('div', {
			id: 'UCP_FSM_flickrclock',
			events: {
				'calculateclock': function (evt) {
					$('UCP_FSM_flickrclock_img').set('src', images.updating);
					$('UCP_FSM_flickrclock_img').set('title', 'updating');
					if (global_group_config.usesTimeConstraints() || global_group_config.hasTimeConstrainedChallenges()) {
					    try {
						updateClock(function (retval) {
							$('UCP_FSM_flickrclock_img').set('src', images.defaultCheck);
							$('UCP_FSM_flickrclock_img').set('title', 'done');
							if (!retval.success) {
								GM_log("failed reading the Flickr clock: " + retval.message);
								// ignore this error, and continue
								$('UCP_FSM_flickrclock_img').set('src', images.error);
								$('UCP_FSM_flickrclock_img').set('title', 'error');
								$('UCP_FSM_flickrclock_txt').set('html', "failed reading the Flickr clock: " + retval.messag);
							}
							GM_log("DEBUG: Flickr clock is '" + calculateFlickrClock() + "'");
							$('UCP_FSM_language').fireEvent('readlanguage');
						});
					    } catch (e) {
						GM_log("Exception: " + e);
						$('UCP_FSM_flickrclock_img').set('src', images.error);
						$('UCP_FSM_flickrclock_img').set('title', 'done');
						$('UCP_FSM_language').fireEvent('readlanguage');
					    }
					} else {
						$('UCP_FSM_flickrclock_img').set('src', images.defaultCheck);
						$('UCP_FSM_flickrclock_img').set('title', 'done');
						$('UCP_FSM_language').fireEvent('readlanguage');
					}
				}
			}
		}).adopt(
			new Element('img', { id: 'UCP_FSM_flickrclock_img', src: images.queued, title: 'queued' }),
			new Element('span',{ id: 'UCP_FSM_flickrclock_txt', html: 'read Flickr clock' })
		),
		new Element('div', {
			id: 'UCP_FSM_language',
			events: {
				'readlanguage': function (evt) {
					$('UCP_FSM_language_img').set('src', images.updating);
					$('UCP_FSM_language_img').set('title', 'updating');
					ucpLanguageConfigReader = new UCPLanguageConfigReader();
					ucpLanguageConfigReader.createLanguage({ languagename: global_group_preferences.language(), 
						legacyLabels: global_group_config.hasLegacyLabels() && (global_group_preferences.useLegacyLabels() || global_group_config.mandatoryGroupLabels()) ? 
						    global_group_config.legacyLabels() : undefined,
						languageOverrides: global_group_config.languageOverrides(),
						callback: function(retval) {
							global_ucp_language = retval.language;
							$('UCP_FSM_language_img').set('src', retval.success ? images.defaultCheck : images.error);
							$('UCP_FSM_language_img').set('title', retval.success ? 'done' : retval.message);
							$('UCP_FSM_adminormod').fireEvent('adminormod');
						}
					});
					ucpLanguageConfigReader.checkForUpdates(global_group_preferences.language(), function() {});
				}
			}
		}).adopt(
			new Element('img', { id: 'UCP_FSM_language_img', src: images.queued, title: 'queued' }),
			new Element('span',{ id: 'UCP_FSM_language_txt', html: 'read language' })
		),
		new Element('div', {
			id: 'UCP_FSM_adminormod',
			events: {
				'adminormod': function (evt) {
					$('UCP_FSM_adminormod_img').set('src', images.updating);
					$('UCP_FSM_adminormod_img').set('title', 'updating');
					fetchGroupAdministratorOrModerator(global_user_nsid, function (retval) {
						if (!retval.success) {
							$('UCP_FSM_adminormod_img').set('src', images.error);
							$('UCP_FSM_adminormod_img').set('title', 'error');
							GM_log("error fetching member status: " + retval.message);
						} else {
							$('UCP_FSM_adminormod_img').set('src', images.defaultCheck);
							$('UCP_FSM_adminormod_img').set('title', 'done');
							global_group_adminOrMod = retval.adminOrMod;
						}
						callback({ success: true }); // run as a non-administrator, then
					});
				}
			}
		}).adopt(
			new Element('img', { id: 'UCP_FSM_adminormod_img', src: images.queued, title: 'queued' }),
			new Element('span',{ id: 'UCP_FSM_adminormod_txt', html: 'check for admod rights' })
		)
	);
    
	$('UCP_FSM_groupconfig').fireEvent('groupconfig');

}

    // if you copy any of this source, please use your own flick api_key
    // you can easily generate one on http://www.flickr.com/services/apps/create/

var images = {
	download: 'data:image/png;base64,' +
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
	updating: 'data:image/gif;base64,' +
	    'R0lGODlhIAAPAPMAAABj3MTb9+nx/DWD4////2Se6ZS+8P+l0/9dsf/e7/8AhPsvnKYppkpMxQAA' +
	    'AAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAAACwAAAAAIAAPAEAEPpDISau9uCbFu0dZKB3e' +
	    'J55EgiwKcqCouiwunG2laVdkriy7oHAY7HkWCaKE5VO8hrgmiMj0JZXGDlDJJUQAACH5BAUKAAQA' +
	    'LAgAAgAOAAsAAAQ2kMiE1mKtGMmP+qACDILkhSAzSgsaNkCQuKFazPRn47lNtDlYgHByqQYdY4PE' +
	    'IVBaDMZgI4kAACH5BAUKAAQALAYAAgASAAsAAARDkMiE1kInlDGKkeChjCTTACgwCJJIvkyKDtLy' +
	    '3qccJPcdywVeryQDBIdEIMGGzKUCBFfvl6K1pk4VC0SxYTQD40cSAQAh+QQFCgAOACwEAAIAFgAL' +
	    'AAAETpDIhNZCR8pQxiiGJh1KaS4JYQBsOwijKStL0N7AIC2z3OC3QKInYwBbhSGxZDwCkkum80ng' +
	    'LX/OAIFERNiOutgMpQK+RBQeRsQZPEOSCAAh+QQFCgAMACwDAAIAGAALAAAEU5DIhNZCR2oSyhiF' +
	    'sRGHYp5LohlA6w6CVJ40IgVuDgzSQv+ZgS4XSPx+CMEwVzAeT8mlq/mEKqWAAsFXVQmlAVJ1cZPy' +
	    'ZEfyagjbUHyYEceTFUkiACH5BAUKAA0ALAMAAgAYAAsAAARQkEiS0FroTBLKGIWxTYdinktCGEDr' +
	    'DsJWnvQSuDgwbAvtDzlcQJLw+YK4AtF4YiBdSgrz9GxFCb0p8DmUzIy2504GlrBysBHFoshsOsDQ' +
	    'JgIAIfkEBQoADgAsBAACABYACwAABEqQSJnQWuiEMkYxUygdSlkyQKoOgkiQpoKq9OAusdLQfBAm' +
	    'OQWPV/jlZsNUcQLMJVXLCS62e/pCMBOSZ3NlT0OWi2JRZDYDwEcUAQAh+QQFCgAKACwGAAIAEgAL' +
	    'AAAEO5BImdBqDRQzuzwKA4zkIHgEKJLsgC5KxrJBlyjKPBd2qLO8yS33GwUnMNmv1lEVXSjnzISi' +
	    'WDAaTicCACH5BAUKAAcALAgAAgAOAAsAAAMrSEpRM8WsaYC9Q8xwOxjT4HWBIoxdoXCopRJnC7yE' +
	    '2JZrC1JjNq2OmWSRAAAh+QQFCgAEACwIAAIADgALAAAENJDIUMZoDB3JDfhgoyzCBJ6AuEgDejJK' +
	    'IrivggR0aM85ACOEVg6WIOBoqo4ryTFWUpmNJAIAIfkEBQoABAAsBgACABIACwAABEGQyFDGKCah' +
	    'tdCRoAGMZKOc55JMZAuYqIJIg9sysXII9p0jgV7pxxMCcLFZTYhErYI9GGoRsklToEkFgNEsZB9J' +
	    'BAAh+QQFCgAOACwEAAIAFgALAAAETZDIUMYoRsqE1kKHJhlAaQ4CcShsuySTKQPD2t6INMwyc/8H' +
	    'Aa/3wwWGpkaxhRAiAb6lIrdDRpew47BgKy40pBlK5RURKDuMiLOYhiQRACH5BAUKAAwALAMAAgAZ' +
	    'AAsAAARXkMhQxihGapnQWsixEQZgnoOwHUrrLsl0zsCgsW6OSAM9B5JFbngQ+GYFQmI4RASOp+SS' +
	    '6UIYoQAptUroQYEE4Tb2PNokOOZCU6KlVuoRpYcZcTyKkCYCACH5BAUKAAwALAMAAgAZAAsAAARV' +
	    'kEgSyhjFTJnQWsixTQZgnoMgHUrrLskWnDQwEKyrI9tQ04GFbigiCH60wnDIoyBPyqWreXwColJF' +
	    'k+B7BrOKmGSGvOWWi1GpllqhR2PLVbPpCEObCAAh+QQFCgAOACwEAAIAFwALAAAETZBIGcoYxZCE' +
	    '1kLHJEoGYJ6Moq5LMhLBeTZrrSDvIJupvYYTwc7kq+EmsR2tqDpKhENmc6TbSRUuUVK29C1ehNKu' +
	    'V/uCYRZAZtO5AScRACH5BAUKAAAALAYAAgATAAsAAAQ/kEgZyhhsLXSmlwYANEppLslHBCJpvog6' +
	    'iG+tdJMgAjbssaOeKZbbCUvEyYx3TP1awoWKEArWpNOVpZFRcD4RACH5BAUKAAAALAgAAgAPAAsA' +
	    'AAQ1kEgSCgP4zG2a+uCSbIEHnsg2MGerEQLQtillzl8d42BNDLzPSFLiLTaEzuyIJCQsrMVLEgEA' +
	    'Ow==',
	defaultCheck: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAMAAADkSAzAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ' +
	    'bWFnZVJlYWR5ccllPAAAAEJQTFRFmZmZnp6e5ubmysrKv7+/srKy8vLyx8fH29vbr6+v7+/vqamp' +
	    '9/f3pqam09PT6urq19fXbZAzm75KS20pi7A1////DDptmwAAABZ0Uk5T////////////////////' +
	    '////////AAHSwOQAAACJSURBVHjadNDZEsMgCAVQzNIlXVK55P9/NcHS1AV5YEaOw+ilzS1AO/kW' +
	    'I3qIKCLwMZkqdc3Fv7WYWYO51VhYhaV9EXAtIeyIyIUpgpl10NiBEFaNtjKzE9OFytJa6Zg9yDf7' +
	    'irhmIUA8+yUEz8744NhGy/AZp/kRADoqhNd9nq7j+zasl+cuwAA9di+cGoSjKwAAAABJRU5ErkJg' +
	    'gg==',
	error: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAGFBMVEX///+ZMjJ5LCfpkpLggoHT' +
	    'TU3bbGzsoaGzNw46AAAAAXRSTlMAQObYZgAAAGRJREFUeF4ti0EKAjEQBCsi5AGKXvMEYfyAEPa8' +
	    'CH0Xwf6A2f87YT0UFNU0XNkpcaP4Bae4c7HgG/1hq1GjL/48gZGSAWq3Z6DksgKcUzRDLtL6DxKM' +
	    'xW2TGke/qZo3N9gSDjs/3YkWV7tI5dMAAAAASUVORK5CYII=',
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
	    'RK5CYII='
    };

    function toggleGroupList() {
        var groupListDialog = $("UCPNGSupportedGroupListDiv");
        if (groupListDialog) {
            groupListDialog.dispose();
        } else {
            var table = new Element('table', {
                styles: {
                    border: '0',
                    cellPadding: '5',
                    cellSpacing: '0'
                }
            });
            var rowIndex = 0;
            var row = null;
            ucpGroupConfigReader.groupList(function(retval) {
		if (!retval.success) {
			new Element('div', {
				html: retval.message
			}).inject(groupListDialog);
			return;
		}
		var groupList = retval.groupList;
		var groupArray = [];
		$each(groupList, function(group, it_groupname) {
			if (!$chk(group.hideFromSupportedGroups) || (group.hideFromSupportedGroups !== true && group.hideFromSupportedGroups !== 'true')) {
				group.groupname = it_groupname;
				groupArray.include(group);
			}
		});
		var nonActive = false;
		groupArray.sort(function(groupA, groupB) {
			if ($chk(groupA.activity) && $chk(groupB.activity)) {
				return 0;
			}
			if ($chk(groupA.activity)) {
				return 1;
			}
			if ($chk(groupB.activity)) {
				return -1;
			}
			return groupB.name.replace(/^[\*\s\¡:]*/g, '').toLowerCase() > groupA.name.replace(/^[\*\s\¡:]*/g, '').toLowerCase() ? -1 : 1;
		}).each(function (group) {
			if (!nonActive && $chk(group.activity)) { // starting with the abandoned and deleted ones
				nonActive = true;
				rowIndex = 0;
				row = new Element('tr').inject(table);
				var cell = new Element('th', { 
					colspan: 3,
					events: {
						click: function () {
							var nonActiveRows = $$('tr.UCP_non_active_row');
							var hidden = nonActiveRows.some(function (row) {
								return row.hasClass('UCP_hidden_from_view');
							});
							if (hidden) {
								nonActiveRows.removeClass('UCP_hidden_from_view');
							} else {
								nonActiveRows.addClass('UCP_hidden_from_view');
							}
						}
					}
				}).inject(row);
				cell.adopt(
					new Element('img', { src: images.download, styles: { 'max-height': '10px' } }),
					new Element('span', { html: '(temporarily) abandonded and deleted groups', styles: { 'margin-left': '12px' } })
				);
			}
			if (rowIndex % 3 === 0) {
				row = new Element('tr', { 'class': nonActive ? 'UCP_hidden_from_view UCP_non_active_row' : '' }).inject(table);
			} else {
				new Element('td', {
				    html: "&nbsp;",
				    styles: {
					borderRight: 'solid grey 1px'
				    }
				}).inject(row);
			}
			rowIndex++;
			new Element('a', {
				href: "http://www.flickr.com/groups/" + group.groupname + "/discuss/",
				html: group.name,
				title: $chk(group.activity) ? group.activity : group.name,
				styles: {
					'text-decoration': group.activity == 'abandoned' || group.activity == 'deleted' ? 'line-through' : 'none',
					color: group.activity == 'deleted' ? 'brown' : ''
				}
			}).inject(new Element('td').inject(row));
		    });
	    });

            new Element('button', {
                type: 'submit',
                html: 'Close',
                'class': 'CancelButt',
                events: {
                    click: toggleGroupList
                }
            }).inject(new Element('td', {
                colSpan: '8',
                align: 'right'
            }).inject(new Element('tr').inject(table)));

            var dialogDiv = new Element('div', {
                'id': "UCPNGSupportedGroupListDiv",
                styles: ucpDialogStyle
            }).adopt(table);
            $('UCheckPlayNGPreferences').getParent().adopt(dialogDiv);
        }
    }

    function togglePreferencesDialog() {
        var configDialog = $("UCPNGConfigDialogDiv");
        if (configDialog) {
            configDialog.destroy();
        } else {
            new Element('div', {
                id: "UCPNGConfigDialogDiv",
                styles: ucpDialogStyle
            }).inject($("UCheckPlayNGPreferences").getParent()).adopt(
            table = new Element('table', {
                border: '0',
                cellPadding: '5',
                cellSpacing: '0'
            }));
            // title
	    var headerRow = new Element('tr').inject(table);
	    var donationCell = new Element('td').inject(headerRow);
            headerRow.adopt(header = new Element('td', { colspan: '2', width: '100%' }));
		new Element('span', {
                        title: 'consider a donation',
                        html: 'donate:',
                        styles: {
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
                ).inject(donationCell);
		new Element('label', {
			id: 'UCP.preferences_title',
			html: 'UNIFIED CheckPlay - Preferences for this group',
			styles: {
				fontWeight: 'bold',
				//width: (table.getStyle('maxWidth').match(/(\d+)/)[1] - 50) + 'px',
				'float': 'center',
				margin: 'auto'
			},
			events: {
				'version': function(evt) {
					this.set('html', 'UNIFIED CheckPlay v' + evt.version + ' - Preferences for this group');
				}
			}
		}).inject(header);
		getVersion('UCP.preferences_title', 'version');
		new Element('a', {
			html: 'help',
                        href: 'http://www.flickr.com/groups/1307178@N20/discuss/72157623600133810/#comment72157623475618601',
			title: 'opens in new tab',
			target: '_blank',
			styles: {
				'float': 'right'
			}
		}).inject(header);
            // style
            new Element('tr').inject(table).adopt(
                new Element('th', {
                    colSpan: '3',
                    noWrap: 'nowrap',
                    vAling: 'top',
                    html: "Display:",
                    styles: {
                        background: '#CFCFCF'
                    }
                }));

            new Element('tr', { valign: 'top' }).inject(table).adopt(
                new Element('td', {
                    noWrap: 'nowrap',
                    vAling: 'top'
                }).adopt(
                    new Element('input', {
                        type: 'checkbox',
                        id: 'ucpstyleRadio',
                        checked: global_group_preferences.ucpStyle(),
                        events: {
			    change: function (evt) {
				if ($('ucpstyleRadio').checked) {
					topicListingTable.getElements('span.New').addClass('UCP_hidden_from_view');
					topicListingTable.getElements('li').addClass('UCP_row_hover');
					global_group_preferences.setStyle(true);
				} else {
					topicListingTable.getElements('span.New').removeClass('UCP_hidden_from_view');
					topicListingTable.getElements('li').removeClass('UCP_row_hover');
					global_group_preferences.setStyle(false);
				}
                             }
                        }
                    }),
                    new Element('label', {
                        'for': "ucpstyleRadio",
                        html: "UCP style"
                    })),
                new Element('td', {
                    styles: {
                        fontStyle: 'italic'
                    },
                    html: "Unified CheckPlay style:"
                }).adopt(
                    new Element('p', {
			html: "UCheckPlay no longer provides customization of the Discuss page layout. There is a nice UserStyle created by 'loupiote (Old Skool)' that will compact the Discuss list to resemble the old style.<br>" +
				"It can be installed using Stylish, or it can be installed as a Greasemonkey (Firefox), or Tampermonkey(Chrome) user script.<br>" +
				"Install it from <a href='http://userstyles.org/styles/90360/flickr-show-group-discussions-in-compact-format?r=1375322249'>http://userstyles.org/styles/90360/flickr-show-group-discussions-in-compact-format?r=1375322249</a>.<br><br>" +
				"Selecting this option will only remove the 'New' labels, and color the row under your mouse."
		    }),
                    new Element('br'),
                    new Element('input', {
                        type: 'checkbox',
                        id: 'ucpStyleRemoveNew',
                        checked: true,
                        disabled: true
                    }),
                    new Element('label', {
                        'for': "ucpStyleRemoveNew",
                        html: "remove 'NEW' labels",
                        styles: {
                            color: 'grey'
                        }
                    }),
                    new Element('br'),
                    new Element('input', {
                        type: 'checkbox',
                        id: 'ucpStyleColorizeOnHover',
                        checked: true,
                        disabled: true
                    }),
                    new Element('label', {
                        'for': "ucpStyleColorizeOnHover",
                        html: "highlight on mouse hover",
                        styles: {
                            color: 'grey'
                        }
                    }),
                    new Element('br'),
		    new Element('span', { html: '&nbsp;' })
                )
            );
	    // check photo numbering
	    new Element('tr', { valign: 'top' }).inject(table).adopt(
		new Element('td', {
                    noWrap: 'nowrap',
                    vAling: 'top'
                }).adopt(
                    new Element('input', {
			type: 'checkbox',
			id: 'ucp_checkNumbering',
			checked: global_group_preferences.checkPhotoNumbering(),
			events: {
				click: function (evt) {
					$('ucp_checkNumberingGently').set('disabled', !this.checked);
					$('ucp_checkNumberingGentlyLabel').setStyle('color', this.checked ? '' : 'grey');
					global_group_preferences.setCheckPhotoNumbering($('ucp_checkNumbering').checked);
					$$('.UCP_status_column').dispose();
					processTopicListingTable(topicListingTable);
				}
			}
		    }),
		    new Element('label', {
			'for': 'ucp_checkNumbering',
			html: 'check numbers'
		    })
		),
		new Element('td', {
        	        styles: {
                	        fontStyle: 'italic'
                        }
		}).adopt(
			new Element('label', {
				html: 'Check the numbering of entered photos (if applicable). When set, the script will check if the numbering' +
					' on the photos is correct. It will perform this check'
			}),
			new Element('div', { html: '&bull; for challenges with at least 4 photos' }),
			new Element('div', { html: '&bull; of which at least 2 have a number set' }),
			new Element('br'),
			new Element('p'),
			new Element('input', {
				type: 'checkbox',
				id: 'ucp_checkNumberingGently',
				disabled: !global_group_preferences.checkPhotoNumbering(),
				checked: global_group_preferences.checkPhotoNumberingGently(),
				events: {
					click: function (evt) {
						global_group_preferences.setCheckPhotoNumberingGently($('ucp_checkNumberingGently').checked);
					}
				}
			}),
			new Element('label', {
				'for': 'ucp_checkNumberingGently',
				id: 'ucp_checkNumberingGentlyLabel',
				html: 'be forgiving: allow for missing number on first, and last entry',
	                        styles: {
        	                    color: !global_group_preferences.checkPhotoNumbering() ? 'grey' : ''
                	        }
			})
		)
	    );
            // language
            new Element('tr').inject(table).adopt(
                new Element('th', {
                    colSpan: '3',
                    noWrap: 'nowrap',
                    vAling: 'top',
                    html: "Language:",
                    styles: {
                        background: '#CFCFCF'
                    }
                }));
            new Element('tr').inject(table).adopt(
                new Element('td').adopt(
                    languageSelect = new Element('select', {
                        styles: {
                            background: '#F0F0F0'
                        },
                        disabled: global_group_preferences.useLegacyLabels(),
                        title: 'UCP language: select your preferred language for UCP feedback',
                        id: 'languageSelect',
			events: {
				change: function (evt) {
					global_group_preferences.setLanguage($('languageSelect').value);
				}
			}
                    })),
                new Element('td', {
                    styles: {
                        fontStyle: 'italic'
                    },
                    html: "Language for titles, and labels."
                })
            );
	    new Element('tr').inject(table).adopt(new Element('td', { colspan: 2, styles: { position: 'relative', left: '100px' }, html: '<i>(needs page reload to take effect)</i><br>&nbsp;' }));
            ucpLanguageConfigReader.getLanguageList(function(retval) {
		if (!retval.success) {
			new Element('div', {
				html: retval.message,
				styles: {
					color: 'red'
				}
			}).replaces('languageSelect');
			return;
		}
		var languages = retval.languageList;
            	$each(languages, function (definition, language) {
                    new Element('option', {
                        value: language,
                        selected: global_group_preferences.language() === language,
                        disabled: definition === undefined || definition === null,
                        title:  (definition === undefined || definition === null ? 
                            'Not implemented yet. Maybe you can help us out?' : 
                            language),
                        html: language
                    }).inject($('languageSelect'));
                });
	    });
            // legacy labels
            if (global_group_config.hasLegacyLabels() && !global_group_config.mandatoryGroupLabels()) {
                new Element('tr').inject(table).adopt(
                    new Element('th', {
                        colSpan: '3',
                        html: "Legacy status icons:",
                        styles: {
                            background: '#CFCFCF'
                        }
                    }));
                new Element('tr', { valign: 'top' }).inject(table).adopt(
                    new Element('td', {
                        noWrap: 'nowrap'
                    }).adopt(
                        new Element('input', {
                            type: 'checkbox',
                            name: 'legacyicons',
                            id: 'legacyCheckId',
                            checked: global_group_preferences.useLegacyLabels(),
			    events: {
				click: function (evt) {
					// legacy lables are read when reading the group config: only on page load
					global_group_preferences.setUseLegacyLabels($('legacyCheckId').checked);
					$('languageSelect').set('disabled', $('legacyCheckId').checked);
				}
			    }
                        }),
                        new Element('label', {
                            'for': 'legacyCheckId',
                            html: 'Use legacy status icons',
			    styles: {
				'margin-right': '16px'
			    }
                        })),
                    new Element('td', {
                        styles: {
                            fontStyle: 'italic'
                        },
                        html: "Use the same status icons as the legacy CheckPlay script for this group"
                    }));
	    	new Element('tr').inject(table).adopt(new Element('td', { colspan: 2, styles: { position: 'relative', left: '100px' }, html: '<i>(needs page reload to take effect)</i><br>&nbsp;' }));
            }
            
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
			src: images.download,
                        id: 'languageReload',
			title: 'click to update the script\'s language definitions',
			styles: {
				height: '12px',
				cursor: 'pointer'
			},
			events: {
				click: function (evt) {
					this.set('src', images.updating);
					GM_deleteValue(UCPprefix + ".languageConfig." + global_group_preferences.language()); // force an update
                                    	ucpLanguageConfigReader.checkForUpdates(global_group_preferences.language(), function (result) {
	                                        $('languageReload').set('src', result.success ? images.defaultCheck : images.error);
        	                                $('languageReload').set('title', result.success ? 'updated' : result.message);
						$('languageReloadLabel').set('title', result.success ? 'updated' : result.message);
                	                    });
				}
			}
                    }),
                    new Element('label', {
                        html: '&nbsp;language&nbsp;definitions',
			id: 'languageReloadLabel',
			title: 'click to update the script\'s language definitions',
			styles: {
				cursor: 'pointer',
				'margin-right': '16px'
			},
			events: {
				click: function (evt) {
					$('languageReload').fireEvent('click');
				}
			}
                    })
                ),
                new Element('td', {
                    styles: {
                        fontStyle: 'italic'
                    },
                    html: "The definitions for the language translations are updated once a month. With this option, you " +
                          "can update them now."
                })
            );
            new Element('tr').inject(table).adopt(
                new Element('td', { noWrap: 'nowrap' }).adopt(
                    new Element('img', {
			src: images.download,
                        id: 'ucp_groupReload',
			title: 'click to update the group\'s challenge definitions',
			styles: {
				height: '12px',
				cursor: 'pointer'
			},
			events: {
				click: function (evt) {
					this.set('src', images.updating);
					GM_deleteValue(UCPprefix + ".groupConfig." + global_groupname); // force an update
					ucpGroupConfigReader.checkForUpdates({ group_name: global_groupname, callback: function (result) {
						$('ucp_groupReload').set('src', result.success ? images.defaultCheck : images.error);
                	                        $('ucp_groupReload').set('title', result.success ? 'updated' : result.message);
                	                        $('ucp_groupReloadLabel').set('title', result.success ? 'updated' : result.message);
                        	            }
					});
				}
			}
                    }),
                    new Element('label', {
                        html: '&nbsp;challenge&nbsp;definitions',
			title: 'click to update the group\'s challenge definitions',
			id: 'ucp_groupReloadLabel',
			styles: {
				cursor: 'pointer'
			},
			events: {
				click: function (evt) {
					$('ucp_groupReload').fireEvent('click');
				}
			}
                    })
                ),
                new Element('td', {
                    styles: {
                        fontStyle: 'italic'
                    },
                    html: "The definitions for the challenges are updated once a week. With this option, you " +
                          "can update them now."
                })
            );
            new Element('tr').inject(table).adopt(
                new Element('td', {
                    colSpan: '3',
                    align: 'right'
                }).adopt(
                    new Element('button', {
                        type: 'submit',
                        'class': 'DeleteButt',
                        html: 'Close',
                        events: {
                            click: togglePreferencesDialog
                        }
                    })
                ));

        }
    }

// -----

    function cleanupUCPvariables(group_name) {
    	if ($chk(group_name)) {
    		GM_listKeys(new RegExp("UCP." + group_name)).each(function(key) { GM_deleteValue(key); });
	} else {
	    var keys = [];
	    GM_listKeys(null, function (key) {
                if (key.match(/UCP./) && // for versions prior to 0.5.10
                    !key.match(/UCP.language/) &&
                    !key.match(/UCP.ucpStyle/) &&
                    !key.match(/UCP.useLegacyIcons/) &&
		    !key.match(/UCP.checkPhotoNumbering/) &&
		    !key.match(/UCP.checkPhotoNumberingGently/) &&
                    !key.match(/UCP.lastVersionCheckTime/) &&
		    !key.match(/UCP.onlineVersion/) &&
		    !key.match(/UCP.clock/)) {
                    keys.push(key);
                }
            });
	    keys.each(function(key) { GM_deleteValue(key); });
	}
    }

    var UCPMarkFunction = new Class({
        Implements: [Options],
        options: {
            markAnchor: undefined,
            imgNode: undefined,
            marked: false
        },
        initialize: function (options) {
            this.setOptions(options);
        },
        handleEvent: function (e) {
            if (this.options.marked) {
                this.options.marked = false;
                this.options.imgNode.set('class', 'UCPthumbnail_not_marked');
                this.options.markAnchor.set('html', this.options.markAnchor.get('html').replace("marked", "mark"));
                this.options.markAnchor.style.background = "yellow";
                this.options.markAnchor.title = "click to mark";
            } else {
                this.options.marked = true;
		this.options.imgNode.set('class', 'UCPthumbnail_marked');
// TODO: make the image number bold
// TODO: instead of added a magenta border to the image, make the td cell's background magenta
                this.options.markAnchor.set('html', this.options.markAnchor.get('html').replace("mark", "marked"));
                this.options.markAnchor.set('style', 'background: magenta');
                this.options.markAnchor.title = "click to unmark";
            }
        }
    });
    
    function showPhotoSummary(photos) {
        var form = $$('table.TopicReply form textarea');
        if (!$chk(form) || form.length === 0) {
            GM_log("no form found (3)");
            return;
        }
        var helpmeButton = new Element('button', {
            'class': 'Butt',
            html: 'thumbnail view',
            events: {
                click: function () {
                    toggleThumbnailView(photos);
                }
            }
        }).inject(document.getElement('a[name=reply]').getParent(), 'before');
        new Element('a', {
            target: '_blank',
            html: 'what is this?',
            href: 'http://www.flickr.com/groups/1307178@N20/discuss/72157623600133810/#comment72157623601636570',
            styles: {
                cursor: 'help'
            }
        }).inject(helpmeButton, 'after');
    }

GM_addStyle('.UCPthumbnail_not_marked { max-width: 75px; max-height: 75px; }');
GM_addStyle('.UCPthumbnail_marked { max-width: 120px; max-height: 100px; border: 7px solid magenta; }');
 
    function toggleThumbnailView(photos) {
        if ($chk($('UCP:thumbnail_table'))) {
            $('UCP:thumbnail_table').dispose();
            $$('table.helpmeanchor').dispose();
            $$('a[name=helpme]').dispose();
        } else {
            var main = document.getElement('table.TopicReply');
            var photoTableAnchor = new Element('a', {
                name: "helpme"
            });
            photoTableAnchor.inject(main, 'after');

            var photoTable = new Element('table', { id: "UCP:thumbnail_table" });
            photoTable.inject(photoTableAnchor, 'after');

            photoTable.adopt(
                new Element('tr').adopt(
                    new Element('th', {
                        colSpan: 5,
                        styles: {
                            color: "brown"
                        },
                        html:
                            "Please view the photos in medium size first.<br/>" +
                            "You will find a 'mark' link below every photo. " +
                                                   "Click the link to mark the photo's thumbnail below.<br/>" +
                            "This should make it easier to narrow down your selection."
                    }),
                    new Element('th', {
                        colSpan: 5,
                        styles: {
                            color: 'brown',
                            'text-align': 'right'
                        },
                        html:
                            "Double-check the numbers please!<br/>" +
                            "!! And don't forget to enter your vote !!"
                    })
                )
            );
            var markAnchorList = [];
            photos.each(function (competitor, photoIdx) {
                if (photoIdx % 9 === 0) {
                    photoTable.adopt(row = new Element('tr', { valign: 'bottom' }));
                }
                var cell;
                row.adopt(cell = new Element('td', {
                    html: photoIdx + 1,
		    styles: {
			'white-space': 'nowrap',
			'border-style': 'solid',
			'border-color': 'grey',
			'border-width': '1px;'
		    }
                }));

                var photoAnchor;
                cell.adopt(photoAnchor = new Element('a', {
                        href: '#UCP_thumbnail_hook_' + competitor.photoId()
                }));
                // trick the rest of the script
                cell = photoAnchor;
                
                var thumb;
                cell.adopt(thumb = new Element('img', {
                    src: competitor.photo().src,
                    alt: 'UCPthumbnail',
		    'class': 'UCPthumbnail_not_marked'
                }));
                // fetch the thumbnail version from Flickr? will not work for photos with all rights reserved
                // => no 'All sizes', no public thumbnail
		// heck, the medium sized version should be in the browser's cache anyhow
                var markAnchor = { 
                    anchor: new Element('a', {
                        html: "mark",
                        styles: {
                            background: "yellow",
                            cursor: 'pointer'
                        },
                        title: "click to mark",
                        'class': 'helpmeanchor'
                    }),
		    photoAnchor: new Element('a', { name: 'UCP_thumbnail_hook_' + competitor.photoId(), html: '&nbsp;' }),
                    photo: competitor.photo(),
		    photoId: competitor.photoId()
                };
                //markAnchor.anchor.style.textDecoration = "underline";
                var markFunction = new UCPMarkFunction({
                    markAnchor: markAnchor.anchor,
                    imgNode: thumb
                });
                markAnchor.anchor.addEventListener('click', markFunction, false);
                markAnchorList.push(markAnchor);
            });

            markAnchorList.each(function (markAnchor) {
                var div = new Element('div', { width: '100%', 'class': 'helpmeanchor' }).adopt(
                    new Element('table', {
                        'class': 'helpmeanchor',
                        width: '100%'
                    }).adopt(
                        new Element('rw').adopt(
                            new Element('td').adopt(markAnchor.anchor),
                            new Element('td', {
                                align: 'right',
                                width: '100%'
                            }).adopt(
                                new Element('a', {
                                    'class': 'toThumbnails',
                                    href: '#helpme',
                                    html: 'to the thumbnails',
                                })
                            )
                        )
                    )
                );
		var pagePhotoNode = $$('img[src*=' + markAnchor.photoId + ']')[0];
                if ($chk(pagePhotoNode.getParent('a'))) {
                    div.inject(pagePhotoNode.getParent('a'), 'after');
		    markAnchor.photoAnchor.inject(pagePhotoNode.getParent('a'), 'before');
                } else {
                    // hope for the best
                    div.inject(pagePhotoNode, 'after');
		    markAnchor.photoAnchor.inject(pagePhotoNode, 'before');
                }
            });
            document.location.href = "#helpme";
        }
    }

    var threadPage = false;
    function processDiscussionTopic(discussionTopic, ucpThread) {
    	if (!$chk(discussionTopic)) {
    		GM_log("no discussion topic?");
    		ucpThread.setChallengeStatus("ERRORPARSING");
    		ucpThread.addVotingError("no DiscussTopic");
    		return;
    	}
    	var playerInThisTopic = false;
    	var can_post = discussionTopic.topic.is_locked != 1 && discussionTopic.topic.is_locked != '1' && (discussionTopic.topic.can_reply == 1 || discussionTopic.topic.can_reply == '1');
    	if (!can_post) { // closed, or not a member
    		// mark it as closed
    		ucpThread.resetStatus();
    		ucpThread.setChallengeStatus("Closed");
    			if (global_group_adminOrMod) {
    				ucpThread.printStatus(global_group_preferences, global_ucp_language);
    			}
    	}
    	// add UCPNGFormFeedback
    	if (ucpThread.options.needsStatusOnChallengePage) {
    		var form = $(document).getElement('table.TopicReply form textarea');
    		if (!$chk(form)) { // closed, or not a member
    		    form = $(document).getElement('table.TopicReply div.Tease');
    		    if (!$chk(form) || form.length === 0) {
    			GM_log("no form found");
    			ucpThread.resetStatus();
    			ucpThread.setChallengeStatus("Closed");
    				if (global_group_adminOrMod) {
    				    ucpThread.printStatus(global_group_preferences, global_ucp_language);
    				}
    		    }
    		}
        if ($chk(form)) {
            var formFeedback = new Element('small', {
                id: 'UCPNGFormFeedback',
                styles: {
                    textDecoration: 'none'
                }
            }).inject(form, 'before');
            ucpThread.setFeedbackElement(formFeedback);
        } else {
			if (global_group_adminOrMod) {
			    var closedMessage = $('main').getElement('p.Focus');
			    if ($chk(closedMessage)) {
				//GM_log("found the Closed message");
				var formFeedback = new Element('small', {
				    id: 'UCPNGFormFeedback',
				    styles: {
					textDecoration: 'none'
				    }
				}).inject(closedMessage, 'before');
				ucpThread.setFeedbackElement(formFeedback);
			    } else {
				GM_log("no lock found");
			    }
			}
        }
    	}
        
        if (ucpThread.challengeDefinition().nonChallengeType()) {
            ucpThread.resetStatus();
            ucpThread.printStatus(global_group_preferences, global_ucp_language);
            return;
        }
        var challengeAnnouncement = discussionTopic.topic;

        // the announcement could contain override information:
        // <img src="..." alt="UCPoverride:photos:3"/>
        // <img src="..." alt="UCPoverride:votes:10"/>

        var challengeAnnouncementDiv = new Element('div', { html: challengeAnnouncement.message._content });
        ucpThread.challengeDefinition().readChallengeDefinitionOverrides(challengeAnnouncementDiv);
        // re-test !!
        if (ucpThread.challengeDefinition().nonChallengeType()) {
            ucpThread.resetStatus();
            ucpThread.printStatus(global_group_preferences, global_ucp_language);
            return;
        }

        if (ucpThread.challengeStatus() !== "Closed") { // in case of admins, continue
            ucpThread.setChallengeStatus("none");
        }

        if (debug) GM_log("ucpThread: " + ucpThread.toString());
        if (debug) GM_log("challenge: " + ucpThread.challengeDefinition().toString());

	var excluded = false;
        var replies = discussionTopic.reply;
        if (global_group_config.excludeReplyIndexes().contains(0)) {
            ucpThread.findExcludesInText(challengeAnnouncement.message._content);
            if (ucpThread.isExcluded(username)) {
		excluded = true;
                ucpThread.updateStatus("Excluded");
            }
        } else if (debug) {
        	GM_log("no 0 index exclude");
        }

        if (!$chk(replies) || replies.length === 0) {
	    if (!excluded) {
	            ucpThread.resetStatus();
        	    ucpThread.setChallengeStatus("none");
	    }
            ucpThread.checkStatus();
            ucpThread.printStatus(global_group_preferences, global_ucp_language);
	    ucpThread.printExcludes();
            return;
        }
        
            global_group_config.excludeReplyIndexes().each(function (index) {
		// in versions prior to 3.0.3, 'replies' contained the announcement => 0 was announcement
                var challengeEntry = replies[index - 1];
                if (challengeEntry && index > 0) { // already done the announcement
                    ucpThread.findExcludesInText(challengeEntry.message._content);
                    if (ucpThread.isExcluded(username)) {
                        ucpThread.updateStatus("Excluded");
                    }
                }
            });
            ucpThread.printExcludes();
        
        ucpThread.collectVotes(challengeAnnouncement, replies, function () {
		var votes  = ucpThread.votes();
		var comments = ucpThread.comments();
		var photos = ucpThread.photos();
		   
		var doubleVotesHash = new Hash();
		var doublePlayerHash = new Hash();

		var photosNeedNumbering = global_group_preferences.checkPhotoNumbering() ? photos.length >= 4 && photos.filter(function (photo) { return $chk(photo.photoNumber()); }).length > 1 : false;
		//GM_log("DEBUG: need numbering='" + photosNeedNumbering + "'");
		var photoNumber = 1;

		$each(photos, function (photo) {
		    var photoposter = photo.poster().username;
		    if (photoposter === username) {
			ucpThread.updateStatus("photoposter");
			if (ucpThread.challengeDefinition().countsToLimit() && !playerInThisTopic) { // only count once
			    ++playernumber;
			    playerInThisTopic = true;
			}
		    }
		    if (ucpThread.challengeDefinition().limitPerPlayer() > 0) {
			if (doublePlayerHash.has(photo.poster().userid)) {
			    // this member has more than one photo entered
			    var entries = doublePlayerHash.get(photo.poster().userid) + 1;
			    if (entries > ucpThread.challengeDefinition().limitPerPlayer()) {
				if (!photo.poster().admin) {
						if (global_group_adminOrMod) { // only show the error to admods
						    ucpThread.addVotingError("'" + photo.poster().username + "' entered more than " + 
									    ucpThread.challengeDefinition().limitPerPlayer() + " photo(s)");
						}
				}
				photo.addError("(max. photos allowed: " + ucpThread.challengeDefinition().limitPerPlayer() + ")");
			    }
			    doublePlayerHash.set(photo.poster().userid, entries);
			} else {
			    doublePlayerHash.set(photo.poster().userid, 1);
			}
		    }
		    //GM_log("comparing '"+excludedPlayer+"' with '"+vote.username+"'");
		    if (ucpThread.excludedPlayers().contains(photo.poster().username)) {
			ucpThread.addVotingError("'" + photo.poster().username + "' was excluded, but entered anyway");
			photo.addError(photo.poster().username + " was excluded, but entered anyway");
		    }
		    if (photosNeedNumbering) {
			if (!$chk(photo.photoNumber())) {
				if ((photoNumber == 1 || photoNumber == photos.length) && global_group_preferences.checkPhotoNumberingGently()) {
					// skip
				} else {
					photo.addWarning("did not number his/her entry");
					ucpThread.addVotingError("'" + photo.poster().username + "' did not number his/her entry");
				}
			} else if (photo.photoNumber() != photoNumber) {
				photo.addWarning("numbered incorrectly (" + photo.photoNumber() + " should be " + photoNumber + ")");
				ucpThread.addVotingError("'" + photo.poster().username + "' numbered his/her entry incorrectly");
			}
			++photoNumber;
		    }
		    photo.printStatus();
		}); // photo loop

		// non-vote comments
		$each(comments, function (comment) {
		    comment.ucpThread = ucpThread;
		    if (ucpThread.challengeDefinition().scoreType() === "MEETANDGREET") {
			if (comment.poster().username === username) {
			    ucpThread.updateStatus("voter");
			}
		    }
		    comment.printStatus();
		});

		// votes
		var cummulativeScore = new UCPVote({
		    chlgname: null, 
		    poster: "flickr", 
		    voteText: "none", 
		    votesArray: [], 
		    commentAnchor: null,
		    //ucpThread: ucpThread,
		    node: null,
		    messages: [],
		    errorIdx: null,
		    votedFor: []
		});
		cummulativeScore.options.ucpThread = ucpThread; // if given with the above constructor, errors out with 'too much recursion'

		var previousVote = undefined;
		$each(votes, function (vote, j) {
		    if (vote.isVoid()) {
			vote.addMessage("found a voided vote");
			vote.printStatus();
			return;
		    }
		    var theFirstAndExampleVote = previousVote === undefined && vote.isExampleVote();
		    if (theFirstAndExampleVote) {
			vote.addMessage("found an example vote");
			vote.printStatus();
		    } else {
			vote.addMessage(
				"<b>" + 
				(
				    vote.poster().username === username ? 
				    "you" : 
				    vote.poster().username
				) + 
				(
				    vote.poster().admin ?
				    " (admin/mod)" : ""
				) +
				"</b> voted");
			if (doubleVotesHash.has(vote.poster().userid)) { // this member already voted!
			    vote.addError("voted more than once");
			    ucpThread.addVotingError("'" + vote.poster().username + "' voted more than once");
			} else {
			    doubleVotesHash.set(vote.poster().userid, vote.poster().username); // whatever
			}
			if (vote.poster().username === username) {
			    ucpThread.updateStatus("voter");
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
			if (votedForString.length > 0) {
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
			    if (doublePlayerHash.has(vote.poster().userid)) {
				ucpThread.addVotingError(
				     "'" + vote.poster().username + "' voted in a challenge he/she plays in");
				vote.addError("in a challenge he/she plays in");
			    }
			}
			vote.printStatus();
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
		if (ucpThread.challengeName().match(global_group_config.states().closed)) { // should never happen
		    ucpThread.updateStatus("closed");
		}
		if (ucpThread.finished(cummulativeScore)) {
		    ucpThread.updateStatus("finished");
		}
		ucpThread.checkStatus();
		
		if (ucpThread.challengeStatus() === "Finished"    || ucpThread.challengeStatus() === "PlayerFinished" || 
		    ucpThread.challengeStatus() === "PlayerVoted" || ucpThread.challengeStatus() === "Voted" ||
		    ucpThread.challengeStatus() === "Closed" || ucpThread.challengeStatus() === "Player") {
		    if (ucpThread.challengeDefinition().scoreType().match(/PIC-P/)) {
			ucpThread.setScoreSummary(cummulativeScore.showPicResult(true));
		    } else {
			ucpThread.setScoreSummary(cummulativeScore.showVotes(true));
		    }
		}
		if (threadPage && !(ucpThread instanceof UCPUnknownThread)) {
		    if (ucpThread.challengeName().match(/kanchenjunga/i)) {
			photos = ucpThread.findPhotos({ entry: challengeAnnouncement, all: true });
		    } // photos in Kanchenjunga are all in the challenge header
		    if (ucpThread.challengeDefinition().thumbnailView() == true) {
			showPhotoSummary(photos);
		    }
		}
		//let's go and change the update status on screen
		   
		//update thread info
		ucpThread.printStatus(global_group_preferences, global_ucp_language);
	});
    }

    function processTopicListingTable(topicListing_table) {

    // select main table
        //var topicListingHeaderRow = document.evaluate(".//tr", topicListingTable, null, 
        //                XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var statusTitleCell = $('UCP_preferences_span');
	var statusTitleDiv = new Element('span', {
	    styles: {
		textAlign: 'center'
	    }
	}).adopt(new Element('a', {
	    html: "[ documentation ]",
	    target: '_blank',
	    href: 'http://www.flickr.com/groups/1307178@N20/discuss/72157623600133810/#comment72157623600157950',
	    styles: {
		cursor: 'help',
		'margin-left': '5px',
		'margin-right': '5px'
	    }
	}));
	
        statusTitleDiv.inject(statusTitleCell, 'after');
        
	// prepare for dynamic ucpStyle changes

	topicListing_table.getElements('li').each(function (topicRow) {
		new Element('div', { 'class': 'UCP_status_column' }).inject(topicRow.getElement('div.message div.ft'));
	});
        if (global_group_preferences.ucpStyle()) {
		// hide 'New' labels (do not remove: could break other scripts)
		topicListing_table.getElements('span.New').addClass('UCP_hidden_from_view');
		topicListing_table.getElements('li').addClass('UCP_row_hover');
	}
        var topicListingRows = topicListing_table.getElements('li');
        // let's loop the table and start processing
        topicListingRows.each(function (topicRow, i) {
            var challengeColumn = topicRow.getElement('div.hd');
            var topic = challengeColumn.getElement('a');
            var chlgname = topic.textContent;
            var ucpThread = ucpCreateChallengeThread({
                chlgAnchor: topic,
                url: topic.href,
                chlgname: chlgname,
                groupConfig: global_group_config,
                needsStatusOnTopicListing: true
            });
            //debug = chlgname.match('Naveesh');
            // reset
            var skipChallenge = global_group_config.skipChallenge(ucpThread.challengeName());

            var counterColumn = topicRow.getElement('div.UCP_status_column');

            // add statusses
		myanchor = new Element('a', {
			id: "UCPNG." + topic.href,
			href: topic.href
		});
		statusCell = myanchor;
            statusCell.inject(counterColumn, 'bottom');
            ucpThread.setLabelElement(myanchor);
            ucpThread.setScoreAnchor(counterColumn);
            if (!skipChallenge) // not "---"
            {
                ucpThread.setChallengeStatus("none"); // remove VOTE or FINISHED
                // in case the name changed, make sure the rest of the script uses the new name
                ucpThread.setChallengeName(chlgname);
                    ucpThread.printStatus(global_group_preferences, global_ucp_language, "UPDATING");
                    ucpThread.resetStatus();
                    ucpThread.loadthread(function(result) {
			var success = result.success;
			var message = result.message;
			var discussionTopic = result.discussionTopic;
			var ucpThread = result.ucpThread;
			if (!success) {
				// TODO: use msg as popup title?
				ucpThread.printStatus(global_group_preferences, global_ucp_language);
			} else {
				processDiscussionTopic(discussionTopic, ucpThread);
			}
		    });
            } else { // "---"
                // differentiate between two types '---':
                // closed vs. unknown
                ucpThread.resetStatus();
                ucpThread.printStatus(global_group_preferences, global_ucp_language);
            }

        });
        //GM_log("End of processing main discuss page");

        return;
    }

// *******************
// Start of processing
// *******************

    if (window.name === 'Log page') {
        throw new Error('not processing log page');
    }

	new Element('span', {
		id: 'UCP-updatenotifier',
		'class': 'UCP_hidden_from_view',
		events: {
			'checkversion': function (evt) {
				checkVersion(evt.version);

				// if version is newer than stored one, clear all GM variables
				if (!$chk(GM_getValue("UCP.version"))) {
					cleanupUCPvariables();
				} else {
					var storedVersion = GM_getValue("UCP.version");
					if (evt.version !== storedVersion) {
						cleanupUCPvariables();
					}
				}
				GM_setValue("UCP.version", evt.version);
			}
		}
	}).inject($$('body')[0], 'bottom');
	getVersion('UCP-updatenotifier', 'checkversion');

// check if we have GM variables
    if (!$chk(GM_getValue("UCP.lastloadtime." + global_groupname))) {
        GM_setValue("UCP.lastloadtime." + global_groupname, Math.round(CPStartTime.getTime() / 1000));
    }

    // 
    // read UCP.http://www.flickr.com/groups/name/discuss/.lastloadtime
    var lastloadtime = parseInt(GM_getValue("UCP.lastloadtime." + global_groupname), 10) * 1000;
    var elapstime = CPStartTime.getTime() - lastloadtime;

    if (elapstime > 1000 * 60 * 60) //more than 1 hour : cleanup
    {
        // clear all GM_values for this group
        cleanupUCPvariables(global_groupname);
    }
    // store UCP.http://www.flickr.com/groups/name/discuss/.lastloadtime
    GM_setValue("UCP.lastloadtime." + global_groupname, Math.round(CPStartTime.getTime() / 1000));

    var groupNavigationMenu = null;
    var navigation = null;
    if (document.location.href.match(/.*\/edit\/?/)) {
        throw new Error("not processing edit page");
    }

    if (document.location.href.match(/.*flickr.com\/groups\/.*\/discuss(?:\/page\d+)?(?:\/)?$/)) {
        GM_log("on discuss page");
        groupNavigationMenu = $('cattington_outer');
	if (!$chk(groupNavigationMenu)) {
		groupNavigationMenu = document.getElement('div.groups-header');
	}
        navigation = groupNavigationMenu;
        initialize(discussPageFunction);
    } else if (document.location.href.match(/.*flickr.com\/groups\/.*\/discuss\/\d+/)) { // can be followed with '/', '/page', '/#comment', '/#reply', ...
        GM_log("on challenge thread page");
        threadPage = true;
        navigation = $$('div#Main h1#Tertiary')[0];
	if (!$chk(navigation)) {
		navigation = document.getElement('div.main div.group-topic-detail-col');
	}
        initialize(threadPageFunction);
    } else if (document.location.href.match(/.*flickr.com\/groups\/.*\/admin\/pending\//)) {
        GM_log("on pending stuff page");
        navigation = $$('div#Main table#SubNav tbody tr').getElement('td.Section');
        initialize(pendingItemsPageFunction);
    } else {
        throw new Error("not on a supported group (or page); aborting");
    }

    function discussPageFunction(data) {
	if (!data.success) {
		GM_log("aborting: " + data.message);
		throw new Error("aborting: " + data.message);
	}

        // only append [preferences] on Discuss page
        groupNavigationMenu.adopt(
        new Element('p', {
            'class': "LinksNewP",
            id: 'UCheckPlayNGPreferences'
        })).adopt(
            new Element('span', {
		id: 'UCP_preferences_span',
                styles: {
                    fontWeight: 'bold'
                },
                html: "UCheckPlayNG preferences:",
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
                    cursor: "pointer",
		    'margin-left': '5px',
		    'margin-right': '5px'
                },
                html: " [ " +
                      (global_group_preferences.ucpStyle() ? "UCP style"  : "Flickr style") + " - " +
                      (global_group_preferences.language() ? global_group_preferences.language() : "English")
                      + " ] ",
                events: {
                    click: togglePreferencesDialog
                }
            }),
            new Element('a', {
                html: " [ Supported Challenge Groups ]",
                name: "#",
                title: "Click to access the list of supported challenge groups",
                styles: {
                    color: "Blue",
                    cursor: "pointer",
		    'margin-left': '5px',
		    'margin-right': '5px'
                },
                events: {
                    click: toggleGroupList
                }
            })
        );
	getVersion('UCP_preferences_span', 'showversion');

        if (topicListingTable) {
            processTopicListingTable(topicListingTable);
        } else {
            GM_log("not processing (no TopicListing found!)");
        }
    }
        // create field for messages (reached limit, not logged in, ..)
    function reportStatus(str, type) {
	var statusDiv = $('UCheckPlayNGStatusDiv');
	var statusP = $('UCheckPlayNGStatus');

	if (!$chk(statusDiv)) {
		statusP = new Element('p', {
			id: "UCheckPlayNGStatus",
			styles: {
			    textDecoration: 'none',
			    color: 'Red'
			}
		});
		statusDiv = new Element('div', {
			id: "UCheckPlayNGStatusDiv"
		}).adopt(statusP);
	    navigation.adopt(statusDiv);
	}
	statusP.set('html', str);
	if (type == 'error') {
		statusP.setStyles({ 'text-decoration': 'underline', 'font-weight': 'bold' });
	}
    }

    function threadPageFunction(data) {
	if (!data.success) {
		throw new Error("error initializing: " + data.message);
	}
	var dummy = new UCPThread({ url: document.location.href });
	dummy.loadthread(function (result) {
		if (!result.success) {
			reportStatus("UCheckPlayNG: error loading page: " + result.message);
			return;
		}
	var discussionTopic = result.discussionTopic;
	// create a real UCPThread
        var ucpThread = ucpCreateChallengeThread({
                    url: document.location.href,
                    chlgname: discussionTopic.topic.subject,
                    groupConfig: global_group_config,
                    needsStatusOnChallengePage: true
        });
	if (!(ucpThread instanceof UCPChallengeThread)) {
		return;
	}
            var page = document.location.href.match(/\/page(\d+)/);
            if (page) {
            	page = parseInt(page[1], 10);
            }
            if (page && page > 1) {
            	reportStatus("UCheckPlayNG: no UCP checking on page " + page, 'error');
            	return;
            }
                                	processDiscussionTopic(discussionTopic, ucpThread);
    });
    }

    function pendingItemsPageFunction(data) {
	if (!data.success) {
		GM_log("aborting: " + data.message);
		throw new Error("aborting: " + data.message);
	}
    // nothing to do: for the admin script
    }

    // check library updates
    ucpGroupConfigReader.checkForUpdates({ group_name: global_groupname, callback: function (retval) {
    		if (!retval.success) {
    			GM_log("error updating group config: " + retval.message);
    		}
    	}
   });

    return;

    // *******************
    //  End of processing
    // *******************

})();