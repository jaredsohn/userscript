// ==UserScript==
// @name           37ERD
// @description    Ulepszenia dla portalu cudownyportal.pl
// @version        1.2.0
// @copyright      lord nimai
// @namespace      cudownyportal.pl
// @include        http://www.cudownyportal.pl/*
// @exclude        http://www.cudownyportal.pl/ranthea/*
// @exclude        http://www.cudownyportal.pl/hellinger/*
// ==/UserScript==

// http://userscripts.org/scripts/show/69477
// updated 2011-04-01



// works best in Firefox 3.5
// compatible with Firefox 2, Chrome 4, Opera 10.5

(function(){

(function(){

//-------------------------------------------------------------------
// jquery-1.5.2.js

/*!
 * jQuery JavaScript Library v1.5.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Mar 31 15:28:23 2011 -0400
 */
(function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document;
var jQuery = (function() {

// Define a local copy of jQuery
var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// A simple way to check for HTML strings or ID strings
	// (both of which we optimize for)
	quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,

	// Check if a string has a non-whitespace character in it
	rnotwhite = /\S/,

	// Used for trimming whitespace
	trimLeft = /^\s+/,
	trimRight = /\s+$/,

	// Check for digits
	rdigit = /\d/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	// Useragent RegExp
	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	// Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent,

	// For matching the engine and version of the browser
	browserMatch,

	// The deferred used on DOM ready
	readyList,

	// The ready event handler
	DOMContentLoaded,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
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
		if ( selector === "body" && !context && document.body ) {
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
					context = context instanceof jQuery ? context[0] : context;
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
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
						selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes;
					}

					return jQuery.merge( this, selector );

				// HANDLE: $("#id")
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
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

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return (context || rootjQuery).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
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
	jquery: "1.5.2",

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
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = this.constructor();

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

		// Add the callback
		readyList.done( fn );

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
		return this.prevObject || this.constructor(null);
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
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

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

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

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

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {
		// A third-party is pushing the ready event forwards
		if ( wait === true ) {
			jQuery.readyWait--;
		}

		// Make sure that the DOM is not already loaded
		if ( !jQuery.readyWait || (wait !== true && !jQuery.isReady) ) {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.trigger ) {
				jQuery( document ).trigger( "ready" ).unbind( "ready" );
			}
		}
	},

	bindReady: function() {
		if ( readyList ) {
			return;
		}

		readyList = jQuery._Deferred();

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			return setTimeout( jQuery.ready, 1 );
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
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	// A crude way of determining if an object is a window
	isWindow: function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	isNaN: function( obj ) {
		return obj == null || !rdigit.test( obj ) || isNaN( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
			!hasOwn.call(obj, "constructor") &&
			!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
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
		if ( rvalidchars.test(data.replace(rvalidescape, "@")
			.replace(rvalidtokens, "]")
			.replace(rvalidbraces, "")) ) {

			// Try to use the native JSON parser first
			return window.JSON && window.JSON.parse ?
				window.JSON.parse( data ) :
				(new Function("return " + data))();

		} else {
			jQuery.error( "Invalid JSON: " + data );
		}
	},

	// Cross-browser xml parsing
	// (xml & tmp used internally)
	parseXML: function( data , xml , tmp ) {

		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data , "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}

		tmp = xml.documentElement;

		if ( ! tmp || ! tmp.nodeName || tmp.nodeName === "parsererror" ) {
			jQuery.error( "Invalid XML: " + data );
		}

		return xml;
	},

	noop: function() {},

	// Evalulates a script in a global context
	globalEval: function( data ) {
		if ( data && rnotwhite.test(data) ) {
			// Inspired by code by Andrea Giammarchi
			// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
			var head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement,
				script = document.createElement( "script" );

			if ( jQuery.support.scriptEval() ) {
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

	// Use native String.trim function wherever possible
	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	// results is for internal usage only
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// The extra typeof function check is to prevent crashes
			// in Safari 2 (See: #3039)
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			var type = jQuery.type(array);

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
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
		var i = first.length,
			j = 0;

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
		var ret = [], retVal;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
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

		// Flatten any nested arrays
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

	// Mutifunctional method to get and set values to a collection
	// The value/s can be optionally by executed if its a function
	access: function( elems, key, value, exec, fn, pass ) {
		var length = elems.length;

		// Setting many attributes
		if ( typeof key === "object" ) {
			for ( var k in key ) {
				jQuery.access( elems, k, key[k], exec, fn, value );
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
	},

	now: function() {
		return (new Date()).getTime();
	},

	// Use of jQuery.browser is frowned upon.
	// More details: http://docs.jquery.com/Utilities/jQuery.browser
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	sub: function() {
		function jQuerySubclass( selector, context ) {
			return new jQuerySubclass.fn.init( selector, context );
		}
		jQuery.extend( true, jQuerySubclass, this );
		jQuerySubclass.superclass = this;
		jQuerySubclass.fn = jQuerySubclass.prototype = this();
		jQuerySubclass.fn.constructor = jQuerySubclass;
		jQuerySubclass.subclass = this.subclass;
		jQuerySubclass.fn.init = function init( selector, context ) {
			if ( context && context instanceof jQuery && !(context instanceof jQuerySubclass) ) {
				context = jQuerySubclass(context);
			}

			return jQuery.fn.init.call( this, selector, context, rootjQuerySubclass );
		};
		jQuerySubclass.fn.init.prototype = jQuerySubclass.fn;
		var rootjQuerySubclass = jQuerySubclass(document);
		return jQuerySubclass;
	},

	browser: {}
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
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

// IE doesn't match non-breaking spaces with \s
if ( rnotwhite.test( "\xA0" ) ) {
	trimLeft = /^[\s\xA0]+/;
	trimRight = /[\s\xA0]+$/;
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
	} catch(e) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	// and execute any waiting functions
	jQuery.ready();
}

// Expose jQuery to the global object
return jQuery;

})();


var // Promise methods
	promiseMethods = "then done fail isResolved isRejected promise".split( " " ),
	// Static reference to slice
	sliceDeferred = [].slice;

jQuery.extend({
	// Create a simple deferred (one callbacks list)
	_Deferred: function() {
		var // callbacks list
			callbacks = [],
			// stored [ context , args ]
			fired,
			// to avoid firing when already doing so
			firing,
			// flag to know if the deferred has been cancelled
			cancelled,
			// the deferred itself
			deferred  = {

				// done( f1, f2, ...)
				done: function() {
					if ( !cancelled ) {
						var args = arguments,
							i,
							length,
							elem,
							type,
							_fired;
						if ( fired ) {
							_fired = fired;
							fired = 0;
						}
						for ( i = 0, length = args.length; i < length; i++ ) {
							elem = args[ i ];
							type = jQuery.type( elem );
							if ( type === "array" ) {
								deferred.done.apply( deferred, elem );
							} else if ( type === "function" ) {
								callbacks.push( elem );
							}
						}
						if ( _fired ) {
							deferred.resolveWith( _fired[ 0 ], _fired[ 1 ] );
						}
					}
					return this;
				},

				// resolve with given context and args
				resolveWith: function( context, args ) {
					if ( !cancelled && !fired && !firing ) {
						// make sure args are available (#8421)
						args = args || [];
						firing = 1;
						try {
							while( callbacks[ 0 ] ) {
								callbacks.shift().apply( context, args );
							}
						}
						finally {
							fired = [ context, args ];
							firing = 0;
						}
					}
					return this;
				},

				// resolve with this as context and given arguments
				resolve: function() {
					deferred.resolveWith( this, arguments );
					return this;
				},

				// Has this deferred been resolved?
				isResolved: function() {
					return !!( firing || fired );
				},

				// Cancel
				cancel: function() {
					cancelled = 1;
					callbacks = [];
					return this;
				}
			};

		return deferred;
	},

	// Full fledged deferred (two callbacks list)
	Deferred: function( func ) {
		var deferred = jQuery._Deferred(),
			failDeferred = jQuery._Deferred(),
			promise;
		// Add errorDeferred methods, then and promise
		jQuery.extend( deferred, {
			then: function( doneCallbacks, failCallbacks ) {
				deferred.done( doneCallbacks ).fail( failCallbacks );
				return this;
			},
			fail: failDeferred.done,
			rejectWith: failDeferred.resolveWith,
			reject: failDeferred.resolve,
			isRejected: failDeferred.isResolved,
			// Get a promise for this deferred
			// If obj is provided, the promise aspect is added to the object
			promise: function( obj ) {
				if ( obj == null ) {
					if ( promise ) {
						return promise;
					}
					promise = obj = {};
				}
				var i = promiseMethods.length;
				while( i-- ) {
					obj[ promiseMethods[i] ] = deferred[ promiseMethods[i] ];
				}
				return obj;
			}
		} );
		// Make sure only one callback list will be used
		deferred.done( failDeferred.cancel ).fail( deferred.cancel );
		// Unexpose cancel
		delete deferred.cancel;
		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}
		return deferred;
	},

	// Deferred helper
	when: function( firstParam ) {
		var args = arguments,
			i = 0,
			length = args.length,
			count = length,
			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
				firstParam :
				jQuery.Deferred();
		function resolveFunc( i ) {
			return function( value ) {
				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				if ( !( --count ) ) {
					// Strange bug in FF4:
					// Values changed onto the arguments object sometimes end up as undefined values
					// outside the $.when method. Cloning the object into a fresh array solves the issue
					deferred.resolveWith( deferred, sliceDeferred.call( args, 0 ) );
				}
			};
		}
		if ( length > 1 ) {
			for( ; i < length; i++ ) {
				if ( args[ i ] && jQuery.isFunction( args[ i ].promise ) ) {
					args[ i ].promise().then( resolveFunc(i), deferred.reject );
				} else {
					--count;
				}
			}
			if ( !count ) {
				deferred.resolveWith( deferred, args );
			}
		} else if ( deferred !== firstParam ) {
			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
		}
		return deferred.promise();
	}
});




(function() {

	jQuery.support = {};

	var div = document.createElement("div");

	div.style.display = "none";
	div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	var all = div.getElementsByTagName("*"),
		a = div.getElementsByTagName("a")[0],
		select = document.createElement("select"),
		opt = select.appendChild( document.createElement("option") ),
		input = div.getElementsByTagName("input")[0];

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
		checkOn: input.value === "on",

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Will be defined later
		deleteExpando: true,
		optDisabled: false,
		checkClone: false,
		noCloneEvent: true,
		noCloneChecked: true,
		boxModel: null,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableHiddenOffsets: true,
		reliableMarginRight: true
	};

	input.checked = true;
	jQuery.support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as diabled)
	select.disabled = true;
	jQuery.support.optDisabled = !opt.disabled;

	var _scriptEval = null;
	jQuery.support.scriptEval = function() {
		if ( _scriptEval === null ) {
			var root = document.documentElement,
				script = document.createElement("script"),
				id = "script" + jQuery.now();

			// Make sure that the execution of code works by injecting a script
			// tag with appendChild/createTextNode
			// (IE doesn't support this, fails, and uses .text instead)
			try {
				script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
			} catch(e) {}

			root.insertBefore( script, root.firstChild );

			if ( window[ id ] ) {
				_scriptEval = true;
				delete window[ id ];
			} else {
				_scriptEval = false;
			}

			root.removeChild( script );
		}

		return _scriptEval;
	};

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;

	} catch(e) {
		jQuery.support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
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
		var div = document.createElement("div"),
			body = document.getElementsByTagName("body")[0];

		// Frameset documents with no body should not run this code
		if ( !body ) {
			return;
		}

		div.style.width = div.style.paddingLeft = "1px";
		body.appendChild( div );
		jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;

		if ( "zoom" in div.style ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.style.display = "inline";
			div.style.zoom = 1;
			jQuery.support.inlineBlockNeedsLayout = div.offsetWidth === 2;

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "";
			div.innerHTML = "<div style='width:4px;'></div>";
			jQuery.support.shrinkWrapBlocks = div.offsetWidth !== 2;
		}

		div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
		var tds = div.getElementsByTagName("td");

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		jQuery.support.reliableHiddenOffsets = tds[0].offsetHeight === 0;

		tds[0].style.display = "";
		tds[1].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE < 8 fail this test)
		jQuery.support.reliableHiddenOffsets = jQuery.support.reliableHiddenOffsets && tds[0].offsetHeight === 0;
		div.innerHTML = "";

		// Check if div with explicit width and no margin-right incorrectly
		// gets computed margin-right based on width of container. For more
		// info see bug #3333
		// Fails in WebKit before Feb 2011 nightlies
		// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
		if ( document.defaultView && document.defaultView.getComputedStyle ) {
			div.style.width = "1px";
			div.style.marginRight = "0";
			jQuery.support.reliableMarginRight = ( parseInt(document.defaultView.getComputedStyle(div, null).marginRight, 10) || 0 ) === 0;
		}

		body.removeChild( div ).style.display = "none";
		div = tds = null;
	});

	// Technique from Juriy Zaytsev
	// http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
	var eventSupported = function( eventName ) {
		var el = document.createElement("div");
		eventName = "on" + eventName;

		// We only care about the case where non-standard event systems
		// are used, namely in IE. Short-circuiting here helps us to
		// avoid an eval call (in setAttribute) which can cause CSP
		// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
		if ( !el.attachEvent ) {
			return true;
		}

		var isSupported = (eventName in el);
		if ( !isSupported ) {
			el.setAttribute(eventName, "return;");
			isSupported = typeof el[eventName] === "function";
		}
		return isSupported;
	};

	jQuery.support.submitBubbles = eventSupported("submit");
	jQuery.support.changeBubbles = eventSupported("change");

	// release memory in IE
	div = all = a = null;
})();



var rbrace = /^(?:\{.*\}|\[.*\])$/;

jQuery.extend({
	cache: {},

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];

		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var internalKey = jQuery.expando, getByName = typeof name === "string", thisCache,

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ jQuery.expando ] : elem[ jQuery.expando ] && jQuery.expando;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || (pvt && id && !cache[ id ][ internalKey ])) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ jQuery.expando ] = id = ++jQuery.uuid;
			} else {
				id = jQuery.expando;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery
			// metadata on plain JS objects when the object is serialized using
			// JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ][ internalKey ] = jQuery.extend(cache[ id ][ internalKey ], name);
			} else {
				cache[ id ] = jQuery.extend(cache[ id ], name);
			}
		}

		thisCache = cache[ id ];

		// Internal jQuery data is stored in a separate object inside the object's data
		// cache in order to avoid key collisions between internal data and user-defined
		// data
		if ( pvt ) {
			if ( !thisCache[ internalKey ] ) {
				thisCache[ internalKey ] = {};
			}

			thisCache = thisCache[ internalKey ];
		}

		if ( data !== undefined ) {
			thisCache[ name ] = data;
		}

		// TODO: This is a hack for 1.5 ONLY. It will be removed in 1.6. Users should
		// not attempt to inspect the internal events object using jQuery.data, as this
		// internal data object is undocumented and subject to change.
		if ( name === "events" && !thisCache[name] ) {
			return thisCache[ internalKey ] && thisCache[ internalKey ].events;
		}

		return getByName ? thisCache[ name ] : thisCache;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var internalKey = jQuery.expando, isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,

			// See jQuery.data for more information
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {
			var thisCache = pvt ? cache[ id ][ internalKey ] : cache[ id ];

			if ( thisCache ) {
				delete thisCache[ name ];

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !isEmptyDataObject(thisCache) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( pvt ) {
			delete cache[ id ][ internalKey ];

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject(cache[ id ]) ) {
				return;
			}
		}

		var internalCache = cache[ id ][ internalKey ];

		// Browsers that fail expando deletion also refuse to delete expandos on
		// the window, but it will allow it on all other JS objects; other browsers
		// don't care
		if ( jQuery.support.deleteExpando || cache != window ) {
			delete cache[ id ];
		} else {
			cache[ id ] = null;
		}

		// We destroyed the entire user cache at once because it's faster than
		// iterating through each key, but we need to continue to persist internal
		// data if it existed
		if ( internalCache ) {
			cache[ id ] = {};
			// TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery
			// metadata on plain JS objects when the object is serialized using
			// JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}

			cache[ id ][ internalKey ] = internalCache;

		// Otherwise, we need to eliminate the expando on the node to avoid
		// false lookups in the cache for entries that no longer exist
		} else if ( isNode ) {
			// IE does not allow us to delete expando properties from nodes,
			// nor does it have a removeAttribute function on Document nodes;
			// we must handle all of these cases
			if ( jQuery.support.deleteExpando ) {
				delete elem[ jQuery.expando ];
			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( jQuery.expando );
			} else {
				elem[ jQuery.expando ] = null;
			}
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var data = null;

		if ( typeof key === "undefined" ) {
			if ( this.length ) {
				data = jQuery.data( this[0] );

				if ( this[0].nodeType === 1 ) {
					var attr = this[0].attributes, name;
					for ( var i = 0, l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = name.substr( 5 );
							dataAttr( this[0], name, data[ name ] );
						}
					}
				}
			}

			return data;

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			// Try to fetch any internally stored data first
			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
				data = dataAttr( this[0], key, data );
			}

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;

		} else {
			return this.each(function() {
				var $this = jQuery( this ),
					args = [ parts[0], value ];

				$this.triggerHandler( "setData" + parts[1] + "!", args );
				jQuery.data( this, key, value );
				$this.triggerHandler( "changeData" + parts[1] + "!", args );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		data = elem.getAttribute( "data-" + key );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				!jQuery.isNaN( data ) ? parseFloat( data ) :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// TODO: This is a hack for 1.5 ONLY to allow objects with a single toJSON
// property to be considered empty objects; this property always exists in
// order to make sure JSON.stringify does not expose internal metadata
function isEmptyDataObject( obj ) {
	for ( var name in obj ) {
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}




jQuery.extend({
	queue: function( elem, type, data ) {
		if ( !elem ) {
			return;
		}

		type = (type || "fx") + "queue";
		var q = jQuery._data( elem, type );

		// Speed up dequeue by getting out quickly if this is just a lookup
		if ( !data ) {
			return q || [];
		}

		if ( !q || jQuery.isArray(data) ) {
			q = jQuery._data( elem, type, jQuery.makeArray(data) );

		} else {
			q.push( data );
		}

		return q;
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift();

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

		if ( !queue.length ) {
			jQuery.removeData( elem, type + "queue", true );
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
		return this.each(function( i ) {
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




var rclass = /[\n\t\r]/g,
	rspaces = /\s+/,
	rreturn = /\r/g,
	rspecialurl = /^(?:href|src|style)$/,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea)?$/i,
	rradiocheck = /^(?:radio|checkbox)$/i;

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

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.attr );
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
			var classNames = (value || "").split( rspaces );

			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className ) {
						elem.className = value;

					} else {
						var className = " " + elem.className + " ",
							setClass = elem.className;

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
			var classNames = (value || "").split( rspaces );

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
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.toggleClass( value.call(this, i, self.attr("class"), stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( rspaces );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space seperated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
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
		if ( !arguments.length ) {
			var elem = this[0];

			if ( elem ) {
				if ( jQuery.nodeName( elem, "option" ) ) {
					// attributes.value is undefined in Blackberry 4.7 but
					// uses .value. See #6932
					var val = elem.attributes.value;
					return !val || val.specified ? elem.value : elem.text;
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

						// Don't return options that are disabled or in a disabled optgroup
						if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
								(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
					if ( one && !values.length && options.length ) {
						return jQuery( options[ index ] ).val();
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

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray(val) ) {
				val = jQuery.map(val, function (value) {
					return value == null ? "" : value + "";
				});
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
		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || elem.nodeType === 2 ) {
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
			// 'in' checks fail in Blackberry 4.7 #6931
			if ( (name in elem || elem[ name ] !== undefined) && notxml && !special ) {
				if ( set ) {
					// We can't allow the type property to be changed (since it causes problems in IE)
					if ( name === "type" && rtype.test( elem.nodeName ) && elem.parentNode ) {
						jQuery.error( "type property can't be changed" );
					}

					if ( value === null ) {
						if ( elem.nodeType === 1 ) {
							elem.removeAttribute( name );
						}

					} else {
						elem[ name ] = value;
					}
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

			// Ensure that missing attributes return undefined
			// Blackberry 4.7 returns "" from getAttribute #6938
			if ( !elem.attributes[ name ] && (elem.hasAttribute && !elem.hasAttribute( name )) ) {
				return undefined;
			}

			var attr = !jQuery.support.hrefNormalized && notxml && special ?
					// Some attributes require a special call on IE
					elem.getAttribute( name, 2 ) :
					elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return attr === null ? undefined : attr;
		}
		// Handle everything which isn't a DOM element node
		if ( set ) {
			elem[ name ] = value;
		}
		return elem[ name ];
	}
});




var rnamespaces = /\.(.*)$/,
	rformElems = /^(?:textarea|input|select)$/i,
	rperiod = /\./g,
	rspace = / /g,
	rescape = /[^\w\s.|`]/g,
	fcleanup = function( nm ) {
		return nm.replace(rescape, "\\$&");
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

		// TODO :: Use a try/catch until it's safe to pull this out (likely 1.6)
		// Minor release fix for bug #8018
		try {
			// For whatever reason, IE has trouble passing the window object
			// around, causing it to be cloned in the process
			if ( jQuery.isWindow( elem ) && ( elem !== window && !elem.frameElement ) ) {
				elem = window;
			}
		}
		catch ( e ) {}

		if ( handler === false ) {
			handler = returnFalse;
		} else if ( !handler ) {
			// Fixes bug #7229. Fix recommended by jdalton
			return;
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
		var elemData = jQuery._data( elem );

		// If no elemData is found then we must be trying to bind to one of the
		// banned noData elements
		if ( !elemData ) {
			return;
		}

		var events = elemData.events,
			eventHandle = elemData.handle;

		if ( !events ) {
			elemData.events = events = {};
		}

		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Handle the second event of a trigger and when
				// an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
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
			if ( !handleObj.guid ) {
				handleObj.guid = handler.guid;
			}

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

		if ( handler === false ) {
			handler = returnFalse;
		}

		var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
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
					jQuery.map( namespaces.slice(0).sort(), fcleanup ).join("\\.(?:.*\\.)?") + "(\\.|$)");
			}

			eventType = events[ type ];

			if ( !eventType ) {
				continue;
			}

			if ( !handler ) {
				for ( j = 0; j < eventType.length; j++ ) {
					handleObj = eventType[ j ];

					if ( all || namespace.test( handleObj.namespace ) ) {
						jQuery.event.remove( elem, origType, handleObj.handler, j );
						eventType.splice( j--, 1 );
					}
				}

				continue;
			}

			special = jQuery.event.special[ type ] || {};

			for ( j = pos || 0; j < eventType.length; j++ ) {
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
					jQuery.removeEvent( elem, type, elemData.handle );
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
				jQuery.removeData( elem, undefined, true );
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
				event[ jQuery.expando ] ? event :
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
					// XXX This code smells terrible. event.js should not be directly
					// inspecting the data cache
					jQuery.each( jQuery.cache, function() {
						// internalKey variable is just used to make it easier to find
						// and potentially change this stuff later; currently it just
						// points to jQuery.expando
						var internalKey = jQuery.expando,
							internalCache = this[ internalKey ];
						if ( internalCache && internalCache.events && internalCache.events[ type ] ) {
							jQuery.event.trigger( event, data, internalCache.handle.elem );
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
		var handle = jQuery._data( elem, "handle" );

		if ( handle ) {
			handle.apply( elem, data );
		}

		var parent = elem.parentNode || elem.ownerDocument;

		// Trigger an inline bound script
		try {
			if ( !(elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) ) {
				if ( elem[ "on" + type ] && elem[ "on" + type ].apply( elem, data ) === false ) {
					event.result = false;
					event.preventDefault();
				}
			}

		// prevent IE from throwing an error for some elements with some event types, see #3533
		} catch (inlineError) {}

		if ( !event.isPropagationStopped() && parent ) {
			jQuery.event.trigger( event, data, parent, true );

		} else if ( !event.isDefaultPrevented() ) {
			var old,
				target = event.target,
				targetType = type.replace( rnamespaces, "" ),
				isClick = jQuery.nodeName( target, "a" ) && targetType === "click",
				special = jQuery.event.special[ targetType ] || {};

			if ( (!special._default || special._default.call( elem, event ) === false) &&
				!isClick && !(target && target.nodeName && jQuery.noData[target.nodeName.toLowerCase()]) ) {

				try {
					if ( target[ targetType ] ) {
						// Make sure that we don't accidentally re-trigger the onFOO events
						old = target[ "on" + targetType ];

						if ( old ) {
							target[ "on" + targetType ] = null;
						}

						jQuery.event.triggered = event.type;
						target[ targetType ]();
					}

				// prevent IE from throwing an error for some elements with some event types, see #3533
				} catch (triggerError) {}

				if ( old ) {
					target[ "on" + targetType ] = old;
				}

				jQuery.event.triggered = undefined;
			}
		}
	},

	handle: function( event ) {
		var all, handlers, namespaces, namespace_re, events,
			namespace_sort = [],
			args = jQuery.makeArray( arguments );

		event = args[0] = jQuery.event.fix( event || window.event );
		event.currentTarget = this;

		// Namespaced event handlers
		all = event.type.indexOf(".") < 0 && !event.exclusive;

		if ( !all ) {
			namespaces = event.type.split(".");
			event.type = namespaces.shift();
			namespace_sort = namespaces.slice(0).sort();
			namespace_re = new RegExp("(^|\\.)" + namespace_sort.join("\\.(?:.*\\.)?") + "(\\.|$)");
		}

		event.namespace = event.namespace || namespace_sort.join(".");

		events = jQuery._data(this, "events");

		handlers = (events || {})[ event.type ];

		if ( events && handlers ) {
			// Clone the handlers to prevent manipulation
			handlers = handlers.slice(0);

			for ( var j = 0, l = handlers.length; j < l; j++ ) {
				var handleObj = handlers[ j ];

				// Filter the functions by class
				if ( all || namespace_re.test( handleObj.namespace ) ) {
					// Pass in a reference to the handler function itself
					// So that we can later remove it
					event.handler = handleObj.handler;
					event.data = handleObj.data;
					event.handleObj = handleObj;

					var ret = handleObj.handler.apply( this, args );

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

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
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
			// Fixes #1925 where srcElement might not be defined either
			event.target = event.srcElement || document;
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
			var doc = document.documentElement,
				body = document.body;

			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
		}

		// Add which for key events
		if ( event.which == null && (event.charCode != null || event.keyCode != null) ) {
			event.which = event.charCode != null ? event.charCode : event.keyCode;
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
				jQuery.event.add( this,
					liveConvert( handleObj.origType, handleObj.selector ),
					jQuery.extend({}, handleObj, {handler: liveHandler, guid: handleObj.handler.guid}) );
			},

			remove: function( handleObj ) {
				jQuery.event.remove( this, liveConvert( handleObj.origType, handleObj.selector ), handleObj );
			}
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
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

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// timeStamp is buggy for some events on Firefox(#3843)
	// So we won't rely on the native value
	this.timeStamp = jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
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

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
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

		// Chrome does something similar, the parentNode property
		// can be accessed but is null.
		if ( parent && parent !== document && !parent.parentNode ) {
			return;
		}
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
			if ( this.nodeName && this.nodeName.toLowerCase() !== "form" ) {
				jQuery.event.add(this, "click.specialSubmit", function( e ) {
					var elem = e.target,
						type = elem.type;

					if ( (type === "submit" || type === "image") && jQuery( elem ).closest("form").length ) {
						trigger( "submit", this, arguments );
					}
				});

				jQuery.event.add(this, "keypress.specialSubmit", function( e ) {
					var elem = e.target,
						type = elem.type;

					if ( (type === "text" || type === "password") && jQuery( elem ).closest("form").length && e.keyCode === 13 ) {
						trigger( "submit", this, arguments );
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

	var changeFilters,

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

		if ( !rformElems.test( elem.nodeName ) || elem.readOnly ) {
			return;
		}

		data = jQuery._data( elem, "_change_data" );
		val = getVal(elem);

		// the current data will be also retrieved by beforeactivate
		if ( e.type !== "focusout" || elem.type !== "radio" ) {
			jQuery._data( elem, "_change_data", val );
		}

		if ( data === undefined || val === data ) {
			return;
		}

		if ( data != null || val ) {
			e.type = "change";
			e.liveFired = undefined;
			jQuery.event.trigger( e, arguments[1], elem );
		}
	};

	jQuery.event.special.change = {
		filters: {
			focusout: testChange,

			beforedeactivate: testChange,

			click: function( e ) {
				var elem = e.target, type = elem.type;

				if ( type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select" ) {
					testChange.call( this, e );
				}
			},

			// Change has to be called before submit
			// Keydown will be called before keypress, which is used in submit-event delegation
			keydown: function( e ) {
				var elem = e.target, type = elem.type;

				if ( (e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") ||
					(e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
					type === "select-multiple" ) {
					testChange.call( this, e );
				}
			},

			// Beforeactivate happens also before the previous element is blurred
			// with this event you can't trigger a change event, but you can store
			// information
			beforeactivate: function( e ) {
				var elem = e.target;
				jQuery._data( elem, "_change_data", getVal(elem) );
			}
		},

		setup: function( data, namespaces ) {
			if ( this.type === "file" ) {
				return false;
			}

			for ( var type in changeFilters ) {
				jQuery.event.add( this, type + ".specialChange", changeFilters[type] );
			}

			return rformElems.test( this.nodeName );
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialChange" );

			return rformElems.test( this.nodeName );
		}
	};

	changeFilters = jQuery.event.special.change.filters;

	// Handle when the input is .focus()'d
	changeFilters.focus = changeFilters.beforeactivate;
}

function trigger( type, elem, args ) {
	// Piggyback on a donor event to simulate a different one.
	// Fake originalEvent to avoid donor's stopPropagation, but if the
	// simulated event prevents default then we do the same on the donor.
	// Don't pass args or remember liveFired; they apply to the donor event.
	var event = jQuery.extend( {}, args[ 0 ] );
	event.type = type;
	event.originalEvent = {};
	event.liveFired = undefined;
	jQuery.event.handle.call( elem, event );
	if ( event.isDefaultPrevented() ) {
		args[ 0 ].preventDefault();
	}
}

// Create "bubbling" focus and blur events
if ( document.addEventListener ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0;
		
		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};

		function handler( donor ) {
			// Donor event is always a native one; fix it and switch its type.
			// Let focusin/out handler cancel the donor focus/blur event.
			var e = jQuery.event.fix( donor );
			e.type = fix;
			e.originalEvent = {};
			jQuery.event.trigger( e, null, e.target );
			if ( e.isDefaultPrevented() ) {
				donor.preventDefault();
			}
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

		if ( jQuery.isFunction( data ) || data === false ) {
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
		var args = arguments,
			i = 1;

		// link all the functions, so any of them can unbind this click handler
		while ( i < args.length ) {
			jQuery.proxy( fn, args[ i++ ] );
		}

		return this.click( jQuery.proxy( fn, function( event ) {
			// Figure out which function to execute
			var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
			jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

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

		if ( typeof types === "object" && !types.preventDefault ) {
			for ( var key in types ) {
				context[ name ]( key, data, types[key], selector );
			}

			return this;
		}

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
				for ( var j = 0, l = context.length; j < l; j++ ) {
					jQuery.event.add( context[j], "live." + liveConvert( type, selector ),
						{ data: data, selector: selector, handler: fn, origType: type, origHandler: fn, preType: preType } );
				}

			} else {
				// unbind live handler
				context.unbind( "live." + liveConvert( type, selector ), fn );
			}
		}

		return this;
	};
});

function liveHandler( event ) {
	var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret,
		elems = [],
		selectors = [],
		events = jQuery._data( this, "events" );

	// Make sure we avoid non-left-click bubbling in Firefox (#3861) and disabled elements in IE (#6911)
	if ( event.liveFired === this || !events || !events.live || event.target.disabled || event.button && event.type === "click" ) {
		return;
	}

	if ( event.namespace ) {
		namespace = new RegExp("(^|\\.)" + event.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
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
		close = match[i];

		for ( j = 0; j < live.length; j++ ) {
			handleObj = live[j];

			if ( close.selector === handleObj.selector && (!namespace || namespace.test( handleObj.namespace )) && !close.elem.disabled ) {
				elem = close.elem;
				related = null;

				// Those two events require additional checking
				if ( handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave" ) {
					event.type = handleObj.preType;
					related = jQuery( event.relatedTarget ).closest( handleObj.selector )[0];
				}

				if ( !related || related !== elem ) {
					elems.push({ elem: elem, handleObj: handleObj, level: close.level });
				}
			}
		}
	}

	for ( i = 0, l = elems.length; i < l; i++ ) {
		match = elems[i];

		if ( maxLevel && match.level > maxLevel ) {
			break;
		}

		event.currentTarget = match.elem;
		event.data = match.handleObj.data;
		event.handleObj = match.handleObj;

		ret = match.handleObj.origHandler.apply( match.elem, arguments );

		if ( ret === false || event.isPropagationStopped() ) {
			maxLevel = match.level;

			if ( ret === false ) {
				stop = false;
			}
			if ( event.isImmediatePropagationStopped() ) {
				break;
			}
		}
	}

	return stop;
}

function liveConvert( type, selector ) {
	return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`").replace(rspace, "&");
}

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.bind( name, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}
});


/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = /\\/g,
	rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

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

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

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
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
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

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var match,
			type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace( rBackslash, "" );
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var found, item,
					filter = Expr.filter[ type ],
					left = match[1];

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
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		},
		type: function( elem ) {
			return elem.getAttribute( "type" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !rNonWord.test( part ),
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

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !rNonWord.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

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
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace( rBackslash, "" ) + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
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

		ID: function( match ) {
			return match[1].replace( rBackslash, "" );
		},

		TAG: function( match, curLoop ) {
			return match[1].replace( rBackslash, "" ).toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace( rBackslash, "" );
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			// Handle if an un-quoted value was used
			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
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

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			var attr = elem.getAttribute( "type" ), type = elem.type;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) 
			// use getAttribute instead to test this case
			return "text" === type && ( attr === type || attr === null );
		},

		radio: function( elem ) {
			return "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return "checkbox" === elem.type;
		},

		file: function( elem ) {
			return "file" === elem.type;
		},
		password: function( elem ) {
			return "password" === elem.type;
		},

		submit: function( elem ) {
			return "submit" === elem.type;
		},

		image: function( elem ) {
			return "image" === elem.type;
		},

		reset: function( elem ) {
			return "reset" === elem.type;
		},

		button: function( elem ) {
			return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					var first = match[2],
						last = match[3];

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

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
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

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
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
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// If the nodes are siblings (or identical) we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Utility function for retreiving the text value of an array of DOM nodes
Sizzle.getText = function( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += Sizzle.getText( elem.childNodes );
		}
	}

	return ret;
};

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

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

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
				
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );
					
					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}
				
				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );
						
					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}
							
						} else {
							return makeArray( [], extra );
						}
					}
					
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

	if ( matches ) {
		// Check to see if it's possible to do matchesSelector
		// on a disconnected node (IE 9 fails this)
		var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
			pseudoWorks = false;

		try {
			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( document.documentElement, "[test!='']:sizzle" );
	
		} catch( pseudoError ) {
			pseudoWorks = true;
		}

		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						var ret = matches.call( node, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || !disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9, so check for that
								node.document && node.document.nodeType !== 11 ) {
							return ret;
						}
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

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
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

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
			var match = false;
			
			elem = elem[dir];

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

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context ) {
	var match,
		tmpSet = [],
		later = "",
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
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	// Note: This RegExp should be improved, or likely pulled from Sizzle
	rmultiselector = /,/,
	isSimple = /^.[^:#\[\.,]*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.POS,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var ret = this.pushStack( "", "find", selector ),
			length = 0;

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
		var ret = [], i, l, cur = this[0];

		if ( jQuery.isArray( selectors ) ) {
			var match, selector,
				matches = {},
				level = 1;

			if ( cur && selectors.length ) {
				for ( i = 0, l = selectors.length; i < l; i++ ) {
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
							ret.push({ selector: selector, elem: cur, level: level });
						}
					}

					cur = cur.parentNode;
					level++;
				}
			}

			return ret;
		}

		var pos = POS.test( selectors ) ?
			jQuery( selectors, context || this.context ) : null;

		for ( i = 0, l = this.length; i < l; i++ ) {
			cur = this[i];

			while ( cur ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;

				} else {
					cur = cur.parentNode;
					if ( !cur || !cur.ownerDocument || cur === context ) {
						break;
					}
				}
			}
		}

		ret = ret.length > 1 ? jQuery.unique(ret) : ret;

		return this.pushStack( ret, "closest", selectors );
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
				jQuery( selector, context ) :
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
		var ret = jQuery.map( this, fn, until ),
			// The variable 'args' was introduced in
			// https://github.com/jquery/jquery/commit/52a0238
			// to work around a bug in Chrome 10 (Dev) and should be removed when the bug is fixed.
			// http://code.google.com/p/v8/issues/detail?id=1050
			args = slice.call(arguments);

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, args.join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

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

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
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
}




var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnocache = /<(?:script|object|embed|option|style)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
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
				var self = jQuery( this );

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
			var self = jQuery( this ),
				contents = self.contents();

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

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
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

			value = value.replace(rxhtmlTag, "<$1></$2>");

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
				var self = jQuery( this );

				self.html( value.call(this, i, self.html()) );
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
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.length ?
				this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
				this;
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, fragment, parent,
			value = args[0],
			scripts = [];

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
				results = jQuery.buildFragment( args, this, scripts );
			}

			fragment = results.fragment;

			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						// Make sure that we do not leak memory by inadvertently discarding
						// the original fragment (which might have attached data) instead of
						// using it; in addition, use the original fragment object for the last
						// item instead of first because it can end up being emptied incorrectly
						// in certain situations (Bug #8070).
						// Fragments from the fragment cache must always be cloned and never used
						// in place.
						results.cacheable || (l > 1 && i < lastIndex) ?
							jQuery.clone( fragment, true, true ) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;
	}
});

function root( elem, cur ) {
	return jQuery.nodeName(elem, "table") ?
		(elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
		elem;
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var internalKey = jQuery.expando,
		oldData = jQuery.data( src ),
		curData = jQuery.data( dest, oldData );

	// Switch to use the internal data object, if it exists, for the next
	// stage of data copying
	if ( (oldData = oldData[ internalKey ]) ) {
		var events = oldData.events;
				curData = curData[ internalKey ] = jQuery.extend({}, oldData);

		if ( events ) {
			delete curData.handle;
			curData.events = {};

			for ( var type in events ) {
				for ( var i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type + ( events[ type ][ i ].namespace ? "." : "" ) + events[ type ][ i ].namespace, events[ type ][ i ], events[ type ][ i ].data );
				}
			}
		}
	}
}

function cloneFixAttributes(src, dest) {
	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	var nodeName = dest.nodeName.toLowerCase();

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	dest.clearAttributes();

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	dest.mergeAttributes(src);

	// IE6-8 fail to clone children inside object elements that use
	// the proprietary classid attribute value (rather than the type
	// attribute) to identify the type of content to display
	if ( nodeName === "object" ) {
		dest.outerHTML = src.outerHTML;

	} else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set
		if ( src.checked ) {
			dest.defaultChecked = dest.checked = src.checked;
		}

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults,
		doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document);

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	if ( args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document &&
		args[0].charAt(0) === "<" && !rnocache.test( args[0] ) && (jQuery.support.checkClone || !rchecked.test( args[0] )) ) {

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
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;

		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;

		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = (i > 0 ? this.clone(true) : this).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( "getElementsByTagName" in elem ) {
		return elem.getElementsByTagName( "*" );
	
	} else if ( "querySelectorAll" in elem ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var clone = elem.cloneNode(true),
				srcElements,
				destElements,
				i;

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName
			// instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				cloneFixAttributes( srcElements[i], destElements[i] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		// Return the cloned set
		return clone;
},
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
				elem = elem.replace(rxhtmlTag, "<$1></$2>");

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
			for ( i = 0; ret[i]; i++ ) {
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
		var data, id, cache = jQuery.cache, internalKey = jQuery.expando, special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];

			if ( id ) {
				data = cache[ id ] && cache[ id ][ internalKey ];

				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						// This is a shortcut to avoid jQuery.event.remove's overhead
						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}

					// Null the DOM reference to avoid IE6/7/8 leak (#7054)
					if ( data.handle ) {
						data.handle.elem = null;
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




var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rdashAlpha = /-([a-z])/ig,
	// fixed for IE9, see #8346
	rupper = /([A-Z]|^ms)/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	getComputedStyle,
	currentStyle,

	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn.css = function( name, value ) {
	// Setting 'undefined' is a no-op
	if ( arguments.length === 2 && value === undefined ) {
		return this;
	}

	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	});
};

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity", "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"zIndex": true,
		"fontWeight": true,
		"opacity": true,
		"zoom": true,
		"lineHeight": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			// Make sure that NaN and null values aren't set. See: #7116
			if ( typeof value === "number" && isNaN( value ) || value == null ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( typeof value === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		// Make sure that we're working with the right name
		var ret, origName = jQuery.camelCase( name ),
			hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name, origName );
		}
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
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	},

	camelCase: function( string ) {
		return string.replace( rdashAlpha, fcamelCase );
	}
});

// DEPRECATED, Use jQuery.css() instead
jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			var val;

			if ( computed ) {
				if ( elem.offsetWidth !== 0 ) {
					val = getWH( elem, name, extra );

				} else {
					jQuery.swap( elem, cssShow, function() {
						val = getWH( elem, name, extra );
					});
				}

				if ( val <= 0 ) {
					val = curCSS( elem, name, name );

					if ( val === "0px" && currentStyle ) {
						val = currentStyle( elem, name, name );
					}

					if ( val != null ) {
						// Should return "auto" instead of 0, use 0 for
						// temporary backwards-compat
						return val === "" || val === "auto" ? "0px" : val;
					}
				}

				if ( val < 0 || val == null ) {
					val = elem.style[ name ];

					// Should return "auto" instead of 0, use 0 for
					// temporary backwards-compat
					return val === "" || val === "auto" ? "0px" : val;
				}

				return typeof val === "string" ? val : val + "px";
			}
		},

		set: function( elem, value ) {
			if ( rnumpx.test( value ) ) {
				// ignore negative width and height values #1599
				value = parseFloat(value);

				if ( value >= 0 ) {
					return value + "px";
				}

			} else {
				return value;
			}
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
				(parseFloat(RegExp.$1) / 100) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style;

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// Set the alpha filter to set the opacity
			var opacity = jQuery.isNaN(value) ?
				"" :
				"alpha(opacity=" + value * 100 + ")",
				filter = style.filter || "";

			style.filter = ralpha.test(filter) ?
				filter.replace(ralpha, opacity) :
				style.filter + ' ' + opacity;
		}
	};
}

jQuery(function() {
	// This hook cannot be added until DOM ready because the support test
	// for it is not run until after DOM ready
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				var ret;
				jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						ret = curCSS( elem, "margin-right", "marginRight" );
					} else {
						ret = elem.style.marginRight;
					}
				});
				return ret;
			}
		};
	}
});

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, newName, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( !(defaultView = elem.ownerDocument.defaultView) ) {
			return undefined;
		}

		if ( (computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			rsLeft = elem.runtimeStyle && elem.runtimeStyle[ name ],
			style = elem.style;

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {
			// Remember the original values
			left = style.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : (ret || 0);
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {
	var which = name === "width" ? cssWidth : cssHeight,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight;

	if ( extra === "border" ) {
		return val;
	}

	jQuery.each( which, function() {
		if ( !extra ) {
			val -= parseFloat(jQuery.css( elem, "padding" + this )) || 0;
		}

		if ( extra === "margin" ) {
			val += parseFloat(jQuery.css( elem, "margin" + this )) || 0;

		} else {
			val -= parseFloat(jQuery.css( elem, "border" + this + "Width" )) || 0;
		}
	});

	return val;
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rspacesAjax = /\s+/,
	rts = /([?&])_=[^&]*/,
	rucHeaders = /(^|\-)([a-z])/g,
	rucHeadersFunc = function( _, $1, $2 ) {
		return $1 + $2.toUpperCase();
	},
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Document location
	ajaxLocation,

	// Document location segments
	ajaxLocParts;

// #8138, IE may throw an exception when accessing
// a field from document.location if document.domain has been set
try {
	ajaxLocation = document.location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		if ( jQuery.isFunction( func ) ) {
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
				i = 0,
				length = dataTypes.length,
				dataType,
				list,
				placeBefore;

			// For each dataType in the dataTypeExpression
			for(; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

//Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters ),
		selection;

	for(; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf( " " );
		if ( off >= 0 ) {
			var selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = undefined;

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
			// Complete callback (responseText is used internally)
			complete: function( jqXHR, status, responseText ) {
				// Store the response as specified by the jqXHR object
				responseText = jqXHR.responseText;
				// If successful, inject the HTML into all the matched elements
				if ( jqXHR.isResolved() ) {
					// #4825: Get the actual response in case
					// a dataFilter is present in ajaxSettings
					jqXHR.done(function( r ) {
						responseText = r;
					});
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						responseText );
				}

				if ( callback ) {
					self.each( callback, [ responseText, status, jqXHR ] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},

	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.bind( o, f );
	};
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
} );

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function ( target, settings ) {
		if ( !settings ) {
			// Only one parameter, we extend ajaxSettings
			settings = target;
			target = jQuery.extend( true, jQuery.ajaxSettings, settings );
		} else {
			// target was provided, we extend into it
			jQuery.extend( true, target, jQuery.ajaxSettings, settings );
		}
		// Flatten fields we don't want deep extended
		for( var field in { context: 1, url: 1 } ) {
			if ( field in settings ) {
				target[ field ] = settings[ field ];
			} else if( field in jQuery.ajaxSettings ) {
				target[ field ] = jQuery.ajaxSettings[ field ];
			}
		}
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": "*/*"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery._Deferred(),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// ifModified key
			ifModifiedKey,
			// Headers (they are sent all at once)
			requestHeaders = {},
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// The jqXHR state
			state = 0,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						requestHeaders[ name.toLowerCase().replace( rucHeaders, rucHeadersFunc ) ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || "abort";
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, statusText, responses, headers ) {

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status ? 4 : 0;

			var isSuccess,
				success,
				error,
				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
				lastModified,
				etag;

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
						jQuery.lastModified[ ifModifiedKey ] = lastModified;
					}
					if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
						jQuery.etag[ ifModifiedKey ] = etag;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					try {
						success = ajaxConvert( s, response );
						statusText = "success";
						isSuccess = true;
					} catch(e) {
						// We have a parsererror
						statusText = "parsererror";
						error = e;
					}
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = statusText;

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.resolveWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.done;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.then( tmp, tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefiler, stop there
		if ( state === 2 ) {
			return false;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( (ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			requestHeaders[ "Content-Type" ] = s.contentType;
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				requestHeaders[ "If-Modified-Since" ] = jQuery.lastModified[ ifModifiedKey ];
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				requestHeaders[ "If-None-Match" ] = jQuery.etag[ ifModifiedKey ];
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		requestHeaders.Accept = s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
			s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", */*; q=0.01" : "" ) :
			s.accepts[ "*" ];

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already
				jqXHR.abort();
				return false;

		}

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( status < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					jQuery.error( e );
				}
			}
		}

		return jqXHR;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : value;
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray( obj ) && obj.length ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
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
				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && obj != null && typeof obj === "object" ) {
		// If we see an array here, it is empty and should be treated as an empty
		// object
		if ( jQuery.isArray( obj ) || jQuery.isEmptyObject( obj ) ) {
			add( prefix, "" );

		// Serialize object item.
		} else {
			for ( var name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields,
		ct,
		type,
		finalDataType,
		firstDataType;

	// Fill responseXXX fields
	for( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	var dataTypes = s.dataTypes,
		converters = {},
		i,
		key,
		length = dataTypes.length,
		tmp,
		// Current and previous dataTypes
		current = dataTypes[ 0 ],
		prev,
		// Conversion expression
		conversion,
		// Conversion function
		conv,
		// Conversion functions (transitive conversion)
		conv1,
		conv2;

	// For each dataType in the chain
	for( i = 1; i < length; i++ ) {

		// Create converters map
		// with lowercased keys
		if ( i === 1 ) {
			for( key in s.converters ) {
				if( typeof key === "string" ) {
					converters[ key.toLowerCase() ] = s.converters[ key ];
				}
			}
		}

		// Get the dataTypes
		prev = current;
		current = dataTypes[ i ];

		// If current is auto dataType, update it to prev
		if( current === "*" ) {
			current = prev;
		// If no auto and dataTypes are actually different
		} else if ( prev !== "*" && prev !== current ) {

			// Get the converter
			conversion = prev + " " + current;
			conv = converters[ conversion ] || converters[ "* " + current ];

			// If there is no direct converter, search transitively
			if ( !conv ) {
				conv2 = undefined;
				for( conv1 in converters ) {
					tmp = conv1.split( " " );
					if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
						conv2 = converters[ tmp[1] + " " + current ];
						if ( conv2 ) {
							conv1 = converters[ conv1 ];
							if ( conv1 === true ) {
								conv = conv2;
							} else if ( conv2 === true ) {
								conv = conv1;
							}
							break;
						}
					}
				}
			}
			// If we found no converter, dispatch an error
			if ( !( conv || conv2 ) ) {
				jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
			}
			// If found converter is not an equivalence
			if ( conv !== true ) {
				// Convert with 1 or 2 converters accordingly
				response = conv ? conv( response ) : conv2( conv1(response) );
			}
		}
	}
	return response;
}




var jsc = jQuery.now(),
	jsre = /(\=)\?(&|$)|\?\?/i;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		return jQuery.expando + "_" + ( jsc++ );
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var dataIsString = ( typeof s.data === "string" );

	if ( s.dataTypes[ 0 ] === "jsonp" ||
		originalSettings.jsonpCallback ||
		originalSettings.jsonp != null ||
		s.jsonp !== false && ( jsre.test( s.url ) ||
				dataIsString && jsre.test( s.data ) ) ) {

		var responseContainer,
			jsonpCallback = s.jsonpCallback =
				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
			previous = window[ jsonpCallback ],
			url = s.url,
			data = s.data,
			replace = "$1" + jsonpCallback + "$2",
			cleanUp = function() {
				// Set callback back to previous value
				window[ jsonpCallback ] = previous;
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( previous ) ) {
					window[ jsonpCallback ]( responseContainer[ 0 ] );
				}
			};

		if ( s.jsonp !== false ) {
			url = url.replace( jsre, replace );
			if ( s.url === url ) {
				if ( dataIsString ) {
					data = data.replace( jsre, replace );
				}
				if ( s.data === data ) {
					// Add callback manually
					url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
				}
			}
		}

		s.url = url;
		s.data = data;

		// Install callback
		window[ jsonpCallback ] = function( response ) {
			responseContainer = [ response ];
		};

		// Install cleanUp function
		jqXHR.then( cleanUp, cleanUp );

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( jsonpCallback + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Delegate to script
		return "script";
	}
} );




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
} );




var // #5280: next active xhr id and list of active xhrs' callbacks
	xhrId = jQuery.now(),
	xhrCallbacks,

	// XHR used to determine supports properties
	testXHR;

// #5280: Internet Explorer will keep connections alive if we don't abort on unload
function xhrOnUnloadAbort() {
	jQuery( window ).unload(function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Test if we can create an xhr object
testXHR = jQuery.ajaxSettings.xhr();
jQuery.support.ajax = !!testXHR;

// Does this browser support crossDomain XHR requests
jQuery.support.cors = testXHR && ( "withCredentials" in testXHR );

// No need for the temporary xhr anymore
testXHR = undefined;

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var xhr = s.xhr(),
						handle,
						i;

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occured
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									delete xhrCallbacks[ handle ];
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}
									responses.text = xhr.responseText;

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					// if we're in sync mode or it's in cache
					// and has been retrieved directly (IE6 & IE7)
					// we need to manually fire the callback
					if ( !s.async || xhr.readyState === 4 ) {
						callback();
					} else {
						// Create the active xhrs callbacks list if needed
						// and attach the unload handler
						if ( !xhrCallbacks ) {
							xhrCallbacks = {};
							xhrOnUnloadAbort();
						}
						// Add to list of active xhrs callbacks
						handle = xhrId++;
						xhr.onreadystatechange = xhrCallbacks[ handle ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}




var elemdisplay = {},
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
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
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback);

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[i];
				display = elem.style.display;

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
					display = elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( display === "" && jQuery.css( elem, "display" ) === "none" ) {
					jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				elem = this[i];
				display = elem.style.display;

				if ( display === "" || display === "none" ) {
					elem.style.display = jQuery._data(elem, "olddisplay") || "";
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				var display = jQuery.css( this[i], "display" );

				if ( display !== "none" && !jQuery._data( this[i], "olddisplay" ) ) {
					jQuery._data( this[i], "olddisplay", display );
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				this[i].style.display = "none";
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete );
		}

		return this[ optall.queue === false ? "each" : "queue" ](function() {
			// XXX 'this' does not always have a nodeName when running the
			// test suite

			var opt = jQuery.extend({}, optall), p,
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				self = this;

			for ( p in prop ) {
				var name = jQuery.camelCase( p );

				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
					p = name;
				}

				if ( prop[p] === "hide" && hidden || prop[p] === "show" && !hidden ) {
					return opt.complete.call(this);
				}

				if ( isElement && ( p === "height" || p === "width" ) ) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height
					// animated
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {
						if ( !jQuery.support.inlineBlockNeedsLayout ) {
							this.style.display = "inline-block";

						} else {
							var display = defaultDisplay(this.nodeName);

							// inline-level elements accept inline-block;
							// block-level elements need to be inline with layout
							if ( display === "inline" ) {
								this.style.display = "inline-block";

							} else {
								this.style.display = "inline";
								this.style.zoom = 1;
							}
						}
					}
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
						start = e.cur();

					if ( parts ) {
						var end = parseFloat( parts[2] ),
							unit = parts[3] || ( jQuery.cssNumber[ name ] ? "" : "px" );

						// We need to compute starting value
						if ( unit !== "px" ) {
							jQuery.style( self, name, (end || 1) + unit);
							start = ((end || 1) / e.cur()) * start;
							jQuery.style( self, name, start + unit);
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

function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function() {
		obj[ this ] = type;
	});

	return obj;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show", 1),
	slideUp: genFx("hide", 1),
	slideToggle: genFx("toggle", 1),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

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
	},

	// Get the current size
	cur: function() {
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
			return this.elem[ this.prop ];
		}

		var parsed,
			r = jQuery.css( this.elem, this.prop );
		// Empty strings, null, undefined and "auto" are converted to 0,
		// complex values such as "rotate(1rad)" are returned as is,
		// simple values such as "10px" are parsed to Float.
		return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
	},

	// Start an animation from one number to another
	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx;

		this.startTime = jQuery.now();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );
		this.now = this.start;
		this.pos = this.state = 0;

		function t( gotoEnd ) {
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval(fx.tick, fx.interval);
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
		var t = jQuery.now(), done = true;

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
				// Reset the overflow
				if ( this.options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {
					var elem = this.elem,
						options = this.options;

					jQuery.each( [ "", "X", "Y" ], function (index, value) {
						elem.style[ "overflow" + value ] = options.overflow[index];
					} );
				}

				// Hide the element if the "hide" operation was done
				if ( this.options.hide ) {
					jQuery(this.elem).hide();
				}

				// Reset the properties, if the item has been hidden or shown
				if ( this.options.hide || this.options.show ) {
					for ( var p in this.options.curAnim ) {
						jQuery.style( this.elem, p, this.options.orig[p] );
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

	interval: 13,

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
			jQuery.style( fx.elem, "opacity", fx.now );
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

function defaultDisplay( nodeName ) {
	if ( !elemdisplay[ nodeName ] ) {
		var elem = jQuery("<" + nodeName + ">").appendTo("body"),
			display = elem.css("display");

		elem.remove();

		if ( display === "none" || display === "" ) {
			display = "block";
		}

		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0], box;

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

		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		var doc = elem.ownerDocument,
			docElem = doc.documentElement;

		// Make sure we're not dealing with a disconnected DOM node
		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

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

		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

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

				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
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
		var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat( jQuery.css(body, "marginTop") ) || 0,
			html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

		jQuery.extend( container.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" } );

		container.innerHTML = html;
		body.insertBefore( container, body.firstChild );
		innerDiv = container.firstChild;
		checkDiv = innerDiv.firstChild;
		td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		checkDiv.style.position = "fixed";
		checkDiv.style.top = "20px";

		// safari subtracts parent border width here which is 5px
		this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
		checkDiv.style.position = checkDiv.style.top = "";

		innerDiv.style.overflow = "hidden";
		innerDiv.style.position = "relative";

		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);

		body.removeChild( container );
		jQuery.offset.initialize = jQuery.noop;
	},

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		jQuery.offset.initialize();

		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray('auto', [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
		}

		curTop  = calculatePosition ? curPosition.top  : parseInt( curCSSTop,  10 ) || 0;
		curLeft = calculatePosition ? curPosition.left : parseInt( curCSSLeft, 10 ) || 0;

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if (options.top != null) {
			props.top = (options.top - curOffset.top) + curTop;
		}
		if (options.left != null) {
			props.left = (options.left - curOffset.left) + curLeft;
		}

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
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
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
	return jQuery.isWindow( elem ) ?
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
			parseFloat( jQuery.css( this[0], type, "padding" ) ) :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn["outer" + name] = function( margin ) {
		return this[0] ?
			parseFloat( jQuery.css( this[0], type, margin ? "margin" : "border" ) ) :
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

		if ( jQuery.isWindow( elem ) ) {
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
			var docElemProp = elem.document.documentElement[ "client" + name ];
			return elem.document.compatMode === "CSS1Compat" && docElemProp ||
				elem.document.body[ "client" + name ] || docElemProp;

		// Get document width or height
		} else if ( elem.nodeType === 9 ) {
			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
			return Math.max(
				elem.documentElement["client" + name],
				elem.body["scroll" + name], elem.documentElement["scroll" + name],
				elem.body["offset" + name], elem.documentElement["offset" + name]
			);

		// Get or set width or height on the element
		} else if ( size === undefined ) {
			var orig = jQuery.css( elem, type ),
				ret = parseFloat( orig );

			return jQuery.isNaN( ret ) ? orig : ret;

		// Set the width or height on the element (default to pixels if value is unitless)
		} else {
			return this.css( type, typeof size === "string" ? size : size + "px" );
		}
	};

});


window.jQuery = window.$ = jQuery;
})(window);

//-------------------------------------------------------------------
// cudbase.js

var cudBase = {
authors:[
['0','[qbjbyartb]'],
['nqnz','Nqnzfxv Wnebfłnj'],
['nzne','Nznenagvn'],
['nzn','Nznenagvn'],
['nanaq','NanaqnAn'],
['nabav','nabavz / avrmanal'],
['negzn','Negzna'],
['ngzna','Ngzna'],
['nhthf','Nhthfglabjvpm Orngn'],
['ontv','Ontvńfxn Zntqnyran'],
['ontva','Ontvńfxn Zntqnyran'],
['oneqn','Oneqn Wnprx'],
['onegb','Onegbfvx Cnjrł'],
['oncvb','Onegbfm Cvbge'],
['','Onfmxn iba Unass'],
['onmtv','Onmtvre Naqemrw'],
['orzxr','Orzxr Unaan'],
['oreqb','Oreqbjvpm Nyrxfnaqre'],
['orera','Orerag Wbynagn Znevn'],
['ovnyz','Ovnłnpu Znłtbemngn'],
['ovnyn','Ovnłnpu Znerx'],
['ovnyx','Ovnłxbjfxv Znpvrw'],
['ovrtn','Ovrtnńfxv Obtqna'],
['ovrt','Ovrtnńfxv Obtqna Wna'],
['oynpu','Oynpubjfxv Zvpunł'],
['obane','Obanefxv Znepva'],
['oemrm','Oemrźavnx Qnahgn'],
['ohxbj','Ohxbjfxv Fgrsna'],
['puryz','Purłzvpxn Wbnaan'],
['pvrfv','Pvrfvryfxn Śjvrgynan'],
['pvby','Pvbłxbjfxv Temrtbem'],
['pvbyx','Pvbłxbjfxv Temrtbem'],
['pbqv','Pbqvf'],
['phxvr','Phxvrerx'],
['pnwxn','Pmnwxn Xelfglan'],
['pmnwx','Pmnwxn-Onegbfvx Tenżlan'],
['pmnez','Pmnezvńfxn  Angnfmn'],
['pmhon','Pmhon Zvpunł'],
['pmlon','Pmlon Gbznfm'],
['Q.F.C','Q.F.C.'],
['qnavr','Qnavryhx Xngnemlan'],
['qnfmx','Qnfmxr Jbwpvrpu'],
['qryn','Qryn Znłtbemngn'],
['qrera','Qreragbjvpm Cvbge'],
['qrjrp','Qrjrpxv Wreml'],
['qrlri','Qrlri Nyrxfnaqre'],
['qyht','Qłhtbfmrjfxv Gbznfm'],
['qboxr','Qboxr Enqrx'],
['qbcv','Qbcvrenłn Jvgrx'],
['qbcvr','Qbcvrenłn Jvgrx'],
['qhab','Qhab Orvafn'],
['rqb','RQB'],
['RG','RG'],
['tncva','Tncvńfxn Fnaqen'],
['trohe','Tęohen Naan'],
['tbyhf','Tbłhfmxb Jvxgbe'],
['tbenh','Tbenhf Cvbge'],
['tbfm','Tbfmpm Znegn'],
['tebor','Teboryal Zvpunł'],
['tebo','Teboryal Zvpunł'],
['tebar','Tebareg Wnebfłnj'],
['tehmy','Tehmyn Wnebfynj'],
['temrt','Temrtbemrjfxv Zvpunł'],
['temr','Temrśxbjvnx Znevna'],
['tjneq','Tjneqvnx Obtqna'],
['unevn','Unevnat Xnhe'],
['urvae','Urvaevpu Tenżlan'],
['ubwra','Ubwrńfxn Orngn'],
['ubea','UbEa Cvbge'],
['ulofm','Ulofm Qnjvq'],
['vagr','vagrearg'],
['jrofv','Vagrearg'],
['vjnf','Vjnfmxvrjvpm Xvatn'],
['wnerx','w@erx'],
['wnpmr','Wnpmrjfxv Cvbge'],
['wntbq','Wntbqmvńfxn Wómrsvan'],
['wnarx','Wnarx'],
['wnegl','Wnegl Wnenf'],
['wruyr','Wruyr Znexhf'],
['wrmb','Wrżbjfxn Xngnemlan'],
['whexb','Whexb Ntavrfmxn'],
['xnpmh','Xnpmhfvn'],
['xnyhr','Xnłhfxn Rjn Ynyvgn W.'],
['xnyho','Xnłhfxv Obthfłnj'],
['xnavp','Xnavpxn R. Ryyra'],
['xnenf','Xnenfmrjfxv Nqnz W'],
['xnmv','Xnmv eQriv'],
['xnqmv','Xąqmvryn Zverx'],
['xunqt','Xunqtne'],
['xyvat','Xyvatunzzre Nyrknaqen'],
['xyhmn','Xyhmn Naqemrw'],
['xbffb','Xbffbjfxn Xngnemlan'],
['xbfma','Xbfmavx Ebzhnyq'],
['xbjny','Xbjny Znepva'],
['xenxz','Xenx Znerx'],
['xenxb','Xenxbjvnx Eboreg'],
['xevf','Xevf'],
['xevfm','Xevfmanzhegv Wvqqh'],
['xnaln','Xebatobba Xnaln'],
['xehpu','Xehpubjfxn Ryżovrgn Whyvn'],
['xemrx','Xemrxbgbjfxv Yrfmrx'],
['xemrz','Xemrzvńfxv Cnjrł'],
['xhovn','Xhovnx Łhxnfm (Pyvag)'],
['xhzbe','Xhzbe Qbebgn'],
['xheav','Xheavx Znepva'],
['xhea','Xheavx Znepva'],
['xjnf','Xjnśavrjvpm Wnerx'],
['ynpub','Ynpubjfxn Qbebgn'],
['yrfm','Yrfmpmlńfxv Wnprx. N (Jfcółpmhwąpl)'],
['ybtn','Ybtn Qnevhfm'],
['ybtva','Ybtvabjn Ryvfnjrgn'],
['ynzrx','Łnzrx Nyrxfnaqre'],
['yhp','Łhp Znłtbemngn'],
['znwqn','Znwqn Fłnjbzve'],
['znwrj','Znwrjfxn Natryvxn Wbnaan'],
['znytb','Znłtbfvn'],
['znexb','Znexbjfxn Orngn'],
['znef','Znefmnłrx Avxbqrz'],
['zneg','Zneglan'],
['qhov','Znguvnf Cnhyhf Qhovpxhf'],
['znghf','Znghfvnx Znłtbemngn '],
['znmh','Znmhe Zbavxn'],
['znmhe','Znmhexvrjvpm Znerx'],
['znxn','Ząxn Zntqnyran'],
['zo','ZO'],
['zreuy','Zreuyva'],
['zvpun','Zvpunłbjfxn Nqevnan'],
['zvryb','Zvrybpu Onfvn'],
['zvrea','Zvreavpxn Xngnemlan'],
['zvxhy','Zvxhyfxv Wnerx'],
['zveba','Zvebńfxv Nyqban'],
['zavfm','Zavfmrjfxn Jnaqn'],
['zhfvn','Zhfvnłbjvpm  Znpvrw'],
['janje','Anjebpxv Jbwpvrpu'],
['anjej','Anjebpxv Jbwpvrpu'],
['anjeb','Anjebg Gbzrx'],
['avrzv','Avrzvrp Cemrzlfłnj'],
['avxbe','Avxben Naan'],
['avznv','Avznv'],
['avzn','Avznv'],
['avaxn','Avaxn'],
['abjnx','Abjnx Wnprx'],
['xabj','Abjnx Xnzvy'],
['anjvx','Abjvxbj Jvgbyq'],
['bobmn','Bobmn Wnxho'],
['beeyr','Bee Yrbaneq'],
['bfgbw','Bfgbwn Qnavry'],
['bmvzr','Bmvzrx Znegn'],
['Cnaqr','Cnaqrefxn Ntavrfmxn'],
['cenwa','Cnenznunzfn Cenwanananaqn'],
['cnyva','Cniyvan Fgrir'],
['cnjyn','Cnjynx Rjn'],
['cbqy','Cbqynfxn Vmn'],
['cby','Cby Znemran'],
['cbynx','Cbynx Znevbyn'],
['tbqrx','Cbłbpmnńfxn - Tbqrx Fłnjn'],
['cbybp','Cbłbpmnńfxn-Tbqrx Fłnjn'],
['cbavz','Cbavzvefxn Qvnan'],
['cberz','Cberzon Łhxnfm'],
['cebpu','Cebpubjfxv Movtavrj'],
['enzna','Enzna - ergv - qnf'],
['eQriv','eQriv Xnmv'],
['ebttr','Ebttraohpx Sevrqry'],
['ebzna','Ebznabjfxn Oneonen'],
['ebmpm','Ebfmpmlavnłn Xvatn'],
['ebmx','Ebmxbfm Naan'],
['ebmxb','Ebmxbfm Naan'],
['ehqav','Ehqavpxv Verarhfm'],
['elox','Eloxn Fłnjbzve'],
['fh','F.H.'],
['fnon','Fnon Cnjrł'],
['fnwna','Fnwnaxn'],
['fnav','Fnavtóefxn Ryżovrgn'],
['fnjv','Fnjvpxn Ntavrfmxn'],
['fnjvp','Fnjvpxv Cvbge'],
['fq','FQ'],
['frerz','Frerzrg Ensnł'],
['fvqbe','Fvqbexvrjvpm Ertvan'],
['fvren','Fvrenag Fronfgvna'],
['fvyir','Fvyire'],
['fxneo','Fxneorx Elfmneq'],
['fxbje','Fxbjebńfxn Xngnemlan'],
['nfxj','Fxjnerx Naan (nznMban)'],
['fbwn','Fbwn Znegn'],
['fgry','Fgryznpubjvpm Gbznfm'],
['fgelp','Fgelpunepmlx Cnjrł'],
['fuhqq','Fjnzv Fuhqqunanaqn Tvev'],
['fmnel','Fmneg Obtqna Temrtbem'],
['fmrwn','Fmrwnx iry Żrnx Unyvan'],
['fmhsy','Fmhsyn Xemlfmgbs'],
['fmjrq','Fmjrqn Qbebgn'],
['fmjre','Fmjrela Veran'],
['fyvjv','Śyvjvńfxn Rjn'],
['gramv','Gramva Jnatlny Evacbpmr'],
['gbxne','Gbxnem Qnzvna'],
['gbznf','Gbznfmrjfxn Xngnemlan'],
['gbzxb','Gbzxbjvnx  Cnjrł'],
['gbzx','Gbzxbjvnx Cnjrł Neghe'],
['gebwn','Gebwnabjfxv W. Znpvrw'],
['ghpun','Ghpunpm Łhxnfm'],
['nhyng','Hyngbjfxn Naan'],
['hyngb','Hyngbjfxv Movtavrj'],
['heona','Heona Flovyyr'],
['hfpvr','Hśpvrńfxn Wbnaan'],
['jnfxv','Jnśxvrjvpm Obthfłnj'],
['jngg','Jnggyrf Jnyynpr'],
['jnjem','Jnjemlavnx Jbwpvrpu'],
['jnlqr','Jnlqry Cvbge'],
['jqbj','Jqbjvnx Fgrsna Xneby, qe'],
['jrvff','Jrvff Pynhq'],
['jreqv','Jreqva Wbnpuvz'],
['jrgr','Jrgrena'],
['jvrpu','Jvrpun Rjn'],
['jvrpm','Jvrpmberx Yhpwna'],
['jvypm','Jvypmlńfxn Naan'],
['jvfa','Jvśavrjfxv Znevhfm'],
['jvfav','Jvśavbjfxn - Qbzfml Nyvan'],
['jynm','Jynmłb Molfmrx'],
['jbwpv','Jbwpvrpubjfxn Unaan'],
['jbyy','Jbyyrf Wbry'],
['lbt','Lbt'],
['mgnz','m Gnzgrw Fgebal'],
['mnyrj','Mnyrjfxn Grerfn Znevn, qe'],
['mnerj','Mnerj Jynqvzve'],
['mnero','Mneęon Qnjvq'],
['mvry','Mvrybaxb Temrtbem'],
['mvryb','Mvrybaxb Temrtbem'],
['vagre','źeóqłb: vagrearg'],
['mnqyb','Żąqłb Yrfmrx'],
['zmnq','Żąqłb Zntqn'],
['mhxbj','Żhxbjfxn Rjn']
],
users:[
[0,'[qbjbyartb]'],
[653,'-Onfvn-'],
[1034,'-xemlpub-'],
[144,'-Gbzrx'],
[837,'21tenz'],
[212,'57575'],
[903,'762'],
[748,'N-gn'],
[2184,'n1971'],
[2235,'N24'],
[4148,'nn'],
[472,'NNN'],
[34,'nnnfxn'],
[3412,'no'],
[3087,'NoonqbBA'],
[675,'nory'],
[1424,'Noreg'],
[10,'Nouvqunezn'],
[4318,'nov'],
[1862,'Noenxnqnoen'],
[4401,'Noenknf'],
[934,'nof'],
[3187,'npnmne'],
[4279,'Npunwxn'],
[1791,'Npunawngv'],
[2132,'npzr'],
[2745,'npmnevn'],
[2198,'nqn79'],
[4339,'nqnyxb1'],
[567,'Nqnz'],
[4249,'Nqnz W Xnenfmrjfxv'],
[4022,'nqnz11d'],
[4455,'NqnzW'],
[2862,'nqnzzr'],
[3570,'nqnzb910'],
[2848,'Nqnzjyxc'],
[2578,'nqqee'],
[4238,'Nqryn70'],
[1277,'nqryv'],
[1340,'NQRJ'],
[3922,'nqv17144'],
[2623,'nqvgv'],
[1940,'nqvin'],
[3913,'NqZv'],
[2474,'Nqevna'],
[908,'Nqevna X'],
[3811,'nqevna94'],
[4323,'NqevnaAb'],
[4334,'Nqhfvn'],
[1818,'NR'],
[496,'Nrvbhl'],
[1124,'Nrevf'],
[3381,'nrebqnapr'],
[2627,'Nrf Frqnv'],
[4430,'Nrfu'],
[3876,'NS1979'],
[479,'NstnA'],
[1315,'nsv'],
[4508,'Nsvzxn'],
[3731,'nt'],
[499,'Ntn'],
[1681,'ntn1976'],
[3744,'Ntn74'],
[954,'Ntnx'],
[2586,'Ntnzn'],
[1597,'NtnC'],
[1637,'Ntncr'],
[2480,'Ntnfxn'],
[1810,'NtnFb'],
[715,'ntngn'],
[2710,'Ntngn8899'],
[964,'ntngunX'],
[1943,'Ntngur'],
[4461,'Ntr'],
[3665,'Ntun-93'],
[1516,'Ntuvn'],
[1188,'ntuarfr'],
[1025,'Ntvxn'],
[261,'Ntxn'],
[427,'Ntarf'],
[2417,'ntarf27'],
[3617,'ntarfr'],
[3990,'ntarfc'],
[2843,'ntarfg7'],
[281,'Ntav'],
[2753,'Ntavrf'],
[590,'ntavrfmn'],
[208,'Ntavrfmxn'],
[906,'Ntavrfmxn Pmęfgxn'],
[2727,'ntavrfmxnfm'],
[364,'Ntavrfmxn_W'],
[1412,'Ntavun'],
[2390,'ntavznyx'],
[1280,'ntemljn'],
[4033,'ntg'],
[4002,'nthyn'],
[348,'nthyn79'],
[3844,'nthf'],
[524,'nthfvn'],
[3064,'nthśxn'],
[4280,'Nunengn'],
[1956,'nunjn'],
[520,'nuy'],
[3956,'Nvyrra'],
[3938,'nvzba'],
[4499,'Nvfun'],
[2190,'nwanz'],
[709,'Nxnr'],
[2907,'Nxnev'],
[1664,'Nxnfmn'],
[1590,'nxbjnyvx'],
[4425,'nxen'],
[2019,'Ny'],
[1045,'nyn'],
[1439,'Nyna'],
[341,'Nyn_Unyvan'],
[2649,'nyoreg'],
[3325,'nyoreg78'],
[966,'nyovtra'],
[3890,'nyoverb'],
[2060,'Nypurzvx'],
[3588,'nypurzvx68'],
[2549,'Nyqnoen'],
[379,'Nyqhf'],
[2427,'nyrs'],
[2750,'Nyrwnaqeb'],
[2754,'Nyrx06'],
[1428,'Nyrxf'],
[2985,'Nyrxfnaqre6868'],
[2648,'Nyrxfnaqen'],
[1319,'nyrar'],
[1092,'Nyrk'],
[938,'Nyrkn22'],
[3930,'NyrkGurSvefg'],
[4341,'Nysn Ebzrb'],
[682,'Nyserq'],
[1759,'Nyv'],
[1899,'nyvn'],
[4376,'nyvprq'],
[3016,'nyvqn'],
[1893,'nyvranag'],
[223,'Nyvan'],
[3972,'Nyvaxn'],
[410,'Nyvabru'],
[2584,'Nyvf'],
[4285,'Nyvf Jvgpu'],
[650,'nyxn'],
[1435,'Nyxnqn'],
[1094,'nyxnwbf'],
[928,'nyyna'],
[2149,'nyyra'],
[1793,'nyyvwn'],
[2790,'Nyyvfuxn'],
[2659,'nyyyna1'],
[251,'Nyzn'],
[1865,'nycebk'],
[2785,'nygure'],
[2571,'nyhgxn'],
[3211,'nylwnx'],
[4142,'Nzn'],
[4494,'nznqrhff'],
[611,'Nznqrhfm'],
[2389,'nznyxvrj'],
[849,'Nznaqn'],
[3001,'nznac'],
[2864,'Nznenagvn'],
[1526,'Nzngrenfh'],
[985,'nzngevn'],
[481,'Nznivm'],
[501,'nznMban'],
[2278,'nznmbaxn'],
[3819,'nzon'],
[530,'nzore'],
[2115,'nzovrag-u'],
[4131,'Nzohynafvx76'],
[3548,'nzrnu'],
[3680,'Nzryvn'],
[3914,'nzryxn'],
[970,'nzryxn-'],
[1912,'Nzrgulfg'],
[532,'Nzrglfg'],
[4213,'nzrglfg40'],
[1740,'nzvn'],
[1772,'nzvtbf'],
[1088,'Nzvynevry'],
[1717,'nzyh'],
[2851,'Nzzl'],
[31,'Nzb'],
[3888,'nzbf'],
[1135,'Nzeryy'],
[246,'Nzl'],
[2165,'Nzltqnyvan'],
[4336,'na767'],
[336,'na8'],
[1292,'nan'],
[710,'nan5454'],
[4481,'Nan76'],
[4070,'nanpbaqv'],
[480,'nanvf'],
[4169,'Nanwwn'],
[3273,'Nanznl'],
[2276,'nanzarmn'],
[2104,'Nanan'],
[2015,'NanaqnAn'],
[3150,'nanenegvf'],
[2406,'nangrzng'],
[1525,'Naq'],
[553,'naqb'],
[2850,'naqer'],
[4165,'naqernf'],
[1508,'naqerv'],
[556,'Naqerbggv'],
[2608,'Naqebf'],
[573,'Naqemrw'],
[97,'Naqemrw X'],
[1554,'Naqemrw F'],
[2084,'Naqemrw Fyba'],
[3048,'Naqemrwcv'],
[3049,'naqemrwcv2'],
[1908,'Naql'],
[3290,'naqmvnn22'],
[4254,'narpmxn'],
[3915,'narpmxnnn89'],
[3238,'nargn'],
[3666,'NargnO'],
[1807,'Nargxn'],
[1243,'nargxn1973'],
[3920,'nargdn34'],
[1763,'narggnFX'],
[4311,'narggr'],
[305,'Natry'],
[3686,'natry Ensnry'],
[350,'natry13'],
[1110,'natry2777'],
[2366,'natry579'],
[1775,'natryn'],
[238,'natryoyhr'],
[3514,'natryvpjuvfcre'],
[2101,'natryvxn'],
[4268,'Natryvxn89'],
[2797,'natryzd'],
[2279,'NatrybPnfpner'],
[2735,'natrybbfr'],
[1731,'natryfba'],
[2789,'Natryhf'],
[2263,'natrfg'],
[2028,'naug'],
[632,'NAV'],
[3268,'Navn'],
[3010,'Navn 160185'],
[4211,'Navn 82'],
[4423,'navn navbł'],
[1905,'Navn Ngenf'],
[33,'Navn m Jebpłnjvn'],
[3818,'navn07'],
[3019,'navn12'],
[3693,'navn1968'],
[1788,'navn7q'],
[1828,'navnw'],
[3158,'navny'],
[3233,'NavnCvenavn'],
[591,'navngrm'],
[3784,'navryvpn'],
[526,'navryfxn_qhfmn'],
[1123,'navryfxn_qmvrjpmlan'],
[2002,'navryfxvr cvbexb'],
[175,'navxn'],
[932,'Navzn'],
[652,'navby'],
[2993,'navby272'],
[1354,'Navbyrx'],
[3117,'Navbł Cbxbwh'],
[4397,'Navbł7'],
[2598,'nAvBłRx'],
[1608,'NAVFN'],
[690,'Navgn'],
[1309,'navgn5'],
[3618,'Navgxn O'],
[1503,'navhgxn'],
[2186,'Nawn'],
[1423,'Naxn'],
[4331,'Naxn33'],
[3460,'naxn42'],
[2535,'naxnn'],
[4439,'Naxngr'],
[3599,'Naa'],
[3614,'Naa Gvzre'],
[1470,'Naan'],
[3780,'Naan Z'],
[1474,'Naan Znevn'],
[1710,'naan jngfba'],
[3856,'naan-yvqvn'],
[3061,'naan53'],
[3602,'NaanTe23'],
[3058,'Naanterg'],
[4189,'Naanx123'],
[4219,'naanxb'],
[3506,'Naar Yrr'],
[1303,'naavbyrx3'],
[988,'Naaan'],
[1737,'NAAB'],
[695,'nabavz'],
[1822,'nabhfuxn'],
[4077,'nabj'],
[1036,'nabjv'],
[1267,'Nagnerf'],
[2600,'Nagr'],
[2824,'nagrabk'],
[96,'Nagbav_Ubsszna'],
[2841,'Nagbaln'],
[2670,'Nah'],
[1184,'Nahyn'],
[2826,'Nahyrpmrx'],
[2152,'nahb'],
[2567,'nahfvn'],
[3592,'nahśxn'],
[1496,'nby'],
[4132,'nbaxn'],
[3924,'Ncneg'],
[3384,'Ncvn'],
[1074,'ncvf'],
[708,'Ncbyybavhfm m Gvnal'],
[4338,'nccyrsvban'],
[3313,'ncebx'],
[3766,'Ndhh'],
[1073,'Nenry'],
[1509,'Nentbea'],
[4496,'nenznenz1987'],
[1404,'nepu'],
[2415,'NepunavbłZnwxry'],
[2812,'nepuvjhz k'],
[1749,'nephf'],
[3125,'Nerpmrx'],
[1129,'nerx'],
[61,'Nerx T'],
[1891,'Nerx Znerx'],
[2091,'NerxZ'],
[4115,'neryr'],
[3995,'Netb'],
[4172,'Netb2'],
[2090,'NEvn'],
[436,'Nevry'],
[3984,'NevVaqltb'],
[3031,'Nevln'],
[3612,'Newn'],
[2943,'Newnan'],
[4316,'Newnan1'],
[4208,'nexnqvn1988'],
[3987,'Nexbanevhff'],
[3488,'Neyra'],
[2413,'neyrgxn'],
[4342,'Neyva'],
[1168,'Nezntrqbaxn'],
[936,'Neznaq93'],
[3849,'Nezvry'],
[3159,'Neav'],
[2358,'neavpn'],
[1742,'nebzn'],
[2220,'neba'],
[1550,'Neenva'],
[368,'nefmhyxn'],
[3907,'negpber'],
[203,'Negrx'],
[2301,'Negubevhf'],
[2188,'Neguhf'],
[3712,'negv sylre'],
[1214,'Negv33'],
[3338,'Negva'],
[2705,'Negzna'],
[1593,'negzrq'],
[351,'Negghem'],
[4465,'neghe'],
[3918,'Neghe Jvrybbjbpbjl'],
[3156,'Neghe Mavxbzl'],
[1318,'neghf'],
[2110,'Nehś'],
[280,'neirqhv'],
[1576,'NF'],
[1769,'Nfpu'],
[2572,'nfryhar'],
[2613,'nfun'],
[2231,'Nfunara'],
[1654,'Nfuvzn'],
[4117,'Nfuven'],
[913,'Nfuxn'],
[218,'Nfugne07'],
[384,'Nfvn'],
[3521,'Nfvn102'],
[2359,'Nfvn105'],
[1369,'Nfvn13'],
[4406,'nfvn3'],
[1849,'nfvnu'],
[813,'nfvpn'],
[3939,'Nfvx'],
[3078,'nfvhaavxn'],
[3608,'nffnffvab'],
[4384,'nffvffgvnag'],
[3168,'nfgryn'],
[1052,'nfgrevn79'],
[2933,'nfgvahf'],
[916,'Nfgen'],
[3219,'nfgern'],
[634,'Nfgevn'],
[3377,'Nfgeb'],
[302,'nfgebvqrn'],
[872,'NFGEBYBTHF'],
[1536,'Nfmren'],
[1823,'NFMXN'],
[1734,'nfmgnjnxen'],
[2538,'ngnfmxn'],
[2461,'ngu'],
[3432,'Ngunyvn'],
[1583,'Nguran'],
[1328,'Ngynagn'],
[126,'Ngzna'],
[4288,'Ngznln'],
[306,'Ngbzójxn3'],
[3020,'ngdn'],
[1924,'Ngen'],
[2217,'Ngevf'],
[2994,'Nggvln'],
[3499,'ngh22'],
[3933,'Nheryvn'],
[1570,'Nheben'],
[2032,'nhfgva'],
[3098,'Nhhhz'],
[3591,'Nin'],
[4060,'Ningne24'],
[2534,'Nir'],
[3886,'Nivphynevn'],
[1851,'nivban'],
[2304,'NJNERARFF'],
[3086,'Njngnerx'],
[84,'nkvf'],
[2973,'Nlv'],
[1703,'Nmn'],
[2852,'nmnuvry'],
[3702,'Nmnmry'],
[1963,'nmrrmn'],
[1440,'Nmrg'],
[4509,'nmvryvafxv'],
[1357,'nmm'],
[2029,'nmmn4'],
[2178,'o-wnxhobjfxn'],
[60,'onon'],
[1911,'onon2255'],
[2197,'Ononwv'],
[1964,'onopvn'],
[3753,'onol'],
[785,'ontren'],
[2344,'Onwn'],
[3194,'Onwnqrexn'],
[3084,'onwrpmxn'],
[759,'onwxn-yryr'],
[3217,'OnwG'],
[781,'onxply'],
[2318,'onxz'],
[1619,'onyovn'],
[286,'onyovan'],
[668,'onypre'],
[461,'Onana'],
[983,'Onavqb'],
[3824,'Onafurr'],
[772,'ONCNFMXN'],
[2362,'OND'],
[1579,'oneonen'],
[2126,'Oneonexn'],
[647,'Onefmror'],
[3902,'oneg27fc'],
[2325,'Onegrx'],
[2799,'Onegrx 78'],
[2521,'onegrx zhpun'],
[4513,'onegrx2011'],
[4262,'Onegrx26'],
[274,'Onegrd'],
[4296,'onegrm27'],
[4118,'onegrmF'],
[1054,'OnegT'],
[4414,'onegv'],
[3560,'Onegbfu'],
[68,'Onfvn'],
[3096,'onfvn13'],
[2664,'onfvn717'],
[2017,'onfvn7xbmybjfxn'],
[59,'Onfvntv'],
[4434,'onfvnfzlxbjfxn'],
[138,'Onfvrńxn'],
[830,'onfvx'],
[1974,'onffzna'],
[1278,'Onfmxn'],
[835,'Onkgre'],
[2257,'onm'],
[2890,'Onmnyg'],
[1758,'onmvn'],
[231,'oo639'],
[1367,'ORN'],
[2815,'Orn-82'],
[518,'orn3268'],
[2006,'orn44'],
[3114,'ornebm'],
[2672,'orngn'],
[3644,'orngn599'],
[3204,'orngnnagba'],
[2964,'Orngnw'],
[1700,'orngnyhxvwnavhx'],
[2082,'Orngxn'],
[3282,'orpvn1'],
[2792,'orpvarx'],
[3017,'orun'],
[4441,'OrvatBsYvtugNaqYbir'],
[1147,'oryn'],
[4319,'Oryvaqn'],
[1008,'oryyn'],
[2889,'Oryyn zr'],
[2546,'oryyn11'],
[443,'Oryynqbaxn'],
[548,'Oryynqbaxn_jvgpu'],
[3589,'orzbjrzb'],
[58,'OREPVX67'],
[2175,'oretnzbgxn'],
[3046,'Oretzbavxn'],
[4433,'orebyxn'],
[2421,'Oregbyq'],
[2510,'Orfgvhf'],
[2621,'orgn'],
[780,'Orgv'],
[2238,'orggl'],
[3718,'Orgl'],
[3911,'OrmAnqmvrwv'],
[50,'Or_Ngn'],
[2868,'otu6'],
[1847,'Ouhcngv'],
[2054,'ovnłl cłbzvrń'],
[4221,'Ovovf'],
[1732,'Ovqreznlre'],
[314,'OVRQEBARPMXN'],
[3485,'ovrqebarpmxn55'],
[4028,'ovrqebaxn'],
[130,'ovryvx1'],
[3419,'ovtfgnen'],
[190,'Ovzonfl'],
[1023,'Ovatb'],
[1246,'Ovatb111'],
[1257,'Ovatb222'],
[1322,'Ovatbbbb'],
[1323,'Ovatbbbbb'],
[250,'ovavn'],
[141,'ovavh'],
[3370,'ovbraretbgrencrhgxn'],
[3295,'Ovfba'],
[2127,'Ovmuho'],
[4095,'ox110'],
[3255,'OynpxPng7'],
[4315,'oynve85'],
[1986,'oynfx'],
[3312,'Oyrqqla'],
[1513,'Oyrxbgrx'],
[3417,'oyvaqsbyq'],
[1518,'oybzq'],
[4252,'oyhr'],
[4510,'OyhrOybaqv'],
[4180,'OyhrZvaq'],
[596,'oyhfbjvrp'],
[1552,'OZJ'],
[677,'oa_o'],
[2928,'obo'],
[3055,'obob51'],
[3596,'Obpwn74'],
[3610,'obqrx'],
[2594,'Obquvfnggin'],
[403,'obqlarg'],
[2828,'obqmvb'],
[701,'OBT'],
[3909,'obt20npgjb'],
[1308,'Obtq2'],
[69,'obtqna'],
[4138,'Obtqna 0'],
[1497,'OBTQNAHF'],
[74,'obtan'],
[1904,'Obthzvłn'],
[911,'obthavn'],
[292,'Obthf'],
[598,'OBTHF10001'],
[944,'Obthfłnj'],
[3736,'Obthfłnj Fmpmltvrł'],
[1604,'Obyrx'],
[606,'Obybw'],
[2683,'Obzon'],
[4416,'OBZONF2'],
[2477,'obatbf'],
[1606,'obafnv05'],
[4054,'obeqreyvar85'],
[1500,'obexba'],
[1782,'obebjvnx'],
[3395,'Obeh'],
[2177,'obelabf'],
[340,'obfxv'],
[3369,'obgbzrx'],
[1961,'Obmraxn'],
[703,'Obmvn'],
[2154,'Obżran'],
[1848,'Obżran Elyfxn'],
[3777,'Obżran1'],
[2281,'OBŻRAN35'],
[4200,'Oót'],
[525,'ocxobmran'],
[1012,'Oenx_Ybtvah'],
[2920,'Oeng Pbyvan'],
[240,'Oeng Zvpunry'],
[3647,'OernxOrng25'],
[1647,'oeroyroebk'],
[1970,'Oevfnan'],
[3494,'oebavn'],
[3822,'oebabf'],
[404,'Oeltvqn'],
[2696,'Oelxnfvn'],
[3997,'oelghyn'],
[1535,'ohoory'],
[37,'Ohoh'],
[3245,'ohoh 423'],
[2639,'ohqqun'],
[3138,'ohqqun1979'],
[535,'Ohqqhś'],
[3260,'ohavn46'],
[1275,'ohemn'],
[3577,'olpmlqmvra'],
[1010,'Olavb'],
[1711,'olavb00'],
[2308,'Olbqn'],
[2861,'Pnynan'],
[1942,'pnyvunpx 69'],
[2157,'Pnyveren'],
[2835,'pnyzn'],
[1672,'pnyhgxn wn'],
[3461,'Pnzryrba'],
[392,'Pnzvyyn'],
[978,'pnzvfvn'],
[4206,'Pnaqltvey'],
[2134,'Pnagngrf'],
[2854,'pncg q'],
[1488,'pnezna'],
[2925,'pnezvyn'],
[3748,'Pnezvan'],
[1220,'pnebyva'],
[1582,'Pnecb'],
[3005,'pnegzna10'],
[216,'pnel3'],
[2986,'pnfvhf2502'],
[1297,'pnffvhf'],
[1774,'Pnguvre'],
[1598,'Pngevar'],
[2230,'pq2006'],
[1638,'pqbzvaxn'],
[4427,'Prtynal'],
[1198,'prybsnavn'],
[4360,'PragehzAU'],
[375,'Prg_F'],
[3535,'prm'],
[12,'Prmnel'],
[4462,'Prmmne'],
[2647,'Punqevry'],
[1032,'puryfrn'],
[4111,'PurfuverPng'],
[3405,'PuvyqBsGbzbeebj'],
[444,'puvzren'],
[4097,'puvfgrelx'],
[2271,'Puzhen'],
[3842,'Puzhexn'],
[3223,'pubyrz'],
[2317,'puevf'],
[3215,'Puevfgbs'],
[2481,'puebabybtvr'],
[2772,'puelmryrsnaglan'],
[3297,'puhql'],
[665,'Pujvyxn'],
[4299,'pvnznwqn'],
[2918,'pvnen1312'],
[3118,'pvnfgrx'],
[3761,'pvpun'],
[4018,'pvpubpvrzan'],
[751,'pvrqnj'],
[4156,'pvrxnjfxv'],
[273,'pvrń'],
[1066,'pvv'],
[3776,'pvarx'],
[990,'Pvgl_bs_Natryf'],
[865,'Pynver'],
[4125,'pyrnagur'],
[4064,'Pyvag'],
[3590,'pyvagR'],
[3705,'pyb'],
[718,'pzlgbwrg'],
[664,'Pbqvf'],
[3859,'Pbyrgn'],
[1693,'pbzz'],
[3815,'Pbaenq'],
[3365,'pbbyin'],
[2757,'Pbbzva'],
[4186,'pbcubgvf'],
[4495,'Pbeva'],
[3537,'pbegrm'],
[1720,'Pbś gnz'],
[3685,'penfure82'],
[1673,'penml'],
[719,'pevfgnyyb'],
[734,'Pevfgbs'],
[3116,'pebpurg'],
[3899,'pebgbarfr'],
[1778,'pebhpu3e'],
[1466,'Pebj'],
[1495,'Pehpvsvrq'],
[3065,'pehfu'],
[2886,'peln'],
[2855,'Phpxbb'],
[722,'PhqabjalJbw'],
[888,'Phqb'],
[1969,'phqbjan'],
[1677,'phqbjan11'],
[3303,'phtby'],
[166,'Phxvrerx'],
[2491,'PloreQ'],
[731,'Ploelqn'],
[2435,'Pltnaxn'],
[1945,'Plcvfrx'],
[2849,'Pm4c4'],
[1465,'pmnqsnq'],
[3257,'pmnwxn'],
[533,'pmna'],
[2248,'pmncn'],
[1996,'Pmneahfmrx'],
[4326,'Pmnebqmvpvryxn'],
[467,'Pmnebqmvrw'],
[545,'Pmnebqmvrwxn'],
[4431,'Pmnebqmvrwxn m Xfvężlpn'],
[1437,'pmnebqmvrwxn---'],
[2085,'pmnebqmvrwxn1972'],
[1701,'PmnebqmvrwxnGltelfxn'],
[2484,'pmneebjavpn'],
[2080,'Pmnf mzvna'],
[1571,'pmngbevn'],
[4369,'pmąfgxn zvłbfpv'],
[2591,'pmrerzpun'],
[3275,'pmreivpmbx'],
[1670,'Pmrejbal Jąż'],
[3808,'pmv'],
[3091,'pmvab'],
[3380,'Pmvcevnab'],
[1456,'Pmłncxn'],
[741,'pmlśpvpvry'],
[743,'Ćzn'],
[299,'Q F'],
[2159,'q3ygn'],
[3011,'q9m'],
[2873,'Qnnxna'],
[488,'qnsvqbb'],
[387,'qntnm'],
[2938,'qntal'],
[3759,'qnthf3x'],
[1727,'Qnwuna'],
[2524,'Qnxbgn'],
[2760,'qnxbgn121'],
[2212,'qnyqb'],
[428,'Qnzvna'],
[4456,'Qnzvna84'],
[3948,'Qnzvna907'],
[4486,'qnzvnao'],
[3467,'QnzvnaP'],
[1380,'qnzvnab35'],
[1390,'qnzvnafrzr'],
[1064,'Qnan'],
[1351,'qnan25'],
[3022,'qnaprjvgufha'],
[3099,'QnapvatQentba'],
[3486,'Qnarx'],
[152,'qnavry'],
[255,'Qnavry Cgnfmrx'],
[258,'qnavryfba'],
[171,'QnavryJ'],
[1189,'QnAvD'],
[773,'Qnaal'],
[2081,'Qnagrzvahf'],
[1588,'Qnahyn'],
[53,'Qnahfvn'],
[2341,'qnahfvn123'],
[3490,'qnahfvnxw'],
[2688,'qnb'],
[914,'qnb_la'],
[3604,'Qnenz'],
[385,'Qnenf'],
[575,'Qnerx'],
[2628,'Qnerx Ehfva'],
[2118,'qnerx21'],
[1589,'qnev82'],
[1805,'Qnevn'],
[78,'Qnevhf'],
[4295,'qnevhf22'],
[622,'Qnevhfm'],
[3439,'Qnevhfm Tbqyrjfxv'],
[3173,'Qnevhfm Wnprx Vmqrofxv'],
[214,'Qnevhfm Ybtn'],
[2061,'qnevhfm64'],
[2258,'Qnevhfmxn'],
[860,'Qnex Natry'],
[1076,'qnexnqvhfm'],
[618,'QnexYbeq'],
[671,'qnexare'],
[3883,'QneXb'],
[3523,'qneyhg'],
[3651,'qneby'],
[4257,'qnebffb'],
[3511,'qnehavn'],
[2273,'qnir'],
[2193,'qnivq'],
[1871,'Qnivqq'],
[3609,'qnivqbs'],
[3472,'qnivqf'],
[1438,'Qnjvq'],
[2609,'qok'],
[626,'qqfbzr'],
[1850,'Qrp'],
[4198,'Qrreynaqvn76'],
[3060,'Qrvyn'],
[106,'qrwzvra'],
[2831,'Qrynvyny'],
[2719,'Qrysva'],
[4269,'Qrysvavgn'],
[3623,'qryvtugshy'],
[1348,'Qryvxngr'],
[3416,'Qryvynu'],
[2376,'Qryzvgubf'],
[1102,'qrycuvar2'],
[1880,'qrzba'],
[2607,'Qrzbavn'],
[2935,'qravb089'],
[3553,'qrerpub'],
[88,'qrex'],
[3039,'qrfgerr'],
[1783,'QRIN22'],
[717,'qriahyy'],
[3687,'qrk-0000'],
[140,'Qrmregre'],
[965,'Qrmbyngbe'],
[3860,'qunav'],
[1921,'QUY'],
[2599,'QVNORH'],
[2508,'qvntr'],
[531,'Qvnan'],
[498,'Qvpx_Jnec'],
[270,'qvtvzbax'],
[484,'Qvv'],
[1683,'qvinaa'],
[3307,'qvjn'],
[2618,'qwnwqn'],
[3893,'QWNatryb'],
[1926,'qxqrag'],
[3008,'qxhzbe'],
[3450,'qyngrtb'],
[1053,'QZE'],
[1864,'Qb-eb-gn'],
[2321,'Qboen jeóżxn'],
[4120,'qbpun'],
[4108,'qbpvn1977'],
[103,'Qbpvrxyvjl'],
[1808,'qbqr'],
[2713,'qbtn'],
[2779,'qbyberm'],
[1577,'qbycuva'],
[4320,'Qbzna'],
[4507,'Qbzvatref1'],
[3622,'Qbzvavx'],
[2137,'Qbzvavxn'],
[2655,'qbzvavxn8'],
[2899,'Qba'],
[3629,'qban111'],
[3145,'Qbavh'],
[2270,'qbahg'],
[3203,'QbbZ666'],
[389,'Qbe'],
[877,'qben'],
[116,'Qbepvn'],
[4174,'qbepvnn'],
[1624,'Qbevf'],
[658,'Qbexn'],
[863,'Qbexn22'],
[2005,'QbexnF'],
[23,'Qbebgn'],
[2423,'Qbebgn77'],
[3982,'QbebgnNtt'],
[3663,'qbebgnz'],
[3041,'Qbebgul'],
[3637,'qbebgxn'],
[2316,'Qbebggn'],
[4,'Qbfvn'],
[1699,'Qbgn'],
[600,'qbgv'],
[3715,'Qbgvr'],
[2944,'Qbgxn'],
[1723,'qe Fgrsna Ohxbjfxv'],
[1718,'qentba'],
[4480,'qentbak2'],
[1454,'qernzpngpure'],
[2931,'QernzfPngpure'],
[3999,'qernzfcbg'],
[4429,'Qernzl'],
[4149,'Qevfugnn'],
[1766,'qebovarx'],
[2979,'Qehtn'],
[62,'qemrjxb'],
[3879,'qemrjb'],
[4038,'qfpbecvb'],
[2748,'qhzn'],
[2371,'Qhfunx'],
[4158,'QhmlYbgrx'],
[2242,'qjnqmvrfpvnfvrqrz'],
[2562,'Qjnxb'],
[257,'qlyivfu'],
[3970,'qmvnqrxzebm'],
[1476,'qmvnqxbov'],
[2357,'Qmvrpvę Rysój'],
[679,'qmvxn'],
[2640,'qż'],
[3557,'Qżwrfmgn'],
[1870,'qżlzrx'],
[687,'r-xnebyvan'],
[4071,'r-zvyvn'],
[808,'r-Cfvyba'],
[169,'rntyr'],
[4476,'RneguOrng'],
[1952,'rnh qr pbafpvrapr'],
[339,'Rovfh'],
[3683,'rqrn'],
[1653,'rqrx'],
[933,'Rqxn'],
[355,'RQB'],
[2466,'Rqlpwn'],
[639,'Rqlgn'],
[3878,'Rqlgn J'],
[3354,'Rqlgxn'],
[3775,'rqlgxn1'],
[2636,'rqmvhbm'],
[4179,'Rsgren'],
[1648,'rtcj'],
[2877,'rthyovab'],
[1013,'Rvernaa'],
[294,'rWbnaan'],
[2041,'rxena4'],
[2509,'rxhh'],
[3945,'ry zvynteb'],
[2305,'Ry avab'],
[2448,'Ry Ensnry'],
[1178,'Ryn'],
[3209,'ryn xehpubjfxn'],
[1033,'rynunm'],
[3728,'rynabe'],
[2216,'Ryngva'],
[2747,'Ryqne'],
[1567,'ryqevgpurer'],
[432,'Ryrxgen'],
[1913,'Ryran'],
[3559,'ryran1'],
[283,'Ryranv'],
[3224,'ryraxn'],
[688,'ryraxnn'],
[1844,'Ryrlar'],
[1117,'Rys'],
[2894,'rysxebcxn'],
[749,'Rysbjavpmrx'],
[3406,'Ryv77'],
[2939,'ryvnarn'],
[1167,'Ryvnfn'],
[3861,'Ryvnfm'],
[3229,'Ryvwnu'],
[4330,'Ryvfgbxyrf'],
[109,'Ryvmn'],
[2574,'Ryvmn-77'],
[4072,'ryvmn73'],
[3717,'Rywbg'],
[1425,'ryy'],
[3791,'Ryynqn'],
[2807,'Ryyra'],
[1706,'ryyranv'],
[768,'rybqvr'],
[1287,'Rybuvz'],
[804,'Rybv'],
[158,'ryemhpun'],
[4372,'Ryfvr'],
[3873,'RyFby'],
[2686,'Ryiv'],
[1362,'rYj'],
[1339,'Ryżovrgn'],
[1134,'ry_orergb'],
[640,'rzrr'],
[1391,'Rzrln'],
[3877,'Rzvr'],
[2721,'rzvxn'],
[271,'rzvy'],
[3828,'rzvyvn73'],
[1358,'Rzvyxn'],
[1436,'rzvyyxn'],
[3131,'rzzn'],
[2619,'rzznxbjny'],
[1779,'rzzxn'],
[1659,'Rzzlybh'],
[3394,'rzbpwna 82'],
[3932,'rzbpwna-abjbanebqmbal'],
[2145,'rzh'],
[580,'Raplxybcrqvn'],
[2182,'Raqre'],
[4083,'raretvn'],
[2385,'Ratv'],
[40,'ratvar'],
[2733,'ravtzn'],
[3327,'ravtzn7'],
[1605,'rabpu'],
[1361,'rag'],
[3764,'Ral'],
[2411,'Rdhvabkr'],
[3648,'rdivyvoevhz'],
[2895,'Rentba'],
[3474,'revsvyr'],
[1984,'Rean'],
[1897,'Rearfg'],
[4146,'rebyn'],
[3580,'relx'],
[4164,'relxn'],
[3294,'remm'],
[3074,'Rfzrenyqn'],
[3804,'Rfbgrevp Jbzna'],
[636,'rfg'],
[4040,'rfgn'],
[967,'Rfgvar'],
[2921,'Rfgeryyn'],
[1159,'rfm'],
[2322,'Rfmgbb'],
[232,'Rgn'],
[2296,'Rgvhqn'],
[3783,'rhqnwzbaxn'],
[1691,'Rhavpr'],
[90,'rhavxr'],
[534,'rhel'],
[1096,'Rhelqlgn'],
[539,'Rhel_'],
[2520,'Rinarfprapr'],
[4123,'rirn'],
[4166,'Rirr'],
[1290,'Rixn1'],
[712,'rjn'],
[1894,'rjn 40 śyąfx'],
[4175,'Rjn OJ'],
[3267,'Rjn Uryran'],
[2888,'Rjn W'],
[2167,'Rjn F J'],
[1443,'Rjn Jbwpvrpubjfxn'],
[3567,'Rjn1'],
[4242,'Rjn2001'],
[3335,'Rjn74'],
[3679,'rjn79'],
[4241,'rjnp'],
[848,'RjnT'],
[260,'rjnahf'],
[977,'RjnC'],
[4408,'Rjnehqn'],
[902,'rjnjn'],
[150,'Rjn_Ynyvgn'],
[1820,'Rjpvn'],
[2320,'Rjpvnn'],
[3655,'rjryvan'],
[2478,'rjryvan8508'],
[2269,'rjryvaxn'],
[3070,'rjvt555'],
[1024,'rjxn'],
[253,'Rjh'],
[3896,'rjhavn'],
[3524,'rkfyvjrpmxn'],
[814,'Rkg'],
[2580,'rmnan'],
[4103,'rmruvry'],
[1630,'Rmrx'],
[3950,'Rmbfsren'],
[4045,'rmbgrerx'],
[4355,'Rmbgrelpman'],
[1293,'rmbgrelx9'],
[157,'s4m3e'],
[396,'Snovbyn'],
[1431,'Snoyr'],
[3792,'snprg'],
[4025,'snqns'],
[929,'Snvel'],
[2428,'Snvgu'],
[25,'Snxve'],
[192,'snypba'],
[4037,'Snypba33'],
[1368,'SnyyraNatry'],
[1207,'snzn'],
[3773,'snzns'],
[3007,'Snaqbe'],
[2795,'snagbz'],
[3014,'snaglan'],
[210,'Snena'],
[2452,'Snlr'],
[4422,'srryn'],
[1235,'sryrx'],
[3059,'Sryvpvgr'],
[3991,'SrzzrNatry'],
[1859,'sravxf 24'],
[2088,'sravxf6'],
[184,'srev'],
[3688,'sreen'],
[2963,'Svn'],
[1172,'svnar'],
[1239,'Svprx'],
[1949,'svyvcb'],
[1444,'svyb-fbcuvn'],
[1018,'svybmbs'],
[1786,'Svaqb'],
[2626,'Svaenry'],
[1310,'svbyrg'],
[2543,'svbyrg7'],
[1776,'svbyrgbjn'],
[3552,'svbyrgbjnnn'],
[2806,'svbyyrg'],
[2493,'svbłxbjn'],
[3698,'svban'],
[582,'svbapvn'],
[3779,'Svberyyn'],
[470,'Sveroveq'],
[2293,'Svfure'],
[3310,'Svgpu'],
[1375,'sviv'],
[1372,'svmona'],
[1467,'synfmxbpzbxgnpm'],
[1056,'Syb'],
[2936,'sybrgel'],
[886,'sybevan'],
[2717,'syhc'],
[1569,'syl'],
[1973,'sylnjnl'],
[2917,'Sbyxbjn'],
[2657,'sberfg160886'],
[3278,'Sbeung'],
[3409,'Sbeghan'],
[3578,'sbkubhaq9'],
[3833,'sbkkk222'],
[1680,'senxgny'],
[1448,'Senapvfmrx'],
[3453,'senavn'],
[1558,'senavb50'],
[4487,'senahfff'],
[2590,'serr'],
[310,'Seraq'],
[1399,'Serln'],
[3798,'serlnne'],
[3763,'Sevv23'],
[93,'selgn'],
[1761,'shsh'],
[1950,'shzsry'],
[4008,'sha'],
[1747,'shanv'],
[1378,'shmm'],
[733,'tnor'],
[30,'Tnov'],
[2310,'tnov81'],
[220,'Tnobe'],
[2522,'Tnoevry'],
[1669,'Tnoevryn'],
[836,'tnqynwx'],
[3957,'TNVN'],
[3130,'Tnwn'],
[996,'tny'],
[288,'tnyn'],
[2181,'Tnynkn'],
[757,'tnz77'],
[4234,'tnzqnyvn'],
[2345,'Tnaqnys'],
[1553,'TnaqnysT'],
[377,'tncn'],
[3235,'Tnepvn'],
[4011,'Tnegfpurx'],
[2634,'Tnlngev'],
[4119,'TnlOhqqn'],
[3752,'TO'],
[3352,'Trzvav'],
[92,'Trzvav_30'],
[102,'trarx'],
[721,'Tramb'],
[3505,'Treneg'],
[918,'Trenfvz'],
[369,'treoren'],
[2201,'treqmvan'],
[3925,'Trexnm'],
[1854,'treznva'],
[3774,'trebavzb'],
[2327,'trejnml'],
[1468,'trffrevgxn'],
[522,'Tubfg'],
[2392,'TubfgSnpr'],
[2208,'Tvoba'],
[732,'tvrwbg'],
[1674,'Tvrarx'],
[3496,'tvrarx1'],
[644,'tvrf73'],
[3284,'tvan24'],
[2650,'tvabf'],
[1796,'tver1'],
[456,'tvfxn'],
[3545,'Tvmvh'],
[94,'Tvmzb'],
[3587,'TYNQVNGBE'],
[3714,'tynff'],
[4477,'tybbbf'],
[4472,'tybf cenjql'],
[3830,'tangrx'],
[1359,'tarj'],
[3572,'TBPUN'],
[4387,'Tbqqrf'],
[4485,'Tbqqrf1987'],
[4147,'tbqal'],
[767,'Tbvfgn'],
[853,'Tbyna'],
[2093,'Tbyqra Natry'],
[2620,'TbyqraFuvin'],
[940,'tbybad'],
[3660,'tbzrm'],
[2156,'tbavn'],
[2906,'tbambybg'],
[3293,'tbbqvrf'],
[1079,'Tbbtn'],
[1559,'tbbeyva'],
[2471,'tbbg'],
[2823,'tbetbavngxb'],
[1994,'Tbearyy'],
[937,'Tbfvn'],
[2778,'tbfvn10'],
[4113,'tbfvn11'],
[3934,'tbfvn66'],
[998,'Tbfvn_urqre'],
[1406,'tbfvrx'],
[2160,'tbfvrx707'],
[1714,'Tbfvrńxn'],
[3962,'tbfvx59yrj'],
[1446,'Tbfxn'],
[2449,'tbfxn36'],
[1549,'tbfxny'],
[608,'Tbśxn'],
[1728,'Tbln'],
[4460,'Tenpr'],
[1920,'Tenprxevfg'],
[1266,'tenpxv'],
[476,'tenan'],
[1910,'Tenfmxn'],
[1457,'tenhjr'],
[3782,'tenmlan'],
[3271,'Tenmlan Naan'],
[4504,'Tenż'],
[2052,'tenżxn'],
[199,'Tenżlaxn'],
[2818,'TERRA99'],
[1705,'Terrarlrfpng'],
[3584,'tert'],
[1182,'tert1975'],
[4444,'TERT32'],
[3108,'tertbevb'],
[4092,'Tergn'],
[3128,'terlubhaq'],
[3322,'tevz erncre 2012'],
[1915,'tevapu'],
[2046,'Tevfmn'],
[1106,'tebz'],
[1809,'Tebhfvn'],
[1475,'tebir'],
[3993,'TehonQhfmn'],
[3725,'Tehqmvra'],
[2568,'Tehaq'],
[104,'Temr$'],
[1215,'Temrtbem'],
[4134,'temrtbem 250'],
[2078,'Temrtbem śy'],
[3677,'Temrtbem108'],
[1284,'temrtbem1981'],
[1153,'Temra'],
[1627,'temrf32'],
[2303,'temrf78'],
[254,'Temrfvrx'],
[617,'Temrś'],
[3004,'Temrś71'],
[66,'Thppv'],
[973,'thqeha'],
[1971,'thrfg'],
[854,'thzvfu'],
[3191,'Thzvfvn'],
[4094,'thahat'],
[2775,'thehqrin'],
[3212,'thfvn'],
[447,'thfxn17'],
[4470,'thfxn3'],
[3292,'Thmvb'],
[3550,'TJVNMQN24'],
[3002,'Tjvnmqrpmxn'],
[1253,'tjvnmqxn'],
[1645,'tjvmqrx00'],
[468,'tmrś'],
[897,'untny'],
[3674,'Untnyn'],
[3870,'untvgu'],
[4104,'Ununvnu'],
[2087,'unvqn'],
[4056,'unvxb'],
[1929,'Unxngb'],
[2055,'unxvz'],
[2526,'unxbjlg'],
[2048,'Unynen'],
[2532,'unyv'],
[4207,'Unyvan'],
[3033,'Unyvan3008'],
[3872,'unyvanjnpubjfxn'],
[400,'Unyxn'],
[419,'Unyyrl'],
[3626,'Unylan Fgęcry'],
[1795,'unatbf'],
[1283,'UnavnNavn'],
[2211,'unaanu25'],
[1616,'Unahyn'],
[4327,'unahyn8'],
[2228,'uncclraq'],
[4239,'Une Nanaq'],
[776,'uneqba'],
[4026,'Unezbal'],
[1421,'uneanf'],
[3075,'uneba'],
[866,'Uneel'],
[83,'Uneel-Orynsbagr'],
[1029,'uneel68'],
[1326,'UneelNatry'],
[3324,'UneelCbggre'],
[1738,'Unfre'],
[1708,'Unfgn'],
[1464,'ungxn'],
[2883,'univ'],
[4196,'Unjnvn'],
[4243,'unjreavx'],
[972,'unlyr'],
[1954,'Uront'],
[3176,'Urtrzba'],
[1090,'urynjvn'],
[1613,'URYVBA'],
[2909,'Uryyra'],
[1530,'uraelxfyvjvafxv'],
[3462,'Urcgncnencnefuvabxu'],
[3769,'Uren'],
[308,'Uren_k'],
[2065,'urepvn'],
[4246,'Urezrf'],
[3035,'urezhfvn'],
[1242,'Ureb'],
[3611,'Urfgb'],
[2274,'Urgbor'],
[1011,'urkne'],
[3947,'urlbxn'],
[1765,'Uurxn'],
[268,'uvsv'],
[2337,'UvSerfu'],
[1268,'Uvavan'],
[4050,'Uvgbzvv'],
[4079,'uzyncyngn'],
[1767,'ubopvb'],
[2837,'Ubzbavrjvnqbzb'],
[3796,'ubapvnc'],
[2463,'ubarire'],
[1756,'Ubcr'],
[2782,'ubcc123'],
[1869,'Ubfnaan'],
[2153,'Ubfuv'],
[2605,'Ubjneq'],
[391,'Uhoreg'],
[3917,'uhqvav'],
[880,'uhtba'],
[363,'Uhanzna'],
[1819,'ulqebmntnqxn'],
[2011,'vpzp'],
[303,'Vqn'],
[3228,'VqnO'],
[2330,'vqnve'],
[755,'vqnyvfxn'],
[4275,'VqnZ'],
[3949,'vqjbeavxbjfxn'],
[4067,'vqlyyvp'],
[1419,'vshxh'],
[1429,'VtbeF'],
[2614,'vvvmxn'],
[3318,'Vvevn'],
[1137,'Vxn'],
[3502,'vxnn21'],
[1561,'Vyn'],
[4364,'Vyvggr'],
[2094,'Vywn'],
[1857,'vyyn'],
[3598,'Vyban'],
[2199,'Vyhz'],
[2195,'Vyhfvba'],
[2817,'vznqbxv'],
[2667,'Vznxnaqv'],
[3654,'Vzrx'],
[4321,'vZrzr'],
[352,'Vzre'],
[723,'VzGurObff'],
[362,'Van'],
[3372,'Van177'],
[2773,'vanaan'],
[3797,'vap'],
[3157,'vaperqvoyr'],
[4015,'vaqv'],
[2540,'vaqvn'],
[3044,'vaqvn72'],
[3387,'vaqven'],
[2742,'Vaqen'],
[413,'Vaqltb'],
[4178,'Varf'],
[2734,'Varf70'],
[1382,'Varm'],
[1015,'Vasvavgl'],
[2333,'vasb123'],
[2352,'Vatn'],
[3831,'Vatn Rqlgn'],
[2285,'vatnnn'],
[3401,'Vatevq'],
[2393,'vaxn'],
[3633,'vaxnah'],
[685,'vaxnf'],
[2437,'vaxxn'],
[1460,'Vaxjvmlgbe'],
[4049,'VaanAvżJfmlfpl'],
[3689,'Vafcvenpwn'],
[3684,'Vafcvenpwn2008'],
[861,'va_zbbq_sbe_ybir'],
[2842,'ve3an'],
[1389,'VeovfB'],
[4457,'verx097'],
[1350,'verxgngb'],
[1481,'veran'],
[1397,'verarhfm'],
[179,'Vevf'],
[2008,'vevf32'],
[81,'vevfxn'],
[1551,'VEBA'],
[1515,'veev'],
[1888,'Veivar'],
[3898,'velfrx'],
[1507,'vfnory'],
[735,'Vfnoryyr'],
[19,'Vfuv'],
[3346,'VFUVQR'],
[3470,'Vfvn93'],
[344,'vfvf'],
[2039,'vfxvrexn'],
[4394,'vfxvrexn m cbcvryavxn'],
[1065,'VFxen'],
[2441,'Vfxen72'],
[3248,'Vfxel'],
[357,'vfb'],
[822,'vfgbgn'],
[839,'vfinen'],
[2700,'VFMGNE'],
[2821,'vfmgne1978'],
[3852,'Vgn'],
[2462,'Vgfnev'],
[335,'VinaXehx'],
[3789,'VIRARF'],
[3516,'VIB76'],
[4348,'viba'],
[2414,'viban'],
[2342,'vienvr'],
[1020,'vil5'],
[2529,'vjn'],
[160,'vjban'],
[1906,'Vjban1'],
[2587,'vjban30'],
[2374,'Vjbann'],
[2791,'VjbanX'],
[4030,'vjbanc33'],
[1858,'vjban_f'],
[3320,'vjbbann'],
[1876,'Vmn'],
[2141,'vmn-obfxn'],
[2170,'Vmnoryn'],
[3468,'vmnorynnaan'],
[3029,'vmnoryxn'],
[2215,'vmnoryy30'],
[750,'Vmnoryyn'],
[3642,'vmnenqbz22'],
[297,'Vmn_oya'],
[1892,'vmvt'],
[424,'Vmvf'],
[1447,'vmmv'],
[207,'W-Svyvc-S'],
[1510,'W007'],
[3457,'wn'],
[3540,'wn222'],
[1757,'wn44'],
[4346,'Wn999'],
[2896,'wnntn'],
[1203,'wnonfrwb'],
[3359,'wnoyxb'],
[2069,'wnpn'],
[420,'Wnprx'],
[3003,'wnprx 440'],
[3351,'Wnprx Oneqn'],
[2256,'wnprx yrfmpmlafxv'],
[147,'wnprx abj'],
[3892,'WnprxN'],
[3304,'wnprxx'],
[2066,'WnprxA'],
[2057,'Wnpujrgn'],
[2007,'Wnpx'],
[4410,'Wnpx72'],
[2323,'wnpxnyna'],
[1574,'Wnpxv'],
[1975,'Wnpb'],
[3489,'Wnpbyg'],
[3621,'Wnpbf'],
[466,'wnPmrejban2003'],
[440,'wnPmybjvrx'],
[4090,'Wntn'],
[4159,'Wntnsvn'],
[1289,'wntnznk'],
[3408,'Wntan'],
[4020,'wntbqnjn'],
[4214,'wnwnxbcresbezre'],
[1623,'wnxv'],
[1925,'wnxwrm'],
[469,'Wnxho'],
[825,'wnyvyn'],
[3963,'Wnz Wrfg'],
[1580,'wnzryxn'],
[1614,'Wnzavxbnavbł'],
[2363,'wna'],
[323,'wna evff'],
[2595,'wna50'],
[4340,'wna56'],
[1108,'wnapvb'],
[958,'Wnarx'],
[3036,'Wnarx10230'],
[3554,'wnarxjnefmnjn'],
[3555,'wnarxjnjn'],
[3270,'wnatnovx'],
[4305,'wnav46'],
[2047,'wnavteh'],
[4488,'Wnavx'],
[1860,'Wnavan Mnjnqn'],
[1226,'wnaxb'],
[2693,'wnayvaqr'],
[3929,'wnaa1122'],
[657,'wnafhy'],
[3487,'Wnahffm'],
[2234,'wnahfm'],
[18,'Wnahfm Znerx'],
[2923,'Wnahfm11'],
[2426,'Wne'],
[1835,'wnenf'],
[764,'Wnerrx'],
[124,'wnerx'],
[1291,'Wnerx T'],
[151,'wnerx zvxhyfxv'],
[3199,'Wnerx-Fynfx'],
[3894,'wnerxnavby'],
[6,'WnerxT'],
[1082,'wnerxzvxhyfxv'],
[2922,'Wnexhf'],
[3254,'Wneab'],
[3184,'wneb'],
[4497,'wneb1979'],
[2585,'wnecvj'],
[744,'wnfvrx'],
[4511,'Wnfvh'],
[1901,'Wnfxba'],
[51,'Wnfxbbxn'],
[1114,'wnfxółxn'],
[2676,'wnfxenjbovnyl'],
[686,'Wnfzva'],
[1202,'Wnfzvan'],
[905,'wnfan'],
[4381,'wnfabjvqm999'],
[409,'wnfalsvbyrg'],
[3425,'Wnfmhn333'],
[4405,'Wnśal'],
[4126,'wnjvrzxgb'],
[4187,'Wnlnqriv'],
[1527,'Wnmran'],
[1158,'wn_xnatv'],
[3967,'wpun'],
[3721,'WPMNERX'],
[2497,'wq111'],
[2034,'wronanal'],
[3473,'wrqv'],
[4089,'wrqmn7'],
[895,'wraavsre'],
[3754,'wrexbz'],
[1002,'wrebavzb'],
[1366,'wremb'],
[200,'Wreml'],
[2171,'wreml41'],
[1000,'wremlqrjrpxv'],
[135,'wremlx'],
[3867,'wrfvraalyvfp'],
[229,'wrfgphqbjavr'],
[205,'wrfgqboemr'],
[1816,'wrfgrz'],
[2116,'wrfgrzolłrz'],
[1313,'Wrfgre'],
[2024,'wrmby44'],
[2563,'Wrmhf'],
[3306,'wrmlan'],
[317,'Węqerx'],
[1455,'wvwv'],
[2129,'Wvzra'],
[370,'wvzxn'],
[4386,'wwhfglan86'],
[1642,'wxz'],
[963,'WZJ'],
[2617,'Wbn'],
[1083,'wbnnn'],
[2174,'Wbnan'],
[924,'wbnapun'],
[856,'wbnaxn'],
[953,'Wbnaan'],
[4396,'Wbnaan1980'],
[3027,'WbnaanNvfn'],
[2331,'WbnaanQnep'],
[304,'wbnaanx'],
[3975,'WBNAANC'],
[511,'WBNFVN'],
[1179,'Wbnfvn Qłhfxn'],
[4088,'wbnfvrk'],
[1539,'wbr'],
[2233,'wbra'],
[1702,'wbtnwbtncy'],
[1930,'wbunaa'],
[3239,'wbunaanu'],
[1133,'wbxzbx'],
[448,'wbyn'],
[4294,'wbynagn'],
[2003,'wbynagn321'],
[4435,'wbynagnfm'],
[4091,'Wbynbyn'],
[2814,'Wbyy'],
[4162,'WbZn'],
[164,'Wbanf'],
[454,'Wbawb'],
[63,'WBBERPX'],
[3175,'wbgorpror'],
[1845,'wbl'],
[188,'Wbmrs'],
[2192,'WbmrxZ66'],
[2859,'wómrssvab'],
[1349,'wc'],
[3429,'wfe184'],
[3428,'Whyv'],
[458,'Whyvn'],
[1492,'Whyvn Ohethaq'],
[3023,'whyvnxngnemlan'],
[707,'whyvna'],
[47,'Whyxn'],
[927,'WhYl'],
[2929,'whenf'],
[3676,'whepvb'],
[1548,'wherx'],
[2583,'WherxBtóerx'],
[1873,'whfgn'],
[3866,'whfgv'],
[738,'Whfglan'],
[4352,'Whfglan W'],
[2070,'whfglann'],
[1166,'whfglfvn18'],
[763,'whgemraxn'],
[589,'wjnjem'],
[569,'wj_nzvtbjvrp'],
[3161,'wmnfnqn'],
[952,'W_W_W'],
[667,'x4701'],
[4101,'Xn-g-n-e-m-l-a-xn'],
[1271,'XnnRaa'],
[1143,'xnna'],
[2722,'Xnoenkvf'],
[625,'Xnpun'],
[3670,'xnpmbe88gct'],
[588,'Xnpmhfmxn'],
[819,'xnq'],
[1751,'XnRa'],
[3767,'Xnun'],
[2764,'Xnuven'],
[421,'Xnva'],
[599,'xnvebf'],
[3054,'xnvmra1'],
[378,'Xnwn'],
[878,'xnwrgnan'],
[1228,'Xnynz'],
[1886,'xnynanaqn'],
[4235,'xnynf10'],
[564,'xnyrpzne'],
[1200,'Xnyvan'],
[3700,'xnyvaxn'],
[4041,'Xnyvaxn8'],
[3334,'Xnyvba'],
[670,'Xnyyvan'],
[422,'xnzn'],
[3237,'xnzn78'],
[595,'xnznyn'],
[1430,'xnzqhy'],
[3333,'xnzryarg'],
[487,'Xnzv'],
[3724,'xnzvxny'],
[2803,'Xnzvy'],
[1602,'Xnzvy A'],
[4006,'xnzvy1300'],
[3143,'xnzvy83'],
[245,'XNZVYPVN'],
[3968,'xnzvyrx'],
[4447,'xnzvyra'],
[1625,'xnzvyyn'],
[295,'xnzxn'],
[1256,'xnzzvxn'],
[2410,'Xnzlx'],
[3484,'xnanbyn'],
[1343,'Xnar'],
[2049,'Xnagvrz'],
[3562,'xnaghgn'],
[2254,'Xncvgna Cynargn'],
[1154,'Xncvgna Cbegh Qhpubjrtb'],
[613,'Xncłnaxn'],
[1746,'Xncłnaxn Zvłbśpv'],
[4264,'xnenynwan'],
[3221,'xnenbxr89'],
[3171,'Xneva'],
[1352,'Xnevan'],
[1825,'XnevanC'],
[2058,'xnevfh'],
[923,'XNEB'],
[343,'Xneby'],
[3113,'xneby123'],
[1650,'Xnebyn'],
[1797,'xnebyn27a'],
[2541,'Xnebyv'],
[547,'xnebyvan'],
[2612,'Xnebyvaxn'],
[1916,'Xnebyxn'],
[3786,'xnebgxn'],
[2911,'Xneenzry'],
[1262,'Xneln'],
[1785,'Xnemlpvry'],
[3865,'Xnfnaan'],
[574,'xnfvn'],
[2364,'Xnfvn jnjn'],
[3650,'Xnfvn32'],
[2536,'xnfvnn'],
[1736,'xnfvnq'],
[4121,'Xnfvnynynyn'],
[2882,'xnfvnz'],
[791,'Xnfvnaan'],
[2913,'Xnfvnfzbbyy'],
[1093,'xnfvr-axn'],
[3566,'Xnfvrx'],
[729,'Xnfvrńxn'],
[2351,'xnfvbł'],
[3662,'xnfvhyn'],
[3366,'Xnfvhyrx'],
[2695,'xnfvhyxn'],
[2168,'Xnfvhavn'],
[4375,'Xnfvhavn70'],
[2098,'xnfwbcrwn'],
[2172,'xnfxn'],
[482,'xnfxnqre'],
[803,'xnffb'],
[1874,'Xnfmgnabjn'],
[4152,'Xng'],
[1245,'Xngnemlan'],
[1628,'Xngnemlan Z'],
[3979,'xngnemlan2258'],
[3692,'Xngnemlan7'],
[2224,'xngnemlanf2'],
[3330,'xngnemlaxn'],
[117,'Xngr'],
[2796,'xngunefvf'],
[414,'Xngul'],
[3497,'XNGV'],
[834,'xngyrtb'],
[55,'xngbjvpmnaxn'],
[337,'xngeva'],
[24,'xnggv'],
[614,'xnggfgn'],
[4343,'Xnl'],
[1506,'Xnl7'],
[3165,'Xnln2007'],
[2119,'xnlnfvn'],
[2468,'xnm'],
[3582,'xnmrxb'],
[1445,'Xnmabqmvrwn'],
[3885,'xrvpnz'],
[3519,'xrzbg'],
[4350,'Xravqevf'],
[786,'xrenzrx'],
[3104,'Xrenmna'],
[1907,'Xrezvg'],
[3181,'xriyne'],
[510,'Xrlfre Fbmr'],
[356,'Xunqtne'],
[3261,'Xunmnn'],
[3037,'Xurvyn'],
[2544,'xuwragfr'],
[32,'xuzvry nyv'],
[4453,'xuhc'],
[3264,'Xulragfr'],
[1341,'Xvnben'],
[1501,'xvpuba'],
[1363,'xvpvn'],
[2354,'xvpvrx'],
[3167,'xvpvbe'],
[1792,'Xvtnan'],
[1743,'xvxn'],
[1360,'xvxv'],
[3263,'xvz wrfgrz'],
[742,'xvarxx'],
[993,'Xvatn'],
[898,'xvatn ebfmpmlavnłn'],
[537,'Xvatn22'],
[4051,'xvatnatryn'],
[441,'xvavn'],
[678,'xvavn-21'],
[3616,'Xvbfuv'],
[1867,'xvcfmgn'],
[674,'Xynxvre'],
[2808,'Xynen'],
[2706,'xynhqvn'],
[2120,'Xyrzraglaxn'],
[1229,'xyvxavw_ghgnw'],
[1834,'Xyvgbevf'],
[449,'xzxemlfvrx'],
[4398,'Xavrwn'],
[2111,'xbnyn'],
[2863,'Xbov'],
[621,'Xbpvpn'],
[1101,'xbtra'],
[503,'Xbwbg 399'],
[945,'xbxyvxb'],
[801,'xbxbqbe'],
[1376,'Xbyn'],
[397,'xbypmlx'],
[2430,'xbyva'],
[4007,'xbybe15'],
[3671,'xbybeqavn'],
[3558,'xbzrgn'],
[1109,'Xbzvarx'],
[1615,'xba999'],
[616,'xbavpmlaxn'],
[793,'xbavpmlaxn_pmgrebyvfgan'],
[1067,'xbaenq'],
[1388,'xbaenqq'],
[275,'xbaenqrxc'],
[2241,'XbaenqF'],
[298,'xbainyvn'],
[3628,'Xbbeqlangbe'],
[1947,'xbbfnn'],
[1621,'Xbepm'],
[3765,'Xbeary'],
[1586,'xbearyvn'],
[3673,'XbearyvnK'],
[521,'Xbfzvgn'],
[2209,'xbg'],
[4226,'xbgcvrf'],
[4167,'Xbgg'],
[2023,'xbiny21'],
[1843,'Xbjny'],
[3515,'Xbjnyvk'],
[262,'xbmvbyrx'],
[896,'xbmbqów'],
[1863,'Xenxbjvnava44'],
[1532,'Xenfuna Ounznenqżnatn'],
[1980,'Xenfany'],
[148,'xenfabyhqrx'],
[2926,'Xerngbe'],
[1006,'xerpvx'],
[3053,'Xerpvx1976'],
[2720,'xerfjbm'],
[2554,'xevwn108'],
[760,'xevf'],
[3389,'xevf1'],
[840,'xevfpun'],
[3771,'xevfgv'],
[2272,'xevfgbs'],
[2042,'Xevfgbs-72'],
[154,'xebcxn'],
[2948,'xebcxv'],
[915,'xeg3'],
[681,'Xehpun'],
[1684,'xelavn'],
[1704,'Xelf'],
[3388,'Xelfvn'],
[4102,'xelfgvna'],
[4512,'XelfgvnaYbir'],
[156,'xelfglan'],
[2349,'Xelfmgnł'],
[4171,'Xeml'],
[730,'xemlpub'],
[951,'Xemlpubb'],
[7,'Xemlpuh'],
[3382,'Xemlpuh84'],
[4068,'XemlpuhBX'],
[1212,'Xemlf'],
[119,'Xemlfvrx'],
[2884,'Xemlfvh'],
[2360,'Xemlfvh Natryhf'],
[176,'XEMLFMGBS'],
[29,'Xemlfmgbs m Jebpłnjvn'],
[3466,'Xemlfmgbs84'],
[558,'XEMLŚ'],
[2053,'XGA'],
[2343,'xgbś'],
[3139,'Xgenadhvyvgl'],
[2934,'xhon'],
[3097,'xhon1990'],
[2456,'xhonxhon'],
[3561,'XHOHŚ'],
[4274,'Xhohś7'],
[478,'xhxgbz'],
[2684,'Xhxhfvn'],
[2800,'Xhzna28'],
[1790,'xhan'],
[3095,'xhaqmvhyxn'],
[2811,'xhaxn'],
[494,'xhcn śzvrpuh'],
[1044,'Xheuna'],
[3530,'xhefznfnmhgnwfxvrtb'],
[1689,'xj2000'],
[2380,'xj2222'],
[2074,'xjnagbjn'],
[818,'XJVNG YBGBFH'],
[3368,'Xjvngrx'],
[3503,'XJVNGRX7'],
[4215,'xlmn'],
[2504,'xmb'],
[3458,'Yn Yhan'],
[4035,'Ynoqeba'],
[1665,'ynppbavn'],
[2465,'ynpurfvf'],
[3134,'ynqnpb'],
[891,'Ynql Va Erq'],
[2597,'Ynql Z'],
[2937,'Ynthaxn'],
[3178,'ynv'],
[2989,'ynyn'],
[1967,'Ynyn Znerpmxn'],
[4039,'ynzn'],
[495,'Ynzng'],
[4032,'Ynzinqvf'],
[4031,'Ynaprybg'],
[2075,'Ynaqre'],
[2486,'Ynaqelaxn57'],
[3706,'ynaqelaxbjn'],
[230,'Ynb'],
[612,'Yncvf Ynmhyv'],
[4145,'YncvfYnmhyv'],
[960,'YnFn22'],
[1900,'Ynhpmv'],
[425,'Ynhen'],
[2869,'Ynhen W'],
[982,'Ynhen33'],
[1196,'Ynhexn'],
[2388,'Ynlyn'],
[1868,'ynmhelg'],
[1176,'ypu'],
[660,'Yrn'],
[2425,'yrn351'],
[4517,'Yrpu'],
[3081,'YrPuvsser'],
[2678,'yrpubc'],
[3581,'yrtraq'],
[4004,'yrtar'],
[699,'yrzb'],
[2314,'Yrzhe'],
[2125,'Yran'],
[2755,'Yran86'],
[1679,'YranR'],
[3124,'yranvf'],
[812,'Yrarx'],
[1022,'Yrb'],
[4107,'yrbxnqvn7'],
[694,'YRBA'],
[3206,'Yrbarfn'],
[4127,'yrfalwrtbe'],
[4106,'Yrfmpmh'],
[11,'Yrfmrx'],
[269,'Yrfmrx Xemlfmgbs'],
[594,'Yrfmrx1961'],
[3000,'Yrśan102'],
[3640,'yrśavx'],
[3276,'Yrha Nzzr'],
[2166,'Yrinaqr'],
[523,'Yrkkn'],
[3510,'Yrlabk'],
[2516,'yv777'],
[132,'Yvpon'],
[1852,'Yvqrpmxn'],
[1976,'yvqvn vmnoryn'],
[3983,'yvqvnan8'],
[1149,'yvqxn'],
[2857,'Yvsr Vf Crnpul'],
[1919,'yvsgre'],
[3556,'Yvtug'],
[4163,'yvtugraibl'],
[3696,'Yvtugvat'],
[3998,'yvtugev'],
[3042,'yvxbzvx'],
[2666,'Yvxba'],
[592,'yvyningv'],
[450,'Yvyv'],
[2777,'yvyvnaar'],
[2761,'yvyvgu'],
[1750,'yvyvgu33'],
[4027,'Yvyxn'],
[1325,'Yvyevna'],
[3534,'Yvyh'],
[1596,'Yvzrx'],
[1072,'yvzrelx'],
[1019,'yva'],
[244,'yvaxn'],
[2550,'yvść an jvrgemr'],
[4130,'Yvggyr Jvat'],
[1016,'Yvivn'],
[4407,'Yvivn Rgure'],
[3112,'yvivn-'],
[971,'yvj'],
[4093,'Yvjn'],
[3390,'Yvmn'],
[1611,'Yvmv'],
[704,'Ywnf'],
[4442,'Ybon'],
[2302,'ybpmd'],
[374,'Ybtbf'],
[3681,'Ybtbf7'],
[1983,'ybxv'],
[1801,'ybxvt'],
[2097,'Ybxl'],
[1524,'Ybyv1983'],
[3144,'ybyb'],
[2904,'Ybat'],
[4377,'ybatubea'],
[2565,'Ybbpnf'],
[1442,'ybbyn'],
[1047,'YbeqQrnq'],
[347,'yberyrv'],
[4212,'ybfnatryrf'],
[576,'ybgrx'],
[2555,'Ybguni'],
[770,'ybgb2'],
[527,'Ybh'],
[464,'ygjqzq'],
[46,'yh-tune'],
[1091,'Yh-fa'],
[4451,'yhprx7643'],
[1640,'Yhpvqernz'],
[4356,'Yhpvy'],
[1311,'Yhpwna'],
[4464,'Yhpwna126'],
[4183,'Yhpl'],
[4205,'yhplyhh'],
[3563,'Yhqzvyn'],
[4052,'YHVFFN'],
[1201,'yhx'],
[2732,'yhxn'],
[2637,'yhxn2003'],
[3809,'Yhxnzb'],
[1753,'yhxnf23'],
[406,'yhxnfm'],
[2731,'yhxnfm24'],
[4345,'Yhxnfm7'],
[2204,'yhxnfmyz'],
[416,'Yhxre'],
[1071,'Yhxzne'],
[3770,'yhxerpwn'],
[672,'yhzvrer'],
[1329,'yhan'],
[2451,'yhanybiryvtug'],
[330,'yharzvfgldhr'],
[1373,'yhcbf'],
[118,'Yhfv'],
[2284,'yhfv olq'],
[4310,'yhkhf'],
[1089,'Yln'],
[131,'Ylaq Frnthyy'],
[3904,'Łnfvyqn'],
[1316,'łhxnfm'],
[2291,'Łhxnfm 83'],
[4471,'Łhxnfm X'],
[2383,'Łhxnfm F'],
[3172,'Łlapvbe'],
[3183,'łmnNful88'],
[9,'z11'],
[3068,'ZN'],
[4258,'Znnunerg'],
[823,'znny'],
[1364,'znpu'],
[3356,'znpuvan'],
[21,'Znpvrw'],
[161,'Znpvrwxn'],
[2223,'ZnpvrwJ'],
[1622,'Znpvrx'],
[1712,'Znpvhś'],
[2158,'znpfvz'],
[1722,'Znćxb'],
[1286,'znqneg'],
[4176,'Znqrf'],
[2412,'Znqv'],
[3788,'znqbe'],
[2661,'znqmvn xbssnan'],
[2902,'ZnqmvnXX'],
[4076,'znqmvx'],
[1472,'Znqmvberx'],
[1806,'znse'],
[607,'znt'],
[1463,'Zntnqn'],
[401,'Zntqn'],
[1259,'Zntqnyrran'],
[645,'Zntqnyran'],
[1829,'zntqnf'],
[4301,'zntqnJ'],
[2447,'zntqnk78'],
[3504,'zntqrapwn'],
[2707,'ZNTRAGN26'],
[227,'zntvn_pvful'],
[123,'Zntvx'],
[3475,'Zntvx88'],
[1682,'zntvarg'],
[1502,'Zntargb'],
[189,'Zntabyvn'],
[597,'zntb'],
[2099,'zntbxf'],
[4306,'zntcrefrhfm'],
[3413,'zntenwn'],
[620,'ZntfA'],
[2566,'Znthś'],
[2355,'ZnuzrqNyvNtpn'],
[3745,'znuhzv'],
[1833,'Znvn'],
[3192,'znvqra'],
[782,'znvgev'],
[435,'znw'],
[249,'znwn'],
[4328,'Znwn75'],
[4170,'znwn9'],
[1491,'znwnn'],
[783,'znwqbz'],
[4353,'znwveryran'],
[3799,'Znwxn'],
[407,'Znwxry'],
[3076,'znwxry999'],
[4100,'Znwfgre'],
[2063,'znx'],
[3678,'znxn'],
[1955,'Znxne'],
[4404,'znxr FNYYNZ abg tvunq'],
[2955,'znxv2010'],
[4024,'znxvk'],
[2892,'znxflzkc'],
[546,'Znyn'],
[3332,'Znynvxn'],
[3594,'znyran'],
[3442,'Znyrńxn'],
[3641,'znytbpun40'],
[2984,'znytbfvn z'],
[3305,'znyvan'],
[1177,'znyvan9'],
[4501,'znyvaxn73'],
[1247,'znyvabjlfnq'],
[4469,'znyxnqm'],
[542,'znybpnl'],
[544,'Znybpnl175'],
[870,'znygnen'],
[798,'Znyhgxn'],
[2552,'znyhgxn30'],
[3319,'Znyhgxn33'],
[2056,'znyjvq'],
[1992,'znyjvan'],
[2941,'znylohqqn'],
[1884,'znylan'],
[893,'znylBFUB'],
[1798,'znłn'],
[4224,'Znłntbfvn'],
[1662,'Znłtbavn'],
[2259,'Znłtbemngn'],
[239,'znłtbfvn'],
[4230,'Znłtbś'],
[2189,'Znłl'],
[417,'znzn'],
[2741,'znznłtbfvn'],
[605,'znann'],
[4467,'znanungn'],
[4454,'Znangg'],
[2528,'znaqnynn'],
[3630,'Znaqnynfunagv'],
[1144,'znaqentben'],
[3006,'znatnyn'],
[507,'Znavn'],
[689,'Znavrx'],
[2671,'znaan'],
[702,'Znagv'],
[1811,'znagbqrn'],
[2677,'Znahryn'],
[792,'Zncny'],
[100,'Znen'],
[2579,'Znep1a'],
[3072,'Znepryhf'],
[3355,'zneprcna'],
[3163,'Znepurjn'],
[26,'ZNepva'],
[2295,'Znepva Onanfvńfxv'],
[3862,'Znepva Thzvavnx'],
[921,'Znepva Xbjny'],
[3329,'Znepva Cehfvx'],
[3737,'Znepva E'],
[876,'Znepva F'],
[3241,'znepva007'],
[3916,'Znepva24'],
[3522,'znepva70o'],
[3106,'znepvaab'],
[3585,'ZnepvaK'],
[4276,'znepb1983'],
[2601,'znepb248'],
[3302,'znephf10'],
[1997,'zneplffgry'],
[1685,'Zneqhx'],
[1127,'Znerp'],
[862,'ZnErPxV'],
[1541,'Znerpmrx'],
[163,'znerx'],
[129,'znerx ovnłnpu'],
[2947,'Znerx Ohtab'],
[242,'Znerx Z'],
[4329,'Znerx Zvłbść'],
[2384,'Znerx233'],
[4173,'znerx2804z'],
[3814,'znerx87'],
[3308,'ZnerxO'],
[2140,'znerxpvrfyvx'],
[301,'ZnerxXbgrefxv'],
[1887,'znerxzya'],
[331,'Znerx_M'],
[3656,'zneshfvgn'],
[215,'znetn'],
[1055,'Znetnerg'],
[3657,'znetnergxn'],
[287,'Znetb'],
[1070,'znetbX'],
[3180,'znetbehq'],
[321,'ZNETB_O'],
[778,'znev'],
[2283,'znev369'],
[3529,'Znevn'],
[4073,'Znevn 15'],
[2865,'znevna'],
[1050,'Znevnan'],
[4432,'Znevnaxn'],
[206,'Znevnabf'],
[4222,'Znevr Pynver'],
[3845,'znevra'],
[2185,'znevwn'],
[367,'Znevxn'],
[797,'Znevyyxn'],
[1416,'znevyh'],
[2739,'Znevar'],
[252,'znevb'],
[3526,'Znevb1111'],
[2336,'znevb2000'],
[4466,'znevbrf'],
[562,'znevbyn'],
[4347,'Znevbyn29'],
[4368,'znevbyxn007'],
[4244,'znevbzne'],
[3805,'znevcbfn'],
[1853,'znevhf'],
[2365,'ZnevhfO'],
[649,'Znevhfm'],
[399,'Znevhfm T'],
[577,'ZnevhfmReb'],
[2500,'znevhfmwu'],
[1557,'znevhfmx'],
[1890,'znevhhfm'],
[676,'znewn'],
[3941,'znewnq'],
[2652,'znewnem'],
[3207,'Znex124'],
[3208,'znex99'],
[1344,'znexre'],
[3500,'znexwxc'],
[13,'Znexb'],
[44,'Zneyran'],
[3605,'Zneyraxn'],
[423,'zneb'],
[3246,'znebpbab'],
[173,'znecbm'],
[39,'zned'],
[1540,'zneeba2'],
[858,'Znegn'],
[3739,'Znegn X'],
[3391,'znegn-znegn'],
[2100,'znegn78'],
[4109,'znegnfbwn'],
[459,'Znegraf'],
[1335,'Znegv'],
[2264,'znegva'],
[1698,'Znegvarm'],
[2914,'Znegvahf'],
[2131,'znegfpncrf'],
[4061,'Zneggvan'],
[3182,'zneghpun'],
[4137,'Zneghvfn'],
[4271,'Zneghfvn'],
[4333,'Zneghfvn1'],
[3232,'zneghfvnxbpunan'],
[1048,'Zneglan'],
[2624,'znehpu'],
[1519,'znehqn'],
[790,'zneiva'],
[3411,'Zneivin'],
[22,'Znel'],
[149,'znelwnar'],
[1599,'Znelyxnkk'],
[3230,'znelae1'],
[187,'Znelfvrńxn'],
[3895,'znelfxncr'],
[2662,'znemran'],
[3243,'znemravr'],
[4017,'Znemraxn'],
[1042,'Znemraxn Qlgzna'],
[2147,'Znemlpvry'],
[4482,'znemlpvry64'],
[3189,'znfnmgnwfxv'],
[3527,'znfnmgnwfxvxhefl'],
[1059,'znfx'],
[2419,'Znffn'],
[1903,'znffntrjnefnj'],
[1914,'Znfgre'],
[36,'zngrx'],
[1161,'zngrxehora'],
[1104,'zngrhfm'],
[2658,'Zngvx'],
[2191,'Zngevk'],
[3480,'Zngevkxho'],
[1652,'Zngg'],
[3874,'zngg74vxr'],
[1739,'znggory'],
[3848,'znggrbf'],
[1392,'zngguvnf'],
[3638,'Znggzrvfgre'],
[2690,'znglv'],
[4141,'znglyqnfm'],
[4260,'znhn'],
[4062,'Znhevpr'],
[3135,'znk'],
[555,'znkobfxv'],
[2210,'znkv'],
[383,'ZnkvXnM'],
[3477,'ZnkvzhzYvsrFcrrqOybtFcbg'],
[922,'znkzneg'],
[784,'znklzrd'],
[439,'Znln'],
[3073,'Znln11'],
[1219,'znlb'],
[2685,'Znmvn'],
[1264,'zpbt'],
[415,'zqebmq'],
[811,'zrn'],
[3955,'zrqqbob'],
[3800,'Zrqvav'],
[3444,'Zrqvgu'],
[4500,'zrqhmn'],
[72,'zrrjnfu'],
[775,'ZrSvfgbsryrf'],
[193,'Zrt'],
[1713,'Zrtna'],
[1544,'zrttv'],
[1379,'zrttvp'],
[571,'Zrttl'],
[593,'zrtv'],
[1434,'zrtvf'],
[70,'zrv-wv'],
[1077,'zry'],
[1989,'Zryon'],
[2287,'zrypvn'],
[3376,'zryvffnn85'],
[711,'Zryba'],
[133,'ZRYBAVX'],
[4000,'zrybabzna'],
[372,'Zryhmlan'],
[1164,'Zra 2'],
[669,'zrabyyb'],
[989,'zrbq'],
[2298,'Zrepraaneer'],
[366,'zreuyva'],
[875,'Zreyvaxn'],
[1307,'zreyvaxn5'],
[438,'Zrgngeba'],
[713,'ZRGRBE'],
[615,'Zrgubf'],
[2286,'Zrgbql11'],
[1537,'Zrmb'],
[680,'ztbaqnf'],
[2218,'zv'],
[307,'zvnv'],
[1483,'Zvpu'],
[4302,'Zvpunny'],
[2945,'Zvpunry'],
[585,'zvpunry03'],
[373,'zvpunryn'],
[137,'zvpuny'],
[2991,'zvpuny007f'],
[3242,'Zvpuny36cbm'],
[3863,'zvpuny7'],
[3735,'Zvpuny82'],
[1545,'Zvpunyvaxn'],
[504,'zvpuny_vmnnx'],
[2,'Zvpunł'],
[2089,'Zvpunł  O'],
[185,'Zvpunł Temrtbemrjfxv'],
[4304,'Zvpunł E'],
[3643,'zvpupvb'],
[1572,'zvpv'],
[3586,'zvqtneq'],
[2846,'zvxn'],
[1152,'Zvxnyvaxn'],
[2155,'ZvxnF'],
[1060,'zvxr'],
[3652,'zvxr79'],
[1965,'zvxry'],
[2044,'zvxvzbhfr'],
[3218,'Zvxbłnw'],
[3690,'Zvxhf'],
[2783,'Zvyn'],
[3869,'zvynteb'],
[2746,'zvypmąpn'],
[3482,'zvyran'],
[1386,'Zvyranu'],
[630,'zvyrfvba'],
[1667,'Zvyvwba'],
[2972,'zvyyravhz'],
[2878,'zvybc'],
[842,'zvłbfm'],
[1305,'zvzreba'],
[2976,'zvzv'],
[2487,'zvzvxen'],
[1140,'Zvzvyxn'],
[4197,'Zvanerggn'],
[2432,'zvaqvainqre'],
[2681,'Zvavn'],
[610,'Zvaban Yntu'],
[1487,'zvbqal'],
[3281,'zvenoryxn140'],
[3525,'zvenaqn21'],
[942,'Zveqnq'],
[528,'ZVErpmrx'],
[1566,'Zverx'],
[4281,'zverx008'],
[2124,'zvetnq3'],
[1802,'Zvev'],
[2901,'Zvevnu'],
[646,'zvevnz'],
[962,'zvevnzynhen'],
[319,'zveb'],
[3136,'zvebo'],
[1676,'Zveba'],
[320,'Zvebb'],
[3200,'zveeggn'],
[2668,'zvf'],
[879,'zvfvn'],
[334,'zvfvnpmrx'],
[2880,'zvfvntql'],
[4053,'zvfvngn'],
[997,'zvfvpmxn'],
[980,'zvfvrx'],
[1163,'zvfvb'],
[2699,'Zvfvbclfvb'],
[429,'Zvfgvp'],
[1370,'Zvfgvf Fvarafvf'],
[2225,'Zvfgld'],
[557,'zvfmn'],
[1725,'zvfmn65'],
[3026,'Zvfmpmhx Yrfmrx Fłnjbzve'],
[1183,'zvg'],
[4498,'zvgcvb'],
[82,'zxz'],
[1686,'zxz77'],
[167,'zxcebt'],
[868,'ZY'],
[1917,'zybqfml navby'],
[4160,'zzneevb'],
[105,'ZZZZnegn'],
[477,'zavpu'],
[1408,'zbn'],
[1842,'Zbovhf'],
[1414,'zbpnavbyn'],
[1417,'Zbpnavbłn'],
[2275,'zbpalnavby'],
[2377,'zbpervxv'],
[142,'ZbqP'],
[3051,'zbqryvan'],
[1005,'ZBQREENGBE'],
[1206,'Zbrzv'],
[2912,'Zbtv'],
[3672,'zbure'],
[1534,'zbwemrfm73'],
[1084,'zbyqnivgr'],
[1804,'zban'],
[1885,'zban-z12'],
[3722,'zbansbk'],
[2646,'Zbanxb'],
[2179,'ZBANyvfn27'],
[1877,'ZbaqrlM'],
[2825,'Zbavn'],
[4143,'Zbavn77'],
[4514,'zbavn8737'],
[3142,'Zbavnnn'],
[2602,'zbavpn'],
[845,'zbavx'],
[54,'Zbavxn'],
[4363,'zbavxn 34'],
[4400,'zbavxn f'],
[3512,'Zbavxn11'],
[1138,'Zbavxn1981'],
[4001,'Zbavxn71'],
[4124,'zbavxn833'],
[2819,'zbavxn9gbwn'],
[2530,'zbavxns'],
[1337,'Zbavd'],
[894,'Zbavdhr'],
[3123,'Zbavfvn'],
[2507,'Zbabyvg'],
[2560,'zbagr89'],
[2749,'zbba'],
[4066,'Zbbatebbj'],
[3710,'zbbafxva'],
[4034,'zbcrxk7'],
[3846,'zberyn'],
[3088,'Zbera'],
[1479,'zbetnan yr snl'],
[1063,'Zbetvnan'],
[3111,'Zbetbgu'],
[2315,'Zbetbgyv'],
[726,'Zbecu'],
[2737,'Zbecuvn'],
[2872,'zbefjva'],
[293,'Zbegv'],
[3738,'Zbejraan'],
[1564,'zbfsrg'],
[3851,'zbgly'],
[2759,'zbglyrx02'],
[2492,'ZbjZvZp'],
[4380,'Zbmvyyn'],
[641,'Zówoenpvr'],
[2589,'zc'],
[3624,'Ze Urqtrubt'],
[1026,'zenyy'],
[4503,'Zebpmrx83'],
[4452,'ZEBJRX47'],
[2338,'zeójxn'],
[4133,'zefQ'],
[2533,'zhpub7zberx'],
[1471,'zhpvn'],
[1499,'zhpvn9'],
[1933,'Zhexl'],
[408,'zhecul'],
[358,'zhfgnat34'],
[1770,'Zhfmryxn'],
[1061,'zjv'],
[3543,'zkk12'],
[961,'zlfvn_clfvn'],
[4324,'zlfgrelzna'],
[2709,'Zlfgvp'],
[1210,'Z_Z'],
[2311,'a2bx'],
[1657,'an qboerw qebqmr'],
[313,'ANNZN'],
[2378,'anov'],
[1639,'Anqvn'],
[1522,'Anqmvrwn'],
[2723,'anthy'],
[4251,'Anu'],
[3244,'Anwrqmbal Ohoe'],
[2313,'Anxnfun'],
[2114,'Anxzr'],
[2469,'Anznevf'],
[75,'Ananxv'],
[1236,'Anapl'],
[2694,'Anaqv'],
[3549,'AnaqvavQnf'],
[1979,'anaan'],
[754,'Analan'],
[1250,'AnCv'],
[1111,'ancvf'],
[2833,'anenlna'],
[2440,'Anerfu'],
[4043,'anewn'],
[3889,'aneivx'],
[1882,'AnF'],
[766,'angnyv'],
[904,'Angnyvn'],
[955,'angnyvn_'],
[3820,'angnf13'],
[412,'Angnfuln'],
[1755,'angnfmn'],
[4261,'Angu'],
[3613,'Anguna'],
[1633,'angunavry'],
[3817,'angxn'],
[752,'angxne'],
[4307,'AngxnEh'],
[3045,'anghenyorng'],
[2766,'anghenyavrangn'],
[3443,'anjvrqmban1989'],
[1001,'anjebggbzrx'],
[4161,'anmve'],
[4468,'Arn'],
[3465,'Aroevf'],
[867,'Arpebahf'],
[3740,'Arsr'],
[15,'Arsvyvz'],
[602,'arsergrgr'],
[4199,'arxb'],
[2898,'arxeb'],
[3009,'Aryy'],
[1529,'arahsne'],
[202,'ARB'],
[1861,'Arb777'],
[1927,'Arcurfu'],
[2014,'ardhr'],
[1185,'Arerkb'],
[3379,'Arezr'],
[195,'arireubbq'],
[2740,'Arihn'],
[324,'arjtnetnzry'],
[2386,'arjzlf'],
[3080,'aul6'],
[3887,'av20'],
[3928,'avntnenqernz'],
[16,'Avpx Fynhtugre'],
[2654,'Avpx321'],
[2743,'avpxg'],
[2954,'avpxgbf'],
[3825,'avpenz79'],
[1162,'avć nxn'],
[2547,'avrovrfxv'],
[4367,'Avrovrfxvr Fxemlqyngr'],
[2350,'avrqmjvrqm'],
[3730,'Avrqmjvrqm31'],
[1517,'avrqmjvrqmvbjngl'],
[1568,'avrqmjvrqmvbjngl1'],
[3367,'Avrtbqan'],
[65,'avrborpal'],
[1939,'avrbsvpwnyal'],
[3919,'avrjvreanqhfmn'],
[4044,'avrmncbzvanwxn'],
[471,'aVRmABśaN yRxxBść oLgh'],
[789,'Avxn'],
[3015,'Avxn1'],
[3326,'avxr'],
[1469,'Avxv'],
[3603,'avxvgn2007'],
[2870,'Avxbynfxbjn'],
[107,'avxben'],
[2827,'avxg'],
[572,'avznv'],
[746,'Avan'],
[1485,'Avan75'],
[3038,'Avenawna'],
[2665,'Avgu'],
[4473,'Avhfvn'],
[3374,'avhfm'],
[3299,'avhgn'],
[3360,'avjn'],
[1634,'abnu fhau'],
[3301,'abpxrre'],
[2932,'abpalcgnx'],
[1856,'ABR'],
[820,'Abryyn'],
[89,'abxhyra'],
[3454,'Abznqn'],
[1039,'abzrbezr'],
[1985,'abzvf'],
[3463,'abanzr'],
[1661,'Abbo'],
[3103,'abbml'],
[3415,'Abeoreg'],
[1618,'Abezna'],
[2679,'abfsrengh'],
[1190,'abin'],
[2593,'abjl'],
[2930,'ahvuv'],
[1592,'Ahvg'],
[4231,'Ahahś'],
[125,'aherx'],
[2771,'aheevz'],
[3639,'alnu'],
[181,'Bofrejngbe'],
[1040,'bpnybal'],
[3018,'bpphygn'],
[3969,'bqnqbenqbfpv'],
[1263,'bqemhpban'],
[771,'bsspn'],
[1998,'btvrzhf'],
[3438,'bxnbxn'],
[3107,'bxvs'],
[3659,'bxbmybjfxn'],
[3052,'Bxgnjvn'],
[3152,'Bxhflg'],
[2542,'by'],
[1119,'byn'],
[4240,'Byn3'],
[2489,'bynqvbf'],
[2786,'bynxhm'],
[386,'byq fcvevg'],
[4448,'byqmv'],
[2840,'byrpu'],
[1324,'Byrńxn'],
[4150,'byrńxn39'],
[1902,'BYTN'],
[3840,'Bytn Cnhyvan'],
[2781,'Bytn-'],
[3315,'Bytn---'],
[2261,'Bytvreq'],
[3373,'Bytvavn'],
[1610,'byvpmrx'],
[3034,'BYVJVN97'],
[1562,'byxn'],
[2514,'byxn---'],
[1563,'Byyn'],
[3339,'Byyvr44'],
[2240,'Bz'],
[4195,'BZ676'],
[633,'bzrtn'],
[1233,'bzrtn13'],
[3966,'bzvnxba'],
[267,'bzavpbybhe'],
[2758,'BzFunagv'],
[2604,'bzfgna'],
[146,'bzgbz'],
[2674,'ba'],
[1780,'BAn'],
[4450,'baqerw'],
[346,'bagbwn'],
[2176,'Bcny'],
[2453,'bcrafcnpr'],
[4181,'bcgvzny'],
[2656,'bcglzvfg'],
[1255,'benatrzbba'],
[1087,'bepuvqrn'],
[3169,'beryv'],
[2077,'Berfgn'],
[2031,'bevrag'],
[1080,'beb'],
[284,'Befba'],
[2669,'bemrfmrx'],
[1112,'Bfringber'],
[4317,'bfvpn'],
[3704,'bfvrznzc'],
[446,'bśzvbeavpmxn'],
[2335,'bśjvrpban'],
[1222,'bgvfrx'],
[2708,'bhgfvqre'],
[824,'bmnan'],
[1531,'bmlelf'],
[3345,'cnoyb11'],
[2107,'Cnoyb24'],
[4266,'Cnoyb80'],
[4237,'cnoybnhfgb'],
[3110,'cnoybvq'],
[265,'cnppb'],
[2369,'Cnqznfnan'],
[1160,'cnqer'],
[3032,'cnqer1'],
[1724,'Cnynqva'],
[2092,'cnzryn'],
[541,'Cnzcn'],
[1451,'cnaqn'],
[3868,'cnatrn'],
[4273,'Cnaver'],
[4225,'CnaanZnwn'],
[2804,'cnagnerv'],
[2952,'Cnbyn Oenppvb'],
[969,'Cncrx'],
[2992,'cncvyba'],
[3836,'cnenznegungnu'],
[1555,'Cnefvsny'],
[4114,'cnfnżre'],
[2488,'Cnfwn'],
[2969,'Cnfxhqn'],
[2784,'cnfmgha'],
[2996,'Cng79'],
[3757,'cngv'],
[1878,'Cngvxf'],
[4344,'Cngvfbarx'],
[2306,'Cngg'],
[720,'cnhy74'],
[1612,'cnhyn'],
[1719,'Cnhyn-X'],
[2402,'Cnhyn27'],
[112,'Cnhynav'],
[869,'cnhyv'],
[999,'Cnhyvan'],
[3912,'cnhyxrefrl'],
[3291,'Cniybivgm'],
[35,'cnj'],
[655,'cnjry'],
[1957,'cnjry11'],
[3069,'cnjry6t'],
[4245,'CnjryNeghe'],
[2860,'Cnjryrx'],
[3850,'cnjryfxv'],
[3937,'Cnjrym'],
[601,'Cnjrł'],
[4284,'Cnjrł X'],
[4116,'CnjrłX'],
[4232,'Cnjxn74'],
[1695,'Cnjyvś'],
[1609,'cnjcbf'],
[1459,'cnjhybz'],
[2726,'Cnźqmvbpu'],
[1427,'Cryvxna'],
[4362,'Crbavn'],
[165,'Crcr'],
[3834,'CrEsRxPwN'],
[3445,'creyn'],
[3252,'Crełn'],
[1520,'Crefrcubar'],
[4463,'CREFRHF'],
[1336,'Crgr'],
[817,'crgre'],
[3153,'crgre-p'],
[661,'CrGrErX'],
[4013,'crgreeb'],
[3170,'crgebavhfm'],
[2853,'cu31'],
[3965,'Cunrqen'],
[1543,'Cunfvf'],
[2519,'cuvyrb'],
[247,'cuvyvcrx'],
[4188,'Cuvyvcf12345'],
[2407,'Cuvban'],
[637,'cubravk'],
[3202,'CubFv'],
[1636,'cvppbyb bx'],
[1452,'cvrytemlz'],
[2454,'Cvrf'],
[3699,'Cvrgbzrx'],
[2370,'cvxnf'],
[1338,'cvxry'],
[1824,'Cvxb'],
[4010,'cvaxn'],
[3102,'cvaxv'],
[2871,'CvaxEbfr'],
[136,'cvb'],
[4438,'cvbenc'],
[143,'cvbexb1'],
[2455,'cvbeha'],
[947,'Cvbgre'],
[1192,'cvbgxr'],
[209,'Cvbge'],
[3400,'cvbge nysn'],
[322,'Cvbge nc Xhxv'],
[2822,'Cvbge Neraqg'],
[191,'Cvbge UbEa Fmxbłn Gnebgn'],
[4337,'Cvbge Fnyrgavx'],
[3826,'Cvbge Jnlqry'],
[2062,'Cvbge-'],
[538,'cvbge123'],
[684,'Cvbgerx'],
[3636,'cvbgerxf80'],
[3742,'cvbgebjfxv'],
[28,'CVBGEHŚ'],
[2798,'cvbgehś1'],
[393,'cvbgehś_wbg'],
[3964,'cvbggerx'],
[1607,'Cvenzvqvba'],
[4417,'cvfmxvgyr'],
[1410,'cvgrerx1'],
[2405,'CvmmnChmmry'],
[4308,'cwz'],
[463,'CWFM'],
[3960,'CX'],
[2787,'Cynargne'],
[2663,'Cynagngbe'],
[1139,'Cłbzvrń'],
[243,'cznt'],
[4157,'cb cebfgh'],
[968,'Cbpnubagnf'],
[3323,'CbxówQhfml'],
[4298,'cbxerpbal'],
[2632,'cbyn'],
[4424,'Cbyfxn'],
[3751,'cbylnaan666'],
[2927,'Cbznenapmn'],
[241,'Cbab'],
[4255,'cbffhzbsgurtebggb'],
[2675,'cbfgebsn'],
[899,'Cbfmhxvjnpm'],
[2866,'Cbfmhxhwąpl'],
[4009,'cbhsar'],
[3793,'cbjenpnwąpn snyn'],
[815,'cbmvbzxn'],
[882,'Cbmanvnx24'],
[1730,'CC'],
[3177,'CENXEVGV'],
[4087,'cenxfrqxn'],
[2150,'Cenjqmvjrx'],
[3732,'cerznfnvonon'],
[584,'Cerzanguna'],
[3285,'Cevzniren'],
[433,'ceb3'],
[1295,'Cebngynagvf'],
[890,'cebshfvba'],
[3398,'cebzrf'],
[2247,'Cebzlpmrx'],
[628,'cebzlpmxn'],
[2502,'Cebzlx'],
[3880,'Cebkvzn Pragnhev'],
[3247,'cei'],
[1272,'cemrwrpunal wrż'],
[442,'Cemrzrx'],
[2770,'cemrzrx23'],
[300,'cemrzb'],
[2558,'cemrzb12'],
[2485,'cemrzb86'],
[2267,'cemrzbtbby'],
[1458,'Cemrzlfłnj'],
[3383,'Cemrzlfłnj Obx'],
[864,'cemrfnqn'],
[2187,'cemlolfm'],
[2610,'cfrhqbqbprag'],
[168,'Cfvbavx'],
[405,'cflpub'],
[2995,'cfmpmbyxn'],
[887,'cfmpmbłn'],
[2962,'Cg47-08'],
[48,'cgnu'],
[2712,'Cgbzrx'],
[857,'chqry'],
[554,'Chqrłxb'],
[460,'chzn'],
[2701,'Chznn'],
[1931,'CHAVFURE'],
[101,'chaxbgrx'],
[3803,'cjvc24'],
[4359,'clgbarx'],
[508,'c_nhyn'],
[761,'Don'],
[1799,'dox'],
[828,'DDyrpmxn'],
[1205,'DGerzbe'],
[1171,'dhnfvcebqhprag'],
[3121,'Dhngra'],
[3190,'djregl'],
[4335,'djregm'],
[1118,'E-n'],
[1594,'en'],
[3944,'Enoneone'],
[2788,'Enpupvx'],
[1187,'Enpvobe'],
[3197,'Enpmrx'],
[2716,'Enq'],
[277,'Enqrx'],
[3595,'Enqrx Q'],
[1332,'Enqrx X'],
[3025,'Enqrx722'],
[2018,'Enqrx76'],
[3646,'Enqunenav'],
[1385,'Enqbfynj'],
[1821,'Enqhavn'],
[2816,'Enqmvh'],
[2611,'ENS'],
[2763,'ens4454'],
[8,'Ensnry'],
[2940,'Ensny'],
[806,'Ensnł'],
[1342,'Ensnł J'],
[1105,'Ensnł7'],
[4491,'Ensnł75'],
[2762,'Enspvb777'],
[332,'Envaobj'],
[3935,'enwfgbcxv2'],
[2207,'Enz Onunqhe Obzwba'],
[3050,'Enznznav'],
[2756,'ENZZFGRVA1'],
[1320,'Enzgun'],
[4084,'Enzlna'],
[4129,'Encunryn'],
[4182,'encvg'],
[737,'enfn'],
[1988,'enfgn'],
[196,'Engnachev'],
[2249,'enguna'],
[1141,'engyrerx'],
[851,'enira'],
[2288,'Enira gur bar'],
[4019,'Eniv'],
[881,'enlar'],
[4287,'enmqjngeml'],
[3344,'EO'],
[5,'erny'],
[4259,'ErncrE'],
[474,'Erqobe'],
[3923,'erqoevne'],
[3734,'erqxn81'],
[3760,'erttvan'],
[3300,'Ertane'],
[907,'erterfwn'],
[1122,'erterfwnn'],
[2262,'erzrqvbf'],
[986,'Erzrx'],
[1697,'Erzvtvhf'],
[560,'erzxrl'],
[2845,'erangxn'],
[4122,'erfxn'],
[2810,'evxvn'],
[3827,'exbohfbz'],
[3483,'exbareg'],
[3569,'eznepva'],
[3174,'EZP'],
[992,'ebo'],
[2000,'eboorr'],
[38,'Eboreg Xenxbjvnx'],
[360,'Eboreg-Yhoyva'],
[3347,'eboregbf'],
[4449,'Ebova'],
[402,'Ebofba'],
[2697,'Ebofba70'],
[2001,'Ebppb'],
[4502,'Ebpxre'],
[1400,'ebqnj'],
[3713,'ebxv777'],
[1384,'Ebyb'],
[2326,'Ebzna'],
[1238,'Ebznafur777'],
[86,'ebzrx'],
[1482,'ebzvxx'],
[2227,'ebzvyvgn'],
[3071,'Ebzhnyq'],
[2083,'Eba Oerngunjnl'],
[2573,'eba21'],
[3974,'Eban'],
[1269,'Ebav'],
[513,'Ebavxn'],
[2556,'Ebfrzryvn'],
[3812,'EbfrEnovnxn'],
[2910,'ebfgh'],
[3493,'ebfm'],
[1038,'ebgnefxv'],
[2096,'Ebhtr'],
[1762,'ebmnyvn'],
[3906,'ebmnyvn56'],
[4361,'Ebmvx'],
[3976,'ebmwb'],
[1768,'eóżbjr fmxvrłxb'],
[390,'Eóżlpmxn'],
[3399,'eerzrzon'],
[376,'EFzbynerx'],
[3675,'ehqn'],
[1556,'ehqnyoa'],
[4016,'ehyrgxn'],
[497,'Ehfnyxn'],
[3682,'ehfvarx1962'],
[1225,'ehgnzvnn'],
[3807,'Ehgynjfxv'],
[2232,'el7'],
[2900,'elovgjn'],
[1836,'elol'],
[178,'Elpubb'],
[847,'elpvh'],
[3286,'elz 74'],
[1918,'elfvn'],
[349,'elfmneq'],
[3441,'f1961'],
[4029,'fnon'],
[550,'Fnpurz'],
[1409,'Fnpevyrthf'],
[673,'fnqunxn'],
[49,'fnqunan'],
[3853,'fnrib'],
[1601,'fnsn'],
[4047,'fnsbann12'],
[473,'fntvggnevhf'],
[3619,'fnv'],
[3265,'fnvningnen'],
[2630,'fnvybe'],
[3225,'fnvenz'],
[1211,'fnwnaxn'],
[3726,'fnxvan'],
[1934,'Fnynznylxbz'],
[3155,'fnynenzn'],
[2095,'fnyvpr'],
[949,'fnyvz'],
[1099,'Fnznquv'],
[1331,'Fnznry-xn'],
[3122,'Fnzon'],
[4332,'Fnzvthpvb'],
[1486,'fnzjvrfmxvzwrfgrz'],
[4185,'fna727'],
[2950,'fnaq'],
[2381,'Fnaqnysvba'],
[395,'Fnaqzna'],
[491,'fnaqen'],
[939,'fnarx'],
[2387,'Fnaan'],
[291,'fnaawnf'],
[114,'Fnen'],
[1330,'fnen yvpugznaa'],
[1281,'FNEN09'],
[2592,'fnenu'],
[4048,'fnetba'],
[2924,'Fnean'],
[3449,'fnfnsenf'],
[1282,'FnfNaxn'],
[2282,'fnfxvn'],
[1241,'fnguln'],
[3057,'fngv'],
[4228,'Fngwn'],
[1121,'Fngbe'],
[3881,'fngbeb'],
[565,'Fngln'],
[201,'fninaan'],
[2651,'Fnivbyn18'],
[2499,'FNL999'],
[1078,'fnln'],
[2879,'Fnlyra'],
[1294,'Fnlhwln'],
[2183,'FPQevire'],
[1660,'fprcglpmxn'],
[1230,'fprcglpmal'],
[1224,'fprcglx'],
[4506,'fpueba'],
[3691,'fr6b'],
[1113,'fro'],
[3905,'Fron'],
[696,'frony'],
[342,'fronfgvna'],
[3435,'Frob'],
[3093,'FROB 23'],
[4075,'froby1986'],
[2525,'frpbaqyvsrflaqebzr'],
[3492,'frpergtneqra'],
[1632,'Frqhpre'],
[1407,'frxjnan'],
[194,'fry'],
[3658,'Fryn'],
[2339,'fryran'],
[4303,'fryvorx'],
[3222,'Frzryr'],
[4192,'frzv'],
[4272,'Frzv36'],
[1595,'fraflgljan'],
[4098,'frah'],
[1037,'Frcuvebgg'],
[885,'Frensva'],
[1538,'Frencu'],
[3832,'Frencuvz'],
[1729,'Frencuva'],
[1186,'frepr'],
[691,'freratrgv'],
[3220,'freravgl'],
[3634,'fretvb'],
[2067,'Fretvhfm'],
[4203,'freerg'],
[4474,'Frfmra'],
[2382,'frgubf'],
[892,'frkv27'],
[871,'frkl fleraxn'],
[716,'frklznłbyngn'],
[3787,'Fu4q0j'],
[2329,'Funqbj'],
[2839,'funqbj87'],
[1646,'Funubj'],
[805,'funxgv'],
[3129,'Funxgv X'],
[833,'FUNXGVV'],
[1744,'funznab'],
[3386,'Funzven'],
[2517,'funagv'],
[1165,'Fur-jbys'],
[3090,'fura'],
[2375,'Furin'],
[1254,'Fuvavtnzv'],
[4233,'Fuvavat Yvtug'],
[2729,'fuvalpurrx'],
[2577,'Fuveqv'],
[2424,'fuveyrll'],
[3501,'fuerd79'],
[1321,'fvo'],
[80,'Fvqqunegun'],
[1461,'Fvqrerhf'],
[272,'fvrqrz'],
[3402,'fvryyyn'],
[852,'fvretvrw'],
[3021,'fvrebgv'],
[2631,'fvrefpvhpu'],
[941,'fvrjpn'],
[3028,'Fvynf'],
[1948,'Fvyrapvhz'],
[2805,'Fvyrag Sberfg'],
[1909,'FvyragNatry'],
[4313,'Fvyin'],
[453,'fvyire'],
[2416,'fvyirezbba'],
[4489,'Fvyirejvaq'],
[2645,'fvzzbaf'],
[2194,'fvzba'],
[1631,'Fvaa'],
[1511,'fvbfgen'],
[2161,'fvbfgenryivfn'],
[3452,'fve'],
[831,'fvfv'],
[566,'fvgnen'],
[3119,'fvjvpxv'],
[87,'fvjhf'],
[1169,'fxnaqny'],
[2893,'fxnaqnyba'],
[2379,'fxneonavbyn'],
[3703,'fxv'],
[2079,'Fxvr'],
[2643,'fxbecvba2610'],
[4229,'fxbecvba99'],
[1498,'fxbehcvnx'],
[4395,'Fxbjebarx'],
[2309,'fxemnpvx78'],
[603,'fxemng21'],
[3357,'fxemlaxn97'],
[843,'fxlobyg'],
[930,'fynjxnyv'],
[4184,'fynjxb'],
[2051,'fynjbzvez'],
[1512,'fyvaqr'],
[2113,'Fyba'],
[2010,'Fybapr'],
[14,'Fłnjrx'],
[552,'Fłnjrx_C'],
[1866,'Fłnjbzve Znwqn'],
[4354,'Fłnjbzve Zvreabgn'],
[2439,'Fłnjbzve Zvfmpmhx'],
[1353,'Fłbjvx'],
[1726,'fzntyvpmxn'],
[1709,'fzngenf'],
[2450,'fzbx'],
[3936,'fzbxh84'],
[1030,'fzhgrpmrx'],
[2916,'favrżlaxn'],
[502,'FabbmR'],
[204,'fbore'],
[1301,'fbpwbcngn'],
[1781,'fbpwhfm'],
[3056,'fbqnyvg'],
[4413,'Fbrgr'],
[799,'fbwnaxn'],
[1009,'fbwxn'],
[217,'Fbxny'],
[2036,'FbXółMjLpMnWaL'],
[2135,'Fbyne'],
[3436,'fbyrvy'],
[987,'FbyvqFanxr'],
[909,'Fbyvgnevn'],
[1251,'fbzn'],
[1987,'Fba bs Yvoregl'],
[2794,'fbavn'],
[3259,'fbaxn'],
[3664,'Fbaan'],
[1306,'fbgvf'],
[2280,'Fbhyzna'],
[186,'fbhepreebe'],
[1180,'fbjn'],
[4236,'Fbjn7'],
[4227,'Fójxn'],
[1690,'fcnprfurrc'],
[2348,'fcner'],
[3226,'Fcnex'],
[3385,'Fcnexyr'],
[514,'fcryavbar_znemravr'],
[2121,'fcvqqre'],
[418,'fcvqrecy'],
[3407,'fcvxr'],
[3749,'Fcvevg'],
[3166,'fcbqrpmrx'],
[1043,'FcbegFxyrc'],
[2340,'fchevhfm'],
[2206,'fdveery'],
[3708,'Feroean'],
[3747,'fevfuvin'],
[1800,'ffzbyvx'],
[3277,'ffa-21'],
[3079,'fgna-enqbfpv'],
[3520,'fgnavfynj18'],
[4217,'Fgnayrlt321'],
[1317,'fgnaenqbfpv'],
[2836,'fgne'],
[4253,'Fgnesver'],
[920,'Fgneyvtug'],
[809,'Fgnfmrx20IG'],
[2138,'Fgrsna'],
[2765,'fgrspvn'],
[2431,'fgryvxn'],
[3953,'fgryxn'],
[1490,'Fgrira'],
[3256,'fgrirhx'],
[2703,'fgvvy natry'],
[1057,'Fgvatre'],
[489,'fgb'],
[959,'fgbxebgxn'],
[4419,'fgbxebgxn18'],
[2736,'fgbarq'],
[1420,'Fgbarjnyxre'],
[290,'Fgbez'],
[2300,'fgenghf10'],
[2596,'Fgertn'],
[2236,'fgevqre'],
[714,'fgebsn'],
[2035,'Fgehzlx'],
[1523,'fgelpub'],
[2512,'fgemnyrpvn'],
[73,'fgjbembaxb'],
[1812,'fgl'],
[3440,'fhna'],
[1533,'FHON'],
[4263,'fhogryan'],
[3479,'fhpuznfpuvar'],
[3298,'fhpulonqlyrx'],
[700,'fhsva'],
[197,'FhsvG Śjvąglav'],
[3795,'Fhune'],
[656,'fhywna'],
[1813,'fhzv'],
[2250,'Fhzzre'],
[4247,'Fhasybjre'],
[1641,'FHAAL'],
[1197,'Fhafuvar'],
[3723,'fhcreabin'],
[787,'fhcevln'],
[1839,'Fhev'],
[1383,'Fheln'],
[4155,'fhfna'],
[2438,'FhfnaFrklEribygr'],
[2016,'FhfvBan'],
[4374,'Fhjrera'],
[3707,'fhmv'],
[3397,'fhmvx'],
[3758,'Fivmmreb'],
[912,'FjnafBireIvfghyn'],
[3971,'fjrrg200'],
[1789,'fjvrgyvx'],
[2409,'fjvrgyh'],
[2903,'fjbobqn'],
[2942,'FL'],
[3162,'Flo'],
[1031,'Flyivn'],
[4515,'Flyivn Ivbyrg'],
[64,'Flyivx'],
[2277,'flyivan'],
[1433,'flyjvn'],
[1687,'Flyjvn J'],
[3901,'flyjvn123'],
[3847,'Flyjvne'],
[1990,'flyjvnf'],
[3631,'flyjvnfq'],
[325,'Flyjvarx'],
[311,'fly_ivx'],
[976,'Flevhfm'],
[2148,'fmnpu'],
[1815,'Fmnpune'],
[3841,'Fmnzna'],
[3353,'fmnznaxn'],
[2838,'Fmnzv'],
[4058,'fmnzbgnavan'],
[2260,'fmnbyva'],
[3921,'FmnelNavbł'],
[1374,'FMPMRXNQBERX'],
[1126,'fmpmhe'],
[3910,'FmrwxNavn'],
[3891,'fmrapufmna'],
[333,'fmrafna'],
[1249,'fmrezvrem'],
[769,'fmvqcb'],
[2146,'FMVEN'],
[917,'Fmybzxn'],
[1252,'Fmyhor'],
[651,'fmbxbjb'],
[431,'fmcnxx'],
[2459,'fmghxnsehjnavn'],
[3816,'fmlzrx'],
[638,'Fmlzrd'],
[1276,'Śyvsxn'],
[4223,'śzvrpuh jnegr'],
[1982,'Śzvrfmrx'],
[1478,'Ścvąpn'],
[56,'Ścvąpl Avrqźjvrqź'],
[4445,'Śev Śev Fjnzv Xencnanaqn'],
[120,'Śjvngrłxb'],
[2251,'Śjvrgyvfgl Wrż'],
[1477,'Śjvęgn Vaxjvmlpwn'],
[1453,'g0zrp'],
[394,'Gnq'],
[1401,'Gnqrx'],
[3250,'gnqrhfm'],
[2434,'GnqK'],
[2875,'gnu'],
[3785,'GnwrzavpmlBteóqTqlavn'],
[500,'gnxnwn'],
[1155,'Gnxv1'],
[4099,'gnyivunygvn'],
[2673,'Gnznen'],
[1100,'Gnzoryva'],
[177,'gnzyngnzghyn'],
[2551,'GNZGEHZ'],
[1194,'Gna'],
[2751,'Gnńpmąpl m Wrżnzv'],
[3746,'gnb'],
[1270,'Gngn'],
[3451,'Gnlxn'],
[2809,'gnlh9'],
[2847,'gq'],
[2266,'gqx'],
[4270,'grn'],
[3349,'grqql'],
[984,'Grt'],
[1232,'gryrcngvn'],
[2966,'Gryrcbegngbe'],
[957,'gryreub'],
[586,'grartnnu'],
[3541,'grarelsn'],
[1840,'Grcrwbybgy'],
[4065,'grenmbyn'],
[2136,'grersrer'],
[174,'grerfn43'],
[1195,'Grerfn7514907394818482'],
[3434,'grezna'],
[2004,'grezv'],
[3283,'grezvangbe'],
[2622,'grean'],
[327,'Grff'],
[1565,'Grfgre Cbpmgl'],
[2473,'grgrngrgr'],
[3931,'grgfhqb'],
[3363,'grmn1'],
[3813,'GUNYN'],
[4112,'Gur Yvtug'],
[3864,'Gur JnevnK'],
[3729,'Guvtenaq'],
[3201,'gubq'],
[4021,'gubgurx'],
[1098,'Guleiva'],
[609,'gvnav'],
[2442,'gvnaven'],
[1489,'Gvsrerg'],
[829,'Gvtreva'],
[1881,'gvynpn'],
[3375,'Gvyvn'],
[3653,'gvzxnfvn'],
[3337,'Gvzzl'],
[1721,'gvan'],
[4110,'Gvatn'],
[1817,'gvaxn'],
[807,'Gvaxva'],
[1528,'Gvaavr'],
[1707,'gvcu'],
[4399,'gynybpna'],
[4248,'gznpvrx'],
[237,'gzx'],
[3981,'gb91'],
[183,'Gbovnfmrx'],
[1402,'gbsvx'],
[3625,'Gbsvfm'],
[2229,'gbz'],
[1405,'gbz38'],
[3240,'GBZNYN'],
[2050,'Gbznfa'],
[1832,'Gbznfm'],
[3768,'Gbznfm7979'],
[128,'GBZNFMXLX'],
[4505,'Gbzngbe72'],
[490,'gbzpvb'],
[3288,'Gbzrpmrx'],
[79,'Gbzrx'],
[2445,'Gbzrx 12'],
[1136,'Gbzrx Q'],
[3858,'Gbzrx A'],
[1223,'Gbzrx1000'],
[2290,'gbzrx11'],
[3756,'Gbzrx1510'],
[3279,'gbzrx527'],
[170,'Gbzrxf'],
[1021,'Gbzrx_11'],
[3186,'Gbzvnab19'],
[3418,'gbzvv'],
[162,'gbzvxb1'],
[1,'gBZxl'],
[2245,'gbzzzz'],
[4411,'gbzzbg'],
[654,'Gbzhś'],
[3258,'GBZMRA'],
[3855,'gbasn1'],
[2144,'gbal'],
[2711,'gbalxybcbgbj777'],
[1658,'gbby'],
[41,'Gbbzrx'],
[2629,'gbc phg'],
[4151,'Gbepnqb'],
[935,'Gbeatnfnx'],
[4325,'gbejvq'],
[1216,'Gbhyqvr'],
[1398,'gbjn'],
[3120,'genadhyvygl'],
[2033,'Genaf-Nz-Revpn'],
[2404,'Gencvk'],
[235,'gengsn'],
[2575,'genjavpmrx'],
[1422,'gerare'],
[3404,'gerk'],
[1221,'gevapb'],
[4418,'Gevfgra'],
[3063,'gebyy85'],
[1655,'gebl2010'],
[4492,'Gehgu'],
[4204,'Gemlxebcrx'],
[4069,'Gfhxv'],
[3882,'ghyvcnarx'],
[3790,'ghyxh'],
[1692,'Ghegyr'],
[1760,'gjvql'],
[122,'gltelf'],
[4478,'gltelfrx'],
[919,'Gltelfxv'],
[2292,'Glzpmnfbjl'],
[551,'glfvn'],
[3575,'Glgnahf86'],
[1494,'Glghf'],
[279,'hOvX'],
[1960,'HpmraFjvngyn'],
[2446,'hqnv'],
[779,'hsbpunaaryvat'],
[180,'Hxnfu'],
[3253,'hxnfurx'],
[2312,'Hxłnqnaxn'],
[361,'hxf'],
[2548,'Hyn'],
[3727,'hyn62'],
[2076,'hyrapwn'],
[2059,'Hyvwnaxn'],
[3151,'HybgalQlz'],
[359,'Hygbe'],
[3635,'Hygenivbyrg'],
[4042,'hanjner'],
[788,'Havirefnyan'],
[2422,'haznav'],
[515,'hcnqylnavby'],
[926,'hcnqłn'],
[2297,'hcnqłl Navbł'],
[979,'Hcnqłl_Navbł'],
[3709,'Hcemrwzl'],
[2443,'Hevry'],
[3083,'Hefmhyn'],
[225,'Hegvpn'],
[3821,'hehm106'],
[2834,'hfreanzr'],
[1046,'Hfvb'],
[3579,'Hfmrogv'],
[4297,'hhhnnn'],
[67,'hmv'],
[1199,'hmmvy'],
[1097,'i-2'],
[1181,'Innk'],
[1656,'inqre'],
[2802,'Inryva'],
[2169,'Inyqv'],
[3105,'inyrk'],
[1261,'inzna'],
[2068,'inavyyn'],
[2418,'Inegbe'],
[3214,'Ineinen'],
[2505,'inguqtne'],
[4437,'Inlnqrin'],
[2905,'ioebjavat'],
[4290,'Irqvpneg rh'],
[1432,'irtrqbebgrx'],
[1620,'IrtrYvyv'],
[4286,'iryirgrir'],
[3371,'irarkvf'],
[2106,'irarmvn82'],
[3350,'irave'],
[2408,'iragvyr'],
[3843,'Irahffvx'],
[3564,'irebavxn'],
[2123,'irebjn'],
[2813,'Iv'],
[2319,'ivnghfmrx'],
[1838,'ivpgbevf'],
[3067,'ivqzb'],
[540,'ivtvy'],
[3348,'ivun'],
[4365,'ivwngn'],
[3980,'ivxvat80'],
[2027,'IVXGBE1'],
[4063,'ivxgbevn'],
[774,'Ivy'],
[1542,'Ivyyrzb'],
[1449,'ivyyra'],
[1923,'ivbyn'],
[1285,'ivbynagn'],
[1327,'ivbyrg'],
[3517,'Ivbyrggn'],
[975,'ivban'],
[426,'iveln'],
[3733,'Ivfuan'],
[4490,'Ivfuah'],
[3996,'Ivgevby'],
[1745,'ivinyqv'],
[2246,'iviv'],
[1130,'ixnyv'],
[1784,'Iynqvf'],
[1855,'Ibqvhfu'],
[289,'ibyal'],
[111,'ibfu'],
[134,'jnthfvn42'],
[2420,'jnunqynem'],
[3077,'jnyqrxyran'],
[1514,'Jnzcve'],
[4392,'Jnaqn'],
[1346,'Jnaqn Q'],
[889,'Jnaqn Zvav'],
[4250,'Jnaqrere'],
[4267,'jnaqmvn'],
[1333,'jne'],
[2780,'jneare'],
[3358,'JnehzFvr'],
[802,'Jnfmxn'],
[4256,'Jnk'],
[76,'jrqebjvrp2003'],
[2616,'jrqebjvrpfjvngyn'],
[1191,'jrtn'],
[1493,'Jrtn113'],
[1895,'jrtrgxn'],
[1473,'jryrf'],
[1617,'JRAQV'],
[4289,'jrahf'],
[1396,'JREN'],
[3528,'JrepvnK'],
[529,'Jrebavxn'],
[2045,'Jrebavdhr'],
[3082,'jrfpn'],
[3146,'jrfbyl-navby'],
[77,'jrfgn'],
[1584,'Jrgrena'],
[2128,'jęqebjvrp'],
[2830,'jęqebjavpmrx'],
[3546,'juvyr'],
[3794,'juvfcrre'],
[2026,'jub fubhyq pner vs abg H'],
[3755,'jubrire'],
[4475,'JubVfGungTvey'],
[329,'JUF'],
[663,'jvpure'],
[1356,'jvpure7'],
[706,'Jvpxrq'],
[2013,'jvrx'],
[382,'JVRYXVROHZ'],
[3533,'Jvryblrqra'],
[4177,'Jvrfvn'],
[2200,'Jvrfvn77'],
[4218,'jvrfłnj'],
[841,'jvtn'],
[316,'JVX'],
[4023,'jvxn'],
[2885,'Jvxv'],
[4144,'jvxv36'],
[3762,'jvxgbe15'],
[563,'Jvxgbevn'],
[2513,'Jvxgbevn33'],
[1411,'jvyqxngmr'],
[3471,'Jvytn'],
[3140,'Jvyxn'],
[873,'jvaqbx'],
[3943,'jvazra'],
[2253,'jvaare'],
[3583,'jvbyn'],
[795,'jvbyrx'],
[318,'jvbfan'],
[4036,'jvean'],
[1958,'jvfqbz'],
[3328,'jvfvraxn77'],
[4493,'Jvfvrńxn'],
[3668,'Jvfg84'],
[4518,'Jvg Fgjbfm'],
[3340,'Jvgrx'],
[2299,'jvivra'],
[2691,'Jvmwn'],
[4191,'JW'],
[810,'Jxeęgnx'],
[2482,'jynq'],
[2653,'jybpmlxvw'],
[3213,'jybqmvzvrem orarqlxg'],
[1081,'JłnqpnRysój'],
[2222,'Jboreg'],
[71,'Jbw'],
[1028,'Jbwpvrpu'],
[2970,'jbwpvrpu7'],
[2196,'Jbwwbm'],
[2946,'JbwZny'],
[2130,'Jbwbjavx Śjvngłn'],
[756,'jbwgrx'],
[3942,'JbwgrxQ'],
[219,'Jbwgrx_T'],
[2429,'jbyyrL'],
[974,'JbybagnevhfmCbxbwh'],
[1240,'jbzna-va-fcnpr'],
[3649,'Jbbqynaq'],
[4096,'jbbql'],
[2086,'jbhaqrq natry'],
[2361,'jbjxn'],
[3573,'jerfmpvrwn'],
[794,'Jebpłnjvnava'],
[3697,'jeban'],
[4014,'Jebgn'],
[3309,'jeóżxn męohfmxn'],
[3287,'jfbjxn'],
[994,'Jfcółpmhwąpl'],
[1830,'Jfmrpu Zbtąpl'],
[3109,'jgberx003'],
[2221,'Jhoreg'],
[328,'jjjjjj'],
[2226,'jltenwxn'],
[3364,'Jlbyxn1'],
[3094,'Jlfcn'],
[3694,'jlmjbyravr'],
[3743,'Knqqbevbhf'],
[2588,'knexn'],
[2219,'knirel'],
[4483,'knjvre'],
[3092,'kpmvab'],
[1944,'kran'],
[315,'KVQRK_ WNA'],
[3897,'kzna'],
[883,'kbeprere'],
[434,'khna'],
[4428,'kkk06'],
[762,'klcbaboelxba'],
[276,'kljn'],
[3272,'Kmb'],
[1304,'Lntn'],
[3478,'lnuh53'],
[1115,'lnzn'],
[4135,'Lnzrgu'],
[3231,'Lnzvan'],
[3476,'lnagen'],
[85,'lnerx'],
[4371,'lnebfu'],
[2844,'lryryr'],
[3127,'Lbqn'],
[99,'LBT'],
[561,'lbtn'],
[874,'lbtvall'],
[1794,'Lbxn'],
[1951,'lbxb'],
[826,'lbfvv'],
[266,'lbherx'],
[1773,'lbhfgvr'],
[3193,'Lbmhr'],
[3421,'Lfnuryy'],
[2030,'libaarx'],
[2625,'lmmmn'],
[3695,'mntngxn'],
[995,'mnthovban'],
[3269,'mnthovban74'],
[3448,'Mnthovban89'],
[3565,'Mnuav21'],
[3274,'mnxf'],
[3927,'mnynynz'],
[1075,'mnzben'],
[108,'mncybaavx'],
[430,'mnenmn'],
[692,'Mnfgrcl_Yhplsren'],
[1260,'moraehf'],
[4382,'Movtavrj Mtbqn'],
[1426,'Movtavrj Mvov'],
[1846,'movtavrjpvpuba'],
[3495,'molpus2'],
[1347,'Molpuh'],
[224,'molq'],
[3396,'molyba'],
[1418,'molfvrx'],
[354,'Molfmrx'],
[1174,'Molfmrx O'],
[52,'Molfmrx Cebpubjfxv'],
[1279,'Molfmrx54'],
[1484,'molfmrx777'],
[3667,'Molfmrx8543'],
[512,'molfmrxm'],
[3973,'molfmxb'],
[3551,'molfmxbf1'],
[3568,'mqenjb'],
[1244,'Mqm'],
[2856,'mqmvfvbf'],
[884,'mqmvfynj'],
[2832,'Mqmvfłnj'],
[3884,'Mqmvfłnj Byvjn'],
[1741,'Mravb'],
[4366,'mrabovwhfm'],
[2728,'mrmby'],
[659,'Mtntn'],
[1300,'mtnttn'],
[380,'muvzren'],
[1371,'MVO10'],
[3195,'mvov'],
[3544,'mvryrń'],
[4409,'Mvryban-Mnon'],
[1062,'mvrybal'],
[1381,'mvrybalonybavx'],
[2974,'mvtsv'],
[1151,'Mvtmnt'],
[1716,'mvzal fgrsna'],
[1334,'mvzalabf'],
[2615,'mvbbyxb'],
[3593,'mvhg964'],
[2698,'Mvmry'],
[643,'mwnjn ernyan'],
[1629,'mwnjn33'],
[411,'młbgn_avrovrfxn'],
[1928,'Młbgl xfvężlp'],
[4105,'Mbqvnx'],
[4059,'MBR'],
[1035,'mbr_ 1'],
[113,'Mbwn'],
[1587,'mbzov'],
[506,'mbagne'],
[256,'Mbbmn'],
[4403,'mbeeb'],
[3464,'Mbfvn'],
[1377,'mbfvn23'],
[4426,'mbfxn1977'],
[753,'memrqn'],
[1578,'Mhcn'],
[2874,'Mhmn'],
[1505,'MHMNAAN'],
[1150,'mhmvnpmrx'],
[4443,'mhmh-ebfr'],
[2367,'Mjret'],
[950,'mjbyna'],
[1966,'mjlxłl snprg'],
[4140,'Mltselqn'],
[1831,'Mltlg'],
[2876,'mljl03'],
[2105,'Mlmnpmrx'],
[2332,'mmngzr'],
[832,'_xnfvn_'],
[1258,'_bz_'],
[381,'___nyrk']
]};

//-------------------------------------------------------------------
// chrome.js

if (typeof GM_setValue !== 'function')  {

	function GM_setValue(name, value) {
		localStorage.setItem(name, value);
	}

	function GM_getValue(name, defaultValue) {
		return localStorage.getItem(name) || defaultValue;
	}

	function GM_deleteValue(name) {
		localStorage.removeItem(name);
	}

	function GM_addStyle(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
}

//-------------------------------------------------------------------
// json.js

/**
 * Implements JSON stringify and parse functions
 * v1.0
 *
 * By Craig Buckler, Optimalworks.net
 *
 * As featured on SitePoint.com
 * Please use as you wish at your own risk.
 */

if (!this.JSON || window.opera) {   // stringify doesn't work correctly in opera 10.6x
    this.JSON = {
        parse : function (str) {
            if (str === "") {
                str = '""';
            }
            eval("var p=" + str + ";");
            return p;
        },
        stringify : function(obj) {
            var t = typeof obj;
            if (t !== "object" || obj === null) {
                if (t === "string") {
                    obj = '"'+obj+'"';
                }
                return String(obj);
            }
            else {
                var n, v, json = [], arr = (obj && obj.constructor === Array);
                for (n in obj) {
                    if (obj.hasOwnProperty(n)) {
                        v = obj[n];
                        t = typeof v;
                        if (t === "string") {
                            v = '"'+v+'"';
                        }
                        else if (t === "object" && v !== null) {
                            v = JSON.stringify(v);
                        }
                        json.push((arr ? "" : '"' + n + '":') + String(v));
                    }
                }
                return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
            }
        }
    };
}

//-------------------------------------------------------------------
// scrollbar.js

// modified by Anonymous
// original: Matthew Eernisse
// source: http://www.fleegix.org/articles/2006-05-30-getting-the-scrollbar-width-in-pixels
// The code in this post is licensed under the terms of the Apache License, version 2.

function getScrollerWidth() {
	var doc = document,
		outer = doc.createElement('div'),
		inner = doc.createElement('div'),
		wScroll = 0;
    outer.style.position = 'absolute';
    outer.style.width = '100px';
    outer.style.height = '50px';
    outer.style.overflow = 'auto';
    inner.style.width = '100%';
    inner.style.height = '200px';
    outer.appendChild(inner);
    doc.body.appendChild(outer);
    wScroll = inner.offsetWidth;
    doc.body.removeChild(outer);
    return 100 - wScroll;
}


//-------------------------------------------------------------------

var staticCSS = '.block{display:block}\
td.fixart{font-size:9pt;line-height:12pt}\
td.fixart font{color:#000;font-family:verdana, tahoma, arial, sans-serif;font-size:9pt;line-height:12pt}\
td.fixart a, td.fixart a font{color:#6b87a8}\
td.fixart a{text-decoration:underline}\
td.fixart a{font-size:9pt}\
td.fixart a.gray7{color:#6b87a8;font-size:7pt;text-decoration:none}\
td.fixart > p[align=right] > a:first-child, td.fixart > table:first-child + table > tbody > tr > td:first-chil\
d > a:first-child{font-size:inherit;color:#ff8520;text-decoration:none}\
a.showlink{color:#dda;font-weight:normal;-moz-user-select:none;-webkit-user-select:none;margin-left:5px}\
a.showlink:after{content:\'Post ukryty\'}\
a.showlink:hover{color:#0c0}\
a.hidelink{color:#ccc;font-weight:normal;-moz-user-select:none;-webkit-user-select:none;margin-left:5px}\
a.hidelink:after{content:\'Ukryj\'}\
a.hidelink:hover{color:#f00}\
.filtrowane{display:none}\
table.plonk div.orange7{color:#dda}\
table.plonk div.orange7 a{color:#dda}\
table.plonk span.silver7thin{color:#dda}\
table.plonk div.orange7 a:hover{color:#6b87a8}\
a.blacklistlink{color:#dda;font-weight:normal;-moz-user-select:none;-webkit-user-select:none;margin-right:5px;\
}\
a.blacklistlink:after{content:\'X\'}\
a.blacklistlink:hover{color:#f00;text-decoration:none !important}\
a.blacklistcancellationlink{color:#dda;font-weight:normal;-moz-user-select:none;-webkit-user-select:none;margi\
n-right:5px}\
a.blacklistcancellationlink:after{content:\'O\'}\
a.blacklistcancellationlink:hover{color:#0c0;text-decoration:none !important}\
a.hash{-moz-user-select:none;-webkit-user-select:none}\
a.hash:after{content:\'#\'}\
a.hash:hover{text-decoration:none !important}\
span.awrapper span.popmenu{display:none}\
span.awrapper:hover span.popmenu{display:inline}\
span.awrapper span.popmenu a.linkdopostow{font-weight:normal;margin-left:6px;margin-right:2px}\
span.awrapper span.popmenu a.linkdokomentarzy{font-weight:normal;margin-left:4px;margin-right:2px}\
span.awrapper span.popmenu a.linkdopostow:after{content:\'posty\'}\
span.awrapper span.popmenu a.linkdokomentarzy:after{content:\'komentarze\'}\
.searchicon{background-image:url(data:image/gif;base64,R0lGODlhCgALALMAAKSvvP//8sbM1efq7bnCzNjd4u7w8////6y1we7\
w8uDk6fP0977Gz6+5xOrs79jc4yH5BAAHAP8ALAAAAAAKAAsAAAQz8CQGADMnGyRWEgh2MEKWMUwGLOYxACprvmdqohrnOJRiGpQKoSFrLUCEl\
umIeChNhUQEADs=);background-position:2px center;background-repeat:no-repeat}\
.formatka, .radius3{-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px}\
a.exheader{background-color:beige;background-color:#f7f7e0;background-image:url(data:image/gif;base64,R0lGODlh\
CQAFAIAAAIiIiP///yH5BAEHAAEALAAAAAAJAAUAAAIKRI5hlqzozkowFQA7);background-position:4px center;background-repeat\
:no-repeat;margin:2px 2px 0 2px;padding:2px 3px 1px 20px;white-space:nowrap;display:block;font-family:tahoma,a\
rial,helvetica,verdana,sans-serif;font-size:11px;-moz-border-radius:3px;-webkit-border-radius:3px;border-radiu\
s:3px;-moz-user-select:none;-webkit-user-select:none;border:1px solid #eee;font-weight:normal;color:#666}\
a.exheader.expanded{background-image:url(data:image/gif;base64,R0lGODlhCQAFAIAAAIiIiP///yH5BAEHAAEALAAAAAAJAAU\
AAAIKjAOnmXuNVISrAAA7)}\
a.exheader:hover{text-decoration:none !important;background-color:#fff;border:1px solid #ddd}\
a.exheader:focus{border:1px solid #ddd;outline:none}\
.dotty{background:url(/pics/sign1.gif) left 4px no-repeat;padding-left:10px;-moz-user-select:none;-webkit-user\
-select:none}\
a.bladyy{font-family:tahoma,arial,sans-serif;color:#bbb;font-weight:normal}\
div.linkmenu{font-family:tahoma,arial,sans-serif;margin-top:7px;color:#ccc;-moz-user-select:none;-webkit-user-\
select:none}\
div.linkmenu a{margin-right:8px}\
a.bladyy:hover{color:#f80}\
table.lnavigator{position:fixed;height:100%;left:0px;top:0px}\
table.rnavigator{position:fixed;height:100%;right:0px;top:0px}\
td.nicon{width:48px;color:#6b87a8;vertical-align:middle;text-align:center;visibility:hidden;font-weight:bold;f\
ont-family:verdana,tahoma,arial,sans-serif;font-size:11px;cursor:pointer;-moz-user-select:none;-webkit-user-se\
lect:none;background:#f1f1cf;border-top:2px solid #e4e4a3;border-bottom:2px solid #e4e4a3}\
table.lnavigator td.nicon{border-right:2px solid #e4e4a3;border-top-right-radius:15px;border-bottom-right-radi\
us:15px;-moz-border-radius-topright:15px;-moz-border-radius-bottomright:15px}\
table.rnavigator td.nicon{border-left:2px solid #e4e4a3;border-top-left-radius:15px;border-bottom-left-radius:\
15px;-moz-border-radius-topleft:15px;-moz-border-radius-bottomleft:15px}\
table.lnavigator:hover td.nicon,table.rnavigator:hover td.nicon{visibility:visible}\
td.nicon span.nvarrow{font-size:32px;font-family:\'courier new\',monospace;color:#dbdb86}\
td.tekst{width:100%}\
td.tekst1{width:100%;padding:20px 2px 8px;text-align:justify}\
td.tekst2{width:100%;padding:20px 2px 8px;text-align:left}\
div.black10{text-align:left}\
span.skroconylink1{width:1px;height:1px;position:absolute;display:block;overflow:hidden}\
span.skroconylink2:after{ content:\'...\'}\
div.fixer{overflow:hidden;z-index:10000;position:absolute;width:152px}\
div.uczestnicy{margin:12px 0 3px;color:#444;text-align:left;border:1px solid #ddd;background:#f8f8f8;-moz-bord\
er-radius:4px;-webkit-border-radius:4px;border-radius:4px}\
div.uczestnicy div.hdr{background:#f0f0f4;color:#000;padding:2px 5px;border-bottom:1px solid #eee;position:rel\
ative}\
div.uczestnicy div.hdr a{position:absolute;right:5px;top:2px;display:block}\
div.uczestnicy div.cnt{padding:2px 5px}\
div.uczestnicy span.pcount{color:#888;font-size:9px}\
div.uczestnicy span.pcount span.nawias{color:#ccc}\
div.uczestnicy div.cnt a{font-weight:normal}\
.nowrap{white-space:nowrap}\
div.pcounter{position:absolute;top:-4px;left:-4px;padding:2px 5px;background:#8af;color:#fff;font-weight:bold;\
font-size:10px;-moz-border-radius:0 0 5px 0;-webkit-border-radius:0 0 5px 0;border-radius:0 0 5px 0;-moz-user-\
select:none;-webkit-user-select:none;cursor:default}\
#biswrapper{position:absolute;left:0px;top:0px;width:100%;z-index:30000}\
#biswrapper table{margin:0 auto}\
#biswrapper td{background:none;empty-cells:show}\
.tdreklama{text-align:center;padding-right:178px}\
.tdpowrot{width:100%}\
div.media{border:1px solid #ddd;padding:4px 4px 2px 4px;margin:3px 0 2px;background:#fffff2;display:inline-blo\
ck;-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px}\
.medialink{margin-top:1px;display:block}\
.medialink a{color:#dda;font-weight:normal}\
.medialink a:hover{color:#6b87a8}';



var run = function($) {

var version = "1.2.0";

var debugTime = 0;
var debugTotalTime = 0;

var isOpera = !!window.opera;
var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') !== -1;
var isFirefox = window.toString().indexOf('XPCNativeWrapper') !== -1;

var defaults = {
    allowedImageHosts : {
        'tinypic.com' : 1,
        'imageshack.us' : 1,
        'photobucket.com' : 1,
        'flickr.com' : 1,
        'ggpht.com' : 1,	// picasa
        'fotosik.pl' : 1,
        'blip.pl' : 1,
        'blogspot.com' : 1,
        'wordpress.com' : 1,
        'blox.pl' : 1,
        'soup.io' : 1,
        'wikimedia.org' : 1,
        'deviantart.net' : 1,
        'amazonaws.com' : 1,
        'komixxy.pl' : 1,
        'demotywatory.pl' : 1,
        'scaryideas.com' : 1,
        'kotburger.pl' : 1,
        'knowyourmeme.com' : 1,
        'madzik.pl' : 1,
        'imgur.com' : 1
    },
    threads : {         // courtesy of Lynd Seagull, Inc.
        'afirmacje' : 2,
        'dzielę się swoją radością' : 590,
        'erd' : 184,
        'filmy duchowo inspirujące' : 59,
        'humor' : 136,
        'inspiracje' : 498,
        'jakiej muzyki słuchacie' : 74,
        'kącik oczyszczania' : 939,
        'mam pytanie' : 1576,
        'muzyka medytacyjna i inna spokojna' : 301,
        'nasz cudowny dom zwany polska' : 2274,
        'offtopic' : 580,
        'proszę o wsparcie duchowe' : 1263,
        'pytania do leszka żądło' : 91,
        'ulubione filmy' : 471,
        'wyznania' : 2123,
        'zamieszczajcie swoje zdjęcia' : 441,
        'złote usta' : 2205,
        'znalezione w internecie' : 1296
    }
};


var configLabels = {
	blacklistenabled: null,
	embedmedia: null
};
var configMore = {
	gluemenu: 'Unieruchom menu',
	fixaktualnosci: null,
	fixfonts: null,
	underlinelinks: null,
	notargetblank: null,
	hideads: null,
	fixtitle: null,
	changehomelink: null,
	obliteration: null
};

var defaultConfig = {
	options : {
		maxpagewidth: isWebkit ? 0 : 1100,
		fixaktualnosci: 1,
		fixfonts: 1,
		underlinelinks: 1,
		hideads: 0,
		gluemenu: 1,
		blacklistenabled: 1,
		obliteration: 0,
		changehomelink: 1,
		fixtitle: 1,
		notargetblank: 0,
		showpersons: 1,
		embedmedia: 1
	},
	state : {
		search: 0,
		links: 1,
		settings: 1,
		oldmenu: 0
	},
	links : [
		[1, 'aktualności', '/przeg_aktualnosci.php'],
		[1, '', ''],
		[1, 'artykuły', '/przeg_artykuly.php'],
		[1, 'forum', '/forum'],
		[1, 'nowe zdjęcia', '/forum/uzytkownicy.php?opt=pics'],
		[0, 'randki', '/kacik_new.php'],
		[1, '', ''],
		[1, 'posty Leszka', '/forum/szukaj.php?uid=11&s=1'],
		[0, 'posty Andrzeja K', '/forum/szukaj.php?uid=97&s=1'],
		[1, '', ''],
//		[0, 'afirmacje', '/forum/watek.php?id=2'],
		[0, 'dzielę się swoją radością', '/forum/watek.php?id=590'],
//		[0, 'erd', '/forum/watek.php?id=184'],
//		[0, 'filmy duchowo inspirujące', '/forum/watek.php?id=59'],
		[1, 'humor', '/forum/watek.php?id=136'],
		[1, 'inspiracje', '/forum/watek.php?id=498'],
		[0, 'jakiej muzyki słuchacie', '/forum/watek.php?id=74'],
//		[0, 'kącik oczyszczania', '/forum/watek.php?id=939'],
//		[0, 'mam pytanie', '/forum/watek.php?id=1576'],
//		[0, 'muzyka medytacyjna i inna spokojna', '/forum/watek.php?id=301'],
//		[0, 'nasz cudowny dom zwany polska', '/forum/watek.php?id=2274'],
//		[0, 'offtopic', '/forum/watek.php?id=580'],
//		[0, 'proszę o wsparcie duchowe', '/forum/watek.php?id=1263'],
		[0, 'pytania do leszka żądło', '/forum/watek.php?id=91'],
		[0, 'ulubione filmy', '/forum/watek.php?id=471'],
//		[0, 'wyznania', '/forum/watek.php?id=2123'],
//		[0, 'zamieszczajcie swoje zdjęcia', '/forum/watek.php?id=441'],
//		[0, 'złote usta', '/forum/watek.php?id=2205'],
//		[0, 'znalezione w internecie', '/forum/watek.php?id=1296']
	],
	blacklist : []
};


var optionMap = {

	fixfonts : {
		caption : 'Popraw czcionkę artykułów',
		state : 0,
		config : 0,					// unused for now
		defaultConfig : 1,			// unused for now
		condition : function(){
			return isArticle;
		},
		on : function(){
			tdTekst.addClass('fixart');
		},
		off : function(){
			tdTekst.removeClass('fixart');
		}
	},

	hideads : {
		caption : 'Ukryj reklamy w wątkach',
		state : 0,
		config : 0,
		defaultConfig : 0,
		on : function(){
			$(xpath1("//div[@class='ad-box']")).css({display: 'none'});
		},
		off : function(){
			$(xpath1("//div[@class='ad-box']")).css({display: 'block'});
		}
	},

	notargetblank : {
		caption : 'Otwieraj wszystkie linki w tym samym oknie',
		state : 0,
		config : 0,
		defaultConfig : 0,
		on : function(){
			if (!optionMap.notargetblank.blankLinks) {
                var blankLinks = optionMap.notargetblank.blankLinks = xpath("//a[@target='_blank']");
			}
			for (var i = 0, len = blankLinks.snapshotLength; i < len; i++) {
				blankLinks.snapshotItem(i).removeAttribute('target');
			}
		},
		off : function(){
            var blankLinks = optionMap.notargetblank.blankLinks;
			if (blankLinks) {
				for (var i = 0, len = blankLinks.snapshotLength; i < len; i++) {
					blankLinks.snapshotItem(i).target = '_blank';
				}
			}
		}
	},

	fixtitle : {
		caption : 'Popraw tytuł okna',
		state : 0,
		config : 0,
		defaultConfig : 1,
		on : function(){
			doc.title = newTitle;
		},
		off : function(){
			doc.title = oldTitle;
		}
	},

	underlinelinks : {
		caption : 'Podkreślaj aktywne linki',
		state : 0,
		config : 0,
		defaultConfig : 1,
		on : function(){
			GM_addStyle('a:hover { text-decoration: underline !important }');
		},
		off : function(){
			GM_addStyle('a:hover { text-decoration: none !important }');
		}
	},

	obliteration : {
		caption : 'Ukrywaj posty całkowicie',
		state : 0,
		config : 0,
		defaultConfig : 0,
		condition : function(){
			return !!posts;
		},
		on : function(){
			GM_addStyle('table.plonk { display:none; } table.plonk+br { display:none }');
		},
		off : function(){
			GM_addStyle('table.plonk { display:table; } table.plonk+br { display:inline; }');
		}
	},

	blacklistenabled : {
		caption : 'Filtruj posty',
		state : 0,
		config : 0,
		defaultConfig : 1,
		condition : function(){
			return !!posts;
		},
		on : function(){
			applyBlacklist(true, true);		// 21 ms
		},
		off : function(){
			unapplyBlacklist(true);
		}
	},

	changehomelink : {
		caption : 'Link na banerze prowadzi do aktualności zamiast do desideraty',
		state : 0,
		config : 0,
		defaultConfig : 1,
		on : function(){
			homeLink[0].href = '/przeg_aktualnosci.php';
		},
		off : function(){
			homeLink[0].href = '/index.php';
		}
	},

	embedmedia : {
		caption : 'Pokazuj video i obrazki',
		state : 0,
		config : 0,
		defaultConfig : 1,
		condition : function(){
			return !!posts;
		},
		on : function(){
			embedMedia();
		},
		off : function(){
			removeMedia();
		}
	},

	maxpagewidth : {
		caption : '',
		state : 0,
		config : 0,
		defaultConfig : 1100,
		setState : function(newState) {
			if (newState === 0) {
				table1.add(table2).add(table1bis).css('width','770px');
			}
			else {
				if (!arguments.callee.tablePreparedForStretching) {
					arguments.callee.tablePreparedForStretching = true;
					if (!table1bis)	{
						var bgtable = createBackgroundTable();
						var table1element = table1[0];
						table1bis = $(bgtable);
						var parent = table1.parent()[0];
						parent.insertBefore(bgtable, table1element);
						parent.removeChild(table1[0]);
						var tds = table1element.getElementsByTagName('td');
						for (var i = 0, len = tds.length; i < len; i++) {
							var td = tds[i];
							td.removeAttribute('style');
							//$(td).text(i).css({border:'1px solid red'});
						}
						tds[2].className = 'tdreklama';
						tds[4].className = 'tdpowrot';
						var div = $('<div id="biswrapper"></div>').append(table1);
						parent.appendChild(div[0]);
					}
				}
				if (!isWebkit) {
					table1.add(table2).add(table1bis).css({
						width:'90%',
						'min-width':'770px',
						'max-width':newState+'px'
					});
				}
				else {
					fixChromeWidth();
				}
			}

			var newImageWidth = newState - 197;
			if (newImageWidth < 573) {
				newImageWidth = 573;
			}
			if (newImageWidth !== mediaImageWidth) {
				mediaImageWidth = newImageWidth;
				GM_addStyle('div.media img { max-width: '+ newImageWidth +'px; }');
			}

			fixNavWidth();
		}
	},

	fixaktualnosci : {
		caption : 'W aktualnościach przenieś posty do góry',
		state : 0,
		config : 0,
		defaultConfig : 1,
		condition : function(){
			return isAktualnosci;
		},
		on : function(){
			if (!optionMap.fixaktualnosci.savedAktualnosciOldHTML) {
				window.scroll(0,0);
				optionMap.fixaktualnosci.savedAktualnosciOldHTML = '<div style="margin-top:-13px">' + tdTekst[0].innerHTML + '</div>';
				var div = tdTekst.find('div:first');
				var donotwant1 = tdTekst.children('p:eq(1)');
				var donotwant2 = div.children(':lt(12)');
				div.find('span.ptytul:contains("ej czytane arty")').before(donotwant1).before(donotwant2);
				optionMap.fixaktualnosci.savedAktualnosciNewHTML = tdTekst[0].innerHTML || '';
				return;
			}
			tdTekst[0].innerHTML = optionMap.fixaktualnosci.savedAktualnosciNewHTML;
		},
		off : function(){
			tdTekst[0].innerHTML = optionMap.fixaktualnosci.savedAktualnosciOldHTML;
		}
	},

	markunread : {
		caption : 'Zaznaczaj nieprzeczytane posty, komentarze i artykuły w aktualnościach',
		state : 0,
		config : 0,
		defaultConfig : 1,
		condition : function(){
			return ;
		},
		on : function(){

			markUnread();
		},
		off : function(){
            //
            //

			markUnread();
		}

	}
};

function markUnread() {

}





$.each(configLabels, function(key, value){
	if (!value) {
		configLabels[key] = optionMap[key].caption;
	}
});

$.each(configMore, function(key, value){
	if (!value) {
		configMore[key] = optionMap[key].caption;
	}
});


//-------------------------------------------------------------------
// compatibility

if (!this.unsafeWindow) {
    this.unsafeWindow = window;
}

function count(obj) {
    if (typeof obj.__count__ === 'number') {
        return obj.__count__;
    }
    var cnt = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            cnt++;
        }
    }
    return cnt;
}

//-------------------------------------------------------------------
// szyfrowanie nicków


function rot13(str) {
    var code, result = '', i, len = str.length,
    table = arguments.callee.aLookupTable || (function(fun) { 
        var table = new Array(381);
        for (var i = 0; i < 65; i++) {
            table[i] = String.fromCharCode(i);
        }
        for (i = 65; i < 123; i++) {
            table[i] = 'NOPQRSTUVWXYZABCDEFGHIJKLM[\\]^_`nopqrstuvwxyzabcdefghijklm'.charAt(i-65);
        }
        for (i = 123; i < 381; i++) {
            table[i] = String.fromCharCode(i);
        }
        fun.aLookupTable = table;
        return table;
    }(arguments.callee));

    for (i = 0; i < len; i++) {
        code = str.charCodeAt(i);
        if (code < 381) {
            result += table[code];
        }
        else {
            result += str.charAt(i);
        }
    }
    return result;
}

var selektz = {
    getAuthors : function() {
        if (!selektz.authors) {
            var str = '', from = cudBase.authors;
            for (var i = 0, len = from.length; i < len; i++) {
                var entry = from[i];
                str += '<option value="';
                str += rot13(entry[0] +'">' + entry[1]);
                str += '</option>';
            }
            selektz.authors = str;
        }
        return selektz.authors;
    },

    getUsers : function() {
        if (!selektz.users) {
            var decoded = [];
            var str = '', from = cudBase.users;
            for (var i = 0, len = from.length; i < len; i++) {
                var entry = from[i];
                str += '<option value="';
                str += entry[0];
                str += '">';
                var nick = rot13(entry[1]);
                str += nick;
                str += '</option>';
                decoded.push([entry[0], nick]);
            }        
            selektz.users = str;
            cudBase.users_decoded = decoded;
        }
        return selektz.users;
    },

    getFirstUser : function() {
        if (!selektz.firstUser) {
            selektz.firstUser = '<option value="'+ cudBase.users[1][0] +'">' + rot13(cudBase.users[1][1]) + '</option>';
        }
        return selektz.firstUser;
    }
};

//-------------------------------------------------------------------
// expose Firebug console

if (unsafeWindow && unsafeWindow.console) {
	var console = unsafeWindow.console;
	var say = console.log;
	var GM_log = console.log;
	if (debugTotalTime) {
		unsafeWindow.console.time('STARTUP');
	}
}
else if (window.opera) {
	console = {
		log : function(msg) {
			setTimeout(function(){
				window.opera.postError(msg);
			}, 0);
		},
		time : function() {},
		timeEnd : function() {},
		profile : function() {},
		profileEnd : function() {},
		count : function() {},
		assert : function() {}
	};
	say = console.log;
	GM_log = console.log;
}
else {
	console = {
		log : function() {},
		time : function() {},
		timeEnd : function() {},
		profile : function() {},
		profileEnd : function() {},
		count : function() {},
		assert : function() {}
	};
	say = console.log;
	GM_log = console.log;
}

var timeStart, timeEnd, timeLog;

if (debugTime) {
	timeStart = function(id) {
		console.time(id);
	};
	timeEnd = function(id) {
		console.timeEnd(id);
	};
	timeLog = function(str) {
		console.log(str);
	};
}
else {
	timeStart = function(id) {};
	timeEnd = function(id) {};
	timeLog = function(str) {};
}

timeLog('=============================');
timeStart('setup - stage1');


var doc = document;
var win = $(window);


//-------------------------------------------------------------------
// gdzie jesteśmy?

var locUrl = doc.location.href;
var locName = '';
var locDir = '';

(function(){
	var match = locUrl.match(/cudownyportal.pl(?:\/(.+?))?\/(.+?)\.php/);
	if (match) {
		locDir = match[1] ? match[1] : '';
		locName = match[2] ? match[2] : '';
	}
}());

var isArticle, isAktualnosci, isThread, isComments, isSearch, isCommentAdding;

switch (locName) {
	case 'watek':
		isThread = true;
		break;
	case 'przeg_aktualnosci':
		isAktualnosci = true;
		break;
	case 'article':
		isArticle = true;
		break;
	case 'szukaj':
		isSearch = true;
		break;
	case 'comment_all':
		isComments = !!locUrl.match(/comment_all\.php.*?article_id/);
		if (isComments) {
			isCommentAdding = locUrl.indexOf('opt=add') !== -1;
		}
		break;
	default:
}

//-------------------------------------------------------------------
// tytuł strony

var pageTitle = (function(){
	var element;
	if (isThread) {
		element = xpath("//strong[@style]/text()").snapshotItem(1);
		return element ? element.textContent : '';
	}
	if (locName === 'comment_all') {
		element = xpath1("//a/span/strong/text()");
		return (element ? element.textContent + ' - ' : '')+'Komentarze';
	}
	if (locName === 'uzytkownicy') {
		return 'Użytkownicy';
	}
	if (locName === 'ustawienia') {
		return 'Ustawienia Twojego konta';
	}
	if (locName === 'zmien_haslo') {
		return 'Zmiana hasła';
	}
	if (locName === 'profil') {
		element = xpath1("//p/strong");
		return (element ? element.textContent + ' - ' : '')+'profil';
	}
	element = xpath1("//p[@class='black10']/text()");
	if (locName === 'announce_all') {
		return (element ? element.textContent + ' - ' : '')+'Ogłoszenia';
	}
	if (locName === 'article_all') {
		return (element ? element.textContent + ' - ' : '')+'Artykuły';
	}
	if (element ||
		((element = xpath1("//div[@class='black10']/text()"))) ||
		((element = xpath1("//span[@class='black10']/text()")))) {
		return element.textContent;
	}
	return doc.title.replace(/[:\s]*?CUDowny Portal[^h]+ha/, '');
}());

var oldTitle = doc.title;
var newTitle = pageTitle ? 'CUD - '+pageTitle : 'CUD';


//-------------------------------------------------------------------
// window resize

var windowWidth = win.width();
var windowHeight = win.height();
var winResizeFuns = [];

function onWindowResize(fun) {
	if (typeof fun === 'function') {
		winResizeFuns.push(fun);
	}
}

win.resize(function() {
	windowWidth = win.width();
	windowHeight = win.height();
	for (var i = 0, len = winResizeFuns.length; i < len; i++) {
		winResizeFuns[i]();
	}
});


//-------------------------------------------------------------------
// config load & save

function loadConfig() {
	return $.trim(GM_getValue('options', ''));
}

function parseConfig(json) {
	var loaded, config = {};
	$.extend(true, config, defaultConfig);
	if (json !== '') {
		try {
			loaded = JSON.parse(json);
		}
		catch(e) {
			loaded = {};
		}
		$.extend(true, config.options, loaded.options || {});
		$.extend(true, config.state, loaded.state || {});
		config.links = $.isArray(loaded.links) ? loaded.links : [];
		config.blacklist = $.isArray(loaded.blacklist) ? loaded.blacklist : [];
	}
	return config;
}

var lastSavedConfigJson = loadConfig();
var config = parseConfig(lastSavedConfigJson);

function saveConfig(conf) {
	var json = JSON.stringify(conf || config);
	if (lastSavedConfigJson !== json) {
		lastSavedConfigJson = json;
        if (!isFirefox) {
            GM_setValue('options', json);
        }
        else {
            setTimeout(function(){
                GM_setValue('options', json);
            }, 0);
        }
		return true;	// true = config was different, saved
	}
	return false;	// false = no changes
}

//-------------------------------------------------------------------
// history load & save

var history;

function loadHistory() {
    history = JSON.parse(GM_getValue('e37history', '{ posts:[], comments:[], articles:[] }'));
}

function saveHistory() {
    GM_setValue('e37history', JSON.stringify(history));
}

//-------------------------------------------------------------------
// poprawiamy tytuł strony

if (config.options.fixtitle) {
	doc.title = newTitle;
	optionMap.fixtitle.state = 1;
}


//-------------------------------------------------------------------

function xpath(expression, root) {
	return doc.evaluate(expression, root || doc, null, 7, null);
}
function xpath1(expression, root) {
	return doc.evaluate(expression, root || doc, null, 9, null).singleNodeValue;
}

var table1 = $(xpath1("/html/body/table[1]"));
var table2 = $(xpath1("/html/body/table[2]"));
var homeLink = $(xpath1("/html/body/table[1]/tbody[1]/tr[2]/td[1]/a[1]"));
var tdTekst = $(xpath1("//td[@class='tekst']"));
var tdEdytor;
var appendRow;
var table1bis;

//-------------------------------------------------------------------
// commands to execute on next page reload

var savedCommands;

function loadCommands() {
	var commands;
    savedCommands = GM_getValue('commands', '{}');
	try {
		commands = JSON.parse(savedCommands);
    }
	catch(e) {
		commands = {};
	}
	var filteredCommands = {};
	var time = (new Date()).getTime();
	$.each(commands, function(key, cmd){
		var timeout = cmd[1];
		if (timeout === 0 || time < timeout) {
			filteredCommands[key] = cmd[0];
		}
	});
	return filteredCommands;
		}

function saveValue(key, value, useTimeout) {
	if (useTimeout) {
		setTimeout(function(){
			GM_setValue(key, value);
		}, 0);
	}
	else {
		GM_setValue(key, value);
	}
}

function clearCommands(unsafe) {
    if (savedCommands !== '{}') {
    	saveValue('commands', '{}', unsafe);
        savedCommands = '{}';
    }
}

var commandQueue = {};

function saveCommands(unsafe) {
    var serialized = JSON.stringify(commandQueue) || '{}';
    if (serialized !== savedCommands) {
    	saveValue('commands', serialized, unsafe);
        savedCommands = serialized;
    }
}

function setCommand(command, value, timeout) {
	if (timeout !== undefined) {
		var date = new Date();
		timeout += date.getTime();
	}
	commandQueue[command] = [value, timeout || 0];
}

win.unload(function() {
	saveCommands();
	commandQueue = {};
});


//-------------------------------------------------------------------
// css

var systemScrollbarWidth = getScrollerWidth();	// 15-23 ms
var mediaImageWidth;

(function() {
	var	style = 'html > body > table > tbody > tr > td:nth-child(2) > table { width: 152px; padding-bottom: 20px; }';
	if (!config.state.oldmenu) {
		style += 'html > body > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > div.panel { display: none; }';
	}

	if (config.options.obliteration) {
		style += 'table.plonk { display:none; } table.plonk+br { display:none }';
		optionMap.obliteration.state = 1;
	}

	if (config.options.underlinelinks) {
		style += 'a:hover { text-decoration: underline !important }';
		optionMap.underlinelinks.state = 1;
	}

	if (config.options.hideads) {
		style += 'div.ad-box { display:none; }';
		optionMap.hideads.state = 1;
	}

	mediaImageWidth = config.options.maxpagewidth - 197;
	if (mediaImageWidth < 573) {
		mediaImageWidth = 573;
	}
	style += 'div.media img { max-width: '+ mediaImageWidth +'px}';

	style += staticCSS;

	style += 'div.fixer:hover { width:'+(systemScrollbarWidth + 153)+'px; overflow-y:auto; }';

	GM_addStyle(style);
	return;
}());

if (typeof Object.getPrototypeOf !== 'function') {   // ff < 3.5 compatibility
	$('table:eq(1)').find('td:eq(1)').find('table:first').css({width:'152px'});
}

timeEnd('setup - stage1');


//-------------------------------------------------------------------
// otwierane grupy w sidebarze

var updatableGroups = {};

function expandableGroupChange(groupid, state) {
	$.each(updatableGroups, function(key, value) {
		config.state[key] = value.expanded();
		saveConfig();
	});
}

function createExpandableGroup(parent, caption, expanded, callback, animation, groupid, creator) {

	if (!parent) {
		return null;
	}
	timeStart('createExpandableGroup '+groupid);
	var egDiv = $('<div style="padding:5px 5px 4px 7px;'+(expanded?'':'display:none;')+'"></div>');
	var created;

	function show(noAnimation) {
		expanded = true;		// objects are poor man's closures
		setTimeout(function(){
			if (!created && typeof creator === 'function') {	// lazy creation - on show
				timeStart('create '+groupid);
				creator(egDiv);
				timeEnd('create '+groupid);
				created = true;
			}
			capt.addClass('expanded');
			if (!animation || noAnimation) {
				egDiv.show();
			}
			else {
				egDiv.slideDown('fast');
			}
			if (groupid) {
				expandableGroupChange(groupid, 1);
			}
		}, 3);
	}

	function hide(noAnimation) {
		expanded = false;		// closures are poor man's objects
		setTimeout(function(){
			capt.removeClass('expanded');
			if (!animation || noAnimation) {
				egDiv.hide();
			}
			else {
				egDiv.slideUp('fast');
			}
			if (groupid) {
				expandableGroupChange(groupid, 0);
			}
		}, 3);
	}

	function setState(state, noAnimation) {
		if (state) {
			show(noAnimation);
		}
		else {
			hide(noAnimation);
		}
	}

	var capt = $('<a href="javascript:;" class="exheader"></a>').click(function(){	// 1ms
		if (!callback || callback(!expanded, egDiv, capt) !== false) {
			setState(!expanded);
		}
		return false;
	}).text(caption).mouseout(function(){
		this.blur();
	});


	if (expanded) {
		capt.addClass('expanded');
		if (typeof creator === 'function') {
			created = true;
			timeStart('creator '+groupid);
			creator(egDiv);
			timeEnd('creator '+groupid);
		}
	}

	parent.append(capt).append(egDiv);	// 1ms

	var result = {
		caption : capt,
		holder : egDiv,
		expanded : function(state, noAnimation){	// getter/setter
			if (state !== undefined) {
				setState(state, noAnimation);
			}
			return expanded;
		}
	};
	if (groupid) {
		updatableGroups[groupid] = result;
	}


	timeEnd('createExpandableGroup '+groupid);
	return result;
}


//-------------------------------------------------------------------
// przechwycenie linku do góry strony, coby sidebar nie skakał

var topLink = $(xpath1(".//p[last()]/a[@href='#top']", tdTekst[0]));
topLink.click(function(){
	windowScroll(0);
	return false;
});


function scrollToContentBottom() {
	if (topLink[0]) {
		var offset = topLink.offset().top + 25 - windowHeight;
		if (offset > win.scrollTop()) {
			windowScroll(offset);
		}
	}
	else {
		windowScroll(1000000);
	}
}


//-------------------------------------------------------------------
// dodanie linku na dół strony w wątku

timeStart('linki na dol');

function dodajLinkNaDol(parent, top) {
	if (top === undefined) {
		top = 1;
	}
	$(parent).css({
		position:'relative'
	}).prepend($('<a href="javascript:;" class="gray7"'+
		' style="display:block;position:absolute;right:0;top:'+(top*1)+
			'px">na dół</a>').click(function() {
		scrollToContentBottom();
		return false;
	}));
}

var threadTitleP;

(function(){
	if (isThread) {
		dodajLinkNaDol(threadTitleP = xpath1("//strong[@style]/parent::p"));
	}
	else  {
		var pBlack = xpath1("//p[@class='black10']");
		if (pBlack) {
			dodajLinkNaDol(pBlack);
		}
		else {
			if (xpath("p[@class='orange8']", tdTekst[0]).snapshotLength === 0) {
				dodajLinkNaDol($('<div style="height:0px"></div>').prependTo(tdTekst), -20);
			}
		}
	}
}());


timeEnd('linki na dol');


//-------------------------------------------------------------------
// akceptacja regulaminu

(function() {
	if (isCommentAdding) {
		var checkbox = xpath1("//input[@type='checkbox'][@name='accept']");
		if (checkbox) {
			checkbox.checked = true;
		}
	}
}());


//-------------------------------------------------------------------
// szerokość strony dla Chrome

var tableWidthChrome;

function fixChromeWidth() {
	if (!isWebkit) {
		return;
	}
	var tableWidth = Math.floor(windowWidth * 0.9);
	if (tableWidth > config.options.maxpagewidth) {
		tableWidth = config.options.maxpagewidth;
	}
	if (tableWidth < 770) {
		tableWidth = 770;
	}
	if (tableWidthChrome !== tableWidth) {
		tableWidthChrome = tableWidth;
		table1.add(table2).add(table1bis).css('width', tableWidth+'px');
	}
}


//-------------------------------------------------------------------
// minimalna wysokość strony

var tdTextCSSHeight;

function fixPageHeight() {
	timeStart('fixPageHeight');

	var targetHeight = windowHeight - 99; // tableFirst.height();
	if (tdTextCSSHeight !== targetHeight) {
		tdTextCSSHeight = targetHeight;
		tdTekst.css('height', targetHeight+'px');
		if (tdEdytor) {
			tdEdytor.css('height', targetHeight+'px');
		}
	}

	if (isWebkit) {
		fixChromeWidth();
	}
	timeEnd('fixPageHeight');
}

onWindowResize(function(){
	fixPageHeight();
});


//-------------------------------------------------------------------
// brzegi strony linkami do kolejnych stron

var pageable;
var navLeft;
var navRight;
var navWidth;

var	fixNavWidth = function() {
	if (pageable) {
		var usedWidth = windowWidth * 0.9;
		if (usedWidth > config.options.maxpagewidth) {
			usedWidth = config.options.maxpagewidth;
		}
		if (usedWidth < 770) {
			usedWidth = 770;
		}
		var targetWidth = Math.floor((windowWidth - usedWidth)/2) - 48;
		if (targetWidth < 0) {
			targetWidth = 0;
		}
		if (navWidth !== targetWidth) {
			navWidth = targetWidth;
			if (navLeft) {
				navLeft.find('div').css('width', targetWidth+'px');
			}
			if (navRight) {
				navRight.find('div').css('width', targetWidth+'px');
			}
		}
	}
};

function addNavigators() {

	timeStart('navigators');

	function createNavigator(parent, bleft, page, url, scrolldown) {
		var div = doc.createElement('div');

		div.innerHTML =
			'<table class="'+(bleft?'l':'r')+'navigator" cellpadding="0" cellspacing="0" border="0">'+
				'<tbody>'+
					'<tr>'+
						'<td'+(bleft?'>':' rowspan="3"><div class="navd"></div>')+'</td>'+
						'<td'+(bleft?' rowspan="3"><div class="navd"></div>':'>')+'</td>'+
					'</tr>'+
					'<tr height="80%">'+
						'<td class="nicon">'+
							'<span class="nvarrow">&'+(bleft?'l':'g')+'t;</span><br>'+
							(page || '')+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<td></td>'+
					'</tr>'+
				'</tbody>'+
			'</table>';
		var navigator = $(div.firstChild);

		if (typeof url === 'string') {
            var nicon = navigator.find('.nicon:first');
            nicon.click(function(){
				if (scrolldown) {
					setCommand('scrolldown', 1, 10000);
				}
				doc.location.href = url;
				return false;
			});
            if (typeof GM_openInTab === 'function') {
                nicon.mousedown(function(event){
                    if (event.which === 2) {
                        GM_openInTab(url);
                        return false;
                    }
                }).mouseup(function(event){
                    if (event.which === 2) {
                        return false;
                    }
                });
            }
		}
		if (parent) {
			$(parent).append(navigator);
		}
		return navigator;
	}

	var linkLeft = xpath1("//a[text()='«']");
	var linkRight = xpath1("//a[text()='»']");
	pageable = !!(linkLeft || linkRight);

	if (pageable) {
		if (linkLeft) {
			navLeft = createNavigator(table2.parent(), true, parseInt(linkLeft.title.substr(2), 10), linkLeft.href, true);
		}
		if (linkRight) {
			navRight = createNavigator(table2.parent(), false, parseInt(linkRight.title.split(' ')[0], 10), linkRight.href);
		}
		onWindowResize(function(){
			fixNavWidth();
		});
		fixNavWidth();
	}
	timeEnd('navigators');
}



//-------------------------------------------------------------------
// zebranie informacji o postach (lub komentarzach)

timeStart('gathering');
var posts;
var xInnerLinks;

if (isThread || isComments || isSearch) {
	(function(){
		var doc = document;
		var pathStart = isThread ? './/table/tbody[1]/' : './/table[@cellpadding=\'2\']/tbody[1]/';
		var root = isThread ? doc.getElementById('posts') : tdTekst[0];
		if (!root) {
			return;
		}

		function xpath3(expression) {
			return doc.evaluate(expression, root, null, 7, null);
		}
		function xpath2(expression) {
			return doc.evaluate(pathStart+expression, root, null, 7, null);
		}
		var xnick = xpath2('tr[1]/td[1]/div[1]/a[1]/text()');
		if (xnick.snapshotLength === 0) {
			return;
		}
		var xhdiv = xpath2('tr[1]/td[1]/div[1]');
		var xuserlink = xpath2('tr[1]/td[1]/div[1]/a[1]');
		var xhrefs = xpath2('tr[1]/td[1]/div[1]/a[1]/@href');
		var xhashdiv = xpath2('tr[1]/td[1]/div[2]');
		var xhash = xpath2('tr[1]/td[1]/div[2]/a[1]');
		var xhashtext = xpath2('tr[1]/td[1]/div[2]/a[1]/text()');
		var xcontent = xpath2('tr[2]/td[1]');
		var xpostids = xpath3('.//a[@name]/@name');
		var xtables = xpath3(".//table[@cellpadding='2']");
		xInnerLinks = {
			as : xpath2('tr[2]/td[1]/a[@href]'),
			hrefs : xpath2('tr[2]/td[1]/a[@href]/@href'),
			texts : xpath2('tr[2]/td[1]/a[@href]/text()')
		};
		posts = [];

		for (var i = 0, length = xnick.snapshotLength; i < length; i++) {
			posts.push({
				userID : parseInt(xhrefs.snapshotItem(i).textContent.split('=')[1], 10),
				nick : xnick.snapshotItem(i).textContent,
				hdiv : $(xhdiv.snapshotItem(i)),
				hashdiv : xhashdiv.snapshotItem(i),
				hash : $(xhash.snapshotItem(i)),
				hashtext : xhashtext.snapshotItem(i),
				userlink : $(xuserlink.snapshotItem(i)),
				postid : xpostids.snapshotItem(i).textContent,
				content : $(xcontent.snapshotItem(i)),
				table : $(xtables.snapshotItem(i)),
				outlined : false,
				blacklisted : false,
				hidden : false
			});
		}
	}());
}
timeEnd('gathering');

//-------------------------------------------------------------------
// poprawienie skróconych linków (z wielokropkiem), żeby można je kopiować nieuszkodzone razem z treścią postów

(function(){
	if (!posts) {
		return;
	}
	timeStart('wielokropki');

	for (var i = 0, len = xInnerLinks.as.snapshotLength; i < len; i++) {

		var text = xInnerLinks.texts.snapshotItem(i).textContent;		//   http://blah&link/slo...
		var href = xInnerLinks.hrefs.snapshotItem(i).textContent;		//   http://blah&link/slowo/cos.html

		if (text.length !== href.length) {
			var match = text.match(/^(.*?)\.\.\.$/);
			if (match) {
				var link = xInnerLinks.as.snapshotItem(i);
				var resztaLinku = href.slice(match[1].length);
				link.innerHTML = linkEncje(match[1])+
					'<span class="skroconylink1">'+ linkEncje(resztaLinku) +' </span>'+
					'<span class="skroconylink2"></span>';
			}
		}
	}
	timeEnd('wielokropki');
}());


//-------------------------------------------------------------------
// osadzenie grafiki i video

var mediaUndo;		// do wyłączenia

function removeMedia() {
	if (!mediaUndo || mediaUndo.length === 0) {
		return;
	}
	for (var i = 0, len = mediaUndo.length; i < len; i++) {
		var entry = mediaUndo[i];
		var parent = entry.div.parentNode;
		parent.insertBefore(entry.link, entry.div);
		parent.removeChild(entry.div);
		entry.div = undefined;
	}
	mediaUndo = null;
}

function embedMedia() {
	mediaUndo = [];
	if (!xInnerLinks.as) {
		return;
	}
	if (isOpera) {
		var scriptCode = '(function(){';
		var flashCount = 0;
	}
	for (var i = 0, len = xInnerLinks.as.snapshotLength; i < len; i++) {

		var link = xInnerLinks.as.snapshotItem(i);
		var href = xInnerLinks.hrefs.snapshotItem(i).textContent;	
		var isFlash = false;
		var mediaCode = (function(){
			var mMatch;

			function flashCode(src, width, height, extraParams) {
				isFlash = true;
				var embed = '<embed src="'+ src.replace('"', '\\"') +'"' +
						' type="application/x-shockwave-flash"' +
						' wmode="transparent"' +
						' quality="high"'+
						' bgcolor="#fffff2"'+
						' allowscriptaccess="always"' +
						' allowfullscreen="true"'+
						' width="'+ (width || 480) +'"' +
						' height="'+ (height|| 385) +'"'+
						(extraParams || '') +'>' +
					'</embed>';
				if (isOpera) {
					scriptCode += "document.getElementById('embed"+i+"').innerHTML = '"+ embed + "';";
					flashCount++;
				}
				return embed;
			}

			function service(name, regex) {
				if (href.indexOf(name) === -1) {
					return false;
				}
				return href.match(regex);
			}

			if ((mMatch = href.match(/^http:\/\/(?:www\.)?(?:[^\.]+?\.)?([^\.]+\.[^\/]+?)\/.+?\.(?:jpe?g|png|gif)$/i))) {
				return defaults.allowedImageHosts[mMatch[1]] ? '<img src="'+ linkEncje(href) +'" alt="">' : false;
			}
			if ((mMatch = service('youtube', /^http:\/\/(?:[^\/]+\.)?youtube\.com\/(?:watch\?.*?v=([^&]+)|v\/([^&\s]+))/))) {
				return flashCode('http://www.youtube.com/v/'+ (mMatch[1] || mMatch[2]) +'&amp;fs=1');
			}
			if ((mMatch = service('youtu.be', /^http:\/\/youtu\.be\/([^&?]+)/))) {
				return flashCode('http://www.youtube.com/v/'+ (mMatch[1]) +'&amp;fs=1');
			}
			if ((mMatch = service('video.google', /^http:\/\/[^\/]*?video.google.[^\/]+\/videoplay\?docid=(-?\d+)/))) {
				return flashCode('http://video.google.pl/googleplayer.swf?docid=' + mMatch[1]);
			}
			if ((mMatch = service('wrzuta', /^http:\/\/([^.]+)?\.wrzuta\.pl\/(audio|film)\/([^\/]+)/))) {
				var film = mMatch[2] === 'film';
				return flashCode('http://www.wrzuta.pl/'+ (film ? 'video':'audio') +'.swf?key='+ mMatch[3] +
					'&amp;host=wrzuta.pl&amp;site=www.cudownyportal.pl&amp;embeded=true&amp;lang=pl', 0,
					film? 0 : 70, ' scale="noScale"');
			}
			if ((mMatch = service('liveleak', /^http:\/\/(?:www\.)?liveleak\.com\/(?:view\?i=([^&]+)|e\/([^&]+))/))) {
				return flashCode('http://www.liveleak.com/e/'+ (mMatch[1] || mMatch[2]));
			}
			if ((mMatch = service('dailymotion', /^http:\/\/(?:[^\/]+)?dailymotion\..*?\/video\/(x[^_&/]+)/))) {
				return flashCode('http://www.dailymotion.pl/swf/video/'+ mMatch[1]);
			}
			if ((mMatch = service('vimeo', /^http:\/\/vimeo.com\/(\d+)/))) {
				return flashCode('http://vimeo.com/moogaloop.swf?clip_id=' + mMatch[1] +
					'&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0' +
					'&amp;show_portrait=0&amp;color=ffd800&amp;fullscreen=1');
			}
			if ((mMatch = service('scaryideas', /^http:\/\/(?:www\.)?scaryideas\.com.*?\/(\d+)\//))) {
				return '<img src="http://images.scaryideas.com/'+ mMatch[1] +'.jpg">';
			}
			if ((mMatch = service('video.interia', /^http:\/\/(?:www\.)?video.interia.pl\/obejrzyj,film,(\d+)/))) {
				return flashCode('http://video.interia.pl/i/players/iVideoPlayer.12.swf', 0, 0,
					' flashVars="vid=' +  mMatch[1] + '&amp;maxButton=0&amp;emb=1"');
			}
			if ((mMatch = service('youclubvideo', /^http:\/\/(?:[^\/]+\.)?youclubvideo\.com\/[^\d]*(\d+)/))) {
				return flashCode('http://www.youclubvideo.com/req/swf/player.swf', 0, 0,
					' flashVars="config=http://www.youclubvideo.com/embedCfg.js?mid=' +  mMatch[1] + '"');
			}
			if ((mMatch = service('.mp3', /^http:\/\/.+?\.mp3$/))) {
				return flashCode('http://img404.imageshack.us/img404/7740/audiouq4.swf?audioUrl=' + escape(mMatch[0]), 0, 27);
			}

			return false;
		}());

		if (mediaCode) {
			var divOuter = doc.createElement('div');
			var divMedia = doc.createElement('span');
			var divLink = doc.createElement('span');
			divMedia.className = 'block';
			divLink.className = 'medialink';
			divOuter.className = 'media';
			if (isOpera && isFlash) {
				divMedia.setAttribute('id', 'embed'+i);
			}
			else {
				divMedia.innerHTML = mediaCode;
			}
			link.parentNode.insertBefore(divOuter, link);
			divLink.appendChild(link);
			divOuter.appendChild(divMedia);
			divOuter.appendChild(divLink);

			mediaUndo.push({
				link : link,
				div : divOuter
			});
		}
	}
	if (isOpera && flashCount > 0) {
		scriptCode += '}());';
		var scriptElement = doc.createElement('script');
		scriptElement.setAttribute('src', 'data:text/javascript,'+escape(scriptCode));
		doc.getElementsByTagName('head')[0].appendChild(scriptElement);
	}
}

//-------------------------------------------------------------------
// modyfikacje postów

function makeWrapperLink(nick, id) {
	return '<a href="/forum/profil.php?id='+id+'">'+nick+'</a>'+
		'<span class="popmenu">'+
			'<a href="/forum/szukaj.php?uid='+id+'&s=1" class="linkdopostow"></a>'+
			'<a href="/szukaj.php?where=comm&uid='+id+'&s=1" class="linkdokomentarzy"></a>'+
		'</span>';
}


if (posts) {
	(function(){
		timeStart('linki do postow');    // 14 ms
		for (var i = 0, len = posts.length; i < len; i++) {
			var entry = posts[i];

			// modyfikacja symbolu # - żeby nie można go zaznaczać i kopiować
			entry.hash[0].className = 'hash';
			entry.hash[0].removeChild(entry.hashtext);

			// dodanie linków do postów i komentarzy
			var span = doc.createElement('span');
			span.className = 'awrapper';
			span.innerHTML = makeWrapperLink(entry.nick, entry.userID);
			entry.hdiv[0].replaceChild(span, entry.userlink[0]);
		}
		timeEnd('linki do postow');

	}());
}


//-------------------------------------------------------------------
// zaaplikowanie blacklisty

function isBlacklisted(userID) {
	for (var i = 0, len = config.blacklist.length; i < len; i++) {
		if (userID === config.blacklist[i][0]) {
			return true;
		}
	}
	return false;
}

function removeFromBlacklist(userID, apply) {
	if (isBlacklisted(userID)) {
		var newList = [];
		for (var i = 0, len = config.blacklist.length; i < len; i++) {
			if (userID !== config.blacklist[i][0]) {
				newList.push(config.blacklist[i]);
			}
		}
		config.blacklist = newList;
		saveConfig();
		if (apply && config.options.blacklistenabled) {
			setTimeout(function(){
				applyBlacklist();
			}, 1);
		}
	}
}

function addToBlacklist(userID, userNick, apply) {
	if (!isBlacklisted(userID)) {
		config.blacklist.push([userID, userNick || '']);
		saveConfig();
		if (apply && config.options.blacklistenabled) {
			setTimeout(function(){
				applyBlacklist();
			}, 1);
		}
	}
}

var isBlacklistApplied;

function applyBlacklist(doNotIfAlreadyApplied, noPageHeightFix) {
	if (!posts) {
		return;
	}

	if (doNotIfAlreadyApplied && isBlacklistApplied) {
		return;
	}
	isBlacklistApplied = true;
	$.each(posts, function(index, entry){
		if (isBlacklisted(entry.userID)) {
			if (entry.blacklisted) {
				return;
			}
			entry.blacklisted = true;
			entry.content[0].className = 'filtrowane';
			entry.table[0].className = 'plonk';
			entry.hidden = true;
			print(entry.hdiv, ' ');

			entry.showlink = $('<a class="showlink" title="Pokaż" href="javascript:;"></a>').click(function(index) {
				return function(){
					var post = posts[index];
					post.hidden = false;
					post.showlink.hide();
					post.hidelink.show();
					post.content.removeClass('filtrowane');
					post.table.removeClass('plonk');
					return false;
				};
			}(index));//.appendTo(entry.hdiv);

			entry.hidelink = $('<a class="hidelink" style="display:none" href="javascript:;"></a>').click(function(index) {
				return function(){
					var post = posts[index];
					post.showlink.show();
					post.hidelink.hide();
					post.content.addClass('filtrowane');
					post.table.addClass('plonk');
					post.hidden = true;
					return false;
				};
			}(index));//.appendTo(entry.hdiv);

			entry.hdiv[0].appendChild(entry.showlink[0]);
			entry.hdiv[0].appendChild(entry.hidelink[0]);

			entry.blacklistCancellationLink = $('<a href="javascript:;" class="blacklistcancellationlink"'+
				' title="Przestań ukrywać posty tego użytkownika"></a>').click((function(index) {
				return function(){
					var post = posts[index];
					removeFromBlacklist(post.userID, true);
					return false;
				};
			}(index)));//.insertBefore(entry.hash);

			entry.hashdiv.insertBefore(entry.blacklistCancellationLink[0], entry.hash[0]);

			if (entry.blacklistLink) {
				entry.blacklistLink.remove();
				entry.blacklistLink = null;
			}
		}
		else {	// undo
			if (entry.blacklisted) {
				entry.hidelink.remove();
				entry.hidelink = null;
				entry.showlink.remove();
				entry.showlink = null;
				entry.blacklistCancellationLink.remove();
				entry.blacklistCancellationLink = null;
				if (entry.hidden) {
					entry.content.removeClass('filtrowane');
					entry.table.removeClass('plonk');
					entry.hidden = false;
				}
				entry.blacklisted = false;
			}
			if (!entry.blacklistLink) {
				entry.blacklistLink = $('<a href="javascript:;" class="blacklistlink"'+
					' title="Ukrywaj posty tego użytkownika"></a>').click((function(index) {
					return function(){
						var post = posts[index];
						addToBlacklist(post.userID, post.nick, true);
						return false;
					};
				}(index)));//.insertBefore(entry.hash);

				entry.hashdiv.insertBefore(entry.blacklistLink[0], entry.hash[0]);
			}
		}
	});

	if (!noPageHeightFix) {
		fixPageHeight();
	}
}

function unapplyBlacklist(doNotIfNotApplied) {	// remove everything blacklist-related from posts
	if (doNotIfNotApplied && !isBlacklistApplied) {
		return;
	}
	isBlacklistApplied = false;
	if (!posts) {
		return;
	}
	$.each(posts, function(index, info){
		function clearProperty(prop) {
			if (info[prop]) {
				info[prop].remove();
				info[prop] = null;
			}
		}
		clearProperty('hidelink');
		clearProperty('showlink');
		clearProperty('blacklistLink');
		clearProperty('blacklistCancellationLink');
		if (info.hidden) {
			info.content.removeClass('filtrowane');
			info.table.removeClass('plonk');
			info.hidden = false;
		}
		info.blacklisted = false;
	});
	fixPageHeight();
}



//-------------------------------------------------------------------
// uczestnicy wątku


(function(){
	timeStart('pdiv');

	if (!threadTitleP) {
		return;
	}

	var osoby = {};

	function makePersonsDivHTML() {
		if (!posts) {
			return undefined;
		}
		var count = 0;
		for (var i = 0, len = posts.length; i < len; i++) {
			var post = posts[i];
			var uid = 'u'+post.userID;
			if (osoby[uid]) {
				osoby[uid].count++;
			}
			else {
				osoby[uid] = {
					nick : post.nick,
					postid : post.postid,
					count : 1
				};
				count++;
			}
		}
		if (count < 2) {
			return undefined;
		}
		var html = '';
		var cnt2 = 0;
		for (var id in osoby) {
			if (osoby.hasOwnProperty(id)) {
				var os = osoby[id];
				html += '<span class="nowrap"><a href="#">'+os.nick+'</a>';
				if (os.count > 1) {
					html += ' <span class="pcount"><span class="nawias">(</span>'+os.count+
						'<span class="nawias">)</span></span>';
				}
				cnt2++;
				if (cnt2 !== count) {
					html += ',';
				}
				html += '</span>';
				if (cnt2 !== count) {
					html += ' ';
				}
			}
		}
		return '<div class="uczestnicy"><div class="hdr"<span>Osoby obecne na tej stronie</span>'+
			' <a class="gray7" href="#">zamknij</a><div></div></div>'+
			'<div class="cnt">'+html+'</div></div>';
	}

	function makePersonsDiv() {
		var html = makePersonsDivHTML();
		if (!html) {
			return null;
		}
		if (!threadTitleP) {
			return null;
		}
		var div = $(html);
		div.click(function(evt){
			if (evt.target.href) {
				var link = $(evt.target);
				var text = link.text();
				if (text === 'zamknij') {
					for (var i = 0, len = posts.length; i < len; i++) {
						if (posts[i].outlined) {
							if (isWebkit) {
								$(posts[i].table).css('border', 'none');
							}
							else {
								$(posts[i].table).css('outline', 'none');
							}
							posts[i].outlined = false;
							posts[i].hdiv.find('div.pcounter').remove();
						}
					}
					config.options.showpersons = 0;
					saveConfig();
					showPersons(false);
					return false;
				}
				var lastPost;
				var osoba;
				for (var uid in osoby) {
					if (osoby.hasOwnProperty(uid)) {
						if (text === osoby[uid].nick) {
							osoba = osoby[uid];
							break;
						}
					}
				}
				var counter = osoba.count;
				for (var j = 0, leng = posts.length; j < leng; j++) {
					if (posts[j].nick === text) {
						if (!posts[j].outlined) {
							var pjtcss = {};
							if (!isWebkit) {
								pjtcss = {
									'outline':'2px solid #8af',
									'-moz-outline-radius':'4px',
									'outline-radius':'4px'		// w Chrome nie działa
								};
							}
							else {
								pjtcss = {
									'border':'2px solid #8af',
									'-webkit-border-radius':'4px',
									'border-radius':'4px'
								};
							}
							$(posts[j].table).css(pjtcss);
							posts[j].outlined = true;
							var indicator = $('<div class="pcounter">'+counter+' / '+osoba.count+'</div>');
							posts[j].hdiv.css('position', 'relative').prepend(indicator);
							counter--;
						}
						lastPost = posts[j];
					}
					else {
						if (posts[j].outlined) {
							posts[j].hdiv.find('div.pcounter').remove();
							if (isWebkit) {
								$(posts[j].table).css('border', 'none');
							}
							else {
								$(posts[j].table).css('outline', 'none');
							}
							posts[j].outlined = false;
						}
					}
				}
				var table = $(lastPost.table);
				var ofs = Math.floor((windowHeight - table.height()) / 2);
				if (ofs < 2) {
					ofs = 2;
				}
				windowScroll((table.offset().top - ofs));
			}
			return false;
		});
		return div;
	}

	var div;
	var personsA = $('<a href="javascript:;" class="orange7"'+
		' style="display:block;position:absolute;right:0;top:26px">osoby</a>').click(function(){
			config.options.showpersons = 1;
			saveConfig();
			showPersons(true);
			return false;
		});
	$(threadTitleP).append(personsA);
	var personsVisible;

	function showPersons(show, noAnimation) {
		if (show && !personsVisible) {
			if (!div) {
				div = makePersonsDiv();
				if (div) {
					if (noAnimation) {
						div.appendTo($(threadTitleP));
						personsA.hide();
					}
					else {
						div.hide().appendTo($(threadTitleP)).slideDown('fast');
						personsA.hide('fast');
					}
				}
			}
			else {
				div.slideDown('fast');
				personsA.hide('fast');
			}
			personsVisible = true;
		}
		else if (!show && personsVisible) {
			div.slideUp('fast');
			personsA.show('fast');
			personsVisible = false;
		}
	}

	showPersons(config.options.showpersons, true);
	
	timeEnd('pdiv');
}());


//-------------------------------------------------------------------
// login form rounded corners (well, it's useless)

$(xpath1("./tbody/tr/td[5]/div[1]", table2[0])).addClass('radius3');


//-------------------------------------------------------------------
// nowe menu

var oldMenu = $('div.panel:first');
if (!oldMenu[0]) {
	return; 
}

var menu = $('<div style="width:146px; padding:0 3px; background:#fffff2;"></div>');

//-------------------------------------------------------------------
// wyszukiwarka

timeStart('wyszukiwarka - 1st run');

var selcss = {
	width: '130px',
	'font-size': '11px',
	'font-family':'tahoma,arial,verdana,helvetica,sans-serif'
};

(function() {
	var searchOptionsVisible;
	var seldiv;
	var authorSelect;
	var userSelect;
	var authorSelectReplaced;
	var userSelectReplaced;

	var form = $('<form method="get" style="display:block; margin:0; padding:0"></form>');

	var optDiv;

	var showFormOptions = function() {
		if (searchOptionsVisible) {
			return;
		}
		searchOptionsVisible = true;

		if (optDiv) {
			optDiv.show();
			return;
		}

		optDiv = $('<div style="padding:0 6px 5px; position:relative"></div>');
		var optForum = createInput(optDiv, 'radio', 'f5', '', 'na forum', function(){
			userSelect.show();
			authorSelect.hide();
		}, true);
		var optArt = createInput(optDiv, 'radio', 'f5', '', 'w artykułach', function(){
			authorSelect.show();
			userSelect.hide();
		});
		var optKom = createInput(optDiv, 'radio', 'f5', '', 'w komentarzach', function(){
			userSelect.show();
			authorSelect.hide();
		});

		var tit = createInput(optDiv, 'checkbox', 'opt', 'tit', 'tylko w tytułach');
		createInput(optDiv, 'checkbox', 'ww', '1', 'całe wyrazy');

		seldiv = $('<div style="margin:4px 0 5px; text-align:center;"></div>').appendTo(optDiv);

		authorSelect = $('<select class="formatka" name="aid" disabled="disabled" style="display:none">'+
			'<option value="0">[dowolnego autora]</option>'+
			'</select>').css(selcss).appendTo(seldiv);

		function replaceUserSelect() {
			if (userSelectReplaced) {
				return;
			}
			userSelectReplaced = true;
			userSelect.find('option:first').text('wczytuję listę...');
			userSelect[0].disabled = true;
			setTimeout(function(){
				var newUserSelect = createSelectFromHTML(seldiv, selektz.getUsers(),
					selcss, 'uid', 'formatka', '[dowolnego autora]');
				userSelect.replaceWith(newUserSelect);
				userSelect = newUserSelect;
			}, 40);
		}
		userSelect = $('<select class="formatka" name="uid"><option value="0">'+
			'[dowolnego autora]</option></select>').css(selcss).mousedown(function(){
			replaceUserSelect();
		}).focus(function(){
			replaceUserSelect();
		}).appendTo(seldiv);

		var submit = createInput(optDiv, 'submit', null, 'Szukaj', null, null, null, true).css({
			'font-size':'11px'
		});
		form.submit(function(){
			function createHidden(name, value) {
				return createInput(form, 'hidden', name, value, undefined, undefined, undefined, true);
			}
			var q = $.trim(queryInput.val());
			if (q.length === 1) {
				alert('wpisz co najmniej dwa znaki');
				queryInput[0].focus();
				return false;
			}
			if (optArt[0].checked) {
				if (q.length === 0) {
					alert('wpisz co najmniej dwa znaki');
					queryInput[0].focus();
					return false;
				}
				form.attr('action', '/szukaj.php');
				createHidden('where', 'arts');
				removeName(userSelect);
			}
			else if (optKom[0].checked) {
				form.attr('action', '/szukaj.php');
				createHidden('where', 'comm');
				removeName(authorSelect, tit);
			}
			else {
				form.attr('action', '/forum/szukaj.php');
				createHidden('cid', 0);
				createHidden('opt', tit[0].checked ? 'th':'p');
				removeName(authorSelect, tit);
			}
			removeName(optArt, optKom, optForum);
			createHidden('s', '1');
			submit[0].disabled = true;
			win.unload(function() {
				submit[0].disabled = false;
			});
			return true;
		});

		var closeLink = $('<div style="position:absolute; top:0px;'+
			' right:0px; width:23px; height:13px; "></div>').appendTo(optDiv);
		closeLink.append($('<a href="javascript:;" title="Zamknij" class="exheader expanded"'+
			' style="width:15px; height:13px; padding-left:0"></a>').click(function(){
			if (searchOptionsVisible) {
				optDiv.hide();
				searchOptionsVisible = false;
			}
			return false;
		}));
		optDiv.appendTo(form);

		if (authorSelectReplaced) {
			return;
		}
		authorSelectReplaced = true;
		setTimeout(function() {
			var newAuthorSelect = createSelectFromHTML(seldiv, selektz.getAuthors(),
				selcss, 'aid', 'formatka', '[dowolnego autora]').hide();
			authorSelect.replaceWith(newAuthorSelect);
			authorSelect = newAuthorSelect;
		}, 300);
	};

	var qInputHolder = $('<div style="padding:6px 0 5px; text-align:center;"></div>').appendTo(form);
	var queryInput = $('<input name="ph" class="formatka searchicon" '+
		'style="width:130px;padding-left:14px">').focus(function(){
		if (!searchOptionsVisible) {
			setTimeout(function(){
				showFormOptions();
			}, 5);
		}
	}).appendTo(qInputHolder);

	form.appendTo(menu);
}());

timeEnd('wyszukiwarka - 1st run');

//-------------------------------------------------------------------
// link list

var linkdiv;

function applyLinks() {
	var html = '';
	for (var i = 0, len = config.links.length; i < len; i++) {
		var item = config.links[i];
		if (item[0]) {
			if (item[2] && $.trim(item[2])) {
				html += '<div class="dotty">';
				html += '<a href="'+item[2]+'" class="left">';
				html += $.trim(item[1]) || '[link]';
				html += '</a></div>';
			}
			else if (item[1] && $.trim(item[1])) {
				html += '<div>';
				html += item[1];
				html += '</div>';
			}
			else {
				html += '<div style="padding-top:6px"></div>';
			}
		}
	}
	if (linkdiv[0]) {
		linkdiv[0].innerHTML = html;
	}
}

var egLinki = createExpandableGroup(menu, 'Linki', !!config.state.links, null, true, 'links', function(holder) {
	if (!linkdiv) {
		linkdiv = $('<div></div>').appendTo(holder);
	}
	var linkMenu = $('<div class="linkmenu"></div>');
	var a = link('dodaj', null, 'bladyy', function(){
		var all = config.links;
		var url = cleanURL(doc.location.href);
		for (var i = 0, len = all.length; i < len; i++) {
			if (all[i][0] && url === all[i][2]) {
				if (!confirm('Na liście jest już link do tej strony. Czy na pewno dodać następny?')) {
					return;
				}
				break;
			}
		}
		if (appendRow) {
			appendRow(pageTitle, url, true);
		}
		all.push([1, pageTitle, url]);
		if (saveConfig()) {
			applyLinks();
		}
	}, true, true, linkMenu);
	a[0].title = 'Dodaj link do bieżącej strony';
	print(linkMenu, ' ');
	link('edytuj linki »', null, 'bladyy', function(){
		showLinkEditor();
	}, true, true, linkMenu);
	holder.append(linkMenu);

	applyLinks();
});
if (!linkdiv) {
	linkdiv = $('<div style="margin-bottom:4px"></div>').appendTo(egLinki.holder);
}

//-------------------------------------------------------------------
// ustawienia, checkboxy

createExpandableGroup(menu, 'Ustawienia', !!config.state.settings, null, true, 'settings', function(holder){

	var configCheckboxes = {};
	var widthRadioContainer;

	function gatherOptions() {
		$.each(configCheckboxes, function(key, checkbox){
			config.options[key] = checkbox[0].checked ? 1 : 0;
		});
		var opt = widthRadioContainer.find('input:checked');
		if (opt[0]) {
			config.options.maxpagewidth = opt[0].value * 1;
		}
	}

	function createOptionsTable(optSet, hidden) {
		var table = $('<table cellspacing="0" cellpadding="0" border="0"'+
			(hidden?' style="display:none"':'')+'></table>');
		var tbody = $('<tbody>').appendTo(table);
		$.each(optSet, function(key, caption){
			var tr = $('<tr>').appendTo(tbody);
			var td = $('<td style="vertical-align:top"></td>').appendTo(tr);
			var cb = configCheckboxes[key] = createInput(td, 'checkbox', null, 1, null, function(){
				gatherOptions();
				if (saveConfig()) {
					applyOptions();
				}
			}, !!config.options[key]);
			cb.attr('id', 'xcb_'+key);
			var td2 = $('<td style="vertical-align:top;padding-top:2px;"></td>').appendTo(tr);
			td2.append($('<label style="-moz-user-select:none; -webkit-user-select:none"></label>').
				attr('for', 'xcb_'+key).text(caption));
		});
		return table;
	}

	var optTable = createOptionsTable(configLabels);
	optTable.appendTo(holder);
	var moarTable;

	if (configMore && count(configMore) > 0) {
		link('więcej opcji', null, '', function(){
			$(this).hide();
			if (!moarTable) {
				moarTable = createOptionsTable(configMore);
				moarTable.css('margin-bottom', '4px');
				moarTable.insertAfter(optTable);
			}
		}, false, false, holder);
	}
	link('edytuj filtr', null, '', function(){
		showLinkEditor(100000);
	}, false, false, holder);


	// rozszerzator
	var maxWidthOptions = [0, 900, 1000, 1100, 1200, 1500, 999999];
	var widthText = function(value) {
		return value === 0 ? 'oryginalna': (value === 999999 ? 'max' : ('do '+value));
	};
	var widthInd = $('<div style="text-align:center; margin:5px 0 0">szerokość strony</div>').appendTo(holder);
	widthRadioContainer = $('<div style="white-space:nowrap; margin:4px 0 3px; text-align:center"></div>');
	var optCode = '';
	var lastIndex = maxWidthOptions.length - 1;
	$.each(maxWidthOptions, function(index, value){
		optCode += '<input style="margin:0 '+(index === 0?'7':'1')+'px 0 '+(index === lastIndex?'7':'1')+'px;'+
			'outline:none" type="radio" name="pwww" value="'+value+'"'+
			(value === config.options.maxpagewidth ? ' checked="checked"':'')+
			'title="'+widthText(value)+'">';
	});
	widthRadioContainer.append($(optCode)).click(function(evt){
		gatherOptions();
		if (saveConfig()) {
			applyOptions();
		}
	}).appendTo(holder).mouseover(function(evt){
		if (evt.target.value) {
			widthInd.text('szerokość: '+widthText(evt.target.value*1));
		}
	}).mouseleave(function(){
		widthInd.text('szerokość strony');
	});
});


//-------------------------------------------------------------------
// funkcje użytkowe

function print(where, string) {
	if(where[0]) {
		where[0].appendChild(document.createTextNode(string));
	}
}


function link(text, url, className, func, nodiv, noDot, parent) {
	parent = parent || menu;
	var container = nodiv ? parent : $('<div></div>').appendTo(parent);
	if (!noDot && !nodiv) {
		container.addClass('dotty');
	}
	var a = $('<a style="-moz-user-select:none; -webkit-user-select:none"></a>').attr('href',
		url || 'javascript:;').text(text).addClass(className || 'left').appendTo(container);
	if (func) {
		a.click(function(){
			func.apply(this, arguments);
			return false;
		});
	}
	return a;
}


function linkEncje(lnk) {
	return lnk.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
}


function cleanURL(url) {
	var match = url.match(/^\s*http:\/\/www.cudownyportal.pl(\/?.*?)\s*$/);
	if (match) {
		url = match[1];
		if (url === '') {
			return '\\';
		}
	}
	return url;
}


function createInput(parent, type, name, value, caption, func, checked, nobr) {
	var input = $('<input>').attr('type', type || 'text');
	if (name) {
		input.attr('name', name);
	}
	if (value !== null && value !== undefined) {
		input.attr('value', value.toString());
	}
	if (func) {
		input.click(func);
	}
	if (checked) {
		input.attr('checked', 'checked');
	}
	if (caption && (type === 'radio' || type === 'checkbox')) {
		print($('<label style="-moz-user-select:none; -webkit-user-select:none"></label>').
			appendTo(parent).append(input), ' '+caption);
	}
	else {
		parent.append(input);
	}
	if (!nobr) {
		parent.append($('<br>'));
	}
	return input;
}

function removeName() {
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i]) {
			arguments[i][0].removeAttribute('name');
		}
	}
}

// firstOption:
//     false = usuń całkowicie
//     string = zamień tekst pierwszej opcji, domyslnie: "[dowolnego]"
//     null, undefined, everything else = do nothing

function createSelectFromHTML(parent, htmlData, css, name, className, firstOption) {
	timeStart('createSelectFromHTML');
	var select = $('<select></select>');
	select[0].innerHTML = htmlData;
	if (name) {
		select.attr('name', name);
	}
	if (className) {
		select.addClass(className);
	}
	if (css) {
		select.css(css);
	}
	if (firstOption === false) {
		select.find('option:first').remove();
	}
	else if (typeof firstOption === 'string') {
		select.find('option:first').text(firstOption);
	}
	if (parent) {
		parent.append(select);
	}
	timeEnd('createSelectFromHTML');
	return select;
}


function createBackgroundTable() {
	var tableCode =
'<table align="center" width="770" border="0" cellpadding="0" cellspacing="0">'+
'<tr>'+
	'<td height="14" bgcolor="#ffa21a" colspan="3" valign="top" align="right">'+
		'<div style="position:relative; height:14px">'+
			'<div style="position:absolute; background-image:url(/pics/top.gif);'+
				'height:14px; width:330px; z-index:50000; font-size:0px;"></div>'+
			'<img width="100%" height="14" src="/pics/top.gif">'+
		'</div>'+
	'</td>'+
'</tr>'+
'<tr>'+
	'<td width="192" height="85" bgcolor="#ffa21a" rowspan="3" valign="top">'+
		'<div style="width:192px; height:85px"></div>'+
	'</td>'+
	'<td width="578" height="55" bgcolor="#ffa21a" colspan="2">'+
		'<img width="100%" height="55" src="/pics/bar.jpg">'+
	'</td>'+
'</tr>'+
'<tr>'+
	'<td width="578" height="16" bgcolor="#ffa21a" colspan="2" align="right">'+
		'<img width="100%" height="16" src="/pics/bardown.gif">'+
	'</td>'+
'</tr>'+
'<tr>'+
	'<td width="100%" height="14" bgcolor="#ffffff">'+
	'</td>'+
	'<td width="154" style="background:#fff url(/pic/line.gif) right repeat-y;">'+
	'</td>'+
'</tr>'+
'</table>';
	var div = doc.createElement('div');
	div.innerHTML = tableCode;
	return div.removeChild(div.firstChild);
}


//-------------------------------------------------------------------
// zastosowanie opcji


function applySingleOption(optionName, newState) {
	timeStart('Option: '+optionName);

	var optObj = optionMap[optionName];
	if (optObj.state === newState) {
		return;
	}
	if (typeof optObj.condition === 'function' && !optObj.condition()) {
		return;
	}
	if (typeof optObj.setState === 'function') {
		optObj.setState(newState);
	}
	else {
		if (newState) {
			if (typeof optObj.on === 'function') {
				optObj.on();
			}
			newState = 1;
		}
		else {
			if (typeof optObj.off === 'function') {
				optObj.off();
			}
			newState = 0;
		}
	}
	optObj.state = newState;

	timeEnd('Option: '+optionName);
}

var applyOptionsFirstPass = true;

function applyOptions() {
	timeStart('applyOptions');

	for (var optionName in optionMap) {
		if (optionMap.hasOwnProperty(optionName)) {
			applySingleOption(optionName, config.options[optionName]);
		}
	}

	makeMenuStatic(!config.options.gluemenu, !!applyOptionsFirstPass);	// 31 ms

	applyOptionsFirstPass = false;
	timeEnd('applyOptions');
}


//-------------------------------------------------------------------
// ekran ustawień

var linkEditorShowFunc;

function showLinkEditor(whereScroll) {
	if (!linkEditorShowFunc) {
		createLinkEditor();
	}
	linkEditorShowFunc(whereScroll);
}


function createLinkEditor() {

	var container = $('<div></div>').css({
		'font-size':'11px',
		'line-height':'13px',
		'min-height':'700px',
		'text-align':'left',
		'margin-bottom':'50px'
	});

//-------------------------------------------------------------------
// ekran ustawień: tabela z edytorem linków

	container.append($('<div class="black10">Edytuj linki</div>')).append($('<br>'));

	var table = $('<table cellpadding="0" cellspacing="0" border="1" '+
		'style="background:#fff;border-collapse:collapse;margin-bottom:7px;'+
		'min-width:530px;border-color:#aaa"></table>');
	var tbody = $('<tbody>').appendTo(table);
	var tfoot = $('<tfoot>'+
		'<tr><td colspan="4"><input type="button" class="bbadd" value="+ Dodaj link">'+
		'<select>'+
			'<option value="watek">do wątku</option>'+
			'<option value="posty">do postów użytkownika</option>'+
			'<option value="komentarze">do komentarzy użytkownika</option>'+
			'<option value="artykuly">do artykułów autora</option>'+
			'<option value="profil">do profilu użytkownika</option>'+
			'<option value="strona">do bieżącej strony</option>'+
//				'<option value="inne">inny...</option>'+
		'</select>'+
		'</td></tr>'+
		'<tr><td colspan="4">'+
			'<table width="100%" cellpadding="0" cellspacing="0" border="0">'+
			'<tbody><tr><td style="padding-left:5px">'+
				'<span id="optdiv"></span></td><td align="right">'+
				'<input type="button" class="bbsep" value="+ Dodaj separator">'+
			'</td></tr></tbody></table></td>'+
		'</tr></tfoot>').appendTo(table);
	var edSelCss = $.extend({}, selcss, {width:'15em', 'font-size':'13px', 'font-family':'arial,sans-serif'});
	var selectWhere = tfoot.find('select').css(edSelCss);

	// dummy empty selects
	var selectUsers = createSelectFromHTML(null,
		'<option value="0">wybierz użytkownika</option>', edSelCss, null, null).hide().insertAfter(selectWhere);
	var selectAuthors = createSelectFromHTML(null,
		'<option value="0">wybierz autora</option>', edSelCss, null,null).hide().insertAfter(selectWhere);
	setTimeout(function(){
		// move the time consuming process to the background
		var newAuthors = createSelectFromHTML(null, selektz.getAuthors(), edSelCss, null, null, false).hide();
		selectAuthors.replaceWith(newAuthors);
		selectAuthors = newAuthors;
		setTimeout(function(){
			var newUsers = createSelectFromHTML(null, selektz.getUsers(), edSelCss, null, null, false).hide();
			selectUsers.replaceWith(newUsers);
			selectUsers = newUsers;
		}, 5);
	}, 5);
	var selectThreads = $('<select>').insertAfter(selectWhere).css(edSelCss).change(function(){
		buttonAddClick();	// ten select dodaje link natychmiast po zmianie
	});
	$.each(defaults.threads, function(key, value){
		selectThreads.append($('<option>').attr('value', value).text(key));
	});

	function mapSelect(value) {
		switch(value) {
			case 'artykuly':
				return selectAuthors;
			case 'watek':
				return selectThreads;
			case 'posty':
			case 'komentarze':
			case 'profil':
				return selectUsers;
		}
		return null;
	}

	function getSelectedOption(select) {
		var sel = select[0];
		return sel.options[sel.selectedIndex];
	}

	selectWhere.change(function() {
		var value = getSelectedOption(selectWhere).value;
		var selectToShow = mapSelect(value);
		$.each([selectAuthors, selectThreads, selectUsers], function(index, select) {
			if (select !== selectToShow) {
				select.hide();							// hide other selects
			}
		});
		if (selectToShow) {
			selectToShow.css('display','inline');		// show this
		}
		if (value === 'strona') {
			appendRow(pageTitle, cleanURL(doc.location.href), true);
			gatherSaveApplyLinks();
		}
	});

	appendRow = function(text, link, visible) {
		var tr = $('<tr>'+
			'<td><input type="checkbox" class="bbchk"'+(visible?' checked':'')+'></td>'+
			'<td><input type="text" class="bbtext" style="width:140px;"></td>'+
			'<td><input type="text" class="bblink" style="width:270px;"></td>'+
			'<td style="white-space:nowrap"><input type="button" class="bbup" value="^" title="Przesuń w górę">'+
			'<input type="button" class="bbdown" value="v" title="Przesuń w dół">'+
			'<input type="button" class="bbdel" value="X" title="Usuń">'+
			'<input type="button" class="bbgo" value="&gt;&gt;" title="Przejdź pod adres"></td>'+
			'</tr>');
		var inputcss = {
			'font-size':'12px',
			'border':'0',
			'font-family':'tahoma,verdana,arial,helvetica,sans-serif',
			'background':'#fffff2'
		};
		tr.find('input.bbtext').parent().css({padding:'0 2px'}).end().css(inputcss)[0].value = text || '';
		tr.find('input.bblink').parent().css({padding:'0 2px'}).end().css(inputcss)[0].value = link || '';
		tr.find(':button').css({'font-size':'9px'});
		tbody.append(tr);
	};

	function gatherLinks() {
		var links = [];
		tbody.find('tr').each(function() {
			var chk = $(this).find('input.bbchk')[0].checked ? 1 : 0;
			var text = $(this).find('input.bbtext')[0].value;
			var linkInput = $(this).find('input.bblink');
			var link = linkInput[0].value;
			var cLink = cleanURL(link);
			if (link !== cLink) {
				linkInput[0].value = cLink;
			}
			links.push([chk, text, cLink]);
		});
		config.links = links;
	}

	function gatherSaveApplyLinks() {
		gatherLinks();
		if (saveConfig()) {
			applyLinks();
		}
	}

	function buttonAddClick() {
		switch(getSelectedOption(selectWhere).value) {
			case 'strona':
				appendRow(pageTitle, cleanURL(doc.location.href), true);
				return;
			case 'artykuly':
				var opt = getSelectedOption(selectAuthors);
				appendRow(opt.text+' - artykuły', '/user.php?user_id='+opt.value, true);
				return;
			case 'watek':
				opt = getSelectedOption(selectThreads);
				appendRow(opt.text, '/forum/watek.php?id='+opt.value, true);
				return;
			case 'posty':
				opt = getSelectedOption(selectUsers);
				appendRow(opt.text+' - posty', '/forum/szukaj.php?uid='+opt.value+'&s=1', true);
				return;
			case 'komentarze':
				opt = getSelectedOption(selectUsers);
				appendRow(opt.text+' - komentarze', '/szukaj.php?where=comm&uid='+opt.value+'&s=1', true);
				return;
			case 'profil':
				opt = getSelectedOption(selectUsers);
				appendRow(opt.text+' - profil', '/forum/profil.php?id='+opt.value, true);
				return;
		}
	}

	table.click(function(event){
		var tr = $(event.target).closest('tr');
		var className = event.target.className || '';
		switch (className) {
			case 'bbup':
				tr.insertBefore(tr.prev());
				break;
			case 'bbdown':
				tr.insertAfter(tr.next());
				break;
			case 'bbdel':
				tr.remove();
				break;
			case 'bbadd':
				buttonAddClick();
				break;
			case 'bbgo':
				var link = tr.find('input.bblink')[0].value;
				if ($.trim(link) !== '') {
					setTimeout(function(){
						doc.location.href = link;
					}, 5);
				}
				break;
			case 'bbsep':
				appendRow('', '', true);
				break;
		}
		gatherSaveApplyLinks();
	});

	table.keydown(function(){
		setTimeout(function(){
			gatherSaveApplyLinks();
		}, 30);
	});

	function fillLinksTable() {
		for (var i = 0; i < config.links.length; i++) {
			var tlink = config.links[i];
			appendRow(tlink[1], tlink[2], tlink[0]);
		}
	}

	fillLinksTable();
	table.appendTo(container);

	function saveLinksOnTimeout() {   // no "onpaste"
		if (linkEditorVisible) {
			gatherSaveApplyLinks();
			setTimeout(saveLinksOnTimeout, 333);
		}
	}


//-------------------------------------------------------------------
// ekran ustawień: reset linków

	function resetLinks() {
		config.links = [];
		$.extend(true, config.links, defaultConfig.links);
		if (saveConfig()) {
			tbody.empty();
			fillLinksTable();
			applyLinks();
		}
	}

	function confirmReset(what, how) {
		return function() {
			if (confirm('Czy na pewno chcesz zresetować '+what+' do domyślnych?')) {
				how();
			}
		};
	}

    var optdiv = $(xpath1(".//*[@id='optdiv']", table[0]));

	link('Zresetuj linki', null, 'gray8thin', confirmReset('linki', resetLinks), true, true, optdiv);
	print(optdiv, ' | ');


//-------------------------------------------------------------------
// ekran ustawień: eksport / import listy linków

	var linkExportDiv;

	(function() {

		function makeExport(links) {
			var result = '';
			var max = links.length - 1;
			$.each(links, function(index, element) {
				var off = !element[0];
				var text = $.trim(element[1]);
				var link = $.trim(element[2]);
				result += text;
				if (link !== '') {
					if (text !== '') {
						result += ' ';
					}
					result += link;
				}
				if (off) {
					if (link !== '' || text !== '') {
						result += ' ';
					}
					result += 'OFF';
				}
				if (index !== max) {
					result += "\n";
				}
			});
			return result;
		}

		function parseImport(str) {
			var links = [];
			var aLines = str.split("\n");
			$.each(aLines, function(index, line) {
					var found = line.match(/^(?:\s*(.*?))(?:\s*?((?:(?:http:\/|ftp:\/)??\/\S*)|(?:javascript:.*?)))?(?:\s*(OFF|off))?$/);
				links.push([found[3]?0:1, found[1], found[2] || '']);
			});
			return links;
		}

		link('Eksport/Import', null, 'gray8thin', function(){
			exportArea[0].value = makeExport(config.links);
			exportdiv.show();
			exportArea[0].select();
		}, true, true, optdiv);
		var exportdiv = $('<div style="text-align:center; padding:5px; border:1px solid #ccc;'+
			' background:#fffff2; width:579px;"></div>').hide().appendTo(container);
		linkExportDiv = exportdiv;
		var exportArea = $('<textarea spellcheck="false" style="text-align:left; width:577px; height:200px; border:1px solid #ccc; '+
			'font-family:verdana,tahoma,arial,helvetica,sans-serif; font-size:8pt"></textarea>').appendTo(exportdiv);
		$('<input type="button" value="Zapisz">').appendTo(exportdiv).click(function(){
			config.links = parseImport(exportArea.val());
			if (saveConfig()) {
				tbody.empty();
				fillLinksTable();
				applyLinks();
			}
			exportdiv.hide();
		});
		print(exportdiv, ' ');
		$('<input type="button" value="Anuluj">').appendTo(exportdiv).click(function(){
			exportdiv.hide();
		});
	}());

	link('<< powrót', null, null, function(){
		clean();
	}, true, true, container);

//-------------------------------------------------------------------
// ekran ustawień: unholy black lista

	container.append($('<br><br><br>')).
        append($('<div class="black10">Filtr postów</div>')).
        append($('<br>')).
        append($('<div>Ukrywaj posty następujących użytkowników:</div>'));
	var blacklistDiv = $('<div style="margin:5px 0;"></div>').appendTo(container);
	var blacklistTable = $('<table cellpadding="2" cellspacing="0" border="1" '+
		'style="border-collapse:collapse; empty-cells:show; margin-bottom:3px; border-color:#aaa;"></table>').appendTo(blacklistDiv).
		append($('<thead><tr><th style="text-align:left; padding:2px 5px; background:#eee;">nick</th>'+
			'<th style="text-align:right; padding:2px 5px; background:#eee; width:25%">id</th>'+
			'<th style="text-align:right; padding:2px 5px; background:#eee; width:15px"></th>'+
			'</tr></thead>'));
	var blacklistBody = $('<tbody>').appendTo(blacklistTable);

	function addBlacklistRow(nick, id, index) {
		blacklistBody.find('tr.pustak:first').remove();
		var tr = $('<tr>').appendTo(blacklistBody);
		$('<td style="text-align:left; padding:2px 5px"></td>').text(nick || '[nieznany]').appendTo(tr);
		$('<td style="text-align:right; padding:2px 5px"></td>').text(id || '[nieznany]').appendTo(tr);
		$('<td style="padding:0"></td>').appendTo(tr).append($('<input type="button" style="font-size:10px" value="Usuń">').click(function(){
			removeFromBlacklist($(this).closest('tr').children('td:eq(1)').text()*1, true);
			setTimeout(function(){
				fillBlacklistTable();
			},3);
		}));
	}

	function pustak() {
		blacklistBody.append($('<tr class="pustak"><td colspan="3" style="text-align:center; padding:10px;">Lista jest pusta</td></tr>'));
	}

	function fillBlacklistTable() {
		blacklistBody.empty();
		if (config.blacklist.length === 0) {
			pustak();
		}
		else {
			$.each(config.blacklist, function(index, entry) {
				addBlacklistRow(entry[1], entry[0], index);
			});
		}
	}

	var blacklistFoot = $('<tfoot><tr><td colspan="3"></td></tr><tr>'+
		'<td colspan="3" id="optdiv1" style="padding:5px"></td></tr></tfoot>').appendTo(blacklistTable);
	var foottd = $('td:first', blacklistFoot);
	var addbutton = $('<input type="button" value="+ Dodaj użytkownika">').click(function(){
		var opt = getSelectedOption(selectUsers1);
		var id = parseInt(opt.value, 10);
		for (var i = 0, len = config.blacklist.length; i < len; i++) {
			if (config.blacklist[i][0] === id) {
				setTimeout(function(){
					confirm('Użytkownik o numerze '+id+' jest już na liście');
				}, 5);
				return false;
			}
		}
		var newIndex = config.blacklist.length;
		config.blacklist[newIndex] = [id, opt.text];
		addBlacklistRow(opt.text, id, newIndex);
		if (saveConfig() && config.options.blacklistenabled) {
			timeStart('applyBlacklist - ustawienia');
			applyBlacklist();
			timeEnd('applyBlacklist - ustawienia');
		}
		return false;
	}).appendTo(foottd);

	// dummy empty select
	var selectUsers1 = createSelectFromHTML(null, selektz.getFirstUser(), edSelCss, null, null).insertAfter(addbutton);
	setTimeout(function(){
		// replace with real select
		var newUsers = createSelectFromHTML(null, selektz.getUsers(), edSelCss, null, null, false);
		selectUsers1.replaceWith(newUsers);
		selectUsers1 = newUsers;
	}, 250);

//-------------------------------------------------------------------
// sortowanie blacklisty

    (function(){
        var nameDirection, idDirection;
        var ths = blacklistTable.find('th:lt(2)').mouseenter((function(evt){
            $(evt.target).css({ 'text-decoration':'underline' }).attr('title','Sortuj');
        })).mouseleave((function(evt){
            $(evt.target).css({ 'text-decoration':'none' });
        })).css({cursor:'pointer'});
        var sortBlacklist = function(byName){
            if (byName) {
                config.blacklist.sort(nameDirection ? function(a, b){
                    a = a[1].toLowerCase();
                    b = b[1].toLowerCase();
                    if (a > b) {
                        return -1;
                    }
                    if (a < b) {
                        return 1;
                    }
                    return 0;
                } : function(a, b){
                    a = a[1].toLowerCase();
                    b = b[1].toLowerCase();
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    return 0;
                });
                nameDirection = !nameDirection;
                idDirection = false;
            }
            else {
                config.blacklist.sort(idDirection ? function(a, b){
                    return b[0] - a[0];
                } : function(a, b) {
                    return a[0] - b[0]
                });
                idDirection = !idDirection;
                nameDirection = false;
            }
			if (saveConfig()) {
				fillBlacklistTable();
				if (config.options.blacklistenabled) {
					applyBlacklist();
				}
			}
        };
        ths.eq(0).click(function(){
            sortBlacklist(true);
        });
        ths.eq(1).click(function(){
            sortBlacklist(false);
        });
    }());

//-------------------------------------------------------------------
// ekran ustawień: eksport / import blacklisty

	var blackExportDiv;
	var optdiv1 = $(xpath1(".//*[@id='optdiv1']", blacklistFoot[0]));

	(function() {
		link('Usuń wszystkie', null, 'gray8thin', function(){
			if (config.blacklist.length > 0 && confirm('Czy na pewno usunąć?')) {
				config.blacklist = [];
				if (saveConfig()) {
					fillBlacklistTable();
					if (config.options.blacklistenabled) {
						applyBlacklist();
					}
				}
			}
		}, true, true, optdiv1);
		print(optdiv1, ' | ');

		link('Eksport/Import', null, 'gray8thin', function(){
			var str = '';
			$.each(config.blacklist, function(index, entry){
				str += (entry[0] || '') + (entry[1] ? (( (entry[0] || entry[1].match(/^(\d+)(\s.*)?$/)) ? ' ':'') + entry[1]) :'') + '\n';
			});
			exportArea[0].value = str;
			exportdiv.show();
			exportArea[0].select();
		}, true, true, optdiv1);
		var exportdiv = $('<div style="text-align:center; padding:5px; border:1px solid #ccc; background:#fffff2; width:579px;"></div>').hide(
			).appendTo(container);
		blackExportDiv = exportdiv;
		var exportArea = $('<textarea spellcheck="false" style="text-align:left; width:577px; height:120px; border:1px solid #ccc; '+
			'font-family:verdana,tahoma,arial,helvetica,sans-serif; font-size:8pt"></textarea>').appendTo(exportdiv);
		$('<input type="button" value="Zapisz">').appendTo(exportdiv).click(function(){
			var str = exportArea.val();
			var lines = str.split('\n');
			var newlist = [];
			$.each(lines, function(index, line){
				var found = line.match(/^(\d*)\s*$/);
				if (!found) {
					found = line.match(/^(?:(\d*)\s+)?\s*?(.*?)\s*$/);
				}
				if (found) {
					var id = parseInt(found[1], 10) || 0;
					var name = found[2] || '';
					if (id || name) {
						newlist.push([id, name]);
					}
				}
			});
			config.blacklist = newlist;
			if (saveConfig()) {
				fillBlacklistTable();
				if (config.options.blacklistenabled) {
					applyBlacklist();
				}
			}
			exportdiv.hide();
		});
		print(exportdiv, ' ');
		$('<input type="button" value="Anuluj">').appendTo(exportdiv).click(function(){
			exportdiv.hide();
		});
	}());

	link('<< powrót', null, null, function(){
		clean();
	}, true, true, container);
	$('<div style="margin-top:40px">'+
		'<div style="font-weight:bold">Informacje o skrypcie</div>'+
		'<div style="margin-top:2px">Wersja: '+version+'</div>'+
		'<div style="margin-top:2px">Nowe wersje:</div>'+
		'<div style="margin-left:20px"><a href="http://userscripts.org/scripts/show/69477">'+
			'http://userscripts.org/scripts/show/69477</a></div>'+
		'<div style="margin-top:2px">Wątek o skrypcie:</div>'+
		'<div style="margin-left:20px"><a href="/forum/watek.php?id=2925">'+
			'Cudowny skrypt</a></div>'+
		'<div style="margin-top:2px">Twórcy:</div>'+
		'<div style="margin-left:20px"><span class="awrapper">'+
			makeWrapperLink('nimai', 572)+'</span> : '+
			'design, 99.9% coding</div>'+
		'<div style="margin-left:20px"><span class="awrapper">'+
			makeWrapperLink('Lynd', 131)+'</span> : '+
			'pomysły, testing, moral support, 0.1% coding</div>'+
	'</div>').appendTo(container);


//-------------------------------------------------------------------
// ekran ustawień: setup and cleanup

	var linkEditorVisible;
	var area = $('map:first area');
	tdEdytor = $('<td class="tekst2" style="background-color:#fffff8; vertical-align:top"></td>').insertAfter(tdTekst);
	container.appendTo(tdEdytor);
	setTimeout(function(){
		fixPageHeight();
	}, 1);

	function clean() {
		tdEdytor.hide();
		tdTekst.css('display', 'table-cell');
		area.unbind();
		linkEditorVisible = false;
		linkExportDiv.hide();
		blackExportDiv.hide();
	}

	linkEditorShowFunc = function(whereScroll) {
		if (!linkEditorVisible) {
			tdTekst.hide();
			tdEdytor.css('display', 'table-cell');
			linkEditorVisible = true;
			area.click(function(){			// area = link << powrót
				clean();
				return false;
			});
			setTimeout(saveLinksOnTimeout, 1200);
			fillBlacklistTable();
		}
		if (whereScroll === undefined) {
			if (win.scrollTop() > 100) {
				window.scroll(0,100);
			}
		}
		else {
			windowScroll(whereScroll);
		}
	};
}


//-------------------------------------------------------------------
// sidebar: fixed | absolute | static

var isMenuFixed;
var isMenuStatic;

onWindowResize(function(){
	if (!isMenuStatic) {
		fixMenu();
	}
});

function makeMenuStatic(state, force) {
	if (state === false) {
		if (isMenuStatic || force) {
			isMenuStatic = false;
			menuFixer.addClass('fixer');
			fixMenu(true);
			win.bind('scroll.fixmenu', function(){
				fixMenu();
			});
		}
	}
	else {
		if (!isMenuStatic || force) {
			isMenuStatic = true;
			menuFixer.removeClass('fixer');
			menuFixer.css({
				position:'static',
				height:'auto',
				top:'auto'
			});
			win.unbind('scroll.fixmenu');
		}
	}
}


function windowScroll(scrollTop) {
	fixMenu(false, scrollTop);
}


function fixMenu(force, andScrollWindowTo) {
	var scrollTop = win.scrollTop(), newScrollTop;
	if (!isMenuStatic || force) {
		var css = {};
		if (andScrollWindowTo === undefined) {
			newScrollTop = scrollTop;
		}
		else {
			var maxScrollTop = $('body').height() - windowHeight; // TODO: get rid of height()
			if (andScrollWindowTo > maxScrollTop) {
				newScrollTop = maxScrollTop;
			}
			else {
				newScrollTop = andScrollWindowTo;
			}
		}
		if (newScrollTop < 100) {
			if (isMenuFixed || force) {
				css.position = 'absolute';
				css.top = '99px';
				isMenuFixed = false;
			}
			var newHeight = windowHeight - 99 + newScrollTop;

			if (menuFixer.height() !== newHeight) { // TODO: get rid of height()
				css.height = newHeight + 'px';
			}
		}
		else {
			if (!isMenuFixed || force) {
				css.position = 'fixed';
				css.top = '0px';
				css.height = '100%';
				isMenuFixed = true;
			}
		}
		if (count(css) > 0) {
			menuFixer.css(css);
		}
	}
	if (andScrollWindowTo !== undefined && andScrollWindowTo !== scrollTop) {
		window.scroll(0, andScrollWindowTo);
	}
}

timeStart('fixer');
var menuFixer = $('<div class="fixer"></div>').append(menu);
timeEnd('fixer');


//-------------------------------------------------------------------
// finał

(function(){
	timeStart('oldmenu');
	var tehParent = oldMenu.parent();

	createExpandableGroup(menu, 'Oryginalne menu',
		!!config.state.oldmenu, null, false, 'oldmenu', function(holder) {
		oldMenu.css({margin:'16px 4px 0px 0px'});
		holder.append(oldMenu);
	});
	timeEnd('oldmenu');

	timeStart('prepend');
	menuFixer.prependTo(tehParent);
	timeEnd('prepend');

	applyOptions();

	timeStart('final commands');
	var commands = loadCommands();
	clearCommands();
	$.each(commands, function(command, param){
		if (command === 'scrolldown') {
			scrollToContentBottom();
		}
	});
	timeEnd('final commands');

	addNavigators();

	fixPageHeight();
}());


if (debugTotalTime && unsafeWindow.console) {
	unsafeWindow.console.timeEnd('STARTUP');
}
timeLog('---- delayed: ----');

};

if (!window.opera || document.readyState === 'complete') {
	jQuery.noConflict();
	run(jQuery);
}
else {
	(function(){
		var html = document.getElementsByTagName('html')[0];
		html.style.display = 'none';
		html.style.backgroundColor = '#fff';
		document.addEventListener("DOMContentLoaded", function(){
			jQuery.noConflict();
			run(jQuery);
			html.style.display = 'block';
		}, false);
	}());
}

}());

}());
