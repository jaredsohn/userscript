// ==UserScript==
// @name Dead Frontier Enhanced UI by TheDarkKRONOS & Haonik
// @include http://fairview.deadfrontier.com/onlinezombiemmo/index.php*
// @version 0.5.0.0
// ==/UserScript==

(function (window, document, undefined) {
var isNotGameScreen = !/^http:\/\/(?:fairview.deadfrontier.com\/onlinezombiemmo\/index\.php\?page=21|localhost)/i.test(document.location.href);
var urlFilter = /^http:\/\/fairview.deadfrontier.com\/onlinezombiemmo\/index\.php(|\?page=(15|21|22|24|25|28|29|35|38|49|50|53)|\?action=(forum|pm|profile))/i;

if (!urlFilter.test(document.location.href))
{
	return; // uncomment in release
}

var loadingScreen = new function()
{
	var loadingScreen = this;

	var backgroundElement = document.createElement('div');
	backgroundElement.style.cssText = 'position: absolute; display: block; z-index: 200; padding: 0; margin: 0; left: 0px; top: 0px; width: 100%; height: 100%;';
	backgroundElement.style.border = 'none';
	backgroundElement.style.backgroundColor = 'black';
	document.body.appendChild(backgroundElement);

	var messageElement = document.createElement('div');
	messageElement.style.cssText = 'position: absolute; display: block; left: 50%; top: 50%; width: 100%; margin-left: -50%;' +
		'color: #f7fe57 !important; letter-spacing: 2px !important;	font-size: 20px !important;	font-family: "Times New Roman", Arial !important;';
	messageElement.style.border = 'none';
	messageElement.style.backgroundColor = 'transparent';
	messageElement.innerHTML = 'Loading...';
	backgroundElement.appendChild(messageElement);

	loadingScreen.hide = function()
	{
		document.body.removeChild(backgroundElement);
	};

	loadingScreen.resetPosition = function()
	{
		document.body.appendChild(backgroundElement);
	};
};

/*!
 * jQuery JavaScript Library v2.1.2-pre -ajax/jsonp,-ajax/script,-deprecated,-effects,-effects/animatedSelector,-effects/Tween,-wrap,-ajax/parseJSON,-ajax/parseXML,-ajax/load,-attributes/prop,-attributes/attr,-core/ready,-exports,-exports/amd
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-07T05:46Z
 */

var $ = (function(global, factory)
{
	if (typeof module === "object" && typeof module.exports === "object")
	{
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory(global, true) :
			function(w)
			{
				if (!w.document)
				{
					throw new Error("jQuery requires a window with a document");
				}
				return factory(w);
			};
	} else
	{
		return factory(global);
	}

	// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function(window, noGlobal)
{
	// Can't do this because several apps including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	// Support: Firefox 18+
	//

	var arr = [];

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		version = "2.1.2-pre -ajax/jsonp,-ajax/script,-deprecated,-effects,-effects/animatedSelector,-effects/Tween,-wrap,-ajax/parseJSON,-ajax/parseXML,-ajax/load,-attributes/prop,-attributes/attr,-core/ready,-exports,-exports/amd",

		// Define a local copy of jQuery
		jQuery = function(selector, context)
		{
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init(selector, context);
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function(all, letter)
		{
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function()
		{
			return slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function(num)
		{
			return num != null ?

				// Return just the one element from the set
				(num < 0 ? this[num + this.length] : this[num]) :

				// Return all the elements in a clean array
				slice.call(this);
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function(elems)
		{
			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function(callback, args)
		{
			return jQuery.each(this, callback, args);
		},

		map: function(callback)
		{
			return this.pushStack(jQuery.map(this, function(elem, i)
			{
				return callback.call(elem, i, elem);
			}));
		},

		slice: function()
		{
			return this.pushStack(slice.apply(this, arguments));
		},

		first: function()
		{
			return this.eq(0);
		},

		last: function()
		{
			return this.eq(-1);
		},

		eq: function(i)
		{
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function()
		{
			return this.prevObject || this.constructor(null);
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function()
	{
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean")
		{
			deep = target;

			// skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !jQuery.isFunction(target))
		{
			target = {};
		}

		// extend jQuery itself if only one argument is passed
		if (i === length)
		{
			target = this;
			i--;
		}

		for (; i < length; i++)
		{
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null)
			{
				// Extend the base object
				for (name in options)
				{
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy)
					{
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))))
					{
						if (copyIsArray)
						{
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
						} else
						{
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined)
					{
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function(msg)
		{
			throw new Error(msg);
		},

		noop: function() { },

		// See test/unit/core.js for details concerning isFunction.
		// Since version 1.3, DOM methods and functions like alert
		// aren't supported. They return false on IE (#2968).
		isFunction: function(obj)
		{
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function(obj)
		{
			return obj != null && obj === obj.window;
		},

		isNumeric: function(obj)
		{
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0;
		},

		isPlainObject: function(obj)
		{
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj))
			{
				return false;
			}

			if (obj.constructor &&
					!hasOwn.call(obj.constructor.prototype, "isPrototypeOf"))
			{
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function(obj)
		{
			var name;
			for (name in obj)
			{
				return false;
			}
			return true;
		},

		type: function(obj)
		{
			if (obj == null)
			{
				return obj + "";
			}
			// Support: Android < 4.0, iOS < 6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[toString.call(obj)] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function(code)
		{
			var script,
				indirect = eval;

			code = jQuery.trim(code);

			if (code)
			{
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if (code.indexOf("use strict") === 1)
				{
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild(script).parentNode.removeChild(script);
				} else
				{
					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval
					indirect(code);
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function(string)
		{
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		nodeName: function(elem, name)
		{
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		// args is for internal usage only
		each: function(obj, callback, args)
		{
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike(obj);

			if (args)
			{
				if (isArray)
				{
					for (; i < length; i++)
					{
						value = callback.apply(obj[i], args);

						if (value === false)
						{
							break;
						}
					}
				} else
				{
					for (i in obj)
					{
						value = callback.apply(obj[i], args);

						if (value === false)
						{
							break;
						}
					}
				}

				// A special, fast, case for the most common use of each
			} else
			{
				if (isArray)
				{
					for (; i < length; i++)
					{
						value = callback.call(obj[i], i, obj[i]);

						if (value === false)
						{
							break;
						}
					}
				} else
				{
					for (i in obj)
					{
						value = callback.call(obj[i], i, obj[i]);

						if (value === false)
						{
							break;
						}
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function(text)
		{
			return text == null ?
				"" :
				(text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function(arr, results)
		{
			var ret = results || [];

			if (arr != null)
			{
				if (isArraylike(Object(arr)))
				{
					jQuery.merge(ret,
						typeof arr === "string" ?
						[arr] : arr
					);
				} else
				{
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function(elem, arr, i)
		{
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		merge: function(first, second)
		{
			var len = +second.length,
				j = 0,
				i = first.length;

			for (; j < len; j++)
			{
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function(elems, callback, invert)
		{
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++)
			{
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect)
				{
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function(elems, callback, arg)
		{
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike(elems),
				ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArray)
			{
				for (; i < length; i++)
				{
					value = callback(elems[i], i, arg);

					if (value != null)
					{
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else
			{
				for (i in elems)
				{
					value = callback(elems[i], i, arg);

					if (value != null)
					{
						ret.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function(fn, context)
		{
			var tmp, args, proxy;

			if (typeof context === "string")
			{
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn))
			{
				return undefined;
			}

			// Simulated bind
			args = slice.call(arguments, 2);
			proxy = function()
			{
				return fn.apply(context || this, args.concat(slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name)
	{
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArraylike(obj)
	{
		var length = obj.length,
			type = jQuery.type(obj);

		if (type === "function" || jQuery.isWindow(obj))
		{
			return false;
		}

		if (obj.nodeType === 1 && length)
		{
			return true;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v1.10.19
	 * http://sizzlejs.com/
	 *
	 * Copyright 2013 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-04-18
	 */
	(function(window)
	{
		var i,
			support,
			Expr,
			getText,
			isXML,
			tokenize,
			compile,
			select,
			outermostContext,
			sortInput,
			hasDuplicate,

			// Local document vars
			setDocument,
			document,
			docElem,
			documentIsHTML,
			rbuggyQSA,
			rbuggyMatches,
			matches,
			contains,

			// Instance-specific data
			expando = "sizzle" + -(new Date()),
			preferredDoc = window.document,
			dirruns = 0,
			done = 0,
			classCache = createCache(),
			tokenCache = createCache(),
			compilerCache = createCache(),
			sortOrder = function(a, b)
			{
				if (a === b)
				{
					hasDuplicate = true;
				}
				return 0;
			},

			// General-purpose constants
			strundefined = typeof undefined,
			MAX_NEGATIVE = 1 << 31,

			// Instance methods
			hasOwn = ({}).hasOwnProperty,
			arr = [],
			pop = arr.pop,
			push_native = arr.push,
			push = arr.push,
			slice = arr.slice,
			// Use a stripped-down indexOf if we can't use a native one
			indexOf = arr.indexOf || function(elem)
			{
				var i = 0,
					len = this.length;
				for (; i < len; i++)
				{
					if (this[i] === elem)
					{
						return i;
					}
				}
				return -1;
			},

			booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

			// Regular expressions

			// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
			whitespace = "[\\x20\\t\\r\\n\\f]",
			// http://www.w3.org/TR/css3-syntax/#characters
			characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

			// Loosely modeled on CSS identifier characters
			// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
			// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
			identifier = characterEncoding.replace("w", "w#"),

			// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
			attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
				// Operator (capture 2)
				"*([*^$|!~]?=)" + whitespace +
				// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
				"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
				"*\\]",

			pseudos = ":(" + characterEncoding + ")(?:\\((" +
				// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
				// 1. quoted (capture 3; capture 4 or capture 5)
				"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
				// 2. simple (capture 6)
				"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
				// 3. anything else (capture 2)
				".*" +
				")\\)|)",

			// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
			rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

			rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
			rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

			rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),

			rpseudo = new RegExp(pseudos),
			ridentifier = new RegExp("^" + identifier + "$"),

			matchExpr = {
				"ID": new RegExp("^#(" + characterEncoding + ")"),
				"CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
				"TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
				"ATTR": new RegExp("^" + attributes),
				"PSEUDO": new RegExp("^" + pseudos),
				"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
					"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
					"*(\\d+)|))" + whitespace + "*\\)|)", "i"),
				"bool": new RegExp("^(?:" + booleans + ")$", "i"),
				// For use in libraries implementing .is()
				// We use this for POS matching in `select`
				"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
					whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
			},

			rinputs = /^(?:input|select|textarea|button)$/i,
			rheader = /^h\d$/i,

			rnative = /^[^{]+\{\s*\[native \w/,

			// Easily-parseable/retrievable ID or TAG or CLASS selectors
			rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

			rsibling = /[+~]/,
			rescape = /'|\\/g,

			// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
			runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
			funescape = function(_, escaped, escapedWhitespace)
			{
				var high = "0x" + escaped - 0x10000;
				// NaN means non-codepoint
				// Support: Firefox<24
				// Workaround erroneous numeric interpretation of +"0x"
				return high !== high || escapedWhitespace ?
					escaped :
					high < 0 ?
						// BMP codepoint
						String.fromCharCode(high + 0x10000) :
						// Supplemental Plane codepoint (surrogate pair)
						String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
			};

		// Optimize for push.apply( _, NodeList )
		try
		{
			push.apply(
				(arr = slice.call(preferredDoc.childNodes)),
				preferredDoc.childNodes
			);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[preferredDoc.childNodes.length].nodeType;
		} catch (e)
		{
			push = {
				apply: arr.length ?

					// Leverage slice if possible
					function(target, els)
					{
						push_native.apply(target, slice.call(els));
					} :

					// Support: IE<9
					// Otherwise append directly
					function(target, els)
					{
						var j = target.length,
							i = 0;
						// Can't trust NodeList.length
						while ((target[j++] = els[i++])) { }
						target.length = j - 1;
					}
			};
		}

		function Sizzle(selector, context, results, seed)
		{
			var match, elem, m, nodeType,
				// QSA vars
				i, groups, old, nid, newContext, newSelector;

			if ((context ? context.ownerDocument || context : preferredDoc) !== document)
			{
				setDocument(context);
			}

			context = context || document;
			results = results || [];

			if (!selector || typeof selector !== "string")
			{
				return results;
			}

			if ((nodeType = context.nodeType) !== 1 && nodeType !== 9)
			{
				return [];
			}

			if (documentIsHTML && !seed)
			{
				// Shortcuts
				if ((match = rquickExpr.exec(selector)))
				{
					// Speed-up: Sizzle("#ID")
					if ((m = match[1]))
					{
						if (nodeType === 9)
						{
							elem = context.getElementById(m);
							// Check parentNode to catch when Blackberry 4.6 returns
							// nodes that are no longer in the document (jQuery #6963)
							if (elem && elem.parentNode)
							{
								// Handle the case where IE, Opera, and Webkit return items
								// by name instead of ID
								if (elem.id === m)
								{
									results.push(elem);
									return results;
								}
							} else
							{
								return results;
							}
						} else
						{
							// Context is not a document
							if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
								contains(context, elem) && elem.id === m)
							{
								results.push(elem);
								return results;
							}
						}

						// Speed-up: Sizzle("TAG")
					} else if (match[2])
					{
						push.apply(results, context.getElementsByTagName(selector));
						return results;

						// Speed-up: Sizzle(".CLASS")
					} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName)
					{
						push.apply(results, context.getElementsByClassName(m));
						return results;
					}
				}

				// QSA path
				if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector)))
				{
					nid = old = expando;
					newContext = context;
					newSelector = nodeType === 9 && selector;

					// qSA works strangely on Element-rooted queries
					// We can work around this by specifying an extra ID on the root
					// and working up from there (Thanks to Andrew Dupont for the technique)
					// IE 8 doesn't work on object elements
					if (nodeType === 1 && context.nodeName.toLowerCase() !== "object")
					{
						groups = tokenize(selector);

						if ((old = context.getAttribute("id")))
						{
							nid = old.replace(rescape, "\\$&");
						} else
						{
							context.setAttribute("id", nid);
						}
						nid = "[id='" + nid + "'] ";

						i = groups.length;
						while (i--)
						{
							groups[i] = nid + toSelector(groups[i]);
						}
						newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
						newSelector = groups.join(",");
					}

					if (newSelector)
					{
						try
						{
							push.apply(results,
								newContext.querySelectorAll(newSelector)
							);
							return results;
						} catch (qsaError)
						{
						} finally
						{
							if (!old)
							{
								context.removeAttribute("id");
							}
						}
					}
				}
			}

			// All others
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		}

		/**
		 * Create key-value caches of limited size
		 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
		 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
		 *	deleting the oldest entry
		 */
		function createCache()
		{
			var keys = [];

			function cache(key, value)
			{
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if (keys.push(key + " ") > Expr.cacheLength)
				{
					// Only keep the most recent entries
					delete cache[keys.shift()];
				}
				return (cache[key + " "] = value);
			}
			return cache;
		}

		/**
		 * Mark a function for special use by Sizzle
		 * @param {Function} fn The function to mark
		 */
		function markFunction(fn)
		{
			fn[expando] = true;
			return fn;
		}

		/**
		 * Support testing using an element
		 * @param {Function} fn Passed the created div and expects a boolean result
		 */
		function assert(fn)
		{
			var div = document.createElement("div");

			try
			{
				return !!fn(div);
			} catch (e)
			{
				return false;
			} finally
			{
				// Remove from its parent by default
				if (div.parentNode)
				{
					div.parentNode.removeChild(div);
				}
				// release memory in IE
				div = null;
			}
		}

		/**
		 * Adds the same handler for all of the specified attrs
		 * @param {String} attrs Pipe-separated list of attributes
		 * @param {Function} handler The method that will be applied
		 */
		function addHandle(attrs, handler)
		{
			var arr = attrs.split("|"),
				i = attrs.length;

			while (i--)
			{
				Expr.attrHandle[arr[i]] = handler;
			}
		}

		/**
		 * Checks document order of two siblings
		 * @param {Element} a
		 * @param {Element} b
		 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
		 */
		function siblingCheck(a, b)
		{
			var cur = b && a,
				diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
					(~b.sourceIndex || MAX_NEGATIVE) -
					(~a.sourceIndex || MAX_NEGATIVE);

			// Use IE sourceIndex if available on both nodes
			if (diff)
			{
				return diff;
			}

			// Check if b follows a
			if (cur)
			{
				while ((cur = cur.nextSibling))
				{
					if (cur === b)
					{
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
		 * Returns a function to use in pseudos for input types
		 * @param {String} type
		 */
		function createInputPseudo(type)
		{
			return function(elem)
			{
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
		 * Returns a function to use in pseudos for buttons
		 * @param {String} type
		 */
		function createButtonPseudo(type)
		{
			return function(elem)
			{
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}

		/**
		 * Returns a function to use in pseudos for positionals
		 * @param {Function} fn
		 */
		function createPositionalPseudo(fn)
		{
			return markFunction(function(argument)
			{
				argument = +argument;
				return markFunction(function(seed, matches)
				{
					var j,
						matchIndexes = fn([], seed.length, argument),
						i = matchIndexes.length;

					// Match elements found at the specified indexes
					while (i--)
					{
						if (seed[(j = matchIndexes[i])])
						{
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		/**
		 * Checks a node for validity as a Sizzle context
		 * @param {Element|Object=} context
		 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
		 */
		function testContext(context)
		{
			return context && typeof context.getElementsByTagName !== strundefined && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
		 * Detects XML nodes
		 * @param {Element|Object} elem An element or a document
		 * @returns {Boolean} True iff elem is a non-HTML XML node
		 */
		isXML = Sizzle.isXML = function(elem)
		{
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		/**
		 * Sets document-related variables once based on the current document
		 * @param {Element|Object} [doc] An element or document object to use to set the document
		 * @returns {Object} Returns the current document
		 */
		setDocument = Sizzle.setDocument = function(node)
		{
			var hasCompare,
				doc = node ? node.ownerDocument || node : preferredDoc,
				parent = doc.defaultView;

			// If no document and documentElement is available, return
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement)
			{
				return document;
			}

			// Set our document
			document = doc;
			docElem = doc.documentElement;

			// Support tests
			documentIsHTML = !isXML(doc);

			// Support: IE>8
			// If iframe document is assigned to "document" variable and if iframe has been reloaded,
			// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
			// IE6-8 do not support the defaultView property so parent will be undefined
			if (parent && parent !== parent.top)
			{
				// IE11 does not have attachEvent, so all must suffer
				if (parent.addEventListener)
				{
					parent.addEventListener("unload", function()
					{
						setDocument();
					}, false);
				} else if (parent.attachEvent)
				{
					parent.attachEvent("onunload", function()
					{
						setDocument();
					});
				}
			}

			/* Attributes
			---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
			support.attributes = assert(function(div)
			{
				div.className = "i";
				return !div.getAttribute("className");
			});

			/* getElement(s)By*
			---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function(div)
			{
				div.appendChild(doc.createComment(""));
				return !div.getElementsByTagName("*").length;
			});

			// Check if getElementsByClassName can be trusted
			support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div)
			{
				div.innerHTML = "<div class='a'></div><div class='a i'></div>";

				// Support: Safari<4
				// Catch class over-caching
				div.firstChild.className = "i";
				// Support: Opera<10
				// Catch gEBCN failure to find non-leading classes
				return div.getElementsByClassName("i").length === 2;
			});

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function(div)
			{
				docElem.appendChild(div).id = expando;
				return !doc.getElementsByName || !doc.getElementsByName(expando).length;
			});

			// ID find and filter
			if (support.getById)
			{
				Expr.find["ID"] = function(id, context)
				{
					if (typeof context.getElementById !== strundefined && documentIsHTML)
					{
						var m = context.getElementById(id);
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						return m && m.parentNode ? [m] : [];
					}
				};
				Expr.filter["ID"] = function(id)
				{
					var attrId = id.replace(runescape, funescape);
					return function(elem)
					{
						return elem.getAttribute("id") === attrId;
					};
				};
			} else
			{
				// Support: IE6/7
				// getElementById is not reliable as a find shortcut
				delete Expr.find["ID"];

				Expr.filter["ID"] = function(id)
				{
					var attrId = id.replace(runescape, funescape);
					return function(elem)
					{
						var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};
			}

			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ?
				function(tag, context)
				{
					if (typeof context.getElementsByTagName !== strundefined)
					{
						return context.getElementsByTagName(tag);
					}
				} :
				function(tag, context)
				{
					var elem,
						tmp = [],
						i = 0,
						results = context.getElementsByTagName(tag);

					// Filter out possible comments
					if (tag === "*")
					{
						while ((elem = results[i++]))
						{
							if (elem.nodeType === 1)
							{
								tmp.push(elem);
							}
						}

						return tmp;
					}
					return results;
				};

			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function(className, context)
			{
				if (typeof context.getElementsByClassName !== strundefined && documentIsHTML)
				{
					return context.getElementsByClassName(className);
				}
			};

			/* QSA/matchesSelector
			---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See http://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if ((support.qsa = rnative.test(doc.querySelectorAll)))
			{
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function(div)
				{
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// http://bugs.jquery.com/ticket/12359
					div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if (div.querySelectorAll("[msallowclip^='']").length)
					{
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if (!div.querySelectorAll("[selected]").length)
					{
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if (!div.querySelectorAll(":checked").length)
					{
						rbuggyQSA.push(":checked");
					}
				});

				assert(function(div)
				{
					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = doc.createElement("input");
					input.setAttribute("type", "hidden");
					div.appendChild(input).setAttribute("name", "D");

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if (div.querySelectorAll("[name=d]").length)
					{
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if (!div.querySelectorAll(":enabled").length)
					{
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Opera 10-11 does not throw on post-comma invalid pseudos
					div.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}

			if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
				docElem.webkitMatchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector))))
			{
				assert(function(div)
				{
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call(div, "div");

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(div, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

			/* Contains
			---------------------------------------------------------------------- */
			hasCompare = rnative.test(docElem.compareDocumentPosition);

			// Element contains another
			// Purposefully does not implement inclusive descendent
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test(docElem.contains) ?
				function(a, b)
				{
					var adown = a.nodeType === 9 ? a.documentElement : a,
						bup = b && b.parentNode;
					return a === bup || !!(bup && bup.nodeType === 1 && (
						adown.contains ?
							adown.contains(bup) :
							a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
					));
				} :
				function(a, b)
				{
					if (b)
					{
						while ((b = b.parentNode))
						{
							if (b === a)
							{
								return true;
							}
						}
					}
					return false;
				};

			/* Sorting
			---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ?
			function(a, b)
			{
				// Flag for duplicate removal
				if (a === b)
				{
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare)
				{
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
					a.compareDocumentPosition(b) :

					// Otherwise we know they are disconnected
					1;

				// Disconnected nodes
				if (compare & 1 ||
					(!support.sortDetached && b.compareDocumentPosition(a) === compare))
				{
					// Choose the first element that is related to our preferred document
					if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a))
					{
						return -1;
					}
					if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b))
					{
						return 1;
					}

					// Maintain original order
					return sortInput ?
						(indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
						0;
				}

				return compare & 4 ? -1 : 1;
			} :
			function(a, b)
			{
				// Exit early if the nodes are identical
				if (a === b)
				{
					hasDuplicate = true;
					return 0;
				}

				var cur,
					i = 0,
					aup = a.parentNode,
					bup = b.parentNode,
					ap = [a],
					bp = [b];

				// Parentless nodes are either documents or disconnected
				if (!aup || !bup)
				{
					return a === doc ? -1 :
						b === doc ? 1 :
						aup ? -1 :
						bup ? 1 :
						sortInput ?
						(indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
						0;

					// If the nodes are siblings, we can do a quick check
				} else if (aup === bup)
				{
					return siblingCheck(a, b);
				}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while ((cur = cur.parentNode))
				{
					ap.unshift(cur);
				}
				cur = b;
				while ((cur = cur.parentNode))
				{
					bp.unshift(cur);
				}

				// Walk down the tree looking for a discrepancy
				while (ap[i] === bp[i])
				{
					i++;
				}

				return i ?
					// Do a sibling check if the nodes have a common ancestor
					siblingCheck(ap[i], bp[i]) :

					// Otherwise nodes in our document sort first
					ap[i] === preferredDoc ? -1 :
					bp[i] === preferredDoc ? 1 :
					0;
			};

			return doc;
		};

		Sizzle.matches = function(expr, elements)
		{
			return Sizzle(expr, null, null, elements);
		};

		Sizzle.matchesSelector = function(elem, expr)
		{
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document)
			{
				setDocument(elem);
			}

			// Make sure that attribute selectors are quoted
			expr = expr.replace(rattributeQuotes, "='$1']");

			if (support.matchesSelector && documentIsHTML &&
				(!rbuggyMatches || !rbuggyMatches.test(expr)) &&
				(!rbuggyQSA || !rbuggyQSA.test(expr)))
			{
				try
				{
					var ret = matches.call(elem, expr);

					// IE 9's matchesSelector returns false on disconnected nodes
					if (ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
							elem.document && elem.document.nodeType !== 11)
					{
						return ret;
					}
				} catch (e) { }
			}

			return Sizzle(expr, document, null, [elem]).length > 0;
		};

		Sizzle.contains = function(context, elem)
		{
			// Set document vars if needed
			if ((context.ownerDocument || context) !== document)
			{
				setDocument(context);
			}
			return contains(context, elem);
		};

		Sizzle.attr = function(elem, name)
		{
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document)
			{
				setDocument(elem);
			}

			var fn = Expr.attrHandle[name.toLowerCase()],
				// Don't get fooled by Object.prototype properties (jQuery #13807)
				val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
					fn(elem, name, !documentIsHTML) :
					undefined;

			return val !== undefined ?
				val :
				support.attributes || !documentIsHTML ?
					elem.getAttribute(name) :
					(val = elem.getAttributeNode(name)) && val.specified ?
						val.value :
						null;
		};

		Sizzle.error = function(msg)
		{
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};

		/**
		 * Document sorting and removing duplicates
		 * @param {ArrayLike} results
		 */
		Sizzle.uniqueSort = function(results)
		{
			var elem,
				duplicates = [],
				j = 0,
				i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);

			if (hasDuplicate)
			{
				while ((elem = results[i++]))
				{
					if (elem === results[i])
					{
						j = duplicates.push(i);
					}
				}
				while (j--)
				{
					results.splice(duplicates[j], 1);
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
		 * Utility function for retrieving the text value of an array of DOM nodes
		 * @param {Array|Element} elem
		 */
		getText = Sizzle.getText = function(elem)
		{
			var node,
				ret = "",
				i = 0,
				nodeType = elem.nodeType;

			if (!nodeType)
			{
				// If no nodeType, this is expected to be an array
				while ((node = elem[i++]))
				{
					// Do not traverse comment nodes
					ret += getText(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11)
			{
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if (typeof elem.textContent === "string")
				{
					return elem.textContent;
				} else
				{
					// Traverse its children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling)
					{
						ret += getText(elem);
					}
				}
			} else if (nodeType === 3 || nodeType === 4)
			{
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {
			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function(match)
				{
					match[1] = match[1].replace(runescape, funescape);

					// Move the given value to match[3] whether quoted or unquoted
					match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

					if (match[2] === "~=")
					{
						match[3] = " " + match[3] + " ";
					}

					return match.slice(0, 4);
				},

				"CHILD": function(match)
				{
					/* matches from matchExpr["CHILD"]
						1 type (only|nth|...)
						2 what (child|of-type)
						3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
						4 xn-component of xn+y argument ([+-]?\d*n|)
						5 sign of xn-component
						6 x of xn-component
						7 sign of y-component
						8 y of y-component
					*/
					match[1] = match[1].toLowerCase();

					if (match[1].slice(0, 3) === "nth")
					{
						// nth-* requires argument
						if (!match[3])
						{
							Sizzle.error(match[0]);
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +((match[7] + match[8]) || match[3] === "odd");

						// other types prohibit arguments
					} else if (match[3])
					{
						Sizzle.error(match[0]);
					}

					return match;
				},

				"PSEUDO": function(match)
				{
					var excess,
						unquoted = !match[6] && match[2];

					if (matchExpr["CHILD"].test(match[0]))
					{
						return null;
					}

					// Accept quoted arguments as-is
					if (match[3])
					{
						match[2] = match[4] || match[5] || "";

						// Strip excess characters from unquoted arguments
					} else if (unquoted && rpseudo.test(unquoted) &&
						// Get excess from tokenize (recursively)
						(excess = tokenize(unquoted, true)) &&
						// advance to the next closing parenthesis
						(excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length))
					{
						// excess is a negative index
						match[0] = match[0].slice(0, excess);
						match[2] = unquoted.slice(0, excess);
					}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice(0, 3);
				}
			},

			filter: {
				"TAG": function(nodeNameSelector)
				{
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ?
						function() { return true; } :
						function(elem)
						{
							return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
						};
				},

				"CLASS": function(className)
				{
					var pattern = classCache[className + " "];

					return pattern ||
						(pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
						classCache(className, function(elem)
						{
							return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
						});
				},

				"ATTR": function(name, operator, check)
				{
					return function(elem)
					{
						var result = Sizzle.attr(elem, name);

						if (result == null)
						{
							return operator === "!=";
						}
						if (!operator)
						{
							return true;
						}

						result += "";

						return operator === "=" ? result === check :
							operator === "!=" ? result !== check :
							operator === "^=" ? check && result.indexOf(check) === 0 :
							operator === "*=" ? check && result.indexOf(check) > -1 :
							operator === "$=" ? check && result.slice(-check.length) === check :
							operator === "~=" ? (" " + result + " ").indexOf(check) > -1 :
							operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
							false;
					};
				},

				"CHILD": function(type, what, argument, first, last)
				{
					var simple = type.slice(0, 3) !== "nth",
						forward = type.slice(-4) !== "last",
						ofType = what === "of-type";

					return first === 1 && last === 0 ?

						// Shortcut for :nth-*(n)
						function(elem)
						{
							return !!elem.parentNode;
						} :

						function(elem, context, xml)
						{
							var cache, outerCache, node, diff, nodeIndex, start,
								dir = simple !== forward ? "nextSibling" : "previousSibling",
								parent = elem.parentNode,
								name = ofType && elem.nodeName.toLowerCase(),
								useCache = !xml && !ofType;

							if (parent)
							{
								// :(first|last|only)-(child|of-type)
								if (simple)
								{
									while (dir)
									{
										node = elem;
										while ((node = node[dir]))
										{
											if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1)
											{
												return false;
											}
										}
										// Reverse direction for :only-* (if we haven't yet done so)
										start = dir = type === "only" && !start && "nextSibling";
									}
									return true;
								}

								start = [forward ? parent.firstChild : parent.lastChild];

								// non-xml :nth-child(...) stores cache data on `parent`
								if (forward && useCache)
								{
									// Seek `elem` from a previously-cached index
									outerCache = parent[expando] || (parent[expando] = {});
									cache = outerCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = cache[0] === dirruns && cache[2];
									node = nodeIndex && parent.childNodes[nodeIndex];

									while ((node = ++nodeIndex && node && node[dir] ||

										// Fallback to seeking `elem` from the start
										(diff = nodeIndex = 0) || start.pop()))
									{
										// When found, cache indexes on `parent` and break
										if (node.nodeType === 1 && ++diff && node === elem)
										{
											outerCache[type] = [dirruns, nodeIndex, diff];
											break;
										}
									}

									// Use previously-cached element index if available
								} else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns)
								{
									diff = cache[1];

									// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
								} else
								{
									// Use the same loop as above to seek `elem` from the start
									while ((node = ++nodeIndex && node && node[dir] ||
										(diff = nodeIndex = 0) || start.pop()))
									{
										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff)
										{
											// Cache the index of each encountered element
											if (useCache)
											{
												(node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
											}

											if (node === elem)
											{
												break;
											}
										}
									}
								}

								// Incorporate the offset, then check against cycle size
								diff -= last;
								return diff === first || (diff % first === 0 && diff / first >= 0);
							}
						};
				},

				"PSEUDO": function(pseudo, argument)
				{
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
						fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
							Sizzle.error("unsupported pseudo: " + pseudo);

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if (fn[expando])
					{
						return fn(argument);
					}

					// But maintain support for old signatures
					if (fn.length > 1)
					{
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
							markFunction(function(seed, matches)
							{
								var idx,
									matched = fn(seed, argument),
									i = matched.length;
								while (i--)
								{
									idx = indexOf.call(seed, matched[i]);
									seed[idx] = !(matches[idx] = matched[i]);
								}
							}) :
							function(elem)
							{
								return fn(elem, 0, args);
							};
					}

					return fn;
				}
			},

			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function(selector)
				{
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
						results = [],
						matcher = compile(selector.replace(rtrim, "$1"));

					return matcher[expando] ?
						markFunction(function(seed, matches, context, xml)
						{
							var elem,
								unmatched = matcher(seed, null, xml, []),
								i = seed.length;

							// Match elements unmatched by `matcher`
							while (i--)
							{
								if ((elem = unmatched[i]))
								{
									seed[i] = !(matches[i] = elem);
								}
							}
						}) :
						function(elem, context, xml)
						{
							input[0] = elem;
							matcher(input, null, xml, results);
							return !results.pop();
						};
				}),

				"has": markFunction(function(selector)
				{
					return function(elem)
					{
						return Sizzle(selector, elem).length > 0;
					};
				}),

				"contains": markFunction(function(text)
				{
					return function(elem)
					{
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction(function(lang)
				{
					// lang value must be a valid identifier
					if (!ridentifier.test(lang || ""))
					{
						Sizzle.error("unsupported lang: " + lang);
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function(elem)
					{
						var elemLang;
						do
						{
							if ((elemLang = documentIsHTML ?
								elem.lang :
								elem.getAttribute("xml:lang") || elem.getAttribute("lang")))
							{
								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),

				// Miscellaneous
				"target": function(elem)
				{
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},

				"root": function(elem)
				{
					return elem === docElem;
				},

				"focus": function(elem)
				{
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},

				// Boolean properties
				"enabled": function(elem)
				{
					return elem.disabled === false;
				},

				"disabled": function(elem)
				{
					return elem.disabled === true;
				},

				"checked": function(elem)
				{
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
				},

				"selected": function(elem)
				{
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode)
					{
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function(elem)
				{
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling)
					{
						if (elem.nodeType < 6)
						{
							return false;
						}
					}
					return true;
				},

				"parent": function(elem)
				{
					return !Expr.pseudos["empty"](elem);
				},

				// Element/input types
				"header": function(elem)
				{
					return rheader.test(elem.nodeName);
				},

				"input": function(elem)
				{
					return rinputs.test(elem.nodeName);
				},

				"button": function(elem)
				{
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function(elem)
				{
					var attr;
					return elem.nodeName.toLowerCase() === "input" &&
						elem.type === "text" &&

						// Support: IE<8
						// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
						((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
				},

				// Position-in-collection
				"first": createPositionalPseudo(function()
				{
					return [0];
				}),

				"last": createPositionalPseudo(function(matchIndexes, length)
				{
					return [length - 1];
				}),

				"eq": createPositionalPseudo(function(matchIndexes, length, argument)
				{
					return [argument < 0 ? argument + length : argument];
				}),

				"even": createPositionalPseudo(function(matchIndexes, length)
				{
					var i = 0;
					for (; i < length; i += 2)
					{
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"odd": createPositionalPseudo(function(matchIndexes, length)
				{
					var i = 1;
					for (; i < length; i += 2)
					{
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"lt": createPositionalPseudo(function(matchIndexes, length, argument)
				{
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;)
					{
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"gt": createPositionalPseudo(function(matchIndexes, length, argument)
				{
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;)
					{
						matchIndexes.push(i);
					}
					return matchIndexes;
				})
			}
		};

		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		// Add button/input type pseudos
		for (i in { radio: true, checkbox: true, file: true, password: true, image: true })
		{
			Expr.pseudos[i] = createInputPseudo(i);
		}
		for (i in { submit: true, reset: true })
		{
			Expr.pseudos[i] = createButtonPseudo(i);
		}

		// Easy API for creating new setFilters
		function setFilters() { }
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function(selector, parseOnly)
		{
			var matched, match, tokens, type,
				soFar, groups, preFilters,
				cached = tokenCache[selector + " "];

			if (cached)
			{
				return parseOnly ? 0 : cached.slice(0);
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while (soFar)
			{
				// Comma and first run
				if (!matched || (match = rcomma.exec(soFar)))
				{
					if (match)
					{
						// Don't consume trailing commas as valid
						soFar = soFar.slice(match[0].length) || soFar;
					}
					groups.push((tokens = []));
				}

				matched = false;

				// Combinators
				if ((match = rcombinators.exec(soFar)))
				{
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}

				// Filters
				for (type in Expr.filter)
				{
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
						(match = preFilters[type](match))))
					{
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				}

				if (!matched)
				{
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ?
				soFar.length :
				soFar ?
					Sizzle.error(selector) :
					// Cache the tokens
					tokenCache(selector, groups).slice(0);
		};

		function toSelector(tokens)
		{
			var i = 0,
				len = tokens.length,
				selector = "";
			for (; i < len; i++)
			{
				selector += tokens[i].value;
			}
			return selector;
		}

		function addCombinator(matcher, combinator, base)
		{
			var dir = combinator.dir,
				checkNonElements = base && dir === "parentNode",
				doneName = done++;

			return combinator.first ?
				// Check against closest ancestor/preceding element
				function(elem, context, xml)
				{
					while ((elem = elem[dir]))
					{
						if (elem.nodeType === 1 || checkNonElements)
						{
							return matcher(elem, context, xml);
						}
					}
				} :

				// Check against all ancestor/preceding elements
				function(elem, context, xml)
				{
					var oldCache, outerCache,
						newCache = [dirruns, doneName];

					// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
					if (xml)
					{
						while ((elem = elem[dir]))
						{
							if (elem.nodeType === 1 || checkNonElements)
							{
								if (matcher(elem, context, xml))
								{
									return true;
								}
							}
						}
					} else
					{
						while ((elem = elem[dir]))
						{
							if (elem.nodeType === 1 || checkNonElements)
							{
								outerCache = elem[expando] || (elem[expando] = {});
								if ((oldCache = outerCache[dir]) &&
									oldCache[0] === dirruns && oldCache[1] === doneName)
								{
									// Assign to newCache so results back-propagate to previous elements
									return (newCache[2] = oldCache[2]);
								} else
								{
									// Reuse newcache so results back-propagate to previous elements
									outerCache[dir] = newCache;

									// A match means we're done; a fail means we have to keep checking
									if ((newCache[2] = matcher(elem, context, xml)))
									{
										return true;
									}
								}
							}
						}
					}
				};
		}

		function elementMatcher(matchers)
		{
			return matchers.length > 1 ?
				function(elem, context, xml)
				{
					var i = matchers.length;
					while (i--)
					{
						if (!matchers[i](elem, context, xml))
						{
							return false;
						}
					}
					return true;
				} :
				matchers[0];
		}

		function multipleContexts(selector, contexts, results)
		{
			var i = 0,
				len = contexts.length;
			for (; i < len; i++)
			{
				Sizzle(selector, contexts[i], results);
			}
			return results;
		}

		function condense(unmatched, map, filter, context, xml)
		{
			var elem,
				newUnmatched = [],
				i = 0,
				len = unmatched.length,
				mapped = map != null;

			for (; i < len; i++)
			{
				if ((elem = unmatched[i]))
				{
					if (!filter || filter(elem, context, xml))
					{
						newUnmatched.push(elem);
						if (mapped)
						{
							map.push(i);
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector)
		{
			if (postFilter && !postFilter[expando])
			{
				postFilter = setMatcher(postFilter);
			}
			if (postFinder && !postFinder[expando])
			{
				postFinder = setMatcher(postFinder, postSelector);
			}
			return markFunction(function(seed, results, context, xml)
			{
				var temp, i, elem,
					preMap = [],
					postMap = [],
					preexisting = results.length,

					// Get initial elements from seed or context
					elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

					// Prefilter to get matcher input, preserving a map for seed-results synchronization
					matcherIn = preFilter && (seed || !selector) ?
						condense(elems, preMap, preFilter, context, xml) :
						elems,

					matcherOut = matcher ?
						// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
						postFinder || (seed ? preFilter : preexisting || postFilter) ?

							// ...intermediate processing is necessary
							[] :

							// ...otherwise use results directly
					results :
						matcherIn;

				// Find primary matches
				if (matcher)
				{
					matcher(matcherIn, matcherOut, context, xml);
				}

				// Apply postFilter
				if (postFilter)
				{
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while (i--)
					{
						if ((elem = temp[i]))
						{
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
						}
					}
				}

				if (seed)
				{
					if (postFinder || preFilter)
					{
						if (postFinder)
						{
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while (i--)
							{
								if ((elem = matcherOut[i]))
								{
									// Restore matcherIn since elem is not yet a final match
									temp.push((matcherIn[i] = elem));
								}
							}
							postFinder(null, (matcherOut = []), temp, xml);
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while (i--)
						{
							if ((elem = matcherOut[i]) &&
								(temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1)
							{
								seed[temp] = !(results[temp] = elem);
							}
						}
					}

					// Add elements to results, through postFinder if defined
				} else
				{
					matcherOut = condense(
						matcherOut === results ?
							matcherOut.splice(preexisting, matcherOut.length) :
							matcherOut
					);
					if (postFinder)
					{
						postFinder(null, results, matcherOut, xml);
					} else
					{
						push.apply(results, matcherOut);
					}
				}
			});
		}

		function matcherFromTokens(tokens)
		{
			var checkContext, matcher, j,
				len = tokens.length,
				leadingRelative = Expr.relative[tokens[0].type],
				implicitRelative = leadingRelative || Expr.relative[" "],
				i = leadingRelative ? 1 : 0,

				// The foundational matcher ensures that elements are reachable from top-level context(s)
				matchContext = addCombinator(function(elem)
				{
					return elem === checkContext;
				}, implicitRelative, true),
				matchAnyContext = addCombinator(function(elem)
				{
					return indexOf.call(checkContext, elem) > -1;
				}, implicitRelative, true),
				matchers = [function(elem, context, xml)
				{
					return (!leadingRelative && (xml || context !== outermostContext)) || (
						(checkContext = context).nodeType ?
							matchContext(elem, context, xml) :
							matchAnyContext(elem, context, xml));
				}];

			for (; i < len; i++)
			{
				if ((matcher = Expr.relative[tokens[i].type]))
				{
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else
				{
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

					// Return special upon seeing a positional matcher
					if (matcher[expando])
					{
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for (; j < len; j++)
						{
							if (Expr.relative[tokens[j].type])
							{
								break;
							}
						}
						return setMatcher(
							i > 1 && elementMatcher(matchers),
							i > 1 && toSelector(
								// If the preceding token was a descendant combinator, insert an implicit any-element `*`
								tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })
							).replace(rtrim, "$1"),
							matcher,
							i < j && matcherFromTokens(tokens.slice(i, j)),
							j < len && matcherFromTokens((tokens = tokens.slice(j))),
							j < len && toSelector(tokens)
						);
					}
					matchers.push(matcher);
				}
			}

			return elementMatcher(matchers);
		}

		function matcherFromGroupMatchers(elementMatchers, setMatchers)
		{
			var bySet = setMatchers.length > 0,
				byElement = elementMatchers.length > 0,
				superMatcher = function(seed, context, xml, results, outermost)
				{
					var elem, j, matcher,
						matchedCount = 0,
						i = "0",
						unmatched = seed && [],
						setMatched = [],
						contextBackup = outermostContext,
						// We must always have either seed elements or outermost context
						elems = seed || byElement && Expr.find["TAG"]("*", outermost),
						// Use integer dirruns iff this is the outermost matcher
						dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
						len = elems.length;

					if (outermost)
					{
						outermostContext = context !== document && context;
					}

					// Add elements passing elementMatchers directly to results
					// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
					// Support: IE<9, Safari
					// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
					for (; i !== len && (elem = elems[i]) != null; i++)
					{
						if (byElement && elem)
						{
							j = 0;
							while ((matcher = elementMatchers[j++]))
							{
								if (matcher(elem, context, xml))
								{
									results.push(elem);
									break;
								}
							}
							if (outermost)
							{
								dirruns = dirrunsUnique;
							}
						}

						// Track unmatched elements for set filters
						if (bySet)
						{
							// They will have gone through all possible matchers
							if ((elem = !matcher && elem))
							{
								matchedCount--;
							}

							// Lengthen the array for every element, matched or not
							if (seed)
							{
								unmatched.push(elem);
							}
						}
					}

					// Apply set filters to unmatched elements
					matchedCount += i;
					if (bySet && i !== matchedCount)
					{
						j = 0;
						while ((matcher = setMatchers[j++]))
						{
							matcher(unmatched, setMatched, context, xml);
						}

						if (seed)
						{
							// Reintegrate element matches to eliminate the need for sorting
							if (matchedCount > 0)
							{
								while (i--)
								{
									if (!(unmatched[i] || setMatched[i]))
									{
										setMatched[i] = pop.call(results);
									}
								}
							}

							// Discard index placeholder values to get only actual matches
							setMatched = condense(setMatched);
						}

						// Add matches to results
						push.apply(results, setMatched);

						// Seedless set matches succeeding multiple successful matchers stipulate sorting
						if (outermost && !seed && setMatched.length > 0 &&
							(matchedCount + setMatchers.length) > 1)
						{
							Sizzle.uniqueSort(results);
						}
					}

					// Override manipulation of globals by nested matchers
					if (outermost)
					{
						dirruns = dirrunsUnique;
						outermostContext = contextBackup;
					}

					return unmatched;
				};

			return bySet ?
				markFunction(superMatcher) :
				superMatcher;
		}

		compile = Sizzle.compile = function(selector, match /* Internal Use Only */)
		{
			var i,
				setMatchers = [],
				elementMatchers = [],
				cached = compilerCache[selector + " "];

			if (!cached)
			{
				// Generate a function of recursive functions that can be used to check each element
				if (!match)
				{
					match = tokenize(selector);
				}
				i = match.length;
				while (i--)
				{
					cached = matcherFromTokens(match[i]);
					if (cached[expando])
					{
						setMatchers.push(cached);
					} else
					{
						elementMatchers.push(cached);
					}
				}

				// Cache the compiled function
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
		 * A low-level selection function that works with Sizzle's compiled
		 *  selector functions
		 * @param {String|Function} selector A selector or a pre-compiled
		 *  selector function built with Sizzle.compile
		 * @param {Element} context
		 * @param {Array} [results]
		 * @param {Array} [seed] A set of elements to match against
		 */
		select = Sizzle.select = function(selector, context, results, seed)
		{
			var i, tokens, token, type, find,
				compiled = typeof selector === "function" && selector,
				match = !seed && tokenize((selector = compiled.selector || selector));

			results = results || [];

			// Try to minimize operations if there is no seed and only one group
			if (match.length === 1)
			{
				// Take a shortcut and set the context if the root selector is an ID
				tokens = match[0] = match[0].slice(0);
				if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
						support.getById && context.nodeType === 9 && documentIsHTML &&
						Expr.relative[tokens[1].type])
				{
					context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
					if (!context)
					{
						return results;

						// Precompiled matchers will still verify ancestry, so step up a level
					} else if (compiled)
					{
						context = context.parentNode;
					}

					selector = selector.slice(tokens.shift().value.length);
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
				while (i--)
				{
					token = tokens[i];

					// Abort if we hit a combinator
					if (Expr.relative[(type = token.type)])
					{
						break;
					}
					if ((find = Expr.find[type]))
					{
						// Search, expanding context for leading sibling combinators
						if ((seed = find(
							token.matches[0].replace(runescape, funescape),
							rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
						)))
						{
							// If seed is empty or no tokens remain, we can return early
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector)
							{
								push.apply(results, seed);
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			(compiled || compile(selector, match))(
				seed,
				context,
				!documentIsHTML,
				results,
				rsibling.test(selector) && testContext(context.parentNode) || context
			);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

		// Support: Chrome<14
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function(div1)
		{
			// Should return 1, but returns 4 (following)
			return div1.compareDocumentPosition(document.createElement("div")) & 1;
		});

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!assert(function(div)
		{
			div.innerHTML = "<a href='#'></a>";
			return div.firstChild.getAttribute("href") === "#";
		}))
		{
			addHandle("type|href|height|width", function(elem, name, isXML)
			{
				if (!isXML)
				{
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
				}
			});
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if (!support.attributes || !assert(function(div)
		{
			div.innerHTML = "<input/>";
			div.firstChild.setAttribute("value", "");
			return div.firstChild.getAttribute("value") === "";
		}))
		{
			addHandle("value", function(elem, name, isXML)
			{
				if (!isXML && elem.nodeName.toLowerCase() === "input")
				{
					return elem.defaultValue;
				}
			});
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if (!assert(function(div)
		{
			return div.getAttribute("disabled") == null;
		}))
		{
			addHandle(booleans, function(elem, name, isXML)
			{
				var val;
				if (!isXML)
				{
					return elem[name] === true ? name.toLowerCase() :
							(val = elem.getAttributeNode(name)) && val.specified ?
							val.value :
						null;
				}
			});
		}

		return Sizzle;
	})(window);



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not)
	{
		if (jQuery.isFunction(qualifier))
		{
			return jQuery.grep(elements, function(elem, i)
			{
				/* jshint -W018 */
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		if (qualifier.nodeType)
		{
			return jQuery.grep(elements, function(elem)
			{
				return (elem === qualifier) !== not;
			});
		}

		if (typeof qualifier === "string")
		{
			if (risSimple.test(qualifier))
			{
				return jQuery.filter(qualifier, elements, not);
			}

			qualifier = jQuery.filter(qualifier, elements);
		}

		return jQuery.grep(elements, function(elem)
		{
			return (indexOf.call(qualifier, elem) >= 0) !== not;
		});
	}

	jQuery.filter = function(expr, elems, not)
	{
		var elem = elems[0];

		if (not)
		{
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector(elem, expr) ? [elem] : [] :
			jQuery.find.matches(expr, jQuery.grep(elems, function(elem)
			{
				return elem.nodeType === 1;
			}));
	};

	jQuery.fn.extend({
		find: function(selector)
		{
			var i,
				len = this.length,
				ret = [],
				self = this;

			if (typeof selector !== "string")
			{
				return this.pushStack(jQuery(selector).filter(function()
				{
					for (i = 0; i < len; i++)
					{
						if (jQuery.contains(self[i], this))
						{
							return true;
						}
					}
				}));
			}

			for (i = 0; i < len; i++)
			{
				jQuery.find(selector, self[i], ret);
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function(selector)
		{
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function(selector)
		{
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function(selector)
		{
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test(selector) ?
					jQuery(selector) :
					selector || [],
				false
			).length;
		}
	});


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function(selector, context)
		{
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if (!selector)
			{
				return this;
			}

			// Handle HTML strings
			if (typeof selector === "string")
			{
				if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3)
				{
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [null, selector, null];
				} else
				{
					match = rquickExpr.exec(selector);
				}

				// Match html or make sure no context is specified for #id
				if (match && (match[1] || !context))
				{
					// HANDLE: $(html) -> $(array)
					if (match[1])
					{
						context = context instanceof jQuery ? context[0] : context;

						// scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge(this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						));

						// HANDLE: $(html, props)
						if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
						{
							for (match in context)
							{
								// Properties of context are called as methods if possible
								if (jQuery.isFunction(this[match]))
								{
									this[match](context[match]);

									// ...and otherwise set as attributes
								} else
								{
									this.attr(match, context[match]);
								}
							}
						}

						return this;

						// HANDLE: $(#id)
					} else
					{
						elem = document.getElementById(match[2]);

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if (elem && elem.parentNode)
						{
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

					// HANDLE: $(expr, $(...))
				} else if (!context || context.jquery)
				{
					return (context || rootjQuery).find(selector);

					// HANDLE: $(expr, context)
					// (which is just equivalent to: $(context).find(expr)
				} else
				{
					return this.constructor(context).find(selector);
				}

				// HANDLE: $(DOMElement)
			} else if (selector.nodeType)
			{
				this.context = this[0] = selector;
				this.length = 1;
				return this;

				// HANDLE: $(function)
				// Shortcut for document ready
			} else if (jQuery.isFunction(selector))
			{
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready(selector) :
					// Execute immediately if ready is not present
					selector(jQuery);
			}

			if (selector.selector !== undefined)
			{
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray(selector, this);
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.extend({
		dir: function(elem, dir, until)
		{
			var matched = [],
				truncate = until !== undefined;

			while ((elem = elem[dir]) && elem.nodeType !== 9)
			{
				if (elem.nodeType === 1)
				{
					if (truncate && jQuery(elem).is(until))
					{
						break;
					}
					matched.push(elem);
				}
			}
			return matched;
		},

		sibling: function(n, elem)
		{
			var matched = [];

			for (; n; n = n.nextSibling)
			{
				if (n.nodeType === 1 && n !== elem)
				{
					matched.push(n);
				}
			}

			return matched;
		}
	});

	jQuery.fn.extend({
		has: function(target)
		{
			var targets = jQuery(target, this),
				l = targets.length;

			return this.filter(function()
			{
				var i = 0;
				for (; i < l; i++)
				{
					if (jQuery.contains(this, targets[i]))
					{
						return true;
					}
				}
			});
		},

		closest: function(selectors, context)
		{
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
					jQuery(selectors, context || this.context) :
					0;

			for (; i < l; i++)
			{
				for (cur = this[i]; cur && cur !== context; cur = cur.parentNode)
				{
					// Always skip document fragments
					if (cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors)))
					{
						matched.push(cur);
						break;
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
		},

		// Determine the position of an element within
		// the matched set of elements
		index: function(elem)
		{
			// No argument, return index in parent
			if (!elem)
			{
				return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
			}

			// index in selector
			if (typeof elem === "string")
			{
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[0] : elem
			);
		},

		add: function(selector, context)
		{
			return this.pushStack(
				jQuery.unique(
					jQuery.merge(this.get(), jQuery(selector, context))
				)
			);
		},

		addBack: function(selector)
		{
			return this.add(selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});

	function sibling(cur, dir)
	{
		while ((cur = cur[dir]) && cur.nodeType !== 1) { }
		return cur;
	}

	jQuery.each({
		parent: function(elem)
		{
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function(elem)
		{
			return jQuery.dir(elem, "parentNode");
		},
		parentsUntil: function(elem, i, until)
		{
			return jQuery.dir(elem, "parentNode", until);
		},
		next: function(elem)
		{
			return sibling(elem, "nextSibling");
		},
		prev: function(elem)
		{
			return sibling(elem, "previousSibling");
		},
		nextAll: function(elem)
		{
			return jQuery.dir(elem, "nextSibling");
		},
		prevAll: function(elem)
		{
			return jQuery.dir(elem, "previousSibling");
		},
		nextUntil: function(elem, i, until)
		{
			return jQuery.dir(elem, "nextSibling", until);
		},
		prevUntil: function(elem, i, until)
		{
			return jQuery.dir(elem, "previousSibling", until);
		},
		siblings: function(elem)
		{
			return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
		},
		children: function(elem)
		{
			return jQuery.sibling(elem.firstChild);
		},
		contents: function(elem)
		{
			return elem.contentDocument || jQuery.merge([], elem.childNodes);
		}
	}, function(name, fn)
	{
		jQuery.fn[name] = function(until, selector)
		{
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until")
			{
				selector = until;
			}

			if (selector && typeof selector === "string")
			{
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1)
			{
				// Remove duplicates
				if (!guaranteedUnique[name])
				{
					jQuery.unique(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name))
				{
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnotwhite = (/\S+/g);



	// String to Object options format cache
	var optionsCache = {};

	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions(options)
	{
		var object = optionsCache[options] = {};
		jQuery.each(options.match(rnotwhite) || [], function(_, flag)
		{
			object[flag] = true;
		});
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function(options)
	{
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			(optionsCache[options] || createOptions(options)) :
			jQuery.extend({}, options);

		var // Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function(data)
			{
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for (; list && firingIndex < firingLength; firingIndex++)
				{
					if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse)
					{
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if (list)
				{
					if (stack)
					{
						if (stack.length)
						{
							fire(stack.shift());
						}
					} else if (memory)
					{
						list = [];
					} else
					{
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function()
				{
					if (list)
					{
						// First, we save the current length
						var start = list.length;
						(function add(args)
						{
							jQuery.each(args, function(_, arg)
							{
								var type = jQuery.type(arg);
								if (type === "function")
								{
									if (!options.unique || !self.has(arg))
									{
										list.push(arg);
									}
								} else if (arg && arg.length && type !== "string")
								{
									// Inspect recursively
									add(arg);
								}
							});
						})(arguments);
						// Do we need to add the callbacks to the
						// current firing batch?
						if (firing)
						{
							firingLength = list.length;
							// With memory, if we're not firing then
							// we should call right away
						} else if (memory)
						{
							firingStart = start;
							fire(memory);
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function()
				{
					if (list)
					{
						jQuery.each(arguments, function(_, arg)
						{
							var index;
							while ((index = jQuery.inArray(arg, list, index)) > -1)
							{
								list.splice(index, 1);
								// Handle firing indexes
								if (firing)
								{
									if (index <= firingLength)
									{
										firingLength--;
									}
									if (index <= firingIndex)
									{
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function(fn)
				{
					return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
				},
				// Remove all callbacks from the list
				empty: function()
				{
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function()
				{
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function()
				{
					return !list;
				},
				// Lock the list in its current state
				lock: function()
				{
					stack = undefined;
					if (!memory)
					{
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function()
				{
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function(context, args)
				{
					if (list && (!fired || stack))
					{
						args = args || [];
						args = [context, args.slice ? args.slice() : args];
						if (firing)
						{
							stack.push(args);
						} else
						{
							fire(args);
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function()
				{
					self.fireWith(this, arguments);
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function()
				{
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend({
		Deferred: function(func)
		{
			var tuples = [
					// action, add listener, listener list, final state
					["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
					["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
					["notify", "progress", jQuery.Callbacks("memory")]
			],
				state = "pending",
				promise = {
					state: function()
					{
						return state;
					},
					always: function()
					{
						deferred.done(arguments).fail(arguments);
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */)
					{
						var fns = arguments;
						return jQuery.Deferred(function(newDefer)
						{
							jQuery.each(tuples, function(i, tuple)
							{
								var fn = jQuery.isFunction(fns[i]) && fns[i];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[tuple[1]](function()
								{
									var returned = fn && fn.apply(this, arguments);
									if (returned && jQuery.isFunction(returned.promise))
									{
										returned.promise()
											.done(newDefer.resolve)
											.fail(newDefer.reject)
											.progress(newDefer.notify);
									} else
									{
										newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function(obj)
					{
						return obj != null ? jQuery.extend(obj, promise) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each(tuples, function(i, tuple)
			{
				var list = tuple[2],
					stateString = tuple[3];

				// promise[ done | fail | progress ] = list.add
				promise[tuple[1]] = list.add;

				// Handle state
				if (stateString)
				{
					list.add(function()
					{
						// state = [ resolved | rejected ]
						state = stateString;

						// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
				}

				// deferred[ resolve | reject | notify ]
				deferred[tuple[0]] = function()
				{
					deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
					return this;
				};
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise(deferred);

			// Call given func if any
			if (func)
			{
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function(subordinate /* , ..., subordinateN */)
		{
			var i = 0,
				resolveValues = slice.call(arguments),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,

				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function(i, contexts, values)
				{
					return function(value)
					{
						contexts[i] = this;
						values[i] = arguments.length > 1 ? slice.call(arguments) : value;
						if (values === progressValues)
						{
							deferred.notifyWith(contexts, values);
						} else if (!(--remaining))
						{
							deferred.resolveWith(contexts, values);
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// add listeners to Deferred subordinates; treat others as resolved
			if (length > 1)
			{
				progressValues = new Array(length);
				progressContexts = new Array(length);
				resolveContexts = new Array(length);
				for (; i < length; i++)
				{
					if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise))
					{
						resolveValues[i].promise()
							.done(updateFunc(i, resolveContexts, resolveValues))
							.fail(deferred.reject)
							.progress(updateFunc(i, progressContexts, progressValues));
					} else
					{
						--remaining;
					}
				}
			}

			// if we're not waiting on anything, resolve the master
			if (!remaining)
			{
				deferred.resolveWith(resolveContexts, resolveValues);
			}

			return deferred.promise();
		}
	});


	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw)
	{
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === "object")
		{
			chainable = true;
			for (i in key)
			{
				jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined)
		{
			chainable = true;

			if (!jQuery.isFunction(value))
			{
				raw = true;
			}

			if (bulk)
			{
				// Bulk operations run against the entire set
				if (raw)
				{
					fn.call(elems, value);
					fn = null;

					// ...except when executing function values
				} else
				{
					bulk = fn;
					fn = function(elem, key, value)
					{
						return bulk.call(jQuery(elem), value);
					};
				}
			}

			if (fn)
			{
				for (; i < len; i++)
				{
					fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call(elems) :
				len ? fn(elems[0], key) : emptyGet;
	};


	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function(owner)
	{
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
	};


	function Data()
	{
		// Support: Android < 4,
		// Old WebKit does not have Object.preventExtensions/freeze method,
		// return new empty object instead with no [[set]] accessor
		Object.defineProperty(this.cache = {}, 0, {
			get: function()
			{
				return {};
			}
		});

		this.expando = jQuery.expando + Math.random();
	}

	Data.uid = 1;
	Data.accepts = jQuery.acceptData;

	Data.prototype = {
		key: function(owner)
		{
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return the key for a frozen object.
			if (!Data.accepts(owner))
			{
				return 0;
			}

			var descriptor = {},
				// Check if the owner object already has a cache key
				unlock = owner[this.expando];

			// If not, create one
			if (!unlock)
			{
				unlock = Data.uid++;

				// Secure it in a non-enumerable, non-writable property
				try
				{
					descriptor[this.expando] = { value: unlock };
					Object.defineProperties(owner, descriptor);

					// Support: Android < 4
					// Fallback to a less secure definition
				} catch (e)
				{
					descriptor[this.expando] = unlock;
					jQuery.extend(owner, descriptor);
				}
			}

			// Ensure the cache object
			if (!this.cache[unlock])
			{
				this.cache[unlock] = {};
			}

			return unlock;
		},
		set: function(owner, data, value)
		{
			var prop,
				// There may be an unlock assigned to this node,
				// if there is no entry for this "owner", create one inline
				// and set the unlock as though an owner entry had always existed
				unlock = this.key(owner),
				cache = this.cache[unlock];

			// Handle: [ owner, key, value ] args
			if (typeof data === "string")
			{
				cache[data] = value;

				// Handle: [ owner, { properties } ] args
			} else
			{
				// Fresh assignments by object are shallow copied
				if (jQuery.isEmptyObject(cache))
				{
					jQuery.extend(this.cache[unlock], data);
					// Otherwise, copy the properties one-by-one to the cache object
				} else
				{
					for (prop in data)
					{
						cache[prop] = data[prop];
					}
				}
			}
			return cache;
		},
		get: function(owner, key)
		{
			// Either a valid cache is found, or will be created.
			// New caches will be created and the unlock returned,
			// allowing direct access to the newly created
			// empty data object. A valid owner object must be provided.
			var cache = this.cache[this.key(owner)];

			return key === undefined ?
				cache : cache[key];
		},
		access: function(owner, key, value)
		{
			var stored;
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined ||
					((key && typeof key === "string") && value === undefined))
			{
				stored = this.get(owner, key);

				return stored !== undefined ?
					stored : this.get(owner, jQuery.camelCase(key));
			}

			// [*]When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function(owner, key)
		{
			var i, name, camel,
				unlock = this.key(owner),
				cache = this.cache[unlock];

			if (key === undefined)
			{
				this.cache[unlock] = {};
			} else
			{
				// Support array or space separated string of keys
				if (jQuery.isArray(key))
				{
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat(key.map(jQuery.camelCase));
				} else
				{
					camel = jQuery.camelCase(key);
					// Try the string as a key before any manipulation
					if (key in cache)
					{
						name = [key, camel];
					} else
					{
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[name] : (name.match(rnotwhite) || []);
					}
				}

				i = name.length;
				while (i--)
				{
					delete cache[name[i]];
				}
			}
		},
		hasData: function(owner)
		{
			return !jQuery.isEmptyObject(
				this.cache[owner[this.expando]] || {}
			);
		},
		discard: function(owner)
		{
			if (owner[this.expando])
			{
				delete this.cache[owner[this.expando]];
			}
		}
	};
	var data_priv = new Data();

	var data_user = new Data();



	/*
		Implementation Summary

		1. Enforce API surface and semantic compatibility with 1.9.x branch
		2. Improve the module's maintainability by reducing the storage
			paths to a single mechanism.
		3. Use the same single mechanism to support "private" and "user" data.
		4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
		5. Avoid exposing implementation details on user objects (eg. expando properties)
		6. Provide a clear path for implementation upgrade to WeakMap in 2014
	*/
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;

	function dataAttr(elem, key, data)
	{
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1)
		{
			name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string")
			{
				try
				{
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test(data) ? jQuery.parseJSON(data) :
						data;
				} catch (e) { }

				// Make sure we set the data so it isn't changed later
				data_user.set(elem, key, data);
			} else
			{
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function(elem)
		{
			return data_user.hasData(elem) || data_priv.hasData(elem);
		},

		data: function(elem, name, data)
		{
			return data_user.access(elem, name, data);
		},

		removeData: function(elem, name)
		{
			data_user.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to data_priv methods, these can be deprecated.
		_data: function(elem, name, data)
		{
			return data_priv.access(elem, name, data);
		},

		_removeData: function(elem, name)
		{
			data_priv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function(key, value)
		{
			var i, name, data,
				elem = this[0],
				attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined)
			{
				if (this.length)
				{
					data = data_user.get(elem);

					if (elem.nodeType === 1 && !data_priv.get(elem, "hasDataAttrs"))
					{
						i = attrs.length;
						while (i--)
						{
							// Support: IE11+
							// The attrs elements can be null (#14894)
							if (attrs[i])
							{
								name = attrs[i].name;
								if (name.indexOf("data-") === 0)
								{
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						data_priv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if (typeof key === "object")
			{
				return this.each(function()
				{
					data_user.set(this, key);
				});
			}

			return access(this, function(value)
			{
				var data,
					camelKey = jQuery.camelCase(key);

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined)
				{
					// Attempt to get data from the cache
					// with the key as-is
					data = data_user.get(elem, key);
					if (data !== undefined)
					{
						return data;
					}

					// Attempt to get data from the cache
					// with the key camelized
					data = data_user.get(elem, camelKey);
					if (data !== undefined)
					{
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, camelKey, undefined);
					if (data !== undefined)
					{
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function()
				{
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = data_user.get(this, camelKey);

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					data_user.set(this, camelKey, value);

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if (key.indexOf("-") !== -1 && data !== undefined)
					{
						data_user.set(this, key, value);
					}
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function(key)
		{
			return this.each(function()
			{
				data_user.remove(this, key);
			});
		}
	});


	jQuery.extend({
		queue: function(elem, type, data)
		{
			var queue;

			if (elem)
			{
				type = (type || "fx") + "queue";
				queue = data_priv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data)
				{
					if (!queue || jQuery.isArray(data))
					{
						queue = data_priv.access(elem, type, jQuery.makeArray(data));
					} else
					{
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function(elem, type)
		{
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks(elem, type),
				next = function()
				{
					jQuery.dequeue(elem, type);
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress")
			{
				fn = queue.shift();
				startLength--;
			}

			if (fn)
			{
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx")
				{
					queue.unshift("inprogress");
				}

				// clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks)
			{
				hooks.empty.fire();
			}
		},

		// not intended for public consumption - generates a queueHooks object, or returns the current one
		_queueHooks: function(elem, type)
		{
			var key = type + "queueHooks";
			return data_priv.get(elem, key) || data_priv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function()
				{
					data_priv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function(type, data)
		{
			var setter = 2;

			if (typeof type !== "string")
			{
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter)
			{
				return jQuery.queue(this[0], type);
			}

			return data === undefined ?
				this :
				this.each(function()
				{
					var queue = jQuery.queue(this, type, data);

					// ensure a hooks for this queue
					jQuery._queueHooks(this, type);

					if (type === "fx" && queue[0] !== "inprogress")
					{
						jQuery.dequeue(this, type);
					}
				});
		},
		dequeue: function(type)
		{
			return this.each(function()
			{
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function(type)
		{
			return this.queue(type || "fx", []);
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function(type, obj)
		{
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function()
				{
					if (!(--count))
					{
						defer.resolveWith(elements, [elements]);
					}
				};

			if (typeof type !== "string")
			{
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--)
			{
				tmp = data_priv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty)
				{
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHidden = function(elem, el)
	{
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
	};

	var rcheckableType = (/^(?:checkbox|radio)$/i);



	(function()
	{
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild(document.createElement("div")),
			input = document.createElement("input");

		// #11217 - WebKit loses check when the name is after the checked attribute
		// Support: Windows Web Apps (WWA)
		// `name` and `type` need .setAttribute for WWA
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
		// old WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Make sure textarea (and checkbox) defaultValue is properly cloned
		// Support: IE9-IE11+
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();
	var strundefined = typeof undefined;



	support.focusinBubbles = "onfocusin" in window;


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue()
	{
		return true;
	}

	function returnFalse()
	{
		return false;
	}

	function safeActiveElement()
	{
		try
		{
			return document.activeElement;
		} catch (err) { }
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
		global: {},

		add: function(elem, types, handler, data, selector)
		{
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData)
			{
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler)
			{
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid)
			{
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events))
			{
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle))
			{
				eventHandle = elemData.handle = function(e)
				{
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--)
			{
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type)
				{
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type]))
				{
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false)
					{
						if (elem.addEventListener)
						{
							elem.addEventListener(type, eventHandle, false);
						}
					}
				}

				if (special.add)
				{
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid)
					{
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector)
				{
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else
				{
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function(elem, types, handler, selector, mappedTypes)
		{
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.hasData(elem) && data_priv.get(elem);

			if (!elemData || !(events = elemData.events))
			{
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--)
			{
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type)
				{
					for (type in events)
					{
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--)
				{
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) &&
						(!handler || handler.guid === handleObj.guid) &&
						(!tmp || tmp.test(handleObj.namespace)) &&
						(!selector || selector === handleObj.selector || selector === "**" && handleObj.selector))
					{
						handlers.splice(j, 1);

						if (handleObj.selector)
						{
							handlers.delegateCount--;
						}
						if (special.remove)
						{
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length)
				{
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false)
					{
						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove the expando if it's no longer used
			if (jQuery.isEmptyObject(events))
			{
				delete elemData.handle;
				data_priv.remove(elem, "events");
			}
		},

		trigger: function(event, data, elem, onlyHandlers)
		{
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [elem || document],
				type = hasOwn.call(event, "type") ? event.type : event,
				namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8)
			{
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered))
			{
				return;
			}

			if (type.indexOf(".") >= 0)
			{
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ?
				event :
				new jQuery.Event(type, typeof event === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target)
			{
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[event] :
				jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false)
			{
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem))
			{
				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type))
				{
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode)
				{
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document))
				{
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped())
			{
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
				if (handle)
				{
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && jQuery.acceptData(cur))
				{
					event.result = handle.apply(cur, data);
					if (event.result === false)
					{
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented())
			{
				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) &&
					jQuery.acceptData(elem))
				{
					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem))
					{
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp)
						{
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp)
						{
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		dispatch: function(event)
		{
			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix(event);

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call(arguments),
				handlers = (data_priv.get(this, "events") || {})[event.type] || [],
				special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false)
			{
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped())
			{
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped())
				{
					// Triggered event must either 1) have no namespace, or
					// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
					if (!event.namespace_re || event.namespace_re.test(handleObj.namespace))
					{
						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler)
								.apply(matched.elem, args);

						if (ret !== undefined)
						{
							if ((event.result = ret) === false)
							{
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch)
			{
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function(event, handlers)
		{
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if (delegateCount && cur.nodeType && (!event.button || event.type !== "click"))
			{
				for (; cur !== this; cur = cur.parentNode || this)
				{
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.disabled !== true || event.type !== "click")
					{
						matches = [];
						for (i = 0; i < delegateCount; i++)
						{
							handleObj = handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matches[sel] === undefined)
							{
								matches[sel] = handleObj.needsContext ?
									jQuery(sel, this).index(cur) >= 0 :
									jQuery.find(sel, this, null, [cur]).length;
							}
							if (matches[sel])
							{
								matches.push(handleObj);
							}
						}
						if (matches.length)
						{
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if (delegateCount < handlers.length)
			{
				handlerQueue.push({ elem: this, handlers: handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(event, original)
			{
				// Add which for key events
				if (event.which == null)
				{
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(event, original)
			{
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if (event.pageX == null && original.clientX != null)
				{
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if (!event.which && button !== undefined)
				{
					event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
				}

				return event;
			}
		},

		fix: function(event)
		{
			if (event[jQuery.expando])
			{
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[type];

			if (!fixHook)
			{
				this.fixHooks[type] = fixHook =
					rmouseEvent.test(type) ? this.mouseHooks :
					rkeyEvent.test(type) ? this.keyHooks :
				{};
			}
			copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

			event = new jQuery.Event(originalEvent);

			i = copy.length;
			while (i--)
			{
				prop = copy[i];
				event[prop] = originalEvent[prop];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if (!event.target)
			{
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome < 28
			// Target should not be a text node (#504, #13143)
			if (event.target.nodeType === 3)
			{
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
		},

		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function()
				{
					if (this !== safeActiveElement() && this.focus)
					{
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function()
				{
					if (this === safeActiveElement() && this.blur)
					{
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function()
				{
					if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input"))
					{
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function(event)
				{
					return jQuery.nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function(event)
				{
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent)
					{
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},

		simulate: function(type, elem, event, bubble)
		{
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if (bubble)
			{
				jQuery.event.trigger(e, null, elem);
			} else
			{
				jQuery.event.dispatch.call(elem, e);
			}
			if (e.isDefaultPrevented())
			{
				event.preventDefault();
			}
		}
	};

	jQuery.removeEvent = function(elem, type, handle)
	{
		if (elem.removeEventListener)
		{
			elem.removeEventListener(type, handle, false);
		}
	};

	jQuery.Event = function(src, props)
	{
		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event))
		{
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type)
		{
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
					// Support: Android < 4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

			// Event type
		} else
		{
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props)
		{
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function()
		{
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && e.preventDefault)
			{
				e.preventDefault();
			}
		},
		stopPropagation: function()
		{
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && e.stopPropagation)
			{
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function()
		{
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && e.stopImmediatePropagation)
			{
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// Support: Chrome 15+
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function(orig, fix)
	{
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function(event)
			{
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || (related !== target && !jQuery.contains(target, related)))
				{
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	// Create "bubbling" focus and blur events
	// Support: Firefox, Chrome, Safari
	if (!support.focusinBubbles)
	{
		jQuery.each({ focus: "focusin", blur: "focusout" }, function(orig, fix)
		{
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function(event)
			{
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
			};

			jQuery.event.special[fix] = {
				setup: function()
				{
					var doc = this.ownerDocument || this,
						attaches = data_priv.access(doc, fix);

					if (!attaches)
					{
						doc.addEventListener(orig, handler, true);
					}
					data_priv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function()
				{
					var doc = this.ownerDocument || this,
						attaches = data_priv.access(doc, fix) - 1;

					if (!attaches)
					{
						doc.removeEventListener(orig, handler, true);
						data_priv.remove(doc, fix);
					} else
					{
						data_priv.access(doc, fix, attaches);
					}
				}
			};
		});
	}

	jQuery.fn.extend({
		on: function(types, selector, data, fn, /*INTERNAL*/ one)
		{
			var origFn, type;

			// Types can be a map of types/handlers
			if (typeof types === "object")
			{
				// ( types-Object, selector, data )
				if (typeof selector !== "string")
				{
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for (type in types)
				{
					this.on(type, selector, data, types[type], one);
				}
				return this;
			}

			if (data == null && fn == null)
			{
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if (fn == null)
			{
				if (typeof selector === "string")
				{
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else
				{
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if (fn === false)
			{
				fn = returnFalse;
			} else if (!fn)
			{
				return this;
			}

			if (one === 1)
			{
				origFn = fn;
				fn = function(event)
				{
					// Can use an empty set, since event contains the info
					jQuery().off(event);
					return origFn.apply(this, arguments);
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
			}
			return this.each(function()
			{
				jQuery.event.add(this, types, fn, data, selector);
			});
		},
		one: function(types, selector, data, fn)
		{
			return this.on(types, selector, data, fn, 1);
		},
		off: function(types, selector, fn)
		{
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj)
			{
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if (typeof types === "object")
			{
				// ( types-object [, selector] )
				for (type in types)
				{
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function")
			{
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false)
			{
				fn = returnFalse;
			}
			return this.each(function()
			{
				jQuery.event.remove(this, types, fn, selector);
			});
		},

		trigger: function(type, data)
		{
			return this.each(function()
			{
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function(type, data)
		{
			var elem = this[0];
			if (elem)
			{
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

		// We have to close these tags to support XHTML (#13200)
		wrapMap = {
			// Support: IE 9
			option: [1, "<select multiple='multiple'>", "</select>"],

			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

			_default: [0, "", ""]
		};

	// Support: IE 9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	// Support: 1.x compatibility
	// Manipulating tables requires a tbody
	function manipulationTarget(elem, content)
	{
		return jQuery.nodeName(elem, "table") &&
			jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ?

			elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild(elem.ownerDocument.createElement("tbody")) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem)
	{
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem)
	{
		var match = rscriptTypeMasked.exec(elem.type);

		if (match)
		{
			elem.type = match[1];
		} else
		{
			elem.removeAttribute("type");
		}

		return elem;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements)
	{
		var i = 0,
			l = elems.length;

		for (; i < l; i++)
		{
			data_priv.set(
				elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval")
			);
		}
	}

	function cloneCopyEvent(src, dest)
	{
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1)
		{
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (data_priv.hasData(src))
		{
			pdataOld = data_priv.access(src);
			pdataCur = data_priv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events)
			{
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events)
				{
					for (i = 0, l = events[type].length; i < l; i++)
					{
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (data_user.hasData(src))
		{
			udataOld = data_user.access(src);
			udataCur = jQuery.extend({}, udataOld);

			data_user.set(dest, udataCur);
		}
	}

	function getAll(context, tag)
	{
		var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") :
				context.querySelectorAll ? context.querySelectorAll(tag || "*") :
				[];

		return tag === undefined || tag && jQuery.nodeName(context, tag) ?
			jQuery.merge([context], ret) :
			ret;
	}

	// Support: IE >= 9
	function fixInput(src, dest)
	{
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type))
		{
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea")
		{
			dest.defaultValue = src.defaultValue;
		}
	}

	jQuery.extend({
		clone: function(elem, dataAndEvents, deepDataAndEvents)
		{
			var i, l, srcElements, destElements,
				clone = elem.cloneNode(true),
				inPage = jQuery.contains(elem.ownerDocument, elem);

			// Support: IE >= 9
			// Fix Cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
					!jQuery.isXMLDoc(elem))
			{
				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++)
				{
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents)
			{
				if (deepDataAndEvents)
				{
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++)
					{
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else
				{
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0)
			{
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		buildFragment: function(elems, context, scripts, selection)
		{
			var elem, tmp, tag, wrap, contains, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;

			for (; i < l; i++)
			{
				elem = elems[i];

				if (elem || elem === 0)
				{
					// Add nodes directly
					if (jQuery.type(elem) === "object")
					{
						// Support: QtWebKit
						// jQuery.merge because push.apply(_, arraylike) throws
						jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

						// Convert non-html into a text node
					} else if (!rhtml.test(elem))
					{
						nodes.push(context.createTextNode(elem));

						// Convert html into DOM nodes
					} else
					{
						tmp = tmp || fragment.appendChild(context.createElement("div"));

						// Deserialize a standard representation
						tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
						wrap = wrapMap[tag] || wrapMap._default;
						tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

						// Descend through wrappers to the right content
						j = wrap[0];
						while (j--)
						{
							tmp = tmp.lastChild;
						}

						// Support: QtWebKit
						// jQuery.merge because push.apply(_, arraylike) throws
						jQuery.merge(nodes, tmp.childNodes);

						// Remember the top-level container
						tmp = fragment.firstChild;

						// Fixes #12346
						// Support: Webkit, IE
						tmp.textContent = "";
					}
				}
			}

			// Remove wrapper from fragment
			fragment.textContent = "";

			i = 0;
			while ((elem = nodes[i++]))
			{
				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if (selection && jQuery.inArray(elem, selection) !== -1)
				{
					continue;
				}

				contains = jQuery.contains(elem.ownerDocument, elem);

				// Append to fragment
				tmp = getAll(fragment.appendChild(elem), "script");

				// Preserve script evaluation history
				if (contains)
				{
					setGlobalEval(tmp);
				}

				// Capture executables
				if (scripts)
				{
					j = 0;
					while ((elem = tmp[j++]))
					{
						if (rscriptType.test(elem.type || ""))
						{
							scripts.push(elem);
						}
					}
				}
			}

			return fragment;
		},

		cleanData: function(elems)
		{
			var data, elem, type, key,
				special = jQuery.event.special,
				i = 0;

			for (; (elem = elems[i]) !== undefined; i++)
			{
				if (jQuery.acceptData(elem))
				{
					key = elem[data_priv.expando];

					if (key && (data = data_priv.cache[key]))
					{
						if (data.events)
						{
							for (type in data.events)
							{
								if (special[type])
								{
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else
								{
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}
						if (data_priv.cache[key])
						{
							// Discard any remaining `private` data
							delete data_priv.cache[key];
						}
					}
				}
				// Discard any remaining `user` data
				delete data_user.cache[elem[data_user.expando]];
			}
		}
	});

	jQuery.fn.extend({
		text: function(value)
		{
			return access(this, function(value)
			{
				return value === undefined ?
					jQuery.text(this) :
					this.empty().each(function()
					{
						if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9)
						{
							this.textContent = value;
						}
					});
			}, null, value, arguments.length);
		},

		append: function()
		{
			return this.domManip(arguments, function(elem)
			{
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9)
				{
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function()
		{
			return this.domManip(arguments, function(elem)
			{
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9)
				{
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function()
		{
			return this.domManip(arguments, function(elem)
			{
				if (this.parentNode)
				{
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function()
		{
			return this.domManip(arguments, function(elem)
			{
				if (this.parentNode)
				{
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		remove: function(selector, keepData /* Internal Use Only */)
		{
			var elem,
				elems = selector ? jQuery.filter(selector, this) : this,
				i = 0;

			for (; (elem = elems[i]) != null; i++)
			{
				if (!keepData && elem.nodeType === 1)
				{
					jQuery.cleanData(getAll(elem));
				}

				if (elem.parentNode)
				{
					if (keepData && jQuery.contains(elem.ownerDocument, elem))
					{
						setGlobalEval(getAll(elem, "script"));
					}
					elem.parentNode.removeChild(elem);
				}
			}

			return this;
		},

		empty: function()
		{
			var elem,
				i = 0;

			for (; (elem = this[i]) != null; i++)
			{
				if (elem.nodeType === 1)
				{
					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function(dataAndEvents, deepDataAndEvents)
		{
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function()
			{
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function(value)
		{
			return access(this, function(value)
			{
				var elem = this[0] || {},
					i = 0,
					l = this.length;

				if (value === undefined && elem.nodeType === 1)
				{
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) &&
					!wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()])
				{
					value = value.replace(rxhtmlTag, "<$1></$2>");

					try
					{
						for (; i < l; i++)
						{
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1)
							{
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) { }
				}

				if (elem)
				{
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function()
		{
			var arg = arguments[0];

			// Make the changes, replacing each context element with the new content
			this.domManip(arguments, function(elem)
			{
				arg = this.parentNode;

				jQuery.cleanData(getAll(this));

				if (arg)
				{
					arg.replaceChild(elem, this);
				}
			});

			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},

		detach: function(selector)
		{
			return this.remove(selector, true);
		},

		domManip: function(args, callback)
		{
			// Flatten any nested arrays
			args = concat.apply([], args);

			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[0],
				isFunction = jQuery.isFunction(value);

			// We can't cloneNode fragments that contain checked, in WebKit
			if (isFunction ||
					(l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test(value)))
			{
				return this.each(function(index)
				{
					var self = set.eq(index);
					if (isFunction)
					{
						args[0] = value.call(this, index, self.html());
					}
					self.domManip(args, callback);
				});
			}

			if (l)
			{
				fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
				first = fragment.firstChild;

				if (fragment.childNodes.length === 1)
				{
					fragment = first;
				}

				if (first)
				{
					scripts = jQuery.map(getAll(fragment, "script"), disableScript);
					hasScripts = scripts.length;

					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for (; i < l; i++)
					{
						node = fragment;

						if (i !== iNoClone)
						{
							node = jQuery.clone(node, true, true);

							// Keep references to cloned scripts for later restoration
							if (hasScripts)
							{
								// Support: QtWebKit
								// jQuery.merge because push.apply(_, arraylike) throws
								jQuery.merge(scripts, getAll(node, "script"));
							}
						}

						callback.call(this[i], node, i);
					}

					if (hasScripts)
					{
						doc = scripts[scripts.length - 1].ownerDocument;

						// Reenable scripts
						jQuery.map(scripts, restoreScript);

						// Evaluate executable scripts on first document insertion
						for (i = 0; i < hasScripts; i++)
						{
							node = scripts[i];
							if (rscriptType.test(node.type || "") &&
								!data_priv.access(node, "globalEval") && jQuery.contains(doc, node))
							{
								if (node.src)
								{
									// Optional AJAX dependency, but won't run scripts if not present
									if (jQuery._evalUrl)
									{
										jQuery._evalUrl(node.src);
									}
								} else
								{
									jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
								}
							}
						}
					}
				}
			}

			return this;
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(name, original)
	{
		jQuery.fn[name] = function(selector)
		{
			var elems,
				ret = [],
				insert = jQuery(selector),
				last = insert.length - 1,
				i = 0;

			for (; i <= last; i++)
			{
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});


	var iframe,
		elemdisplay = {};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	// Called only from within defaultDisplay
	function actualDisplay(name, doc)
	{
		var style,
			elem = jQuery(doc.createElement(name)).appendTo(doc.body),

			// getDefaultComputedStyle might be reliably used only on attached element
			display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ?

				// Use of this method is a temporary fix (more like optmization) until something better comes along,
				// since it was removed from specification and supported only in FF
				style.display : jQuery.css(elem[0], "display");

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay(nodeName)
	{
		var doc = document,
			display = elemdisplay[nodeName];

		if (!display)
		{
			display = actualDisplay(nodeName, doc);

			// If the simple way fails, read from inside an iframe
			if (display === "none" || !display)
			{
				// Use the already-created iframe if possible
				iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[0].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay(nodeName, doc);
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[nodeName] = display;
		}

		return display;
	}
	var rmargin = (/^margin/);

	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function(elem)
	{
		return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
	};



	function curCSS(elem, name, computed)
	{
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles(elem);

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		if (computed)
		{
			ret = computed.getPropertyValue(name) || computed[name];
		}

		if (computed)
		{
			if (ret === "" && !jQuery.contains(elem.ownerDocument, elem))
			{
				ret = jQuery.style(elem, name);
			}

			// Support: iOS < 6
			// A tribute to the "awesome hack by Dean Edwards"
			// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if (rnumnonpx.test(ret) && rmargin.test(name))
			{
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?
			// Support: IE
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf(conditionFn, hookFn)
	{
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function()
			{
				if (conditionFn())
				{
					// Hook not needed (or it's not possible to use it due to missing dependency),
					// remove it.
					// Since there are no other hooks for marginRight, remove the whole object.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.

				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}


	(function()
	{
		var pixelPositionVal, boxSizingReliableVal,
			docElem = document.documentElement,
			container = document.createElement("div"),
			div = document.createElement("div");

		if (!div.style)
		{
			return;
		}

		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
			"position:absolute";
		container.appendChild(div);

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computePixelPositionAndBoxSizingReliable()
		{
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
				"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
				"border:1px;padding:1px;width:4px;position:absolute";
			div.innerHTML = "";
			docElem.appendChild(container);

			var divStyle = window.getComputedStyle(div, null);
			pixelPositionVal = divStyle.top !== "1%";
			boxSizingReliableVal = divStyle.width === "4px";

			docElem.removeChild(container);
		}

		// Support: node.js jsdom
		// Don't assume that getComputedStyle is a property of the global object
		if (window.getComputedStyle)
		{
			jQuery.extend(support, {
				pixelPosition: function()
				{
					// This test is executed only once but we still do memoizing
					// since we can use the boxSizingReliable pre-computing.
					// No need to check if the test was already performed, though.
					computePixelPositionAndBoxSizingReliable();
					return pixelPositionVal;
				},
				boxSizingReliable: function()
				{
					if (boxSizingReliableVal == null)
					{
						computePixelPositionAndBoxSizingReliable();
					}
					return boxSizingReliableVal;
				},
				reliableMarginRight: function()
				{
					// Support: Android 2.3
					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// This support function is only executed once so no memoizing is needed.
					var ret,
						marginDiv = div.appendChild(document.createElement("div"));

					// Reset CSS: box-sizing; display; margin; border; padding
					marginDiv.style.cssText = div.style.cssText =
						// Support: Firefox<29, Android 2.3
						// Vendor-prefix box-sizing
						"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
						"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					docElem.appendChild(container);

					ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);

					docElem.removeChild(container);

					return ret;
				}
			});
		}
	})();


	// A method for quickly swapping in/out CSS properties to get correct calculations.
	jQuery.swap = function(elem, options, callback, args)
	{
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for (name in options)
		{
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options)
		{
			elem.style[name] = old[name];
		}

		return ret;
	};


	var
		// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
		// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
		rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = ["Webkit", "O", "Moz", "ms"];

	// return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(style, name)
	{
		// shortcut for names that are not vendor prefixed
		if (name in style)
		{
			return name;
		}

		// check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;

		while (i--)
		{
			name = cssPrefixes[i] + capName;
			if (name in style)
			{
				return name;
			}
		}

		return origName;
	}

	function setPositiveNumber(elem, value, subtract)
	{
		var matches = rnumsplit.exec(value);
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") :
			value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles)
	{
		var i = extra === (isBorderBox ? "border" : "content") ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for (; i < 4; i += 2)
		{
			// both box models exclude margin, so add it if we want it
			if (extra === "margin")
			{
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox)
			{
				// border-box includes padding, so remove it if we want content
				if (extra === "content")
				{
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// at this point, extra isn't border nor margin, so remove border
				if (extra !== "margin")
				{
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else
			{
				// at this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// at this point, extra isn't content nor padding, so add border
				if (extra !== "padding")
				{
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra)
	{
		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles(elem),
			isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if (val <= 0 || val == null)
		{
			// Fall back to computed then uncomputed css if necessary
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null)
			{
				val = elem.style[name];
			}

			// Computed unit is not pixels. Stop here and return.
			if (rnumnonpx.test(val))
			{
				return val;
			}

			// we need the check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				(support.boxSizingReliable() || val === elem.style[name]);

			// Normalize "", auto, and prepare for extra
			val = parseFloat(val) || 0;
		}

		// use the active box-sizing model to add/subtract irrelevant styles
		return (val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || (isBorderBox ? "border" : "content"),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide(elements, show)
	{
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for (; index < length; index++)
		{
			elem = elements[index];
			if (!elem.style)
			{
				continue;
			}

			values[index] = data_priv.get(elem, "olddisplay");
			display = elem.style.display;
			if (show)
			{
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if (!values[index] && display === "none")
				{
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if (elem.style.display === "" && isHidden(elem))
				{
					values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
				}
			} else
			{
				hidden = isHidden(elem);

				if (display !== "none" || !hidden)
				{
					data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for (index = 0; index < length; index++)
		{
			elem = elements[index];
			if (!elem.style)
			{
				continue;
			}
			if (!show || elem.style.display === "none" || elem.style.display === "")
			{
				elem.style.display = show ? values[index] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function(elem, computed)
				{
					if (computed)
					{
						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			// normalize float css property
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function(elem, name, value, extra)
		{
			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style)
			{
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase(name),
				style = elem.style;

			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));

			// gets hook for the prefixed version
			// followed by the unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined)
			{
				type = typeof value;

				// convert relative number strings (+= or -=) to relative numbers. #7345
				if (type === "string" && (ret = rrelNum.exec(value)))
				{
					value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set. See: #7116
				if (value == null || value !== value)
				{
					return;
				}

				// If a number was passed in, add 'px' to the (except for certain CSS properties)
				if (type === "number" && !jQuery.cssNumber[origName])
				{
					value += "px";
				}

				// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
				// but it would mean to define eight (for every problematic property) identical functions
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0)
				{
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined)
				{
					style[name] = value;
				}
			} else
			{
				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined)
				{
					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function(elem, name, extra, styles)
		{
			var val, num, hooks,
				origName = jQuery.camelCase(name);

			// Make sure that we're working with the right name
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));

			// gets hook for the prefixed version
			// followed by the unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks)
			{
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined)
			{
				val = curCSS(elem, name, styles);
			}

			//convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform)
			{
				val = cssNormalTransform[name];
			}

			// Return, converting to number if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra)
			{
				num = parseFloat(val);
				return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each(["height", "width"], function(i, name)
	{
		jQuery.cssHooks[name] = {
			get: function(elem, computed, extra)
			{
				if (computed)
				{
					// certain elements can have dimension info if we invisibly show them
					// however, it must have a current display style that would benefit from this
					return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ?
						jQuery.swap(elem, cssShow, function()
						{
							return getWidthOrHeight(elem, name, extra);
						}) :
						getWidthOrHeight(elem, name, extra);
				}
			},

			set: function(elem, value, extra)
			{
				var styles = extra && getStyles(elem);
				return setPositiveNumber(elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css(elem, "boxSizing", false, styles) === "border-box",
						styles
					) : 0
				);
			}
		};
	});

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight,
		function(elem, computed)
		{
			if (computed)
			{
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap(elem, { "display": "inline-block" },
					curCSS, [elem, "marginRight"]);
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(prefix, suffix)
	{
		jQuery.cssHooks[prefix + suffix] = {
			expand: function(value)
			{
				var i = 0,
					expanded = {},

					// assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++)
				{
					expanded[prefix + cssExpand[i] + suffix] =
						parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix))
		{
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function(name, value)
		{
			return access(this, function(elem, name, value)
			{
				var styles, len,
					map = {},
					i = 0;

				if (jQuery.isArray(name))
				{
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++)
					{
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style(elem, name, value) :
					jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		},
		show: function()
		{
			return showHide(this, true);
		},
		hide: function()
		{
			return showHide(this);
		},
		toggle: function(state)
		{
			if (typeof state === "boolean")
			{
				return state ? this.show() : this.hide();
			}

			return this.each(function()
			{
				if (isHidden(this))
				{
					jQuery(this).show();
				} else
				{
					jQuery(this).hide();
				}
			});
		}
	});


	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function(time, type)
	{
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function(next, hooks)
		{
			var timeout = setTimeout(next, time);
			hooks.stop = function()
			{
				clearTimeout(timeout);
			};
		});
	};


	(function()
	{
		var input = document.createElement("input"),
			select = document.createElement("select"),
			opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: iOS 5.1, Android 4.x, Android 2.3
		// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
		support.checkOn = input.value !== "";

		// Must access the parent to make an option select properly
		// Support: IE9, IE10
		support.optSelected = opt.selected;

		// Make sure that the options inside disabled selects aren't marked as disabled
		// (WebKit marks them as disabled)
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Check if an input maintains its value after becoming a radio
		// Support: IE9, IE10
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();


	var rclass = /[\t\r\n\f]/g;

	jQuery.fn.extend({
		addClass: function(value)
		{
			var classes, elem, cur, clazz, j, finalValue,
				proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;

			if (jQuery.isFunction(value))
			{
				return this.each(function(j)
				{
					jQuery(this).addClass(value.call(this, j, this.className));
				});
			}

			if (proceed)
			{
				// The disjunction here is for better compressibility (see removeClass)
				classes = (value || "").match(rnotwhite) || [];

				for (; i < len; i++)
				{
					elem = this[i];
					cur = elem.nodeType === 1 && (elem.className ?
						(" " + elem.className + " ").replace(rclass, " ") :
						" "
					);

					if (cur)
					{
						j = 0;
						while ((clazz = classes[j++]))
						{
							if (cur.indexOf(" " + clazz + " ") < 0)
							{
								cur += clazz + " ";
							}
						}

						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim(cur);
						if (elem.className !== finalValue)
						{
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		removeClass: function(value)
		{
			var classes, elem, cur, clazz, j, finalValue,
				proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;

			if (jQuery.isFunction(value))
			{
				return this.each(function(j)
				{
					jQuery(this).removeClass(value.call(this, j, this.className));
				});
			}
			if (proceed)
			{
				classes = (value || "").match(rnotwhite) || [];

				for (; i < len; i++)
				{
					elem = this[i];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && (elem.className ?
						(" " + elem.className + " ").replace(rclass, " ") :
						""
					);

					if (cur)
					{
						j = 0;
						while ((clazz = classes[j++]))
						{
							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") >= 0)
							{
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim(cur) : "";
						if (elem.className !== finalValue)
						{
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		toggleClass: function(value, stateVal)
		{
			var type = typeof value;

			if (typeof stateVal === "boolean" && type === "string")
			{
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value))
			{
				return this.each(function(i)
				{
					jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
				});
			}

			return this.each(function()
			{
				if (type === "string")
				{
					// toggle individual class names
					var className,
						i = 0,
						self = jQuery(this),
						classNames = value.match(rnotwhite) || [];

					while ((className = classNames[i++]))
					{
						// check each className given, space separated list
						if (self.hasClass(className))
						{
							self.removeClass(className);
						} else
						{
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (type === strundefined || type === "boolean")
				{
					if (this.className)
					{
						// store className if set
						data_priv.set(this, "__className__", this.className);
					}

					// If the element has a class name or if we're passed "false",
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : data_priv.get(this, "__className__") || "";
				}
			});
		},

		hasClass: function(selector)
		{
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for (; i < l; i++)
			{
				if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0)
				{
					return true;
				}
			}

			return false;
		}
	});




	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function(value)
		{
			var hooks, ret, isFunction,
				elem = this[0];

			if (!arguments.length)
			{
				if (elem)
				{
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined)
					{
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?
						// handle most common string cases
						ret.replace(rreturn, "") :
						// handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function(i)
			{
				var val;

				if (this.nodeType !== 1)
				{
					return;
				}

				if (isFunction)
				{
					val = value.call(this, i, jQuery(this).val());
				} else
				{
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null)
				{
					val = "";
				} else if (typeof val === "number")
				{
					val += "";
				} else if (jQuery.isArray(val))
				{
					val = jQuery.map(val, function(value)
					{
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined)
				{
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function(elem)
				{
					var val = jQuery.find.attr(elem, "value");
					return val != null ?
						val :
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						jQuery.trim(jQuery.text(elem));
				}
			},
			select: {
				get: function(elem)
				{
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
						max :
							one ? index : 0;

					// Loop through all the selected options
					for (; i < max; i++)
					{
						option = options[i];

						// IE6-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) &&
							// Don't return options that are disabled or in a disabled optgroup
								(support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
								(!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup")))
						{
							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one)
							{
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function(elem, value)
				{
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray(value),
						i = options.length;

					while (i--)
					{
						option = options[i];
						if ((option.selected = jQuery.inArray(option.value, values) >= 0))
						{
							optionSet = true;
						}
					}

					// force browsers to behave consistently when non-matching value is set
					if (!optionSet)
					{
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function()
	{
		jQuery.valHooks[this] = {
			set: function(elem, value)
			{
				if (jQuery.isArray(value))
				{
					return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
				}
			}
		};
		if (!support.checkOn)
		{
			jQuery.valHooks[this].get = function(elem)
			{
				// Support: Webkit
				// "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});




	// Return jQuery for attributes-only inclusion


	jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name)
		{
			// Handle event binding
			jQuery.fn[name] = function(data, fn)
			{
				return arguments.length > 0 ?
					this.on(name, null, data, fn) :
					this.trigger(name);
			};
		});

	jQuery.fn.extend({
		hover: function(fnOver, fnOut)
		{
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		},

		bind: function(types, data, fn)
		{
			return this.on(types, null, data, fn);
		},
		unbind: function(types, fn)
		{
			return this.off(types, null, fn);
		},

		delegate: function(selector, types, data, fn)
		{
			return this.on(types, selector, data, fn);
		},
		undelegate: function(selector, types, fn)
		{
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		}
	});


	var nonce = jQuery.now();

	var rquery = (/\?/);



	var
		// Document location
		ajaxLocParts,
		ajaxLocation,

		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

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

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat("*");

	// #8138, IE may throw an exception when accessing
	// a field from window.location if document.domain has been set
	try
	{
		ajaxLocation = location.href;
	} catch (e)
	{
		// Use the href attribute of an A element
		// since IE will modify it given document.location
		ajaxLocation = document.createElement("a");
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href;
	}

	// Segment location into parts
	ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure)
	{
		// dataTypeExpression is optional and defaults to "*"
		return function(dataTypeExpression, func)
		{
			if (typeof dataTypeExpression !== "string")
			{
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

			if (jQuery.isFunction(func))
			{
				// For each dataType in the dataTypeExpression
				while ((dataType = dataTypes[i++]))
				{
					// Prepend if requested
					if (dataType[0] === "+")
					{
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else
					{
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR)
	{
		var inspected = {},
			seekingTransport = (structure === transports);

		function inspect(dataType)
		{
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory)
			{
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport])
				{
					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport)
				{
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src)
	{
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src)
		{
			if (src[key] !== undefined)
			{
				(flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
			}
		}
		if (deep)
		{
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses(s, jqXHR, responses)
	{
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*")
		{
			dataTypes.shift();
			if (ct === undefined)
			{
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct)
		{
			for (type in contents)
			{
				if (contents[type] && contents[type].test(ct))
				{
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses)
		{
			finalDataType = dataTypes[0];
		} else
		{
			// Try convertible dataTypes
			for (type in responses)
			{
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]])
				{
					finalDataType = type;
					break;
				}
				if (!firstDataType)
				{
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType)
		{
			if (finalDataType !== dataTypes[0])
			{
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert(s, response, jqXHR, isSuccess)
	{
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1])
		{
			for (conv in s.converters)
			{
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current)
		{
			if (s.responseFields[current])
			{
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter)
			{
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current)
			{
				// There's only work to do if current dataType is non-auto
				if (current === "*")
				{
					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current)
				{
					// Seek a direct converter
					conv = converters[prev + " " + current] || converters["* " + current];

					// If none found, seek a pair
					if (!conv)
					{
						for (conv2 in converters)
						{
							// If conv2 outputs current
							tmp = conv2.split(" ");
							if (tmp[1] === current)
							{
								// If prev can be converted to accepted input
								conv = converters[prev + " " + tmp[0]] ||
									converters["* " + tmp[0]];
								if (conv)
								{
									// Condense equivalence converters
									if (conv === true)
									{
										conv = converters[conv2];

										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true)
									{
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if (conv !== true)
					{
						// Unless errors are allowed to bubble, catch and return them
						if (conv && s["throws"])
						{
							response = conv(response);
						} else
						{
							try
							{
								response = conv(response);
							} catch (e)
							{
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({
		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test(ajaxLocParts[1]),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function(target, settings)
		{
			return settings ?

				// Building a settings object
				ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

				// Extending ajaxSettings
				ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function(url, options)
		{
			// If url is an object, simulate pre-1.5 signature
			if (typeof url === "object")
			{
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Create the final options object
				s = jQuery.ajaxSetup({}, options),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ?
					jQuery(callbackContext) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function(key)
					{
						var match;
						if (state === 2)
						{
							if (!responseHeaders)
							{
								responseHeaders = {};
								while ((match = rheaders.exec(responseHeadersString)))
								{
									responseHeaders[match[1].toLowerCase()] = match[2];
								}
							}
							match = responseHeaders[key.toLowerCase()];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function()
					{
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function(name, value)
					{
						var lname = name.toLowerCase();
						if (!state)
						{
							name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
							requestHeaders[name] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function(type)
					{
						if (!state)
						{
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function(map)
					{
						var code;
						if (map)
						{
							if (state < 2)
							{
								for (code in map)
								{
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[code] = [statusCode[code], map[code]];
								}
							} else
							{
								// Execute the appropriate callbacks
								jqXHR.always(map[jqXHR.status]);
							}
						}
						return this;
					},

					// Cancel the request
					abort: function(statusText)
					{
						var finalText = statusText || strAbort;
						if (transport)
						{
							transport.abort(finalText);
						}
						done(0, finalText);
						return this;
					}
				};

			// Attach deferreds
			deferred.promise(jqXHR).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "")
				.replace(rprotocol, ajaxLocParts[1] + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if (s.crossDomain == null)
			{
				parts = rurl.exec(s.url.toLowerCase());
				s.crossDomain = !!(parts &&
					(parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
						(parts[3] || (parts[1] === "http:" ? "80" : "443")) !==
							(ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))
				);
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string")
			{
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (state === 2)
			{
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			fireGlobals = s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0)
			{
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if (!s.hasContent)
			{
				// If data is available, append data to url
				if (s.data)
				{
					cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if (s.cache === false)
				{
					s.url = rts.test(cacheURL) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace(rts, "$1_=" + nonce++) :

						// Otherwise add one to the end
						cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified)
			{
				if (jQuery.lastModified[cacheURL])
				{
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL])
				{
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType)
			{
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
					s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
					s.accepts["*"]
			);

			// Check for headers option
			for (i in s.headers)
			{
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2))
			{
				// Abort if not done already and return
				return jqXHR.abort();
			}

			// aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for (i in { success: 1, error: 1, complete: 1 })
			{
				jqXHR[i](s[i]);
			}

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport)
			{
				done(-1, "No Transport");
			} else
			{
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals)
				{
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}
				// Timeout
				if (s.async && s.timeout > 0)
				{
					timeoutTimer = setTimeout(function()
					{
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try
				{
					state = 1;
					transport.send(requestHeaders, done);
				} catch (e)
				{
					// Propagate exception as error if not done
					if (state < 2)
					{
						done(-1, e);
						// Simply rethrow otherwise
					} else
					{
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers)
			{
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if (state === 2)
				{
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if (timeoutTimer)
				{
					clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses)
				{
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess)
				{
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified)
					{
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified)
						{
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified)
						{
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD")
					{
						statusText = "nocontent";

						// if not modified
					} else if (status === 304)
					{
						statusText = "notmodified";

						// If we have data, let's convert it
					} else
					{
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else
				{
					// We extract error from statusText
					// then normalize statusText and status for non-aborts
					error = statusText;
					if (status || !statusText)
					{
						statusText = "error";
						if (status < 0)
						{
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess)
				{
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else
				{
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(statusCode);
				statusCode = undefined;

				if (fireGlobals)
				{
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError",
						[jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals)
				{
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
					// Handle the global AJAX counter
					if (!(--jQuery.active))
					{
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function(url, data, callback)
		{
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function(url, callback)
		{
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function(i, method)
	{
		jQuery[method] = function(url, data, callback, type)
		{
			// shift arguments if data argument was omitted
			if (jQuery.isFunction(data))
			{
				type = type || callback;
				callback = data;
				data = undefined;
			}

			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type)
	{
		jQuery.fn[type] = function(fn)
		{
			return this.on(type, fn);
		};
	});


	jQuery._evalUrl = function(url)
	{
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};


	jQuery.expr.filters.hidden = function(elem)
	{
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};
	jQuery.expr.filters.visible = function(elem)
	{
		return !jQuery.expr.filters.hidden(elem);
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add)
	{
		var name;

		if (jQuery.isArray(obj))
		{
			// Serialize array item.
			jQuery.each(obj, function(i, v)
			{
				if (traditional || rbracket.test(prefix))
				{
					// Treat each array item as a scalar.
					add(prefix, v);
				} else
				{
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object")
		{
			// Serialize object item.
			for (name in obj)
			{
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else
		{
			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function(a, traditional)
	{
		var prefix,
			s = [],
			add = function(key, value)
			{
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
				s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if (traditional === undefined)
		{
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a)))
		{
			// Serialize the form elements
			jQuery.each(a, function()
			{
				add(this.name, this.value);
			});
		} else
		{
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a)
			{
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(r20, "+");
	};

	jQuery.fn.extend({
		serialize: function()
		{
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function()
		{
			return this.map(function()
			{
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			})
			.filter(function()
			{
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") &&
					rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
					(this.checked || !rcheckableType.test(type));
			})
			.map(function(i, elem)
			{
				var val = jQuery(this).val();

				return val == null ?
					null :
					jQuery.isArray(val) ?
						jQuery.map(val, function(val)
						{
							return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
						}) :
					{ name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});


	jQuery.ajaxSettings.xhr = function()
	{
		try
		{
			return new XMLHttpRequest();
		} catch (e) { }
	};

	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			// file protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	// Support: IE9
	// Open requests must be manually aborted on unload (#5280)
	if (window.ActiveXObject)
	{
		jQuery(window).on("unload", function()
		{
			for (var key in xhrCallbacks)
			{
				xhrCallbacks[key]();
			}
		});
	}

	support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function(options)
	{
		var callback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain)
		{
			return {
				send: function(headers, complete)
				{
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields)
					{
						for (i in options.xhrFields)
						{
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType)
					{
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"])
					{
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers)
					{
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					callback = function(type)
					{
						return function()
						{
							if (callback)
							{
								delete xhrCallbacks[id];
								callback = xhr.onload = xhr.onerror = null;

								if (type === "abort")
								{
									xhr.abort();
								} else if (type === "error")
								{
									complete(
										// file: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								} else
								{
									complete(
										xhrSuccessStatus[xhr.status] || xhr.status,
										xhr.statusText,
										// Support: IE9
										// Accessing binary-data responseText throws an exception
										// (#11426)
										typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined,
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					xhr.onerror = callback("error");

					// Create the abort callback
					callback = xhrCallbacks[id] = callback("abort");

					try
					{
						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e)
					{
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (callback)
						{
							throw e;
						}
					}
				},

				abort: function()
				{
					if (callback)
					{
						callback();
					}
				}
			};
		}
	});




	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function(data, context, keepScripts)
	{
		if (!data || typeof data !== "string")
		{
			return null;
		}
		if (typeof context === "boolean")
		{
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec(data),
			scripts = !keepScripts && [];

		// Single tag
		if (parsed)
		{
			return [context.createElement(parsed[1])];
		}

		parsed = jQuery.buildFragment([data], context, scripts);

		if (scripts && scripts.length)
		{
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};


	var docElem = window.document.documentElement;

	/**
	 * Gets a window from an element
	 */
	function getWindow(elem)
	{
		return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function(elem, options, i)
		{
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css(elem, "position"),
				curElem = jQuery(elem),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static")
			{
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") &&
				(curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
			if (calculatePosition)
			{
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else
			{
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options))
			{
				options = options.call(elem, i, curOffset);
			}

			if (options.top != null)
			{
				props.top = (options.top - curOffset.top) + curTop;
			}
			if (options.left != null)
			{
				props.left = (options.left - curOffset.left) + curLeft;
			}

			if ("using" in options)
			{
				options.using.call(elem, props);
			} else
			{
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({
		offset: function(options)
		{
			if (arguments.length)
			{
				return options === undefined ?
					this :
					this.each(function(i)
					{
						jQuery.offset.setOffset(this, options, i);
					});
			}

			var docElem, win,
				elem = this[0],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if (!doc)
			{
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if (!jQuery.contains(docElem, elem))
			{
				return box;
			}

			// If we don't have gBCR, just use 0,0 rather than error
			// BlackBerry 5, iOS 3 (original iPhone)
			if (typeof elem.getBoundingClientRect !== strundefined)
			{
				box = elem.getBoundingClientRect();
			}
			win = getWindow(doc);
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function()
		{
			if (!this[0])
			{
				return;
			}

			var offsetParent, offset,
				elem = this[0],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
			if (jQuery.css(elem, "position") === "fixed")
			{
				// We assume that getBoundingClientRect is available when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else
			{
				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!jQuery.nodeName(offsetParent[0], "html"))
				{
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
				parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		offsetParent: function()
		{
			return this.map(function()
			{
				var offsetParent = this.offsetParent || docElem;

				while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static"))
				{
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || docElem;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop)
	{
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function(val)
		{
			return access(this, function(elem, method, val)
			{
				var win = getWindow(elem);

				if (val === undefined)
				{
					return win ? win[prop] : elem[method];
				}

				if (win)
				{
					win.scrollTo(
						!top ? val : window.pageXOffset,
						top ? val : window.pageYOffset
					);
				} else
				{
					elem[method] = val;
				}
			}, method, val, arguments.length, null);
		};
	});

	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	jQuery.each(["top", "left"], function(i, prop)
	{
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
			function(elem, computed)
			{
				if (computed)
				{
					computed = curCSS(elem, prop);
					// if curCSS returns percentage, fallback to offset
					return rnumnonpx.test(computed) ?
						jQuery(elem).position()[prop] + "px" :
						computed;
				}
			}
		);
	});


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({ Height: "height", Width: "width" }, function(name, type)
	{
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function(defaultExtra, funcName)
		{
			// margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function(margin, value)
			{
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
					extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function(elem, type, value)
				{
					var doc;

					if (jQuery.isWindow(elem))
					{
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9)
					{
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body["scroll" + name], doc["scroll" + name],
							elem.body["offset" + name], doc["offset" + name],
							doc["client" + name]
						);
					}

					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css(elem, type, extra) :

						// Set width or height on the element
						jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable, null);
			};
		});
	});

	jQuery.noConflict = function() { };



	return jQuery;
}));

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.11
 *
 * Requires: jQuery 1.2.2+
 */

(function($)
{
	var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
		toBind = ('onwheel' in document || document.documentMode >= 9) ?
					['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
		slice = Array.prototype.slice,
		nullLowestDeltaTimeout, lowestDelta;

	if ($.event.fixHooks)
	{
		for (var i = toFix.length; i;)
		{
			$.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
		}
	}

	var special = $.event.special.mousewheel = {
		version: '3.1.11',

		setup: function()
		{
			if (this.addEventListener)
			{
				for (var i = toBind.length; i;)
				{
					this.addEventListener(toBind[--i], handler, false);
				}
			} else
			{
				this.onmousewheel = handler;
			}
			// Store the line height and page height for this particular element
			$.data(this, 'mousewheel-line-height', special.getLineHeight(this));
			$.data(this, 'mousewheel-page-height', special.getPageHeight(this));
		},

		teardown: function()
		{
			if (this.removeEventListener)
			{
				for (var i = toBind.length; i;)
				{
					this.removeEventListener(toBind[--i], handler, false);
				}
			} else
			{
				this.onmousewheel = null;
			}
			// Clean up the data we added to the element
			$.removeData(this, 'mousewheel-line-height');
			$.removeData(this, 'mousewheel-page-height');
		},

		getLineHeight: function(elem)
		{
			var $parent = $(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
			if (!$parent.length)
			{
				$parent = $('body');
			}
			return parseInt($parent.css('fontSize'), 10);
		},

		getPageHeight: function(elem)
		{
			return $(elem).height();
		},

		settings: {
			adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
			normalizeOffset: true  // calls getBoundingClientRect for each event
		}
	};

	$.fn.extend({
		mousewheel: function(fn)
		{
			return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
		},

		unmousewheel: function(fn)
		{
			return this.unbind('mousewheel', fn);
		}
	});


	function handler(event)
	{
		var orgEvent = event || window.event,
			args = slice.call(arguments, 1),
			delta = 0,
			deltaX = 0,
			deltaY = 0,
			absDelta = 0,
			offsetX = 0,
			offsetY = 0;
		event = $.event.fix(orgEvent);
		event.type = 'mousewheel';

		// Old school scrollwheel delta
		if ('detail' in orgEvent) { deltaY = orgEvent.detail * -1; }
		if ('wheelDelta' in orgEvent) { deltaY = orgEvent.wheelDelta; }
		if ('wheelDeltaY' in orgEvent) { deltaY = orgEvent.wheelDeltaY; }
		if ('wheelDeltaX' in orgEvent) { deltaX = orgEvent.wheelDeltaX * -1; }

		// Firefox < 17 horizontal scrolling related to DOMMouseScroll event
		if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS)
		{
			deltaX = deltaY * -1;
			deltaY = 0;
		}

		// Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
		delta = deltaY === 0 ? deltaX : deltaY;

		// New school wheel delta (wheel event)
		if ('deltaY' in orgEvent)
		{
			deltaY = orgEvent.deltaY * -1;
			delta = deltaY;
		}
		if ('deltaX' in orgEvent)
		{
			deltaX = orgEvent.deltaX;
			if (deltaY === 0) { delta = deltaX * -1; }
		}

		// No change actually happened, no reason to go any further
		if (deltaY === 0 && deltaX === 0) { return; }

		// Need to convert lines and pages to pixels if we aren't already in pixels
		// There are three delta modes:
		//   * deltaMode 0 is by pixels, nothing to do
		//   * deltaMode 1 is by lines
		//   * deltaMode 2 is by pages
		if (orgEvent.deltaMode === 1)
		{
			var lineHeight = $.data(this, 'mousewheel-line-height');
			delta *= lineHeight;
			deltaY *= lineHeight;
			deltaX *= lineHeight;
		} else if (orgEvent.deltaMode === 2)
		{
			var pageHeight = $.data(this, 'mousewheel-page-height');
			delta *= pageHeight;
			deltaY *= pageHeight;
			deltaX *= pageHeight;
		}

		// Store lowest absolute delta to normalize the delta values
		absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

		if (!lowestDelta || absDelta < lowestDelta)
		{
			lowestDelta = absDelta;

			// Adjust older deltas if necessary
			if (shouldAdjustOldDeltas(orgEvent, absDelta))
			{
				lowestDelta /= 40;
			}
		}

		// Adjust older deltas if necessary
		if (shouldAdjustOldDeltas(orgEvent, absDelta))
		{
			// Divide all the things by 40!
			delta /= 40;
			deltaX /= 40;
			deltaY /= 40;
		}

		// Get a whole, normalized value for the deltas
		delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
		deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
		deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

		// Normalise offsetX and offsetY properties
		if (special.settings.normalizeOffset && this.getBoundingClientRect)
		{
			var boundingRect = this.getBoundingClientRect();
			offsetX = event.clientX - boundingRect.left;
			offsetY = event.clientY - boundingRect.top;
		}

		// Add information to the event object
		event.deltaX = deltaX;
		event.deltaY = deltaY;
		event.deltaFactor = lowestDelta;
		event.offsetX = offsetX;
		event.offsetY = offsetY;
		// Go ahead and set deltaMode to 0 since we converted to pixels
		// Although this is a little odd since we overwrite the deltaX/Y
		// properties with normalized deltas.
		event.deltaMode = 0;

		// Add event and delta to the front of the arguments
		args.unshift(event, delta, deltaX, deltaY);

		// Clearout lowestDelta after sometime to better
		// handle multiple device types that give different
		// a different lowestDelta
		// Ex: trackpad = 3 and mouse wheel = 120
		if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
		nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

		return ($.event.dispatch || $.event.handle).apply(this, args);
	}

	function nullLowestDelta()
	{
		lowestDelta = null;
	}

	function shouldAdjustOldDeltas(orgEvent, absDelta)
	{
		// If this is an older event and the delta is divisable by 120,
		// then we are assuming that the browser is treating this as an
		// older mouse wheel event and that we should divide the deltas
		// by 40 to try and get a more usable deltaFactor.
		// Side note, this actually impacts the reported scroll distance
		// in older browsers and can cause scrolling to be slower than native.
		// Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
		return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
	}
})($);

var armorData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL/SURBVFhH1Ze/axphHMZf9SypptjQqoOQwSFEkwZisFSFNkQo1aEUGoqYSDAJgiQpiII0RBTk5qwdurRT3Y+G2kXsP2DtkFsqOGZJRBe3b9/XexOtvup7mg554AHv++M5Ff3wHsrn86erq6seq9VqQQjpiclrUiO9cX18rQim1NramhJGrycWibjdIKrrwqRG6OrqqknDVavRaLQ6IUSVSkWmddWSZRkMBoMSVigUJFpXLUmSwGazyZ2g4+NjkdZVSxRFWFpakjpBHo9ng9ZVy+/3g9vtFjtBWEKtVrugPW7V63UQBAEcDoef5iC0s7NzRPvcisfjYDab63hdUFIUac7Ozs7pzFgVi0XQaDTgcrnidL8rk8n0sFQqXdLZoSqXy4Bnwel0FvGaRtnu0+zs7OOTk5Naq9Wia12RWjKZBL1eDwsLC+W5uTkTXRsq/fr6ejaVSrWr1SoQJxIJsFgsnR8f/jhJMqOMcshoNFowIhLz8/NVYvKa1Gj7Pyr/4S0m4CImYOdulIBGTMBFD+mN6+NrRfAnBtO4S0hGU41JxO0GUV0XJjUm5K9Yk3UnHjeq+z2E/L4vs4Z4LP9410PIjxGJNcRj6dOrHkIm3oisIR6LSXcPIZ+ubLCGeOz32voIWd69YA2Ocv1nGASdto+QWy+PWMOjHN9yDiHkl9A5a4Hl4ucgJiQaQcjC5iVrsdflr6/B9OAeByHfv6i1fkcHAkgtub8CekGrgpDPn2VTe6529dsmECd2n4Dl0f27Rsjt7e3T5eXlgTMiqZHeuD6+VpTL5WAa3xCS1VRjHKHwiNVU45sgquvCpEYok8k0WXfiMd7tEjKdTsusIR4fHh52CXlwcCCxhngcDoe7hAyFQiJriMfk6HdDSPzf2WAN8dhut/9LSPw9XbAGR5kcdbTaPkIGg8Ej1vAo43fCJiQ+XJ6zFliORCKjz5CxWOyStdjraDQKMzMz4wkZCARq+GlgIIDUvF4v6HQ6fkLihazP52uTszQxfjoADLU7RUiE/gKXwJ9MtP+lywAAAABJRU5ErkJggg==";
var centeredData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALBSURBVFhHzZbNaxpBGIfFU5CAeKm06NJID7momHsLHnop0R6UelhQYzSFCCJIgiB+QOjdU6l4KjQNCBaKhxB1BfWmlFApUgv9CxTXD4SgTaczuyOsskFnDG0fGIaZeedhRocfq7gLhmEMhUKBGwwGY9TD8Q5eIqNYLNaBhHK53NdqteSym5ubGXYITCYTsLu7W8HL63N5eVnFDoFKpQK2trYmeHl94DUew+vwSMJxHIC/EfmJjo+PT2q1WrPb7Q6RiOd50Gg0RuFw+AyXrMdsNrtFgmWm0+nvvb29CC5bTavV6uC9C7TbbaBUKn/hstWk0+ks3rtAJpMBOp2ujctW43Q63XjvAizLAovFksFlq0GvGO9dQK/XA7PZzOKy9cjlciW8XyCfzwM4DTQajV6sIAA7BNDQaDTmxRVCsEMADcVZCrBDAA3FWQr6/b7wsnu93mYihEqlGsIOqNXqnjjzr2CYB4bC+wNu0PKPUc8wFKGGKF546+DnEZi38kcHZUL+OJxJRZNvPsqEPPdWpaLK+f4GCXnh4JGE+7APmEfbFAnpe3FS+3TQ7F77h0jEX3tB47NrFH5tI0zIjv9Weq15m34/IkzIq8OOnKh99YowIc9cWTlR5s1TwoS0P3PLidiXT0gTUrsjJ9I/3KZIyHdsSSrJv30uJABdQkpEaEifkEsicZaCexP1v4ovu/fFvZkI8T8lJGMIhUJcPB4fo54q1BDwW6ieSqXAvPn9frqETCQSM6koFovRJSQ8UVUq8ng89AkZCAT4uQT+a+QnstvtJ5FIpAmvM0SiaDQKgsHgyOFwkCUk3Hw7v5K0JZNJsoQ8PT3tyIngqcgS0ufzZeVENpuNLCGtVqtbTmQymcgSEj08ORH654gTEn79l6QSl8slJABVQkpFcEifkMsicZaCexPBCBFeNnxXm4kQfzkhFYo/FvEDoeEJNXgAAAAASUVORK5CYII=";
var chatData = "data:image/png;base64,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";
var chatInNewWindowData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQaSURBVFhHzZdNSBtBFMdjW4oXiV9oE4i5qJhGjTWijYlpgm1SI6UfVFuIkZJtKiiNYES0HvRgL1WKeGgPSi5F4sGDUovXCE0QVGiRQi8VIhuDePMmRdP3NrPu6k5WjT344J/MvJn3S2Yy83dVWK3WllgstpO8YGAN1ir4yATCB8uyhzqdLgUjuaRSqeREa+M0sfgxjPz8/B3InQSp1WoNrZ2Xl6fkJpPAPo5hQBclgDINCYi2hHQSL43k4JUEmZBXVlamYxjGPzY2Njk1NRVEYdvn8/WWlpbehnnXTtdh/0TCaDSaZ2Zm5iorK+/V1tb6oT8J70GU3W6fnp2d3XA4HG6Ye42U0UHhcHgVih8bDIZQQUGBmpsgCvhGdyKRyF55ebmZlNFB6+vrmzab7ScNgqHVaivW1tZ+ATBKyuig1tbWtqWlpX2n0+mB/cqF3HUUtuvr65tCodBie3v7WwD+IGV0ECjL6/VOHBwcHMGJ39ve3t7d2tpil5eXV+AHCADsSXV19SLoGSlLC1LAHlnGx8cXNBrN38LCQraoqCihUqnisC9h2PRuyKlgWhYpk4LIOeICNxOAH0R7dQOUnWqmOdmXubSJREIAwflwxePxQzJ27oCbn3S5XHgPExwIAw6giyT4TziXcA+xFtr/MazmupZY9PVO8s+b5EWENVhLMLDZGUB4sRG3yCFJUplzkxOtjdPE4sdQgkOSBA5yrkhpUx2S1EEXJYAylQREW0I6iZdGcvAqSnAOqdXqmA6nf+zd88mp9y+DKGz7Op3gkCWCQ8qBjAa9eeZjBzhkhdQhbabp2U8vNhzNd1MOKQcKz3vBIWvkHXL+Rcoh5UDr35hNm1kv75BfmZRDyoFaH5raloKP9p33TVKHrK1qCn32LLY/taccUg4EyvJ2PJg4+O07ikW8e9tRZnfrO8Muf3m1wngcgXqjARyyMuWQZ4DAIW9bxkeeLWjUOSmHLCxIqG4VSR0yHYicIy7O5ZCnQZe5tInVDgFktxpd8aj7kDZRTmzUnXTZSq6yQ9bV1bUMDw/vjI6OJi8irMFaglEoMoHw6uvrExyST2ZnZ3OitWHaCfFjqGOH5BM4iK5Ia9Mckq+DLkoAZSoJiLaEdBIvjeQEECbQIeFm6+BPsd/j8UzCI04QhW14duotKREcUhak1+vNXV1dcxUVUoc0mUzT8Iy00djYyDmkLAh+ztWaGnmH7Onp4RxSFjQwMLAJEFmH7O/v5xxSFmSxWNo6Ozv34V3ikFVVVU3d3d2Lzc3NnEPKgkBZsNETIyMjR4ODg3tDQ0O7INbv96/AZgdgz46fIc8CKWCSxe12L+Tm5nIOCctMFBcXSxwyLYicIy7O45AS0GUuLWy8AGpoaHAFAoFD2kQ5wVFJwj9AV9YhFYp/bEmLWcriFIUAAAAASUVORK5CYII=";
var checkData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAT0SURBVFhH3ZZdLOt3GMePt9F4G0vF0CXEDIl4azacYWyYrRZ0uqlW16PIqNcKId5udlUu3LjaYplzcS6WDgn+nHhZTrMEIUydKE6U1N0iQaZeor89z7//Pw5tqXOxbE/yJL/n3+/z/T+/n18/+shKOBcWFkqHhoYmDQbDHqZGo6GEQqEEP7NI7ggfHx//0dHRGWIjJiYmdL6+vn6M3Ga4gMk0NsAUJqlUSkJCQgiPxyO43tnZoc3Gx8f/smuGo6Nwc3PzOCAggEAaxsbGVkdGRn738/PjpaamKre2ts5RU15evgwt1rfJTgOGJDAw8JWnp2cA1hhRUVETqBGJRJVYUxRFYmNjRXTjzdjf3z9Akbe3NwpXcH09hoeHn8OW3sY1aEl0dDTFtL4eJycn9NgcDodotdolXF+P+fl5Eh8fT099dnZGvLy89pnW10Ov12+jSCAQECg5oaGhC1hjQE0nHPoG1uvr68TV1fUM+26FWq3uR5FOpyOJiYlF+Gx2dnYOgjaBA/ddXFxcQ01vby8JDg5eR82tgD91+OHhIb295eVlU3Z2thAeu8NBLxQXF+tZk6Ojowu8Fnw+v9fSaSVgdBWKbYXZbCZisZh4eHj87e/vH8K0WY++vj6K6bsVPT09xMnJyRwXFydm5HbjLTgbI9N7GVNTU8TFxQW31MPo7o6goCCe0Wg8ZTzI7u4u4XK5JDIycgo+drGo7hlpaWl5JpPJDIlToNEu3B0u87FjUVtbq5bL5efu7u6msLAwPvP4YZGQkPA93OgnTPnvhHOhIF069JNs0vBHxR6m5kcZJcz72EFCPpXPkFcVxFpODJbck5C/fDeNDYYXEpO04H0SEuhJeO96EVzvvBDTZuM/F95BSBgdhZszkuOAdzgWQg6KV0cGpBZCPv5QuTVbco6a8pIUO4RkphF+HnpFSKgxLwlZ8Ekl1tTAF3YIuaI4QJG3pxuhBiUrrAmbwwMyCyFhvb8ks0PIjTJ6bI6HK9Fqypaum2DO/1ZA4uOi6anP9Ao7hJwu20aRIPO9K0IyJlBbCFnE38B6/bnIDiG7RP0o0lFFQMg4CyF/fTI3p8m/IiRVtoaa3rakOwipk9PbWx4VmbI//chCyIjwheKCRD1rcvSn/AKvhX1CfvuZCsW20rxVQcRfhd+TkD98TVkzwexpTXKQkM+KjTdNpp4KgJBODyCktvSUNdnVignX3+OBhHwcn2d6WW42vSwj/BjuGxJS8aVa/s0H/ydCZmRkSGtqaibb2tr2MGFNpaenO0bI+vr6me7ubmItlUrl/QhZV1c3jQ0NDQ0m4A0BYwKNyB58RpspFAr7hMTRUdjY2HgMUKMJWV1dvQpT0IRMSkpSwv+5c9RkZmbaJiQ7DQDrkpBYY7KEzMrKqsRaIpHYJmRHR8cBiuDOEJhkhTVhE6ahCYnrlpYW24Ts7Oykx3ZzcyNNTU1L100w4ScxiYmJoaeGl9omZGtr6zaKIiIiLgnJmkBNZ0pKygbWcG62CSmTyfpRVFVVRQATNCFVKtUcTgJLmpDNzc1rqMnJybFPSLh89PbgjSZ4O03I8PDwheTkZD1rApoLvBZ2CZmbm6tCsa3s6urCc7ofIUtLSylrJpjwS9cxQsI5GW+awBkSZ2dnxwkJN/yUNcGvB972BxES3pwHd8vc3t5OwPjNCJmfn68GqP0nCfno0T8LHER6yZy4yQAAAABJRU5ErkJggg==";
var clearData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASqSURBVFhH3ZZLSGNnFMd91gRf1RKxagrK1IogvkIVp2q1VauNRc2YtjExTY1KNb5FUXxtuoou3LhqmdKZRVeOLsSrgw+Y0IWDoiUOvgajxF0RVOr1gTk953pj45gbjbMo7R8OOfnu/5x7vpsvv8TDibzKyso0Y2Nj0xaLZY9idHSUUSgUarp2ablFQUFBoRMTE3MgoKmpKXNwcHAIbxeUNzaZpQKcgtVoNBAVFQVSqRQo39nZ4ZpNTk7+6bIZjU7Gzc3N47CwMMCwJCcna0JDQ6NCQkKkmZmZhq2trXPyVFdXL2OJ823ap8GGEB4e/trf3z+Mv3QlpVJZSx6GYSAxMVHJL1/X/v7+AZkCAwPJuEK5o8bHx5/jlt6lHL0QHx/P8KXXdXJywo0tFovBZDItUe6ohYUFwK1yU5+dnUFAQMA+X3pd6+vr22SSy+WAb8XR0dEv8ZXyq8CHvkGetbU18PHxOcO1mzIajSNkMpvNkJqaWs4vXwkfePDi4uIqeYaGhiAyMnKNv3Rd+FE/ODw85La3vLzM5ufnK3DZD0OUk5NTZG9ydHR0QcdCJpMNcYXOhKO3kVlINpsNVCoViESiv+hY8GXONTw8zPB1NzQ4OAienp62pKQkFW93qXfm5+etfO2VZmZmwNvbm7Y0yPtuV0REhNRqtZ7yPWB3dxckEgnExcXN4GXvS9cdlZWVVcyyrA2DpqBGu3h2JPxl99TY2GjU6XTnfn5+bExMjIxfvp9SUlJ+wBP9Pf/235FXmTxbM/azdtrye80exehPWkZR/ImbhHyqm4PXNeAspp5U3JGQv343SwWWF2pWU/ohRIX7g/T9AKB854WKazb5S9kthMTRybg5pz4Oe098k5APPzZszVeck6e6IsMFIflpFF9ECxOy9NNa8jCPi1wQckV/QKZAf19gnqhXKHeM8cfaS0Jivr+kdUHIjSpubLHIB0yjVUuOTSgWnpVCclI8N/XZut4FIWertskkz/1AmJDlsg3yrD1XuiBkv3KETGamHAmZ5JyQTNUqeYa6028hpFnHbW95Qsnmf5b2DyGzUovsTY7+0F3QsXBNyG8+byOzUNi2akD11YM7EvLHR4yzJhSDXeluEvK3b61vNpl5KkdCet6DkKbKU3uTXZMKJKGiexLyYXIx+6raxr6qAlmC5C0Jqf/SqPv6o/8TIfEnWtPQ0DDd3d29R4E5k52d7R4hm5ub5wYGBsBZGAyGuxGyqalplgpaWlpY5A1gY8BCYg+tcc30er1rQtLoZGxtbT1GqN0gZHp6ugF/587Jk5ubK0xI+zQILEFC5uXl1ZJHrVYLE7K3t/eATHhmoL6+foVyx8BpOEJS3tnZKUzIvr4+bmxfX19ob29fcmxCgX+JISEhgZsabypMyK6urm0yxcbGChIyIyNjgzz46QkTUqvVjpCprq4OEBNOCdnR0bFKnoKCAteExMPHbQ/vyOLdrwiZlpZWZG+Cngs6Fi4JWVhY2EZmoejv76fndDdCVlZWMs6aUOA/XfcIic/J+mYTfIbg5eXlPiHxhJ/am9DXg077vQiJdy7Gs2Xr6ekBbPx2hCwpKTHi9+0/SUgPj78Bw5z77xWuRUIAAAAASUVORK5CYII=";
var clearAllData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARxSURBVFhH3ZZLSGNnFMc10Zrgq0YiVk2hMrUi+A5NcKpW66M6UZykk7YxMU1NlEp8g6L42nQVXbhx1dLSzqIrcSNeLVFhhtk52BKHWDMYQ9yVgEq9GjFfz4k3lui918RZlPYPB27O9//OPd/Nub8khkUCtVptWFpaWnO73YcYi4uLlEaj0ePaleUOpaSkSJaXlzcIh1ZXVx2pqalpjJ1TQiiyjhugC9pgMJCcnBwik8kIXh8cHASLrays/MlbDFtH497e3mlGRgaBcJeWlhokEklOWlqarLKy0upyuS7QY7FYtmEL+zFD3UBBkpmZ+ToxMTGDWbqWVqvtRg9FUaS4uFjLpMPl8/mO0JScnEyKioo0TDpMcKS30QNeUlBQQDHpcJ2dnQXbFovFJD09PZlJ31QSevx+P0lKSvIxuXDt7u7uo0mlUhH4KL7Khquurq4VPU6nk8TFxfmZdLhsNtsCmhwOBykvL3/CpK8FDzx1a2trBz1zc3MkOzvbySyFC77qB8fHx8HjbW9v0w0NDficEiBENTU1zaEiJycnlzgWcrl8LriRTTAvw2jmUiAQIDqdjohEor9wLJht7Jqfn6eYfbc0OztLYmNjAyUlJTrGzqu3Njc3vczea9ntdiIUCvFIs4zvbmVlZcm8Xu85U4N4PB4ilUpJfn6+HZaFV64IVVVV1ULTdAACu8BCHpgdKbMcnfr6+mwmk+kiISGBzs3NlTPp+6msrOwbeHm/Zj7+OxKoVdWGpe+Na+4XXYcYi98ZKU3LR1ES8qlpg7zuImyx+nN7hIT86at13OB+pqcNj98nOZmJRPZOEsHrg2e6YLGVH9V3EBJaR+Pehv40I118m5APP7S6Ntsv0GNpr+AhJNON5tP3uAn5+ONu9FA/NPMQ8jfzEZqSE+P5CQke30sjDyH/6Ay2LRbF8RMSPP5dMw8h1zv30aSqfZebkDWKVvQ4f9XyEHJau4AmB/UECFnCTkiqcwc9c+PKOwjpMAWPt72spRs+UfxDyKry5lCRk99NlzgW/IT8om4YzVwRcHURXeuDCAn57WcUWxGM2TFllIT85UvvzSL2pyogZOw9CPm84zxUxPNcR6QS0T0J+bC0hX5lCdCvOom8UPqGhDQ/spk+/+D/REj4iTb09vaujY+PH2LANVVdXR0dIQcGBjZmZmYIW1it1sgI2d/fv44bBgcHaeANgcIENiJ7MBcsZjab+QmJraNxaGjoFKB2i5BKpdIKv3MX6KmtreUmZKgbABYnIevr67vRo9fruQk5OTl5hCaYGV5Comd0dJSbkFNTU8G24+PjeQmJHrgpNyHHxsb20ZSXl8dJSIVC0Yoe+Pa4CWk0GhfQ1NPTQwATrIQcGRnZQU9jYyM/IWH4gseDO9IVFRXXhIROmkNFwHOJY8FLyKampmE0c8X09DQpLCyMjJAdHR0UWxEM+KcbHSHhOXlvFoFnSAQCQfSEhAk/DxXB1wOn/V6EhDu3wGwFJiYmCBR+M0K2tbXZ4H37TxIyJuZvOe59EqL4dJgAAAAASUVORK5CYII=";
var downData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANASURBVFhH3ZZNSxtRFIbdtInGJJNPIbEalWgW/oH+gy6kUBVbKLQ2YFT8zEZc+l+6kOCiaGwbJKGSURcxn6sBQ6l/wIUVI3Rze87NzeTOeJNJRkHaFw7Mfe85j9e5w0t6WimTyZwRplQqdczs7sUYqsbHx83B2LwqtOo7XYrNq0KrvtOl2LwqtOo7bRQIBF4sLCzE3W63g1ktQdiDvTiDa1UDAwOhi4uLS2yWZfkXNAbRp9Oc0EJIOp0+xXW1Wr2anJx8ib1UpVJJoZ1MAPvt8XgCbKnKbrcTgJywJZWiKH/wIBR0dHQkM19VNpu9Zo+q4A+wp6bQGxwcVCjI6XRK5+fnN2yvY+XzeSJJEgmHwzIFofB4hULhlvUYCnqJy+UiIyMjeTwIw9Q1NDQ0WiwWDWHQgy8dIQWAuNi4VsFgMAyNNTZzT3AxBC4CIUWHw+FmY2KFQqEJGLhjs6rK5TLxer0E9ktwgx7W3l7Dw8ORSqWiwuCZ+Hw+An65v7/fy9o6E8LgZmq5XI5C4B1WAOJj290JB/FmxsbGcqYhj6ZMYv6M/IwRrNTn+QckJIM0ynxC6kBo1Xe61NOCaEJ+eKVNyBYgmpDQK07I49glNst775sJKQDRhExET3Fd/fEREjLCJeT3qMIPyHuz9YTkPCy77RlJ73464T0lNccl5O68zG9iZRMz13pPTrzWrBueNiH3393om4wqvz9NJMdzQUIm525FA6IqHEwTl9PSKiH9o8VDY1gxOU3cEoUYJGTybU0EwColZ4hHsnaakIGJ0uHcnR5SPpwhXpfVREJ+a8IqX2eJz219QEIezNZyX95QyH+UkPF4/GxnZ4dgbWxsmE/IBqRRphNSDwLLOI9EeloQpt3U1JQmIVuBsAd7hQm5vb19ic2rq6tqQopACIHbPMX11tbWVSTCJSQYCj+wuLhIE5L3sCwWCwHICe+tr683E3Jzc1PmN7Hg5++13otGo5p1w9Mk5MrKyo2+yahisRixWq33ExJgt6IBUcG/T3p7e8UJ6ff7RzuBcZD2Cbm8vFwTAbCWlpZIX19fZwkJ38cEfAZ3rSBdJ+Ta2poKg1MSm81mPiHhfdTgU6CQfy0he3r+AjFv2oFZoCtjAAAAAElFTkSuQmCC";
var downLeftData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALRSURBVFhH1ZbPahpRGMVdxJXv0H9IEhV1ZbYljRqLHQb/okHBBGNCXEhWFYrowjfpovQNXFSoG7eFrtrSPoMguFDE23tubibfjHfGmXSTHjiI3z3fjyTce4jPq0qlUmM+ny86nc4HOfKuSqVysV6vN0xqOBx+kUfuVa1WmxQCzWYzlkgkeiIwHo+ncs5Go9FXMbTo7Ozs0gpZrVasWCyyQCAwEyE5N7S/v2+C1Wq1lh1kb29vFY1GiyIozwxhJA646vX6tRWyXC5ZoVAwQyB5bggjzO0guVyO+f3+ZSwWKyBnSGYMYcQhN06QeDyeu9smkjlD7XabqSC6rttDIJk1tNmYGAKiaZqA8L+JLte2JfNKUUgkEtHkilpyZ0uAZLNZdxBI7rmW3aX1DIKsl1ZInnkS1u62iehbc6PJZKIGQcFgcMo/7gM7fXBwMOGfT0Ql/XVj/r256Fy9+4eGLBxfrH9dbdifFoOH77VHNGTxTZNC4Nm3BmnIz43p/cHoY0PdkKXjSytk9bPJim9fkYYkh/BWQ5ZOWnYQc0OSAIyROOCqV5LXVsjyR5MVMi8VDUlCMEaY20Fy6RfiIW83JAnCGNWrqRsniLohSRhu1yNMBdGTDhCILsCb3+bvgGgnzwXEuSHJktUUsrshFQAYkOzxM3cQSAVxst2l9QyC1Q2pCO4y1u62iehbc+PJJ00Ngv7vhkylUo1er7fI5/OPb8h0On3R7/c3g8GAweVy2XtDJpPJJoXA3W73oSFvb2+n9wf8X17lZeM/yaUVwn89Fg6HHxqSHsLWy8YhLTuIqdxoAOYjWOj09PTaFQSiIZiPBMgOEgqFxEPeakgahPmIZTKZGyeIstxoGD46OmIqyOHhoT0Eogswh5i+A8KfhIA4NiRdsppCdpabCgADwq+COwikgjjZ7tJ6BsHKhlQFd5mvGZfWEH1rbnx+fq4GQU+oIX2+v9YcDKK3bhK7AAAAAElFTkSuQmCC";
var downRightData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALaSURBVFhHzZfPbhJRFMb7MjyESV1VaoHY0NJRo0P4E1qtSvi7hA6LpmnawhMYY9S08RUIO7o3caVV34AFIemCv+P5uJfxztw7Mwxq9Eu+xZzznV/uDMMJrEHlcrk+GAxuNU1LzQurqFqtGibXZDIx8/n8a94Kpl6v1+ecuabTKWBveHt5xWIxbTwecwzTbDZzhXU6nWseM9vtdpeXmXK5XEsFKxQKb3nEEm9bCoVCdlgmk2mORiPeZgKsVCq945G5eMsSSqwjKJvNXqhg9Km+55HlQBCd7Hw4HPIYE2CVSuUD+rxkCSXUlUqn02cqGL0ql/zSEsXdQVAqlTpVwZyiqDcISiaTJ06YUxTzB0G6rh97wSgig/CC8f7SojEZxHuBhDE2LYj3AgljbFpQ0FvrdrtqEMS/O4uAr6Xv2h9R+cWD+uBz7laL3/2NDflq2zB/HJjw5GbfzO9HVtyQnw76CxA8/QbY1gobcuuONr7JWSB49v3AFda5ylwvcu2rtGNDJu+3VLDCs6i8IYUMLG9IfbM5+irDSocx+4YU+jBKrCMoq4cvVLDy89ivDSn0YJRYx6HM0/D58IsMqxxG2YYU6jBKqCuVfrJ5poJVX8YuxRpMcXcQlHocPlXBxGuYot4gKPno3okT5jTF/EGQ/jB87AWjiAzCC6YKe5nGZJAq6GeMsWlBqqCfMcamBQW9te7HbTUI+j82ZCKRqJNuNzY2Vt+Qe3t7RqPRMOGjoyMzHo+vtiFrtVp/AYINwwAs+IZcX1/XcJJlYfQL7nqRKxaL9gdNP0hbKtjOzo60IcUMLH1q0Wi0SQ/cFuIns21IsQ9TCbaLYBcqGJ3M2pBiD6aSDILoNs9dTjbfkGIdppIaBBHsTAXb3d29FGswxd1BUCQSOVXBxGuYot4giJ7ZiRPmNMX8QRCd7NgLRhEZhBdMFfYyjckgVdDPNPYXQUFvjf4EqUHQP96Qa2s/AQ4Z6Qhy7UxxAAAAAElFTkSuQmCC";
var healthData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANkSURBVFhH1VZfSyJRHB17q6d96KVaMNoWhRJBy4jApUXWJWTaIDLY6C/jFptssmBklvUi7LPkoz3ULhIo9BSE6ydYWEp6sd0vEKI0ztNg3r2/8aqTc53GgoUOHJi55/yOlztyZhhAT0/P66Ojo0ShUOCBcA1rkojxkC5Br9cbb25uCqgBuVxOtNls73p7ew1qOolhmOPj4yTRFEgmk2I8Hj8ntwqA3t3dbZCCYKtkXYFisYjy+bxIbhUA3WQyJaSg29tbgay3DEEQUEdHR1EKurq6uibrLSObzaL29nZBCopEIodkvWXEYjGEzygrBY2Pj0+Q9ZbhdDqRxWKJSUEYulQqlSGaZqTTaYRn0cDAgLMSg2E0GgfxE7gjngfB8zzCM8A0iahjenp6vVQqEWtzgIdlWThkvqury0jG72NjYyNaLpfJiBKgcRyH2traSvj/w5IxOra2tk7I3D1AiNfrRTqdrowPmCN2dezs7JyS+Rp8Pp8UYrVavcSmDfv7+2ckA/n9fukJ4RBfRW0R4XA4FQwGqyH+yuojMTQ0FBoeHg6S2/8EqQEjc4nChYcHwrWiIVV0CVJD/vIU0F8PkjP3e1G0WcyVhlTRSQxuyIO5ZKOpyuTBezEe/XhO04Cg1xsSb5VmAhYzSyh/sSjSNCDo9YbMeASaSQuFzLKsIVPcNc2khdmfbllDhmcPaSYtjH17I2tIu3WCZtJCp/1lQ0P+mM/QjGpMf3dRGrKvb7B4uXRHG6CRv1xCxlcvmjTkh7frpSxHHZQTPKxD/0BDfnJFy3/oAUDQuFmjxob84jppFuKdH2yxIb+6ThuDfMumRzaknz2rhvg95ic2ZIBNBT9bnntDrq6uJvBriAfCdWNDqukSoCHxm6Kwt7eH5AwEAqLZXGlINZ3EMMza2lqy0VSl2+0WsX5O04Cg1xoStkozAfGvou3tbZGmAUGvNSQOEmgmLYSgWkNubm5e00xaCB8VtYZcWVk5pJm0cHJyst6QIyMjEzSTFvb3999vSLzFDM2oxoWFBWVD9uGGxAd3RxugEX+Moc7OTnpDOhyO9d3dXeqgnOAxGAzqDTk1NRUNhULUACBouAW0NST+uj1pFoIfTGsNicNOG4NGR0cf15AzMzNn1ZCxsbGnNSQOS9nt9mfZkAzzD1Ue8MIZrRLFAAAAAElFTkSuQmCC";
var hungerData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANcSURBVFhH1ZZPTJJxGMc91MHyolJKLZtuupbS5h9Caw1wLhhslugAvSB/NzdyoLg5HQ7d6pS1gK1DLTeEgx3etcFRyhlcYmx1oensEBc9JHf+7dfvoR/1rv3Q9wUP9d2+F9/n+e55HuTDW0dU73K5VlOp1EE2my2k0+lDr9f7pqWl5TJ5zkkXtre344iiZDL5o6mp6SqpO1kLCwtrpI8qu93+HZed/1V9gmAd0kNVIpFAvb29JlJeWXAT0lNRCoUiRcorCw5L6isqGAyijo6OAdJCl8/n2yD1FZXP55FcLmdIC10NDQ2Xdnd3j0hPRVkslmJjY+M10kaXQCAQzs7O7sFhK8nhcKC+vj4raTlR5+DTUSqVqVAohAqFP5+B3+9HKpUKicXiOVLLTe3t7WKpVMoYDIai0+lEarW6FBgIBD7gUwhIGXc1NzdfwetM40nmNzc3dyAsk8nk3G73U6FQ2EbK+AkmOT4+zpVGI4pGo5/IY35aWVlZhwCGYVAkEkGxWAx1dnZ+JI+5q7W19ToEhcNhJBKJmO7u7ggOipHH/ATrwCQ9PT1h8qfqBetUPQlX1bvsD1ZT780H2a+2QjpuOfQ+1mNCXuRJyC1THH2zob+djEzyIOSj0TVaSNl2o4QjIfE6tICyE+/GOBIS34QWwLZCfosDIfFhac1sB58NcyDkE/0GrZnt/L4FyaW3ORByS3tEC2DborvJkZDGO3twWFoI2GEU8SQkPmzo+TAq7Ft/h/g9d5FK1lYlIe8NMAbNjaLTJEJqeVspMPBi8gwI6dPvQFjmy3TOPfewRkJ+ns6V1wVHt4xVEnJ+bB0CmJf3UeS1EsXejtZASBwUfqU8A0LidWCS/4iQExMTq4uLiwf4J6ewtLR0aDKZ+L9D4p/luMfjQX8bv1hwJ6RWq12jhZQtk8m4ERLWoQWUbbPZuBESbkILYBt/TU4nJByW1sy2RqM5nZBms3mD1sw2nhpJJJLTCTkzM3NEC2AbE4AbIUdGRvbgsLQQ8ODgID9C9vf3p8bHx0vrlEPg/RF/JaojJNwET1AcGhpCXV1dpUCr1Vo7IfHaOxC2vLyc0+l0tRES/6vkyuuC8bt3dYTU6/XrEIAnQlNTUwh/sasnJARBSM2EhHVgkn+dkHV1PwFFLPh2X9H5NwAAAABJRU5ErkJggg==";
var inventoryData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQ8SURBVFhH1ZdPSCN3FMcDbQgK1VD/rIii1opGdNdN4jYVEyNo1WRJtUgW3FaT+g8kq2i11apoPUhSjcdEvEi7ULC9FIo9RXPZ1IZlQ1soe+ohiagbRUMowYv++t74GzNJRpzZQ2m/8A7znffezLz5/T6ZSPiUk5Pz1srKiuvw8PD46OjoZHV11Z2dnS2npwVLurOzsxcOhyMmk2lLpVKd7u/vX/j9/kh+fv4dmnO7LBaLjYBmZ2eDcrn8VWlp6b3R0dFl9GZmZkKQIrvKvEV4N1ikUCiIWq2eQq+goKAEvUAgQJRK5WdM4m06OzuLYVFmZiYpKSlRUFuC3vn5OSkrKwtQi18w0PVgMHiABSiNRkOysrLehlOy6urqOmoTmN2l2+1+elWVopqaGjXNE6yurq6faXlCa2trG/Q8aW5uJg0NDfQooVR/c3MTH/MBbcHoDVwv9DzRarXEYDCM0MNrpfrRaBRfxje0h0RSX1+vo+dEy2g0/g0tpEyjqampJeqLlt1uJ1VVVa1Mo+3t7V3qi5bP58PHszONYPlHqC9aOKeKigof04g7aLGKx+O4cKNMo8nJyQXqi5bT6SQymSzONELBLnc5HA7i8XhIKBQisRizS5KEV4dVTbxeL9MAqECgFGfkvOpCBYvrLpgOeAuevLy8UEZGRgxsJpkNvHpubm4YcrzYoLy8XAX+vyCGkAtm1+HzgeOjFwMnq4vm1yTk99a98K+DEVNH45bqbtHpvu/xhf/HHpGE/PgDG/lriMyONSUIOfRwGb2ZJ40iCAl3g0WKd+XJhAQv8NNHIgj5+1AMizIz3kwmJHjnL/sFEPKrR+vBXwYOsABDcz+fQ8iKOtYPP/vk0r3ScxMhK9VsotDoMr7PQ8ilRxtsQrOmkDQo76QVpvqbX+t5CAnrhU3Q1hcQQ3vjCHt8kx/9zQIvQ8klZK2OWyAmjPp3OIR8YlriSxIS9s8fcAj5rWWXL0lI+H74kENI/1CEL0lI4JwShOQMWmzE//yUQ0ibaYEvSUg4v9SkENKgdTm+eI94nhpJ6FkPif1hTSvCq4d9j4n3u4dMA1VN7v+VkH19fS74ajuem5s7ga+41yPkxMTEHjSJNDU1bcEjn8Lxhc1mE0dI+DCwLS4ukvb29mtCwrfQMnodHR3CCYl3g0Uw8CRCojc8PCyckPPz8zEskkqlSYRED+Z1OyFhuOswlwMswCgqKromJGyDOtaHn/jLwcFBfkJWVlaq2UShAV9w6YS0Wq0bbALcOikuLk4rTPU7OzvTCYnrhU2AuRCdTjfCHt/kT09P4+AThKytrdVxC8QEbJUEIc1m8xJfkpBoaWlJEHJsbGyXL0lI9Pf3JwiJW4EvSUjgnK4JyR202IDaBCG7u7sX+JKERFtbWzIh9Xq9q7W1lfT29pLx8XH8g5dWhFeHfUgAKUyDwsLC/zQhJZJ/ACT1uan/2EXaAAAAAElFTkSuQmCC";
var leftData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALuSURBVFhH3ZbNa9pgHMdz2DxUq9PN9846WNWBJ5HBLsOjl+2wri3bTUVRqxOK1mv/mbGtPbVlKzkI9QWkWhsJVdhh4j+wQxEreHn2e/RJKnlpk/Qwti98L/GXj8nzJB9CycVoNFoqlUqTZdmfdrvdSw6ry/Ly8uNms3mBSIbD4TQYDL4iPyuLwWB4AhCGMPgUi8XfZrP5KRm7PQCxnp2ddcm5fOr1OoLfUCgU+kRG5YMhrVaLJefyqdVqM8ja2lodj82nZWKz2ezn5+eX5Fw+1WoV6fV65PP5ajB2O8RqtToYhumTc1WFpmn8B/NIrYmakKulqMVt1hJA4FIUPGw2eOgm5Liq4I3gQTirq6svut2uCMbtGIzIlr81LgALwKKLYPAMXeENIWPK4vV6/Z1O55ow+DQajSuLxeImY8ricrl8UrByuTyAV8RExpRlZWXlebvdHhMGGgwGyO12o3A4XCAjygO7+QwWe9Tr9ZDH40EOh2Og+va4mEymR/gdgyvsOZ1ODzn8lzIz5H6sydKJexryKHGBfqUQ7vD04zQYCGgw5GGC4SBci6mXKg15mOgKIfVvb5Fh6aEKQx4nWCGk9nUOUW7IH8lLIaT65Q3SLz1QYciTZF8IUVL6c2zBkBJroqY3hlzYZi0FBC5+p/Q29mRrIjV0V/FG8CCcmSG/b4pg3I7BiGylDXm8IYLV99e1GNLl7xxtXQthjYN1jYY8ei+ClbOvNRrycHPMQQanH5Dbrr+HIQ/ejXr0BvK4DP+bIXd2dpq7u7v3MyR86l3s7e0hXABOA1oMWSqVGA7CNRKJqDMkXElXCInH40in0yk3JEBYISQWi80gig0Jt3MpB1FsSID0hRAlLRQKN2++1JqoKa+RxW3WUkDgzr8h8/n8RGroruI15EE42JC5XE4E4xYbRmQraUgpWCqVUm9IkJo/k8lcS8E0GTKdTotg0WhUmyGz2eyYg8DzgsAG2g2ZTCZH29vbCAT3zxmSov4ALgvY9OC59q0AAAAASUVORK5CYII=";
var legendData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKASURBVFhH7ZY/qxpBFMW3CYJ5VpKAdiqogTwUXfzTvGcsTBG0UkJMQA24NoqCnSCYIpDCDyBrG5IuSWMnuIiNPERD6nyBWAhaaDfZe92B3XUGESQp9MLA7Jkzvynu8aKgq5t8Pl8ej8cP8DEYDEaxWOweTw7L4MXy+/2hbrfbW61Wa6KVy+V60LZkOBzOKZDnRZD2bSiWrELuta2hwHsSiGO9KNBmsyGyLBNRFPEwGo0mFEXRTo0gsxc4wmQymVUqFeJwOIgkSbvpdPrH7XaLkKNMJlPPZrMLAMIFnhdBkI1+v79Us7HVHjzIEQC9Xq/C8yJI+zYUS77m6Iztt9lsxGq1bsLhsExb6vP5Eqz2s7xYagtnqlix2+02TTIUAKH9sD/mPWvd5HMvyuNvpf2E/FwaxcTn/Amp82L5/Z5Q98Pr3uqntCa/JQILk63th1/fzSmQ50UQFfQLZLOGyTZpsMB7EoilUR04lwDa/CoR+eMdEW+f4GE0HEgoX9KGCzwvcITJ9/ezyptnxPHUSqS3t7vpj/x+Qqo5yry6q2fT4QUA4QLPiyDIRv/Ty+VqUd7SF805AuB+QrK9CKKCfoFs1q45OmP7bY8fsScko/0sL9axqff/JmQqlSo3m00MWKPRGAWDQe6E1HuxPB5PqFAo9Nrt9rrT6RBYkFa6r9VqcwrkeRFEBf1S5QMNkm3WYIH3JBBLozpwLgHUarVIOp0mTqcTDwOBQKJYLBou8LzAEdQszOBfBfwxiEQiu2q1ilMPcpRMJuvxeHwBQLjA8yIIspHL5ZbqK1v6ojlHAISfCM+LICrolyofaNccnbH9FouFOSFZ7Wd5sY5NvX84IQXhL4UvxHsEmrJVAAAAAElFTkSuQmCC";
var messageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK/SURBVFhH7dfPa9pgGAdwj4Ne3EBvOvoDQQ/+CE4iiFAp6VCzeWp7aC+j9LYd2gq2MijmIEjvPfS/sbB1/R92EmMEvXmVd883S+Kb+KZLLmODPvAFY573kxcNjzHy71Uymdxqt9s9FrI6nY6GtRYTiYxGI6NUKin9fn9o9fyxNE1j6XSa6bq+iMfjvzGcoDeWhDWCYEAymYyJ4DgajRoOhAJWLpebz2FeBAXCBaGAybKsijARghJCKBHmh6B8oel0yujzmtHCCjAgsViM1ev1O4LmVptTQsgwDPPKtHgxHo9ntLO9Vqt1j510u91b7HQymSytdrPWIB6x3lqrwWAw9GIuKAhiF2EPPOZAuCGDInbxmAMlEontMIhdwCRJ2qcbcmpCKPpWtovFYo9e2lsNFFqjYS29fqm/WslkfKv9+UOP/TxjYdL58pEmpDXUUKNvZ0ZJyin9rjoULRBFOy+y9E6U6Y+fuAlJJ/TvxzQhc40gGJDMzmsTwfFqQloNwMrvpOZzmBdBQLggBJgsF1QRJkIQIYSIMD8E8YWmTyeslH1LEzJVAQYk9uYVq7+v3OlPp3NvvxAyfpyYV9ba5cX48XQmF/N7LbV6j510z1s0IQvq5PF4ya9Zg3iEb+QzoB16MRcUBLEz+KrSUFthDoQbMihih8ccyJyQIRA7wCQp+zIh/+/Cc+DBwUHv5uaGhcnh4aH7GZKeMoxcLqcQNhQtEKVWq5mPOvRAupqQOHFxcbGkn99GEIxHcOxMSLvBwprPYV4EIQJZQQiwQqGgijARggghRIT5IYgvRP8C2Obm5iyVSlWAAdnY2GDVavXu6upq7u0XQpeXl+aVFUVZXF9fz/L5/N7u7u49dkJf9y12Sj1Lfs0axCN8Ix/s0Iu5oCCInaOjowcecyDckEEROzzmQJiQYRA7wLLZlwkZvCKRX+5IfimCfXb3AAAAAElFTkSuQmCC";
var outpostData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIISURBVFhHzVY7bsJAEKU2QgQJRXYDFTQ0FCl9gZyBJhVnoKDgJDmGTxEpuUAugCzZN3D2rWfMenfWu45kiSc97WfePCc7mhEzG2VZ1mmabhuF5XL5slqtltjjDjGShYGkISRJEmd2v98rynFQ13WjJGAcKK/J81yTgVD0XwRQnk7c7/edE85aEAvKc4BQqxAAAVeJ1yHYWrLxfz0WsJjGyK6QD1Ile0bYmhXywdbhDJ/p36goiibLMk3sfQgaweBwOBTr9Trb7XZHunYQNEIIJlqkQNcOENICX5N2AgJd9+A08Xw+r9TClyZtOJpRTfwvlN/ndkL+nh8TUu1xhxjJwkDSEOMn5Ne5kgzA+ueD3yYOnJi/pZp8RmjchDQSdV8ZZy2IBSfaRKhVCICAq8TrEG0t2fi/HktYTGNkV8hHqZI9I2zNCvlo63CGz/RvVHy+N9lroom9pAGDRjB4TMjtUdKAQSOEehNS0IAIaYGvSTsBQdI4TfzcE/J6veoJebvdugmJPe4QI1kYSBpi9L+ivlpJBuDlcuG3iQMnbjYbTT6r0LjHNRPRV+ZZC2LBiTZVyG8EAVeJ1yHaWrIJVylEZdGaScExdIzsCvkoVbJnhAuzQj7aOpzhM/0bnU6nZrFYaGIvacCgEQzM35CSBgwaQWBOSEkDqlBr5GvSTkCQNE4TP9GEnM3+AO8l+b6c6QI8AAAAAElFTkSuQmCC";
var refreshData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQoSURBVFhH3ZdtSKJZFMfT7cWZkd7oxcyRRfpQUERkBS1BNo4wTdtYrRilDWRpGG0UhqVUjiL0NebDssFCbLC1sUlfJ2R2PtjAfmtri3xnsMCvRiiGPXfP9XkCx3wrg9mdP1z0XM453nvPeX7PNSed7Ha7t7Oz8yVl3l8IdH19jZaXl38Fk0bOplFVVRV3cnJSu7u7u+fxeM4uLi6CONGNNjc3/wa3lMkYZrN5NRgMhqmYhLJYLKixsfE3KuaWHlmt1n3s6HK5AiaTKSIUChGHw0EMBiOagCAIZDQaEZ1ORw0NDRYq7nNNT0/rLy8vQ7Ozs27syGKxPC0tLea6ujphaWkpx+v1novFYkSj0Qg+n2+EEDoZGaejoyOHWq3eLigoCDU3N0/A1C3HsrKys/r6ejFlJtbJyYmby+U6Ye/D1NT9Bdtxw0c+aWWs3IODg1Pq+/3V09MjPTw8dFRXV6dOBpXrdTqdnygzVnSZTKbEBYKW+QN6z07N3xJtbm7OEIlECFx6Npv9qby8nNXe3i6Yn583wZm68LzNZnMXFRWFoMJvqLjPtbGxsYMdk+nq6opYW1sLMJlMVFNT8xFCHpGRcVpfX9+mYqIKh8PI7/cjaFqk0+kQj8fDjRlpamr6GdyZZFRi0VdWVo5xN2OBjfLy8sLFxcX+2tpaKzSlrqKigke6phd9dHR0y+fzRRORU1kInqtX0NU+yvyPyP5eAYRsfQBCupXo2jmOljXiOxJyrFu7+8vrPY9NcXZxpAjiRDdj860kA0Lqf1gNnqrCsYHxw/KTKA0hfx/dx46uD68DJg0/IvyuGnFYTxCj4JtoAsKlRMYZPjQiLQUhVT36y39UodnxDiAk7TYhP46fi59/mwEhrQqHWiF6AEL+Oe7mPmV/YUK+G3sAQr5olx6+U2RASEFbr/PDWGJCSp4pcYHMC31pCDn5vSHiUBG49GxWJUnI1kbB/I+vTCfvFS48b9uRAyGfpCDkW9kOdkw2rk6VxNrKswDzcV4aQq4Ob8cGhk/HkP8vObJuvEQ6dRPiPS28AyH1L45xN+NEYGdJSJlwy7c//DUTcmFhwdva+gCENBgM+P6IBgcH70bIvr4+7dTU1B6s5GxxcTGIE90MeEWlJ6RcLl9dWloKxwbGD6lUmpqQMzMz+9hRo9EEurq6Ivi1XFhYiHJzc6MJ8NYEAgGGW3JC9vf362ElIbjGuLFjPCFhi+fQiOkJCVcVB1yasiekVqt1A1O+LCFhEdkTsqOjQ4qPJS0h29raeuFilZCQIpFIiQs0NDSUmpASicQAJSdw6SsrSULCGQqgj0ywCheeh6Z1w/UvOSEnJiZ2sGOygX9gYGAgkJ+fn5qQKpVqOzYQHhPcqGhkZATBuaCSkpLMCQlNeoy7GScCOztCdnd3b8E/pv8tIXNy/gX4reiYSiQiyAAAAABJRU5ErkJggg==";
var rightData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALwSURBVFhH3ZbNahpRFMddRQ1+jB/VIFaNqdWFL+AjdFFpk2AK3VRBEzEIihCXvk2ogdJoC10oVDQE0RndiAsVwQcImKIFN7fnTq/GjGO5c9NN+4eD4Jz5ec/cuT9UbYvL5fL2er1BpVJpGI1GjnytLHt7e+7RaDRBJK1W64fdbveQy/RJJBJZwliF5/kZXiVpoYvJZDLW6/UxYawiCMLM6XS+IG10MZvNToDdE8YqsLK5w+F4SdroYrFYHACbEsYqsLK5x+Pxk7bfwbtCritKt9v96Xa7AwSjUpHvmdJut+c6ne7Zk0HNZhPt7++3RRDraJ1OB1mtVnRwcNAUQTg+n68BH0haBoMBNRqbvwMPG8FGIHjgHRjNCr3bg98lWO0NuXcV2H4ErwYeSdDr9RbSLh8MqVart+TeVeDhIriGITys1kzat0fuiMB5QxzHiQ8XDrGJtP458OY+Hw6Hd4Qh7g7cjCEtxSYIBoOhfr+/qNVqIgTvDh6ZXFYWrA44pH2/319jhvy1uFw2b68SH1Quo080ZD0+QaMEwtW6fsdoyA+vskvIsvhyBAxpYzDk1fuxFCZ8iTAa8ur4XgrjSyeMhiweTaUwoXwChnRIDAm7Im2kqe7XiMSQMk201S4drxlSpoG2mp/erBmScbRO+QhZTRpKQ+p2UKMY3oAI5UNk4TQKDPkxdiOF8KVDZObUCgxZjN5KIe3rQ2QyihBKQ8ockdbnt4gz7DAY8nv0bgnBu2PUixAWQwZC/W+RRe3ytQj5rwzp8l5cXAwymczTDJnP5yeFQgHhSqVSbIYMh8PZJWQNNrPZGAx5fn4+loMxGfL09PReCksmk2yGhP8B0y2wx4bEuyJtpCkY/bEh5ZpoC0Z/MKRcA23F4/EHQ7KOdnZ2hnZ3d+kMqVarUSwW24DASCKE2pCw2hs5iFarpTdkNpu9lULgVVhC6Awpd0QwRKPRKDdkLpe7W0Lw7hCIckMGAoFQOp1eRKNREfKvGVKl+gUKU9qwbdbxyQAAAABJRU5ErkJggg==";
var settingsData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASfSURBVFhH3VddS2tHFE0UvQpVY5SCN/TBKn7Qi4ZgVNBeRa9EUrUktahg6a3RGLQkfoXEj6gPEhB90r9x+2D7BxqFKxZNvbSlWlvMS14lBzxCQpLp3uOc5GQ8aaN9KO2CTSaz1yxm9sysTFTZ4Pf79wjD4eHhD6z70VCHQqEw0yHJZJIYDIYfWS47+vv7LZ2dna+gWYgxOzvrYRopbG9vE61Wq8M8ck0mkxXHpqDX643RaDSO5JubG/Hy8jJERyrg6uoqAhwB27FYLDE4OOhhMirV8fFxkLKegNPT02R1dXUrFVpeXvaz/hRghsTpdOJSSHl5OW1jHw/YEAJCQSqE2NraCrAchcvlIgUFBVEosLO0tFRbVlZW7vP5DliaAr4TGEqMRqP/XoXh7u6O1gmBM2lpaXGxFAWIaViaiKIoifjuszIIgnDLeFQIZ8JSFLxQUVGRyFJpzM/PrzEOBS6NF5qZmXGzNMX6+nqMpe6Rrdher/cbrA2GzWZzwtIfVHt3dzfAZFSqk5OTc9b/aASDwXSx8UDC4UpiAupErq+vKUkJmEMOIh6Pk9bW1sztHxsbc/f29iYKCwuJRqMRdnZ2IpQtAyyVYF6n04XgeohWq5Xk5eXFUwdSQnNzs6WxsZHet4qKiud4USWEw2GiVqtxGV7MYyC3qakp874p4ejo6IzpkP39fVJZWRmGbvV99pGoqak5gQ96+OCU79POfw3+tc/3yB92gnH4ZuIfOORbe1gSSv5uJwZ9fQ4O2ddu6WzXpx1y0uyRRKTY9rSlHRK4pldtnEN+VGeM/mqPI/nmfEK8/H4qxItIcRX4InLzblLAduxiMjFofilzyG9tQX5ArnF68JnMIRcsfp4QvZgkzi9fEK3mGSkve0bb2Mfz/EvcFdnyDgTkBNfrFw8dcnHwQM7xfW3I4pC/TNE6YeBMFB2S5cWfJ/7CIX+y38qFFB1SJqTskI6BNYmEgUt74JATZrecs+5s4RwyS7G9zk/SDjluct5dTEd53q7vU5lDHtjOeUKuEfzOKnNIOJCxC3sSE8K71+Q6MKY4CANzyMF2/Lcp0tr8PueQw73u3o8/SBQW5BFN2XvCzurLCC/idegJ5nXPq0Kmrg9Fq6k6R4eEiyqJhN+Og0PS7X6CQ7756kwS2t/o+D855Pj4+N7m5ibBWFhYeLpDrqyshCWhjY0N0tDQ8PcO2dHRYYFf3JRDWiwWjyQiRV9fX8ohkQtjMnesrq7OCC+LOJJhFiL8ooZ4ESmWlpYi8MASsA2fie7u7rRDQjLID8g1HA5H2iFHRkb8PAGfdW1tbaS4uJgGtrGP58F7IfOKDA8PB+SE9vb2Bw4JnAM5p6urS9khpTph4CyUHFLKr66uZndImPqtXEjJIeVCig4Jb501iYSBS+OFhoaG3HJOT09PpkNmKzaIpxzSbDY7YelRnjc6Opp2SNj+c56Qa0xPT6eLjQcSrkASE/DCJXNzc4qDMDCHHGzDDPEZmLn98CZ019bWJvLz80lJSYkwMDAQ4UXgrxXBfFVVVai+vl4EY8vNIfGiSiKLi4tPf0PCv4EzSQiK/Z9zSJXqT2sD07TdBFqbAAAAAElFTkSuQmCC";
var upData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANNSURBVFhHzVZNTxpRFGVRNZEBItRBqEDTIGHh0jRx07h0o4u2mrQrPiwxorEa1K2/pta0G7WxbSLJ8BGIIh0xTlx14i8w0YY2cfN67+PNMDMOyOBCT3IC7957zuO9mRy1tQLP895yuSwCf3EcN8jK1uD1evlqtSoRhlqt9i8UCkVZuzPg7sfHx2fMQ4Uoip2bocnR0dEp094Cmvn9/ggbNweYPD08PDxhmpaAI/8dHh4OM5keDofDgxfLZu8EmNWDweALJm/A6XS68cmwmY5RqVTqQ0NDIWZjsx0cHBRZT0Uul2Pfmsjn8+xbEzD3Z2BgwEWN4ALPWZ0CBXa7na2agOOTYrF4xZYUkiSRSCSSp0bwzjy/uLi4wUahUCBw6bRJJzWAUeLxePwwc41rWZYJ3BOBi5eoEWJ0dHQ8k8lc4q4jIyMFKHFUrQHUkDa32/1sY2NDDgQCBO5I9vl8QayrgLMGxsbGPsKuDlwzvQosYR0BZk6cRQ0rtQbTq8BSo2MRTK8CS42ORTC9Ciw1OhaRzWZLzIMIgtC9ESIcDpfgg5rAKyHQ4oOBJuROUizvJu+TkHa++iMpkd8pgqztz3aZkPsfzhQTheI3C2Y0IfeSp0YTheLeTIcJuZM8MTPQsrr79o6EhIs1E5qxujdbD/K8SULCkzETtGNlZ9aQkFvxonEotzWlWyPzn6dv1XLbrzUJ+T1xrm2iwN7/RCdAOuw9pPjlzZW2Jv2cMSSk8P4GG4XtacL19zQSUiNAwmgjIb/OXONaFt6RoJ8zJGQ0Op5JvbzEXdWENDHCWZqQ6VdywMd1mJAtjBDWErKNkSU8PqPsdqykmAifpro3Qjy+hFxbWxPhL/D9/odcX1+XNjc3CXJpaam7hIRfcqaYKFxcXLSWkHCUU6OJQjTrKCHB5MTMQMv5+fn2CYkXayY0YzqdrsPDuJ2Q+GTMBO24sLCgT8iVlZWicSgej+vWrWpzc3PNhITHfK5toqC3t1cnQPb19ZFUKnWlrcER9Qm5urp6g41EIkFNsKkVIGGUJiRc9jWul5eXicvl0idkFBJyYmLiEndVEtLMCGcxIScnJ2U06SghWxkhLCVkOyNLeHxG8H6VFJNYLNa9EeIBEtJm+w+yWdku1rXkewAAAABJRU5ErkJggg==";
var upLeftData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALoSURBVFhHzZbPahpRFMZnnZfoSoVuRIjLuClJq0HjqpSQ6KhjKxpRd4miZlFoKW33okhihNA3EFfKvEC7a9P2HXTp39t7vMfpnZmrM2O7yAcHnXO+8+NeGD6V+v2+ShwI/JJIOHckl8tlhuHMkWCNbXPCmW2pquoMNJlMSDgcXi/pyvHVABaLxd6idbtwR9NyucRvTAh7h/bNQr+mTCYjhMXj8fe4IhZ6NUGrVCp1RTBZlj+wLYHQpwla0C8UCh0jbDqdkmQy+RHmJqFHE7TYRJKKxeKtETabzUgqlfqElr/CuSZosQkTPdnNYrHAKRPAFEX5jBamXq83wDkZDocmECifz7fn8zm6mODZBHO73QP6sYJ4PJ7hqmlQLpdrGWHj8Zh4vd6XaLGvi4uLJg+rVCpkb29vjGNnymazjdFoRMrl8uoGfr+/wiY7yOfzndOTjPb398vY+o/q38sq+f2a2C3w46peIrNViWNEYLQqWGPbnETGbaV+iTgDTb4rJPzsyXpJV46vBrDYq0ObCWlYXv7SPyPMRkJyS1CZ06dCWPz00CIhuQUoaJUyoa4IJp8ebUlIzgwFLegX3gQ7Rtj0h0KSZ4cbEpIzQkGLTWhCZkK3RtjsQSGpsyNBQnImKGixCRM92c3iZ1rnAZhy/tyQkHfyYG0Y3mu/rDrl0y/a8wc9DJ5NMFsJmQ62jLDxN3nHhFRCTR5Wyfn+ISGTwcboq0zKWd/qBo84IemvqXp9fU3sFvhxVS+R2aqEMSIyWhVdM71rjkH034gzULVahZdzvaQrx1cDWDAYtJeQxuV6va57Rph1QvJLUPQl2wTbnpD8AhRtkWg02hXBjo+PNyckb4aiLSiJwjoiWCgUEickb4SirRUIRGG3RlitVoOTmROSN0HRlgYCnZyc3GyA6UON/tkcrA2JRMIEAtGTtWHZEmYnISmsZYRdXV3tlpCRSKTJwwKBwO4JSWGNy8tLcnBwsLrBY01ISfoDPKbwWAPJEKYAAAAASUVORK5CYII=";
var upRightData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA2CAYAAADK88l3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAM0SURBVFhH3ZZNTxpRFIbVpX+iGz7aLvy2qahJk8YCASRUJpgSwkdnKEkXalzUpBGNf6UL239gCCQETNftqta2vwHiAhgduD3nzh25M3NnELtpfJM3wDnveTJR8oYJXtVq9ZyMoVqt9pWdmsX2Y8nj8dhhbDeW8Ey/5lSpVJpsf2fBmR2E8nq9TXgxAiQWixFVVdmZXSznrmAwGO90Os4UEMTcQaFQKGGFDAYD9m4oiDqDwuHwlghSKpXYp6EgLgbBkyS73e41y1EhpFgsksnJSdsjwYkdFIlEpF6vd8MyVAhRFIVCFhYWimx8Kzgzg5wgsiwbEAVzbHUrHOGcKhqNpuBfrLEdVb/fJ4VCwYDILOoMEkE0TSP5fJ5MTU315+fnCzTIdHZ2Vmcx0mg0hqBWq3XF5lQIyWazCNEAkqchi3w+Xx1eKATeN+hwf3+/zBgUkslkKGRubi5LA+Po5OSk2m63STqdNp4kw1bja3l5+eP09HR7dnY2zUb/gaqn+XPyB75zd3TtS86hIQXhURY3pCA4ynimX3OqnOaaorCb4cwOQtka8uUjol7IQgia5dwVfPEs3rl4p4oAhiHmDgptPE9YIYPfZggaos6g8KvAlghSevPUBEFDXAwKbawkuz/laz6MkOL2E70huTkaTuygSGhF6l2+veGDCFG2Hw8bktuh4cwMcoLIqVuI3pDcHo0jnFNFw4GU+qOo8YH+L4UUJL+9IbkMGkd0IYJolwrJJ/3ihvyUqxu5xufNIaj1vXhlhWRf++7RkO83yzwkk/D+Q0N+iFXb33IkHfc81Ibc29s7Pz4+Jnc15MUNKQqPsrAhRcFRhjP9e8Rrd3e3KQq7Gc7sIJS1If1+Pzk8PBRC0CznrkAgEC+Xy6oIYBhi7qDV1dWEFXJ0dGSCoCHqDFpfX98SQZaWlkwQNMTFoLW1tSRArvkwQhYXF2ml8HM0nNhBAJEAcsMHeQg2JL9Dw5kZ5ASBY1ND8ns0jIYg+JukAKLxAYRAC9gaks+gYaSDRBD4TCGihtzZ2akbOfydCSMdBF+2KysESm38hkwmk2UeAn10/4aUJKl6cHBAZmZmHkxDTkz8BZNpDGgg7xJUAAAAAElFTkSuQmCC";

var newLegendData = "data:image/png;base64,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";

var newMapData = "data:image/png;base64,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";

var Parameters = function (message)
{
	this.data = {};

	var startIndex = message.indexOf('?') + 1;
	message = message.substring(startIndex);

	var args = message.split('&');
	for (var i = 0; i < args.length; i++)
	{
		var parts = args[i].split('=');
		this.data[parts[0].toLowerCase()] = parts[1];
	}
};

Parameters.prototype.get = function (name, defaultValue)
{
	var key = name.toLowerCase();
	if (!this.data.hasOwnProperty(key)) return defaultValue;

	var value = this.data[key];
	if (value === '') return defaultValue;

	return value;
};

function offEvent() { return false; }
function emptyEvent() { }

var main = new function()
{
	var main = this;

	main.isNotLoaded = true;

	main.resetPosition = function()
	{
		var controlList = [];

		function resetPositionRecursive(parent)
		{
			/// <param name="parent" type="Control"></param>

			for (var i = 0; i < parent.childs.length; i++)
			{
				/// <var type="Control"></var>
				var control = parent.childs[i];

				controlList.push(control);
				resetPositionRecursive(control);
			}
		}

		resetPositionRecursive(container);

		for (var i = 0; i < controlList.length; i++) controlList[i].resetPosition();
	}

	//#region Control

	var switchingManualControlList = [], switchingAutomaticControlList = [];

	main.addSwitchingManualControlHandler = function(handler)
	{
		switchingManualControlList.push(handler);
	};

	main.addSwitchingAutomaticControlHandler = function(handler)
	{
		switchingAutomaticControlList.push(handler);
	};

	main.manualControl = true;

	main.manual = function()
	{
		for (var i = 0; i < switchingManualControlList.length; i++) switchingManualControlList[i]();

		main.manualControl = true;
	};

	main.automatic = function()
	{
		for (var i = 0; i < switchingAutomaticControlList.length; i++) switchingAutomaticControlList[i]();

		main.manualControl = false;
	};

	main.toggleControl = function()
	{
		if (main.manualControl)
		{
			main.automatic();
		}
		else
		{
			main.manual();
		}
	}

	//#endregion

	//#region Save/load parameters

	var saveList = [], loadList = [];

	main.save = function(key, value)
	{
		try
		{
			localStorage.setItem(key, value);
		}
		catch (e) { }
	};

	main.loadString = function(key, defaultValue)
	{
		try
		{
			var value = localStorage.getItem(key);
			if (value == null) return defaultValue;

			return localStorage.getItem(key);
		}
		catch (e)
		{
			return defaultValue;
		}
	};

	main.loadNumber = function(key, defaultValue)
	{
		try
		{
			var value = localStorage.getItem(key);
			if (value == null) return defaultValue;

			value = Number(value);
			if (isNaN(value)) return defaultValue;

			return value;
		}
		catch (e)
		{
			return defaultValue;
		}
	};

	main.loadBoolean = function(key, defaultValue)
	{
		try
		{
			var value = localStorage.getItem(key);
			if (value == null) return defaultValue;

			return (value == 'true');
		}
		catch (e)
		{
			return defaultValue;
		}
	};

	main.addSaveHandler = function(handler)
	{
		saveList.push(handler);
	};

	main.addLoadHandler = function(handler)
	{
		loadList.push(handler);
	};

	main.saveAll = function()
	{
		for (var i = 0; i < saveList.length; i++) saveList[i]();
	};

	main.loadAll = function()
	{
		for (var i = 0; i < loadList.length; i++) loadList[i]();
	};

	//#endregion

	main.addSaveHandler(function()
	{
		main.save('mainMode', main.manualControl);
	});

	main.addLoadHandler(function()
	{
		if (main.loadBoolean('mainMode', false))
		{
			main.manual();
		}
		else
		{
			main.automatic();
		}
	});
};

function Player()
{
	this.id = 0;
	this.x = 1;
	this.y = 20;

	this.health = 0;
	this.maxHealth = 0;
	this.armor = 0;
	this.maxArmor = 0;
	this.hunger = 0;
	this.maxHunger = 0;
	this.usedInventoryCells = 0;
	this.freeInventoryCells = 0;
	this.maxInventoryCells = 0;

	this.newMessageCount = 0;

	this.disabled = true;
	this.timerId = 0;
	this.requestIsSend = false;

	/// <field type="Array" elementType="Function"></field>
	this.updateHandlerList = [];
	/// <field type="Array" elementType="Function"></field>
	this.updatePositionHandlerList = [];

	var player = this;

	main.addSwitchingAutomaticControlHandler(function()
	{
		player.enable();
	});

	main.addSwitchingManualControlHandler(function()
	{
		player.disable();
	});

	main.addSaveHandler(function()
	{
		main.save('player_id', player.id);
		main.save('player_x', player.x);
		main.save('player_y', player.y);
		main.save('player_newMessageCount', player.newMessageCount);
		main.save('player_health', player.health);
		main.save('player_maxHealth', player.maxHealth);
		main.save('player_armor', player.armor);
		main.save('player_maxArmor', player.maxArmor);
		main.save('player_hunger', player.hunger);
		main.save('player_maxHunger', player.maxHunger);
		main.save('player_maxInventoryCells', player.maxInventoryCells);
		main.save('player_usedInventoryCells', player.usedInventoryCells);
	});

	main.addLoadHandler(function()
	{
		player.id = main.loadNumber('player_id', 0);
		if (player.id == 0) return;

		player.x = main.loadNumber('player_x', -1);
		player.y = main.loadNumber('player_y', -1);

		if (player.x < 0 || player.y < 0)
		{
			player.x = map.outposts.NastyasHoldout.x;
			player.y = map.outposts.NastyasHoldout.y;
		}

		player.newMessageCount = main.loadNumber('player_newMessageCount', 0);
		player.health = main.loadNumber('player_health', 0);
		player.maxHealth = main.loadNumber('player_maxHealth', 0);
		player.armor = main.loadNumber('player_armor', 0);
		player.maxArmor = main.loadNumber('player_maxArmor', 0);
		player.hunger = main.loadNumber('player_hunger', 0);
		player.maxHunger = main.loadNumber('player_maxHunger', 0);
		player.maxInventoryCells = main.loadNumber('player_maxInventoryCells', 0);
		player.usedInventoryCells = main.loadNumber('player_usedInventoryCells', 0);

		player.freeInventoryCells = player.maxInventoryCells - player.usedInventoryCells;

		player.updatePosition();

		if (player.maxHealth == 0 && player.maxArmor == 0) return;

		player.update();
	});

	player.update();
};

//#region Enabled

Player.prototype.enable = function()
{
	var player = this;
	if (this.timerId != 0) this.disable();

	this.disabled = false;
	this.timerId = setInterval(function() { player.refresh(); }, 10000);
}

Player.prototype.disable = function()
{
	this.disabled = true;
	clearInterval(this.timerId);
	this.timerId = 0;
}

Player.prototype.toggle = function()
{
	if (this.disabled)
	{
		this.enable();
	}
	else
	{
		this.disable();
	}
}

//#endregion

//#region Position

Player.prototype.move = function(x, y)
{
	this.x = x;
	this.y = y;

	this.updatePosition();
};

Player.prototype.add = function(offsetX, offsetY)
{
	this.x += offsetX;
	this.y += offsetY;

	this.updatePosition();
};

//#endregion

//#region Refresh

Player.prototype.addUpdateHandler = function(handler)
{
	/// <param name="handler" type="Function"></param>

	this.updateHandlerList.push(handler);
};

Player.prototype.addUpdatePositionHandler = function(handler)
{
	/// <param name="handler" type="Function"></param>

	this.updatePositionHandlerList.push(handler);
};

Player.prototype.updatePosition = function()
{
	for (var i = 0; i < this.updatePositionHandlerList.length; i++) this.updatePositionHandlerList[i]();
};

Player.prototype.update = function()
{
	for (var i = 0; i < this.updateHandlerList.length; i++) this.updateHandlerList[i]();
};

Player.prototype.refresh = function()
{
	var player = this;

	if (player.id <= 0) return;

	var antiCache = Math.random() + new Date().getUTCMilliseconds();
	var url = 'http://fairview.deadfrontier.com/onlinezombiemmo/get_values.php?/userID=' + player.id + '&t=' + antiCache;

	$.ajax({
		url: url,
		cache: false,
		dataType: 'text',
		success: function(result)
		{
			var data = new Parameters(result);
			player.newMessageCount = data.get('newpms', 0);

			player.health = data.get('df_hpcurrent', 0);
			player.maxHealth = data.get('df_hpmax', 0);

			player.armor = data.get('df_armourhp', 0);
			player.maxArmor = data.get('df_armourhpmax', 0);

			player.hunger = data.get('df_hungerhp', 0);
			player.maxHunger = 100;

			player.maxInventoryCells = data.get('df_invslots', 0);
			player.usedInventoryCells = 0;

			for (var i = 1; i <= player.maxInventoryCells; i++)
				if (data.get('df_inv' + i + '_type', '') != '') player.usedInventoryCells += 1;

			player.freeInventoryCells = player.maxInventoryCells - player.usedInventoryCells;

			var x = data.get('df_positionx', player.x + 998) - 998;
			var y = data.get('df_positiony', player.y + 980) - 980;

			if (player.x != x || player.y != y) player.move(x, y);

			player.update();
			player.requestIsSend = false;
		},
		error: function()
		{
			player.requestIsSend = false;
		}
	});

	player.requestIsSend = true;
};

//#endregion

var language = new function()
{
	var language = this;

	language.list = {};
	language.current = null;

	language.setCurrent = function(value)
	{
		language.current = value;

		function updateRecursive(parent)
		{
			/// <param name="parent" type="Control"></param>

			for (var i = 0; i < parent.childs.length; i++)
			{
				/// <var type="Control"></var>
				var control = parent.childs[i];

				control.update();
				updateRecursive(control);
			}
		}

		updateRecursive(container);
	};

	main.addSaveHandler(function()
	{
		main.save('language_current', language.current.id);
	});

	main.addLoadHandler(function()
	{
		var current = main.loadString('language_current', '');

		if (current != '')
		{
			language.current = language.list[current];

			if (language.current != null) language.setCurrent(language.current);
		}
	});
};

// buttonName: "text"
//
// For description of elements in legend can use line1 и line2 to place text on separate lines:
//
// labelName:
// {
//	 line1: "text on 1 line",
//	 line2: "text on 2 line"
// },

language.list.en =
{
	id: 'en',
	text: "English",

	left: "x: ",
	top: "y: ",
	width: "w: ",
	height: "h: ",

	// settings

	optionsButton: "Settings",

	developers: "Developers Haonik & TheDarkKRONOS",
	site: "Go to the website of project",

	on: "yes",
	off: "no",

	hide: "Hide",
	opacity:
	{
		text: "Opacity",
		unit: "%"
	},
	background: "Show background",
	borders: "Show borders",

	fitGameScreen: "Fit game screen",

	customize: "Customization interface",
	exitCustomize: "Сomplete сustomization",
	resetCustomize: "Reset element's position",

	customizeHelp: "To select an element, you must set mouse cursor to it.<br/><br/>" +
				   "Click on selected element - show/hide settings.<br/>" +
				   "To change sizes selected element, need, hold right button, move mouse.<br/>" +
				   "To move selected element, need, hold left button, move mouse.<br/><br/>" +
				   "During the move if bring any element of the border to another (They will be highlighted in red),<br/>" +
				   "items will be bound. To bind element to center of another,<br/>" +
				   "hover the mouse on the horizontal or vertical yellow line (Highlighted in red).<br/><br/>" +
				   "Click on setting button to hide menu and you can move elements.<br/><br/>" +
				   "Click here to hide this hint.<br/>" +
				   "You can open hint again by going to Settings -> Help.",
	customizeHelpOption: "Help",

	languageSelect: "Language",

	modeAutomatic: "automatic",
	modeManual: "manual",
	modeButton: "Mode",

	playerIdLabel: "Your player ID:",
	playerIdIsInvalid: "Player ID invalid!",
	playerIdReset: "Auto determine Player ID",

	// themes

	themeSelect: "Theme",
	themeFontSize: "Font size",
	themeFontSpacing: "Font spacing",

	themeSite: "Style of the site",
	themeLight: "Light",
	themeStandart: "Standart",

	// map

	map: "Click right mouse button or Ctrl + left mouse button on cell for set or remove mark on map",
	mapOption: "Show map",

	mapScale: "Scale",

	mapStyle: "Style",
	mapNewStyle: "new",
	mapOldStyle: "old",

	playerControlButtonsToggleOption: "Show map controls",

	outpostSelect: "View outpost in automatic mode / fast roaming in manual mode",
	outpostSelectOption: "Show outpost's list",

	checkButton: "Set mark on selected cell of map.",
	checkButtonOption: 'Button "Set mark"',
	clearButton: "Remove mark on selected cell of map",
	clearButtonOption: 'Button "Remove mark"',
	clearAllButton: "Remove all marks from map",
	clearAllButtonOption: 'Button "Remove all marks"',

	centeredOnPlayerButton: "Show player position on map",
	centeredOnPlayerButtonOption: "Show centering button",

	// manipulating elements in manual mode

	upButton: "Go up",
	downButton: "Go down",
	leftButton: "Go left",
	rightButton: "Go right",
	leftUpButton: "Go left-up",
	leftDownButton: "Go left-down",
	rightUpButton: "Go rigth-up",
	rightDownButton: "Go rigth-down",
	directionButtonOption: "Show direction buttons",

	// manipulating elements in automatic mode

	refreshButton: "Update player's information",
	refreshButtonOption: "Show update button",

	healthLabel: "Health",
	healthLabelOption: "Show health",

	armorLabel: "Armor",
	armorLabelOption: "Show armor",

	hungerLabel: "satiety",
	hungerLabelOption: "Show satiety",

	inventoryLabel: "Count of free cells in inventory",
	inventoryLabelOption: "Show count free cells",

	messageLabel: "Count of new messages",
	messageLabelOption: "Show count of new messages",

	// map legend

	legend: "Click for close map legend",

	legendButton: "Map legend",
	legendButtonOption: "Show map legend button",

	legendDescriptionOutpost: "Outpost",
	legendDescriptionWarehouse: "Warehouse",
	legendDescriptionHouse: "House",
	legendDescriptionApartment:
	{
		line1: "Apartment",
		line2: "home"
	},
	legendDescriptionPoliceStation:
	{
		line1: "Police station",
		line2: "Weapon's shop"
	},
	legendDescriptionClothingStore: "Clothing store",
	legendDescriptionSuperMarket: "Supermarket",
	legendDescriptionShop: "Shop",
	legendDescriptionRowShops: "Row shops",
	legendDescriptionHospital: "Hospital",
	legendDescriptionSchool: "School",
	legendDescriptionSportField: "Sport field",
	legendDescriptionHotel: "Hotel",
	legendDescriptionJunkyard: "Junkyard",
	legendDescriptionOfficeBuilding: "Office building",
	legendDescriptionBlinds: "Blinds",
	legendDescriptionGreenArea: "Green area",
	legendDescriptionBigGreenArea: "Big green area",
	legendDescriptionDoorBarricade:
	{
		line1: "In building 1 door",
		line2: "is blocked"
	},
	legendDescriptionCyanRoute:
	{
		line1: "Blue route.",
		line2: "From outpost to outpost."
	},
	legendDescriptionGreenRoute:
	{
		line1: "Green route.",
		line2: "Loot, low risk."
	},
	legendDescriptionYellowRoute:
	{
		line1: "Yellow route.",
		line2: "Loot, mid risk."
	},
	legendDescriptionOrangeRoute:
	{
		line1: "Light-red route.",
		line2: "Loot, high risk."
	},
	legendDescriptionRedRoute:
	{
		line1: "Dark-red route.",
		line2: "Loot, extreme risk."
	},
	legendDescriptionBlueZone:
	{
		line1: "Blue zone.",
		line2: "Low risk."
	},
	legendDescriptionGreenZone:
	{
		line1: "Green zone.",
		line2: "Mid-low risk."
	},
	legendDescriptionYellowZone:
	{
		line1: "Yellow zone.",
		line2: "Mid risk."
	},
	legendDescriptionOrangeZone:
	{
		line1: "Orange zone.",
		line2: "Mid-high risk."
	},
	legendDescriptionRedZone:
	{
		line1: "Dark-red zone.",
		line2: "High risk."
	},
	legendDescriptionDarkZone:
	{
		line1: "Dark zone.",
		line2: "Very high risk."
	},
	legendDescriptionNightmareZone:
	{
		line1: "Nightmare zone.",
		line2: "Nightmare risk."
	},

	// chat

	chatOption: "Show chat",

	toggleChatButton: "Show/hide chat",
	toggleChatButtonOption: 'Button "Show/Hide chat"',

	chatOption: "Show chat",
	openChatButton: "Open chat in new window",

	// messages

	message_isIntersectsWithGameWindow: "Setting's button don't stay on top of game window!"
};

// названиеКнопки: "текст"
//
// Для описания элементов карты в легенде можно использовать line1 и line2, чтобы разместить текст на разных строках:
//
// названиеПоля:
// {
//	 line1: "текст на 1 строке",
//	 line2: "текст на 2 строке"
// },

language.list.ru =
{
	id: 'ru',
	text: "Русский",

	left: "x: ",
	top: "y: ",
	width: "ш: ",
	height: "в: ",

	// настройки

	optionsButton: "Настройки",

	developers: "Разработчики Haonik и TheDarkKRONOS",
	site: "Перейти на сайт проекта",

	on: "да",
	off: "нет",

	hide: "Скрыть",
	opacity:
	{
		text: "Непрозрачность",
		unit: "%"
	},
	background: "Показать фон",
	borders: "Показать рамки",

	fitGameScreen: "Развернуть игровое окно",

	customize: "Настроить расположение",
	exitCustomize: "Завершить настройку",
	resetCustomize: "Сбросить расположение элементов",

	customizeHelp: "Чтобы выделить элемент, нужно навести на него мышку.<br/><br/>" +
				   "У каждого элемента есть настройки, чтобы их показать, нужно его выделить и щёлкнуть по нему любой кнопкой мыши.<br/>" +
				   "Чтобы изменить размеры выделенного элемента, нужно, удерживая правую кнопку (Либо ctrl и левую кнопку), двигать мышь.<br/>" +
				   "Чтобы переместить выделенный элемент, нужно нажать левую кнопку, и удерживая её, двигать мышь.<br/><br/>" +
				   "Во время перемещения, если подвести элемент любой из границ к другому (Они выделятся красным),<br/>" +
				   "элементы будут связаны. Чтобы привязать элемент к центру другого,<br/>" +
				   "нужно навести мышкой на горизонтальную или вертикальную жёлтую линию (Выделится красным).<br/><br/>" +
				   "Щёлкните на кнопке настроек, чтобы скрыть меню, и можно было перемещать элементы.<br/><br/>" +
				   "Щелкните здесь, чтобы скрыть эту подсказку.<br/>" +
				   "Её снова можно открыть, зайдя в Настройки -> Помощь.",
	customizeHelpOption: "Помощь",

	languageSelect: "Язык",

	modeAutomatic: "автоматический",
	modeManual: "ручной",
	modeButton: "Режим",

	playerIdLabel: "Ваш игровой номер:",
	playerIdIsInvalid: "Неправильно задан номер игрока!",
	playerIdReset: "Определить номер автоматически",

	// темы

	themeSelect: "Тема",
	themeFontSize: "Размер шрифта",
	themeFontSpacing: "Расстояние между буквами",

	themeSite: "Стиль сайта",
	themeLight: "Светлая",
	themeStandart: "Обычная",

	// карта

	map: "Щёлкните правой кнопкой мыши или ctrl + левая кнопка мыши на клетке, чтобы поставить или убрать метку",
	mapOption: "Карта",

	mapScale: "Масштаб",

	mapStyle: "Стиль",
	mapNewStyle: "новый",
	mapOldStyle: "старый",

	playerControlButtonsToggleOption: "Элементы управления для карты",

	outpostSelect: "Просмотр аванпоста в автоматическом режиме / быстрое перемещение в ручном",
	outpostSelectOption: "Список аванпостов",

	checkButton: "Поставить метку на выделенной клетке карты",
	checkButtonOption: 'Кнопка "поставить метку"',
	clearButton: "Убрать метку на выделенной клетке карты",
	clearButtonOption: 'Кнопка "убрать метку"',
	clearAllButton: "Убрать все метки на карте",
	clearAllButtonOption: 'Кнопка "убрать все метки"',

	centeredOnPlayerButton: "Показать игрока на карте",
	centeredOnPlayerButtonOption: 'Кнопка "центрирования на игроке"',

	// элементы управления в ручном режиме

	upButton: "Пойти вверх",
	downButton: "Пойти вниз",
	leftButton: "Пойти влево",
	rightButton: "Пойти вправо",
	leftUpButton: "Пойти влево-вверх",
	leftDownButton: "Пойти влево-вниз",
	rightUpButton: "Пойти вправо-вверх",
	rightDownButton: "Пойти вправо-вниз",
	directionButtonOption: "Показать кнопки движения",

	// элементы управления в автоматическом режиме

	refreshButton: "Обновить информацию об игроке",
	refreshButtonOption: 'Кнопка "обновить информацию"',

	healthLabel: "Здоровье персонажа",
	healthLabelOption: "Показать здоровье",

	armorLabel: "Броня персонажа",
	armorLabelOption: "Показать броню",

	hungerLabel: "Сытость персонажа",
	hungerLabelOption: "Показать сытость",

	inventoryLabel: "Количество свободных ячеек в инвентаре",
	inventoryLabelOption: "Показать место в инвентаре",

	messageLabel: "Количество новых сообщений",
	messageLabelOption: "Количество новых сообщений",

	// легенда карты

	legend: "Щёлкните, чтобы закрыть легенду карты",

	legendButton: "Легенда карты",
	legendButtonOption: 'Кнопка "легенда карты"',

	legendDescriptionOutpost: "Аванпост",
	legendDescriptionWarehouse: "Склад",
	legendDescriptionHouse: "Дом",
	legendDescriptionApartment:
	{
		line1: "Многоквартирный",
		line2: "дом"
	},
	legendDescriptionPoliceStation:
	{
		line1: "Полицеский участок",
		line2: "Оружейный магазин"
	},
	legendDescriptionClothingStore: "Магазин одежды",
	legendDescriptionSuperMarket: "Универмаг",
	legendDescriptionShop: "Магазин",
	legendDescriptionRowShops: "Торговый ряд",
	legendDescriptionHospital: "Больница",
	legendDescriptionSchool: "Школа",
	legendDescriptionSportField: "Спортплощадка",
	legendDescriptionHotel: "Гостиница",
	legendDescriptionJunkyard: "Свалка",
	legendDescriptionOfficeBuilding: "Офисное здание",
	legendDescriptionBlinds: "Деревья",
	legendDescriptionGreenArea: "Парк",
	legendDescriptionBigGreenArea: "Большой парк",
	legendDescriptionDoorBarricade:
	{
		line1: "В здании 1 дверь",
		line2: "заблокирована"
	},
	legendDescriptionCyanRoute:
	{
		line1: "Путь от аванпоста",
		line2: "к аванпосту"
	},
	legendDescriptionGreenRoute:
	{
		line1: "Путь с наименьшим",
		line2: "риском"
	},
	legendDescriptionYellowRoute:
	{
		line1: "Путь со средним",
		line2: "риском"
	},
	legendDescriptionOrangeRoute:
	{
		line1: "Путь с высоким",
		line2: "риском"
	},
	legendDescriptionRedRoute:
	{
		line1: "Путь с наибольшим",
		line2: "риском"
	},
	legendDescriptionBlueZone:
	{
		line1: "Зона наименьшей",
		line2: "опасности"
	},
	legendDescriptionGreenZone:
	{
		line1: "Зона низкой-",
		line2: "средней опасности"
	},
	legendDescriptionYellowZone:
	{
		line1: "Зона средней",
		line2: "опасности"
	},
	legendDescriptionOrangeZone:
	{
		line1: "Зона средней-",
		line2: "высокой опасности"
	},
	legendDescriptionRedZone:
	{
		line1: "Зона высокой",
		line2: "опасности"
	},
	legendDescriptionDarkZone:
	{
		line1: "Зона очень",
		line2: "высокой опасности"
	},
	legendDescriptionNightmareZone:
	{
		line1: "Зона наибольшей",
		line2: "опасности"
	},

	// чат

	chatOption: "Показать чат",

	toggleChatButton: "Показать/Скрыть чат",
	toggleChatButtonOption: 'Кнопка "показать/Скрыть чат"',

	openChatButton: "Открыть чат в новом окне",
	openChatButtonOption: 'Кнопка "чат в новом окне"',

	// сообщения

	message_isIntersectsWithGameWindow: "Кнопка настроек не должна находиться поверх игрового окна!"
};

language.current = language.list.en;

var theme = new function()
{
	var theme = this;

	//#region Classes

	theme.className = 'dfeui';

	theme.classControl = theme.className + 'Control';
	theme.classDiv = theme.className + 'Div';
	theme.classButton = theme.className + 'Button';
	theme.classLabel = theme.className + 'Label';
	theme.classInput = theme.className + 'Input';
	theme.classSelect = theme.className + 'Select';
	theme.classOption = theme.className + 'Option';
	theme.classImage = theme.className + 'Image';
	theme.classLink = theme.className + 'Link';
	theme.classDelimiter = theme.className + 'Delimiter';
	theme.classImageButton = theme.className + 'ImageButton';
	theme.classCanvas = theme.className + 'Canvas';

	theme.classBackground = theme.className + 'Background';
	theme.classTrack = theme.className + 'Track';
	theme.classText = theme.className + 'Text';

	theme.classNoBorders = theme.className + 'NoBorders';

	theme.classDock = theme.className + 'Dock';
	theme.classFixed = theme.className + 'Fixed';
	theme.classCustomizationOn = theme.className + 'CustomizationOn';

	theme.classOn = theme.className + 'On';
	theme.classOff = theme.className + 'Off';

	theme.classMore75 = theme.className + 'More75';
	theme.classMore50 = theme.className + 'More50';
	theme.classMore25 = theme.className + 'More25';
	theme.classMore0 = theme.className + 'More0';

	//#endregion

	theme.list = {};
	theme.current = null;

	theme.fontSize = 12;
	theme.elementHeight = theme.fontSize + 4;
	theme.fontSpacing = 1;
	theme.controlsBordersSize = 0;
	theme.controlsBordersSize2 = 0;

	theme.element = document.createElement('style');
	theme.element.type = 'text/css';
	document.head.appendChild(theme.element);

	function replaceCode(value)
	{
		return value
			.replace(/\-c\-/g, theme.className)
			.replace(/\-s\-/g, theme.fontSize)
			.replace(/\-p\-/g, theme.fontSpacing);
	};

	theme.setCurrent = function(value)
	{
		theme.current = value;
		theme.controlsBordersSize = theme.current.controlsBordersSize;
		theme.controlsBordersSize2 = theme.controlsBordersSize + theme.controlsBordersSize;

		theme.element.innerHTML =
			'html, body { margin: 0 !important; padding: 0 !important; width: 100% !important; height: 100% !important; } ' +
			'.' + theme.className + ' { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; } ' +
			replaceCode(theme.current.styles);
	};

	theme.update = function()
	{
		for (var item in theme.list)
		{
			if (!theme.list.hasOwnProperty(item)) continue;

			theme.list[item].update();
		}
	};

	main.addSaveHandler(function()
	{
		main.save('theme_current', theme.current.id);
		main.save('theme_fontSize', theme.fontSize);
		main.save('theme_fontSpacing', theme.fontSpacing);
	});

	main.addLoadHandler(function()
	{
		theme.fontSize = main.loadNumber('theme_fontSize', 12);
		theme.elementHeight = theme.fontSize + 4;

		theme.fontSpacing = main.loadNumber('theme_fontSpacing', 1);

		var current = main.loadString('theme_current', '');

		if (current != '')
		{
			theme.current = theme.list[current];

			if (theme.current != null) theme.setCurrent(theme.current);
		}
	});
};

theme.list.standart =
{
	id: 'standart',
	text: language.current.themeStandart,

	controlsBordersSize: 1,

	styles: '.-c-{letter-spacing:-p-px!important;font-size:-s-px!important;font-family:"Times New Roman",Arial!important}.-c-Control{background:#303030;border:1px solid #707070}.-c-Canvas{border:1px solid #909090!important}.-c-Div,.-c-Button,.-c-Label,.-c-Input,.-c-Select,.-c-Option,.-c-Link{background:#303030;border:none;color:#fff!important;text-align:center!important;vertical-align:middle!important}.-c-Option{background:#606060}.-c-informationPopup{color:#f7fe57!important}.-c-settingWindow .-c-Div,.-c-settingWindow .-c-Button,.-c-settingWindow .-c-Label,.-c-settingWindow .-c-Input,.-c-settingWindow .-c-Select,.-c-settingWindow .-c-Link{background:#606060;border:1px solid #909090}.-c-Delimiter{background:#cacaca;border:none}.-c-Button:hover,.-c-Link:hover,.-c-Background:hover .-c-Track{background:#909090!important;border:1px solid #f7fe57!important}.-c-Button:active,.-c-Link:active,.-c-Background:active .-c-Track{background:#303030!important;border:1px solid #505050!important}.-c-Control .-c-ImageButton{background-color:transparent;background-position:left 0 top 0}.-c-Control:hover .-c-ImageButton{background-color:transparent;background-position:left 0 top -18px}.-c-Control:active .-c-ImageButton{background-color:transparent;background-position:left 0 top -36px}.-c-NoBorders,.-c-container{border:1px solid transparent}.-c-customization{background:none;border:1px solid #ffc677}.-c-Dock{border:1px solid #f7fe57}.-c-Fixed{border:1px solid #ef1919}.-c-CustomizationOn{border:1px solid #a0fa2c}.-c-Track{background:#82742f!important}.-c-Text{background:none!important;border:none!important}.-c-On{background:#41562c!important}.-c-Off{background:#5f2b2b!important}.-c-More75{color:#8fd846!important}.-c-More50{color:#eaeb34!important}.-c-More25{color:#e69b14!important}.-c-More0{color:#f53939!important}',

	update: function()
	{
		this.text = language.current.themeStandart;
	}
};

theme.list.site =
{
	id: 'site',
	text: language.current.themeSite,

	controlsBordersSize: 1,

	styles: '.-c-{letter-spacing:-p-px!important;font-size:-s-px!important}.-c-Control{background:#58554a;border-top:#232323 1px solid;border-bottom:#898988 1px solid;border-left:#232323 1px solid;border-right:#898988 1px solid;color:#af9b6d!important}.-c-Div{background-image:url(images/HD/textbg.gif);background-repeat:repeat-x;background-color:#373737;color:#af9b6d!important}.-c-Link:link,.-c-Link:visited{text-decoration:none;color:#fdfdfd}.-c-Link:hover{text-decoration:none;color:#af9b6d}.-c-Track,.-c-Background,.-c-Canvas,.-c-settingWindow .-c-Div,.-c-settingWindow .-c-Button,.-c-settingWindow .-c-Label,.-c-settingWindow .-c-Input,.-c-settingWindow .-c-Select,.-c-settingWindow .-c-Link{background-image:url(images/HD/input.gif);background-repeat:repeat-x;background-color:#373737;border-top:#232323 1px solid;border-bottom:#898988 1px solid;border-left:#232323 1px solid;border-right:#898988 1px solid;color:#af9b6d!important}.-c-Option{background-color:#373737}.-c-Delimiter{background:#404040;border:none}.-c-NoBorders,.-c-container{border:1px solid transparent}.-c-customization{background:none;border:1px solid #c43c02}.-c-Dock{border:1px solid #ffd700}.-c-Fixed{border:1px solid #c00}.-c-CustomizationOn{border:1px solid #a0fa2c}.-c-Background:hover .-c-Track{background:#505050!important;border:1px solid #af9b6d!important}.-c-Background:active .-c-Track{background:#4d4d4d!important;border:1px solid #505050!important}.-c-Text,.-c-Image,.-c-ImageButton{background:none;border:none!important}.-c-Control .-c-ImageButton{background-color:transparent;background-position:left 0 top 0}.-c-Control:hover .-c-ImageButton{background-color:transparent;background-position:left 0 top -18px}.-c-Control:active .-c-ImageButton{background-color:transparent;background-position:left 0 top -36px}.-c-On{background:#382a1c!important}.-c-Off{background:#373737!important}.-c-More75{color:#090!important}.-c-More50{color:#ffd700!important}.-c-More25{color:#c43c02!important}.-c-More0{color:#c00!important}',

	update: function()
	{
		this.text = language.current.themeSite;
	}
};

theme.list.light =
{
	id: 'light',
	text: language.current.themeLight,

	controlsBordersSize: 1,

	styles: '.-c-{letter-spacing:-p-px!important;font-size:-s-px!important;font-family:"Times New Roman",Arial!important;background:none;border:1px solid transparent;color:#fff!important;text-align:center!important;vertical-align:middle!important}.-c-Control{background:#707070;border:1px solid #404040}.-c-Canvas{border:1px solid #606060!important}.-c-Delimiter{background:#cfcfcf}.-c-Track{background:#8c8c80!important;border:1px solid gray!important}.-c-Button,.-c-Link{background:#8c8c80}.-c-Background,.-c-Select,.-c-Option{background:gray}.-c-Button:hover,.-c-Link:hover,.-c-Background:hover .-c-Track{border:1px solid #cfcfcf!important}.-c-Button:active,.-c-Link:active,.-c-Background:active .-c-Track{border:1px solid #505050!important}.-c-Control .-c-ImageButton{background-color:transparent;background-position:left 0 top 0}.-c-Control:hover .-c-ImageButton{background-color:transparent;background-position:left 0 top -18px}.-c-Control:active .-c-ImageButton{background-color:transparent;background-position:left 0 top -36px}.-c-NoBorders,.-c-container{border:1px solid transparent!important}.-c-customization{border:1px solid #fece8d}.-c-Dock{border:1px solid #faff84}.-c-Fixed{border:1px solid #e44040}.-c-CustomizationOn{border:1px solid #a0fa2c!important}.-c-On{background:#748761!important}.-c-Off{background:#9a6f6f!important}.-c-More75{color:#8fd846!important}.-c-More50{color:#eaeb34!important}.-c-More25{color:#e69b14!important}.-c-More0{color:#f27676!important}',

	update: function()
	{
		this.text = language.current.themeLight;
	}
};

function Control(name, order, minWidth, minHeight, isDiv, disableSavePosition)
{
	/// <param name="name" type="String"></param>
	/// <param name="order" type="Integer"></param>
	/// <param name="minWidth" type="Integer"></param>
	/// <param name="minHeight" type="Integer"></param>
	/// <param name="isDiv" type="Boolean"></param>
	/// <param name="disableSavePosition" type="Boolean"></param>

	this.name = name || '';
	this.className = '';

	if (name != '')
	{
		controls.list[name] = this;
		this.className = ' ' + theme.className + name;
	}

	if (isDiv)
	{
		this.element = document.createElement('div');
	}
	else
	{
		this.element = document.createElement('button');
		this.element.type = 'button';
	}

	this.element.className = theme.className + ' ' + theme.classControl + ' ' + this.className;
	this.elementStyle = this.element.style;
	this.elementStyle.cssText = 'position: absolute; overflow: hidden; margin: 0; padding: 0; z-index: ' + (order || 0);

	this.visible = true;
	this.opacity = 1;
	this.order = order || 0;
	this.changeWidthIsDisabled = false;
	this.changeHeightIsDisabled = false;
	this.savePositionIsDisabled = disableSavePosition || false;

	container.element.append(this.element);
	this.element = $(this.element);

	/// <field type="Array" elementType="Control"></field>
	this.childs = [];
	this.minWidth = minWidth || 16;
	this.minHeight = minHeight || 16;
	/// <field type="Control"></field>
	this.parent = null;

	this.calculatePadding();
	this.resetPosition();
	this.resize();

	var control = this;

	this.toggle = function()
	{
		if (control.visible)
		{
			return control.hide();
		}
		else
		{
			return control.show();
		}
	};

	//#region Saving settings

	if (name == '' || this.savePositionIsDisabled) return;

	main.addSaveHandler(function()
	{
		var prefix = 'control_' + name + '_';

		main.save(prefix + 'parent', control.parent.name);

		main.save(prefix + 'dockLeft', control.dockLeft);
		main.save(prefix + 'dockTop', control.dockTop);
		main.save(prefix + 'dockRight', control.dockRight);
		main.save(prefix + 'dockBottom', control.dockBottom);
		main.save(prefix + 'dockOuterHorizontal', control.dockOuterHorizontal);
		main.save(prefix + 'dockOuterVertical', control.dockOuterVertical);

		main.save(prefix + 'offsetLeft', control.offsetLeft);
		main.save(prefix + 'offsetTop', control.offsetTop);
		main.save(prefix + 'offsetWidth', control.offsetWidth);
		main.save(prefix + 'offsetHeight', control.offsetHeight);

		main.save(prefix + 'visible', control.visible);
	});

	main.addLoadHandler(function()
	{
		var prefix = 'control_' + name + '_';

		var parentName = main.loadString(prefix + 'parent', '');
		if (parentName == '') return;

		/// <var type="Control"></var>
		var parent = controls.list[parentName];
		if (parent == null) parent = container;

		control.setParent(parent);

		var dockLeft = main.loadBoolean(prefix + 'dockLeft', false);
		var dockTop = main.loadBoolean(prefix + 'dockTop', false);
		var dockRight = main.loadBoolean(prefix + 'dockRight', false);
		var dockBottom = main.loadBoolean(prefix + 'dockBottom', false);
		var dockOuterHorizontal = main.loadBoolean(prefix + 'dockOuterHorizontal', false);
		var dockOuterVertical = main.loadBoolean(prefix + 'dockOuterVertical', false);

		control.dock(dockLeft, dockTop, dockRight, dockBottom, dockOuterHorizontal, dockOuterVertical);

		var left = main.loadNumber(prefix + 'offsetLeft', 0);
		var top = main.loadNumber(prefix + 'offsetTop', 0);
		var width = main.loadNumber(prefix + 'offsetWidth', 0);
		var height = main.loadNumber(prefix + 'offsetHeight', 0);

		control.locate(left, top, width, height);

		if (!main.loadBoolean(prefix + 'visible', true)) control.hide();
	});

	//#endregion
}

Control.prototype.addSettings = function()
{
	settingWindow.addSharedElements(this, true, true, true, false);
};

Control.prototype.update = emptyEvent;

Control.prototype.resetPosition = function()
{
	this.locate().dock().setParent();
};

//#region Position

Control.prototype.locate = function(left, top, width, height)
{
	/// <param name="left" type="Float"></param>
	/// <param name="top" type="Float"></param>
	/// <param name="width" type="Float"></param>
	/// <param name="height" type="Float"></param>

	this.offsetLeft = left || 0;
	this.offsetTop = top || 0;
	this.offsetWidth = width || 0;
	this.offsetHeight = height || 0;

	if (this.offsetWidth < this.minWidth) this.offsetWidth = this.minWidth;
	if (this.offsetHeight < this.minHeight) this.offsetHeight = this.minHeight;

	return this;
};

Control.prototype.calculatePosition = function()
{
	var offsetLeft = this.offsetLeft;
	var offsetTop = this.offsetTop;

	if (this.dockNone)
	{
		this.width = this.offsetWidth;
		this.height = this.offsetHeight;
	}
	else if (this.dockFill)
	{
		offsetLeft = this.parent.paddingLeft + container.padding;
		offsetTop = this.parent.paddingTop + container.padding;
		this.width = this.parent.width - this.parent.paddingLeft - this.parent.paddingRight - container.padding2;
		this.height = this.parent.height - this.parent.paddingTop - this.parent.paddingBottom - container.padding2;
	}
	else
	{
		this.width = this.offsetWidth;
		this.height = this.offsetHeight;

		if (this.dockLeft && this.dockRight)
		{
			offsetLeft = this.parent.width / 2 - this.offsetWidth / 2;
		}
		else if (this.dockRight)
		{
			var padding = (this.dockOuterVertical ? 0 : container.padding);
			offsetLeft = this.parent.width + (this.dockOuterHorizontal ? container.padding : -this.offsetWidth - padding);
		}
		else if (this.dockLeft)
		{
			var padding = (this.dockOuterVertical ? 0 : container.padding);
			offsetLeft = (this.dockOuterHorizontal ? -this.offsetWidth - container.padding : padding);
		}

		if (this.dockTop && this.dockBottom)
		{
			offsetTop = this.parent.height / 2 - this.offsetHeight / 2;
		}
		else if (this.dockBottom)
		{
			var padding = (this.dockOuterHorizontal ? 0 : container.padding);
			offsetTop = this.parent.height + (this.dockOuterVertical ? container.padding : -this.offsetHeight - padding);
		}
		else if (this.dockTop)
		{
			var padding = (this.dockOuterHorizontal ? 0 : container.padding);
			offsetTop = (this.dockOuterVertical ? -this.offsetHeight - container.padding : padding);
		}
	}

	this.left = this.parent.left + offsetLeft;
	this.top = this.parent.top + offsetTop;

	if (this.dockLeft == false && this.dockRight == false)
	{
		if (offsetLeft + this.width > this.parent.width)
		{
			this.left = this.parent.left + this.parent.width - this.width;
		}
		else if (this.left < this.parent.left)
		{
			this.left = this.parent.left;
		}
	}

	if (this.dockTop == false && this.dockBottom == false)
	{
		if (offsetTop + this.height > this.parent.height)
		{
			this.top = this.parent.top + this.parent.height - this.height;
		}
		else if (this.top < this.parent.top)
		{
			this.top = this.parent.top;
		}
	}

	if (this.left + this.width > container.width)
	{
		this.left = container.left + container.width - this.width;
	}
	else if (this.left < container.left)
	{
		this.left = container.left;
	}

	if (this.top + this.height > container.height)
	{
		this.top = container.top + container.height - this.height;
	}
	else if (this.top < container.top)
	{
		this.top = container.top;
	}

	this.clientWidth = this.width - theme.controlsBordersSize2;
	this.clientHeight = this.height - theme.controlsBordersSize2;

	return this;
};

Control.prototype.resize = Control.prototype.baseResize = function()
{
	if (main.isNotLoaded) return;

	this.calculatePosition();

	this.elementStyle.left = Math.floor(this.left) + 'px';
	this.elementStyle.top = Math.floor(this.top) + 'px';
	this.elementStyle.width = Math.floor(this.width) + 'px';
	this.elementStyle.height = Math.floor(this.height) + 'px';

	for (var i = 0; i < this.childs.length; i++)
		if (this.childs[i].visible || controls.notIgnoreHiddenOnResize) this.childs[i].resize();

	return this;
};

//#endregion

//#region Dock

Control.prototype.setParent = function(parent)
{
	/// <param name="parent" type="Control"></param>

	parent = parent || container;

	if (this.parent != null && this.parent == parent) return this;

	if (this.parent != null)
	{
		for (var i = 0; i < this.parent.childs.length; i++)
		{
			if (this.parent.childs[i] != this) continue;

			this.parent.childs.splice(i, 1);
			this.parent.calculatePadding();

			break;
		}
	}

	this.parent = parent;

	for (var i = 0; i < parent.childs.length; i++)
		if (this.order >= parent.childs[i].order) break;

	parent.childs.splice(i, 0, this);
	this.checkPadding();

	return this;
}

Control.prototype.dock = function(dockLeft, dockTop, dockRight, dockBottom, outerHorizontal, outerVertical)
{
	/// <signature>
	///		<param name="dockFill" type="Boolean"></param>
	/// </signature>
	/// <signature>
	///		<param name="dockLeft" type="Boolean"></param>
	///		<param name="dockTop" type="Boolean"></param>
	///		<param name="dockRight" type="Boolean"></param>
	///		<param name="dockBottom" type="Boolean"></param>
	///		<param name="outerHorizontal" type="Boolean"></param>
	///		<param name="outerVertical" type="Boolean"></param>
	/// </signature>

	dockLeft = dockLeft || false;

	if (dockTop == null && dockRight == null && dockBottom == null && outerHorizontal == null && outerVertical == null)
	{
		this.dockLeft = dockLeft;
		this.dockTop = dockLeft;
		this.dockRight = dockLeft;
		this.dockBottom = dockLeft;
	}
	else
	{
		this.dockLeft = dockLeft;
		this.dockTop = dockTop || false;
		this.dockRight = dockRight || false;
		this.dockBottom = dockBottom || false;
	}

	this.dockNone = !(this.dockLeft || this.dockRight || this.dockTop || this.dockBottom);
	this.dockFill = this.dockLeft && this.dockRight && this.dockTop && this.dockBottom;
	this.dockOuterHorizontal = outerHorizontal || false;
	this.dockOuterVertical = outerVertical || false;

	if (this.parent != null) this.parent.calculatePadding();

	return this;
}

Control.prototype.checkPadding = function()
{
	var update = false;

	if (this.dockFill || this.dockNone) return false;

	if (!this.dockOuterVertical && this.dockTop != this.dockBottom)
	{
		if (this.dockTop && this.offsetHeight + container.padding > this.parent.paddingTop)
		{
			this.parent.paddingTop = this.offsetHeight + container.padding;
			update = true;
		}

		if (this.dockBottom && this.offsetHeight + container.padding > this.parent.paddingBottom)
		{
			this.parent.paddingBottom = this.offsetHeight + container.padding;
			update = true;
		}
	}

	if (!(this.dockOuterHorizontal || this.dockTop != this.dockBottom) && this.dockLeft != this.dockRight)
	{
		if (this.dockLeft && this.offsetWidth + container.padding > this.parent.paddingLeft)
		{
			this.parent.paddingLeft = this.offsetWidth + container.padding;
			update = true;
		}

		if (this.dockRight && this.offsetWidth + container.padding > this.parent.paddingRight)
		{
			this.parent.paddingRight = this.offsetWidth + container.padding;
			update = true;
		}
	}

	return update;
}

Control.prototype.calculatePadding = function()
{
	this.paddingLeft = 0;
	this.paddingTop = 0;
	this.paddingRight = 0;
	this.paddingBottom = 0;

	for (var i = 0; i < this.childs.length; i++)
	{
		if (!this.childs[i].visible) continue;

		this.childs[i].checkPadding();
	}

	return this;
};

//#endregion

//#region Visible

Control.prototype.setOpacity = function(opacity)
{
	/// <param name="opacity" type="Float"></param>

	this.opacity = opacity;
	this.element.css('opacity', opacity);

	return this;
}

Control.prototype.show = Control.prototype.baseShow = function()
{
	this.visible = true;
	this.element[0].style.display = 'block';

	this.resize();

	if (this.checkPadding()) this.parent.resize();

	return this;
};

Control.prototype.hide = function()
{
	this.visible = false;
	this.element[0].style.display = 'none';

	this.parent.calculatePadding();
	this.parent.resize();

	return this;
};

//#endregion

var controls = new function()
{
	var controls = this;

	controls.notIgnoreHiddenOnResize = true;

	controls.getText = function(text)
	{
		if (text == null) text = '';

		return text.text || text;
	}

	controls.getClassName = function(currentValue, maxValue)
	{
		var percent = (maxValue == 0 ? 0 : 100 / maxValue * currentValue);

		if (percent > 75) return theme.classMore75;
		if (percent > 50) return theme.classMore50;
		if (percent > 25) return theme.classMore25;
		return theme.classMore0;
	}

	controls.makeButton = function createButton(control, icon, clickHandler)
	{
		if (clickHandler != null) control.element.mouseup(clickHandler);

		var image = controls.createDiv(control, 'ImageButton');
		image.style.cssText = 'background-image: url(' + icon + '); position: absolute; width: 17px; height: 17px';

		control.resize = function()
		{
			control.baseResize();

			image.style.left = Math.floor((control.width - 17) / 2) + 'px';
			image.style.top = Math.floor((control.height - 17) / 2) + 'px';
		};
	}

	controls.list = {};

	//#region Elements

	controls.createDiv = function(control, className)
	{
		className = className || '';
		if (className != '') className = ' ' + theme.className + className;

		var element = document.createElement('div');
		element.style.position = 'absolute';
		element.className = theme.className + ' ' + theme.classDiv + ' ' + control.className + className;

		control.element.append(element);

		return element;
	};

	controls.createSelect = function(control, changeHandler)
	{
		/// <param name="control" type="Control"></param>

		var element = document.createElement('select');
		element.style.position = 'absolute';
		element.className = theme.className + ' ' + theme.classSelect + ' ' + control.className;

		control.element.append(element);

		$(element).change(function()
		{
			changeHandler(element.value);
		});

		return element;
	};

	controls.updateSelect = function(control, element, data, value)
	{
		/// <param name="control" type="Control"></param>
		/// <param name="element" type="HTMLSelectElement"></param>
		/// <param name="data" type="Array" elementType="DataList"></param>
		/// <param name="value" type="String"></param>

		element.innerHTML = '';

		for (var item in data)
		{
			if (!data.hasOwnProperty(item)) continue;

			var option = document.createElement('option');
			option.innerHTML = controls.getText(data[item].text);
			option.value = data[item].id;
			option.className = theme.className + ' ' + theme.classOption + ' ' + control.className;

			if (data[item].hidden != null)
			{
				option.style.display = 'none';
				option.style.visibility = 'hidden';
			}

			element.appendChild(option);
		}

		element.value = value;
	};

	//#endregion
};

var container = (function()
{
	function Container()
	{
		this.name = 'container';
		controls.list.container = this;

		this.element = document.createElement('div');
		this.element.className = theme.className + ' ' + theme.className + 'container';
		this.elementStyle = this.element.style;
		this.elementStyle.cssText =
			'position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; ' +
			'background: black; overflow: hidden; margin: 0; padding: 0;';
		document.body.appendChild(this.element);
		this.element = $(this.element);

		this.childs = [];

		this.minWidth = 0;
		this.minHeight = 0;
		this.left = 0;
		this.top = 0;

		this.padding = 10;
		this.padding2 = 20;

		this.calculatePadding();
		this.locate();

		this.resize = function()
		{
			if (main.isNotLoaded) return;

			this.width = this.element.width();
			this.height = this.element.height();

			for (var i = 0; i < this.childs.length; i++)
				if (this.childs[i].visible || controls.notIgnoreHiddenOnResize) this.childs[i].resize();

			if (customization.visible || controls.notIgnoreHiddenOnResize) customization.resize();
		};

		this.resize();
	};

	Container.prototype = Control.prototype;

	var container = new Container(), mode = false;

	$(window).resize(function()
	{
		if (mode) return;

		mode = true;

		setTimeout(function()
		{
			container.resize();
			mode = false;
		}, 20);
	});

	return container;
})();

var settingWindow = new Control('settingWindow', 100, 32, 32, true, true).hide();

(function()
{
	settingWindow.elementStyle.overflow = 'auto';
	settingWindow.elementStyle.padding = '0';
	settingWindow.changeWidthIsDisabled = true;
	settingWindow.changeHeightIsDisabled = true;
	settingWindow.baseShowFunction = settingWindow.show;

	var top = container.padding;
	var labelWidth = 250;
	var elementWidth = 200;
	var elementHeight = 20;
	var firstColumn = container.padding;
	var secondColumn = labelWidth + container.padding + container.padding;

	var elementsContainer = document.createElement('div');
	elementsContainer.style.cssText = 'position: static; overflow: hidden; display: block; background none; border: none;';
	elementsContainer.style.margin = container.padding + 'px';
	elementsContainer.className = theme.className + ' ' + theme.className + settingWindow.name;

	settingWindow.element.append(elementsContainer);

	//#region Elements

	function nextRow()
	{
		top += container.padding + elementHeight;
	}

	function addLabel(text)
	{
		var element = document.createElement('div');
		element.className = theme.className + ' ' + theme.classDiv + settingWindow.className;
		element.innerHTML = controls.getText(text);
		element.style.cssText =
			'position: absolute; left: ' + firstColumn + 'px; top: ' + top + 'px; width: ' + (labelWidth - 10) + 'px; height: 20px;' +
			'line-height: 20px; overflow: hidden; padding: 0px 5px';

		elementsContainer.appendChild(element);
	}

	settingWindow.addInscription = function(text)
	{
		var element = document.createElement('div');
		element.className = theme.className + ' ' + theme.classDiv + settingWindow.className;
		element.innerHTML = controls.getText(text);
		element.style.cssText =
			'position: absolute; background: none; border: none; left: ' + firstColumn + 'px; top: ' + top + 'px; height: 20px;' +
			'line-height: 20px; overflow: hidden; padding: 0px 5px';
		element.style.width = (labelWidth + elementWidth + container.padding - 10) + 'px';

		elementsContainer.appendChild(element);
		nextRow();

		return element;
	};

	settingWindow.addLink = function(text, url)
	{
		var element = document.createElement('a');
		element.target = '_newBlank';
		element.href = url;
		element.innerHTML = controls.getText(text);
		element.className = theme.className + ' ' + theme.classLink + settingWindow.className;
		element.style.cssText = 'position: absolute; left: ' + firstColumn + 'px; top: ' + top + 'px; height: 20px; line-height: 20px;';
		element.style.width = (labelWidth + elementWidth + container.padding) + 'px';

		elementsContainer.appendChild(element);
		nextRow();

		return element;
	};

	settingWindow.addButton = function(text, clickHandler)
	{
		var element = document.createElement('input');
		element.type = 'button';
		element.className = theme.className + ' ' + theme.classButton + settingWindow.className;
		element.style.cssText = 'position: absolute; left: ' + firstColumn + 'px; top: ' + top + 'px; height: 20px;';
		element.style.width = (labelWidth + elementWidth + container.padding) + 'px';
		element.value = controls.getText(text);

		elementsContainer.appendChild(element);
		nextRow();

		$(element).mouseup(clickHandler);

		return element;
	};

	settingWindow.addSelect = function(text, data, value, changeHandler)
	{
		addLabel(text);

		var element = document.createElement('select');
		element.className = theme.className + ' ' + theme.classSelect + settingWindow.className;
		element.style.cssText = 'position: absolute; left: ' + secondColumn + 'px; top: ' + top + 'px; width: ' + elementWidth + 'px; height: 20px;';

		for (var item in data)
		{
			if (!data.hasOwnProperty(item)) continue;

			var option = document.createElement('option');
			option.innerHTML = controls.getText(data[item].text);
			option.value = data[item].id;
			option.className = theme.classOption + settingWindow.className;

			element.appendChild(option);
		}

		element.value = value;

		$(element).change(function() { changeHandler(element.value); });

		elementsContainer.appendChild(element);
		nextRow();

		return element;
	};

	settingWindow.addInput = function(text, value, changeHandler)
	{
		addLabel(text);

		var element = document.createElement('input');
		element.type = 'text';
		element.className = theme.className + ' ' + theme.classInput + settingWindow.className;
		element.value = value;
		element.style.cssText = 'position: absolute; left: ' + secondColumn + 'px; top: ' + top + 'px; width: ' + elementWidth + 'px; height: 20px;';

		$(element)
			.keyup(function(e)
			{
				if (e.which == 13) changeHandler(element.value);
			})
			.focusout(function()
			{
				changeHandler(element.value);
			});

		elementsContainer.appendChild(element);
		nextRow();

		return element;
	};

	settingWindow.addDelimiter = function()
	{
		var element = document.createElement('div');
		element.className = theme.className + ' ' + theme.classDelimiter + settingWindow.className;
		element.style.cssText = 'position: absolute; left: ' + firstColumn + 'px; top: ' + top + 'px; height: 1px;';
		element.style.width = (labelWidth + elementWidth + container.padding) + 'px';

		elementsContainer.appendChild(element);
		top += container.padding;

		return element;
	};

	//#region Slider

	var notActive = true;

	function activate()
	{
		notActive = false;
	}

	function deactivate()
	{
		notActive = true;
	}

	function addSlider(text, minValue, maxValue, step, value, data, changeHandler)
	{
		addLabel(text);

		var background = document.createElement('div');
		background.className = theme.className + ' ' + theme.classDiv + ' ' + theme.classBackground + settingWindow.className;
		background.style.cssText =
			'-webkit-touch-callout: none; -moz-user-select: none; -ms-user-select: none; -webkit-user-select: none; -khtml-user-select: none; user-select: none;' +
			'position: absolute; left: ' + secondColumn + 'px; top: ' + top + 'px; width: ' + elementWidth + 'px; height: 20px;';

		var track = document.createElement('div');
		track.className = theme.className + ' ' + theme.classDiv + ' ' + theme.classTrack + settingWindow.className;
		track.style.cssText = 'position: absolute; height: 20px;';
		background.appendChild(track);

		var label = document.createElement('div');
		label.className = theme.className + ' ' + theme.classDiv + ' ' + theme.classText + settingWindow.className;
		label.innerHTML = (data != null ? data[value] : value) + (text.unit || '');
		label.style.cssText =
			'position: absolute; left: 0px; top: 0px; width: ' + elementWidth + 'px; height: 20px; z-index: 1;' +
			'line-height: 20px; overflow: hidden; text-align: center; vertical-align: middle';
		background.appendChild(label);

		elementsContainer.appendChild(background);
		background = $(background);

		var prevValue = value;
		var trackLeft = (background.outerWidth() - elementWidth) / 2;
		var stepWidth = (elementWidth + theme.controlsBordersSize + trackLeft) / (maxValue - minValue + 1);
		var trackWidth = 0;

		if (stepWidth < 20)
		{
			trackWidth = 20;
			stepWidth = (elementWidth + theme.controlsBordersSize + trackLeft - trackWidth) / (maxValue - minValue);
			track.style.width = trackWidth + 'px';
		}
		else
		{
			track.style.width = Math.floor(stepWidth) + 'px';
		}

		track.style.left = Math.floor((value - minValue) * stepWidth - trackLeft - theme.controlsBordersSize) + 'px';
		track.style.top = ((20 - background.outerHeight()) / 2 - theme.controlsBordersSize) + 'px';

		background
			.mousedown(activate)
			.mousemove(function(e)
			{
				if (notActive) return;

				var x = e.pageX - background.offset().left - trackWidth / 2;

				value = Math.floor((x / stepWidth + minValue) / step) * step;

				if (value < minValue)
				{
					value = minValue;
				}
				else if (value > maxValue)
				{
					value = maxValue;
				}

				if (value == prevValue) return;

				prevValue = value;
				var totalValue = (data != null ? data[value] : value);

				track.style.left = Math.floor((value - minValue) * stepWidth - trackLeft - theme.controlsBordersSize) + 'px';

				label.innerHTML = totalValue + (text.unit || '');
				changeHandler(totalValue);
			});

		nextRow();

		return label;
	}

	settingWindow.addTrackBar = function(text, data, value, changeHandler)
	{
		return addSlider(text, 0, data.length, 1, data.indexOf(value), data, changeHandler);
	};

	settingWindow.addSlider = function(text, minValue, maxValue, step, value, changeHandler)
	{
		return addSlider(text, minValue, maxValue, step, value, null, changeHandler);
	};

	//#endregion

	//#region Check

	function setCheckStyle(element, value)
	{
		if (value)
		{
			element[0].value = controls.getText(language.current.on);
			element.removeClass(theme.classOff);
			element.addClass(theme.classOn);
		}
		else
		{
			element[0].value = controls.getText(language.current.off);
			element.removeClass(theme.classOn);
			element.addClass(theme.classOff);
		}
	}

	settingWindow.addCheck = function(text, value, changeHandler, valueReplace)
	{
		addLabel(text);

		var element = document.createElement('input');
		element.type = 'button';
		element.className = theme.className + ' ' + theme.classButton + settingWindow.className;
		element.style.cssText = 'position: absolute; left: ' + secondColumn + 'px; top: ' + top + 'px; width: ' + elementWidth + 'px; height: 20px;';

		elementsContainer.appendChild(element);
		element = $(element);

		setCheckStyle(element, value);
		if (valueReplace != null) element[0].value = controls.getText(valueReplace);

		element
			.mouseup(function()
			{
				value = !value;
				setCheckStyle(element, value);

				var result = changeHandler(value);
				if (typeof result != 'string') return;

				element[0].value = controls.getText(result);
			});

		nextRow();

		return element[0];
	};

	//#endregion

	settingWindow.addSharedElements = function(control, changeVisibility, changeOpacity, changeBackgroundAndBorders, showDelimiter)
	{
		if (changeVisibility == null || changeVisibility)
		{
			settingWindow.addButton(language.current.hide, function()
			{
				control.hide();
				customization.hide();
			});
		}

		if (changeOpacity == null || changeOpacity)
		{
			settingWindow.addSlider(language.current.opacity, 10, 100, 1, Math.floor((control.opacity || 1) * 100), function(value)
			{
				control.setOpacity(value / 100);
			});
		}

		if (changeBackgroundAndBorders == null || changeBackgroundAndBorders)
		{
			settingWindow.addCheck(language.current.background, (control.element[0].style.background != 'none'), function(value)
			{
				control.element[0].style.background = (value ? '' : 'none');
			});

			settingWindow.addCheck(language.current.borders, !control.element.hasClass(theme.classNoBorders), function(value)
			{
				if (value)
				{
					control.element.removeClass(theme.classNoBorders);
				}
				else
				{
					control.element.addClass(theme.classNoBorders);
				}
			});
		}

		if (showDelimiter == null || showDelimiter) settingWindow.addDelimiter();
	}

	//#endregion

	settingWindow.element
		.mouseleave(deactivate)
		.mouseup(deactivate)

	settingWindow.show = function(control)
	{
		/// <param name="control" type="Control"></param>

		if (control == null) return;

		$(elementsContainer).empty();
		top = container.padding;

		control.addSettings();

		if (top == container.padding) return;

		var style = settingWindow.element[0].style;
		var containerWidth = secondColumn + elementWidth;
		var containerHeight = top;

		elementsContainer.style.width = (containerWidth - container.padding2) + 'px';
		elementsContainer.style.height = (containerHeight - container.padding2) + 'px';

		if (containerHeight > 600)
		{
			containerHeight = 600;
			containerWidth += 20;
		}

		settingWindow.offsetWidth = containerWidth + container.padding;
		settingWindow.offsetHeight = containerHeight + theme.current.controlsBordersSize + theme.current.controlsBordersSize;

		function checkPosition(position)
		{
			return (position.left >= container.left &&
					position.left + containerWidth <= container.width &&
					position.top >= container.top &&
					position.top + containerHeight <= container.height);
		}

		function findPosition()
		{
			var controlWidth = control.width;
			var controlHeight = control.height;

			// bottom
			var position =
			{
				left: control.left,
				top: control.top + controlHeight
			};

			if (position.left + containerWidth > container.width) position.left = control.left + controlWidth - containerWidth;
			if (checkPosition(position)) return position;

			// right
			position.left = control.left + controlWidth;
			position.top = control.top;

			if (position.top + containerHeight > container.height) position.top = control.top + controlHeight - containerHeight;
			if (checkPosition(position)) return position;

			// top
			position.left = control.left;
			position.top = control.top - containerHeight;

			if (position.left + containerWidth > container.width) position.left = control.left + controlWidth - containerWidth;
			if (checkPosition(position)) return position;

			// left
			position.left = control.left - containerWidth;
			position.top = control.top;

			if (position.top + containerHeight > container.height) position.top = control.top + controlHeight - containerHeight;
			if (checkPosition(position)) return position;

			// inner
			position.left = control.left + container.padding;
			position.top = control.top + container.padding;

			return position;
		}

		settingWindow.resize = function()
		{
			var position = findPosition();

			settingWindow.offsetLeft = position.left - container.left;
			settingWindow.offsetTop = position.top - container.top;

			settingWindow.baseResize();
		};

		settingWindow.update = function()
		{
			settingWindow.hide();
			settingWindow.show(control);
		};

		settingWindow.baseShowFunction();
	};

	settingWindow.hide = function()
	{
		this.visible = false;
		this.element[0].style.display = 'none';

		return this;
	};
})();

var customization = new function()
{
	var customization = this;
	customization.name = 'customization';
	customization.visible = false;
	customization.resize = emptyEvent;

	/// <var type="Control"></var>
	var selectedControl = null;
	var fixedSelect = false;
	var notFirstOpen = false;

	var element = document.createElement('div');
	element.style.cssText = 'position: absolute; overflow: hidden; display: none; z-index: 99;';
	element.className = theme.className + ' ' + theme.className + customization.name;

	var horizontalDockMarker = document.createElement('div');
	horizontalDockMarker.style.cssText = 'position: absolute; display: none; background: red; border: none; left: 0px; width: 100%; top: 50%; height: 1px; z-index: 99;';
	horizontalDockMarker.className = theme.className + ' ' + theme.className + customization.name;
	element.appendChild(horizontalDockMarker);

	var verticalDockMarker = document.createElement('div');
	verticalDockMarker.style.cssText = 'position: absolute; display: none; background: red; border: none; left: 50%; width: 1px; top: 0px; height: 100%; z-index: 99;';
	verticalDockMarker.className = theme.className + ' ' + theme.className + customization.name;
	element.appendChild(verticalDockMarker);

	var background = document.createElement('div');
	background.style.cssText = 'position: absolute; border: none; padding: 0; margin: 0; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; display: none; z-index: 99; display: none; background: rgba(0, 0, 0, 0.30);';
	background.className = theme.className + ' ' + theme.className + customization.name;

	container.element.append(element);
	container.element.append(background);

	function showPositionInfoPopup()
	{
		if (selectedControl == null) return;

		var message = '&nbsp;' +
			language.current.left + (Math.floor(selectedControl.left / 8) * 8) + '; ' +
			language.current.top + (Math.floor(selectedControl.top / 8) * 8) + '; ' +
			language.current.width + (Math.floor(selectedControl.width / 8) * 8) + '; ' +
			language.current.height + (Math.floor(selectedControl.height / 8) * 8) + '&nbsp;';

		informationPopup.show(message, selectedControl);
	}

	customization.showHelp = function()
	{
		informationPopup.show(language.current.customizeHelp, -1, -1, 30);
	};

	function autoShowHelp()
	{
		if (notFirstOpen) return

		settingWindowDockControl = selectedControl = options;
		fixedSelect = true;
		settingWindow.show(options);
		backgroundShow();
		customization.showHelp();
		notFirstOpen = true;
	}

	//#region Background

	function backgroundShow()
	{
		background.style.display = 'block';
		background.appendChild(element);
	}

	function backgroundHide()
	{
		container.element.append(element);
		background.style.display = 'none';
	}

	//#endregion

	//#region Dock controls

	var dockSize = 16;
	/// <var type="Control"></var>
	var dockControl = null;

	var horizontalControlDockMarker = document.createElement('div');
	horizontalControlDockMarker.style.cssText = 'position: absolute; display: block; background: #a7ac3b; border: none; left: 0px; width: 100%; top: 50%; height: 1px; z-index: 99;';
	horizontalControlDockMarker.className = theme.className + customization.name;

	var verticalControlDockMarker = document.createElement('div');
	verticalControlDockMarker.style.cssText = 'position: absolute; display: block; background: #a7ac3b; border: none; left: 50%; width: 1px; top: 0px; height: 100%; z-index: 99;';
	verticalControlDockMarker.className = theme.className + customization.name;

	function clearDockData(control)
	{
		/// <param name="control" type="Control"></param>

		horizontalControlDockMarker.style.background = '#a7ac3b';
		verticalControlDockMarker.style.background = '#a7ac3b';
		horizontalDockMarker.style.display = 'none';
		verticalDockMarker.style.display = 'none';
		element.style.border = '';
		control.elementStyle.border = '';
	}

	function showDockControl(control)
	{
		/// <param name="control" type="Control"></param>

		if (dockControl == control) return true;
		if (dockControl != null) hideDockControl();

		dockControl = control;

		control.element.addClass(theme.classDock);
		control.element.append(horizontalControlDockMarker);
		control.element.append(verticalControlDockMarker);

		horizontalControlDockMarker.style.display = 'block';
		verticalControlDockMarker.style.display = 'block';
	}

	function hideDockControl()
	{
		if (dockControl == null) return;

		clearDockData(dockControl);

		horizontalControlDockMarker.style.display = 'none';
		verticalControlDockMarker.style.display = 'none';

		dockControl.element.removeClass(theme.classDock);
		dockControl = null;
	}

	function checkHorizontalDockForControl(control, e)
	{
		/// <param name="control" type="Control"></param>
		/// <param name="e" type="MouseEvent"></param>

		var selectedControlRight = selectedControl.left + selectedControl.width;
		var controlCenter = control.left + control.width / 2;
		var controlRight = control.left + control.width;

		if (selectedControl.left >= control.left && selectedControl.left < control.left + dockSize)
		{
			element.style.borderLeft = 'solid 1px red';
			control.elementStyle.borderLeft = 'solid 1px red';
			selectedControl.dockLeft = true;
		}
		else if (selectedControlRight > controlRight - dockSize && selectedControlRight <= controlRight)
		{
			element.style.borderRight = 'solid 1px red';
			control.elementStyle.borderRight = 'solid 1px red';
			selectedControl.dockRight = true;
		}
		else if (e.pageX > controlCenter - dockSize && e.pageX < controlCenter + dockSize)
		{
			verticalDockMarker.style.display = 'block';
			verticalControlDockMarker.style.background = 'red';
			selectedControl.dockLeft = true;
			selectedControl.dockRight = true;
		}
		else if (selectedControl.left > controlRight && selectedControl.left < controlRight + dockSize)
		{
			element.style.borderLeft = 'solid 1px red';
			control.elementStyle.borderRight = 'solid 1px red';
			selectedControl.dockRight = true;
			selectedControl.dockOuterHorizontal = true;
		}
		else if (selectedControlRight > control.left - dockSize && selectedControlRight < control.left)
		{
			element.style.borderRight = 'solid 1px red';
			control.elementStyle.borderLeft = 'solid 1px red';
			selectedControl.dockLeft = true;
			selectedControl.dockOuterHorizontal = true;
		}
	}

	function checkVerticalDockForControl(control, e)
	{
		/// <param name="control" type="Control"></param>
		/// <param name="e" type="MouseEvent"></param>

		var selectedControlBottom = selectedControl.top + selectedControl.height;
		var controlMiddle = control.top + control.height / 2;
		var controlBottom = control.top + control.height;

		if (selectedControl.top >= control.top && selectedControl.top < control.top + dockSize)
		{
			element.style.borderTop = 'solid 1px red';
			control.elementStyle.borderTop = 'solid 1px red';
			selectedControl.dockTop = true;
		}
		else if (selectedControlBottom > controlBottom - dockSize && selectedControlBottom <= controlBottom)
		{
			element.style.borderBottom = 'solid 1px red';
			control.elementStyle.borderBottom = 'solid 1px red';
			selectedControl.dockBottom = true;
		}
		else if (e.pageY > controlMiddle - dockSize && e.pageY < controlMiddle + dockSize)
		{
			horizontalDockMarker.style.display = 'block';
			horizontalControlDockMarker.style.background = 'red';
			selectedControl.dockTop = true;
			selectedControl.dockBottom = true;
		}
		else if (selectedControl.top > controlBottom && selectedControl.top < controlBottom + dockSize)
		{
			element.style.borderTop = 'solid 1px red';
			control.elementStyle.borderBottom = 'solid 1px red';
			selectedControl.dockBottom = true;
			selectedControl.dockOuterVertical = true;
		}
		else if (selectedControlBottom > control.top - dockSize && selectedControlBottom < control.top)
		{
			element.style.borderBottom = 'solid 1px red';
			control.elementStyle.borderTop = 'solid 1px red';
			selectedControl.dockTop = true;
			selectedControl.dockOuterVertical = true;
		}
	}

	function checkHorizontalDockForSmallControls(control, e)
	{
		/// <param name="control" type="Control"></param>
		/// <param name="e" type="MouseEvent"></param>

		var selectedControlRight = selectedControl.left + selectedControl.width;
		var controlCenter = control.left + control.width / 2;
		var controlRight = control.left + control.width;
		var dockSizeHalf = dockSize / 2;

		if (e.pageX >= controlCenter - dockSizeHalf && e.pageX <= controlCenter + dockSizeHalf)
		{
			verticalDockMarker.style.display = 'block';
			verticalControlDockMarker.style.background = 'red';
			selectedControl.dockLeft = true;
			selectedControl.dockRight = true;
		}
		else if (selectedControl.left >= controlCenter - dockSizeHalf && selectedControl.left < controlRight + dockSize)
		{
			element.style.borderLeft = 'solid 1px red';
			control.elementStyle.borderRight = 'solid 1px red';
			selectedControl.dockRight = true;
			selectedControl.dockOuterHorizontal = true;
		}
		else if (selectedControlRight > control.left - dockSize && selectedControlRight <= controlCenter + dockSizeHalf)
		{
			element.style.borderRight = 'solid 1px red';
			control.elementStyle.borderLeft = 'solid 1px red';
			selectedControl.dockLeft = true;
			selectedControl.dockOuterHorizontal = true;
		}
	}

	function checkVerticalDockForSmallControls(control, e)
	{
		/// <param name="control" type="Control"></param>
		/// <param name="e" type="MouseEvent"></param>

		var selectedControlBottom = selectedControl.top + selectedControl.height;
		var controlMiddle = control.top + control.height / 2;
		var controlBottom = control.top + control.height;
		var dockSizeHalf = dockSize / 2;

		if (e.pageY >= controlMiddle - dockSizeHalf && e.pageY <= controlMiddle + dockSizeHalf)
		{
			horizontalDockMarker.style.display = 'block';
			horizontalControlDockMarker.style.background = 'red';
			selectedControl.dockTop = true;
			selectedControl.dockBottom = true;
		}
		else if (selectedControl.top >= controlMiddle - dockSizeHalf && selectedControl.top < controlBottom + dockSize)
		{
			element.style.borderTop = 'solid 1px red';
			control.elementStyle.borderBottom = 'solid 1px red';
			selectedControl.dockBottom = true;
			selectedControl.dockOuterVertical = true;
		}
		else if (selectedControlBottom > control.top - dockSize && selectedControlBottom <= controlMiddle + dockSizeHalf)
		{
			element.style.borderBottom = 'solid 1px red';
			control.elementStyle.borderTop = 'solid 1px red';
			selectedControl.dockTop = true;
			selectedControl.dockOuterVertical = true;
		}
	}

	function checkDock(control, e)
	{
		/// <param name="control" type="Control"></param>
		/// <param name="e" type="MouseEvent"></param>

		clearDockData(control);

		checkHorizontalDockForControl(control, e);
		checkVerticalDockForControl(control, e);

		if (selectedControl.dockOuterVertical || selectedControl.dockOuterHorizontal) return;

		if (control.width <= 32) checkHorizontalDockForSmallControls(control, e);
		if (control.height <= 32) checkVerticalDockForSmallControls(control, e);

		if (!(selectedControl.dockBottom && selectedControl.dockTop || selectedControl.dockLeft && selectedControl.dockRight)) return;

		if (selectedControl.changeWidthIsDisabled || selectedControl.changeHeightIsDisabled || control.width <= 32 || control.height <= 32)
		{
			horizontalDockMarker.style.display = 'none';
			horizontalControlDockMarker.style.background = '#a7ac3b';
			element.style.borderTop = 'solid 1px red';
			control.elementStyle.borderTop = 'solid 1px red';
			element.style.borderBottom = '';
			control.elementStyle.borderBottom = '';

			selectedControl.dockTop = true;
			selectedControl.dockLeft = true;
			selectedControl.dockRight = true;
			selectedControl.dockBottom = false;
			selectedControl.dockOuterHorizontal = false;
			selectedControl.dockOuterVertical = true;
		}
	}

	function findDropControl(parent, e)
	{
		/// <param name="parent" type="Control"></param>
		/// <param name="e" type="MouseEvent"></param>

		for (var i = 0; i < parent.childs.length; i++)
		{
			/// <var type="Control"></var>
			var control = parent.childs[i];

			if (control == selectedControl ||
				control == customization ||
				control == settingWindow ||
				control == informationPopup ||
				!control.visible) continue;

			if (findDropControl(control, e)) return true;
		}

		var selectedControlRight = selectedControl.left + selectedControl.width;
		var selectedControlBottom = selectedControl.top + selectedControl.height;
		var parentRight = parent.left + parent.width;
		var parentBottom = parent.top + parent.height;

		if (selectedControl.left >= parentRight + dockSize ||
			selectedControl.top >= parentBottom + dockSize ||
			selectedControlRight <= parent.left - dockSize ||
			selectedControlBottom <= parent.top - dockSize) return false;

		showDockControl(parent);
		checkDock(parent, e);

		return true;
	}

	//#endregion

	//#region Move/resize controls

	/// <var type="Control"></var>
	var settingWindowDockControl = null;

	var data =
	{
		resizeMode: false,
		moved: false,
		mouseX: 0,
		mouseY: 0,
		mode: false
	};;

	$(element).mousedown(function(e)
	{
		if (selectedControl == null) return;

		fixedSelect = true;

		data =
		{
			resizeMode: (e.which == 3 || e.ctrlKey),
			moved: false,
			mouseX: e.pageX,
			mouseY: e.pageY,
			mode: false
		};

		container.element.on({ mousemove: mousemove, mouseup: mouseup, mouseleave: customization.hide });
	});

	function undock(e)
	{
		if (selectedControl.parent == container && selectControl.dockNone) return;

		selectedControl.setParent().dock();

		if (data.mouseX > selectedControl.offsetLeft + selectedControl.offsetWidth)
		{
			selectedControl.offsetLeft = e.pageX - selectedControl.offsetWidth / 2;
		}

		if (data.mouseY > selectedControl.offsetTop + selectedControl.offsetHeight)
		{
			selectedControl.offsetTop = e.pageY - selectedControl.offsetHeight / 2;
		}
	}

	function move(e)
	{
		var offsetLeft = Math.floor(e.pageX - data.mouseX);
		var offsetTop = Math.floor(e.pageY - data.mouseY);

		selectedControl.offsetLeft += offsetLeft;
		selectedControl.offsetTop += offsetTop;

		selectedControl.calculatePosition();

		offsetLeft = selectedControl.offsetLeft - selectedControl.left;
		offsetTop = selectedControl.offsetTop - selectedControl.top;

		if (selectedControl.left - offsetLeft < container.left)
		{
			selectedControl.offsetLeft = container.left - offsetLeft;
		}
		else if (selectedControl.left + offsetLeft + selectedControl.width > container.width)
		{
			selectedControl.offsetLeft = container.width - selectedControl.width;
		}

		if (selectedControl.top - offsetTop < container.top)
		{
			selectedControl.offsetTop = container.top - offsetTop;
		}
		else if (selectedControl.top + offsetTop + selectedControl.height > container.height)
		{
			selectedControl.offsetTop = container.height - selectedControl.height;
		}
	}

	function resizeWidth(e)
	{
		if (selectedControl.changeWidthIsDisabled) return;

		selectedControl.offsetWidth += Math.floor(e.pageX - data.mouseX);

		if (selectedControl.offsetWidth < selectedControl.minWidth)
		{
			selectedControl.offsetWidth = selectedControl.minWidth;
		}

		selectedControl.calculatePosition();

		if (selectedControl.left + selectedControl.width < container.width) return;

		selectedControl.offsetWidth = container.width - (selectedControl.width - selectedControl.offsetWidth) - selectedControl.left;
	}

	function resizeHeight(e)
	{
		if (selectedControl.changeHeightIsDisabled) return;

		selectedControl.offsetHeight += Math.floor(e.pageY - data.mouseY);

		if (selectedControl.offsetHeight < selectedControl.minHeight)
		{
			selectedControl.offsetHeight = selectedControl.minHeight;
		}

		selectedControl.calculatePosition();

		if (selectedControl.top + selectedControl.height < container.height) return;

		selectedControl.offsetHeight = container.height - (selectedControl.height - selectedControl.offsetHeight) - selectedControl.top;
	}

	function mousemove(e)
	{
		if (data.mode || Math.abs(data.mouseX - e.pageX) + Math.abs(data.mouseY - e.pageY) < 4) return;

		data.mode = true;

		setTimeout(function()
		{
			if (selectedControl == null) return;

			if (settingWindow.visible)
			{
				backgroundHide();
				settingWindow.hide();
			}

			if (data.resizeMode)
			{
				resizeWidth(e);
				resizeHeight(e);
			}
			else
			{
				undock(e);
				move(e);

				if (selectedControl.left <= 0 ||
					selectedControl.top <= 0 ||
					selectedControl.left + selectedControl.width >= container.width ||
					selectedControl.top + selectedControl.height >= container.height)
				{
					showDockControl(container);
					checkDock(container, e);
				}
				else if (!findDropControl(container, e))
				{
					hideDockControl();
				}
			}

			customization.resize();

			showPositionInfoPopup();

			data.mouseX = e.pageX;
			data.mouseY = e.pageY;
			data.moved = true;
			data.mode = false;
		}, 20);
	}

	function mouseup()
	{
		container.element.off({ mousemove: mousemove, mouseup: mouseup, mouseleave: customization.hide });

		setTimeout(function()
		{
			selectedControl.offsetLeft = Math.floor(selectedControl.offsetLeft / 8) * 8;
			selectedControl.offsetTop = Math.floor(selectedControl.offsetTop / 8) * 8;
			selectedControl.offsetWidth = Math.floor(selectedControl.offsetWidth / 8) * 8;
			selectedControl.offsetHeight = Math.floor(selectedControl.offsetHeight / 8) * 8;

			if (dockControl != null)
			{
				if (selectedControl.dockLeft || selectedControl.dockRight) selectedControl.offsetLeft = 0;
				if (selectedControl.dockTop || selectedControl.dockBottom) selectedControl.offsetTop = 0;

				selectedControl.setParent(dockControl).dock
				(
					selectedControl.dockLeft,
					selectedControl.dockTop,
					selectedControl.dockRight,
					selectedControl.dockBottom,
					selectedControl.dockOuterHorizontal,
					selectedControl.dockOuterVertical
				);

				selectedControl.offsetLeft -= selectedControl.parent.left;
				selectedControl.offsetTop -= selectedControl.parent.top;

				customization.resize();

				hideDockControl();
			}

			if (dockControl != null || data.moved)
			{
				selectedControl.parent.calculatePadding();
				container.resize();
			}

			if (data.moved == false)
			{
				if (settingWindowDockControl != selectedControl || !settingWindow.visible)
				{
					settingWindowDockControl = selectedControl;
					backgroundShow();
					settingWindow.show(selectedControl);

					return;
				}
				else if (settingWindow.visible)
				{
					backgroundHide();
					settingWindow.hide();
					settingWindowDockControl = null;
				}
			}

			showPositionInfoPopup();

			fixedSelect = false;
		}, 20);
	}

	//#endregion

	//#region Selection

	function selectControl(e)
	{
		/// <param name="e" type="MouseEvent"></param>

		if (fixedSelect) return;

		findSelectedControl(container, e);
	}

	function findSelectedControl(parent, e)
	{
		/// <param name="parent" type="Control"></param>
		/// <param name="e" type="MouseEvent"></param>

		for (var i = 0; i < parent.childs.length; i++)
		{
			/// <var type="Control"></var>
			var control = parent.childs[i];

			if (control == customization || control == informationPopup) continue;

			if (findSelectedControl(control, e)) return true;

			if (!control.visible) continue;

			if (e.pageX > control.left + control.width ||
				e.pageY > control.top + control.height ||
				e.pageX < control.left ||
				e.pageY < control.top) continue;

			if (control != selectedControl && control != settingWindow) customization.show(control);

			return true;
		}

		return false;
	}

	//#endregion

	//#region Controls

	customization.show = function(control)
	{
		/// <param name="control" type="Control"></param>

		if (selectedControl == control) return;
		if (selectedControl != null) customization.hide();

		element.style.display = 'block';
		customization.visible = true;
		selectedControl = control;

		showPositionInfoPopup();

		customization.resize = function()
		{
			control.resize();

			element.style.left = control.elementStyle.left;
			element.style.top = control.elementStyle.top;
			element.style.width = control.elementStyle.width;
			element.style.height = control.elementStyle.height;
		};

		customization.resize();
	};

	customization.hide = function()
	{
		if (selectedControl == null) return;

		backgroundHide();
		settingWindow.hide();
		hideDockControl();

		container.element.off({ mousemove: mousemove, mouseup: mouseup, mouseleave: customization.hide });
		customization.visible = false;
		element.style.display = 'none';

		selectedControl = null;
		fixedSelect = false;
	};

	//#endregion

	//#region Enabled

	customization.disabled = true;

	customization.enable = function(control)
	{
		customization.disabled = false;

		container.element.addClass(theme.classCustomizationOn);
		document.body.style.cssText = '-webkit-touch-callout: none; -moz-user-select: none; -ms-user-select: none; -webkit-user-select: none; -khtml-user-select: none; user-select: none;';
		container.element.on({ mousemove: selectControl, contextmenu: offEvent });

		if (typeof control != 'undefined') customization.show(control);

		autoShowHelp();
	}

	customization.disable = function()
	{
		container.element.removeClass(theme.classCustomizationOn);
		document.body.style.cssText = '';
		container.element.off({ mousemove: selectControl, contextmenu: offEvent });

		customization.disabled = true;
		customization.hide();
		backgroundHide();
	}

	customization.toggleEnabled = function()
	{
		if (customization.disabled)
		{
			customization.enable();
		}
		else
		{
			customization.disable();
		}
	}

	//#endregion

	//#region Saving settings

	main.addSaveHandler(function()
	{
		main.save('customization_notFirstOpen', notFirstOpen);
	});

	main.addLoadHandler(function()
	{
		notFirstOpen = main.loadBoolean('customization_notFirstOpen', false);
	});

	//#endregion
};

var gameWindow = new Control('gameWindow', 0, 100, 100, true);
(function()
{
	gameWindow.resetPosition = function()
	{
		gameWindow.setParent().dock(true).locate();
	};

	gameWindow.addSettings = function()
	{
		settingWindow.addSharedElements(gameWindow, false, false);

		settingWindow.addCheck(language.current.fitGameScreen, gameWindow.fitToScreen, gameWindow.setFitToScreen);
	};

	//#region Unity player

	var unityPlayer = document.getElementById('unityPlayer');

	gameWindow.hideUnityPlayer = function()
	{
		if (unityPlayer == null) return;

		unityPlayer.style.visibility = 'hidden';
	}

	gameWindow.showUnityPlayer = function()
	{
		if (unityPlayer == null) return;

		unityPlayer.style.visibility = 'visible';
	}

	gameWindow.run = function()
	{
		if (unityPlayer == null) return;

		var object = $(unityPlayer).children()[0];
		object.style.width = '100%';
		object.style.height = '100%';
	}

	//#endregion

	//#region Replace old interface

	if (isNotGameScreen)
	{
		gameWindow.elementStyle.overflow = 'auto';
		gameWindow.elementStyle.background = 'black';

		$(document.body.childNodes)
			.not(container.element)
			.appendTo(gameWindow.element);
	}
	else
	{
		gameWindow.elementStyle.overflow = 'hidden';
		gameWindow.elementStyle.background = '';

		var hiddenContainer = document.createElement('div');
		hiddenContainer.style.display = 'none';

		unityPlayer.className = theme.classCanvas;
		unityPlayer.style.position = 'absolute';
		unityPlayer.style.left = '0px';
		unityPlayer.style.top = '0px';
		unityPlayer.style.width = '100%';
		unityPlayer.style.height = '100%';
		unityPlayer.style.border = 'none';

		gameWindow.element.append(unityPlayer);
		$(document.body.childNodes).appendTo(hiddenContainer);
		document.body.appendChild(hiddenContainer);
	}

	loadingScreen.resetPosition();
	document.body.appendChild(container.element[0]);

	//#endregion

	//#region Fit to screen

	gameWindow.fitToScreen = true;

	gameWindow.setFitToScreen = function(value)
	{
		gameWindow.fitToScreen = value;
		gameWindow.resize();
	};

	gameWindow.toogleFitToScreen = function()
	{
		gameWindow.setFitToScreen(!gameWindow.fitToScreen);
	};

	function fitToScreen()
	{
		if (isNotGameScreen) return;

		var containerWidth = gameWindow.clientWidth - container.padding2 - theme.controlsBordersSize2;
		var containerHeight = gameWindow.clientHeight - container.padding2 - theme.controlsBordersSize2;

		if (gameWindow.fitToScreen)
		{
			unityPlayer.style.left = '0px';
			unityPlayer.style.top = '0px';
			unityPlayer.style.width = '100%';
			unityPlayer.style.height = '100%';
			unityPlayer.style.border = 'none';
		}
		else
		{
			var width = 1024, height = 600;

			if (width != containerWidth)
			{
				height *= (containerWidth / width);
				width = containerWidth;
			}

			if (height > containerHeight)
			{
				width *= (containerHeight / height);
				height = containerHeight;
			}

			var left = (containerWidth - width) / 2 + container.padding;
			var top = (containerHeight - height) / 2 + container.padding;

			unityPlayer.style.left = Math.floor(left) + 'px';
			unityPlayer.style.top = Math.floor(top) + 'px';
			unityPlayer.style.width = Math.floor(width) + 'px';
			unityPlayer.style.height = Math.floor(height) + 'px';
			unityPlayer.style.border = '';
		}
	}

	//#endregion

	gameWindow.resize = function ()
	{
		if (main.isNotLoaded) return;

		gameWindow.baseResize();

		fitToScreen();
	};

	//#region Saving settings

	main.addSaveHandler(function()
	{
		main.save('gameWindow_fitToScreen', gameWindow.fitToScreen);
	});

	main.addLoadHandler(function()
	{
		gameWindow.setFitToScreen(main.loadBoolean('gameWindow_fitToScreen', true));
	});

	//#endregion
})();

var options = new Control('options', 90, 32, 32);
(function()
{
	var visibleWindow = false;

	function isIntersectsWithGameWindow()
	{
		return !(options.left + options.width < gameWindow.left ||
				options.top + options.height < gameWindow.top ||
				options.left > gameWindow.left + gameWindow.width ||
				options.top > gameWindow.top + gameWindow.height);
	}

	function inGameModeMenu()
	{
		settingWindow.addButton(language.current.customize, function()
		{
			settingWindow.hide();
			customization.enable(options);
		});

		settingWindow.addDelimiter();

		settingWindow.addSelect(language.current.languageSelect, language.list, language.current.id, function(value)
		{
			language.setCurrent(language.list[value]);
		});

		settingWindow.addCheck(language.current.modeButton, main.manualControl, function()
		{
			main.toggleControl();

			return (main.manualControl ? language.current.modeManual : language.current.modeAutomatic);
		}, (main.manualControl ? language.current.modeManual : language.current.modeAutomatic));

		settingWindow.addDelimiter();

		theme.update();
		settingWindow.addSelect(language.current.themeSelect, theme.list, theme.current.id, function(value)
		{
			theme.setCurrent(theme.list[value]);
		});

		settingWindow.addSlider(language.current.themeFontSize, 8, 16, 1, theme.fontSize, function(value)
		{
			theme.fontSize = value;
			theme.elementHeight = theme.fontSize + 4;
			theme.setCurrent(theme.current);
			container.resize();
		});

		settingWindow.addSlider(language.current.themeFontSpacing, 0, 2, 1, theme.fontSpacing, function(value)
		{
			theme.fontSpacing = value;
			theme.setCurrent(theme.current);
		});

		settingWindow.addDelimiter();

		settingWindow.addLink(language.current.site, 'https://bitbucket.org/TheDarkKRONOS/dead-frontier-enhanced-ui/overview');
		settingWindow.addInscription(language.current.developers);
	}

	//#region inSettingModeMenu

	var sharedSettingsList = [], manualSettingsList = [], automaticSettingsList = [];

	options.addSharedSettingHandler = function(handler)
	{
		sharedSettingsList.push(handler);
	};

	options.addManualSettingHandler = function(handler)
	{
		manualSettingsList.push(handler);
	};

	options.addAutomaticSettingHandler = function(handler)
	{
		automaticSettingsList.push(handler);
	};

	function inSettingModeMenu()
	{
		settingWindow.addButton(language.current.exitCustomize, function()
		{
			if (isIntersectsWithGameWindow())
			{
				alert(language.current.message_isIntersectsWithGameWindow);
				return;
			}

			gameWindow.showUnityPlayer();
			customization.disable();
			visibleWindow = false;
		});

		settingWindow.addButton(language.current.customizeHelpOption, customization.showHelp);

		settingWindow.addButton(language.current.resetCustomize, function()
		{
			main.resetPosition();
			container.resize();
			settingWindow.update();
		});

		settingWindow.addDelimiter();

		settingWindow.addSharedElements(options, false, true, true, false);

		if (sharedSettingsList.length > 0)
		{
			settingWindow.addDelimiter();

			for (var i = 0; i < sharedSettingsList.length; i++) sharedSettingsList[i]();
		}

		if (manualSettingsList.length > 0)
		{
			settingWindow.addDelimiter();

			for (var i = 0; i < manualSettingsList.length; i++) manualSettingsList[i]();
		}

		if (automaticSettingsList.length > 0)
		{
			settingWindow.addDelimiter();

			for (var i = 0; i < automaticSettingsList.length; i++) automaticSettingsList[i]();
		}
	}

	//#endregion

	controls.makeButton(options, settingsData, function()
	{
		if (!customization.disabled) return;

		if (visibleWindow)
		{
			gameWindow.showUnityPlayer();
			visibleWindow = false;
			settingWindow.hide();
		}
		else
		{
			gameWindow.hideUnityPlayer();
			visibleWindow = true;
			settingWindow.show(options);
		}
	});

	options.resetPosition = function()
	{
		options.setParent().dock(true, true).locate();
	};

	options.update = function()
	{
		options.element[0].title = controls.getText(language.current.optionsButton);
		settingWindow.update();
	};

	options.addSettings = function()
	{
		if (customization.disabled)
		{
			inGameModeMenu();
		}
		else
		{
			inSettingModeMenu();
		}
	};
})();

var informationPopup = new Control('informationPopup', 101, 100, 20, false, true).hide();
(function()
{
	informationPopup.showTime = 0;

	informationPopup.element.mouseup(function()
	{
		informationPopup.showTime = 0;
		informationPopup.hide();
	});

	informationPopup.show = function(message, left, top, time)
	{
		/// <signature>
		///		<param name="message" type="String"></param>
		///		<param name="control" type="Control"></param>
		///		<param name="time" type="Integer"></param>
		/// </signature>
		/// <signature>
		///		<param name="message" type="String"></param>
		///		<param name="left" type="Integer"></param>
		///		<param name="top" type="Integer"></param>
		///		<param name="time" type="Integer"></param>
		/// </signature>

		informationPopup.element.html(message);

		var containerWidth = informationPopup.element.width();
		var containerHeight = informationPopup.element.height();

		if (typeof left == 'number')
		{
			time = time || 2;

			informationPopup.offsetLeft = Math.floor(left < 0 ? (container.width - containerWidth) / 2 : left);
			informationPopup.offsetTop = Math.floor(top < 0 ? (container.height - containerHeight) / 2 : top);

			informationPopup.resize = function()
			{
				informationPopup.baseResize();
				informationPopup.elementStyle.width = '';
				informationPopup.elementStyle.height = '';
			};
		}
		else
		{
			time = top || 2;

			function checkPosition(position)
			{
				return (position.left >= container.left &&
						position.left + containerWidth <= container.width &&
						position.top >= container.top &&
						position.top + containerHeight <= container.height);
			}

			function findPosition(control)
			{
				var controlWidth = control.width;
				var controlHeight = control.height;

				// bottom
				var position =
				{
					left: control.left,
					top: control.top + controlHeight + container.padding
				};

				if (position.left + containerWidth > container.width) position.left = control.left + controlWidth - containerWidth;
				if (checkPosition(position)) return position;

				// right
				position.left = control.left + controlWidth + container.padding;
				position.top = control.top;

				if (position.top + containerHeight > container.height) position.top = control.top + controlHeight - containerHeight;
				if (checkPosition(position)) return position;

				// top
				position.left = control.left;
				position.top = control.top - containerHeight - container.padding;

				if (position.left + containerWidth > container.width) position.left = control.left + controlWidth - containerWidth;
				if (checkPosition(position)) return position;

				// left
				position.left = control.left - containerWidth - container.padding;
				position.top = control.top;

				if (position.top + containerHeight > container.height) position.top = control.top + controlHeight - containerHeight;
				if (checkPosition(position)) return position;

				// inner
				position.left = control.left + container.padding;
				position.top = control.top + container.padding;

				return position;
			}

			informationPopup.resize = function()
			{
				var position = findPosition(left);

				informationPopup.offsetLeft = position.left - container.left;
				informationPopup.offsetTop = position.top - container.top;

				informationPopup.baseResize();

				informationPopup.elementStyle.width = '';
				informationPopup.elementStyle.height = '';
			};
		}

		informationPopup.showTime = time;
		informationPopup.baseShow();
	};

	setInterval(function()
	{
		if (informationPopup.showTime <= 0) return;

		informationPopup.showTime -= 1;

		if (informationPopup.showTime == 0) informationPopup.hide();
	}, 1000);
})();

var player = new Player();

player.findUserId = function()
{
	var elements = document.getElementsByTagName('script');
	var userIdRegex = /"SendUserID",\s"(\d+)"/i;

	if (isNotGameScreen)
	{
		elements = document.getElementsByTagName('param');
		userIdRegex = /userID=(\d+)&/i;
	}

	for (var i = 0; i < elements.length; i++)
	{
		var data = userIdRegex.exec(isNotGameScreen ? elements[i].value : elements[i].innerHTML);
		if (data == null) continue;

		player.id = parseInt(data[1]);

		break;
	}
};

var refreshButton = new Control('refreshButton', 25, 32, 32);
var healthLabel = new Control('healthLabel', 24, 96, 32);
var armorLabel = new Control('armorLabel', 23, 96, 32);
var hungerLabel = new Control('hungerLabel', 22, 96, 32);
var inventoryLabel = new Control('inventoryLabel', 21, 96, 32);
var messageLabel = new Control('messageLabel', 20, 64, 32);

(function()
{
	function playerSetting()
	{
		settingWindow.addInput(language.current.playerIdLabel, player.id, function(value)
		{
			var newId = parseInt(value);

			if (isNaN(newId))
			{
				alert(controls.getText(language.current.playerIdIsInvalid));
			}
			else
			{
				player.id = newId;
			}
		});

		settingWindow.addButton(language.current.playerIdReset, function()
		{
			player.findUserId();

			settingWindow.update();
		});
	};

	controls.makeButton(refreshButton, refreshData, function()
	{
		if (player.requestIsSend) return;

		player.refresh();
	});

	refreshButton.addSettings = function()
	{
		settingWindow.addSharedElements(refreshButton);

		playerSetting();
	};

	refreshButton.resetPosition = function()
	{
		refreshButton.setParent(gameWindow).dock(false, true, true, false, false, true).locate();
	};

	refreshButton.update = function()
	{
		refreshButton.element[0].title = controls.getText(language.current.refreshButton);
	};

	options.addAutomaticSettingHandler(function()
	{
		settingWindow.addCheck(language.current.refreshButtonOption, refreshButton.visible, refreshButton.toggle);
	});

	var a = refreshButton.offsetLeft;
})();

(function()
{
	function createLabel(control, icon, valueName, maxValueName, resetHandler, updateHandler)
	{
		/// <param name="control" type="Control"></param>
		/// <param name="icon" type="String"></param>
		/// <param name="valueName" type="String"></param>
		/// <param name="maxValueName" type="String"></param>
		/// <param name="resetHandler" type="Function"></param>
		/// <param name="updateHandler" type="Function"></param>

		control.changeHeightIsDisabled = true;
		control.resetPosition = resetHandler;
		control.update = updateHandler;

		var image = controls.createDiv(control, 'ImageButton');
		image.style.cssText =
			'background-image: url(' + icon + ');' +
			'position: absolute; left: 6px; width: 17px; height: 17px';

		control.label = controls.createDiv(control, 'Text');
		control.label.style.cssText = 'position: absolute; left: 40px; text-align: left';

		var labelStandartClasses = control.label.className;

		control.resize = function()
		{
			control.baseResize();

			image.style.top = Math.floor((control.clientHeight - 17) / 2) + 'px';

			control.label.style.top = Math.floor((control.clientHeight - theme.elementHeight) / 2 + theme.controlsBordersSize) + 'px';
			control.label.style.width = (control.clientWidth - 46) + 'px';
			control.label.style.height = theme.elementHeight + 'px';
		};

		function updateData()
		{
			control.label.innerHTML = player[valueName] + '/' + player[maxValueName];
			control.label.className = labelStandartClasses + ' ' + controls.getClassName(player[valueName], player[maxValueName]);
		}

		player.addUpdateHandler(updateData);
	}

	createLabel(healthLabel, healthData, 'health', 'maxHealth', function()
	{
		healthLabel.setParent(gameWindow).dock(true, true, false, false, false, true).locate();
	}, function()
	{
		healthLabel.element[0].title = controls.getText(language.current.healthLabel);
	});
	options.addAutomaticSettingHandler(function()
	{
		settingWindow.addCheck(language.current.healthLabelOption, healthLabel.visible, healthLabel.toggle);
	});

	createLabel(armorLabel, armorData, 'armor', 'maxArmor', function()
	{
		armorLabel.setParent(healthLabel).dock(false, true, true, false, true).locate();
	}, function()
	{
		armorLabel.element[0].title = controls.getText(language.current.armorLabel);
	});
	options.addAutomaticSettingHandler(function()
	{
		settingWindow.addCheck(language.current.armorLabelOption, armorLabel.visible, armorLabel.toggle);
	});

	createLabel(hungerLabel, hungerData, 'hunger', 'maxHunger', function()
	{
		hungerLabel.setParent(armorLabel).dock(false, true, true, false, true).locate();
	}, function()
	{
		hungerLabel.element[0].title = controls.getText(language.current.hungerLabel);
	});
	options.addAutomaticSettingHandler(function()
	{
		settingWindow.addCheck(language.current.hungerLabelOption, hungerLabel.visible, hungerLabel.toggle);
	});

	createLabel(inventoryLabel, inventoryData, 'freeInventoryCells', 'maxInventoryCells', function()
	{
		inventoryLabel.setParent(hungerLabel).dock(false, true, true, false, true).locate();
	}, function()
	{
		inventoryLabel.element[0].title = controls.getText(language.current.inventoryLabel);
	});
	options.addAutomaticSettingHandler(function()
	{
		settingWindow.addCheck(language.current.inventoryLabelOption, inventoryLabel.visible, inventoryLabel.toggle);
	});
})();

(function()
{
	messageLabel.changeWidthIsDisabled = true;
	messageLabel.changeHeightIsDisabled = true;

	messageLabel.resetPosition = function()
	{
		messageLabel.setParent(refreshButton).dock(true, true, false, false, true).locate();
	};

	messageLabel.update = function()
	{
		messageLabel.element[0].title = controls.getText(language.current.messageLabel);
	};

	var image = controls.createDiv(messageLabel, 'ImageButton');
	image.style.cssText =
		'background-image: url(' + messageData + ');' +
		'position: absolute; left: 6px; width: 17px; height: 17px';

	var label = controls.createDiv(messageLabel, 'Text');
	label.style.cssText = 'position: absolute; left: 40px; text-align: left';

	var labelStandartClasses = label.className;

	messageLabel.resize = function()
	{
		messageLabel.baseResize();

		image.style.top = Math.floor((messageLabel.clientHeight - 17) / 2) + 'px';

		label.style.top = Math.floor((messageLabel.clientHeight - theme.elementHeight) / 2 + theme.controlsBordersSize) + 'px';
		label.style.width = (messageLabel.width - 46) + 'px';
		label.style.height = theme.elementHeight + 'px';
	};

	function update()
	{
		label.innerHTML = player.newMessageCount;
		label.className = labelStandartClasses + ' ' + (player.newMessageCount > 0 ? theme.classMore0 : theme.classMore75);
	}

	player.addUpdateHandler(update);

	options.addAutomaticSettingHandler(function()
	{
		settingWindow.addCheck(language.current.messageLabelOption, messageLabel.visible, messageLabel.toggle);
	});
})();

var map = new Control('map', 10, 100, 100, true);
(function()
{
	map.scaledGridSize = 50;
	map.halfScaledGridSize = 25;
	map.gridSize = 50;

	map.offsetX = 0;
	map.offsetY = 0;
	map.halfWidth = 0;
	map.halfHeight = 0;

	var element = document.createElement('canvas');
	element.className = theme.className + ' ' + theme.classCanvas;
	element.style.cssText = 'position: absolute; left: ' + container.padding + 'px; top: ' + container.padding + 'px;';
	element.style.border = '';
	element.style.backgroundColor = 'black';
	map.element.append(element);

	var ctx = element.getContext('2d');

	var image = new Image();
	image.onload = function()
	{
		map.imageWidth = image.width / map.gridSize;
		map.imageHeight = image.height / map.gridSize;
	};
	image.src = newMapData;

	map.resetPosition = function()
	{
		map.setParent().dock(true, true, false, true).locate(0, 0, 300, 300);
	};

	function changeMapScale(value)
	{
		map.scaledGridSize = value;

		ctx.clearRect(0, 0, element.width, element.height);
		map.draw();
	}

	$(element).mousewheel(function(e)
	{
		if (e.deltaY < 0 && map.scaledGridSize > 10)
		{
			map.scaledGridSize -= 5;
		}
		else if(e.deltaY > 0 && map.scaledGridSize < 100)
		{
			map.scaledGridSize += 5;
		}

		changeMapScale(map.scaledGridSize);
		informationPopup.show(language.current.mapScale + ' ' + map.scaledGridSize, map.left + 60, map.top + 60);
	});

	map.addSettings = function()
	{
		settingWindow.addSharedElements(map);

		settingWindow.addSlider(language.current.mapScale, 10, 100, 5, map.scaledGridSize, changeMapScale);
	};

	map.update = function()
	{
		map.element[0].title = controls.getText(language.current.map);
	};

	map.resize = function()
	{
		map.baseResize();

		element.width = map.clientWidth - theme.controlsBordersSize2 - container.padding2;
		element.height = map.clientHeight - theme.controlsBordersSize2 - container.padding2;
		element.style.width = element.width + 'px';
		element.style.height = element.height + 'px';

		map.halfWidth = map.width / 2;
		map.halfHeight = map.height / 2;

		map.draw();
	};

	//#region Map view

	var mapControls =
	{
		enable: false,
		left: 1,
		top: 1,
		right: 1,
		down: 1
	};

	var data =
	{
		mouseX: 0,
		mouseY: 0,
		userMoveTimer: 0,
		smoothMoveTimer: 0,
		userMovingIsDisable: false
	};

	map.element
		.on('contextmenu selectstart', offEvent)
		.on({
			mousedown: function(e)
			{
				var position = map.element.position();

				data.mouseX = e.pageX;
				data.mouseY = e.pageY;

				if (data.userMovingIsDisable || !customization.disabled) return;
				if (e.which == 3 || e.ctrlKey) return toggleMark(data.mouseX - position.left, data.mouseY - position.top);
				if (data.userMoveTimer != 0) clearInterval(data.userMoveTimer);

				data.userMoveTimer = setInterval(function()
				{
					var horizontalMoveDisabled = map.imageWidth * map.scaledGridSize < map.width;
					var varticalMoveDisabled = map.imageHeight * map.scaledGridSize < map.height;
					var offsetX = (horizontalMoveDisabled ? 0 : 0.5 / map.halfWidth * (data.mouseX - position.left - map.halfWidth));
					var offsetY = (varticalMoveDisabled ? 0 : 0.5 / map.halfHeight * (data.mouseY - position.top - map.halfHeight));

					map.move(offsetX, offsetY);
					map.draw();
				}, 20);
			},
			mousemove: function(e)
			{
				data.mouseX = e.pageX;
				data.mouseY = e.pageY;

				if (!mapControls.enable)
				{
					mapControls.enable = true;
					map.draw();
				}
			},
			mouseup: function()
			{
				clearInterval(data.userMoveTimer);
				data.userMoveTimer = 0;
				resetControls();
			},
			mouseout: function()
			{
				clearInterval(data.userMoveTimer);
				data.userMoveTimer = 0;
				mapControls.enable = false;
				resetControls();
			}
		});

	function resetControls()
	{
		mapControls.left = 1;
		mapControls.right = 1;
		mapControls.top = 1;
		mapControls.down = 1;

		map.draw();
	}

	function activateControls(offsetX, offsetY)
	{
		mapControls.left = 1;
		mapControls.right = 1;
		mapControls.top = 1;
		mapControls.down = 1;

		if (offsetX < -0.05)
		{
			mapControls.left = 2;
		}
		else if (offsetX > 0.05)
		{
			mapControls.right = 2;
		}

		if (offsetY < -0.05)
		{
			mapControls.top = 2;
		}
		else if (offsetY > 0.05)
		{
			mapControls.down = 2;
		}
	}

	function checkBorders(newPosition)
	{
		var position =
		{
			left: (newPosition.offsetX + 0.5) * map.scaledGridSize - map.halfWidth,
			top: (newPosition.offsetY + 0.5) * map.scaledGridSize - map.halfHeight,
			width: map.imageWidth * map.scaledGridSize,
			height: map.imageHeight * map.scaledGridSize
		};

		if (position.width < map.width)
		{
			position.left = (position.width - map.width) / 2 + map.scaledGridSize;
			newPosition.offsetX = (position.left + map.halfWidth) / map.scaledGridSize - 0.5;
			mapControls.left = 0;
			mapControls.right = 0;
		}
		else if (position.left < 0)
		{
			position.left = 0;
			newPosition.offsetX = map.halfWidth / map.scaledGridSize - 0.5;
			mapControls.left = 0;
		}
		else if (position.left > position.width + map.halfScaledGridSize - map.width)
		{
			position.left = position.width + map.halfScaledGridSize - map.width;
			newPosition.offsetX = (position.left + map.halfWidth) / map.scaledGridSize - 0.5;
			mapControls.right = 0;
		}

		if (position.height < map.height)
		{
			position.top = (position.height - map.height) / 2 + map.scaledGridSize;
			newPosition.offsetY = (position.top + map.halfHeight) / map.scaledGridSize - 0.5;
			mapControls.top = 0;
			mapControls.down = 0;
		}
		else if (position.top < 0)
		{
			position.top = 0;
			newPosition.offsetY = map.halfHeight / map.scaledGridSize - 0.5;
			mapControls.top = 0;
		}
		else if (position.top > position.height + map.halfScaledGridSize - map.height)
		{
			position.top = position.height + map.halfScaledGridSize - map.height;
			newPosition.offsetY = (position.top + map.halfHeight) / map.scaledGridSize - 0.5;
			mapControls.down = 0;
		}

		return position;
	}

	map.smoothMove = function(x, y)
	{
		var speed = 15;
		var minSpeed = 0.02;
		var position = { offsetX: x, offsetY: y };

		checkBorders(position);

		if (data.userMovingIsDisable) clearInterval(data.smoothMoveTimer);

		data.userMovingIsDisable = true;

		data.smoothMoveTimer = setInterval(function()
		{
			var isEnd = true;
			var prevOffsetX = map.offsetX;
			var prevOffsetY = map.offsetY;
			var distanceX = position.offsetX - map.offsetX;
			var distanceY = position.offsetY - map.offsetY;

			if (Math.abs(distanceX) > minSpeed)
			{
				distanceX /= speed;
				if (Math.abs(distanceX) < minSpeed) distanceX = distanceX / Math.abs(distanceX) * minSpeed;
				isEnd = false;
			}

			if (Math.abs(distanceY) > minSpeed)
			{
				distanceY /= speed;
				if (Math.abs(distanceY) < minSpeed) distanceY = distanceY / Math.abs(distanceY) * minSpeed;
				isEnd = false;
			}

			map.move(distanceX, distanceY);
			map.draw();

			if (isEnd || (prevOffsetX == map.offsetX && prevOffsetY == map.offsetY))
			{
				clearInterval(data.smoothMoveTimer);
				resetControls();
				data.userMovingIsDisable = false;
			}
		}, 20);
	}

	map.move = function(offsetX, offsetY)
	{
		map.offsetX += offsetX;
		map.offsetY += offsetY;

		activateControls(offsetX, offsetY);
	};

	player.addUpdatePositionHandler(function()
	{
		map.smoothMove(player.x, player.y);
	});

	//#endregion

	//#region Render

	function setControlColor2(state1, state2, x1, y1, x2, y2, lenght)
	{
		if (state1 == 0 || state2 == 0) return;

		drawArrowShadow(x1, y1, x2, y2, lenght);

		if (state1 == 2 && state2 == 2)
		{
			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'red';
		}
		else
		{
			ctx.fillStyle = 'white';
			ctx.strokeStyle = 'white';
		}

		drawArrow(x1, y1, x2, y2, lenght);
	}

	function setControlColor3(state1, state2, state3, x1, y1, x2, y2, lenght)
	{
		if (state1 == 0) return;

		drawArrowShadow(x1, y1, x2, y2, lenght);

		if (state1 == 2 && state2 != 2 && state3 != 2)
		{
			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'red';
		}
		else
		{
			ctx.fillStyle = 'white';
			ctx.strokeStyle = 'white';
		}

		drawArrow(x1, y1, x2, y2, lenght);
	}

	function drawControls()
	{
		if (!mapControls.enable) return;

		ctx.save();

		var gridSize = Math.floor(Math.min(element.width, element.height) / 19);
		var lenght = gridSize;
		var near = gridSize;
		var near2 = gridSize * 2;
		var center = gridSize * 10;
		var far = gridSize * 18;
		var far2 = gridSize * 19;

		ctx.lineWidth = 2;

		if (element.width < element.height)
		{
			ctx.translate(0, (element.height - element.width) / 2);
		}
		else
		{
			ctx.translate((element.width - element.height) / 2, 0);
		}

		setControlColor2(mapControls.left, mapControls.top, near2, near2, near, near, lenght);
		setControlColor2(mapControls.right, mapControls.down, far, far, far2, far2, lenght);
		setControlColor2(mapControls.left, mapControls.down, near2, far, near, far2, lenght);
		setControlColor2(mapControls.right, mapControls.top, far, near2, far2, near, lenght);

		setControlColor3(mapControls.left, mapControls.top, mapControls.down, near2, center, near, center, lenght);
		setControlColor3(mapControls.right, mapControls.top, mapControls.down, far, center, far2, center, lenght);
		setControlColor3(mapControls.top, mapControls.left, mapControls.right, center, near2, center, near, lenght);
		setControlColor3(mapControls.down, mapControls.left, mapControls.right, center, far, center, far2, lenght);

		ctx.restore();
	}

	function drawArrowShadow(x1, y1, x2, y2, lenght)
	{
		ctx.fillStyle = 'black';
		ctx.strokeStyle = 'black';
		drawArrow(x1 + 1, y1 + 1, x2 + 1, y2 + 1, lenght);
	}

	function drawArrow(x1, y1, x2, y2, lenght)
	{
		var angle = Math.PI / 8;

		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.closePath();

		var lineangle = Math.atan2(y2 - y1, x2 - x1);
		var h = Math.abs(lenght / Math.cos(angle));

		var angle1 = lineangle + Math.PI + angle;
		var topx = x2 + Math.cos(angle1) * h;
		var topy = y2 + Math.sin(angle1) * h;
		var angle2 = lineangle + Math.PI - angle;
		var botx = x2 + Math.cos(angle2) * h;
		var boty = y2 + Math.sin(angle2) * h;

		var radius = 3;
		var twoPI = 2 * Math.PI;

		ctx.beginPath();
		ctx.moveTo(topx, topy);
		ctx.lineTo(x2, y2);
		ctx.lineTo(botx, boty);

		var cp1x, cp1y, cp2x, cp2y, backdist;
		var shiftamt = 5;
		if (botx == topx)
		{
			backdist = boty - topy;
			cp1x = (x2 + topx) / 2;
			cp2x = (x2 + topx) / 2;
			cp1y = y2 + backdist / shiftamt;
			cp2y = y2 - backdist / shiftamt;
		}
		else
		{
			backdist = Math.sqrt(((botx - topx) * (botx - topx)) + ((boty - topy) * (boty - topy)));
			var xback = (topx + botx) / 2;
			var yback = (topy + boty) / 2;
			var xmid = (xback + x2) / 2;
			var ymid = (yback + y2) / 2;

			var m = (boty - topy) / (botx - topx);
			var dx = (backdist / (2 * Math.sqrt(m * m + 1))) / shiftamt;
			var dy = m * dx;
			cp1x = xmid - dx;
			cp1y = ymid - dy;
			cp2x = xmid + dx;
			cp2y = ymid + dy;
		}

		ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, topx, topy);
		ctx.fill();
	}

	function drawCross(x, y, color)
	{
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + map.scaledGridSize, y + map.scaledGridSize);
		ctx.closePath();
		ctx.moveTo(x + map.scaledGridSize, y);
		ctx.lineTo(x, y + map.scaledGridSize);
		ctx.closePath();
		ctx.stroke();
	}

	function drawPlayer(position, x, y)
	{
		x = Math.floor(x * map.scaledGridSize - position.left);
		y = Math.floor(y * map.scaledGridSize - position.top);

		ctx.strokeStyle = 'red';
		ctx.lineWidth = 4;
		ctx.strokeRect(x, y, map.scaledGridSize, map.scaledGridSize);

		ctx.strokeStyle = 'white';
		ctx.lineWidth = 2;
		ctx.strokeRect(x, y, map.scaledGridSize, map.scaledGridSize);
	}

	function drawMark(position, x, y)
	{
		x = Math.floor(x * map.scaledGridSize - position.left);
		y = Math.floor(y * map.scaledGridSize - position.top);

		drawCross(x, y, 'yellow');
	}

	map.draw = function()
	{
		var position = checkBorders(map);

		ctx.drawImage(image, -Math.floor(position.left), -Math.floor(position.top), Math.floor(position.width), Math.floor(position.height));
		drawControls();

		for (var i = 0; i < marks.length; i++)
			if (marks[i].visible) drawMark(position, marks[i].x, marks[i].y);

		drawPlayer(position, player.x, player.y);
	}

	//#endregion

	//#region Marks

	function MapMark(x, y, visible)
	{
		this.x = x;
		this.y = y;
		this.visible = visible;
	}

	/// <var type="Array" elementType="MapMark"></var>
	var marks = [];

	function setMark(x, y, visible)
	{
		var newMark = new MapMark(x, y, visible);

		for (var i = 0; i < marks.length; i++)
		{
			if (marks[i].x == x && marks[i].y == y)
			{
				marks[i] = newMark;
				return;
			}
		}

		marks.push(newMark);
	}

	function toggleMark(mouseX, mouseY)
	{
		var position = checkBorders(map);
		var x = Math.floor((mouseX + container.padding - map.halfWidth) / map.scaledGridSize + map.offsetX);
		var y = Math.floor((mouseY + container.padding - map.halfHeight) / map.scaledGridSize + map.offsetY);

		for (var i = 0; i < marks.length; i++)
		{
			if (marks[i].x == x && marks[i].y == y)
			{
				marks[i].visible = !marks[i].visible;
				return;
			}
		}

		setMark(x, y, true);
	}

	map.clearMarks = function()
	{
		marks = [];
		map.draw();
	}

	map.removeMark = function(x, y)
	{
		setMark(x, y, false);
		map.draw();
	}

	map.setMark = function(x, y)
	{
		setMark(x, y, true);
		map.draw();
	}

	//#endregion

	options.addSharedSettingHandler(function()
	{
		settingWindow.addCheck(language.current.mapOption, map.visible, map.toggle);
	});

	//#region Saving settings

	main.addSaveHandler(function()
	{
		var count = 0;

		for (var i = 0; i < marks.length; i++)
		{
			if (!marks[i].visible) continue;

			main.save('map_marks_' + i + '_x', marks[i].x);
			main.save('map_marks_' + i + '_y', marks[i].y);

			count += 1;
		}

		main.save('map_marks_count', count);
	});

	main.addLoadHandler(function()
	{
		var count = main.loadNumber('map_marks_count', 0);

		for (var i = 0; i < count; i++)
		{
			var x = main.loadNumber('map_marks_' + i + '_x', -1);
			var y = main.loadNumber('map_marks_' + i + '_y', -1);

			if (x < 0 || y < 0) continue;

			setMark(x, y, true);
		}

		map.draw();
	});

	//#endregion
})();

var legend = new Control('legend', 60, 200, 100, true).hide();

(function()
{
	legend.elementStyle.overflow = 'auto';
	legend.elementStyle.padding = container.padding + 'px';

	var element = document.createElement('canvas');
	element.className = theme.className + ' ' + theme.classCanvas;
	element.style.cssText = 'position: static; left: 0px; top: 0px;';
	element.style.border = '';
	element.style.backgroundColor = '#404040';
	legend.element.append(element);

	var ctx = element.getContext('2d');

	var imageWidth = 0;
	var imageHeight = 0;
	var image = new Image();
	image.onload = function()
	{
		imageWidth = image.width;
		imageHeight = image.height;
	};
	image.src = newLegendData;

	$(legend.element).mouseup(function()
	{
		legend.hide();
	});

	legend.resetPosition = function()
	{
		legend.setParent().dock(true, true, false, true).locate(container.padding, 0, 300, 900);
	};

	legend.update = function()
	{
		legend.element[0].title = controls.getText(language.current.legend);
	};

	legend.resize = function()
	{
		legend.baseResize();

		element.width = legend.element.width() - theme.controlsBordersSize2 - container.padding2;
		element.height = imageHeight;
		element.style.width = element.width + 'px';
		element.style.height = imageHeight + 'px';

		legend.draw();
	};

	function drawText(text, lineNumber)
	{
		var left = imageWidth + container.padding;
		var top = lineNumber * 50;

		if (text != null) ctx.fillText(text.line1 || text, left, top);
		if (text.line2 != null) ctx.fillText(text.line2, left, top + 25);

		top += 51;

		ctx.beginPath();
		ctx.moveTo(imageWidth, top);
		ctx.lineTo(element.width, top);
		ctx.stroke();
	}

	legend.draw = function()
	{
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'black';

		ctx.clearRect(0, 0, element.width, element.height);

		ctx.strokeRect(1, 1, element.width - 2, element.height - 2);
		ctx.drawImage(image, 0, 0, imageWidth, imageHeight);

		ctx.font = '20px "Times New Roman"';
		ctx.textBaseline = 'top';
		ctx.fillStyle = 'white';

		drawText(language.current.legendDescriptionOutpost, 0);
		drawText(language.current.legendDescriptionWarehouse, 1);
		drawText(language.current.legendDescriptionHouse, 2);
		drawText(language.current.legendDescriptionApartment, 3);
		drawText(language.current.legendDescriptionPoliceStation, 4);
		drawText(language.current.legendDescriptionClothingStore, 5);
		drawText(language.current.legendDescriptionSuperMarket, 6);
		drawText(language.current.legendDescriptionShop, 7);
		drawText(language.current.legendDescriptionRowShops, 8);
		drawText(language.current.legendDescriptionHospital, 9);
		drawText(language.current.legendDescriptionSchool, 10);
		drawText(language.current.legendDescriptionSportField, 11);
		drawText(language.current.legendDescriptionHotel, 12);
		drawText(language.current.legendDescriptionJunkyard, 13);
		drawText(language.current.legendDescriptionOfficeBuilding, 14);
		drawText(language.current.legendDescriptionBlinds, 15);
		drawText(language.current.legendDescriptionGreenArea, 16);
		drawText(language.current.legendDescriptionBigGreenArea, 17);
		drawText(language.current.legendDescriptionDoorBarricade, 18);
		drawText(language.current.legendDescriptionCyanRoute, 19);
		drawText(language.current.legendDescriptionGreenRoute, 20);
		drawText(language.current.legendDescriptionYellowRoute, 21);
		drawText(language.current.legendDescriptionOrangeRoute, 22);
		drawText(language.current.legendDescriptionRedRoute, 23);
		drawText(language.current.legendDescriptionBlueZone, 24);
		drawText(language.current.legendDescriptionGreenZone, 25);
		drawText(language.current.legendDescriptionYellowZone, 26);
		drawText(language.current.legendDescriptionOrangeZone, 27);
		drawText(language.current.legendDescriptionRedZone, 28);
		drawText(language.current.legendDescriptionDarkZone, 29);
		drawText(language.current.legendDescriptionNightmareZone, 30);
	}
})();

function visibleOnlyManualControl(control)
{
	/// <param name="control" type="Control"></param>

	main.addSwitchingManualControlHandler(function()
	{
		control.show();
	});

	main.addSwitchingAutomaticControlHandler(function()
	{
		control.hide();
	});
}

var legendButton = new Control('legendButton', 45, 32, 32);
controls.makeButton(legendButton, legendData, legend.toggle);
legendButton.resetPosition = function()
{
	legendButton.setParent(map).dock(true, true, false, false, false, true).locate();
};
legendButton.update = function()
{
	legendButton.element[0].title = controls.getText(language.current.legendButton);
};
options.addSharedSettingHandler(function()
{
	settingWindow.addCheck(language.current.legendButtonOption, legendButton.visible, legendButton.toggle);
});

var centeredOnPlayerButton = new Control('centeredOnPlayerButton', 42, 32, 32);
controls.makeButton(centeredOnPlayerButton, centeredData, function()
{
	map.smoothMove(player.x, player.y);
});
centeredOnPlayerButton.resetPosition = function()
{
	centeredOnPlayerButton.setParent(upButton).dock(false, false, true, true, false, true).locate();
};
centeredOnPlayerButton.update = function()
{
	centeredOnPlayerButton.element[0].title = controls.getText(language.current.centeredOnPlayerButton);
};
options.addSharedSettingHandler(function()
{
	settingWindow.addCheck(language.current.centeredOnPlayerButtonOption, centeredOnPlayerButton.visible, centeredOnPlayerButton.toggle);
});

var upButton = new Control('upButton', 40, 32, 32);
controls.makeButton(upButton, upData, function()
{
	if (player.y > 0) player.add(0, -1);
});
upButton.resetPosition = function()
{
	upButton.setParent(rightUpButton).dock(true, true, false, false, true, false).locate();
};
upButton.update = function()
{
	upButton.element[0].title = controls.getText(language.current.upButton);
};
visibleOnlyManualControl(upButton);

var downButton = new Control('downButton', 40, 32, 32);
controls.makeButton(downButton, downData, function()
{
	if (player.y < Math.floor(map.imageHeight - 1)) player.add(0, 1);
});
downButton.resetPosition = function()
{
	downButton.setParent(centeredOnPlayerButton).dock(false, false, true, true, false, true);
};
downButton.update = function()
{
	downButton.element[0].title = controls.getText(language.current.downButton);
};
visibleOnlyManualControl(downButton);

var leftUpButton = new Control('leftUpButton', 40, 32, 32);
controls.makeButton(leftUpButton, upLeftData, function()
{
	if (player.x > 0) player.add(-1, 0);
	if (player.y > 0) player.add(0, -1);
});
leftUpButton.resetPosition = function()
{
	leftUpButton.setParent(upButton).dock(true, true, false, false, true, false).locate();
};
leftUpButton.update = function()
{
	leftUpButton.element[0].title = controls.getText(language.current.leftUpButton);
};
visibleOnlyManualControl(leftUpButton);

var leftButton = new Control('leftButton', 40, 32, 32);
controls.makeButton(leftButton, leftData, function()
{
	if (player.x > 0) player.add(-1, 0);
});
leftButton.resetPosition = function()
{
	leftButton.setParent(centeredOnPlayerButton).dock(true, true, false, false, true, false).locate();
};
leftButton.update = function()
{
	leftButton.element[0].title = controls.getText(language.current.leftButton);
};
visibleOnlyManualControl(leftButton);

var leftDownButton = new Control('leftDownButton', 40, 32, 32);
controls.makeButton(leftDownButton, downLeftData, function()
{
	if (player.x > 0) player.add(-1, 0);
	if (player.y < Math.floor(map.imageHeight - 1)) player.add(0, 1);
});
leftDownButton.resetPosition = function()
{
	leftDownButton.setParent(downButton).dock(true, false, false, true, true, false).locate();
};
leftDownButton.update = function()
{
	leftDownButton.element[0].title = controls.getText(language.current.leftDownButton);
};
visibleOnlyManualControl(leftDownButton);

var rightUpButton = new Control('rightUpButton', 40, 32, 32);
controls.makeButton(rightUpButton, upRightData, function()
{
	if (player.x < Math.floor(map.imageWidth - 1)) player.add(1, 0);
	if (player.y > 0) player.add(0, -1);
});
rightUpButton.resetPosition = function()
{
	rightUpButton.setParent(map).dock(false, false, true, true, false, true).locate();
};
rightUpButton.update = function()
{
	rightUpButton.element[0].title = controls.getText(language.current.rightUpButton);
};
visibleOnlyManualControl(rightUpButton);

var rightButton = new Control('rightButton', 40, 32, 32);
controls.makeButton(rightButton, rightData, function()
{
	if (player.x < Math.floor(map.imageWidth - 1)) player.add(1, 0);
});
rightButton.resetPosition = function()
{
	rightButton.setParent(centeredOnPlayerButton).dock(false, true, true, false, true, false).locate();
};
rightButton.update = function()
{
	rightButton.element[0].title = controls.getText(language.current.rightButton);
};
visibleOnlyManualControl(rightButton);

var rightDownButton = new Control('rightDownButton', 40, 32, 32);
controls.makeButton(rightDownButton, downRightData, function()
{
	if (player.x < Math.floor(map.imageWidth - 1)) player.add(1, 0);
	if (player.y < Math.floor(map.imageHeight - 1)) player.add(0, 1);
});
rightDownButton.resetPosition = function()
{
	rightDownButton.setParent(downButton).dock(false, false, true, true, true, false).locate();
};
rightDownButton.update = function()
{
	rightDownButton.element[0].title = controls.getText(language.current.rightDownButton);
};
visibleOnlyManualControl(rightDownButton);

var checkedButton = new Control('checkedButton', 41, 32, 32);
controls.makeButton(checkedButton, checkData, function()
{
	map.setMark(player.x, player.y);
});
checkedButton.resetPosition = function()
{
	checkedButton.setParent(map).dock(true, false, false, true, false, true).locate();
};
checkedButton.update = function()
{
	checkedButton.element[0].title = controls.getText(language.current.checkButton);
};
options.addSharedSettingHandler(function()
{
	settingWindow.addCheck(language.current.checkButtonOption, checkedButton.visible, checkedButton.toggle);
});

var clearButton = new Control('clearButton', 41, 32, 32);
controls.makeButton(clearButton, clearData, function()
{
	map.removeMark(player.x, player.y);
});
clearButton.resetPosition = function()
{
	clearButton.setParent(checkedButton).dock(true, false, false, true, false, true).locate();
};
clearButton.update = function()
{
	clearButton.element[0].title = controls.getText(language.current.clearButton);
};
options.addSharedSettingHandler(function()
{
	settingWindow.addCheck(language.current.clearButtonOption, clearButton.visible, clearButton.toggle);
});

var clearAllButton = new Control('clearAllButton', 41, 32, 32);
controls.makeButton(clearAllButton, clearAllData, map.clearMarks);
clearAllButton.resetPosition = function()
{
	clearAllButton.setParent(clearButton).dock(true, false, false, true, false, true).locate();
};
clearAllButton.update = function()
{
	clearAllButton.element[0].title = controls.getText(language.current.clearAllButton);
};
options.addSharedSettingHandler(function()
{
	settingWindow.addCheck(language.current.clearAllButtonOption, clearAllButton.visible, clearAllButton.toggle);
});

function playerControlButtonsToggle()
{
	upButton.toggle();
	downButton.toggle();
	leftButton.toggle();
	rightButton.toggle();
	leftUpButton.toggle();
	leftDownButton.toggle();
	rightUpButton.toggle();
	rightDownButton.toggle();
}

options.addManualSettingHandler(function()
{
	settingWindow.addCheck(language.current.playerControlButtonsToggleOption, upButton.visible, playerControlButtonsToggle);
});

map.outposts =
{
	Street: { id: 'Street', text: "Street", x: -1, y: -1, hidden: true },
	FortPastor: { id: 'FortPastor', text: "Fort Pastor", x: 31, y: 23 },
	NastyasHoldout: { id: 'NastyasHoldout', text: "Nastya's Holdout", x: 1, y: 20 },
	DoggsStockage: { id: 'DoggsStockage', text: "Dogg's Stockage", x: 7, y: 5 },
	Precint13: { id: 'Precint13', text: "Precint 13", x: 14, y: 39 }
};

map.outpost = map.outposts.NastyasHoldout;

var outpostSelect = new Control('outpostSelect', 30, 96, 32, true);
(function()
{
	outpostSelect.changeHeightIsDisabled = true;

	outpostSelect.resetPosition = function()
	{
		outpostSelect.setParent(map).dock(false, true, true, false, false, true).locate(0, 0, 160);
	};

	outpostSelect.update = function()
	{
		outpostSelect.element[0].title = controls.getText(language.current.outpostSelect);
	};

	var image = controls.createDiv(outpostSelect, 'ImageButton');
	image.style.cssText =
		'background-image: url(' + outpostData + ');' +
		'position: absolute; left: 6px; width: 17px; height: 17px';

	var select = controls.createSelect(outpostSelect, function(value)
	{
		if (value == map.outposts.Street.id)
		{
			select.value = map.outpost.id;

			return;
		}

		map.outpost = map.outposts[value];

		if (main.manualControl)
		{
			player.move(map.outpost.x, map.outpost.y);
		}
		else
		{
			map.smoothMove(map.outpost.x, map.outpost.y);
		}
	});
	select.style.cssText = 'position: absolute; left: 40px; text-align: left';
	controls.updateSelect(outpostSelect, select, map.outposts, map.outposts.Street.id);

	outpostSelect.resize = function()
	{
		outpostSelect.baseResize();

		image.style.top = Math.floor((outpostSelect.clientHeight - 17) / 2) + 'px';

		select.style.top = Math.floor((outpostSelect.clientHeight - theme.elementHeight) / 2 + theme.controlsBordersSize) + 'px';
		select.style.width = (outpostSelect.clientWidth - 46) + 'px';
		select.style.height = theme.elementHeight + 'px';
	};

	function updatePosition()
	{
		for (var item in map.outposts)
		{
			if (!map.outposts.hasOwnProperty(item) || player.x != map.outposts[item].x || player.y != map.outposts[item].y) continue;

			select.value = map.outposts[item].id;
			return;
		}

		select.value = map.outposts.Street.id;
	}

	player.addUpdatePositionHandler(updatePosition);
	options.addSharedSettingHandler(function()
	{
		settingWindow.addCheck(language.current.outpostSelectOption, outpostSelect.visible, outpostSelect.toggle);
	});

	updatePosition();
})();

var chat = new Control('chat', 15, 100, 100);

(function()
{
	chat.url = "";
	chat.openInNewWindowCommand = "";
	chat.elementStyle.padding = container.padding + 'px';

	var element = document.createElement('iframe');
	element.className = theme.className + ' ' + theme.classCanvas;
	element.style.cssText = 'position: static; margin: 0; left: 0%; top: 0%; width: 100%; height: 100%';
	element.style.backgroundColor = 'black';
	chat.element.append(element);

	//#region Find chat url

	var tags = document.getElementsByTagName(isNotGameScreen ? 'img' : 'a');

	for (var i = 0; i < tags.length; i++)
	{
		try
		{
			var data = tags[i].getAttribute('onclick');

			var startUrlIndex = data.indexOf("window.open('http://chat.deadfrontier.com");
			if (startUrlIndex < 0) continue;
			startUrlIndex += 13;

			var endUrlIndex = data.indexOf("'", startUrlIndex);
			if (endUrlIndex < 0) continue;

			chat.openInNewWindowCommand = data;
			chat.url = data.substring(startUrlIndex, endUrlIndex);

			break;
		}
		catch (e) { }
	}

	element.src = chat.url;

	//#endregion

	chat.show = function()
	{
		element.src = chat.url;
		chat.baseShow();
	};

	chat.resetPosition = function()
	{
		chat.setParent().dock(false, true, true, true).locate(0, 0, 600, 800);
	};

	options.addSharedSettingHandler(function()
	{
		settingWindow.addCheck(language.current.chatOption, chat.visible, chat.toggle);
	});
})();

var openChatInNewWindowButton = new Control('openChatInNewWindowButton', 45, 32, 32);
controls.makeButton(openChatInNewWindowButton, chatInNewWindowData, function()
{
	setTimeout(chat.openInNewWindowCommand, 0);
	chat.hide();
});
openChatInNewWindowButton.resetPosition = function()
{
	openChatInNewWindowButton.setParent(options).dock(false, true, true, false, true, false).locate();
};
openChatInNewWindowButton.update = function()
{
	openChatInNewWindowButton.element[0].title = controls.getText(language.current.openChatButton);
};
options.addSharedSettingHandler(function()
{
	settingWindow.addCheck(language.current.openChatButtonOption, openChatInNewWindowButton.visible, openChatInNewWindowButton.toggle);
});

var openChatButton = new Control('openChatButton', 45, 32, 32);
controls.makeButton(openChatButton, chatData, chat.toggle);
openChatButton.resetPosition = function()
{
	openChatButton.setParent(openChatInNewWindowButton).dock(false, true, true, false, true, false).locate();
};
openChatButton.update = function()
{
	openChatButton.element[0].title = controls.getText(language.current.openChatButton);
};
options.addSharedSettingHandler(function()
{
	settingWindow.addCheck(language.current.toggleChatButtonOption, openChatButton.visible, openChatButton.toggle);
});

$(function()
{
	main.resetPosition();
	main.loadAll();

	if (language.current == null) language.setCurrent(language.list.en);
	if (theme.current == null) theme.setCurrent(theme.list.standart);
	if (player.id == 0) player.findUserId();
	map.smoothMove(player.x, player.y);

	main.isNotLoaded = false;
	container.resize();
	controls.notIgnoreHiddenOnResize = false;

	gameWindow.run();

	loadingScreen.hide();
});

$(window).unload(main.saveAll);

})(window, window.document);
