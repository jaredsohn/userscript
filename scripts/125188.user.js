// ==UserScript==
// @name TwitterFix
// @namespace darkhogg.es
// @author Daniel Escoz
// @include http://twitter.com/*
// @include https://twitter.com/*
// @match http://twitter.com/*
// @match https://twitter.com/*
// @run-at document-end
// @version 1.2.4
// ==/UserScript==

/* Global configuration object */
var GLOBAL = {}
GLOBAL.options = { 'widen':true, 'swap':true };
GLOBAL.menuVisible = false;

function loadData () {
	var options = JSON.parse( localStorage.getItem( 'TwFix:Options' ) );
	if ( options != null ) {
		GLOBAL.options.widen = true && options.widen;
		GLOBAL.options.swap  = true && options.swap;
	}
}

function saveData () {
	localStorage.setItem( 'TwFix:Options', JSON.stringify( GLOBAL.options ) );
}

/* Returns the <style> tag used by this script */
function getStyleTag () {
	var tag = document.getElementById( '-twfix--style-' );
	
	if ( !tag ) {
		tag = document.createElement( 'style' );
		tag.setAttribute( 'type', 'text/css' );
		tag.id = '-twfix--style-';
		
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( tag );
	}
	
	return tag;
}

function toggleMenu () {
	if ( GLOBAL.menuVisible ) {
		hideMenu();
	} else {
		showMenu();
	}
}

function showMenu () {
	GLOBAL.menuVisible = true;
	
	var menu = document.getElementById( '-twfix--menu-' );
	menu.style.display = 'block';
}

function hideMenu () {
	GLOBAL.menuVisible = false;
	
	var menu = document.getElementById( '-twfix--menu-' );
	menu.style.display = 'none';
}

function toggleSwap () {
	GLOBAL.options.swap = !GLOBAL.options.swap;
	updateAll();
	saveData();
}

function toggleWiden () {
	GLOBAL.options.widen = !GLOBAL.options.widen;
	updateAll();
	saveData();
}

function initialize () {
	var body = document.getElementsByTagName( 'body' )[ 0 ];
	
	
	// Base button
	var menuButton = document.createElement( 'a' );
	menuButton.innerHTML = '&#x25BC;&nbsp;&nbsp;TwFix';
	menuButton.setAttribute( 'href', 'javascript:void(0)' );
	menuButton.addEventListener( 'click', function(ev){
		toggleMenu();
	} );
	menuButton.style.position = 'fixed';
	menuButton.style.top  = '20px';
	menuButton.style.left = '6px';
	menuButton.style.zIndex = '1024';
	menuButton.style.color      = '#666';
	menuButton.style.fontWeight = 'bold';
	menuButton.style.fontSize   = '12px';
	menuButton.style.fontFamily = 'sans';
	
	body.appendChild( menuButton );
	
	
	// Create the main menu
	var menuDiv = document.createElement( 'div' );
	menuDiv.id = '-twfix--menu-';
	menuDiv.setAttribute( 'class', 'module' );
	menuDiv.style.position = 'fixed';
	menuDiv.style.top  = '44px';
	menuDiv.style.left = '4px';
	menuDiv.style.padding = '5px 8px';
	menuDiv.style.background = '#F2F2F2';
	menuDiv.innerHTML =
		'<p><label><input id="-twfix--swap-checkbox-" type="checkbox"> Swap Columns</label></p>' +
		'<p><label><input id="-twfix--widen-checkbox-" type="checkbox"> Widen Page to 960px</label></p>';
		
	body.appendChild( menuDiv );
	
	document.getElementById( '-twfix--swap-checkbox-' ).addEventListener( 'change', function(ev){ toggleSwap(); } );
	document.getElementById( '-twfix--widen-checkbox-' ).addEventListener( 'change', function(ev){ toggleWiden(); } );
	
	// Hide the menu
	hideMenu();
}

function updateAll () {
	var widen = ( GLOBAL.options.widen == true );
	var swap  = ( GLOBAL.options.swap == true );
	
	// Start with an empty set of rules
	var rules = '';
	
	// Rules to widen the page to 960px
	if ( widen ) {
		rules += '#page-container { width: 960px !important; }'
		       + '.content-main { width: 646px !important; }'
		       + '.global-nav-inner .container { width: 960px !important; }'
		       + '#global-actions { margin-left: -14px;}'
		       + '.global-nav-inner .container .pull-right { margin-right: -14px;}'
	}
	
	// Rules to swap the columns
	if ( swap ) {
		rules += '.dashboard { float: right !important; }'
		       + '.content-main { margin-right: 12px !important; }'
		       + '#suggested-users { clear: none !important; }';
	}
	
	// Update the checkboxes
	document.getElementById( '-twfix--swap-checkbox-' ).checked = GLOBAL.options.swap;
	document.getElementById( '-twfix--widen-checkbox-' ).checked = GLOBAL.options.widen;
	
	// Apply the rules!
	var elem = getStyleTag();
	elem.innerHTML = rules;
}

(function(){
	
	initialize();
	loadData();
	updateAll();
	
})();