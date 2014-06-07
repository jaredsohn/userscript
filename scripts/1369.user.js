//
// Copyright (c) 2005, Vlajbert
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "WSJ Ad Remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          WSJ Ad Remover
// @namespace     http://vlajbert.blogspot.com/
// @description   Removes selected ads from WSJ.
// @include       http://online.wsj.com/*
// @version       0.0.1
// ==/UserScript==

(function() {

	var n = getObject( document.getElementById( 'adR'), 'ancestor::DIV[1]')
	for( var t=n; t != null; t = t.previousSibling) try{hide(t);}catch(e){}

	function hide( n) {
		n.style.visibility = 'hidden';
		n.style.display = 'none';
	}
	
	function getObject( obj, xpath) {
		try { return document.evaluate( xpath, obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; } 
		catch( e) { return null; }
	}

})();
// 0.0.1		Intial
// 0.0.2		Changed the ancestor from a TABLE to a DIV.
