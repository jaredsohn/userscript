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
// select "FoxNews Friendly Video", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FoxNews Friendly Video
// @namespace     http://vlajbert.blogspot.com/
// @description   Removes the video ads.
// @include       http://www.foxnews.com/*
// @version       0.0.5
// ==/UserScript==

(function() {
	
	var count = 0;
	
	window.helloworld = function() {
		if( ++count > 20) return;
		var emb = getObject( document, "//OBJECT/EMBED");
		if( emb == null) {
			window.setTimeout( function() { helloworld() }, 100);
			return;
		}
			
		var obj = emb.parentNode;
		var src = emb.getAttribute( 'src');
		if( src.indexOf( 'vidFile=') > 0) {
			obj.innerHTML = '';
			var buffer = '<embed';
			for( var i=0; i < emb.attributes.length; ++i) {
				var a = emb.attributes[i];
				if( a.name == 'src' || a.name == 'menu') continue;
				buffer += ' ' + a.name + '="' + a.value + '"';
			}
			buffer += ' menu="true" src="' + (src.substring( src.indexOf( 'vidFile=')+8).split('&')[0]) + '_300.swf" />';
			obj.innerHTML = buffer;
			return;
		}
	}

	window.setTimeout( function() { helloworld() }, 100);
	
	function getObject( obj, xpath) {
		if( xpath == null) {
			xpath = obj;
			obj = document;
		}
		try { 
			var tmp = document.evaluate( xpath, obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			return tmp.singleNodeValue; 
		} catch( e) { return null; }
	}
})();

// 0.0.1		Initial release.
// 0.0.2		Changed the href proto from http to mms so there is no popup. 
// 0.0.3		Rewrite to deal with flash video.
// 0.0.4		Found a timing problem and a better way to deal with bypassing the ad.
// 0.0.5		Needed to tweak the way setTimeout() was being called for 0.6.4.
