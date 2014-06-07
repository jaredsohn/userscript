// Neptun fejléc kép lecserélése
// Copyright (c) 2011, Pap Gábor
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// Tesztelve:
// Google Chrome 11
// Opera 11.10
// Firefox 4 with Greasemonkey
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Neptun téma kép cserélő
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Lecserélheted a neptunon az idegesítő arcokat arra, amire csak akarod. Alapbeállítás: Rebecca Black. A kódban lehet megadni új kép url-jét. Minden témához berakja az új képet.
// @include       https://frame.neptun.bme.hu/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}




//--------------------------------------------------------------------------------------
//     Eredeti képek URL-jei:
//--------------------------------------------------------------------------------------
// https://frame.neptun.bme.hu/hallgatoi/App_Themes/Skin_Neptun_Pink/header_right.jpg
// https://frame.neptun.bme.hu/hallgatoi/App_Themes/Skin_Neptun_Gfx/header_right.jpg
// https://frame.neptun.bme.hu/hallgatoi/App_Themes/Skin_Neptun_Lime/header_right.jpg
// https://frame.neptun.bme.hu/hallgatoi/App_Themes/Skin_Neptun_Orange/header_right.jpg
// https://frame.neptun.bme.hu/hallgatoi/App_Themes/Skin_Neptun_Classic/header_right.jpg
// https://frame.neptun.bme.hu/hallgatoi/App_Themes/Skin_Neptun_NewYork/header_right.jpg
//--------------------------------------------------------------------------------------


// ------------------------------------------------------
// !!!!!!!!!   Itt add meg az új kép url-jét   !!!!!!!!!
// ------------------------------------------------------

var kep='http://kepfeltoltes.hu/120225/1236728975KamivalPr_ba_www.kepfeltoltes.hu_.jpg';



addGlobalStyle(".main_header_r{background-color:#fff;background-image:url('" + kep + "');background-repeat:no-repeat;width:582px;height:200px;text-align:right;vertical-align:top}");