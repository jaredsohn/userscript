// ==UserScript==
// @name           Castle Age Autoplayer
// @namespace      caap
// @description    Auto player for Castle Age
// @version        137.6
// @include        http*://apps.*facebook.com/castle_age/*
// @include        http://www.facebook.com/common/error.html
// @include        http://www.facebook.com/reqs.php#confirm_46755028429_0
// @include        http://www.facebook.com/home.php
// @include        http://www.facebook.com/*filter=app_46755028429*
// ==/UserScript==

var thisVersion = "137.6";
/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function( window, undefined ) {

// Define a local copy of jQuery
var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context );
	},

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// A simple way to check for HTML strings or ID strings
	// (both of which we optimize for)
	quickExpr = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,

	// Is it a simple selector
	isSimple = /^.[^:#\[\.,]*$/,

	// Check if a string has a non-whitespace character in it
	rnotwhite = /\S/,

	// Used for trimming whitespace
	rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent,

	// For matching the engine and version of the browser
	browserMatch,

	// Has the ready events already been bound?
	readyBound = false,

	// The functions to execute on DOM ready
	readyList = [],

	// The ready event handler
	DOMContentLoaded,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwnProperty = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	indexOf = Array.prototype.indexOf;

jQuery.fn = jQuery.prototype = {
	init: function( selector, context ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), or $(undefined)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// The body element only exists once, optimize finding it
		if ( selector === "body" && !context ) {
			this.context = document;
			this[0] = document.body;
			this.selector = "body";
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			match = quickExpr.exec( selector );

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					doc = (context ? context.ownerDocument || context : document);

					// If a single string is passed in and it's a single tag
					// just do a createElement and skip the rest
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = buildFragment( [ match[1] ], [ doc ] );
						selector = (ret.cacheable ? ret.fragment.cloneNode(true) : ret.fragment).childNodes;
					}

					return jQuery.merge( this, selector );

				// HANDLE: $("#id")
				} else {
					elem = document.getElementById( match[2] );

					if ( elem ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $("TAG")
			} else if ( !context && /^\w+$/.test( selector ) ) {
				this.selector = selector;
				this.context = document;
				selector = document.getElementsByTagName( selector );
				return jQuery.merge( this, selector );

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return (context || rootjQuery).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return jQuery( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if (selector.selector !== undefined) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.4.2",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this.slice(num)[ 0 ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = jQuery();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );

		} else {
			jQuery.merge( ret, elems );
		}

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + (this.selector ? " " : "") + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Attach the listeners
		jQuery.bindReady();

		// If the DOM is already ready
		if ( jQuery.isReady ) {
			// Execute the function immediately
			fn.call( document, jQuery );

		// Otherwise, remember the function for later
		} else if ( readyList ) {
			// Add the function to the wait list
			readyList.push( fn );
		}

		return this;
	},

	eq: function( i ) {
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, +i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || jQuery(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options, name, src, copy;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging object literal values or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || jQuery.isArray(copy) ) ) {
					var clone = src && ( jQuery.isPlainObject(src) || jQuery.isArray(src) ) ? src
						: jQuery.isArray(copy) ? [] : {};

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		window.$ = _$;

		if ( deep ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// Handle when the DOM is ready
	ready: function() {
		// Make sure that the DOM is not already loaded
		if ( !jQuery.isReady ) {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 13 );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If there are functions bound, to execute
			if ( readyList ) {
				// Execute all of them
				var fn, i = 0;
				while ( (fn = readyList[ i++ ]) ) {
					fn.call( document, jQuery );
				}

				// Reset the list of functions
				readyList = null;
			}

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
			}
		}
	},

	bindReady: function() {
		if ( readyBound ) {
			return;
		}

		readyBound = true;

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" ) {
			return jQuery.ready();
		}

		// Mozilla, Opera and webkit nightlies currently support this event
		if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else if ( document.attachEvent ) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent("onreadystatechange", DOMContentLoaded);

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return toString.call(obj) === "[object Function]";
	},

	isArray: function( obj ) {
		return toString.call(obj) === "[object Array]";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || toString.call(obj) !== "[object Object]" || obj.nodeType || obj.setInterval ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor
			&& !hasOwnProperty.call(obj, "constructor")
			&& !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwnProperty.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw msg;
	},

	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
			.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
			.replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {

			// Try to use the native JSON parser first
			return window.JSON && window.JSON.parse ?
				window.JSON.parse( data ) :
				(new Function("return " + data))();

		} else {
			jQuery.error( "Invalid JSON: " + data );
		}
	},

	noop: function() {},

	// Evalulates a script in a global context
	globalEval: function( data ) {
		if ( data && rnotwhite.test(data) ) {
			// Inspired by code by Andrea Giammarchi
			// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";

			if ( jQuery.support.scriptEval ) {
				script.appendChild( document.createTextNode( data ) );
			} else {
				script.text = data;
			}

			// Use insertBefore instead of appendChild to circumvent an IE6 bug.
			// This arises when a base node is used (#2709).
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction(object);

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
			}
		}

		return object;
	},

	trim: function( text ) {
		return (text || "").replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// The extra typeof function check is to prevent crashes
			// in Safari 2 (See: #3039)
			if ( array.length == null || typeof array === "string" || jQuery.isFunction(array) || (typeof array !== "function" && array.setInterval) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array ) {
		if ( array.indexOf ) {
			return array.indexOf( elem );
		}

		for ( var i = 0, length = array.length; i < length; i++ ) {
			if ( array[ i ] === elem ) {
				return i;
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length, j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [];

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			if ( !inv !== !callback( elems[ i ], i ) ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var ret = [], value;

		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			value = callback( elems[ i ], i, arg );

			if ( value != null ) {
				ret[ ret.length ] = value;
			}
		}

		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	proxy: function( fn, proxy, thisObject ) {
		if ( arguments.length === 2 ) {
			if ( typeof proxy === "string" ) {
				thisObject = fn;
				fn = thisObject[ proxy ];
				proxy = undefined;

			} else if ( proxy && !jQuery.isFunction( proxy ) ) {
				thisObject = proxy;
				proxy = undefined;
			}
		}

		if ( !proxy && fn ) {
			proxy = function() {
				return fn.apply( thisObject || this, arguments );
			};
		}

		// Set the guid of unique handler to the same of original handler, so it can be removed
		if ( fn ) {
			proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
		}

		// So proxy can be declared as an argument
		return proxy;
	},

	// Use of jQuery.browser is frowned upon.
	// More details: http://docs.jquery.com/Utilities/jQuery.browser
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
			/(opera)(?:.*version)?[ \/]([\w.]+)/.exec( ua ) ||
			/(msie) ([\w.]+)/.exec( ua ) ||
			!/compatible/.test( ua ) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec( ua ) ||
		  	[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	browser: {}
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}

// Deprecated, use jQuery.browser.webkit instead
if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

if ( indexOf ) {
	jQuery.inArray = function( elem, array ) {
		return indexOf.call( array, elem );
	};
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);

// Cleanup functions for the document ready method
if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}

// The DOM ready check for Internet Explorer
function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		// If IE is used, use the trick by Diego Perini
		// http://javascript.nwbox.com/IEContentLoaded/
		document.documentElement.doScroll("left");
	} catch( error ) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	// and execute any waiting functions
	jQuery.ready();
}

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}

// Mutifunctional method to get and set values to a collection
// The value/s can be optionally by executed if its a function
function access( elems, key, value, exec, fn, pass ) {
	var length = elems.length;

	// Setting many attributes
	if ( typeof key === "object" ) {
		for ( var k in key ) {
			access( elems, k, key[k], exec, fn, value );
		}
		return elems;
	}

	// Setting one attribute
	if ( value !== undefined ) {
		// Optionally, function values get executed if exec is true
		exec = !pass && exec && jQuery.isFunction(value);

		for ( var i = 0; i < length; i++ ) {
			fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
		}

		return elems;
	}

	// Getting an attribute
	return length ? fn( elems[0], key ) : undefined;
}

function now() {
	return (new Date).getTime();
}
(function() {

	jQuery.support = {};

	var root = document.documentElement,
		script = document.createElement("script"),
		div = document.createElement("div"),
		id = "script" + now();

	div.style.display = "none";
	div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	var all = div.getElementsByTagName("*"),
		a = div.getElementsByTagName("a")[0];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return;
	}

	jQuery.support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText insted)
		style: /red/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.55$/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: div.getElementsByTagName("input")[0].value === "on",

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: document.createElement("select").appendChild( document.createElement("option") ).selected,

		parentNode: div.removeChild( div.appendChild( document.createElement("div") ) ).parentNode === null,

		// Will be defined later
		deleteExpando: true,
		checkClone: false,
		scriptEval: false,
		noCloneEvent: true,
		boxModel: null
	};

	script.type = "text/javascript";
	try {
		script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
	} catch(e) {}

	root.insertBefore( script, root.firstChild );

	// Make sure that the execution of code works by injecting a script
	// tag with appendChild/createTextNode
	// (IE doesn't support this, fails, and uses .text instead)
	if ( window[ id ] ) {
		jQuery.support.scriptEval = true;
		delete window[ id ];
	}

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete script.test;

	} catch(e) {
		jQuery.support.deleteExpando = false;
	}

	root.removeChild( script );

	if ( div.attachEvent && div.fireEvent ) {
		div.attachEvent("onclick", function click() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			jQuery.support.noCloneEvent = false;
			div.detachEvent("onclick", click);
		});
		div.cloneNode(true).fireEvent("onclick");
	}

	div = document.createElement("div");
	div.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";

	var fragment = document.createDocumentFragment();
	fragment.appendChild( div.firstChild );

	// WebKit doesn't clone checked state correctly in fragments
	jQuery.support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

	// Figure out if the W3C box model works as expected
	// document.body must exist before we can do this
	jQuery(function() {
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";

		document.body.appendChild( div );
		jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;
		document.body.removeChild( div ).style.display = 'none';

		div = null;
	});

	// Technique from Juriy Zaytsev
	// http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
	var eventSupported = function( eventName ) {
		var el = document.createElement("div");
		eventName = "on" + eventName;

		// Firefox / Greasemonkey work around
		var isSupported = true;
		if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
			isSupported = (eventName in el);
		}

		if ( !isSupported ) {
			el.setAttribute(eventName, "return;");
			isSupported = typeof el[eventName] === "function";
		}
		el = null;

		return isSupported;
	};

	jQuery.support.submitBubbles = eventSupported("submit");
	jQuery.support.changeBubbles = eventSupported("change");

	// release memory in IE
	root = script = div = all = a = null;
})();

jQuery.props = {
	"for": "htmlFor",
	"class": "className",
	readonly: "readOnly",
	maxlength: "maxLength",
	cellspacing: "cellSpacing",
	rowspan: "rowSpan",
	colspan: "colSpan",
	tabindex: "tabIndex",
	usemap: "useMap",
	frameborder: "frameBorder"
};
var expando = "jQuery" + now(), uuid = 0, windowData = {};

jQuery.extend({
	cache: {},

	expando:expando,

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		"object": true,
		"applet": true
	},

	data: function( elem, name, data ) {
		if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
			return;
		}

		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ], cache = jQuery.cache, thisCache;

		if ( !id && typeof name === "string" && data === undefined ) {
			return null;
		}

		// Compute a unique ID for the element
		if ( !id ) {
			id = ++uuid;
		}

		// Avoid generating a new cache unless none exists and we
		// want to manipulate it.
		if ( typeof name === "object" ) {
			elem[ expando ] = id;
			thisCache = cache[ id ] = jQuery.extend(true, {}, name);

		} else if ( !cache[ id ] ) {
			elem[ expando ] = id;
			cache[ id ] = {};
		}

		thisCache = cache[ id ];

		// Prevent overriding the named cache with undefined values
		if ( data !== undefined ) {
			thisCache[ name ] = data;
		}

		return typeof name === "string" ? thisCache[ name ] : thisCache;
	},

	removeData: function( elem, name ) {
		if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
			return;
		}

		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ], cache = jQuery.cache, thisCache = cache[ id ];

		// If we want to remove a specific section of the element's data
		if ( name ) {
			if ( thisCache ) {
				// Remove the section of cache data
				delete thisCache[ name ];

				// If we've removed all the data, remove the element's cache
				if ( jQuery.isEmptyObject(thisCache) ) {
					jQuery.removeData( elem );
				}
			}

		// Otherwise, we want to remove all of the element's data
		} else {
			if ( jQuery.support.deleteExpando ) {
				delete elem[ jQuery.expando ];

			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( jQuery.expando );
			}

			// Completely remove the data cache
			delete cache[ id ];
		}
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		if ( typeof key === "undefined" && this.length ) {
			return jQuery.data( this[0] );

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			var data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
			}
			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;
		} else {
			return this.trigger("setData" + parts[1] + "!", [parts[0], value]).each(function() {
				jQuery.data( this, key, value );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});
jQuery.extend({
	queue: function( elem, type, data ) {
		if ( !elem ) {
			return;
		}

		type = (type || "fx") + "queue";
		var q = jQuery.data( elem, type );

		// Speed up dequeue by getting out quickly if this is just a lookup
		if ( !data ) {
			return q || [];
		}

		if ( !q || jQuery.isArray(data) ) {
			q = jQuery.data( elem, type, jQuery.makeArray(data) );

		} else {
			q.push( data );
		}

		return q;
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ), fn = queue.shift();

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift("inprogress");
			}

			fn.call(elem, function() {
				jQuery.dequeue(elem, type);
			});
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function( i, elem ) {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},

	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue( type, function() {
			var elem = this;
			setTimeout(function() {
				jQuery.dequeue( elem, type );
			}, time );
		});
	},

	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	}
});
var rclass = /[\n\t]/g,
	rspace = /\s+/,
	rreturn = /\r/g,
	rspecialurl = /href|src|style/,
	rtype = /(button|input)/i,
	rfocusable = /(button|input|object|select|textarea)/i,
	rclickable = /^(a|area)$/i,
	rradiocheck = /radio|checkbox/;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, name, value, true, jQuery.attr );
	},

	removeAttr: function( name, fn ) {
		return this.each(function(){
			jQuery.attr( this, name, "" );
			if ( this.nodeType === 1 ) {
				this.removeAttribute( name );
			}
		});
	},

	addClass: function( value ) {
		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.addClass( value.call(this, i, self.attr("class")) );
			});
		}

		if ( value && typeof value === "string" ) {
			var classNames = (value || "").split( rspace );

			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className ) {
						elem.className = value;

					} else {
						var className = " " + elem.className + " ", setClass = elem.className;
						for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
								setClass += " " + classNames[c];
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.removeClass( value.call(this, i, self.attr("class")) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			var classNames = (value || "").split(rspace);

			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						var className = (" " + elem.className + " ").replace(rclass, " ");
						for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[c] + " ", " ");
						}
						elem.className = jQuery.trim( className );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value, isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.toggleClass( value.call(this, i, self.attr("class"), stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className, i = 0, self = jQuery(this),
					state = stateVal,
					classNames = value.split( rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space seperated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery.data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery.data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ";
		for ( var i = 0, l = this.length; i < l; i++ ) {
			if ( (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		if ( value === undefined ) {
			var elem = this[0];

			if ( elem ) {
				if ( jQuery.nodeName( elem, "option" ) ) {
					return (elem.attributes.value || {}).specified ? elem.value : elem.text;
				}

				// We need to handle select boxes special
				if ( jQuery.nodeName( elem, "select" ) ) {
					var index = elem.selectedIndex,
						values = [],
						options = elem.options,
						one = elem.type === "select-one";

					// Nothing was selected
					if ( index < 0 ) {
						return null;
					}

					// Loop through all the selected options
					for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
						var option = options[ i ];

						if ( option.selected ) {
							// Get the specifc value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				}

				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				if ( rradiocheck.test( elem.type ) && !jQuery.support.checkOn ) {
					return elem.getAttribute("value") === null ? "on" : elem.value;
				}


				// Everything else, we just grab the value
				return (elem.value || "").replace(rreturn, "");

			}

			return undefined;
		}

		var isFunction = jQuery.isFunction(value);

		return this.each(function(i) {
			var self = jQuery(this), val = value;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call(this, i, self.val());
			}

			// Typecast each time if the value is a Function and the appended
			// value is therefore different each time.
			if ( typeof val === "number" ) {
				val += "";
			}

			if ( jQuery.isArray(val) && rradiocheck.test( this.type ) ) {
				this.checked = jQuery.inArray( self.val(), val ) >= 0;

			} else if ( jQuery.nodeName( this, "select" ) ) {
				var values = jQuery.makeArray(val);

				jQuery( "option", this ).each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					this.selectedIndex = -1;
				}

			} else {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},

	attr: function( elem, name, value, pass ) {
		// don't set attributes on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
			return undefined;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery(elem)[name](value);
		}

		var notxml = elem.nodeType !== 1 || !jQuery.isXMLDoc( elem ),
			// Whether we are setting (or getting)
			set = value !== undefined;

		// Try to normalize/fix the name
		name = notxml && jQuery.props[ name ] || name;

		// Only do all the following if this is a node (faster for style)
		if ( elem.nodeType === 1 ) {
			// These attributes require special treatment
			var special = rspecialurl.test( name );

			// Safari mis-reports the default selected property of an option
			// Accessing the parent's selectedIndex property fixes it
			if ( name === "selected" && !jQuery.support.optSelected ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					// Make sure that it also works with optgroups, see #5701
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}

			// If applicable, access the attribute via the DOM 0 way
			if ( name in elem && notxml && !special ) {
				if ( set ) {
					// We can't allow the type property to be changed (since it causes problems in IE)
					if ( name === "type" && rtype.test( elem.nodeName ) && elem.parentNode ) {
						jQuery.error( "type property can't be changed" );
					}

					elem[ name ] = value;
				}

				// browsers index elements by id/name on forms, give priority to attributes.
				if ( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) ) {
					return elem.getAttributeNode( name ).nodeValue;
				}

				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				if ( name === "tabIndex" ) {
					var attributeNode = elem.getAttributeNode( "tabIndex" );

					return attributeNode && attributeNode.specified ?
						attributeNode.value :
						rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							undefined;
				}

				return elem[ name ];
			}

			if ( !jQuery.support.style && notxml && name === "style" ) {
				if ( set ) {
					elem.style.cssText = "" + value;
				}

				return elem.style.cssText;
			}

			if ( set ) {
				// convert the value to a string (all browsers do this but IE) see #1070
				elem.setAttribute( name, "" + value );
			}

			var attr = !jQuery.support.hrefNormalized && notxml && special ?
					// Some attributes require a special call on IE
					elem.getAttribute( name, 2 ) :
					elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return attr === null ? undefined : attr;
		}

		// elem is actually elem.style ... set the style
		// Using attr for specific style information is now deprecated. Use style instead.
		return jQuery.style( elem, name, value );
	}
});
var rnamespaces = /\.(.*)$/,
	fcleanup = function( nm ) {
		return nm.replace(/[^\w\s\.\|`]/g, function( ch ) {
			return "\\" + ch;
		});
	};

/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	// Bind an event to an element
	// Original by Dean Edwards
	add: function( elem, types, handler, data ) {
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// For whatever reason, IE has trouble passing the window object
		// around, causing it to be cloned in the process
		if ( elem.setInterval && ( elem !== window && !elem.frameElement ) ) {
			elem = window;
		}

		var handleObjIn, handleObj;

		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		// Make sure that the function being executed has a unique ID
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure
		var elemData = jQuery.data( elem );

		// If no elemData is found then we must be trying to bind to one of the
		// banned noData elements
		if ( !elemData ) {
			return;
		}

		var events = elemData.events = elemData.events || {},
			eventHandle = elemData.handle, eventHandle;

		if ( !eventHandle ) {
			elemData.handle = eventHandle = function() {
				// Handle the second event of a trigger and when
				// an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && !jQuery.event.triggered ?
					jQuery.event.handle.apply( eventHandle.elem, arguments ) :
					undefined;
			};
		}

		// Add elem as a property of the handle function
		// This is to prevent a memory leak with non-native events in IE.
		eventHandle.elem = elem;

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = types.split(" ");

		var type, i = 0, namespaces;

		while ( (type = types[ i++ ]) ) {
			handleObj = handleObjIn ?
				jQuery.extend({}, handleObjIn) :
				{ handler: handler, data: data };

			// Namespaced event handlers
			if ( type.indexOf(".") > -1 ) {
				namespaces = type.split(".");
				type = namespaces.shift();
				handleObj.namespace = namespaces.slice(0).sort().join(".");

			} else {
				namespaces = [];
				handleObj.namespace = "";
			}

			handleObj.type = type;
			handleObj.guid = handler.guid;

			// Get the current list of functions bound to this event
			var handlers = events[ type ],
				special = jQuery.event.special[ type ] || {};

			// Init the event handler queue
			if ( !handlers ) {
				handlers = events[ type ] = [];

				// Check for a special event handler
				// Only use addEventListener/attachEvent if the special
				// events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add the function to the element's handler list
			handlers.push( handleObj );

			// Keep track of which events have been used, for global triggering
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, pos ) {
		// don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		var ret, type, fn, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType,
			elemData = jQuery.data( elem ),
			events = elemData && elemData.events;

		if ( !elemData || !events ) {
			return;
		}

		// types is actually an event object here
		if ( types && types.type ) {
			handler = types.handler;
			types = types.type;
		}

		// Unbind all events for the element
		if ( !types || typeof types === "string" && types.charAt(0) === "." ) {
			types = types || "";

			for ( type in events ) {
				jQuery.event.remove( elem, type + types );
			}

			return;
		}

		// Handle multiple events separated by a space
		// jQuery(...).unbind("mouseover mouseout", fn);
		types = types.split(" ");

		while ( (type = types[ i++ ]) ) {
			origType = type;
			handleObj = null;
			all = type.indexOf(".") < 0;
			namespaces = [];

			if ( !all ) {
				// Namespaced event handlers
				namespaces = type.split(".");
				type = namespaces.shift();

				namespace = new RegExp("(^|\\.)" +
					jQuery.map( namespaces.slice(0).sort(), fcleanup ).join("\\.(?:.*\\.)?") + "(\\.|$)")
			}

			eventType = events[ type ];

			if ( !eventType ) {
				continue;
			}

			if ( !handler ) {
				for ( var j = 0; j < eventType.length; j++ ) {
					handleObj = eventType[ j ];

					if ( all || namespace.test( handleObj.namespace ) ) {
						jQuery.event.remove( elem, origType, handleObj.handler, j );
						eventType.splice( j--, 1 );
					}
				}

				continue;
			}

			special = jQuery.event.special[ type ] || {};

			for ( var j = pos || 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( handler.guid === handleObj.guid ) {
					// remove the given handler for the given type
					if ( all || namespace.test( handleObj.namespace ) ) {
						if ( pos == null ) {
							eventType.splice( j--, 1 );
						}

						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}

					if ( pos != null ) {
						break;
					}
				}
			}

			// remove generic event handler if no more handlers exist
			if ( eventType.length === 0 || pos != null && eventType.length === 1 ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					removeEvent( elem, type, elemData.handle );
				}

				ret = null;
				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			var handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			delete elemData.events;
			delete elemData.handle;

			if ( jQuery.isEmptyObject( elemData ) ) {
				jQuery.removeData( elem );
			}
		}
	},

	// bubbling is internal
	trigger: function( event, data, elem /*, bubbling */ ) {
		// Event object or event type
		var type = event.type || event,
			bubbling = arguments[3];

		if ( !bubbling ) {
			event = typeof event === "object" ?
				// jQuery.Event object
				event[expando] ? event :
				// Object literal
				jQuery.extend( jQuery.Event(type), event ) :
				// Just the event type (string)
				jQuery.Event(type);

			if ( type.indexOf("!") >= 0 ) {
				event.type = type = type.slice(0, -1);
				event.exclusive = true;
			}

			// Handle a global trigger
			if ( !elem ) {
				// Don't bubble custom events when global (to avoid too much overhead)
				event.stopPropagation();

				// Only trigger if we've ever bound an event for it
				if ( jQuery.event.global[ type ] ) {
					jQuery.each( jQuery.cache, function() {
						if ( this.events && this.events[type] ) {
							jQuery.event.trigger( event, data, this.handle.elem );
						}
					});
				}
			}

			// Handle triggering a single element

			// don't do events on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
				return undefined;
			}

			// Clean up in case it is reused
			event.result = undefined;
			event.target = elem;

			// Clone the incoming data, if any
			data = jQuery.makeArray( data );
			data.unshift( event );
		}

		event.currentTarget = elem;

		// Trigger the event, it is assumed that "handle" is a function
		var handle = jQuery.data( elem, "handle" );
		if ( handle ) {
			handle.apply( elem, data );
		}

		var parent = elem.parentNode || elem.ownerDocument;

		// Trigger an inline bound script
		try {
			if ( !(elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) ) {
				if ( elem[ "on" + type ] && elem[ "on" + type ].apply( elem, data ) === false ) {
					event.result = false;
				}
			}

		// prevent IE from throwing an error for some elements with some event types, see #3533
		} catch (e) {}

		if ( !event.isPropagationStopped() && parent ) {
			jQuery.event.trigger( event, data, parent, true );

		} else if ( !event.isDefaultPrevented() ) {
			var target = event.target, old,
				isClick = jQuery.nodeName(target, "a") && type === "click",
				special = jQuery.event.special[ type ] || {};

			if ( (!special._default || special._default.call( elem, event ) === false) &&
				!isClick && !(target && target.nodeName && jQuery.noData[target.nodeName.toLowerCase()]) ) {

				try {
					if ( target[ type ] ) {
						// Make sure that we don't accidentally re-trigger the onFOO events
						old = target[ "on" + type ];

						if ( old ) {
							target[ "on" + type ] = null;
						}

						jQuery.event.triggered = true;
						target[ type ]();
					}

				// prevent IE from throwing an error for some elements with some event types, see #3533
				} catch (e) {}

				if ( old ) {
					target[ "on" + type ] = old;
				}

				jQuery.event.triggered = false;
			}
		}
	},

	handle: function( event ) {
		var all, handlers, namespaces, namespace, events;

		event = arguments[0] = jQuery.event.fix( event || window.event );
		event.currentTarget = this;

		// Namespaced event handlers
		all = event.type.indexOf(".") < 0 && !event.exclusive;

		if ( !all ) {
			namespaces = event.type.split(".");
			event.type = namespaces.shift();
			namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
		}

		var events = jQuery.data(this, "events"), handlers = events[ event.type ];

		if ( events && handlers ) {
			// Clone the handlers to prevent manipulation
			handlers = handlers.slice(0);

			for ( var j = 0, l = handlers.length; j < l; j++ ) {
				var handleObj = handlers[ j ];

				// Filter the functions by class
				if ( all || namespace.test( handleObj.namespace ) ) {
					// Pass in a reference to the handler function itself
					// So that we can later remove it
					event.handler = handleObj.handler;
					event.data = handleObj.data;
					event.handleObj = handleObj;

					var ret = handleObj.handler.apply( this, arguments );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}

					if ( event.isImmediatePropagationStopped() ) {
						break;
					}
				}
			}
		}

		return event.result;
	},

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function( event ) {
		if ( event[ expando ] ) {
			return event;
		}

		// store a copy of the original event object
		// and "clone" to set read-only properties
		var originalEvent = event;
		event = jQuery.Event( originalEvent );

		for ( var i = this.props.length, prop; i; ) {
			prop = this.props[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary
		if ( !event.target ) {
			event.target = event.srcElement || document; // Fixes #1925 where srcElement might not be defined either
		}

		// check if target is a textnode (safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement ) {
			event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
		}

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var doc = document.documentElement, body = document.body;
			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
		}

		// Add which for key events
		if ( !event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode) ) {
			event.which = event.charCode || event.keyCode;
		}

		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey ) {
			event.metaKey = event.ctrlKey;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button !== undefined ) {
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
		}

		return event;
	},

	// Deprecated, use jQuery.guid instead
	guid: 1E8,

	// Deprecated, use jQuery.proxy instead
	proxy: jQuery.proxy,

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady,
			teardown: jQuery.noop
		},

		live: {
			add: function( handleObj ) {
				jQuery.event.add( this, handleObj.origType, jQuery.extend({}, handleObj, {handler: liveHandler}) );
			},

			remove: function( handleObj ) {
				var remove = true,
					type = handleObj.origType.replace(rnamespaces, "");

				jQuery.each( jQuery.data(this, "events").live || [], function() {
					if ( type === this.origType.replace(rnamespaces, "") ) {
						remove = false;
						return false;
					}
				});

				if ( remove ) {
					jQuery.event.remove( this, handleObj.origType, liveHandler );
				}
			}

		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( this.setInterval ) {
					this.onbeforeunload = eventHandle;
				}

				return false;
			},
			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	}
};

var removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		elem.removeEventListener( type, handle, false );
	} :
	function( elem, type, handle ) {
		elem.detachEvent( "on" + type, handle );
	};

jQuery.Event = function( src ) {
	// Allow instantiation without the 'new' keyword
	if ( !this.preventDefault ) {
		return new jQuery.Event( src );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;
	// Event type
	} else {
		this.type = src;
	}

	// timeStamp is buggy for some events on Firefox(#3843)
	// So we won't rely on the native value
	this.timeStamp = now();

	// Mark it as fixed
	this[ expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();
		}
		// otherwise set the returnValue property of the original event to false (IE)
		e.returnValue = false;
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement = function( event ) {
	// Check if mouse(over|out) are still within the same parent element
	var parent = event.relatedTarget;

	// Firefox sometimes assigns relatedTarget a XUL element
	// which we cannot access the parentNode property of
	try {
		// Traverse up the tree
		while ( parent && parent !== this ) {
			parent = parent.parentNode;
		}

		if ( parent !== this ) {
			// set the correct event type
			event.type = event.data;

			// handle event if we actually just moused on to a non sub-element
			jQuery.event.handle.apply( this, arguments );
		}

	// assuming we've left the element since we most likely mousedover a xul element
	} catch(e) { }
},

// In case of event delegation, we only need to rename the event.type,
// liveHandler will take care of the rest.
delegate = function( event ) {
	event.type = event.data;
	jQuery.event.handle.apply( this, arguments );
};

// Create mouseenter and mouseleave events
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		setup: function( data ) {
			jQuery.event.add( this, fix, data && data.selector ? delegate : withinElement, orig );
		},
		teardown: function( data ) {
			jQuery.event.remove( this, fix, data && data.selector ? delegate : withinElement );
		}
	};
});

// submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function( data, namespaces ) {
			if ( this.nodeName.toLowerCase() !== "form" ) {
				jQuery.event.add(this, "click.specialSubmit", function( e ) {
					var elem = e.target, type = elem.type;

					if ( (type === "submit" || type === "image") && jQuery( elem ).closest("form").length ) {
						return trigger( "submit", this, arguments );
					}
				});

				jQuery.event.add(this, "keypress.specialSubmit", function( e ) {
					var elem = e.target, type = elem.type;

					if ( (type === "text" || type === "password") && jQuery( elem ).closest("form").length && e.keyCode === 13 ) {
						return trigger( "submit", this, arguments );
					}
				});

			} else {
				return false;
			}
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialSubmit" );
		}
	};

}

// change delegation, happens here so we have bind.
if ( !jQuery.support.changeBubbles ) {

	var formElems = /textarea|input|select/i,

	changeFilters,

	getVal = function( elem ) {
		var type = elem.type, val = elem.value;

		if ( type === "radio" || type === "checkbox" ) {
			val = elem.checked;

		} else if ( type === "select-multiple" ) {
			val = elem.selectedIndex > -1 ?
				jQuery.map( elem.options, function( elem ) {
					return elem.selected;
				}).join("-") :
				"";

		} else if ( elem.nodeName.toLowerCase() === "select" ) {
			val = elem.selectedIndex;
		}

		return val;
	},

	testChange = function testChange( e ) {
		var elem = e.target, data, val;

		if ( !formElems.test( elem.nodeName ) || elem.readOnly ) {
			return;
		}

		data = jQuery.data( elem, "_change_data" );
		val = getVal(elem);

		// the current data will be also retrieved by beforeactivate
		if ( e.type !== "focusout" || elem.type !== "radio" ) {
			jQuery.data( elem, "_change_data", val );
		}

		if ( data === undefined || val === data ) {
			return;
		}

		if ( data != null || val ) {
			e.type = "change";
			return jQuery.event.trigger( e, arguments[1], elem );
		}
	};

	jQuery.event.special.change = {
		filters: {
			focusout: testChange,

			click: function( e ) {
				var elem = e.target, type = elem.type;

				if ( type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select" ) {
					return testChange.call( this, e );
				}
			},

			// Change has to be called before submit
			// Keydown will be called before keypress, which is used in submit-event delegation
			keydown: function( e ) {
				var elem = e.target, type = elem.type;

				if ( (e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") ||
					(e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
					type === "select-multiple" ) {
					return testChange.call( this, e );
				}
			},

			// Beforeactivate happens also before the previous element is blurred
			// with this event you can't trigger a change event, but you can store
			// information/focus[in] is not needed anymore
			beforeactivate: function( e ) {
				var elem = e.target;
				jQuery.data( elem, "_change_data", getVal(elem) );
			}
		},

		setup: function( data, namespaces ) {
			if ( this.type === "file" ) {
				return false;
			}

			for ( var type in changeFilters ) {
				jQuery.event.add( this, type + ".specialChange", changeFilters[type] );
			}

			return formElems.test( this.nodeName );
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialChange" );

			return formElems.test( this.nodeName );
		}
	};

	changeFilters = jQuery.event.special.change.filters;
}

function trigger( type, elem, args ) {
	args[0].type = type;
	return jQuery.event.handle.apply( elem, args );
}

// Create "bubbling" focus and blur events
if ( document.addEventListener ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
		jQuery.event.special[ fix ] = {
			setup: function() {
				this.addEventListener( orig, handler, true );
			},
			teardown: function() {
				this.removeEventListener( orig, handler, true );
			}
		};

		function handler( e ) {
			e = jQuery.event.fix( e );
			e.type = fix;
			return jQuery.event.handle.call( this, e );
		}
	});
}

jQuery.each(["bind", "one"], function( i, name ) {
	jQuery.fn[ name ] = function( type, data, fn ) {
		// Handle object literals
		if ( typeof type === "object" ) {
			for ( var key in type ) {
				this[ name ](key, data, type[key], fn);
			}
			return this;
		}

		if ( jQuery.isFunction( data ) ) {
			fn = data;
			data = undefined;
		}

		var handler = name === "one" ? jQuery.proxy( fn, function( event ) {
			jQuery( this ).unbind( event, handler );
			return fn.apply( this, arguments );
		}) : fn;

		if ( type === "unload" && name !== "one" ) {
			this.one( type, data, fn );

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				jQuery.event.add( this[i], type, handler, data );
			}
		}

		return this;
	};
});

jQuery.fn.extend({
	unbind: function( type, fn ) {
		// Handle object literals
		if ( typeof type === "object" && !type.preventDefault ) {
			for ( var key in type ) {
				this.unbind(key, type[key]);
			}

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				jQuery.event.remove( this[i], type, fn );
			}
		}

		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.live( types, data, fn, selector );
	},

	undelegate: function( selector, types, fn ) {
		if ( arguments.length === 0 ) {
				return this.unbind( "live" );

		} else {
			return this.die( types, null, fn, selector );
		}
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},

	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			var event = jQuery.Event( type );
			event.preventDefault();
			event.stopPropagation();
			jQuery.event.trigger( event, data, this[0] );
			return event.result;
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments, i = 1;

		// link all the functions, so any of them can unbind this click handler
		while ( i < args.length ) {
			jQuery.proxy( fn, args[ i++ ] );
		}

		return this.click( jQuery.proxy( fn, function( event ) {
			// Figure out which function to execute
			var lastToggle = ( jQuery.data( this, "lastToggle" + fn.guid ) || 0 ) % i;
			jQuery.data( this, "lastToggle" + fn.guid, lastToggle + 1 );

			// Make sure that clicks stop
			event.preventDefault();

			// and execute the function
			return args[ lastToggle ].apply( this, arguments ) || false;
		}));
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

var liveMap = {
	focus: "focusin",
	blur: "focusout",
	mouseenter: "mouseover",
	mouseleave: "mouseout"
};

jQuery.each(["live", "die"], function( i, name ) {
	jQuery.fn[ name ] = function( types, data, fn, origSelector /* Internal Use Only */ ) {
		var type, i = 0, match, namespaces, preType,
			selector = origSelector || this.selector,
			context = origSelector ? this : jQuery( this.context );

		if ( jQuery.isFunction( data ) ) {
			fn = data;
			data = undefined;
		}

		types = (types || "").split(" ");

		while ( (type = types[ i++ ]) != null ) {
			match = rnamespaces.exec( type );
			namespaces = "";

			if ( match )  {
				namespaces = match[0];
				type = type.replace( rnamespaces, "" );
			}

			if ( type === "hover" ) {
				types.push( "mouseenter" + namespaces, "mouseleave" + namespaces );
				continue;
			}

			preType = type;

			if ( type === "focus" || type === "blur" ) {
				types.push( liveMap[ type ] + namespaces );
				type = type + namespaces;

			} else {
				type = (liveMap[ type ] || type) + namespaces;
			}

			if ( name === "live" ) {
				// bind live handler
				context.each(function(){
					jQuery.event.add( this, liveConvert( type, selector ),
						{ data: data, selector: selector, handler: fn, origType: type, origHandler: fn, preType: preType } );
				});

			} else {
				// unbind live handler
				context.unbind( liveConvert( type, selector ), fn );
			}
		}

		return this;
	}
});

function liveHandler( event ) {
	var stop, elems = [], selectors = [], args = arguments,
		related, match, handleObj, elem, j, i, l, data,
		events = jQuery.data( this, "events" );

	// Make sure we avoid non-left-click bubbling in Firefox (#3861)
	if ( event.liveFired === this || !events || !events.live || event.button && event.type === "click" ) {
		return;
	}

	event.liveFired = this;

	var live = events.live.slice(0);

	for ( j = 0; j < live.length; j++ ) {
		handleObj = live[j];

		if ( handleObj.origType.replace( rnamespaces, "" ) === event.type ) {
			selectors.push( handleObj.selector );

		} else {
			live.splice( j--, 1 );
		}
	}

	match = jQuery( event.target ).closest( selectors, event.currentTarget );

	for ( i = 0, l = match.length; i < l; i++ ) {
		for ( j = 0; j < live.length; j++ ) {
			handleObj = live[j];

			if ( match[i].selector === handleObj.selector ) {
				elem = match[i].elem;
				related = null;

				// Those two events require additional checking
				if ( handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave" ) {
					related = jQuery( event.relatedTarget ).closest( handleObj.selector )[0];
				}

				if ( !related || related !== elem ) {
					elems.push({ elem: elem, handleObj: handleObj });
				}
			}
		}
	}

	for ( i = 0, l = elems.length; i < l; i++ ) {
		match = elems[i];
		event.currentTarget = match.elem;
		event.data = match.handleObj.data;
		event.handleObj = match.handleObj;

		if ( match.handleObj.origHandler.apply( match.elem, args ) === false ) {
			stop = false;
			break;
		}
	}

	return stop;
}

function liveConvert( type, selector ) {
	return "live." + (type && type !== "*" ? type + "." : "") + selector.replace(/\./g, "`").replace(/ /g, "&");
}

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( fn ) {
		return fn ? this.bind( name, fn ) : this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}
});

// Prevent memory leaks in IE
// Window isn't included so as not to unbind existing unload events
// More info:
//  - http://isaacschlueter.com/2006/10/msie-memory-leaks/
if ( window.attachEvent && !window.addEventListener ) {
	window.attachEvent("onunload", function() {
		for ( var id in jQuery.cache ) {
			if ( jQuery.cache[ id ].handle ) {
				// Try/Catch is to handle iframes being unloaded, see #4280
				try {
					jQuery.event.remove( jQuery.cache[ id ].handle.elem );
				} catch(e) {}
			}
		}
	});
}
/*!
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function(){
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	var origContext = context = context || document;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, extra, prune = true, contextXML = isXML(context),
		soFar = selector;

	// Reset the position of the chunker regexp (start from head)
	while ( (chunker.exec(""), m = chunker.exec(soFar)) !== null ) {
		soFar = m[3];

		parts.push( m[1] );

		if ( m[2] ) {
			extra = m[3];
			break;
		}
	}

	if ( parts.length > 1 && origPOS.exec( selector ) ) {
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );
		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}

				set = posProcess( selector, set );
			}
		}
	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
			var ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ? Sizzle.filter( ret.expr, ret.set )[0] : ret.set[0];
		}

		if ( context ) {
			var ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
			set = ret.expr ? Sizzle.filter( ret.expr, ret.set ) : ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray(set);
			} else {
				prune = false;
			}

			while ( parts.length ) {
				var cur = parts.pop(), pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}
		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context && context.nodeType === 1 ) {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}
		} else {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function(results){
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort(sortOrder);

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[i-1] ) {
					results.splice(i--, 1);
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
	var set, match;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i], match;

		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice(1,1);

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName("*");
	}

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
	var old = expr, result = [], curLoop = set, match, anyFound,
		isXMLFilter = set && set[0] && isXML(set[0]);

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var filter = Expr.filter[ type ], found, item, left = match[1];
				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;
					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;
								} else {
									curLoop[i] = false;
								}
							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},
	leftMatch: {},
	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},
	attrHandle: {
		href: function(elem){
			return elem.getAttribute("href");
		}
	},
	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part){
			var isPartStr = typeof part === "string";

			if ( isPartStr && !/\W/.test(part) ) {
				part = part.toLowerCase();

				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}
			} else {
				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				var nodeCheck = part = part.toLowerCase();
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				var nodeCheck = part = part.toLowerCase();
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
		}
	},
	find: {
		ID: function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context){
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [], results = context.getElementsByName(match[1]);

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		}
	},
	preFilter: {
		CLASS: function(match, curLoop, inplace, result, not, isXML){
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}
					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},
		ID: function(match){
			return match[1].replace(/\\/g, "");
		},
		TAG: function(match, curLoop){
			return match[1].toLowerCase();
		},
		CHILD: function(match){
			if ( match[1] === "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},
		ATTR: function(match, curLoop, inplace, result, not, isXML){
			var name = match[1].replace(/\\/g, "");

			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},
		PSEUDO: function(match, curLoop, inplace, result, not){
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);
				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
					if ( !inplace ) {
						result.push.apply( result, ret );
					}
					return false;
				}
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}

			return match;
		},
		POS: function(match){
			match.unshift( true );
			return match;
		}
	},
	filters: {
		enabled: function(elem){
			return elem.disabled === false && elem.type !== "hidden";
		},
		disabled: function(elem){
			return elem.disabled === true;
		},
		checked: function(elem){
			return elem.checked === true;
		},
		selected: function(elem){
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			return elem.selected === true;
		},
		parent: function(elem){
			return !!elem.firstChild;
		},
		empty: function(elem){
			return !elem.firstChild;
		},
		has: function(elem, i, match){
			return !!Sizzle( match[3], elem ).length;
		},
		header: function(elem){
			return /h\d/i.test( elem.nodeName );
		},
		text: function(elem){
			return "text" === elem.type;
		},
		radio: function(elem){
			return "radio" === elem.type;
		},
		checkbox: function(elem){
			return "checkbox" === elem.type;
		},
		file: function(elem){
			return "file" === elem.type;
		},
		password: function(elem){
			return "password" === elem.type;
		},
		submit: function(elem){
			return "submit" === elem.type;
		},
		image: function(elem){
			return "image" === elem.type;
		},
		reset: function(elem){
			return "reset" === elem.type;
		},
		button: function(elem){
			return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
		},
		input: function(elem){
			return /input|select|textarea|button/i.test(elem.nodeName);
		}
	},
	setFilters: {
		first: function(elem, i){
			return i === 0;
		},
		last: function(elem, i, match, array){
			return i === array.length - 1;
		},
		even: function(elem, i){
			return i % 2 === 0;
		},
		odd: function(elem, i){
			return i % 2 === 1;
		},
		lt: function(elem, i, match){
			return i < match[3] - 0;
		},
		gt: function(elem, i, match){
			return i > match[3] - 0;
		},
		nth: function(elem, i, match){
			return match[3] - 0 === i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var i = 0, l = not.length; i < l; i++ ) {
					if ( not[i] === elem ) {
						return false;
					}
				}

				return true;
			} else {
				Sizzle.error( "Syntax error, unrecognized expression: " + name );
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) {
							return false;
						}
					}
					if ( type === "first" ) {
						return true;
					}
					node = elem;
				case 'last':
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) {
							return false;
						}
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}

					var doneName = match[0],
						parent = elem.parentNode;

					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						}
						parent.sizcache = doneName;
					}

					var diff = elem.nodeIndex - last;
					if ( first === 0 ) {
						return diff === 0;
					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},
		ATTR: function(elem, match){
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},
		POS: function(elem, match, i, array){
			var name = match[2], filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS;

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + /(?![^\[]*\])(?![^\(]*\))/.source );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, function(all, num){
		return "\\" + (num - 0 + 1);
	}));
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}

	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch(e){
	makeArray = function(array, results) {
		var ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );
		} else {
			if ( typeof array.length === "number" ) {
				for ( var i = 0, l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}
			} else {
				for ( var i = 0; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.compareDocumentPosition ? -1 : 1;
		}

		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	sortOrder = function( a, b ) {
		if ( !a.sourceIndex || !b.sourceIndex ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.sourceIndex ? -1 : 1;
		}

		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	sortOrder = function( a, b ) {
		if ( !a.ownerDocument || !b.ownerDocument ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.ownerDocument ? -1 : 1;
		}

		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.setStart(a, 0);
		aRange.setEnd(a, 0);
		bRange.setStart(b, 0);
		bRange.setEnd(b, 0);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}

// Utility function for retreiving the text value of an array of DOM nodes
function getText( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += getText( elem.childNodes );
		}
	}

	return ret;
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date).getTime();
	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
			}
		};

		Expr.filter.ID = function(elem, match){
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );
	root = form = null; // release memory in IE
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function(match, context){
			var results = context.getElementsByTagName(match[1]);

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";
	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {
		Expr.attrHandle.href = function(elem){
			return elem.getAttribute("href", 2);
		};
	}

	div = null; // release memory in IE
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle, div = document.createElement("div");
		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}

		Sizzle = function(query, context, extra, seed){
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && context.nodeType === 9 && !isXML(context) ) {
				try {
					return makeArray( context.querySelectorAll(query), extra );
				} catch(e){}
			}

			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		div = null; // release memory in IE
	})();
}

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}

	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	div = null; // release memory in IE
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

var contains = document.compareDocumentPosition ? function(a, b){
	return !!(a.compareDocumentPosition(b) & 16);
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

var isXML = function(elem){
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function(selector, context){
	var tmpSet = [], later = "", match,
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = getText;
jQuery.isXMLDoc = isXML;
jQuery.contains = contains;

return;

window.Sizzle = Sizzle;

})();
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	// Note: This RegExp should be improved, or likely pulled from Sizzle
	rmultiselector = /,/,
	slice = Array.prototype.slice;

// Implement the identical functionality for filter and not
var winnow = function( elements, qualifier, keep ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return (elem === qualifier) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return (jQuery.inArray( elem, qualifier ) >= 0) === keep;
	});
};

jQuery.fn.extend({
	find: function( selector ) {
		var ret = this.pushStack( "", "find", selector ), length = 0;

		for ( var i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( var n = length; n < ret.length; n++ ) {
					for ( var r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && jQuery.filter( selector, this ).length > 0;
	},

	closest: function( selectors, context ) {
		if ( jQuery.isArray( selectors ) ) {
			var ret = [], cur = this[0], match, matches = {}, selector;

			if ( cur && selectors.length ) {
				for ( var i = 0, l = selectors.length; i < l; i++ ) {
					selector = selectors[i];

					if ( !matches[selector] ) {
						matches[selector] = jQuery.expr.match.POS.test( selector ) ?
							jQuery( selector, context || this.context ) :
							selector;
					}
				}

				while ( cur && cur.ownerDocument && cur !== context ) {
					for ( selector in matches ) {
						match = matches[selector];

						if ( match.jquery ? match.index(cur) > -1 : jQuery(cur).is(match) ) {
							ret.push({ selector: selector, elem: cur });
							delete matches[selector];
						}
					}
					cur = cur.parentNode;
				}
			}

			return ret;
		}

		var pos = jQuery.expr.match.POS.test( selectors ) ?
			jQuery( selectors, context || this.context ) : null;

		return this.map(function( i, cur ) {
			while ( cur && cur.ownerDocument && cur !== context ) {
				if ( pos ? pos.index(cur) > -1 : jQuery(cur).is(selectors) ) {
					return cur;
				}
				cur = cur.parentNode;
			}
			return null;
		});
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {
		if ( !elem || typeof elem === "string" ) {
			return jQuery.inArray( this[0],
				// If it receives a string, the selector is used
				// If it receives nothing, the siblings are used
				elem ? jQuery( elem ) : this.parent().children() );
		}
		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context || this.context ) :
				jQuery.makeArray( selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( elem.parentNode.firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, slice.call(arguments).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [], cur = elem[dir];
		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});
var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /(<([\w:]+)[^>]*?)\/>/g,
	rselfClosing = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnocache = /<script|<object|<embed|<option|<style/i,
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,  // checked="checked" or checked (html5)
	fcloseTag = function( all, front, tag ) {
		return rselfClosing.test( tag ) ?
			all :
			front + "></" + tag + ">";
	},
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	};

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE can't serialize <link> and <script> tags normally
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( text ) {
		if ( jQuery.isFunction(text) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.text( text.call(this, i, self.text()) );
			});
		}

		if ( typeof text !== "object" && text !== undefined ) {
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
		}

		return jQuery.text( this );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append(this);
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ), contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		return this.each(function() {
			jQuery( this ).wrapAll( html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery(arguments[0]);
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery(arguments[0]).toArray() );
			return set;
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					 elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( events ) {
		// Do the clone
		var ret = this.map(function() {
			if ( !jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this) ) {
				// IE copies events bound via attachEvent when
				// using cloneNode. Calling detachEvent on the
				// clone will also remove the events from the orignal
				// In order to get around this, we use innerHTML.
				// Unfortunately, this means some modifications to
				// attributes in IE that are actually only stored
				// as properties will not be copied (such as the
				// the name attribute on an input).
				var html = this.outerHTML, ownerDocument = this.ownerDocument;
				if ( !html ) {
					var div = ownerDocument.createElement("div");
					div.appendChild( this.cloneNode(true) );
					html = div.innerHTML;
				}

				return jQuery.clean([html.replace(rinlinejQuery, "")
					// Handle the case in IE 8 where action=/test/> self-closes a tag
					.replace(/=([^="'>\s]+\/)>/g, '="$1">')
					.replace(rleadingWhitespace, "")], ownerDocument)[0];
			} else {
				return this.cloneNode(true);
			}
		});

		// Copy the events from the original to the clone
		if ( events === true ) {
			cloneCopyEvent( this, ret );
			cloneCopyEvent( this.find("*"), ret.find("*") );
		}

		// Return the cloned set
		return ret;
	},

	html: function( value ) {
		if ( value === undefined ) {
			return this[0] && this[0].nodeType === 1 ?
				this[0].innerHTML.replace(rinlinejQuery, "") :
				null;

		// See if we can take a shortcut and just use innerHTML
		} else if ( typeof value === "string" && !rnocache.test( value ) &&
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

			value = value.replace(rxhtmlTag, fcloseTag);

			try {
				for ( var i = 0, l = this.length; i < l; i++ ) {
					// Remove element nodes and prevent memory leaks
					if ( this[i].nodeType === 1 ) {
						jQuery.cleanData( this[i].getElementsByTagName("*") );
						this[i].innerHTML = value;
					}
				}

			// If using innerHTML throws an exception, use the fallback method
			} catch(e) {
				this.empty().append( value );
			}

		} else if ( jQuery.isFunction( value ) ) {
			this.each(function(i){
				var self = jQuery(this), old = self.html();
				self.empty().append(function(){
					return value.call( this, i, old );
				});
			});

		} else {
			this.empty().append( value );
		}

		return this;
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery(value).detach();
			}

			return this.each(function() {
				var next = this.nextSibling, parent = this.parentNode;

				jQuery(this).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value );
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, value = args[0], scripts = [], fragment, parent;

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			// If we're in a fragment, just use that instead of building a new one
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = buildFragment( args, this, scripts );
			}

			fragment = results.fragment;

			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						i > 0 || results.cacheable || this.length > 1  ?
							fragment.cloneNode(true) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;

		function root( elem, cur ) {
			return jQuery.nodeName(elem, "table") ?
				(elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
				elem;
		}
	}
});

function cloneCopyEvent(orig, ret) {
	var i = 0;

	ret.each(function() {
		if ( this.nodeName !== (orig[i] && orig[i].nodeName) ) {
			return;
		}

		var oldData = jQuery.data( orig[i++] ), curData = jQuery.data( this, oldData ), events = oldData && oldData.events;

		if ( events ) {
			delete curData.handle;
			curData.events = {};

			for ( var type in events ) {
				for ( var handler in events[ type ] ) {
					jQuery.event.add( this, type, events[ type ][ handler ], events[ type ][ handler ].data );
				}
			}
		}
	});
}

function buildFragment( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults,
		doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document);

	// Only cache "small" (1/2 KB) strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	if ( args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document &&
		!rnocache.test( args[0] ) && (jQuery.support.checkClone || !rchecked.test( args[0] )) ) {

		cacheable = true;
		cacheresults = jQuery.fragments[ args[0] ];
		if ( cacheresults ) {
			if ( cacheresults !== 1 ) {
				fragment = cacheresults;
			}
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ args[0] ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
}

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [], insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;

		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;

		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = (i > 0 ? this.clone(true) : this).get();
				jQuery.fn[ original ].apply( jQuery(insert[i]), elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

jQuery.extend({
	clean: function( elems, context, fragment, scripts ) {
		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [];

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" && !rhtml.test( elem ) ) {
				elem = context.createTextNode( elem );

			} else if ( typeof elem === "string" ) {
				// Fix "XHTML"-style tags in all browsers
				elem = elem.replace(rxhtmlTag, fcloseTag);

				// Trim whitespace, otherwise indexOf won't work as expected
				var tag = (rtagName.exec( elem ) || ["", ""])[1].toLowerCase(),
					wrap = wrapMap[ tag ] || wrapMap._default,
					depth = wrap[0],
					div = context.createElement("div");

				// Go to html and back, then peel off extra wrappers
				div.innerHTML = wrap[1] + elem + wrap[2];

				// Move to the right depth
				while ( depth-- ) {
					div = div.lastChild;
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !jQuery.support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					var hasBody = rtbody.test(elem),
						tbody = tag === "table" && !hasBody ?
							div.firstChild && div.firstChild.childNodes :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !hasBody ?
								div.childNodes :
								[];

					for ( var j = tbody.length - 1; j >= 0 ; --j ) {
						if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
							tbody[ j ].parentNode.removeChild( tbody[ j ] );
						}
					}

				}

				// IE completely kills leading whitespace when innerHTML is used
				if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
				}

				elem = div.childNodes;
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			for ( var i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );

				} else {
					if ( ret[i].nodeType === 1 ) {
						ret.splice.apply( ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},

	cleanData: function( elems ) {
		var data, id, cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			id = elem[ jQuery.expando ];

			if ( id ) {
				data = cache[ id ];

				if ( data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						} else {
							removeEvent( elem, type, data.handle );
						}
					}
				}

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}

				delete cache[ id ];
			}
		}
	}
});
// exclude the following css properties to add px
var rexclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
	ralpha = /alpha\([^)]*\)/,
	ropacity = /opacity=([^)]*)/,
	rfloat = /float/i,
	rdashAlpha = /-([a-z])/ig,
	rupper = /([A-Z])/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,

	cssShow = { position: "absolute", visibility: "hidden", display:"block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],

	// cache check for defaultView.getComputedStyle
	getComputedStyle = document.defaultView && document.defaultView.getComputedStyle,
	// normalize float css property
	styleFloat = jQuery.support.cssFloat ? "cssFloat" : "styleFloat",
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn.css = function( name, value ) {
	return access( this, name, value, true, function( elem, name, value ) {
		if ( value === undefined ) {
			return jQuery.curCSS( elem, name );
		}

		if ( typeof value === "number" && !rexclude.test(name) ) {
			value += "px";
		}

		jQuery.style( elem, name, value );
	});
};

jQuery.extend({
	style: function( elem, name, value ) {
		// don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
			return undefined;
		}

		// ignore negative width and height values #1599
		if ( (name === "width" || name === "height") && parseFloat(value) < 0 ) {
			value = undefined;
		}

		var style = elem.style || elem, set = value !== undefined;

		// IE uses filters for opacity
		if ( !jQuery.support.opacity && name === "opacity" ) {
			if ( set ) {
				// IE has trouble with opacity if it does not have layout
				// Force it by setting the zoom level
				style.zoom = 1;

				// Set the alpha filter to set the opacity
				var opacity = parseInt( value, 10 ) + "" === "NaN" ? "" : "alpha(opacity=" + value * 100 + ")";
				var filter = style.filter || jQuery.curCSS( elem, "filter" ) || "";
				style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : opacity;
			}

			return style.filter && style.filter.indexOf("opacity=") >= 0 ?
				(parseFloat( ropacity.exec(style.filter)[1] ) / 100) + "":
				"";
		}

		// Make sure we're using the right name for getting the float value
		if ( rfloat.test( name ) ) {
			name = styleFloat;
		}

		name = name.replace(rdashAlpha, fcamelCase);

		if ( set ) {
			style[ name ] = value;
		}

		return style[ name ];
	},

	css: function( elem, name, force, extra ) {
		if ( name === "width" || name === "height" ) {
			var val, props = cssShow, which = name === "width" ? cssWidth : cssHeight;

			function getWH() {
				val = name === "width" ? elem.offsetWidth : elem.offsetHeight;

				if ( extra === "border" ) {
					return;
				}

				jQuery.each( which, function() {
					if ( !extra ) {
						val -= parseFloat(jQuery.curCSS( elem, "padding" + this, true)) || 0;
					}

					if ( extra === "margin" ) {
						val += parseFloat(jQuery.curCSS( elem, "margin" + this, true)) || 0;
					} else {
						val -= parseFloat(jQuery.curCSS( elem, "border" + this + "Width", true)) || 0;
					}
				});
			}

			if ( elem.offsetWidth !== 0 ) {
				getWH();
			} else {
				jQuery.swap( elem, props, getWH );
			}

			return Math.max(0, Math.round(val));
		}

		return jQuery.curCSS( elem, name, force );
	},

	curCSS: function( elem, name, force ) {
		var ret, style = elem.style, filter;

		// IE uses filters for opacity
		if ( !jQuery.support.opacity && name === "opacity" && elem.currentStyle ) {
			ret = ropacity.test(elem.currentStyle.filter || "") ?
				(parseFloat(RegExp.$1) / 100) + "" :
				"";

			return ret === "" ?
				"1" :
				ret;
		}

		// Make sure we're using the right name for getting the float value
		if ( rfloat.test( name ) ) {
			name = styleFloat;
		}

		if ( !force && style && style[ name ] ) {
			ret = style[ name ];

		} else if ( getComputedStyle ) {

			// Only "float" is needed here
			if ( rfloat.test( name ) ) {
				name = "float";
			}

			name = name.replace( rupper, "-$1" ).toLowerCase();

			var defaultView = elem.ownerDocument.defaultView;

			if ( !defaultView ) {
				return null;
			}

			var computedStyle = defaultView.getComputedStyle( elem, null );

			if ( computedStyle ) {
				ret = computedStyle.getPropertyValue( name );
			}

			// We should always get a number back from opacity
			if ( name === "opacity" && ret === "" ) {
				ret = "1";
			}

		} else if ( elem.currentStyle ) {
			var camelCase = name.replace(rdashAlpha, fcamelCase);

			ret = elem.currentStyle[ name ] || elem.currentStyle[ camelCase ];

			// From the awesome hack by Dean Edwards
			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {
				// Remember the original values
				var left = style.left, rsLeft = elem.runtimeStyle.left;

				// Put in the new values to get a computed value out
				elem.runtimeStyle.left = elem.currentStyle.left;
				style.left = camelCase === "fontSize" ? "1em" : (ret || 0);
				ret = style.pixelLeft + "px";

				// Revert the changed values
				style.left = left;
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};

		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( var name in options ) {
			elem.style[ name ] = old[ name ];
		}
	}
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth, height = elem.offsetHeight,
			skip = elem.nodeName.toLowerCase() === "tr";

		return width === 0 && height === 0 && !skip ?
			true :
			width > 0 && height > 0 && !skip ?
				false :
				jQuery.curCSS(elem, "display") === "none";
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}
var jsc = now(),
	rscript = /<script(.|\s)*?\/script>/gi,
	rselectTextarea = /select|textarea/i,
	rinput = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,
	jsre = /=\?(&|$)/,
	rquery = /\?/,
	rts = /(\?|&)_=.*?(&|$)/,
	rurl = /^(\w+:)?\/\/([^\/?#]+)/,
	r20 = /%20/g,

	// Keep a copy of the old load method
	_load = jQuery.fn.load;

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" ) {
			return _load.call( this, url );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = null;

			// Otherwise, build a param string
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function( res, status ) {
				// If successful, inject the HTML into all the matched elements
				if ( status === "success" || status === "notmodified" ) {
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div />")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(res.responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						res.responseText );
				}

				if ( callback ) {
					self.each( callback, [res.responseText, status, res] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param(this.serializeArray());
	},
	serializeArray: function() {
		return this.map(function() {
			return this.elements ? jQuery.makeArray(this.elements) : this;
		})
		.filter(function() {
			return this.name && !this.disabled &&
				(this.checked || rselectTextarea.test(this.nodeName) ||
					rinput.test(this.type));
		})
		.map(function( i, elem ) {
			var val = jQuery(this).val();

			return val == null ?
				null :
				jQuery.isArray(val) ?
					jQuery.map( val, function( val, i ) {
						return { name: elem.name, value: val };
					}) :
					{ name: elem.name, value: val };
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function( i, o ) {
	jQuery.fn[o] = function( f ) {
		return this.bind(o, f);
	};
});

jQuery.extend({

	get: function( url, data, callback, type ) {
		// shift arguments if data argument was omited
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = null;
		}

		return jQuery.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	getScript: function( url, callback ) {
		return jQuery.get(url, null, callback, "script");
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get(url, data, callback, "json");
	},

	post: function( url, data, callback, type ) {
		// shift arguments if data argument was omited
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	ajaxSetup: function( settings ) {
		jQuery.extend( jQuery.ajaxSettings, settings );
	},

	ajaxSettings: {
		url: location.href,
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		username: null,
		password: null,
		traditional: false,
		*/
		// Create the request object; Microsoft failed to properly
		// implement the XMLHttpRequest in IE7 (can't request local files),
		// so we use the ActiveXObject when it is available
		// This function can be overriden by calling jQuery.ajaxSetup
		xhr: window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject) ?
			function() {
				return new window.XMLHttpRequest();
			} :
			function() {
				try {
					return new window.ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {}
			},
		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			script: "text/javascript, application/javascript",
			json: "application/json, text/javascript",
			text: "text/plain",
			_default: "*/*"
		}
	},

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajax: function( origSettings ) {
		var s = jQuery.extend(true, {}, jQuery.ajaxSettings, origSettings);

		var jsonp, status, data,
			callbackContext = origSettings && origSettings.context || s,
			type = s.type.toUpperCase();

		// convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Handle JSONP Parameter Callbacks
		if ( s.dataType === "jsonp" ) {
			if ( type === "GET" ) {
				if ( !jsre.test( s.url ) ) {
					s.url += (rquery.test( s.url ) ? "&" : "?") + (s.jsonp || "callback") + "=?";
				}
			} else if ( !s.data || !jsre.test(s.data) ) {
				s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
			}
			s.dataType = "json";
		}

		// Build temporary JSONP function
		if ( s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url)) ) {
			jsonp = s.jsonpCallback || ("jsonp" + jsc++);

			// Replace the =? sequence both in the query string and the data
			if ( s.data ) {
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			}

			s.url = s.url.replace(jsre, "=" + jsonp + "$1");

			// We need to make sure
			// that a JSONP style response is executed properly
			s.dataType = "script";

			// Handle JSONP-style loading
			window[ jsonp ] = window[ jsonp ] || function( tmp ) {
				data = tmp;
				success();
				complete();
				// Garbage collect
				window[ jsonp ] = undefined;

				try {
					delete window[ jsonp ];
				} catch(e) {}

				if ( head ) {
					head.removeChild( script );
				}
			};
		}

		if ( s.dataType === "script" && s.cache === null ) {
			s.cache = false;
		}

		if ( s.cache === false && type === "GET" ) {
			var ts = now();

			// try replacing _= if it is there
			var ret = s.url.replace(rts, "$1_=" + ts + "$2");

			// if nothing was replaced, add timestamp to the end
			s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
		}

		// If data is available, append data to url for get requests
		if ( s.data && type === "GET" ) {
			s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
		}

		// Watch for a new set of requests
		if ( s.global && ! jQuery.active++ ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Matches an absolute URL, and saves the domain
		var parts = rurl.exec( s.url ),
			remote = parts && (parts[1] && parts[1] !== location.protocol || parts[2] !== location.host);

		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if ( s.dataType === "script" && type === "GET" && remote ) {
			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			var script = document.createElement("script");
			script.src = s.url;
			if ( s.scriptCharset ) {
				script.charset = s.scriptCharset;
			}

			// Handle Script loading
			if ( !jsonp ) {
				var done = false;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function() {
					if ( !done && (!this.readyState ||
							this.readyState === "loaded" || this.readyState === "complete") ) {
						done = true;
						success();
						complete();

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}
					}
				};
			}

			// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
			// This arises when a base node is used (#2709 and #4378).
			head.insertBefore( script, head.firstChild );

			// We handle everything using the script element injection
			return undefined;
		}

		var requestDone = false;

		// Create the request object
		var xhr = s.xhr();

		if ( !xhr ) {
			return;
		}

		// Open the socket
		// Passing null username, generates a login popup on Opera (#2865)
		if ( s.username ) {
			xhr.open(type, s.url, s.async, s.username, s.password);
		} else {
			xhr.open(type, s.url, s.async);
		}

		// Need an extra try/catch for cross domain requests in Firefox 3
		try {
			// Set the correct header, if data is being sent
			if ( s.data || origSettings && origSettings.contentType ) {
				xhr.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[s.url] ) {
					xhr.setRequestHeader("If-Modified-Since", jQuery.lastModified[s.url]);
				}

				if ( jQuery.etag[s.url] ) {
					xhr.setRequestHeader("If-None-Match", jQuery.etag[s.url]);
				}
			}

			// Set header so the called script knows that it's an XMLHttpRequest
			// Only send the header if it's not a remote XHR
			if ( !remote ) {
				xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			}

			// Set the Accepts header for the server, depending on the dataType
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
				s.accepts[ s.dataType ] + ", */*" :
				s.accepts._default );
		} catch(e) {}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && s.beforeSend.call(callbackContext, xhr, s) === false ) {
			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active ) {
				jQuery.event.trigger( "ajaxStop" );
			}

			// close opended socket
			xhr.abort();
			return false;
		}

		if ( s.global ) {
			trigger("ajaxSend", [xhr, s]);
		}

		// Wait for a response to come back
		var onreadystatechange = xhr.onreadystatechange = function( isTimeout ) {
			// The request was aborted
			if ( !xhr || xhr.readyState === 0 || isTimeout === "abort" ) {
				// Opera doesn't call onreadystatechange before this point
				// so we simulate the call
				if ( !requestDone ) {
					complete();
				}

				requestDone = true;
				if ( xhr ) {
					xhr.onreadystatechange = jQuery.noop;
				}

			// The transfer is complete and the data is available, or the request timed out
			} else if ( !requestDone && xhr && (xhr.readyState === 4 || isTimeout === "timeout") ) {
				requestDone = true;
				xhr.onreadystatechange = jQuery.noop;

				status = isTimeout === "timeout" ?
					"timeout" :
					!jQuery.httpSuccess( xhr ) ?
						"error" :
						s.ifModified && jQuery.httpNotModified( xhr, s.url ) ?
							"notmodified" :
							"success";

				var errMsg;

				if ( status === "success" ) {
					// Watch for, and catch, XML document parse errors
					try {
						// process the data (runs the xml through httpData regardless of callback)
						data = jQuery.httpData( xhr, s.dataType, s );
					} catch(err) {
						status = "parsererror";
						errMsg = err;
					}
				}

				// Make sure that the request was successful or notmodified
				if ( status === "success" || status === "notmodified" ) {
					// JSONP handles its own success callback
					if ( !jsonp ) {
						success();
					}
				} else {
					jQuery.handleError(s, xhr, status, errMsg);
				}

				// Fire the complete handlers
				complete();

				if ( isTimeout === "timeout" ) {
					xhr.abort();
				}

				// Stop memory leaks
				if ( s.async ) {
					xhr = null;
				}
			}
		};

		// Override the abort handler, if we can (IE doesn't allow it, but that's OK)
		// Opera doesn't fire onreadystatechange at all on abort
		try {
			var oldAbort = xhr.abort;
			xhr.abort = function() {
				if ( xhr ) {
					oldAbort.call( xhr );
				}

				onreadystatechange( "abort" );
			};
		} catch(e) { }

		// Timeout checker
		if ( s.async && s.timeout > 0 ) {
			setTimeout(function() {
				// Check to see if the request is still happening
				if ( xhr && !requestDone ) {
					onreadystatechange( "timeout" );
				}
			}, s.timeout);
		}

		// Send the data
		try {
			xhr.send( type === "POST" || type === "PUT" || type === "DELETE" ? s.data : null );
		} catch(e) {
			jQuery.handleError(s, xhr, null, e);
			// Fire the complete handlers
			complete();
		}

		// firefox 1.5 doesn't fire statechange for sync requests
		if ( !s.async ) {
			onreadystatechange();
		}

		function success() {
			// If a local callback was specified, fire it and pass it the data
			if ( s.success ) {
				s.success.call( callbackContext, data, status, xhr );
			}

			// Fire the global callback
			if ( s.global ) {
				trigger( "ajaxSuccess", [xhr, s] );
			}
		}

		function complete() {
			// Process result
			if ( s.complete ) {
				s.complete.call( callbackContext, xhr, status);
			}

			// The request was completed
			if ( s.global ) {
				trigger( "ajaxComplete", [xhr, s] );
			}

			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active ) {
				jQuery.event.trigger( "ajaxStop" );
			}
		}

		function trigger(type, args) {
			(s.context ? jQuery(s.context) : jQuery.event).trigger(type, args);
		}

		// return XMLHttpRequest to allow aborting the request etc.
		return xhr;
	},

	handleError: function( s, xhr, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) {
			s.error.call( s.context || s, xhr, status, e );
		}

		// Fire the global callback
		if ( s.global ) {
			(s.context ? jQuery(s.context) : jQuery.event).trigger( "ajaxError", [xhr, s, e] );
		}
	},

	// Counter for holding the number of active queries
	active: 0,

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( xhr ) {
		try {
			// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
			return !xhr.status && location.protocol === "file:" ||
				// Opera returns 0 when status is 304
				( xhr.status >= 200 && xhr.status < 300 ) ||
				xhr.status === 304 || xhr.status === 1223 || xhr.status === 0;
		} catch(e) {}

		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xhr, url ) {
		var lastModified = xhr.getResponseHeader("Last-Modified"),
			etag = xhr.getResponseHeader("Etag");

		if ( lastModified ) {
			jQuery.lastModified[url] = lastModified;
		}

		if ( etag ) {
			jQuery.etag[url] = etag;
		}

		// Opera returns 0 when status is 304
		return xhr.status === 304 || xhr.status === 0;
	},

	httpData: function( xhr, type, s ) {
		var ct = xhr.getResponseHeader("content-type") || "",
			xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;

		if ( xml && data.documentElement.nodeName === "parsererror" ) {
			jQuery.error( "parsererror" );
		}

		// Allow a pre-filtering function to sanitize the response
		// s is checked to keep backwards compatibility
		if ( s && s.dataFilter ) {
			data = s.dataFilter( data, type );
		}

		// The filter can actually parse the response
		if ( typeof data === "string" ) {
			// Get the JavaScript object, if JSON is used.
			if ( type === "json" || !type && ct.indexOf("json") >= 0 ) {
				data = jQuery.parseJSON( data );

			// If the type is "script", eval it in global context
			} else if ( type === "script" || !type && ct.indexOf("javascript") >= 0 ) {
				jQuery.globalEval( data );
			}
		}

		return data;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [];

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray(a) || a.jquery ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[prefix] );
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(r20, "+");

		function buildParams( prefix, obj ) {
			if ( jQuery.isArray(obj) ) {
				// Serialize array item.
				jQuery.each( obj, function( i, v ) {
					if ( traditional || /\[\]$/.test( prefix ) ) {
						// Treat each array item as a scalar.
						add( prefix, v );
					} else {
						// If array item is non-scalar (array or object), encode its
						// numeric index to resolve deserialization ambiguity issues.
						// Note that rack (as of 1.0.0) can't currently deserialize
						// nested arrays properly, and attempting to do so may cause
						// a server error. Possible fixes are to modify rack's
						// deserialization algorithm or to provide an option or flag
						// to force array serialization to be shallow.
						buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v );
					}
				});

			} else if ( !traditional && obj != null && typeof obj === "object" ) {
				// Serialize object item.
				jQuery.each( obj, function( k, v ) {
					buildParams( prefix + "[" + k + "]", v );
				});

			} else {
				// Serialize scalar item.
				add( prefix, obj );
			}
		}

		function add( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction(value) ? value() : value;
			s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		}
	}
});
var elemdisplay = {},
	rfxtypes = /toggle|show|hide/,
	rfxnum = /^([+-]=)?([\d+-.]+)(.*)$/,
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	];

jQuery.fn.extend({
	show: function( speed, callback ) {
		if ( speed || speed === 0) {
			return this.animate( genFx("show", 3), speed, callback);

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				var old = jQuery.data(this[i], "olddisplay");

				this[i].style.display = old || "";

				if ( jQuery.css(this[i], "display") === "none" ) {
					var nodeName = this[i].nodeName, display;

					if ( elemdisplay[ nodeName ] ) {
						display = elemdisplay[ nodeName ];

					} else {
						var elem = jQuery("<" + nodeName + " />").appendTo("body");

						display = elem.css("display");

						if ( display === "none" ) {
							display = "block";
						}

						elem.remove();

						elemdisplay[ nodeName ] = display;
					}

					jQuery.data(this[i], "olddisplay", display);
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( var j = 0, k = this.length; j < k; j++ ) {
				this[j].style.display = jQuery.data(this[j], "olddisplay") || "";
			}

			return this;
		}
	},

	hide: function( speed, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, callback);

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				var old = jQuery.data(this[i], "olddisplay");
				if ( !old && old !== "none" ) {
					jQuery.data(this[i], "olddisplay", jQuery.css(this[i], "display"));
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( var j = 0, k = this.length; j < k; j++ ) {
				this[j].style.display = "none";
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2 ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2);
		}

		return this;
	},

	fadeTo: function( speed, to, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete );
		}

		return this[ optall.queue === false ? "each" : "queue" ](function() {
			var opt = jQuery.extend({}, optall), p,
				hidden = this.nodeType === 1 && jQuery(this).is(":hidden"),
				self = this;

			for ( p in prop ) {
				var name = p.replace(rdashAlpha, fcamelCase);

				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
					p = name;
				}

				if ( prop[p] === "hide" && hidden || prop[p] === "show" && !hidden ) {
					return opt.complete.call(this);
				}

				if ( ( p === "height" || p === "width" ) && this.style ) {
					// Store display property
					opt.display = jQuery.css(this, "display");

					// Make sure that nothing sneaks out
					opt.overflow = this.style.overflow;
				}

				if ( jQuery.isArray( prop[p] ) ) {
					// Create (if needed) and add to specialEasing
					(opt.specialEasing = opt.specialEasing || {})[p] = prop[p][1];
					prop[p] = prop[p][0];
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			opt.curAnim = jQuery.extend({}, prop);

			jQuery.each( prop, function( name, val ) {
				var e = new jQuery.fx( self, opt, name );

				if ( rfxtypes.test(val) ) {
					e[ val === "toggle" ? hidden ? "show" : "hide" : val ]( prop );

				} else {
					var parts = rfxnum.exec(val),
						start = e.cur(true) || 0;

					if ( parts ) {
						var end = parseFloat( parts[2] ),
							unit = parts[3] || "px";

						// We need to compute starting value
						if ( unit !== "px" ) {
							self.style[ name ] = (end || 1) + unit;
							start = ((end || 1) / e.cur(true)) * start;
							self.style[ name ] = start + unit;
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] ) {
							end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			});

			// For JS strict compliance
			return true;
		});
	},

	stop: function( clearQueue, gotoEnd ) {
		var timers = jQuery.timers;

		if ( clearQueue ) {
			this.queue([]);
		}

		this.each(function() {
			// go in reverse order so anything added to the queue during the loop is ignored
			for ( var i = timers.length - 1; i >= 0; i-- ) {
				if ( timers[i].elem === this ) {
					if (gotoEnd) {
						// force the next step to be the last
						timers[i](true);
					}

					timers.splice(i, 1);
				}
			}
		});

		// start the next in the queue if the last step wasn't forced
		if ( !gotoEnd ) {
			this.dequeue();
		}

		return this;
	}

});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show", 1),
	slideUp: genFx("hide", 1),
	slideToggle: genFx("toggle", 1),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, callback ) {
		return this.animate( props, speed, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? speed : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			jQuery.fx.speeds[opt.duration] || jQuery.fx.speeds._default;

		// Queueing
		opt.old = opt.complete;
		opt.complete = function() {
			if ( opt.queue !== false ) {
				jQuery(this).dequeue();
			}
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if ( !options.orig ) {
			options.orig = {};
		}
	}

});

jQuery.fx.prototype = {
	// Simple function for setting a style value
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );

		// Set display property to block for height/width animations
		if ( ( this.prop === "height" || this.prop === "width" ) && this.elem.style ) {
			this.elem.style.display = "block";
		}
	},

	// Get the current size
	cur: function( force ) {
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
			return this.elem[ this.prop ];
		}

		var r = parseFloat(jQuery.css(this.elem, this.prop, force));
		return r && r > -10000 ? r : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0;
	},

	// Start an animation from one number to another
	custom: function( from, to, unit ) {
		this.startTime = now();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;

		var self = this;
		function t( gotoEnd ) {
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval(jQuery.fx.tick, 13);
		}
	},

	// Simple 'show' function
	show: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any
		// flash of content
		this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());

		// Start by showing the element
		jQuery( this.elem ).show();
	},

	// Simple 'hide' function
	hide: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom(this.cur(), 0);
	},

	// Each step of an animation
	step: function( gotoEnd ) {
		var t = now(), done = true;

		if ( gotoEnd || t >= this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			for ( var i in this.options.curAnim ) {
				if ( this.options.curAnim[i] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				if ( this.options.display != null ) {
					// Reset the overflow
					this.elem.style.overflow = this.options.overflow;

					// Reset the display
					var old = jQuery.data(this.elem, "olddisplay");
					this.elem.style.display = old ? old : this.options.display;

					if ( jQuery.css(this.elem, "display") === "none" ) {
						this.elem.style.display = "block";
					}
				}

				// Hide the element if the "hide" operation was done
				if ( this.options.hide ) {
					jQuery(this.elem).hide();
				}

				// Reset the properties, if the item has been hidden or shown
				if ( this.options.hide || this.options.show ) {
					for ( var p in this.options.curAnim ) {
						jQuery.style(this.elem, p, this.options.orig[p]);
					}
				}

				// Execute the complete function
				this.options.complete.call( this.elem );
			}

			return false;

		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;

			// Perform the easing function, defaults to swing
			var specialEasing = this.options.specialEasing && this.options.specialEasing[this.prop];
			var defaultEasing = this.options.easing || (jQuery.easing.swing ? "swing" : "linear");
			this.pos = jQuery.easing[specialEasing || defaultEasing](this.state, n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);

			// Perform the next step of the animation
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		var timers = jQuery.timers;

		for ( var i = 0; i < timers.length; i++ ) {
			if ( !timers[i]() ) {
				timers.splice(i--, 1);
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
 		fast: 200,
 		// Default speed
 		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style(fx.elem, "opacity", fx.now);
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function() {
		obj[ this ] = type;
	});

	return obj;
}
if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		var box = elem.getBoundingClientRect(), doc = elem.ownerDocument, body = doc.body, docElem = doc.documentElement,
			clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
			top  = box.top  + (self.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop ) - clientTop,
			left = box.left + (self.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft) - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		jQuery.offset.initialize();

		var offsetParent = elem.offsetParent, prevOffsetParent = elem,
			doc = elem.ownerDocument, computedStyle, docElem = doc.documentElement,
			body = doc.body, defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop, left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent, offsetParent = elem.offsetParent;
			}

			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {
	initialize: function() {
		var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat( jQuery.curCSS(body, "marginTop", true) ) || 0,
			html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

		jQuery.extend( container.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" } );

		container.innerHTML = html;
		body.insertBefore( container, body.firstChild );
		innerDiv = container.firstChild;
		checkDiv = innerDiv.firstChild;
		td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		checkDiv.style.position = "fixed", checkDiv.style.top = "20px";
		// safari subtracts parent border width here which is 5px
		this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
		checkDiv.style.position = checkDiv.style.top = "";

		innerDiv.style.overflow = "hidden", innerDiv.style.position = "relative";
		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);

		body.removeChild( container );
		body = container = innerDiv = checkDiv = table = td = null;
		jQuery.offset.initialize = jQuery.noop;
	},

	bodyOffset: function( body ) {
		var top = body.offsetTop, left = body.offsetLeft;

		jQuery.offset.initialize();

		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.curCSS(body, "marginTop",  true) ) || 0;
			left += parseFloat( jQuery.curCSS(body, "marginLeft", true) ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		// set position first, in-case top/left are set even on static elem
		if ( /static/.test( jQuery.curCSS( elem, "position" ) ) ) {
			elem.style.position = "relative";
		}
		var curElem   = jQuery( elem ),
			curOffset = curElem.offset(),
			curTop    = parseInt( jQuery.curCSS( elem, "top",  true ), 10 ) || 0,
			curLeft   = parseInt( jQuery.curCSS( elem, "left", true ), 10 ) || 0;

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		var props = {
			top:  (options.top  - curOffset.top)  + curTop,
			left: (options.left - curOffset.left) + curLeft
		};

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({
	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = /^body|html$/i.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.curCSS(elem, "marginTop",  true) ) || 0;
		offset.left -= parseFloat( jQuery.curCSS(elem, "marginLeft", true) ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.curCSS(offsetParent[0], "borderTopWidth",  true) ) || 0;
		parentOffset.left += parseFloat( jQuery.curCSS(offsetParent[0], "borderLeftWidth", true) ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!/^body|html$/i.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function(val) {
		var elem = this[0], win;

		if ( !elem ) {
			return null;
		}

		if ( val !== undefined ) {
			// Set the scroll offset
			return this.each(function() {
				win = getWindow( this );

				if ( win ) {
					win.scrollTo(
						!i ? val : jQuery(win).scrollLeft(),
						 i ? val : jQuery(win).scrollTop()
					);

				} else {
					this[ method ] = val;
				}
			});
		} else {
			win = getWindow( elem );

			// Return the scroll offset
			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}
	};
});

function getWindow( elem ) {
	return ("scrollTo" in elem && elem.document) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn["inner" + name] = function() {
		return this[0] ?
			jQuery.css( this[0], type, false, "padding" ) :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn["outer" + name] = function( margin ) {
		return this[0] ?
			jQuery.css( this[0], type, false, margin ? "margin" : "border" ) :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}

		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		return ("scrollTo" in elem && elem.document) ? // does it walk and quack like a window?
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			elem.document.compatMode === "CSS1Compat" && elem.document.documentElement[ "client" + name ] ||
			elem.document.body[ "client" + name ] :

			// Get document width or height
			(elem.nodeType === 9) ? // is it a document
				// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
				Math.max(
					elem.documentElement["client" + name],
					elem.body["scroll" + name], elem.documentElement["scroll" + name],
					elem.body["offset" + name], elem.documentElement["offset" + name]
				) :

				// Get or set width or height on the element
				size === undefined ?
					// Get width or height on the element
					jQuery.css( elem, type ) :

					// Set the width or height on the element (default to pixels if value is unitless)
					this.css( type, typeof size === "string" ? size : size + "px" );
	};

});
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

})(window);

///////////////////////////////////////////////////////////////////////////////
//					Castle Age Auto Player
///////////////////////////////////////////////////////////////////////////////

//Images scr
//http://image2.castleagegame.com/1393/graphics/symbol_tiny_1.jpg
var symbol_tiny_1 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAVQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwQDBAQEBAMEBAUGBgYFBAcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBAQHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFgAWAwERAAIRAQMRAf/EAIQAAQADAQAAAAAAAAAAAAAAAAgFBgcJAQEBAQAAAAAAAAAAAAAAAAAGBwUQAAEEAQMCBAQHAAAAAAAAAAIBAwQFBhESBxMIACExCXEjFBZBUYEiMhUYEQABAgMFBwEJAAAAAAAAAAABEQIAAwQxQVESBfAhYYHBEwYikaGx0eEyQiMU/9oADAMBAAIRAxEAPwDmv2BdhuJ8oYbZ9yXcRauVnE8Ga1V1rGiuP2VlKNehEjtuIQKSj8xwzEgbb0XQiJNmxomlirnS5btwcQpwC7zBzyjW36dSTp8oZnsY4taSmZwBIC4G+EbcUPt45C9I4pzfAr3Ha2OZ1p5PW3y2zjDrZK0Ug62fHRhQ3Ju2t7SRPRdfCSt8TdLLmscHISACEsOOPKDekeYf0yJU57cudjXFDYSATyXjBwyP2x52J99uPdu0/IIw8Q5THk30LKjfkDXLSxa1+7KaJISuq0saKZI2pIe4Sb3aojijnUiTA1LSiXrhDltcDKL1sCrwjY+OLn729uHDX8KLqMYdcynsgYY8ya+uiR47EoxTz2g7GJlS9EX4+FXjE1oel7mhOV22EEvKJLnDfvAJXnt74jcx5Hhcg4+w/OKJCyaPMluN18JohOQ3KGMoqKCiqZK4JqpEuqr5J+SOaiszENeircMdr4m+laN/C89vM5pa0KSqZV9gQhAIunPVVe22e8GdvcRVPmerxe+CVDRfnip0l1YpAX8eoLL4N7PXU9PE+dVSxXib+Jf0ResU+XTzDQOZfl6gp0gn+3pcd5mO5bYTO22n+4cYUpCWsN+TFiQ0aRNX1dcslbY6W3Tf1EUPgvn4OUjpgHpCjayE1e2UfvKQj7LmHlSwmRoXFnEmOQuYPr4SwZVNb4sMj+wGSKtJFVq1lj+400Xptaaa66J436mZW9v9jX5eNnP6wcp5VD3PQ9q8Afl8IKE+d3l/7Hg29vCe/wBKdZw6qqMz6nU3H1AA0P8Alpv1VXN2v6J4PudM7gJG+EzWyu0QD6Y//9k%3D";
//http://image2.castleagegame.com/1393/graphics/symbol_tiny_2.jpg
var symbol_tiny_2 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAVQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwQDBAQEBAMEBAUGBgYFBAcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBAQHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFgAWAwERAAIRAQMRAf/EAIUAAQADAAAAAAAAAAAAAAAAAAgFBgkBAAIDAQEAAAAAAAAAAAAAAAMEAgUGCAcQAAIBAgUCBAUFAAAAAAAAAAIDAQQFERITBggAByExQSJRMkIUFVIjZBYXEQACAQIFAgQFBQAAAAAAAAABAhESAwAhMQQFQRNRYYEicbEyFAbwoWIjM//aAAwDAQACEQMRAD8Ax8438d29wjdu3dD2qsYMzE0gmoFYMJ0KEEm1Qte6UHkEigREZIsfbE0fIcglgVXJW2CAzAaE+PgvQkdT0x6V+Ifh1/lXO32YS5vWtm5btOYqVTogOT3SJZUYgFBPuJACRsvFzsjv3bNSior7tZ6dITjcbgduuNMJeQ6lGqioiwmfDBTRKPSZ6LuxttraN92pUdQT6RrM9BnOEfx61zXO79OK2lvvXnJHbZFAEfVVkO2FzqaVpjUHBzruIO+rZyIoez00tQR3NTqmKSXMGAWigi7SzUn3SiaaIdE4Z8mMYZ46gN45slipqC1RAqI+ExVHSdY+GD3PxvajlF263rRtG6bTNW3aW4Mge5TV2SxBDxNAbwqKC4m2zb28OOz3JcoTtLkXOsUbAURU50aLXmGTmMZXU0RjMfFgfrjGQvLasXKwDBMg9ZMgddQchGemFbexvbzlNt9u7IXS2VdRmlCBS2qwEZDU0ikAnFjud/RtSoXCCL7EDJtMFVEQxjYnT/eGZGBMZjwzeXr7sMcptbBsOl26pNoFqEJ/ygwS2RyHrRoJGeOgOc5teV2252WzvLb37JaG63KIAd8GQsEswwILQCR7fuACzUkBTEdx91VNbyK7f0tO2B3zT2+sQ0dSIYTEWq7VRozep5K9SMPPPiHnGHW1ZgdwCOimfUiPkccyWbbJx1xWBl7qBRGpRXqy8q1Hrgz8Tbh35s28qR3au3KvNIy6iu3076impZXcp8c9K24RpxMBhq5wJWXDUj5eg7hUa4sEB8tRI8p89YzB1jDvGXdym1cMjNYNU0mGAyrIifZ9NYZSmkw0HCY333B5CtRWJqNg20N1gp8vMLntVZlgM6mmxVVUCRT/AB1Ac/TMT0ZjfIg0geOZ/Yx88JWk49HDI152kQoVVMzlDAuZnSFnwwTKur71/wC00l2u1LR/277QnWu1uJf4/wDH6ZyalHJ6eXT1ImYZnz4+Op0qq2OwVU+3qf10iOkR5Yttxf5D7+3cuW/7M6FkzMmQDNXcqmc+53P5QMf/2Q%3D%3D";
//http://image2.castleagegame.com/1393/graphics/symbol_tiny_3.jpg
var symbol_tiny_3 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAVQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwQDBAQEBAMEBAUGBgYFBAcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBAQHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFgAWAwERAAIRAQMRAf/EAIIAAQEBAAAAAAAAAAAAAAAAAAgHCQEBAQEBAQAAAAAAAAAAAAAABgUHAAEQAAAGAQQCAQMFAAAAAAAAAAECAwQFBhESFQcIExQAISJCMTJDFwkRAAIBAgQEAgkFAQAAAAAAAAECERIDACExQVFxBAVhIoGRoTJCghMjFLHB0WJyBv/aAAwDAQACEQMRAD8AzJ6k9Y4NoyjbjdEkH3Is4VOWab22NJR9fjnay6UaIRah0038pImbKKoJOR9VFsBVVCqisQqZrunXMtp7izRbgGDBZiQIDfConMjOZAiM7fbeiF66ttjBYEyRIUAEzGUkxkCQNJ1yc/Kf+fPaCj8Zq2nmKaO64y0kK9jJlnVJ2Oik1FCoFM4im0LGlImJjgBhjXRFUw+pDDjPwB03/UIbp+2sf1Zww+ZiQ/JlUHDBux2bgCI7hjAlghUk8VEFB4hnIwIbB0WbxPaev16Cr/u1aWfPYWbpyk46RjYuWaxm8IrbvoO6Ug3LUSvkjYK6MgRdvq86XmNpyNdJbp2YBxBDRqvGNKhmDtMGIMYAmiBdA8u4nQ8J4e3UbTi9cIPYKTbxHJrUFHVfjUqBc1SMkvIopBs61C1V0oQgCAmTZyVeetFMftNgPzDMbrrVfbr1uCWVmmP91A8oIPLFbtrR1tsggVLAnIe4VieM5DacLLsNz7ykXiezueUeWIud6vyDCYLxc2iW5d7n3E4r5kkpEchpJEBlMpvp+oasGDHzMbHRWiyhLbfUMBtx8vEvr4csK+nN9bpLMKUk55RB+LgF08ecYIk7aXZX7FBY5k7i+eQ0MxQNgFnMhA123ykggXIhlVu2srFAxQyOtYpMZyAbTd83VoB8KNPzFY9dJ9WM9TKyxO7CPRM/qMHfo3Y+0FdYxbKp1t3ZeOJCWlkau4hpJpFzca9K1SNLrx6r9JwmaPFHwg/I7bKMjfYBxTVEhw8uJVemy1NwATlII2q0z1jMHmMscphPuCUnLYg7x++UenFxczYtJh+9r8bNS1z1a9pjWdGgTisQfvIwlAnp9IFDH/JrHicTY0AQcYgdvNs9S30BbFwznLEDjQCFHOlvZhF3H8n8Vfr1G2I2UE5eWsgltPdqGDZcrl2B/vqoXq9VGI2ba3i9JpKztbatt8rsjtBB0m99rc/a85jmM4973cfzaC/Ltq0lLojNXUKmjzVZRlGmm1NPhOD7s0hmApjIbR/PpmfHH//Z";
//http://image2.castleagegame.com/1393/graphics/symbol_tiny_4.jpg
var symbol_tiny_4 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAVQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwQDBAQEBAMEBAUGBgYFBAcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBAQHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFgAWAwERAAIRAQMRAf/EAIUAAQEAAAAAAAAAAAAAAAAAAAgJAQACAgMAAAAAAAAAAAAAAAAEBgEDBQcIEAABBAEEAgECBwAAAAAAAAADAQIEBQYREhMHFAgAMhUxIkJjFhcJEQACAQIEAwUFCQEAAAAAAAABAhESAwAhMQRBYQVRsSJSE/BxwdFCgZGh4fEyYhQVBv/aAAwDAQACEQMRAD8AlB6l+qd/2bJNdtiksLgYfvEhxI6zh1sIpnjitHCK8Y5M6VxuINhl4hhTe5pFe1rVjqPVrNpgL9z0rc0z5miSJ+kDidZykRmJf3ABhmhZj3n4YSOG+tNH2/HPhzbW8iSxo8T0vQ01rXhc38qoesZWQVG1FTRfHKN7f0rr8I3O32O2tf2HahfPUeOmcmqeAznsxLJbQVTHOT7HBnsfT3IYHs5XdUQa5TOnzT082mfOmDgxZQQeaOSkvjWS+tKDSSxdqHUbSC15Gciir1pDtjca4AoAYPTqsxNPmGYIiJgxBjELufASW4TPKezt/XDA/wAsJCZDdBHjUmMMzn1VhOSWJxmkqT4/X0vI1jCCVeCfTHjKuujXqmv1Jqt/9jt7b9FveoGLWnY5EAyWMEyDkQ4J5YD3yg2GnVSe/wCRxQCwh+tcrL+wca6zHHh91QYsCTey5bHFjkcQGg3I1j2aoxdqG2qi7tNV1+aFf/UTabS5uyx2rM1ABg658Dmc6ZnKYywun1giF/2GY9u7E0Mwz+2me0+NWEcoG9gjdHiOaqKgiz4NfkdocCN13KogXEYKs13akRn1Jp86du9LtMibMA0LYZT5oakDlJpPKRhsNkGLY0Cn8Y+WDF6c2Ps3VZTXh6XrJ9uSTPmso34/KSHaxZCMGs0kV5RkasZW8SSUOJ8dV2I7a/a5COqpt2W4bjAAJ46hKFP56c4ghveMWbhUJaSBlnOkc/hxwprjK/cYtrbgxnHLB3ao48tbv+ONx+BcFCip5SOlBubZUVXablFDRyr+G1dPgO7ey21tC8thbMrQSaln6KRC/Z4tNcpxU8FBVSFyjiOUCB34Gdzc9x/3DUZDkNRF+6eOYlBQEMfh4+cqGGMrTc/mc/IrlUvk+R+5tT5mbVpaXRGauoVNHiqyjKNNOFNPKcEKgggEzOZ4z935Rj//2Q%3D%3D";
//http://image2.castleagegame.com/1393/graphics/symbol_tiny_5.jpg
var symbol_tiny_5 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAVQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwQDBAQEBAMEBAUGBgYFBAcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBAQHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFgAWAwERAAIRAQMRAf/EAGsAAQEAAAAAAAAAAAAAAAAAAAgJAQEBAQAAAAAAAAAAAAAAAAABAgMQAAEDAgUCBAYDAAAAAAAAAAIBAwQFBhESEwcIABQxIhUJIUEyQmIWM0QXEQEBAQADAAAAAAAAAAAAAAABABEhQQL/2gAMAwEAAhEDEQA/AI58ethnb+kS7muKYUSgQybdmTnm+67dJJuJGjx4zhgD0p9GjNEcXTbbTOSEpCPUgZUtQmkeyg5upxKp3J7ba7JFZ20lNKNZkxKhT6y9bcgSVsm6zRXKZAJsRVMSKM6mAqhCuCoqmkQKkcMNzInKuPxvbZYW5Jb5xXAOe8FLBoI3qQzxl4K6UE4grJT4auQTb/kHFVCRml7Hd+bQ29cb8vda2ot47bNSDC8qBLjsSXDoNaokOjJPjg+ipnhS6caIqYKhYChCpovQmkdyZ5Pcsmvbkvxqwfb8u+3K9wfuejzQl0ZuSFWkTptRh+nzv2lpQizYzzSGgxQzNoIj5kVVLqPPnGVgPflyy6tyusymwHsLzp1DKmzFzojpyW6XXagUfH5ugxUWW8vjmPL4ph1qwR64hv8AJWDudETjzHkzrncfmDC9MeBh5oEbRZhEUsCY7XTypISQCsYYZsFyr0DxKSOu+8eXs15+E1alIj30KFqSaa5bLEwzRP67hVWe1qL9uhHQsfowXp2MiJJlbpf6jGqVRjJ+4ec6fTiORn1O4LOAGha3caubFVPV1fzwToWcv//Z"
///////////////////////////

if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
	if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
		GM_addStyle = function(css) {
			var style = document.createElement('style');
			style.textContent = css;
			document.getElementsByTagName('head')[0].appendChild(style);
		}

		GM_deleteValue = function(name) {
			localStorage.removeItem(name);
		}

		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		}

		GM_log = function(message) {
			console.log(message);
		}

		GM_registerMenuCommand = function(name, funk) {
		}

		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		}

		if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }

	}
}

if(!GM_log) {
	GM_log=console.debug;
}

var discussionURL= 'http://senses.ws/caap/index.php';
var debug=false;
var newVersionAvailable=0;
var documentTitle=document.title;

if (parseInt(GM_getValue('SUC_remote_version',0)) > thisVersion) {
	newVersionAvailable=1;
}

// update script from: http://userscripts.org/scripts/review/57917
var SUC_script_num = 57917;
try{ function updateCheck(forced) {
	if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + (86400000*1) <= (new Date().getTime()))) {
		try {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(resp){
					var remote_version, rt, script_name;
					rt=resp.responseText;
					GM_setValue('SUC_last_update', new Date().getTime()+'');
					remote_version=parseInt(/@version\s*(.*?)\s*$/m.exec(rt)[1]);
					script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
					GM_setValue('SUC_target_script_name', script_name);
					GM_setValue('SUC_remote_version', remote_version);
					GM_log('remote version ' + remote_version);
					if (remote_version > thisVersion) {
						newVersionAvailable=1;
						if (forced) {
							if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')) {
								GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
							}
						}
					} else if (forced) alert('No update is available for "'+script_name+'."');
				}
			})
		}catch (err) {
			if (forced) alert('An error occurred while checking for updates:\n'+err);
		}
	}
     }
     GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});
     updateCheck(false);
} catch(err) {}

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

/////////////////////////////////////////////////////////////////////

//							HTML TOOLS

// this object contains general methods for wading through the DOM and dealing with HTML

/////////////////////////////////////////////////////////////////////

var xpath = {
	string : XPathResult.STRING_TYPE,
	unordered: XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	first : XPathResult.FIRST_ORDERED_NODE_TYPE
};
var nHtml={
FindByAttrContains:function(obj,tag,attr,className) {
	if(attr=="className") { attr="class"; }
	className=className.toLowerCase();
	var q=document.evaluate(".//"+tag+
		"[contains(translate(@"+attr+",'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'"+className+
		"')]",obj,null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByAttrXPath:function(obj,tag,className) {
	var q=null;
	try {
		var xpath=".//"+tag+"["+className+"]";
		if(obj==null) {
			GM_log('Trying to find xpath with null obj:'+xpath);
			return null;
		}
		q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(err) {
		GM_log("XPath Failed:"+xpath+","+err);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByAttr:function(obj,tag,attr,className) {
	if(className.exec==undefined) {
		if(attr=="className") { attr="class"; }
		var q=document.evaluate(".//"+tag+"[@"+attr+"='"+className+"']",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		if(q && q.singleNodeValue) { return q.singleNodeValue; }
		return null;
	}
	var divs=obj.getElementsByTagName(tag);
	for(var d=0; d<divs.length; d++) {
		var div=divs[d];
		if(className.exec!=undefined) {
			if(className.exec(div[attr])) {
				return div;
			}
		} else if(div[attr]==className) {
			return div;
		}
	}
	return null;
},
FindByClassName:function(obj,tag,className) {
	return this.FindByAttr(obj,tag,"className",className);
},
spaceTags:{'td':1,'br':1,'hr':1,'span':1,'table':1
},
GetText:function(obj) {
	var txt=' ';
	if(obj.tagName!=undefined && this.spaceTags[obj.tagName.toLowerCase()]) {
		txt+=" ";
	}
	if(obj.nodeName=="#text") { return txt+obj.textContent; }
	for(var o=0; o<obj.childNodes.length; o++) {
		var child=obj.childNodes[o];
		txt+=this.GetText(child);
	}
	return txt;
},

htmlRe:new RegExp('<[^>]+>','g'),
StripHtml:function(html) {
	return html.replace(this.htmlRe,'').replace(/&nbsp;/g,'');
},

timeouts:{},
setTimeout:function(func,millis) {
	var t=window.setTimeout(function() {
		func();
		nHtml.timeouts[t]=undefined;
	},millis);
	this.timeouts[t]=1;
},
clearTimeouts:function() {
	for(var t in this.timeouts) {
		window.clearTimeout(t);
	}
	this.timeouts={};
},
getX:function(path,parent,type) {
	switch (type) {
		case xpath.string : return document.evaluate(path,parent,null,type,null).stringValue;
		case xpath.first : return document.evaluate(path,parent,null,type,null).singleNodeValue;
		case xpath.unordered : return document.evaluate(path,parent,null,type,null);
		default :
	}
},
getHTMLPredicate:function(HTML){
	for (var x = HTML.length; x > 1; x--) {
		if (HTML.substr(x,1) == '/') {
			return HTML.substr(x + 1);
		}
	}
	return HTML
},

OpenInIFrame:function(url, key) {
	//if(!iframe = document.getElementById(key))
	iframe = document.createElement("iframe");
	//GM_log ("Navigating iframe to " + url);
	iframe.setAttribute("src", url);
	iframe.setAttribute("id", key);
	iframe.setAttribute("style","width:0;height:0;");
	document.body.insertBefore(iframe, document.body.firstChild);
},

ResetIFrame:function(key) {
	if(iframe = document.getElementById(key)){
		gm.log("Deleting iframe = "+key);
		iframe.parentNode.removeChild(iframe);
	}else gm.log("Frame not found = "+key);
	if(document.getElementById(key))gm.log("Found iframe");
},

Gup : function(name,href){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec(href);
	if( results == null )
		return "";
	else
		return results[1];
},

ScrollToBottom: function(){
	//GM_log("Scroll Height: " + document.body.scrollHeight);
	if (document.body.scrollHeight) {
		window.scrollBy(0, document.body.scrollHeight);
	} else if (screen.height){
	}
},

ScrollToTop: function(){
	window.scrollByPages(-1000);
},

CountInstances:function(string, word) {
  var substrings = string.split(word);
  return substrings.length - 1;
},
};

/////////////////////////////////////////////////////////////////////

//							gm OBJECT

// this object is used for setting/getting GM specific functions.
/////////////////////////////////////////////////////////////////////
var os='\n'; // Object separator - used to separate objects
var vs='\t'; // Value separator - used to separate name/values within the objects
var ls='\f'; // Label separator - used to separate the name from the value
gm={

// use to log stuff
log:function(mess) {
	GM_log('v'+thisVersion + ': ' +mess);
},
debug:function(mess) {
	if(debug) { gm.log(mess); }
},
// use these to set/get values in a way that prepends the game's name
setValue:function(n,v) {
	gm.debug('Set ' + n + ' to ' + v);
	GM_setValue(caap.gameName+"__"+n,v);
	return v;
},
getValue:function(n,v) {
	gm.debug('Get ' +n + ' value ' + GM_getValue(caap.gameName+"__"+n,v));
	return GM_getValue(caap.gameName+"__"+n,v);
},
deleteValue:function(n) {
	gm.debug('Delete ' +n + ' value ');
	return GM_deleteValue(caap.gameName+"__"+n);
},
IsArray:function(testObject) {
    return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
},
setList:function(n,v) {
	if (!gm.IsArray(v)) {
		gm.log('Attempted to SetList ' + n + ' to ' + v.toString() + ' which is not an array.');
		return;
	}
	return GM_setValue(caap.gameName+"__"+n,v.join(os));
},
getList:function(n) {
	getList = GM_getValue(caap.gameName+"__"+n,'')
	gm.debug('GetList ' +n + ' value ' + GM_getValue(caap.gameName+"__"+n));
	return (getList) ? getList.split(os) : [];
},
listAddBefore:function(listName,addList) {
	newList = addList.concat(gm.getList(listName));
	gm.setList(listName,newList);
	return newList;
},
listPop:function(listName) {
	popList = gm.getList(listName)
	if (!popList.length) return '';
	popItem = popList.pop();
	gm.setList(listName,popList);
	return popItem;
},
listPush:function(listName, pushItem, max) {
  var list = gm.getList(listName);

  // Only add if it isn't already there.
  if (list.indexOf(pushItem) != -1) {
    return;
  }
  list.push(pushItem);
  if (max > 0) {
    while (max < list.length) {
      //var pushItem = list.shift();
      pushItem = list.shift();
      gm.debug('Removing ' + pushItem + ' from ' + listName + '.');
    }
  }
  gm.setList(listName, list);
},
listFindItemByPrefix:function(list,prefix) {
	var itemList = list.filter(function(item){
		return item.indexOf(prefix)==0;
	});
//gm.log('List: ' + list + ' prefix ' + prefix + ' filtered ' + itemList);
	if (itemList.length) return itemList[0];
},
setObjVal:function(objName,label,value) {
	if (!(objStr = gm.getValue(objName))) {
		gm.setValue(objName,label+ls+value);
		return;
	}
	if (!(itemStr = gm.listFindItemByPrefix(objStr.split(vs),label+ls))) {
		gm.setValue(objName,label + ls + value + vs + objStr);
		return;
	}
	objList = objStr.split(vs);
	objList.splice(objList.indexOf(itemStr),1,label+ls+value)
	gm.setValue(objName,objList.join(vs));
},
getObjVal:function(objName,label,defaultValue) {
	objStr = gm.getValue(objName);
	if (!objStr) return defaultValue;
	if (!(itemStr = gm.listFindItemByPrefix(objStr.split(vs),label+ls))) return defaultValue;
	return itemStr.split(ls)[1];
},
getListObjVal:function(listName,objName,label,defaultValue) {
	gLOVlist = gm.getList(listName);
	if (!(gLOVlist.length)) return defaultValue;
//gm.log('have list '+gLOVlist);
	if (!(objStr = gm.listFindItemByPrefix(gLOVlist,objName+vs))) return defaultValue;
//gm.log('have obj ' + objStr);
	if (!(itemStr = gm.listFindItemByPrefix(objStr.split(vs),label+ls))) return defaultValue;
//gm.log('have val '+itemStr);
	return itemStr.split(ls)[1];
},
setListObjVal:function(listName,objName,label,value) {
	objList = gm.getList(listName);
	if (!(objList.length)) {
		gm.setValue(listName,objName+vs+label+ls+value);
		return;
	}
	if (!(objStr = gm.listFindItemByPrefix(objList,objName+vs))) {
		gm.listPush(listName,objName+vs+label+ls+value);
		return;
	}
	valList = objStr.split(vs);
	if (!(valStr = gm.listFindItemByPrefix(valList,label+ls))) {
		valList.push(label+ls+value);
		objList.splice(objList.indexOf(objStr),1,objStr+vs+label+ls+value)
		gm.setList(listName,objList);
		return;
	}
	valList.splice(valList.indexOf(valStr),1,label+ls+value)
	objList.splice(objList.indexOf(objStr),1,valList.join(vs))
	gm.setList(listName,objList);
},
deleteListObj:function(listName,objName) {
	objList = gm.getList(listName);
	if (!(objList.length)) return false;
	if ((objStr = gm.listFindItemByPrefix(objList,objName))) {
		objList.splice(objList.indexOf(objStr),1);
		gm.setList(listName,objList);
	}
}
}
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
Move={
moveHandler:function(e){
	savedTarget.style.position='absolute';
	if (e == null) return;
	if ( e.button<=1 && dragOK ){
		savedTarget.style.left = e.clientX - dragXoffset + 'px';
		savedTarget.style.top = e.clientY - dragYoffset + 'px';
		return false;
	}
},

cleanup:function(e) {
	document.removeEventListener('mousemove',Move.moveHandler,false);
	document.removeEventListener('mouseup',Move.cleanup,false);
	savedTarget.style.cursor=orgCursor;

	if(savedTarget.getAttribute('id')=='divOptions'){
		GM_setValue('optionsLeft', savedTarget.style.left);
		GM_setValue('optionsTop',  savedTarget.style.top);
	}else if(savedTarget.getAttribute('id')=='divUpdater'){
		GM_setValue('updaterLeft', savedTarget.style.left);
		GM_setValue('updaterTop',  savedTarget.style.top);
	}else if(savedTarget.getAttribute('id')=='divMenu'){
		GM_setValue('menuLeft', savedTarget.style.left);
		GM_setValue('menuTop',  savedTarget.style.top);
	}

	dragOK=false; //its been dragged now
	didDrag=true;
},

dragHandler:function(e){

	var htype='-moz-grabbing';
	if (e == null) return;// {{ e = window.event;}  // htype='move';}
	var target = document.getElementById("caap_div");// != null ? e.target : e.srcElement;
	orgCursor=target.style.cursor;

	if(target.nodeName!='DIV')
		return;

	savedTarget=target;
	target.style.cursor=htype;
	dragOK=true;
	dragXoffset = e.clientX-target.offsetLeft;
	dragYoffset = e.clientY-target.offsetTop;

	//set the left before removing the right
	target.style.left = e.clientX - dragXoffset + 'px';
	target.style.right = null;
	document.addEventListener('mousemove',Move.moveHandler,false);
	document.addEventListener('mouseup',Move.cleanup,false);
	return false;
}
}
////////////////////////////////////////////////////////////////////

//							caap OBJECT

// this is the main object for the game, containing all methods, globals, etc.

/////////////////////////////////////////////////////////////////////

caap={
stats:{},
lastReload:new Date(),
autoReloadMilliSecs:15*60*1000,

userRe:new RegExp("(userId=|user=|/profile/|uid=)([0-9]+)"),
levelRe:new RegExp('Level\\s*:\\s*([0-9]+)','i'),
rankRe:new RegExp(',\\s*level\\s*:?\\s*[0-9]+\\s+([a-z ]+)','i'),
armyRe:new RegExp('My Army\\s*\\(?([0-9]+)','i'),
statusRe:new RegExp('([0-9\\.]+)\\s*/\\s*([0-9]+)','i'),
htmlJunkRe:new RegExp("\\&[^;]+;","g"),
energyRe:new RegExp("([0-9]+)\\s+(energy)","i"),
gameNameRe:new RegExp("^/([^/]+)/"),
experienceRe:new RegExp("\\+([0-9]+)"),
influenceRe:new RegExp("([0-9]+)%"),
gainLevelRe:new RegExp("gain\\s+level\\s+([0-9]+)\\s+in","i"),
moneyRe:new RegExp("\\$([0-9,]+)\\s*-\\s*\\$([0-9,]+)","i"),
firstNumberRe:new RegExp("([0-9]+)"),
gameName:'castle_age',

/////////////////////////////////////////////////////////////////////

//							UTILITY FUNCTIONS

// Small functions called a lot to reduce duplicate code

/////////////////////////////////////////////////////////////////////

Click:function(obj,loadWaitTime) {
	if (!obj) {
		gm.log('ERROR: Null object passed to Click');
		return;
	}
	this.waitMilliSecs = (loadWaitTime) ? loadWaitTime : 5000;
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
ClickWait:function(obj,loadWaitTime) {
	this.setTimeout(function() {
		this.Click(obj,loadWaitTime);
	},1000+Math.floor(Math.random()*1000));
},
VisitUrl:function(url,loadWaitTime) {
	this.waitMilliSecs = (loadWaitTime) ? loadWaitTime : 5000;
//	this.setTimeout(function() {
	document.location.href=url;
//	},1000+Math.floor(Math.random()*1000));
},
GetCurrentGeneral:function() {
	var webSlice = nHtml.FindByAttrContains(document.body,"div","class",'general_name_div3');
	if (!webSlice) {
		gm.log("Couldn't find current general div");
		return false;
	}
	return webSlice.innerHTML.trim();
},
UpdateGeneralList:function() {
	if (!this.CheckForImage('tab_generals_on.gif')) return false;
	var gens = nHtml.getX('//div[@class=\'generalSmallContainer2\']', document, xpath.unordered);
	gm.setValue('AllGenerals','');
	gm.setValue('GeneralImages','');
	gm.setValue('LevelUpGenerals','');
	for (var x = 0; x < gens.snapshotLength; x++)	{
		var gen = nHtml.getX('./div[@class=\'general_name_div3\']/text()', gens.snapshotItem(x), xpath.string).replace(/[\t\r\n]/g,'');
		var img = nHtml.getX('.//input[@class=\'imgButton\']/@src', gens.snapshotItem(x), xpath.string);
		img = nHtml.getHTMLPredicate(img);
//		var atk = nHtml.getX('./div[@class=\'generals_indv_stats\']/div[1]/text()', gens.snapshotItem(x), xpath.string);
//		var def = nHtml.getX('./div[@class=\'generals_indv_stats\']/div[2]/text()', gens.snapshotItem(x), xpath.string);
//		var skills = nHtml.getX('.//table//td[1]/div/text()', gens.snapshotItem(x), xpath.string).replace(/[\t\r\n]/gm,'');
		var level = nHtml.getX('./div[4]/div[2]/text()', gens.snapshotItem(x), xpath.string).replace(/Level /gi,'').replace(/[\t\r\n]/g,'');
//		var genatts = gen + ":" + atk + "/" + def + ":L" + level + ":" + img + ","
		gm.listPush('AllGenerals',gen);
		gm.listPush('GeneralImages',gen + ':' + img);
		if (level < 4){gm.listPush('LevelUpGenerals',gen);}
	}
	gm.setList('AllGenerals',gm.getList('AllGenerals').sort());
//	gm.log("All Generals: " + gm.getList('AllGenerals'));
},
ClearGeneral:function(whichGeneral) {
	gm.log('Setting ' + whichGeneral + ' to "Use Current"');
	gm.setValue(whichGeneral,'Use Current');
	this.SetControls(true);
},
SelectGeneral:function(whichGeneral) {
	if (!(general = gm.getValue(whichGeneral,''))) return false;
	if (!general || /use current/i.test(general)) return false;
	if (/under level 4/i.test(general)) {
		if (!gm.getList('LevelUpGenerals').length) return this.ClearGeneral(whichGeneral);
		if (gm.getValue('ReverseLevelUpGenerals')) {
			general = gm.getList('LevelUpGenerals').reverse().pop();
		}
		else {
			general = gm.getList('LevelUpGenerals').pop();
		}
	}
	currentGeneral = this.GetCurrentGeneral().replace('**','');
	if(general.indexOf(currentGeneral) >= 0) return false;

	gm.log('Changing from ' + currentGeneral + ' to ' + general);
	if (this.NavigateTo('mercenary,generals','tab_generals_on.gif')) return true;;
	if (/get general list/i.test(general)) return this.ClearGeneral(whichGeneral);
	var hasGeneral = function(genImg) {return (genImg.indexOf(general.replace(/:.+/,''))>=0); }
	generalImage = gm.getList('GeneralImages').filter(hasGeneral).toString().replace(/.+:/,'');
	if (this.CheckForImage(generalImage)) {
		return this.NavigateTo(generalImage);
	}
	this.SetDivContent('Could not find ' + general);
	gm.log('Could not find ' + generalImage);
	return this.ClearGeneral(whichGeneral);
},

NavigateTo:function(pathToPage,imageOnPage) {
	var content=document.getElementById('content');
	if(!content) {
		gm.log('No content to Navigate to ' + imageOnPage + ' using ' + pathToPage);
		return false;
	}
	if (imageOnPage && this.CheckForImage(imageOnPage)) return false;

	var pathList = pathToPage.split(",");
	for(var s=pathList.length-1; s>=0; s--) {
		var a=nHtml.FindByAttrXPath(content,'a',"contains(@href,'/" + pathList[s] + ".php') and not(contains(@href,'" + pathList[s] + ".php?'))");
		if (a) {
			gm.log('Go to ' + pathList[s]);
			caap.Click(a);
			return true;
		}
		var imageTest = pathList[s]
		if (imageTest.indexOf(".") == -1) imageTest = imageTest + '.'
		var input = nHtml.FindByAttrContains(document.body,"input","src",imageTest);
		if (input) {
			gm.log('Click on image ' + input.src.match(/[\w.]+$/));
			caap.Click(input);
			return true;
		}
		var input = nHtml.FindByAttrContains(document.body,"img","src",imageTest);
		if (input) {
			gm.log('Click on image ' + input.src.match(/[\w.]+$/));
			caap.Click(input);
			return true;
		}
	}
	gm.log('Unable to Navigate to ' + imageOnPage + ' using ' + pathToPage);
	return false;
},

CheckForImage:function(image,webSlice) {
	if (!webSlice) {
		webSlice=document.body;
	}
	if (imageSlice = nHtml.FindByAttrContains(webSlice,'input','src',image)) {
		return imageSlice;
	}
	if (imageSlice = nHtml.FindByAttrContains(webSlice,'img','src',image)) {
		return imageSlice;
	}
	if (imageSlice = nHtml.FindByAttrContains(webSlice,'div','style',image)) {
		return imageSlice;
	}
	return false;
},

WhileSinceDidIt:function(name, seconds) {
	var now = (new Date().getTime());
	return (!gm.getValue(name) || (parseInt(gm.getValue(name)) < (now-1000*seconds)));
},
JustDidIt:function(name) {
	var now = (new Date().getTime());
	gm.setValue(name, now.toString());
},
DeceiveDidIt:function(name) {
	gm.log("Deceive Did It");
	var now = (new Date().getTime())-6500000;
	gm.setValue(name, now.toString());
},
// Returns true if timer is passed, or undefined
CheckTimer:function(name) {
	nameTimer = gm.getValue(name)
	if (!nameTimer) return true;
	var now = new Date().getTime();
	return (nameTimer < now);
},
FormatTime:function(time) {
	return time.toDateString().match(/^\w+ /) + time.toLocaleTimeString().replace(/:\d+ /i,' ').replace(/:\d+$/i,'')
},
DisplayTimer:function(name) {
	nameTimer = gm.getValue(name);
	if (!nameTimer) return false;
	var newTime = new Date();
	newTime.setTime(parseInt(nameTimer));
	return this.FormatTime(newTime);
},
SetTimer:function(name, time) {
	var now = (new Date().getTime());
	now += time*1000
	gm.setValue(name, now.toString());
},
CheckLastAction:function(thisAction) {
	this.SetDivContent('activity_mess','Current activity: ' + thisAction);
	lastAction = gm.getValue('LastAction','none')
	gm.setValue('LastAction',thisAction);
	if (lastAction!=thisAction) {
		gm.log('Changed from doing ' + lastAction + ' to ' + thisAction);
	}
},
NumberOnly:function(num) {
	var numOnly=parseFloat(num.toString().replace(/[^0-9\.]/g,""));
	return numOnly;
},
RemoveHtmlJunk:function(html) {
	return html.replace(this.htmlJunkRe,'');
},

/////////////////////////////////////////////////////////////////////

//							DISPLAY FUNCTIONS

// these functions set up the control applet and allow it to be changed

/////////////////////////////////////////////////////////////////////

SetupDivs:function() {

	if(document.getElementById('caap_div')) {
		return false;
	}
	var div=document.createElement('div');
	var b=nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_Container clearfix');
	div.id='caap_div';
	div.style.top='100px';
	div.style.left='940px';
	div.style.width='180px';

	div.style.padding='4px';
	div.style.border='2px solid #444';
	div.style.background = gm.getValue('StyleBackgroundLight','#E0C691');
	div.style.opacity = gm.getValue('StyleOpacityLight','1');
	div.style.color='#000';
	div.style.cssFloat='right';
	nHtml.FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_SidebarAds').style.display='none';

	var divList = ['activity_mess','army_mess','quest_mess','battle_mess','heal_mess','demipoint_mess','demibless_mess','level_mess','control'];
	for (var divID in divList) {
		var addDiv=document.createElement('div');
		addDiv.id='caap_' + divList[divID];
		div.appendChild(addDiv);
	}

//check these out to see which one actually works on CA and remove the rest
	var b=nHtml.FindByAttrContains(document.body, 'div', 'className', 'UIStandardFrame_Container');
	if(b) {
		b.insertBefore(div,b.childNodes[1]);
	} else {

		var app=document.getElementById('fb_sell_profile');
		if(!app) {
			app=nHtml.FindByAttr(document.body,'div','className','app');
		}
		if(!app) {
			app=nHtml.FindByAttr(document.body,'div','id',/^app.*header$/);
		}
		if(app) {
			if(app.parentNode.parentNode) {
				// some ajax games won't reload before the app's area, let's insert the div there.
				app.parentNode.parentNode.insertBefore(div,app.parentNode);
			} else {
				app.insertBefore(div,app.childNodes[0]);
			}
		} else {
			gm.log('cannot find app div');
		}
	}

	return true;
},

AppendTextToDiv:function(divName,text) {
	var d=document.getElementById('caap_' + divName);
	if(d) {
		d.innerHTML  += text;
		return true;
	} else return false;
},

MakeDropDown:function(idName, dropDownList,instructions,formatParms) {
	var selectedItem = gm.getValue(idName,'defaultValue');
	if (selectedItem=='defaultValue')
		selectedItem = gm.setValue(idName,dropDownList[0]);
	var htmlCode = " <select id='caap_" + idName + "' " + formatParms + "'><option>" + selectedItem;
	for (var item in dropDownList) {
		if (selectedItem!=dropDownList[item]) {
			if (instructions) {
				htmlCode+="<option" + ((instructions[item])?" title='" + instructions[item] + "'":'') + ">"  + dropDownList[item];
			} else {
				htmlCode+="<option>"  + dropDownList[item];
			}
		}
	}
	htmlCode+='</select>';
	return htmlCode;
},

MakeCheckBox:function(idName,defaultValue,varClass,instructions,tableTF) {
	var checkItem = gm.getValue(idName,'defaultValue');
	if (checkItem=='defaultValue') gm.setValue(idName,defaultValue);
	var htmlCode = "<input type='checkbox' id='caap_" + idName + "' title=" + '"' + instructions +'"' + ((varClass)?" class='" + varClass + "'":'') + (gm.getValue(idName)?'checked':'')+' />';
	if (varClass) {
		if (tableTF) htmlCode += "</td></tr></table>";
		else htmlCode += '<br />';
		htmlCode += this.AddCollapsingDiv(idName,varClass);
	}
	return htmlCode;
},

MakeNumberForm:function(idName,instructions,initDefault,formatParms) {
	if (gm.getValue(idName,'defaultValue')=='defaultValue') gm.setValue(idName,initDefault);
	if (!initDefault) initDefault = '';
	if (!formatParms) formatParms = "size='4'";
	var htmlCode = " <input type='text' id='caap_" + idName + "' " + formatParms + " title=" + '"' + instructions +'"' + " />";
	return htmlCode;
},

AddCollapsingDiv:function(parentId,subId) {
	var htmlCode = "<div id='caap_" + subId + "' style='display: " + (gm.getValue(parentId,false)?'block':'none') +"'>";
	return htmlCode;
},

ToggleControl:function(controlId,staticText) {
	var currentDisplay = gm.getValue('Control_'+controlId,"none")
	if (currentDisplay == "none") var displayChar = "+";
	else var displayChar = "-";
	var toggleCode = '<b><a id="caap_Switch_' + controlId + '" href="javascript:;" style="text-decoration: none;"> ' + displayChar + ' ' + staticText + '</a></b> <br />';
	toggleCode += "<div id='caap_" + controlId + "' style='display: " + currentDisplay + "'>";
	return toggleCode;
},

GetNumber:function(name,defaultValue) {
	if(!gm.getValue(name)) return defaultValue || '';
	return Number(gm.getValue(name));
},

MakeTextBox:function(idName,instructions,formatParms) {
	var checkItem = gm.getValue(idName,'');
	// if (idName == 'BattleTargets' && checkItem == '') {
		// gm.log('Freshmeat set.' + idName + ' checkItem ' + checkItem);
		// gm.setValue(idName,'freshmeat');
	// }
	var htmlCode = "<textarea title=" + '"' + instructions +'"' + " type='text' id='caap_" + idName + "' " + formatParms + ">"+gm.getValue(idName,'')+"</textarea><br />";
	return htmlCode;
},

SaveBoxText:function(idName) {
	var boxText=document.getElementById('caap_' + idName);
	gm.setValue(idName,boxText.value);
},

SetDivContent:function(idName,mess) {
	this.SetupDivs();
	var d=document.getElementById('caap_' + idName);
	if(d) { d.innerHTML=mess; }
},

SetQuestControl:function() {
	this.SetupDivs();
	var htmlCode = '';
	this.SetDivContent('quest_control',htmlCode);
},

SetControls:function(force) {

	var controlDiv=document.getElementById('caap_control');
	if(controlDiv && controlDiv.innerHTML.length>0 && !force) {
		// we already have the controls
		return;
	}

	var htmlCode = '';
	htmlCode += "<div id='caapPaused' style='display: " + gm.getValue('caapPause','block') +"'><b>Paused on mouse click.</b><br /><a href='javascript:;' id='caapRestart' >Click here to restart </a></div>";
	htmlCode += '<hr />Disable auto run for this game. ' + this.MakeCheckBox('Disabled',false);
	var bankInstructions0="Minimum cash to keep in the bank. Press tab to save";
	var bankInstructions1="Minimum cash to have on hand, press tab to save";
	var bankInstructions2="Maximum cash to have on hand, bank anything above this, press tab to save(leave blank to disable)";
	var healthInstructions="Minimum health to have before healing, press tab to save(leave blank to disable): ";
	var healthStamInstructions="Minimum Stamina to have before healing, press tab to save(leave blank to disable): ";
	var bankImmedInstructions="Bank as soon as possible. May interrupt player and monster battles."
	var autobuyInstructions="Automatically buy properties in groups of 10 based on best Return On Investment value. "
	htmlCode += '<hr />' + this.ToggleControl('CashandHealth','CASH and HEALTH');
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Bank Immediately</td><td> ' + this.MakeCheckBox('BankImmed',false,'',bankImmedInstructions) +  '</td></tr>';
		htmlCode += '<tr><td>Auto Buy Properties</td><td> ' + this.MakeCheckBox('autoBuyProperty',false,'',autobuyInstructions) + '</td></tr></table>';
		htmlCode += "Always Keep&nbsp$" + this.MakeNumberForm('minInStore',bankInstructions0,100000,"type='text'  size='12' style='font-size: 10px'") + " In Bank<br />";
		htmlCode += "Bank Above&nbsp;&nbsp$" + this.MakeNumberForm('MaxInCash',bankInstructions2,'',"type='text'  size='7' style='font-size: 10px'") + "<br />";
		htmlCode += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;But Keep&nbsp;$" + this.MakeNumberForm('MinInCash',bankInstructions1,'',"type='text' size='7' style='font-size: 10px'") + " On Hand <br /><br />";
		htmlCode += "Heal If Below&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('MinToHeal',healthInstructions,10,"size='1'  style='font-size: 10px'") + " Health<br />";
		htmlCode += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;But Not If Below" + this.MakeNumberForm('MinStamToHeal',healthStamInstructions,'',"size='1'  style='font-size: 10px'") + ' Stamina<br />';
	htmlCode += "<hr/> </div>";

	var forceSubGen = "Always do a quest with the Subquest General you selected under the Generals section. NOTE: This will keep the script from automatically switching to the required general for experience of primary quests.";
	htmlCode += this.ToggleControl('Quests','QUEST');
		var questList = ['Energy Available','At Max Energy','Not Fortifying','Never'];
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
		htmlCode += '<tr><td width=80>Quest When:</td><td>' + this.MakeDropDown('WhenQuest',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
		htmlCode += "<div id='caap_WhenQuestHide' style='display: " + (gm.getValue('WhenQuest',false)!='Never'?'block':'none') +"'>";
			questList = ['Quest','Demi Quests','Atlantis'];
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
			htmlCode += '<tr><td>Pick Quest Area:</td><td>' + this.MakeDropDown('QuestArea',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
			switch (gm.getValue('QuestArea', questList[0])){
				case 'Quest' :
					questList =['Land of Fire','Land of Earth','Land of Mist','Land of Water','Demon Realm','Undead Realm','Underworld'];
					htmlCode += '<tr><td>Pick Sub Area:</td><td>' + this.MakeDropDown('QuestSubArea',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
					break;
				case 'Demi Quests' :
					questList = ['Ambrosia','Malekus','Corvintheus','Aurora','Azeron'];
					htmlCode += '<tr><td>Pick Sub Area:</td><td>' + this.MakeDropDown('QuestSubArea',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
					break;
				default :
					gm.deleteValue('QuestSubArea');
					htmlCode += "<div id='AutoSubArea'></div>";
			}
			var questList = ['Max Influence','Max Gold','Max Experience', 'Manual'];
			htmlCode += '<tr><td>Quest For:</td><td>' + this.MakeDropDown('WhyQuest',questList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
			htmlCode += '<tr><td>Switch Quest Area</td><td> ' + this.MakeCheckBox('swithQuestArea',false,'','Allows switching quest area') +  "</td></tr>";
			htmlCode += '<tr><td>Use Only Subquest General</td><td> ' + this.MakeCheckBox('ForceSubGeneral',false,'',forceSubGen) +  "</td></tr></table>"
		htmlCode += "</div>";
		if ((autoQuestName = gm.getObjVal('AutoQuest','name'))) {
			htmlCode += "<a id='stopAutoQuest' href='javascript:;'>Stop auto quest: "+ autoQuestName +" (energy: "+gm.getObjVal('AutoQuest','energy')+")"+"</a><br />";
		}
	htmlCode += "<hr/> </div>";


	var XBattleInstructions="Start battling if stamina is above this points";
	var XMinBattleInstructions="Don't battle if stamina is below this points";
	var userIdInstructions="User IDs(not user name).  Click with the right mouse button on the link to the users profile & copy link.  Then paste it here and remove everything but the last numbers. (ie. 123456789)";
	var chainBPInstructions="Number of battle points won to initiate a chain attack. Specify 0 to always chain attack.";
	var chainGoldInstructions="Amount of gold won to initiate a chain attack. Specify 0 to always chain attack.";
	var FMRankInstructions="The lowest relative rank below yours that you are willing to spend your stamina on. Leave blank to attack any rank."
	var FMARBaseInstructions="This value sets the base for your army ratio calculation. It is basically a multiplier for the army size of a player at your equal level. A value of 1 means you will battle an opponent the same level as you with an army the same size as you or less. Default .5"
	var dontbattleInstructions="Remember an opponents id after a loss and don't battle him again"
	var plusonekillsInstructions="Force +1 kill scenario if 80% or more of targets are withn freshmeat settings. Note: Since Castle Age choses the target, selecting this option could result in a greater chance of loss."
	var raidOrderInstructions="List of search words that decide which raids to participate in first.  Use words in player name or in raid name. To specify max damage follow keyword with :max token and specifiy max damage values. Use 'k' and 'm' suffixes for thousand and million.";
	htmlCode += this.ToggleControl('Battling','BATTLE');
		var battleList = ['Stamina Available','At Max Stamina','At X Stamina','No Monster','Not Hiding','Never'];
		var battleInst = ['Stamina Available will battle whenever you have enough stamina','At Max Stamina will battle when stamina is at max and will burn down all stamina when able to level up','At X Stamina you can set maximum and minimum stamina to battle','No Monster will battle only when there are no active monster battles','Not Hiding uses stamina to try to keep you under 10 health so you cannot be attacked, but making sure no stamina is wasted','Never - disables player battles'];
		var typeList = ['Invade','Duel']
		var typeInst = ['Battle using Invade button','Battle using Duel button - no guarentee you will win though']
		var targetList = ['Freshmeat','Userid List','Raid']
		var targetInst = ['Use settings to select a target from the Battle Page','Select target from the supplied list of userids','Raid Battles']
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
		htmlCode += '<tr><td>Battle When:&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('WhenBattle',battleList,battleInst,"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr></table>';
		htmlCode += "<div id='caap_WhenBattleXStamina' style='display: " + (gm.getValue('WhenBattle',false)!='At X Stamina'?'none':'block') +"'>";
				htmlCode += '<tr><td>Start Battles with</td><td>' + this.MakeNumberForm('XBattleStamina',XBattleInstructions,1,"size='1'  style='font-size: 10px'") +  ' Stamina</td></tr><br/>';
				htmlCode += '<tr><td>Keep</td><td>' + this.MakeNumberForm('XMinBattleStamina',XMinBattleInstructions,0,"size='1'  style='font-size: 10px'") +  ' Stamina Points</td></tr>';
		htmlCode += "</div>";
		htmlCode += "<div id='caap_WhenBattleHide' style='display: " + (gm.getValue('WhenBattle',false)!='Never'?'block':'none') +"'>"
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Battle Type:</td><td>' + this.MakeDropDown('BattleType',typeList,typeInst,"style='font-size: 10px min-width: 60px; max-width: 60px; width : 60px;'") + '</td></tr>';
			htmlCode += '<tr><td>Chain:Battle Points Won</td><td>' + this.MakeNumberForm('ChainBP',chainBPInstructions,'',"size='8' style='font-size: 10px; text-align: right' ") + '</td></tr>';
			htmlCode += '<tr><td>Chain:Gold Won</td><td>' + this.MakeNumberForm('ChainGold',chainGoldInstructions,'',"size='8' style='font-size: 10px; text-align: right' ") + '</td></tr></table>';
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Target Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('TargetType',targetList,targetInst,"style='font-size: 105px min-width: 105px; max-width: 105px; width : 105px;'") + '</td></tr></table>';
			htmlCode += "<div id='caap_FreshmeatSub' style='display: " + (gm.getValue('TargetType',false) != 'Userid List'?'block':'none') +"'>"
				htmlCode += "<div id='caap_RaidSub' style='display: " + (gm.getValue('TargetType',false) == 'Raid'?'block':'none') +"'>"
					htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
					htmlCode += '<tr><td>Attempt +1 Kills</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + this.MakeCheckBox('PlusOneKills',false,'',plusonekillsInstructions) +  '</td></tr></table>';
					htmlCode += "Join Raids in this order: <a href='http://userscripts.org/topics/43757' target='_blank'><font color='red'>?</font></a><br />";
					htmlCode += this.MakeTextBox('RaidOrder',raidOrderInstructions," rows='3'");
				htmlCode += "</div>";
				htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
				htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Min Relative Rank&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeNumberForm('FreshMeatMinRank',FMRankInstructions,'',"size='2'  style='font-size: 10px; text-align: right'") + '</td></tr>';
				htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Army Ratio Base&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeNumberForm('FreshMeatARBase',FMARBaseInstructions,"0.5","size='2'  style='font-size: 10px; text-align: right'") + '</td></tr></table>';
			htmlCode += "</div>";
			htmlCode += "<div align=right id='caap_UserIdsSub' style='display: " + (gm.getValue('TargetType',false) == 'Userid List'?'block':'none') +"'>"
				htmlCode += this.MakeTextBox('BattleTargets',userIdInstructions," rows='2'") + '<br />';
			htmlCode += "</div>";
		htmlCode += "</div>";
	htmlCode += "<hr/> </div>";

	var XMonsterInstructions="Start attacking if stamina is above this points";
	var XMinMonsterInstructions="Don't attack if stamina is below this points";
	var attackOrderInstructions="List of search words that decide which monster to attack first.  Use words in player name or in monster name. To specify max damage follow keyword with :max token and specifiy max damage values. Use 'k' and 'm' suffixes for thousand and million. To override achievement use the ach: token and specify damage values.";
	var fortifyInstructions="Fortify if ship health is below this % (leave blank to disable)";
	var questFortifyInstructions="Do Quests if ship health is above this % and quest mode is set to Not Fortify (leave blank to disable)";
	var stopAttackInstructions="Don't attack if ship health is below this % (leave blank to disable)";
	var monsterachieveInstructions="Check if monsters have reached achievement damage level first. Switch when achievement met.";
	var demiPointsFirstInstructions="Don't attack monsters until you've gotten all your demi points from battling."
	var powerattackInstructions="Use power attacks. Only do normal attacks if power attack not possible";
	htmlCode += this.ToggleControl('Monster','MONSTER');
		var mbattleList = ['Stamina Available','At Max Stamina','At X Stamina','Not Hiding','Never'];
		var mbattleInst = ['Stamina Available will attack whenever you have enough stamina','At Max Stamina will attack when stamina is at max and will burn down all stamina when able to level up','At X Stamina you can set maximum and minimum stamina to battle','Not Hiding uses stamina to try to keep you under 10 health so you cannot be attacked, but making sure no stamina is wasted','Never - disables attacking monsters'];
		htmlCode += '<table width=189 cellpadding=0 cellspacing=0>'
		htmlCode += '<tr><td>Attack When:</td><td>' + this.MakeDropDown('WhenMonster',mbattleList,mbattleInst,"style='font-size: 10px min-width: 105px; max-width: 105px; width : 105px;'") + '</td></tr></table>';
		htmlCode += "<div id='caap_WhenMonsterXStamina' style='display: " + (gm.getValue('WhenMonster',false)!='At X Stamina'?'none':'block') +"'>";
			htmlCode += '<tr><td>Start Battles with</td><td>' + this.MakeNumberForm('XMonsterStamina',XMonsterInstructions,1,"size='1'  style='font-size: 10px'") +  ' Stamina</td></tr><br/>';
			htmlCode += '<tr><td>Keep </td><td>' + this.MakeNumberForm('XMinMonsterStamina',XMinMonsterInstructions,0,"size='1'  style='font-size: 10px'") +  ' Stamina Points</td></tr>';
		htmlCode += "</div>";
		htmlCode += "<div id='caap_WhenMonsterHide' style='display: " + (gm.getValue('WhenMonster',false)!='Never'?'block':'none') +"'>"
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += "<tr><td>Monster delay secs</td><td>" + this.MakeNumberForm('seedTime','Max random delay to battle monsters',300,"type='text'  size='4' style='font-size: 10px'") + "</td></tr>";
			htmlCode += '<tr><td>Power Attack Only</td><td> ' + this.MakeCheckBox('PowerAttack',true,'',powerattackInstructions) +  '</td></tr>';
			htmlCode += '<tr><td>Achievement Mode</td><td> ' + this.MakeCheckBox('AchievementMode',true,'',monsterachieveInstructions) +  '</td></tr>';
			htmlCode += '<tr><td>Get Demi Points First</td><td> ' + this.MakeCheckBox('DemiPointsFirst',false,'DemiList',demiPointsFirstInstructions,true)+  '</td></tr>';
			var demiPoint =['Ambrosia','Malekus','Corvintheus','Aurora','Azeron'];
			var demiPtList = ['<img src="'+symbol_tiny_1+'" height="15" width="14"/>','<img src="'+symbol_tiny_2+'" height="15" width="14"/>','<img src="'+symbol_tiny_3+'" height="15" width="14"/>','<img src="'+symbol_tiny_4+'" height="15" width="14"/>','<img src="'+symbol_tiny_5+'" height="15" width="14"/>'];
				for (var demiPtItem in demiPtList) {
					htmlCode += demiPtList[demiPtItem] + this.MakeCheckBox('DemiPoint'+demiPtItem,true,'',demiPoint[demiPtItem]);
				}
			htmlCode += "</div>";
			htmlCode += '</table><table width=180 cellpadding=0 cellspacing=0>'
			htmlCode += '<tr><td>Fortify If Under</td><td>' + this.MakeNumberForm('MaxToFortify',fortifyInstructions,50,"size='1'  style='font-size: 10px'") + '%</td></tr>';
			htmlCode += '<tr><td>   Quest If Over</td><td>' + this.MakeNumberForm('MaxHealthtoQuest',questFortifyInstructions,60,"size='1'  style='font-size: 10px'") + '%</td></tr>';
			htmlCode += '<tr><td>No Attack Under</td><td>' + this.MakeNumberForm('MinFortToAttack',stopAttackInstructions,10,"size='1'  style='font-size: 10px'") + '%</td></tr></table>';
			htmlCode += "Attack Monsters in this order: <a href='http://userscripts.org/topics/43757' target='_blank'><font color='red'>?</font></a><br />";
			htmlCode += this.MakeTextBox('AttackOrder',attackOrderInstructions," rows='3'");
		htmlCode += "</div>";
	htmlCode += "<hr/> </div>";
	
	//Monster finder controls
	var monsterFinderInstructions="When monsters are over max damage, use Monster Finder?";
	var monsterFinderStamInstructions="Don't find new monster if stamina under this amount";
	var monsterFinderOrderInstructions="List of search words that decide which monster to attack first.  Can be names or monster types.";

	htmlCode += this.ToggleControl('MonsterFinder','MONSTER_FINDER');
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>Use Monster Finder?</td><td> ' + this.MakeCheckBox('MonsterFinderUse',true,'',monsterFinderInstructions) +  '</td></tr><br />';
			htmlCode += '<tr><td>Monster Find Min Stam</td><td>' + this.MakeNumberForm('MonsterFinderMinStam',monsterFinderStamInstructions,50,"size='1'  style='font-size: 10px'") + '</td></tr><br />';
			htmlCode += "Find Monster Priority: <a href='http://senses.ws/caap/index.php?topic=66.0' target='_blank'><font color='red'>?</font></a><br />";
			htmlCode += this.MakeTextBox('MonsterFinderOrder',monsterFinderOrderInstructions," rows='3'") + '<br />';
		htmlCode += "</div>";
	htmlCode += "</table><hr/> </div>";


	// Add General Comboboxes
	generalList = ['Get General List','Use Current','Under Level 4'].concat(gm.getList('AllGenerals'));

	var crossList = function(checkItem) { return (generalList.indexOf(checkItem)>=0); }
	var generalIncomeList= ['Get General List','Mercedes','Cid','Use Current'].filter(crossList);
	var generalBankingList= ['Get General List','Aeris','Use Current'].filter(crossList);
	var reverseGenInstructions="This will make the script level Generals under level 4 from Top-down instead of Bottom-up";

	htmlCode += this.ToggleControl('Generals','GENERALS');
		var dropDownList = ['Idle','Monster','Fortify','Battle','SubQuest','Buy'];
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>'
		for (var dropDownItem in dropDownList) {
			htmlCode += '<tr><td>' + dropDownList[dropDownItem] + '</td><td>' + this.MakeDropDown(dropDownList[dropDownItem] + 'General',generalList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
		}
		//<input type='button' id='caap_resetGeneralList' value='Do Now' style='font-size: 10px; width:50; height:50'>" + '</td></tr>'
		htmlCode += '<tr><td>Income</td><td>' + this.MakeDropDown('IncomeGeneral',generalIncomeList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
		htmlCode += '<tr><td>Banking</td><td>' + this.MakeDropDown('BankingGeneral',generalBankingList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
		htmlCode += '<tr><td colspan="2">' + this.MakeCheckBox('ReverseLevelUpGenerals',false,'',reverseGenInstructions) + '  Reverse Under Level 4 Order</td></tr></table>';
	htmlCode += "<hr/> </div>";

	var statusInstructions="Automatically increase attributes when upgrade skill points are available."
	var statusAdvInstructions="USE WITH CAUTION: You can use numbers or formulas(ie. level * 2 + 10). Variable keywords include energy, health, stamina, attack, defense, and level. JS functions can be used (Math.min, Math.max, etc) !!!Remember your math class: 'level + 20' not equals 'level * 2 + 10'!!!";
	var statImmedInstructions="Update Stats Immediately";
	attrList = ['','energy','attack','defense','stamina','health'];
	htmlCode += this.ToggleControl('Status','UPGRADE SKILL POINTS');
		htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Auto Add Upgrade Points</td><td> ' + this.MakeCheckBox('AutoStat',false,'',statusInstructions) +  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>";
                htmlCode += '<tr><td>Upgrade Immediately</td><td> ' + this.MakeCheckBox('StatImmed',false,'',statImmedInstructions) +  "</td></tr>";
		htmlCode += '<tr><td>Advanced Settings</td><td> ' + this.MakeCheckBox('AutoStatAdv',false,'',statusAdvInstructions) +  " <a href='http://userscripts.org/posts/207279' target='_blank'><font color='red'>?</font></a></td></tr></table>";
		htmlCode += "<div id='caap_Status_Normal' style='display: " + (gm.getValue('AutoStatAdv',false)?'none':'block') +"'>"
			htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
			htmlCode += "<tr><td>Increase" + this.MakeDropDown('Attribute1',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue1',statusInstructions,0,"type='text' size='2' style='font-size: 10px '") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute2',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue2',statusInstructions,0,"type='text' size='2' style='font-size: 10px'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute3',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue3',statusInstructions,0,"type='text' size='2' style='font-size: 10px'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute4',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue4',statusInstructions,0,"type='text' size='2' style='font-size: 10px'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute5',attrList) + " to </td><td>" + this.MakeNumberForm('AttrValue5',statusInstructions,0,"type='text' size='2' style='font-size: 10px'") + " </td></tr></table>";
		htmlCode += "</div>";
		htmlCode += "<div id='caap_Status_Adv' style='display: " + (gm.getValue('AutoStatAdv',false)?'block':'none') +"'>"
			htmlCode += '<table width=170 cellpadding=0 cellspacing=0>';
			htmlCode += "<tr><td>Increase" + this.MakeDropDown('Attribute1',attrList) + " using </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue1',statusInstructions,0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute2',attrList) + " using </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue2',statusInstructions,0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute3',attrList) + " using </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue3',statusInstructions,0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute4',attrList) + " using </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue4',statusInstructions,0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then" + this.MakeDropDown('Attribute5',attrList) + " using </td></tr></table>";
			htmlCode += "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.MakeNumberForm('AttrValue5',statusInstructions,0,"type='text' size='7' style='font-size: 10px; min-width: 110px; max-width: 110px; width : 110px;'") + " </td></tr>";
		htmlCode += "</div>";
	htmlCode += "<hr/> </div>";

	var giftInstructions="Automatically receive and send return gifts.";
	var titleInstructions="Set the title bar to the player name.";
	htmlCode += this.ToggleControl('Other','OTHER OPTIONS');

		var giftChoiceList = ['Same Gift As Received','Random Gift'];
		giftChoiceList = giftChoiceList.concat(gm.getList('GiftList'));
		giftChoiceList.push('Get Gift List');
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Set Title</td><td> ' + this.MakeCheckBox('SetTitle',false,'',titleInstructions) +  "</td></tr>";
		htmlCode += '<tr><td>Auto Elite Army</td><td> ' + this.MakeCheckBox('AutoElite',true,'AutoEliteControl','Enable or disable Auto Elite function',true) + " </td><td><input type='button' id='caap_resetElite' value='Do Now' style='font-size: 10px; width:50; height:50'>" + '</td></tr>';
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>'+this.MakeTextBox('EliteArmyList',"Try these UserIDs first. Use ',' between each UserID"," rows='2'") + '</td></tr></table>';
		htmlCode += '</div>';
		htmlCode += '<tr><td>Auto Return Gifts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td> ' + this.MakeCheckBox('AutoGift',false,'GiftControl',giftInstructions,true) + "</td></tr>";
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += '<tr><td>&nbsp;&nbsp;&nbsp;Give&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('GiftChoice',giftChoiceList) + '</td></tr></table>';
		htmlCode += '</div>';
		htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
		htmlCode += '<tr><td>Auto bless&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('AutoBless',['None','Energy','Attack','Defense','Stamina','Health']) + '</td></tr>';
		htmlCode += '<tr><td>Style&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + this.MakeDropDown('DisplayStyle',['CA Skin','Original','Custom','None']) + '</td></tr>';
		htmlCode += "</table><div id='caap_StyleSub' style='display: " + (gm.getValue('DisplayStyle',false) == 'Custom'?'block':'none') +"'>"
				htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
				htmlCode += '<tr><td><b>Started</b></td></tr>';
				htmlCode += '<tr><td>RGB Color</td><td>' + this.MakeNumberForm('StyleColorStarted','FFF or FFFFFF','',"type='text' size='5'  style='font-size: 10px; text-align: right'") + '</td></tr>';
				htmlCode += '<tr><td>Transparency</td><td>' + this.MakeNumberForm('StyleTransparencyStarted','0 ~ 1','',"type='text' size='5'  style='font-size: 10px; text-align: right'") + '</td></tr>';
				htmlCode += '<tr><td><b>Stoped</b></td></tr>';
				htmlCode += '<tr><td>RGB Color</td><td>' + this.MakeNumberForm('StyleColorStoped','FFF or FFFFFF','',"type='text' size='5'  style='font-size: 10px; text-align: right'") + '</td></tr>';
				htmlCode += '<tr><td>Transparency</td><td>' + this.MakeNumberForm('StyleTransparencyStoped','0 ~ 1','',"type='text' size='5'  style='font-size: 10px; text-align: right'") + '</td></tr>';
			htmlCode += "</table></div>";
			htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
			htmlCode += "<tr><td>Reset Dashboard</td><td></td><td>&nbsp;&nbsp;&nbsp;<input type='button' id='caap_refreshMonsters' value='Reset Now' style='font-size: 10px; width:50; height:50'>" + '</td></tr>';
			htmlCode += "<tr><td></td><td></td><td>&nbsp;&nbsp;&nbsp;<input type='button' id='FillArmy' value='Fill Army' style='font-size: 10px; width:50; height:50'>" + '</td></tr>';
		htmlCode += '</table></div>';
	htmlCode += "<hr/> </div>";
	htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
	htmlCode += "<tr><td><input type='checkbox' id='unlockMenu' /></td><td>Unlock Menu</td><td><input type='button' id='ResetMenuLocation' value='Reset' style='font-size: 10px; width:50; height:50'></td></tr></table>";
	htmlCode+= "Version: " + thisVersion + "  -  <a href='" + discussionURL + "' target='_blank'>Discussion Boards</a><br />"

	if (newVersionAvailable) {
		htmlCode += "<a href='http://userscripts.org/scripts/source/" +SUC_script_num+".user.js'>Install new autoplayer version: "+GM_getValue('SUC_remote_version') + "!</a>";
	}

	this.SetDivContent('control',htmlCode);

	this.AddListeners('caap_div');

	var SetTitleBox=document.getElementById('caap_SetTitle');
	var SetTitle=gm.getValue('SetTitle',false);
	SetTitleBox.checked=SetTitle?true:false;
	SetTitleBox.addEventListener('change',function(e) {
		if(gm.getValue('SetTitle')) {
			document.title=gm.getValue('PlayerName','CAAP')+" - "+documentTitle;
		}else document.title=documentTitle;
	},false);

	var unlockMenuBox=document.getElementById('unlockMenu');
	var unlockMenu=gm.getValue('unlockMenu',false);
	unlockMenuBox.checked=unlockMenu?true:false;
	unlockMenuBox.addEventListener('change',function(e) {
		div = document.getElementById("caap_div");
		if(unlockMenuBox.checked){
			div.style.cursor='move';
			div.addEventListener('mousedown', Move.dragHandler, false);
		}else{
			div.style.cursor ='';
			div.removeEventListener('mousedown', Move.dragHandler, false);
		}

	},false);

	var FillArmyButton=document.getElementById('FillArmy');
	FillArmyButton.addEventListener('click',function(e) {
			gm.setValue("FillArmy",true);
	},false);

	var resetMenuLocation=document.getElementById('ResetMenuLocation');
	resetMenuLocation.addEventListener('click',function(e) {
			div = document.getElementById("caap_div");
			div.style.cursor ='';
			div.style.position='';
			div.removeEventListener('mousedown', Move.dragHandler, false);
			div.style.top='100px';
			div.style.left='940px';
			document.getElementById('unlockMenu').checked = false;
	},false);

	var resetElite=document.getElementById('caap_resetElite');
	resetElite.addEventListener('click',function(e) {
		gm.setValue('AutoEliteGetList',0);
	},false);

	var refreshMonsters=document.getElementById('caap_refreshMonsters');
	refreshMonsters.addEventListener('click',function(e) {
		gm.setValue('monsterOl','');
		gm.setValue('monsterReview',0);
		gm.setValue('monsterReviewCounter',-2);
	},false);

	var caapRestart=document.getElementById('caapRestart');
	var caapPaused=document.getElementById('caapPaused');
	caapRestart.addEventListener('click',function(e) {
		caapPaused.style.display='none';
		document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundLight','#efe');
		document.getElementById("caap_div").style.background = div.style.opacity = gm.getValue('StyleOpacityLight','1');
		gm.setValue('caapPause','none');
		gm.setValue('ReleaseControl',true);
//		caap.ReloadOccasionally();
//		caap.WaitMainLoop();
	},false);


	controlDiv.addEventListener('mousedown',function(e) {
		document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundDark','#fee');
		document.getElementById("caap_div").style.opacity = div.style.transparency = gm.getValue('StyleOpacityDark','1');
//		nHtml.clearTimeouts();
		gm.setValue('caapPause','block');
		caapPaused.style.display='block';
	},false);

	if(gm.getObjVal('AutoQuest','name')) {
		var stopA=document.getElementById('stopAutoQuest');
		stopA.addEventListener('click',function() {
			gm.setValue('AutoQuest','');
			gm.setValue('WhyQuest','Manual');
			gm.log('Change: setting stopAutoQuest and go to Manual');
			caap.SetControls(true);
		},false);
	}

	if (gm.getValue('WhenBattle') == 'Not Hiding' && gm.getValue('WhenMonster') != 'Not Hiding') {
		gm.setValue('WhenMonster','Not Hiding');
		this.SetControls(true);
	}

	if (!(globalContainer = document.querySelector('#app46755028429_globalContainer'))) return;
	globalContainer.addEventListener('DOMNodeInserted', function(event) {
/*		if(event.target.querySelector("#app46755028429_app_body")) {
		nHtml.setTimeout(caap.checkMonsterDamage, 0);
		}
*/		if(document.querySelector('#app46755028429_st_2_5')) {
			nHtml.setTimeout(caap.addExpDisplay, 0);
		}

//		nHtml.setTimeout(testfunc, 0);
	}, true);

	globalContainer.addEventListener('click', function(event) {
		var obj = event.target;
		while(obj && !obj.href) obj = obj.parentNode;
		if(obj && obj.href) caap.clickUrl = obj.href;
//		gm.log('global container ' + caap.clickUrl);
	}, true);

},
/////////////////////////////////////////////////////////////////////

//						MONSTERS DASHBOARD

// Display the current monsters and stats

/////////////////////////////////////////////////////////////////////
makeCommaValue:function(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
},
makeTd:function(text,color) {
	if (gm.getListObjVal('monsterOl',color,'color')) color = gm.getListObjVal('monsterOl',color,'color');
	if (!color) color = 'black';
	return "<td><font size=1 color='" + color+"'>"+text+"</font></td>";
},
engageDashboard:function(force) {
	if ($("#caap_info") && !force && !this.WhileSinceDidIt('engageDashboardTimer',60)) return;
	this.JustDidIt('engageDashboardTimer');
	// if not on an individual monster page, delete any monsters without the page info from Engage
	if (!caap.CheckForImage('dragon_title_owner.jpg')) {
		gm.getList('monsterOl').forEach(function(monsterObj) {
			if (monsterObj.indexOf(vs+'page'+ls)<0)
				gm.deleteListObj('monsterOl',monsterObj.split(vs)[0]);
		});
	}
	caap.selectMonster();
	var layout = "<div id='caap_top' style='position:absolute;top:" + (document.querySelector('#app46755028429_main_bn_container').offsetTop-11)
		+ "px;left:0px;'>";
	layout += "<div style='font-size: 9px'<a href='http://www.facebook.com/home.php?filter=app_46755028429'><b>LIVE FEED!</b> Your friends are calling.</a></div>"
	layout += "<div id='caap_info' style='width:610px;height:175px;overflow:auto;'></div>";
	layout += "</div>";
	if (!$("#caap_top").length) {
	   $(layout).css({
			background : gm.getValue("StyleBackgroundLight","white"),
//			background : "white",
//			background : "url('http://image2.castleagegame.com/1357/graphics/bg_jobs_tile.jpg')",
			padding : "5px",
			width: " 610px",
			margin : "0 auto",
			opacity : "1"
		}).insertBefore("#app46755028429_globalContainer");
	}

	var html = "<table width=570 cellpadding=0 cellspacing=0 ><tr>";
	displayItems=['Name','Damage','Damage%','Fort%','TimeLeft','T2K','Phase','Link'];
	for (var p in displayItems) html += "<td><b><font size=1>"+displayItems[p]+'</font></b></td>';
	html += '</tr>';
	displayItems.shift();
	monsterList=gm.getList('monsterOl');
	for (var n in monsterList) {
		monster = monsterList[n].split(vs)[0];
		html += "<tr>";
		html += caap.makeTd(monster,monster);
		for (var p in displayItems) {
//			gm.log(' displayItems[p] '+ displayItems[p] + ' value '+ gm.getListObjVal('monsterOl',monsterList[n],displayItems[p]));
			color = gm.getListObjVal('monsterOl',monster,'color');
			if (displayItems[p] == 'Phase' && (color == 'grey'))
				html += caap.makeTd(gm.getListObjVal('monsterOl',monster,'status'),monster);
			else if ((value = gm.getListObjVal('monsterOl',monster,displayItems[p]))) {
				if (parseInt(value).toString() == value)
					value = caap.makeCommaValue(value);
				html += caap.makeTd(value+(displayItems[p].match(/%/) ? '%':''),monster);
			} else
				html += '<td></td>';
		}
		html += '</tr>';
	}
	html += '</table></div>';
       $("#caap_info").html(html);
	//	$(#caap_monsterdash).remove();
//    $(html).css({ background : "white", padding : "5px", width: "590px", margin : "0 auto" }).insertAfter("#app46755028429_nvbar_div_end");
},

shortenURL:function(long_url, callback) {
// Called too frequently, the delay can cause the screen to flicker, so disabled by returning for now:
callback(long_url);
return;

    GM_xmlhttpRequest({
        method : 'GET',
        url    : 'http://api.bit.ly/shorten?version=2.0.1&longUrl=' + encodeURIComponent(long_url) + '&login=castleage&apiKey=R_438eea4a725a25d92661bce54b17bee1&format=json&history=1',
        onload : function(response) {
            var result = eval("("+response.responseText+")");
            callback(result.results ? result.results[long_url].shortUrl : long_url);
        }
    });
},

addExpDisplay:function() {
    if (/\(/.test($("#app46755028429_st_2_5 strong").text())) return false;
    var arrExp = $("#app46755028429_st_2_5 strong").text().split("/");
    $("#app46755028429_st_2_5 strong").append(" (<span style='color:red'>"+(arrExp[1] - arrExp[0])+"</span>)");
},

/////////////////////////////////////////////////////////////////////

//							EVENT LISTENERS

// Watch for changes and update the controls

/////////////////////////////////////////////////////////////////////

SetDisplay:function(idName,setting){
	if (!(div = document.getElementById('caap_' + idName))) {
		gm.log('Unable to find div: ' + idName);
		return;
	}
	if (setting == true) {
		div.style.display = 'block';
	} else {
		div.style.display = 'none';
	}
},


AddListeners:function(topDivName) {
	if(!(div = document.getElementById(topDivName))) return false;
	var ss=document.evaluate("//input[contains(@id,'caap_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(ss.snapshotLength<=0) gm.log('no inputs');
	for(var s=0; s<ss.snapshotLength; s++) {
		var inputDiv=ss.snapshotItem(s);
		if (inputDiv.type=='checkbox') {
			inputDiv.addEventListener('change',function(e) {
				var idName = e.target.id.replace(/caap_/i,'')
				var value = e.target.value;
				gm.setValue(idName,e.target.checked);
				if (e.target.className) caap.SetDisplay(e.target.className,e.target.checked);
				else if (idName == 'AutoStatAdv') {
					if (value) {
						caap.SetDisplay('Status_Normal',false);
						caap.SetDisplay('Status_Adv',true);
						for (var n=1; n<=5; n++) {
							gm.setValue('AttrValue' + n,'')
						}
					} else {
						caap.SetDisplay('Status_Normal',true);
						caap.SetDisplay('Status_Adv',false);
					}
					caap.SetControls(true);
				}
			},false);

		} else if (inputDiv.type=='text') {
			var idName = inputDiv.id.replace(/caap_/i,'');
			inputDiv.value=gm.getValue(idName,'').toString();
			inputDiv.addEventListener('change',function(e) {
				var idName = e.target.id.replace(/caap_/i,'');
				if (/Style.*/.test(inputDiv.id)) {
					gm.setValue("StyleBackgroundLight","#"+gm.getValue("StyleColorStarted","FFF"));
					gm.setValue("StyleOpacityLight",gm.getValue("StyleTransparencyStarted","1"));
					gm.setValue("StyleBackgroundDark","#"+gm.getValue("StyleColorStoped","FFF"));
					gm.setValue("StyleOpacityDark",gm.getValue("StyleTransparencyStoped","1"));
				}
				gm.setValue(idName,e.target.value);
			},false);
		}
	}

	var ss=document.evaluate("//select[contains(@id,'caap_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(ss.snapshotLength<=0) gm.log('no selects');
	for(var s=0; s<ss.snapshotLength; s++) {
		var inputDiv=ss.snapshotItem(s);
		inputDiv.addEventListener('change',function(e) {
			if (e.target.selectedIndex > 0) {
				var idName = e.target.id.replace(/caap_/i,'')
				var value = e.target.options[e.target.selectedIndex].value
				gm.log('Change: setting ' + idName + ' to ' + value);
				gm.setValue(idName,value);
				e.target.options[0].value = value;
				if (idName =='WhenQuest' || idName =='WhenBattle' || idName =='WhenMonster') {
					caap.SetDisplay(idName + 'Hide',(value!='Never'));
					caap.SetControls(true);
				} else if (idName == 'QuestArea' || idName == 'QuestSubArea' || idName =='WhyQuest') {
					gm.setValue('AutoQuest','');
					caap.SetControls(true);
				} else if (idName == 'IdleGeneral') {
					gm.setValue('MaxIdleEnergy', 0);
					gm.setValue('MaxIdleStamina', 0);
					caap.SetControls(true);
				} else if (idName == 'TargetType') {
					switch (value) {
						case "Freshmeat" :
							caap.SetDisplay('FreshmeatSub',true);
							caap.SetDisplay('UserIdsSub',false);
							caap.SetControls(true);
							break;
						case "Userid List" :
							caap.SetDisplay('FreshmeatSub',false);
							caap.SetDisplay('UserIdsSub',true);
							caap.SetControls(true);
							break;
						default :
							caap.SetDisplay('FreshmeatSub',true);
							caap.SetDisplay('UserIdsSub',false);
							caap.SetControls(true);
					}
				} else if (/Attribute./.test(idName)) {
					gm.setValue("SkillPointsNeed",1)
				} else if (idName == 'DisplayStyle') {
					switch (value) {
						case "CA Skin" :
							gm.setValue("StyleBackgroundLight","#E0C691");
							gm.setValue("StyleBackgroundDark","#B09060");
							gm.setValue("StyleOpacityLight","1");
							gm.setValue("StyleOpacityDark","1");
							if (nHtml.FindByAttr(document.body,'div','id','caap_top')) {
								nHtml.FindByAttr(document.body,'div','id','caap_top').style.backgroundColor= gm.getValue("StyleBackgroundLight","white");
							}
							caap.SetControls(true);
							break;
						case "None" :
							gm.setValue("StyleBackgroundLight","white");
							gm.setValue("StyleBackgroundDark","");
							gm.setValue("StyleOpacityLight","1");
							gm.setValue("StyleOpacityDark","1");
							if (nHtml.FindByAttr(document.body,'div','id','caap_top')) {
								nHtml.FindByAttr(document.body,'div','id','caap_top').style.backgroundColor = gm.getValue("StyleBackgroundLight","white");
							}
							caap.SetControls(true);
							break;
						case "Custom" :
							gm.setValue("StyleBackgroundLight","#"+gm.getValue("StyleColorStarted","FFF"));
							gm.setValue("StyleOpacityLight",gm.getValue("StyleTransparencyStarted","1"));
							gm.setValue("StyleBackgroundDark","#"+gm.getValue("StyleColorStoped","FFF"));
							gm.setValue("StyleOpacityDark",gm.getValue("StyleTransparencyStoped","1"));
							if (nHtml.FindByAttr(document.body,'div','id','caap_top')) {
								nHtml.FindByAttr(document.body,'div','id','caap_top').style.backgroundColor = gm.getValue("StyleBackgroundLight","white");
							}
							caap.SetControls(true);
							break;
						default :
							gm.setValue("StyleBackgroundLight","#efe");
							gm.setValue("StyleBackgroundDark","#fee");
							gm.setValue("StyleOpacityLight","1");
							gm.setValue("StyleOpacityDark","1");
							if (nHtml.FindByAttr(document.body,'div','id','caap_top')) {
								nHtml.FindByAttr(document.body,'div','id','caap_top').style.backgroundColor = gm.getValue("StyleBackgroundLight","white");
							}
							caap.SetControls(true);
					}
				}
			}
		},false);
	}

	var ss=document.evaluate("//textarea[contains(@id,'caap_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
//	if(ss.snapshotLength<=0) gm.log('no textareas');
	for(var s=0; s<ss.snapshotLength; s++) {
		var inputDiv=ss.snapshotItem(s);
		inputDiv.addEventListener('change',function(e) {
			var idName = e.target.id.replace(/caap_/i,'');
			gm.log('Change: setting ' + idName + ' to something new');
			if (idName == 'AttackOrder' || idName == 'RaidOrder') {
				caap.engageDashboard(true);
				//gm.setValue('monsterReview',0);
				//gm.setValue('monsterReviewCounter',-2);
			}
			caap.SaveBoxText(idName);
		},false);
	}

	var ss=document.evaluate("//a[contains(@id,'caap_Switch_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var s=0; s<ss.snapshotLength; s++) {
		var switchDiv=ss.snapshotItem(s);
		switchDiv.addEventListener('click',function(e) {
			var subId = e.target.id.replace(/_Switch/i,'');
			var subDiv = document.getElementById(subId);
			if(subDiv.style.display == "block") {
				subDiv.style.display = "none";
				e.target.innerHTML = e.target.innerHTML.replace(/-/,'+');
				gm.setValue('Control_' + subId.replace(/caap_/i,''),"none")
			}
			else {
				subDiv.style.display = "block";
				e.target.innerHTML = e.target.innerHTML.replace(/\+/,'-');
				gm.setValue('Control_'+ subId.replace(/caap_/i,''),"block")
			}
		},false);
	}
},

/////////////////////////////////////////////////////////////////////

//							GET STATS

// Functions that records all of base game stats, energy, stamina, etc.

/////////////////////////////////////////////////////////////////////

GetStatusNumbers:function(node) {
	var txt=nHtml.GetText(node);
	var staminam=this.statusRe.exec(txt);
	if(staminam) {
		return {'num':parseInt(staminam[1]),'max':parseInt(staminam[2])};
	} else {
		gm.log('Cannot find status:'+txt);
	}
	return null;
},

GetStats:function() {
	this.stats={};

	if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
		// Facebook ID
		var webSlice=nHtml.FindByAttrContains(document.body,"a","href","party.php");
		if (webSlice) {
			var m=this.userRe.exec(webSlice.getAttribute('href'));
			if(m) {
				var txt=m[2];
				gm.setValue('FBID',txt);
			}
		}
	}

	// rank
	var attrDiv =nHtml.FindByAttrContains(document.body,"div","class",'keep_stat_title');
	if (attrDiv) {
		var txt = nHtml.GetText(attrDiv);
		var levelm=this.rankRe.exec(txt);
		if (levelm) {
			var rank = this.rankTable[levelm[1].toString().toLowerCase().trim()];
			if (rank != undefined) {
				this.stats['rank']=rank;
				gm.setValue('MyRank',this.stats.rank);
				this.JustDidIt('MyRankLast');
			} else {
				gm.log("Unknown rank " + rank + ':' + levelm[1].toString());
			}
		}
		var userName = txt.match(/"(.+)"/);
		gm.setValue('PlayerName',userName[1]);
	}

	// health
	var health=nHtml.FindByAttrContains(document.body,"span","id",'_current_health');
	var healthMess='';
	if(!health) {
		health=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_health') and not(contains(@id,'health_time'))");
	}
	if(health!=null) {
		this.stats['health']=this.GetStatusNumbers(health.parentNode);
		if(this.stats.health) {
			healthMess="Health: "+this.stats.health.num;
		}
	} else {
		gm.log('Could not find health');
		this.needReload = true;
	}

	// stamina
	this.stats.stamina = null;
	var stamina=nHtml.FindByAttrContains(document.body,"span","id",'_current_stamina');
	var staminaMess='';
	if(!stamina) {
		stamina=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_stamina') and not(contains(@id,'stamina_time'))");
	}
	if(stamina!=null) {
		this.stats['stamina']=this.GetStatusNumbers(stamina.parentNode);
		if(this.stats.stamina) {
			staminaMess="Stamina: "+this.stats.stamina.num;
			if ((gm.getValue('IdleGeneral','').indexOf(this.GetCurrentGeneral()) >= 0) || (gm.getValue('IdleGeneral','').match(/use current/i))) {
				gm.setValue('MaxIdleStamina', this.stats.stamina.max);
			}
		}
	} else {
		gm.log('Could not find stamina');
		return false;
	}

	// energy
	var energyMess='';
	var energy=nHtml.FindByAttrContains(document.body,"span","id",'_current_energy');
	if(!energy) {
		energy=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_energy') and not(contains(@id,'energy_time'))");
	}
	if(energy!=null) {
		this.stats['energy']=this.GetStatusNumbers(energy.parentNode);
		if(this.stats.energy!=null) {
			energyMess="Energy: "+this.stats.energy.num;
			//if current general == idle general
			if ((gm.getValue('IdleGeneral','').indexOf(this.GetCurrentGeneral()) >= 0) || (gm.getValue('IdleGeneral','').match(/use current/i))) {
				gm.setValue('MaxIdleEnergy', this.stats.energy.max);
			}
		}
	} else {
		gm.log('Could not find energy');
		return false;
	}

	// level
	var level=nHtml.FindByAttrContains(document.body,"div","title",'experience points');
	var levelMess;
	if(level!=null) {
		var txt=nHtml.GetText(level);
		var levelm=this.levelRe.exec(txt);
		if (levelm) {
			this.stats['level']=parseInt(levelm[1]);
			levelMess = "Level: " + this.stats.level;
			if(gm.getValue('Level',0) != this.stats.level) gm.deleteValue('BestPropCost');
			gm.setValue('Level',this.stats.level);
		} else {
			gm.log('Could not find level re');
		}
	} else {
		gm.log('Could not find level obj');
	}

	this.stats['rank']=parseInt(gm.getValue('MyRank'));

	// army
	var td=nHtml.FindByAttrContains(document.body,"div","id","main_bntp");
	if (td) {
		var a=nHtml.FindByAttrContains(td,"a","href","army");
		var txt = nHtml.GetText(a);
		var m=this.armyRe.exec(txt);
		if (m) {
			var army = parseInt(m[1]);
                        army=Math.min(army, 501);
			this.stats['army']=army;
			var armyMess = "Army: " + this.stats.army;
		} else {
			gm.log("Can't find armyRe in " + txt);
		}
	} else {
		gm.log("Can't find main_bntp stats");
	}

	// gold
	cashObj=nHtml.FindByAttrXPath(document.body,"strong","contains(string(),'$')");
	if(cashObj) {
		var cashTxt=nHtml.GetText(cashObj);
		var cash=this.NumberOnly(cashTxt);
		this.stats.cash=cash;
	} else {
		gm.log('Could not find cash');
	}

	// experience
	var levelMess='';
	var exp=nHtml.FindByAttrContains(document.body,'div','id','st_2_5');
	if(exp) {
		this.stats.exp = this.GetStatusNumbers(exp);
	} else gm.log('Unable to find exp div');

	// time to next level
	if (this.stats.exp) {
		var expPerStamina = 2;
		var expPerEnergy = parseFloat(gm.getObjVal('AutoQuest','expRatio'));
		var minutesToLevel = (this.stats.exp.max - this.stats.exp.num - this.stats.stamina.num * expPerStamina - this.stats.energy.num * expPerEnergy) / ( expPerStamina + expPerEnergy ) / 12 * 60;
		this.stats.levelTime = new Date();
		var minutes = this.stats.levelTime.getMinutes();
		minutes += minutesToLevel;
		this.stats.levelTime.setMinutes(minutes);

		this.SetDivContent('level_mess','Expected next level: ' + this.FormatTime(this.stats.levelTime));
	}

	if (this.DisplayTimer('DemiPointTimer')) {
		if (this.CheckTimer('DemiPointTimer'))
			this.SetDivContent('demipoint_mess','Battle demipoints cleared');
		else
			this.SetDivContent('demipoint_mess','Next Battle DemiPts: ' + this.DisplayTimer('DemiPointTimer'));
	}

	if (this.DisplayTimer('BlessingTimer')) {
		if (this.CheckTimer('BlessingTimer'))
			this.SetDivContent('demibless_mess','Demi Blessing = none');
		else
			this.SetDivContent('demibless_mess','Next Demi Blessing: ' + this.DisplayTimer('BlessingTimer'));
	}

	// time to next paycheck
	if ((paytime = nHtml.FindByAttrContains(document.body,"span","id",'_gold_time_value'))) {
		this.stats.paytime = nHtml.GetText(paytime).trim();
		this.stats.payminute = this.stats.paytime.substr(0,this.stats.paytime.indexOf(':'));
	}
	// return true if probably working
	return cashObj && (health!=null);
},

/////////////////////////////////////////////////////////////////////

//							CHECK RESULTS

// Called each iteration of main loop, this does passive checks for

// results to update other functions.

/////////////////////////////////////////////////////////////////////
SetCheckResultsFunction:function(resultsFunction) {
	this.JustDidIt('SetResultsFunctionTimer');
	gm.setValue('ResultsFunction',resultsFunction);
},
pageSpecificCheckFunctions:{'battle_monster':'checkMonsterEngage','raid':'checkMonsterEngage'},
CheckResults:function() {
	// Check for new gifts
	if (!gm.getValue('HaveGift')) {
		if (nHtml.FindByAttrContains(document.body,'a','href','reqs.php#confirm_')) {
			gm.log('We have a gift waiting!');
			gm.setValue('HaveGift',true);
		} else if (beepDiv = nHtml.FindByAttrContains(document.body,'div','class','UIBeep_Title')) {
			beepText = nHtml.GetText(beepDiv).trim();
			if (beepText.match(/sent you a gift/) && !beepText.match(/notification/)) {
				gm.log('We have a gift waiting');
				gm.setValue('HaveGift',true);
			}
		}
	}

	if (this.stats.level < 10) this.battlePage = 'battle_train,battle_off';
	else this.battlePage = 'battle';


	// Check for Gold Stored
	if (nHtml.FindByAttrContains(document.body,"div","class",'keep_main_section')) {
		var goldStored = nHtml.FindByAttrContains(document.body,"b","class",'money').firstChild.data.replace(/[^0-9]/g,'')
		gm.setValue('inStore',goldStored);
	}
	if (resultsDiv = nHtml.FindByAttrContains(document.body,'span','class','result_body'))
		resultsText = nHtml.GetText(resultsDiv).trim();
	else resultsText = '';

	this.checkMonsterEngage();

	// If set and still recent, go to the function specified in 'ResultsFunction'
	resultsFunction = gm.getValue('ResultsFunction','');
	if ((resultsFunction) && !caap.WhileSinceDidIt('SetResultsFunctionTimer',20)) caap[resultsFunction](resultsText);

	// Below not working, so return
//	return;
	// Check page to see if we should go to a page specific check function
	// todo find a way to verify if a function exists, and replace the array with a check_functionName exists check
	if (!caap.clickURL) return;
	page = caap.clickUrl.match(/\/[^\/]+.php/i)[0].replace('/','').replace('.php','');
	gm.log('Clicked page is ' + page);
	if (this.pageSpecificCheckFunctions[page])
		this[this.pageSpecificCheckFunctions[page]]();
	caap.clickUrl = null;
},


/////////////////////////////////////////////////////////////////////

//							QUESTING

// Quest function does action, DrawQuest sets up the page and gathers info

/////////////////////////////////////////////////////////////////////

MaxEnergyQuest:function() {
	if (!gm.getValue('MaxIdleEnergy', 0)) {
		gm.log("Changing to idle general to get Max energy");
		return this.PassiveGeneral();
	}
	if (this.stats.energy.num >= gm.getValue('MaxIdleEnergy')) return this.Quests();
	return false;
},
baseQuestTable : { 'Land of Fire' :'land_fire', 'Land of Earth':'land_earth', 'Land of Mist':'land_mist', 'Land of Water':'land_water', 'Demon Realm' :'land_demon_realm', 'Undead Realm':'land_undead_realm','Underworld':'tab_underworld'},
demiQuestTable : { 'Ambrosia' : 'energy', 'Malekus':'attack', 'Corvintheus':'defense', 'Aurora':'health', 'Azeron':'stamina'},

Quests:function() {
	if(gm.getValue('storeRetrieve','') !== ''){
		if(gm.getValue('storeRetrieve') == 'general'){
			if (this.SelectGeneral('BuyGeneral')) return true;
			gm.setValue('storeRetrieve','');
			return true;
		}else return this.RetrieveFromBank(gm.getValue('storeRetrieve',''));
	}
	this.SetDivContent('quest_mess','');
	if(gm.getValue('WhenQuest','')=='Never') {
		this.SetDivContent('quest_mess','Questing off');
		return false;
	}
	if(gm.getValue('WhenQuest','') == 'Not Fortifying') {
		if(!(maxHealthtoQuest=this.GetNumber('MaxHealthtoQuest'))) {
			this.SetDivContent('quest_mess','<b>No valid over fortify %</b>');
			return false;
		}
		if ((fortMon = gm.getValue('monsterToFortify'))) {
			this.SetDivContent('quest_mess','No questing until attack target '+fortMon+" health exceeds "+this.GetNumber('MaxToFortify')+'%');
			return false;
		}
		if (!(monsterToAttack = gm.getValue('monsterToAttack'))) {
			if (!(targetFort = gm.getListObjVal('monsterOl',monsterToAttack,'ShipHealth'))) {
				if(targetFort < maxHealthtoQuest) {
					this.SetDivContent('quest_mess','No questing until fortify target '+monsterToAttack+' health exceeds '+maxHealthtoQuest+'%');
					return false;
				}
			}
		}
	}
	if(!gm.getObjVal('AutoQuest','name')) {
		if(gm.getValue('WhyQuest','')=='Manual') {
			this.SetDivContent('quest_mess','Pick quest manually.');
			return false;
		}
		this.SetDivContent('quest_mess','Searching for quest.');
	} else if(!this.IsEnoughEnergyForAutoQuest()) return false;

	if (gm.getObjVal('AutoQuest','general')=='none' || gm.getValue('ForceSubGeneral')) {
		if (this.SelectGeneral('SubQuestGeneral')) return true;
	}

	switch (gm.getValue('QuestArea','Quest')) {
		case 'Quest' :
			var subArea = gm.getValue('QuestSubArea','Land of Fire');
			var landPic = this.baseQuestTable[subArea];
			if (landPic == 'tab_underworld') {
				if (this.NavigateTo('quests,jobs_tab_more.gif,'+landPic + '_small.gif',landPic + '_big')) return true;
			}else
			if ((landPic == 'land_demon_realm') || (landPic == 'land_undead_realm')) {
				if (this.NavigateTo('quests,jobs_tab_more.gif,'+landPic + '.gif',landPic + '_sel')) return true;
			} else {
				if (this.NavigateTo('quests,jobs_tab_back.gif,'+landPic + '.gif',landPic + '_sel')) return true;
			}
			break;
		case 'Demi Quests' :
			if (this.NavigateTo('quests,symbolquests','demi_quest_on.gif')) return true;
			var subArea = gm.getValue('QuestSubArea','Ambrosia');
			var picSlice =nHtml.FindByAttrContains(document.body,'img','src','deity_'+this.demiQuestTable[subArea])
			if (picSlice.style.height!='160px') {
				return this.NavigateTo('deity_'+this.demiQuestTable[subArea]);
			}
			break;
		case 'Atlantis' :
			if (!this.CheckForImage('tab_atlantis_on.gif')) return this.NavigateTo('quests,monster_quests');
		default :
	}

	if ((button = this.CheckForImage('quick_switch_button.gif')) && !gm.getValue('ForceSubGeneral',false)) {
		gm.log('Clicking on quick switch general button.');
		this.Click(button);
		return true;
	}
	//Buy quest requires popup
	if(itemBuyPopUp = nHtml.FindByAttrContains(document.body,"form","id",'itemBuy')){
		gm.setValue('storeRetrieve','general');
		if (this.SelectGeneral('BuyGeneral')) return true;
		gm.setValue('storeRetrieve','');
		var costToBuy =itemBuyPopUp.textContent.replace(/.*\$/,'').replace(/[^0-9]{3,}.*/,'')
		gm.log("costToBuy = "+costToBuy);
		if(this.stats.cash < costToBuy) {
			//Retrieving from Bank
			if(this.stats.cash+(gm.getValue('inStore')-this.GetNumber('minInStore'))>= costToBuy){
				gm.log("Trying to retrieve: "+(costToBuy-this.stats.cash));
				gm.setValue("storeRetrieve",costToBuy-this.stats.cash);
				return this.RetrieveFromBank(costToBuy-this.stats.cash);
			}else{
				gm.setValue('AutoQuest','');
				gm.setValue('WhyQuest','Manual');
				gm.log("Cant buy requires, stopping quest");
				caap.SetControls(true);
				return false;
			}
		}
		if (button = this.CheckForImage('quick_buy_button.jpg')){
		gm.log('Clicking on quick buy button.');
		this.Click(button);
		return true;
		}
		gm.log("Cant find buy button");
		return false;
	}

	if (button = this.CheckForImage('quick_buy_button.jpg')) {
		gm.setValue('storeRetrieve','general');
		if (this.SelectGeneral('BuyGeneral')) return true;
		gm.setValue('storeRetrieve','');
		var costToBuy = button.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.data.replace(/[^0-9]/g,'');
		gm.log("costToBuy = "+costToBuy);
			if(this.stats.cash < costToBuy) {
				//Retrieving from Bank
				if(this.stats.cash+(gm.getValue('inStore')-this.GetNumber('minInStore'))>= costToBuy){
					gm.log("Trying to retrieve: "+(costToBuy-this.stats.cash));
					gm.setValue("storeRetrieve",costToBuy-this.stats.cash);
					return this.RetrieveFromBank(costToBuy-this.stats.cash);
				}else{
					gm.setValue('AutoQuest','');
					gm.setValue('WhyQuest','Manual');
					gm.log("Cant buy General, stopping quest");
					caap.SetControls(true);
					return false;
				}
			}
		gm.log('Clicking on quick buy general button.');
		this.Click(button);
		return true;
	}
	autoQuestDivs = this.DrawQuests(true);
	if(!gm.getObjVal('AutoQuest','name')) {
		gm.log('Could not find autoquest.');
		this.SetDivContent('quest_mess','Could not find autoquest.');
		return false;
	}
	if(gm.getObjVal('AutoQuest','name')!=autoQuestName) {
		gm.log('New AutoQuest found.');
		this.SetDivContent('quest_mess','New AutoQuest found.');
		return true;
	}
	//if found missing requires, click to buy
	if(background = nHtml.FindByAttrContains(autoQuestDivs.tr,"div","style",'background-color')){
		if(background.style.backgroundColor == 'rgb(158, 11, 15)'){
			gm.log(" background.style.backgroundColor = "+background.style.backgroundColor);
			gm.setValue('storeRetrieve','general');
			if (this.SelectGeneral('BuyGeneral'))return true;
			gm.setValue('storeRetrieve','');
			if (background.firstChild.firstChild.title) {
				gm.log("Clicking to buy "+background.firstChild.firstChild.title);
				this.Click(background.firstChild.firstChild);
				return true;
			}
		}
	}
	general = gm.getObjVal('AutoQuest','general');
	if (general == 'none' || gm.getValue('ForceSubGeneral',false)) {
		if (this.SelectGeneral('SubQuestGeneral')) return true;
	} else if ((general) && general != this.GetCurrentGeneral()) {
		gm.log('Clicking on general ' + general);
		this.Click(autoQuestDivs.genDiv);
		return true;
	}
	gm.log('Clicking auto quest: '+autoQuestName);
	gm.setValue('ReleaseControl',true);
	caap.Click(autoQuestDivs.click,10000);
	return true;
},

DrawQuests:function(pickQuestTF) {
	whyQuest = gm.getValue('WhyQuest','');
	if (pickQuestTF && whyQuest!='Manual') gm.setValue('AutoQuest','');
	var bestReward=0;
	var div = document.body;
	if (this.CheckForImage('demi_quest_on.gif')) {
		var ss=document.evaluate(".//div[contains(@id,'symbol_displaysymbolquest')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			div=ss.snapshotItem(s);
			if (div.style.display!='none') break;
		}
	}

	var ss=document.evaluate(".//div[contains(@class,'quests_background')]",div,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	if (ss.snapshotLength == 0) {
//		gm.log("Failed to find quests_background");
		return;
	}
	for(var s=0; s<ss.snapshotLength; s++) {
		var div=ss.snapshotItem(s);

		if (!(quest_name=this.GetQuestName(div))) continue;

		var reward=null;
		var energy=null;
		var experience=null;
		var divTxt=nHtml.GetText(div);
		var expM=this.experienceRe.exec(divTxt);

		if(expM) { experience=this.NumberOnly(expM[1]); }
		else {
			var expObj=nHtml.FindByAttr(div,'div','className','quest_experience');
			if(expObj) {
				experience=(this.NumberOnly(nHtml.GetText(expObj)));
			} else {
				gm.log('cannot find experience:'+quest_name);
			}
		}

		if((idx=quest_name.indexOf('<br>'))>=0) {
			quest_name=quest_name.substring(0,idx);
		}


		var m=this.energyRe.exec(divTxt);
		if(m) {
			energy=this.NumberOnly(m[1]);
		} else {
			var eObj=nHtml.FindByAttrContains(div,'div','className','quest_req');
			if(eObj) {
				energy=eObj.getElementsByTagName('b')[0];
			}
		}

		if(!energy) {
			gm.log('cannot find energy for quest:'+quest_name);
			continue;
		}

		var m=this.moneyRe.exec(this.RemoveHtmlJunk(divTxt));
		if(m) {
			var rewardLow=this.NumberOnly(m[1]);
			var rewardHigh=this.NumberOnly(m[2]);
			reward=(rewardLow+rewardHigh)/2;
		} else {
			gm.log('no money found:'+quest_name+' in ' + divTxt);
		}

		var click=nHtml.FindByAttr(div,"input","name",/^Do/);
		if(!click) {
			gm.log('no button found:'+quest_name);
			continue;
		}
		var bossList = ["Gift of Earth","Eye of the Storm","A Look into the Darkness","The Rift","Undead Embrace"];
		if (bossList.indexOf(quest_name) >= 0) {
			//if boss
			influence = "100";
		} else {
			var influenceList=this.influenceRe.exec(divTxt);
			influence = influenceList[1];
		}
		if(!influence) {
			gm.log('no influence found:'+quest_name+' in ' + divTxt);
		}
		var general = 'none';
		if (influence && influence < 100) {
			var genDiv=nHtml.FindByAttrContains(div,'div','className','quest_act_gen');
			if (genDiv) {
				genDiv = nHtml.FindByAttrContains(genDiv,'img','src','jpg');
				if (genDiv) {
					general = genDiv.title;
				}
			}
		}
		this.LabelQuests(div,energy,reward,experience,click);
		if(this.CheckCurrentQuestArea(gm.getValue('QuestSubArea','Atlantis'))){
			switch (whyQuest) {
				case 'Max Influence' :
					if(influence) {
						if (!gm.getObjVal('AutoQuest','name') && this.NumberOnly(influence)<100) gm.setObjVal('AutoQuest','name',quest_name);
					} else {
						gm.log('cannot find influence:'+quest_name+': '+influence);
					}
					break;
				case 'Max Experience' :
					var rewardRatio=(Math.floor(experience/energy*100)/100);
					if(bestReward<rewardRatio) gm.setObjVal('AutoQuest','name',quest_name);
					break;
				case 'Max Gold' :
					var rewardRatio=(Math.floor(reward/energy*10)/10);
					if(bestReward<rewardRatio) gm.setObjVal('AutoQuest','name',quest_name);
				default :	
			}
			if (gm.getObjVal('AutoQuest','name')==quest_name) {
				bestReward=rewardRatio;
				expRatio = experience/energy;
				gm.setValue('AutoQuest','name'+ls+quest_name+vs+'energy'+ls+energy+vs+'general'+ls+general+vs+'expRatio'+ls+expRatio);
				autoQuestDivs={'click':click,'tr':div,'genDiv':genDiv};
			}
		}
	}

	if (pickQuestTF) {
		if (gm.getObjVal('AutoQuest','name')) {
			this.SetControls(true);
			return autoQuestDivs;
		}
		if(whyQuest=='Max Influence' && gm.getValue('swithQuestArea',false)){//if not find quest, probably you already maxed the subarea, try another area
			var SubAreaQuest = gm.getValue('QuestSubArea');
			switch (SubAreaQuest) {
				case 'Land of Fire':
					gm.setValue('QuestSubArea','Land of Earth');
					break;
				case 'Land of Earth':
					gm.setValue('QuestSubArea','Land of Mist');
					break;
				case 'Land of Mist':
					gm.setValue('QuestSubArea','Land of Water');
					break;
				case 'Land of Water':
					gm.setValue('QuestSubArea','Demon Realm');
					break;
				case 'Demon Realm':
					gm.setValue('QuestSubArea','Undead Realm');
					break;
				case 'Undead Realm':
					gm.setValue('QuestSubArea','Underworld');
					break;
				case 'Underworld':
					gm.setValue('QuestArea','Demi Quests');
					gm.setValue('QuestSubArea','Ambrosia');
					break;
				case 'Ambrosia':
					gm.setValue('QuestSubArea','Malekus');
					break;
				case 'Malekus':
					gm.setValue('QuestSubArea','Corvintheus');
					break;
				case 'Corvintheus':
					gm.setValue('QuestSubArea','Aurora');
					break;
				case 'Aurora':
					gm.setValue('QuestSubArea','Azeron');
					break;
				case 'Azeron':
					gm.setValue('QuestArea','Quest');
					gm.setValue('QuestSubArea','Land of Fire');
					break;
				default :
					gm.setValue('AutoQuest','');
					gm.setValue('WhyQuest','Manual');
					this.SetControls(true);
					return false;
			}
			return false;
		}
		gm.setValue('AutoQuest','');
		gm.setValue('WhyQuest','Manual');
		this.SetControls(true);
	}
},

CheckCurrentQuestArea:function(SubAreaQuest){
	switch (SubAreaQuest) {
		case 'Land of Fire':
			if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_1')) return true;
			break;
		case 'Land of Earth':
			if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_2')) return true;
			break;
		case 'Land of Mist':
			if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_3')) return true;
			break;
		case 'Land of Water':
			if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_4')) return true;
			break;
		case 'Demon Realm':
			if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_5')) return true;
			break;
		case 'Undead Realm':
			if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_6')) return true;
			break;
		case 'Underworld':
			if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_7')) return true;
			break;
		case 'Ambrosia':
			if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_1')) return true;
			break;
		case 'Malekus':
			if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_2')) return true;
			break;
		case 'Corvintheus':
			if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_3')) return true;
			break;
		case 'Aurora':
			if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_4')) return true;
			break;
		case 'Azeron':
			if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_5')) return true;
			break;
		case 'Atlantis':
			if (this.CheckForImage('tab_atlantis_on.gif')) return true;
			break;
		default :
			gm.log("Error: cant find SubQuestArea: "+SubAreaQuest);
			return false;
	}
},

GetQuestName:function(questDiv) {
	var item_title=nHtml.FindByAttrXPath(questDiv,'div',"@class='quest_desc' or @class='quest_sub_title'");
	if(!item_title) {
	//	gm.log("Can't find quest description or sub-title");
		return false;
	}

	if (item_title.innerHTML.toString().match(/LOCK/)) {
		return false;
	}

	var firstb=item_title.getElementsByTagName('b')[0];
	if (!firstb) {
		gm.log("Can't get bolded member out of " + item_title.innerHTML.toString());
		return false;
	}

	var quest_name=nHtml.StripHtml(firstb.innerHTML.toString()).trim();

	if(!quest_name) {
		gm.log('no quest name for this row'+div.innerHTML);
		return false;
	}
	return quest_name;
},

IsEnoughEnergyForAutoQuest:function() {
	energy = gm.getObjVal('AutoQuest','energy');
	if(!this.stats.energy || !energy) { return false; }
	var whenQuest = gm.getValue('WhenQuest','');

	if(whenQuest == 'Energy Available' || whenQuest == 'Not Fortifying') {
		if (this.stats.energy.num>=energy) return true;
		this.SetDivContent('quest_mess','Waiting for more energy: '+this.stats.energy.num+"/"+(energy?energy:""));
		return false;
	} else if (whenQuest == 'At Max Energy') {
		if (!gm.getValue('MaxIdleEnergy', 0)) {
			gm.log("Changing to idle general to get Max energy");
			this.PassiveGeneral();
		}
		if (this.stats.energy.num >= gm.getValue('MaxIdleEnergy')) return true;
		if (this.InLevelUpMode() && this.stats.energy.num>=energy) {
			this.SetDivContent('quest_mess','Burning all energy to level up');
			return true;
		}
		this.SetDivContent('quest_mess','Waiting for max energy:'+this.stats.energy.num+"/"+gm.getValue('MaxIdleEnergy'));
		return false;
	}
	return false;
},

LabelQuests:function(div,energy,reward,experience,click) {
	if(nHtml.FindByAttr(div,'div','className','autoquest')) return;

	//var div=document.createElement('div');
	div=document.createElement('div');
	div.className='autoquest';
	div.style.fontSize='10px';
	div.innerHTML="$ per energy: "+
		(Math.floor(reward/energy*10)/10)+
		"<br />Exp per energy: "+
		(Math.floor(experience/energy*100)/100)+
		"<br />";

	if(gm.getObjVal('AutoQuest','name')==quest_name) {
		var b=document.createElement('b');
		b.innerHTML="Current auto quest";
		div.appendChild(b);
	} else {
		var setAutoQuest=document.createElement('a');
		setAutoQuest.innerHTML='Auto run this quest.';
		setAutoQuest.quest_name=quest_name;

		var quest_nameObj=document.createElement('span');
		quest_nameObj.innerHTML=quest_name;
		quest_nameObj.style.display='none';
		setAutoQuest.appendChild(quest_nameObj);

		var quest_energyObj=document.createElement('span');
		quest_energyObj.innerHTML=energy;
		quest_energyObj.style.display='none';
		setAutoQuest.appendChild(quest_energyObj);
		setAutoQuest.addEventListener("click",function(e) {
			var sps=e.target.getElementsByTagName('span');
			if(sps.length>0) {
				gm.setValue('AutoQuest','name'+ls+sps[0].innerHTML.toString()+ls+'energy'+ls+sps[1].innerHTML.toString());
				gm.setValue('WhyQuest','Manual');
				if (caap.CheckForImage('tab_quest_on.gif')) {
					gm.setValue('QuestArea','Quest');
					if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_1')){
						gm.setValue('QuestSubArea','Land of Fire');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_2')){
						gm.setValue('QuestSubArea','Land of Earth');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_3')){
						gm.setValue('QuestSubArea','Land of Mist');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_4')){
						gm.setValue('QuestSubArea','Land of Water');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_5')){
						gm.setValue('QuestSubArea','Demon Realm');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_6')){
						gm.setValue('QuestSubArea','Undead Realm');
					}
					else if (nHtml.FindByAttrContains(document.body,"div","class",'quests_stage_7')){
						gm.setValue('QuestSubArea','Underworld');
					}
					gm.log('Seting SubQuest Area to: '+ gm.getValue('QuestSubArea'));
				} else if (caap.CheckForImage('demi_quest_on.gif')) {
					gm.setValue('QuestArea','Demi Quests');
					// Set Sub Quest Area
					if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_1')){
						gm.setValue('QuestSubArea','Ambrosia');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_2')){
						gm.setValue('QuestSubArea','Malekus');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_3')){
						gm.setValue('QuestSubArea','Corvintheus');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_4')){
						gm.setValue('QuestSubArea','Aurora');
					}else if (nHtml.FindByAttrContains(document.body,"div","class",'symbolquests_stage_5')){
						gm.setValue('QuestSubArea','Azeron');
					}
					gm.log('Seting SubQuest Area to: '+ gm.getValue('QuestSubArea'));
				} else if (caap.CheckForImage('tab_atlantis_on.gif')) {
					gm.setValue('QuestArea','Atlantis');
				}
				caap.SetControls(true);
			} else {
				gm.log('what did we click on?');
			}
		},false);
		div.appendChild(setAutoQuest);
	}
	div.style.position='absolute';
	div.style.background='#B09060';
	div.style.right="144px";
	click.parentNode.insertBefore(div,click);
},

/////////////////////////////////////////////////////////////////////

//							AUTO BLESSING

/////////////////////////////////////////////////////////////////////

deityTable:{'energy':1, 'attack': 2,'defense': 3,'health': 4,'stamina': 5},

BlessingResults:function(resultsText) {
	// Check time until next Oracle Blessing
	if (resultsText.match(/Please come back in: /)) {
		var hours = parseInt(resultsText.match(/ \d+ hour/));
		var minutes = parseInt(resultsText.match(/ \d+ minute/));
		this.SetTimer('BlessingTimer',(hours*60+minutes+1)*60);
		gm.log('Recorded Blessing Time.  Scheduling next click!');
	}

	// Recieved Demi Blessing.  Wait 24 hours to try again.
	if (resultsText.match(/You have paid tribute to/)) {
		this.SetTimer('BlessingTimer',24*60*60+60);
		gm.log('Received blessing.  Scheduling next click!');
	}
	this.SetCheckResultsFunction('');
},
AutoBless:function() {
	var autoBless=gm.getValue('AutoBless','none').toLowerCase();
	if (autoBless=='none') return false;
	if (!this.CheckTimer('BlessingTimer')) return false;
	if (this.NavigateTo('quests,demi_quest_off','demi_quest_bless')) return true;

	var picSlice =nHtml.FindByAttrContains(document.body,'img','src','deity_'+autoBless)
	if (!(picSlice =nHtml.FindByAttrContains(document.body,'img','src','deity_'+autoBless))) {
		gm.log('No diety pics for deity_'+autoBless);
		return false;
	}

	if (picSlice.style.height!='160px') {
			return this.NavigateTo('deity_'+autoBless);
	}
	if (!(picSlice = nHtml.FindByAttrContains(document.body,'form','id','_symbols_form_'+this.deityTable[autoBless]))) {
		gm.log('No form for deity blessing.');
		return false;
	}
	if (!(picSlice = this.CheckForImage('demi_quest_bless',picSlice))) {
		gm.log('No image for deity blessing.');
		return false;
	}
	gm.log('Click deity blessing for ' + autoBless);
	this.SetTimer('BlessingTimer',60*60);
	this.SetCheckResultsFunction('BlessingResults');
	caap.Click(picSlice);
	return true;
},

/////////////////////////////////////////////////////////////////////

//							PROPERTY

// Displays return on properties and perfom auto purchasing

/////////////////////////////////////////////////////////////////////

PropertiesGetNameFromRow:function(row) {
	// schoolofmagic, etc. <div class=item_title
	var infoDiv=nHtml.FindByAttrXPath(row,'div',"contains(@class,'land_buy_info') or contains(@class,'item_title')");
	if(!infoDiv) {
		gm.log("can't find land_buy_info");
	}
	if(infoDiv.className.indexOf('item_title')>=0) {
		return infoDiv.textContent.trim();
	}
	var strongs=infoDiv.getElementsByTagName('strong');
	if(strongs.length<1) {
		return null;
	}
	return strongs[0].textContent.trim();
},

bestProp:{prop:'',roi:''},
DrawProperties:function() {
	if(!this.CheckForImage('tab_land_on.gif')|| nHtml.FindByAttrXPath(document,'div',"contains(@class,'caap_propDone')")) return null;
	gm.deleteValue('BestPropCost');
	this.sellProp = '';
	this.bestProp.roi =0;
	var propByName=this.IterateProperties(function(prop) {
		this.SelectProperties(prop.row, 2);
		var roi=(parseInt((prop.income/prop.totalCost)*240000) /100);
		selects = prop.row.getElementsByTagName('select');
		if(!nHtml.FindByAttrXPath(prop.row,'input',"@name='Buy'")) {
			roi = 0;
			// Lets get our max allowed from the land_buy_info div
			div = nHtml.FindByAttrXPath(prop.row,'div',"contains(@class,'land_buy_info') or contains(@class,'item_title')");
			maxText = nHtml.GetText(div).match(/:\s+\d+/i).toString().trim();
			maxAllowed= Number(maxText.replace(/:\s+/,''));
			// Lets get our owned total from the land_buy_costs div
			div = nHtml.FindByAttrXPath(prop.row,'div',"contains(@class,'land_buy_costs')");
			ownedText = nHtml.GetText(div).match(/:\s+\d+/i).toString().trim();
			owned = Number(ownedText.replace(/:\s+/,''));
			// If we own more than allowed we will set property and selection
			var selection = new Array(1,5,10);
			for (var s=2; s>=0; s--) {
				if (owned - maxAllowed >= selection[s]) {
					this.sellProp = prop;
					this.sellProp.selection = s;
					break;
				}
			}
		}
		div = nHtml.FindByAttrXPath(prop.row,'div',"contains(@class,'land_buy_info') or contains(@class,'item_title')").getElementsByTagName('strong');
		div[0].innerHTML+=" | "+roi+"% per day.";
		if(!prop.usedByOther) {
			if(!(this.bestProp.roi || roi == 0)|| roi>this.bestProp.roi) {
				this.bestProp.roi=roi;
				this.bestProp.prop=prop;
				gm.setValue('BestPropCost',this.bestProp.prop.cost);
			}
		}
		if(prop.row.className == "land_buy_row_unique"){
			if(nHtml.GetText(prop.row).match(/each consecutive day/i) != null) {
				gm.log("Found unique land, checking timer");
				if(nHtml.GetText(prop.row.childNodes[1].childNodes[7].childNodes[5])){
					resultsText = nHtml.GetText(prop.row.childNodes[1].childNodes[7].childNodes[5]).trim()
					if(resultsText.match(/([0-9]{1,2}:)?([0-9]{2}:)?[0-9]{2}/)){
						resultsText = resultsText.match(/([0-9]{1,2}:)?([0-9]{2}:)?[0-9]{2}/).toString().split(',')[0];
						resultsText = resultsText.split(':');
						var time=[];
						for(x = 2; x >= 0 ; x--){
							time[x] = 0;
							if(resultsText[x])
								time[x] = resultsText[resultsText.length-1-x];
						}
						hours =  time[2];
						minutes =  time[1];
						seconds =  time[0];
						gm.log("hours:"+hours+" minutes:"+minutes+" seconds:"+seconds);
						if(gm.getValue('LandTimer',9999999999999999999999999) > (new Date().getTime())*1000+hours*3600+minutes*60+seconds){
							gm.log("Setting Land Timer");
							this.SetTimer('LandTimer',hours*3600+minutes*60+seconds);
						}
						//prop.row.childNodes[1].childNodes[7].childNodes[5].childNodes[5].childNodes[1]
					}else {gm.log("You need to buy a prop first"); this.SetTimer('LandTimer',9999999999999999999999999);}
				}else gm.log("Error");
			}
		}
	});
	gm.log("BestPropCost:"+gm.getValue('BestPropCost'));
	if(!gm.getValue('BestPropCost')){
		gm.setValue('BestPropCost','none');
	}
	div=document.createElement('div');
	div.className='caap_propDone';
	div.style.display='none';
	nHtml.FindByAttrContains(document.body,"tr","class",'land_buy_row').appendChild(div);
	return null;
},

IterateProperties:function(func) {
	var content=document.getElementById('content');
	var ss=document.evaluate(".//tr[contains(@class,'land_buy_row')]",content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if (!ss || (ss.snapshotLength == 0)) {
		//gm.log("Can't find land_buy_row");
		return null;
	}
	var builtOnRe=new RegExp('(Built On|Consumes|Requires):\\s*([^<]+)','i');
	var propByName={};
	var propNames=[];

	//gm.log('forms found:'+ss.snapshotLength);
	for(var s=0; s<ss.snapshotLength; s++) {
		var row=ss.snapshotItem(s);
		if(!row) { continue; }

		var name=this.PropertiesGetNameFromRow(row);

		if(name==null || name=='') { gm.log("Can't find property name"); continue; }

		var moneyss=document.evaluate(".//*[contains(@class,'gold') or contains(@class,'currency')]",row,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

		if(moneyss.snapshotLength < 2) { gm.log("Can't find 2 gold instances"); continue; }

		var nums=[];
		var numberRe=new RegExp("([0-9,]+)");
		for(var sm=0; sm<moneyss.snapshotLength; sm++) {
			var income=moneyss.snapshotItem(sm);
			if(income.className.indexOf('label')>=0) {
				income=income.parentNode;
				var m=numberRe.exec(income.textContent);
				if(m && m.length>=2 && m[1].length>1) {
					// number must be more than a digit or else it could be a "? required" text
					income=this.NumberOnly(m[1]);
				} else {
					//gm.log('Cannot find income for: '+name+","+income.textContent);
					income=0;
					continue;
				}
			} else {
				income=this.NumberOnly(income.textContent);
			}
			nums.push(income);
		}

		var income=nums[0];
		var cost=nums[1];
		if(!income || !cost) {
			gm.log("Can't find income or cost for " + name);
			continue;
		}
		if(income>cost) {
			// income is always less than the cost of property.
			income=nums[1]; cost=nums[0];
		}

		var totalCost=cost;

		var prop={'row':row,'name':name,'income':income,'cost':cost,'totalCost':totalCost,'usedByOther':false};

		propByName[name]=prop;
		propNames.push(name);
	}

	for(var p=0; p<propNames.length;p++) {
		func.call(this,propByName[propNames[p]]);
	}
	return propByName;
},

SelectProperties:function(row,val) {
	var selects=row.getElementsByTagName('select');
	if(selects.length<1) { return false; }
	var select=selects[0];
	select.selectedIndex=val;
	return true;
},
BuyProperty:function(prop) {
	//this.DrawProperties();
	this.SelectProperties(prop.row,2);
	var button;
	if(button=nHtml.FindByAttrXPath(prop.row,'input',"@type='submit' or @type='image'")){
//		gm.log("Clicking buy button:" +button);
		if(button) {
			gm.log("Buying Prop: " +prop.name);
			this.Click(button,13000);
			gm.setValue('BestPropCost','')
			this.bestProp.roi = '';
			return true;
		}
	}
	return false;
},

SellProperty:function(prop,select) {
	//this.DrawProperties();
	this.SelectProperties(prop.row,select);
	var button;
	if(button=nHtml.FindByAttrXPath(prop.row,'input',"@type='submit' or @type='image'")){
//		gm.log("Clicking sell button:" +button);
		if(button) {
			gm.log("Selling Prop: " +prop.name);
			this.Click(button,13000);
			this.sellProp = '';
			return true;
		}
	}
	return false;
},

Properties:function() {
	/*if(gm.getValue('LandTimer') && this.CheckTimer('LandTimer')) {
		if (this.NavigateTo('soldiers,land','tab_land_on.gif')) return true;
	}*/
	var autoBuyProperty=gm.getValue('autoBuyProperty',0);
	if(autoBuyProperty) {
		// Do we have properties above our max to sell?
		if (this.sellProp && gm.getValue('SellProperties',true)) {
			this.SellProperty(this.sellProp,this.sellProp.selection);
			return true;
		}

		if(!gm.getValue('BestPropCost')){
			gm.log("Going to land to get Best Property Cost");
			if (this.NavigateTo('soldiers,land','tab_land_on.gif')) return true;
		}
		if(gm.getValue('BestPropCost') == 'none'){
			//gm.log("No Properties avaliable");
			return false;
		}
		if(!gm.getValue('inStore')){
			gm.log("Going to keep to get Stored Value");
			if (this.NavigateTo('keep')) return true;
		}
		//Retrieving from Bank
		if(this.stats.cash+(gm.getValue('inStore')-this.GetNumber('minInStore'))>=10*gm.getValue('BestPropCost') && this.stats.cash < 10*gm.getValue('BestPropCost')){
			if(this.PassiveGeneral())return true;
			gm.log("Trying to retrieve: "+(10*gm.getValue('BestPropCost')-this.stats.cash));
			return this.RetrieveFromBank(10*gm.getValue('BestPropCost')-this.stats.cash);
		}

// Need to check for enough moneys + do we have enough of the builton type that we already own.
		if(gm.getValue('BestPropCost') && this.stats.cash >= 10*gm.getValue('BestPropCost')){
			if(this.PassiveGeneral())return true;
			this.NavigateTo('soldiers,land');
			if(this.CheckForImage('tab_land_on.gif')){
				gm.log("Buying property: "+caap.bestProp.name);
				if (this.BuyProperty(caap.bestProp.prop))
				return true;
			}else return this.NavigateTo('soldiers,land');
		}
	}
	return false;
},

/////////////////////////////////////////////////////////////////////

//							BATTLING PLAYERS

/////////////////////////////////////////////////////////////////////

// Doesn't appear to be implemented in CA
/*
IterateBattleLinks:function(func) {
	var content=document.getElementById('content');
	if(!content) { return; }
	var ss=document.evaluate(".//a[(contains(@href,'xw_controller=stats') and contains(@href,'xw_action=view')) "+
		"or (contains(@href,'/profile/'))"+
		"or (contains(@href,'/"+this.gameName+"/profile.php?userId='))"+
		"or (contains(@href,'/stats.php?user='))"+
		"]",content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var s=0; s<ss.snapshotLength; s++) {
		var userLink=ss.snapshotItem(s);
		if(userLink.innerHTML.indexOf('<img')>=0) { continue; }
		var m=this.userRe.exec(userLink.getAttribute('href'));
		if(!m) { continue; }
		var user=m[2];
		func.call(this,userLink,user);
	}
},

AddBattleLinks:function() {
	if(document.getElementById('addBattleLink')) {
		return;
	}
	this.IterateBattleLinks(function(userLink,user) {
	if(nHtml.FindByAttr(userLink.parentNode,'a','class','addBattle')) { return; }
		var addBattle=document.createElement('a');
		addBattle.className='addBattle';
		addBattle.id='addBattleLink';
		addBattle.innerHTML='(Auto Battle)';
		addBattle.addEventListener('click',function() {
			var battleTarget=document.getElementById('caap_BattleTargets');
			if(battleTarget.value=="freshmeat") { battleTarget.value=''; }
			if(battleTarget.value!="") { battleTarget.value+="\n"; }
			battleTarget.value+=user;
			caap.SaveBoxText('BattleTargets');
		},false);
		userLink.parentNode.insertBefore(addBattle,userLink.nextSibling);
		userLink.parentNode.insertBefore(document.createTextNode(' '),userLink.nextSibling);
	});
},
*/

CheckBattleResults:function() {
	// Check for Battle results

	resultsDiv = nHtml.FindByAttrContains(document.body,'span','class','result_body')
	if (resultsDiv) {
		resultsText = nHtml.GetText(resultsDiv).trim()
		if (resultsText.match(/Your opponent is dead or too weak to battle/)) {
			if (!this.doNotBattle) this.doNotBattle = this.lastBattleID
			else this.doNotBattle += " " + this.lastBattleID
		}
	}

	if (nHtml.FindByAttrContains(document.body,"img","src",'battle_victory.gif')) {
		winresults = nHtml.FindByAttrContains(document.body,'span','class','positive');
		bptxt = nHtml.GetText(winresults.parentNode).toString().trim();
		bpnum = Number(bptxt.match(/\d+/i));
		goldtxt = nHtml.FindByAttrContains(document.body,"b","class",'gold').innerHTML;
		goldnum = Number(goldtxt.substring(1).replace(/,/,''));

		resultsDiv = nHtml.FindByAttrContains(document.body,'div','id','app_body');
		nameLink=nHtml.FindByAttrContains(resultsDiv.parentNode.parentNode,"a","href","keep.php?user=");
		userId = nameLink.href.match(/user=\d+/i);
		userId = String(userId).substr(5);
		userName = nHtml.GetText(nameLink).trim();

		wins = 1
		gm.log("We Defeated "+userName+"!!")

		//Test if we should chain this guy
		gm.setValue("BattleChainId",'');
		if (this.GetNumber('ChainBP') !== '') {
			if (bpnum >= Number(this.GetNumber('ChainBP'))) {
				gm.setValue("BattleChainId",userId);
				gm.log("Chain Attack " + userId + " Battle Points:" + bpnum );
			} else {
				if (!this.doNotBattle) this.doNotBattle = this.lastBattleID
				else this.doNotBattle += " " + this.lastBattleID
			}
		}
		if (this.GetNumber('ChainGold') !== '') {
			if (goldnum >= Number(this.GetNumber('ChainGold'))) {
				gm.setValue("BattleChainId",userId);
				gm.log("Chain Attack " + userId + " Gold:" + goldnum)
			} else 	{
				if (!this.doNotBattle) this.doNotBattle = this.lastBattleID
				else this.doNotBattle += " " + this.lastBattleID
			}
		}

/* 	Not ready for primtime.   Need to build SliceList to extract our element
		if (gm.getValue('BattlesWonList','').indexOf(os+userId+os) >= 0) {
			element = gm.sliceList('BattlesWonList',os+userId+os);
			elementArray = element.split(vs);
			prevWins = Number(elementArray[3]);
			prevBPs = Number(elementArray[4]);
			prevGold = Number(elementArray[5]);
			wins = prevWins + wins;
			bpnum = prevBPs + bpnum;
			goldnum  = prevGold + goldnum
		}
*/
		if (gm.getValue('BattlesWonList','').indexOf(os+userId+os) == -1) {
			now = (new Date().getTime()).toString();
			newelement = now + os + userId + os + userName + os + wins + os + bpnum + os + goldnum;
			gm.listPush('BattlesWonList',newelement,100);
		}
		this.SetCheckResultsFunction('');
	} else if (this.CheckForImage('battle_defeat.gif')) {
		resultsDiv = nHtml.FindByAttrContains(document.body,'div','id','app_body');
		nameLink=nHtml.FindByAttrContains(resultsDiv.parentNode.parentNode,"a","href","keep.php?user=");
		userId = nameLink.href.match(/user=\d+/i);
		userId = String(userId).substr(5);
		userName = nHtml.GetText(nameLink).trim();

		gm.log("We Were Defeated By "+userName+".")
		if (gm.getValue('BattlesLostList','').indexOf(os+userId+os) == -1) {
			now = (new Date().getTime()).toString();
			newelement = now + os + userId + os + userName
			gm.listPush('BattlesLostList',newelement,100)
		}
/* 	Not ready for primtime.   Need to build SliceList to yank our elemment out of the win list as well
		if (gm.getValue('BattlesWonList','').indexOf(os+userId+os) >= 0) {
			trash = gm.sliceList('BattlesWonList',os+userId+os);
			elementArray = element.split(vs);
		}
*/		this.SetCheckResultsFunction('');
	}
},
FindBattleForm:function(obj,withOpponent) {
	var ss=document.evaluate(".//form[contains(@onsubmit,'battle.php')]",obj,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var battleForm=null;
	for(var s=0; s<ss.snapshotLength; s++) {
		battleForm=ss.snapshotItem(s);

		// ignore forms in overlays
		var p=battleForm;
		while(p) {
			if (p.id && p.id.indexOf('verlay')>=0) {
				battleForm=null; break;
			}
			p=p.parentNode;
		}
		if(!battleForm) {
			continue;
		}

		var inviteButton=nHtml.FindByAttrXPath(battleForm,"input","(@type='submit' or @name='submit') and (contains(@value,'Invite') or contains(@value,'Notify'))");
		if(inviteButton) {
			// we only want "attack" forms not "attack and invite", "attack & notify"
			continue;
		}

		var submitButton=nHtml.FindByAttrXPath(battleForm,"input","@type='image'");
		if(!submitButton) {
			// we only want forms that have a submit button
			continue;
		}

		if(withOpponent) {
			var inp=nHtml.FindByAttrXPath(battleForm,"input","@name='target_id'");
			if(!inp) {
				continue;
			} else {
				gm.log('inp.name is:' + inp.name);
			}
		}

		if (gm.getValue("BattleType","Invade") == "Duel") {
			var inp=nHtml.FindByAttrXPath(battleForm,"input","@name='duel'");
			if (inp) {
				if (inp.value == "false") continue;
				else gm.log('dueling form found');
			}
		}

		if(battleForm) { break; }
	}

	return battleForm;
},

battleLinkXPath:"(contains(@onclick,'xw_controller=battle') and contains(@onclick,'xw_action=attack')) "+
	"or contains(@onclick,'directAttack')"+
	"or contains(@onclick,'_battle_battle(')",

BattleUserId:function(userid) {
		gm.log('Battle user:'+userid);
		if (gm.getValue('BattleType','Invade') == "Duel") target = "battle_02.gif";
		else target = "battle_01.gif";

		var battleButton = nHtml.FindByAttrContains(document.body,"input","src",target);
		if (battleButton) {
			form = battleButton.parentNode.parentNode;
			inp = nHtml.FindByAttrXPath(form,"input","@name='target_id'");
			if (inp) {
				inp.value = userid;
				this.lastBattleID=userid;
				this.ClickBattleButton(battleButton);
				this.notSafeCount = 0;
				return true;
			} else gm.log("target_id not found in battleForm");
				gm.log("target_id not found in battleForm");
		} else gm.log("battleButton not found");

	return false;
},
rankTable:{'acolyte':0, 'scout': 1,'soldier': 2,'elite soldier': 3,'squire': 4,'knight': 5,'first knight': 6,'legionnaire': 7,'centurion': 8,'champion': 9,'lieutenant commander':10,'commander':11,'high commander':12,'lieutenant general':13,'general':14,'high general':15,'baron':16,'earl':17,'duke':18,'prince':19,'king':20,'high king':21},

ClickBattleButton:function(battleButton) {
	gm.setValue('ReleaseControl',true);
	this.SetCheckResultsFunction('CheckBattleResults');
	this.Click(battleButton);
},
// raid_attack_middle2.gif

battles:{
        'Raid'			: {Invade: 'raid_attack_button.gif'
						, Duel : 'raid_attack_button2.gif'
						, regex : new RegExp('Rank: ([0-9]+) ([^0-9]+) ([0-9]+) ([^0-9]+) ([0-9]+)','i')
						, refresh : 'raid'
						, image : 'tab_raid_on.gif'

						},
        'Freshmeat'		: {Invade: 'battle_01.gif'
						, Duel : 'battle_02.gif'
						, regex : new RegExp('Level ([0-9]+)\\s*([A-Za-z ]+)','i')
						, refresh : 'battle_on.gif'
						, image : 'battle_on.gif'
						}
},

BattleFreshmeat:function(type) {
try{
	var invadeOrDuel = gm.getValue('BattleType');
	var target = "//input[contains(@src,'" + this.battles[type][invadeOrDuel] + "')]";
	gm.log('target ' + target);
	var ss=document.evaluate(target,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(ss.snapshotLength<=0) {
		gm.log('Not on battlepage');
		return false;
	}

	var plusOneSafe = false;
	var bestButton;
	var bestScore = -10000;
	var bestID = 0;
	var safeTargets = [];
	var count = 0;

//	gm.log("my army/rank/level:" + this.stats.army + "/" + this.stats.rank + "/" + this.stats.level);
	for(var s=0; s<ss.snapshotLength; s++) {
		var button=ss.snapshotItem(s);
		if(!(tr=button)) {
			gm.log('No tr parent of button?');
			continue;
		}
		if (type == 'Raid') {
			tr=tr.parentNode.parentNode.parentNode.parentNode.parentNode;
			txt=tr.childNodes[3].childNodes[3].textContent;
			var levelm=this.battles.Raid.regex.exec(txt);
			if (!levelm) {
				gm.log("Can't match battleRaidRe in " + txt);
				continue;
			}
			var rank =parseInt(levelm[1]);
			var level=parseInt(levelm[3]);
			var army =parseInt(levelm[5]);
		} else {
			while(tr.tagName.toLowerCase()!="tr") {
				tr=tr.parentNode;
			}
			//  If looking for demi points, and already full, continue
			if(gm.getValue('DemiPointsFirst','') && !gm.getValue('DemiPointsDone',true)) {
				deityNumber = this.NumberOnly(this.CheckForImage('symbol_',tr).src.match(/\d+\.jpg/i).toString())-1;
				demiPointList = gm.getList('DemiPointList');
				if (parseInt(demiPointList[deityNumber])==10 || !gm.getValue('DemiPoint'+deityNumber)) continue;
			}
			var txt=nHtml.GetText(tr).trim();
			if (!(levelm=this.battles.Freshmeat.regex.exec(txt))) {
				gm.log("Can't match battleLevelRe in " + txt);
				continue;
			}
			var level=parseInt(levelm[1]);
			var rankStr=levelm[2].toLowerCase().trim();
			var rank = this.rankTable[rankStr];
			var subtd=document.evaluate("td",tr,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			var army = parseInt(nHtml.GetText(subtd.snapshotItem(2)).trim());
		}

		// Lets get our Freshmeat user settings
		var minRank = this.GetNumber("FreshMeatMinRank",99);
		var maxLevel = this.GetNumber("FreshMeatMaxLevel",((invadeOrDuel == 'Invade') ? 1000 : 15));
		var ARBase = this.GetNumber("FreshMeatARBase",0.5);
		var ARMax = this.GetNumber("FreshMeatARMax",1000);
		var ARMin = this.GetNumber("FreshMeatARMin",0);

		if (level - this.stats.level > maxLevel) continue;
		if (this.stats.rank && (this.stats.rank - rank  > minRank)) continue;

		var levelMultiplier = this.stats.level/level
		var armyRatio = ARBase * levelMultiplier
		var armyRatio = Math.min(armyRatio,ARMax)
		var armyRatio = Math.max(armyRatio,ARMin)
		if (armyRatio <= 0) {
			gm.log("Bad ratio");
			continue;
		}
//		gm.log("Army Ratio:" + armyRatio + " Level:" + level + " Rank:" + rank + " Army: " + army)

		// if we know our army size, and this one is larger than armyRatio, don't battle
		if (this.stats.army && (army > (this.stats.army*armyRatio))) {
			continue;
		}
		var inp=nHtml.FindByAttrXPath(tr,"input","@name='target_id'");
		var id=inp.value;
		var dfl = gm.getValue('BattlesLostList','');

		// don't battle people we recently lost to
		if (dfl.indexOf(os+id+os) >= 0) continue;
		var thisScore = rank-(army/levelMultiplier/this.stats.army);

		var temp = {};
		temp.id = id ;
		temp.score = thisScore ;
		temp.button = button ;
		temp.targetNumber = s+1 ;
		safeTargets[count] = temp;
		count++;
		if (s == 0 && type == 'Raid') plusOneSafe = true;

		for (x = 0; x < count; x++) {
			for (var y = 0 ; y < x ; y++) {
				if (safeTargets[y].score< safeTargets[y+1].score) {
					temp = safeTargets[y];
					safeTargets[y] = safeTargets[y+1];
					safeTargets[y+1] = temp;
				}
			}
		}
	}

	if (count > 0) {
		if (gm.getValue('PlusOneKills',false) && type == 'Raid') {
			if (plusOneSafe) {
				anyButton = ss.snapshotItem(0);
				form = anyButton.parentNode.parentNode;
				inp = nHtml.FindByAttrXPath(form,"input","@name='target_id'");
				if (inp) {
					firstId = inp.value;
					inp.value = '200000000000001';
					gm.log("Target ID Overriden For +1 Kill. Expected Defender:  " + firstId);
					this.ClickBattleButton(anyButton);
					this.lastBattleID = firstId;
					this.SetDivContent('battle_mess','Attacked: ' + this.lastBattleID);
					this.notSafeCount = 0;
					return true;
				} else gm.log("Could not find 'target_id' input");
			} else gm.log("Not safe for +1 kill.");
		} else {
			for (x = 0; x < count; x++) {
				//gm.log("safeTargets["+x+"].id = "+safeTargets[x].id+" safeTargets["+x+"].score = "+safeTargets[x].score);
				if (!this.lastBattleID && this.lastBattleID == safeTargets[x].id && x < count-1) continue;

				bestButton = safeTargets[x].button;
				if (bestButton != null) {
						gm.log('Found Target score: ' + safeTargets[x].score + ' id: ' + safeTargets[x].id +' Number: '+safeTargets[x].targetNumber);
						this.ClickBattleButton(bestButton);
						this.lastBattleID = safeTargets[x].id;
						this.SetDivContent('battle_mess','Attacked: ' + this.lastBattleID);
						this.notSafeCount = 0;
						return true;
				} else gm.log('Attack button is null');
			}
		}
	}

	this.notSafeCount++;
	if (this.notSafeCount > 100) {
		this.SetDivContent('battle_mess','Leaving Battle. Will Return Soon.');
		gm.log('No safe targets limit reached. Releasing control for other processes.');
		this.notSafeCount = 0;
		return false;
	}

	this.SetDivContent('battle_mess','No targets matching criteria');
	gm.log('No safe targets. ' + this.notSafeCount);

	if (type == 'Raid') {
		if ( (engageButton = this.monsterEngageButtons[gm.getValue('raidToAttack','')]) ) caap.Click(engageButton);
		else this.NavigateTo(this.battlePage + ',raid');
	} else this.NavigateTo(this.battlePage + ',battle_on.gif');
	return true;

}catch (e){gm.log("ERROR Raid :"+e);window.location ='http://apps.facebook.com/castle_age/raid.php';}
},

Battle:function(mode) {
	if (!this.CheckNotHiding("Battle")) {
//		gm.log("Not Hiding Mode: Safe To Wait For Monster.")
		this.SetDivContent('battle_mess','Safe To Wait For Monster');
		return false;
	}
	if (gm.getValue('WhenBattle') == 'No Monster' && mode != 'DemiPoints') {
		if ((gm.getValue('WhenMonster','') != 'Never') && gm.getValue('monsterToAttack') && !gm.getValue('monsterToAttack').match(/the deathrune siege/i)) {
			return false;
		}
	}
	if (!this.CheckStamina('Battle')) return false;

	if (this.WhileSinceDidIt('MyRankLast',60*60)) {
			gm.log('Visiting keep to get new rank');
			this.NavigateTo('keep');
			return true;
	}


	// Check if we should chain attack
	if (nHtml.FindByAttrContains(document.body,"img","src",'battle_victory.gif')) {
		if (this.SelectGeneral('BattleGeneral')) return true;
		if (gm.getValue('BattleType') == 'Invade')
			chainButton = this.CheckForImage('battle_invade_again.gif');
		else
			chainButton = this.CheckForImage('battle_duel_again.gif');

		if (chainButton && gm.getValue("BattleChainId",'') != '') {
			this.SetDivContent('battle_mess','Chain Attack In Progress');
			this.ClickBattleButton(chainButton);
			gm.setValue("BattleChainId",'')
			return true;
		}
	}

	if (!this.notSafeCount) this.notSafeCount = 0;

	if ( !(target = this.GetCurrentBattleTarget())) return false;
	target = target.toLowerCase();
	gm.log('Battle Target: '+target);

	if (this.SelectGeneral('BattleGeneral')) return true;
	switch (target) {
		case 'raid' :
			this.SetDivContent('battle_mess','Joining the Raid');
			if (this.NavigateTo(this.battlePage + ',raid','tab_raid_on.gif')) return true;
 			raidName = gm.getValue('raidToAttack','');
 			if (!(webSlice = caap.CheckForImage('dragon_title_owner.jpg'))) {
 				if ((engageButton = this.monsterEngageButtons[raidName])) {
					caap.Click(engageButton);
					return true;
				}
				else {
 					gm.log('Unable to engage raid ' + raidName)
					return false;
				}
			}
			if (this.monsterConfirmRightPage(webSlice,raidName)) return true;
			// The user can specify 'raid' in their Userid List to get us here. In that case we need to adjust NextBattleTarget when we are done
			if (gm.getValue('TargetType','') == "Userid List") {
				if (this.BattleFreshmeat('Raid')) {
					if (nHtml.FindByAttrContains(document.body,'span','class','result_body')) this.NextBattleTarget();
					if (this.notSafeCount > 10) {
						this.notSafeCount = 0;
						this.NextBattleTarget();
					}
					return true;
				} else return false;
			}
			return this.BattleFreshmeat('Raid');
		case 'freshmeat' :
			if (this.NavigateTo(this.battlePage,'battle_on.gif')) return true;
			this.SetDivContent('battle_mess','Battling ' + target);
			// The user can specify 'freshmeat' in their Userid List to get us here. In that case we need to adjust NextBattleTarget when we are done			
			if (gm.getValue('TargetType','') == "Userid List") {
				if (this.BattleFreshmeat('Freshmeat')) {
					if (nHtml.FindByAttrContains(document.body,'span','class','result_body')) this.NextBattleTarget();
					if (this.notSafeCount > 10) {
						this.notSafeCount = 0;
						this.NextBattleTarget();
					}
					return true;
				} else return false;
			}
			return this.BattleFreshmeat('Freshmeat');
		default:
			var dfl = gm.getValue('BattlesLostList','');
			if (dfl.indexOf(os+target+os) >= 0) {
				gm.log('Avoiding Losing Target: ' + target);
				this.NextBattleTarget();
				return true;
			}
			if (this.NavigateTo(this.battlePage,'battle_on.gif')) return true;
			this.SetDivContent('battle_mess','Battling User ' + target);
			if (this.BattleUserId(target)) {
				this.NextBattleTarget();
				return true;
			} return false;
	}
},

NextBattleTarget:function() {
	if (gm.getValue("BattleChainId",'')!='') {
		gm.setValue("BattleChainId",'');
		return;
	}

	var battleUpto=gm.getValue('BattleTargetUpto',0);
	gm.setValue('BattleTargetUpto',battleUpto+1);
},

GetCurrentBattleTarget:function() {
 	if (gm.getValue("BattleChainId","")) return gm.getValue("BattleChainId");

	if (gm.getValue('TargetType','') == 'Freshmeat') return 'Freshmeat';

	if (gm.getValue('TargetType','') == 'Raid') {
		if (gm.getValue('raidToAttack','')) {
			return 'Raid';
		} else {
			this.SetDivContent('battle_mess','No Raid To Attack');
			return false;
		}
	}

	if (!(target=gm.getValue('BattleTargets',""))) return false;

	var targets=target.split(/[\n,]/);
	var battleUpto=gm.getValue('BattleTargetUpto',0);
	if (battleUpto > targets.length-1) {
		battleUpto = 0;
		gm.setValue('BattleTargetUpto',0);
	}

	if (!targets[battleUpto]) return false;

	if (targets[battleUpto].toLowerCase() == 'raid') {
		if (gm.getValue('raidToAttack','')) {
			return 'Raid';
		} else {
			this.SetDivContent('battle_mess','No Raid To Attack');
			return false;
		}
	}

	gm.log('nth battle target:'+battleUpto+':'+targets[battleUpto]);
	return targets[battleUpto];
},
/////////////////////////////////////////////////////////////////////

//							ATTACKING MONSTERS

/////////////////////////////////////////////////////////////////////
group:function(label, max) {
    return {
        'label'   : label,
        'max'     : max,
        'count'   : 0
    };
},


//http://castleage.wikidot.com/monster for monster info
bosses:{
        'Deathrune'			: {duration: 168, ach: 500000, siege : 5, siegeClicks : [30,60,90,120,200]
							, siegeDam : [6600000,8250000,9900000,13200000,16500000]
							, siege_img : '/graphics/death_siege_small', fort: true, staUse:5},		
        'Elemental'			: {duration: 168, ach: 500000, siege : 5, siegeClicks : [30,60,90,120,200]
							, siegeDam : [6600000,8250000,9900000,13200000,16500000]
							, siege_img : '/graphics/earth_siege_small', fort: true, staUse:5
/*							, levels : {
								'Levels 90+'   : caap.group('90+: '  ,40),
								'Levels 60-90' : caap.group('60-90: ',30),
								'Levels 30-60' : caap.group('30-60: ',30),
								'Levels 1-30'  : caap.group('01-30: ',30)}
*/							},
        'Hydra'			: {duration: 168, ach: 500000, siege : 6, siegeClicks : [10,20,50,100,200,300]
							, siegeDam : [1340000,2680000,5360000,14700000,28200000,37520000]
							, siege_img : '/graphics/monster_siege_small'
/*							, levels : {
								'Levels 90+'   : caap.group('90+: '  ,30),
								'Levels 60-90' : caap.group('60-90: ',30),
								'Levels 30-60' : caap.group('30-60: ',30),
								'Levels 1-30'  : caap.group('01-30: ',40)}
*/							},
		'Legion'		: {duration: 168 , ach: 250, siege : 6,  siegeClicks : [10,20,40,80,150,300]
							, siegeDam : [3000,4500,6000,9000,12000,15000]
							, siege_img : '/graphics/castle_siege_small', fort: true, staUse:5},
        'Dragon'		: {duration: 72  , ach: 100000, siege : 0},
        'King'			: {duration: 72  , ach:  15000, siege : 0},
        'Terra'         : {duration: 72  , ach:  20000, siege : 0},
        'Queen'			: {duration: 48  , ach:  50000, siege : 1 , siegeClicks : [11], siegeDam : [500000], siege_img : '/graphics/boss_sylvanas_drain_icon.gif'},
        'Ravenmoore'	: {duration: 48  , ach: 500000, siege : 0},
        'Knight'		: {duration: 48  , ach:  30000, siege : 0},
        'Serpent'		: {duration: 72  , ach: 250000, siege : 0, fort: true, staUse:5},
        'Raid I'		: {duration: 88  , ach:     50, siege : 2, siegeClicks : [30,50], siegeDam : [200,500]
							, siege_img : '/graphics/monster_siege_', staUse:1},
        'Raid II'		: {duration: 144 , ach:     50, siege : 2, siegeClicks : [80,100], siegeDam : [300,1500]
							, siege_img : '/graphics/monster_siege_', staUse:1},
        'Mephistopheles': {duration: 48  , ach: 200000, siege : 0}
},
monster:{},
monsterEngageButtons:{},

parseCondition:function(type,conditions) {
	if (!conditions || conditions.toLowerCase().indexOf(':'+type) <0) return 0;
	var value = conditions.substring(conditions.indexOf(':'+type)+4).replace(/:.+/,'');
	if (/k$/i.test(value) || /m$/i.test(value))
		value = parseInt(value) * 1000 * (/\d+k/i.test(value) + /\d+m/i.test(value) * 1000);
	return parseInt(value);
},
checkMonsterEngage:function() {
	if(caap.CheckForImage('tab_monster_active.jpg') || caap.CheckForImage('raid_title')) {
		caap.checkMonsterDamage();
		return;
	}
	if (caap.CheckForImage('tab_monster_on.jpg'))
		page = 'battle_monster';
	else if (caap.CheckForImage('tab_raid_on.gif'))
		page = 'raid';
	else return;
	//gm.log('In check '+ page + ' engage');

	firstMonsterButtonDiv = caap.CheckForImage('dragon_list_btn_');
	if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
		if ((firstMonsterButtonDiv) && !(firstMonsterButtonDiv.parentNode.href.match('user='+gm.getValue('FBID','x'))
				|| firstMonsterButtonDiv.parentNode.href.match(/alchemy.php/))) {
			gm.log('On another player\'s keep.');
			return false;
		}
	} else {
		if ((firstMonsterButtonDiv) && !(firstMonsterButtonDiv.parentNode.href.match('user='+unsafeWindow.Env.user)
				|| firstMonsterButtonDiv.parentNode.href.match(/alchemy.php/))) {
			gm.log('On another player\'s keep.');
			return false;
		}
	}
	// get all buttons to check monsterObjectList
	var ss=document.evaluate(".//img[contains(@src,'dragon_list_btn_')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if (ss.snapshotLength==0) {
		gm.log('No monster buttons?  On wrong page?');
		return false;
	}
	// Review monsters and find attack and fortify button
	monsterList=[];
	for(var s=0; s<ss.snapshotLength; s++) {
		engageButtonName = ss.snapshotItem(s).src.match(/dragon_list_btn_\d/i)[0];
		monsterFull=nHtml.GetText(ss.snapshotItem(s).parentNode.parentNode.parentNode.parentNode).trim();
		monster=monsterFull.replace('Completed!','').replace(/Fled!/i,'').trim();
		monsterList.push(monster);

		// Make links for easy clickin'
		var url=ss.snapshotItem(s).parentNode.href;
		if (!(url && url.match(/user=/) && (url.match(/mpool=/) || url.match(/raid\.php/)))) continue;
		var mpool = ((url.match(/mpool=\d+/i)) ? '&mpool=' +url.match(/mpool=\d+/i)[0].split('=')[1] : '');
		var link = "<a href='http://apps.facebook.com/castle_age/" + page + ".php?user="
				+ url.match(/user=\d+/i)[0].split('=')[1] + mpool
				+ (((/=3/.test(mpool) || page == 'raid') && gm.getValue('DoSiege',true)) ? "&action=doObjective" : '') + "'>Link</a>";
		gm.setListObjVal('monsterOl',monster,'Link',link);
		gm.setListObjVal('monsterOl',monster,'page',page);

		switch (engageButtonName) {
			case 'dragon_list_btn_2' :
				gm.setListObjVal('monsterOl',monster,'status','Collect Reward');
				gm.setListObjVal('monsterOl',monster,'color','grey');
				break;
			case 'dragon_list_btn_3' :
				caap.monsterEngageButtons[monster] = ss.snapshotItem(s);
				break;
			case 'dragon_list_btn_4' :
				if (page == 'raid' && !(/!/.test(monsterFull))) {
					caap.monsterEngageButtons[monster] = ss.snapshotItem(s);
					break;
				}
				gm.setListObjVal('monsterOl',monster,'status','Complete');
				gm.setListObjVal('monsterOl',monster,'color','grey');
				break;
			default :
		}
	}
	gm.getList('monsterOl').forEach(function(monsterObj) {
		monster = monsterObj.split(vs)[0];
		if (monsterList.indexOf(monster)<0 && monsterObj.indexOf('page'+ls+page)>=0) gm.deleteListObj('monsterOl',monster);
	});
	caap.engageDashboard(true);
},

checkMonsterDamage:function() {
	// Check if on monster page
	if (!(webSlice=caap.CheckForImage('dragon_title_owner.jpg'))) return;
	//gm.log('In check monster damage');
	// Get name and type of monster
	var monster = nHtml.GetText(webSlice);
	monster = monster.substring(0,monster.indexOf('You have (')).trim();
	if (this.CheckForImage('raid_1_large.jpg')) monstType = 'Raid I';
	else if (this.CheckForImage('raid_b1_large.jpg')) monstType = 'Raid II';
	else monstType = /\w+$/i.exec(monster);
	if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
		if (nHtml.FindByAttrContains(webSlice,'a','href','id='+gm.getValue('FBID','x')))
			 monster = monster.replace(/.+'s /,'Your ');
	} else {
		if (nHtml.FindByAttrContains(webSlice,'a','href','id='+unsafeWindow.Env.user))
			 monster = monster.replace(/.+'s /,'Your ');
	}
	gm.setListObjVal('monsterOl',monster,'Type',monstType);
    // Extract info
    var time     = $("#app46755028429_monsterTicker").text().split(":")
      , boss_name, boss, group_name = '', attacker = '', phase;

	// Check for mana forcefield
	if ((img=caap.CheckForImage('bar_dispel'))) {
		var manaHealth = img.parentNode.style.width;
		manaHealth = manaHealth.substring(0,manaHealth.length-1);	
		manaHealth = 100 - Number(manaHealth);
		gm.setListObjVal('monsterOl',monster,'Fort%',(Math.round(manaHealth*10))/10);
	}	
		
	// Check fortify stuff
	if ((img=caap.CheckForImage('seamonster_ship_health'))) {
		var shipHealth = img.parentNode.style.width;
		shipHealth = shipHealth.substring(0,shipHealth.length-1);
		if (monstType == "Legion" || monstType == 'Elemental') {
			if ((img = caap.CheckForImage('repair_bar_grey'))) {
				var extraHealth = img.parentNode.style.width;
				extraHealth = extraHealth.substring(0,extraHealth.length-1);
				shipHealth = Math.round(Number(shipHealth) * (100/(100 - Number(extraHealth))));
			}
		}
		gm.setListObjVal('monsterOl',monster,'Fort%',(Math.round(shipHealth*10))/10);
	}

	// Get damage done to monster
	var webSlice=nHtml.FindByAttrContains(document.body,"td","class","dragonContainer");
	if (webSlice) {
		webSlice=nHtml.FindByAttrContains(webSlice,"td","valign","top");
		if (webSlice) {
			if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
				webSlice=nHtml.FindByAttrContains(webSlice,"a","href","keep.php?user=" + gm.getValue('FBID','x'));
			} else {
				webSlice=nHtml.FindByAttrContains(webSlice,"a","href","keep.php?user=" + unsafeWindow.Env.user);
			}
			if (webSlice) {
				if (monstType=="Serpent" || monstType=="Elemental" || monstType=="Deathrune") {
					var damList=nHtml.GetText(webSlice.parentNode.nextSibling.nextSibling).trim().split("/");
					gm.setListObjVal('monsterOl',monster,'Damage',caap.NumberOnly(damList[0]));
					gm.setListObjVal('monsterOl',monster,'Fort',caap.NumberOnly(damList[1]));
				} else {
					gm.setListObjVal('monsterOl',monster,'Damage',caap.NumberOnly(nHtml.GetText(webSlice.parentNode.nextSibling.nextSibling).trim()));
				}
				var damDone = gm.getListObjVal('monsterOl',monster,'Damage');
				//if (damDone) gm.log("Damage done = " + gm.getListObjVal('monsterOl',monster,'Damage'));
			} else gm.log("Player hasn't done damage yet");
		} else gm.log("couldn't get top table");
	} else gm.log("couldn't get dragoncontainer");

	time     = $("#app46755028429_monsterTicker").text().split(":");
    if(time.length == 3) {
        var miss = $.trim($("#app46755028429_action_logs").prev().children().eq(3).children().eq(2).children().eq(1).text().replace(/.*:\s*Need (\d+) more answered calls to launch/, "$1"));
		gm.setListObjVal('monsterOl',monster,'TimeLeft',time[0] + ":" + time[1]);
		if ((hpBar = $("img[src*=/graphics/monster_health_background.jpg]").parent().css("width"))) {
			var hp   = Math.round(hpBar.replace(/%/,'')*10)/10; //fix two 2 decimal places
			gm.setListObjVal('monsterOl',monster,'Damage%',hp);
			if (!(boss = caap.bosses[monstType])) {
				gm.log('Unknown monster');
				return;
			}
			var T2K = (100/(100-hp))*(boss.duration - (parseInt(time[0]) + (parseInt(time[1])*0.0166)) );
			T2K = Math.round(T2K*10)/10; //fix two 1 decimal place
			gm.setListObjVal('monsterOl',monster,'T2K',T2K.toString()+ ' hr');
		}
		if (boss && boss.siege) {
			phaseText=Math.min($("img[src*="+boss.siege_img+"]").size()+1,boss.siege)+"/"+boss.siege+ " need " + (isNaN(+miss) ? 0 : miss);
			gm.setListObjVal('monsterOl',monster,'Phase',phaseText);
		}
	}
	caap.engageDashboard(true);
},

selectMonster:function() {
	currentMonster = gm.getValue('monsterToAttack','');
	currentRaid = gm.getValue('raidToAttack','');
	gm.setValue('monsterToAttack','');
	gm.setValue('monsterToFortify','');
	gm.setValue('raidToAttack','');
	
	monsterList = gm.getList('monsterOl').filter(function(monsterObj) {
		return !(gm.getListObjVal('monsterOl',monsterObj.split(vs)[0],'status'));
	});
	monsterList.forEach(function(monsterObj) {
		gm.setListObjVal('monsterOl',monsterObj.split(vs)[0],'color','black');
		gm.setListObjVal('monsterOl',monsterObj.split(vs)[0],'conditions','none');	
	});

	var firstOverAch = [];	
	var firstUnderDmg = [];
	var refreshList = false;
	if (gm.getValue('SerializeRaidsAndMonsters',false))  selectTypes = ['any'];
	else selectTypes = ['battle_monster','raid'];
	
	for (var s in selectTypes) {
		var selectType = selectTypes[s];
		// The extra apostrophe at the end of attack order makes it match any "soandos's monster" so it always selects a monster if available
		switch (selectType) {
			case 'battle_monster' : 
				var attackOrderList=gm.getValue('AttackOrder','').split(/[\n,]/).concat('your',"'");
				break;
			case 'raid' :	
				var attackOrderList=gm.getValue('RaidOrder','').split(/[\n,]/).concat('your',"'");
				break;
			default :
				var attackOrderList1=gm.getValue('AttackOrder','').split(/[\n,]/);
				var attackOrderList2=gm.getValue('RaidOrder','').split(/[\n,]/).concat('your',"'");
				var attackOrderList=attackOrderList1.concat(attackOrderList2);
		}
		
		for (var p in attackOrderList) {
			if (!(attackOrderList[p].trim())) continue;
			attackOrderName = attackOrderList[p].match(/^[^:]+/).toString().trim().toLowerCase();
			for (var m in monsterList) {
				monster = monsterList[m].split(vs)[0];
				if (gm.getListObjVal('monsterOl',monster,'conditions')!='none') continue;
				if (gm.getListObjVal('monsterOl',monster,'status')) {
					gm.setListObjVal('monsterOl',monster,'color','grey');
					continue;
				}
				if (monster.toLowerCase().indexOf(attackOrderName)<0) continue;
				monstPage = gm.getListObjVal('monsterOl',monster,'page');
				if (selectType != 'any' && monstPage != selectType) continue;
				
				monsterConditions= attackOrderList[p].replace(/^[^:]+/,'').toString().trim();
				gm.setListObjVal('monsterOl',monster,'conditions',monsterConditions);
				damDone = gm.getListObjVal('monsterOl',monster,'Damage',0);
				monstType = gm.getListObjVal('monsterOl',monster,'Type');
				
				if ((boss = caap.bosses[monstType]))
					achLevel = caap.parseCondition('ach',monsterConditions) || boss.ach;
				else achLevel = caap.parseCondition('ach',monsterConditions);
				maxDamage = caap.parseCondition('max',monsterConditions);
				monsterFort = parseFloat(gm.getListObjVal('monsterOl',monster,'Fort%',100));
				
				if (maxDamage && damDone>maxDamage) {
					gm.setListObjVal('monsterOl',monster,'color','red');
					if (monster == currentMonster || monster == currentRaid) refreshList = true;
				}	
				else if (monsterFort < caap.GetNumber('MinFortToAttack',1))
					gm.setListObjVal('monsterOl',monster,'color','purple');
				else if (damDone>achLevel && gm.getValue('AchievementMode')) {
					if (!firstOverAch[selectType]) firstOverAch[selectType] = monster;
				}
				else if (!firstUnderDmg[selectType]) firstUnderDmg[selectType] = monster;
				
				maxToFortify = caap.parseCondition('f%',monsterConditions) || caap.GetNumber('MaxToFortify',0);
				if (monsterFort < maxToFortify && !gm.getValue('monsterToFortify','')) {
					gm.setListObjVal('monsterOl',monster,'color','blue');
					gm.setValue('monsterToFortify',monster);
				}
			}
		}
	}
	
 	selectTypes.forEach(function(selectType) {
 		if (!(monster = firstUnderDmg[selectType])) 
			monster = firstOverAch[selectType];
		
 		if (monster) {
			monstPage = gm.getListObjVal('monsterOl',monster,'page');
			atkSetting = (monstPage == 'battle_monster')?'monsterToAttack':'raidToAttack'	
			gm.setValue(atkSetting,monster);
			
 			gm.setListObjVal('monsterOl',monster,'color','green');	
	
			monsterConditions = gm.getListObjVal('monsterOl',monster,'conditions');
			monstType = gm.getListObjVal('monsterOl',monster,'Type','Dragon');
		//	gm.log(' monster type 2 '+ monstType + ' monster '  + monster);
			if (atkSetting == 'monsterToAttack') {
				if (caap.bosses[monstType] && caap.bosses[monstType].staUse) 
					gm.setValue('MonsterStaminaReq',caap.bosses[monstType].staUse);
				else if ((caap.InLevelUpMode() && caap.stats.stamina.num>=10) || monsterConditions.match(/:pa/i)) 
					gm.setValue('MonsterStaminaReq',5);
				else if (monsterConditions.match(/:sa/i)) 
					gm.setValue('MonsterStaminaReq',1);
				else if (gm.getValue('PowerAttack')) 
					gm.setValue('MonsterStaminaReq',5);
				else gm.setValue('MonsterStaminaReq',1);
			} else {
				// Switch RaidPowerAttack 
				if (gm.getValue('RaidPowerAttack',false) || monsterConditions.match(/:pa/i))
					gm.setValue('RaidStaminaReq',5);
				else if (caap.bosses[monstType] && caap.bosses[monstType].staUse)
					gm.setValue('RaidStaminaReq',caap.bosses[monstType].staUse);
				else gm.setValue('RaidStaminaReq',1); 	
			}
		}
	});
	
	if (refreshList && !gm.getValue('monsterToAttack','') && !gm.getValue('raidToAttack','')) {
		gm.setValue('monsterReview',0);
		gm.setValue('monsterReviewCounter',-2);
	}	
			
},	
monsterConfirmRightPage:function(webSlice,monster) {
	// Confirm name and type of monster
	var monsterOnPage = nHtml.GetText(webSlice);
	monsterOnPage = monsterOnPage.substring(0,monsterOnPage.indexOf('You have (')).trim();
	if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
		if (nHtml.FindByAttrContains(webSlice,'a','href','id='+gm.getValue('FBID','x')))
			 monsterOnPage = monsterOnPage.replace(/.+'s /,'Your ');
	} else {
		if (nHtml.FindByAttrContains(webSlice,'a','href','id='+unsafeWindow.Env.user))
			 monsterOnPage = monsterOnPage.replace(/.+'s /,'Your ');
	}
	if (monster != monsterOnPage) {
		gm.log('Looking for ' + monster +  ' but on ' + monsterOnPage + '. Going back to select screen');
		monstPage = gm.getListObjVal('monsterOl',monster,'page');
		return this.NavigateTo('keep,' + monstPage);
	}
},
Monsters:function() {
///////////////// Reivew/Siege all monsters/raids \\\\\\\\\\\\\\\\\\\\\\

	if (!this.CheckNotHiding("Monster") && this.CheckStamina('Monster',1)) {
		gm.log("Not Hiding Mode: We're not safe. Go battle.")
		this.SetDivContent('battle_mess','Not Safe For Monster. Battle!');
		return false;
	}

	// Review all active monsters, try siege weapons on the way
	if (this.WhileSinceDidIt('monsterReview',60*60)
			&& (this.CheckStamina('Monster',1) || gm.getValue('monsterReview')==0)) {
		counter = parseInt(gm.getValue('monsterReviewCounter',-2));
		// Check Monster page
		if (counter == -3) {
			gm.setValue('monsterOl','');
			gm.setValue('monsterReviewCounter',++counter);
		}
		if (counter == -2) {
			if (this.NavigateTo('keep,battle_monster','tab_monster_on.jpg')) return true;
			gm.setValue('monsterReviewCounter',++counter);
		}
		// Check Raid page
		if (counter == -1)
			if (this.NavigateTo(this.battlePage + ',raid','tab_raid_on.gif')) return true;
		// Check raids and monster individual pages
		monsterObjList = gm.getList('monsterOl');
		while ( ++counter < monsterObjList.length) {
			if (!(monsterObjList[counter])) continue;
			monster = monsterObjList[counter].split(vs)[0];
			this.SetDivContent('battle_mess','Reviewing/sieging '+ monster);
			this.SetDivContent('battle_mess','Reviewing/sieging '+ monster);
			gm.setValue('monsterReviewCounter',counter);
			if ((link = gm.getListObjVal('monsterOl',monster,'Link')))
				caap.VisitUrl(link.split("'")[1]);
			return true;
		}
		this.JustDidIt('monsterReview');
		gm.log('No monsters to review/siege.');
		gm.setValue('monsterReviewCounter',-3);
	}
	if (!this.WhileSinceDidIt('NoMonsterToAttack',60*5)) return false;


///////////////// Individual Monster Page \\\\\\\\\\\\\\\\\\\\\\

// Establish a delay timer when we are 1 stamina below attack level. Timer includes 5 min for stamina tick plus user defined random interval
	if (!this.InLevelUpMode() && this.stats.stamina.num == (gm.getValue('MonsterStaminaReq',1) - 1)
			&& this.CheckTimer('battleTimer') && gm.getValue('seedTime',0) > 0) {
		this.SetTimer('battleTimer',5*60+Math.floor(Math.random()*gm.getValue('seedTime',0)));
		this.SetDivContent('battle_mess','Monster Delay Until ' + this.DisplayTimer('battleTimer'));
		return false;
	}

	if (!this.CheckTimer('battleTimer')) {
		if(this.stats.stamina.num < gm.getValue('MaxIdleStamina',this.stats.stamina.max)) {
			this.SetDivContent('fight_mess','Monster Delay Until ' + this.DisplayTimer('battleTimer'));
			return false;
		}
	}

	// Check to see if we should fortify, attack monster, or battle raid

	if ( (monster = gm.getValue('monsterToFortify')) && this.stats.energy.num >= 10) {
		fightMode = gm.setValue('fightMode','Fortify');
 	} else if ( (monster = gm.getValue('monsterToAttack')) 
 			&& this.CheckStamina('Monster',gm.getValue('MonsterStaminaReq',1))
 			&& gm.getListObjVal('monsterOl',monster,'page')=='battle_monster') {
		fightMode = gm.setValue('fightMode','Monster');
	} else return false;


	// Set right general

	if (this.SelectGeneral(fightMode +'General')) return true;

	// Check if on engage monster page
	if ((webSlice=this.CheckForImage('dragon_title_owner.jpg'))) {
		if (this.monsterConfirmRightPage(webSlice,monster)) return true;

		// Find the attack or fortify button
		if (fightMode == 'Fortify') {
			if (!(attackButton=this.CheckForImage('seamonster_fortify.gif'))) {
				if (!(attackButton=this.CheckForImage('button_dispel.gif'))) 
					attackButton = this.CheckForImage('attack_monster_button3.jpg');
			}	
		} else if (gm.getValue('MonsterStaminaReq',1)==1) {
			// not power attack only normal attacks
			if(!(attackButton = this.CheckForImage('attack_monster_button.jpg'))) {
				if(!(attackButton = this.CheckForImage('seamonster_power.gif'))) {
					attackButton = this.CheckForImage('attack_monster_button2.jpg');
					if (attackButton) gm.setValue('MonsterStaminaReq',5);
				}
			}
		}else{
			// power attack or if not seamonster power attack or if not regular attack - need case for seamonster regular attack?
			if(!(attackButton = this.CheckForImage('attack_monster_button2.jpg'))) {
				if(!(attackButton = this.CheckForImage('seamonster_power.gif'))) {
					attackButton = this.CheckForImage('attack_monster_button.jpg');
					if (attackButton) gm.setValue('MonsterStaminaReq',1);
				}
			}
		}
		if (attackButton) {
			if (fightMode == 'Fortify')
				attackMess = 'Fortifying ' + monster;
			else attackMess = (gm.getValue('MonsterStaminaReq',1)==5?'Power':'Single') + ' Attacking ' + monster;
			gm.log(attackMess);
			this.SetDivContent('battle_mess',attackMess);
			gm.setValue('ReleaseControl',true);
			caap.Click(attackButton,8000);
			return true;
		}
	}
///////////////// Check For Monster Page \\\\\\\\\\\\\\\\\\\\\\

	if (this.NavigateTo('keep,battle_monster','tab_monster_on.jpg')) return true;

	firstMonsterButtonDiv = this.CheckForImage('dragon_list_btn_');
	if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
		if ((firstMonsterButtonDiv) && !(firstMonsterButtonDiv.parentNode.href.match('user='+gm.getValue('FBID','x'))
				|| firstMonsterButtonDiv.parentNode.href.match(/alchemy.php/))) {
			gm.log('On another player\'s keep.');
			return this.NavigateTo('keep,battle_monster');
		}
	} else {
		if ((firstMonsterButtonDiv) && !(firstMonsterButtonDiv.parentNode.href.match('user='+unsafeWindow.Env.user)
				|| firstMonsterButtonDiv.parentNode.href.match(/alchemy.php/))) {
			gm.log('On another player\'s keep.');
			return this.NavigateTo('keep,battle_monster');
		}
	}

	engageButton = this.monsterEngageButtons[monster];
	if (engageButton) {
		this.SetDivContent('battle_mess','Opening ' + monster);
		caap.Click(engageButton);
		return true;
	} else {
		this.JustDidIt('NoMonsterToAttack');
		gm.log('No "Engage" button for ' + monster);
		return false;
	}
},

/////////////////////////////////////////////////////////////////////

//							COMMON FIGHTING FUNCTIONS

/////////////////////////////////////////////////////////////////////

DemiPoints:function() {
	if (!gm.getValue('DemiPointsFirst')) return false;

	if (this.CheckForImage('battle_on.gif')) {
		if (smallDeity = this.CheckForImage('symbol_tiny_1.jpg')) {
			demiPointList = nHtml.GetText(smallDeity.parentNode.parentNode.parentNode).match(/\d+ \/ 10/g);
			gm.setList('DemiPointList',demiPointList);
			gm.log('DemiPointList: ' + demiPointList);
			if (this.CheckTimer('DemiPointTimer')) {
				gm.log('Set DemiPointTimer to 24 hours, and check if DemiPoints done');
				this.SetTimer('DemiPointTimer', 6*60*60);
			}
			gm.setValue('DemiPointsDone',true);
			for (var demiPtItem in demiPointList) {
				if (demiPointList[demiPtItem] != '10 / 10' && gm.getValue('DemiPoint'+demiPtItem)) {
					gm.setValue('DemiPointsDone',false);
					break;
				}
			}
			gm.log('Demi Point Timer '+this.DisplayTimer('DemiPointTimer')+' demipoints done is  '+gm.getValue('DemiPointsDone',false));
		}
	}
	if (this.CheckTimer('DemiPointTimer')) return this.NavigateTo(this.battlePage,'battle_on.gif');

	if (!gm.getValue('DemiPointsDone',true)) return this.Battle('DemiPoints');
},

minutesBeforeLevelToUseUpStaEnergy : 5,

InLevelUpMode:function() {
	var now = new Date();
	if (!(this.stats.levelTime)) return false;
	if ((this.stats.levelTime.getTime() - now.getTime())<this.minutesBeforeLevelToUseUpStaEnergy*60*1000) {
		return true;
	}
	return false;
},
CheckStamina:function(battleOrBattle,attackMinStamina) {
	if (!attackMinStamina) attackMinStamina=1;
	when = gm.getValue('When' + battleOrBattle,'');
	if (when == 'Never') return false;

	if(!this.stats.stamina || !this.stats.health) {
		this.SetDivContent('battle_mess','Health or stamina not known yet.');
		return false;
	}

	if(this.stats.health.num<10) {
		this.SetDivContent('battle_mess',"Need health to " + battleOrBattle.toLowerCase() + ": " + this.stats.health.num + "/10");
		return false;
	}

	if (when == 'At X Stamina') {
		staminaMF = battleOrBattle+'Stamina';
		if (gm.getValue('BurnMode_'+staminaMF,false)|| this.stats.stamina.num >= gm.getValue('X' + staminaMF,1)) {
			if (this.stats.stamina.num < attackMinStamina || this.stats.stamina.num <=gm.getValue('XMin' + staminaMF,0)){
				gm.setValue('BurnMode_' +staminaMF,false);
				return false;
			}
			this.SetDivContent('battle_mess','Burning stamina');
			gm.setValue('BurnMode_' + staminaMF,true);
			return true;
		}else gm.setValue('BurnMode_' + staminaMF,false);
		if (this.InLevelUpMode() && this.stats.stamina.num>=attackMinStamina) {
			this.SetDivContent('battle_mess','Burning stamina to level up');
			return true;
		}
		this.SetDivContent('battle_mess','Waiting for stamina: '+this.stats.stamina.num+"/"+gm.getValue('X' + staminaMF,1));
		return false;
	}

	if (when == 'At Max Stamina') {
		if (!gm.getValue('MaxIdleStamina', 0)) {
			gm.log("Changing to idle general to get Max Stamina");
			this.PassiveGeneral();
		}
		if (this.stats.stamina.num >= gm.getValue('MaxIdleStamina')) {
			this.SetDivContent('battle_mess','Using max stamina');
			return true;
		}
		if (this.InLevelUpMode() && this.stats.stamina.num>=attackMinStamina) {
			this.SetDivContent('battle_mess','Burning all stamina to level up');
			return true;
		}
		this.SetDivContent('battle_mess','Waiting for max stamina: '+this.stats.stamina.num+"/"+gm.getValue('MaxIdleStamina'));
		return false;
	}
	if (this.stats.stamina.num>=attackMinStamina) return true;
	this.SetDivContent('battle_mess','Waiting for more stamina: '+this.stats.stamina.num+"/"+attackMinStamina);
	return false;
},
CheckNotHiding:function(attackType) {
	if ((gm.getValue('WhenBattle') != "Not Hiding") || (gm.getValue('WhenMonster') != "Not Hiding")) return true;

	if (gm.getValue('BattleType') == 'Invade') chainButton = this.CheckForImage('battle_invade_again.gif');
	else chainButton = this.CheckForImage('battle_duel_again.gif');
	if (chainButton) {
		if (attackType == "Monster") return false;
		if (attackType == "Battle") return true;
	}

	if (gm.getValue('TargetType') == 'Raid' && !gm.getValue('raidToAttack','')) {
		if (attackType == "Monster") return true;
		if (attackType == "Battle") return false;
	}

	// The lower the risk constant, the more you stay in hiding
	var riskConstant = 1.7
	// Formula to calculate when to use your stamina for hiding
	// If (health - (estimated dmg from next atack) puts us below 10)  AND (current stamina can reach 5 using staminatime/healthtime ratio) then stamina can be used/saved for Monster

	if ((this.stats.health.num - ((this.stats.stamina.num - 1) * riskConstant) < 10) && (this.stats.stamina.num * (5/3) >= 5)) {
		if (attackType == "Monster") return true;
		if ((attackType == "Battle") && (!gm.getValue('monsterToAttack'))) return true;
		return false;
	} else {
		if (attackType == "Battle") return true;
		return false;
	}
},


/////////////////////////////////////////////////////////////////////

//							MONSTER FINDER

/////////////////////////////////////////////////////////////////////

monstArgs:{
		'doaid'			:{fname:'Any Weapon Aid', sname:'Aid', urlid:'doObjective'},
		'urlix'			:{fname:'Any Monster', sname:'Any',urlid:'user'},
		'legio'			:{fname:'Battle of the Dark Legion', sname:'Legion', nname:'castle', imgid:'cta_castle_', twt2: 'corc_'},
		'hydra'			:{fname:'Cronus, The World Hydra ', sname:'Cronus', nname:'hydra', imgid:'twitter_hydra_objective', twt2: 'hydra_'},
		'earth'			:{fname:'Genesis, The Earth Elemental ', sname:'Genesis', nname:'earthelemental', imgid:'cta_earth_', twt2: 'earth_'},
		'kull'			:{fname:'Kull, the Orc Captain', sname:'Kull', nname:'captain', imgid:'cta_orc_captain.gif', twt2: 'bosscaptain'},
		'gilda'			:{fname:'Gildamesh, the Orc King', sname:'Gildamesh', nname:'king', imgid:'cta_orc_king.gif', twt2: 'bossgilda'},
		'colos'			:{fname:'Colossus of Terra', sname:'Colossus', nname:'stone', imgid:'cta_stone.gif', twt2: 'bosscolossus'},
		'sylva'			:{fname:'Sylvanas the Sorceress Queen', sname:'Sylvanas', nname:'sylvanas', imgid:'cta_sylvanas.gif', twt2: 'bosssylvanus'},
		'mephi'			:{fname:'Mephistophles', sname:'Mephisto', nname:'mephi', imgid:'cta_mephi.gif', twt2: 'bossmephistopheles'},
		'keira'			:{fname:'Keira', sname:'keira', nname:'keira', imgid:'cta_keira.gif', twt2: 'boss_img'},
		'lotus'			:{fname:'Lotus Ravenmoore', sname:'Ravenmoore', nname:'lotus', imgid:'cta_lotus.gif', twt2: 'bosslotus_'},
		'skaar'			:{fname:'Skaar Deathrune',sname:'Deathrune', nname:'skaar', imgid:'cta_death_',twt2: 'death_', deadimg: 'cta_death_dead.gif'},
		'serps'			:{fname:'Any Serpent', sname:'Serpent', nname:'seamonster', imgid:'twitter_seamonster_', twt2: 'sea_'},
		'eserp'			:{fname:'Emerald Serpent', sname:'Emerald Serpent', nname:'greenseamonster', imgid:'twitter_seamonster_green_1', twt2: 'sea_'},
		'sserp'			:{fname:'Saphire Serpent', sname:'Saphire Serpent', nname:'blueseamonster', imgid:'twitter_seamonster_blue_1', twt2: 'sea_'},
		'aserp'			:{fname:'Amethyst Serpent', sname:'Amethyst Serpent', nname:'purpleseamonster', imgid:'twitter_seamonster_purple_1', twt2: 'sea_'},
		'rserp'			:{fname:'Ancient Serpent', sname:'Ancient Serpent', nname:'redseamonster', imgid:'twitter_seamonster_red_1', twt2: 'sea_'},
		'drags'			:{fname:'Any Dragon', sname:'Dragon', nname:'drag', imgid:'_dragon.gif', twt2: 'dragon_'},
		'edrag'			:{fname:'Emerald Dragon', sname:'Emerald Dragon', nname:'greendragon', imgid:'cta_green_dragon.gif', twt2: 'dragon_'},
		'fdrag'			:{fname:'Frost Dragon', sname:'Frost Dragon', nname:'bluedragon', imgid:'cta_blue_dragon.gif', twt2: 'dragon_'},
		'gdrag'			:{fname:'Gold Dragon', sname:'Gold Dragon', nname:'yellowdragon', imgid:'cta_yellow_dragon.gif"', twt2: 'dragon_'},
		'rdrag'			:{fname:'Ancient Red Dragon', sname:'Red Dragon', nname:'reddragon', imgid:'cta_red_dragon.gif', twt2: 'dragon_'},
		'deas'			:{fname:'Any Deathrune Raid', sname:'Deathrune Raid', nname:'deathrune', imgid:'raid_deathrune_', twt2: 'deathrune_'},
		'a1dea'			:{fname:'Deathrune Raid I Part 1', sname:'Deathrune Raid A1', nname:'deathrunea1', imgid:'raid_deathrune_a1.gif', twt2: 'deathrune_'},
		'a2dea'			:{fname:'Deathrune Raid I Part 2', sname:'Deathrune Raid A2', nname:'deathrunea2', imgid:'raid_deathrune_a2.gif', twt2: 'deathrune_'},
		'b1dea'			:{fname:'Deathrune Raid II Part 1', sname:'Deathrune Raid B1', nname:'deathruneb1', imgid:'raid_deathrune_b1.gif', twt2: 'deathrune_'},
		'b2dea'			:{fname:'Deathrune Raid II Part 2', sname:'Deathrune Raid B2', nname:'deathruneb2', imgid:'raid_deathrune_b2.gif', twt2: 'deathrune_'},
},

MonsterFinder:function(){
	if(!gm.getValue("MonsterFinderUse",true)) return false;
	//gm.log("URL: " + window.location.href);
	
	var urlix = gm.getValue("urlix","").replace("~","");
	
	if (urlix == "" && gm.getValue("mfStatus","") != "OpenMonster") {
				gm.setValue("mfStatus","");
				gm.log("Resetting monster finder");
	}
	
	 if(gm.getValue("MonsterFinderUse",true) && this.stats.stamina.num >= gm.getValue("MonsterFinderMinStam",20) && this.stats.health.num >= 10){
		gm.log("Enough Stamina for Monster Finder");
		if(window.location.href.indexOf("filter=app_46755028429") < 0 ) { 
			var mfstatus = gm.getValue("mfStatus","");
			if(mfstatus =="OpenMonster") {
				caap.CheckMonster();
				return true;
			} else if (mfstatus =="MonsterFound"){
				caap.VisitUrl("http://apps.facebook.com/castle_age" + gm.getValue("navLink"));
				gm.setValue("mfStatus","");
				return true;
			} else if ( (mfstatus == "TestMonster" && this.WhileSinceDidIt('checkedFeed',60*60*2)) || (!this.WhileSinceDidIt('checkedFeed',60*5)) ){
				caap.selectMonst();
			} else {	
				caap.VisitUrl("http://www.facebook.com/?filter=app_46755028429&show_hidden=true&ignore_self=true",0);	
				gm.setValue("mfStatus","MFOFB");
				return false;
			}
		}
	} else { 
		//gm.log("Not Enough Stamina/Life For Monster Finder");
		return false;
	}
	
},

MonsterFinderOnFB:function(){
	if (gm.getValue("mfStatus","")!="MFOFB") {return false}
	
	gm.setValue("mfStatus","Running");

	var delayPer = 10000, iterations = 2;
	
	gm.setValue("delayPer", delayPer);
	gm.setValue("iterations", iterations);
	gm.setValue("iterationsRun", 0);
	
	gm.log("Set mostRecentFeed");
	this.JustDidIt("checkedFeed");
	
	this.bottomScroll();
},


CheckMonster:function(){
	//Look for Attack Button
	if(gm.getValue("mfStatus")!="OpenMonster"){return false};
	gm.log("Checking Monster: " + gm.getValue("navLink"));
	if(!(attackButton = this.CheckForImage('attack_monster_button.jpg'))) {
		if(!(attackButton = this.CheckForImage('seamonster_power.gif'))) {
			if(!(attackButton = this.CheckForImage('attack_monster_button2.jpg'))) {
				if(!(attackButton = this.CheckForImage('seamonster_power.gif'))) {
					if(!(attackButton = this.CheckForImage('attack_monster_button2.jpg'))) {
						if(!(attackButton = this.CheckForImage('attack_monster_button.jpg'))) {
							attackButton = this.CheckForImage('raid_attack_button.gif');
						}
					}
				}
			}
		}
	}

	if (attackButton) {
		var dam = this.checkMonsterDamage();
		//var dam = this.monstDamage();
		gm.log("Found Attack Button.  Dam: " + dam);
		if (!dam) {
			gm.log("No Damage to monster, Attacking");
			caap.Click(attackButton);
			gm.setValue("urlixc", gm.getValue("urlixc","~") + "~" + gm.getValue("navLink").replace("http://apps.facebook.com/castle_age",""));
			this.maintainUrl(gm.getValue("navLink").replace("http://apps.facebook.com/castle_age",""));
			gm.setValue("mfStatus","MonsterFound");
			this.DeceiveDidIt("NoMonsterToAttack");
			gm.setValue("navLink","");
			gm.setValue('LastAction',"Idle");
			
			return true;
		} else {
			gm.log("Already attacked this monster, find new one");
			gm.setValue("urlixc", gm.getValue("urlixc","~") + "~" + gm.getValue("navLink").replace("http://apps.facebook.com/castle_age",""));
			this.maintainUrl(gm.getValue("navLink").replace("http://apps.facebook.com/castle_age",""));
			gm.setValue("mfStatus","TestMonster");
			gm.setValue("waitMonsterLoad",0);
			return true;
		}
	} else {
		gm.log("No Attack Button");
		if (gm.getValue("waitMonsterLoad",0) < 2) {
			gm.log("No Attack Button, Pass" + gm.getValue("waitMonsterLoad"));
			gm.setValue("waitMonsterLoad", gm.getValue("waitMonsterLoad",0) + 1);
			gm.setValue("LastAction","Idle");
			return true;
		} else {
			gm.log("No Attack Button, Find New Monster");
			gm.setValue("urlixc", gm.getValue("urlixc","~") + gm.getValue("navLink").replace("http://apps.facebook.com/castle_age",""));
			this.maintainUrl(gm.getValue("navLink").replace("http://apps.facebook.com/castle_age",""));
			gm.setValue("mfStatus","TestMonster");
			gm.setValue("waitMonsterLoad",0);
			return true;
		}
	}
	
},

monstDamage:function() {	// Get damage done to monster
	if ((webSlice=this.CheckForImage('dragon_title_owner.jpg')) && attackButton) {

		// Get name and type of monster
		var monsterName = nHtml.GetText(webSlice);
		var monsterName = monsterName.substring(0,monsterName.indexOf('You have (')).trim();
		var monstType = /\w+$/i.exec(monsterName);

		var webSlice=nHtml.FindByAttrContains(document.body,"td","class","dragonContainer");
		if (webSlice) {
			webSlice=nHtml.FindByAttrContains(webSlice,"td","valign","top");
			if (webSlice) {
				webSlice=nHtml.FindByAttrContains(webSlice,"a","href","keep.php?user=" + unsafeWindow.Env.user);
				if (webSlice) {
					if ( monstType=="Serpent") {
						var damList=nHtml.GetText(webSlice.parentNode.parentNode).trim().split("/");
						var damDone = this.NumberOnly(damList[0]) + this.NumberOnly(damList[1]);
					} else {
						var damDone = this.NumberOnly(nHtml.GetText(webSlice.parentNode.parentNode).trim())
					}
					gm.log("Damage done = " + damDone);
				} else gm.log("couldn't get Damage done slice");
			} else gm.log("couldn't get top table");
		} else gm.log("couldn't get dragoncontainer");
	}
	return damDone;
},

mfMain : function() {
	gm.log("Do Stuff " + new Date() );
	if(gm.getValue("urlix","") == "") {this.clearLinks();}
	//this.maintainAllUrl();
	//this.redirectLinks();
	this.handleCTA();
	gm.log("Scroll Up");
	nHtml.ScrollToTop();
	gm.log("Select Monster");
	this.selectMonst();
},

redirectLinks : function () { 
	for (var x = 0; x < document.getElementsByTagName("a").length; x++)	{	
		document.getElementsByTagName('a')[x].target="child_frame";		
	}
},

bottomScroll: function() {
	nHtml.ScrollToBottom();
	//gm.log("Scroll To Bottom " + new Date() );
	nHtml.setTimeout(function(){caap.olderPosts();}, gm.getValue("delayPer", 60000));
},

olderPosts: function() {
	if (itRun > 0) {
    var showMore = nHtml.getX('//a[@class=\'PagerMoreLink\']', document, xpath.unordered);
	showMore.click();
	}
	//this.NavigateTo("Older Posts");
	var itRun = gm.getValue("iterationsRun")+1;
	gm.setValue("iterationsRun", itRun);
	gm.log("Get More Iteration " + gm.getValue("iterationsRun") + " of " + gm.getValue("iterations") + new Date() );
	if (gm.getValue("iterationsRun") < gm.getValue("iterations")) {
		nHtml.setTimeout(function(){caap.bottomScroll();}, gm.getValue("delayPer", 60000));
	} else {
		//gm.log("Made it Here, Try mfMain");
		nHtml.setTimeout(function(){caap.mfMain();}, gm.getValue("delayPer", 120000));
	}
},

selectMonst: function() { 
	gm.log("Select Monst Function");
	var monstPriority = gm.getValue("MonsterFinderOrder") ;
	
	gm.log("Monst Priority: " + monstPriority);
	
	var monstArray = monstPriority.split("~");
	gm.log("MonstArray: " + monstArray[0]);	
	for (var x = 0; x < monstArray.length; x++) {
		if (gm.getValue(monstArray[x],"~") == "~") { gm.setValue(monstArray[x],"~");} 
		
		gm.log("monstArray[x]: " + monstArray[x]);
		var monstType = monstArray[x], monstList = gm.getValue(monstArray[x],"~"), monstLinks = monstList.replace(/~~/g,"~").split("~"), numlinks = 0;

		gm.log("Inside MonstArray For Loop " + monstArray[x] + " - Array[" + (monstLinks.length - 1) + "] " + gm.getValue(monstArray[x]).replace("~","~\n"));
	
		for (var z = 0; z < monstLinks.length; z++) {
			if (monstLinks[z]) {
				var link = monstLinks[z].replace("http://apps.facebook.com/castle_age",""), urlixc = gm.getValue("urlixc","~");
				// + "  UrlixC: " + urlixc);
				if(urlixc.indexOf(link) == -1){
					gm.log("Navigating to Monst: " + monstArray[x] + "  Link: "  + link);
					link = "http://apps.facebook.com/castle_age" + link;
					gm.setValue("navLink", link);
					this.VisitUrl(link);
					gm.setValue("mfStatus", "OpenMonster");
					gm.setValue("LastAction","Monsters");
					this.waitMilliSecs =  10000;
					return true;
				} else {
					numlinks += 1;
					gm.log("Trimming already checked URL, Monst Type: " + monstType);
					//var newVal = gm.getValue(monstArray[x],"~").replace("~" + link, "");
					gm.setValue(monstType, gm.getValue(monstType).replace("~" + link,"").replace(/~~/g,"~"),"~");
				}
			}
		}
		gm.log("Links Already Visited: " + monstArray[x] + " #:" + numlinks);				
	}
	gm.log("All Monsters Tested");
	gm.setValue("mfStatus", "");
	
	var numurl = gm.getValue("urlix","~");
	if(nHtml.CountInstances(numurl) > 100) {
			gm.log("Idle- Resetting Monster Searcher Values, #-" +  numurl);
			caap.clearLinks(true);
			gm.setValue("LastAction","");
	}
	this.VisitUrl("http://apps.facebook.com/castle_age/index.php?bm=1");
	return false
},

clearLinks: function (resetall){
	gm.log("Clear Links");
	if (resetall = true) {
		gm.setValue("navLink","");
		gm.setValue("mfStatus","");
		gm.setValue("waitMonsterLoad",0);
	}
	gm.setValue("urlixc","~");
	
	for(var x = 0; x < caap.monstArgs.snapshotLength; x++){ 
		gm.setValue(caap.monstArgs[x],"~");
	}
},

maintainUrl:function(url) {
/*
	gm.log("Maintain " + url + " # Monst ARgs" + caap.monstArgs.length);
	for(var x = 0; x < 27; x++){
		var monstarg = gm.getValue(caap.monstArgs[x],"~");
		
		gm.log("Checking " + url + "\n vs. " + caap.monstArgs[x].fname + " \n" + monstarg);
		if (monstarg.indexOf(url) >= 0) {
			gm.log("Maintaining, removing (" + url + " ) from " + caap.monstArgs[x]);
			gm.setValue(caap.monstArgs[x], gm.getValue(caap.monstArgs[x],"~").replace("~" + url, "").replace("~~","~"));
		}
	}
*/
},
 
maintainAllUrl:function(){
	var urlixc = gm.getValue("urlixc","~").split("~");
	gm.log("Maintaining all checked URL");
	for(var x = 0; x < urlixc.snapshotLength; x++) {
		maintainUrl(urlixc[x]);
	}
},

handleCTA : function () {

	var ctas = nHtml.getX('//div[@class=\'GenericStory_Body\']', document, xpath.unordered);
	gm.log ("Number of entries- " + ctas.snapshotLength);
	for (var x = 0; x < ctas.snapshotLength; x++)	{
		
		var url = nHtml.getX('./div[2]/div/div/a/@href', ctas.snapshotItem(x), xpath.string).replace("http://apps.facebook.com/castle_age",""), fid = nHtml.Gup("user",url), mpool = nHtml.Gup("mpool",url), action = nHtml.Gup("action",url);
		var src = nHtml.getX('./div[2]/div/div/a/div/img/@src', ctas.snapshotItem(x), xpath.string);
		var time = nHtml.getX('./form/span/span/a/abbr/@title', ctas.snapshotItem(x), xpath.string);
		
		var monst; 
			if (src) {
				var urlixc = gm.getValue("urlixc","~");
				if (urlixc.indexOf(url) >=0) { //gm.log("Monster Already Checked");
				} else if (src.indexOf("cta_hydra_") >= 0 || src.indexOf("twitter_hydra_objective") >= 0) { //Hydra
					monst = gm.getValue("hydra","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("hydra", gm.getValue("hydra","") + "~" + url);
					}
				} else if (src.indexOf("cta_castle_") >= 0) { //Battle of the Dark Legion (Orcs)
					monst = gm.getValue("legio","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("legio", gm.getValue("legio","") + "~" + url);
					}
				} else if (src.indexOf("cta_earth_") >= 0) { //Genesis, the Earth Elemental
					monst = gm.getValue("earth","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("earth", gm.getValue("earth","") + "~" + url);
					}	
				} else if (src.indexOf("raid_deathrune_") >= 0) { //Deathrune Raids
					monst = gm.getValue("deas","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("deas", gm.getValue("deas","") + "~" + url);
					}	
					if (src.indexOf("raid_deathrune_a1.gif") >= 0) { // Deathrune Raid Part 1 Under Level 50 Summoner (a1)
						monst = gm.getValue("a1dea","~");
						if (monst.indexOf(url) == -1) {
							gm.setValue("a1dea", gm.getValue("a1dea","") + "~" + url);
						}	
					} else if (src.indexOf("raid_deathrune_a2.gif") >= 0) { // Deathrune Raid Part 2 Under Level 50 Summoner (a2)
						monst = gm.getValue("a2dea","~");
						if (monst.indexOf(url) == -1) {
							gm.setValue("a2dea", gm.getValue("a2dea","") + "~" + url);
						}	
					} else if (src.indexOf("raid_deathrune_b1.gif") >= 0) { // Deathrune Raid Part 1 Over Level 50 Summoner (b1)
						monst = gm.getValue("b1dea","~");
						if (monst.indexOf(url) == -1) {
							gm.setValue("b1dea", gm.getValue("b1dea","") + "~" + url);
						}	
					} else if (src.indexOf("raid_deathrune_b2.gif") >= 0) { // Deathrune Raid Part 2 Over Level 50 Summoner (b2)
						monst = gm.getValue("b2dea","~");
						if (monst.indexOf(url) == -1) {
							gm.setValue("b2dea", gm.getValue("b2dea","") + "~" + url);
						}	
					}
				} else if (src.indexOf("_dragon.gif") >= 0) { //Dragons
					monst = gm.getValue("drags","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("drags", gm.getValue("drags","") + "~" + url);
					}	
					if (src.indexOf("cta_red_dragon.gif") >= 0) { // Red Dragon
						monst = gm.getValue("rdrag","~");
						if (monst.indexOf(url) == -1) {
							gm.setValue("rdrag", gm.getValue("rdrag","") + "~" + url);
						}	
					} else if (src.indexOf("cta_yellow_dragon.gif") >= 0) {  // Gold Dragon
						monst = gm.getValue("gdrag","~");
						if (monst.indexOf(url) == -1) {
							gm.setValue("gdrag", gm.getValue("gdrag","") + "~" + url);
						}	
					} else if (src.indexOf("cta_blue_dragon.gif") >= 0) { // Frost Dragon
						monst = gm.getValue("fdrag","~");
						if (monst.indexOf(url) == -1) {
							gm.setValue("fdrag", gm.getValue("fdrag","") + "~" + url);
						}	
					} else if (src.indexOf("cta_green_dragon.gif") >= 0) { // Emerald Dragon
						monst = gm.getValue("edrag","~");
						if (monst.indexOf(url) == -1) {
							gm.setValue("edrag", gm.getValue("edrag","") + "~" + url);
						}	
					}
				} else if (src.indexOf("twitter_seamonster_") >= 0 && src.indexOf("_1.jpg") >= 0) { // Sea Serpents
					monst = gm.getValue("serps","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("serps", gm.getValue("serps","") + "~" + url);
					}	
					if (src.indexOf("twitter_seamonster_purple_1") >= 0) { // Amethyt Serpent
						monst = gm.getValue("aserp","~");
						if (monst.indexOf(url) == -1) {
							gm.setValue("aserp", gm.getValue("aserp","") + "~" + url);
						}	
					} else if (src.indexOf("twitter_seamonster_red_1") >= 0) { // Ancient Serpent (red)
						monst = gm.getValue("rserp","~");
						if (monst.indexOf(url) == -1) {
							gm.setValue("rserp", gm.getValue("rserp","") + "~" + url);
						}	
					} else if (src.indexOf("twitter_seamonster_blue_1") >= 0) { // Saphire Serpent
						monst = gm.getValue("sserp","~");
						if (monst.indexOf(url) == -1) {
							gm.setValue("sserp", gm.getValue("sserp","") + "~" + url);
						}	
					} else if (src.indexOf("twitter_seamonster_green_1") >= 0) { // Emerald Serpent
						monst = gm.getValue("eserp","~");
						if (monst.indexOf(url) == -1) {
							gm.setValue("eserp", gm.getValue("eserp","") + "~" + url);
						}	
					}
				} else if (src.indexOf("cta_death.gif") >= 0 && src.indexOf("cta_death_dead.gif") == -1) { // skaar
					monst = gm.getValue("skaar","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("skaar", gm.getValue("skaar","") + "~" + url);
					}	
				} else if (src.indexOf("cta_lotus.gif") >= 0) { // Lotus
					monst = gm.getValue("lotus","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("lotus", gm.getValue("lotus","") + "~" + url);
					}						
				} else if (src.indexOf("cta_keira.gif") >= 0) { // Keira
					monst = gm.getValue("keira","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("keira", gm.getValue("keira","") + "~" + url);
					}						
				} else if (src.indexOf("cta_mephi.gif") >= 0) { // Mephisto
					monst = gm.getValue("mephi","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("mephi", gm.getValue("mephi","") + "~" + url);
					}	
				} else if (src.indexOf("cta_sylvanas.gif") >= 0) { //Sylvanas
					monst = gm.getValue("sylva","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("sylva", gm.getValue("sylva","") + "~" + url);
					}	
				} else if (src.indexOf("cta_stone.gif") >= 0) { //Colossus of Terra
					monst = gm.getValue("colos","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("colos", gm.getValue("colos","") + "~" + url);
					}	
				} else if (src.indexOf("cta_orc_king.gif") >= 0) { //Gildamesh
					monst = gm.getValue("gilda","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("gilda", gm.getValue("gilda","") + "~" + url);
					}	
				} else if (src.indexOf("cta_orc_captain.gif") >= 0) { //Kull
					monst = gm.getValue("kull","~");
					if (monst.indexOf(url) == -1) {
						gm.setValue("kull", gm.getValue("kull","") + "~" + url);
					}	
				}
			}
			
		
		var urlix = gm.getValue("urlix", "~"); 
		var doaid = gm.getValue("doaid", "~"); 
	
		
		if (fid && action) { 
			if(action == "doObjective") {
				if(urlixc.indexOf(url) == -1 && doaid.indexOf(url) == -1) {
					doaid += "~" + url;
					gm.setValue("doaid", doaid);
				}
			}
		}
	
		if (fid && mpool) { 
			if(urlixc.indexOf(url) == -1 && urlix.indexOf(url) == -1) {
				urlix += "~" + url;
				gm.setValue("urlix", urlix);
				
			}
		}
	}
	gm.log("Completed Url Handling");
	this.JustDidIt("checkedFeed");
},

/////////////////////////////////////////////////////////////////////

//							BANKING

// Keep it safe!

/////////////////////////////////////////////////////////////////////
ImmediateBanking:function() {
	if (!gm.getValue("BankImmed")) return false;
	return this.Bank();
},

Bank:function() {
	var maxInCash=this.GetNumber('MaxInCash');
	var minInCash=this.GetNumber('MinInCash');
	if (minInCash=='') minInCash=0;

	if(maxInCash=="" || this.stats.cash<=minInCash || this.stats.cash<maxInCash) {
		return false;
	}

	if (this.SelectGeneral('BankingGeneral')) return true;

	if(!(depositButton = this.CheckForImage('btn_stash.gif'))) {
		// Cannot find the link
		return this.NavigateTo('keep');
	}

	var depositForm = depositButton.form;

	var numberInput=nHtml.FindByAttrXPath(depositForm,'input',"@type='' or @type='text'");
	if(numberInput) {
		numberInput.value=parseInt(numberInput.value)-minInCash;
	} else {
		gm.log('Cannot find box to put in number for bank deposit.');
		return false;
	}

	gm.log('Depositing into bank');
	this.Click(depositButton);
	if (nHtml.FindByAttrContains(document.body,"div","class",'result')) {
		if (nHtml.FindByAttrContains(document.body,"div","class",'result').firstChild.data.indexOf("You have stashed") < 0) return true;
	}
	return false;
},
RetrieveFromBank:function(num){
	if(num<=0)return false;
	var minInStore=this.GetNumber('minInStore');

	if(!(retrieveButton = this.CheckForImage('btn_retrieve.gif'))) {
		// Cannot find the link
		return this.NavigateTo('keep');
	}
	if (!(minInStore==''|| minInStore <= gm.getValue('inStore',0)-num))return false;


	var retrieveForm = retrieveButton.form;

	var numberInput=nHtml.FindByAttrXPath(retrieveForm,'input',"@type='' or @type='text'");
	if(numberInput) {
		numberInput.value=num;
	} else {
		gm.log('Cannot find box to put in number for bank retrieve.');
		return false;
	}

	gm.log('Retrieving '+num +'from bank');
	gm.setValue('storeRetrieve','');
	this.Click(retrieveButton);
	return true;

},




/////////////////////////////////////////////////////////////////////

//							HEAL

/////////////////////////////////////////////////////////////////////

Heal:function() {
	this.SetDivContent('heal_mess','');
	var whenBattle = gm.getValue('WhenBattle','');
	var minToHeal=this.GetNumber('MinToHeal');
	if(minToHeal=="") return false;
	var minStamToHeal=this.GetNumber('MinStamToHeal');
	if(minStamToHeal=="") minStamToHeal = 0;

	if(!this.stats.health) return false;

	if (whenBattle != 'Never') {
		if ((this.InLevelUpMode() || this.stats.stamina.num >= this.stats.stamina.max) && this.stats.health.num < 10) {
			gm.log('Heal');
			return this.NavigateTo('keep,heal_button.gif');
		}
	}
	if(this.stats.health.num>=this.stats.health.max || this.stats.health.num>minToHeal) return false;

	if(this.stats.stamina.num<minStamToHeal) {
		this.SetDivContent('heal_mess','Waiting for stamina to heal: '+this.stats.stamina.num +'/'+minStamToHeal );
		return false;
	}
	gm.log('Heal');
	return this.NavigateTo('keep,heal_button.gif');
},

/////////////////////////////////////////////////////////////////////

//							ELITE GUARD

/////////////////////////////////////////////////////////////////////

AutoElite:function() {
	if (!gm.getValue('AutoElite',false) || !(this.WhileSinceDidIt('AutoEliteGetList',6*60*60))) {
		return false;
	}

	if (String(window.location).indexOf('party.php')) {
		var res=nHtml.FindByAttrContains(document.body,'span','class','result_body');
		if (res) {
			res=nHtml.GetText(res);
			if (res.match(/Your Elite Guard is FULL/i)) {
				gm.setValue('MyEliteTodo','');
				gm.log('elite guard is full');
				this.JustDidIt('AutoEliteGetList');
				return false;
			}
		}
	}

	var eliteList=gm.getValue('MyEliteTodo','').trim();
	if (eliteList== '') {
		if (this.CheckForImage('view_army_on.gif')) {
			gm.log('load auto elite list');
			var armyList=gm.getValue('EliteArmyList','');
			if(/[^0-9,]/.test(armyList) && /\n/.test(armyList)){
				armyList = armyList.replace(/\n/gi,',');
			}
			if(armyList != '') armyList += ',';
			var ss=document.evaluate(".//img[contains(@src,'view_friends_profile')]/ancestor::a[contains(@href,'keep.php?user')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			for(var s=0; s<ss.snapshotLength; s++) {
				var a=ss.snapshotItem(s);
				var user = a.href.match(/user=\d+/i);
				if (user) {
					armyList += String(user).substr(5) + ',';
				}
			}
			if (armyList!='' || (this.stats.army <= 1)) {
				gm.setValue('MyEliteTodo',armyList);
			}
		} else {
			return this.NavigateTo('army,army_member');
		}
	} else if (this.WhileSinceDidIt('AutoEliteReqNext',7)) {
		user=eliteList.substring(0,eliteList.indexOf(','));
		gm.log('add elite ' + user);
		this.VisitUrl("http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=" + user);
		eliteList = eliteList.substring(eliteList.indexOf(',')+1);
		gm.setValue('MyEliteTodo',eliteList);
		this.JustDidIt('AutoEliteReqNext');
		if (eliteList == '') {
			this.JustDidIt('AutoEliteGetList');
			gm.log('Army list exhausted');
		}
	}
	return true;
},

/////////////////////////////////////////////////////////////////////

//							PASSIVE GENERALS

/////////////////////////////////////////////////////////////////////

PassiveGeneral:function() {
	return this.SelectGeneral('IdleGeneral')
},

/////////////////////////////////////////////////////////////////////

//							AUTOINCOME

/////////////////////////////////////////////////////////////////////

AutoIncome:function() {
	if (this.stats.payminute < 1 && this.stats.paytime.match(/\d/)) {
		this.SelectGeneral('IncomeGeneral');
		return true;
	}
	return false;
},

/////////////////////////////////////////////////////////////////////

//				                IMMEDIATEAUTOSTAT

/////////////////////////////////////////////////////////////////////

ImmediateAutoStat:function() {
	if (!gm.getValue("StatImmed")) return false;
	return caap.AutoStat();
},

/////////////////////////////////////////////////////////////////////

//								AUTOGIFT

/////////////////////////////////////////////////////////////////////

CheckGiftResults:function(resultsText) {
	// Confirm gifts actually sent
	if (resultsText.match(/^\d+ requests? sent\.$/)) {
		gm.log('Confirmed gifts sent out.');
		gm.setValue('RandomGiftPic','');
		gm.setValue('FBSendList','');
		this.SetCheckResultsFunction('');
	}
},
AutoGift:function() {

	if (!gm.getValue('AutoGift')) return false;
	if (giftEntry = nHtml.FindByAttrContains(document.body,'div','id','_gift1')) {
		gm.setList('GiftList',[]);
		var ss=document.evaluate(".//div[contains(@id,'_gift')]",giftEntry.parentNode,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var giftNamePic= {};
		for(var s=0; s<ss.snapshotLength; s++) {
			var giftDiv=ss.snapshotItem(s);
			giftName = nHtml.GetText(giftDiv).trim().replace(/!/i,'');
			if (gm.getValue("GiftList").indexOf(giftName) >= 0) giftName += ' #2';
			gm.listPush('GiftList',giftName);
			giftNamePic[giftName]=this.CheckForImage('mystery',giftDiv).src.match(/[\w_\.]+$/i).toString();
//			gm.log('Gift name: ' + giftName + ' pic ' + giftNamePic[giftName] + ' hidden ' + giftExtraGiftTF[giftName]);
		}
//		gm.log('Gift list: ' + gm.getList('GiftList'));
		if (gm.getValue('GiftChoice') == 'Get Gift List') {
			gm.setValue('GiftChoice','Same Gift As Received');
			this.SetControls(true);
		}
	}

	// Go to gifts page if asked to read in gift list
	if (gm.getValue('GiftChoice',false)=='Get Gift List' || !gm.getList('GiftList')) {
		if (this.NavigateTo('army,gift','giftpage_title.jpg')) return true;
	}

	// Gather the gifts
	if (gm.getValue('HaveGift',false)) {
		if (this.NavigateTo('army','invite_on.gif')) return true;
		var acceptDiv = nHtml.FindByAttrContains(document.body,'a','href','reqs.php#confirm_');
		var ignoreDiv = nHtml.FindByAttrContains(document.body,'a','href','act=ignore');
		if(ignoreDiv && acceptDiv) {
			if (!(giverId = this.userRe.exec(ignoreDiv.href))) {
				gm.log('Unable to find giver ID');
				return false;
			}
			var giverName = nHtml.GetText(nHtml.FindByAttrContains(acceptDiv.parentNode.parentNode,'a','href','profile.php')).trim();
			gm.setValue('GiftEntry',giverId[2]+vs+giverName);
			gm.log('Giver ID = ' + giverId[2] + ' Name  = ' + giverName);
			this.JustDidIt('ClickedFacebookURL');
			this.VisitUrl(acceptDiv.href);
			return true;
		}
		gm.setValue('HaveGift',false);
		return this.NavigateTo('gift');
	}

	// Facebook pop-up on CA
	if (gm.getValue('FBSendList','')) {
		if (button = nHtml.FindByAttrContains(document.body,'input','name','sendit') ) {
			gm.log('Sending gifts to Facebook');
			this.Click(button);
			this.SetCheckResultsFunction('CheckGiftResults');
			return true;
		}
		gm.listAddBefore('ReceivedList',gm.getList('FBSendList'));
		gm.setList('FBSendList',[]);
		if (button = nHtml.FindByAttrContains(document.body,'input','name','ok')){
			gm.log('Over max gifts per day');
			this.JustDidIt('WaitForNextGiftSend');
			this.Click(button);
			return true;
		}
		gm.log('No Facebook pop up to send gifts');
		return false;
	}

	// CA send gift button
	if (gm.getValue('CASendList','')) {
		if (button = nHtml.FindByAttrContains(nHtml.FindByAttrContains(document.body,'form','id','req_form_'),'input','id','send')) {
			gm.log('Clicked CA send gift button');
			gm.listAddBefore('FBSendList',gm.getList('CASendList'));
			gm.setList('CASendList',[]);
			caap.Click(button);
			return true;
		}
		gm.log('No CA button to send gifts');
		gm.listAddBefore('ReceivedList',gm.getList('CASendList'));
		gm.setList('CASendList',[]);
		return false;
	}

	if (!this.WhileSinceDidIt('WaitForNextGiftSend',3*60*60)) return false;

	if (this.WhileSinceDidIt('WaitForNotFoundIDs',3*60*60) && gm.getList('NotFoundIDs')) {
		gm.listAddBefore('ReceivedList',gm.getList('NotFoundIDs'));
		gm.setList('NotFoundIDs',[]);
	}

	giverList = gm.getList('ReceivedList');
	if (!giverList.length) return false;
	var giftChoice = gm.getValue('GiftChoice')

	if (this.NavigateTo('army,gift','giftpage_title.jpg')) return true;

	// Get the gift to send out
	if (giftNamePic.length==0) {
		gm.log('No list of pictures for gift choices');
		return false;
	}
	switch (giftChoice) {
		case 'Random Gift':
			if ((giftPic = gm.getValue('RandomGiftPic'))) break;
			var picNum = Math.floor(Math.random()* (gm.getList('GiftList').length));
			var n = 0;
			for(var p in giftNamePic) {
				if (n++ == picNum) {
					var giftPic = giftNamePic[p];
					gm.setValue('RandomGiftPic',giftPic)
					break;
				}
			}
			if (!giftPic) {
				gm.log('No gift type match. GiverList: ' + giverList);
				return false;
			}
			break;
		case 'Same Gift As Received':
			if (giverList[0].indexOf('Unknown Gift')>=0) {
				var givenGiftType = gm.getList('GiftList').shift();
			} else {
				var givenGiftType = giverList[0].split(vs)[2];
			}
			gm.log('Looking for same gift as ' + givenGiftType);
			var giftPic = giftNamePic[givenGiftType];
			if (!giftPic) {
				gm.log('No gift type match. GiverList: ' + giverList);
				return false;
			}
			break;
		default:
			var giftPic = giftNamePic[gm.getValue('GiftChoice')];
	}

	// Move to gifts page
	if (!(picDiv = this.CheckForImage(giftPic))) {
		gm.log('Unable to find ' + giftPic);
		return false;
	} else gm.log('GiftPic is ' + giftPic);
	if (nHtml.FindByAttrContains(picDiv.parentNode.parentNode.parentNode.parentNode,'div','style','giftpage_select')) {
		if (this.NavigateTo('giftpage_ca_friends_off.gif','giftpage_ca_friends_on.gif')) return true;
	} else {
		this.NavigateTo('gift_more_gifts.gif');
		return this.NavigateTo(giftPic);
	}
	// Click on names
	giveDiv = nHtml.FindByAttrContains(document.body,'div','class','unselected_list');
	doneDiv = nHtml.FindByAttrContains(document.body,'div','class','selected_list');
	gm.setList('ReceivedList',[]);
	for(var p in giverList) {
		if (p>10) {
			gm.listPush('ReceivedList',giverList[p]);
			continue;
		}
		giverData=giverList[p].split(vs);
		giverID=giverData[0];
		giftType=giverData[2];
		if (giftChoice == 'Same Gift As Received' && giftType != givenGiftType && giftType != 'Unknown Gift') {
			gm.log('giftType ' + giftType + ' givenGiftType ' + givenGiftType);
			gm.listPush('ReceivedList',giverList[p]);
			continue;
		}

		if (!(nameButton = nHtml.FindByAttrContains(giveDiv,'input','value',giverID))) {
			gm.log('Unable to find giver ID ' + giverID);
			gm.listPush('NotFoundIDs',giverList[p]);
			this.JustDidIt('WaitForNotFoundIDs');
			continue;
		}
		gm.log('Clicking giver ID ' + giverID);
		this.Click(nameButton);

		//test actually clicked
		if (nHtml.FindByAttrContains(doneDiv,'input','value',giverID)) {
			gm.listPush('CASendList',giverList[p]);
			gm.log('Moved ID ' + giverID);
		} else {
			gm.log('NOT moved ID ' + giverID);
			gm.listPush('NotFoundIDs',giverList[p]);
			this.JustDidIt('WaitForNotFoundIDs');
		}
	}
	return true;
},

AcceptGiftOnFB:function() {
	if (window.location.href.indexOf('www.facebook.com/reqs.php') < 0 && window.location.href.indexOf('www.facebook.com/home.php') < 0) {
		return false;
	}
	var giftEntry = gm.getValue('GiftEntry','');
	if (!giftEntry) {
		return false;
	}

	gm.log('On FB page with gift ready to go');
	if (window.location.href.indexOf('facebook.com/reqs.php') >= 0) {
		var ss=document.evaluate(".//input[contains(@name,'/castle/tracker.php')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			var giftDiv=ss.snapshotItem(s);
			var user = giftDiv.name.match(/uid%3D\d+/i);
			if (!user) continue;
			user = String(user).substr(6);
			if (user != this.NumberOnly(giftEntry)) continue;
			giftType = giftDiv.value.replace(/^Accept /i,'').trim();
			if (gm.getList('GiftList').indexOf(giftType) < 0) {
				gm.log('Unknown gift type.');
				giftType = 'Unknown Gift';
			}
			if (gm.getValue('ReceivedList',' ').indexOf(giftEntry)<0) gm.listPush('ReceivedList',giftEntry + vs + giftType);
			gm.log ('This giver: ' + user + ' gave ' + giftType + ' Givers: ' + gm.getList('ReceivedList'));
			caap.Click(giftDiv);
			gm.setValue('GiftEntry','');
			return true;
		}
	}
	if (!this.WhileSinceDidIt('ClickedFacebookURL',10)) return false;
	gm.log('Error: unable to find gift');
	if (gm.getValue('ReceivedList',' ').indexOf(giftEntry)<0) gm.listPush('ReceivedList',giftEntry + '\tUnknown Gift');
	caap.VisitUrl("http://apps.facebook.com/castle_age/army.php?act=acpt&uid=" + this.NumberOnly(giftEntry));
	gm.setValue('GiftEntry','');
	return true;
},
////////////////////////////////////////////////////////////////////

//						Auto Stat

////////////////////////////////////////////////////////////////////

IncreaseStat:function(attribute,attrAdjust){

	switch (attribute) {
		case "energy"	: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','energy_max'); break;
		case "stamina"	: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','stamina_max'); break;
		case "attack"	: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','attack'); break;
		case "defense"	: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','defense'); break;
		case "health"	: var button = nHtml.FindByAttrContains(atributeSlice,'a','href','health_max'); break;
		default :
			gm.log("Unable to identify attribute " + attribute);
			return "Fail";
	}

	if (!button) {
		gm.log("Unable to locate upgrade button for " + attribute);
		return "Fail";
	}

	attrCurrent = parseInt(button.parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));

	var energy = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','energy_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var stamina = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','stamina_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var attack = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','attack').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var defense = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','defense').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var health = parseInt(nHtml.FindByAttrContains(atributeSlice,'a','href','health_max').parentNode.parentNode.childNodes[3].firstChild.data.replace(/[^0-9]/g,''));
	var level = this.stats.level;
//	gm.log("Energy ="+energy+" Stamina ="+stamina+" Attack ="+attack+" Defense ="+defense+" Heath ="+health);

	if(nHtml.FindByAttrContains(document.body,'div','id','app46755028429_AjaxLoadIcon').style.display=='none') {
		if(!gm.getValue('AutoStatAdv',false)){
			if (attrAdjust > attrCurrent) {
				if ((attribute == 'stamina') && (this.statsPoints < 2)) {
					gm.setValue("SkillPointsNeed",2)
					return "Fail";
				} else gm.setValue("SkillPointsNeed",1)
				gm.log("Status Before:  " + attribute + "=" + attrCurrent + " Adjusting To: " + attrAdjust)
				this.Click(button);
				return "Click";
			} else return "Next";
		} else {
			//Using eval, so user can define formulas on menu, like energy = level + 50
			if (eval(attrAdjust) > attrCurrent) {
				if ((attribute == 'stamina') && (this.statsPoints < 2)) {
					gm.setValue("SkillPointsNeed",2);
					return "Fail";
				} else gm.setValue("SkillPointsNeed",1);
				gm.log("Status Before:  " + attribute + "=" + attrCurrent + " Adjusting To: (" + attrAdjust + ")=" + eval(attrAdjust))
				this.Click(button);
				return "Click";
			} else return "Next";
		}
	} else {
		gm.log("Unable to find AjaxLoadIcon?")
		return "Fail"
	}

// Realy shouldn't make it here
	gm.log("Somethings not right.")
	return "Fail";
},

AutoStat:function(){
	if(!gm.getValue('AutoStat'))return false;

	var content=document.getElementById('content');
	if(!content) { return false; }
	var a=nHtml.FindByAttrContains(content,'a','href','keep.php');
	if(!(this.statsPoints = a.firstChild.firstChild.data.replace(/[^0-9]/g,''))) return false; //gm.log("Dont have any stats points");

	if (this.statsPoints < gm.getValue("SkillPointsNeed",1)) return false;

	if(!(atributeSlice = nHtml.FindByAttrContains(document.body,"div","class",'keep_attribute_section'))) {
		this.NavigateTo('keep');
		return true;
	}
	for (var n=1; n<=5; n++) {
		if (gm.getValue('Attribute' + n,'') != '') {
			switch (this.IncreaseStat(gm.getValue('Attribute' + n,''),gm.getValue('AttrValue' + n,0))) {
				case "Next"	:	continue;
				case "Click":	return true;
				default		:	return false;
			}
		} else return false;
	}

	return false;
},

Idle:function() {
	//Update Monster Finder
	if(this.stats.stamina.num >= gm.getValue("MonsterFinderMinStam",50)){
		var urlix = gm.getValue("urlix","~"), urlcount = nHtml.CountInstances(urlix);
		if(urlcount > 100) {
			gm.log("Idle- Maintaining Checked URL, #-" +  urlcount);
			caap.maintainAllUrl
			gm.log("Idle- URL Maintained, went from " + urlcount + " to " + nHtml.CountInstances(gm.getValue(Urlix,"~")));
		}
	}

	try{
		//if we need to add some army member
		if(gm.getValue('FillArmy',false)){
			if (!this.CheckForImage('invite_on.gif')) {
				caap.SetDivContent('army_mess','Filling Army');
				this.NavigateTo('army');
			} else { //get not army members
				var IdsListNotArmyAll="//div[@class='unselected_list']//label[@class='clearfix']",
				results=document.evaluate(IdsListNotArmyAll, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
				i=0,res;
				IdsListNotArmyAll=[];
				while((res=results.snapshotItem(i))!=null){
					IdsListNotArmyAll[IdsListNotArmyAll.length]=res.firstChild.value;
					i++;
				}
				var Ids =[];
				var counter = 0;
				if(!gm.getValue('waiting',false)){ //get CA friends
					gm.log("Getting CA friend's list");
					gm.setValue('waiting',true);
					window.setTimeout(function() {gm.setValue('waiting',false);},10000);
					GM_xmlhttpRequest({
						url: 'http://apps.facebook.com/castle_age/gift.php?app_friends=false&giftSelection=1',
						method: 'GET',
						onload: function(response){
							var excludeMatch = response.responseText.match(/(exclude_ids=")[\-0-9,]*"/);
							if(response.status == 200 && excludeMatch){ //if response == ok
								gm.deleteValue('waiting');
								gm.log(response.statusText);
								IdsList = excludeMatch.toString().replace(/[^0-9,]/g,'').split(',');
								for(var x in IdsListNotArmyAll){ //search for CA friends not in army
									for(var y in IdsList){
										if(IdsList[y] == IdsListNotArmyAll[x]){
											Ids[counter++] = IdsListNotArmyAll[x];
											break;
										}
									}
								}

								// Add army members //
								var count = 0;
								var ID = gm.getValue("ArmyCount",0);
								if(ID == 0) gm.log("Adding "+Ids.length+" member");
								caap.SetDivContent('army_mess','Filling Army, Please wait...'+ID+"/"+Ids.length);
								for (ID; ID < Ids.length ; ID++) {
									if(count >= 5){ //don't spam requests
										this.waitMilliSecs=1000;
										break;
									}else{
										count++;
										GM_xmlhttpRequest({
											url: 'http://apps.facebook.com/castle_age//index.php?tp=cht&lka='+ Ids[ID] +'&buf=1',
											method: "GET",
											onload: function(response) {
												count--;
												if(response.status != 200){
													GM_log([
													  response.status,
													  response.finalUrl,
													].join("\n"));
												}
											}
										});
										gm.setValue("ArmyCount",ID);
									}
								}
								if(ID >= Ids.length){
								caap.SetDivContent('army_mess','<b>Fill Army Completed</b>');
								window.setTimeout(function() {caap.SetDivContent('army_mess','');},5000);
								gm.log("Fill Army Completed");
								gm.setValue('FillArmy',false);
								gm.deleteValue("ArmyCount");
								}
							}else{//if response != ok
								caap.SetDivContent('army_mess','<b>Fill Army Failed</b>');
								window.setTimeout(function() {caap.SetDivContent('army_mess','');},5000);
								gm.log("Fill Army Not Completed, cant get CA friends list");
								gm.log("Response.status: "+response.statusText);
								gm.setValue('FillArmy',false);
								gm.deleteValue("ArmyCount");
								gm.deleteValue('waiting');
							}
						}
					});
				}

			}
			return true;
		}
	}catch (e){
		gm.log("ERROR: " + e);
	}
	gm.setValue('ReleaseControl',true);
	return true;
},

currentPage:"",
currentTab:"",
waitMilliSecs:5000,

/////////////////////////////////////////////////////////////////////

//							MAIN LOOP

// This function repeats continously.  In principle, functions should only make one
// click before returning back here.

/////////////////////////////////////////////////////////////////////

actionDescTable:{'AutoIncome':'Awaiting Income','AutoStat':'Upgrade Skill Points','MaxEnergyQuest':'At Max Energy Quest','PassiveGeneral':'Setting Idle General','ImmediateBanking':'Immediate Banking','Battle':'Battling Players'},

CheckLastAction:function(thisAction) {
	lastAction = gm.getValue('LastAction','none');
	if (this.actionDescTable[thisAction])
		this.SetDivContent('activity_mess','Current activity: ' + this.actionDescTable[thisAction]);
	else
		this.SetDivContent('activity_mess','Current activity: ' + thisAction);
	if (lastAction!=thisAction) {
		gm.log('Changed from doing ' + lastAction + ' to ' + thisAction);
		gm.setValue('LastAction',thisAction);
	}
},

MainLoop:function() {
	this.waitMilliSecs=1000;
	// assorted errors...
	var href=location.href;
	if(href.indexOf('/common/error.html')>=0) {
		gm.log('detected error page, waiting to go back to previous page.');
		window.setTimeout(function() {
			window.history.go(-1);
		}, 30*1000);
		return;
	}
	if(document.getElementById('try_again_button')) {
		gm.log('detected Try Again message, waiting to reload');
		// error
		window.setTimeout(function() {
			window.history.go(0);
		}, 30*1000);
		return;
	}

	if (window.location.href.indexOf('www.facebook.com/reqs.php') >= 0 || window.location.href.indexOf('www.facebook.com/home.php') >= 0 ||  window.location.href.indexOf('filter=app_46755028429') >= 0) {
		
		if (gm.getValue("mfStatus","") == "OpenMonster") {
			gm.log("Opening Monster " + gm.getValue("navLink"));
			this.CheckMonster();
		} else if (gm.getValue("mfStatus","") == "CheckMonster"){
			gm.log("Scanning URL for new monster");
			this.selectMonst();
		}
		
		this.MonsterFinderOnFB();
		this.AcceptGiftOnFB();
	 	this.WaitMainLoop();
		return;
	}

	//We don't need to send out any notifications
	if (button = nHtml.FindByAttrContains(document.body,"a","class",'undo_link')){
		this.Click(button);
		gm.log('Undoing notification');
	}

	this.SetupDivs();
//	this.AddBattleLinks();
	if(gm.getValue('Disabled',false)) {
		this.SetControls();
		this.WaitMainLoop();
		return;
	}

	if (!this.GetStats()) {
		noWindowLoad = gm.getValue('NoWindowLoad',0)
		if (noWindowLoad == 0) {
			this.JustDidIt('NoWindowLoadTimer');
			gm.setValue('NoWindowLoad',1);
		} else if (this.WhileSinceDidIt('NoWindowLoadTimer',Math.min(Math.pow(2,noWindowLoad-1)*15,60*60))) {
			this.JustDidIt('NoWindowLoadTimer');
			gm.setValue('NoWindowLoad',noWindowLoad+1);
			this.ReloadCastleAge();
		}
		gm.log('Page no-load count: ' + noWindowLoad);
		this.WaitMainLoop();
		return;
	} else gm.setValue('NoWindowLoad',0);

	this.DrawQuests(false);
	this.CheckResults();
//	this.engageDashboard();
    this.UpdateGeneralList();
    this.SetControls();
	this.DrawProperties();

	if(!this.WhileSinceDidIt('PageLoad',3)) {
		this.WaitMainLoop();
		return;
	}
	if(gm.getValue('caapPause','none') != 'none' || !this.WhileSinceDidIt('PageLoad',3)) {
	/*
		var text = "";
		for each(var val in GM_listValues()){
			text += val +'|'+GM_getValue(val)+';';
		}
		text = text.replace(/\n/gi,',');
		//GM_log(GM_listValues());
		//var vals = GM_listValues().map(GM_getValue);
		gm.log("text = "+text);
		//gm.log("Vals = "+vals);
		*/
		document.getElementById("caap_div").style.background = gm.getValue('StyleBackgroundDark','#fee');
		document.getElementById("caap_div").style.opacity = div.style.transparency = gm.getValue('StyleOpacityDark','1');
		this.WaitMainLoop();
		return;
	}
	if (this.AutoIncome()) {
		this.CheckLastAction('AutoIncome');
		this.WaitMainLoop();
		return;
	}
	var actionsList = ['AutoElite','Heal','ImmediateBanking','ImmediateAutoStat','MaxEnergyQuest','DemiPoints','Monsters','Battle','MonsterFinder','Quests','Properties','Bank','PassiveGeneral','AutoBless','AutoStat','AutoGift','Idle'];

	if (!gm.getValue('ReleaseControl',false)) actionsList.unshift(gm.getValue('LastAction','Idle'));
	else gm.setValue('ReleaseControl',false);
//	gm.log('Action list: ' + actionsList);

	for (var action in actionsList) {
//		gm.log('Action: ' + actionsList[action]);
		if(this[actionsList[action]]()) {
			this.CheckLastAction(actionsList[action]);
			break;
		}
	}

	this.WaitMainLoop();
},

WaitMainLoop:function() {
	this.waitForPageChange=true;
	nHtml.setTimeout(function() { this.waitForPageChange=false; caap.MainLoop(); },caap.waitMilliSecs * (1 + Math.random() * 0.2));
},

ReloadCastleAge:function() {
	// better than reload... no prompt on forms!
	if (window.location.href.indexOf('castle_age') >= 0 && !gm.getValue('Disabled') && (gm.getValue('caapPause') == 'none')) {
		gm.setValue('ReleaseControl',true);
		gm.setValue('caapPause','none');
		window.location = "http://apps.facebook.com/castle_age/index.php?bm=1";
	}
},
ReloadOccasionally:function() {
	nHtml.setTimeout(function() {
		caap.ReloadCastleAge();
		caap.ReloadOccasionally();
	}, 1000*60*8 + (8 * 60 * 1000 * Math.random()));
}
};

if(gm.getValue('SetTitle')) {
        document.title=gm.getValue('PlayerName','CAAP');
};

if (gm.getValue('LastVersion',0) != thisVersion) {
	// Put code to be run once to upgrade an old version's variables to new format or such here.
	if (parseInt(gm.getValue('LastVersion',0))<121) gm.setValue('WhenBattle',gm.getValue('WhenFight','Stamina Available'));
	/*if (parseInt(gm.getValue('LastVersion',0))<126) {
		if (navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
			for each(var n in GM_listValues()){
				if (GM_getValue(n)) GM_setValue(n,GM_getValue(n).toString().replace('~',os).replace('`',vs));
			}
		}
	}*/
	if (parseInt(gm.getValue('LastVersion',0))<130 && gm.getValue('MonsterGeneral')) {
		gm.setValue('AttackGeneral',gm.getValue('MonsterGeneral'));
		gm.deleteValue('MonsterGeneral');
	}
	if (parseInt(gm.getValue('LastVersion',0))<133) {
		clearList = ['FreshMeatMaxLevel','FreshMeatARMax','FreshMeatARMin'];
		clearList.forEach(function(gmVal) {
			gm.setValue(gmVal,'');
		});
	}
	gm.setValue('LastVersion',thisVersion);
};
$(function() {
	gm.log('Full page load completed');
	gm.setValue('caapPause','none');
	caap.clickUrl=window.location.href;
	// todo figure out way to print out the querySelector value for refined function calls
	if (document.querySelector("#app46755028429_battle_monster"))
		caap.checkMonsterDamage();
//	if (!gm.getValue('Disabled',false))
//		caap.engageDashboard();
	caap.JustDidIt('PageLoad');
	caap.addExpDisplay();
	gm.setValue('ReleaseControl',true);
	caap.MainLoop();
});


caap.ReloadOccasionally();

// ENDOFSCRIPT

