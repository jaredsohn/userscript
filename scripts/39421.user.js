// ==UserScript==
// @name           DibaAutoLogin
// @namespace      de.ing-diba.banking
// @description    ING DiBa AutoLogin, ohne nervigen Key-Check
// @include        https://banking.ing-diba.de/*
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// @version        6
// @updateURL      https://userscripts.org/scripts/source/39421.meta.js
// @downloadURL    https://userscripts.org/scripts/source/39421.user.js
// ==/UserScript==

var SETTINGS_KEY_NAME = "DiBaKey";

function log( str ) {
	console.log( "DibaAutoLogin: " + str );
}

function configureKey() {
	var my_key = prompt( "Gib den 6-stelligen DiBa-Key ein, wird lokal in Greasemonkey gespeichert:", "" );
	GM_setValue( SETTINGS_KEY_NAME, my_key );
	return my_key;
}
GM_registerMenuCommand( "DiBa-Key einstellen", configureKey );

if( GM_getValue( SETTINGS_KEY_NAME ) ) {
	GM_registerMenuCommand( "DiBa-Key entfernen", function() {
		if( window.confirm( "DiBa-Key aus Greasemonkey entfernen?" ) )
			GM_deleteValue( SETTINGS_KEY_NAME );
	});
}

var my_key = GM_getValue( SETTINGS_KEY_NAME, "" );
if( my_key.length != 6 ) {
	mey_key = configureKey();
}

var cleanPathname = location.pathname.replace( /;.*/, "" );

if( cleanPathname == "/app/login"  ) {
	if( $( ".keypad" ).length == 0 ) {
		log( "Login-Screen, enabling autocomplete" );
		$( "input" ).attr( "autocomplete", "on" );
	}
	else {
		if( $(".error").length == 0 ) {
			log( "Entering keys" );
			function enterRequestedKeys() {
				if( $( ".dbkpInputDisabled" ).length < 2 ) {
					setTimeout( enterRequestedKeys, 100 );
				}
				else {
					$( ".dbkpInputDisabled" ).prev( "span" ).each( function( index ) {
						var requestedDigit = parseInt( $(this).text() );
						var missingDigit = my_key.substr( requestedDigit - 1, 1 );
						var sel = ".pw12-button-medium span:contains('" + missingDigit + "')";
						var target = $( sel ).parent()[0];
						// diba-code listens on mouseup-event, synthesize and dispatch event
						var event = target.ownerDocument.createEvent( "MouseEvents" );
						event.initEvent( "mouseup", true, true );
						target.dispatchEvent( event );
					});
					$( ".pw12-button-call-to-action" ).click();
				}
			}
			enterRequestedKeys();
		}
		else {
			log( "Error-Element found, doing nothing to prevent lockout" );
		}
	}
}
