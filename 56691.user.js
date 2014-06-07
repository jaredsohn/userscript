/*
	Google Ctrl-Arrow - advanced keyboard navigation for Google search services.
	This script is compatible with Customize Google extension and does not break "find as you type" Firefox option.

	(c) Yevgen Gorshkov aka atany, ye.gorshkov at gmail dot com
	GPL.

	2007-12-16:
	- (NEW!) configurable automatic script update notification
	- removed visible garbage at the end of the page when Steam search is enabled
	- fixed hint visibility on page load

	2007-10-05:
	- fixed bug in detecting active query input element

	2007-09-23:
	- code rewritten in OOP style using Mootools-based library. More code, better readability (let's hope)
	- CustomizeGoogle Steam search support (web and image searches)!
	- added Google Books and Catalogs searches
	- better support for YouTube movies in Google web search results
	- updated support for Google Groups search (added new @include urls)
	- GCA hint now correctly placed on both old and new Google layouts

	2007-09-19:
 	- added themes support for better compatibility with Google redesign userscripts (e.g. http://userstyles.org/styles/1693)
 	- added simple theme autodetection. Supports: default Google style, 'dark blue' and 'dark gray' redesigns by Valacar
 	- rewritten help and settings window to correctly show scrollbar (Ctrl-F1)
 
	2007-05-20:
	- updated CSS to fix problems with Google's new layout. Thanks Logan Koester <logan@logankoester.com>
	- fixed hidden search results details when the last item selected
	- few code cleanup

	2007-04-27:
	- fixed Blogsearch support (new layout)
	- partially fixed Google Groups search (new layout)
	- updated service URLs

	2007-04-26:
	- new option to select search result when it is by with middle button

	2007-04-24:
	- fixed hidden result details bug when scrolling down through the results (works for all search results types)
	- removed onload event

	2006-12-15:
		- added navigation through search results with Up/Down keys
		- Google Web, Images, News, Groups, Catalog, Codesearch, Scholar, Music, Video are supported
		- added help window (Ctrl-F1)
		- added open link in tab mode
 		  ... and more
*/

// ==UserScript==
// @name			Google Ctrl-Arrow
// @namespace	   http://ye.gorshkov.googlepages.com/gca
// @description	 Advanced keyboard navigation for Google search services. Compatible with Customize Google extension, does not break "find as you type" Firefox option.
// @include		 http://www.google.*
// @include		 http://images.google.*
// @include		 http://groups.google.*/groups?*
// @include		 http://groups.google.*/groups/search?*
// @include		 http://groups.google.*/group/*/search?*
// @include		 http://news.google.*
// @include		 http://video.google.*/videosearch?*
// @include		 http://scholar.google.*/scholar?*
// @include		 http://books.google.*/books?*
// @include		 http://catalogs.google.*/catalogs?*
// @include		 http://blogsearch.google.*/blogsearch?*
// ==/UserScript==

const GCA_NAME="Google Ctrl-Arrow";
const GCA_TIMESTAMP="16 Dec 2007 15:45:00 GMT";

const CUSTOM_CSS={
	regular:[
			"div.g { margin-top:.5em; margin-bottom:.5em; padding-top:.5em; }",
			"#gca-help { position:fixed; top:0; left:0; width:100%; height:100%; color:#000; }",
			"#gca-help * { color:#000; }",
			"#gca-help .close { float:right; margin:.3em 8px 0; width:16px; height:16px; background:transparent url('chrome://global/skin/icons/close.png') 0 0 no-repeat; overflow:hidden; line-height:0; text-decoration:none; border:none; outline:none !important; }",
			"#gca-help .close:hover { background-position:-16px 0; text-decoration:none; }",
			"#gca-help .close:hover:active { background-position:-32px 0; text-decoration:none; }",
			"#gca-help .tool { margin:10% auto 0; width:55%; padding:.3em 0; height:2.4em; background-color:#36c; border:solid #36c 3px; -moz-box-sizing:border-box; }",
			"#gca-help h1 { display:block; color:#fff; font-family:arial,sans-serif; font-size:120%; padding:.3em 0 0; margin:0; text-align:center; }",
			"#gca-help .scroll { margin:0 auto; width:55%; height:62%; background-color:#e5ecf9; border:solid #36c 3px; overflow-y:auto; padding:0 1em; -moz-box-sizing:border-box; }",
			"#gca-help dl { margin:0 0 .5em; }",
			"#gca-help dt { color:#c71800; font-weight:bold; }",
			"#gca-help label { cursor:pointer; }",
			"#gca-help #gca-cfg-check-period-warn { font-weight:bold; color:#c71800 !important; font-size:75%; }",
			"#gca-hint { position:absolute; top:.1em; left:.5em; font-size:10pt; white-space:nowrap; }",
			"#gca-hint a, #gca-hint div a { display:block; float:left; color:#c71800 !important; font-weight:normal; text-decoration:none; font-size:75%; margin:.3em; }",
			"#gca-hint a:hover, #gca-hint div a:hover { text-decoration:underline; }",
			"#gca-hint a.update-warning span { color:#f66e60 !important; font-weight:bold; }",
			".selected-result a.l { outline:none !important; color:#c71800; }",
			".selected-result { background:transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABaCAYAAAB5XDy9AAAAAXNSR0IArs4c6QAAAAZiS0dEACIAOABhUo8i/QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9cJEwkVMwvnoLoAAACCSURBVBjTbZDBDcMwDAOPGqS7dLWO0j0KdJk+AnQH9qFIjpJ+DFMipbN5vOz4vJ/Etn0JIA90uzulsiYCjdtqnCwXKQJctZNPEPI0C4KsiRCumyuBNJc3S092y9XAEMpsxZbcgXqyPHZobMtYQpYv1NIqi7iQHqjmb0h/wCfa4b0SP5xTF6wZhVFRAAAAAElFTkSuQmCC') 0 0 repeat-x; }",
			"#ImgContent .selected-result { background:none !important; }"
			],
	inplace:["#ImgContent .selected-result a.l img { outline:solid #fc0 4px; }"],
	intab:	[
			".selected-result a.l { padding-right:15px; background:transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAFVBMVEVmmcwzmcyZzP8AZswAZv////////9E6giVAAAAB3RSTlP///////8AGksDRgAAADhJREFUGFcly0ESAEAEA0Ei6/9P3sEcVB8kmrwFyni0bOeyyDpy9JTLEaOhQq7Ongf5FeMhHS/4AVnsAZubxDVmAAAAAElFTkSuQmCC') right center no-repeat; }",
			"#ImgContent .selected-result a.l { padding:0 !important; background:none !important; }",
			"#ImgContent .selected-result a.l img { outline:solid #c71800 4px; }"
			],
	newlayout:["#gca-hint { top:21px; left:.5em; }"],
	blog:	["#gca-hint { top:0 !important; }"]
};

const THEMES_CSS={
	"0": "#gca-hint a.update-warning span { color:#c71800 !important; } .selected-result { background:transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABaCAYAAAB5XDy9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAfklEQVQY03WLMRKCQBAEe9fUjxhbfsmvmpj6ByMzORC4MWKsQ0i6ZnZ6OV/vysvpCLfHU0gvJcAOggQ5ba2bv9rz9J9idTNCCXLaXamtUo1Vra08u9amMifEr04LYrI3NoiPvcHViDFBfUIMCfT2nOgTongtCdEtiXdCFCQdvlM3TwmGz/HyAAAAAElFTkSuQmCC') 0 0 repeat-x; }",
	"1": ".selected-result { background:transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABaCAYAAAB5XDy9AAAAAXNSR0IArs4c6QAAAAZiS0dEACIAOABhUo8i/QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9cJEwkVMwvnoLoAAACCSURBVBjTbZDBDcMwDAOPGqS7dLWO0j0KdJk+AnQH9qFIjpJ+DFMipbN5vOz4vJ/Etn0JIA90uzulsiYCjdtqnCwXKQJctZNPEPI0C4KsiRCumyuBNJc3S092y9XAEMpsxZbcgXqyPHZobMtYQpYv1NIqi7iQHqjmb0h/wCfa4b0SP5xTF6wZhVFRAAAAAElFTkSuQmCC') 0 0 repeat-x; }",
	"2": ".selected-result { background:transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABaCAYAAAB5XDy9AAAAAXNSR0IArs4c6QAAAAZiS0dEADMAMwAzhj9D9gAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9cJEwsDGc9ACNUAAAB8SURBVBjTbZDbDcMwDAPvFGSBTNxBvQv74dSPpD+GCEtHgiTJcZ7np1prFNAfruvKLYUSKbv8TcHxu+8JBd68KUUqYw8zJl74J0ApAuVMMKbFUimTDfWA7pmXM6HMcJtJ/90OX3WP69LkLTt5hxoK6l3i3FualLJfuLT2BbqiFWkGmkskAAAAAElFTkSuQmCC') 0 0 repeat-x; }"
};

// key constants
const KEY_LEFT=37;
const KEY_UP=38;
const KEY_RIGHT=39;
const KEY_DOWN=40;
const KEY_ENTER=13;
const KEY_ESC=27;
const KEY_SPACE=32;
const KEY_SQUOTE=222;
const KEY_F1=112;

// search types
const ST_WEB=1;
const ST_GROUP=2;
const ST_IMAGE=3;
const ST_NEWS=4;
const ST_CODE=5;
const ST_VIDEO=6;
const ST_MUSIC=7;
const ST_SCHOLAR=8;
const ST_BLOG=9;
const ST_BOOKS=10;
const ST_CATALOGS=11;

// ---------------- stripped down Mootools base modules (based on r411) ---------------- 
function $empty(){};
function $noinit(){};
function $type(obj){
	if (obj === null || obj === undefined) return false;
	var type = typeof obj;
	if (type == 'object'){
		if (obj.htmlElement) return 'element';
		if (obj.push) return 'array';
		if (obj.nodeName){
			switch(obj.nodeType){
				case 1: return 'element';
				case 3: return obj.nodeValue.test(/\S/) ? 'textnode' : 'whitespace';
			}
		}
	}
	return type;
};
function $chk(obj){
	return !!(obj || obj === 0);
};
function $pick(obj, picked){
	return (obj != undefined) ? obj : picked;
};
function $(el){
	if (!el) return false;
	if (el.htmlElement) return el;
	if ([window, document].test(el)) return el;
	var type = $type(el);
	if (type == 'string'){
		el = document.getElementById(el);
		type = (el) ? 'element' : false;
	}
	if (type != 'element') return false;
	if (el.htmlElement) return Garbage.collect(el);
	if (['object', 'embed'].test(el.tagName.toLowerCase())) return el;
	$extend(el, Element.prototype);
	el.htmlElement = true;
	return el;
};
var Class = function(properties){
	var klass = function(){
		if (arguments[0] !== $noinit && this.initialize && $type(this.initialize) == 'function')
			return this.initialize.apply(this, arguments);
		else
			return this; 
	};
	$extend(klass, this);
	klass.prototype = properties;
	return klass;
};
Class.prototype = {
	extend: function(properties){
		var proto = new this(null);
		for (var property in properties){
			var pp = proto[property];
			proto[property] = $mergeClass(pp, properties[property]);
		}
		return new Class(proto);
	},
	implement: function(properties){
		$extend(this.prototype, properties);
	}
};
var $native = Object.Native = function(){
	for (var i = 0; i < arguments.length; i++) arguments[i].extend = $native.extend;
};
$native.extend = function(props){
	for (var prop in props){
		if (!this.prototype[prop]) this.prototype[prop] = props[prop];
	}
};
$native(Function, Array, String, Number, Class);
function $extend(){
	var args = arguments;
	if (!args[1]) args = [this, args[0]];
	for (var property in args[1]) args[0][property] = args[1][property];
	return args[0];
};
function $merge(){
	var mix = {};
	for (var i = 0; i < arguments.length; i++){
		for (var property in arguments[i]){
			var ap = arguments[i][property];
			var mp = mix[property];
			if (mp && $type(ap) == 'object' && $type(mp) == 'object') mix[property] = $merge(mp, ap);
			else mix[property] = ap;
		}
	}
	return mix;
};
String.extend({
	trim: function(){
		return this.replace(/^\s+|\s+$/g, '');
	},
	clean: function(){
		return this.replace(/\s{2,}/g, ' ').trim();
	},
	camelCase: function(){
		return this.replace(/-\D/g, function(match){
			return match.charAt(1).toUpperCase();
		});
	},
	hyphenate: function(){
		return this.replace(/\w[A-Z]/g, function(match){
			return (match.charAt(0) + '-' + match.charAt(1).toLowerCase());
		});
	},
	capitalize: function(){
		return this.toLowerCase().replace(/\b[a-z]/g, function(match){
			return match.toUpperCase();
		});
	},
	hasListed: function(string, s){
		s = s || ' ';
		return (s + this + s).indexOf(s + string + s) > -1;
	}
});
Array.extend({
	associate: function(keys){
		var obj = {}, length = Math.min(this.length, keys.length);
		for (var i = 0; i < length; i++) obj[keys[i]] = this[i];
		return obj;
	},
	extend: function(array){
		for (var i = 0, j = array.length; i < j; i++) this.push(array[i]);
		return this;
	},
	merge: function(array){
		for (var i = 0, l = array.length; i < l; i++) this.include(array[i]);
		return this;
	},
	include: function(item){
		if (!this.length || !this.test(item)) this.push(item);
		return this;
	},
	copy: function(start, length){
		start = start || 0;
		if (start < 0) start = this.length + start;
		length = length || (this.length - start);
		var newArray = [];
		for (var i = 0; i < length; i++) newArray[i] = this[start++];
		return newArray;
	},
	remove: function(item){
		var i = 0;
		var len = this.length;
		while (i < len){
			if (this[i] && this[i] === item) this.splice(i, 1);
			else i++;
		}
		return this;
	},
	test: function(item, from){
		return this.indexOf(item, from) != -1;
	}
});
function $each(iterable, fn, bind){
	if (iterable.length != undefined) Array.prototype.forEach.call(iterable, fn, bind);
	else for (var name in iterable) fn.call(bind || iterable, iterable[name], name);
};
function $A(iterable){
	return Array.prototype.slice.call(iterable);
};
Array.prototype.each = Array.prototype.forEach;
Array.prototype.removeItem = Array.prototype.remove;
Function.extend({
	create: function(options){
		var fn = this;
		options = $merge({
			'bind': fn,
			'event': false,
			'arguments': null,
			'delay': false,
			'periodical': false,
			'attempt': false
		}, options);
		if ($chk(options.arguments) && $type(options.arguments) != 'array') options.arguments = [options.arguments];
		return function(event){
			var args;
			if (options.event){
				event = event || window.event;
				args = [(options.event === true) ? event : new options.event(event)];
				if (options.arguments) args = args.concat(options.arguments);
			}
			else args = options.arguments || arguments;
			var returns = function(){
				return fn.apply($pick(options.bind, fn), args);
			};
			if (options.delay) return setTimeout(returns, $duration(options.delay));
			if (options.periodical) return setInterval(returns, $duration(options.periodical));
			if (options.attempt) try {return returns();} catch(err){return false;};
			return returns();
		};
	},
	pass: function(args, bind){
		return this.create({'arguments': args, 'bind': bind});
	},
	attempt: function(args, bind){
		return this.create({'arguments': args, 'bind': bind, 'attempt': true})();
	},
	bind: function(bind, args){
		return this.create({'bind': bind, 'arguments': args});
	},
	bindAsEventListener: function(bind, args){
		return this.create({'bind': bind, 'event': true, 'arguments': args});
	},
	delay: function(delay, bind, args){
		return this.create({'delay': delay, 'bind': bind, 'arguments': args})();
	},
	periodical: function(interval, bind, args){
		return this.create({'periodical': interval, 'bind': bind, 'arguments': args})();
	}
});
var Events = new Class({
	addEvent: function(type, fn){
		if (fn != $empty){
			this.$events = this.$events || {};
			this.$events[type] = this.$events[type] || [];
			this.$events[type].include(fn);
		}
		return this;
	},
	addEvents: function(source){
		for (var type in source) this.addEvent(type, source[type]);
		return this;
	},
	fireEvent: function(type, args, delay){
		if (this.$events && this.$events[type]){
			this.$events[type].each(function(fn){
				fn.create({'bind': this, 'delay': delay, 'arguments': args})();
			}, this);
		}
		return this;
	},
	removeEvent: function(type, fn){
		if (this.$events && this.$events[type]) this.$events[type].remove(fn);
		return this;
	}
});
var Options = new Class({
	setOptions: function(){
		var args = (arguments.length == 1) ? [this.options, arguments[0]] : arguments;
		this.options = $merge.apply(this, args);
		if (this.addEvent){
			for (var option in this.options){
				if (($type(this.options[option]) == 'function') && option.test(/^on[A-Z]/)) this.addEvent(option, this.options[option]);
			}
		}
		return this;
	}
});
var Element = new Class({
	initialize: function(el, props){
		el = $(document.createElement(el));
		if (!props) return el;
		for (var prop in props){
			switch(prop){
				case 'styles': el.setStyles(props[prop]); break;
				case 'events': if (el.addEvents) el.addEvents(props[prop]); break;
				case 'properties': el.setProperties(props[prop]); break;
				default: el.setProperty(prop, props[prop]);
			}
		}
		return el;
	}
});
var HTMLElement=function(){};
HTMLElement.prototype.htmlElement = true;
Element.extend = function(properties){
	for (var property in properties){
		HTMLElement.prototype[property] = properties[property];
		Element.prototype[property] = properties[property];
	}
};
Element.extend({
	inject: function(el, where){
		el = $(el);
		switch(where){
			case "before": el.parentNode.insertBefore(this, el); break;
			case "after":
				var next = el.getNext();
				if (!next) el.parentNode.appendChild(this);
				else el.parentNode.insertBefore(this, next);
				break;
			case "inside":
			default:
				el.appendChild(this);
		}
		return this;
 	},
	walk: function(brother, start){
		brother += 'Sibling';
		var el = (start) ? this[start] : this[brother];
		while (el && $type(el) != 'element') el = el[brother];
		return $(el);
	},
	getPrevious: function(){
		return this.walk('previous');
	},
	getNext: function(){
		return this.walk('next');
	},
	getFirst: function(){
		return this.walk('next', 'firstChild');
	},
	getParent: function(){
		return $(this.parentNode);
	},
	adopt: function(){
		$each(arguments, function(el){
			this.appendChild($(el));
		}, this);
		return this;
	},
	remove: function(){
		this.parentNode.removeChild(this);
		return this;
	},
	clone: function(contents){
		return $(this.cloneNode(contents !== false));
	},
	appendText: function(text){
		this.appendChild(document.createTextNode(text));
		return this;
	},
	hasClass: function(className){
		return this.className.hasListed(className);
	},
	addClass: function(className){
		if (!this.hasClass(className)) this.className = (this.className + ' ' + className).clean();
		return this;
	},
	removeClass: function(className){
		this.className = this.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1').clean();
		return this;
	},
	toggleClass: function(className){
		return this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
	},
	setStyle: function(property, value){
		switch(property){
			case 'opacity': return this.setOpacity(parseFloat(value));
			case 'float': property = 'cssFloat';
		}
		property = property.camelCase();
		switch($type(value)){
			case 'number': if (!['zIndex', 'zoom'].test(property)) value += 'px'; break;
			case 'array': value = 'rgb(' + value.join(',') + ')';
		}
		this.style[property] = value;
		return this;
	},
	setStyles: function(source){
		return Element.setMany(this, 'setStyle', source);
	},
	getStyle: function(prop){
		return document.defaultView.getComputedStyle(this, '').getPropertyValue(prop.hyphenate());
	},
	setHTML: function(){
		this.innerHTML = $A(arguments).join('');
		return this;
	},
	getTag: function(){
		return this.tagName.toLowerCase();
	},
	getProperty: function(property){
		return (Element.Properties[property]) ? this[Element.Properties[property]] : this.getAttribute(property);
	},
	removeProperty: function(property){
		if (Element.Properties[property]) this[Element.Properties[property]] = '';
		else this.removeAttribute(property);
	},
	getProperties: function(){
		return Element.getMany(this, 'getProperty', arguments);
	},
	setProperty: function(property, value){
		if (Element.Properties[property]) this[Element.Properties[property]] = value;
		else this.setAttribute(property, value);
		return this;
	},
	setProperties: function(source){
		return Element.setMany(this, 'setProperty', source);
	},
	getPosition: function(){
		var left = 0, top = 0, el = this;
		do{
			left += el.offsetLeft || 0;
			top += el.offsetTop || 0;
			el = el.offsetParent;
		} while (el);
		return {x: left, y: top};
	}
});
Element.getMany = function(el, method, keys){
	var result = {};
	$each(keys, function(key){
		result[key] = el[method](key);
	});
	return result;
};
Element.setMany = function(el, method, pairs){
	for (var key in pairs) el[method](key, pairs[key]);
	return el;
};
Element.Properties = {
	'class': 'className',
	'value': 'value',
	'for': 'htmlFor'
};

Element.eventMethods = {
	addEvent: function(type, fn){
		this.$events = this.$events || {};
		this.$events[type] = this.$events[type] || {'keys': [], 'values': []};
		if (this.$events[type].keys.test(fn)) return this;
		this.$events[type].keys.push(fn);
		var realType = type;
		var bound = false;
		/*if (Element.Events[type]){
			if (Element.Events[type].add) Element.Events[type].add.call(this, fn);
			if (Element.Events[type].map) bound = Element.Events[type].map.bindAsEventListener(this);
			realType = Element.Events[type].type || type;
		}*/
		if (!this.addEventListener) bound = bound || fn.bindAsEventListener(this);
		else bound = bound || fn;
		this.$events[type].values.push(bound);
		return this.addListener(realType, bound);
	},
	removeEvent: function(type, fn){
		if (!this.$events || !this.$events[type]) return this;
		var pos = this.$events[type].keys.indexOf(fn);
		if (pos == -1) return this;
		var key = this.$events[type].keys.splice(pos,1)[0];
		var value = this.$events[type].values.splice(pos,1)[0];
		if (Element.Events[type]){
			if (Element.Events[type].remove) Element.Events[type].remove.call(this, fn);
			type = Element.Events[type].type || type;
		}
		return this.removeListener(type, value);
	},
	addEvents: function(source){
		return Element.setMany(this, 'addEvent', source);
	},
	removeEvents: function(type){
		if (!this.$events) return this;
		if (type){
			if (this.$events[type]){
				this.$events[type].keys.each(function(fn){
					this.removeEvent(type, fn);
				}, this);
				this.$events[type] = null;
			}
		} else {
			for (var evType in this.$events) this.removeEvents(evType);
			this.$events = null;
		}
		return this;
	},
	fireEvent: function(type, args){
		if (this.$events && this.$events[type]){
			this.$events[type].keys.each(function(fn){
				fn.bind(this, args)();
			}, this);
		}
	}

};
//window.extend(Element.eventMethods);
//document.extend(Element.eventMethods);
Element.extend(Element.eventMethods);

Element.listenerMethods = {
	addListener: function(type, fn){
		if (this.addEventListener) this.addEventListener(type, fn, false);
		else this.attachEvent('on' + type, fn);
		return this;
	},
	removeListener: function(type, fn){
		if (this.removeEventListener) this.removeEventListener(type, fn, false);
		else this.detachEvent('on' + type, fn);
		return this;
	}
};
//window.extend(Element.listenerMethods);
//document.extend(Element.listenerMethods);
Element.extend(Element.listenerMethods);

// ---------------- End of Mootools-based code ----------------

function $stopEvent(ev){
	ev.preventDefault(); ev.stopPropagation(); 
};
function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) 
	{
		// if (p.match('following'))  GM_log($(item));
		arr.push($(item));
	}
	return arr;
};

function getPosition(el){
	return $(el).getPosition();
};

var $body = $(document.body), $de = $(document.documentElement);

// Firefox-only hack to get focused element
function getFocusedElement(){
	return getFocusedElement.$iff.contentDocument.commandDispatcher.focusedElement;
};
getFocusedElement.$iff = new Element("iframe",{
	src: "data:application/vnd.mozilla.xul+xml,<window/>",
	styles: {display: 'none', width: 0, height: 0, border: 'none'}
}).inject($body);

///////////////////////////////////////////////////////////////////////////////
// GCA options proxy

var GcaOptionsProxy = new Class({
	initialize: function(){
		this.read();
	},
	read: function(){
		$each(GcaOptionsProxy.names, function(def, key){
			this[key] = GM_getValue(this.parse(key), def);
		}, this);
		return this;
	},
	save: function(){
		$each(GcaOptionsProxy.names, function(def, key){
			GM_setValue(this.parse(key), this[key]);
		}, this);
	},
	parse: function(name){
		return name.hyphenate().replace('-','_');
	},
	set: function(key, value){
		this[key] = value;
		GM_setValue(this.parse(key), value);
		return value;
	},
	toggle: function(key){
		return this.set(key, !this[key]);
	}
});
GcaOptionsProxy.names={
	'timestamp': 'Jan 01 1970',
	'selectInputWithArrows': false,
	'tabMode': true,
	'showHint': true,
	'selectOnclick': true,
	'themeAuto': true,
	'theme': '0',
	'checkUpdate': true,
	'updateAvailable': false,
	'updateLastChecked': 'Jan 01 1970',
	'checkPeriod': 24*60*60*1000,
	'updateCheckUrl': "http://ye.gorshkov.googlepages.com/googlectrlarrow.user.js",
	'updateUrl': "http://userscripts.org/scripts/source/6575.user.js"
};

function getSearchType(){
	var h=window.location.host;
	var p=window.location.pathname;
	if (p=="/codesearch") return ST_CODE;
	if (p=="/musica") return ST_MUSIC;
	if (h.match(/groups.google\..+/)) return ST_GROUP;
	if (h.match(/images.google\..+/)) return ST_IMAGE;
	if (h.match(/news.google\..+/)) return ST_NEWS;
	if (h.match(/video.google\..+/)) return ST_VIDEO;
	if (h.match(/scholar.google\..+/)) return ST_SCHOLAR;
	if (h.match(/blogsearch.google\..+/)) return ST_BLOG;
	if (h.match(/books.google\..+/)) return ST_BOOKS;
	if (h.match(/catalogs.google\..+/)) return ST_CATALOGS;
	return ST_WEB;
}

// Update manager
var GcaUpdater = new Class({
	initialize: function(gca_options, settings_dialog){
		this.options = gca_options;
		this.settings_dialog = settings_dialog;
		if (!this.options.checkUpdate) return;
		this.timestamp = new Date().setTime(Date.parse(GCA_TIMESTAMP));

		if (new Date().setTime(Date.parse(this.options.timestamp)) < this.timestamp){
			// reset notification
			this.options.set('updateAvailable', false);
			this.options.set('timestamp', GCA_TIMESTAMP);
		}

		if (this.options.updateAvailable){
			this.update();
		} else {
			var nextcheck = Date.parse(this.options.updateLastChecked);
			if (isNaN(nextcheck))
				nextcheck = Date.parse(GcaOptionsProxy.names.updateLastChecked);
			nextcheck = new Date(nextcheck);
			nextcheck.setTime(nextcheck.getTime() + this.options.checkPeriod);
			if (nextcheck <= new Date())
				this.check();
		}
	},
	check: function(){
		if (typeof GM_xmlhttpRequest == "undefined") return;
		GM_xmlhttpRequest({
			method: 'HEAD',
			url: this.options.updateCheckUrl,
			onload: function(response) {
				if (!response.responseHeaders) return;
				var m = response.responseHeaders.match(/^Last-Modified:([^\n]*)$/mi);
				if (m && m[1]) {
					var lastmod = new Date().setTime(Date.parse(m[1].trim()));
					this.options.set('updateLastChecked', ''+(new Date()));
					if (this.options.set('updateAvailable', lastmod > this.timestamp))
						this.update();
				}
			}.bind(this)
		});
	},
	update: function(){
		var el = new Element('span');
		var self = this, upd = new Element('a', {'href': this.options.updateUrl, 'class': 'update-warning'}).setHTML("<span>Script update available!</span> Click here to install update.");
		var close = new Element('a', {href: '#', 'title': "Click to disable automatic script updates"}).setHTML("[x]");
		close.addEventListener('click', function(ev){
			$stopEvent(ev);
			if (confirm("Are you sure to disable automatic script updates?\(nThis option can be turned on in the script options dialog accessible with [Ctrl-F1] hotkey)")){
				self.options.set('checkUpdate', false);
				if(!self.options.showHint)
					self.settings_dialog.hintVisible(false);
				el.remove();
			}
		}, false);
		this.settings_dialog.addHint(el.adopt(upd, new Element('div').setHTML(' '), close));
	}
});

// Theme class
var GcaTheme = new Class({
	initialize: function(gca_options){
		this.$hdr = $x("//head").pop();
		this.options = gca_options;
		this.theme = this.options.theme;
		this.auto = this.options.themeAuto;
		// apply CSS rules
		this.initCSS();
		if (this.auto) this.detect();
		this.apply();
	},
	initCSS: function(){
		this.css = {};
		for (var z in CUSTOM_CSS){
			this.css[z] = new Element('style', {'type': 'text/css'}).inject(this.$hdr)
						 .appendText(CUSTOM_CSS[z].join('\n'));
		}
		this.css[this.options.tabMode ? 'inplace' : 'intab'].disabled = true;
		if (getSearchType() != ST_BLOG) this.css.blog.disabled = true;
		if (!$('gbar')) this.css.newlayout.disabled = true;

		this.themeStyle = new Element('style', {'type': 'text/css'}).inject(this.$hdr);
	},
	set: function(theme){
		this.theme = this.options.set('theme', theme);
		return this.apply();
	},
	setAuto: function(auto, nodetect){
		this.auto = this.options.set('themeAuto', auto);
		if (this.auto) this.detect();
		else this.theme = this.options.theme;
		return this.apply();
	},
	apply: function(theme){
		var css = THEMES_CSS[this.theme];
		if (css) this.themeStyle.textContent = css;
		return this;
	},
	detect: function(){
		var bg = $body.getStyle('background-color');
		this.theme = {'rgb(51, 51, 51)':'2', 'rgb(37, 57, 96)':'1', 'rgb(255, 255, 255)': '0'}[bg] || '0';
		return this;
	}
});

// Settings & Help dialog
const GCA_HELP_CONTENT = '<div class="tool"><a class="close" href="#" title="Close this help" alt="[close]"></a><h1>'+GCA_NAME+' Navigation Options</h1></div><div class="scroll">'
+'<p><input id="gca-cfg-hint" type="checkbox"/><label for="gca-cfg-hint">Show hint string visible in the top left corner of the page (uncheck to hide)</label></p>'
+'<p><input id="gca-cfg-check-update" type="checkbox"/><label for="gca-cfg-check-update">Automatically check for the script updates</label></p>'
+'<p><label for="gca-cfg-check-period">Check update period (hours):</label> <input id="gca-cfg-check-period" style="width:3em;" size="4" type="text" value=""/> <span id="gca-cfg-check-period-warn">(invalid value)</span></p>'
+'<p><input id="gca-cfg-middle-click" type="checkbox"/><label for="gca-cfg-middle-click">Enable select on middle-click:</label></p>'
+'<p><input id="gca-cfg-theme-auto" type="checkbox"/><label for="gca-cfg-theme-auto">Enable highlight theme autodetection</label></p>'
+'<p><label for="gca-cfg-theme">Select highlight theme:</label> <select id="gca-cfg-theme"><option value="0">Light (standard)</option><option value="1">Dark blue</option><option value="2">Dark grey</option></select></p>'
+'<h2>Hotkeys:</h2><dl>'
+'<dt>Ctrl-F1</dt><dd>Show/hide this help</dd>'
+'<dt>Ctrl-Space</dt><dd>Toggle Tab mode: open links in a new or current tab</dd>'
+'<dt>Ctrl-SingleQuote</dt><dd>Toggle navigation mode (toggle select input fields with Up/Down keys)</dd>'
+'<dt>Up / Down</dt><dd>Move cursor to the previous / next results entry</dd>'
+'<dt>Ctrl-Left / Right</dt><dd>Go to the previous / next search results page</dd>'
+'<dt>Ctrl-Up</dt><dd>Set focus to the input query</dd>'
+'<dt>Ctrl-Down</dt><dd>Release focus or move cursor to the next results entry</dd>'
+'<dt>Esc</dt><dd>Release focus and activate current entry</dd>'
+'<dt>Return</dt><dd>Open current link in a new or current tab (if no other element has focus)</dd>'
+'<dt>Alt-Return</dt><dd>Submit current search (top input) if input query is not focused</dd>'
+'</dl>'
+'</div>';

var GcaSettingsDialog=new Class({
	hidden: true, hint_visible: true,
	initialize: function(theme, gca_options){
		this.options = gca_options;
		this.theme = theme;
		// add hint
		if (this.options.showHint) this.hintVisible(true);
		else this.hint_visible = false;
	},
	build: function(){
		var self = this;
		var el = this.element = new Element('div', {
			id: 'gca-help',
			styles: {display: 'none'}
		}).setHTML(GCA_HELP_CONTENT).inject($body);

		$x('.//a[@class="close"]',el)[0].addEventListener("click", function(ev){
			$stopEvent(ev);
			self.hide();
		}, true);

		var inp = $x('.//input[@id="gca-cfg-hint"]',el)[0];
		inp.checked = this.options.showHint;
		inp.addEventListener("click", function(ev){
			self.hintVisible(self.options.set('showHint', ev.target.checked));
		}, true);

		var inpU1 = $x('.//input[@id="gca-cfg-check-update"]',el)[0];
		inpU1.checked = this.options.checkUpdate;
		this.__inpU1 = inpU1;
		inpU1.addEventListener("click", function(ev){
			self.options.set('checkUpdate', ev.target.checked);
		}, true);

		var inpU2 = $x('.//input[@id="gca-cfg-check-period"]',el)[0];
		var inpU2warn = $x('.//span[@id="gca-cfg-check-period-warn"]',el)[0];
		inpU2warn.setStyle('display', 'none');
		inpU2.value = this.options.checkPeriod / (60*60*1000);
		inpU2.addEventListener("change", function(ev){
			var val = parseInt(ev.target.value);
			var good = !isNaN(val) && ev.target.value.match(/^[0-9]+$/);
			inpU2warn.setStyle('display', good ? 'none' : 'inline');
			if (good) self.options.set('checkPeriod', val * 60*60*1000);
		}, true);

		var inp2 = $x('.//input[@id="gca-cfg-middle-click"]',el)[0];
		inp2.checked = this.options.selectOnclick;
		inp2.addEventListener('click', function(ev){
			self.options.set('selectOnclick', ev.target.checked);
		}, true);

		var inp_theme = $x('.//select[@id="gca-cfg-theme"]',el)[0];
		inp_theme.value = this.theme.theme;
		inp_theme.addEventListener('change', function(ev){ self.theme.set(ev.target.value); }, true);

		var inp_autotheme = $x('.//input[@id="gca-cfg-theme-auto"]',el)[0];
		inp_autotheme.checked = this.theme.auto;
		inp_theme.disabled = this.theme.auto;
		inp_autotheme.addEventListener('change', function(ev){
			self.theme.setAuto(ev.target.checked);
			inp_theme.value = self.theme.theme;
			inp_theme.disabled = self.theme.auto;
		}, true);

		this.build = function(){ return self.element; };
		return this.element;
	},
	buildHint: function(){
		var self = this;
		this.hintElement = new Element('div', {'id': 'gca-hint', 'styles': {'display': 'none'}}).setHTML('<a href="#" title="Click here to open '+GCA_NAME+' help">'+GCA_NAME+' (Ctrl-F1)</a> ');
		$body.insertBefore(this.hintElement, $body.firstChild);
		this.hintElement.firstChild.addEventListener("click", function(ev){
			$stopEvent(ev);
			self.show();
		}, true);

		this.buildHint = function(){ return self.hintElement; };
		return this.hintElement;
	},
	show: function(){
		this.build().setStyle('display', 'block');
		this.__inpU1.checked = this.options.checkUpdate; //###@### dirty hack :)
		this.hidden = false;
		return this;
	},
	hide: function(){
		this.build().setStyle('display', 'none');
		this.hidden = true;
		return this;
	},
	toggle: function(){
		return this[(this.hidden) ? 'show' : 'hide']();
	},
	hintVisible: function(vis){
		this.hint_visible = vis;
		this.buildHint().setStyle('display', (this.hint_visible) ? 'block' : 'none');
	},
	addHint: function(el){
		var hint = this.buildHint();
		el.inject(hint);
		this.hint_visible = true;
		hint.setStyle('display', 'block');
	}
});

// Input queries helper
var GcaQueries = new Class({
	active_input: -1,
	initialize: function(gca_options){
		var self = this;
		this.inputs = $x("//input[@name='q']");
		if (!this.inputs.length) return;

		// change tabIndex order
		this.inputs[0].tabIndex=1;
		this.button=$x("//input[@name='btnG']")[0];
		if (this.button) this.button.tabIndex=2;

		var $onfocus = function(ev){
			self.active_input = -1;
			for (var i=self.inputs.length; i; i--){
				if (self.inputs[i-1] == ev.target){ self.active_input = i-1; break; }
			}
			self.fireEvent('onFocus', ev.target);
		};
		var $onblur = function(){
			self.active_input = -1;
		};
		// add query input focus triggers
		this.inputs.forEach(function(inp){
			inp.addEventListener("focus", $onfocus, false);
			inp.addEventListener("blur", $onblur, false);
		}, this);
	},
	getActive: function(){
		return this.inputs[this.active_input];
	},
	select: function(index){
		this.fireEvent('onBeforeSelect', index);
		// focus query input
		this.active_input = index;
		var q = this.getActive();
		if (q) { q.select(); q.focus(); }
		return this;
	}
});
GcaQueries.implement(new Events);

// base search reaults class
var GcaResults = new Class({
	index: -1, node: null,
	xpath: {
		WEB: "//a[@class='l']",
		WEB_STEAM: ".//a[@class='l']",
		IMAGE: "//*[@id='ImgContent']//a[img]",
		IMAGE_STEAM: ".//a[img]",
		GROUP: "//font[@size='-0']/a[1]",  //		  //*[@id='cbdy']//....
		NEWS: "//div[@class='mainbody']/table//div[@class='lh']/a[@id][1]",
		CODE: "//div[@class='h']/a[1]",
		VIDEO: "//div[@class='SearchResultItem']//*[@class='MetaData']/*[@class='Title']/a[1]",
		MUSIC: "//body/div/div/table/tbody/tr[2]/td/a[1]/b/..",
		SCHOLAR: "//p[@class='g']//*[@class='w']/a[1]",
		BLOG: "//a[starts-with(@id,'p-')]",
		BOOKS: "//table[@class='rsi']//h2[@class='resbdy']/a",
		CATALOGS: "//p[@class='e']/a[@class='big']"
	},
	initialize: function(gca_options, gca_query){
		var self = this;
		this.options = gca_options;
		this.query = gca_query;
		this.search_type = getSearchType();	

		var $deactivate = this.deactivate.bind(this);
		this.query.addEvents({'onBeforeSelect': $deactivate, 'onFocus': $deactivate});

		this.results = [];
		this.collect();

		switch (this.search_type){
			case ST_WEB:
				$body.addEventListener('DOMNodeInserted', function(ev){
					var el = ev.target;
					if (el && el.tagName == 'DIV' && $(el).hasClass('g'))
						self.addItem( $x(self.xpath.WEB_STEAM, el)[0] );
				}, false);
				break;
			case ST_IMAGE:
				$body.addEventListener('DOMNodeInserted', function(ev){
					var el = ev.target;
					if (el && el.tagName == 'TR' && el.parentNode.parentNode.parentNode.id == 'ImgContent')
						$x(self.xpath.IMAGE_STEAM, el).each(self.addItem.bind(self));
				}, false);
				break;
		};
	},
	collect: function(){
		var nodes, xpath;
		switch (this.search_type){
			case ST_IMAGE:
				nodes = document.evaluate(this.xpath.IMAGE, document, null, 0, null);
				// fix dynamic resize
				var self = this;
				window.addEventListener("resize", function(ev){
					$stopEvent(ev);
					// call Google's resize handler
					unsafeWindow.onresize();
					// rebuild search results
					self.rebuildImages();
				}, true);
				return this.rebuildImages();
			case ST_GROUP: xpath = this.xpath.GROUP; break;
			case ST_NEWS: xpath = this.xpath.NEWS; break;
			case ST_CODE: xpath = this.xpath.CODE; break;
			case ST_VIDEO: xpath = this.xpath.VIDEO; break;
			case ST_MUSIC: xpath = this.xpath.MUSIC; break;
			case ST_SCHOLAR: xpath = this.xpath.SCHOLAR; break;
			case ST_BLOG: xpath = this.xpath.BLOG; break;
			case ST_BOOKS: xpath = this.xpath.BOOKS; break;
			case ST_CATALOGS: xpath = this.xpath.CATALOGS; break;
			default: xpath = this.xpath.WEB; break;
		}
		if ($type(xpath) == 'string') $x(xpath).forEach(function(node){ this.addItem(node); }, this);
	},
	addItem: function(el){
		var index = this.results.length, self = this;
		el = $(el);
		if (el){
			el.addEvent('mousedown', function(ev){
				if (self.options.selectOnclick && ev.which == 2){ self.index = index; self.setCurrent(); }
			});
			this.results.push(el);
		}
		return el;
	},
	rebuildImages: function(){
		this.results = [];
		var tpl = new Element('div').setHTML('<font size="-2">[<a class="fl" target="" href="#">Origin Image</a> | <a class="fl" target="" href="#">Origin Page</a>]</font>');
		var nodes = $x("//*[@id='ImgContent']//a[img]");
		nodes.forEach(function(node){
			node = this.addItem(node);
			var clone = tpl.cloneNode(true);
			var il = $x('.//a', clone);
			var mi = node.href.match(/\/imgres\?imgurl\=(.*?)\&imgrefurl\=/);
			var mp = node.href.match(/\&imgrefurl\=(.*?)\&h=/);
			if (mi && mp){
				il[1].href = unescape(mp[1]);
				il[0].href = unescape(mi[1]);
				node.href = unescape(mi[1]);
				node.parentNode.appendChild(clone);
			}
		}, this);
		if (!this.query_active) this.activate();
	},
	next: function(){
		// move cursor up
		this.index++;
		if (this.index >= this.results.length){
			if (this.options.selectInputWithArrows && !this.steamSearch()){
				this.index = this.results.length;
				this.query.select(1);
			} else {
				this.index = this.results.length - 1;
			}
		} else {
			this.setCurrent();
		}
	},
	prev: function(){
		// move cursor down
		this.index--;
		if (this.index < 0){
			if (optionsProxy.selectInputWithArrows){
				this.index = -1;
				this.query.select(0);
			} else {
				this.index = 0;
			}
		} else {
			this.setCurrent();
		}
 	},
 	steamSearch: function(){
 		var navbar = $('navbar');
 		return !this.query.inputs[1] || navbar && navbar.getStyle('display') == 'none';
 	},
 	activate: function(){
	 	if (this.index < 0 || this.index >= this.results.length) return false;
	 	this.setCurrent(this.index);
		return true;
 	},
	deactivate: function(){
		if (!this.node) return;
		this.node.removeClass('selected-result');
		this.node = null;
	},
 	current: function(){
 		return this.results[this.index];
 	},
	/* private */
	getBlock: function(v){
		if (this.search_type==ST_WEB){
			var p = $(v.parentNode.parentNode);
			while (p && !p.hasClass('g')) p = p.getParent();
			return p;
		}
		if (this.search_type==ST_NEWS || this.search_type==ST_MUSIC)
			return $(v.parentNode.parentNode.parentNode.parentNode);
		if (this.search_type==ST_GROUP || this.search_type==ST_CODE || this.search_type==ST_IMAGE)
			return $(v.parentNode);
		if (this.search_type==ST_VIDEO)
			return $(v.parentNode.parentNode.parentNode.parentNode.parentNode);
		if (this.search_type==ST_BLOG)
			return $(v);
		if (this.search_type==ST_BOOKS)
			return $(v.parentNode.parentNode.parentNode);
		return $(v.parentNode.parentNode);
	},
	/* private */
	setCurrent: function(){
		this.deactivate();
		this.results[this.index].addClass('l');
		this.node = this.getBlock(this.results[this.index]);
		this.node.addClass('selected-result');
		var cur = this.results[this.index], next = this.results[this.index + 1];
		if (!next){
			next = $('bottom_marker') || this.query.inputs[1];
			if (this.search_type == ST_BLOG) next = $('f');
		}
		cur.focus();
		var scrollTop = $body.scrollTop, scrollBottom = scrollTop + $body.clientHeight;
		switch (this.search_type){
			case ST_IMAGE:
				next = cur.parentNode.parentNode.nextSibling;
				var pos = getPosition(cur.parentNode.parentNode); //tr
				var npos = getPosition(next); //tr
				if (pos.y < scrollTop) $body.scrollTop = pos.y;
				else if (npos.y + next.offsetHeight > scrollBottom) $body.scrollTop = npos.y + next.offsetHeight - $body.clientHeight;
				break;
			case ST_GROUP:
				var pos = getPosition(cur);
				scrollTop = $de.scrollTop;
				scrollBottom = scrollTop + $de.clientHeight;
				if (next){
					var npos = getPosition(next);
					if (npos.y >= scrollBottom) $de.scrollTop = npos.y - $de.clientHeight;
				}
				if (pos.y < scrollTop + 10) $de.scrollTop -= 10;
				break;
			default:
				var pos = getPosition(cur);
				if (next){
					var npos = getPosition(next);
					if (npos.y >= scrollBottom) $body.scrollTop = npos.y - $body.clientHeight;
				}
				if (pos.y < scrollTop + 10) $body.scrollTop -= 10;
				break;
		}
	}
});


// initialization
var optionsProxy = new GcaOptionsProxy();
optionsProxy.save();
var theme = new GcaTheme(optionsProxy);
var settingsDialog = new GcaSettingsDialog(theme, optionsProxy);
var query = new GcaQueries(optionsProxy);
var results = new GcaResults(optionsProxy, query);
var updater = new GcaUpdater(optionsProxy, settingsDialog);


// Keyboard events processing
document.addEventListener("keydown", function(ev){
	var code = ev.keyCode, active_query = query.getActive();
	// Alt-Return - submit form
	if (code == KEY_ENTER && ev.altKey){
		$stopEvent(ev);
		query.inputs[0].form.submit();
		return;
	}
	if (ev.ctrlKey && !active_query){
		switch (code){
		case KEY_LEFT: // Ctrl-Left - previous page
			var dest = $('np') || $x("//img[contains(@src,'nav_previous.gif')]")[0] || $x("//td[@class='cur']/preceding-sibling::td/a")[0];
			if (!dest.parentNode.href)
				location.href = dest;
			else
				if (dest && dest.parentNode) location.href = dest.parentNode.href;
			break;
		case KEY_RIGHT: // Ctrl-Right - next page
      //GM_log('KR1:'+$('nn'));
			//GM_log('KR2:'+$x("//img[contains(@src,'nav_next.gif')]")[0]);
			//GM_log('KR3:'+$x("//td[@class='cur']/following-sibling::td/a")[0]);
			var dest = $('nn') || $x("//img[contains(@src,'nav_next.gif')]")[0] || $x("//td[@class='cur']/following-sibling::td/a")[0];
			if (!dest.parentNode.href)
				location.href = dest;
			else
				if (dest && dest.parentNode) location.href = dest.parentNode.href;
			break;
		}
		
	}
	// Ctrl-Up - focus and select query input
	if (code == KEY_UP && ev.ctrlKey){
		query.select(0);
		return;
	}
	// Previous result (Up if not in input query)
	if (code == KEY_UP && !active_query){
		results.prev();
		$stopEvent(ev);
	}
	// Next result (Down or Ctrl-Down from input to )
	if (code == KEY_DOWN && (active_query && ev.ctrlKey || !active_query)){
		if (active_query){
			if (!results.activate()) results.next();
		} else results.next();
		$stopEvent(ev);
	}
	// Open link in the current or a new tab
	if (code == KEY_ENTER){
		var r = results.current(), f = getFocusedElement();
		if (f && f != r) return;
		$stopEvent(ev);
		if (r && optionsProxy.tabMode){
			GM_openInTab(r.href);
		} else if (r){
			location.href = r.href;
		}
	}
	// Escape - move focus to selected result and unfocus query input
	if (code == KEY_ESC){
		if (results.index < 0) results.next();
		else if (results.index >= results.results.length) results.prev();
		else results.activate();
	}
	//** Settings:
	// Show settigns & help
	if (code == KEY_F1 && ev.ctrlKey){
		settingsDialog.toggle();
		return;
	}
	// Change tabMode property
	if (code == KEY_SPACE && ev.ctrlKey){
		// change tab mode
		var val = optionsProxy.toggle('tabMode');
		// switch CSS rules
		theme.css.intab.disabled = !val;
		theme.css.inplace.disabled = val;
		$stopEvent(ev);
	}
	// Change tabMode property
	if (code == KEY_SQUOTE && ev.ctrlKey){
		// change nav mode
		optionsProxy.toggle('selectInputWithArrows');
		$stopEvent(ev);
	}
}, false);

