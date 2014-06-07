// ==UserScript==
// @run-at		document-start
// @nocompat
// @name		AGO Module: Template - do not install
// @description	AntiGameOrigin Module: This is the template for your own AGO modules. Please to not install.
// @version		5.6.2
// @author		Francolino
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_deleteValue
// @grant		GM_log
// @grant		GM_getResourceURL
// @include		http://*.ogame.*/game/index.php?*page=*
// ==/UserScript==

// Documentation: http://board.antigame.de/viewtopic.php?f=33&t=1346

( function() {
	var isGM											= ( typeof GM_getResourceURL === 'function' );
	var Data;

	
	window.addEventListener( 'ago_modules', dispatchMessages, false );
	

	
	function dispatchMessages( e ) {
		var result, page, role, data;

		try												{ result = JSON.parse( e.detail || '{}' ); }
		catch( e )										{ result = {}; }

		page											= result.page || '';
		role											= result.role || '';
		
	//	if ( page !== 'Timer' )							{ log( page + ' - ' + role + ' - ' + JSON.stringify( result.data || '' ) ); }

		if ( page === 'Init' ) {
			Data										= result.data;
			Init();
		}
		else if ( page === 'Page' ) {
			if ( role === 'Run' )						{ Run(); }
			else if ( role === 'Interactive' )			{ Interactive(); }
			else if ( role === 'Ready' )				{ Ready(); }													
			else if ( role === 'Complete' )				{ Complete(); }
			else if ( role === 'Content' )				{ Content( result.data ); }
		}
		
		else if ( page === 'Events' )					{ Events( role, result.data ); }
		
		else if ( page === 'Overlay' )					{ Overlay( role, result.data ); }
		else if ( page === 'Timer' )					{ Timer(); }
	}
	
	
	
	function Init() {
		var styleNode, register;
		
		// Inser CSS styles
		styleNode										= document.createElement( 'style' );
		styleNode.media									= 'screen';
		styleNode.type									= 'text/css';
		styleNode.textContent							= Styles();
		document.head.appendChild( styleNode );

		
		// Register module to enable sending messages and submitting complete data objects
		register										= {													// 0 off   1 on
			modeMovement								: 0,												// Submit complete data object with all values ( not available yet )
			modeGalaxy									: 0,												// Submit complete data object with all values ( not available yet )
			modeMessages								: 0,												// Submit complete data object with all values ( not available yet )
			modeEvents									: 0,												// Submit complete data object with all values
			modePhalanx									: 0,												// Submit complete data object with all values
			modeTimer									: 0,												// Timer each second
		};

		// register.Option										= {}											// Display / store own option settings in AGO menu
	
		message( 'Init', 'Register', register );
	}
	
	
	
	// Called each second - triggered from the OGame timer
	function Timer() {
		
		// log('AGO_Module - Timer' );
	}
	
	
	// document.readyState is NOT surely 'interactive' - 'loading' is possible in Chrome /Opera Next
	// Important parts of the DOM are available ( Menu, Planetlist ... )
	// AGO does most of all changes here as soon as possible
	function Run() {
		
		// log('AGO_Module - Run' );
	}
	
	
	// document.readyState is sure 'interactive'
	// DOM is complete, jQuery is available, OGame variables, functions etc are available
	// AGO does those changes here which requieres OGame variables or functions
	function Interactive() {
		
		// log('AGO_Module - Interactive ' + Data.page );
	}
	

	// Called from jQuery.ready()
	// OGame finished all dynamic changes on the page
	// AGO does update the display here ( changing buttons, showing time or other values .... )
	function Ready() {
		
		// log('AGO_Module - Ready' );
	}
	
	
	
	// Called after Ready with a timeout - Usefull for changes which can be done "later"
	// AGO does the last things here like disabling autocomplete of input fields etc
	function Complete() {
		
		// log('AGO_Module - Complete ' + Data.page );
	}
	
	
	
	// Page content changes - Resources, Facilities, Shipyard, Research, Galaxy, Alliance, Messages, .....
	// data.Data: contains the values ( if available / enabled )
	function Content( data ) {
		
	//	log('AGO_Module - Content ' + Data.page + ' --- ' + JSON.stringify( data || '' ) );
		 
		if ( Data.page === 'resources' ) {}
	}	
		
	
	
	// Events
	// data.Data: contains the values of all fleets in events ( if enabled )
	function Events( role, data ) {
		
	//	log('AGO_Module - Events ' + role + ' --- ' + JSON.stringify( data || '' ) );
		 
		if ( role === 'Content' ) {}
	}	
	
	
	
	// Overlays - Jumpgate, Phalanx .....
	// data.overlay: ID of the overlay content DIV
	// data.Data: contains the values ( if available / enabled )
	function Overlay( role, data ) {
		var overlayNode;
		
		overlayNode										= ( data.overlay ) ? document.getElementById( data.overlay ) : null;
		if ( overlayNode ) {
			
		//	log('AGO_Module - Overlay ' + role + ' --- ' + JSON.stringify( data || '' ) );
		
			if ( data.page === 'jumpgatelayer' ) {
			
				if ( role === 'Content' ) {}
			}
		}
	}
	
	// Use native CSS Syntax !
	function Styles() {
		var style;
		var page;

		// CSS style for all pages and overlays
		style = function(){/*

			#playerName + li a { color: red !important; }
			

		*/}.toString().slice(14,-3);
	

		// CSS style for page overview
		if ( Data.page === 'overview' ) {
			style += function(){/*

				#playerName + li a { color: blue !important; }


		*/}.toString().slice(14,-3);
		}
		
		
		// CSS style for page fleet1
		else if ( Data.page === 'fleet1' ) {
			style += function(){/*

				#playerName + li a { color: green !important; }


		*/}.toString().slice(14,-3);
		}
		
		return style;
	}
	
	
	
	function message( page, role, data ) {
		
		window.dispatchEvent( new CustomEvent( 'ago_modules_send', { detail:  JSON.stringify( { page: page || '', role: role || '', data: data || '' } ) } ) );
	}
	
	
	function log( text ) {
		
		if ( isGM )										{ GM_log( text ); }
		else if ( 'console' in window )					{ window.console.log( text ); }
	}
	
	
	
}() );