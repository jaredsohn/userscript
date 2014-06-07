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
// select "Salon Ad Remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Salon Ad Remover
// @namespace     http://vlajbert.blogspot.com/
// @description   Removed inline story ads from Salon.
// @include       http://www.salon.com/*
// @version       0.0.1
// ==/UserScript==

(function() {
	var del = new Array();
	var b = document.getElementsByTagName( 'B');
	for( var i=0; i < b.length; ++i) {
		try {
			var fu = b.item(i).firstChild;
			if( fu.data.indexOf( 'Advertisement: ') >= 0) del.push( fu);
		} catch( e) {}
	}
	for( var i in del) deleteme( getObject( del[i], 'ancestor::P'));
	function deleteme( obj) {
		try { obj.parentNode.removeChild( obj); }
		catch( e) { alert( e);}
	}

	function getObject( obj, xpath) {
		try { return document.evaluate( xpath, obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; } 
		catch( e) { alert( e); return null; }
	}

})();

// 0.0.1	Initial write.