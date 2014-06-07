// ==UserScript==
// @name           Quake Live Window Mode Extender
// @version        1.3
// @namespace      Lam
// @description    Adds modes, changes window mode resolution and removes white boxes
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @updateURL      https://userscripts.org/scripts/source/115670.meta.js
// ==/UserScript==

/*
BASED OFF KRY'S SCRIPT, license and documentation below:
*/

/************************************************************

Licensed for unlimited modification and redistribution
as long as this notice is kept intact.

Quake Live Windowed Mode Background Color script made by kry.
Change the variable color to any color you'd like to use.
The preset color is black.

If you'd like to use a background image, change variable color
to "url(yourbackgroundimageurl)".



If you'd like to add more css styles (center background image
or something) add them to var othercss.

************************************************************/

var color = "black";
var morecss = "";

var viewportcolor = "#1a1511";
var viewportmorecss = "";


// some additional usable modes for window mode
var addedmodes = [ 8, "800x500", 10, "1024x640", 13, "1152x864", 14, "1280x720", 16, "1280x800", 18, "1440x900", 19, "1600x900", 20, "1600x1000"];


/**
 * GM_ API emulation for Chrome
 * 2009, 2010 James Campos
 * cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
 */
if (typeof GM_getValue == "undefined") {
  GM_addStyle = function(css) {
    var style = document.createElement('style');
    style.textContent = css;
    document.getElementsByTagName('head')[0].appendChild(style);
  }
}


var quakelive = unsafeWindow.quakelive;
var $ = unsafeWindow.jQuery;

var oldNav = quakelive.mod_prefs.Nav;
quakelive.mod_prefs.Nav = function( section ) {
	oldNav.call( quakelive.mod_prefs, section );
	if ("settings_basic" == section) {
		var modecombo = document.getElementsByName( 'r_inbrowsermode' )[0];
		var current = quakelive.cvars.Get( 'r_inbrowsermode' ).value;
		for ( i = 0; i < addedmodes.length; i += 2 ) {
			var newoption = document.createElement( 'option' );
			newoption.value = addedmodes[ i ];
			newoption.innerHTML = addedmodes[ i + 1 ];
			modecombo.appendChild( newoption );
			if ( addedmodes[ i ] == current ) {
				modecombo.selectedIndex = modecombo.options.length - 1;
			}
		}
	}
}

var oldCloseOverlay = quakelive.mod_prefs.CloseOverlay;
quakelive.mod_prefs.CloseOverlay = function( section ) {
	oldCloseOverlay.call( quakelive.mod_prefs, section );
	var d = quakelive.cvars.Get("r_inBrowserMode");
	var w = quakelive.cvars.screenModes[ d.value ][ 0 ];
	var h = quakelive.cvars.screenModes[ d.value ][ 1 ];
//	unsafeWindow.console.log( 'current mode:' + d.value + ', ' + w + 'x' + h );
	var qzinstance = document.getElementById( 'qz_instance' );
	if ( qzinstance ) {
		qzinstance.removeAttribute('style');
		qzinstance.style.width = w + 'px';
		qzinstance.style.height = h + 'px';
	} else {
		unsafeWindow.console.log( 'qz_instance not found' );
	}
	$( 'div.game_wrapper' ).css( { 'width' : ( w + 334 ) + 'px', 'height' : ( h + 334 ) + 'px' } );
}

function initialchange() {
	var qzinstance = document.getElementById( 'qz_instance' );
	if ( qzinstance ) {
		var d = quakelive.cvars.Get("r_inBrowserMode");
		var w = quakelive.cvars.screenModes[ d.value ][ 0 ];
		var h = quakelive.cvars.screenModes[ d.value ][ 1 ];
//		unsafeWindow.console.log( 'current mode:' + d.value + ', ' + w + 'x' + h );
		qzinstance.removeAttribute('style');
		qzinstance.style.width = w + 'px';
		qzinstance.style.height = h + 'px';
		$( 'div.game_wrapper' ).css( { 'width' : ( w + 334 ) + 'px', 'height' : ( h + 334 ) + 'px' } );	
	} else {
		window.setTimeout( initialchange, 1000 );
	}
}

GM_addStyle( " #qlv_game_mode { background: " + color + "; " + morecss + "}" );
GM_addStyle( " #qlv_game_mode_viewport { background: " + viewportcolor + "; " + viewportmorecss + "}" );
GM_addStyle( " #qz_handshake { background: " + viewportcolor + "; " + viewportmorecss + "}" );
GM_addStyle( " #qz_instance { background: " + viewportcolor + "; " + viewportmorecss + "}" );
GM_addStyle( " div.game_wrapper { background-color: " + color + "!important; }" );

// QL bugfix - player list of a live match is invisible in window mode
GM_addStyle( " #lgi_cli { z-index: 10003; }" );

initialchange();

