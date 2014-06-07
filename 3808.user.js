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
// select "Break.com Friendly Video", and click Uninstall.
//
// -------------------------------------------------------------------
//
// ==UserScript==
// @name          Break.com Friendly Video
// @namespace     http://vlajbert.blogspot.com/
// @description   Removes anoying ads and play the video directly in the player.
// @include       http://break.com/*
// @include       http://www.break.com/*
// @include       http://media1.break.com/*
// @version       0.0.1
// ==/UserScript==

(function() {
	//  Shortcut to bypass ad requests.
	if( location.search.indexOf( 't=') > -1) return;

	var videoUrl = 'http://media1.break.com/dnet/media/content/';
	var videoTypes = ['wma', 'wmv'];
	
	function trackDownVideo( event) {
		var ourl = event.currentTarget.getAttribute( 'href');
		if( ourl.match( '\.break\.com/') == null) return;
		event.preventDefault();
		// Parse the file name out of the url.
		var file = ourl.match( '\/([^\.\/]+)\.html$')[1];
		// Track down the video.
		tryVideoType( 1, ourl, videoUrl + file + '.');
	}

	function tryVideoType( type, ourl, url) {
		GM_xmlhttpRequest({
			method: 'HEAD',
			url: url + videoTypes[type],
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			},
			onload: function( res) {
				if( res.status == 200) {
					// Set the videoFrame src to the video, this will cause the player to popup.
					videoFrame.setAttribute( 'src', url + videoTypes[type]);
					// Reset the videoFrame, if we don't then a page refresh will replay the video.
					window.setTimeout( function() { videoFrame.setAttribute( 'src', 'about:blank');}, 1000);
				} else if( type < videoTypes.length) {
					// Didn't find the video, try the next video type.
					tryVideoType( type+1, ourl, url);
				} else {
					// Couldn't find the video so set the location to the origional url
					// The t=1 qs will prevent this script from playing with the page.
					window.location = ourl + '?t=1';
				}
			}
		});
	}
	// If this is a page that lists videos
	//   1) Create a player iframe.
	//   2) Add handlers to the anchors.
	//   3) Remove ads.
	var videoFrame = null;
	if( go( "//FONT[@class='updates']") != null) {
		videoFrame = document.createElement( 'iframe');
		videoFrame.setAttribute( 'src', 'about:blank');
		videoFrame.setAttribute( 'height', '0');
		videoFrame.setAttribute( 'width', '0');
		document.body.appendChild( videoFrame);
		// Create click event on video image.
		var xp = gao( "//TD[@class='tdcontent']/DIV[@class='content']/A/IMG");
		for( var i=0; xp != null && i < xp.snapshotLength; ++i) xp.snapshotItem(i).parentNode.addEventListener( 'click', trackDownVideo, true);	
		// Remove ads
		var ns = go( document, "//TD[@class='tdcontent']");
		for( i=0; ns != null && i < ns.childNodes.length; ++i) if( ns.childNodes.item( i).nodeName == 'TABLE') hide( ns.childNodes.item( i));
	}
	//  Helper functions	
	function hide( n) {
		n.style.visibility = 'hidden';
		n.style.display = 'none';
	}
	function go( obj, xpath) {
		if(xpath==null){xpath = obj;obj = document;}
		try{var tmp = document.evaluate( xpath, obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);return tmp.singleNodeValue;}catch(e){return null;}
	}
	function gao( obj, xpath) {
		if(xpath==null){xpath = obj;obj = document;}
		try{var tmp = document.evaluate( xpath, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);return tmp;}catch(e){alert( 'boom');return null;}
	}
})();
// 0.0.1		Initial write
