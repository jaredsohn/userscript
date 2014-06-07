// ==UserScript==
// @name           4chan Dogecoin
// @namespace      4chanDogecoin
// @include        http*://boards.4chan.org/*
// @description    4chan Dogecoin Integration
// @require        http://code.jquery.com/jquery-latest.min.js
// @icon           http://i.imgur.com/XVaMoyZ.png
// ==/UserScript==

$(document).ready(function() {
	$('a.useremail').each(function(index, obj) {
		var address = this.href.substr(7);
		if(address[0] == 'D' && address.length == 34)
		{
			$(this).attr('href', 'doge://' + address);
			$(this).html('<img src="http://i.imgur.com/XVaMoyZ.png"> '+ address);
		}
	});
});
