// ==UserScript==
// @name           progression
// @namespace      Ogame.J
// @description    Progression OG
// @include        http://*.ogame.fr/game/*over*
// ==/UserScript==

function checkPage() {
	var url = window.location.href;
	if(url.indexOf('page=overview')!=-1) return true;
	return false;
}
if(typeof J=="undefined")var J={};
J.progressionDebut=new Date();

var Lang={
	Points:"Points"
}

J.get=function(name, defaut) { 
	return J.unserialize(GM_getValue(name, J.serialize(defaut, false)));
}
J.set=function(name, value) { return GM_setValue(name, J.serialize(value, false));}





/////// JQUERY



















var azer=function(){
/*
 * jQuery 1.2.3 - New Wave Javascript
 *
 * Copyright (c) 2008 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-02-06 00:21:25 -0500 (Wed, 06 Feb 2008) $
 * $Rev: 4663 $
 */

// Map over jQuery in case of overwrite
if ( window.jQuery )
	var _jQuery = window.jQuery;
var jQuery = window.jQuery = function( selector, context ) {
	// The jQuery object is actually just the init constructor 'enhanced'
	return new jQuery.prototype.init( selector, context );
};

// Map over the $ in case of overwrite
if ( window.$ )
	var _$ = window.$;
	
// Map the jQuery namespace to the '$' one
window.$ = jQuery;

// A simple way to check for HTML strings or ID strings
// (both of which we optimize for)
var quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;

// Is it a simple selector
var isSimple = /^.[^:#\[\.]*$/;

jQuery.fn = jQuery.prototype = {
	init: function( selector, context ) {
		// Make sure that a selection was provided
		selector = selector || document;

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this[0] = selector;
			this.length = 1;
			return this;

		// Handle HTML strings
		} else if ( typeof selector == "string" ) {
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

					// Make sure an element was located
					if ( elem )
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id != match[3] )
							return jQuery().find( selector );

						// Otherwise, we inject the element directly into the jQuery object
						else {
							this[0] = elem;
							this.length = 1;
							return this;
						}

					else
						selector = [];
				}

			// HANDLE: $(expr, [context])
			// (which is just equivalent to: $(content).find(expr)
			} else
				return new jQuery( context ).find( selector );

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) )
			return new jQuery( document )[ jQuery.fn.ready ? "ready" : "load" ]( selector );

		return this.setArray(
			// HANDLE: $(array)
			selector.constructor == Array && selector ||

			// HANDLE: $(arraylike)
			// Watch for when an array-like object, contains DOM nodes, is passed in as the selector
			(selector.jquery || selector.length && selector != window && !selector.nodeType && selector[0] != undefined && selector[0].nodeType) && jQuery.makeArray( selector ) ||

			// HANDLE: $(*)
			[ selector ] );
	},
	
	// The current version of jQuery being used
	jquery: "1.2.3",

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},
	
	// The number of elements contained in the matched element set
	length: 0,

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == undefined ?

			// Return a 'clean' array
			jQuery.makeArray( this ) :

			// Return just the object
			this[ num ];
	},
	
	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {
		// Build a new jQuery matched element set
		var ret = jQuery( elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

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
		var ret = -1;

		// Locate the position of the desired element
		this.each(function(i){
			if ( this == elem )
				ret = i;
		});

		return ret;
	},

	attr: function( name, value, type ) {
		var options = name;
		
		// Look for the case where we're accessing a style value
		if ( name.constructor == String )
			if ( value == undefined )
				return this.length && jQuery[ type || "attr" ]( this[0], name ) || undefined;

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
		if ( typeof text != "object" && text != null )
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
		if ( this[0] )
			// The elements to wrap the target around
			jQuery( html, this[0].ownerDocument )
				.clone()
				.insertBefore( this[0] )
				.map(function(){
					var elem = this;

					while ( elem.firstChild )
						elem = elem.firstChild;

					return elem;
				})
				.append(this);

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
		return this.domManip(arguments, true, false, function(elem){
			if (this.nodeType == 1)
				this.appendChild( elem );
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, true, function(elem){
			if (this.nodeType == 1)
				this.insertBefore( elem, this.firstChild );
		});
	},
	
	before: function() {
		return this.domManip(arguments, false, false, function(elem){
			this.parentNode.insertBefore( elem, this );
		});
	},

	after: function() {
		return this.domManip(arguments, false, true, function(elem){
			this.parentNode.insertBefore( elem, this.nextSibling );
		});
	},

	end: function() {
		return this.prevObject || jQuery( [] );
	},

	find: function( selector ) {
		var elems = jQuery.map(this, function(elem){
			return jQuery.find( selector, elem );
		});

		return this.pushStack( /[^+>] [^+>]/.test( selector ) || selector.indexOf("..") > -1 ?
			jQuery.unique( elems ) :
			elems );
	},

	clone: function( events ) {
		// Do the clone
		var ret = this.map(function(){
			if ( jQuery.browser.msie && !jQuery.isXMLDoc(this) ) {
				// IE copies events bound via attachEvent when
				// using cloneNode. Calling detachEvent on the
				// clone will also remove the events from the orignal
				// In order to get around this, we use innerHTML.
				// Unfortunately, this means some modifications to 
				// attributes in IE that are actually only stored 
				// as properties will not be copied (such as the
				// the name attribute on an input).
				var clone = this.cloneNode(true),
					container = document.createElement("div");
				container.appendChild(clone);
				return jQuery.clean([container.innerHTML])[0];
			} else
				return this.cloneNode(true);
		});

		// Need to set the expando to null on the cloned set if it exists
		// removeData doesn't work here, IE removes it from the original as well
		// this is primarily for IE but the data expando shouldn't be copied over in any browser
		var clone = ret.find("*").andSelf().each(function(){
			if ( this[ expando ] != undefined )
				this[ expando ] = null;
		});
		
		// Copy the events from the original to the clone
		if ( events === true )
			this.find("*").andSelf().each(function(i){
				if (this.nodeType == 3)
					return;
				var events = jQuery.data( this, "events" );

				for ( var type in events )
					for ( var handler in events[ type ] )
						jQuery.event.add( clone[ i ], type, events[ type ][ handler ], events[ type ][ handler ].data );
			});

		// Return the cloned set
		return ret;
	},

	filter: function( selector ) {
		return this.pushStack(
			jQuery.isFunction( selector ) &&
			jQuery.grep(this, function(elem, i){
				return selector.call( elem, i );
			}) ||

			jQuery.multiFilter( selector, this ) );
	},

	not: function( selector ) {
		if ( selector.constructor == String )
			// test special case where just one selector is passed in
			if ( isSimple.test( selector ) )
				return this.pushStack( jQuery.multiFilter( selector, this, true ) );
			else
				selector = jQuery.multiFilter( selector, this );

		var isArrayLike = selector.length && selector[selector.length - 1] !== undefined && !selector.nodeType;
		return this.filter(function() {
			return isArrayLike ? jQuery.inArray( this, selector ) < 0 : this != selector;
		});
	},

	add: function( selector ) {
		return !selector ? this : this.pushStack( jQuery.merge( 
			this.get(),
			selector.constructor == String ? 
				jQuery( selector ).get() :
				selector.length != undefined && (!selector.nodeName || jQuery.nodeName(selector, "form")) ?
					selector : [selector] ) );
	},

	is: function( selector ) {
		return selector ?
			jQuery.multiFilter( selector, this ).length > 0 :
			false;
	},

	hasClass: function( selector ) {
		return this.is( "." + selector );
	},
	
	val: function( value ) {
		if ( value == undefined ) {

			if ( this.length ) {
				var elem = this[0];

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
							value = jQuery.browser.msie && !option.attributes.value.specified ? option.text : option.value;
							
							// We don't need an array for one selects
							if ( one )
								return value;
							
							// Multi-Selects return an array
							values.push( value );
						}
					}
					
					return values;
					
				// Everything else, we just grab the value
				} else
					return (this[0].value || "").replace(/\r/g, "");

			}

			return undefined;
		}

		return this.each(function(){
			if ( this.nodeType != 1 )
				return;

			if ( value.constructor == Array && /radio|checkbox/.test( this.type ) )
				this.checked = (jQuery.inArray(this.value, value) >= 0 ||
					jQuery.inArray(this.name, value) >= 0);

			else if ( jQuery.nodeName( this, "select" ) ) {
				var values = value.constructor == Array ?
					value :
					[ value ];

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
		return value == undefined ?
			(this.length ?
				this[0].innerHTML :
				null) :
			this.empty().append( value );
	},

	replaceWith: function( value ) {
		return this.after( value ).remove();
	},

	eq: function( i ) {
		return this.slice( i, i + 1 );
	},

	slice: function() {
		return this.pushStack( Array.prototype.slice.apply( this, arguments ) );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function(elem, i){
			return callback.call( elem, i, elem );
		}));
	},

	andSelf: function() {
		return this.add( this.prevObject );
	},

	data: function( key, value ){
		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value == null ) {
			var data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);
			
			if ( data == undefined && this.length )
				data = jQuery.data( this[0], key );

			return data == null && parts[1] ?
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
	
	domManip: function( args, table, reverse, callback ) {
		var clone = this.length > 1, elems; 

		return this.each(function(){
			if ( !elems ) {
				elems = jQuery.clean( args, this.ownerDocument );

				if ( reverse )
					elems.reverse();
			}

			var obj = this;

			if ( table && jQuery.nodeName( this, "table" ) && jQuery.nodeName( elems[0], "tr" ) )
				obj = this.getElementsByTagName("tbody")[0] || this.appendChild( this.ownerDocument.createElement("tbody") );

			var scripts = jQuery( [] );

			jQuery.each(elems, function(){
				var elem = clone ?
					jQuery( this ).clone( true )[0] :
					this;

				// execute all scripts after the elements have been injected
				if ( jQuery.nodeName( elem, "script" ) ) {
					scripts = scripts.add( elem );
				} else {
					// Remove any inner scripts for later evaluation
					if ( elem.nodeType == 1 )
						scripts = scripts.add( jQuery( "script", elem ).remove() );

					// Inject the elements into the document
					callback.call( obj, elem );
				}
			});

			scripts.each( evalScript );
		});
	}
};

// Give the init function the jQuery prototype for later instantiation
jQuery.prototype.init.prototype = jQuery.prototype;

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

jQuery.extend = jQuery.fn.extend = function() {
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

	// Handle a deep copy situation
	if ( target.constructor == Boolean ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target != "object" && typeof target != "function" )
		target = {};

	// extend jQuery itself if only one argument is passed
	if ( length == 1 ) {
		target = this;
		i = 0;
	}

	for ( ; i < length; i++ )
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null )
			// Extend the base object
			for ( var name in options ) {
				// Prevent never-ending loop
				if ( target === options[ name ] )
					continue;

				// Recurse if we're merging object values
				if ( deep && options[ name ] && typeof options[ name ] == "object" && target[ name ] && !options[ name ].nodeType )
					target[ name ] = jQuery.extend( target[ name ], options[ name ] );

				// Don't bring in undefined values
				else if ( options[ name ] != undefined )
					target[ name ] = options[ name ];

			}

	// Return the modified object
	return target;
};

var expando = "jQuery" + (new Date()).getTime(), uuid = 0, windowData = {};

// exclude the following css properties to add px
var exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i;

jQuery.extend({
	noConflict: function( deep ) {
		window.$ = _$;

		if ( deep )
			window.jQuery = _jQuery;

		return jQuery;
	},

	// See test/unit/core.js for details concerning this function.
	isFunction: function( fn ) {
		return !!fn && typeof fn != "string" && !fn.nodeName && 
			fn.constructor != Array && /function/i.test( fn + "" );
	},
	
	// check if an element is in a (or is an) XML document
	isXMLDoc: function( elem ) {
		return elem.documentElement && !elem.body ||
			elem.tagName && elem.ownerDocument && !elem.ownerDocument.body;
	},

	// Evalulates a script in a global context
	globalEval: function( data ) {
		data = jQuery.trim( data );

		if ( data ) {
			// Inspired by code by Andrea Giammarchi
			// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";
			if ( jQuery.browser.msie )
				script.text = data;
			else
				script.appendChild( document.createTextNode( data ) );

			head.appendChild( script );
			head.removeChild( script );
		}
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
	},
	
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
		if ( data != undefined )
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

	// args is for internal usage only
	each: function( object, callback, args ) {
		if ( args ) {
			if ( object.length == undefined ) {
				for ( var name in object )
					if ( callback.apply( object[ name ], args ) === false )
						break;
			} else
				for ( var i = 0, length = object.length; i < length; i++ )
					if ( callback.apply( object[ i ], args ) === false )
						break;

		// A special, fast, case for the most common use of each
		} else {
			if ( object.length == undefined ) {
				for ( var name in object )
					if ( callback.call( object[ name ], name, object[ name ] ) === false )
						break;
			} else
				for ( var i = 0, length = object.length, value = object[0]; 
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ){}
		}

		return object;
	},
	
	prop: function( elem, value, type, i, name ) {
			// Handle executable functions
			if ( jQuery.isFunction( value ) )
				value = value.call( elem, i );
				
			// Handle passing in a number to a CSS property
			return value && value.constructor == Number && type == "curCSS" && !exclude.test( name ) ?
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
				elem.className = classNames != undefined ?
					jQuery.grep(elem.className.split(/\s+/), function(className){
						return !jQuery.className.has( classNames, className );	
					}).join(" ") :
					"";
		},

		// internal only, use is(".class")
		has: function( elem, className ) {
			return jQuery.inArray( className, (elem.className || elem).toString().split(/\s+/) ) > -1;
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

	css: function( elem, name, force ) {
		if ( name == "width" || name == "height" ) {
			var val, props = { position: "absolute", visibility: "hidden", display:"block" }, which = name == "width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ];
		
			function getWH() {
				val = name == "width" ? elem.offsetWidth : elem.offsetHeight;
				var padding = 0, border = 0;
				jQuery.each( which, function() {
					padding += parseFloat(jQuery.curCSS( elem, "padding" + this, true)) || 0;
					border += parseFloat(jQuery.curCSS( elem, "border" + this + "Width", true)) || 0;
				});
				val -= Math.round(padding + border);
			}
		
			if ( jQuery(elem).is(":visible") )
				getWH();
			else
				jQuery.swap( elem, props, getWH );
			
			return Math.max(0, val);
		}
		
		return jQuery.curCSS( elem, name, force );
	},

	curCSS: function( elem, name, force ) {
		var ret;

		// A helper method for determining if an element's values are broken
		function color( elem ) {
			if ( !jQuery.browser.safari )
				return false;

			var ret = document.defaultView.getComputedStyle( elem, null );
			return !ret || ret.getPropertyValue("color") == "";
		}

		// We need to handle opacity special in IE
		if ( name == "opacity" && jQuery.browser.msie ) {
			ret = jQuery.attr( elem.style, "opacity" );

			return ret == "" ?
				"1" :
				ret;
		}
		// Opera sometimes will give the wrong display answer, this fixes it, see #2037
		if ( jQuery.browser.opera && name == "display" ) {
			var save = elem.style.outline;
			elem.style.outline = "0 solid black";
			elem.style.outline = save;
		}
		
		// Make sure we're using the right name for getting the float value
		if ( name.match( /float/i ) )
			name = styleFloat;

		if ( !force && elem.style && elem.style[ name ] )
			ret = elem.style[ name ];

		else if ( document.defaultView && document.defaultView.getComputedStyle ) {

			// Only "float" is needed here
			if ( name.match( /float/i ) )
				name = "float";

			name = name.replace( /([A-Z])/g, "-$1" ).toLowerCase();

			var getComputedStyle = document.defaultView.getComputedStyle( elem, null );

			if ( getComputedStyle && !color( elem ) )
				ret = getComputedStyle.getPropertyValue( name );

			// If the element isn't reporting its values properly in Safari
			// then some display: none elements are involved
			else {
				var swap = [], stack = [];

				// Locate all of the parent display: none elements
				for ( var a = elem; a && color(a); a = a.parentNode )
					stack.unshift(a);

				// Go through and make them visible, but in reverse
				// (It would be better if we knew the exact display type that they had)
				for ( var i = 0; i < stack.length; i++ )
					if ( color( stack[ i ] ) ) {
						swap[ i ] = stack[ i ].style.display;
						stack[ i ].style.display = "block";
					}

				// Since we flip the display style, we have to handle that
				// one special, otherwise get the value
				ret = name == "display" && swap[ stack.length - 1 ] != null ?
					"none" :
					( getComputedStyle && getComputedStyle.getPropertyValue( name ) ) || "";

				// Finally, revert the display styles back
				for ( var i = 0; i < swap.length; i++ )
					if ( swap[ i ] != null )
						stack[ i ].style.display = swap[ i ];
			}

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
				var style = elem.style.left, runtimeStyle = elem.runtimeStyle.left;

				// Put in the new values to get a computed value out
				elem.runtimeStyle.left = elem.currentStyle.left;
				elem.style.left = ret || 0;
				ret = elem.style.pixelLeft + "px";

				// Revert the changed values
				elem.style.left = style;
				elem.runtimeStyle.left = runtimeStyle;
			}
		}

		return ret;
	},
	
	clean: function( elems, context ) {
		var ret = [];
		context = context || document;
		// !context.createElement fails in IE with an error but returns typeof 'object'
		if (typeof context.createElement == 'undefined') 
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;

		jQuery.each(elems, function(i, elem){
			if ( !elem )
				return;

			if ( elem.constructor == Number )
				elem = elem.toString();
			
			// Convert html string into DOM nodes
			if ( typeof elem == "string" ) {
				// Fix "XHTML"-style tags in all browsers
				elem = elem.replace(/(<(\w+)[^>]*?)\/>/g, function(all, front, tag){
					return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ?
						all :
						front + "></" + tag + ">";
				});

				// Trim whitespace, otherwise indexOf won't work as expected
				var tags = jQuery.trim( elem ).toLowerCase(), div = context.createElement("div");

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
					jQuery.browser.msie &&
					[ 1, "div<div>", "</div>" ] ||
					
					[ 0, "", "" ];

				// Go to html and back, then peel off extra wrappers
				div.innerHTML = wrap[1] + elem + wrap[2];
				
				// Move to the right depth
				while ( wrap[0]-- )
					div = div.lastChild;
				
				// Remove IE's autoinserted <tbody> from table fragments
				if ( jQuery.browser.msie ) {
					
					// String was a <table>, *may* have spurious <tbody>
					var tbody = !tags.indexOf("<table") && tags.indexOf("<tbody") < 0 ?
						div.firstChild && div.firstChild.childNodes :
						
						// String was a bare <thead> or <tfoot>
						wrap[1] == "<table>" && tags.indexOf("<tbody") < 0 ?
							div.childNodes :
							[];
				
					for ( var j = tbody.length - 1; j >= 0 ; --j )
						if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length )
							tbody[ j ].parentNode.removeChild( tbody[ j ] );
					
					// IE completely kills leading whitespace when innerHTML is used	
					if ( /^\s/.test( elem ) )	
						div.insertBefore( context.createTextNode( elem.match(/^\s*/)[0] ), div.firstChild );
				
				}
				
				elem = jQuery.makeArray( div.childNodes );
			}

			if ( elem.length === 0 && (!jQuery.nodeName( elem, "form" ) && !jQuery.nodeName( elem, "select" )) )
				return;

			if ( elem[0] == undefined || jQuery.nodeName( elem, "form" ) || elem.options )
				ret.push( elem );

			else
				ret = jQuery.merge( ret, elem );

		});

		return ret;
	},
	
	attr: function( elem, name, value ) {
		// don't set attributes on text and comment nodes
		if (!elem || elem.nodeType == 3 || elem.nodeType == 8)
			return undefined;

		var fix = jQuery.isXMLDoc( elem ) ?
			{} :
			jQuery.props;

		// Safari mis-reports the default selected property of a hidden option
		// Accessing the parent's selectedIndex property fixes it
		if ( name == "selected" && jQuery.browser.safari )
			elem.parentNode.selectedIndex;
		
		// Certain attributes only work when accessed via the old DOM 0 way
		if ( fix[ name ] ) {
			if ( value != undefined )
				elem[ fix[ name ] ] = value;

			return elem[ fix[ name ] ];

		} else if ( jQuery.browser.msie && name == "style" )
			return jQuery.attr( elem.style, "cssText", value );

		else if ( value == undefined && jQuery.browser.msie && jQuery.nodeName( elem, "form" ) && (name == "action" || name == "method") )
			return elem.getAttributeNode( name ).nodeValue;

		// IE elem.getAttribute passes even for style
		else if ( elem.tagName ) {

			if ( value != undefined ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( name == "type" && jQuery.nodeName( elem, "input" ) && elem.parentNode )
					throw "type property can't be changed";

				// convert the value to a string (all browsers do this but IE) see #1070
				elem.setAttribute( name, "" + value );
			}

			if ( jQuery.browser.msie && /href|src/.test( name ) && !jQuery.isXMLDoc( elem ) ) 
				return elem.getAttribute( name, 2 );

			return elem.getAttribute( name );

		// elem is actually elem.style ... set the style
		} else {
			// IE actually uses filters for opacity
			if ( name == "opacity" && jQuery.browser.msie ) {
				if ( value != undefined ) {
					// IE has trouble with opacity if it does not have layout
					// Force it by setting the zoom level
					elem.zoom = 1; 
	
					// Set the alpha filter to set the opacity
					elem.filter = (elem.filter || "").replace( /alpha\([^)]*\)/, "" ) +
						(parseFloat( value ).toString() == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")");
				}
	
				return elem.filter && elem.filter.indexOf("opacity=") >= 0 ?
					(parseFloat( elem.filter.match(/opacity=([^)]*)/)[1] ) / 100).toString() :
					"";
			}

			name = name.replace(/-([a-z])/ig, function(all, letter){
				return letter.toUpperCase();
			});

			if ( value != undefined )
				elem[ name ] = value;

			return elem[ name ];
		}
	},
	
	trim: function( text ) {
		return (text || "").replace( /^\s+|\s+$/g, "" );
	},

	makeArray: function( array ) {
		var ret = [];

		// Need to use typeof to fight Safari childNodes crashes
		if ( typeof array != "array" )
			for ( var i = 0, length = array.length; i < length; i++ )
				ret.push( array[ i ] );
		else
			ret = array.slice( 0 );

		return ret;
	},

	inArray: function( elem, array ) {
		for ( var i = 0, length = array.length; i < length; i++ )
			if ( array[ i ] == elem )
				return i;

		return -1;
	},

	merge: function( first, second ) {
		// We have to loop this way because IE & Opera overwrite the length
		// expando of getElementsByTagName

		// Also, we need to make sure that the correct elements are being returned
		// (IE returns comment nodes in a '*' query)
		if ( jQuery.browser.msie ) {
			for ( var i = 0; second[ i ]; i++ )
				if ( second[ i ].nodeType != 8 )
					first.push( second[ i ] );

		} else
			for ( var i = 0; second[ i ]; i++ )
				first.push( second[ i ] );

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
			if ( !inv && callback( elems[ i ], i ) || inv && !callback( elems[ i ], i ) )
				ret.push( elems[ i ] );

		return ret;
	},

	map: function( elems, callback ) {
		var ret = [];

		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			var value = callback( elems[ i ], i );

			if ( value !== null && value != undefined ) {
				if ( value.constructor != Array )
					value = [ value ];

				ret = ret.concat( value );
			}
		}

		return ret;
	}
});

var userAgent = navigator.userAgent.toLowerCase();

// Figure out what browser is being used
jQuery.browser = {
	version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
	safari: /webkit/.test( userAgent ),
	opera: /opera/.test( userAgent ),
	msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};

var styleFloat = jQuery.browser.msie ?
	"styleFloat" :
	"cssFloat";
	
jQuery.extend({
	// Check to see if the W3C box model is being used
	boxModel: !jQuery.browser.msie || document.compatMode == "CSS1Compat",
	
	props: {
		"for": "htmlFor",
		"class": "className",
		"float": styleFloat,
		cssFloat: styleFloat,
		styleFloat: styleFloat,
		innerHTML: "innerHTML",
		className: "className",
		value: "value",
		disabled: "disabled",
		checked: "checked",
		readonly: "readOnly",
		selected: "selected",
		maxlength: "maxLength",
		selectedIndex: "selectedIndex",
		defaultValue: "defaultValue",
		tagName: "tagName",
		nodeName: "nodeName"
	}
});

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

		return this.pushStack( jQuery.unique( ret ) );
	};
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function(name, original){
	jQuery.fn[ name ] = function() {
		var args = arguments;

		return this.each(function(){
			for ( var i = 0, length = args.length; i < length; i++ )
				jQuery( args[ i ] )[ original ]( this );
		});
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

	toggleClass: function( classNames ) {
		jQuery.className[ jQuery.className.has( this, classNames ) ? "remove" : "add" ]( this, classNames );
	},

	remove: function( selector ) {
		if ( !selector || jQuery.filter( selector, [ this ] ).r.length ) {
			// Prevent memory leaks
			jQuery( "*", this ).add(this).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});
			if (this.parentNode)
				this.parentNode.removeChild( this );
		}
	},

	empty: function() {
		// Remove element nodes and prevent memory leaks
		jQuery( ">*", this ).remove();
		
		// Remove any remaining nodes
		while ( this.firstChild )
			this.removeChild( this.firstChild );
	}
}, function(name, fn){
	jQuery.fn[ name ] = function(){
		return this.each( fn, arguments );
	};
});

jQuery.each([ "Height", "Width" ], function(i, name){
	var type = name.toLowerCase();
	
	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		return this[0] == window ?
			// Opera reports document.body.client[Width/Height] properly in both quirks and standards
			jQuery.browser.opera && document.body[ "client" + name ] || 
			
			// Safari reports inner[Width/Height] just fine (Mozilla and Opera include scroll bar widths)
			jQuery.browser.safari && window[ "inner" + name ] ||
			
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			document.compatMode == "CSS1Compat" && document.documentElement[ "client" + name ] || document.body[ "client" + name ] :
		
			// Get document width or height
			this[0] == document ?
				// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
				Math.max( 
					Math.max(document.body["scroll" + name], document.documentElement["scroll" + name]), 
					Math.max(document.body["offset" + name], document.documentElement["offset" + name]) 
				) :

				// Get or set width or height on the element
				size == undefined ?
					// Get width or height on the element
					(this.length ? jQuery.css( this[0], type ) : null) :

					// Set the width or height on the element (default to pixels if value is unitless)
					this.css( type, size.constructor == String ? size : size + "px" );
	};
});

var chars = jQuery.browser.safari && parseInt(jQuery.browser.version) < 417 ?
		"(?:[\\w*_-]|\\\\.)" :
		"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",
	quickChild = new RegExp("^>\\s*(" + chars + "+)"),
	quickID = new RegExp("^(" + chars + "+)(#)(" + chars + "+)"),
	quickClass = new RegExp("^([#.]?)(" + chars + "*)");

jQuery.extend({
	expr: {
		"": function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2]);},
		"#": function(a,i,m){return a.getAttribute("id")==m[2];},
		":": {
			// Position Checks
			lt: function(a,i,m){return i<m[3]-0;},
			gt: function(a,i,m){return i>m[3]-0;},
			nth: function(a,i,m){return m[3]-0==i;},
			eq: function(a,i,m){return m[3]-0==i;},
			first: function(a,i){return i==0;},
			last: function(a,i,m,r){return i==r.length-1;},
			even: function(a,i){return i%2==0;},
			odd: function(a,i){return i%2;},

			// Child Checks
			"first-child": function(a){return a.parentNode.getElementsByTagName("*")[0]==a;},
			"last-child": function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a;},
			"only-child": function(a){return !jQuery.nth(a.parentNode.lastChild,2,"previousSibling");},

			// Parent Checks
			parent: function(a){return a.firstChild;},
			empty: function(a){return !a.firstChild;},

			// Text Check
			contains: function(a,i,m){return (a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0;},

			// Visibility
			visible: function(a){return "hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden";},
			hidden: function(a){return "hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden";},

			// Form attributes
			enabled: function(a){return !a.disabled;},
			disabled: function(a){return a.disabled;},
			checked: function(a){return a.checked;},
			selected: function(a){return a.selected||jQuery.attr(a,"selected");},

			// Form elements
			text: function(a){return "text"==a.type;},
			radio: function(a){return "radio"==a.type;},
			checkbox: function(a){return "checkbox"==a.type;},
			file: function(a){return "file"==a.type;},
			password: function(a){return "password"==a.type;},
			submit: function(a){return "submit"==a.type;},
			image: function(a){return "image"==a.type;},
			reset: function(a){return "reset"==a.type;},
			button: function(a){return "button"==a.type||jQuery.nodeName(a,"button");},
			input: function(a){return /input|select|textarea|button/i.test(a.nodeName);},

			// :has()
			has: function(a,i,m){return jQuery.find(m[3],a).length;},

			// :header
			header: function(a){return /h\d/i.test(a.nodeName);},

			// :animated
			animated: function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length;}
		}
	},
	
	// The regular expressions that power the parsing engine
	parse: [
		// Match: [@value='test'], [@foo]
		/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,

		// Match: :contains('foo')
		/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,

		// Match: :even, :last-chlid, #id, .class
		new RegExp("^([:.#]*)(" + chars + "+)")
	],

	multiFilter: function( expr, elems, not ) {
		var old, cur = [];

		while ( expr && expr != old ) {
			old = expr;
			var f = jQuery.filter( expr, elems, not );
			expr = f.t.replace(/^\s*,\s*/, "" );
			cur = not ? elems = f.r : jQuery.merge( cur, f.r );
		}

		return cur;
	},

	find: function( t, context ) {
		// Quickly handle non-string expressions
		if ( typeof t != "string" )
			return [ t ];

		// check to make sure context is a DOM element or a document
		if ( context && context.nodeType != 1 && context.nodeType != 9)
			return [ ];

		// Set the correct context (if none is provided)
		context = context || document;

		// Initialize the search
		var ret = [context], done = [], last, nodeName;

		// Continue while a selector expression exists, and while
		// we're no longer looping upon ourselves
		while ( t && last != t ) {
			var r = [];
			last = t;

			t = jQuery.trim(t);

			var foundToken = false;

			// An attempt at speeding up child selectors that
			// point to a specific element tag
			var re = quickChild;
			var m = re.exec(t);

			if ( m ) {
				nodeName = m[1].toUpperCase();

				// Perform our own iteration and filter
				for ( var i = 0; ret[i]; i++ )
					for ( var c = ret[i].firstChild; c; c = c.nextSibling )
						if ( c.nodeType == 1 && (nodeName == "*" || c.nodeName.toUpperCase() == nodeName) )
							r.push( c );

				ret = r;
				t = t.replace( re, "" );
				if ( t.indexOf(" ") == 0 ) continue;
				foundToken = true;
			} else {
				re = /^([>+~])\s*(\w*)/i;

				if ( (m = re.exec(t)) != null ) {
					r = [];

					var merge = {};
					nodeName = m[2].toUpperCase();
					m = m[1];

					for ( var j = 0, rl = ret.length; j < rl; j++ ) {
						var n = m == "~" || m == "+" ? ret[j].nextSibling : ret[j].firstChild;
						for ( ; n; n = n.nextSibling )
							if ( n.nodeType == 1 ) {
								var id = jQuery.data(n);

								if ( m == "~" && merge[id] ) break;
								
								if (!nodeName || n.nodeName.toUpperCase() == nodeName ) {
									if ( m == "~" ) merge[id] = true;
									r.push( n );
								}
								
								if ( m == "+" ) break;
							}
					}

					ret = r;

					// And remove the token
					t = jQuery.trim( t.replace( re, "" ) );
					foundToken = true;
				}
			}

			// See if there's still an expression, and that we haven't already
			// matched a token
			if ( t && !foundToken ) {
				// Handle multiple expressions
				if ( !t.indexOf(",") ) {
					// Clean the result set
					if ( context == ret[0] ) ret.shift();

					// Merge the result sets
					done = jQuery.merge( done, ret );

					// Reset the context
					r = ret = [context];

					// Touch up the selector string
					t = " " + t.substr(1,t.length);

				} else {
					// Optimize for the case nodeName#idName
					var re2 = quickID;
					var m = re2.exec(t);
					
					// Re-organize the results, so that they're consistent
					if ( m ) {
						m = [ 0, m[2], m[3], m[1] ];

					} else {
						// Otherwise, do a traditional filter check for
						// ID, class, and element selectors
						re2 = quickClass;
						m = re2.exec(t);
					}

					m[2] = m[2].replace(/\\/g, "");

					var elem = ret[ret.length-1];

					// Try to do a global search by ID, where we can
					if ( m[1] == "#" && elem && elem.getElementById && !jQuery.isXMLDoc(elem) ) {
						// Optimization for HTML document case
						var oid = elem.getElementById(m[2]);
						
						// Do a quick check for the existence of the actual ID attribute
						// to avoid selecting by the name attribute in IE
						// also check to insure id is a string to avoid selecting an element with the name of 'id' inside a form
						if ( (jQuery.browser.msie||jQuery.browser.opera) && oid && typeof oid.id == "string" && oid.id != m[2] )
							oid = jQuery('[@id="'+m[2]+'"]', elem)[0];

						// Do a quick check for node name (where applicable) so
						// that div#foo searches will be really fast
						ret = r = oid && (!m[3] || jQuery.nodeName(oid, m[3])) ? [oid] : [];
					} else {
						// We need to find all descendant elements
						for ( var i = 0; ret[i]; i++ ) {
							// Grab the tag name being searched for
							var tag = m[1] == "#" && m[3] ? m[3] : m[1] != "" || m[0] == "" ? "*" : m[2];

							// Handle IE7 being really dumb about <object>s
							if ( tag == "*" && ret[i].nodeName.toLowerCase() == "object" )
								tag = "param";

							r = jQuery.merge( r, ret[i].getElementsByTagName( tag ));
						}

						// It's faster to filter by class and be done with it
						if ( m[1] == "." )
							r = jQuery.classFilter( r, m[2] );

						// Same with ID filtering
						if ( m[1] == "#" ) {
							var tmp = [];

							// Try to find the element with the ID
							for ( var i = 0; r[i]; i++ )
								if ( r[i].getAttribute("id") == m[2] ) {
									tmp = [ r[i] ];
									break;
								}

							r = tmp;
						}

						ret = r;
					}

					t = t.replace( re2, "" );
				}

			}

			// If a selector string still exists
			if ( t ) {
				// Attempt to filter it
				var val = jQuery.filter(t,r);
				ret = r = val.r;
				t = jQuery.trim(val.t);
			}
		}

		// An error occurred with the selector;
		// just return an empty set instead
		if ( t )
			ret = [];

		// Remove the root context
		if ( ret && context == ret[0] )
			ret.shift();

		// And combine the results
		done = jQuery.merge( done, ret );

		return done;
	},

	classFilter: function(r,m,not){
		m = " " + m + " ";
		var tmp = [];
		for ( var i = 0; r[i]; i++ ) {
			var pass = (" " + r[i].className + " ").indexOf( m ) >= 0;
			if ( !not && pass || not && !pass )
				tmp.push( r[i] );
		}
		return tmp;
	},

	filter: function(t,r,not) {
		var last;

		// Look for common filter expressions
		while ( t && t != last ) {
			last = t;

			var p = jQuery.parse, m;

			for ( var i = 0; p[i]; i++ ) {
				m = p[i].exec( t );

				if ( m ) {
					// Remove what we just matched
					t = t.substring( m[0].length );

					m[2] = m[2].replace(/\\/g, "");
					break;
				}
			}

			if ( !m )
				break;

			// :not() is a special case that can be optimized by
			// keeping it out of the expression list
			if ( m[1] == ":" && m[2] == "not" )
				// optimize if only one selector found (most common case)
				r = isSimple.test( m[3] ) ?
					jQuery.filter(m[3], r, true).r :
					jQuery( r ).not( m[3] );

			// We can get a big speed boost by filtering by class here
			else if ( m[1] == "." )
				r = jQuery.classFilter(r, m[2], not);

			else if ( m[1] == "[" ) {
				var tmp = [], type = m[3];
				
				for ( var i = 0, rl = r.length; i < rl; i++ ) {
					var a = r[i], z = a[ jQuery.props[m[2]] || m[2] ];
					
					if ( z == null || /href|src|selected/.test(m[2]) )
						z = jQuery.attr(a,m[2]) || '';

					if ( (type == "" && !!z ||
						 type == "=" && z == m[5] ||
						 type == "!=" && z != m[5] ||
						 type == "^=" && z && !z.indexOf(m[5]) ||
						 type == "$=" && z.substr(z.length - m[5].length) == m[5] ||
						 (type == "*=" || type == "~=") && z.indexOf(m[5]) >= 0) ^ not )
							tmp.push( a );
				}
				
				r = tmp;

			// We can get a speed boost by handling nth-child here
			} else if ( m[1] == ":" && m[2] == "nth-child" ) {
				var merge = {}, tmp = [],
					// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
					test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
						m[3] == "even" && "2n" || m[3] == "odd" && "2n+1" ||
						!/\D/.test(m[3]) && "0n+" + m[3] || m[3]),
					// calculate the numbers (first)n+(last) including if they are negative
					first = (test[1] + (test[2] || 1)) - 0, last = test[3] - 0;
 
				// loop through all the elements left in the jQuery object
				for ( var i = 0, rl = r.length; i < rl; i++ ) {
					var node = r[i], parentNode = node.parentNode, id = jQuery.data(parentNode);

					if ( !merge[id] ) {
						var c = 1;

						for ( var n = parentNode.firstChild; n; n = n.nextSibling )
							if ( n.nodeType == 1 )
								n.nodeIndex = c++;

						merge[id] = true;
					}

					var add = false;

					if ( first == 0 ) {
						if ( node.nodeIndex == last )
							add = true;
					} else if ( (node.nodeIndex - last) % first == 0 && (node.nodeIndex - last) / first >= 0 )
						add = true;

					if ( add ^ not )
						tmp.push( node );
				}

				r = tmp;

			// Otherwise, find the expression to execute
			} else {
				var fn = jQuery.expr[ m[1] ];
				if ( typeof fn == "object" )
					fn = fn[ m[2] ];

				if ( typeof fn == "string" )
					fn = eval("false||function(a,i){return " + fn + ";}");

				// Execute it against the current filter
				r = jQuery.grep( r, function(elem, i){
					return fn(elem, i, m, r);
				}, not );
			}
		}

		// Return an array of filtered elements (r)
		// and the modified expression string (t)
		return { r: r, t: t };
	},

	dir: function( elem, dir ){
		var matched = [];
		var cur = elem[dir];
		while ( cur && cur != document ) {
			if ( cur.nodeType == 1 )
				matched.push( cur );
			cur = cur[dir];
		}
		return matched;
	},
	
	nth: function(cur,result,dir,elem){
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] )
			if ( cur.nodeType == 1 && ++num == result )
				break;

		return cur;
	},
	
	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType == 1 && (!elem || n != elem) )
				r.push( n );
		}

		return r;
	}
});

/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code orignated from 
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
		if ( jQuery.browser.msie && elem.setInterval != undefined )
			elem = window;

		// Make sure that the function being executed has a unique ID
		if ( !handler.guid )
			handler.guid = this.guid++;
			
		// if data is passed, bind to handler 
		if( data != undefined ) { 
			// Create temporary function pointer to original handler 
			var fn = handler; 

			// Create unique handler function, wrapped around original handler 
			handler = function() { 
				// Pass arguments and context to original handler 
				return fn.apply(this, arguments); 
			};

			// Store data in unique handler 
			handler.data = data;

			// Set the guid of unique handler to the same of original handler, so it can be removed 
			handler.guid = fn.guid;
		}

		// Init the element's event structure
		var events = jQuery.data(elem, "events") || jQuery.data(elem, "events", {}),
			handle = jQuery.data(elem, "handle") || jQuery.data(elem, "handle", function(){
				// returned undefined or false
				var val;

				// Handle the second event of a trigger and when
				// an event is called after a page has unloaded
				if ( typeof jQuery == "undefined" || jQuery.event.triggered )
					return val;
		
				val = jQuery.event.handle.apply(arguments.callee.elem, arguments);
		
				return val;
			});
		// Add elem as a property of the handle function
		// This is to prevent a memory leak with non-native
		// event in IE.
		handle.elem = elem;
			
			// Handle multiple events seperated by a space
			// jQuery(...).bind("mouseover mouseout", fn);
			jQuery.each(types.split(/\s+/), function(index, type) {
				// Namespaced event handlers
				var parts = type.split(".");
				type = parts[0];
				handler.type = parts[1];

				// Get the current list of functions bound to this event
				var handlers = events[type];

				// Init the event handler queue
				if (!handlers) {
					handlers = events[type] = {};
		
					// Check for a special event handler
					// Only use addEventListener/attachEvent if the special
					// events handler returns false
					if ( !jQuery.event.special[type] || jQuery.event.special[type].setup.call(elem) === false ) {
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
			if ( types == undefined || (typeof types == "string" && types.charAt(0) == ".") )
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
					var parts = type.split(".");
					type = parts[0];
					
					if ( events[type] ) {
						// remove the given handler for the given type
						if ( handler )
							delete events[type][handler.guid];
			
						// remove all handlers for the given type
						else
							for ( handler in events[type] )
								// Handle the removal of namespaced events
								if ( !parts[1] || events[type][handler].type == parts[1] )
									delete events[type][handler];

						// remove generic event handler if no more handlers exist
						for ( ret in events[type] ) break;
						if ( !ret ) {
							if ( !jQuery.event.special[type] || jQuery.event.special[type].teardown.call(elem) === false ) {
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

	trigger: function(type, data, elem, donative, extra) {
		// Clone the incoming data, if any
		data = jQuery.makeArray(data || []);

		if ( type.indexOf("!") >= 0 ) {
			type = type.slice(0, -1);
			var exclusive = true;
		}

		// Handle a global trigger
		if ( !elem ) {
			// Only trigger if we've ever bound an event for it
			if ( this.global[type] )
				jQuery("*").add([window, document]).trigger(type, data);

		// Handle triggering a single element
		} else {
			// don't do events on text and comment nodes
			if ( elem.nodeType == 3 || elem.nodeType == 8 )
				return undefined;

			var val, ret, fn = jQuery.isFunction( elem[ type ] || null ),
				// Check to see if we need to provide a fake event, or not
				event = !data[0] || !data[0].preventDefault;
			
			// Pass along a fake event
			if ( event )
				data.unshift( this.fix({ type: type, target: elem }) );

			// Enforce the right trigger type
			data[0].type = type;
			if ( exclusive )
				data[0].exclusive = true;

			// Trigger the event
			if ( jQuery.isFunction( jQuery.data(elem, "handle") ) )
				val = jQuery.data(elem, "handle").apply( elem, data );

			// Handle triggering native .onfoo handlers
			if ( !fn && elem["on"+type] && elem["on"+type].apply( elem, data ) === false )
				val = false;

			// Extra functions don't get the custom event object
			if ( event )
				data.shift();

			// Handle triggering of extra function
			if ( extra && jQuery.isFunction( extra ) ) {
				// call the extra function and tack the current return value on the end for possible inspection
				ret = extra.apply( elem, val == null ? data : data.concat( val ) );
				// if anything is returned, give it precedence and have it overwrite the previous value
				if (ret !== undefined)
					val = ret;
			}

			// Trigger the native events (except for clicks on links)
			if ( fn && donative !== false && val !== false && !(jQuery.nodeName(elem, 'a') && type == "click") ) {
				this.triggered = true;
				try {
					elem[ type ]();
				// prevent IE from throwing an error for some hidden elements
				} catch (e) {}
			}

			this.triggered = false;
		}

		return val;
	},

	handle: function(event) {
		// returned undefined or false
		var val;

		// Empty object is for triggered events with no data
		event = jQuery.event.fix( event || window.event || {} ); 

		// Namespaced event handlers
		var parts = event.type.split(".");
		event.type = parts[0];

		var handlers = jQuery.data(this, "events") && jQuery.data(this, "events")[event.type], args = Array.prototype.slice.call( arguments, 1 );
		args.unshift( event );

		for ( var j in handlers ) {
			var handler = handlers[j];
			// Pass in a reference to the handler function itself
			// So that we can later remove it
			args[0].handler = handler;
			args[0].data = handler.data;

			// Filter the functions by class
			if ( !parts[1] && !event.exclusive || handler.type == parts[1] ) {
				var ret = handler.apply( this, args );

				if ( val !== false )
					val = ret;

				if ( ret === false ) {
					event.preventDefault();
					event.stopPropagation();
				}
			}
		}

		// Clean up added properties in IE to prevent memory leak
		if (jQuery.browser.msie)
			event.target = event.preventDefault = event.stopPropagation =
				event.handler = event.data = null;

		return val;
	},

	fix: function(event) {
		// store a copy of the original event object 
		// and clone to set read-only properties
		var originalEvent = event;
		event = jQuery.extend({}, originalEvent);
		
		// add preventDefault and stopPropagation since 
		// they will not work on the clone
		event.preventDefault = function() {
			// if preventDefault exists run it on the original event
			if (originalEvent.preventDefault)
				originalEvent.preventDefault();
			// otherwise set the returnValue property of the original event to false (IE)
			originalEvent.returnValue = false;
		};
		event.stopPropagation = function() {
			// if stopPropagation exists run it on the original event
			if (originalEvent.stopPropagation)
				originalEvent.stopPropagation();
			// otherwise set the cancelBubble property of the original event to true (IE)
			originalEvent.cancelBubble = true;
		};
		
		// Fix target property, if necessary
		if ( !event.target )
			event.target = event.srcElement || document; // Fixes #1925 where srcElement might not be defined either
				
		// check if target is a textnode (safari)
		if ( event.target.nodeType == 3 )
			event.target = originalEvent.target.parentNode;

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
	
	special: {
		ready: {
			setup: function() {
				// Make sure the ready event is setup
				bindReady();
				return;
			},
			
			teardown: function() { return; }
		},
		
		mouseenter: {
			setup: function() {
				if ( jQuery.browser.msie ) return false;
				jQuery(this).bind("mouseover", jQuery.event.special.mouseenter.handler);
				return true;
			},
		
			teardown: function() {
				if ( jQuery.browser.msie ) return false;
				jQuery(this).unbind("mouseover", jQuery.event.special.mouseenter.handler);
				return true;
			},
			
			handler: function(event) {
				// If we actually just moused on to a sub-element, ignore it
				if ( withinElement(event, this) ) return true;
				// Execute the right handlers by setting the event type to mouseenter
				arguments[0].type = "mouseenter";
				return jQuery.event.handle.apply(this, arguments);
			}
		},
	
		mouseleave: {
			setup: function() {
				if ( jQuery.browser.msie ) return false;
				jQuery(this).bind("mouseout", jQuery.event.special.mouseleave.handler);
				return true;
			},
		
			teardown: function() {
				if ( jQuery.browser.msie ) return false;
				jQuery(this).unbind("mouseout", jQuery.event.special.mouseleave.handler);
				return true;
			},
			
			handler: function(event) {
				// If we actually just moused on to a sub-element, ignore it
				if ( withinElement(event, this) ) return true;
				// Execute the right handlers by setting the event type to mouseleave
				arguments[0].type = "mouseleave";
				return jQuery.event.handle.apply(this, arguments);
			}
		}
	}
};

jQuery.fn.extend({
	bind: function( type, data, fn ) {
		return type == "unload" ? this.one(type, data, fn) : this.each(function(){
			jQuery.event.add( this, type, fn || data, fn && data );
		});
	},
	
	one: function( type, data, fn ) {
		return this.each(function(){
			jQuery.event.add( this, type, function(event) {
				jQuery(this).unbind(event);
				return (fn || data).apply( this, arguments);
			}, fn && data);
		});
	},

	unbind: function( type, fn ) {
		return this.each(function(){
			jQuery.event.remove( this, type, fn );
		});
	},

	trigger: function( type, data, fn ) {
		return this.each(function(){
			jQuery.event.trigger( type, data, this, true, fn );
		});
	},

	triggerHandler: function( type, data, fn ) {
		if ( this[0] )
			return jQuery.event.trigger( type, data, this[0], false, fn );
		return undefined;
	},

	toggle: function() {
		// Save reference to arguments for access in closure
		var args = arguments;

		return this.click(function(event) {
			// Figure out which function to execute
			this.lastToggle = 0 == this.lastToggle ? 1 : 0;
			
			// Make sure that clicks stop
			event.preventDefault();
			
			// and execute the function
			return args[this.lastToggle].apply( this, arguments ) || false;
		});
	},

	hover: function(fnOver, fnOut) {
		return this.bind('mouseenter', fnOver).bind('mouseleave', fnOut);
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
			jQuery.readyList.push( function() { return fn.call(this, jQuery); } );
	
		return this;
	}
});

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
					this.apply( document );
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

	// Mozilla, Opera (see further below for it) and webkit nightlies currently support this event
	if ( document.addEventListener && !jQuery.browser.opera)
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", jQuery.ready, false );
	
	// If IE is used and is not in a frame
	// Continually check to see if the document is ready
	if ( jQuery.browser.msie && window == top ) (function(){
		if (jQuery.isReady) return;
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

	if ( jQuery.browser.opera )
		document.addEventListener( "DOMContentLoaded", function () {
			if (jQuery.isReady) return;
			for (var i = 0; i < document.styleSheets.length; i++)
				if (document.styleSheets[i].disabled) {
					setTimeout( arguments.callee, 0 );
					return;
				}
			// and execute any waiting functions
			jQuery.ready();
		}, false);

	if ( jQuery.browser.safari ) {
		var numStyles;
		(function(){
			if (jQuery.isReady) return;
			if ( document.readyState != "loaded" && document.readyState != "complete" ) {
				setTimeout( arguments.callee, 0 );
				return;
			}
			if ( numStyles === undefined )
				numStyles = jQuery("style, link[rel=stylesheet]").length;
			if ( document.styleSheets.length != numStyles ) {
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
	"mousedown,mouseup,mousemove,mouseover,mouseout,change,select," + 
	"submit,keydown,keypress,keyup,error").split(","), function(i, name){
	
	// Handle event binding
	jQuery.fn[name] = function(fn){
		return fn ? this.bind(name, fn) : this.trigger(name);
	};
});

// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement = function(event, elem) {
	// Check if mouse(over|out) are still within the same parent element
	var parent = event.relatedTarget;
	// Traverse up the tree
	while ( parent && parent != elem ) try { parent = parent.parentNode; } catch(error) { parent = elem; }
	// Return true if we actually just moused on to a sub-element
	return parent == elem;
};

// Prevent memory leaks in IE
// And prevent errors on refresh with events like mouseover in other browsers
// Window isn't included so as not to unbind existing unload events
jQuery(window).bind("unload", function() {
	jQuery("*").add(document).unbind();
});
jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( jQuery.isFunction( url ) )
			return this.bind("load", url);

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		callback = callback || function(){};

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
			} else {
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
			return jQuery.nodeName(this, "form") ?
				jQuery.makeArray(this.elements) : this;
		})
		.filter(function(){
			return this.name && !this.disabled && 
				(this.checked || /select|textarea/i.test(this.nodeName) || 
					/text|hidden|password/i.test(this.type));
		})
		.map(function(i, elem){
			var val = jQuery(this).val();
			return val == null ? null :
				val.constructor == Array ?
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

var jsc = (new Date).getTime();

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
		global: true,
		type: "GET",
		timeout: 0,
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		data: null,
		username: null,
		password: null,
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
		var jsonp, jsre = /=\?(&|$)/g, status, data;

		// Extend the settings, but re-extend 's' so that it can be
		// checked again later (in the test suite, specifically)
		s = jQuery.extend(true, s, jQuery.extend(true, {}, jQuery.ajaxSettings, s));

		// convert data if not already a string
		if ( s.data && s.processData && typeof s.data != "string" )
			s.data = jQuery.param(s.data);

		// Handle JSONP Parameter Callbacks
		if ( s.dataType == "jsonp" ) {
			if ( s.type.toLowerCase() == "get" ) {
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

		if ( s.cache === false && s.type.toLowerCase() == "get" ) {
			var ts = (new Date()).getTime();
			// try replacing _= if it is there
			var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
			// if nothing was replaced, add timestamp to the end
			s.url = ret + ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + ts : "");
		}

		// If data is available, append data to url for get requests
		if ( s.data && s.type.toLowerCase() == "get" ) {
			s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;

			// IE likes to send both get and post data, prevent this
			s.data = null;
		}

		// Watch for a new set of requests
		if ( s.global && ! jQuery.active++ )
			jQuery.event.trigger( "ajaxStart" );

		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if ( (!s.url.indexOf("http") || !s.url.indexOf("//")) && s.dataType == "script" && s.type.toLowerCase() == "get" ) {
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
						head.removeChild( script );
					}
				};
			}

			head.appendChild(script);

			// We handle everything using the script element injection
			return undefined;
		}

		var requestDone = false;

		// Create the request object; Microsoft failed to properly
		// implement the XMLHttpRequest in IE7, so we use the ActiveXObject when it is available
		var xml = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();

		// Open the socket
		xml.open(s.type, s.url, s.async, s.username, s.password);

		// Need an extra try/catch for cross domain requests in Firefox 3
		try {
			// Set the correct header, if data is being sent
			if ( s.data )
				xml.setRequestHeader("Content-Type", s.contentType);

			// Set the If-Modified-Since header, if ifModified mode.
			if ( s.ifModified )
				xml.setRequestHeader("If-Modified-Since",
					jQuery.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT" );

			// Set header so the called script knows that it's an XMLHttpRequest
			xml.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			// Set the Accepts header for the server, depending on the dataType
			xml.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
				s.accepts[ s.dataType ] + ", */*" :
				s.accepts._default );
		} catch(e){}

		// Allow custom headers/mimetypes
		if ( s.beforeSend )
			s.beforeSend(xml);
			
		if ( s.global )
			jQuery.event.trigger("ajaxSend", [xml, s]);

		// Wait for a response to come back
		var onreadystatechange = function(isTimeout){
			// The transfer is complete and the data is available, or the request timed out
			if ( !requestDone && xml && (xml.readyState == 4 || isTimeout == "timeout") ) {
				requestDone = true;
				
				// clear poll interval
				if (ival) {
					clearInterval(ival);
					ival = null;
				}
				
				status = isTimeout == "timeout" && "timeout" ||
					!jQuery.httpSuccess( xml ) && "error" ||
					s.ifModified && jQuery.httpNotModified( xml, s.url ) && "notmodified" ||
					"success";

				if ( status == "success" ) {
					// Watch for, and catch, XML document parse errors
					try {
						// process the data (runs the xml through httpData regardless of callback)
						data = jQuery.httpData( xml, s.dataType );
					} catch(e) {
						status = "parsererror";
					}
				}

				// Make sure that the request was successful or notmodified
				if ( status == "success" ) {
					// Cache Last-Modified header, if ifModified mode.
					var modRes;
					try {
						modRes = xml.getResponseHeader("Last-Modified");
					} catch(e) {} // swallow exception thrown by FF if header is not available
	
					if ( s.ifModified && modRes )
						jQuery.lastModified[s.url] = modRes;

					// JSONP handles its own success callback
					if ( !jsonp )
						success();	
				} else
					jQuery.handleError(s, xml, status);

				// Fire the complete handlers
				complete();

				// Stop memory leaks
				if ( s.async )
					xml = null;
			}
		};
		
		if ( s.async ) {
			// don't attach the handler to the request, just poll it instead
			var ival = setInterval(onreadystatechange, 13); 

			// Timeout checker
			if ( s.timeout > 0 )
				setTimeout(function(){
					// Check to see if the request is still happening
					if ( xml ) {
						// Cancel the request
						xml.abort();
	
						if( !requestDone )
							onreadystatechange( "timeout" );
					}
				}, s.timeout);
		}
			
		// Send the data
		try {
			xml.send(s.data);
		} catch(e) {
			jQuery.handleError(s, xml, null, e);
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
				jQuery.event.trigger( "ajaxSuccess", [xml, s] );
		}

		function complete(){
			// Process result
			if ( s.complete )
				s.complete(xml, status);

			// The request was completed
			if ( s.global )
				jQuery.event.trigger( "ajaxComplete", [xml, s] );

			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active )
				jQuery.event.trigger( "ajaxStop" );
		}
		
		// return XMLHttpRequest to allow aborting the request etc.
		return xml;
	},

	handleError: function( s, xml, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) s.error( xml, status, e );

		// Fire the global callback
		if ( s.global )
			jQuery.event.trigger( "ajaxError", [xml, s, e] );
	},

	// Counter for holding the number of active queries
	active: 0,

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( r ) {
		try {
			// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
			return !r.status && location.protocol == "file:" ||
				( r.status >= 200 && r.status < 300 ) || r.status == 304 || r.status == 1223 ||
				jQuery.browser.safari && r.status == undefined;
		} catch(e){}
		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xml, url ) {
		try {
			var xmlRes = xml.getResponseHeader("Last-Modified");

			// Firefox always returns 200. check Last-Modified date
			return xml.status == 304 || xmlRes == jQuery.lastModified[url] ||
				jQuery.browser.safari && xml.status == undefined;
		} catch(e){}
		return false;
	},

	httpData: function( r, type ) {
		var ct = r.getResponseHeader("content-type");
		var xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0;
		var data = xml ? r.responseXML : r.responseText;

		if ( xml && data.documentElement.tagName == "parsererror" )
			throw "parsererror";

		// If the type is "script", eval it in global context
		if ( type == "script" )
			jQuery.globalEval( data );

		// Get the JavaScript object, if JSON is used.
		if ( type == "json" )
			data = eval("(" + data + ")");

		return data;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a ) {
		var s = [];

		// If an array was passed in, assume that it is an array
		// of form elements
		if ( a.constructor == Array || a.jquery )
			// Serialize the form elements
			jQuery.each( a, function(){
				s.push( encodeURIComponent(this.name) + "=" + encodeURIComponent( this.value ) );
			});

		// Otherwise, assume that it's an object of key/value pairs
		else
			// Serialize the key/values
			for ( var j in a )
				// If the value is an array then the key names need to be repeated
				if ( a[j] && a[j].constructor == Array )
					jQuery.each( a[j], function(){
						s.push( encodeURIComponent(j) + "=" + encodeURIComponent( this ) );
					});
				else
					s.push( encodeURIComponent(j) + "=" + encodeURIComponent( a[j] ) );

		// Return the resulting serialization
		return s.join("&").replace(/%20/g, "+");
	}

});
jQuery.fn.extend({
	show: function(speed,callback){
		return speed ?
			this.animate({
				height: "show", width: "show", opacity: "show"
			}, speed, callback) :
			
			this.filter(":hidden").each(function(){
				this.style.display = this.oldblock || "";
				if ( jQuery.css(this,"display") == "none" ) {
					var elem = jQuery("<" + this.tagName + " />").appendTo("body");
					this.style.display = elem.css("display");
					// handle an edge condition where css is - div { display:none; } or similar
					if (this.style.display == "none")
						this.style.display = "block";
					elem.remove();
				}
			}).end();
	},
	
	hide: function(speed,callback){
		return speed ?
			this.animate({
				height: "hide", width: "hide", opacity: "hide"
			}, speed, callback) :
			
			this.filter(":visible").each(function(){
				this.oldblock = this.oldblock || jQuery.css(this,"display");
				this.style.display = "none";
			}).end();
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,
	
	toggle: function( fn, fn2 ){
		return jQuery.isFunction(fn) && jQuery.isFunction(fn2) ?
			this._toggle( fn, fn2 ) :
			fn ?
				this.animate({
					height: "toggle", width: "toggle", opacity: "toggle"
				}, fn, fn2) :
				this.each(function(){
					jQuery(this)[ jQuery(this).is(":hidden") ? "show" : "hide" ]();
				});
	},
	
	slideDown: function(speed,callback){
		return this.animate({height: "show"}, speed, callback);
	},
	
	slideUp: function(speed,callback){
		return this.animate({height: "hide"}, speed, callback);
	},

	slideToggle: function(speed, callback){
		return this.animate({height: "toggle"}, speed, callback);
	},
	
	fadeIn: function(speed, callback){
		return this.animate({opacity: "show"}, speed, callback);
	},
	
	fadeOut: function(speed, callback){
		return this.animate({opacity: "hide"}, speed, callback);
	},
	
	fadeTo: function(speed,to,callback){
		return this.animate({opacity: to}, speed, callback);
	},
	
	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		return this[ optall.queue === false ? "each" : "queue" ](function(){
			if ( this.nodeType != 1)
				return false;

			var opt = jQuery.extend({}, optall);
			var hidden = jQuery(this).is(":hidden"), self = this;
			
			for ( var p in prop ) {
				if ( prop[p] == "hide" && hidden || prop[p] == "show" && !hidden )
					return jQuery.isFunction(opt.complete) && opt.complete.apply(this);

				if ( p == "height" || p == "width" ) {
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
	
	queue: function(type, fn){
		if ( jQuery.isFunction(type) || ( type && type.constructor == Array )) {
			fn = type;
			type = "fx";
		}

		if ( !type || (typeof type == "string" && !fn) )
			return queue( this[0], type );

		return this.each(function(){
			if ( fn.constructor == Array )
				queue(this, type, fn);
			else {
				queue(this, type).push( fn );
			
				if ( queue(this, type).length == 1 )
					fn.apply(this);
			}
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

var queue = function( elem, type, array ) {
	if ( !elem )
		return undefined;

	type = type || "fx";

	var q = jQuery.data( elem, type + "queue" );

	if ( !q || array )
		q = jQuery.data( elem, type + "queue", 
			array ? jQuery.makeArray(array) : [] );

	return q;
};

jQuery.fn.dequeue = function(type){
	type = type || "fx";

	return this.each(function(){
		var q = queue(this, type);

		q.shift();

		if ( q.length )
			q[0].apply( this );
	});
};

jQuery.extend({
	
	speed: function(speed, easing, fn) {
		var opt = speed && speed.constructor == Object ? speed : {
			complete: fn || !fn && easing || 
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && easing.constructor != Function && easing
		};

		opt.duration = (opt.duration && opt.duration.constructor == Number ? 
			opt.duration : 
			{ slow: 600, fast: 200 }[opt.duration]) || 400;
	
		// Queueing
		opt.old = opt.complete;
		opt.complete = function(){
			if ( opt.queue !== false )
				jQuery(this).dequeue();
			if ( jQuery.isFunction( opt.old ) )
				opt.old.apply( this );
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
	timerId: null,

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
			this.options.step.apply( this.elem, [ this.now, this ] );

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );

		// Set display property to block for height/width animations
		if ( this.prop == "height" || this.prop == "width" )
			this.elem.style.display = "block";
	},

	// Get the current size
	cur: function(force){
		if ( this.elem[this.prop] != null && this.elem.style[this.prop] == null )
			return this.elem[ this.prop ];

		var r = parseFloat(jQuery.css(this.elem, this.prop, force));
		return r && r > -10000 ? r : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0;
	},

	// Start an animation from one number to another
	custom: function(from, to, unit){
		this.startTime = (new Date()).getTime();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;
		this.update();

		var self = this;
		function t(gotoEnd){
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		jQuery.timers.push(t);

		if ( jQuery.timerId == null ) {
			jQuery.timerId = setInterval(function(){
				var timers = jQuery.timers;
				
				for ( var i = 0; i < timers.length; i++ )
					if ( !timers[i]() )
						timers.splice(i--, 1);

				if ( !timers.length ) {
					clearInterval( jQuery.timerId );
					jQuery.timerId = null;
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
		this.custom(0, this.cur());

		// Make sure that we start at a small width/height to avoid any
		// flash of content
		if ( this.prop == "width" || this.prop == "height" )
			this.elem.style[this.prop] = "1px";
		
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
		var t = (new Date()).getTime();

		if ( gotoEnd || t > this.options.duration + this.startTime ) {
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
					this.elem.style.display = "none";

				// Reset the properties, if the item has been hidden or shown
				if ( this.options.hide || this.options.show )
					for ( var p in this.options.curAnim )
						jQuery.attr(this.elem.style, p, this.options.orig[p]);
			}

			// If a callback was provided, execute it
			if ( done && jQuery.isFunction( this.options.complete ) )
				// Execute the complete function
				this.options.complete.apply( this.elem );

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

jQuery.fx.step = {
	scrollLeft: function(fx){
		fx.elem.scrollLeft = fx.now;
	},

	scrollTop: function(fx){
		fx.elem.scrollTop = fx.now;
	},

	opacity: function(fx){
		jQuery.attr(fx.elem.style, "opacity", fx.now);
	},

	_default: function(fx){
		fx.elem.style[ fx.prop ] = fx.now + fx.unit;
	}
};
// The Offset Method
// Originally By Brandon Aaron, part of the Dimension Plugin
// http://jquery.com/plugins/project/dimensions
jQuery.fn.offset = function() {
	var left = 0, top = 0, elem = this[0], results;
	
	if ( elem ) with ( jQuery.browser ) {
		var parent       = elem.parentNode, 
		    offsetChild  = elem,
		    offsetParent = elem.offsetParent, 
		    doc          = elem.ownerDocument,
		    safari2      = safari && parseInt(version) < 522 && !/adobeair/i.test(userAgent),
		    fixed        = jQuery.css(elem, "position") == "fixed";
	
		// Use getBoundingClientRect if available
		if ( elem.getBoundingClientRect ) {
			var box = elem.getBoundingClientRect();
		
			// Add the document scroll offsets
			add(box.left + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft),
				box.top  + Math.max(doc.documentElement.scrollTop,  doc.body.scrollTop));
		
			// IE adds the HTML element's border, by default it is medium which is 2px
			// IE 6 and 7 quirks mode the border width is overwritable by the following css html { border: 0; }
			// IE 7 standards mode, the border is always 2px
			// This border/offset is typically represented by the clientLeft and clientTop properties
			// However, in IE6 and 7 quirks mode the clientLeft and clientTop properties are not updated when overwriting it via CSS
			// Therefore this method will be off by 2px in IE while in quirksmode
			add( -doc.documentElement.clientLeft, -doc.documentElement.clientTop );
	
		// Otherwise loop through the offsetParents and parentNodes
		} else {
		
			// Initial element offsets
			add( elem.offsetLeft, elem.offsetTop );
			
			// Get parent offsets
			while ( offsetParent ) {
				// Add offsetParent offsets
				add( offsetParent.offsetLeft, offsetParent.offsetTop );
			
				// Mozilla and Safari > 2 does not include the border on offset parents
				// However Mozilla adds the border for table or table cells
				if ( mozilla && !/^t(able|d|h)$/i.test(offsetParent.tagName) || safari && !safari2 )
					border( offsetParent );
					
				// Add the document scroll offsets if position is fixed on any offsetParent
				if ( !fixed && jQuery.css(offsetParent, "position") == "fixed" )
					fixed = true;
			
				// Set offsetChild to previous offsetParent unless it is the body element
				offsetChild  = /^body$/i.test(offsetParent.tagName) ? offsetChild : offsetParent;
				// Get next offsetParent
				offsetParent = offsetParent.offsetParent;
			}
		
			// Get parent scroll offsets
			while ( parent && parent.tagName && !/^body|html$/i.test(parent.tagName) ) {
				// Remove parent scroll UNLESS that parent is inline or a table to work around Opera inline/table scrollLeft/Top bug
				if ( !/^inline|table.*$/i.test(jQuery.css(parent, "display")) )
					// Subtract parent scroll offsets
					add( -parent.scrollLeft, -parent.scrollTop );
			
				// Mozilla does not add the border for a parent that has overflow != visible
				if ( mozilla && jQuery.css(parent, "overflow") != "visible" )
					border( parent );
			
				// Get next parent
				parent = parent.parentNode;
			}
		
			// Safari <= 2 doubles body offsets with a fixed position element/offsetParent or absolutely positioned offsetChild
			// Mozilla doubles body offsets with a non-absolutely positioned offsetChild
			if ( (safari2 && (fixed || jQuery.css(offsetChild, "position") == "absolute")) || 
				(mozilla && jQuery.css(offsetChild, "position") != "absolute") )
					add( -doc.body.offsetLeft, -doc.body.offsetTop );
			
			// Add the document scroll offsets if position is fixed
			if ( fixed )
				add(Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft),
					Math.max(doc.documentElement.scrollTop,  doc.body.scrollTop));
		}

		// Return an object with top and left properties
		results = { top: top, left: left };
	}

	function border(elem) {
		add( jQuery.curCSS(elem, "borderLeftWidth", true), jQuery.curCSS(elem, "borderTopWidth", true) );
	}

	function add(l, t) {
		left += parseInt(l) || 0;
		top += parseInt(t) || 0;
	}

	return results;
};
};

azer();







/* Javascript plotting library for jQuery, v. 0.5.
 *
 * Released under the MIT license by IOLA, December 2007.
 *
 */

(function($) {
    function Plot(target_, data_, options_) {
        // data is on the form:
        //   [ series1, series2 ... ]
        // where series is either just the data as [ [x1, y1], [x2, y2], ... ]
        // or { data: [ [x1, y1], [x2, y2], ... ], label: "some label" }
        
        var series = [],
            options = {
            // the color theme used for graphs
            colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
                legend: {
                    show: true,
                    noColumns: 1, // number of colums in legend table
                    labelFormatter: null, // fn: string -> string
                    labelBoxBorderColor: "#ccc", // border color for the little label boxes
                    container: null, // container (as jQuery object) to put legend in, null means default on top of graph
                    position: "ne", // position of default legend container within plot
                    margin: 5, // distance from grid edge to default legend container within plot
                    backgroundColor: null, // null means auto-detect
                    backgroundOpacity: 0.85 // set to 0 to avoid background
                },
                xaxis: {
                    mode: null, // null or "time"
                    min: null, // min. value to show, null means set automatically
                    max: null, // max. value to show, null means set automatically
                    autoscaleMargin: null, // margin in % to add if auto-setting min/max
                    ticks: null, // either [1, 3] or [[1, "a"], 3] or (fn: axis info -> ticks) or app. number of ticks for auto-ticks
                    tickFormatter: null, // fn: number -> string
                    labelWidth: null, // size of tick labels in pixels
                    labelHeight: null,
                    
                    // mode specific options
                    tickDecimals: null, // no. of decimals, null means auto
                    tickSize: null, // number or [number, "unit"]
                    minTickSize: null, // number or [number, "unit"]
                    monthNames: null, // list of names of months
                    timeformat: null // format string to use
                },
                yaxis: {
                    autoscaleMargin: 0.02
                },
                x2axis: {
                    autoscaleMargin: null
                },
                y2axis: {
                    autoscaleMargin: 0.02
                },              
                points: {
                    show: false,
                    radius: 3,
                    lineWidth: 2, // in pixels
                    fill: true,
                    fillColor: "#ffffff"
                },
                lines: {
                    show: false,
                    lineWidth: 2, // in pixels
                    fill: false,
                    fillColor: null
                },
                bars: {
                    show: false,
                    lineWidth: 2, // in pixels
                    barWidth: 1, // in units of the x axis
                    fill: true,
                    fillColor: null,
                    align: "left" // or "center"
                },
                grid: {
                    color: "#545454", // primary color used for outline and labels
                    backgroundColor: null, // null for transparent, else color
                    tickColor: "#dddddd", // color used for the ticks
                    labelMargin: 5, // in pixels
                    borderWidth: 2,
                    markings: null, // array of ranges or fn: axes -> array of ranges
                    markingsColor: "#f4f4f4",
                    markingsLineWidth: 2,
                    // interactive stuff
                    clickable: false,
                    hoverable: false,
                    autoHighlight: true, // highlight in case mouse is near
                    mouseActiveRadius: 10 // how far the mouse can be away to activate an item
                },
                selection: {
                    mode: null, // one of null, "x", "y" or "xy"
                    color: "#e8cfac"
                },
                shadowSize: 4
            },
        canvas = null,      // the canvas for the plot itself
        overlay = null,     // canvas for interactive stuff on top of plot
        eventHolder = null, // jQuery object that events should be bound to
        ctx = null, octx = null,
        target = target_,
        axes = { xaxis: {}, yaxis: {}, x2axis: {}, y2axis: {} },
        plotOffset = { left: 0, right: 0, top: 0, bottom: 0},
        canvasWidth = 0, canvasHeight = 0,
        plotWidth = 0, plotHeight = 0,
        // dedicated to storing data for buggy standard compliance cases
        workarounds = {};
        
        this.setData = setData;
        this.setupGrid = setupGrid;
        this.draw = draw;
        this.clearSelection = clearSelection;
        this.setSelection = setSelection;
        this.getCanvas = function() { return canvas; };
        this.getPlotOffset = function() { return plotOffset; };
        this.getData = function() { return series; };
        this.getAxes = function() { return axes; };
        this.highlight = highlight;
        this.unhighlight = unhighlight;
        
        // initialize
        parseOptions(options_);
        setData(data_);
        constructCanvas();
        setupGrid();
        draw();


        function setData(d) {
            series = parseData(d);

            fillInSeriesOptions();
            processData();
        }
        
        function parseData(d) {
            var res = [];
            for (var i = 0; i < d.length; ++i) {
                var s;
                if (d[i].data) {
                    s = {};
                    for (var v in d[i])
                        s[v] = d[i][v];
                }
                else {
                    s = { data: d[i] };
                }
                res.push(s);
            }

            return res;
        }
        
        function parseOptions(o) {
            $.extend(true, options, o);

            // backwards compatibility, to be removed in future
            if (options.xaxis.noTicks && options.xaxis.ticks == null)
                options.xaxis.ticks = options.xaxis.noTicks;
            if (options.yaxis.noTicks && options.yaxis.ticks == null)
                options.yaxis.ticks = options.yaxis.noTicks;
            if (options.grid.coloredAreas)
                options.grid.markings = options.grid.coloredAreas;
            if (options.grid.coloredAreasColor)
                options.grid.markingsColor = options.grid.coloredAreasColor;
        }

        function fillInSeriesOptions() {
            var i;
            
            // collect what we already got of colors
            var neededColors = series.length,
                usedColors = [],
                assignedColors = [];
            for (i = 0; i < series.length; ++i) {
                var sc = series[i].color;
                if (sc != null) {
                    --neededColors;
                    if (typeof sc == "number")
                        assignedColors.push(sc);
                    else
                        usedColors.push(parseColor(series[i].color));
                }
            }
            
            // we might need to generate more colors if higher indices
            // are assigned
            for (i = 0; i < assignedColors.length; ++i) {
                neededColors = Math.max(neededColors, assignedColors[i] + 1);
            }

            // produce colors as needed
            var colors = [], variation = 0;
            i = 0;
            while (colors.length < neededColors) {
                var c;
                if (options.colors.length == i) // check degenerate case
                    c = new Color(100, 100, 100);
                else
                    c = parseColor(options.colors[i]);

                // vary color if needed
                var sign = variation % 2 == 1 ? -1 : 1;
                var factor = 1 + sign * Math.ceil(variation / 2) * 0.2;
                c.scale(factor, factor, factor);

                // FIXME: if we're getting to close to something else,
                // we should probably skip this one
                colors.push(c);
                
                ++i;
                if (i >= options.colors.length) {
                    i = 0;
                    ++variation;
                }
            }

            // fill in the options
            var colori = 0, s;
            for (i = 0; i < series.length; ++i) {
                s = series[i];

                // assign colors
                if (s.color == null) {
                    s.color = colors[colori].toString();
                    ++colori;
                }
                else if (typeof s.color == "number")
                    s.color = colors[s.color].toString();

                // copy the rest
                s.lines = $.extend(true, {}, options.lines, s.lines);
                s.points = $.extend(true, {}, options.points, s.points);
                s.bars = $.extend(true, {}, options.bars, s.bars);
                if (s.shadowSize == null)
                    s.shadowSize = options.shadowSize;
                if (s.xaxis && s.xaxis == 2)
                    s.xaxis = axes.x2axis;
                else
                    s.xaxis = axes.xaxis;
                if (s.yaxis && s.yaxis == 2)
                    s.yaxis = axes.y2axis;
                else
                    s.yaxis = axes.yaxis;
            }
        }
        
        function processData() {
            var topSentry = Number.POSITIVE_INFINITY,
                bottomSentry = Number.NEGATIVE_INFINITY,
                axis;

            for (axis in axes) {
                axes[axis].datamin = topSentry;
                axes[axis].datamax = bottomSentry;
                axes[axis].used = false;
            }
            
            for (var i = 0; i < series.length; ++i) {
                var data = series[i].data,
                    axisx = series[i].xaxis,
                    axisy = series[i].yaxis,
                    mindelta = 0, maxdelta = 0;
                
                // make sure we got room for the bar
                if (series[i].bars.show) {
                    mindelta = series[i].bars.align == "left" ? 0 : -series[i].bars.barWidth/2;
                    maxdelta = mindelta + series[i].bars.barWidth;
                }
                
                axisx.used = axisy.used = true;
                for (var j = 0; j < data.length; ++j) {
                    if (data[j] == null)
                        continue;
                    
                    var x = data[j][0], y = data[j][1];

                    // convert to number
                    if (x != null && !isNaN(x = +x)) {
                        if (x + mindelta < axisx.datamin)
                            axisx.datamin = x + mindelta;
                        if (x + maxdelta > axisx.datamax)
                            axisx.datamax = x + maxdelta;
                    }
                    
                    if (y != null && !isNaN(y = +y)) {
                        if (y < axisy.datamin)
                            axisy.datamin = y;
                        if (y > axisy.datamax)
                            axisy.datamax = y;
                    }
                    
                    if (x == null || y == null || isNaN(x) || isNaN(y))
                        data[j] = null; // mark this point as invalid
                }
            }

            for (axis in axes) {
                if (axes[axis].datamin == topSentry)
                    axes[axis].datamin = 0;
                if (axes[axis].datamax == bottomSentry)
                    axes[axis].datamax = 1;
            }
        }

        function constructCanvas() {
            canvasWidth = target.width();
            canvasHeight = target.height();
            target.html(""); // clear target
            target.css("position", "relative"); // for positioning labels and overlay

            if (canvasWidth <= 0 || canvasHeight <= 0)
                throw "Invalid dimensions for plot, width = " + canvasWidth + ", height = " + canvasHeight;

            // the canvas
            canvas = $('<canvas width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>').appendTo(target).get(0);
            if ($.browser.msie) // excanvas hack
                canvas = window.G_vmlCanvasManager.initElement(canvas);
            ctx = canvas.getContext("2d");

            // overlay canvas for interactive features
            overlay = $('<canvas style="position:absolute;left:0px;top:0px;" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>').appendTo(target).get(0);
            if ($.browser.msie) // excanvas hack
                overlay = window.G_vmlCanvasManager.initElement(overlay);
            octx = overlay.getContext("2d");

            // we include the canvas in the event holder too, because IE 7
            // sometimes has trouble with the stacking order
            eventHolder = $([overlay, canvas]);

            // bind events
            if (options.selection.mode != null || options.grid.hoverable) {
                // FIXME: temp. work-around until jQuery bug 1871 is fixed
                eventHolder.each(function () {
                    this.onmousemove = onMouseMove;
                });

                if (options.selection.mode != null)
                    eventHolder.mousedown(onMouseDown);
            }

            if (options.grid.clickable)
                eventHolder.click(onClick);
        }

        function setupGrid() {
            function setupAxis(axis, options) {
                setRange(axis, options);
                prepareTickGeneration(axis, options);
                setTicks(axis, options);
                // add transformation helpers
                if (axis == axes.xaxis || axis == axes.x2axis) {
                    // data point to canvas coordinate
                    axis.p2c = function (p) { return (p - axis.min) * axis.scale; };
                    // canvas coordinate to data point 
                    axis.c2p = function (c) { return axis.min + c / axis.scale; };
                }
                else {
                    axis.p2c = function (p) { return (axis.max - p) * axis.scale; };
                    axis.c2p = function (p) { return axis.max - p / axis.scale; };
                }
            }

            for (var axis in axes)
                setupAxis(axes[axis], options[axis]);

            setSpacing();
            insertLabels();
            insertLegend();
        }
        
        function setRange(axis, axisOptions) {
            var min = axisOptions.min != null ? axisOptions.min : axis.datamin;
            var max = axisOptions.max != null ? axisOptions.max : axis.datamax;

            if (max - min == 0.0) {
                // degenerate case
                var widen;
                if (max == 0.0)
                    widen = 1.0;
                else
                    widen = 0.01;

                min -= widen;
                max += widen;
            }
            else {
                // consider autoscaling
                var margin = axisOptions.autoscaleMargin;
                if (margin != null) {
                    if (axisOptions.min == null) {
                        min -= (max - min) * margin;
                        // make sure we don't go below zero if all values
                        // are positive
                        if (min < 0 && axis.datamin >= 0)
                            min = 0;
                    }
                    if (axisOptions.max == null) {
                        max += (max - min) * margin;
                        if (max > 0 && axis.datamax <= 0)
                            max = 0;
                    }
                }
            }
            axis.min = min;
            axis.max = max;
        }

        function prepareTickGeneration(axis, axisOptions) {
            // estimate number of ticks
            var noTicks;
            if (typeof axisOptions.ticks == "number" && axisOptions.ticks > 0)
                noTicks = axisOptions.ticks;
            else if (axis == axes.xaxis || axis == axes.x2axis)
                noTicks = canvasWidth / 100;
            else
                noTicks = canvasHeight / 60;
            
            var delta = (axis.max - axis.min) / noTicks;
            var size, generator, unit, formatter, i, magn, norm;

            if (axisOptions.mode == "time") {
                // pretty handling of time
                
                function formatDate(d, fmt, monthNames) {
                    var leftPad = function(n) {
                        n = "" + n;
                        return n.length == 1 ? "0" + n : n;
                    };
                    
                    var r = [];
                    var escape = false;
                    if (monthNames == null)
                        monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    for (var i = 0; i < fmt.length; ++i) {
                        var c = fmt.charAt(i);
                        
                        if (escape) {
                            switch (c) {
                            case 'h': c = "" + d.getUTCHours(); break;
                            case 'H': c = leftPad(d.getUTCHours()); break;
                            case 'M': c = leftPad(d.getUTCMinutes()); break;
                            case 'S': c = leftPad(d.getUTCSeconds()); break;
                            case 'd': c = "" + d.getUTCDate(); break;
                            case 'm': c = "" + (d.getUTCMonth() + 1); break;
                            case 'y': c = "" + d.getUTCFullYear(); break;
                            case 'b': c = "" + monthNames[d.getUTCMonth()]; break;
                            }
                            r.push(c);
                            escape = false;
                        }
                        else {
                            if (c == "%")
                                escape = true;
                            else
                                r.push(c);
                        }
                    }
                    return r.join("");
                }
                
                    
                // map of app. size of time units in milliseconds
                var timeUnitSize = {
                    "second": 1000,
                    "minute": 60 * 1000,
                    "hour": 60 * 60 * 1000,
                    "day": 24 * 60 * 60 * 1000,
                    "month": 30 * 24 * 60 * 60 * 1000,
                    "year": 365.2425 * 24 * 60 * 60 * 1000
                };


                // the allowed tick sizes, after 1 year we use
                // an integer algorithm
                var spec = [
                    [1, "second"], [2, "second"], [5, "second"], [10, "second"],
                    [30, "second"], 
                    [1, "minute"], [2, "minute"], [5, "minute"], [10, "minute"],
                    [30, "minute"], 
                    [1, "hour"], [2, "hour"], [4, "hour"],
                    [8, "hour"], [12, "hour"],
                    [1, "day"], [2, "day"], [3, "day"],
                    [0.25, "month"], [0.5, "month"], [1, "month"],
                    [2, "month"], [3, "month"], [6, "month"],
                    [1, "year"]
                ];

                var minSize = 0;
                if (axisOptions.minTickSize != null) {
                    if (typeof axisOptions.tickSize == "number")
                        minSize = axisOptions.tickSize;
                    else
                        minSize = axisOptions.minTickSize[0] * timeUnitSize[axisOptions.minTickSize[1]];
                }

                for (i = 0; i < spec.length - 1; ++i)
                    if (delta < (spec[i][0] * timeUnitSize[spec[i][1]]
                                 + spec[i + 1][0] * timeUnitSize[spec[i + 1][1]]) / 2
                       && spec[i][0] * timeUnitSize[spec[i][1]] >= minSize)
                        break;
                size = spec[i][0];
                unit = spec[i][1];
                
                // special-case the possibility of several years
                if (unit == "year") {
                    magn = Math.pow(10, Math.floor(Math.log(delta / timeUnitSize.year) / Math.LN10));
                    norm = (delta / timeUnitSize.year) / magn;
                    if (norm < 1.5)
                        size = 1;
                    else if (norm < 3)
                        size = 2;
                    else if (norm < 7.5)
                        size = 5;
                    else
                        size = 10;

                    size *= magn;
                }

                if (axisOptions.tickSize) {
                    size = axisOptions.tickSize[0];
                    unit = axisOptions.tickSize[1];
                }
                
                generator = function(axis) {
                    var ticks = [],
                        tickSize = axis.tickSize[0], unit = axis.tickSize[1],
                        d = new Date(axis.min);
                    
                    var step = tickSize * timeUnitSize[unit];

                    if (unit == "second")
                        d.setUTCSeconds(floorInBase(d.getUTCSeconds(), tickSize));
                    if (unit == "minute")
                        d.setUTCMinutes(floorInBase(d.getUTCMinutes(), tickSize));
                    if (unit == "hour")
                        d.setUTCHours(floorInBase(d.getUTCHours(), tickSize));
                    if (unit == "month")
                        d.setUTCMonth(floorInBase(d.getUTCMonth(), tickSize));
                    if (unit == "year")
                        d.setUTCFullYear(floorInBase(d.getUTCFullYear(), tickSize));
                    
                    // reset smaller components
                    d.setUTCMilliseconds(0);
                    if (step >= timeUnitSize.minute)
                        d.setUTCSeconds(0);
                    if (step >= timeUnitSize.hour)
                        d.setUTCMinutes(0);
                    if (step >= timeUnitSize.day)
                        d.setUTCHours(0);
                    if (step >= timeUnitSize.day * 4)
                        d.setUTCDate(1);
                    if (step >= timeUnitSize.year)
                        d.setUTCMonth(0);


                    var carry = 0, v = Number.NaN, prev;
                    do {
                        prev = v;
                        v = d.getTime();
                        ticks.push({ v: v, label: axis.tickFormatter(v, axis) });
                        if (unit == "month") {
                            if (tickSize < 1) {
                                // a bit complicated - we'll divide the month
                                // up but we need to take care of fractions
                                // so we don't end up in the middle of a day
                                d.setUTCDate(1);
                                var start = d.getTime();
                                d.setUTCMonth(d.getUTCMonth() + 1);
                                var end = d.getTime();
                                d.setTime(v + carry * timeUnitSize.hour + (end - start) * tickSize);
                                carry = d.getUTCHours();
                                d.setUTCHours(0);
                            }
                            else
                                d.setUTCMonth(d.getUTCMonth() + tickSize);
                        }
                        else if (unit == "year") {
                            d.setUTCFullYear(d.getUTCFullYear() + tickSize);
                        }
                        else
                            d.setTime(v + step);
                    } while (v < axis.max && v != prev);

                    return ticks;
                };

                formatter = function (v, axis) {
                    var d = new Date(v);

                    // first check global format
                    if (axisOptions.timeformat != null)
                        return formatDate(d, axisOptions.timeformat, axisOptions.monthNames);
                    
                    var t = axis.tickSize[0] * timeUnitSize[axis.tickSize[1]];
                    var span = axis.max - axis.min;
                    
                    if (t < timeUnitSize.minute)
                        fmt = "%h:%M:%S";
                    else if (t < timeUnitSize.day) {
                        if (span < 2 * timeUnitSize.day)
                            fmt = "%h:%M";
                        else
                            fmt = "%b %d %h:%M";
                    }
                    else if (t < timeUnitSize.month)
                        fmt = "%b %d";
                    else if (t < timeUnitSize.year) {
                        if (span < timeUnitSize.year)
                            fmt = "%b";
                        else
                            fmt = "%b %y";
                    }
                    else
                        fmt = "%y";
                    
                    return formatDate(d, fmt, axisOptions.monthNames);
                };
            }
            else {
                // pretty rounding of base-10 numbers
                var maxDec = axisOptions.tickDecimals;
                var dec = -Math.floor(Math.log(delta) / Math.LN10);
                if (maxDec != null && dec > maxDec)
                    dec = maxDec;
                
                magn = Math.pow(10, -dec);
                norm = delta / magn; // norm is between 1.0 and 10.0
                
                if (norm < 1.5)
                    size = 1;
                else if (norm < 3) {
                    size = 2;
                    // special case for 2.5, requires an extra decimal
                    if (norm > 2.25 && (maxDec == null || dec + 1 <= maxDec)) {
                        size = 2.5;
                        ++dec;
                    }
                }
                else if (norm < 7.5)
                    size = 5;
                else
                    size = 10;

                size *= magn;
                
                if (axisOptions.minTickSize != null && size < axisOptions.minTickSize)
                    size = axisOptions.minTickSize;

                if (axisOptions.tickSize != null)
                    size = axisOptions.tickSize;
                
                axis.tickDecimals = Math.max(0, (maxDec != null) ? maxDec : dec);
                
                generator = function (axis) {
                    var ticks = [];

                    // spew out all possible ticks
                    var start = floorInBase(axis.min, axis.tickSize),
                        i = 0, v = Number.NaN, prev;
                    do {
                        prev = v;
                        v = start + i * axis.tickSize;
                        ticks.push({ v: v, label: axis.tickFormatter(v, axis) });
                        ++i;
                    } while (v < axis.max && v != prev);
                    return ticks;
                };

                formatter = function (v, axis) {
                    return v.toFixed(axis.tickDecimals);
                };
            }

            axis.tickSize = unit ? [size, unit] : size;
            axis.tickGenerator = generator;
            if ($.isFunction(axisOptions.tickFormatter))
                axis.tickFormatter = function (v, axis) { return "" + axisOptions.tickFormatter(v, axis); };
            else
                axis.tickFormatter = formatter;
            if (axisOptions.labelWidth != null)
                axis.labelWidth = axisOptions.labelWidth;
            if (axisOptions.labelHeight != null)
                axis.labelHeight = axisOptions.labelHeight;
        }
        
        function setTicks(axis, axisOptions) {
            axis.ticks = [];

            if (!axis.used)
                return;
            
            if (axisOptions.ticks == null)
                axis.ticks = axis.tickGenerator(axis);
            else if (typeof axisOptions.ticks == "number") {
                if (axisOptions.ticks > 0)
                    axis.ticks = axis.tickGenerator(axis);
            }
            else if (axisOptions.ticks) {
                var ticks = axisOptions.ticks;

                if ($.isFunction(ticks))
                    // generate the ticks
                    ticks = ticks({ min: axis.min, max: axis.max });
                
                // clean up the user-supplied ticks, copy them over
                var i, v;
                for (i = 0; i < ticks.length; ++i) {
                    var label = null;
                    var t = ticks[i];
                    if (typeof t == "object") {
                        v = t[0];
                        if (t.length > 1)
                            label = t[1];
                    }
                    else
                        v = t;
                    if (label == null)
                        label = axis.tickFormatter(v, axis);
                    axis.ticks[i] = { v: v, label: label };
                }
            }

            if (axisOptions.autoscaleMargin != null && axis.ticks.length > 0) {
                // snap to ticks
                if (axisOptions.min == null)
                    axis.min = Math.min(axis.min, axis.ticks[0].v);
                if (axisOptions.max == null && axis.ticks.length > 1)
                    axis.max = Math.min(axis.max, axis.ticks[axis.ticks.length - 1].v);
            }
        }
        
        function setSpacing() {
            function measureXLabels(axis) {
                // to avoid measuring the widths of the labels, we
                // construct fixed-size boxes and put the labels inside
                // them, we don't need the exact figures and the
                // fixed-size box content is easy to center
                if (axis.labelWidth == null)
                    axis.labelWidth = canvasWidth / 6;

                // measure x label heights
                if (axis.labelHeight == null) {
                    labels = [];
                    for (i = 0; i < axis.ticks.length; ++i) {
                        l = axis.ticks[i].label;
                        if (l)
                            labels.push('<div class="tickLabel" style="float:left;width:' + axis.labelWidth + 'px">' + l + '</div>');
                    }
                    
                    axis.labelHeight = 0;
                    if (labels.length > 0) {
                        var dummyDiv = $('<div style="position:absolute;top:-10000px;width:10000px;font-size:smaller">'
                                         + labels.join("") + '<div style="clear:left"></div></div>').appendTo(target);
                        axis.labelHeight = dummyDiv.height();
                        dummyDiv.remove();
                    }
                }
            }
            
            function measureYLabels(axis) {
                if (axis.labelWidth == null || axis.labelHeight == null) {
                    var i, labels = [], l;
                    // calculate y label dimensions
                    for (i = 0; i < axis.ticks.length; ++i) {
                        l = axis.ticks[i].label;
                        if (l)
                            labels.push('<div class="tickLabel">' + l + '</div>');
                    }
                    
                    if (labels.length > 0) {
                        var dummyDiv = $('<div style="position:absolute;top:-10000px;font-size:smaller">'
                                         + labels.join("") + '</div>').appendTo(target);
                        if (axis.labelWidth == null)
                            axis.labelWidth = dummyDiv.width();
                        if (axis.labelHeight == null)
                            axis.labelHeight = dummyDiv.find("div").height();
                        dummyDiv.remove();
                    }
                    
                    if (axis.labelWidth == null)
                        axis.labelWidth = 0;
                    if (axis.labelHeight == null)
                        axis.labelHeight = 0;
                }
            }
            
            measureXLabels(axes.xaxis);
            measureYLabels(axes.yaxis);
            measureXLabels(axes.x2axis);
            measureYLabels(axes.y2axis);

            // get the most space needed around the grid for things
            // that may stick out
            var maxOutset = options.grid.borderWidth / 2;
            for (i = 0; i < series.length; ++i)
                maxOutset = Math.max(maxOutset, 2 * (series[i].points.radius + series[i].points.lineWidth/2));

            plotOffset.left = plotOffset.right = plotOffset.top = plotOffset.bottom = maxOutset;

            if (axes.xaxis.labelHeight > 0)
                plotOffset.bottom = Math.max(maxOutset, axes.xaxis.labelHeight + options.grid.labelMargin);
            if (axes.yaxis.labelWidth > 0)
                plotOffset.left = Math.max(maxOutset, axes.yaxis.labelWidth + options.grid.labelMargin);

            if (axes.x2axis.labelHeight > 0)
                plotOffset.top = Math.max(maxOutset, axes.x2axis.labelHeight + options.grid.labelMargin);
            
            if (axes.y2axis.labelWidth > 0)
                plotOffset.right = Math.max(maxOutset, axes.y2axis.labelWidth + options.grid.labelMargin);

            plotWidth = canvasWidth - plotOffset.left - plotOffset.right;
            plotHeight = canvasHeight - plotOffset.bottom - plotOffset.top;

            // precompute how much the axis is scaling a point in canvas space
            axes.xaxis.scale = plotWidth / (axes.xaxis.max - axes.xaxis.min);
            axes.yaxis.scale = plotHeight / (axes.yaxis.max - axes.yaxis.min);
            axes.x2axis.scale = plotWidth / (axes.x2axis.max - axes.x2axis.min);
            axes.y2axis.scale = plotHeight / (axes.y2axis.max - axes.y2axis.min);
        }
        
        function draw() {
            drawGrid();
            for (var i = 0; i < series.length; i++) {
                drawSeries(series[i]);
            }
        }

        function extractRange(ranges, coord) {
            var firstAxis = coord + "axis",
                secondaryAxis = coord + "2axis",
                axis, from, to, reverse;

            if (ranges[firstAxis]) {
                axis = axes[firstAxis];
                from = ranges[firstAxis].from;
                to = ranges[firstAxis].to;
            }
            else if (ranges[secondaryAxis]) {
                axis = axes[secondaryAxis];
                from = ranges[secondaryAxis].from;
                to = ranges[secondaryAxis].to;
            }
            else {
                // backwards-compat stuff - to be removed in future
                axis = axes[firstAxis];
                from = ranges[coord + "1"];
                to = ranges[coord + "2"];
            }

            // auto-reverse as an added bonus
            if (from != null && to != null && from > to)
                return { from: to, to: from, axis: axis };
            
            return { from: from, to: to, axis: axis };
        }
        
        function drawGrid() {
            var i;
            
            ctx.save();
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.translate(plotOffset.left, plotOffset.top);

            // draw background, if any
            if (options.grid.backgroundColor) {
                ctx.fillStyle = options.grid.backgroundColor;
                ctx.fillRect(0, 0, plotWidth, plotHeight);
            }

            // draw markings
            if (options.grid.markings) {
                var markings = options.grid.markings;
                if ($.isFunction(markings))
                    // xmin etc. are backwards-compatible, to be removed in future
                    markings = markings({ xmin: axes.xaxis.min, xmax: axes.xaxis.max, ymin: axes.yaxis.min, ymax: axes.yaxis.max, xaxis: axes.xaxis, yaxis: axes.yaxis, x2axis: axes.x2axis, y2axis: axes.y2axis });

                for (i = 0; i < markings.length; ++i) {
                    var m = markings[i],
                        xrange = extractRange(m, "x"),
                        yrange = extractRange(m, "y");

                    // fill in missing
                    if (xrange.from == null)
                        xrange.from = xrange.axis.min;
                    if (xrange.to == null)
                        xrange.to = xrange.axis.max;
                    if (yrange.from == null)
                        yrange.from = yrange.axis.min;
                    if (yrange.to == null)
                        yrange.to = yrange.axis.max;

                    // clip
                    if (xrange.to < xrange.axis.min || xrange.from > xrange.axis.max ||
                        yrange.to < yrange.axis.min || yrange.from > yrange.axis.max)
                        continue;

                    xrange.from = Math.max(xrange.from, xrange.axis.min);
                    xrange.to = Math.min(xrange.to, xrange.axis.max);
                    yrange.from = Math.max(yrange.from, yrange.axis.min);
                    yrange.to = Math.min(yrange.to, yrange.axis.max);

                    if (xrange.from == xrange.to && yrange.from == yrange.to)
                        continue;

                    // then draw
                    xrange.from = xrange.axis.p2c(xrange.from);
                    xrange.to = xrange.axis.p2c(xrange.to);
                    yrange.from = yrange.axis.p2c(yrange.from);
                    yrange.to = yrange.axis.p2c(yrange.to);
                    
                    if (xrange.from == xrange.to || yrange.from == yrange.to) {
                        // draw line
                        ctx.strokeStyle = m.color || options.grid.markingsColor;
                        ctx.lineWidth = m.lineWidth || options.grid.markingsLineWidth;
                        ctx.moveTo(Math.floor(xrange.from), Math.floor(yrange.from));
                        ctx.lineTo(Math.floor(xrange.to), Math.floor(yrange.to));
                        ctx.stroke();
                    }
                    else {
                        // fill area
                        ctx.fillStyle = m.color || options.grid.markingsColor;
                        ctx.fillRect(Math.floor(xrange.from),
                                     Math.floor(yrange.to),
                                     Math.floor(xrange.to - xrange.from),
                                     Math.floor(yrange.from - yrange.to));
                    }
                }
            }
            
            // draw the inner grid
            ctx.lineWidth = 1;
            ctx.strokeStyle = options.grid.tickColor;
            ctx.beginPath();
            var v, axis = axes.xaxis;
            for (i = 0; i < axis.ticks.length; ++i) {
                v = axis.ticks[i].v;
                if (v <= axis.min || v >= axes.xaxis.max)
                    continue;   // skip those lying on the axes

                ctx.moveTo(Math.floor(axis.p2c(v)) + ctx.lineWidth/2, 0);
                ctx.lineTo(Math.floor(axis.p2c(v)) + ctx.lineWidth/2, plotHeight);
            }

            axis = axes.yaxis;
            for (i = 0; i < axis.ticks.length; ++i) {
                v = axis.ticks[i].v;
                if (v <= axis.min || v >= axis.max)
                    continue;

                ctx.moveTo(0, Math.floor(axis.p2c(v)) + ctx.lineWidth/2);
                ctx.lineTo(plotWidth, Math.floor(axis.p2c(v)) + ctx.lineWidth/2);
            }

            axis = axes.x2axis;
            for (i = 0; i < axis.ticks.length; ++i) {
                v = axis.ticks[i].v;
                if (v <= axis.min || v >= axis.max)
                    continue;
    
                ctx.moveTo(Math.floor(axis.p2c(v)) + ctx.lineWidth/2, -5);
                ctx.lineTo(Math.floor(axis.p2c(v)) + ctx.lineWidth/2, 5);
            }

            axis = axes.y2axis;
            for (i = 0; i < axis.ticks.length; ++i) {
                v = axis.ticks[i].v;
                if (v <= axis.min || v >= axis.max)
                    continue;

                ctx.moveTo(plotWidth-5, Math.floor(axis.p2c(v)) + ctx.lineWidth/2);
                ctx.lineTo(plotWidth+5, Math.floor(axis.p2c(v)) + ctx.lineWidth/2);
            }
            
            ctx.stroke();
            
            if (options.grid.borderWidth) {
                // draw border
                ctx.lineWidth = options.grid.borderWidth;
                ctx.strokeStyle = options.grid.color;
                ctx.lineJoin = "round";
                ctx.strokeRect(0, 0, plotWidth, plotHeight);
            }

            ctx.restore();
        }
        
        function insertLabels() {
            target.find(".tickLabels").remove();
            
            var html = '<div class="tickLabels" style="font-size:smaller;color:' + options.grid.color + '">';

            function addLabels(axis, labelGenerator) {
                for (var i = 0; i < axis.ticks.length; ++i) {
                    var tick = axis.ticks[i];
                    if (!tick.label || tick.v < axis.min || tick.v > axis.max)
                        continue;
                    html += labelGenerator(tick, axis);
                }
            }
            
            addLabels(axes.xaxis, function (tick, axis) {
                return '<div style="position:absolute;top:' + (plotOffset.top + plotHeight + options.grid.labelMargin) + 'px;left:' + (plotOffset.left + axis.p2c(tick.v) - axis.labelWidth/2) + 'px;width:' + axis.labelWidth + 'px;text-align:center" class="tickLabel">' + tick.label + "</div>";
            });
            
            
            addLabels(axes.yaxis, function (tick, axis) {
                return '<div style="position:absolute;top:' + (plotOffset.top + axis.p2c(tick.v) - axis.labelHeight/2) + 'px;right:' + (plotOffset.right + plotWidth + options.grid.labelMargin) + 'px;width:' + axis.labelWidth + 'px;text-align:right" class="tickLabel">' + tick.label + "</div>";
            });
            
            addLabels(axes.x2axis, function (tick, axis) {
                return '<div style="position:absolute;bottom:' + (plotOffset.bottom + plotHeight + options.grid.labelMargin) + 'px;left:' + (plotOffset.left + axis.p2c(tick.v) - axis.labelWidth/2) + 'px;width:' + axis.labelWidth + 'px;text-align:center" class="tickLabel">' + tick.label + "</div>";
            });
            
            addLabels(axes.y2axis, function (tick, axis) {
                return '<div style="position:absolute;top:' + (plotOffset.top + axis.p2c(tick.v) - axis.labelHeight/2) + 'px;left:' + (plotOffset.left + plotWidth + options.grid.labelMargin) +'px;width:' + axis.labelWidth + 'px;text-align:left" class="tickLabel">' + tick.label + "</div>";
            });

            html += '</div>';
            
            target.append(html);
        }

        function drawSeries(series) {
            if (series.lines.show || (!series.bars.show && !series.points.show))
                drawSeriesLines(series);
            if (series.bars.show)
                drawSeriesBars(series);
            if (series.points.show)
                drawSeriesPoints(series);
        }
        
        function drawSeriesLines(series) {
            function plotLine(data, offset, axisx, axisy) {
                var prev, cur = null, drawx = null, drawy = null;
                
                ctx.beginPath();
                for (var i = 0; i < data.length; ++i) {
                    prev = cur;
                    cur = data[i];

                    if (prev == null || cur == null)
                        continue;
                    
                    var x1 = prev[0], y1 = prev[1],
                        x2 = cur[0], y2 = cur[1];

                    // clip with ymin
                    if (y1 <= y2 && y1 < axisy.min) {
                        if (y2 < axisy.min)
                            continue;   // line segment is outside
                        // compute new intersection point
                        x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.min;
                    }
                    else if (y2 <= y1 && y2 < axisy.min) {
                        if (y1 < axisy.min)
                            continue;
                        x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.min;
                    }

                    // clip with ymax
                    if (y1 >= y2 && y1 > axisy.max) {
                        if (y2 > axisy.max)
                            continue;
                        x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.max;
                    }
                    else if (y2 >= y1 && y2 > axisy.max) {
                        if (y1 > axisy.max)
                            continue;
                        x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.max;
                    }

                    // clip with xmin
                    if (x1 <= x2 && x1 < axisx.min) {
                        if (x2 < axisx.min)
                            continue;
                        y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.min;
                    }
                    else if (x2 <= x1 && x2 < axisx.min) {
                        if (x1 < axisx.min)
                            continue;
                        y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.min;
                    }

                    // clip with xmax
                    if (x1 >= x2 && x1 > axisx.max) {
                        if (x2 > axisx.max)
                            continue;
                        y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.max;
                    }
                    else if (x2 >= x1 && x2 > axisx.max) {
                        if (x1 > axisx.max)
                            continue;
                        y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.max;
                    }

                    if (drawx != axisx.p2c(x1) || drawy != axisy.p2c(y1) + offset)
                        ctx.moveTo(axisx.p2c(x1), axisy.p2c(y1) + offset);
                    
                    drawx = axisx.p2c(x2);
                    drawy = axisy.p2c(y2) + offset;
                    ctx.lineTo(drawx, drawy);
                }
                ctx.stroke();
            }

            function plotLineArea(data, axisx, axisy) {
                var prev, cur = null;
                
                var bottom = Math.min(Math.max(0, axisy.min), axisy.max);
                var top, lastX = 0;

                var areaOpen = false;
                
                for (var i = 0; i < data.length; ++i) {
                    prev = cur;
                    cur = data[i];

                    if (areaOpen && prev != null && cur == null) {
                        // close area
                        ctx.lineTo(axisx.p2c(lastX), axisy.p2c(bottom));
                        ctx.fill();
                        areaOpen = false;
                        continue;
                    }

                    if (prev == null || cur == null)
                        continue;
                        
                    var x1 = prev[0], y1 = prev[1],
                        x2 = cur[0], y2 = cur[1];

                    // clip x values
                    
                    // clip with xmin
                    if (x1 <= x2 && x1 < axisx.min) {
                        if (x2 < axisx.min)
                            continue;
                        y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.min;
                    }
                    else if (x2 <= x1 && x2 < axisx.min) {
                        if (x1 < axisx.min)
                            continue;
                        y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.min;
                    }

                    // clip with xmax
                    if (x1 >= x2 && x1 > axisx.max) {
                        if (x2 > axisx.max)
                            continue;
                        y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.max;
                    }
                    else if (x2 >= x1 && x2 > axisx.max) {
                        if (x1 > axisx.max)
                            continue;
                        y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.max;
                    }

                    if (!areaOpen) {
                        // open area
                        ctx.beginPath();
                        ctx.moveTo(axisx.p2c(x1), axisy.p2c(bottom));
                        areaOpen = true;
                    }
                    
                    // now first check the case where both is outside
                    if (y1 >= axisy.max && y2 >= axisy.max) {
                        ctx.lineTo(axisx.p2c(x1), axisy.p2c(axisy.max));
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(axisy.max));
                        continue;
                    }
                    else if (y1 <= axisy.min && y2 <= axisy.min) {
                        ctx.lineTo(axisx.p2c(x1), axisy.p2c(axisy.min));
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(axisy.min));
                        continue;
                    }
                    
                    // else it's a bit more complicated, there might
                    // be two rectangles and two triangles we need to fill
                    // in; to find these keep track of the current x values
                    var x1old = x1, x2old = x2;

                    // and clip the y values, without shortcutting
                    
                    // clip with ymin
                    if (y1 <= y2 && y1 < axisy.min && y2 >= axisy.min) {
                        x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.min;
                    }
                    else if (y2 <= y1 && y2 < axisy.min && y1 >= axisy.min) {
                        x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.min;
                    }

                    // clip with ymax
                    if (y1 >= y2 && y1 > axisy.max && y2 <= axisy.max) {
                        x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.max;
                    }
                    else if (y2 >= y1 && y2 > axisy.max && y1 <= axisy.max) {
                        x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.max;
                    }


                    // if the x value was changed we got a rectangle
                    // to fill
                    if (x1 != x1old) {
                        if (y1 <= axisy.min)
                            top = axisy.min;
                        else
                            top = axisy.max;
                        
                        ctx.lineTo(axisx.p2c(x1old), axisy.p2c(top));
                        ctx.lineTo(axisx.p2c(x1), axisy.p2c(top));
                    }
                    
                    // fill the triangles
                    ctx.lineTo(axisx.p2c(x1), axisy.p2c(y1));
                    ctx.lineTo(axisx.p2c(x2), axisy.p2c(y2));

                    // fill the other rectangle if it's there
                    if (x2 != x2old) {
                        if (y2 <= axisy.min)
                            top = axisy.min;
                        else
                            top = axisy.max;
                        
                        ctx.lineTo(axisx.p2c(x2old), axisy.p2c(top));
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(top));
                    }

                    lastX = Math.max(x2, x2old);
                }

                if (areaOpen) {
                    ctx.lineTo(axisx.p2c(lastX), axisy.p2c(bottom));
                    ctx.fill();
                }
            }
            
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            ctx.lineJoin = "round";

            var lw = series.lines.lineWidth;
            var sw = series.shadowSize;
            // FIXME: consider another form of shadow when filling is turned on
            if (sw > 0) {
                // draw shadow in two steps
                ctx.lineWidth = sw / 2;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                plotLine(series.data, lw/2 + sw/2 + ctx.lineWidth/2, series.xaxis, series.yaxis);

                ctx.lineWidth = sw / 2;
                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                plotLine(series.data, lw/2 + ctx.lineWidth/2, series.xaxis, series.yaxis);
            }

            ctx.lineWidth = lw;
            ctx.strokeStyle = series.color;
            setFillStyle(series.lines, series.color);
            if (series.lines.fill)
                plotLineArea(series.data, series.xaxis, series.yaxis);
            plotLine(series.data, 0, series.xaxis, series.yaxis);
            ctx.restore();
        }

        function drawSeriesPoints(series) {
            function plotPoints(data, radius, fill, axisx, axisy) {
                for (var i = 0; i < data.length; ++i) {
                    if (data[i] == null)
                        continue;
                    
                    var x = data[i][0], y = data[i][1];
                    if (x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
                        continue;
                    
                    ctx.beginPath();
                    ctx.arc(axisx.p2c(x), axisy.p2c(y), radius, 0, 2 * Math.PI, true);
                    if (fill)
                        ctx.fill();
                    ctx.stroke();
                }
            }

            function plotPointShadows(data, offset, radius, axisx, axisy) {
                for (var i = 0; i < data.length; ++i) {
                    if (data[i] == null)
                        continue;
                    
                    var x = data[i][0], y = data[i][1];
                    if (x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
                        continue;
                    ctx.beginPath();
                    ctx.arc(axisx.p2c(x), axisy.p2c(y) + offset, radius, 0, Math.PI, false);
                    ctx.stroke();
                }
            }
            
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);

            var lw = series.lines.lineWidth;
            var sw = series.shadowSize;
            if (sw > 0) {
                // draw shadow in two steps
                ctx.lineWidth = sw / 2;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                plotPointShadows(series.data, sw/2 + ctx.lineWidth/2,
                                 series.points.radius, series.xaxis, series.yaxis);

                ctx.lineWidth = sw / 2;
                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                plotPointShadows(series.data, ctx.lineWidth/2,
                                 series.points.radius, series.xaxis, series.yaxis);
            }

            ctx.lineWidth = series.points.lineWidth;
            ctx.strokeStyle = series.color;
            setFillStyle(series.points, series.color);
            plotPoints(series.data, series.points.radius, series.points.fill,
                       series.xaxis, series.yaxis);
            ctx.restore();
        }

        function drawBar(x, y, barLeft, barRight, offset, fill, axisx, axisy, c) {
            var drawLeft = true, drawRight = true,
                drawTop = true, drawBottom = false,
                left = x + barLeft, right = x + barRight,
                bottom = 0, top = y;

            // account for negative bars
            if (top < bottom) {
                top = 0;
                bottom = y;
                drawBottom = true;
                drawTop = false;
            }
            
            // clip
            if (right < axisx.min || left > axisx.max ||
                top < axisy.min || bottom > axisy.max)
                return;
            
            if (left < axisx.min) {
                left = axisx.min;
                drawLeft = false;
            }

            if (right > axisx.max) {
                right = axisx.max;
                drawRight = false;
            }

            if (bottom < axisy.min) {
                bottom = axisy.min;
                drawBottom = false;
            }
            
            if (top > axisy.max) {
                top = axisy.max;
                drawTop = false;
            }

            // fill the bar
            if (fill) {
                c.beginPath();
                c.moveTo(axisx.p2c(left), axisy.p2c(bottom) + offset);
                c.lineTo(axisx.p2c(left), axisy.p2c(top) + offset);
                c.lineTo(axisx.p2c(right), axisy.p2c(top) + offset);
                c.lineTo(axisx.p2c(right), axisy.p2c(bottom) + offset);
                c.fill();
            }

            // draw outline
            if (drawLeft || drawRight || drawTop || drawBottom) {
                c.beginPath();
                left = axisx.p2c(left);
                bottom = axisy.p2c(bottom);
                right = axisx.p2c(right);
                top = axisy.p2c(top);
                
                c.moveTo(left, bottom + offset);
                if (drawLeft)
                    c.lineTo(left, top + offset);
                else
                    c.moveTo(left, top + offset);
                if (drawTop)
                    c.lineTo(right, top + offset);
                else
                    c.moveTo(right, top + offset);
                if (drawRight)
                    c.lineTo(right, bottom + offset);
                else
                    c.moveTo(right, bottom + offset);
                if (drawBottom)
                    c.lineTo(left, bottom + offset);
                else
                    c.moveTo(left, bottom + offset);
                c.stroke();
            }
        }
        
        function drawSeriesBars(series) {
            function plotBars(data, barLeft, barRight, offset, fill, axisx, axisy) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i] == null)
                        continue;
                    drawBar(data[i][0], data[i][1], barLeft, barRight, offset, fill, axisx, axisy, ctx);
                }
            }

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            ctx.lineJoin = "round";

            // FIXME: figure out a way to add shadows
            /*
            var bw = series.bars.barWidth;
            var lw = series.bars.lineWidth;
            var sw = series.shadowSize;
            if (sw > 0) {
                // draw shadow in two steps
                ctx.lineWidth = sw / 2;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                plotBars(series.data, bw, lw/2 + sw/2 + ctx.lineWidth/2, false);

                ctx.lineWidth = sw / 2;
                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                plotBars(series.data, bw, lw/2 + ctx.lineWidth/2, false);
            }*/

            ctx.lineWidth = series.bars.lineWidth;
            ctx.strokeStyle = series.color;
            setFillStyle(series.bars, series.color);
            var barLeft = series.bars.align == "left" ? 0 : -series.bars.barWidth/2;
            plotBars(series.data, barLeft, barLeft + series.bars.barWidth, 0, series.bars.fill, series.xaxis, series.yaxis);
            ctx.restore();
        }

        function setFillStyle(obj, seriesColor) {
            var fill = obj.fill;
            if (!fill)
                return;
            
            if (obj.fillColor)
                ctx.fillStyle = obj.fillColor;
            else {
                var c = parseColor(seriesColor);
                c.a = typeof fill == "number" ? fill : 0.4;
                c.normalize();
                ctx.fillStyle = c.toString();
            }
        }
        
        function insertLegend() {
            target.find(".legend").remove();

            if (!options.legend.show)
                return;
            
            var fragments = [];
            var rowStarted = false;
            for (i = 0; i < series.length; ++i) {
                if (!series[i].label)
                    continue;
                
                if (i % options.legend.noColumns == 0) {
                    if (rowStarted)
                        fragments.push('</tr>');
                    fragments.push('<tr>');
                    rowStarted = true;
                }

                var label = series[i].label;
                if (options.legend.labelFormatter != null)
                    label = options.legend.labelFormatter(label);
                
                fragments.push(
                    '<td class="legendColorBox"><div style="border:1px solid ' + options.legend.labelBoxBorderColor + ';padding:1px"><div style="width:14px;height:10px;background-color:' + series[i].color + ';overflow:hidden"></div></div></td>' +
                    '<td class="legendLabel">' + label + '</td>');
            }
            if (rowStarted)
                fragments.push('</tr>');
            
            if (fragments.length == 0)
                return;

            var table = '<table style="font-size:smaller;color:' + options.grid.color + '">' + fragments.join("") + '</table>';
            if (options.legend.container != null)
                options.legend.container.html(table);
            else {
                var pos = "";
                var p = options.legend.position, m = options.legend.margin;
                if (p.charAt(0) == "n")
                    pos += 'top:' + (m + plotOffset.top) + 'px;';
                else if (p.charAt(0) == "s")
                    pos += 'bottom:' + (m + plotOffset.bottom) + 'px;';
                if (p.charAt(1) == "e")
                    pos += 'right:' + (m + plotOffset.right) + 'px;';
                else if (p.charAt(1) == "w")
                    pos += 'left:' + (m + plotOffset.left) + 'px;';
                var legend = $('<div class="legend">' + table.replace('style="', 'style="position:absolute;' + pos +';') + '</div>').appendTo(target);
                if (options.legend.backgroundOpacity != 0.0) {
                    // put in the transparent background
                    // separately to avoid blended labels and
                    // label boxes
                    var c = options.legend.backgroundColor;
                    if (c == null) {
                        var tmp;
                        if (options.grid.backgroundColor)
                            tmp = options.grid.backgroundColor;
                        else
                            tmp = extractColor(legend);
                        c = parseColor(tmp).adjust(null, null, null, 1).toString();
                    }
                    var div = legend.children();
                    $('<div style="position:absolute;width:' + div.width() + 'px;height:' + div.height() + 'px;' + pos +'background-color:' + c + ';"> </div>').prependTo(legend).css('opacity', options.legend.backgroundOpacity);
                    
                }
            }
        }


        // interactive features
        
        var lastMousePos = { pageX: null, pageY: null },
            selection = {
                first: { x: -1, y: -1}, second: { x: -1, y: -1},
                show: false, active: false },
            highlights = [],
            clickIsMouseUp = false,
            redrawTimeout = null,
            hoverTimeout = null;
        
        // Returns the data item the mouse is over, or null if none is found
        function findNearbyItem(mouseX, mouseY) {
            var maxDistance = options.grid.mouseActiveRadius,
                lowestDistance = maxDistance * maxDistance + 1,
                item = null, foundPoint = false;

            function result(i, j) {
                return { datapoint: series[i].data[j],
                         dataIndex: j,
                         series: series[i],
                         seriesIndex: i };
            }
            
            for (var i = 0; i < series.length; ++i) {
                var data = series[i].data,
                    axisx = series[i].xaxis,
                    axisy = series[i].yaxis,
                
                    // precompute some stuff to make the loop faster
                    mx = axisx.c2p(mouseX),
                    my = axisy.c2p(mouseY),
                    maxx = maxDistance / axisx.scale,
                    maxy = maxDistance / axisy.scale,
                    checkbar = series[i].bars.show,
                    checkpoint = !(series[i].bars.show && !(series[i].lines.show || series[i].points.show)),
                    barLeft = series[i].bars.align == "left" ? 0 : -series[i].bars.barWidth/2,
                    barRight = barLeft + series[i].bars.barWidth;
                for (var j = 0; j < data.length; ++j) {
                    if (data[j] == null)
                        continue;

                    var x = data[j][0], y = data[j][1];
  
                    if (checkbar) {
                        // For a bar graph, the cursor must be inside the bar
                        // and no other point can be nearby
                        if (!foundPoint && mx >= x + barLeft &&
                            mx <= x + barRight &&
                            my >= Math.min(0, y) && my <= Math.max(0, y))
                            item = result(i, j);
                    }
 
                    if (checkpoint) {
                        // For points and lines, the cursor must be within a
                        // certain distance to the data point
 
                        // check bounding box first
                        if ((x - mx > maxx || x - mx < -maxx) ||
                            (y - my > maxy || y - my < -maxy))
                            continue;

                        // We have to calculate distances in pixels, not in
                        // data units, because the scale of the axes may be different
                        var dx = Math.abs(axisx.p2c(x) - mouseX),
                            dy = Math.abs(axisy.p2c(y) - mouseY),
                            dist = dx * dx + dy * dy;
                        if (dist < lowestDistance) {
                            lowestDistance = dist;
                            foundPoint = true;
                            item = result(i, j);
                        }
                    }
                }
            }

            return item;
        }

        function onMouseMove(ev) {
            // FIXME: temp. work-around until jQuery bug 1871 is fixed
            var e = ev || window.event;
            if (e.pageX == null && e.clientX != null) {
                var de = document.documentElement, b = document.body;
                lastMousePos.pageX = e.clientX + (de && de.scrollLeft || b.scrollLeft || 0);
                lastMousePos.pageY = e.clientY + (de && de.scrollTop || b.scrollTop || 0);
            }
            else {
                lastMousePos.pageX = e.pageX;
                lastMousePos.pageY = e.pageY;
            }
            
            if (options.grid.hoverable && !hoverTimeout)
                hoverTimeout = setTimeout(onHover, 100);

            if (selection.active)
                updateSelection(lastMousePos);
        }
        
        function onMouseDown(e) {
            if (e.which != 1)  // only accept left-click
                return;
            
            // cancel out any text selections
            document.body.focus();

            // prevent text selection and drag in old-school browsers
            if (document.onselectstart !== undefined && workarounds.onselectstart == null) {
                workarounds.onselectstart = document.onselectstart;
                document.onselectstart = function () { return false; };
            }
            if (document.ondrag !== undefined && workarounds.ondrag == null) {
                workarounds.ondrag = document.ondrag;
                document.ondrag = function () { return false; };
            }
            
            setSelectionPos(selection.first, e);
                
            lastMousePos.pageX = null;
            selection.active = true;
            $(document).one("mouseup", onSelectionMouseUp);
        }

        function onClick(e) {
            if (clickIsMouseUp) {
                clickIsMouseUp = false;
                return;
            }

            triggerClickHoverEvent("plotclick", e);
        }
        
        function onHover() {
            triggerClickHoverEvent("plothover", lastMousePos);
            hoverTimeout = null;
        }

        // trigger click or hover event (they send the same parameters
        // so we share their code)
        function triggerClickHoverEvent(eventname, event) {
            var offset = eventHolder.offset(),
                pos = { pageX: event.pageX, pageY: event.pageY },
                canvasX = event.pageX - offset.left - plotOffset.left,
                canvasY = event.pageY - offset.top - plotOffset.top;

            if (axes.xaxis.used)
                pos.x = axes.xaxis.c2p(canvasX);
            if (axes.yaxis.used)
                pos.y = axes.yaxis.c2p(canvasY);
            if (axes.x2axis.used)
                pos.x2 = axes.x2axis.c2p(canvasX);
            if (axes.y2axis.used)
                pos.y2 = axes.y2axis.c2p(canvasY);

            var item = findNearbyItem(canvasX, canvasY);

            if (item) {
                // fill in mouse pos for any listeners out there
                item.pageX = parseInt(item.series.xaxis.p2c(item.datapoint[0]) + offset.left + plotOffset.left);
                item.pageY = parseInt(item.series.yaxis.p2c(item.datapoint[1]) + offset.top + plotOffset.top);

                    
            }

            if (options.grid.autoHighlight) {
                for (var i = 0; i < highlights.length; ++i) {
                    var h = highlights[i];
                    if (h.auto &&
                        !(item && h.series == item.series && h.point == item.datapoint))
                        unhighlight(h.series, h.point);
                }
                
                if (item)
                    highlight(item.series, item.datapoint, true);
            }
            
            target.trigger(eventname, [ pos, item ]);
        }

        function triggerRedrawOverlay() {
            if (!redrawTimeout)
                redrawTimeout = setTimeout(redrawOverlay, 50);
        }

        function redrawOverlay() {
            redrawTimeout = null;

            // redraw highlights
            octx.save();
            octx.clearRect(0, 0, canvasWidth, canvasHeight);
            octx.translate(plotOffset.left, plotOffset.top);
            
            var i, hi; 
            for (i = 0; i < highlights.length; ++i) {
                hi = highlights[i];

                if (hi.series.bars.show)
                    drawBarHighlight(hi.series, hi.point);
                else
                    drawPointHighlight(hi.series, hi.point);
            }
            octx.restore();

            // redraw selection
            if (selection.show && selectionIsSane()) {
                octx.strokeStyle = parseColor(options.selection.color).scale(null, null, null, 0.8).toString();
                octx.lineWidth = 1;
                ctx.lineJoin = "round";
                octx.fillStyle = parseColor(options.selection.color).scale(null, null, null, 0.4).toString();
                
                var x = Math.min(selection.first.x, selection.second.x),
                    y = Math.min(selection.first.y, selection.second.y),
                    w = Math.abs(selection.second.x - selection.first.x),
                    h = Math.abs(selection.second.y - selection.first.y);
                
                octx.fillRect(x + plotOffset.left, y + plotOffset.top, w, h);
                octx.strokeRect(x + plotOffset.left, y + plotOffset.top, w, h);
            }
        }
        
        function highlight(s, point, auto) {
            if (typeof s == "number")
                s = series[s];

            if (typeof point == "number")
                point = s.data[point];

            var i = indexOfHighlight(s, point);
            if (i == -1) {
                highlights.push({ series: s, point: point, auto: auto });

                triggerRedrawOverlay();
            }
            else if (!auto)
                highlights[i].auto = false;
        }
            
        function unhighlight(s, point) {
            if (typeof s == "number")
                s = series[s];

            if (typeof point == "number")
                point = s.data[point];

            var i = indexOfHighlight(s, point);
            if (i != -1) {
                highlights.splice(i, 1);

                triggerRedrawOverlay();
            }
        }
        
        function indexOfHighlight(s, p) {
            for (var i = 0; i < highlights.length; ++i) {
                var h = highlights[i];
                if (h.series == s && h.point[0] == p[0]
                    && h.point[1] == p[1])
                    return i;
            }
            return -1;
        }
        
        function drawPointHighlight(series, point) {
            var x = point[0], y = point[1],
                axisx = series.xaxis, axisy = series.yaxis;
            
            if (x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
                return;
            
            var pointRadius = series.points.radius + series.points.lineWidth / 2;
            octx.lineWidth = pointRadius;
            octx.strokeStyle = parseColor(series.color).scale(1, 1, 1, 0.5).toString();
            var radius = 1.5 * pointRadius;
            octx.beginPath();
            octx.arc(axisx.p2c(x), axisy.p2c(y), radius, 0, 2 * Math.PI, true);
            octx.stroke();
        }

        function drawBarHighlight(series, point) {
            octx.lineJoin = "round";
            octx.lineWidth = series.bars.lineWidth;
            octx.strokeStyle = parseColor(series.color).scale(1, 1, 1, 0.5).toString();
            octx.fillStyle = parseColor(series.color).scale(1, 1, 1, 0.5).toString();
            var barLeft = series.bars.align == "left" ? 0 : -series.bars.barWidth/2;
            drawBar(point[0], point[1], barLeft, barLeft + series.bars.barWidth,
                    0, true, series.xaxis, series.yaxis, octx);
        }
        
        function triggerSelectedEvent() {
            var x1 = Math.min(selection.first.x, selection.second.x),
                x2 = Math.max(selection.first.x, selection.second.x),
                y1 = Math.max(selection.first.y, selection.second.y),
                y2 = Math.min(selection.first.y, selection.second.y);

            var r = {};
            if (axes.xaxis.used)
                r.xaxis = { from: axes.xaxis.c2p(x1), to: axes.xaxis.c2p(x2) };
            if (axes.x2axis.used)
                r.x2axis = { from: axes.x2axis.c2p(x1), to: axes.x2axis.c2p(x2) };
            if (axes.yaxis.used)
                r.yaxis = { from: axes.yaxis.c2p(y1), to: axes.yaxis.c2p(y2) };
            if (axes.y2axis.used)
                r.yaxis = { from: axes.y2axis.c2p(y1), to: axes.y2axis.c2p(y2) };
            
            target.trigger("plotselected", [ r ]);

            // backwards-compat stuff, to be removed in future
            if (axes.xaxis.used && axes.yaxis.used)
                target.trigger("selected", [ { x1: r.xaxis.from, y1: r.yaxis.from, x2: r.xaxis.to, y2: r.yaxis.to } ]);
        }
        
        function onSelectionMouseUp(e) {
            // revert drag stuff for old-school browsers
            if (document.onselectstart !== undefined)
                document.onselectstart = workarounds.onselectstart;
            if (document.ondrag !== undefined)
                document.ondrag = workarounds.ondrag;
            
            // no more draggy-dee-drag
            selection.active = false;
            updateSelection(e);
            
            if (selectionIsSane()) {
                triggerSelectedEvent();
                clickIsMouseUp = true;
            }
            
            return false;
        }

        function setSelectionPos(pos, e) {
            var offset = eventHolder.offset();
            if (options.selection.mode == "y") {
                if (pos == selection.first)
                    pos.x = 0;
                else
                    pos.x = plotWidth;
            }
            else {
                pos.x = e.pageX - offset.left - plotOffset.left;
                pos.x = Math.min(Math.max(0, pos.x), plotWidth);
            }

            if (options.selection.mode == "x") {
                if (pos == selection.first)
                    pos.y = 0;
                else
                    pos.y = plotHeight;
            }
            else {
                pos.y = e.pageY - offset.top - plotOffset.top;
                pos.y = Math.min(Math.max(0, pos.y), plotHeight);
            }
        }
        
        function updateSelection(pos) {
            if (pos.pageX == null)
                return;
            
            setSelectionPos(selection.second, pos);
            if (selectionIsSane()) {
                selection.show = true;
                triggerRedrawOverlay();
            }
            else
                clearSelection();
        }

        function clearSelection() {
            if (selection.show) {
                selection.show = false;
                triggerRedrawOverlay();
            }
        }

        function setSelection(ranges, preventEvent) {
            var range;
            
            if (options.selection.mode == "y") {
                selection.first.x = 0;
                selection.second.x = plotWidth;
            }
            else {
                range = extractRange(ranges, "x");
                
                selection.first.x = range.axis.p2c(range.from);
                selection.second.x = range.axis.p2c(range.to);
            }
            
            if (options.selection.mode == "x") {
                selection.first.y = 0;
                selection.second.y = plotHeight;
            }
            else {
                range = extractRange(ranges, "y");
                
                selection.first.y = range.axis.p2c(range.from);
                selection.second.y = range.axis.p2c(range.to);
            }

            selection.show = true;
            triggerRedrawOverlay();
            if (!preventEvent)
                triggerSelectedEvent();
        }
        
        function selectionIsSane() {
            var minSize = 5;
            return Math.abs(selection.second.x - selection.first.x) >= minSize &&
                Math.abs(selection.second.y - selection.first.y) >= minSize;
        }
    }
    
    $.plot = function(target, data, options) {
        var plot = new Plot(target, data, options);
        /*var t0 = new Date();     
        var t1 = new Date();
        var tstr = "time used (msecs): " + (t1.getTime() - t0.getTime())
        if (window.console)
            console.log(tstr);
        else
            alert(tstr);*/
        return plot;
    };
    
    // round to nearby lower multiple of base
    function floorInBase(n, base) {
        return base * Math.floor(n / base);
    }
    
    function clamp(min, value, max) {
        if (value < min)
            return value;
        else if (value > max)
            return max;
        else
            return value;
    }
    
    // color helpers, inspiration from the jquery color animation
    // plugin by John Resig
    function Color (r, g, b, a) {
       
        var rgba = ['r','g','b','a'];
        var x = 4; //rgba.length
       
        while (-1<--x) {
            this[rgba[x]] = arguments[x] || ((x==3) ? 1.0 : 0);
        }
       
        this.toString = function() {
            if (this.a >= 1.0) {
                return "rgb("+[this.r,this.g,this.b].join(",")+")";
            } else {
                return "rgba("+[this.r,this.g,this.b,this.a].join(",")+")";
            }
        };

        this.scale = function(rf, gf, bf, af) {
            x = 4; //rgba.length
            while (-1<--x) {
                if (arguments[x] != null)
                    this[rgba[x]] *= arguments[x];
            }
            return this.normalize();
        };

        this.adjust = function(rd, gd, bd, ad) {
            x = 4; //rgba.length
            while (-1<--x) {
                if (arguments[x] != null)
                    this[rgba[x]] += arguments[x];
            }
            return this.normalize();
        };

        this.clone = function() {
            return new Color(this.r, this.b, this.g, this.a);
        };

        var limit = function(val,minVal,maxVal) {
            return Math.max(Math.min(val, maxVal), minVal);
        };

        this.normalize = function() {
            this.r = limit(parseInt(this.r), 0, 255);
            this.g = limit(parseInt(this.g), 0, 255);
            this.b = limit(parseInt(this.b), 0, 255);
            this.a = limit(this.a, 0, 1);
            return this;
        };

        this.normalize();
    }
    
    var lookupColors = {
        aqua:[0,255,255],
        azure:[240,255,255],
        beige:[245,245,220],
        black:[0,0,0],
        blue:[0,0,255],
        brown:[165,42,42],
        cyan:[0,255,255],
        darkblue:[0,0,139],
        darkcyan:[0,139,139],
        darkgrey:[169,169,169],
        darkgreen:[0,100,0],
        darkkhaki:[189,183,107],
        darkmagenta:[139,0,139],
        darkolivegreen:[85,107,47],
        darkorange:[255,140,0],
        darkorchid:[153,50,204],
        darkred:[139,0,0],
        darksalmon:[233,150,122],
        darkviolet:[148,0,211],
        fuchsia:[255,0,255],
        gold:[255,215,0],
        green:[0,128,0],
        indigo:[75,0,130],
        khaki:[240,230,140],
        lightblue:[173,216,230],
        lightcyan:[224,255,255],
        lightgreen:[144,238,144],
        lightgrey:[211,211,211],
        lightpink:[255,182,193],
        lightyellow:[255,255,224],
        lime:[0,255,0],
        magenta:[255,0,255],
        maroon:[128,0,0],
        navy:[0,0,128],
        olive:[128,128,0],
        orange:[255,165,0],
        pink:[255,192,203],
        purple:[128,0,128],
        violet:[128,0,128],
        red:[255,0,0],
        silver:[192,192,192],
        white:[255,255,255],
        yellow:[255,255,0]
    };    

    function extractColor(element) {
        var color, elem = element;
        do {
            color = elem.css("background-color").toLowerCase();
            // keep going until we find an element that has color, or
            // we hit the body
            if (color != '' && color != 'transparent')
                break;
            elem = elem.parent();
        } while (!$.nodeName(elem.get(0), "body"));

        // catch Safari's way of signalling transparent
        if (color == "rgba(0, 0, 0, 0)") 
            return "transparent";
        
        return color;
    }
    
    // parse string, returns Color
    function parseColor(str) {
        var result;

        // Look for rgb(num,num,num)
        if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(str))
            return new Color(parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10));
        
        // Look for rgba(num,num,num,num)
        if (result = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))
            return new Color(parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10), parseFloat(result[4]));
            
        // Look for rgb(num%,num%,num%)
        if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(str))
            return new Color(parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55);

        // Look for rgba(num%,num%,num%,num)
        if (result = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))
            return new Color(parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55, parseFloat(result[4]));
        
        // Look for #a0b1c2
        if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(str))
            return new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16));

        // Look for #fff
        if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(str))
            return new Color(parseInt(result[1]+result[1], 16), parseInt(result[2]+result[2], 16), parseInt(result[3]+result[3], 16));

        // Otherwise, we're most likely dealing with a named color
        var name = $.trim(str).toLowerCase();
        if (name == "transparent")
            return new Color(255, 255, 255, 0);
        else {
            result = lookupColors[name];
            return new Color(result[0], result[1], result[2]);
        }
    }
        
})(jQuery);








///////////







J.getChildsByType=function(parent, type, rec)
{
  var elts=new Array();
  var fils=parent.childNodes;
  for(var i=0; i<fils.length; i++)
  {
	  if(fils[i].nodeType != 1) continue;
	  if(J.estDeType(fils[i],type)) elts[elts.length]=fils[i];
	  if(rec) elts=elts.concat(J.getChildsByType(fils[i],type, true));
  }
  return elts;
}
J.estDeType = function(elt, type)
{
  return (elt && elt.tagName && elt.tagName.toLowerCase() == type.toLowerCase());
}

J.register=function(elt,evt,func)
{
  if (document.addEventListener)
	elt.addEventListener(evt,func, false);
  else if (document.attachEvent)
	elt.attachEvent('on'+evt, func);
}


//--- fonctions serialize et unserialize ---
//auteur : XoraX http://www.xorax.info/blog/programmation/40-javascript-serialize-php.html
//version : 1.2 - 2007/04/23
J.serialize = function(txt, nonRecc) {
	if(txt instanceof Date) return "D:"+txt.getTime()+";";
	switch(typeof(txt)){
	case 'string':
		return 's:'+txt.length+':"'+txt+'";';
	case 'number':
		if(txt>=0 && String(txt).indexOf('.') == -1 && txt < 65536) return 'i:'+txt+';';
		return 'd:'+txt+';';
	case 'boolean':
		return 'b:'+( (txt)?'1':'0' )+';';
	case 'object':
		var i=0,k,ret='';
		for(k in txt){
			if(!isNaN(k)) k = Number(k);
			ret += J.serialize(k)+(nonRecc?txt[k]:J.serialize(txt[k],false));
			i++;
		}
		return 'a:'+i+':{'+ret+'}';
	case 'function':
	        var tmp='f:'+txt;
			for(var i=0;i<txt.arguments;i++)tmp+=','+txt.arguments[i];
			return tmp+';';
	default:
		return 'N;';
		alert('var undefined: '+typeof(txt));return undefined;
	}
}

J.unserialize = function(txt){
	var level=0,arrlen=new Array(),del=0,finale=new Array(),key=new Array(),save=txt;
	while(1){
		switch(txt.substr(0,1)){
		case 'N':
			del = 2;
			ret = null;
		break;
		case 'b':
			del = txt.indexOf(';')+1;
			ret = (txt.substring(2,del-1) == '1')?true:false;
		break;
		case 'i':
			del = txt.indexOf(';')+1;
			ret = Number(txt.substring(2,del-1));
		break;
		case 'd':
			del = txt.indexOf(';')+1;
			ret = Number(txt.substring(2,del-1));
		break;
		case 's':
			del = txt.substr(2,txt.substr(2).indexOf(':'));
			ret = txt.substr( 1+txt.indexOf('"'),del);
			del = txt.indexOf('"')+ 1 + ret.length + 2;
		break;
		case 'a':
			del = txt.indexOf(':{')+2;
			ret = new Array();
			arrlen[level+1] = Number(txt.substring(txt.indexOf(':')+1, del-2))*2;
		break;
		case 'f':
			ret=txt.substr(2,txt.indexOf('{')+1);
			var tmp,tmp2,tmp3;
			tmp3=txt.substr(txt.indexOf('{')+1);
//			alert('tmp3:'+tmp3)
			var lev=1;
			var inStr=0; // TODO a utiliser
			while(lev>0)
			{
			  tmp=tmp3.indexOf('{');
			  tmp2=tmp3.indexOf('}');
			  if(tmp>-1 && tmp<tmp2)
			  {
			    lev++;
				ret+=tmp3.substr(0,tmp+1);
				tmp3=tmp3.substr(tmp+1);
			  }
			  else if(tmp2>-1)
			  {
			    lev--;
				ret+=tmp3.substr(0,tmp2+1);
				tmp3=tmp3.substr(tmp2+1);
			  }
			  else {alert( "Erreur de syntaxe :\n"+txt);return undefined;}
			}
			del=ret.length+1+tmp3.indexOf(';');
			tmp=tmp3.indexOf(',');
			tmp2=tmp3.indexOf(';');
			if((tmp)!=-1&&(tmp2)>tmp)
			{ 
              if(tmp==0) tmp3=tmp3.substr(1);
			  ret=ret.substr(0,ret.indexOf('(')+1)+tmp3.substr(1,tmp3.indexOf(';')-1)+ret.substr(ret.indexOf('(')+1);
			}
			ret=eval(ret);
		break;
		case 'D':
			del = txt.indexOf(';')+1;
			ret = new Date();ret.setTime(parseInt(txt.substring(2,del-1)));
			break;
		case 'O':
			txt = txt.substr(2);
			var tmp = txt.indexOf(':"')+2;
			var nlen = Number(txt.substring(0, txt.indexOf(':')));
			name = txt.substring(tmp, tmp+nlen );
			//alert(name);
			txt = txt.substring(tmp+nlen+2);
			del = txt.indexOf(':{')+2;
			ret = new Object();
			arrlen[level+1] = Number(txt.substring(0, del-2))*2;
		break;
		case '}':
			txt = txt.substr(1);
			if(arrlen[level] != 0){alert('var missed : '+save); return undefined;};
			//alert(arrlen[level]);
			level--;
		continue;
		default:
			if(level==0) return finale;
			alert('syntax invalid(1) : '+save+"\nlevel is at "+level+"\nat\n"+txt);
			return undefined;
		}
		if(arrlen[level]%2 == 0){
			if(typeof(ret) == 'object'){alert('array index object no accepted : '+save);return undefined;}
			if(ret == undefined){alert('syntax invalid(2) : '+save);return undefined;}
			key[level] = ret;
		} else {
			var ev = '';
			for(var i=1;i<=level;i++){
				if(typeof(key[i]) == 'number'){
					ev += '['+key[i]+']';
				}else{
					ev += '["'+key[i]+'"]';
				}
			}
			eval('finale'+ev+'= ret;');
		}
		arrlen[level]--;
		if(typeof(ret) == 'object' && !(ret instanceof Date)) level++;
		txt = txt.substr(del);
		continue;
	}
}



J.doProgression=function() 
{
	if(!checkPage()) {return;}

	var date=new Date();
	var newData=J.getPtsEtClassement();
	if(typeof(newData)=="undefined")return;
	
// Données du jour
	
	var oldTmpDate=J.get("progressionTmpDate", new Date());
	J.set("progressionTmpDate", date);

	var dayRecords;
	if(oldTmpDate.getDate()==date.getDate() && oldTmpDate.getMonth()==date.getMonth() &&oldTmpDate.getYear()==date.getYear())
		dayRecords=J.get("progressionDayRecords", {points:{}, classement:{}});
	else
		dayRecords={points:{}, classement:{}};
	dayRecords.points[""+date.getTime()]=newData[0];
	dayRecords.classement[""+date.getTime()]=newData[1];
	J.set("progressionDayRecords", dayRecords);

// Données journalières	
	var records=J.get("progressionRecords", {points:{}, classement:{}});
	records.points[""+date.getDate()+"_"+date.getMonth()+"_"+date.getFullYear()]=newData[0];
	records.classement[""+date.getDate()+"_"+date.getMonth()+"_"+date.getFullYear()]=newData[1];
	J.set("progressionRecords", records);

// Exploitation des données
var recordsTable=[];
for(var dd in records.points)
{
	var dateTmp=dd.split("_");
	var date=new Date(dateTmp[2],dateTmp[1],dateTmp[0]);
	recordsTable.push([date.getTime(), records.points[dd]]);
}
	
var dayRecordsTable=[];
for(var dd in dayRecords.points)
	dayRecordsTable.push([parseInt(dd), dayRecords.points[dd]]);


J.progressionData=
{
	"Today":
	{
		label:"Today", 
		data:dayRecordsTable, 
		color:1
	}, 
	"Toujours":
	{
		label:"Toujours", 
		data:recordsTable, 
		color:2
	}
};
    var choiceContainer = $("#choices");

	choiceContainer.append('<br/><input type="checkbox" name="Toujours' +
					   '" checked="checked" >Toujours</input>');
	choiceContainer.append('<br/><input type="checkbox" name="Today'+
					   '"  >Today</input>');

	
    J.plotAccordingToChoices=function () {
        J.progressionDataToPlot = [];
	for(var e in J.progressionData)
        choiceContainer.find("input:checked").each(function () {
            var key = $(this).attr("name");
            if (key && J.progressionData[key])
                J.progressionDataToPlot.push(J.progressionData[key]);
        });
        if (J.progressionDataToPlot.length > 0)
            $.plot($("#placeholder"), J.progressionDataToPlot, {
/*                yaxis: { min: 0 },*/
                xaxis: {mode: "time"}
            });
		delete J.progressionDataToPlot;
    }
    var inpts=J.getChildsByType(document.getElementById("choices"),"input", true);
	for(var i=0;i<inpts.length;i++)
		J.register(inpts[i], "click", J.plotAccordingToChoices);
	J.register(document.getElementById("resetDay"),"click",function(){J.set("progressionDayRecords",{points:{}, classement:{}})});
	J.register(document.getElementById("resetToujours"),"click",function(){J.set("progressionRecords",{points:{}, classement:{}})});
    J.plotAccordingToChoices();

	var nde=document.createTextNode("Temps de chargement progressionScript : "+((new Date()).getTime()-J.progressionDebut.getTime())+"ms.");
	document.getElementById("choices").appendChild(document.createElement("br"));
	document.getElementById("choices").appendChild(nde);
}


J.getPtsEtClassement=function() 
{
	var ths=J.getChildsByType(document.getElementById("content"), "th", true);
	var th=null;
	for(var i=ths.length-1; i>=0;i--)
		if(ths[i].innerHTML.indexOf(Lang.Points)!=-1) {th=ths[i]; break;}
	if(th==null) {return;}
	var th=th.nextSibling;
	var pts=parseInt(th.innerHTML.substring(0, th.innerHTML.indexOf(" (")).replace(/\./g, ""));
	var place, aPlace=null;
	for(var i=0;i<th.childNodes.length; i++)
		if(J.estDeType(th.childNodes[i], "a")) {aPlace=th.childNodes[i]; break;}
	if(aPlace==null){return;}
	place=parseInt(aPlace.innerHTML.replace(/\./g, ""));
	var newTr=document.createElement("tr");
	    
	var newTh=document.createElement("th");
	newTh.setAttribute("colspan",4);
	newTh.innerHTML='<div id="placeholder" style="width:600px;height:300px;"></div><input type="button" id="resetDay" value="Reset day"/><input type="button" id="resetToujours" value="Reset toujours"/><p id="choices">Show:</p>';
	newTr.appendChild(newTh)
	th.parentNode.parentNode.appendChild(newTr);
	return [pts, place];
}


J.doProgression();


