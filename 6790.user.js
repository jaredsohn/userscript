// ==UserScript==
// @name           Flickr Larger Contacts Recent Photos
// @namespace      http://adamplatti.net/myscripts
// @description    doubles the size of the photos displayed on the Your Contacts Recent Photos page
// @include        http://www.flickr.com/photos/friends/*
// @include        http://flickr.com/photos/friends/*
// ==/UserScript==



(function() {

	var ps = document.getElementsByTagName( "P" );
	var numPs = ps.length;
	for( var i=0; i < numPs; i++ ){
		var p = ps[i];
		if( p.className == "RecentPhotos" ){
			p.style.width = "205px";
			p.style.height = "205px";
		}
	}
	
	
	var images = document.getElementsByTagName( "IMG" );
	var numImages = images.length;
	for( var i=0; i < images.length; i++ ){
		var img = images[i];
		if( img.parentNode.parentNode.className == "RecentPhotos" ){
			img.style.width = parseInt( img.width ) * 2 + "px";
			img.style.height = parseInt( img.height ) * 2 + "px";
		}
	}

 })();
