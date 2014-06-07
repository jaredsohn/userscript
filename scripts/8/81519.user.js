// -----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "xitek slide show", and click Uninstall.
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          xitek slide show
// @namespace     http://userscripts.org/users/188423
// @description   Slide show xitek photo
// @version       0.1.0
// @include       http://forum.xitek.com/showthread.php*
// ==/UserScript==

// -----------------------------------------------------------------------------
// jQuery 1.3.2
// -----------------------------------------------------------------------------

(function(){

var 
	// Will speed up references to window, and allows munging its name.
	window = this,
	// Will speed up references to undefined, and allows munging its name.
	undefined,
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,
	// Map over the $ in case of overwrite
	_$ = window.$,

	jQuery = window.jQuery = window.$ = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context );
	},

	// A simple way to check for HTML strings or ID strings
	// (both of which we optimize for)
	quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
	// Is it a simple selector
	isSimple = /^.[^:#\[\.,]*$/;

jQuery.fn = jQuery.prototype = {
	init: function( selector, context ) {
		// Make sure that a selection was provided
		selector = selector || document;

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this[0] = selector;
			this.length = 1;
			this.context = selector;
			return this;
		}
		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			var match = quickExpr.exec( selector );

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] )
					selector = jQuery.clean( [ match[1] ], context );

				// HANDLE: $("#id")
				else {
					var elem = document.getElementById( match[3] );

					// Handle the case where IE and Opera return items
					// by name instead of ID
					if ( elem && elem.id != match[3] )
						return jQuery().find( selector );

					// Otherwise, we inject the element directly into the jQuery object
					var ret = jQuery( elem || [] );
					ret.context = document;
					ret.selector = selector;
					return ret;
				}

			// HANDLE: $(expr, [context])
			// (which is just equivalent to: $(content).find(expr)
			} else
				return jQuery( context ).find( selector );

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) )
			return jQuery( document ).ready( selector );

		// Make sure that old selector state is passed along
		if ( selector.selector && selector.context ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return this.setArray(jQuery.isArray( selector ) ?
			selector :
			jQuery.makeArray(selector));
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.3.2",

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num === undefined ?

			// Return a 'clean' array
			Array.prototype.slice.call( this ) :

			// Return just the object
			this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = jQuery( elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" )
			ret.selector = this.selector + (this.selector ? " " : "") + selector;
		else if ( name )
			ret.selector = this.selector + "." + name + "(" + selector + ")";

		// Return the newly-formed element set
		return ret;
	},

	// Force the current matched set of elements to become
	// the specified array of elements (destroying the stack in the process)
	// You should use pushStack() in order to do this, but maintain the stack
	setArray: function( elems ) {
		// Resetting the length to 0, then using the native Array push
		// is a super-fast way to populate an object with array-like properties
		this.length = 0;
		Array.prototype.push.apply( this, elems );

		return this;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {
		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem && elem.jquery ? elem[0] : elem
		, this );
	},

	attr: function( name, value, type ) {
		var options = name;

		// Look for the case where we're accessing a style value
		if ( typeof name === "string" )
			if ( value === undefined )
				return this[0] && jQuery[ type || "attr" ]( this[0], name );

			else {
				options = {};
				options[ name ] = value;
			}

		// Check to see if we're setting style values
		return this.each(function(i){
			// Set all the styles
			for ( name in options )
				jQuery.attr(
					type ?
						this.style :
						this,
					name, jQuery.prop( this, options[ name ], type, i, name )
				);
		});
	},

	css: function( key, value ) {
		// ignore negative width and height values
		if ( (key == 'width' || key == 'height') && parseFloat(value) < 0 )
			value = undefined;
		return this.attr( key, value, "curCSS" );
	},

	text: function( text ) {
		if ( typeof text !== "object" && text != null )
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );

		var ret = "";

		jQuery.each( text || this, function(){
			jQuery.each( this.childNodes, function(){
				if ( this.nodeType != 8 )
					ret += this.nodeType != 1 ?
						this.nodeValue :
						jQuery.fn.text( [ this ] );
			});
		});

		return ret;
	},

	wrapAll: function( html ) {
		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).clone();

			if ( this[0].parentNode )
				wrap.insertBefore( this[0] );

			wrap.map(function(){
				var elem = this;

				while ( elem.firstChild )
					elem = elem.firstChild;

				return elem;
			}).append(this);
		}

		return this;
	},

	wrapInner: function( html ) {
		return this.each(function(){
			jQuery( this ).contents().wrapAll( html );
		});
	},

	wrap: function( html ) {
		return this.each(function(){
			jQuery( this ).wrapAll( html );
		});
	},

	append: function() {
		return this.domManip(arguments, true, function(elem){
			if (this.nodeType == 1)
				this.appendChild( elem );
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function(elem){
			if (this.nodeType == 1)
				this.insertBefore( elem, this.firstChild );
		});
	},

	before: function() {
		return this.domManip(arguments, false, function(elem){
			this.parentNode.insertBefore( elem, this );
		});
	},

	after: function() {
		return this.domManip(arguments, false, function(elem){
			this.parentNode.insertBefore( elem, this.nextSibling );
		});
	},

	end: function() {
		return this.prevObject || jQuery( [] );
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: [].push,
	sort: [].sort,
	splice: [].splice,

	find: function( selector ) {
		if ( this.length === 1 ) {
			var ret = this.pushStack( [], "find", selector );
			ret.length = 0;
			jQuery.find( selector, this[0], ret );
			return ret;
		} else {
			return this.pushStack( jQuery.unique(jQuery.map(this, function(elem){
				return jQuery.find( selector, elem );
			})), "find", selector );
		}
	},

	clone: function( events ) {
		// Do the clone
		var ret = this.map(function(){
			if ( !jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this) ) {
				// IE copies events bound via attachEvent when
				// using cloneNode. Calling detachEvent on the
				// clone will also remove the events from the orignal
				// In order to get around this, we use innerHTML.
				// Unfortunately, this means some modifications to
				// attributes in IE that are actually only stored
				// as properties will not be copied (such as the
				// the name attribute on an input).
				var html = this.outerHTML;
				if ( !html ) {
					var div = this.ownerDocument.createElement("div");
					div.appendChild( this.cloneNode(true) );
					html = div.innerHTML;
				}

				return jQuery.clean([html.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0];
			} else
				return this.cloneNode(true);
		});

		// Copy the events from the original to the clone
		if ( events === true ) {
			var orig = this.find("*").andSelf(), i = 0;

			ret.find("*").andSelf().each(function(){
				if ( this.nodeName !== orig[i].nodeName )
					return;

				var events = jQuery.data( orig[i], "events" );

				for ( var type in events ) {
					for ( var handler in events[ type ] ) {
						jQuery.event.add( this, type, events[ type ][ handler ], events[ type ][ handler ].data );
					}
				}

				i++;
			});
		}

		// Return the cloned set
		return ret;
	},

	filter: function( selector ) {
		return this.pushStack(
			jQuery.isFunction( selector ) &&
			jQuery.grep(this, function(elem, i){
				return selector.call( elem, i );
			}) ||

			jQuery.multiFilter( selector, jQuery.grep(this, function(elem){
				return elem.nodeType === 1;
			}) ), "filter", selector );
	},

	closest: function( selector ) {
		var pos = jQuery.expr.match.POS.test( selector ) ? jQuery(selector) : null,
			closer = 0;

		return this.map(function(){
			var cur = this;
			while ( cur && cur.ownerDocument ) {
				if ( pos ? pos.index(cur) > -1 : jQuery(cur).is(selector) ) {
					jQuery.data(cur, "closest", closer);
					return cur;
				}
				cur = cur.parentNode;
				closer++;
			}
		});
	},

	not: function( selector ) {
		if ( typeof selector === "string" )
			// test special case where just one selector is passed in
			if ( isSimple.test( selector ) )
				return this.pushStack( jQuery.multiFilter( selector, this, true ), "not", selector );
			else
				selector = jQuery.multiFilter( selector, this );

		var isArrayLike = selector.length && selector[selector.length - 1] !== undefined && !selector.nodeType;
		return this.filter(function() {
			return isArrayLike ? jQuery.inArray( this, selector ) < 0 : this != selector;
		});
	},

	add: function( selector ) {
		return this.pushStack( jQuery.unique( jQuery.merge(
			this.get(),
			typeof selector === "string" ?
				jQuery( selector ) :
				jQuery.makeArray( selector )
		)));
	},

	is: function( selector ) {
		return !!selector && jQuery.multiFilter( selector, this ).length > 0;
	},

	hasClass: function( selector ) {
		return !!selector && this.is( "." + selector );
	},

	val: function( value ) {
		if ( value === undefined ) {			
			var elem = this[0];

			if ( elem ) {
				if( jQuery.nodeName( elem, 'option' ) )
					return (elem.attributes.value || {}).specified ? elem.value : elem.text;
				
				// We need to handle select boxes special
				if ( jQuery.nodeName( elem, "select" ) ) {
					var index = elem.selectedIndex,
						values = [],
						options = elem.options,
						one = elem.type == "select-one";

					// Nothing was selected
					if ( index < 0 )
						return null;

					// Loop through all the selected options
					for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
						var option = options[ i ];

						if ( option.selected ) {
							// Get the specifc value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if ( one )
								return value;

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;				
				}

				// Everything else, we just grab the value
				return (elem.value || "").replace(/\r/g, "");

			}

			return undefined;
		}

		if ( typeof value === "number" )
			value += '';

		return this.each(function(){
			if ( this.nodeType != 1 )
				return;

			if ( jQuery.isArray(value) && /radio|checkbox/.test( this.type ) )
				this.checked = (jQuery.inArray(this.value, value) >= 0 ||
					jQuery.inArray(this.name, value) >= 0);

			else if ( jQuery.nodeName( this, "select" ) ) {
				var values = jQuery.makeArray(value);

				jQuery( "option", this ).each(function(){
					this.selected = (jQuery.inArray( this.value, values ) >= 0 ||
						jQuery.inArray( this.text, values ) >= 0);
				});

				if ( !values.length )
					this.selectedIndex = -1;

			} else
				this.value = value;
		});
	},

	html: function( value ) {
		return value === undefined ?
			(this[0] ?
				this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") :
				null) :
			this.empty().append( value );
	},

	replaceWith: function( value ) {
		return this.after( value ).remove();
	},

	eq: function( i ) {
		return this.slice( i, +i + 1 );
	},

	slice: function() {
		return this.pushStack( Array.prototype.slice.apply( this, arguments ),
			"slice", Array.prototype.slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function(elem, i){
			return callback.call( elem, i, elem );
		}));
	},

	andSelf: function() {
		return this.add( this.prevObject );
	},

	domManip: function( args, table, callback ) {
		if ( this[0] ) {
			var fragment = (this[0].ownerDocument || this[0]).createDocumentFragment(),
				scripts = jQuery.clean( args, (this[0].ownerDocument || this[0]), fragment ),
				first = fragment.firstChild;

			if ( first )
				for ( var i = 0, l = this.length; i < l; i++ )
					callback.call( root(this[i], first), this.length > 1 || i > 0 ?
							fragment.cloneNode(true) : fragment );
		
			if ( scripts )
				jQuery.each( scripts, evalScript );
		}

		return this;
		
		function root( elem, cur ) {
			return table && jQuery.nodeName(elem, "table") && jQuery.nodeName(cur, "tr") ?
				(elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
				elem;
		}
	}
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

function evalScript( i, elem ) {
	if ( elem.src )
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});

	else
		jQuery.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );

	if ( elem.parentNode )
		elem.parentNode.removeChild( elem );
}

function now(){
	return +new Date;
}

jQuery.extend = jQuery.fn.extend = function() {
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) )
		target = {};

	// extend jQuery itself if only one argument is passed
	if ( length == i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ )
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null )
			// Extend the base object
			for ( var name in options ) {
				var src = target[ name ], copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy )
					continue;

				// Recurse if we're merging object values
				if ( deep && copy && typeof copy === "object" && !copy.nodeType )
					target[ name ] = jQuery.extend( deep, 
						// Never move original objects, clone them
						src || ( copy.length != null ? [ ] : { } )
					, copy );

				// Don't bring in undefined values
				else if ( copy !== undefined )
					target[ name ] = copy;

			}

	// Return the modified object
	return target;
};

// exclude the following css properties to add px
var	exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
	// cache defaultView
	defaultView = document.defaultView || {},
	toString = Object.prototype.toString;

jQuery.extend({
	noConflict: function( deep ) {
		window.$ = _$;

		if ( deep )
			window.jQuery = _jQuery;

		return jQuery;
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

	// check if an element is in a (or is an) XML document
	isXMLDoc: function( elem ) {
		return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
			!!elem.ownerDocument && jQuery.isXMLDoc( elem.ownerDocument );
	},

	// Evalulates a script in a global context
	globalEval: function( data ) {
		if ( data && /\S/.test(data) ) {
			// Inspired by code by Andrea Giammarchi
			// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";
			if ( jQuery.support.scriptEval )
				script.appendChild( document.createTextNode( data ) );
			else
				script.text = data;

			// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
			// This arises when a base node is used (#2709).
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0, length = object.length;

		if ( args ) {
			if ( length === undefined ) {
				for ( name in object )
					if ( callback.apply( object[ name ], args ) === false )
						break;
			} else
				for ( ; i < length; )
					if ( callback.apply( object[ i++ ], args ) === false )
						break;

		// A special, fast, case for the most common use of each
		} else {
			if ( length === undefined ) {
				for ( name in object )
					if ( callback.call( object[ name ], name, object[ name ] ) === false )
						break;
			} else
				for ( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ){}
		}

		return object;
	},

	prop: function( elem, value, type, i, name ) {
		// Handle executable functions
		if ( jQuery.isFunction( value ) )
			value = value.call( elem, i );

		// Handle passing in a number to a CSS property
		return typeof value === "number" && type == "curCSS" && !exclude.test( name ) ?
			value + "px" :
			value;
	},

	className: {
		// internal only, use addClass("class")
		add: function( elem, classNames ) {
			jQuery.each((classNames || "").split(/\s+/), function(i, className){
				if ( elem.nodeType == 1 && !jQuery.className.has( elem.className, className ) )
					elem.className += (elem.className ? " " : "") + className;
			});
		},

		// internal only, use removeClass("class")
		remove: function( elem, classNames ) {
			if (elem.nodeType == 1)
				elem.className = classNames !== undefined ?
					jQuery.grep(elem.className.split(/\s+/), function(className){
						return !jQuery.className.has( classNames, className );
					}).join(" ") :
					"";
		},

		// internal only, use hasClass("class")
		has: function( elem, className ) {
			return elem && jQuery.inArray( className, (elem.className || elem).toString().split(/\s+/) ) > -1;
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
		for ( var name in options )
			elem.style[ name ] = old[ name ];
	},

	css: function( elem, name, force, extra ) {
		if ( name == "width" || name == "height" ) {
			var val, props = { position: "absolute", visibility: "hidden", display:"block" }, which = name == "width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ];

			function getWH() {
				val = name == "width" ? elem.offsetWidth : elem.offsetHeight;

				if ( extra === "border" )
					return;

				jQuery.each( which, function() {
					if ( !extra )
						val -= parseFloat(jQuery.curCSS( elem, "padding" + this, true)) || 0;
					if ( extra === "margin" )
						val += parseFloat(jQuery.curCSS( elem, "margin" + this, true)) || 0;
					else
						val -= parseFloat(jQuery.curCSS( elem, "border" + this + "Width", true)) || 0;
				});
			}

			if ( elem.offsetWidth !== 0 )
				getWH();
			else
				jQuery.swap( elem, props, getWH );

			return Math.max(0, Math.round(val));
		}

		return jQuery.curCSS( elem, name, force );
	},

	curCSS: function( elem, name, force ) {
		var ret, style = elem.style;

		// We need to handle opacity special in IE
		if ( name == "opacity" && !jQuery.support.opacity ) {
			ret = jQuery.attr( style, "opacity" );

			return ret == "" ?
				"1" :
				ret;
		}

		// Make sure we're using the right name for getting the float value
		if ( name.match( /float/i ) )
			name = styleFloat;

		if ( !force && style && style[ name ] )
			ret = style[ name ];

		else if ( defaultView.getComputedStyle ) {

			// Only "float" is needed here
			if ( name.match( /float/i ) )
				name = "float";

			name = name.replace( /([A-Z])/g, "-$1" ).toLowerCase();

			var computedStyle = defaultView.getComputedStyle( elem, null );

			if ( computedStyle )
				ret = computedStyle.getPropertyValue( name );

			// We should always get a number back from opacity
			if ( name == "opacity" && ret == "" )
				ret = "1";

		} else if ( elem.currentStyle ) {
			var camelCase = name.replace(/\-(\w)/g, function(all, letter){
				return letter.toUpperCase();
			});

			ret = elem.currentStyle[ name ] || elem.currentStyle[ camelCase ];

			// From the awesome hack by Dean Edwards
			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			if ( !/^\d+(px)?$/i.test( ret ) && /^\d/.test( ret ) ) {
				// Remember the original values
				var left = style.left, rsLeft = elem.runtimeStyle.left;

				// Put in the new values to get a computed value out
				elem.runtimeStyle.left = elem.currentStyle.left;
				style.left = ret || 0;
				ret = style.pixelLeft + "px";

				// Revert the changed values
				style.left = left;
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret;
	},

	clean: function( elems, context, fragment ) {
		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" )
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;

		// If a single string is passed in and it's a single tag
		// just do a createElement and skip the rest
		if ( !fragment && elems.length === 1 && typeof elems[0] === "string" ) {
			var match = /^<(\w+)\s*\/?>$/.exec(elems[0]);
			if ( match )
				return [ context.createElement( match[1] ) ];
		}

		var ret = [], scripts = [], div = context.createElement("div");

		jQuery.each(elems, function(i, elem){
			if ( typeof elem === "number" )
				elem += '';

			if ( !elem )
				return;

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				// Fix "XHTML"-style tags in all browsers
				elem = elem.replace(/(<(\w+)[^>]*?)\/>/g, function(all, front, tag){
					return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ?
						all :
						front + "></" + tag + ">";
				});

				// Trim whitespace, otherwise indexOf won't work as expected
				var tags = elem.replace(/^\s+/, "").substring(0, 10).toLowerCase();

				var wrap =
					// option or optgroup
					!tags.indexOf("<opt") &&
					[ 1, "<select multiple='multiple'>", "</select>" ] ||

					!tags.indexOf("<leg") &&
					[ 1, "<fieldset>", "</fieldset>" ] ||

					tags.match(/^<(thead|tbody|tfoot|colg|cap)/) &&
					[ 1, "<table>", "</table>" ] ||

					!tags.indexOf("<tr") &&
					[ 2, "<table><tbody>", "</tbody></table>" ] ||

				 	// <thead> matched above
					(!tags.indexOf("<td") || !tags.indexOf("<th")) &&
					[ 3, "<table><tbody><tr>", "</tr></tbody></table>" ] ||

					!tags.indexOf("<col") &&
					[ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ] ||

					// IE can't serialize <link> and <script> tags normally
					!jQuery.support.htmlSerialize &&
					[ 1, "div<div>", "</div>" ] ||

					[ 0, "", "" ];

				// Go to html and back, then peel off extra wrappers
				div.innerHTML = wrap[1] + elem + wrap[2];

				// Move to the right depth
				while ( wrap[0]-- )
					div = div.lastChild;

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !jQuery.support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					var hasBody = /<tbody/i.test(elem),
						tbody = !tags.indexOf("<table") && !hasBody ?
							div.firstChild && div.firstChild.childNodes :

						// String was a bare <thead> or <tfoot>
						wrap[1] == "<table>" && !hasBody ?
							div.childNodes :
							[];

					for ( var j = tbody.length - 1; j >= 0 ; --j )
						if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length )
							tbody[ j ].parentNode.removeChild( tbody[ j ] );

					}

				// IE completely kills leading whitespace when innerHTML is used
				if ( !jQuery.support.leadingWhitespace && /^\s/.test( elem ) )
					div.insertBefore( context.createTextNode( elem.match(/^\s*/)[0] ), div.firstChild );
				
				elem = jQuery.makeArray( div.childNodes );
			}

			if ( elem.nodeType )
				ret.push( elem );
			else
				ret = jQuery.merge( ret, elem );

		});

		if ( fragment ) {
			for ( var i = 0; ret[i]; i++ ) {
				if ( jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
				} else {
					if ( ret[i].nodeType === 1 )
						ret.splice.apply( ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))) );
					fragment.appendChild( ret[i] );
				}
			}
			
			return scripts;
		}

		return ret;
	},

	attr: function( elem, name, value ) {
		// don't set attributes on text and comment nodes
		if (!elem || elem.nodeType == 3 || elem.nodeType == 8)
			return undefined;

		var notxml = !jQuery.isXMLDoc( elem ),
			// Whether we are setting (or getting)
			set = value !== undefined;

		// Try to normalize/fix the name
		name = notxml && jQuery.props[ name ] || name;

		// Only do all the following if this is a node (faster for style)
		// IE elem.getAttribute passes even for style
		if ( elem.tagName ) {

			// These attributes require special treatment
			var special = /href|src|style/.test( name );

			// Safari mis-reports the default selected property of a hidden option
			// Accessing the parent's selectedIndex property fixes it
			if ( name == "selected" && elem.parentNode )
				elem.parentNode.selectedIndex;

			// If applicable, access the attribute via the DOM 0 way
			if ( name in elem && notxml && !special ) {
				if ( set ){
					// We can't allow the type property to be changed (since it causes problems in IE)
					if ( name == "type" && jQuery.nodeName( elem, "input" ) && elem.parentNode )
						throw "type property can't be changed";

					elem[ name ] = value;
				}

				// browsers index elements by id/name on forms, give priority to attributes.
				if( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) )
					return elem.getAttributeNode( name ).nodeValue;

				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				if ( name == "tabIndex" ) {
					var attributeNode = elem.getAttributeNode( "tabIndex" );
					return attributeNode && attributeNode.specified
						? attributeNode.value
						: elem.nodeName.match(/(button|input|object|select|textarea)/i)
							? 0
							: elem.nodeName.match(/^(a|area)$/i) && elem.href
								? 0
								: undefined;
				}

				return elem[ name ];
			}

			if ( !jQuery.support.style && notxml &&  name == "style" )
				return jQuery.attr( elem.style, "cssText", value );

			if ( set )
				// convert the value to a string (all browsers do this but IE) see #1070
				elem.setAttribute( name, "" + value );

			var attr = !jQuery.support.hrefNormalized && notxml && special
					// Some attributes require a special call on IE
					? elem.getAttribute( name, 2 )
					: elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return attr === null ? undefined : attr;
		}

		// elem is actually elem.style ... set the style

		// IE uses filters for opacity
		if ( !jQuery.support.opacity && name == "opacity" ) {
			if ( set ) {
				// IE has trouble with opacity if it does not have layout
				// Force it by setting the zoom level
				elem.zoom = 1;

				// Set the alpha filter to set the opacity
				elem.filter = (elem.filter || "").replace( /alpha\([^)]*\)/, "" ) +
					(parseInt( value ) + '' == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")");
			}

			return elem.filter && elem.filter.indexOf("opacity=") >= 0 ?
				(parseFloat( elem.filter.match(/opacity=([^)]*)/)[1] ) / 100) + '':
				"";
		}

		name = name.replace(/-([a-z])/ig, function(all, letter){
			return letter.toUpperCase();
		});

		if ( set )
			elem[ name ] = value;

		return elem[ name ];
	},

	trim: function( text ) {
		return (text || "").replace( /^\s+|\s+$/g, "" );
	},

	makeArray: function( array ) {
		var ret = [];

		if( array != null ){
			var i = array.length;
			// The window, strings (and functions) also have 'length'
			if( i == null || typeof array === "string" || jQuery.isFunction(array) || array.setInterval )
				ret[0] = array;
			else
				while( i )
					ret[--i] = array[i];
		}

		return ret;
	},

	inArray: function( elem, array ) {
		for ( var i = 0, length = array.length; i < length; i++ )
		// Use === because on IE, window == document
			if ( array[ i ] === elem )
				return i;

		return -1;
	},

	merge: function( first, second ) {
		// We have to loop this way because IE & Opera overwrite the length
		// expando of getElementsByTagName
		var i = 0, elem, pos = first.length;
		// Also, we need to make sure that the correct elements are being returned
		// (IE returns comment nodes in a '*' query)
		if ( !jQuery.support.getAll ) {
			while ( (elem = second[ i++ ]) != null )
				if ( elem.nodeType != 8 )
					first[ pos++ ] = elem;

		} else
			while ( (elem = second[ i++ ]) != null )
				first[ pos++ ] = elem;

		return first;
	},

	unique: function( array ) {
		var ret = [], done = {};

		try {

			for ( var i = 0, length = array.length; i < length; i++ ) {
				var id = jQuery.data( array[ i ] );

				if ( !done[ id ] ) {
					done[ id ] = true;
					ret.push( array[ i ] );
				}
			}

		} catch( e ) {
			ret = array;
		}

		return ret;
	},

	grep: function( elems, callback, inv ) {
		var ret = [];

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ )
			if ( !inv != !callback( elems[ i ], i ) )
				ret.push( elems[ i ] );

		return ret;
	},

	map: function( elems, callback ) {
		var ret = [];

		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			var value = callback( elems[ i ], i );

			if ( value != null )
				ret[ ret.length ] = value;
		}

		return ret.concat.apply( [], ret );
	}
});

// Use of jQuery.browser is deprecated.
// It's included for backwards compatibility and plugins,
// although they should work to migrate away.

var userAgent = navigator.userAgent.toLowerCase();

// Figure out what browser is being used
jQuery.browser = {
	version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
	safari: /webkit/.test( userAgent ),
	opera: /opera/.test( userAgent ),
	msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};

jQuery.each({
	parent: function(elem){return elem.parentNode;},
	parents: function(elem){return jQuery.dir(elem,"parentNode");},
	next: function(elem){return jQuery.nth(elem,2,"nextSibling");},
	prev: function(elem){return jQuery.nth(elem,2,"previousSibling");},
	nextAll: function(elem){return jQuery.dir(elem,"nextSibling");},
	prevAll: function(elem){return jQuery.dir(elem,"previousSibling");},
	siblings: function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},
	children: function(elem){return jQuery.sibling(elem.firstChild);},
	contents: function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}
}, function(name, fn){
	jQuery.fn[ name ] = function( selector ) {
		var ret = jQuery.map( this, fn );

		if ( selector && typeof selector == "string" )
			ret = jQuery.multiFilter( selector, ret );

		return this.pushStack( jQuery.unique( ret ), name, selector );
	};
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function(name, original){
	jQuery.fn[ name ] = function( selector ) {
		var ret = [], insert = jQuery( selector );

		for ( var i = 0, l = insert.length; i < l; i++ ) {
			var elems = (i > 0 ? this.clone(true) : this).get();
			jQuery.fn[ original ].apply( jQuery(insert[i]), elems );
			ret = ret.concat( elems );
		}

		return this.pushStack( ret, name, selector );
	};
});

jQuery.each({
	removeAttr: function( name ) {
		jQuery.attr( this, name, "" );
		if (this.nodeType == 1)
			this.removeAttribute( name );
	},

	addClass: function( classNames ) {
		jQuery.className.add( this, classNames );
	},

	removeClass: function( classNames ) {
		jQuery.className.remove( this, classNames );
	},

	toggleClass: function( classNames, state ) {
		if( typeof state !== "boolean" )
			state = !jQuery.className.has( this, classNames );
		jQuery.className[ state ? "add" : "remove" ]( this, classNames );
	},

	remove: function( selector ) {
		if ( !selector || jQuery.filter( selector, [ this ] ).length ) {
			// Prevent memory leaks
			jQuery( "*", this ).add([this]).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});
			if (this.parentNode)
				this.parentNode.removeChild( this );
		}
	},

	empty: function() {
		// Remove element nodes and prevent memory leaks
		jQuery(this).children().remove();

		// Remove any remaining nodes
		while ( this.firstChild )
			this.removeChild( this.firstChild );
	}
}, function(name, fn){
	jQuery.fn[ name ] = function(){
		return this.each( fn, arguments );
	};
});

// Helper function used by the dimensions and offset modules
function num(elem, prop) {
	return elem[0] && parseInt( jQuery.curCSS(elem[0], prop, true), 10 ) || 0;
}
var expando = "jQuery" + now(), uuid = 0, windowData = {};

jQuery.extend({
	cache: {},

	data: function( elem, name, data ) {
		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ];

		// Compute a unique ID for the element
		if ( !id )
			id = elem[ expando ] = ++uuid;

		// Only generate the data cache if we're
		// trying to access or manipulate it
		if ( name && !jQuery.cache[ id ] )
			jQuery.cache[ id ] = {};

		// Prevent overriding the named cache with undefined values
		if ( data !== undefined )
			jQuery.cache[ id ][ name ] = data;

		// Return the named cache data, or the ID for the element
		return name ?
			jQuery.cache[ id ][ name ] :
			id;
	},

	removeData: function( elem, name ) {
		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ];

		// If we want to remove a specific section of the element's data
		if ( name ) {
			if ( jQuery.cache[ id ] ) {
				// Remove the section of cache data
				delete jQuery.cache[ id ][ name ];

				// If we've removed all the data, remove the element's cache
				name = "";

				for ( name in jQuery.cache[ id ] )
					break;

				if ( !name )
					jQuery.removeData( elem );
			}

		// Otherwise, we want to remove all of the element's data
		} else {
			// Clean up the element expando
			try {
				delete elem[ expando ];
			} catch(e){
				// IE has trouble directly removing the expando
				// but it's ok with using removeAttribute
				if ( elem.removeAttribute )
					elem.removeAttribute( expando );
			}

			// Completely remove the data cache
			delete jQuery.cache[ id ];
		}
	},
	queue: function( elem, type, data ) {
		if ( elem ){
	
			type = (type || "fx") + "queue";
	
			var q = jQuery.data( elem, type );
	
			if ( !q || jQuery.isArray(data) )
				q = jQuery.data( elem, type, jQuery.makeArray(data) );
			else if( data )
				q.push( data );
	
		}
		return q;
	},

	dequeue: function( elem, type ){
		var queue = jQuery.queue( elem, type ),
			fn = queue.shift();
		
		if( !type || type === "fx" )
			fn = queue[0];
			
		if( fn !== undefined )
			fn.call(elem);
	}
});

jQuery.fn.extend({
	data: function( key, value ){
		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			var data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			if ( data === undefined && this.length )
				data = jQuery.data( this[0], key );

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;
		} else
			return this.trigger("setData" + parts[1] + "!", [parts[0], value]).each(function(){
				jQuery.data( this, key, value );
			});
	},

	removeData: function( key ){
		return this.each(function(){
			jQuery.removeData( this, key );
		});
	},
	queue: function(type, data){
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined )
			return jQuery.queue( this[0], type );

		return this.each(function(){
			var queue = jQuery.queue( this, type, data );
			
			 if( type == "fx" && queue.length == 1 )
				queue[0].call(this);
		});
	},
	dequeue: function(type){
		return this.each(function(){
			jQuery.dequeue( this, type );
		});
	}
});/*!
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
	done = 0,
	toString = Object.prototype.toString;

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	context = context || document;

	if ( context.nodeType !== 1 && context.nodeType !== 9 )
		return [];
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, check, mode, extra, prune = true;
	
	// Reset the position of the chunker regexp (start from head)
	chunker.lastIndex = 0;
	
	while ( (m = chunker.exec(selector)) !== null ) {
		parts.push( m[1] );
		
		if ( m[2] ) {
			extra = RegExp.rightContext;
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

				if ( Expr.relative[ selector ] )
					selector += parts.shift();

				set = posProcess( selector, set );
			}
		}
	} else {
		var ret = seed ?
			{ expr: parts.pop(), set: makeArray(seed) } :
			Sizzle.find( parts.pop(), parts.length === 1 && context.parentNode ? context.parentNode : context, isXML(context) );
		set = Sizzle.filter( ret.expr, ret.set );

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

			Expr.relative[ cur ]( checkSet, pop, isXML(context) );
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		throw "Syntax error, unrecognized expression: " + (cur || selector);
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context.nodeType === 1 ) {
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
		Sizzle( extra, context, results, seed );

		if ( sortOrder ) {
			hasDuplicate = false;
			results.sort(sortOrder);

			if ( hasDuplicate ) {
				for ( var i = 1; i < results.length; i++ ) {
					if ( results[i] === results[i-1] ) {
						results.splice(i--, 1);
					}
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
		
		if ( (match = Expr.match[ type ].exec( expr )) ) {
			var left = RegExp.leftContext;

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
			if ( (match = Expr.match[ type ].exec( expr )) != null ) {
				var filter = Expr.filter[ type ], found, item;
				anyFound = false;

				if ( curLoop == result ) {
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
		if ( expr == old ) {
			if ( anyFound == null ) {
				throw "Syntax error, unrecognized expression: " + expr;
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
	},
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
		"+": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag && !isXML ) {
				part = part.toUpperCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string";

			if ( isPartStr && !/\W/.test(part) ) {
				part = isXML ? part : part.toUpperCase();

				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName === part ? parent : false;
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

			if ( !part.match(/\W/) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( typeof part === "string" && !part.match(/\W/) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
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
		NAME: function(match, context, isXML){
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
					if ( not ^ (elem.className && (" " + elem.className + " ").indexOf(match) >= 0) ) {
						if ( !inplace )
							result.push( elem );
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
			for ( var i = 0; curLoop[i] === false; i++ ){}
			return curLoop[i] && isXML(curLoop[i]) ? match[1] : match[1].toUpperCase();
		},
		CHILD: function(match){
			if ( match[1] == "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] == "even" && "2n" || match[2] == "odd" && "2n+1" ||
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
				if ( match[3].match(chunker).length > 1 || /^\w/.test(match[3]) ) {
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
			return "button" === elem.type || elem.nodeName.toUpperCase() === "BUTTON";
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
			return match[3] - 0 == i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 == i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var i = 0, l = not.length; i < l; i++ ) {
					if ( not[i] === elem ) {
						return false;
					}
				}

				return true;
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while (node = node.previousSibling)  {
						if ( node.nodeType === 1 ) return false;
					}
					if ( type == 'first') return true;
					node = elem;
				case 'last':
					while (node = node.nextSibling)  {
						if ( node.nodeType === 1 ) return false;
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first == 1 && last == 0 ) {
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
					if ( first == 0 ) {
						return diff == 0;
					} else {
						return ( diff % first == 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName === match;
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
				value != check :
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
	Expr.match[ type ] = RegExp( Expr.match[ type ].source + /(?![^\[]*\])(?![^\(]*\))/.source );
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
try {
	Array.prototype.slice.call( document.documentElement.childNodes );

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
		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	sortOrder = function( a, b ) {
		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	sortOrder = function( a, b ) {
		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.selectNode(a);
		aRange.collapse(true);
		bRange.selectNode(b);
		bRange.collapse(true);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("form"),
		id = "script" + (new Date).getTime();
	form.innerHTML = "<input name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( !!document.getElementById( id ) ) {
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
})();

if ( document.querySelectorAll ) (function(){
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

	Sizzle.find = oldSizzle.find;
	Sizzle.filter = oldSizzle.filter;
	Sizzle.selectors = oldSizzle.selectors;
	Sizzle.matches = oldSizzle.matches;
})();

if ( document.getElementsByClassName && document.documentElement.getElementsByClassName ) (function(){
	var div = document.createElement("div");
	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	if ( div.getElementsByClassName("e").length === 0 )
		return;

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 )
		return;

	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ){
				elem.sizcache = doneName;
				elem.sizset = i;
			}
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

				if ( elem.nodeName === cur ) {
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
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ) {
				elem.sizcache = doneName;
				elem.sizset = i;
			}
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

var contains = document.compareDocumentPosition ?  function(a, b){
	return a.compareDocumentPosition(b) & 16;
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

var isXML = function(elem){
	return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
		!!elem.ownerDocument && isXML( elem.ownerDocument );
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
jQuery.filter = Sizzle.filter;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;

Sizzle.selectors.filters.hidden = function(elem){
	return elem.offsetWidth === 0 || elem.offsetHeight === 0;
};

Sizzle.selectors.filters.visible = function(elem){
	return elem.offsetWidth > 0 || elem.offsetHeight > 0;
};

Sizzle.selectors.filters.animated = function(elem){
	return jQuery.grep(jQuery.timers, function(fn){
		return elem === fn.elem;
	}).length;
};

jQuery.multiFilter = function( expr, elems, not ) {
	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return Sizzle.matches(expr, elems);
};

jQuery.dir = function( elem, dir ){
	var matched = [], cur = elem[dir];
	while ( cur && cur != document ) {
		if ( cur.nodeType == 1 )
			matched.push( cur );
		cur = cur[dir];
	}
	return matched;
};

jQuery.nth = function(cur, result, dir, elem){
	result = result || 1;
	var num = 0;

	for ( ; cur; cur = cur[dir] )
		if ( cur.nodeType == 1 && ++num == result )
			break;

	return cur;
};

jQuery.sibling = function(n, elem){
	var r = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType == 1 && n != elem )
			r.push( n );
	}

	return r;
};

return;

window.Sizzle = Sizzle;

})();
/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	// Bind an event to an element
	// Original by Dean Edwards
	add: function(elem, types, handler, data) {
		if ( elem.nodeType == 3 || elem.nodeType == 8 )
			return;

		// For whatever reason, IE has trouble passing the window object
		// around, causing it to be cloned in the process
		if ( elem.setInterval && elem != window )
			elem = window;

		// Make sure that the function being executed has a unique ID
		if ( !handler.guid )
			handler.guid = this.guid++;

		// if data is passed, bind to handler
		if ( data !== undefined ) {
			// Create temporary function pointer to original handler
			var fn = handler;

			// Create unique handler function, wrapped around original handler
			handler = this.proxy( fn );

			// Store data in unique handler
			handler.data = data;
		}

		// Init the element's event structure
		var events = jQuery.data(elem, "events") || jQuery.data(elem, "events", {}),
			handle = jQuery.data(elem, "handle") || jQuery.data(elem, "handle", function(){
				// Handle the second event of a trigger and when
				// an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && !jQuery.event.triggered ?
					jQuery.event.handle.apply(arguments.callee.elem, arguments) :
					undefined;
			});
		// Add elem as a property of the handle function
		// This is to prevent a memory leak with non-native
		// event in IE.
		handle.elem = elem;

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		jQuery.each(types.split(/\s+/), function(index, type) {
			// Namespaced event handlers
			var namespaces = type.split(".");
			type = namespaces.shift();
			handler.type = namespaces.slice().sort().join(".");

			// Get the current list of functions bound to this event
			var handlers = events[type];
			
			if ( jQuery.event.specialAll[type] )
				jQuery.event.specialAll[type].setup.call(elem, data, namespaces);

			// Init the event handler queue
			if (!handlers) {
				handlers = events[type] = {};

				// Check for a special event handler
				// Only use addEventListener/attachEvent if the special
				// events handler returns false
				if ( !jQuery.event.special[type] || jQuery.event.special[type].setup.call(elem, data, namespaces) === false ) {
					// Bind the global event handler to the element
					if (elem.addEventListener)
						elem.addEventListener(type, handle, false);
					else if (elem.attachEvent)
						elem.attachEvent("on" + type, handle);
				}
			}

			// Add the function to the element's handler list
			handlers[handler.guid] = handler;

			// Keep track of which events have been used, for global triggering
			jQuery.event.global[type] = true;
		});

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	guid: 1,
	global: {},

	// Detach an event or set of events from an element
	remove: function(elem, types, handler) {
		// don't do events on text and comment nodes
		if ( elem.nodeType == 3 || elem.nodeType == 8 )
			return;

		var events = jQuery.data(elem, "events"), ret, index;

		if ( events ) {
			// Unbind all events for the element
			if ( types === undefined || (typeof types === "string" && types.charAt(0) == ".") )
				for ( var type in events )
					this.remove( elem, type + (types || "") );
			else {
				// types is actually an event object here
				if ( types.type ) {
					handler = types.handler;
					types = types.type;
				}

				// Handle multiple events seperated by a space
				// jQuery(...).unbind("mouseover mouseout", fn);
				jQuery.each(types.split(/\s+/), function(index, type){
					// Namespaced event handlers
					var namespaces = type.split(".");
					type = namespaces.shift();
					var namespace = RegExp("(^|\\.)" + namespaces.slice().sort().join(".*\\.") + "(\\.|$)");

					if ( events[type] ) {
						// remove the given handler for the given type
						if ( handler )
							delete events[type][handler.guid];

						// remove all handlers for the given type
						else
							for ( var handle in events[type] )
								// Handle the removal of namespaced events
								if ( namespace.test(events[type][handle].type) )
									delete events[type][handle];
									
						if ( jQuery.event.specialAll[type] )
							jQuery.event.specialAll[type].teardown.call(elem, namespaces);

						// remove generic event handler if no more handlers exist
						for ( ret in events[type] ) break;
						if ( !ret ) {
							if ( !jQuery.event.special[type] || jQuery.event.special[type].teardown.call(elem, namespaces) === false ) {
								if (elem.removeEventListener)
									elem.removeEventListener(type, jQuery.data(elem, "handle"), false);
								else if (elem.detachEvent)
									elem.detachEvent("on" + type, jQuery.data(elem, "handle"));
							}
							ret = null;
							delete events[type];
						}
					}
				});
			}

			// Remove the expando if it's no longer used
			for ( ret in events ) break;
			if ( !ret ) {
				var handle = jQuery.data( elem, "handle" );
				if ( handle ) handle.elem = null;
				jQuery.removeData( elem, "events" );
				jQuery.removeData( elem, "handle" );
			}
		}
	},

	// bubbling is internal
	trigger: function( event, data, elem, bubbling ) {
		// Event object or event type
		var type = event.type || event;

		if( !bubbling ){
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
				if ( this.global[type] )
					jQuery.each( jQuery.cache, function(){
						if ( this.events && this.events[type] )
							jQuery.event.trigger( event, data, this.handle.elem );
					});
			}

			// Handle triggering a single element

			// don't do events on text and comment nodes
			if ( !elem || elem.nodeType == 3 || elem.nodeType == 8 )
				return undefined;
			
			// Clean up in case it is reused
			event.result = undefined;
			event.target = elem;
			
			// Clone the incoming data, if any
			data = jQuery.makeArray(data);
			data.unshift( event );
		}

		event.currentTarget = elem;

		// Trigger the event, it is assumed that "handle" is a function
		var handle = jQuery.data(elem, "handle");
		if ( handle )
			handle.apply( elem, data );

		// Handle triggering native .onfoo handlers (and on links since we don't call .click() for links)
		if ( (!elem[type] || (jQuery.nodeName(elem, 'a') && type == "click")) && elem["on"+type] && elem["on"+type].apply( elem, data ) === false )
			event.result = false;

		// Trigger the native events (except for clicks on links)
		if ( !bubbling && elem[type] && !event.isDefaultPrevented() && !(jQuery.nodeName(elem, 'a') && type == "click") ) {
			this.triggered = true;
			try {
				elem[ type ]();
			// prevent IE from throwing an error for some hidden elements
			} catch (e) {}
		}

		this.triggered = false;

		if ( !event.isPropagationStopped() ) {
			var parent = elem.parentNode || elem.ownerDocument;
			if ( parent )
				jQuery.event.trigger(event, data, parent, true);
		}
	},

	handle: function(event) {
		// returned undefined or false
		var all, handlers;

		event = arguments[0] = jQuery.event.fix( event || window.event );
		event.currentTarget = this;
		
		// Namespaced event handlers
		var namespaces = event.type.split(".");
		event.type = namespaces.shift();

		// Cache this now, all = true means, any handler
		all = !namespaces.length && !event.exclusive;
		
		var namespace = RegExp("(^|\\.)" + namespaces.slice().sort().join(".*\\.") + "(\\.|$)");

		handlers = ( jQuery.data(this, "events") || {} )[event.type];

		for ( var j in handlers ) {
			var handler = handlers[j];

			// Filter the functions by class
			if ( all || namespace.test(handler.type) ) {
				// Pass in a reference to the handler function itself
				// So that we can later remove it
				event.handler = handler;
				event.data = handler.data;

				var ret = handler.apply(this, arguments);

				if( ret !== undefined ){
					event.result = ret;
					if ( ret === false ) {
						event.preventDefault();
						event.stopPropagation();
					}
				}

				if( event.isImmediatePropagationStopped() )
					break;

			}
		}
	},

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function(event) {
		if ( event[expando] )
			return event;

		// store a copy of the original event object
		// and "clone" to set read-only properties
		var originalEvent = event;
		event = jQuery.Event( originalEvent );

		for ( var i = this.props.length, prop; i; ){
			prop = this.props[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary
		if ( !event.target )
			event.target = event.srcElement || document; // Fixes #1925 where srcElement might not be defined either

		// check if target is a textnode (safari)
		if ( event.target.nodeType == 3 )
			event.target = event.target.parentNode;

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement )
			event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var doc = document.documentElement, body = document.body;
			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
		}

		// Add which for key events
		if ( !event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode) )
			event.which = event.charCode || event.keyCode;

		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey )
			event.metaKey = event.ctrlKey;

		// Add which for click: 1 == left; 2 == middle; 3 == right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button )
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));

		return event;
	},

	proxy: function( fn, proxy ){
		proxy = proxy || function(){ return fn.apply(this, arguments); };
		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || this.guid++;
		// So proxy can be declared as an argument
		return proxy;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: bindReady,
			teardown: function() {}
		}
	},
	
	specialAll: {
		live: {
			setup: function( selector, namespaces ){
				jQuery.event.add( this, namespaces[0], liveHandler );
			},
			teardown:  function( namespaces ){
				if ( namespaces.length ) {
					var remove = 0, name = RegExp("(^|\\.)" + namespaces[0] + "(\\.|$)");
					
					jQuery.each( (jQuery.data(this, "events").live || {}), function(){
						if ( name.test(this.type) )
							remove++;
					});
					
					if ( remove < 1 )
						jQuery.event.remove( this, namespaces[0], liveHandler );
				}
			}
		}
	}
};

jQuery.Event = function( src ){
	// Allow instantiation without the 'new' keyword
	if( !this.preventDefault )
		return new jQuery.Event(src);
	
	// Event object
	if( src && src.type ){
		this.originalEvent = src;
		this.type = src.type;
	// Event type
	}else
		this.type = src;

	// timeStamp is buggy for some events on Firefox(#3843)
	// So we won't rely on the native value
	this.timeStamp = now();
	
	// Mark it as fixed
	this[expando] = true;
};

function returnFalse(){
	return false;
}
function returnTrue(){
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if( !e )
			return;
		// if preventDefault exists run it on the original event
		if (e.preventDefault)
			e.preventDefault();
		// otherwise set the returnValue property of the original event to false (IE)
		e.returnValue = false;
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if( !e )
			return;
		// if stopPropagation exists run it on the original event
		if (e.stopPropagation)
			e.stopPropagation();
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation:function(){
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};
// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement = function(event) {
	// Check if mouse(over|out) are still within the same parent element
	var parent = event.relatedTarget;
	// Traverse up the tree
	while ( parent && parent != this )
		try { parent = parent.parentNode; }
		catch(e) { parent = this; }
	
	if( parent != this ){
		// set the correct event type
		event.type = event.data;
		// handle event if we actually just moused on to a non sub-element
		jQuery.event.handle.apply( this, arguments );
	}
};
	
jQuery.each({ 
	mouseover: 'mouseenter', 
	mouseout: 'mouseleave'
}, function( orig, fix ){
	jQuery.event.special[ fix ] = {
		setup: function(){
			jQuery.event.add( this, orig, withinElement, fix );
		},
		teardown: function(){
			jQuery.event.remove( this, orig, withinElement );
		}
	};			   
});

jQuery.fn.extend({
	bind: function( type, data, fn ) {
		return type == "unload" ? this.one(type, data, fn) : this.each(function(){
			jQuery.event.add( this, type, fn || data, fn && data );
		});
	},

	one: function( type, data, fn ) {
		var one = jQuery.event.proxy( fn || data, function(event) {
			jQuery(this).unbind(event, one);
			return (fn || data).apply( this, arguments );
		});
		return this.each(function(){
			jQuery.event.add( this, type, one, fn && data);
		});
	},

	unbind: function( type, fn ) {
		return this.each(function(){
			jQuery.event.remove( this, type, fn );
		});
	},

	trigger: function( type, data ) {
		return this.each(function(){
			jQuery.event.trigger( type, data, this );
		});
	},

	triggerHandler: function( type, data ) {
		if( this[0] ){
			var event = jQuery.Event(type);
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
		while( i < args.length )
			jQuery.event.proxy( fn, args[i++] );

		return this.click( jQuery.event.proxy( fn, function(event) {
			// Figure out which function to execute
			this.lastToggle = ( this.lastToggle || 0 ) % i;

			// Make sure that clicks stop
			event.preventDefault();

			// and execute the function
			return args[ this.lastToggle++ ].apply( this, arguments ) || false;
		}));
	},

	hover: function(fnOver, fnOut) {
		return this.mouseenter(fnOver).mouseleave(fnOut);
	},

	ready: function(fn) {
		// Attach the listeners
		bindReady();

		// If the DOM is already ready
		if ( jQuery.isReady )
			// Execute the function immediately
			fn.call( document, jQuery );

		// Otherwise, remember the function for later
		else
			// Add the function to the wait list
			jQuery.readyList.push( fn );

		return this;
	},
	
	live: function( type, fn ){
		var proxy = jQuery.event.proxy( fn );
		proxy.guid += this.selector + type;

		jQuery(document).bind( liveConvert(type, this.selector), this.selector, proxy );

		return this;
	},
	
	die: function( type, fn ){
		jQuery(document).unbind( liveConvert(type, this.selector), fn ? { guid: fn.guid + this.selector + type } : null );
		return this;
	}
});

function liveHandler( event ){
	var check = RegExp("(^|\\.)" + event.type + "(\\.|$)"),
		stop = true,
		elems = [];

	jQuery.each(jQuery.data(this, "events").live || [], function(i, fn){
		if ( check.test(fn.type) ) {
			var elem = jQuery(event.target).closest(fn.data)[0];
			if ( elem )
				elems.push({ elem: elem, fn: fn });
		}
	});

	elems.sort(function(a,b) {
		return jQuery.data(a.elem, "closest") - jQuery.data(b.elem, "closest");
	});
	
	jQuery.each(elems, function(){
		if ( this.fn.call(this.elem, event, this.fn.data) === false )
			return (stop = false);
	});

	return stop;
}

function liveConvert(type, selector){
	return ["live", type, selector.replace(/\./g, "`").replace(/ /g, "|")].join(".");
}

jQuery.extend({
	isReady: false,
	readyList: [],
	// Handle when the DOM is ready
	ready: function() {
		// Make sure that the DOM is not already loaded
		if ( !jQuery.isReady ) {
			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If there are functions bound, to execute
			if ( jQuery.readyList ) {
				// Execute all of them
				jQuery.each( jQuery.readyList, function(){
					this.call( document, jQuery );
				});

				// Reset the list of functions
				jQuery.readyList = null;
			}

			// Trigger any bound ready events
			jQuery(document).triggerHandler("ready");
		}
	}
});

var readyBound = false;

function bindReady(){
	if ( readyBound ) return;
	readyBound = true;

	// Mozilla, Opera and webkit nightlies currently support this event
	if ( document.addEventListener ) {
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", function(){
			document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
			jQuery.ready();
		}, false );

	// If IE event model is used
	} else if ( document.attachEvent ) {
		// ensure firing before onload,
		// maybe late but safe also for iframes
		document.attachEvent("onreadystatechange", function(){
			if ( document.readyState === "complete" ) {
				document.detachEvent( "onreadystatechange", arguments.callee );
				jQuery.ready();
			}
		});

		// If IE and not an iframe
		// continually check to see if the document is ready
		if ( document.documentElement.doScroll && window == window.top ) (function(){
			if ( jQuery.isReady ) return;

			try {
				// If IE is used, use the trick by Diego Perini
				// http://javascript.nwbox.com/IEContentLoaded/
				document.documentElement.doScroll("left");
			} catch( error ) {
				setTimeout( arguments.callee, 0 );
				return;
			}

			// and execute any waiting functions
			jQuery.ready();
		})();
	}

	// A fallback to window.onload, that will always work
	jQuery.event.add( window, "load", jQuery.ready );
}

jQuery.each( ("blur,focus,load,resize,scroll,unload,click,dblclick," +
	"mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave," +
	"change,select,submit,keydown,keypress,keyup,error").split(","), function(i, name){

	// Handle event binding
	jQuery.fn[name] = function(fn){
		return fn ? this.bind(name, fn) : this.trigger(name);
	};
});

// Prevent memory leaks in IE
// And prevent errors on refresh with events like mouseover in other browsers
// Window isn't included so as not to unbind existing unload events
jQuery( window ).bind( 'unload', function(){ 
	for ( var id in jQuery.cache )
		// Skip the window
		if ( id != 1 && jQuery.cache[ id ].handle )
			jQuery.event.remove( jQuery.cache[ id ].handle.elem );
}); 
(function(){

	jQuery.support = {};

	var root = document.documentElement,
		script = document.createElement("script"),
		div = document.createElement("div"),
		id = "script" + (new Date).getTime();

	div.style.display = "none";
	div.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';

	var all = div.getElementsByTagName("*"),
		a = div.getElementsByTagName("a")[0];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return;
	}

	jQuery.support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType == 3,
		
		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,
		
		// Make sure that you can get all elements in an <object> element
		// IE 7 always returns no results
		objectAll: !!div.getElementsByTagName("object")[0]
			.getElementsByTagName("*").length,
		
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
		opacity: a.style.opacity === "0.5",
		
		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Will be defined later
		scriptEval: false,
		noCloneEvent: true,
		boxModel: null
	};
	
	script.type = "text/javascript";
	try {
		script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
	} catch(e){}

	root.insertBefore( script, root.firstChild );
	
	// Make sure that the execution of code works by injecting a script
	// tag with appendChild/createTextNode
	// (IE doesn't support this, fails, and uses .text instead)
	if ( window[ id ] ) {
		jQuery.support.scriptEval = true;
		delete window[ id ];
	}

	root.removeChild( script );

	if ( div.attachEvent && div.fireEvent ) {
		div.attachEvent("onclick", function(){
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			jQuery.support.noCloneEvent = false;
			div.detachEvent("onclick", arguments.callee);
		});
		div.cloneNode(true).fireEvent("onclick");
	}

	// Figure out if the W3C box model works as expected
	// document.body must exist before we can do this
	jQuery(function(){
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";

		document.body.appendChild( div );
		jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;
		document.body.removeChild( div ).style.display = 'none';
	});
})();

var styleFloat = jQuery.support.cssFloat ? "cssFloat" : "styleFloat";

jQuery.props = {
	"for": "htmlFor",
	"class": "className",
	"float": styleFloat,
	cssFloat: styleFloat,
	styleFloat: styleFloat,
	readonly: "readOnly",
	maxlength: "maxLength",
	cellspacing: "cellSpacing",
	rowspan: "rowSpan",
	tabindex: "tabIndex"
};
jQuery.fn.extend({
	// Keep a copy of the old load
	_load: jQuery.fn.load,

	load: function( url, params, callback ) {
		if ( typeof url !== "string" )
			return this._load( url );

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params )
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = null;

			// Otherwise, build a param string
			} else if( typeof params === "object" ) {
				params = jQuery.param( params );
				type = "POST";
			}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function(res, status){
				// If successful, inject the HTML into all the matched elements
				if ( status == "success" || status == "notmodified" )
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div/>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(res.responseText.replace(/<script(.|\s)*?\/script>/g, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						res.responseText );

				if( callback )
					self.each( callback, [res.responseText, status, res] );
			}
		});
		return this;
	},

	serialize: function() {
		return jQuery.param(this.serializeArray());
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray(this.elements) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				(this.checked || /select|textarea/i.test(this.nodeName) ||
					/text|hidden|password|search/i.test(this.type));
		})
		.map(function(i, elem){
			var val = jQuery(this).val();
			return val == null ? null :
				jQuery.isArray(val) ?
					jQuery.map( val, function(val, i){
						return {name: elem.name, value: val};
					}) :
					{name: elem.name, value: val};
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(i,o){
	jQuery.fn[o] = function(f){
		return this.bind(o, f);
	};
});

var jsc = now();

jQuery.extend({
  
	get: function( url, data, callback, type ) {
		// shift arguments if data argument was ommited
		if ( jQuery.isFunction( data ) ) {
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
		if ( jQuery.isFunction( data ) ) {
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
		*/
		// Create the request object; Microsoft failed to properly
		// implement the XMLHttpRequest in IE7, so we use the ActiveXObject when it is available
		// This function can be overriden by calling jQuery.ajaxSetup
		xhr:function(){
			return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
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

	ajax: function( s ) {
		// Extend the settings, but re-extend 's' so that it can be
		// checked again later (in the test suite, specifically)
		s = jQuery.extend(true, s, jQuery.extend(true, {}, jQuery.ajaxSettings, s));

		var jsonp, jsre = /=\?(&|$)/g, status, data,
			type = s.type.toUpperCase();

		// convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" )
			s.data = jQuery.param(s.data);

		// Handle JSONP Parameter Callbacks
		if ( s.dataType == "jsonp" ) {
			if ( type == "GET" ) {
				if ( !s.url.match(jsre) )
					s.url += (s.url.match(/\?/) ? "&" : "?") + (s.jsonp || "callback") + "=?";
			} else if ( !s.data || !s.data.match(jsre) )
				s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
			s.dataType = "json";
		}

		// Build temporary JSONP function
		if ( s.dataType == "json" && (s.data && s.data.match(jsre) || s.url.match(jsre)) ) {
			jsonp = "jsonp" + jsc++;

			// Replace the =? sequence both in the query string and the data
			if ( s.data )
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			s.url = s.url.replace(jsre, "=" + jsonp + "$1");

			// We need to make sure
			// that a JSONP style response is executed properly
			s.dataType = "script";

			// Handle JSONP-style loading
			window[ jsonp ] = function(tmp){
				data = tmp;
				success();
				complete();
				// Garbage collect
				window[ jsonp ] = undefined;
				try{ delete window[ jsonp ]; } catch(e){}
				if ( head )
					head.removeChild( script );
			};
		}

		if ( s.dataType == "script" && s.cache == null )
			s.cache = false;

		if ( s.cache === false && type == "GET" ) {
			var ts = now();
			// try replacing _= if it is there
			var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
			// if nothing was replaced, add timestamp to the end
			s.url = ret + ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + ts : "");
		}

		// If data is available, append data to url for get requests
		if ( s.data && type == "GET" ) {
			s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;

			// IE likes to send both get and post data, prevent this
			s.data = null;
		}

		// Watch for a new set of requests
		if ( s.global && ! jQuery.active++ )
			jQuery.event.trigger( "ajaxStart" );

		// Matches an absolute URL, and saves the domain
		var parts = /^(\w+:)?\/\/([^\/?#]+)/.exec( s.url );

		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if ( s.dataType == "script" && type == "GET" && parts
			&& ( parts[1] && parts[1] != location.protocol || parts[2] != location.host )){

			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.src = s.url;
			if (s.scriptCharset)
				script.charset = s.scriptCharset;

			// Handle Script loading
			if ( !jsonp ) {
				var done = false;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function(){
					if ( !done && (!this.readyState ||
							this.readyState == "loaded" || this.readyState == "complete") ) {
						done = true;
						success();
						complete();

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;
						head.removeChild( script );
					}
				};
			}

			head.appendChild(script);

			// We handle everything using the script element injection
			return undefined;
		}

		var requestDone = false;

		// Create the request object
		var xhr = s.xhr();

		// Open the socket
		// Passing null username, generates a login popup on Opera (#2865)
		if( s.username )
			xhr.open(type, s.url, s.async, s.username, s.password);
		else
			xhr.open(type, s.url, s.async);

		// Need an extra try/catch for cross domain requests in Firefox 3
		try {
			// Set the correct header, if data is being sent
			if ( s.data )
				xhr.setRequestHeader("Content-Type", s.contentType);

			// Set the If-Modified-Since header, if ifModified mode.
			if ( s.ifModified )
				xhr.setRequestHeader("If-Modified-Since",
					jQuery.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT" );

			// Set header so the called script knows that it's an XMLHttpRequest
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			// Set the Accepts header for the server, depending on the dataType
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
				s.accepts[ s.dataType ] + ", */*" :
				s.accepts._default );
		} catch(e){}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && s.beforeSend(xhr, s) === false ) {
			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active )
				jQuery.event.trigger( "ajaxStop" );
			// close opended socket
			xhr.abort();
			return false;
		}

		if ( s.global )
			jQuery.event.trigger("ajaxSend", [xhr, s]);

		// Wait for a response to come back
		var onreadystatechange = function(isTimeout){
			// The request was aborted, clear the interval and decrement jQuery.active
			if (xhr.readyState == 0) {
				if (ival) {
					// clear poll interval
					clearInterval(ival);
					ival = null;
					// Handle the global AJAX counter
					if ( s.global && ! --jQuery.active )
						jQuery.event.trigger( "ajaxStop" );
				}
			// The transfer is complete and the data is available, or the request timed out
			} else if ( !requestDone && xhr && (xhr.readyState == 4 || isTimeout == "timeout") ) {
				requestDone = true;

				// clear poll interval
				if (ival) {
					clearInterval(ival);
					ival = null;
				}

				status = isTimeout == "timeout" ? "timeout" :
					!jQuery.httpSuccess( xhr ) ? "error" :
					s.ifModified && jQuery.httpNotModified( xhr, s.url ) ? "notmodified" :
					"success";

				if ( status == "success" ) {
					// Watch for, and catch, XML document parse errors
					try {
						// process the data (runs the xml through httpData regardless of callback)
						data = jQuery.httpData( xhr, s.dataType, s );
					} catch(e) {
						status = "parsererror";
					}
				}

				// Make sure that the request was successful or notmodified
				if ( status == "success" ) {
					// Cache Last-Modified header, if ifModified mode.
					var modRes;
					try {
						modRes = xhr.getResponseHeader("Last-Modified");
					} catch(e) {} // swallow exception thrown by FF if header is not available

					if ( s.ifModified && modRes )
						jQuery.lastModified[s.url] = modRes;

					// JSONP handles its own success callback
					if ( !jsonp )
						success();
				} else
					jQuery.handleError(s, xhr, status);

				// Fire the complete handlers
				complete();

				if ( isTimeout )
					xhr.abort();

				// Stop memory leaks
				if ( s.async )
					xhr = null;
			}
		};

		if ( s.async ) {
			// don't attach the handler to the request, just poll it instead
			var ival = setInterval(onreadystatechange, 13);

			// Timeout checker
			if ( s.timeout > 0 )
				setTimeout(function(){
					// Check to see if the request is still happening
					if ( xhr && !requestDone )
						onreadystatechange( "timeout" );
				}, s.timeout);
		}

		// Send the data
		try {
			xhr.send(s.data);
		} catch(e) {
			jQuery.handleError(s, xhr, null, e);
		}

		// firefox 1.5 doesn't fire statechange for sync requests
		if ( !s.async )
			onreadystatechange();

		function success(){
			// If a local callback was specified, fire it and pass it the data
			if ( s.success )
				s.success( data, status );

			// Fire the global callback
			if ( s.global )
				jQuery.event.trigger( "ajaxSuccess", [xhr, s] );
		}

		function complete(){
			// Process result
			if ( s.complete )
				s.complete(xhr, status);

			// The request was completed
			if ( s.global )
				jQuery.event.trigger( "ajaxComplete", [xhr, s] );

			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active )
				jQuery.event.trigger( "ajaxStop" );
		}

		// return XMLHttpRequest to allow aborting the request etc.
		return xhr;
	},

	handleError: function( s, xhr, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) s.error( xhr, status, e );

		// Fire the global callback
		if ( s.global )
			jQuery.event.trigger( "ajaxError", [xhr, s, e] );
	},

	// Counter for holding the number of active queries
	active: 0,

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( xhr ) {
		try {
			// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
			return !xhr.status && location.protocol == "file:" ||
				( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 || xhr.status == 1223;
		} catch(e){}
		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xhr, url ) {
		try {
			var xhrRes = xhr.getResponseHeader("Last-Modified");

			// Firefox always returns 200. check Last-Modified date
			return xhr.status == 304 || xhrRes == jQuery.lastModified[url];
		} catch(e){}
		return false;
	},

	httpData: function( xhr, type, s ) {
		var ct = xhr.getResponseHeader("content-type"),
			xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;

		if ( xml && data.documentElement.tagName == "parsererror" )
			throw "parsererror";
			
		// Allow a pre-filtering function to sanitize the response
		// s != null is checked to keep backwards compatibility
		if( s && s.dataFilter )
			data = s.dataFilter( data, type );

		// The filter can actually parse the response
		if( typeof data === "string" ){

			// If the type is "script", eval it in global context
			if ( type == "script" )
				jQuery.globalEval( data );

			// Get the JavaScript object, if JSON is used.
			if ( type == "json" )
				data = window["eval"]("(" + data + ")");
		}
		
		return data;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a ) {
		var s = [ ];

		function add( key, value ){
			s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
		};

		// If an array was passed in, assume that it is an array
		// of form elements
		if ( jQuery.isArray(a) || a.jquery )
			// Serialize the form elements
			jQuery.each( a, function(){
				add( this.name, this.value );
			});

		// Otherwise, assume that it's an object of key/value pairs
		else
			// Serialize the key/values
			for ( var j in a )
				// If the value is an array then the key names need to be repeated
				if ( jQuery.isArray(a[j]) )
					jQuery.each( a[j], function(){
						add( j, this );
					});
				else
					add( j, jQuery.isFunction(a[j]) ? a[j]() : a[j] );

		// Return the resulting serialization
		return s.join("&").replace(/%20/g, "+");
	}

});
var elemdisplay = {},
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	];

function genFx( type, num ){
	var obj = {};
	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function(){
		obj[ this ] = type;
	});
	return obj;
}

jQuery.fn.extend({
	show: function(speed,callback){
		if ( speed ) {
			return this.animate( genFx("show", 3), speed, callback);
		} else {
			for ( var i = 0, l = this.length; i < l; i++ ){
				var old = jQuery.data(this[i], "olddisplay");
				
				this[i].style.display = old || "";
				
				if ( jQuery.css(this[i], "display") === "none" ) {
					var tagName = this[i].tagName, display;
					
					if ( elemdisplay[ tagName ] ) {
						display = elemdisplay[ tagName ];
					} else {
						var elem = jQuery("<" + tagName + " />").appendTo("body");
						
						display = elem.css("display");
						if ( display === "none" )
							display = "block";
						
						elem.remove();
						
						elemdisplay[ tagName ] = display;
					}
					
					jQuery.data(this[i], "olddisplay", display);
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( var i = 0, l = this.length; i < l; i++ ){
				this[i].style.display = jQuery.data(this[i], "olddisplay") || "";
			}
			
			return this;
		}
	},

	hide: function(speed,callback){
		if ( speed ) {
			return this.animate( genFx("hide", 3), speed, callback);
		} else {
			for ( var i = 0, l = this.length; i < l; i++ ){
				var old = jQuery.data(this[i], "olddisplay");
				if ( !old && old !== "none" )
					jQuery.data(this[i], "olddisplay", jQuery.css(this[i], "display"));
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( var i = 0, l = this.length; i < l; i++ ){
				this[i].style.display = "none";
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2 ){
		var bool = typeof fn === "boolean";

		return jQuery.isFunction(fn) && jQuery.isFunction(fn2) ?
			this._toggle.apply( this, arguments ) :
			fn == null || bool ?
				this.each(function(){
					var state = bool ? fn : jQuery(this).is(":hidden");
					jQuery(this)[ state ? "show" : "hide" ]();
				}) :
				this.animate(genFx("toggle", 3), fn, fn2);
	},

	fadeTo: function(speed,to,callback){
		return this.animate({opacity: to}, speed, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		return this[ optall.queue === false ? "each" : "queue" ](function(){
		
			var opt = jQuery.extend({}, optall), p,
				hidden = this.nodeType == 1 && jQuery(this).is(":hidden"),
				self = this;
	
			for ( p in prop ) {
				if ( prop[p] == "hide" && hidden || prop[p] == "show" && !hidden )
					return opt.complete.call(this);

				if ( ( p == "height" || p == "width" ) && this.style ) {
					// Store display property
					opt.display = jQuery.css(this, "display");

					// Make sure that nothing sneaks out
					opt.overflow = this.style.overflow;
				}
			}

			if ( opt.overflow != null )
				this.style.overflow = "hidden";

			opt.curAnim = jQuery.extend({}, prop);

			jQuery.each( prop, function(name, val){
				var e = new jQuery.fx( self, opt, name );

				if ( /toggle|show|hide/.test(val) )
					e[ val == "toggle" ? hidden ? "show" : "hide" : val ]( prop );
				else {
					var parts = val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
						start = e.cur(true) || 0;

					if ( parts ) {
						var end = parseFloat(parts[2]),
							unit = parts[3] || "px";

						// We need to compute starting value
						if ( unit != "px" ) {
							self.style[ name ] = (end || 1) + unit;
							start = ((end || 1) / e.cur(true)) * start;
							self.style[ name ] = start + unit;
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] )
							end = ((parts[1] == "-=" ? -1 : 1) * end) + start;

						e.custom( start, end, unit );
					} else
						e.custom( start, val, "" );
				}
			});

			// For JS strict compliance
			return true;
		});
	},

	stop: function(clearQueue, gotoEnd){
		var timers = jQuery.timers;

		if (clearQueue)
			this.queue([]);

		this.each(function(){
			// go in reverse order so anything added to the queue during the loop is ignored
			for ( var i = timers.length - 1; i >= 0; i-- )
				if ( timers[i].elem == this ) {
					if (gotoEnd)
						// force the next step to be the last
						timers[i](true);
					timers.splice(i, 1);
				}
		});

		// start the next in the queue if the last step wasn't forced
		if (!gotoEnd)
			this.dequeue();

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
}, function( name, props ){
	jQuery.fn[ name ] = function( speed, callback ){
		return this.animate( props, speed, callback );
	};
});

jQuery.extend({

	speed: function(speed, easing, fn) {
		var opt = typeof speed === "object" ? speed : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			jQuery.fx.speeds[opt.duration] || jQuery.fx.speeds._default;

		// Queueing
		opt.old = opt.complete;
		opt.complete = function(){
			if ( opt.queue !== false )
				jQuery(this).dequeue();
			if ( jQuery.isFunction( opt.old ) )
				opt.old.call( this );
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

	fx: function( elem, options, prop ){
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if ( !options.orig )
			options.orig = {};
	}

});

jQuery.fx.prototype = {

	// Simple function for setting a style value
	update: function(){
		if ( this.options.step )
			this.options.step.call( this.elem, this.now, this );

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );

		// Set display property to block for height/width animations
		if ( ( this.prop == "height" || this.prop == "width" ) && this.elem.style )
			this.elem.style.display = "block";
	},

	// Get the current size
	cur: function(force){
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) )
			return this.elem[ this.prop ];

		var r = parseFloat(jQuery.css(this.elem, this.prop, force));
		return r && r > -10000 ? r : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0;
	},

	// Start an animation from one number to another
	custom: function(from, to, unit){
		this.startTime = now();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;

		var self = this;
		function t(gotoEnd){
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval(function(){
				var timers = jQuery.timers;

				for ( var i = 0; i < timers.length; i++ )
					if ( !timers[i]() )
						timers.splice(i--, 1);

				if ( !timers.length ) {
					clearInterval( timerId );
					timerId = undefined;
				}
			}, 13);
		}
	},

	// Simple 'show' function
	show: function(){
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.attr( this.elem.style, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any
		// flash of content
		this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());

		// Start by showing the element
		jQuery(this.elem).show();
	},

	// Simple 'hide' function
	hide: function(){
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.attr( this.elem.style, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom(this.cur(), 0);
	},

	// Each step of an animation
	step: function(gotoEnd){
		var t = now();

		if ( gotoEnd || t >= this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			var done = true;
			for ( var i in this.options.curAnim )
				if ( this.options.curAnim[i] !== true )
					done = false;

			if ( done ) {
				if ( this.options.display != null ) {
					// Reset the overflow
					this.elem.style.overflow = this.options.overflow;

					// Reset the display
					this.elem.style.display = this.options.display;
					if ( jQuery.css(this.elem, "display") == "none" )
						this.elem.style.display = "block";
				}

				// Hide the element if the "hide" operation was done
				if ( this.options.hide )
					jQuery(this.elem).hide();

				// Reset the properties, if the item has been hidden or shown
				if ( this.options.hide || this.options.show )
					for ( var p in this.options.curAnim )
						jQuery.attr(this.elem.style, p, this.options.orig[p]);
					
				// Execute the complete function
				this.options.complete.call( this.elem );
			}

			return false;
		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;

			// Perform the easing function, defaults to swing
			this.pos = jQuery.easing[this.options.easing || (jQuery.easing.swing ? "swing" : "linear")](this.state, n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);

			// Perform the next step of the animation
			this.update();
		}

		return true;
	}

};

jQuery.extend( jQuery.fx, {
	speeds:{
		slow: 600,
 		fast: 200,
 		// Default speed
 		_default: 400
	},
	step: {

		opacity: function(fx){
			jQuery.attr(fx.elem.style, "opacity", fx.now);
		},

		_default: function(fx){
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null )
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			else
				fx.elem[ fx.prop ] = fx.now;
		}
	}
});
if ( document.documentElement["getBoundingClientRect"] )
	jQuery.fn.offset = function() {
		if ( !this[0] ) return { top: 0, left: 0 };
		if ( this[0] === this[0].ownerDocument.body ) return jQuery.offset.bodyOffset( this[0] );
		var box  = this[0].getBoundingClientRect(), doc = this[0].ownerDocument, body = doc.body, docElem = doc.documentElement,
			clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
			top  = box.top  + (self.pageYOffset || jQuery.boxModel && docElem.scrollTop  || body.scrollTop ) - clientTop,
			left = box.left + (self.pageXOffset || jQuery.boxModel && docElem.scrollLeft || body.scrollLeft) - clientLeft;
		return { top: top, left: left };
	};
else 
	jQuery.fn.offset = function() {
		if ( !this[0] ) return { top: 0, left: 0 };
		if ( this[0] === this[0].ownerDocument.body ) return jQuery.offset.bodyOffset( this[0] );
		jQuery.offset.initialized || jQuery.offset.initialize();

		var elem = this[0], offsetParent = elem.offsetParent, prevOffsetParent = elem,
			doc = elem.ownerDocument, computedStyle, docElem = doc.documentElement,
			body = doc.body, defaultView = doc.defaultView,
			prevComputedStyle = defaultView.getComputedStyle(elem, null),
			top = elem.offsetTop, left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			computedStyle = defaultView.getComputedStyle(elem, null);
			top -= elem.scrollTop, left -= elem.scrollLeft;
			if ( elem === offsetParent ) {
				top += elem.offsetTop, left += elem.offsetLeft;
				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.tagName)) )
					top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
					left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
				prevOffsetParent = offsetParent, offsetParent = elem.offsetParent;
			}
			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" )
				top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
				left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" )
			top  += body.offsetTop,
			left += body.offsetLeft;

		if ( prevComputedStyle.position === "fixed" )
			top  += Math.max(docElem.scrollTop, body.scrollTop),
			left += Math.max(docElem.scrollLeft, body.scrollLeft);

		return { top: top, left: left };
	};

jQuery.offset = {
	initialize: function() {
		if ( this.initialized ) return;
		var body = document.body, container = document.createElement('div'), innerDiv, checkDiv, table, td, rules, prop, bodyMarginTop = body.style.marginTop,
			html = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';

		rules = { position: 'absolute', top: 0, left: 0, margin: 0, border: 0, width: '1px', height: '1px', visibility: 'hidden' };
		for ( prop in rules ) container.style[prop] = rules[prop];

		container.innerHTML = html;
		body.insertBefore(container, body.firstChild);
		innerDiv = container.firstChild, checkDiv = innerDiv.firstChild, td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		innerDiv.style.overflow = 'hidden', innerDiv.style.position = 'relative';
		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		body.style.marginTop = '1px';
		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop === 0);
		body.style.marginTop = bodyMarginTop;

		body.removeChild(container);
		this.initialized = true;
	},

	bodyOffset: function(body) {
		jQuery.offset.initialized || jQuery.offset.initialize();
		var top = body.offsetTop, left = body.offsetLeft;
		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset )
			top  += parseInt( jQuery.curCSS(body, 'marginTop',  true), 10 ) || 0,
			left += parseInt( jQuery.curCSS(body, 'marginLeft', true), 10 ) || 0;
		return { top: top, left: left };
	}
};


jQuery.fn.extend({
	position: function() {
		var left = 0, top = 0, results;

		if ( this[0] ) {
			// Get *real* offsetParent
			var offsetParent = this.offsetParent(),

			// Get correct offsets
			offset       = this.offset(),
			parentOffset = /^body|html$/i.test(offsetParent[0].tagName) ? { top: 0, left: 0 } : offsetParent.offset();

			// Subtract element margins
			// note: when an element has margin: auto the offsetLeft and marginLeft 
			// are the same in Safari causing offset.left to incorrectly be 0
			offset.top  -= num( this, 'marginTop'  );
			offset.left -= num( this, 'marginLeft' );

			// Add offsetParent borders
			parentOffset.top  += num( offsetParent, 'borderTopWidth'  );
			parentOffset.left += num( offsetParent, 'borderLeftWidth' );

			// Subtract the two offsets
			results = {
				top:  offset.top  - parentOffset.top,
				left: offset.left - parentOffset.left
			};
		}

		return results;
	},

	offsetParent: function() {
		var offsetParent = this[0].offsetParent || document.body;
		while ( offsetParent && (!/^body|html$/i.test(offsetParent.tagName) && jQuery.css(offsetParent, 'position') == 'static') )
			offsetParent = offsetParent.offsetParent;
		return jQuery(offsetParent);
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ['Left', 'Top'], function(i, name) {
	var method = 'scroll' + name;
	
	jQuery.fn[ method ] = function(val) {
		if (!this[0]) return null;

		return val !== undefined ?

			// Set the scroll offset
			this.each(function() {
				this == window || this == document ?
					window.scrollTo(
						!i ? val : jQuery(window).scrollLeft(),
						 i ? val : jQuery(window).scrollTop()
					) :
					this[ method ] = val;
			}) :

			// Return the scroll offset
			this[0] == window || this[0] == document ?
				self[ i ? 'pageYOffset' : 'pageXOffset' ] ||
					jQuery.boxModel && document.documentElement[ method ] ||
					document.body[ method ] :
				this[0][ method ];
	};
});
// Create innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function(i, name){

	var tl = i ? "Left"  : "Top",  // top or left
		br = i ? "Right" : "Bottom", // bottom or right
		lower = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn["inner" + name] = function(){
		return this[0] ?
			jQuery.css( this[0], lower, false, "padding" ) :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn["outer" + name] = function(margin) {
		return this[0] ?
			jQuery.css( this[0], lower, false, margin ? "margin" : "border" ) :
			null;
	};
	
	var type = name.toLowerCase();

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		return this[0] == window ?
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			document.compatMode == "CSS1Compat" && document.documentElement[ "client" + name ] ||
			document.body[ "client" + name ] :

			// Get document width or height
			this[0] == document ?
				// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
				Math.max(
					document.documentElement["client" + name],
					document.body["scroll" + name], document.documentElement["scroll" + name],
					document.body["offset" + name], document.documentElement["offset" + name]
				) :

				// Get or set width or height on the element
				size === undefined ?
					// Get width or height on the element
					(this.length ? jQuery.css( this[0], type ) : null) :

					// Set the width or height on the element (default to pixels if value is unitless)
					this.css( type, typeof size === "string" ? size : size + "px" );
	};

});
})();

// -----------------------------------------------------------------------------
// Interface elements for jQuery - http://interface.eyecon.ro
// http://userscripts.org/topics/41177
// -----------------------------------------------------------------------------

jQuery.iUtil = {
	getPosition : function(e)
	{
		var x = 0;
		var y = 0;
		var es = e.style;
		var restoreStyles = false;
		if (jQuery(e).css('display') == 'none') {
			var oldVisibility = es.visibility;
			var oldPosition = es.position;
			restoreStyles = true;
			es.visibility = 'hidden';
			es.display = 'block';
			es.position = 'absolute';
		}
		var el = e;
		while (el){
			x += el.offsetLeft + (el.currentStyle && !jQuery.browser.opera ?parseInt(el.currentStyle.borderLeftWidth)||0:0);
			y += el.offsetTop + (el.currentStyle && !jQuery.browser.opera ?parseInt(el.currentStyle.borderTopWidth)||0:0);
			el = el.offsetParent;
		}
		el = e;
		while (el && el.tagName  && el.tagName.toLowerCase() != 'body')
		{
			x -= el.scrollLeft||0;
			y -= el.scrollTop||0;
			el = el.parentNode;
		}
		if (restoreStyles == true) {
			es.display = 'none';
			es.position = oldPosition;
			es.visibility = oldVisibility;
		}
		return {x:x, y:y};
	},
	getPositionLite : function(el)
	{
		var x = 0, y = 0;
		while(el) {
			x += el.offsetLeft || 0;
			y += el.offsetTop || 0;
			el = el.offsetParent;
		}
		return {x:x, y:y};
	},
	getSize : function(e)
	{
		var w = jQuery.css(e,'width');
		var h = jQuery.css(e,'height');
		var wb = 0;
		var hb = 0;
		var es = e.style;
		if (jQuery(e).css('display') != 'none') {
			wb = e.offsetWidth;
			hb = e.offsetHeight;
		} else {
			var oldVisibility = es.visibility;
			var oldPosition = es.position;
			es.visibility = 'hidden';
			es.display = 'block';
			es.position = 'absolute';
			wb = e.offsetWidth;
			hb = e.offsetHeight;
			es.display = 'none';
			es.position = oldPosition;
			es.visibility = oldVisibility;
		}
		return {w:w, h:h, wb:wb, hb:hb};
	},
	getSizeLite : function(el)
	{
		return {
			wb:el.offsetWidth||0,
			hb:el.offsetHeight||0
		};
	},
	getClient : function(e)
	{
		var h, w, de;
		if (e) {
			w = e.clientWidth;
			h = e.clientHeight;
		} else {
			de = document.documentElement;
			w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
			h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
		}
		return {w:w,h:h};
	},
	getScroll : function (e)
	{
		var t=0, l=0, w=0, h=0, iw=0, ih=0;
		if (e && e.nodeName.toLowerCase() != 'body') {
			t = e.scrollTop;
			l = e.scrollLeft;
			w = e.scrollWidth;
			h = e.scrollHeight;
			iw = 0;
			ih = 0;
		} else  {
			if (document.documentElement) {
				t = document.documentElement.scrollTop;
				l = document.documentElement.scrollLeft;
				w = document.documentElement.scrollWidth;
				h = document.documentElement.scrollHeight;
			} else if (document.body) {
				t = document.body.scrollTop;
				l = document.body.scrollLeft;
				w = document.body.scrollWidth;
				h = document.body.scrollHeight;
			}
			iw = self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;
			ih = self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0;
		}
		return { t: t, l: l, w: w, h: h, iw: iw, ih: ih };
	},
	getMargins : function(e, toInteger)
	{
		var el = jQuery(e);
		var t = el.css('marginTop') || '';
		var r = el.css('marginRight') || '';
		var b = el.css('marginBottom') || '';
		var l = el.css('marginLeft') || '';
		if (toInteger)
			return {
				t: parseInt(t)||0,
				r: parseInt(r)||0,
				b: parseInt(b)||0,
				l: parseInt(l)
			};
		else
			return {t: t, r: r,	b: b, l: l};
	},
	getPadding : function(e, toInteger)
	{
		var el = jQuery(e);
		var t = el.css('paddingTop') || '';
		var r = el.css('paddingRight') || '';
		var b = el.css('paddingBottom') || '';
		var l = el.css('paddingLeft') || '';
		if (toInteger)
			return {
				t: parseInt(t)||0,
				r: parseInt(r)||0,
				b: parseInt(b)||0,
				l: parseInt(l)
			};
		else
			return {t: t, r: r,	b: b, l: l};
	},
	getBorder : function(e, toInteger)
	{
		var el = jQuery(e);
		var t = el.css('borderTopWidth') || '';
		var r = el.css('borderRightWidth') || '';
		var b = el.css('borderBottomWidth') || '';
		var l = el.css('borderLeftWidth') || '';
		if (toInteger)
			return {
				t: parseInt(t)||0,
				r: parseInt(r)||0,
				b: parseInt(b)||0,
				l: parseInt(l)||0
			};
		else
			return {t: t, r: r,	b: b, l: l};
	},
	getPointer : function(event)
	{
		var x = event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)) || 0;
		var y = event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop)) || 0;
		return {x:x, y:y};
	},
	traverseDOM : function(nodeEl, func)
	{
		func(nodeEl);
		nodeEl = nodeEl.firstChild;
		while(nodeEl){
			jQuery.iUtil.traverseDOM(nodeEl, func);
			nodeEl = nodeEl.nextSibling;
		}
	},
	purgeEvents : function(nodeEl)
	{
		jQuery.iUtil.traverseDOM(
			nodeEl,
			function(el)
			{
				for(var attr in el){
					if(typeof el[attr] === 'function') {
						el[attr] = null;
					}
				}
			}
		);
	},
	centerEl : function(el, axis)
	{
		var clientScroll = jQuery.iUtil.getScroll();
		var windowSize = jQuery.iUtil.getSize(el);
		if (!axis || axis == 'vertically')
			jQuery(el).css(
				{
					top: clientScroll.t + ((Math.max(clientScroll.h,clientScroll.ih) - clientScroll.t - windowSize.hb)/2) + 'px'
				}
			);
		if (!axis || axis == 'horizontally')
			jQuery(el).css(
				{
					left:	clientScroll.l + ((Math.max(clientScroll.w,clientScroll.iw) - clientScroll.l - windowSize.wb)/2) + 'px'
				}
			);
	},
	fixPNG : function (el, emptyGIF) {
		var images = jQuery('img[@src*="png"]', el||document), png;
		images.each( function() {
			png = this.src;				
			this.src = emptyGIF;
			this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + png + "')";
		});
	}
};

// Helper function to support older browsers!
[].indexOf || (Array.prototype.indexOf = function(v, n){
	n = (n == null) ? 0 : n;
	var m = this.length;
	for (var i=n; i<m; i++)
		if (this[i] == v)
			return i;
	return -1;
});

jQuery.iFisheye = {
	
	build : function(options)
	{
	
		return this.each(
			function()
			{
				var el = this;
				el.fisheyeCfg = {
					items : jQuery(options.items, this),
					container: jQuery(options.container, this),
					pos : jQuery.iUtil.getPosition(this),
					itemWidth: options.itemWidth,
					itemsText: options.itemsText,
					proximity: options.proximity,
					valign: options.valign,
					halign: options.halign,
					maxWidth : options.maxWidth
				};
				jQuery.iFisheye.positionContainer(el, 0);
				jQuery(window).bind(
					'resize',
					function()
					{
						el.fisheyeCfg.pos = jQuery.iUtil.getPosition(el);
						jQuery.iFisheye.positionContainer(el, 0);
						jQuery.iFisheye.positionItems(el);
					}
				);
				jQuery.iFisheye.positionItems(el);
				el.fisheyeCfg.items
					.bind(
						'mouseover',
						function()
						{
							jQuery(el.fisheyeCfg.itemsText, this).get(0).style.display = 'block';
						}
					)
					.bind(
						'mouseout',
						function()
						{
							jQuery(el.fisheyeCfg.itemsText, this).get(0).style.display = 'none';
						}
					);
				jQuery(document).bind(
					'mousemove',
					function(e)
					{
						var pointer = jQuery.iUtil.getPointer(e);
						var toAdd = 0;
						if (el.fisheyeCfg.halign && el.fisheyeCfg.halign == 'center')
							var posx = pointer.x - el.fisheyeCfg.pos.x - (el.offsetWidth - el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size())/2 - el.fisheyeCfg.itemWidth/2;
						else if (el.fisheyeCfg.halign && el.fisheyeCfg.halign == 'right')
							var posx = pointer.x - el.fisheyeCfg.pos.x - el.offsetWidth + el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size();
						else 
							var posx = pointer.x - el.fisheyeCfg.pos.x;
						var posy = Math.pow(pointer.y - el.fisheyeCfg.pos.y - el.offsetHeight/2,2);
						el.fisheyeCfg.items.each(
							function(nr)
							{
								distance = Math.sqrt(
									Math.pow(posx - nr*el.fisheyeCfg.itemWidth, 2)
									+ posy
								);
								distance -= el.fisheyeCfg.itemWidth/2;
								
								distance = distance < 0 ? 0 : distance;
								distance = distance > el.fisheyeCfg.proximity ? el.fisheyeCfg.proximity : distance;
								distance = el.fisheyeCfg.proximity - distance;
								
								extraWidth = el.fisheyeCfg.maxWidth * distance/el.fisheyeCfg.proximity;
								
								this.style.width = el.fisheyeCfg.itemWidth + extraWidth + 'px';
								this.style.left = el.fisheyeCfg.itemWidth * nr + toAdd + 'px';
								toAdd += extraWidth;
							}
						);
						jQuery.iFisheye.positionContainer(el, toAdd);
					}
				);
			}
		)
	},
	
	positionContainer : function(el, toAdd)
	{
		if (el.fisheyeCfg.halign)
			if (el.fisheyeCfg.halign == 'center')
				el.fisheyeCfg.container.get(0).style.left = (el.offsetWidth - el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size())/2 - toAdd/2 + 'px';
			else if (el.fisheyeCfg.halign == 'left')
				el.fisheyeCfg.container.get(0).style.left =  - toAdd/el.fisheyeCfg.items.size() + 'px';
			else if (el.fisheyeCfg.halign == 'right')
				el.fisheyeCfg.container.get(0).style.left =  (el.offsetWidth - el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size()) - toAdd/2 + 'px';
		el.fisheyeCfg.container.get(0).style.width = el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size() + toAdd + 'px';
	},
	
	positionItems : function(el)
	{
		el.fisheyeCfg.items.each(
			function(nr)
			{
				this.style.width = el.fisheyeCfg.itemWidth + 'px';
				this.style.left = el.fisheyeCfg.itemWidth * nr + 'px';
			}
		);
	}
};

jQuery.fn.Fisheye = jQuery.iFisheye.build;

// -----------------------------------------------------------------------------
// Greasemonkey API emulation
// http://userscripts.org/topics/41177
// -----------------------------------------------------------------------------

// @author        GIJoe
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/

//--- to test localStorage in firefox
//delete GM_log; delete GM_getValue; delete GM_setValue; delete GM_deleteValue; delete GM_xmlhttpRequest; delete GM_openInTab; delete GM_registerMenuCommand;

var gvar = function () {};

function GM_ApiBrowserCheck() {
    var GMSTORAGE_PATH = 'GM_';
    if (typeof(unsafeWindow) == 'undefined') {
        unsafeWindow = window;
    }
    
    var needApiUpgrade = false;
    if (window.navigator.appName.match(/^opera/i) && typeof(window.opera) != 'undefined') {
        needApiUpgrade = true;
        gvar.isOpera = true;
    }
    if (typeof(GM_setValue) != 'undefined') {
        var gsv = GM_setValue.toString();
        if (gsv.indexOf('staticArgs') > 0) {
            gvar.isGreaseMonkey = true;
        }
        else if (gsv.match(/not\s+supported/)) {
            needApiUpgrade = true;
            gvar.isBuggedChrome = true;
        }
    } else {
        needApiUpgrade = true;
    }

    if (needApiUpgrade) {
        var ws = null;
        try {
            ws = typeof(unsafeWindow.localStorage);
        } catch (e) {
            ws = null;
        }
        if (ws == 'object') {
            GM_getValue = function (name, defValue) {
                var value = unsafeWindow.localStorage.getItem(GMSTORAGE_PATH + name);
                if (value === null) {
                    return defValue;
                } else {
                    switch (value.substr(0, 2)) {
                    case 'S]':
                        return value.substr(2);
                    case 'N]':
                        return parseInt(value.substr(2), 10);
                    case 'B]':
                        return value.substr(2) == 'true';
                    }
                }
                return value;
            };
            GM_setValue = function (name, value) {
                switch (typeof(value)) {
                case 'string':
                    unsafeWindow.localStorage.setItem(GMSTORAGE_PATH + name, 'S]' + value);
                    break;
                case 'number':
                    if (value.toString().indexOf('.') < 0) {
                        unsafeWindow.localStorage.setItem(GMSTORAGE_PATH + name, 'N]' + value);
                    }
                    break;
                case 'boolean':
                    unsafeWindow.localStorage.setItem(GMSTORAGE_PATH + name, 'B]' + value);
                    break;
                }
            };
            GM_deleteValue = function (name) {
                unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH + name);
            };
        } else if (!gvar.isOpera || typeof(GM_setValue) == 'undefined') {
            gvar.temporarilyStorage = [];
            GM_getValue = function (name, defValue) {
                if (typeof(gvar.temporarilyStorage[GMSTORAGE_PATH + name]) == 'undefined') {
                    return defValue;
                } else {
                    return gvar.temporarilyStorage[GMSTORAGE_PATH + name];
                }
            };
            GM_setValue = function (name, value) {
                switch (typeof(value)) {
                case "string":
                case "boolean":
                case "number":
                    gvar.temporarilyStorage[GMSTORAGE_PATH + name] = value;
                }
            };
            GM_deleteValue = function (name) {
                delete gvar.temporarilyStorage[GMSTORAGE_PATH + name];
            };
        }
    }
}
GM_ApiBrowserCheck();

// -----------------------------------------------------------------------------
// user script
// -----------------------------------------------------------------------------

$(document).ready(function() {
    var img_prev = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABGdJREFUWIXtlm1o1VUcxz%2FnnP9%2Fu87MihykIsO0FREUWbPdqWVWm9mDSgsCUxJNe5HY5l7GIKReqEFB0BPMN0VNyjDwRUqW6EUDiQXqFmXqfNp13j3eu3vveejF%2F7%2Fbvdet9kDv9oUfvz%2Fnz%2Fn9vuf3dA5MYQqTxOJGVV%2Fd4LmJ7peT8C2iO7ydC%2B66f6%2FvlU7YyIQIPN3I9Jom78Di%2B1a89foLb0c85U%2BYgDfeDVVNzE3iH1qzdNP8Rfcu85VUE3YO44xAdaP32HTv1rY3Vr%2Bz8OHKJX5710ms05MiMOYIRBvU%2BlkzZ3%2B09cXmMuUrOrpOkjFpHCDA%2FH8EmpHRpLe7cs5DWzbU7Yj0ZeKc7%2F4dYzXOWXAOB2osnXB8txbjIhBtYgaD3v6aB%2Bqqn4tuiFzqaSeRuop1BmsNxmmkkDS%2F9gnWWRwG62woBhdqYw3vtrw5NK4I1GyPzHfCHF67bOOcRZVP%2BB1dJ0hm%2BnC4nGHrDLG%2FvsVYjbEaHWpjs2ibzenl97w66iFHJFDT6D1e4vvfravbMWP2nfNE2%2BUfyZp0%2BNfhsCAcFoPF4KTGonEu0MPkrDM4LM6Nnp2bCEQb%2FC13zCzfs652%2BzTpQ9vlI0GuhUAIEBIQABYrDBYbkBAaJw3kpScIvwYsDkbs1wIC0Sb%2Fq4ryyufXr2yMXOo7S2f3WQQCIQRSBloAQhCcDEvK9JPM9DKkk2iTxhqHcArpfBQlYW1YcIw4rQoIWGurhQeDmQR9Q9fRJgMEzpUQARkcg5ke%2BjNx%2BrPXydhU0AkOnAVrHVY7rHEY7fCIkNapsaVg7nlTcY6zuz7ev3Pzs0tfKlPS58y1GKUlPtIDQxot0iANUgmEFHhS4BDgHNaCMGGGAOcgm03lE1AUzYyCSdjaijm2S2%2Fv7Uts3ffD3qRvytyjFXWk7SAD2W4yDCKURXkS5YlAfIHni3%2FWlEB6AqkEUoFUBa3vU1QLI41iGdtjvu6%2Fkqn9%2Fqd9iStXr%2BonF67ntrJZodHAgfIkyhcoX6J8ifRDxznnQeqC2imIeEHUR2pDCchTLbpt3hKWHLOHW28kuu5eWvVK6W%2FdB4mn%2F0TlOVlZ0QCOsAaCNATaYXVYE8YV2A7FjkYghwtHifd26FW6vm1PT1%2BidtVTayOdQ79yfvCXgIQX1MF7HzT%2Fm5l8jGkUu5CdA2zvNYZOfGi2ZTd2bv5ioKVhzar6yO3l5ZzuP4RQJpfj47t1FNChZPMkk%2Fdt8%2BznQlIMUyQa0Kc%2B1592nu7Z9OU3LQODceeqyuuZ5t8SDKYASWAISBc51XliwrUcRntNuBG%2BXfyMuyAVBy%2BnzqyIqLKyRxY8o0pUKUdjR7gYs%2B8XnbiYRDYkV9CGo9WACw3YPNGAd%2B5n3T5wieXOHv2sqztetbq2PpIXgeHwFkdwmNBNl8J%2FvaeGHZtwswF0MkHqYsy2li64Mb3jj%2FYHk0MD3sWY3Vl08nSeTO7ZVAQREvcAf%2FE29XL4GPHDtdx1NYUpjAV%2FA41jRqaMmBkaAAAAAElFTkSuQmCC";
    var img_next = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABHpJREFUWIXtln9oVWUYxz%2Fve85x3mTqps4UM1MLin6XLucoKhMtCcv6Q4oyIygMQjcjCcKgosj%2BkUQjLITlD6SFGGWsabM23HIq5q%2FQzZlTN5vatru7e36879sf95x5d93mnOBfe%2BC5z8s953m%2B3%2FN9nvO%2BBwZt0AZoBUW2mVFsPXe9deT1JE8ee%2BfGwmJ7JSAGWsMaaOItBXLlh699a8eTrY8wtW563my97dxv%2BNda57oUkFIwv3Dx0AWPvTEnlnD25b%2FLhBtKwFMuR5uruGdqvvP6vPdvH2ZlHywotmfcMAJaBySDOEebKhk5Yrh8%2B4WPckYNH1tesMxa1N8aPQ5PQZFtEHT2mWmIffrWdxxoLMNTLsZoxmRPZExsEpvL1iTrmw5%2FPb5BLd26FTUgAh8sXotlOUgkQggEAqIYZkph8%2BepH%2FG1i9YKgyY7azRTRj9IeU1psvrozj1JGcyv%2FYzW3gjYvVMz7D6xCSmsLhdCpJG5LIXWGm0M2ihaOk7TnrzAow%2FNHToqZ2zhz1Wb%2F8pfLp%2Bs%2Ftw93hNMrzOgjMJXHr72CLSHr118lVoHeCg8dBiV8FDCRZG63u5eoObUdiZOuM1%2Bac6SCcOcrNqZRfZT10TAGJ0CUx6%2BcvG1G4KELnwC4aGEjxY%2BCpe438LFZCPnO05yrq2O3cc34Vlx8eq8d7JzRuRtm7ncWdrvFmitCLSHQCKlxBZWiq%2BUYf8FygR0eJdoS7aQ8NvRSqGVSXNo%2FruBO%2FKm8%2FLcJbFtFSUfU3x8VuWq4JmrEvC1S8Jrw5I2juMQaIMJFEYFBMbF1XE8lcAIAIO0CWcEUj8aYwxGQ6A9PO2iTSCAKf1SIOG109RWj5BgORLLFli2QNoCaQmkBOmk3gmDwGiDjsCFASPACO4e%2FwR5scls2bGus7X94urKVcGKqxHoNhfSEkgrjLbACqOUAhHeaQwYHSlgAIMtYjw86Vn8uDbfl23oTHR0vlm9Wm0CTF8ERPp%2FQqb2eynDp47Au1QQIQGD0eGTA8OcXKbd%2FDz1J%2BuCipqyttZGs%2BDQZlVL6vBT6SQyCch0BV58YEUXUKSCkCn5hUz1u%2BzMl%2FiBi1apmmNiE7k392kq9%2B72Dh6prTv1R7DwTA1nw7rhJF%2FeHXtqgQBYu%2BWTHi51t%2BIlK7AcgQ6H79bs%2B5gUy2f7L6XJhtMNO49sVMvaW4in1yVj980kYABd9UUwHBgCOKGnrx3AKSy2KxBkWZZAG4u7Rj5OzB1HSekG999%2FLq6p%2FUatA%2FywZrp3OxsyCejQFRCEbCPvIthVRAiGZt3E%2FbmzuHS205T8tD5x7lhy6bEf1K4wP3KVtu5zCEkDvkKZtEIWgC2GMC1nIfv37wt2%2Ff5rS%2BM%2B%2FcrJcnUiA9xPi1d8MfVEwABeCBgBB%2BG9FtEgCYzyoayi3D1wZO%2FB%2Bh3%2BoqbD%2FJdBNIou9Hws9%2Bdj0r4CHGRBkX0hL3ec33T%2BbMmh9eq9eJyAyy2MSPu9AfelQKZFUkaz0PWqNjc3Ld%2BzWn1F9wGLVBu0QeuX%2FQ%2FMEx4pyYpYiQAAAABJRU5ErkJggg%3D%3D";
    var img_first = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABOpJREFUWIXtlmuIVVUUx39r73PHrlpgKUoPjRJBSSytzPGRYUWiVFZDalHQg9ICCR8R9CEJlIiCMhGiInxERZYVqSShH8qCRNMeSI7FpBONjq953Ln3nL336sM59851nIfNp6AWbPY%2B927W%2F7fXY58D%2F9t%2F3QSgdmmkXf%2BoudDld71AsS8HU5fa2Yps3f2Kk%2F4AROXFqic3YMRixPDsuvml1g4GQO8A05bnllw06OLVbYUWwPVHH1NZqbL7982onhOMc6yuDlu7zL552bCrVq9Y%2BFo%2BFw3olzhURSAQCMGj9A4wczGDGwdGn04YPXlK3S2L8pHN9VscqiKgqnh1qPoeN09eweXxoGjvrOvvmn7%2FrKfy9c17cL7PMjlfgDQCQUO3G6ctzU2qoWb%2F%2FbOeuHrGtXNzBxp3carwF149CG7KM%2BT7A9CZAvW4kBC6icDUFfbOGpt%2F76G5SwYOvWi47G%2F8itgVCepTcO8jsdGZ2mXnVmJkcxixxEkx312nVAEEXIjPAZi6LFo%2BZNCwlQ%2FPeSbvJWF%2F485UWAIqAWOF5x9ZQ1DNqYacaiBoGknVQOJjQHh5%2FfK%2BI%2BBDQggpgDVEtcvsO1cMHz1%2Fwe2L8sfaGjh6%2BmB6cxgFAqDs%2Bm0DSkAJmQ%2BHD54QHC44nIu5bczj55eCxMd49ahSEyXRjgljJo%2BdfdP8Cw417%2BFE21EwIJLqq2S1Ipk4AcWjxqPq8ZKgkj4jPXdWlxqopEBunjjnmhvHzcjtO7qD1tIJjBFEBVFFjaRORTMAzSA8AY%2BagJJ2lIrrhO0NwIeExJcI6pk%2F91GuHDou9%2FXhzZRcO2IEg8EgCEpQiH2BOLQTawGPw2uMakAQRCIMEaIGIzZLVx8AbaXTNLcdoSNpo%2Bn0ES4dMpqcraG1dAINHvUOLzGJdpBQQIymYAZEBDFgRNJrTB0%2BOFSVEBSnpb4BAGJfJHYd7Pz6Sw7V%2F1q8dcqdF7SUjtPYeggTCcYK1kplbYwgVhBJa4OsyVRBQzrwZEXbvZkefo0bmxo%2B%2B3zX%2B4VrRsxk7Ija7LSpoDEZgBWMBRulUDYy2AzS2s49ItKjXrcAomhTQ%2FL08WPHVn20fX3HiPwYJl12B8bazlNXQ2TiJhJMZa4GqLjOddWMuoqXzbVjv3vdrZ34WMufm7dvXDtn1j35KSPvZW%2FTZwSTpLm3MPeq5UhWB2VT1ao0KBoqKSi%2FuWJIy6VngCIWsHvf8tvGzSst2OI%2F2HDb9NmDp41cKN83fUxCexoNAy%2B9sbInN13NklVFNvcMoIFyWZlfPvE%2FjKqVu3eELzZNvmHaJdPHP5Dbc%2FwTCqEZABFJ9m1I7is0cQpIshPG3aylatArgBgUOkfDbvdH6zHmBf3m7ZaWM1ffOqNuwI%2BntnWGXkiyU3nK93TnXD2g6mLovgsAm6PcROXhTtZz4sA7buHPP%2F70zZatHxbHD5ldFldjKZJ%2BwpVPm5B%2Bp7kuYOW5d4BoYCrK2WEstZ%2Bm9ds1bnH9oYZNGz96t%2BhK6aFMjgLQkY0iUOoCk1T5qthZAHXXPVdZXziqIloRzxwXgfY96%2FyLjfXNK9dtfLVDg9bYAXRABaK8r1QFUl6fdSudz2e5IW2fiLSKTdUsEx60MwcNlw8ObnEjTx6mmIW3PHxVFLq9Dv%2FJt7xUiduq52pTOnPs6O0t9L%2F9W%2Bxv8tKNJLV1FfAAAAAASUVORK5CYII%3D";
    var img_last = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABPVJREFUWIXtl21sFEUYx3%2FP7F6v1ZKq2FohiGggQhAsJKI1GmL4ABrAF1AThUSC%2BEE0agMEE8XEBCNCjIFEjSgBJEosMYhC02iqKEXTaLEQ3gMUSqCVltprr729nRk%2F7G57HH1L4zeZy2T2dmfm%2F5vn%2F8ztHFwr%2F%2FciQx1YWuZaxC6oXqu%2FGKjv9LfJ9RJuZ7eoCNZaqtf54g4VwHVijCocu0mWHx61b43%2Fbn99E53Ec4XUG8%2BvjxurMUbz3uYyANRQAZRSXUufeMctufOht0qXOVunLiE2mHGVRzYCtmeeoQJYS47jOMx%2FeEnujKnz5uUWuFVTV1DQ%2Fxgb1p57QwYAVNqkONpYzYOTZ%2BY%2BOX3JtFwbO1Baxuh%2BEDDW8J9EAEAbn6TXxqGLexl723h30aPLR8dz8mvvfy12b%2B%2FyFovBZgD0moSlZa7t7X52MUaT1ikMhkMX9nL78EnywtyVN26p%2BLCqdFnzwur39Y4rAIzBGI21pn8AgFWLP0GbNIIgohAEpRyUOD2dBHzjoa3GWsuxxt8ZWTCOxbNXXLetYv3WB5Y3jMvcIRaLCfsOCCAi1NR%2FjxInABCFtaab3oYfbOBrMLHhVPMBCvNbWPDIK3nf%2FLT5TZYduiut9OtosNagrT%2BwBVF4O9PtqFBciSL63RKRcJIAQIdgEcT51mO0p1p4bPpzeT%2FW7Hr6r%2BPVk60lbqxBD9YCYzVpk0JxJYAoQlsAsd2JZaxBW02Xl8TTnTR3nOdi22mmTZodj8dzJtQe%2Fg1tfYzxw50wAIC2Pr72uoWVKMQRHASUBLEQS0on6fTaSHoJkl472vcxOtjrLckLXOpoYNaEF2MjRtxKV7qDtlQzvvEGBmjrbKYpUU%2FMieM6MRxX4RgFyqLTKXyTImWSGKtDJyzigEJAwPgBRH78BgDqm45SXDAmtGqQFnR4rQAoV3BcCVpHECUoBeKAIwqsxRpBtEWEwB5gZP54Jo%2BcwZ5fylMNF8%2FEp42ddZXOgC8jUaAcQTmBuHKDa6UACaywVrDGkpGnjLv5PkYPu4dvq75MXm5t2o1iDpAzGAAn80sgHrZRJBxBqSAhAawFYwAfRBQTi2eQL8WUV27tTCTa1rS2%2BBuGF7mze1tgNoADPW%2B1p6asDBJPgYRREEUgLkEEdp9ZG6zeQEzlUFI4m66EobxyS%2Bc%2FzamltZ%2Fq8jFzyKOo9whnAkgI4AJ8vH11Kvu4YsMAi4A15Kx4aRVOTLAG8mw%2BUwofp6GhwVZW7em4dFovPPK13g%2FE0u19W535QEX16E5%2FVG4B%2BX6KHOMTMz4xq4kZQ8yG9e5n3F3iBJZc7xRRctNcag%2FW%2BPv2%2F3r5XA3Pnv1ZnwgXpI3f90svm0wAWk7SBRgCO3Iy2sxrlIKi%2FDFMGDaTH%2FZWeHV1B8%2Be%2FM5f9PdxGsk87pm%2Bj36ZADYUjdqo6mglgJ%2FRF1HCxIJZ7Ni1vevUifo%2F67alX00205413oqLoY%2BSCRCJaQIr%2FHAVEX0E5ofP8T3L5q8%2B77pwrmlnzUa9Gg8vfJ4Oqw%2F4bhw9GAAyRCPBSDQCc%2BjJFTZsWtfVcj7xwR%2Bf6U0Z%2Ffysms67pWdrzy9Z2S8AIbkm8DlasRuKRwAC0Him7eW6LbqCK22LIHQ4l1d8B9pLEP9o%2B%2BqrxAb6XxBty2zx7KzOzpso%2FH16P1iA7L4RQHZuZCbwoI5z10pU%2FgVN2Gs%2FA%2F1geAAAAABJRU5ErkJggg%3D%3D";
    var img_prev_page = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAArZJREFUWIXFl81PE0EYh5%2FtbtttooY0TbeQKBgTTnhCucpZ0SMXKoQPDxo%2FQ4iJZ0NUQkBjQL1hEPBPUDFq%2BBtQeiHxQBNDPNiUjVB2x0O7Yb%2Fa7rYlvslkpzPv7O%2FZ9515m4H%2FbJL9x%2BzcTK5UOug%2BTkFZVvKdp8%2BeGRwcNAAU%2B2SpdND9cOrRceozO%2Fcstb29fQL44wGwbH%2F%2Fb8uFhRCoagIQjvFIy5WqiAshKn3nnG8ELFtaehtKaGRk2CPsBnBbTQD3C8OYJVrWbRCgceEj0aYAwqRgePh66wGCpsC5yVoIEET4WAGCpiCbHaoJUJ5rUQqqf7UTwBJtCsBP3C3qH%2B7gAIEq4ZFYuR0eGqysrqDrumeuVmsIwFpsmuWnruvMP5%2Fj46cPocRDb0K%2F8O7u%2FmL%2BxTz5fN4BFyQFoQD88vtja4uFxZcUi0WPXzWAhv8L3ABfv31h%2Bd0yhmE4%2FO7evwNANBpF0zQyWjvpdJqMliGtabRn2pFluXEAwzBZe7%2FC%2Bud138VOf%2B8RdeY%2FJMDe3h6LrxbY%2FL5ZU9xvrRsidCUUQrC6ttqUeGXE9vUhjqFpCrJDWfou9oUCsMTtJ%2BBog4YAEEKgKArjYze4OnANSZL83OqC2CMQGsBacOXyAGOjEyhKvartDLd%2F32tV94D9PF%2Fo7SWZTPL6zSKFQgEAWZaZfvykssIEJCKRCJIEkmQ9peYiYC%2FDXZ1dTE0%2BpKOjAwDDMEgkVFRVRVUTqGqcaDSKoijIcqSStvrHsCqAVfvtra2tjQf3JunpOe%2BKlLsievPfVATsLR6PMT46Qf%2Blftz5rQVht1wuF7P61h5IAElrMJVK%2BdLa7dbN23V9qpi0sbFxDogBvy2AGKAK%2BPl0Zrqz0TcHMSEo7OzsSIAKzttxHDgFnKQckVbfGUqAAeiUL6ZFwPwHoCPySkkqHncAAAAASUVORK5CYII%3D";
    var img_next_page = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAArVJREFUWIXFl89P02AYxz%2Fb6hwRPcguQJQwEy7cwUS9qEfw5hiCw6AeNB79QbwLIiIaPRi9CKho1D9BTdi%2FgMFeSDywFhMPmm11bbp6qLPt2rKubPgkb%2Fb2%2FdHvj%2Bd5t73wnyNif5hfmBM1Te1rJWAsJuR7DvUeTqfTOoBgn9Q0te%2FWjdutxGd%2B4V5yY2OjHfjpIlCNcvl304ENwyCRaAMMx3i06Ug%2B4IZh%2FO075zwdaDQWF5fqrhkfH%2FMcbwqBiYmsa6yq2lRsOdASAm5gC3RXCARJwehopnUEstnztiLbRQecoLtMwA66vPxy27XpdJra8x%2BagJfqsbFzLgfMZ2d%2FxwTcVvvZHZxAoG9CC8xslYr5%2BebtCpqmueb9WigCtaD2tppb5cHD%2BxQKheYT8AO1t2g0iiiKTM%2FcQZKlbddWKg0QsG%2FUdR1N01BVlXK5jKKUKJaKFItF4nviAGx93%2BLu7AzrX9c9U7WdA55FWN2gqhryloSUz5OXJGRZRpIlZFlCVVXHnlKpxOMnjxhJZzh%2B7IRnwYZywKru%2BqHrOq9XXvH%2Bwzt0Xa9RH5oAWMcsGJNPnz%2Fy7PlTFEWxHccdOWDfHIzE2pc1lpZf1HXAswbMinW64PePxi96e1NkMqNY6hssQqfthm28fgwMDDJydgRBiNVNQSACQfMfiUQYHhrm1MnTrlMQygFBEOju6qa7q%2BtfGuwvvTl1HUVRAEgkEmTHs%2FT393uoDu2A9w%2BQtcaMjo4OLk1eprOz06W6eooadsAP1K4KDFKpFJMXLtLevs9XdagU%2BKu2VA0OHGV46AyxWNRXtdW3QhTFeC2BNuBgdTCZTHqyrY2rV64FWlcTkVwudwSIAz%2BqBOJAwoBvs3PTPWHeGjQMg1%2Bbm5sRIAHO2%2FFe4ACwH9ORZt8ZNEAHSpgX0wJQ%2BQMLGALQIl7c%2BwAAAABJRU5ErkJggg%3D%3D";
    var img_slideshow = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABkVJREFUWIXFl11sFNcVx3%2F3zuzM7Kx3dlkWyuLGwQJRUheKqUkLxOA6bRMHRShSHhK15alCahMJqcpD00itKtGH9qFS1eQlL1GFSj9C0lZOW7XplyC1jEygGIOB2nzE4BAWe23vemZ2dmZuH%2Bya0uDN2jz0SKMZ3a%2F%2F75577r1n4P9sYjmd2trajFwut10I8SlgC%2FBpIcQapZSjlEoB9vHjxxsaW1%2BKcGdn5y4hxEtCiM8bhlGVUiaEEHahUOD27du0t7czNDREsVhseEzZYDuxe%2FfuVwzD%2BJNt24%2B3trZaQojMwYMHbSklhw4dQgjBjh07EGJpTm0IYM%2BePS9YlrU%2Fl8vZmqaJzs5OAMbGxgA4cuQIAIcPH16SODQQA11dXVlN064CmW3btjE4OEihUGB8fBwp5cIDEIZhHARBuVarZe47Btra2gzP875YLBYfbW5ulr7vMzw8zOTkJOPj4wRBMDcDIYjjGEBpmjYGvGlZ1o8bEYf6HpAbNmyIWlpa8H1fVSoVEQQB%2BXyerVu3ous6tVptAcLzPIaGhiiXyxXf9yXwspTyOyMjI9XlArBh%2FcdVbuVapJTouo5pmmzatIne3l4syyKbzZLJZHAch0wmg2majIyM4LoupVLJrVarF6rV6iPXr1%2F3Fp1lPQApvDgIAtLpNLquo%2Bs6URTh%2B%2F6H2iqlSCQSKKVwHIc1a9bYtm0%2FZBjGd%2Btq1KvUtSAMgoAgCDAMAyEEyWSSnp4e8vk8mqYtlFmWxfnz53FdlyAIME2TbDabBPV8XY16lZqsxm61ShRFSCmJoohSqYTjOHR0dAAQBAGlUomBgQE8zyOdThOGIaZpIoRAoFLLBpAyVo6TZmZmBtu20XWdy5cv4zgOqVSKMAxxXZdKpUIcxySTSaSUJBIJoihiZmYaXavUk%2Fioo1iILZs3cqtYJooi4jgmlUpRqVSYnJwkiiKUUgghMAyDRCKBZVkL3kqn09S80v0AwONf2s4vj%2F6DQqGApmmUSiVmZmaIogiAKIoQQizslHQ6TVNTE5cuXWJw8AxrV0fLB8hlYd%2BTuxgePsfNYoRt27S0tGAYBpZlkUgk0HWdIAhwXZeJiQlGR0fp6%2BtjamqKffseY3T46PIBVmZB0zS%2B9pV1vHNigpODIRMTZTzPw%2Ff9Rd9GIub5577Os8%2Fs48Vv3g9ADkBw5PWzPPZonu6dMQOnZxm6WOW96yG3ogjfh5QdsjrnUchPc%2BXaNK%2B8eozyrIaQEavz1A48if1qL%2B6SAVKmkkIKnjvQwdFfv8tbN4p0bNF4Zq%2FPivQkr%2F%2F2BrpWpjQFT%2FVAEMBLPwTTSjFddhFSp8kmnm0isZhG3YMojEND1zRMQ%2BPZp9dzYP86qoHiZ2%2BUATh1NuRXvXDiNIRhvZEWt4YyorPnirRtkqSbdL6wO0P3zhpxeJvcCkHWgZky6PqcB5ZqDSUkqVSCU2eKRJG6q9xOCv7WB9GiO%2B2jU4K6AEKIWKmYtQWHVfkk7%2FRPcPW9KlE8V3%2FyTMgPXoTxD2D%2BZl4wpRRSGiiQ%2Ff3klgWgJ4yK501z%2BmyJj622eeRzK1Eo%2Bk%2FO3Yb7n7Y4%2FCY80Q2J%2BTDT71rUOQ%2BUyziAuWQA0AeujZ5Sn3zoE%2FSd%2BIDJUkBri8Wuhy0A%2FvDXgKGL8Naf7%2FTQNBDSRNM0aoGPipGlEhJILhVA3Lg5%2B9M%2F%2Fv41L7eylc9ub2Zs3KNvoMz4zbmQv1mM%2BfJTUK3dvQRCmDiOw%2FUrbxAprk1NEQPaUgHUL37D2zduXHn%2F3YHeuCm7k89s20j75hTufD7yvRds4hi%2B9Y07S9DUlCOZTOKWx3j7d9%2BvDpzhR0AI3DM1uyfVfwNWa2F%2FefLU3nL5prl%2BY7eWTDWTyypUPI3TVGHzRpd8LoNItGKmO8Hsxp8d4eevfTUYHA5fPtbPX4BpoAio%2FxVoJHVeVSjwYE%2BX%2Fu0VafZ2bH%2BYre1bjVX5VRhGAil83NkyxeL7%2FOvSSHy875xy3WD02An1k3OX%2BCdwG7gKfDiPaxBAAHkg98BaHmxv44kHmvUuU4%2FXKZQdxUoXEi8OuTV%2Bi1PnLvL3C6NcmJ%2F1BDAGLHpELeU%2FygJygAOkmItqgztxFM0LecAMcAsocw%2B3LxfgPybnYcx5AB2IgRpzbq7Ofzdk%2FwYS3ZXoLdZECwAAAABJRU5ErkJggg%3D%3D";
    
    var img_backward_unchecked = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAA%2BlJREFUWIXtlF1MW1UAx%2F%2F3nHt7b1ukFEpbbTEpbDiUj0IIMBBx2eKWGB8w4UkhPGhMfFAw82FGXYxPPkLnky884xITkyUEx3QhwpAhWDqwoVJKb9tZWuhlCoXeDx8GyIIFJosv9pfcl5vfOed37scBcuTI8X%2BH%2FstxLAArAAsABkD6CftZYQCY88x5lW0vt371ysXzGoDSk%2FjkMRbXA3i2vr729baWlptdXV2dO%2FezPcV9fut33d3dbx7hZ4UCsLlcrpcuXrpw64MPe%2F6UpJSmaZr26muXtgGUncRnj1jcxPO8vfFsw1vFlqJ3r1z5iHfX1NH01iZUVX0SftYAAUCx213V%2BozD8UV7e7ulq7NbUDUF639IADToBcNJ%2FKwBBECRw%2BEoq6p%2B%2FhOXy3Xu6tXP9EVFFmxtpaEoMgghYMDsH8M4HA73Y%2FhZAziLxeKqqal6o8BsutzT08s3n32RZuQMNtObADQwzO43qwEAKEuZc%2BfbOosKzZffe7%2BXb25qoZvpDaylVqFBBTQGmqYBDJBnfAq8TgdBELR0On0wwGQy5TU3N3QKeuHj%2Fv4vYbPakVhbQSaTASUEDEPAMAwYBsDOjgQdz%2BqLhU%2F7%2Bq499FfjyMjy3z551DcYDQzP89gfsPdLVFZWKsnk2uLTdltq%2FM5Yg81mI2WuMkIIhaqqYFl25%2BLAshx0nA43R4blbUX%2BfOLOeIP1GP7w8JAiilGPJEmpAwGxWEyNx%2BOSTifMbm9tfitGwk6fz%2Bt0V9dyBSYzNGighICjDyemhOL72yPKxNjdt2V562sxEnH67nmd7mp3Vv%2BH27fU4GLoWjKZPBiw%2B3JjsdhGefmZRHAxNMKx3Ix3drpRlmW%2B%2FNRzLKXs3sSEEPw4NqqK4Wh%2FJBILSKn1EUqYGd89b6MsZ%2FjT%2F%2BSPj6rRyH2PKIpZAwAAgUBAEUXxgdNZEkqsxK5n5K3M9C8%2F1zmdJaSwsJAoqgJKKH6anFDDy2L%2F1NRUUhTFBwaDMbSa%2FP26rCoZ7%2Bx0ndNRQsz7%2FMnJCXU5JPYHg0Hp0IBd%2FH7%2FdlVV7fpSMDzDUnIjGhNLI5Gwrfz0GY7jOExPT6pLS2HPwsKCBADhcHi7trZ%2BPbQUnqFEdyN2f7k0Eo3Yyk%2Ft%2BDN31V%2FnFzzHDgCAubk5LRAIbFRUvLCyHBKHDHre7w%2FMN6mKyq4k43wsGu%2Fz%2BXypg37FSigkDukFnX%2Fht%2FkmRVbYRCLOx%2BPJR%2FyjjuI9BgYG0gBi%2Bfn531it1nGO9%2FYajcZ39Hq9cpRfkJDGWZbrNeYd9LMfUYcwODhIR0dHCxVFESilksfjWT%2FM7%2BjooHa7%2Fdh%2Bjhw5%2FlP%2BAkl39GFkFh9JAAAAAElFTkSuQmCC";
    var img_backward_checked = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABkVJREFUWIXFl11sFNcVx3%2F3zuzM7Kx3dlkWyuLGwQJRUheKqUkLxOA6bRMHRShSHhK15alCahMJqcpD00itKtGH9qFS1eQlL1GFSj9C0lZOW7XplyC1jEygGIOB2nzE4BAWe23vemZ2dmZuH%2Bya0uDN2jz0SKMZ3a%2F%2F75577r1n4P9sYjmd2trajFwut10I8SlgC%2FBpIcQapZSjlEoB9vHjxxsaW1%2BKcGdn5y4hxEtCiM8bhlGVUiaEEHahUOD27du0t7czNDREsVhseEzZYDuxe%2FfuVwzD%2BJNt24%2B3trZaQojMwYMHbSklhw4dQgjBjh07EGJpTm0IYM%2BePS9YlrU%2Fl8vZmqaJzs5OAMbGxgA4cuQIAIcPH16SODQQA11dXVlN064CmW3btjE4OEihUGB8fBwp5cIDEIZhHARBuVarZe47Btra2gzP875YLBYfbW5ulr7vMzw8zOTkJOPj4wRBMDcDIYjjGEBpmjYGvGlZ1o8bEYf6HpAbNmyIWlpa8H1fVSoVEQQB%2BXyerVu3ous6tVptAcLzPIaGhiiXyxXf9yXwspTyOyMjI9XlArBh%2FcdVbuVapJTouo5pmmzatIne3l4syyKbzZLJZHAch0wmg2majIyM4LoupVLJrVarF6rV6iPXr1%2F3Fp1lPQApvDgIAtLpNLquo%2Bs6URTh%2B%2F6H2iqlSCQSKKVwHIc1a9bYtm0%2FZBjGd%2Btq1KvUtSAMgoAgCDAMAyEEyWSSnp4e8vk8mqYtlFmWxfnz53FdlyAIME2TbDabBPV8XY16lZqsxm61ShRFSCmJoohSqYTjOHR0dAAQBAGlUomBgQE8zyOdThOGIaZpIoRAoFLLBpAyVo6TZmZmBtu20XWdy5cv4zgOqVSKMAxxXZdKpUIcxySTSaSUJBIJoihiZmYaXavUk%2Fioo1iILZs3cqtYJooi4jgmlUpRqVSYnJwkiiKUUgghMAyDRCKBZVkL3kqn09S80v0AwONf2s4vj%2F6DQqGApmmUSiVmZmaIogiAKIoQQizslHQ6TVNTE5cuXWJw8AxrV0fLB8hlYd%2BTuxgePsfNYoRt27S0tGAYBpZlkUgk0HWdIAhwXZeJiQlGR0fp6%2BtjamqKffseY3T46PIBVmZB0zS%2B9pV1vHNigpODIRMTZTzPw%2Ff9Rd9GIub5577Os8%2Fs48Vv3g9ADkBw5PWzPPZonu6dMQOnZxm6WOW96yG3ogjfh5QdsjrnUchPc%2BXaNK%2B8eozyrIaQEavz1A48if1qL%2B6SAVKmkkIKnjvQwdFfv8tbN4p0bNF4Zq%2FPivQkr%2F%2F2BrpWpjQFT%2FVAEMBLPwTTSjFddhFSp8kmnm0isZhG3YMojEND1zRMQ%2BPZp9dzYP86qoHiZ2%2BUATh1NuRXvXDiNIRhvZEWt4YyorPnirRtkqSbdL6wO0P3zhpxeJvcCkHWgZky6PqcB5ZqDSUkqVSCU2eKRJG6q9xOCv7WB9GiO%2B2jU4K6AEKIWKmYtQWHVfkk7%2FRPcPW9KlE8V3%2FyTMgPXoTxD2D%2BZl4wpRRSGiiQ%2Ff3klgWgJ4yK501z%2BmyJj622eeRzK1Eo%2Bk%2FO3Yb7n7Y4%2FCY80Q2J%2BTDT71rUOQ%2BUyziAuWQA0AeujZ5Sn3zoE%2FSd%2BIDJUkBri8Wuhy0A%2FvDXgKGL8Naf7%2FTQNBDSRNM0aoGPipGlEhJILhVA3Lg5%2B9M%2F%2Fv41L7eylc9ub2Zs3KNvoMz4zbmQv1mM%2BfJTUK3dvQRCmDiOw%2FUrbxAprk1NEQPaUgHUL37D2zduXHn%2F3YHeuCm7k89s20j75hTufD7yvRds4hi%2B9Y07S9DUlCOZTOKWx3j7d9%2BvDpzhR0AI3DM1uyfVfwNWa2F%2FefLU3nL5prl%2BY7eWTDWTyypUPI3TVGHzRpd8LoNItGKmO8Hsxp8d4eevfTUYHA5fPtbPX4BpoAio%2FxVoJHVeVSjwYE%2BX%2Fu0VafZ2bH%2BYre1bjVX5VRhGAil83NkyxeL7%2FOvSSHy875xy3WD02An1k3OX%2BCdwG7gKfDiPaxBAAHkg98BaHmxv44kHmvUuU4%2FXKZQdxUoXEi8OuTV%2Bi1PnLvL3C6NcmJ%2F1BDAGLHpELeU%2FygJygAOkmItqgztxFM0LecAMcAsocw%2B3LxfgPybnYcx5AB2IgRpzbq7Ofzdk%2FwYS3ZXoLdZECwAAAABJRU5ErkJggg%3D%3D";
    var img_forward_unchecked = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABGxJREFUWIXtlFtsFFUYx%2F9nLju7O7OzszPusssud%2BpLgbWYYIxJC0EKiRfAWB%2BaUoUXnqwl%2BKYRIhESuZPwKuKDD5qCDybVxAR4QYRAa4wGlHaLKVja7uxuu9u5z%2FFhaa1l28Kbif0nk3zJ%2BZ3JL9%2F5zgEWspCF%2FN%2FDTqtVAIsACAAsAP48e5%2BWn1cg3bx1c9%2FiTJop6IUB27bdRz%2BeLU%2FLzyugrVq98t09u%2Fc8N14utUhyZHDowZAOwAbg1tirrlq9suOdt3c3lCtjLVFFGSzoBd113dn4uQVkWVYzS9IdRz89zm9pbpbv5XLbYmo0y3GBO6Zp2rZtmwDoJJ9IJGLJ1KKOY0dPcFuat8q5%2Fr5tshzJhkLhOwzDWOVy2ZrOzyuQSCRi8bjWsautHZT6ePWV1%2Fi6Z%2BuW3%2Fn9duszcc0Xw9KALMuerusWAKRSKTWmKjP41ct%2Fu%2F1ra1SRfTWm3ZNl2c3n8%2FYTCSxbtiwWiYjv7Wprx3hlHI5rI5NZyrS8%2BVbANCc2jOYf7gwFhb5YTCtpmmbJsiyHQkJt3jBeGBq%2Bv1MMh%2FtTqXRJlmVrZGTEqyVAJovGxsYVwRDf%2F%2F13P6A4VgABAQjAsxwEIYSHw0M4cOAjc%2BjhX92m4xxiPKYI4j3GcyyH4AzeAw4F2eCf2Wy2cPDgwX%2FdlqkONDQ0KCC0s7W1DYWSDs%2Fz4Ho%2BXNeBaRmQpAh2bH%2BDW5zO1P3yc28bYUmREGxubW2DZVsgDAFDGACA6zqQpAi2v76DS6fTdT03b7b5vm9UKhODqqqWBwYGpiSYyUJRFEiSCADgWB4sy4FjGRDCgFKgPFFGabyITU2buBMnTkdCQeGwKFZ527arn2PBtEwYpoHiWAGl8SI2Nm3iTp48EwkI3GHft1rWrl0bnt4BbrLQNI0WilUxQQiCkOrpUOrD930EeAFBQcC1n350z39xzojK0cOO6xyZn7%2Fqfn7%2BnBFTYp9Eo9qX4XB4oqZAPB6ntlNdCwYEgBBQvyrE8wHoeh6nTh839LzerSbih%2BSgrA%2FeHzgyJ3%2FqmKHrencilfpYjaj3Ojs7S4QQWlMgEolQ8dERsBwH3%2FfB8jyoT9Hd%2Fa15%2Fca1Bwxh92fXrb9qGEaB5%2FlkoTQyO3%2F92gOeZ%2Fdn1z1%2F1TCMwt69e519%2B%2FZhZqYEotEo1YtVAc%2FzwHM8%2BnN97sVvuizf946tqW%2F4zDTNfHt7ewUAurq66OQM%2FMPfdS9c7LIo9Y%2BuWdNwbjo%2FW6YEVFXFyGh1PmzbxoWLXxuj%2BZHLyUTiw0xmRf%2BVK1fGpl8hRVGoNG0Iuy58ZeTzo5eXpBd%2FkEwuzc3k5xVQFIWKkohbPTeM3t5beS4QeH99dsMlRVGK9fX1j71mmqZBlMK42XPd6O25lRcCof0vvdh0SRCEUi3%2BSQR8URTRn%2FvjTFPjy2crlYqezWZnbd8kn8vdPbOxactZSZL0ZDI5Z7trZeolHB4eliilYiAQsBRFGSOEzNk%2BSqlUqVREx3GeiF%2FIQhbyn83fWcMofSJnzd4AAAAASUVORK5CYII%3D";
    var img_forward_checked = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABkVJREFUWIXFl11sFNcVx3%2F3zuzM7Kx3dlkWyuLGwQJRUheKqUkLxOA6bRMHRShSHhK15alCahMJqcpD00itKtGH9qFS1eQlL1GFSj9C0lZOW7XplyC1jEygGIOB2nzE4BAWe23vemZ2dmZuH%2Bya0uDN2jz0SKMZ3a%2F%2F75577r1n4P9sYjmd2trajFwut10I8SlgC%2FBpIcQapZSjlEoB9vHjxxsaW1%2BKcGdn5y4hxEtCiM8bhlGVUiaEEHahUOD27du0t7czNDREsVhseEzZYDuxe%2FfuVwzD%2BJNt24%2B3trZaQojMwYMHbSklhw4dQgjBjh07EGJpTm0IYM%2BePS9YlrU%2Fl8vZmqaJzs5OAMbGxgA4cuQIAIcPH16SODQQA11dXVlN064CmW3btjE4OEihUGB8fBwp5cIDEIZhHARBuVarZe47Btra2gzP875YLBYfbW5ulr7vMzw8zOTkJOPj4wRBMDcDIYjjGEBpmjYGvGlZ1o8bEYf6HpAbNmyIWlpa8H1fVSoVEQQB%2BXyerVu3ous6tVptAcLzPIaGhiiXyxXf9yXwspTyOyMjI9XlArBh%2FcdVbuVapJTouo5pmmzatIne3l4syyKbzZLJZHAch0wmg2majIyM4LoupVLJrVarF6rV6iPXr1%2F3Fp1lPQApvDgIAtLpNLquo%2Bs6URTh%2B%2F6H2iqlSCQSKKVwHIc1a9bYtm0%2FZBjGd%2Btq1KvUtSAMgoAgCDAMAyEEyWSSnp4e8vk8mqYtlFmWxfnz53FdlyAIME2TbDabBPV8XY16lZqsxm61ShRFSCmJoohSqYTjOHR0dAAQBAGlUomBgQE8zyOdThOGIaZpIoRAoFLLBpAyVo6TZmZmBtu20XWdy5cv4zgOqVSKMAxxXZdKpUIcxySTSaSUJBIJoihiZmYaXavUk%2Fioo1iILZs3cqtYJooi4jgmlUpRqVSYnJwkiiKUUgghMAyDRCKBZVkL3kqn09S80v0AwONf2s4vj%2F6DQqGApmmUSiVmZmaIogiAKIoQQizslHQ6TVNTE5cuXWJw8AxrV0fLB8hlYd%2BTuxgePsfNYoRt27S0tGAYBpZlkUgk0HWdIAhwXZeJiQlGR0fp6%2BtjamqKffseY3T46PIBVmZB0zS%2B9pV1vHNigpODIRMTZTzPw%2Ff9Rd9GIub5577Os8%2Fs48Vv3g9ADkBw5PWzPPZonu6dMQOnZxm6WOW96yG3ogjfh5QdsjrnUchPc%2BXaNK%2B8eozyrIaQEavz1A48if1qL%2B6SAVKmkkIKnjvQwdFfv8tbN4p0bNF4Zq%2FPivQkr%2F%2F2BrpWpjQFT%2FVAEMBLPwTTSjFddhFSp8kmnm0isZhG3YMojEND1zRMQ%2BPZp9dzYP86qoHiZ2%2BUATh1NuRXvXDiNIRhvZEWt4YyorPnirRtkqSbdL6wO0P3zhpxeJvcCkHWgZky6PqcB5ZqDSUkqVSCU2eKRJG6q9xOCv7WB9GiO%2B2jU4K6AEKIWKmYtQWHVfkk7%2FRPcPW9KlE8V3%2FyTMgPXoTxD2D%2BZl4wpRRSGiiQ%2Ff3klgWgJ4yK501z%2BmyJj622eeRzK1Eo%2Bk%2FO3Yb7n7Y4%2FCY80Q2J%2BTDT71rUOQ%2BUyziAuWQA0AeujZ5Sn3zoE%2FSd%2BIDJUkBri8Wuhy0A%2FvDXgKGL8Naf7%2FTQNBDSRNM0aoGPipGlEhJILhVA3Lg5%2B9M%2F%2Fv41L7eylc9ub2Zs3KNvoMz4zbmQv1mM%2BfJTUK3dvQRCmDiOw%2FUrbxAprk1NEQPaUgHUL37D2zduXHn%2F3YHeuCm7k89s20j75hTufD7yvRds4hi%2B9Y07S9DUlCOZTOKWx3j7d9%2BvDpzhR0AI3DM1uyfVfwNWa2F%2FefLU3nL5prl%2BY7eWTDWTyypUPI3TVGHzRpd8LoNItGKmO8Hsxp8d4eevfTUYHA5fPtbPX4BpoAio%2FxVoJHVeVSjwYE%2BX%2Fu0VafZ2bH%2BYre1bjVX5VRhGAil83NkyxeL7%2FOvSSHy875xy3WD02An1k3OX%2BCdwG7gKfDiPaxBAAHkg98BaHmxv44kHmvUuU4%2FXKZQdxUoXEi8OuTV%2Bi1PnLvL3C6NcmJ%2F1BDAGLHpELeU%2FygJygAOkmItqgztxFM0LecAMcAsocw%2B3LxfgPybnYcx5AB2IgRpzbq7Ofzdk%2FwYS3ZXoLdZECwAAAABJRU5ErkJggg%3D%3D";
    var img_only_unchecked = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABrNJREFUWIXllluInVcVx397f%2FdzznfOzJy5JzMxTdIkjVDbJoTYN8VSlFYRfRARqlSIYF98Ft8svolFRPEGgi%2BCfVDQkhibVLCFUjPNzZrLJJNk0jPpZE7mzLl853zf3suHc%2BaWM51U8EFwwfr23h%2BLvf77v9dea8H%2Fu6iNi%2B%2B89NVft1vJ10TE%2BW85uL%2B8wlK1xkq9idbaRGHuFydef%2FN4H4CXvv7lES8XzH3v5Vciz%2FO23Eyk789WAw%2BupPfpdNp85UvPJ2ktnTr9zjuLAO6qUUfswOhQ2WitOXf%2BLK%2F9%2BSRxHANw5t0FEBAErRWeo7A9REoppIesOyqmRyLGhgJEBLGC42qe%2F%2FxzTE5MMTI6lt1uzg0CmwEoh0I%2Bnxcrlkazwd69%2ByjGRay1%2FPDVq0yOFLjzQZ00Mw8hHd6%2BUuMbz%2B5lqOBhrGGlXuNf711labFGXCxKqqWwarsGwEHiqBAjVmg0mmitsSJYsQRRzMf3TJIrply%2BUXkoAAucubjMF46W15h5dP8exkYnKJZiVGbjPgAW4nyuoEQs9XoD7XiIWERgeHiIx3YPMr%2FSwAtL2P5g6JPZe1BLLD4djDVcn53j9s0KcaGkUNIPACjl8gVlraXZbFGMA0RAxHJweoidwyGoBl98epJrVZ9zlx%2FOxMyVKrtKdaIo5GO7pykPjXDp4lmlUaVVG706URBHuZxjxdJqNXEdtxtEIuTDrpnvwlTZ43NP73uoc4DFlo%2Fv%2B1hruXOnwpt%2Ff4u4UHAE1hjQ6%2BYSh2HkWmvJsgylASUoBYHffa3WWAYKmsqtaxT5gDC7i2%2Fu45oVFBaNQUuKQtCS0spcgsAHYHxijMNHniQIQ3fLK1AQh2HkigjWWpBukhCg2e4uBiLF6b%2Be4trVa4SlQ4RaUKaNuBE6eQ%2FdWcIGo%2Bj0PpgW0ipyK19mbHyU6r0qF2YukYvyLqh%2BAK4XDvthiLUWhVr3rhQHpmKUUni%2BwzPPPsPMzDnemrlKdeqbiOqSqJMKuHkwbXRaxa39E3ELXLlzgyi3Qq4QcfTYES5dOI8f%2BMN9ABxXDwRegBWLUqqbYLRCWdhRdhDbZaHerDOxY4z4wnnapoIxHYLZ3yDKRdkEQaMk67IqGWif6hIkSfc1%2BEGA53gDfQBAD3hBgLW2d3CFRmEVKBRJJwEnT5rW8H2fofIQqv46bnOOxWxlLadvKi6A2IxGvUGnnWCsxQ8CUPQD0EpKnudjjUUp0FphjNDpJDRbTay1HJkWAq8bVMVSicr8JcSxCB9eu5RyaHfaJEkbMQbf89F6%2FRmuJyKh5LoumRiytJs%2Bs6xLpet2zXx%2FfePR6BajT61m1BLbi6LVamFE8P0AY2UrALbguB5pp4kxGVpr%2FI0et5Dj3%2F4u4o5v7zqr8NMff5%2Bk3cYag%2Be5IFvUAkRyjuNgbTfN%2BsH2zgFcF7x8cVubtLEAQKuVYEXwPA9rJdcHwBiTcxwXaw2VhQqev3VPsCpaa5r3zuM3ZrcH0ElQSpN2Eqw1uEGEMVk%2FALEmVFqhlMvxbx1fq%2F9rzYbIpn83r43x29%2F9gVKpQI80Du5cBgXXKzFJqnEcTW25weNHP8vOPU%2BiVDeejLFhHwDtuM2FhTvF8bEdXYesO9zYcEivvRkc%2FDSPH%2F4UIvD%2B7cu88aefIKYNKCStMrnrMzxx7Ll14L26cvPmHK7rNPsAKMWLP3%2FlB7%2FMsmwtTX5UiQLLIzs1%2BXgUEcPosOUfb5%2FiLyfe2NQTAniev6IdXlzzu82%2BIZADcvv379%2F36MF9P4vCaHL3I7uDXBRtLONI%2B30OTMGhfYNkaR2rB%2FnjibPpyz86ebjT6dSBZk8bwKaWatNGG8QBfCAAggMH9%2F%2Fq8JGnpg8%2BdkArpZidvb7JuGM1A0PD7H7iBRrVyyT1uyj1rjcxkivPzXcyuk2SAbIekIcC0Kvq%2B77vuM6O8YkJ7TgOWmn27t2zdqcASwspjVaDTmMeTB1DhAXm5%2B8nvcPoDdp30g8TF3CNMbo8PLy8tLh4zHFdJ5fLq5HyCOXyMOXyMEODQwyWd3Jx5m8kSQNjNCdOnuLSlcVXZy7cOAO0gU5vbPLAFWwXAz69GACiQ4cOfGJ61%2FQLQRh9MpeLCrl83gZBoABazaY0Gis6clpp4Jq7128s%2FP7E6ZnXgBaw0tMqsPygk%2B0ArDKUpxuQIb2YmJycHI%2FjeDwMw5HUpE6z3mwsLy%2FXqtVqbQOr7Z7jGrDUmye9%2Fx8ZwEYgqyC8nq7erdtjy%2B%2BtFd1gW6W81dOE7lX8RwxsJYr1gFKs904PKg%2FM%2Fzfl31tHCYWJv%2FdKAAAAAElFTkSuQmCC";
    var img_only_checked = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABcdJREFUWIXtlluMHXUdxz8zc2bOZffs1q1mi%2BllW2kRK0gslLaYbmtFMQR9sNHEBxN90QSDCUkfihJXTHzxSfESfRAqCAiC8CAVixYIbMFLi6bNaqWXvXWvZ5ez5zrzv%2Fx8OGe2Z8%2FObvdNH%2Fwl38zMf37z%2B35%2Fl%2F%2FMwP%2Ftv2zOaje%2FA58OHO7DdXcJ5FwIxdpzWngsA08cgUrs%2BxDsTbl8w8G5Q6AbsK7IZePwjGP5%2BQMws2YBA9CTdvhlkAkO3tx%2FU27zLTvIdGbQoWZ8aJh%2FDp6rzUzOhcbKVwN4SRwe84LUoQ%2Fv%2FmB2y%2B6dTn59F1Ybpv49wvnBs9HIpalIrHz9W3DsmgJ%2BCOmy65zedsN1O3Z%2Frj%2FlItgoQsSACI7n4wYB06OzvPrUq7VaPcp%2B4MbNas%2FhA75j6th6DTERjpvCDTJ4HV0UxmZ47VcnqrVK%2BLOjcP%2BqAr7n8njf1t7Dez7fn5awhtWqcUMsICA0hPhpJOhgdGiUvps3Y%2BYLiNEg0gCCiIDjkOrqwQadvPjjZ6vVcv3IUctPEgUMwPVZ33v78H33dNioimgFVpoC2gIDjuvhdXaj350HMVf9oOHT9McKqe716CDP8z96tijKbj0K8wCpVgG%2By5EbbtqYkaiOrVbA0giwQmCxgq1WF89b%2FZYcRYimr%2BB1v5%2B%2BDT3Zi%2BOzD2A5skyAg3PPphs3eaZSQqJoseRXSZcHRkCcq61BBFsO0eU6phZh6woJNbau8PIz9F2%2FLbg0NvtFSBBgRN7X2ZFFSnOI1ksDL2kDi22I18RYoskiaqqEVYYkM5Uy%2BQ29aKE3XmuvgIi1mCiCeKDasl4kbmmNXgipXSqAtonEi%2FE9D6UNrkM1fnyJANelVKvUegJrEBU1Fq00fBdFLK1EOFNBTZUW9axmXmcnpcIcDowuci5xSLln58YLOKSQUCOhwkYaiRQSNa4lUohSWKUIR%2BZRk2sjB0hv6uPyvy6ERng0UUCkeXTk4lTNzXVitcIqjWiFKN2ANogymHJE7eK7qGK4NmYg1bMelV%2FHyMSsMvBIogBjzJOTE8VKsRjiZvOIMkjUIBWlMfWIaKpEfWwBiZIHLcncIE3%2B1n288dLJqiDfHoDZRAEDUFdG7n39xN8rdG8A18fUFLpYJ5yqEo6V0SW15pIDOL5P1x39%2FPm1U2FpoXJqh%2BUHrfe99gdOwrl%2BsZunh6c%2FtGX7Tl9dmUUv1JBrTHgyeUD3%2FkO8ffqsGr4wOqyEQ%2FdCfVUBAF8Tjl%2BJ9O3T07Mbt922y5dSCRvWk1xXNDedYd3BO%2Fnr4N%2FU8DvD512RfQ9CcZnIlQI8Dd47Dk915DJ3939yf9ZcOk80ObE28myO7gN38tbJwXBseGxICf0DsJDkm1gBgGdAXobf%2FFHp91y%2BMHxL320f9dPZLHqusCq5l%2B9i3cFPMfiHV8LJ0YkzvnDgm1BeyX%2FVP6LYHoKvpFz34X0Hbs%2B9tyNN%2BcxfEK2X%2BaV61pP%2F2Md55bcv1guzc6eywt33Q21VwdfgdgH%2FJAztFHmzcHn8M6lMxt%2B4d6%2BjpiabH6yGBRuuI7tnPy8%2F%2FXytML9w4pjwpSfBNGM0v8trF5ACMkAO6AA63oJ5geO56cLBhdlCbvtdd3mmOI8pl0hv2UrwkVv5%2FRPP1Seqtee%2BLzw404idBvwmYq4lL5CkFqRbELQcAyDoha4vO3y3N5fd9YkvfDYdOFAOFSd%2B%2FUI4bPTjP7U8AiggakPYRERjK9qkCvhtAmJkgCyQqYB%2FCt7caHR6%2Bh9D29O5rPf68T9FZ7T5xTHhd83quU04bUm2tkInCUi1wE849wFfIHVaOJ%2B2MuGOjO8dFHn4BXijmZVtlrkduu1cJ7XATch%2BWRtaBHl5SJcapbUtgVcqf4xqXImVtuFqpPFAeW0lbs1e05iDGLGIWvN60a71HvCahEuybiLucWzC8hbEGavm%2BjJb04uozb91uGLEgxULWHHf%2F8%2FZfwCrEzU9TyEZBAAAAABJRU5ErkJggg%3D%3D";
    var img_open_nextpage_unchecked = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABo5JREFUWIXlls9vXFcVxz%2F3vfvmlz3xjxm7tpM4SdPGCQlSEYTgCoGEoKpgDVIRlVh00QUb%2FoSqYVWCRNQukKAgFl2wQGpWbBFNm4a0iZqkTUtrx6knHbv%2Bbc%2FMm3d%2FHBZvZjz2TJp2h8SR7jtz75tzz%2Ff8fAf%2B30l1b15%2B5eU%2FW2OfFZHwywh77%2FcsEXnYmYui6I%2Fnz59%2FvgfAxYsXx8IwXPjFsz%2FPa637KhTpOenH2L%2BT1sOYhN%2B%2B9Ls4SZLDFy5cWAHoaBKR4WKx6JRSvHH5Nr85%2Fybj47r9DvGCCCiV8vbvIEz3iEcEgiAgCBXiQamWLFleePG7TE0eZrA4aJeqSyPAXgDW2sFcLitePGvrMWdOh5TLOr1ABO%2Bl486RkSwjpSxaa3Z2dlhb22RrQ%2BF9gPemE55UFu4ueD688zFrK1vkcjkRkcG23g6AMAyLUSaDeGF9NcY5QxxL6xLfslo4e%2B4oZ86cwHnLUnWJIJzg6JEjXLt2nXff%2BQ%2BbG3QUt%2BWsDTkxc5xHxie5efMm3vtiDwARKeZzOSXiWVmt4Zwljh3SCrz3nkOHDvD9781y9eo1rl59n7XVBkoJo6NX%2BMFTs4xPLLK6soWIwvs08Ds7DZJEMz%2B3wOK9KplMRhlj%2BgIYymazynvP%2BnoD8BgD3guQWjRSGqAwUODGjdtUPzOIhIgIlYrjrctvc2h6ituyylK1xurqJtvbNYyxlMpPcPTYNKXRMVZXV5RzbqgHQBAExUwmCr14NjaahAqMcV3xhGbcwBpDrdbEmA5wRASlQoaGDjA%2Ft0i12gBAKYXWEc557t%2Bv8tGdT8jlciHQPwRRJqO999TrhkLOdOIuAmODC5zMvsJ7f%2FsVPzzsSSYgMdA0KU92oPKG4sffKPCPf8%2ByvDGOUgAKaz0Tk48wPDPMjevvaWttLwDnXDGKtBYRrHUY4zt1773wo9OXmP3JCxTLM%2BDXcK6Gt1s4t4Uzm1i7iU3WmP%2FwXWqNy7x%2B5WcdAM4K66vr3LrxPqOlUd03CYMgKOsoSt3tPdbSin3qgUywykD5HCSXkOY%2FcaaBNXWMTbk1dZzPUp48g%2FJ30TpCpQjwXsjkBjg3e5a78wsopco9AECGo1DjxeO9YK2n3c3SREytAcuDSMSlFnuIooh2o7XWs71tKY06oigiCILhPjnAsI403nus9ahW5oPgPTjXwtPTjveBaF%2BsMx3QSilqOwnOe1o6egE4Z4fCUONdCiBQgnNCs5kQx4a0IBytwPYlpYLOB0PrqAtA6gFxrnXue8vQOT%2Bkw5CmMzRjR9xo4JyglCIIQmqmxObyVUbGn4RgmjCzDWYT7CaBWSd0TaxtcO%2FObTwDLUUKpUBrxeZGjBNBa01ibB8A3g0GYYAYhzGOKNJEUWoBwKUrT1OPX0TZz2laSUuvazVNWvdeHeCjz3%2B6B0A2K2xsNPHOEWmNeN%2F7LbDWFoIwTBPQCfn8bhaDYnn7UV771%2FOd0mrz1PV7OSi03j3L5TzrG028CDoKMMYWegEYWwiDAO8d1aojPDiYKuguANSeCWbPK9Se8UZ1vTdGqNcs3jt0qDHG9AFgbQ6lSBLL319%2FCgQkfbSUyZ4zQVi8VyHKaMbHx7vOAZHOENK9T5KEYDDAOZfrAQDUl5eXDkxNHOxR2P4itptSu0EdnDyUtut2ycq%2B%2F7ZlOy1dWFxcJAyDeg8A59xzf3n1r39KkqT4Fee8L3XWpiiKtpUKnusO1YMoBxSAwszMzOMnTj3%2Bh3wuP3Xs0WPZQj7fd2is1Wpmbn7exI24cv2dG7%2BuVCoLQL1r1QDXLdN%2F%2BoQQyABZIHvy1Myr3zr7zelTXzsZKKWYm5vvK3Tm66ejc9%2F5dnTr5q3jQRD8vlKpPAP41nKkfbzeLfMgAEF7ZTKZTKjDgxOTk0EYhgQq4LHHjndiCrvlJyJYYymPjwUqUIdahoTd9%2FWz9EGkAe2cC0rl8ubayspsqHVYKAyosdIYpVKZUqnM6MgohfwAoY7Y3t5i8dNFefPyW0nl0%2FsvVRYrHwBNIGnxOvtC8EU5kKGVA0D%2B9OmTT0wfmf5lNpd%2FslDIDxYGBnw2m1UAzTiWWq0WNBqN7dpO%2Fe1P5uZem%2Ft47gMgbiltANvsc%2F%2FDALQ9NECakDlaOTE1NTVRLBYn8vl82eMlrsfrW1tbK9VqdZk0zm2L4y7lpp%2BChwHoBtIGEbVWO7btO4TdREtaimO%2BaID4CgD2y7QTSrHbdYXdjH%2FI1PA%2FRP8FKMwnNo88n40AAAAASUVORK5CYII%3D";
    var img_open_nextpage_checked = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAB59JREFUWIXFl2lsVNcVx%2F%2F33rfM5hkPttlxDWlqhKEsBlw15AMoJSVRi0IVWuOAmhTjpooUtVKUlrZS%2B6H5UKmt1EZFoSxpsEkFocrSqgkRcUMJTQBjlhoSiLENeLdns2fmrff0w8zQ5wXb33qkqzf3zbnn%2Fzt3zj3vDfB%2FNjYTp9VPNy7z%2BdXvKByPOw5VOK5bxDlzGFiWC9Zuu%2FIj13XeMZO%2BM23Ht1tTxVpbf%2BRbF%2F6088SMANbVH63SNX4wEvIt3bCyPFQ%2Br1iEgxp0TYEjJUzDxnDKQM9gyr18cyB9tz9FjNNB06Lftx6s6xofr%2FqZxs3geK%2FlwFP3dO8LsK6%2B6bt%2BXfnD9q9VBZcuLmVEgCQCSYJLBClzfgSAM0DhDKmMjdYbffbp8522Q26TI7G3Zf%2BOIQBY%2B73GhxRFnLRdNzAtwLqGpm0BXT3y%2FLdrAsVhH2RekEAgmQNxJIGIICVBEiApB6KrHK4kfHTptn26pdNwgAYm6boQ%2FF9bN1WF3jh5BV4AZbz4%2Bl1%2FLuGMH2p4ojowK%2BKDSwTDchBLZGFYDhQhUBTUEAnpIAJsV8JyJEgSbEkwbReCMzy8ukKtrChT%2F3LyyoF4Mht4YtMyWjg3PCHZCQAUUOvXL5%2BvzysrwtX2AXr%2F41tyMJHhjIERUc6HSArO7MXzo%2BaqpfNDlRUl3KcypE0XGdNGMmMhlUkhqCvYsWVVIGvY0HSVuZKmB9AF31NTtcB36O2L7q27CTiShODctCynm7i7o2X%2Frk8AoHrPscj1W0M17d3x3YB8fE3lAraicp4fXCBtuHAlEE%2FbGDVdzInoaO8bxbKFE3dgTA1U73kl4FeKB1dWztEuftqHaDioKApH31AiLhz1i%2F8%2BuD02Wc2seLYp6nf5s4Kzn3xl5SLfysp5ymDSRDxjQ0pCIfO1D0Tx61fPUMuBOl5Yy72BOBUtJlDg0me94gsLSlhJNBgTQvSDWNv9xAHg6r66%2BLn9tS8ZFlWevdx18tU3L6AkpKC8NACiXLECAOcMnMEco%2BmdSCa5YTnQfL7hkN%2F3QUDXP3Ac5yaRO%2BFMT2ath2p7APpYUbilKArioxaIACKAMYCziYduTA0oNlxHALOjoX8EA%2Fo1xnmyOBIMDA2PzKhjVtc3fj%2Fs139c%2B9gqrT9pIJG2IJHrFYUdmBIg68guVXCMZrIf9nc77bYiRpPZhOm69uh04jUNTVt9uvbbXd9Y7dd1FUGfhvLSAMAABgZVcAgGD07OJiCte%2Fr1RecP196ZScYFW7P7tU0M%2FNRM%2FafshNW7G0lwli3MJZFCBHWyQNLVZrce3j44U%2BEnnzwmuiJG%2BbkDuzoK9yb0AQB4%2BYWv%2B4Fc8Ugi2K6ElLlC6uhNYt%2BJ8ynbcqunE29u7vBt3LjYKMzbi61vMuJ%2FhSdxPtlCSYTLnQm0dsRxuTOBa3dSiI2aGIhncODNlrTjOpsvHtz5%2BZTpEjE3qpY3tw3M%2FZ8YuUCuiU0JMN5mhTSoguGPx85Jw3brCt1wKvvFL8Gu380%2BLCCrTl3tf6C5uVlRVW1r7ltjGgBPoTIGlBRpyGRtAMQFeG31nqOl0wF0Ri6F42n3qwBfpnCqaovP2UgkdzAGWEKMTAngfWYQATd7RyA5xw93PoQNa8q3CY72dfVHnq%2Bpa5zY3POWlvajqsKqOKNlibS19vjp601F4SLBOR%2B5uq8uXvCbtAglEThjmF%2FqR08sC9slxEYsxEaAJYvK1FnRIvXyp70vdXYP%2FWp9w9ETtiNf0wyc%2F6TpqVT1i%2B9HioTvudG08%2BLyilDq7bN35p651LEgEPCRL%2BBTE4nUBa%2FWpMfwdz%2FajKzlIpHKIhzyoy%2BRRfdwFv0JE66U0FWBaFCFlISunph7tyeWjo9kdCEUnXEFlH92S8dBIKi70WhY0QN%2B3OnqGcma5g8uvrKjccodIAJu3knIw2%2B18AfLS7JbNjzoVwQHYwQCkDEdpA0HQjBEo2ExuywSJgmMpA2kDRuOS%2BCcMa5ocEkqjgukkmlYhjFqxtVjXq3xAAwAbvUm0Pj31pHh2%2BcftVMVmzp6Yj9fs3ShuqRitpJM24ilLdgOwXIkTFtCEt1bzjUdQub6huW6ADFkMlkM9vVnjUTPrrbjLzDkak8CgPCIcwD6guptP7tyoz89dPtS7a13f3Orv%2B29z8xs8m8jfPa8z2%2FHF%2Fp1BXOiIe7XFTCG%2FHshQDJ3lSTzeeR2Kz6clAO9g5nMYHtD24m9Z%2FM6OQdAsnvogAZAq97dmMombj9z7Y29zYV7hVFa9ciS%2Bcsfq%2FVFSh8pDgdlaWnUHwz4mKapAGNwJGCaNtKGhWQy7SZjiaxtZv7TffGtn%2FZfeacDgDVumMyTvQZA%2F3Lty3uuvP7cUQD6OIB7c80fKSpbvmVl8cIVNXpR2Ze4ppeBuEKMCQY5Kh2z14j3fTh045%2FvDlw%2F1VkQ8wrnr4b3FEwqlh%2FquM9qvn6EdzsBOABszxif8ZjsAZjeIrQx9lgWgrr5wE5%2BYUFYYGwjo7yv19%2F2rPNCGfnrpH9MCj%2BHirHZjhcuFFMhRgG4AD0ZSEH4Xq%2Bd7lVL5IULENwD4BUvAHghvMJO%2Ft4Em9G73iRrvKMg7oWY%2BA%2FkPvZfhD3CiG0yc3YAAAAASUVORK5CYII%3D";
    
    var img_restore_post_position = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAWLSURBVFiFxZbNjxxHGcZ%2F9THdM7vj8e4aEcUGgYGVEguBTD6AOMk6B2Ll4EQhkD30xYIrB%2F4BJP8FJBcUIEJJFM0tsrgkJDJOAjgHMEgRyOKwCcEh62izMzu7szPTH9VVxWFne2d6ZozFRsojleqz3%2Bep932rq0QURXyW0LezKMsTf7sGpZQuqFReT2KzGgRB79ACms2m%2BOHqU%2Fzm%2BReo1%2Bsz13m%2Fp7HdbssXX3rhsXf%2F%2Fu47WZJ9JwiC%2BFACLl68KK7%2F8x%2Bsr69PEHrvcc7hnCPPc4wxxHHMt07fI47fefwbv3vjtbfma%2FMP9ft9M8u%2B%2FF8Crl%2B%2FLgAvpWS%2FCCGQUqKUQmuNUopKpUIQBFSrVaSUPP74Ezz6vXP39%2BPeG1mWqVt6YHl5WWdZdsVa%2B0B5gfeeG%2F%2F5QCilCjcDvP2Ht3HOjq3TWnPfvfeTZRlhGPL9J58S3vuzl69c%2Fu3yV5afWFtbc1MFJEny5Wq1eu%2F58%2Bd1HMcFkXMOay2%2Fev45pJRjZGdXzhbt0XHnHI1Gg0uXLgHwhRNfFKe%2Fefqxa3%2F9y0%2B1DH4%2BVUCWZWmtVvM3b96k1WoV8fXeY61FCIFSiiRJCMMQgD9d%2FSPWjm8oqFQ4c%2BZBlFKcOnUKYwx5nnP3XXer9%2F%2B19rPnfvHrZ6Io8hMCjDFJmqZiaWkRay3OuQkBUkpee%2F1VHll5hKWlYzz80MOAmPCClJIgCFBKYa3FGEMQBHQ6240LFy6ExphkQgCQpmmqWq02rVarELAfAu89Sime%2FsFqYfjNt94cy4EyvPcEQcAD3z2D1ho%2FqrIs4NixY0mn01GLiwsYY8YEGGOK7N%2BHUopzj54bIyuTj7a11gCzBaytrWWNRkNubW0VHgCK871POmr891cuY62bIB9FUKmwsnK2%2BHYaxP5dMD8%2Fb1ZXV%2FXm5ibXPnRcfd8XhPshOAystSBkvrcZ8fJXu6%2F%2BCEb%2BhN570263dbvd5karzo%2Bf%2FDZfO7HIwfywvhXLFG%2BURvR6q8cvX7n2YDEwotDU6%2FM1Ywzm35IjtYAPPumzM8gBP8z3EqYOlibEQVUPNVlmEILW%2FnSRWdZa0%2Bls02636WeOei0gdx4hQCCGJkrFzyr%2BoLi94pwnzixJmoMXGxMe8N6n1WrIwsICaS6YCzXepWg5uU0%2FszPbNb0kZ%2B6IpruT45wvbrZCQJ7nWbe7S6ezjbGfpxZqPB41FHDbD4LSYu9hNzFkuSPUkjgxztr85oQAa20aBBVqRxZpzAV4QCJuEedb8A6%2Fsd7TSwzWebQSVANFP04zIcTmhADnXLq722NjO%2BPo%2FBImdyglplifudkxpMYxSC14UYQxUJLdfpoLDpJw1AOJ1hoVhtSp0E8t1pbMi7FqmGO%2BqK3zOA9Z7iZOpBiq3d5NXe79pADnXNzr9Whta2oLAb3YkOYOMdxlbh3GekzuyO1ehnsxQVFqjQ%2FExrLTi5WQamoIEiEEMqyjdYVubNiNDXFmMcbtuVqU7U5JkJKXRtFPc%2FqJ0cwIwWAw6LPVrRLW4MbmgJ3BwVNu1v7EjCQtO0cA3UFGltvK346%2Ft3XXWkmAc24AAqfnSK2jOzBkxo1ZmHUgZ0RibFxKweZOghRyEI08zcZyII5jurHl%2BJ0hc1VNNfj%2FyMaWDF0khSBOUqQUO6PzowL6AMZXqFcF83ri%2FVgYm4Xy%2FGjfeU%2BnkyK82JoQ0Gw2g5WVFdsdZGwPPB9tbA%2Bf31NZbpt0tO89bGzs2MwM%2FtxsNnUURTnseU4Cnzt58uTTJ%2B5bfTY5%2BnU15fd%2FKHhwAsjT%2FkcfvvPyT1rvXb0K7ERR5PavtgbwJR2Gd1SrRxuUTvhh4Jwz1lqfI5wddLrAx8A6EEdR5EUURTSbTQkEgOLgvv204YfFAHkURQ5GnmSfFf4Ly7gkKLK7Ui8AAAAASUVORK5CYII%3D";
    var img_post_paginate = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAA6dJREFUWIXFl0tPW0cUgL8zc20Mxi4QTCAlm6pS2WTRDRWL7rrptn%2BABbv%2BiG677IruKvUP9B9UaqUuKqGGRkFqQyLikhIIuDWElx%2FcmdPFtZGx78O4VD3SaGY013O%2B85rxwP8s8l9sqsoYJ4UF8m4GF4wDYMMGbVtnqrkvQjsRYH19%2FbNcLvetiJSMMRhj8N7jvScMQ5xzsX13PF54y%2FQ7x0wWT5kYbxAEV3jvcc625udqX3%2F80cvvkMZzKVEDCPoBrLXfrK2tlUQitjAMCYKgY5n2Wao3x%2FoG0d8Q3QHdA60hNKI1KY798OPF50iuivgJ1dZjEeoDAGEYTokI1WoVEcE5R7FYpN1u04Xq76Nxm7zdIh9sE5gdcsE%2BVmqoRBEw0mbxweUYFB6hwJm5VG38PADQtUpErlvvPAnAyhGBPSSwB%2BTsPtacI%2FYDkHudL%2BrMVbZA8kvgz8HXOJ98MQDgvY9VmAYCEASnWPMWI3Ws1BC7BLKEmMXoW15jc2fA3w%2FB7oGpIM37qQDDeqLrYpEmRpog4yAziHkI9sPOxoKYlyDlHHpVRmQCb0uxAHFhiHN%2FL0BSaKJCu5m812LlagDAOZeqPDEPpIBqAaWA%2BkvE1KNKcN2dX6P%2BL9DTENwZqpcEbrAK4gCS5jetnUGZRpnFU8f6V5HdcthZP8Zd%2FQG4V%2BAOwNc4ab0xaQCbm5uxAHHNcx%2FlAV7fxflFnC%2BC2wb3pNO2OTxqgra20XYV0Wcyz0WiBwCWl5ev6z87FAU87%2BG0Ef1Yiyiz4KN5kCtT3X3M0vutp9B%2BSrG5BTEnoXMOVY2sumVJKhWcPgImUD%2BNkRMgArAyxYud3%2Fn0E%2FcTxeaWSJQdqR7ol2FyAmZxTKMc4zlC9BwkjzcL%2FPLr98jkxZPePYeugizlN0svQKmgWommCsoEl42BlBsOoNfCrPJMElW9DmkmQP%2Bt15Xbng1pt2ciQBiGsUqzgOIA%2BmVoD8QpzjoHRgVIPIgANjY2MGYwcYYFNMZk5sbA7mEYXsdqZWUl9WJKUpzkoThJDUH%2F1ZzmifgzIVtSQzCM0qy1LJjYKkgqw1HAusd6kozkgbuUW90FWTKK50YC6K2MLBBVTQXrBygbY05VtVwulxGJ3gVBEPzrvADI5%2FNnwDxwDLT6AUpAZW9v78vV1dUvRDoviruT5u7u7lfAAmCBA8D3%2BnAMmAPuAVOdub0r5UTGXgB14E%2FgHOJfx2NAodPf1evZAVdEbm%2FR8z%2F9H3wxyNYpdILJAAAAAElFTkSuQmCC";
    
    var html = "" +
"<div id='fisheye' style='background-color: #AAAAAA; text-align: center; height: 32px; position: relative; z-index: 9999;'>" +
"    <div class='fisheyeContainter' style='height: 32px; position: absolute; left: 503px; width: 400px;'>" +
"        <span style='left: 0px;'   href='#' class='fisheyeItem'><img id='xitek_prev'/><a>上一贴<br />左箭头</a></span>" +
"        <span style='left: 40px;'  href='#' class='fisheyeItem'><img id='xitek_next'/><a>下一帖<br />右箭头</a></span>" +
"        <span style='left: 80px;'  href='#' class='fisheyeItem'><img id='xitek_first'/><a>第一帖<br />Ctrl+左箭头</a></span>" +
"        <span style='left: 120px;' href='#' class='fisheyeItem'><img id='xitek_last'/><a>最后贴<br />Ctrl+左箭头</a></span>" +
"        <span style='left: 160px;' href='#' class='fisheyeItem'><img id='xitek_prev_page'/><a>上一页<br />Ctrl+上箭头</a></span>" +
"        <span style='left: 200px;' href='#' class='fisheyeItem'><img id='xitek_next_page'/><a>下一页<br />Ctrl+下箭头</a></span>" +
"        <span style='left: 240px;' href='#' class='fisheyeItem'><img id='xitek_slide_backward'/><a>向前放映</a></span>" +
"        <span style='left: 280px;' href='#' class='fisheyeItem'><img id='xitek_slide_forward'/><a>向后放映</a></span>" +
"        <span style='left: 320px;' href='#' class='fisheyeItem'><img id='xitek_img_only'/><a>只看大图</a></span>" +
"        <span style='left: 360px;' href='#' class='fisheyeItem'><img id='xitek_open_nextpage'/><a>自动打开下一页</a></span>" +
"        <span style='left: 400px;' href='#' class='fisheyeItem'><img id='xitek_restore_post_position'/><a>回到上次位置</a></span>" +
"        <span style='left: 400px;' href='#' class='fisheyeItem'><img id='xitek_post_paginate'/><a>分页显示</a></span>" +
"    </div>" +
"    <div style='position:absolute; right:10px;'>" +
"        <label id='xitek_slide_interval_label' for='xitek_slide_interval'>" +
"            <select id='xitek_slide_interval' name='xitek_slide_interval' title='Slide Interval' style='position:relative; width:70px; top:5px;'>" +
"                <option>3</option>" +
"                <option>5</option>" +
"                <option>10</option>" +
"                <option>30</option>" +
"                <option>60</option>" +
"            </select>" +
"        </label>" +
"    </div>" +
"    <div id='progress_bar' style='background-color:green; border:1px solid #CCCCCC; height:7px; left:10px; position:absolute; width:60px;top:10px;'>" +
"        <div style='background-color: white; width: 80%; float: right; height: 7px;'>" +
"        </div>" +
"    </div>" +
"</div>" +
"";
// -----------------------------------------------------------------------------
// functions
// -----------------------------------------------------------------------------
    // common helper for post id
    
    var curPostId = function() {
        return getPostId(cur_post);
    };

    var getPostId = function(post) {
        var post_id_wrapper = $("tr:last td:last font", post);
        if (post_id_wrapper.length) {
            cur_post_id = $.trim(post_id_wrapper.text());
            if(!isNaN(cur_post_id)) {
                return cur_post_id;
            }
        }
        
        return null;
    };

    var findPostIds = function() {
        var post_ids = [];
        
        $("body>table").each(function(){
            var post_id_wrapper = $("tr:last td:last font", $(this));
            if (post_id_wrapper.length) {
                post_id = $.trim(post_id_wrapper.text());
                if(!isNaN(post_id)) {
                    post_ids.push(post_id);
                }
            }
        });
        return post_ids;
    };

    var getThreadId = function() {
        // get thread id
        var m = window.location.href.match(thread_rex);
        if (m === null) {
            return;
        }
        return m[2];
    };
    
    // progress bar
    
    var setProgressbar = function(percent) {
        // var max_width = parseInt($("#progress_bar").width(), 10);
        var max_width = 60;
        var mask_width = max_width - percent * max_width / 100;
        $("#progress_bar>div").css("width", mask_width+"px");
    };
    
    var updateShowProgress = function() {
        // get current post position
        var cur_post_postion = 0;
        var post_array = $("body>table");
        var total_post_num = post_array.length;
        
        for (var i=0; i<post_array.length; i++) {
            if (cur_post[0] == post_array[i]) {
                cur_post_postion = i+1;
                break;
            }
        }
        
        // set progress bar
        setProgressbar(100 * cur_post_postion / total_post_num);
    };
    
    // slide show forward, backward img
    
    var updateSlideshowImg = function() {
        var xitek_slide_backward = GM_getValue("xitek_slide_backward", false);
        var xitek_slide_forward = GM_getValue("xitek_slide_forward", false);
        
        if (xitek_slide_backward) {
            $("#xitek_slide_backward").attr("src", img_backward_checked);
        } else {
            $("#xitek_slide_backward").attr("src", img_backward_unchecked);
        }
        if (xitek_slide_forward) {
            $("#xitek_slide_forward").attr("src", img_forward_checked);
        } else {
            $("#xitek_slide_forward").attr("src", img_forward_unchecked);
        }
    };
    
    // navibar showing status
    
    var stopShow = function() {
        control_option.showing_status = 0;
        // unslide
        unSlide();
    };
    var manualShow = function() {
        control_option.showing_status = 1;
        // unslide
        unSlide();
    };
    var slideShow = function() {
        control_option.showing_status = 2;
    };
    
    var showStopped = function() {
        return control_option.showing_status === 0;
    };
    var showManually = function() {
        return control_option.showing_status === 1;
    };
    var showSliding = function() {
        return control_option.showing_status === 2;
    };
    
    // shrink image
    var shrinkImg = function() {
        var td = cur_post.find("tr:first td:last");
        var imgs = cur_post.find("tr:first td:last img");
        
        // reposition imgs to top
        td.prepend(imgs);
        cur_post.find("tr:first td:last img").wrap("<p />");
        imgs = cur_post.find("tr:first td:last img");
        
        // shrink
        var max_width = window.innerWidth - left_pane_width;
        var max_height = window.innerHeight - upper_pane_height;
        
        imgs.each(function(){
            var img = $(this);
            var img_width = img.width();
            var img_height = img.height();
            
            if (img_width > max_width || img_height > max_height) {
                if (max_width/max_height > img_width/img_height) {
                    img_width = img_width * max_height / img_height;
                    img_height = max_height;
                } else {
                    img_height = img_height * max_width / img_width;
                    img_width = max_width;
                }
                
                img.css("width", img_width);
                img.css("height", img_height);
            }
            
            // hide small img
            if (GM_getValue("xitek_img_only", false)) {
                if (!isBigImg(img)) {
                    img.hide();
                }
            } else {
                    img.show();
            }            
        });
    };
    
    var startPrefetch = function(){
        if (control_option.prefetch_started) {
            return;
        }
        control_option.prefetch_started = true;
        
        var href = window.location.href;
        if (!window.location.href.match(pagenumber_rex)) {
            href = window.location.href+"&pagenumber=1";
        }
        var src = href.replace(pagenumber_rex, getPagenumberPrev);
        
        var prefetch_html = "<iframe height='0' frameborder='0' width='0' src='" + 
        src +
        "' name='xitek_prefetch' id='xitek_prefetch' style='display: none;'/>";
        
        $("body").append(prefetch_html);
        
        // hide xitek_prefetch iframe
        $("#xitek_prefetch").hide();
    };
    
    var isBigImg = function(img) {
        return img.width() > min_img_size || img.height() > min_img_size;
    };
    
    var hasImage = function() {
        var imgs = cur_post.find("tr:first td:last img");
        
        // no imgs
        if (!imgs.length) {
            return false;
        }
        
        // check if contain big images
        var hasBigImg = false;
        
        imgs.each(function(){
            if (isBigImg($(this))) {
                hasBigImg = true;
                return;
            }
        });
        return hasBigImg;
    };
    
    var showCurPost = function() {
        var post_paginate = GM_getValue("xitek_post_paginate", true);
        
        if (post_paginate) {
            // show paginated cur post
            $("body>table").hide();
            cur_post.show();
            // scroll to top
            window.scrollTo(0, 0);
        } else {
            $("body>table").show();
            // scroll to cur post
            window.scrollTo(0, cur_post.position().top);
        }
    };
    
    var showPost = function() {
        var target_post = isDirectionBackward() ? 
            cur_post.prev("table") : 
            cur_post.next("table");
        
        // hide xitek_prefetch iframe
        $("#xitek_prefetch").hide();
        
        if (!target_post.length) {
            if (GM_getValue("xitek_open_nextpage", false)) {
                // open next page
                if (isDirectionBackward()) {
                    prevPage();
                } else {
                    nextPage();
                }
                return;
            } else {
                console.log("!target");
                return;
            }
        }
        
        if (showStopped()) {
            return;
        }
        
        cur_post = target_post;
        showCurPost();
        
        shrinkImg();
        updateShowProgress();
        
        // save post position
        savePostPosition();
        
        // skip no image post
        if (GM_getValue("xitek_img_only", false) && !hasImage()) {
            showPost();
            return;
        }
        
        // prefetch after showing post to avoid user interface latency
        startPrefetch();
        
        // try slideshow
        if (showSliding()) {
            window.clearTimeout(control_option.slide_timer);
            control_option.slide_timer = window.setTimeout(showPost, 
                getSlideInterval());
            return;
        }
        
        if (showManually()) {
            // stop show
            stopShow();
            return;
        }
    };
    var onShowPrev = function() {
        manualShow();
        showPrev();
    };
    var showPrev = function() {
        setDirectionBackward();
        showPost();
    };
    var onShowNext = function() {
        manualShow();
        showNext();
    };
    var showNext = function() {
        setDirectionForward();
        showPost();
    };
    
    // prev next page
    var jumpPage = function(getPagenumber) {
        var href = window.location.href;
        if (!window.location.href.match(pagenumber_rex)) {
            href = window.location.href+"&pagenumber=1";
        }
        var target_url = href.replace(pagenumber_rex, 
            getPagenumber);
        if (target_url != window.location.href) {
            window.location.href = target_url;
        }
    };
    
    
    var onPrevPage = function() {
        prevPage();
    };
    
    var prevPage = function() {
        jumpPage(getPagenumberPrev);
    };
    
    var onNextPage = function() {
        nextPage();
    };
    
    var nextPage = function() {
        jumpPage(getPagenumberNext);
    };
    
    // first last page
    var onShowFirst = function() {
        manualShow();
        showFirst();
    };
    
    var showFirst = function() {
        unSlide();

        // FIXME: get first table: maybe clearTimeout()
        cur_post = $("body table:first").next().next();
        showCurPost();
        updateShowProgress();
    };
    var onShowLast = function() {
        manualShow();
        showLast();
    };
    
    var showLast = function() {
        unSlide();
        
        cur_post = $("body table:last");
        showCurPost();
        updateShowProgress();
    };
    
    // direction
    
    var isDirectionBackward = function() {
        return control_option.show_direction === 0;
    };
    var setDirectionBackward = function() {
        control_option.show_direction = 0;
    };
    var setDirectionForward = function() {
        control_option.show_direction = 1;
    };
    
    // page number
    
    var getPagenumberPrev = function(matchStr, m1, m2, index, sourceStr) {
        var cur_page = parseInt(m2, 10);
        
        var target_page;
        if (cur_page == 1) {
            target_page = 1;
        } else {
            target_page = cur_page - 1;
        }
        return m1+"="+target_page;
    };
    
    var getPagenumberNext = function(matchStr, m1, m2, index, sourceStr) {
        var cur_page = parseInt(m2, 10);
        var target_page;
        if (cur_page > last_page) {
            target_page = last_page;
        } else {
            target_page = cur_page + 1;
        }
        return m1+"="+target_page;
    };
    
    // slide show
    var unSlide = function() {
        // clear timer
        window.clearTimeout(control_option.slide_timer);
        
        // save
        GM_setValue("xitek_slide_backward", false);
        GM_setValue("xitek_slide_forward", false);
        
        // update img
        updateSlideshowImg();
    };
    
    var onSlideBackward = function(){
        // revert & save
        GM_setValue("xitek_slide_backward", !GM_getValue("xitek_slide_backward", false));
    
        showSlideBackward();
    };
    
    var showSlideBackward = function() {
        var xitek_slide_backward = GM_getValue("xitek_slide_backward", false);
        
        if (xitek_slide_backward) {
            // uncheck forward
            GM_setValue("xitek_slide_forward", false);
        }
        
        // update img
        updateSlideshowImg();
        
        if (xitek_slide_backward) {
            slideShow();
            showPrev();
        } else {
            stopShow();
        }
    };
    
    var onSlideForward = function(){
        // revert & save
        GM_setValue("xitek_slide_forward", !GM_getValue("xitek_slide_forward", false));
    
        showSlideForward();
    };
    
    var showSlideForward = function() {
        var xitek_slide_forward = GM_getValue("xitek_slide_forward", false);
        
        if (xitek_slide_forward) {
            // uncheck backward
            GM_setValue("xitek_slide_backward", false);
        }
        
        // update img
        updateSlideshowImg();
        
        if (xitek_slide_forward) {
            slideShow();
            showNext();
        } else {
            stopShow();
        }
    };
    
    // slide interval
    var getSlideInterval = function() {
        return parseInt($("#xitek_slide_interval").val(), 10) * 1000;
    };
    
    // image only
    var onShowImgOnly = function() {
        // revert & save
        GM_setValue("xitek_img_only", !GM_getValue("xitek_img_only", false));
        
        updateShowImgOnly();
    };
    
    var updateShowImgOnly = function() {
        var xitek_img_only = GM_getValue("xitek_img_only", false);
        
        // update img only background
        var target_img = xitek_img_only ? 
            img_only_checked : 
            img_only_unchecked;
        $("#xitek_img_only").attr("src", target_img);
    };
    
    // open next page
    var onOpenNextpage = function() {
        // revert & save
        GM_setValue("xitek_open_nextpage", !GM_getValue("xitek_open_nextpage", false));
        
        updateOpenNextpage();
    };
    
    var updateOpenNextpage = function() {
        var xitek_open_nextpage = GM_getValue("xitek_open_nextpage", false);
        
        // update background
        var target_img = xitek_open_nextpage ? 
            img_open_nextpage_checked : 
            img_open_nextpage_unchecked;
        $("#xitek_open_nextpage").attr("src", target_img);
    };
    
    // remember me

    var gotoTargetPost = function() {
        // get thread id
        var thread_id = getThreadId();
        if (!thread_id) {
            return;
        }
        
        // get target post id
        var target_post_id = GM_getValue("xitek_thread_old_"+thread_id, 0);
        if (isNaN(target_post_id)) {
            return;
        }
        
        // find target post
        $("body>table").each(function(){
            if(getPostId($(this)) == target_post_id) {
                cur_post = $(this);
            }
        });
        showCurPost();
    };

    var onRestorePostPosition = function() {
        // get thread id
        var thread_id = getThreadId();
        if (!thread_id) {
            return;
        }
        
        // get target post id
        var target_post_id = GM_getValue("xitek_thread_old_"+thread_id, 0);
        if (isNaN(target_post_id)) {
            return;
        }
        
        // get current page
        var cur_page = 1;
        var m = window.location.href.match(pagenumber_rex);
        if (m !== null) {
            cur_page = parseInt(m[2], 10);
        }
        
        // get current page last post id
        var cur_post_id = 1;
        var post_ids = findPostIds();
        if (post_ids.length) {
            cur_post_id = post_ids[0];
        }
        
        // calc target page
        var post_per_page = 30;
        var post_span = parseInt(target_post_id, 10) - parseInt(cur_post_id, 10);
        var page_span = Math.ceil(post_span / post_per_page);
        var target_page = cur_page - page_span;
        
        // goto post
        var href = window.location.href;
        if (!window.location.href.match(pagenumber_rex)) {
            href = window.location.href+"&pagenumber=1";
        }
        var target_url = href.replace(pagenumber_rex, 
            "$1="+target_page);
        if (target_url != window.location.href) {
            // set mark in local storage
            GM_setValue("xitek_goto_target_post", true);
            
            // goto post in another page
            window.location.href = target_url;
        } else {
            // goto post in the same page
            gotoTargetPost();
        }
    };

    var savePostPosition = function() {
        // get thread id
        var thread_id = getThreadId();
        if (!thread_id) {
            return;
        }
        
        // get cur post id
        var cur_post_id = curPostId();
        if (!cur_post_id) {
            return;
        }
        
        var old_post_id = GM_getValue("xitek_thread_cur_"+thread_id, 0);
        
        // save
        GM_setValue("xitek_thread_cur_"+thread_id, cur_post_id);
        GM_setValue("xitek_thread_old_"+thread_id, old_post_id);
    };

    // post paginate
    var onTogglePostPaginate = function() {
        var post_paginate = GM_getValue("xitek_post_paginate", true);
        
        // revert
        post_paginate = post_paginate ? false : true;
        // save
        GM_setValue("xitek_post_paginate", post_paginate);
        
        // show/hide posts
        showCurPost();
    };    
    
    // slide interval
    var onSlideInterval = function() {
        // save slide interval
        GM_setValue("xitek_slide_interval", getSlideInterval());
    };
// -----------------------------------------------------------------------------
// setting
// -----------------------------------------------------------------------------
    // settings
    var slide_interval = 3000;
    var left_pane_width = 150;
    var upper_pane_height = 50;
    var min_img_size = 300;
    
    // rex
    var pagenumber_rex = /(pagenumber)=(\d+)/;
    var thread_rex = /(threadid)=(\d+)/;
    
    // global control
    var control_option = {};
    
    control_option.prefetch_started = false;
    
    // 0: prev
    // 1: next
    control_option.show_direction = 0;
    
    // 0: stopped
    // 1: show manually
    // 2: slide show
    control_option.showing_status = 0;
    
    // remove elems
    // $("body table:first").remove();
    // $("body table:first").remove();
    // $("body table:first").next().remove();
    $("body table:last").remove();
    $("body table:last").remove();
    $("body style").remove();
    
    // slide timer
    control_option.slide_timer = 0;
    
    // get last page number
    var last_page = 1;
    var a = $("body table[cellspacing='1']:last tr:first td:first a:last");
    if (a.length) {
        var m = a.attr("href").match(/pagenumber=(\d+)/);
        if (m !== null) {
            last_page = m[1];
        }
    }
    
// -----------------------------------------------------------------------------
// main precedure
// -----------------------------------------------------------------------------
    // show the last table
    var cur_post = $("body table:last");
    showCurPost();
    
    // insert toolbar
    $("body").prepend(html);
    
    // update checkbox img
    updateSlideshowImg();
    updateShowImgOnly();
    updateOpenNextpage();
    
    // restore settings from local storage
    $("#xitek_slide_interval").val(
        GM_getValue("xitek_slide_interval", 3000) / 1000);
    
    // bind key stoke
    $(document).keydown(function(e){
        // stop slideshow after any key pressed
        if (e.keyCode == 37) {
            // left arrow
            if (e.ctrlKey || e.metaKey) {
                onShowFirst();
            } else {
                onShowPrev();
            }
        }
        if (e.keyCode == 39) {
            // right arrow
            if (e.ctrlKey || e.metaKey) {
                onShowLast();
            } else {
                onShowNext();
            }
        }
        if (e.keyCode == 38) {
            // up arrow
            if (e.ctrlKey || e.metaKey) {
                onPrevPage();
            }
        }
        if (e.keyCode == 40) {
            // down arrow
            if (e.ctrlKey || e.metaKey) {
                onNextPage();
            }
        }
    });
    
    // bind navi button click
    $("#xitek_prev").attr("src", img_prev).click(onShowPrev);
    $("#xitek_next").attr("src", img_next).click(onShowNext);
    $("#xitek_first").attr("src", img_first).click(onShowFirst);
    $("#xitek_last").attr("src", img_last).click(onShowLast);
    
    // bind prev/next page
    $("#xitek_prev_page").attr("src", img_prev_page).click(onPrevPage);
    $("#xitek_next_page").attr("src", img_next_page).click(onNextPage);
    
    // bind slideshow
    $("#xitek_slide_backward").click(onSlideBackward);
    $("#xitek_slide_forward").click(onSlideForward);
    
    // bind img only
    $("#xitek_img_only").click(onShowImgOnly);
    // bind auto open nextpage
    $("#xitek_open_nextpage").click(onOpenNextpage);
    
    // bind restore position
    $("#xitek_restore_post_position").attr("src", 
        img_restore_post_position).click(onRestorePostPosition);
    $("#xitek_post_paginate").attr("src", 
        img_post_paginate).click(onTogglePostPaginate);
    
    // bind slide interval
    $("#xitek_slide_interval").change(onSlideInterval);
    
    // goto target post
    var goto_target_post = GM_getValue("xitek_goto_target_post", false);
    if (goto_target_post) {
        // clear mark
        GM_setValue("xitek_goto_target_post", false);
        
        // goto target post
        gotoTargetPost();
    }
    
    // continue slideshow
    var waitReady = function() {
        var xitek_slide_backward = GM_getValue("xitek_slide_backward", false);
        var xitek_slide_forward = GM_getValue("xitek_slide_forward", false);
        
        if (xitek_slide_backward || xitek_slide_forward) {
            if (/loaded|complete/.test(document.readyState)) {
                if (xitek_slide_backward) {
                    showSlideBackward();
                }
                if (xitek_slide_forward) {
                    showSlideForward();
                }
            } else {
                window.setTimeout(waitReady, 1000);
            }
        }
    };
    
    window.setTimeout(waitReady, 1000);
    
    // fisheye
    $("#fisheye span.fisheyeItem")
        .css("text-align", "center")
        .css("color", "#000")
        .css("font-weight", "bold")
        .css("text-decoration", "none")
        .css("width", "40px")
        .css("position", "absolute")
        .css("display", "block")
        .css("top", "0");
    $("#fisheye .fisheyeItem img")
        .css("border", "none")
        .css("margin", "0 auto 5px auto")
        .css("width", "100%");
    $("#fisheye .fisheyeItem a")
        .css("display", "none")
        .css("positon", "absolute");
    
    $('#fisheye').Fisheye(
        {
            maxWidth: 64,
            items: 'span',
            itemsText: 'a',
            container: '.fisheyeContainter',
            itemWidth: 32,
            proximity: 90,
            halign : 'center'
        }
    );
    
});


// DONE:
// multi imgs
// slideshow stop immediately
// slideshow icon checkbox
// slideshow prev next
// skip small imgs
// user select config: slideshow interval, show img only, 
// more shortcut
// persistent
// open prev page when finished
// toolbar fix position
// pregress bar
// skip small img when multi
// remember me: thread, page, etc
// pagenumber fix
// last : remove some additional elems
// show ad
// toggle post paginate
// rememberme : goto post
// continue slideshow

// TODO: 
// chrome, ie, opera
// prev not show first
// navibar css ie, chrome

// favourite post
// save img
// show post text in one page 
