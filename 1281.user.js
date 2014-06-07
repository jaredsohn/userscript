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
// select "CNN Friendly Video", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CNN Friendly Video
// @namespace     http://vlajbert.blogspot.com/
// @description   Replaces the video anchors with a link directly to the wmv file.
// @include       http://www.cnn.com/*
// @version       0.0.3
// ==/UserScript==

// NOTE!!! If you don't want to use cnn's video player then set bypassplayer to 1. This
//         will link the videos directoy to the stream.

var bypassplayer = 0;

//mms://wmscnn.stream.aol.com/cnn/politics/2005/08/24/snow.pataki.tapes.cnn.ws.wmv
(function() {
	if( bypassplayer == 0) {
		var plyr = getObject( document, "//OBJECT[@id='cnnVidPlayer']/EMBED");
		if( plyr) {
			var obj = plyr.parentNode;
			obj.innerHTML = '';
			var buffer = '<embed';
			for( var i=0; i < plyr.attributes.length; ++i) {
				var a = plyr.attributes[i];
				if( a.name == 'src') continue;
				buffer += ' ' + a.name + '="' + a.value + '"';
			}
			var p = document.location.pathname.substring( 6);
			var u = 'mms://wmscnn.stream.aol.com/cnn' + p.substring( 0, p.lastIndexOf( '/')) + '.ws.wmv';
			buffer += ' src="' + u + '" />';
			obj.innerHTML = buffer;
		}
	} else {
		var plyr = getObject( document, "//OBJECT[@id='cnnVidPlayer']/EMBED");
		var nl=document.getElementsByTagName( 'A')
		for( var i=0; i < nl.length; ++i) {
			try {
				var a = nl.item( i);
				var wmv = a.getAttribute( 'href').match( /^javascript:cnnVideo.*/);
				var url = 'mms://wmscnn.stream.aol.com' + (wmv[0].split( /'/)[3].replace( /^\/video\//, "/cnn/")) + '.ws.wmv';
				a.setAttribute( 'href', url);
			} catch( e) {}
		} 
	}
  
  function getObject( obj, xpath) {
	  try { return document.evaluate( xpath, obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; } 
	  catch( e) { return null; }
  }

	function loc() {
		var l = document.location.href;
		var foo = l.replace( /\?/, "\n");
		foo = foo.replace( /&/g, "\n");
		return foo;
  }
})();

// 0.0.1	Initial release.
// 0.0.2	Changed script from rewriting the anchors to point to the stream to actually usin CNN's video player but forwarding past the ads.
// 0.0.3	Added support for both linking directly to the stream or using cnn's video player.	