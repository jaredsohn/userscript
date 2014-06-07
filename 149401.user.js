// ==UserScript==
// @name           last.mu
// @description    Get back the comfort to /mu/
// @version        1.0.0a1-78
// @author         Stefan Hahn
// @copyright      2012, Stefan Hahn
// @license        GNU General Public License, version 2
// @namespace      com.leon.userscripts.4chan.lastMu
// @include        http*://boards.4chan.org/mu/*
// ==/UserScript==
/*
 * Copyright (C) 2011-2012 Stefan Hahn
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

const GECKO = (function() {
	return ((navigator.userAgent.indexOf('Gecko') > -1) && (navigator.userAgent.indexOf('KHTML') === -1));
})();
const WEBKIT = (function() {
	return (navigator.userAgent.indexOf('AppleWebKit/') > -1);
})();
const OPERA = (function() {
	return (Object.prototype.toString.call(window.opera) == '[object Opera]');
})();

var Window = (unsafeWindow || window);

/* 
 * Media Namespace
 */
var Media = { };

/* 
 * Modules Namespace
 */
var Modules = {
	Core:  {},
	AddOn: {},
	Util:  {}
};

/* 
 * Extended Object functions
 * Copyright (C) 2011-2012 Stefan Hahn
 * 
 * Based on Prototype
 * Copyright (c) 2005-2010 Sam Stephenson
 */
(function() {
	var _toString = Object.prototype.toString;
	const NULL_TYPE = 'Null';
	const UNDEFINED_TYPE = 'Undefined';
	const BOOLEAN_TYPE = 'Boolean';
	const NUMBER_TYPE = 'Number';
	const STRING_TYPE = 'String';
	const OBJECT_TYPE = 'Object';
	const FUNCTION_CLASS = '[object Function]';
	const BOOLEAN_CLASS = '[object Boolean]';
	const NUMBER_CLASS = '[object Number]';
	const STRING_CLASS = '[object String]';
	const ARRAY_CLASS = '[object Array]';
	const DATE_CLASS = '[object Date]';
	
	// --- exported functions ---
	function extend(destination, source) {
		for (var property in source) {
			destination[property] = source[property];
		}
		
		return destination;
	}
	
	function inspect(object) {
		try {
			if (isUndefined(object)) return 'undefined';
			if (object === null) return 'null';
			
			return object.inspect ? object.inspect() : String(object);
		}
		catch (e) {
			if (e instanceof RangeError) return '...';
			
			throw e;
		}
	}
	
	function stringify(object) {
		return JSON.stringify(object);
	}
	
	function clone(object) {
		return extend({}, object);
	}
	
	function isHash(object) {
		return (object instanceof Hash);
	}
	
	function isFunction(object) {
		return (_toString.call(object) === FUNCTION_CLASS);
	}
	
	function isString(object) {
		return (_toString.call(object) === STRING_CLASS);
	}
	
	function isNumber(object) {
		return (_toString.call(object) === NUMBER_CLASS);
	}
	
	function isDate(object) {
		return (_toString.call(object) === DATE_CLASS);
	}
	
	function isUndefined(object) {
		return (typeof object === 'undefined');
	}
	
	extend(Object, {
		extend:		extend,
		inspect:	inspect,
		toJSON:		JSON.stringify,
		clone:		clone,
		isArray:	Array.isArray,
		isHash:		isHash,
		isFunction:	isFunction,
		isString:	isString,
		isNumber:	isNumber,
		isDate:		isDate,
		isUndefined:	isUndefined
	});
})();

/* 
 * Extended Function functions
 * Copyright (C) 2011-2012 Stefan Hahn
 * 
 * Based on Prototype
 * Copyright (c) 2005-2010 Sam Stephenson
 */
Object.extend(Function, {
	empty: function() { },
	K: function(x) {
		return x;
	}
});

Object.extend(Function.prototype, (function() {
	var slice = Array.prototype.slice;
	
	function update(array, args) {
		var arrayLength = array.length;
		var length = args.length;
		
		while (length--) {
			array[arrayLength + length] = args[length];
		}
		
		return array;
	}
	
	function merge(array, args) {
		array = slice.call(array, 0);
		
		return update(array, args);
	}
	
	// --- exported functions ---
	function argumentNames() {
		var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '').replace(/\s+/g, '').split(',');
		
		return (((names.length == 1) && !names[0]) ? [] : names);
	}
	
	function bind(context) {
		if (arguments.length < 2 && (typeof arguments[0] === 'undefined')) return this;
		
		var __method = this;
		var args = slice.call(arguments, 1);
		
		return function() {
		  var a = merge(args, arguments);
		  
		  return __method.apply(context, a);
		}
	}
	
	function bindAsEventListener(context) {
		var __method = this;
		var args = slice.call(arguments, 1);
		
		return function(event) {
			var a = update([event || window.event], args);
			
			return __method.apply(context, a);
		}
	}
	
	function wrap(wrapper) {
		var __method = this;
		
		return function() {
			var a = update([__method.bind(this)], arguments);
			
			return wrapper.apply(this, a);
		}
	}
	
	function methodize() {
		if (this._methodized) return this._methodized;
		
		var __method = this;
		
		return this._methodized = function() {
			var a = update([this], arguments);
			
			return __method.apply(null, a);
		};
	}
	
	
	return {
		argumentNames:		argumentNames,
		bind:			Function.prototype.bind || bind,
		bindAsEventListener:	bindAsEventListener,
		wrap:			wrap,
		methodize:		methodize
	};
})());

/* 
 * Basic Class implementation
 * Copyright (C) 2011-2012 Stefan Hahn
 * 
 * Based on Prototype
 * Copyright (c) 2005-2010 Sam Stephenson
 */
var ClassSystem = (function() {
	function internalArrayCasting(iterable) {
		if (!iterable) return [];
		if ('toArray' in Object(iterable)) return iterable.toArray();
		
		var length = iterable.length || 0;
		var results = new Array(length);
		
		while (length--) results[length] = iterable[length];
		
		return results;
	}
	
	function getKlass(isAbstract) {
		if (isAbstract) {
			return function() {
				throw new Error('Trying to create instance of an abstract class');
			}
		}
		else {
			return function() {
				this.initialize.apply(this, arguments);
			}
		}
	}
	
	function createInternalStructure(klass, properties) {
		var parent = null;
		
		if (Object.isFunction(properties[0])) parent = properties.shift();
		
		Object.extend(klass, {
			addMethods: function(source) {
				var ancestor = this.superclass && this.superclass.prototype;
				var properties = Object.keys(source);
				
				for (var i = 0, length = properties.length; i < length; i++) {
					var property = properties[i];
					var value = source[property];
					
					if (ancestor && Object.isFunction(value) && (value.argumentNames()[0] === '$super')) {
						var method = value;
						
						value = (function(m) {
							return function() {
								return ancestor[m].apply(this, arguments);
							};
						})(property).wrap(method);
						
						value.valueOf = method.valueOf.bind(method);
						value.toString = method.toString.bind(method);
					}
					
					this.prototype[property] = value;
				}
				
				return this;
			}
		});
		klass.superclass = parent;
		klass.subclasses = [];
		
		if (parent) {
			var subclass = function() { };
			
			subclass.prototype = parent.prototype;
			klass.prototype = new subclass;
			parent.subclasses.push(klass);
		}
		
		for (var i = 0, length = properties.length; i < length; i++) {
			if (typeof properties[i] === 'object' ) {
				klass.addMethods(properties[i]);
			}
		}
		
		if (!Object.isFunction(klass.prototype.initialize)) {
			klass.prototype.initialize = Function.empty;
		}
		
		klass.prototype.constructor = klass;
	}
	
	function AbstractClass() {
		var klass = getKlass(true);
		
		createInternalStructure(klass, internalArrayCasting(arguments));
		
		return klass;
	}
	
	function Class() {
		var klass = getKlass(false);
		
		createInternalStructure(klass, internalArrayCasting(arguments));
		
		return klass;
	}
	
	return {
		AbstractClass:	AbstractClass,
		Class:		Class
	};
})();

/* 
 * Abstract Enumerable class
 * Copyright (C) 2011-2012 Stefan Hahn
 * 
 * Based on Prototype
 * Copyright (c) 2005-2010 Sam Stephenson
 */
var $break = {};

var Enumerable = (function() {
	function internalArrayCasting(iterable) {
		if (!iterable) return [];
		if ('toArray' in Object(iterable)) return iterable.toArray();
		
		var length = iterable.length || 0
		var results = new Array(length);
		
		while (length--) results[length] = iterable[length];
		
		return results;
	}
	
	function each(iterator, context) {
		var index = 0;
		
		try {
			this._each(function(value) {
				iterator.call(context, value, index++);
			});
		}
		catch (e) {
			if (e != $break) throw e;
		}
		
		return this;
	}
	
	function all(iterator, context) {
		iterator = iterator || Function.K;
		var result = true;
		
		this.each(function(value, index) {
			result = result && !!iterator.call(context, value, index);
			
			if (!result) throw $break;
		});
		
		return result;
	}
	
	function any(iterator, context) {
		iterator = iterator || Function.K;
		var result = false;
		
		this.each(function(value, index) {
			if (result = !!iterator.call(context, value, index)) throw $break;
		});
		
		return result;
	}
	
	function collect(iterator, context) {
		iterator = iterator || Function.K;
		var results = [];
		
		this.each(function(value, index) {
			results.push(iterator.call(context, value, index));
		});
		
		return results;
	}
	
	function detect(iterator, context) {
		var result;
		
		this.each(function(value, index) {
			if (iterator.call(context, value, index)) {
				result = value;
				
				throw $break;
			}
		});
		
		return result;
	}
	
	function findAll(iterator, context) {
		var results = [];
		
		this.each(function(value, index) {
			if (iterator.call(context, value, index)) results.push(value);
		});
		
		return results;
	}

	function reject(iterator, context) {
		var results = [];
		
		this.each(function(value, index) {
			if (!iterator.call(context, value, index)) {
				results.push(value);
			}
		});
		
		return results;
	}

	function include(object) {
		if (Object.isFunction(this.indexOf)) {
			return (this.indexOf(object) !== -1);
		}
		
		var found = false;
		
		this.each(function(value) {
			if (value == object) {
				found = true;
				
				throw $break;
			}
		});
		
		return found;
	}
	
	function invoke(method) {
		var args = internalArrayCasting(arguments).slice(1);
		
		return this.collect(function(value) {
			return value[method].apply(value, args);
		});
	}
	
	function pluck(property) {
		var results = [];
		
		this.each(function(value) {
			results.push(value[property]);
		});
		
		return results;
	}
	
	function toArray() {
		return this.map();
	}
	
	function size() {
		return this.toArray().length;
	}
	
	function inspect() {
		return '#<Enumerable:' + this.toArray().inspect() + '>';
	}
	
	return {
		each:		each,
		all:		all,
		every:		all,
		any:		any,
		some:		any,
		collect:	collect,
		map:		collect,
		detect:		detect,
		find:		detect,
		findAll:	findAll,
		select:		findAll,
		filter:		findAll,
		reject:		reject,
		include:	include,
		member:		include,
		invoke:		invoke,
		pluck:		pluck,
		toArray:	toArray,
		entries:	toArray,
		size:		size,
		inspect:	inspect
	};
})();

/* 
 * Extended Array functions
 * Copyright (C) 2011-2012 Stefan Hahn
 * 
 * Based on Prototype
 * Copyright (c) 2005-2010 Sam Stephenson
 */
function $A(iterable) {
	if (!iterable) return [];
	if ('toArray' in Object(iterable)) return iterable.toArray();
	
	var length = (iterable.length || 0);
	var results = new Array(length);
	
	while (length--) results[length] = iterable[length];
	
	return results;
}

Object.extend(Array, {
	from: $A
});

Object.extend(Array.prototype, Enumerable);
Object.extend(Array.prototype, (function() {
	var arrayProto = Array.prototype;
	var slice = arrayProto.slice;
	
	function clear() {
		this.length = 0;
		
		return this;
	}
	
	function first() {
		return this[0];
	}
	
	function last() {
		return this[this.length - 1];
	}
	
	function compact() {
		return this.select(function(value) {
			return value != null;
		});
	}
	
	function without() {
		var values = slice.call(arguments, 0);
		
		return this.select(function(value) {
			return !values.include(value);
		});
	}
	
	function reverse(inline) {
		return ((inline === false) ? this.toArray() : this)._reverse();
	}
	
	function clone() {
		return slice.call(this, 0);
	}
	
	function size() {
		return this.length;
	}
	
	function inspect() {
		return '[' + this.map(Object.inspect).join(', ') + ']';
	}
	
	return {
		_each:		arrayProto.forEach,
		_reverse:	arrayProto.reverse,
		clear:		clear,
		first:		first,
		last:		last,
		compact:	compact,
		without:	without,
		reverse:	reverse,
		clone:		clone,
		size:		size,
		inspect:	inspect,
	};
})());

/* 
 * Hash class
 * Copyright (C) 2011-2012 Stefan Hahn
 * 
 * Based on Prototype
 * Copyright (c) 2005-2010 Sam Stephenson
 */
function $H(object) {
	return new Hash(object);
};

var Hash = new ClassSystem.Class(Enumerable, (function() {
	function initialize(object) {
		this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);
	}
	
	function _each(iterator) {
		for (var key in this._object) {
			var value = this._object[key];
			var pair = [key, value];
			
			pair.key = key;
			pair.value = value;
			
			iterator(pair);
		}
	}
	
	function set(key, value) {
		return this._object[key] = value;
	}
	
	function get(key) {
		if (this._object.hasOwnProperty(key)) return this._object[key];
	}
	
	function unset(key) {
		var value = this._object[key];
		
		delete this._object[key];
		
		return value;
	}
	
	function index(value) {
		var match = this.detect(function(pair) {
			return (pair.value === value);
		});
		
		return (match && match.key);
	}
	
	function keys() {
		return this.pluck('key');
	}
	
	function values() {
		return this.pluck('value');
	}
	
	function merge(object) {
		return this.clone().update(object);
	}
	
	function update(object) {
		return new Hash(object).inject(this, function(result, pair) {
			result.set(pair.key, pair.value);
			
			return result;
		});
	}
	
	function toObject() {
		return Object.clone(this._object);
	}
	
	function clone() {
		return new Hash(this);
	}
	
	function inspect() {
		return '#<Hash:{' + this.map(function(pair) {
			return pair.map(Object.inspect).join(': ');
		}).join(', ') + '}>';
	}
	
	return {
		initialize:	initialize,
		_each:		_each,
		set:		set,
		get:		get,
		unset:		unset,
		index:		index,
		keys:		keys,
		values:		values,
		merge:		merge,
		update:		update,
		toObject:	toObject,
		clone:		clone,
		inspect:	inspect
	};
})());

/* 
 * Extended String functions
 * Copyright (C) 2011-2012 Stefan Hahn
 * 
 * Based on Prototype
 * Copyright (c) 2005-2010 Sam Stephenson
 */
Object.extend(String, {
	interpret: function(value) {
		return ((value == null) ? '' : String(value));
	},
	specialChar: {
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'\\': '\\\\'
	},
	htmlEntities: {
		'<': '&lt;',
		'>': '&gt;',
		'&': '&amp;',
		'"': '&quot;',
		'\'': '&#039;'
	}
});

Object.extend(String.prototype, (function() {
	function includes(pattern) {
		return this.indexOf(pattern) > -1;
	}
	
	function startsWith(pattern) {
		return (this.lastIndexOf(pattern, 0) === 0);
	}
	
	function endsWith(pattern) {
		var d = this.length - pattern.length;
		
		return ((d >= 0) && (this.indexOf(pattern, d) === d));
	}
	
	function sub(pattern, replacement, count) {
		var replacementString = replacement.toString();
		replacement = ((Object.isFunction(replacement)) ? replacement : (function(match) { return replacementString; }));
		count = ((Object.isUndefined(count)) ? 1 : count);
		
		return this.gsub(pattern, function(match) {
			if (--count < 0) {
				return match[0];
			}
			
			return replacement(match);
		});
	}
	
	function gsub(pattern, replacement) {
		var result = '';
		var source = this;
		var match = null;
		var replacementString = replacement.toString();
		replacement = ((Object.isFunction(replacement)) ? replacement : (function(match) { return replacementString; }));
		
		if (Object.isString(pattern)) {
			pattern = RegExp.escape(pattern);
		}
		
		if (!(pattern.length || pattern.source)) {
			replacement = replacement('');
			
			return replacement + source.split('').join(replacement) + replacement;
		}
		
		while (source.length > 0) {
			if (match = source.match(pattern)) {
				result += source.slice(0, match.index);
				result += String.interpret(replacement(match));
				source = source.slice(match.index + match[0].length);
			}
			else {
				result += source;
				source = '';
			}
		}
		
		return result;
	}
	
	function trim() {
		return this.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	function trimLeft() {
		return this.replace(/^\s*/, '');
	}
	
	function trimRight() {
		return this.replace(/\s*$/, '');
	}
	
	function strip() {
		return this.trim().replace(/\s+/g, ' ');
	}
	
	function escapeHTML() {
		return this.replace(/&|"|<|>/g, function(matchedSubString, offset, totalString) {
			return String.htmlEntities[matchedSubString];
		});
	}
	
	function parseAsColor() {
		var hexColor = '#';
		
		if (this.trim().indexOf('rgb') === 0) {
			this.match(/(\d){1,3}/g).each(function(number, index) {
				if (index > 2) return null;
				
				hexColor += ((parseInt(number, 10) < 16) ? '0' : '') + parseInt(number, 10).toString(16);
			});
			
			return hexColor;
		}
		else {
			var basic = this.toLowerCase().replace(/[^0-9a-f]/g, '');
			
			if (basic.length === 6) {
				return hexColor+basic;
			}
			else if (basic.length === 3) {
				return hexColor + basic[0] + basic[0] + basic[1] + basic[1] + basic[2] + basic[2];
			}
			else {
				return '';
			}
		}
	}
	
	function parseAsCommand() {
		if (this.startsWith('/')) {
			var command = this.slice(1, ((!this.includes(' ')) ? (this.length) : this.indexOf(' ')));
			var parameters = ((!this.includes(' ')) ? '' : this.slice(this.indexOf(' ') + 1));
			
			if (parameters.includes(',')) {
				parameters = parameters.split(',').invoke('trim'); 
			}
			else {
				parameters = parameters.split(' ').invoke('trim'); 
			}
			
			if ((parameters.length === 1) && (parameters[0] === '')) {
				parameters.clear();
			}
			
			return {
				command:	command,
				parameters:	parameters
			};
		}
		else {
			return null;
		}
	}
	
	function camelize() {
		return this.replace(/-+(.)?/g, function(match, chr) {
			return ((chr) ? (chr.toUpperCase()) : (''));
		});
	}
	
	function inspect(useDoubleQuotes) {
		var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
			if (character in String.specialChar) {
				return String.specialChar[character];
			}
			
			return '\\u00' + character.charCodeAt().toPaddedString(2, 16);
		});
		
		if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
		
		return "'" + escapedString.replace(/'/g, '\\\'') + "'";
	}
	
	return {
		includes:	includes,
		startsWith:	startsWith,
		endsWith:	endsWith,
		sub:		sub,
		gsub:		gsub,
		trim:		String.prototype.trim || trim,
		trimLeft:	String.prototype.trimLeft || trimLeft,
		trimRight:	String.prototype.trimRight || trimRight,
		strip:		strip,
		escapeHTML:	escapeHTML,
		parseAsColor:	parseAsColor,
		parseAsCommand:	parseAsCommand,
		camelize:	camelize,
		inspect:	inspect
	};
})());

/* 
 * Extended RegExp functions
 * Copyright (C) 2011-2012 Stefan Hahn
 * 
 * Based on Prototype
 * Copyright (c) 2005-2010 Sam Stephenson
 */
Object.extend(RegExp, {
	escape: function(str) {
		return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}
});

/* 
 * Extended Date functions
 * Copyright (c) 2011-2012 Stefan Hahn
 */
Object.extend(Date, {
	fromMessageTime: function(timeString) {
		var timeArray = timeString.split(':');
		var now = new Date();
		
		if (timeArray.length !== 3) throw new Error('invalid timeString »'+timeString+'«');
		
		return (new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(timeArray[0], 10), parseInt(timeArray[1], 10), parseInt(timeArray[2], 10)));
	}
});

Object.extend(Date.prototype, {
	getMessageDate: function() {
		return ((this.getHours() < 10) ? '0' + this.getHours() : this.getHours()) + ':' + ((this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes()) + ':' + ((this.getSeconds() < 10) ? '0' + this.getSeconds() : this.getSeconds());
	}
});

/**
 * Storage engine for persistent value storage
 * Copyright (C) 2011-2012 Stefan Hahn
 */
var Storage = (function() {
	var StorageInterface = new ClassSystem.Class((function() {
		function initialize(namespace) {
			this.namespace = namespace;
		}
		
		/**
		 * Gets saved value from persistent storage
		 * 
		 * @param	{String}	key
		 * @param	{mixed}		[defaultValue]
		 * @returns	{mixed}
		 */
		function getValue(key, defaultValue) {
			var type, value;
			
			if (localStorage.getItem(this.namespace + key) === null) {
				if (!Object.isUndefined(defaultValue)) this.setValue(key, defaultValue);
				return defaultValue;
			}
			
			value = localStorage.getItem(this.namespace + key);
			type = value[0];
			value = value.slice(1);
			switch (type) {
				case 'b':
					return (value === 'true');
				case 'n':
					return Number(value);
				case 'o':
					return JSON.parse(value);
				default:
					return value;
			}
		}
		
		/**
		 * Saves value persistent
		 * 
		 * @param	{String}	key
		 * @param	{mixed}		value
		 * @returns	{undefined}
		 */
		function setValue(key, value) {
			value = (typeof value)[0] + ((typeof value === 'object') ? JSON.stringify(value) : value);
			return localStorage.setItem(this.namespace + key, value);
		}
		
		/**
		 * Deletes value from persistent storage
		 * 
		 * @param	{String}	key
		 * @returns	{undefined}
		 */
		function unsetValue(key) {
			localStorage.removeItem(this.namespace + key);
		}
		
		/**
		 * Returns an array of all keys within the given namespace
		 * 
		 * @returns	{Array}
		 */
		function keys() {
			var length = localStorage.length;
			var keysArray = [];
			
			while (length--) {
				if (localStorage.key(length).startsWith(this.namespace)) {
					keysArray.push(localStorage.key(length).replace(this.namespace, ''));
				}
			}
			
			return keysArray;
		}
		
		/**
		 * Amount of saved key value pairs within the given namespace
		 * 
		 * @returns	{Number}
		 */
		function size() {
			var length = localStorage.length;
			var i = 0;
			
			while (length--) {
				if (localStorage.key(length).startsWith(this.namespace)) {
					i++;
				}
			}
			
			return i;
		}
		
		/**
		 * Deletes all data from persistent storage within the given namespace
		 * 
		 * @returns	{undefined}
		 */
		function clear() {
			var keys = this.keys();
			
			keys.each(function(key) {
				this.unsetValue(key);
			}, this);
		}
		
		/**
		 * Replace all data in the given namespace with properties of passed object
		 * 
		 * @param	{Object}	Object	Hash-like object
		 * @returns	{undefined}	Returns nothing
		 */
		function importSettings(obj) {
			if (typeof obj !== 'object') throw new TypeError('obj has to be an object type');
			
			var keys = Object.keys(obj);
			
			this.clear();
			keys.each(function(key) {
				this.setValue(key, obj[key]);
			}, this);
		}
		
		/**
		 * Returns all key value pairs from the given namespace
		 * 
		 * @returns	{Object}	Hash-like object with every key as property
		 */
		function exportSettings() {
			var obj = {};
			var keys = this.keys();
			
			for (var i = 0, length = keys.length; i < length; i++) {
				obj[keys[i]] = this.getValue(keys[i]);
			}
			
			return obj;
		}
		
		return {
			initialize:	initialize,
			getValue:	getValue,
			setValue:	setValue,
			unsetValue:	unsetValue,
			keys:		keys,
			size:		size,
			clear:		clear,
			importSettings:	importSettings,
			exportSettings:	exportSettings
		};
	})());
	var namespaces = {
		noNamespace: new StorageInterface(''),
		global: new StorageInterface('.')
	};
	
	function getInterface() {
		if (arguments.length < 1) {
			throw new Error('No namespace given');
		}
		
		if ((arguments.length === 1) && (arguments[0] === '')) {
			return namespaces.noNamespace;
		}
		else if ((arguments.length === 1) && (arguments[0] === '.')) {
			return namespaces.global;
		}
		else {
			var namespace = '';
			
			$A(arguments).each(function(namespaceItem) {
				namespace += '.' + namespaceItem;
			});
			
			namespace += '.'
			
			if (Object.isUndefined(namespaces[namespace])) {
				namespaces[namespace] = new StorageInterface(namespace);
			}
			
			return namespaces[namespace];
		}
	}
	
	return {
		getInterface:	getInterface
	};
})();

/* 
 * Extended Element functions
 * Copyright (C) 2011-2012 Stefan Hahn
 * 
 * Based on Prototype
 * Copyright (c) 2005-2010 Sam Stephenson
 */
(function() {
	var Offset = new ClassSystem.Class({
		initialize: function(left, top) {
			this.left = Math.round(left);
			this.top = Math.round(top);

			this[0] = this.left;
			this[1] = this.top;
		},

		relativeTo: function(offset) {
			return new Element.Offset(this.left - offset.left, this.top - offset.top);
		},

		inspect: function() {
			return '<Element.Offset left: ' + this.left.toString() + ' top: ' + this.top.toString() + '>';
		},

		toString: function() {
			return '[' + this.left.toString() + ', ' + this.top.toString() + ']';
		},

		toArray: function() {
			return [this.left, this.top];
		}
	});
	
	/**
	 * Selector Engine
	 * Provides methods for selecting elements with DOM tree
	 * 
	 * @type	{Object}
	 */
	var Selector = (function() {
		/**
		 * Gets element nodes via ID
		 * Accepts as many parameters as you want
		 * Returns an array of all found nodes
		 * 
		 * @param	{Object|String}		element		Node or ID string
		 * @returns	{Object|Array}				Single element node or array of nodes
		 */
		function getElementsByIDs(element) {
			if (arguments.length > 1) {
				for (var i = 0, elements = [], length = arguments.length; i < length; i++) {
					elements.push(getElementsByIDs(arguments[i]));
				}
				
				return $A(elements);
			}

			if (Object.isString(element)) {
				element = document.getElementById(element);
			}
			
			return element;
		}
		
		/**
		 * Gets element nodes via CSS expression
		 * Accepts as many parameters as you want
		 * Returns an array of all found nodes
		 * 
		 * @param	{String}	cssExpression		CSS expression
		 * @returns	{Array}					Array of nodes
		 */
		function getElementsByCSSExpression() {
			var expression = $A(arguments).join(', ');
			
			return $A(document.querySelectorAll(expression));
		}
		
		return {
			getElementsByIDs:		getElementsByIDs,
			getElementsByCSSExpression:	getElementsByCSSExpression
		};
	})();
	
	function Element(tagName, attributes) {
		attributes = attributes || {};
		tagName = tagName.toLowerCase();
		
		if (!ELEMENT_CACHE[tagName]) ELEMENT_CACHE[tagName] = document.createElement(tagName);
		
		var node = ELEMENT_CACHE[tagName].cloneNode(false);
		
		return Element.writeAttribute(node, attributes);
	}
	
	function writeAttribute(element, name, value) {
		element = Selector.getElementsByIDs(element);
		var attributes = {};
		var table = ATTRIBUTE_TRANSLATIONS.write;
		
		if (typeof name === 'object') {
			attributes = name;
		}
		else {
			attributes[name] = Object.isUndefined(value) ? true : value;
		}
		
		for (var attr in attributes) {
			name = table.names[attr] || attr;
			value = attributes[attr];
			
			if (table.values[attr]) {
				name = table.values[attr](element, value);
			}
			else if ((value === false) || (value === null)) {
				element.removeAttribute(name);
			}
			else if (value === true) {
				element.setAttribute(name, name);
			}
			else {
				element.setAttribute(name, value);
			}
		}
		
		return element;
	}
	
	function descendantOf(element, ancestor) {
		element = Selector.getElementsByIDs(element);
		ancestor = Selector.getElementsByIDs(ancestor);
		
		return ((element.compareDocumentPosition(ancestor) & 8) === 8);
	}
	
	function hasClassName(element, className) {
		element = Selector.getElementsByIDs(element);
		
		return element.className.includes(className);
	}
	
	function addClassName(element, className) {
		element = Selector.getElementsByIDs(element);
		
		if (!hasClassName(element, className)) {
			 element.className += ((element.className) ? (' ') : ('')) + className;
		}
		
		return element;
	}
	
	function removeClassName(element, className) {
		element = Selector.getElementsByIDs(element);
		
		element.className = element.className.replace(className, '').strip();
		
		return element;
	}
	
	function getStyle(element, style) {
		element = Selector.getElementsByIDs(element);
		style = normalizeStyleName(style);
		var value = element.style[style];
		
		if (!value || (value === 'auto')) {
			var css = document.defaultView.getComputedStyle(element, null);
			
			value = ((css) ? (css[style]) : (null));
		}

		if (style === 'opacity') {
			return ((value) ? (parseFloat(value)) : (1.0));
		}
		
		return ((value === 'auto') ? (null) : (value));

	}
	
	function cumulativeOffset(element) {
		element = Selector.getElementsByIDs(element);
		var valueT = 0;
		var valueL = 0;
		
		if (element.parentNode) {
			do {
				valueT += element.offsetTop || 0;
				valueL += element.offsetLeft || 0;
				element = element.offsetParent;
			} while (element);
		}
		
		return new Element.Offset(valueL, valueT);
	}
	
	function cumulativeScrollOffset(element) {
		element = Selector.getElementsByIDs(element);
		var valueT = 0;
		var valueL = 0;
		
		do {
			valueT += element.scrollTop || 0;
			valueL += element.scrollLeft || 0;
			element = element.parentNode;
		} while (element);
		
		return new Element.Offset(valueL, valueT);
	}
	
	function viewportOffset(forElement) {
		var valueT = 0;
		var valueL = 0;
		var docBody = document.body;
		var element = Selector.getElementsByIDs(forElement);
		
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			
			if ((element.offsetParent == docBody) && (Element.getStyle(element, 'position') == 'absolute')) {
				break;
			}
		} while (element = element.offsetParent);
		
		element = forElement;
		do {
			if (element != docBody) {
				valueT -= element.scrollTop || 0;
				valueL -= element.scrollLeft || 0;
			}
		} while (element = element.parentNode);
		
		return new Element.Offset(valueL, valueT);
	}
	
	function normalizeStyleName(style) {
		if ((style === 'float') || (style === 'styleFloat')) {
			return 'cssFloat';
		}
		
		return style.camelize();
	}
	
	var ELEMENT_CACHE = {};
	var ATTRIBUTE_TRANSLATIONS = {
		write: {
			names: {
				'class':	'class',
				className:	'class',
				'for':		'for',
				htmlFor:	'for',
				cellpadding:	'cellPadding',
				cellspacing:	'cellSpacing',
				colspan:	'colSpan',
				rowspan:	'rowSpan',
				valign:		'vAlign',
				datetime:	'dateTime',
				accesskey:	'accessKey',
				tabindex:	'tabIndex',
				enctype:	'encType',
				maxlength:	'maxLength',
				readonly:	'readOnly',
				longdesc:	'longDesc',
				frameborder:	'frameBorder'
			},
			
			values: {
				checked: function(element, value) {
					element.checked = !!value;
				},
				
				style: function(element, value) {
					element.style.cssText = value ? value : '';
				}
			}
		}
	};
	
	Object.extend(Element, {
		Offset:			Offset,
		Selector:		Selector,
		
		writeAttribute:		writeAttribute,
		hasClassName:		hasClassName,
		addClassName:		addClassName,
		removeClassName:	removeClassName,
		getStyle:		getStyle,
		cumulativeOffset:	cumulativeOffset,
		cumulativeScrollOffset:	cumulativeScrollOffset,
		viewportOffset:		viewportOffset
	});
	
	var oldElement = window.Element;
	window.Element = Element;
	
	Object.extend(window.Element, oldElement || {});
	if (oldElement) window.Element.prototype = oldElement.prototype;
	
	// wrappers for selector functions
	window.$ = Element.Selector.getElementsByIDs;
	window.$$ = Element.Selector.getElementsByCSSExpression;
})();

/*
 * Event System
 * Basic event system for custom events
 *
 * Copyright (C) 2011-2012 Stefan Hahn
 */
var Event = (function() {
	/**
	 * Saves event handlers
	 * 
	 * @private
	 * @type	{Hash}
	 */
	var events = $H({});
	
	/**
	 * Hash for key codes
	 * 
	 * @type	{Object}
	 */
	var keys = {
		KEY_BACKSPACE:	8,
		KEY_TAB:	9,
		KEY_RETURN:	13,
		KEY_ESC:	27,
		KEY_LEFT:	37,
		KEY_UP:		38,
		KEY_RIGHT:	39,
		KEY_DOWN:	40,
		KEY_DELETE:	46,
		KEY_HOME:	36,
		KEY_END:	35,
		KEY_PAGEUP:	33,
		KEY_PAGEDOWN:	34,
		KEY_INSERT:	45
	};

	/**
	 * Register an event handler for an event
	 * 
	 * @param	{String}	name		event name
	 * @param	{Function}	handler		event handler function, has to accept one parameter of type Object
	 * @param	{Object}	[context]	optional object which this will reference to within handler function
	 * @returns	{Number}			index of event handler, necessary when you want to unregister the listener
	 */
	function register(name, handler, context) {
		if (Object.isUndefined(events.get(name))) {
			events.set(name, []);
		}
		
		return (events.get(name).push(handler.bind(context))-1);
	}
	
	/**
	 * Remove an event listener
	 * 
	 * @param	{String}	name		event name
	 * @param	{Number}	index		index retuern by Event.register
	 * @returns	{undefined}			Returns nothing
	 */
	function unregister(name, index) {
		delete events.get(name)[index];
	}
	
	/**
	 * Executes all listeners registered to the named event
	 * 
	 * @param	{String}	name		event name
	 * @param	{Object}	eventObj	object passed to event handlers
	 * @returns	{undefined}			Returns nothing
	 */
	function fire(name, eventObj) {
		if (Object.isArray(events.get(name))) {
			events.get(name).each(function(item) {
				try {
					item(eventObj);
				}
				catch (e) {
					alert('Event Listener konnte nicht ausgeführt werden!'+"\n"+e.name+' - '+e.message);
				}
			});
		}
	}
	
	/**
	 * Prevent default action and further bubbling in DOM events
	 * 
	 * @param	{Object}	event		DOM event object
	 * @returns	{undefined}			Returns nothing
	 */
	function stop(event) {
		event.preventDefault();
		event.stopPropagation();

		event.stopped = true;
	}
	
	/*
	 * Get x coordinate on DOM pointing device events
	 * 
	 * @param	{Object}	event		DOM event object
	 * @returns	{Number}			event x coordinate
	 */
	function pointerX(event) {
		var docElement = document.documentElement;
		var body = document.body || {
			scrollLeft: 0
		};
		
		return (event.pageX || (event.clientX + (docElement.scrollLeft || body.scrollLeft) - (docElement.clientLeft || 0)));
	}

	/*
	 * Get y coordinate on DOM pointing device events
	 * 
	 * @param	{Object}	event		DOM event object
	 * @returns	{Number}			event y coordinate
	 */
	function pointerY(event) {
		var docElement = document.documentElement;
		var body = document.body || {
			scrollTop: 0
		};

		return (event.pageY || (event.clientY + (docElement.scrollTop || body.scrollTop) - (docElement.clientTop || 0)));
	}

	if (WEBKIT) {
		_isButton = function(event, code) {
			switch (code) {
				case 0:
					return ((event.which == 1) && !event.metaKey);
				case 1:
					return ((event.which == 2) || ((event.which == 1) && event.metaKey));
				case 2:
					return (event.which == 3);
				default:
					return false;
			}
		}

	}
	else {
		_isButton = function(event, code) {
			return ((event.which) ? (event.which === code + 1) : (event.button === code));
		}
	}
	
	/**
	 * Returns true if the click event was triggered by primary mouse button
	 * 
	 * @param	{Object}	event		DOM event object
	 * @returns	{Boolean}
	 */
	function isLeftClick(event) {
		return _isButton(event, 0);
	}
	
	/**
	 * Returns true if the click event was triggered by middle mouse button
	 * 
	 * @param	{Object}	event		DOM event object
	 * @returns	{Boolean}
	 */
	function isMiddleClick(event) {
		return _isButton(event, 1);
	}
	
	/**
	 * Returns true if the click event was triggered by secondary mouse button
	 * 
	 * @param	{Object}	event		DOM event object
	 * @returns	{Boolean}
	 */
	function isRightClick(event) {
		return _isButton(event, 2);
	}

	
	return {
		register:	register,
		unregister:	unregister,
		fire:		fire,
		
		keys:		keys,
		stop:		stop,
		pointerX:	pointerX,
		pointerY:	pointerY,
		isLeftClick:	isLeftClick,
		isMiddleClick:	isMiddleClick,
		isRightClick:	isRightClick
	};
})();

/*
 * Style related functions
 *
 * Copyright (C) 2011-2012 Stefan Hahn
 */
var Style = {
	addNode: function(CSSRules) {
		var styleNode = new Element('style', { 'type': 'text/css' });
		
		styleNode.appendChild(document.createTextNode(CSSRules));
		$$('head')[0].appendChild(styleNode);
	}
};

/*
 * Animation Class
 * Copyright (C) 2011-2012 Stefan Hahn
 */
var Animations = (function() {
	var AbstractAnimation = new ClassSystem.AbstractClass({
		initialize: function(element, config) {
			this.element = $(element);
			this.config = config || {};
			
			this.addGlobalAnimationListeners();
			this.handleConfig();
			this.doAnimation();
		},
		
		addGlobalAnimationListeners: function() {
			if (!this.element.animationGlobalListenersAdded) {
				this.element.addEventListener(Animations.config.events.animation.start, function(event) {
					event.target.animating = true;
					
					switch (event.animationName) {
						case 'fadeIn':
							event.target.style.display = '';
							break;
					}
					
					this.config.onAnimationStart(event);
				}.bind(this), false);
				this.element.addEventListener(Animations.config.events.animation.end, function(event) {
					switch (event.animationName) {
						case 'fadeOut':
							event.target.style.display = 'none';
							break;
					}
					
					this.config.onAnimationEnd(event);
					
					event.target.animating = false;
					event.target.style[Animations.config.domAnimationString] = '';
				}.bind(this), false);
				this.element.addEventListener(Animations.config.events.transition.end, function(event) {
					if (Element.hasClassName(event.target, 'transitionAll')) {
						Element.removeClassName(event.target, 'transitionAll');
						
						this.config.onAnimationEnd(event);
					}
				}.bind(this), true);
				
				this.element.animationGlobalListenersAdded = true;
			}
		},
		
		handleConfig: function() {
			if (!Object.isFunction(this.config.onAnimationBeforeStart)) this.config.onAnimationBeforeStart = Function.empty;
			if (!Object.isFunction(this.config.onAnimationStart)) this.config.onAnimationStart = Function.empty;
			if (!Object.isFunction(this.config.onAnimationEnd)) this.config.onAnimationEnd = Function.empty;
		},
		
		doAnimation: function() {
			this.config.onAnimationBeforeStart({
				target: this.element
			});
		}
	});
	var FadeIn = new ClassSystem.Class(AbstractAnimation, {
		doAnimation: function($super) {
			if (!this.element.animating) {
				$super();
				if (Animations.config.domAnimationString === 'WebkitAnimation') this.element.style.display = '';
				
				this.element.style[Animations.config.domAnimationString] = 'fadeIn 1s ease-in-out forwards';
			}
		}
	});
	var FadeOut = new ClassSystem.Class(AbstractAnimation, {
		doAnimation: function($super) {
			if (!this.element.animating) {
				$super();
				this.element.style[Animations.config.domAnimationString] = 'fadeOut 1s ease-in-out forwards';
			}
		}
	});
	var Highlight = new ClassSystem.Class(AbstractAnimation, {
		doAnimation: function($super) {
			if (!this.element.animating) {
				$super();
				this.element.style[Animations.config.domAnimationString] = 'highlight 1500ms linear forwards';
			}
		}
	});
	var Morph = new ClassSystem.Class(AbstractAnimation, {
		handleConfig: function($super) {
			$super();
			
			if (!this.config.properties) {
				throw new Error('No property list given.')
			}
			else {
				if (!(this.config.properties instanceof Array)) {
					this.config.properties = [this.config.properties];
				}
				
				this.config.properties = $A(this.config.properties);
			}
			
			if (!this.config.values) {
				throw new Error('No value list given.')
			}
			else {
				if (!(this.config.values instanceof Array)) {
					this.config.values = [this.config.values];
				}
				
				this.config.values = $A(this.config.values);
			}
		},
		
		doAnimation: function($super) {
			$super();

			Element.addClassName(this.element, 'transitionAll');
			
			this.config.onAnimationStart({
				target: this.element
			});
			
			this.config.properties.each(function(item, index) {
				this.element.style[item] = this.config.values[index];
			}, this);
		}
	});
	
	// get config
	var config = {
		animation: false,
		domAnimationString: 'animation',
		cssVendorPrefix: '',
		styleID: 17,
		events: {
			animation: {
				start: 'animationstart',
				end: 'animationend',
				iteration: 'animationiteration'
			},
			transition: {
				end: 'transitionend'
			}
		}
	};
	
	if (!Object.isUndefined($$('body')[0].style.animationName)) {
		config.animation = true;
	}
	
	if (!config.animation) {
		['Moz', 'Webkit', 'O'].each(function(prefix) {
			if (!Object.isUndefined($$('body')[0].style[prefix+'AnimationName'])) {
				config.animation = true;
				config.domAnimationString = prefix+'Animation';
				config.cssVendorPrefix = '-'+prefix.toLowerCase()+'-';
				
				if (prefix == 'Webkit') {
					config.events.animation.start = 'webkitAnimationStart';
					config.events.animation.end = 'webkitAnimationEnd';
					config.events.animation.iteration = 'webkitAnimationIteration';
					config.events.transition.end = 'webkitTransitionEnd'; 
				}
				
				throw $break;
			}
		});
	}
	
	$$('head > link[rel="stylesheet"]').each(function(styleNode) {
		var result = null;
		
		if (!!(result = styleNode.getAttribute('href').match(/style-(\d+)\.css$/))) {
			config.styleID = parseInt(result[1], 10);
			
			throw $break;
		}
	});
	
	// add style rules
	Style.addNode('@' + config.cssVendorPrefix + 'keyframes fadeIn {\n' +
		'from {\n' +
			'opacity: 0;\n' +
		'}\n' +
		'to {\n' +
			'opacity: 1;\n' +
		'}\n' +
	'}');
	Style.addNode('@' + config.cssVendorPrefix + 'keyframes fadeOut {\n' +
		'from {\n' +
			'opacity: 1;\n' +
		'}\n' +
		'to {\n' +
			'opacity: 0;\n' +
		'}\n' +
	'}');
	Style.addNode('@' + config.cssVendorPrefix+'keyframes highlight {\n' +
		'0% {\n' +
			'background-color: rgba(255, 255, 153, 0);\n' +
		'}\n' +
		'15% {\n' +
			'background-color: rgba(255, 255, 153, 1);\n' +
		'}\n' +
		'100% {\n' +
			'background-color: transparent;\n' +
		'}\n' +
	'}');
	Style.addNode('.transitionOpacity { ' + config.cssVendorPrefix + 'transition: opacity 1s ease-in-out; transition: opacity 1s ease-in-out; }');
	Style.addNode('.transitionAll { ' + config.cssVendorPrefix + 'transition: all 1s ease-in-out; transition: all 1s ease-in-out; }');
	
	return {
		config:		config,
		
		FadeIn:		FadeIn,
		FadeOut:	FadeOut,
		Highlight:	Highlight,
		Morph:		Morph
	};
})();

/*
 * Dragging implementation
 * Copyright (C) 2011-2012 Stefan Hahn
 *
 * Based on Scriptaculous
 * Copyright (C) 2005-2008 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
 */
var Draggables = {
	drags: [],
	observers: [],
	
	register: function(draggable) {
		if (this.drags.size() === 0) {
			this.eventMouseUp = this.endDrag.bindAsEventListener(this);
			this.eventMouseMove = this.updateDrag.bindAsEventListener(this);
			this.eventKeypress = this.keyPress.bindAsEventListener(this);

			document.addEventListener('mouseup', this.eventMouseUp, true);
			document.addEventListener('mousemove', this.eventMouseMove, true);
			document.addEventListener('keypress', this.eventKeypress, true);
		}
		
		this.drags.push(draggable);
	},
	
	unregister: function(draggable) {
		this.drags = this.drags.reject(function(d) {
			return (d == draggable);
		});
		
		if (this.drags.size() === 0) {
			document.removeEventListener('mouseup', this.eventMouseUp, true);
			document.removeEventListener('mousemove', this.eventMouseMove, true);
			document.removeEventListener('keypress', this.eventKeypress, true);
		}
	},
	
	activate: function(draggable) {
		if (draggable.options.delay) {
			this._timeout = setTimeout(function() {
				this._timeout = null;
				window.focus();
				this.activeDraggable = draggable;
			}.bind(this), draggable.options.delay);
		}
		else {
			window.focus();
			this.activeDraggable = draggable;
		}
	},
	
	deactivate: function() {
		this.activeDraggable = null;
	},
	
	updateDrag: function(event) {
		if (!this.activeDraggable) {
			return;
		}
		
		var pointer = [Event.pointerX(event), Event.pointerY(event)];
		
		if (this._lastPointer && (this._lastPointer.inspect() == pointer.inspect())) {
			return;
		}
		
		this._lastPointer = pointer;
		
		this.activeDraggable.updateDrag(event, pointer);
	},
	
	endDrag: function(event) {
		if (this._timeout) {
			clearTimeout(this._timeout);
			this._timeout = null;
		}
		
		if (!this.activeDraggable) {
			return;
		}
		
		this._lastPointer = null;
		this.activeDraggable.endDrag(event);
		this.activeDraggable = null;
	},
	
	keyPress: function(event) {
		if (this.activeDraggable) {
			this.activeDraggable.keyPress(event);
		}
	},
	
	addObserver: function(observer) {
		this.observers.push(observer);
		this._cacheObserverCallbacks();
	},
	
	removeObserver: function(element) {
		this.observers = this.observers.reject(function(o) {
			return (o.element == element);
		});
		this._cacheObserverCallbacks();
	},
	
	// 'onStart', 'onEnd', 'onDrag'
	notify: function(eventName, draggable, event) {
		if (this[eventName + 'Count'] > 0) {
			this.observers.each(function(o) {
				if (o[eventName]) {
					o[eventName](eventName, draggable, event);
				}
			});
		}
		
		if (draggable.options[eventName]) {
			draggable.options[eventName](draggable, event);
		}
	},
	
	_cacheObserverCallbacks : function() {
		['onStart', 'onEnd', 'onDrag'].each(function(eventName) {
			Draggables[eventName + 'Count'] = Draggables.observers.select(function(o) {
				return o[eventName];
			}).size();
		});
	}
}; 

var Draggable = new ClassSystem.Class({
	initialize: function(element) {
		var defaults = {
			handle: false,
			reverteffect: function(element, top_offset, left_offset) {
				var top = (parseFloat(Element.getStyle(element, 'top')) - top_offset).toString() + 'px';
				var left = (parseFloat(Element.getStyle(element, 'left')) - left_offset).toString() + 'px';
 				
				new Animations.Morph(element, {
					properties: ['top', 'left'],
					values: [top, left]
				});
			},
			endeffect: function(element) {
				var toOpacity = ((Object.isNumber(element._opacity)) ? (element._opacity) : (1.0));
				
				// TODO: 0.2 seconds
				new Animations.Morph(element, {
					properties: ['opacity'],
					values: [toOpacity],
					onAnimationEnd: function(event) {
						Draggable._dragging[event.target] = false;
					}
				});
			},
			zindex: 1000,
			revert: false,
			quiet: false,
			scroll: false,
			scrollSensitivity: 20,
			scrollSpeed: 15,
			snap: false,
			delay: 0
		};
		
		if (!arguments[1] || Object.isUndefined(arguments[1].endeffect)) {
			Object.extend(defaults, {
				starteffect: function(element) {
					element._opacity = Element.getStyle(element, 'opacity');
					Draggable._dragging[element] = true;
					
					// TODO: 0.2 seconds
					new Animations.Morph(element, {
						properties: ['opacity'],
						values: [0.7]
					});
				}
			});
		}
		
		var options = Object.extend(defaults, arguments[1] || { });
		
		this.element = $(element);
		
		if (options.handle && Object.isString(options.handle)) this.handle = this.element.querySelector('.' + options.handle);
		if (!this.handle) this.handle = $(options.handle);
		if (!this.handle) this.handle = this.element;

		if (options.scroll && !options.scroll.scrollTo && !options.scroll.outerHTML) {
			options.scroll = $(options.scroll);
			this._isScrollChild = Element.descendantOf(this.element, options.scroll);
		}
		
		// fix IE
		// Element.makePositioned(this.element);

		this.options = options;
		this.dragging = false;

		this.eventMouseDown = this.initDrag.bindAsEventListener(this);
		this.handle.addEventListener('mousedown', this.eventMouseDown, true);

		Draggables.register(this);
	},

	destroy: function() {
		this.handle.removeEventListener('mousedown', this.eventMouseDown, true);
		Draggables.unregister(this);
	},

	currentDelta: function() {
		return [
			parseInt(Element.getStyle(this.element, 'left') || '0'),
			parseInt(Element.getStyle(this.element, 'top') || '0')
		];
	},

	initDrag: function(event) {
		if (!Object.isUndefined(Draggable._dragging[this.element]) && Draggable._dragging[this.element]) {
			return;
		}
		
		if (Event.isLeftClick(event)) {
			var src = event.target;
			
			if ((tag_name = src.tagName.toLowerCase()) && (['input', 'select', 'option', 'button', 'textarea'].indexOf(tag_name) > -1)) {
				return;
			}

			var pointer = [Event.pointerX(event), Event.pointerY(event)];
			var pos = Element.cumulativeOffset(this.element);
			
			this.offset = [0, 1].map(function(i) {
				return (pointer[i] - pos[i]);
			});

			Draggables.activate(this);
			Event.stop(event);
		}
	},

	startDrag: function(event) {
		this.dragging = true;
		
		if (!this.delta) {
			this.delta = this.currentDelta();
		}

		if (this.options.zindex) {
			this.originalZ = parseInt(Element.getStyle(this.element, 'z-index') || 0);
			this.element.style.zIndex = this.options.zindex;
		}

		if (this.options.ghosting) {
			this._clone = this.element.cloneNode(true);
			this._originallyAbsolute = (Element.getStyle(this.element, 'position') == 'absolute');
			
			if (!this._originallyAbsolute) {
				// TODO: absolutize
				// Element.absolutize(this.element);
			}
			
			this.element.parentNode.insertBefore(this._clone, this.element);
		}

		if (this.options.scroll) {
			if (this.options.scroll == window) {
				var where = this._getWindowScroll(this.options.scroll);
				
				this.originalScrollLeft = where.left;
				this.originalScrollTop = where.top;
			}
			else {
				this.originalScrollLeft = this.options.scroll.scrollLeft;
				this.originalScrollTop = this.options.scroll.scrollTop;
			}
		}

		Draggables.notify('onStart', this, event);

		if (this.options.starteffect) {
			this.options.starteffect(this.element);
		}
	},

	updateDrag: function(event, pointer) {
		if (!this.dragging) {
			this.startDrag(event);
		}

		// if (!this.options.quiet) {
		// 	Position.prepare();
		// 	Droppables.show(pointer, this.element);
		// }

		Draggables.notify('onDrag', this, event);

		this.draw(pointer);
		
		if (this.options.change) {
			this.options.change(this);
		}

		if (this.options.scroll) {
			this.stopScrolling();

			var p;
			var speed = [0, 0];
			
			if (this.options.scroll == window) {
				with (this._getWindowScroll(this.options.scroll)) {
					p = [left, top, left + width, top + height];
				}
			}
			else {
				p = Element.viewportOffset(this.options.scroll).toArray();
				p[0] += this.options.scroll.scrollLeft + (document.documentElement.scrollLeft || document.body.scrollLeft);
				p[1] += this.options.scroll.scrollTop + (document.documentElement.scrollTop || document.body.scrollTop);
				p.push(p[0] + this.options.scroll.offsetWidth);
				p.push(p[1] + this.options.scroll.offsetHeight);
			}
			
			if (pointer[0] < (p[0] + this.options.scrollSensitivity)) speed[0] = pointer[0] - (p[0] + this.options.scrollSensitivity);
			if (pointer[1] < (p[1] + this.options.scrollSensitivity)) speed[1] = pointer[1] - (p[1] + this.options.scrollSensitivity);
			if (pointer[0] > (p[2] - this.options.scrollSensitivity)) speed[0] = pointer[0] - (p[2] - this.options.scrollSensitivity);
			if (pointer[1] > (p[3] - this.options.scrollSensitivity)) speed[1] = pointer[1] - (p[3] - this.options.scrollSensitivity);
			this.startScrolling(speed);
		}

		if (WEBKIT) {
			window.scrollBy(0, 0);
		}

		Event.stop(event);
	},

	finishDrag: function(event, success) {
		this.dragging = false;
		
		var dropped = false;
		var revert = this.options.revert;
		var d = this.currentDelta();
		
		// if (this.options.quiet) {
		// 	var pointer = [Event.pointerX(event), Event.pointerY(event)];
		// 	Droppables.show(pointer, this.element);
		// }
		
		if (this.options.ghosting) {
			if (!this._originallyAbsolute) {
				// TODO: relativize
				// Element.relativize(this.element);
			}
			
			delete this._originallyAbsolute;
			this._clone.parentNode.removeChild(this._clone);
			this._clone = null;
		}
		
		// if (success) {
		// 	dropped = Droppables.fire(event, this.element);
			
		// 	if (!dropped) {
		// 		dropped = false;
		// 	}
		// }
		
		// if (dropped && this.options.onDropped) {
		// 	this.options.onDropped(this.element);
		// }
		
		Draggables.notify('onEnd', this, event);
		
		if (revert && Object.isFunction(revert)) {
			revert = revert(this.element);
		}
		
		if (revert && this.options.reverteffect) {
			if (!dropped || (revert != 'failure')) {
				this.options.reverteffect(this.element, d[1] - this.delta[1], d[0] - this.delta[0]);
			}
		}
		else {
			this.delta = d;
		}
		
		if (this.options.zindex) {
			this.element.style.zIndex = this.originalZ;
		}
		
		if (this.options.endeffect) {
			this.options.endeffect(this.element);
		}
		
		Draggables.deactivate(this);
		// Droppables.reset();
	},

	keyPress: function(event) {
		if (event.keyCode != Event.keys.KEY_ESC) {
			return;
		}
		
		this.finishDrag(event, false);
		Event.stop(event);
	},

	endDrag: function(event) {
		if (!this.dragging) {
			return;
		}
		
		this.stopScrolling();
		this.finishDrag(event, true);
		this.delta = null;
		Event.stop(event);
	},

	draw: function(point) {
		var pos = Element.cumulativeOffset(this.element);
		
		if (this.options.ghosting) {
			var r = Element.cumulativeScrollOffset(this.element);
			pos[0] += r[0] - (document.documentElement.scrollLeft || document.body.scrollLeft);
			pos[1] += r[1] - (document.documentElement.scrollTop || document.body.scrollTop);
		}

		var d = this.currentDelta();
		pos[0] -= d[0];
		pos[1] -= d[1];

		if (this.options.scroll && (this.options.scroll != window && this._isScrollChild)) {
			pos[0] -= this.options.scroll.scrollLeft - this.originalScrollLeft;
			pos[1] -= this.options.scroll.scrollTop - this.originalScrollTop;
		}

		var p = [0, 1].map(function(i) {
			return (point[i] - pos[i] - this.offset[i]);
		}.bind(this));

		if (this.options.snap) {
			if (Object.isFunction(this.options.snap)) {
				p = this.options.snap(p[0], p[1], this);
			}
			else if (Object.isArray(this.options.snap)) {
				p = p.map(function(v, i) {
					return (Math.round((v / this.options.snap[i])) * this.options.snap[i]);
				}.bind(this));
			}
			else {
				p = p.map(function(v) {
					return (Math.round((v / this.options.snap)) * this.options.snap);
				}.bind(this));
			}
			
		}

		var style = this.element.style;
		if (!this.options.constraint || (this.options.constraint == 'horizontal')) {
			style.left = p[0] + 'px';
		}
		
		if (!this.options.constraint || (this.options.constraint == 'vertical')) {
			style.top = p[1] + 'px';
		}

		if (style.visibility == 'hidden') {
			style.visibility = '';
		}
	},

	stopScrolling: function() {
		if (this.scrollInterval) {
			clearInterval(this.scrollInterval);
			this.scrollInterval = null;
			Draggables._lastScrollPointer = null;
		}
	},

	startScrolling: function(speed) {
		if (!(speed[0] || speed[1])) {
			return;
		}
		
		this.scrollSpeed = [speed[0] * this.options.scrollSpeed, speed[1] * this.options.scrollSpeed];
		this.lastScrolled = new Date();
		this.scrollInterval = setInterval(function() {
			this.scroll();
		}.bind(this), 10);
	},

	scroll: function() {
		var current = new Date();
		var delta = current - this.lastScrolled;
		this.lastScrolled = current;
		
		if (this.options.scroll == window) {
			with (this._getWindowScroll(this.options.scroll)) {
				if (this.scrollSpeed[0] || this.scrollSpeed[1]) {
					var d = delta / 1000;
					this.options.scroll.scrollTo(left + d * this.scrollSpeed[0], top + d * this.scrollSpeed[1]);
				}
			}
		}
		else {
			this.options.scroll.scrollLeft += this.scrollSpeed[0] * delta / 1000;
			this.options.scroll.scrollTop += this.scrollSpeed[1] * delta / 1000;
		}
		
		// Position.prepare();
		// Droppables.show(Draggables._lastPointer, this.element);
		Draggables.notify('onDrag', this);
		
		if (this._isScrollChild) {
			Draggables._lastScrollPointer = Draggables._lastScrollPointer || $A(Draggables._lastPointer);
			Draggables._lastScrollPointer[0] += this.scrollSpeed[0] * delta / 1000;
			Draggables._lastScrollPointer[1] += this.scrollSpeed[1] * delta / 1000;
			
			if (Draggables._lastScrollPointer[0] < 0) Draggables._lastScrollPointer[0] = 0;
			if (Draggables._lastScrollPointer[1] < 0) Draggables._lastScrollPointer[1] = 0;
			
			this.draw(Draggables._lastScrollPointer);
		}

		if (this.options.change) {
			this.options.change(this);
		}
	},

	_getWindowScroll: function(w) {
		var T, L, W, H;
		
		with (w.document) {
			if (w.document.documentElement && documentElement.scrollTop) {
				T = documentElement.scrollTop;
				L = documentElement.scrollLeft;
			}
			else if (w.document.body) {
				T = body.scrollTop;
				L = body.scrollLeft;
			}
			
			if (w.innerWidth) {
				W = w.innerWidth;
				H = w.innerHeight;
			}
			else if(w.document.documentElement && documentElement.clientWidth) {
				W = documentElement.clientWidth;
				H = documentElement.clientHeight;
			}
			else {
				W = body.offsetWidth;
				H = body.offsetHeight;
			}
		}
		return {
			top : T,
			left : L,
			width : W,
			height : H
		};
	}
});

Draggable._dragging = { };

/* 
 * Abstract Module class
 * All modules should inhert from this class
 * 
 * Copyright (C) 2011-2012 Stefan Hahn
 */
Modules.Util.AbstractModule = new ClassSystem.AbstractClass({
	initialize: function(callerObj) {
		this.callerObj = callerObj;
		this.storage = this.callerObj.storage;
		
		this.initializeVariables();
		this.addStyleRules();
		this.registerOptions();
		this.addListeners();
		this.buildUI();
		this.finish();
	},
	initializeVariables: function() {},
	addStyleRules: function() {},
	registerOptions: function() {},
	addListeners: function() {},
	buildUI: function() {},
	finish: function() {},
});

/* 
 * Abstract Core Module class
 * All core modules should inhert from this class
 * 
 * Copyright (C) 2011-2012 Stefan Hahn
 */
Modules.Util.AbstractCoreModule = new ClassSystem.AbstractClass(Modules.Util.AbstractModule, {
	initialize: function($super, callerObj) {
		this.callerObj = callerObj;
		this.storage = this.callerObj.storage;
		
		this.initializeVariables();
		this.addStyleRules();
		this.addListeners();
		this.finish();
	},
	
	registerOptions: function($super) {
		throw new Error('User interface functions are not available from core modules');
	},
	
	buildUI: function($super) {
		throw new Error('User interface functions are not available from core modules');
	}
});

/* 
 * Update Core Module
 * Copyright (C) 2011-2012 Stefan Hahn
 */
Modules.Core.Update = new ClassSystem.Class(Modules.Util.AbstractCoreModule, {
	finish: function() {
		this.check();
	},
	
	check: function() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: this.callerObj.getUpdateServer()+'?version='+encodeURIComponent(this.callerObj.getVersion())+'&getNonStableReleases='+((this.storage.getValue('getNonStableReleasesStatus', false)) ? '1' : '0'),
			headers: {
				'Accept': 'text/xml'
			},
			onload: function(response) {
				var xml = (new DOMParser()).parseFromString(response.responseText, 'text/xml');
				
				if (xml.documentElement.getAttribute('newVersion') === 'true') {
					(this.callerObj.getUpdateCallback())(xml);
				}
			}.bind(this)
		});
	}
});

/* 
 * Compare Module
 * Copyright (C) 2012 Stefan Hahn
 */
Modules.AddOn.Compare = new ClassSystem.Class(Modules.Util.AbstractModule, {
	initializeVariables: function() {
		this.posts = [];
		this.cacheStorage = Storage.getInterface('lastmu', 'compatibilityCache');
		
		$$('.post').each(function(post) {
			this.posts.push({
				postID: parseInt(post.getAttribute('id').slice(1)),
				text: post.querySelector('.postMessage').innerHTML.replace(/<br(?: ?\/)?>/g, "\n")
			});
		}, this);
	},
	
	addStyleRules: function() {
		Style.addNode('.lastmuSideArrows { color: transparent !important; }');
		Style.addNode('.lastmuInfo > p { margin: 5px !important; }');
	},
	
	registerOptions: function() {
		this.callerObj.registerBoolOption('compare', 'Compare taste in posts', true);
	},
	
	addListeners: function() {
		Event.register('lastfmUsernameChange', function(event) {
			this.cacheStorage.clear();
		}, this);
	},
	
	buildUI: function() {
		if (this.storage.getValue('lastfmUsernameValue') && this.storage.getValue('compareStatus')) {
			this.posts.each(function(post) {
				var match = post.text.match(/last(?:\.fm|fm(?:\.[A-Za-z]{2,3})+)\/user\/(.*)(?:\s|$)/);
				
				if (!!match && (match[1].toLowerCase() !== this.storage.getValue('lastfmUsernameValue').toLowerCase())) {
					this.compareTaste(match[1], post.postID);
				}
			}, this);
		}
	},
	
	compareTaste: function(username, postID) {
		var cachedData = this.cacheStorage.getValue(username.toLowerCase());
		
		if (!cachedData || ((Math.floor((new Date()).getTime() / 1000) - cachedData.time) > 604800)) {
			this.compareOnline(username, postID);
		}
		else {
			this.compareCached(cachedData, postID);
		}
	},
	
	compareCached: function(cachedData, postID) {
		this.insertComparisonResult(postID, cachedData.username, cachedData.score, cachedData.stats, cachedData.commonArtists);
	},
	
	compareOnline: function(username, postID) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://ws.audioscrobbler.com/2.0/?method=tasteometer.compare&type1=user&type2=user&api_key=f27f59e52cce2ed5fd8bbd412c7165bf&limit=5&value1=' + encodeURIComponent(this.storage.getValue('lastfmUsernameValue')) + '&value2=' + username,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml'
			},
			onload: function(response) {
				var lastfmXML = (new DOMParser()).parseFromString(response.responseText, 'application/xml');
				
				if ((response.status == 200) && lastfmXML.querySelector('score')) {
					var score = parseFloat(lastfmXML.querySelector('score').firstChild.nodeValue);
					var stats = this.getCompatibilityStats(score);
					var commonArtists = [];
					
					if (lastfmXML.querySelector('artist > name')) {
						$A(lastfmXML.querySelectorAll('artist > name')).each(function(nameNode, index) {
							commonArtists.push(nameNode.firstChild.nodeValue);
						});
					}
					
					// caching data
					this.cacheStorage.setValue(username.toLowerCase(), {
						username: username, 
						score: score,
						stats: stats,
						commonArtists: commonArtists,
						time: Math.floor((new Date()).getTime() / 1000)
					});
					
					// insert data
					this.insertComparisonResult(postID, username, score, stats, commonArtists);
				}
			}.bind(this)
		});
	},
	
	insertComparisonResult: function(postID, username, score, stats, commonArtists) {
		var sideArrows = new Element('div', { 'class': 'sideArrows lastmuSideArrows' });
		var infoBox = new Element('div', { id: 'lastmuInfo' + postID, 'class': 'post reply lastmuInfo' });
		var commonArtistsNode = new Element('p', { style: 'font-size: 0.8em;' });
		var commonArtistsText = '';
		var postWidth = 0;
		var infoWidth = 0;
		
		sideArrows.appendChild(document.createTextNode('>>'));
		infoBox.innerHTML = "<p>Your musical compatibility with <a target='_blank' href='http://www.last.fm/user/" + username + "'>" + username + "</a> is <strong style='color:" + stats.color + "'>" + stats.name.toUpperCase() + "</strong></p>";
		
		if (!!commonArtists.length) {
			commonArtists.each(function(name, index) {
				commonArtistsText += name;
				
				if (index === (commonArtists.length - 2)) {
					commonArtistsText += ' and '
				}
				else if (index === (commonArtists.length - 1)) {
					commonArtistsText += '.';
				}
				else {
					commonArtistsText += ', ';
				}
			});
			
			commonArtistsNode.innerHTML = 'Music you have in common includes ' + commonArtistsText;
			infoBox.appendChild(commonArtistsNode);
		}
		
		$('pc' + postID).appendChild(sideArrows);
		$('pc' + postID).appendChild(infoBox);
		
		postWidth = parseFloat(Element.getStyle($('p' + postID), 'width'));
		infoWidth = parseFloat(Element.getStyle($('lastmuInfo' + postID), 'width'));
		
		if (postWidth > infoWidth) {
			infoBox.style.width = postWidth.toString() + 'px';
		}
		else {
			$('p' + postID).style.width = infoWidth.toString() + 'px';
		}
	},
	
	getCompatibilityStats: function(score) {
		var result = {
			name: 'Unknown',
			color: '#000'
		};
		
		if (score > 0) {
			if (score < 0.10) {
				result.name = 'Very Low';
				result.color = '#9A9A9A';
			}
			else if (score < 0.30) {
				result.name = 'Low';
				result.color = '#453E45';
			}
			else if (score < 0.50) {
				result.name = 'Medium';
				result.color = '#5336BD';
			}
			else if (score < 0.70) {
				result.name = 'High';
				result.color = '#05BD4C';
			}
			else if (score < 0.90) {
				result.name = 'Very High';
				result.color = '#E9C102';
			}
			else if (score <= 1.00) {
				result.name = 'Super';
				result.color = '#FF0101';
			}
		}
		
		return result;
	}
});

/*
 * last.mu
 * Copyright (C) 2012 Stefan Hahn
 */
var Lastmu = new ClassSystem.Class((function() {
	/**
	 * Interface to access global storage
	 * 
	 * @type	{StorageInterface}
	 */
	var storage = Storage.getInterface('lastmu');
	
	/**
	 * Hash of all active core module instances
	 * 
	 * @type	{Hash}
	 */
	var coreModuleInstances = $H({});
	
	/**
	 * Hash of all active addon module instances
	 * 
	 * @type	{Hash}
	 */
	var moduleInstances = $H({});
	
	function initialize() {
		this.initCoreModules();
		this.addStyleRules();
		this.buildUI();
		
		Window.addEventListener('load', function(event) {
			this.finish();
		}.bindAsEventListener(this), true);
	}
	
	function initCoreModules() {
		$H(Modules.Core).each(function(pair) {
			try {
				// TODO: reactivate when update server is set up
				// this.coreModuleInstances.set(pair.key, new pair.value(this));
			}
			catch (e) {
				Window.alert('Couldn\'t initialze core module »'+pair.key+'«.'+"\n"+e.name+' - '+e.message);
			}
		}, this);
	}
	
	function addStyleRules() {
		Style.addNode('.hidden { display: none; height: 0; overflow: hidden; position: absolute; left: -9000px; max-width: 8000px; }');
	}
	
	function buildUI() {
		this.buildUIPanel('lastmuSettings', 'last.mu', function(contentDiv) {
			var settingsList = new Element('ul', { id: 'lastmuSettingsGeneral' });
			var generalSettingsCategoryListItem = new Element('li', { 'class': 'settings-cat' });
			
			generalSettingsCategoryListItem.appendChild(document.createTextNode('General'));
			
			settingsList.appendChild(generalSettingsCategoryListItem);
			contentDiv.appendChild(settingsList);
		});
		this.registerTextOption('lastfmUsername', 'last.fm username', null, function(value) {
			Event.fire('lastfmUsernameChange', {
				newUsername: value
			});
		});
	}
	
	function finish() {
		this.initModules();
	}
	
	function initModules() {
		$H(Modules.AddOn).each(function(pair) {
			try {
				this.moduleInstances.set(pair.key, new pair.value(this));
			}
			catch (e) {
				Window.alert('Couldn\'t initialze module »'+pair.key+'«.'+"\n"+e.name+' - '+e.message);
			}
		}, this);
	}
	
	function updateCallback(xml) {
		
	}
	
	function buildUIPanel(panelID, title, contentBuilder, context) {
		var windowLink = new Element('a', { id: panelID + 'WindowLink', href: 'javascript:void(0);' });
		var panelDiv = new Element('div', { id: panelID, 'class': 'UIPanel', style: 'display: none;' });
		var extPanelDiv = new Element('div', { 'class': 'extPanel reply' });
		var panelHeaderDiv = new Element('div', { 'class': 'panelHeader' });
		var panelControlsSpan = new Element('span');
		var panelControlsCloseButton = new Element('img', { 'class': 'pointer', src: '//static.4chan.org/image/buttons/burichan/cross.png', alt: 'Close', title: 'Close' });
		var contentDiv = new Element('div');
		
		panelControlsCloseButton.addEventListener('click', function(event) {
			$(panelID).style.display = 'none';
		}, true);
		
		windowLink.addEventListener('click', function(event) {
			$(panelID).style.display = '';
		}, true);
		
		windowLink.appendChild(document.createTextNode(title));
		
		panelControlsSpan.appendChild(panelControlsCloseButton);
		panelHeaderDiv.appendChild(document.createTextNode(title));
		panelHeaderDiv.appendChild(panelControlsSpan);
		extPanelDiv.appendChild(panelHeaderDiv);
		extPanelDiv.appendChild(contentDiv);
		panelDiv.appendChild(extPanelDiv);
		
		try {
			contentDiv.appendChild(contentBuilder.call(context));
		}
		catch (e) {
			contentBuilder.call(context, contentDiv);
		}
		
		$('navtopright').insertBefore(windowLink, $$('#navtopright > a:last-child')[0]);
		$('navtopright').insertBefore(document.createTextNode('] ['), $$('#navtopright > a:last-child')[0]);
		
		$$('body')[0].appendChild(panelDiv);
	}
	
	function registerBoolOption(optionID, optionTitle, defaultValue, switchCallback, context) {
		if (!!$(optionID)) throw new Error('optionID \''+optionID+'\' already used');
		
		var optionListElement = new Element('li');
		var optionLabel = new Element('label', { 'for': optionID });
		var optionInput = new Element('input', { id: optionID, 'class': 'menuOption', 'type': 'checkbox' });
		
		optionInput.addEventListener('change', function(event) {
			if (Object.isFunction(switchCallback) && !switchCallback.call(context, event, event.target.checked)) {
				event.target.checked = !event.target.checked;
			}
			
			this.storage.setValue(event.target.getAttribute('id') + 'Status', event.target.checked);
		}.bindAsEventListener(this), true);
		
		optionInput.checked = this.storage.getValue(optionID + 'Status', defaultValue);
		optionLabel.appendChild(optionInput);
		optionLabel.appendChild(document.createTextNode(' ' + optionTitle));
		optionListElement.appendChild(optionLabel);
		
		$('lastmuSettingsGeneral').appendChild(optionListElement);
	}
	
	function registerTextOption(optionID, optionTitle, defaultValue, changeCallback, context) {
		if (!!$(optionID)) throw new Error('optionID \''+optionID+'\' already used');
		
		var optionValue = ((!!this.storage.getValue(optionID + 'Value', defaultValue)) ? this.storage.getValue(optionID + 'Value', defaultValue) : 'Not set yet');
		var optionListElement = new Element('li');
		var optionSpan = new Element('span', { id: optionID, 'class': 'textOptionValue', title: 'Click to change' });
		var optionInput = new Element('input', { id: optionID + 'Input', 'class': 'menuOption hidden', 'type': 'text', size: '8', autocomplete: 'off', value: optionValue });
		
		optionSpan.addEventListener('click', function(event) {
			Element.addClassName(event.target, 'hidden');
			Element.removeClassName(event.target.nextSibling, 'hidden');
			event.target.nextSibling.focus();
		}, true);
		
		optionInput.addEventListener('focus', function(event) {
			event.target.select();
		}, true);
		
		optionInput.addEventListener('keydown', function(event) {
			if ((event.keyCode === Event.keys.KEY_RETURN) && (event.target.value.length > 0)) {
				var optionSpan = event.target.previousSibling;
				var optionInput = event.target;
				
				this.storage.setValue(optionSpan.getAttribute('id') + 'Value', optionInput.value);
				optionSpan.firstChild.replaceData(0, optionSpan.firstChild.nodeValue.length, this.storage.getValue(optionSpan.getAttribute('id') + 'Value'));
				
				Element.addClassName(optionInput, 'hidden');
				Element.removeClassName(optionSpan, 'hidden');
				
				if (Object.isFunction(changeCallback)) changeCallback.call(context, optionInput.value);
				
				event.preventDefault();
			}
		}.bindAsEventListener(this), true);
		
		optionSpan.appendChild(document.createTextNode(optionValue));
		optionListElement.appendChild(document.createTextNode(optionTitle + ': '));
		optionListElement.appendChild(optionSpan);
		optionListElement.appendChild(optionInput);
		
		$('lastmuSettingsGeneral').appendChild(optionListElement);
	}
	
	/**
	 * Returns the URI where the update server for this application is located
	 * 
	 * @return	{String}				Update server URI
	 */
	function getUpdateServer() {
		return 'http://example.com/';
	}
	
	/**
	 * Returns the version of the application
	 * 
	 * @return	{String}				Version number string
	 */
	function getVersion() {
		return '1.0.0a1-78';
	}
	
	/**
	 * Returns a function which handles an update xml given as the only parameter
	 * 
	 * @return	{Function}				Update callback function
	 */
	function getUpdateCallback() {
		return updateCallback.bind(this);
	}
	
	return {
		storage:		storage,
		coreModuleInstances:	coreModuleInstances,
		moduleInstances:	moduleInstances,
		
		initialize:		initialize,
		initCoreModules:	initCoreModules,
		addStyleRules:		addStyleRules,
		buildUI:		buildUI,
		finish:			finish,
		initModules:		initModules,
		
		buildUIPanel:		buildUIPanel,
		registerBoolOption:	registerBoolOption,
		registerTextOption:	registerTextOption,
		getUpdateServer:	getUpdateServer,
		getVersion:		getVersion,
		getUpdateCallback:	getUpdateCallback
	};
})());

Window.lastmu = new Lastmu();
