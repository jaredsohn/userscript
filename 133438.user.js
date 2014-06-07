// Legendas.tv
// version 0.1
// 14.05.2012
// Copyright (c) 2012, Pelanza
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Note that this may break some sites, and you may wish to add
// @exclude lines for specific sites.  If you don't know how to
// do that, this script is not for you.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ForceGet", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Legendas.tv
// @namespace     http://google.com
// @description   Ignora o popup de detalhes e faz o donwload das legendas direto.
// @include       http://*legendas.tv*
// ==/UserScript==

if (typeof contentWindow != 'undefined') {
	unsafeWindow = contentWindow; // google chrome
} else if (typeof unsafeWindow != 'undefined') {
	// firefox
} else {
	unsafeWindow = window; // opera + safari?
}

unsafeWindow.abredown = function abredown(download) {
	window.location.href = "http://legendas.tv/info.php?c=1&d="+download;

}
