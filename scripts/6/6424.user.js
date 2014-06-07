// Translate user script
// version 0.1 BETA!
// 2006-11-17
// Copyright (c) 2006, Oleksiy Volovikov
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Translate", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Translate
// @namespace     http://koti.welho.com/ovolovik/js/
// @description   translate a word on alt+dblclick
// @include       *
// ==/UserScript==

document.body.addEventListener('dblclick', function(e) {
    var text = window.getSelection();
    if (text > '' && e.altKey) {
	var dictWin=window.open(
	    'http://lingvo.yandex.ru/en?text='+text,
	    'dictwin', 
	    'height=700, width=720, resizable=yes, scrollbars=yes');
	if (window.focus) { dictWin.focus(); }
    }
}, true);

