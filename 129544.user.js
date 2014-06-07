// Sina Weibo Translator
// v0.1

// Copyright (C) 2012 by Jeffery To (jeffery.to@gmail.com)

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ==UserScript==
// @name           Sina Weibo Translator
// @version        0.1
// @namespace      http://www.thingsthemselves.com/greasemonkey/
// @description    Embeds the Google Website Translator into Sina Weibo
// @include        http://weibo.com/*
// @include        http://*.weibo.com/*
// ==/UserScript==

// Changelog:

// v0.1 (2012-03-29)
// - Initial version

(function( window, document, head, body, undefined ) {

	// don't want to run for iframe pages
	if ( window.top != window ) {
		return;
	}



	/*
	 * constants and variables!
	 */

	var HOMEPAGE_URL = 'http://userscripts.org/scripts/show/129544',
		META_URL = 'http://userscripts.org/scripts/source/129544.meta.js',
		VERSION = '0.1',
		LOCAL_STORAGE_HOST = 'webcache.googleusercontent.com',
		LOCAL_STORAGE_PREFIX = 'greasemonkey.scriptvals.http://www.thingsthemselves.com/greasemonkey//Sina Weibo Translator.',
		UPDATE_CHECK_INTERVAL = 60, // in days
		UPDATE_AVAILABLE = 'Sina Weibo Translator update available!',

		defaultOptions = {},
		options;



	/*
	 * poor-man's jQuery!
	 */

	var $ = function( string, context ) {
		var div, el;

		if ( string.indexOf( '<' ) > -1 ) {
			div = document.createElement( 'div' );
			div.innerHTML = $.trim( string );
			el = div.firstChild;
			div.removeChild( el );
			return el;
		}

		if ( string.indexOf( '#' ) === 0 ) {
			el = document.getElementById( string.substring(1) );
			if ( el && context && !( context.compareDocumentPosition( el ) & 16 ) ) {
				el = undefined;
			}
			return el ? [ el ] : [];
		}

		return ( context || document ).getElementsByTagName( string );
	};

	$.trim = function( string ) { return ( '' + string ).replace( /^\s\s*/, '' ).replace( /\s\s*$/, '' ); };

	$.each = function( object, fn ) {
		var length, i;

		if ( object instanceof Array ) {
			length = object.length;
			for ( i = 0; i < length; i++ ) {
				if ( fn.call( object[ i ], i, object[ i ] ) === false ) {
					break;
				}
			}

		} else if ( typeof object === 'object' && object ) {
			for ( i in object ) {
				if ( fn.call( object[ i ], i, object[ i ] ) === false ) {
					break;
				}
			}
		}
	};

	$.makeArray = function( object ) { return Array.prototype.slice.call( object, 0 ); };

	$.extend = function( target ) {
		var args = $.makeArray( arguments );

		target = target || {};
		args.shift();

		$.each( args, function( i, source ) {
			var prop;

			source = source || {};

			for ( prop in source ) {
				target[ prop ] = source[ prop ];
			}
		} );

		return target;
	};

	$.insertAfter = function( newChild, refChild ) { refChild.parentNode.insertBefore( newChild, refChild.nextSibling ); };



	/*
	 * main!
	 */


	// these aren't actual options but things we need to remember
	$.extend( defaultOptions, {
		lastUpdateCheck: '0', // GM_setValue can only store 32-bit integers, so we need to save this as a string
		latestVersion: ''
	} );

	// restore, then save, options
	// should find a better way...
	restoreOptions();
	saveOptions();

	injectTranslator();

	if ( options.canCheckForUpdate && shouldCheckForUpdate() ) {
		checkForUpdate( showUpdateAvailable );
	} else {
		showUpdateAvailable();
	}



	/*
	 * functions!
	 */



	/*
	 * script functionality
	 */

	// insert google website translator
	function injectTranslator() {
		var script;

		script = document.createElement( 'script' );
		script.textContent = ' \
			function googleTranslateElementInit() { \
				var style; \
				\
				new google.translate.TranslateElement( { pageLanguage: "zh-CN" } ); \
				\
				style = document.createElement( "style" ); \
				style.appendChild( document.createTextNode( ".global_header { top: 40px !important; }" ) ); \
				document.getElementsByTagName( "head" )[ 0 ].appendChild( style ); \
			} \
			';
		body.appendChild( script );

		script = document.createElement( 'script' );
		script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
		body.appendChild( script );
	}

	// show the update link if an update is available
	function showUpdateAvailable() {
		if ( options.latestVersion > VERSION ) {
			makeFrame(function (iframe) {
				var doc = iframe.contentWindow.document,
					body = doc.body,
					link = doc.createElement( 'a' );

				iframe.frameBorder = '0';
				iframe.scrolling = 'no';
				setStyle( iframe, {
					borderColor: '#ccc',
					borderStyle: 'solid',
					borderWidth: '1px 1px 0 0',
					bottom: '0',
					height: '39px',
					left: '0',
					position: 'fixed',
					zIndex: '10000'
				} );

				setStyle( body, {
					background: '#fff',
					margin: '0',
					padding: '0'
				} );

				link.href = HOMEPAGE_URL;
				link.target = '_blank';
				setStyle( link, {
					color: '#00f',
					display: 'inline-block',
					font: '10pt/39px arial', // why does Google use pt?
					padding: '0 10px'
				} );

				link.appendChild( doc.createTextNode( UPDATE_AVAILABLE ) );
				body.appendChild( link );

				iframe.style.width = link.offsetWidth + 'px';
			});
		}
	}



	/*
	 * save / restore options
	 */

	// returns true if the browser supports GM_getValue / GM_setValue
	function canSaveOptions() {
		var me = arguments.callee, test, result;

		if ( me.cached === undefined ) {
			test = function() {
				var name = 'testOption', token = getToken(), value;

				try {
					GM_setValue( name, token );
					value = GM_getValue( name );
					GM_setValue( name, '' );
				} catch ( e ) {
					value = null;
				}

				return value === token;
			};

			result = test();

			// use localStorage to save options if host matches LOCAL_STORAGE_HOST
			// based on by http://userscripts.org/topics/41177#posts-197125
			if ( !result && window.location.host === LOCAL_STORAGE_HOST && window.localStorage &&
					typeof window.localStorage.getItem === 'function' && typeof window.localStorage.setItem === 'function' ) {

				GM_getValue = function( name, defaultValue ) {
					var value = window.localStorage.getItem( LOCAL_STORAGE_PREFIX + name ), type;

					if ( value ) {
						type = value.charAt( 0 );
						value = value.substring( 1 );

						switch ( type ) {
						case 'b':
							value = value === 'true';
							break;
						case 'n':
							value = Number( value );
							break;
						}
					} else {
						value = defaultValue;
					}

					return value;
				};

				GM_setValue = function( name, value ) {
					window.localStorage.setItem( LOCAL_STORAGE_PREFIX + name, ( typeof value ).charAt( 0 ) + value );
				};

				result = test();
			}

			me.cached = result;
		}

		return me.cached;
	}

	// returns an options object based on any saved options and the default options
	function restoreOptions() {
		var canSave = canSaveOptions();

		options = $.extend( {}, defaultOptions );

		if ( canSave ) {
			$.each( defaultOptions, function( name ) {
				var saved = GM_getValue( name );
				if ( saved !== undefined ) {
					options[ name ] = saved;
				}
			} );
		}

		// don't check for updates if we can't remember when we last checked
		options.canCheckForUpdate = typeof GM_xmlhttpRequest === 'function' && canSave;
	}

	// saves the given options object
	function saveOptions() {
		if ( canSaveOptions() ) {
			$.each( defaultOptions, function( name ) { GM_setValue( name, options[ name ] ); } );
		}
	}



	/*
	 * manipulate styles
	 */
	// sets styles on an element
	function setStyle( element, rules ) {
		var style = element.style;

		$.each( rules, function( prop, val ) { style[ prop ] = val; } );
	}



	/*
	 * check for update
	 */

	function shouldCheckForUpdate() { return now() - parseInt( options.lastUpdateCheck, 10 ) >= UPDATE_CHECK_INTERVAL * 86400000; }

	function checkForUpdate( callback ) {
		options.lastUpdateCheck = now() + '';
		saveOptions();

		callback = callback || function() {};

		try {
			GM_xmlhttpRequest( {
				method: 'GET',
				url: META_URL + '?_=' + now(),

				onload: function( data ) {
					var a = /\/\/[ \t]*@version[ \t]+([^\s]+)/.exec( data.responseText || '' );

					if ( data.status === 200 ) {
						options.latestVersion = ( a && a[ 1 ] ) || '';
						saveOptions();
					}

					callback();
				},

				onerror: callback
			} );

		} catch ( e ) {
			callback();
		}
	}



	/*
	 * iframe
	 */

	// based on https://ecmanaut.googlecode.com/svn/trunk/lib/make-iframe.js
	function makeFrame(callback, name) {
		var frames = makeFrame.data || {}, data, iframe;

		function done() {
			clearTimeout(data.timeout);
			data = frames[name] = null;
			iframe.style.position = iframe.style.left = iframe.style.top = iframe.style.width = iframe.style.height = '';
			callback(iframe);
		}

		function testInvasion() {
			var url;
			iframe.removeEventListener('load', done, true);
			try { // probe for security violation error, in case mozilla struck a bug
				url = unsafeWindow.frames[name].location.href;
				done();
			} catch (e) {
				document.body.removeChild(iframe);
				makeFrame(callback, name);
			}
		}

		name = name || 'iframe' + getToken();

		data = frames[name] = frames[name] || { sleepFor: 400 };

		iframe = document.createElement("iframe");
		iframe.name = name;
		iframe.style.position = 'absolute';
		iframe.style.left = iframe.style.top = '-99999px';
		iframe.style.width = iframe.style.height = '1px';
		iframe.src = 'about:blank';
		iframe.addEventListener('load', done, true);

		data.timeout = setTimeout(testInvasion, data.sleepFor);
		data.sleepFor *= 1.5;

		document.body.appendChild(iframe);
	}



	/*
	 * misc
	 */

	// returns the current epoch time
	function now() { return ( new Date() ).getTime(); }

	// returns a unique token string
	function getToken() { return ( Math.random() + '' ).replace( /\D/g, '' ); }

})( window, document, document.getElementsByTagName( 'head' )[ 0 ], document.body );

