// Google Cache Continue Redux
// Based on Google Cache Continue by Jonathon Ramsey
// v0.6.1

// Copyright (C) 2005-2013 by
//   Jonathon Ramsey (jonathon.ramsey@gmail.com)
//   Jeffery To (jeffery.to@gmail.com)

// This file is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published
// by the Free Software Foundation; either version 2, or (at your
// option) any later version.

// This file is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this software; see the file COPYING. If not, write to
// the Free Software Foundation, Inc., 59 Temple Place - Suite 330,
// Boston, MA 02111-1307, USA.

// (Comment by Jonathon Ramsey:)
// Thanks to Neil Klopfenstein for a fix to deal with the text only
// version of cached pages

// ==UserScript==
// @name           Google Cache Continue Redux
// @version        0.6.1
// @namespace      http://www.thingsthemselves.com/greasemonkey/
// @description    Add links to Google cache results to allow continuing using the cache, keeping search terms highlighted
// @include        http://*/search?*q=cache:*
// @include        http://*/search?*q=cache%3A*
// @include        http://*/search?*q=cache%3a*
// @include        https://*/search?*q=cache:*
// @include        https://*/search?*q=cache%3A*
// @include        https://*/search?*q=cache%3a*
// @include        http://webcache.googleusercontent.com/cache-continue-redux-option-sync
// @include        https://webcache.googleusercontent.com/cache-continue-redux-option-sync
// ==/UserScript==

// Redux changelog:

// v0.6.1 (2013-01-07)
// - Fixed shortcut key for Opera (Mac)

// v0.6 (2013-01-04)
// - Added a shortcut key to toggle between cache links and link redirection
// - Fixed original (uncached) link not added to Google error page
// - Fixed option syncing in Chrome
// - Fixed update system

// v0.5 (2011-05-25)
// - Works with cache pages under HTTPS / SSL
// - Added an option to always use HTTPS
// - Options can be saved in Chrome, if the cache page comes from webcache.googleusercontent.com
// - Added a function to sync options between HTTP and HTTPS cache pages in Chrome
//   Must be manually triggered since it requires an iframe page load
// - Cache link text change takes effect immediately, instead of after page reload
// - Added default styles to our elements so that they're more resistant to in-page styles
// - Added an About panel
// - Added a "Check for updates" function, inside the About panel (fails silently in Chrome due to browser restrictions)
// - Auto-check for updates every 60 days
// - Another refactoring

// v0.4 (2010-02-10)
// - Google Chrome compatibility (thanks Norman Rasmussen)
// - Added option to redirect page links to the Google cache, instead of adding cache links
// - Added options for cache link text and background colour
// - Added options panel (cache link options not shown in Google Chrome since options cannot be saved)
// - Should work for all language versions of Google (noCacheTitle, textOnlyLinkText and fullLinkText options no longer necessary)
// - Refactored code

// v0.3 (2008-11-27)
// - Fixed duplicate "http://" in uncached link when search URL includes the protocol

// v0.2 (2008-08-19)
// - Externalized strings in about:config prefs

// v0.1 (2008-07-31)
// - Initial version

(function( window, document, head, body, location, undefined ) {

	/*
	 * user editable parts, start!
	 */

	// default options
	var defaultOptions = {
		// whether page links should be redirected
		// can be changed in the options panel
		redirectPageLinks: false,

		// whether we should always use HTTPS for cache pages
		useHttps: false,

		// the rest of these can be changed in the options panel if the browser supports GM_setValue()

		// link text for cache links
		cacheLinkText: 'cache',

		// background colour for cache links
		cacheLinkBackgroundColor: 'yellow',

		// text colour for cache links
		cacheLinkTextColor: 'red'
	},

	// other strings
	// these can only be changed by editing this script
	STRINGS = {
		// explanation text for uncached link, for when Google does not have a cached version of the page
		// %s will be replaced by a link to the original (uncached) page
		uncached: '<b>Uncached:</b> %s',

		// explanation text for cache links
		// %s will be replaced by a sample cache link
		cacheLinkExplanation: 'Use %s links to continue using Google\'s cache.',

		// explanation text for redirected page links
		redirectLinkExplanation: 'All HTTP/HTTPS links will be redirected to Google\'s cache.',

		// "Show options" link text
		showOptions: 'Show options',

		// "Hide options" link text
		hideOptions: 'Hide options',

		// redirect page links option label
		redirectPageLinksLabel: 'Redirect links to Google\'s cache',

		// redirect page links shortcut text
		redirectPageLinksShortcut: 'Press <b>`</b> (grave accent / backquote key) to quickly toggle between cache links and link redirection',

		// use https option label
		useHttpsLabel: 'Always use HTTPS',

		// cache link options heading
		cacheLinkOptions: 'Cache link',

		// cache link text option label
		cacheLinkTextLabel: 'Link text:',

		// cache link background colour option label
		cacheLinkBackgroundColorLabel: 'Background colour:',

		// cache link text colour option label
		cacheLinkTextColorLabel: 'Text colour:',

		// instruction text for text options
		textOptionInstructions: 'Leave a field blank to reset to default',

		// synchronize http / https options link text
		// %s will be replaced by the appropriate protocol (HTTP/HTTPS)
		syncLinkText: 'Copy options to %s Google cache',

		// synchronizing text
		syncing: 'Copying&hellip;',

		// sync done text
		syncDone: 'done!',

		// if the cache page host matches this, then we can save options in Chrome
		// http and https pages will have separate options though :-(
		cacheHost: 'webcache.googleusercontent.com',

		// path we will load to sync options in Chrome
		syncPath: '/cache-continue-redux-option-sync',

		// prefix for values stored in localStorage
		localStoragePrefix: 'greasemonkey.scriptvals.http://www.thingsthemselves.com/greasemonkey//Google Cache Continue Redux.',

		// "About" link text
		about: 'About',

		// about title text
		aboutTitle: 'Google Cache Continue Redux',

		// about text
		aboutText: 'Based on Google Cache Continue by Jonathon Ramsey<br>Copyright 2005-2013 by Jonathon Ramsey and Jeffery To',

		// about version text
		// %s will be replaced by the version number
		version: 'Version %s',

		// about homepage link text
		homepage: 'Homepage',

		// about homepage url
		homepageUrl: 'http://userscripts.org/scripts/show/30878',

		// "Close" link text
		close: 'Close',

		// check for update link text
		check: 'Check for updates',

		// checking text
		checking: 'Checking for updates&hellip;',

		// update available
		updateAvailable: 'A newer version is available!',

		// no update available
		noUpdateAvailable: 'Your script is up to date',

		// error occurred while checking
		checkError: 'An error occurred while checking for updates',

		// install newer version link text
		update: 'Install latest version',

		// meta url
		metaUrl: 'http://userscripts.org/scripts/source/30878.meta.js'
	},

	// modify these to change the appearance of things
	CSS = {
		cacheLink: {
			'font-size': 'x-small',
			'font-weight': 'bold',
			'margin': '0.3ex',
			'padding': '0 0.6ex 0.4ex 0.3ex',
			'text-decoration': 'none'
		},

		explanation: {
			'border': '1px solid #999',
			'margin': '1em 0',
			'padding': '1ex 0.5ex'
		},

		panel: {
			'margin-top': '0.5em'
		},

		defaults: {
			// used to reset styles
			reset: {
				'background': 'none',
				'border': '0',
				'clear': 'none',
				'clip': 'auto',
				'color': '#000',
				'content': 'normal',
				'cursor': 'auto',
				'float': 'none',
				'font': '13px arial,sans-serif',
				'font-stretch': 'normal',
				'font-size-adjust': 'none',
				'height': 'auto',
				'letter-spacing': 'normal',
				'list-style': 'none',
				'margin': '0',
				'overflow': 'visible',
				'padding': '0',
				'position': 'static',
				'text-align': 'left',
				'text-decoration': 'none',
				'text-indent': '0',
				'text-transform': 'none',
				'vertical-align': 'baseline',
				'visibility': 'visible',
				'white-space': 'normal',
				'width': 'auto',
				'word-spacing': 'normal',
				'z-index': 'auto'
			},

			// styles for each element type

			a: {
				'cursor': 'pointer',
				'color': '#00c',
				'display': 'inline',
				'text-decoration': 'underline'
			},

			b: {
				'display': 'inline',
				'font-weight': 'bold'
			},

			div: {
				'display': 'block',
			},

			input_checkbox: {
				'display': 'inline',
				'margin': '3px',
				'vertical-align': 'middle'
			},

			input_text: {
				'background': '#fff',
				'border': '1px solid #999',
				'cursor': 'text',
				'display': 'inline',
				'margin': '1px 0',
				'padding': '2px 1px',
				'text-align': 'start'
			},

			label: {
				'cursor': 'default',
				'display': 'inline',
				'vertical-align': 'middle'
			},

			table: {
				'display': 'table',
				'margin': '0.5em 0',
				'border-collapse': 'collapse'
			},

			td: {
				'display': 'table-cell',
				'padding-right': '5px'
			},

			th: {
				'display': 'table-cell',
				'font-weight': 'bold'
			},

			p: {
				'display': 'block',
				'margin': '1em 0'
			}
		}
	},

	// key codes for keyboard shortcuts
	KEYS = {
		toggleRedirectPageLinks: 96 // keypress code for ` (grave accent / backquote / backtick)
	};

	/*
	 * user editable parts, end!
	 */



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

	$.append = function( parent, child ) { parent.appendChild( child ); };



	/*
	 * main!
	 */

		// (encoded) search query (contains cache term)
	var SEARCH_QUERY = findSearchQuery(),

		// (encoded) cache term ("cache%3Ahttp%3A%2F%2Fwww.example.com")
		CACHE_TERM = findCacheTerm( SEARCH_QUERY ),

		// element ids
		ID = generateIds( 'cacheLink hideCacheLinks cacheLinkColors cacheLinkHoverColors exampleCacheLink message optionsLink options redirectPageLinks useHttps cacheLinkText cacheLinkBackgroundColor cacheLinkTextColor syncLink syncing syncDone syncIframe aboutLink about closeLink checkLink checkStatus updateLink'.split( ' ' ) ),

		// script version
		VERSION = '0.6.1',

		// true of we're using localStorage to save options
		usingLocalStorage = false,

		// true if we are syncing options
		syncing = false,

		// true if we're under http (false for https)
		IS_HTTP = location.protocol === 'http:',

		// how many days inbetween update checks
		UPDATE_CHECK_INTERVAL = 60,

		// script options
		options,

		// link details
		links;

	// continue only if we have a cache term or if we are the iframe of an option sync
	if ( !( SEARCH_QUERY && CACHE_TERM ) &&
			!( location.host === STRINGS.cacheHost && location.pathname === STRINGS.syncPath ) ) {
		return;
	}

	// these aren't actual options but things we need to remember
	$.extend( defaultOptions, {
		lastUpdateCheck: '0', // GM_setValue can only store 32-bit integers, so we need to save this as a string
		latestVersion: VERSION
	} );

	// restore, then save, options
	// restoreOptions() will set usingLocalStorage as a side effect
	// should find a better way...
	options = restoreOptions();
	if ( 'updateAvailable' in options ) {
		options.updateAvailable = false; // not used anymore
	}
	if ( options.latestVersion < VERSION ) {
		options.latestVersion = VERSION;
	}
	saveOptions( options );

	if ( isCachePage() ) {
		if ( options.useHttps && IS_HTTP ) {
			window.setTimeout( function() { location.replace( location.href.replace( /^http:/i, 'https:' ) ); }, 0 );

		} else {
			links = scanLinks( CACHE_TERM );

			if ( links.changeVersion ) {
				addExplanation( options, links.changeVersion.parentNode.parentNode );

				document.addEventListener( 'keypress', shortcutKeypress, false );

				if ( options.canCheckForUpdate && shouldCheckForUpdate( options ) ) {
					checkForUpdate( options );
				}
			}
		}

	} else {
		// if Google hasn't cached the original page, add a link for the original URL
		addOriginalLink( decodeURIComponent( CACHE_TERM ).replace( /^cache:/, '' ) );
	}

	if ( usingLocalStorage ) {
		window.addEventListener( 'message', receivedMessage, false );
	}

	// cleanup
	window.addEventListener( 'unload', function() {
		window.removeEventListener( 'unload', arguments.callee, false );
		document.removeEventListener( 'keypress', shortcutKeypress, false );
		window.removeEventListener( 'message', receivedMessage, false );
		SEARCH_QUERY = CACHE_TERM = options = id = links = null;
	}, false );



	/*
	 * functions!
	 */



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

			// use localStorage to save options if host matches cacheHost
			// based on by http://userscripts.org/topics/41177#posts-197125
			if ( !result && location.host === STRINGS.cacheHost && window.localStorage &&
					typeof window.localStorage.getItem === 'function' && typeof window.localStorage.setItem === 'function' ) {

				GM_getValue = function( name, defaultValue ) {
					var value = window.localStorage.getItem( STRINGS.localStoragePrefix + name ), type;

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
					window.localStorage.setItem( STRINGS.localStoragePrefix + name, ( typeof value ).charAt( 0 ) + value );
				};

				result = test();
				usingLocalStorage = result;
			}

			me.cached = result;
		}

		return me.cached;
	}

	// returns an options object based on any saved options and the default options
	function restoreOptions() {
		var options = $.extend( {}, defaultOptions ), canSave = canSaveOptions();

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

		return options;
	}

	// saves the given options object
	function saveOptions( options ) {
		if ( canSaveOptions() ) {
			$.each( defaultOptions, function( name ) { GM_setValue( name, options[ name ] ); } );
		}
	}



	/*
	 * find information from the current page
	 */

	// returns the search query from the page URL
	function findSearchQuery() {
		var query = '';

		$.each( location.search.replace( /^\?/, '' ).split( '&' ), function( i, pair ) {
			if ( pair.indexOf( 'q=' ) === 0 ) {
				query = pair.substring( 2 );
				return false;
			}
		} );

		return query;
	}

	// returns the (encoded) cache term ("cache:...") from the given query parameter
	function findCacheTerm( query ) {
		var cacheTerm = '';

		$.each( ( query || '' ).split( '+' ), function( i, encoded ) {
			if ( decodeURIComponent( encoded ).indexOf( 'cache:' ) === 0 ) {
				cacheTerm = encoded;
				return false;
			}
		} );

		return cacheTerm;
	}

	// returns true if the current page is a google cache page
	function isCachePage() {
		var title = document.title,
			img = $( 'img' ),
			b = $( 'b' ),
			ins = $( 'ins' ),
			isErrorPage = // not sure how strict this should be
				title === 'Error 404 (Not Found)!!1' &&
				img.length === 1 && img[0].src.indexOf( '//www.google.com/images/errors/logo_sm.gif' ) > -1 &&
				b.length === 1 && b[0].innerHTML === '404.' &&
				ins.length === 2 && ins[0].innerHTML === 'That’s an error.' && ins[1].innerHTML === 'That’s all we know.';

		return !isErrorPage;
	}

	// finds text-only / full version link, gathers link details, inserts cache links
	function scanLinks( cacheTerm ) {
		// get a snapshot from the live DOM
		var links = document.evaluate( '//a[@href]',
		                               document,
		                               null,
		                               XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		                               null ),
			list = [],
			tmplHref = location.href.replace( location.hash, '' ),
			changeVersion, link, href, hash, cacheHref, cacheLink, i;

		for ( i = 0; ( link = links.snapshotItem( i ) ); i++ ) {
			if ( !changeVersion ) {
				// find last link in the cache page header (the "Text-only version" or "Full version" link)
				if ( link.pathname === '/search' && /cache:.*&strip=[01]$/.test( link.search ) ) {
					changeVersion = link;
				}

			} else {
				// gather link details, insert cache link
				if ( /^https?:$/.test( link.protocol ) ) {
					href = link.href;
					hash = link.hash;
					cacheHref = tmplHref.replace( cacheTerm, encodeURIComponent( 'cache:' + href.replace( hash, '' ) ) ) + hash;
					cacheLink = $( '<a href="' + cacheHref + '" class="' + ID.cacheLink + '" ' + getInlineStyle( 'a', CSS.cacheLink ) + '>' + options.cacheLinkText + '</a>' );

					list.push( {
						link: link,
						cacheLink: cacheLink,
						href: href,
						cacheHref: cacheHref,
						secureCacheHref: cacheHref.replace( /^http:/i, 'https:' )
					} );

					$.insertAfter( cacheLink, link );
				}
			}
		}

		list.changeVersion = changeVersion;
		return list;
	}



	/*
	 * manipulate styles
	 */

	// returns a style element for the given selector and rules
	function getStyleElement( selector, rules, id ) {
		var buf = [ '<style id="', id || '', '" type="text/css">', selector, '{' ];

		$.each( rules, function( prop, val ) { buf.push( prop, ':', val, ';' ); } );

		buf.push('}</style>');

		return $( buf.join( '' ) );
	}

	// returns a string for the given tag and rules object
	function getInlineStyle( tag, rules ) {
		var buf = [ 'style="' ];

		if ( tag !== false ) {
			rules = $.extend( {}, CSS.defaults.reset, CSS.defaults[ tag ], rules || {} );
		}
		$.each( rules, function( prop, val ) { buf.push( prop, ':', val, ';' ); } );

		buf.push('"');

		return buf.join( '' );
	}

	// make cache links visible or hidden
	function setCacheLinkVisibility( isVisible ) {
		var style = $( '#' + ID.hideCacheLinks )[ 0 ];

		if ( !style ) {
			style = getStyleElement( 'a.' + ID.cacheLink, { 'display': 'none !important' }, ID.hideCacheLinks );
			head.appendChild( style );
		}

		style.disabled = style.sheet.disabled = isVisible;
	}

	// set colours for cache links
	function setCacheLinkColors() {
		var prevNormal = $( '#' + ID.cacheLinkColors )[ 0 ],
			prevHover = $( '#' + ID.cacheLinkHoverColors )[ 0 ],
			curNormal = getStyleElement( 'a.' + ID.cacheLink, {
				'background': options.cacheLinkBackgroundColor + ' !important',
				'color': options.cacheLinkTextColor + ' !important'
			}, ID.cacheLinkColors ),
			curHover = getStyleElement( 'a.' + ID.cacheLink + ':hover', {
				'background': options.cacheLinkTextColor + ' !important',
				'color': options.cacheLinkBackgroundColor + ' !important'
			}, ID.cacheLinkHoverColors );

		if ( prevNormal ) {
			head.replaceChild( curNormal, prevNormal );
		} else {
			head.appendChild( curNormal );
		}
		if ( prevHover ) {
			head.replaceChild( curHover, prevHover );
		} else {
			head.appendChild( curHover );
		}
	}



	/*
	 * manipulate html
	 */

	// updates hrefs for links
	function updateLinkHrefs( list, options ) {
		var cacheLinkProp = options.useHttps ? 'secureCacheHref' : 'cacheHref',
			linkProp = options.redirectPageLinks ? cacheLinkProp : 'href';

		$.each( list, function() {
			this.link.href = this[ linkProp ];
			this.cacheLink.href = this[ cacheLinkProp ];
		} );
	}

	// updated link text for cache links
	function updateCacheLinkText( list, text ) {
		$( '#' + ID.exampleCacheLink )[ 0 ].innerHTML = text;
		$.each( list, function() { this.cacheLink.innerHTML = text; } );
	}

	// adds a link for the original URL to the Google 404 page
	// should be safe to not add styles here
	function addOriginalLink( url ) {
		var msg = STRINGS.uncached.replace( /%s/g, '<a href="' + ( url.indexOf( '://' ) === -1 ? 'http://' : '' ) + url + '">' + url + '</a>' );

		$.append( body, $( '<p>' + msg + '</p>' ) );
	}

	// adds our explanation text and option panel to the cache page header
	function addExplanation( options, container ) {
		var space = '&nbsp;&nbsp;&nbsp;', link, input;

		// OMG this is ugly
		container.appendChild( $( [
			'<div ', getInlineStyle( 'div', CSS.explanation ), '>',
				'<span id="', ID.message, '"></span>',
				space,
				'<a href="" id="', ID.optionsLink, '" ', getInlineStyle( 'a' ), '></a>',
				space,
				'<a href="" id="', ID.aboutLink, '" ', getInlineStyle( 'a' ), '>',
					STRINGS.about,
				'</a>',
				space,
				'<a href="', STRINGS.homepageUrl, '" id="', ID.updateLink, '" ', getInlineStyle( 'a' ), ' target="_blank">',
					STRINGS.update,
				'</a>',

				'<div id="', ID.about, '" ', getInlineStyle( 'div', CSS.panel ), '>',
					'<p ', getInlineStyle( 'p' ), '>',
						'<b ', getInlineStyle( 'b' ), '>',
							STRINGS.aboutTitle,
						'</b>',
						'<br>',
						STRINGS.version.replace(/%s/g, VERSION ),
						'<br>',
						'<a href="', STRINGS.homepageUrl, '" target="_blank" ', getInlineStyle( 'a' ), '>',
							STRINGS.homepage,
						'</a>',
						space,
						'<a href="" id="', ID.checkLink, '" ', getInlineStyle( 'a' ), '>',
							STRINGS.check,
						'</a>',
						'<span id="', ID.checkStatus, '"></span>',
					'</p>',
					'<p ', getInlineStyle( 'p' ), '>',
						STRINGS.aboutText,
					'</p>',
					'<a href="" id="', ID.closeLink, '" ', getInlineStyle( 'a' ), '>', STRINGS.close, '</a>',
				'</div>',

				'<div id="', ID.options, '" ', getInlineStyle( 'div', CSS.panel ), '>',
					'<input type="checkbox" id="', ID.redirectPageLinks, '" ', getInlineStyle( 'input_checkbox' ), ' />',
					'<label for="', ID.redirectPageLinks, '" ', getInlineStyle( 'label' ), '>',
						STRINGS.redirectPageLinksLabel,
					'</label>',
					'<br>',
					'<input type="checkbox" id="', ID.useHttps, '" ', getInlineStyle( 'input_checkbox' ), ' />',
					'<label for="', ID.useHttps, '" ', getInlineStyle( 'label' ), '>',
						STRINGS.useHttpsLabel,
					'</label>',
					'<div ', getInlineStyle( 'div', CSS.panel ), '>',
						STRINGS.redirectPageLinksShortcut,
					'</div>',

					canSaveOptions() ? [
						'<table cellpadding="0" cellspacing="0" border="0" ', getInlineStyle( 'table' ), '>',
							'<tr>',
								'<th colspan="2" ', getInlineStyle( 'th' ), '>',
									STRINGS.cacheLinkOptions,
								'</th>',
							'</tr>',
							'<tr>',
								'<td ', getInlineStyle( 'td' ) + '>',
									'<label for="', ID.cacheLinkText, '" ', getInlineStyle( 'label' ), '>',
										STRINGS.cacheLinkTextLabel,
									'</label>',
								'</td>',
								'<td ', getInlineStyle( 'td' ) + '>',
									'<input type="text" id="', ID.cacheLinkText, '" value="', options.cacheLinkText.replace( /"/g, '&quot;' ), '" ', getInlineStyle( 'input_text' ) + ' />',
								'</td>',
							'</tr>',
							'<tr>',
								'<td ', getInlineStyle( 'td' ) + '>',
									'<label for="', ID.cacheLinkBackgroundColor, '" ', getInlineStyle( 'label' ) + '>',
										STRINGS.cacheLinkBackgroundColorLabel,
									'</label>',
								'</td>',
								'<td ', getInlineStyle( 'td' ) + '>',
									'<input type="text" id="', ID.cacheLinkBackgroundColor, '" value="', options.cacheLinkBackgroundColor.replace( /"/g, '&quot;' ), '" ', getInlineStyle( 'input_text' ) + ' />',
								'</td>',
							'</tr>',
							'<tr>',
								'<td ', getInlineStyle( 'td' ) + '>',
									'<label for="', ID.cacheLinkTextColor, '" ', getInlineStyle( 'label' ) + '>',
										STRINGS.cacheLinkTextColorLabel,
									'</label>',
								'</td>',
								'<td ', getInlineStyle( 'td' ) + '>',
									'<input type="text" id="', ID.cacheLinkTextColor, '" value="', options.cacheLinkTextColor.replace( /"/g, '&quot;' ), '" ', getInlineStyle( 'input_text' ) + ' />',
								'</td>',
							'</tr>',
						'</table>',
						STRINGS.textOptionInstructions,
						usingLocalStorage ? [
							'<br>',
							'<a href="" id="', ID.syncLink, '" ', getInlineStyle( 'a' ), '>',
								STRINGS.syncLinkText.replace( /%s/g, IS_HTTP ? 'HTTPS' : 'HTTP' ),
							'</a>',
							'<span id="', ID.syncing, '" style="display:none;">',
								STRINGS.syncing,
							'</span>',
							'<span id="', ID.syncDone, '" style="display:none;">&nbsp;',
								STRINGS.syncDone,
							'</span>'
						].join( '' ) : '',
					].join( '' ) : '',

				'</div>',
			'</div>'
		].join( '' ) ) );

		// options link
		link = $( '#' + ID.optionsLink )[ 0 ];
		link.addEventListener( 'click', optionsLinkClick, false );
		optionsLinkClick.call( link );

		// redirect page links checkbox
		input = $( '#' + ID.redirectPageLinks )[ 0 ];
		input.checked = options.redirectPageLinks;
		input.addEventListener( 'click', redirectPageLinksClick, false );
		redirectPageLinksClick.call( input );

		// use https checkbox
		input = $( '#' + ID.useHttps )[ 0 ];
		input.checked = options.useHttps;
		input.addEventListener( 'click', useHttpsClick, false );
		useHttpsClick.call( input );

		setCacheLinkColors();

		// other options
		if ( canSaveOptions() ) {
			$( '#' + ID.cacheLinkText )[ 0 ].addEventListener( 'change', cacheLinkTextChange, false );
			$( '#' + ID.cacheLinkBackgroundColor )[ 0 ].addEventListener( 'change', cacheLinkBackgroundColorChange, false );
			$( '#' + ID.cacheLinkTextColor )[ 0 ].addEventListener( 'change', cacheLinkTextColorChange, false );

			if ( usingLocalStorage ) {
				$( '#' + ID.syncLink )[ 0 ].addEventListener( 'click', syncLinkClick, false );
			}
		}

		// about and close links
		link = $( '#' + ID.aboutLink )[ 0 ];
		link.addEventListener( 'click', aboutLinkClick, false );
		link = $( '#' + ID.closeLink )[ 0 ];
		link.addEventListener( 'click', aboutLinkClick, false );
		aboutLinkClick.call( link );

		// check link
		link = $( '#' + ID.checkLink )[ 0 ];
		if ( options.canCheckForUpdate ) {
			link.addEventListener( 'click', checkLinkClick, false );
		} else {
			link.style.display = 'none';
		}

		// check status
		$( '#' + ID.checkStatus )[ 0 ].style.display = 'none';

		updateUpdateLink( options );

		window.addEventListener( 'unload', function() {
			window.removeEventListener( 'unload', arguments.callee, false );

			$( '#' + ID.optionsLink )[ 0 ].removeEventListener( 'click', optionsLinkClick, false );
			$( '#' + ID.redirectPageLinks )[ 0 ].removeEventListener( 'click', redirectPageLinksClick, false );
			$( '#' + ID.useHttps )[ 0 ].removeEventListener( 'click', useHttpsClick, false );

			if ( canSaveOptions() ) {
				$( '#' + ID.cacheLinkText )[ 0 ].removeEventListener( 'change', cacheLinkTextChange, false );
				$( '#' + ID.cacheLinkBackgroundColor )[ 0 ].removeEventListener( 'change', cacheLinkBackgroundColorChange, false );
				$( '#' + ID.cacheLinkTextColor )[ 0 ].removeEventListener( 'change', cacheLinkTextColorChange, false );

				if ( usingLocalStorage ) {
					$( '#' + ID.syncLink )[ 0 ].removeEventListener( 'click', syncLinkClick, false );
				}
			}

			$( '#' + ID.aboutLink )[ 0 ].removeEventListener( 'click', aboutLinkClick, false );
			$( '#' + ID.closeLink )[ 0 ].removeEventListener( 'click', aboutLinkClick, false );
			$( '#' + ID.checkLink )[ 0 ].removeEventListener( 'click', checkLinkClick, false );
		}, false);
	}



	/*
	 * check for update
	 */

	function shouldCheckForUpdate( options ) { return now() - parseInt( options.lastUpdateCheck, 10 ) >= UPDATE_CHECK_INTERVAL * 86400000; }

	function checkForUpdate( options ) {
		options.lastUpdateCheck = now() + '';
		saveOptions( options );

		showChecking();

		try {
			GM_xmlhttpRequest( {
				method: 'GET',
				url: STRINGS.metaUrl + '?_=' + now(),

				onload: function( data ) {
					var a = /\/\/[ \t]*@version[ \t]+([^\s]+)/.exec( data.responseText || '' ),
						ver = ( a && a[ 1 ] ) || VERSION;

					if ( data.status === 200 && ver >= VERSION ) {
						options.latestVersion = ver;
						saveOptions( options );
					}

					showCheckResult( options, true );
				},

				onerror: function () { showCheckResult( options, false ); }
			} );

		} catch ( e ) {
			showCheckResult( options, false );
		}
	}

	function showChecking() {
		var status = $( '#' + ID.checkStatus )[ 0 ];
		status.innerHTML = STRINGS.checking;
		status.style.display = 'inline';

		$( '#' + ID.checkLink )[ 0 ].style.display = 'none';
		$( '#' + ID.updateLink )[ 0 ].style.display = 'none';
	}

	function showCheckResult( options, success ) {
		var msg;

		if ( success ) {
			msg = options.latestVersion > VERSION ? STRINGS.updateAvailable : STRINGS.noUpdateAvailable;
		} else {
			msg = STRINGS.checkError;
		}

		$( '#' + ID.checkStatus )[ 0 ].innerHTML = msg;

		updateUpdateLink( options );
	}

	function updateUpdateLink( options ) {
		$( '#' + ID.updateLink )[ 0 ].style.display = options.latestVersion > VERSION ? 'inline' : 'none';
	}



	/*
	 * synchronize options (between http and https)
	 */

	// we need to use execScript() here because Chrome won't let an extension on the parent window access the window object of an iframe
	// (or an extension on the iframe access the parent window object)
	// this all depends on Google not setting X-Frame-Options on their 404 page :-(

	function syncOptions() {
		var iframe;

		if ( !syncing ) {
			iframe = $( '<iframe id="' + ID.syncIframe + '" width="1" height="1" style="position:absolute;top:-99999px;visibility:hidden;"></iframe>' );
			iframe.addEventListener( 'load', syncIframeLoad, false );
			iframe.src = getTargetOrigin() + STRINGS.syncPath;
			body.appendChild( iframe );
			syncing = true;

			// if the iframe takes too long to load, force cleanup
			syncCleanup.timeout = window.setTimeout( syncCleanup, 10000 );

			$( '#' + ID.syncLink )[ 0 ].style.display = 'none';
			$( '#' + ID.syncing )[ 0 ].style.display = 'inline';
			$( '#' + ID.syncDone )[ 0 ].style.display = 'none';
		}
	}

	function syncIframeLoad() {
		// setTimeout in case our (greasemonkey) script runs after onload
		window.setTimeout( receivedMessage, 1000 );
	}

	function syncCleanup( success ) {
		var iframe, after;

		if ( syncing ) {
			iframe = document.getElementById( ID.syncIframe );
			iframe.removeEventListener( 'load', syncIframeLoad, false );
			body.removeChild( iframe );
			syncing = false;

			after = function() {
				$( '#' + ID.syncLink )[ 0 ].style.display = 'inline';
				$( '#' + ID.syncing )[ 0 ].style.display = 'none';
				$( '#' + ID.syncDone )[ 0 ].style.display = 'none';
			};

			if ( success ) {
				$( '#' + ID.syncDone )[ 0 ].style.display = 'inline';
				window.setTimeout( after, 2000 );
			} else {
				after();
			}
		}

		window.clearTimeout( syncCleanup.timeout );
	}

	function receivedMessage( e ) {
		var me = arguments.callee,
			parent = me.parent,
			iframe = me.iframe,
			data;

		if ( !e ) { // init sync
			if ( !parent && !iframe ) {
				parent = me.parent = getToken();

				postToIframe( {
					type: 'init',
					parent: parent
				} );
			}

		} else if ( e.origin === getTargetOrigin() ) {
			data = window.JSON.parse( e.data ) || {};

			switch ( data.type ) {
			case 'init': // received init from parent, acknowledge
				if ( !parent && !iframe ) {
					parent = me.parent = data.parent;
					iframe = me.iframe = getToken();

					postToParent( {
						type: 'init-ack',
						parent: parent,
						iframe: iframe
					} );
				}
				break;

			case 'init-ack': // init complete, send options
				if ( data.parent === parent && !iframe ) {
					iframe = me.iframe = data.iframe;

					postToIframe( {
						type: 'sync',
						parent: parent,
						iframe: iframe,
						options: $.extend( {}, options )
					} );
				}
				break;

			case 'sync': // received options from parent
				if ( data.parent === parent && data.iframe === iframe ) {
					$.extend( options, data.options );
					saveOptions( options );

					postToParent( {
						type: 'sync-ack',
						parent: parent,
						iframe: iframe
					} );

					me.parent = me.iframe = true;
				}
				break;

			case 'sync-ack': // sync complete
				if ( data.parent === parent && data.iframe === iframe ) {
					syncCleanup( true );
					me.parent = me.iframe = null;
				}
				break;
			}
		}
	}

	function postToIframe( data ) {
		execScript( [
			'document.getElementById(\'', ID.syncIframe, '\')',
				'.contentWindow',
					'.postMessage(\'', window.JSON.stringify( data ).replace( /\\/g, '\\\\' ).replace( /'/g, '\\\'' ), '\', \'', getTargetOrigin(), '\');'
		].join( '' ) );
	}

	function postToParent( data ) {
		execScript( [
			'if ( parent !== self ) {',
				'parent.postMessage(\'', window.JSON.stringify( data ).replace( /\\/g, '\\\\' ).replace( /'/g, '\\\'' ), '\', \'', getTargetOrigin(), '\');',
			'}'
		].join( '' ) );
	}

	function getTargetOrigin() {
		var me = arguments.callee;

		if ( !me.cached ) {
			me.cached = ( IS_HTTP ? 'https:' : 'http:' ) + '//' + location.host;
		}

		return me.cached;
	}



	/*
	 * event handlers
	 */

	// show / hide options panel
	function optionsLinkClick( e ) {
		var panel = $( '#' + ID.options )[ 0 ];

		if ( e ) {
			e.preventDefault();
		}

		if ( panel.style.display === 'none' ) {
			this.innerHTML = STRINGS.hideOptions;
			panel.style.display = 'block';
		} else {
			this.innerHTML = STRINGS.showOptions;
			panel.style.display = 'none';
		}
	}

	function redirectPageLinksClick() {
		var redirect = this.checked;

		options.redirectPageLinks = redirect;
		saveOptions( options );

		updateLinkHrefs( links, options );
		setCacheLinkVisibility( !redirect );

		$( '#' + ID.message )[ 0 ].innerHTML = redirect ?
			STRINGS.redirectLinkExplanation :
			STRINGS.cacheLinkExplanation.replace( /%s/g, '<a href="" id="' + ID.exampleCacheLink + '" class="' + ID.cacheLink + '" ' + getInlineStyle( 'a', CSS.cacheLink ) + '>' + options.cacheLinkText + '</a>' );
	}

	function useHttpsClick() {
		options.useHttps = this.checked;
		saveOptions( options );

		updateLinkHrefs( links, options );
	}

	function cacheLinkTextChange() {
		this.value = $.trim( this.value );
		if ( !this.value ) {
			this.value = defaultOptions.cacheLinkText;
		}

		options.cacheLinkText = this.value;
		saveOptions( options );

		updateCacheLinkText( links, options.cacheLinkText );
	}

	function cacheLinkBackgroundColorChange() {
		this.value = $.trim( this.value );
		if ( !this.value ) {
			this.value = defaultOptions.cacheLinkBackgroundColor;
		}

		options.cacheLinkBackgroundColor = this.value;
		saveOptions( options );

		setCacheLinkColors();
	}

	function cacheLinkTextColorChange() {
		this.value = $.trim( this.value );
		if ( !this.value ) {
			this.value = defaultOptions.cacheLinkTextColor;
		}

		options.cacheLinkTextColor = this.value;
		saveOptions( options );

		setCacheLinkColors();
	}

	function syncLinkClick( e ) {
		e.preventDefault();

		syncOptions();
	}

	// show / hide about panel
	function aboutLinkClick( e ) {
		var panel = $( '#' + ID.about )[ 0 ];

		if ( e ) {
			e.preventDefault();
		}

		panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
	}

	// initiate check for update
	function checkLinkClick( e ) {
		e.preventDefault();

		checkForUpdate( options );
	}

	// handle keyboard shortcuts
	function shortcutKeypress( e ) {
		var active = document.activeElement,
			nodeName = active.nodeName.toUpperCase(),
			type = ( active.type || '' ).toLowerCase(),
			input;

		switch ( e.charCode || e.keyCode ) {
		case KEYS.toggleRedirectPageLinks:
			if ( !e.altKey && !e.ctrlKey && !e.shiftKey &&
					( nodeName !== 'INPUT' || type === 'checkbox' || type === 'radio' ) &&
					nodeName !== 'SELECT' && nodeName !== 'TEXTAREA' ) {

				input = $( '#' + ID.redirectPageLinks )[ 0 ];
				if ( input ) {
					input.checked = !input.checked;
					redirectPageLinksClick.call( input );
				}
			}
		}
	}



	/*
	 * misc
	 */

	// returns the current epoch time
	function now() { return ( new Date() ).getTime(); }

	// returns a unique token string
	function getToken() { return ( Math.random() + '' ).replace( /\D/g, '' ); }

	// prepends 'googleCache' and appends a unique token to each id
	function generateIds( list ) {
		var token = getToken(), ids = {};
		$.each( list, function( i, name ) { ids[ name ] = 'googleCache' + name.charAt( 0 ).toUpperCase() + name.substring( 1 ) + token; } );
		return ids;
	}

	// runs the given script by appending a script element to the page
	function execScript( code ) {
		var script = document.createElement( 'script' ); // Chrome is picky about how this is created
		script.appendChild( document.createTextNode( code ) );
		body.appendChild( script );
		window.setTimeout( function() { body.removeChild( script ); }, 500 ); // not sure we need to wait, but doesn't hurt?
	}

})( window, document, document.getElementsByTagName( 'head' )[ 0 ], document.body, window.location );

