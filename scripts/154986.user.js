// ==UserScript==
// @name Strange Crap for Google Search
// @description Adds facebook like and twitter search results to google search
// @namespace http://glazs.ru
// @author Eugene glazs Glazyrin
// @license CC BY
// @version 0.5
// @include *://www.google.*/*
// @match http://www.google.ru/*
// @match https://www.google.ru/*
// @match http://www.google.com/*
// @match https://www.google.com/*
// ==/UserScript==

/*

 Sorry for crappy english ;)

 */

;( function( window ) { // Don't shit to global context, dude!

	var options = { // Wow, settings
		debug: false, // set to true for recieve debug messages and prevent caching
		location: 'http://extension.glazs.ru/' // script path
	}

	function StrangeCrapForGoogleSearch ( globalContext ) { // concstuctor for connect extension

		var t = this,

			init = function () {

				t.message = message // save for call from real script
				t.options = options // save for call from real script

				t.checkLocationInterval = setInterval(function () { // google using ajax. simplest way for page monitoring is check current page url
					if ( checkLocation() ) {
						connect() // connect script if we on google search page with query
						clearInterval( t.checkLocationInterval )
					}
				}, 100)

			}

		checkLocation = function () { // Is it google search page?

			var loc = globalContext.location.href,
				reg = new RegExp( '(\\/)(\\/)(www)(\\.)(google)(\\.).*(\\/)*(&q=|\\?q=|\\#q=).*' )

			return reg.test( loc )

		}

		connect = function () { // connect script to page

			var doc = globalContext.document,
				head = doc.getElementsByTagName( 'head' )[0],
				script = doc.createElement( 'script' ),
				src = options.location + 'extension.js'

			src = options.debug ? src + '?preventCache=' + Math.random() : src
			script.type = 'text/javascript'
			script.src = src
			script.async = true
			script.id = 'strange-crap-for-google-search'

			if ( ! doc.getElementById( script.id ) ) // prevent double script adding
				head.appendChild( script )

		}

		init()

	}


	var globalContext = function () { // getting global context
		var w = unsafeWindow || window
		if ( typeof unsafeWindow === "undefined" ) {
			w = ( function () {
				var p = document.createElement( 'p' )
				p.setAttribute ( 'onclick', 'return window;' )
				return p.onclick()
			} ) ()
		}
		return w
	}()


	var message = function () { // log debug messages
		if ( ! options.debug ) {
			return function () {}
		} else {
			var say = globalContext.console ? globalContext.console : alert
			return function ( text, type ) {
				text = 'GoogleCrapAdd extension:\n' + text
				if ( say[ type || 'info' ] )
					say[ type || 'info' ]( text )
				else
					say( text )
			}
		}

	}()


	if ( globalContext ) // connect extension if we got global context or report fail
		globalContext.strangeCrapForGoogleSearch = new StrangeCrapForGoogleSearch( globalContext )
	else
		alert( "GoogleCrapAdd extension message fatal error: Can't get global context." )


} ) ( window );