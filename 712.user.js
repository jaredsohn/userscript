// ==UserScript==
// @name          flickRate
// @description   Adds a ratings panel under current image in a Flickr photo page
// @namespace     http://flickrate.gasteroprod.com/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// @exclude       http://flickr.com/photos/*/sets/*
// @exclude       http://www.flickr.com/photos/*/sets/*
// ==/UserScript==

(function() {
	flickrate_urlparts = location.href.split('/');
	flickrate_photo_id = flickrate_urlparts[5];
	var url = 'http://flickrate.gasteroprod.com/greasemonkey_rate.php?photo_id='+flickrate_photo_id;
	var comments_anchor;
	var html_insert = '';
	var links_ar = document.getElementsByTagName('a');
	for (var i = 0; i < links_ar.length; i++) {
		if (links_ar[i].getAttribute('name') == 'reply') {
			comments_anchor = links_ar[i];
		}
	}
	var f = document.createElement('IFRAME');
	f.setAttribute('scrolling', 'no');
	f.setAttribute('style', 'width:500;height:50;border:0');
	f.setAttribute('src', url);
	comments_anchor.parentNode.parentNode.insertBefore(f, comments_anchor.parentNode.parentNode.firstChild);
})();