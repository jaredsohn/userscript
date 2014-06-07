//-----------------------------------------------------------------------------
// Weewar Resize 1.3
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// This script is a Greasemonkey script.  It requires the Firefox browser and 
// the Greasemonkey add-on.
//
//     Firefox: http://www.getfirefox.com
//     Greasemonkey: http://www.greasespot.net
//
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// Version History
//
// 1.0 - Initial Release
// 1.1 - Excluding /game/new
// 1.2 - Also does map editing interface
// 1.3 - Now working with the new flash interface
//-----------------------------------------------------------------------------

// ==UserScript==
// @name           Weewar Resize
// @namespace      weewar-resize
// @description    This script resizes the map to use the full space of your screen
// @include        http://*weewar.com/game*
// @include        http://*weewar.com/maps/edit/*
// @exclude	   http://*weewar.com/game/new
// ==/UserScript==

document.getElementById('wrap').style.width = "99%";
document.getElementById('wrap').style.marginLeft = "auto";
document.getElementById('wrap').style.marginRight = "auto";

if (document.getElementById('editor_controls')) {
    document.getElementById('editor_controls').parentNode.attributes.removeNamedItem('class');
}

if (document.getElementById('playing_field_flash')) {
    document.getElementById('playing_field_flash').style.width = "100%";
    document.getElementById('playing_field_flash').style.marginLeft = "0px";
    document.getElementById('playing_field_flash').style.marginRight = "0px";
}
