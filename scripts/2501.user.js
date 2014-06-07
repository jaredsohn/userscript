// anonym PHProxy
// 2005-10-26
// Public Domain
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script from H. Heigl
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "anonym PHProxy", and click Uninstall.
//
// more infos can also found under http://www.proxy1.be/
// questions write to wonderer4711 [at] gmx [dot] de
//
// ------------------------------------------------------------------------
// Copyright (c) 2006, H. Heigl  
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ------------------------------------------------------------------------
//
// ==UserScript==
// @name          anonym PHProxy
// @description   surf the web anonymously via PHProxy
// @include       *
// @exclude       http://www.proxy1.be/index.php*
// ==/UserScript==

(function() {
	window.location.href = 'http://www.proxy1.be/index.php?q=' + window.location.href;
})();

