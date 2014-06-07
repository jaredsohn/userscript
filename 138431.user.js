// ==UserScript==
// @name           Quake Live Window Mode Extender with fullscreen windowed mode
// @version        1.3
// @namespace      http://userscripts.org/users/kry
// @description    Adds modes, changes window mode resolution, gives the possibility of windowed fullscreen and removes white boxes
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==
/*
Based off Lam's Quake Live Window Mode Extender script which was
based on my script.
This should be made into open source with a repo or something
to prevent having all these versions..
*/
/*
Adding console commands are based on drayan's Quake Live Friend Commands
script. If you don't have it, you really should go get it.
*/
/***
Changes:
Added 1 more resolution for 1920x1080
This script moves the game screen to 0,0 point so that you can
play it fullscreened.
Also gives the possibility to toggle scrollbars which you can do
from greasemonkey or tampermonkey menu. It's defaulted to on.
If you'd like, you can uncomment (remove the // from the start of the line)
two lines in the indicated spot to enable the
scrollbars:
//GM_addStyle( " html { overflow: hidden; }" );
//GM_addStyle( " body { overflow: hidden; }" );
How to use:
Either change the script to use the same resolution you'd want to use
or change your desktop resolution to the script's resolution.
Before going to game, fullscreen the window by pressing F11 or
by some other means. Start the game and start playing / streaming.
***/
/*
Versions
1.  First version - bugged
1.1 First working version
1.2 Added keyboard hotkeys for removing scrollbars
    Hide scrollbars (Ctrl+Shift+Z)
    Show scrollbars (Ctrl+Shift+X)
1.3 Added console commands for removing scrollbars
    To hide the scrollbars \kry_scrollbars hide
    To show the scrollbars \kry_scrollbars show
    To scroll the page at top left corner \kry_scrollbars scroll
    For help \kry_scrollbars help
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
var $ = unsafeWindow.jQuery;
var color = "black";
var morecss = "";
var viewportcolor = "#1a1511";
var viewportmorecss = "";

// some additional usable modes for window mode
var addedmodes = [ 8, "800x500", 10, "1024x640", 13, "1152x864", 14, "1280x720", 16, "1280x800", 18, "1440x900", 19, "1600x900", 20, "1600x1000", 21, "1680x1050", 22, "1600,1200", 23, "1920x1080"];

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
		//unsafeWindow.console.log( 'qz_instance not found' );
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
        
        //If you'd like to disable the scrollbars by default, delete // from the beginning of the next GM_addStyle 2 lines
        
        //-------------------------------------------
        //GM_addStyle( " html { overflow: hidden; }" );
        //GM_addStyle( " body { overflow: hidden; }" );
        //-------------------------------------------
        
        GM_addStyle( " #qz_instance { position:absolute; top:0; left:0; }" );
        GM_addStyle( " #qz_handshake { position:absolute; top:0; left:0; }" );
        GM_addStyle( " #qlv_game_mode_preroll { position:absolute; top:0; left:0; }" );
        GM_addStyle( " #qlv_game_mode_viewport { position:absolute; top:0; left:0; }" );
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
function hidescrollbars() {
    GM_addStyle( " html { overflow: hidden; }" );
    GM_addStyle( " body { overflow: hidden; }" );
};
function showscrollbars() {
    GM_addStyle( " html { overflow: auto; }" );
    GM_addStyle( " body { overflow: auto; }" );
};
$(document).keydown(function(e){
    if((e.ctrlKey || e.metaKey) && event.shiftKey && e.which == 90) {
        hidescrollbars();
        return false;
    }
});
$(document).keydown(function(e){
    if((e.ctrlKey || e.metaKey) && event.shiftKey && e.which == 88) {
        showscrollbars();
        return false;
    }
});
GM_registerMenuCommand("Hide scrollbars (Ctrl+Shift+Z)", function() {
    hidescrollbars();
});
GM_registerMenuCommand("Show scrollbars (Ctrl+Shift+X)", function() {
    showscrollbars();
});

// contentEval taken from http://userscripts.org/scripts/show/100842
function contentEval(source) {
	if ('function' == typeof source) {
		source = '(' + source + ')();';
	}
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval(function () {
	if (typeof quakelive != 'object') { return; }
	var commands = {
		kry_scrollbars:{
			params:true,
			dft:'a command to hide scrollbars - for help, write \kry_scrollbars help',
			fn:function (val) {
                if (val=="hide")
                {
                    jQuery("html").css("overflow","hidden");
                    jQuery("body").css("overflow","hidden");
                }
                else if (val=="show")
                {
                    jQuery("html").css("overflow","auto");
                    jQuery("body").css("overflow","auto");
                }
                else if (val=="scroll")
                {
                    jQuery('html,body').scrollLeft(0);
                    jQuery('html,body').scrollTop(0);
                }
                else if (val=="help")
                {
                    qz_instance.SendGameCommand('echo Commands:;');
                    qz_instance.SendGameCommand('echo To hide the scrollbars - kry_scrollbars hide;');
                    qz_instance.SendGameCommand('echo To show the scrollbars - kry_scrollbars show;');
                    qz_instance.SendGameCommand('echo To scroll the page to top left corner - kry_scrollbars scroll;');
                }
			}
		}
	};
	var oldLaunchGame = LaunchGame,ready;
	LaunchGame = function (params, server) {
		ready = false;
		var i;
		for (i in commands) {
			if (commands[i].params) {
				params.Append('+set ' + i + ' "^7"');
				params.Append('+set ' + i + ' "' + commands[i].dft + '"');
			} else {
				commands[i].dft = 0;
				params.Append('+set GM_qlfc_' + i + ' "0"');
				params.Append('+alias ' + i + ' "set GM_qlfc_' + i + ' 1"');
			}
		}
		return oldLaunchGame.apply(this, arguments);
	}
    var oldOnCommNotice = OnCommNotice;
	OnCommNotice = function (error, data) {
		if (error == 0) {
			var msg = quakelive.Eval(data);
			if (msg.MSG_TYPE == 'serverinfo') {
				ready = true;
			}
		}
		return oldOnCommNotice.apply(this, arguments);
	}
	var oldOnCvarChanged = OnCvarChanged;
	OnCvarChanged = function (name, value, replicate) {
		var i;
		for (i in commands) {
			if ((commands[i].params && name == i) || (!commands[i].params && name == 'GM_qlfc_' + i)) {
				if (value != commands[i].dft) {
					if (ready) {
						commands[i].fn(value);
					}
					qz_instance.SendGameCommand('set ' + name + ' "' + commands[i].dft + '";');
				}
				replicate = 0;
			}
		}
		return oldOnCvarChanged.apply(this, arguments);
	}
});
