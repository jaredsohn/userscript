// ==UserScript==
// @name TwitterModable
// @namespace http://quentinfonteneau.com
// @author Tarok
// @include http://twitter.com/*
// @include https://twitter.com/*
// @match http://twitter.com/*
// @match https://twitter.com/*
// @run-at document-end
// @version 1.1.1
// ==/UserScript==

/* Global configuration object */
var GLOBAL = {}
GLOBAL.options = { 'widen':true,'suggest':true,'footer':true, 'swap':true, 'tendance':true };
GLOBAL.menuVisible = false;

function loadData () {
	var options = JSON.parse( localStorage.getItem( 'TwModable:Options' ) );
	if ( options != null ) {
		GLOBAL.options.widen = true && options.widen;
		GLOBAL.options.swap  = true && options.swap;
		GLOBAL.options.suggest  = true && options.suggest;
		GLOBAL.options.footer  = true && options.footer;
		GLOBAL.options.tendance  = true && options.tendance;
		}
}

function saveData () {
	localStorage.setItem( 'TwModable:Options', JSON.stringify( GLOBAL.options ) );
}

/* Returns the <style> tag used by this script */
function getStyleTag () {
	var tag = document.getElementById( '-twmodable--style-' );
	
	if ( !tag ) {
		tag = document.createElement( 'style' );
		tag.setAttribute( 'type', 'text/css' );
		tag.id = '-twmodable--style-';
		
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
	
	var menu = document.getElementById( '-twmodable--menu-' );
	menu.style.display = 'block';
}

function hideMenu () {
	GLOBAL.menuVisible = false;
	
	var menu = document.getElementById( '-twmodable--menu-' );
	menu.style.display = 'none';
}

function toggleSwap () {
	GLOBAL.options.swap = !GLOBAL.options.swap;
	updateAll();
	saveData();
}

function toggleSuggest () {
	GLOBAL.options.suggest = !GLOBAL.options.suggest;
	updateAll();
	saveData();
}
function toggleFooter () {
	GLOBAL.options.footer = !GLOBAL.options.footer;
	updateAll();
	saveData();
}
function toggleTendance () {
	GLOBAL.options.tendance = !GLOBAL.options.tendance;
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
	menuButton.innerHTML = '&#x25BC;&nbsp;&nbsp;TwModable';
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
	menuButton.style.fontFamily = 'Tahoma, Arial';
	
	body.appendChild( menuButton );
	
	
	// Create the main menu
	var menuDiv = document.createElement( 'div' );
	menuDiv.id = '-twmodable--menu-';
	menuDiv.setAttribute( 'class', 'module' );
	menuDiv.style.position = 'fixed';
	menuDiv.style.top  = '44px';
	menuDiv.style.left = '4px';
	menuDiv.style.padding = '5px 8px';
	menuDiv.style.background = '#F2F2F2';
	menuDiv.innerHTML =
		'<p><label><input id="-twmodable--swap-checkbox-" type="checkbox"> Swap Columns</label></p>' +
		'<p><label><input id="-twmodable--widen-checkbox-" type="checkbox"> Widen Page to 960px</label></p>'+
		'<p><label><input id="-twmodable--suggest-checkbox-" type="checkbox"> Show Suggest</label></p>' +
		'<p><label><input id="-twmodable--tendance-checkbox-" type="checkbox"> Show TT</label></p>' +
		'<p><label><input id="-twmodable--footer-checkbox-" type="checkbox"> Show Footer</label></p>';
		
	body.appendChild( menuDiv );
	
	document.getElementById( '-twmodable--swap-checkbox-' ).addEventListener( 'change', function(ev){ toggleSwap(); } );
	document.getElementById( '-twmodable--widen-checkbox-' ).addEventListener( 'change', function(ev){ toggleWiden(); } );
	document.getElementById( '-twmodable--suggest-checkbox-' ).addEventListener( 'change', function(ev){ toggleSuggest(); } );		
	document.getElementById( '-twmodable--tendance-checkbox-' ).addEventListener( 'change', function(ev){ toggleTendance(); } );		
	document.getElementById( '-twmodable--footer-checkbox-' ).addEventListener( 'change', function(ev){ toggleFooter(); } );
	
	// Hide the menu
	hideMenu();
}

function updateAll () {
	var widen = ( GLOBAL.options.widen == true );
	var swap  = ( GLOBAL.options.swap == true );
	var suggest  = ( GLOBAL.options.suggest == true );	
	var footer  = ( GLOBAL.options.footer == true );
	var tendance  = ( GLOBAL.options.tendance == true );
	
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
	}
	
	if ( suggest ) {
		rules += '.js-wtf-module, .wtf-module.has-content { display: none; }'

	}		
	if ( tendance ) {
		rules += '.flex-module.trends-inner { display: none; }'
		

	}	
		if ( footer ) {
		rules += '.site-footer { display: none; }'

	}
	console.info(rules);
	// Update the checkboxes
	document.getElementById( '-twmodable--swap-checkbox-' ).checked = GLOBAL.options.swap;
	document.getElementById( '-twmodable--widen-checkbox-' ).checked = GLOBAL.options.widen;	
	document.getElementById( '-twmodable--suggest-checkbox-' ).checked = !GLOBAL.options.suggest;
	document.getElementById( '-twmodable--tendance-checkbox-' ).checked = !GLOBAL.options.tendance;
	document.getElementById( '-twmodable--footer-checkbox-' ).checked = !GLOBAL.options.footer;
	
	// Apply the rules!
	var elem = getStyleTag();
	elem.innerHTML = rules;
}

(function(){
	
	initialize();
	loadData();
	updateAll();
	
})();