// ==UserScript==
// @name           Quake Live Windowed Mode Background Color changer and white box remover
// @author         kry
// @version        2.0.2
// @namespace      http://userscripts.org/users/kry
// @description    Changes the Quake Live windowed mode background color
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==

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


If you get a white box under your windowed mode area,
edit var height and var width so that height = your inbrowsermode
height and width = your inbrowsermode width. If you don't
know them, check your \r_inbrowsermode and check the numbers from
\modelist.

You can also change the background color behind the windowed
mode by changing viewportcolor and viewportmorecss.

Changelog
Version 2.0.2
 Removed moving the chat area (made QL unusable)
Version 2.0.1
 Added moving the chat area
2.0.0
 White box under game fix
1.0.0
 First version

************************************************************/

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

var $ = unsafeWindow.jQuery, quakelive = unsafeWindow.quakelive;

var color = "black";
var morecss = "";

var viewportcolor = "black";
var viewportmorecss = "";
var instancemorecss = "";
var wrappermorecss = "";

var height = "100%";
var width = "100%";
//var height = 800;
//var width = 500;

GM_addStyle(" #qlv_game_mode { background: " + color + "; " + morecss + "}" );
GM_addStyle(" #qlv_game_mode_viewport { background: " + viewportcolor + "; " + viewportmorecss + "}" );
//GM_addStyle(" #qlv_game_mode .game_wrapper { width: " + 334+width + "px; height: " + 110+height + "px; " + wrappermorecss +"}" );
GM_addStyle(" #qz_handshake { background: " + viewportcolor + "; " + viewportmorecss + "}" );
GM_addStyle(" #qz_instance { background: " + viewportcolor + "; " + viewportmorecss + "}" );
GM_addStyle(" #qz_instance { height: " + height + "px; width: " + width + "px; " + instancemorecss + "}" );