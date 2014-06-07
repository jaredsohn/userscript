// ==UserScript==
// @name        Add links to individual pictures on SG
// @namespace   http://www.suicidegirls.com
// @description New SG galleries removed support for middle click to open images in a new tab, this script solves the issue by using the same webservice that the album functionality uses (it's transparent to the site and doesn't incur any extra load on their servers).
// @include     https://*.suicidegirls.com/girls/*/album/*
// @include     https://*.suicidegirls.com/members/*/album/*
// @version     3
// @grant       none
// ==/UserScript==

(function () {
	var serviceBase = 'https://' + window.location.hostname + '/api/get_album_info/';
    var albumElement = document.querySelector('[class="album-container"][data-album-id]');

    // check if logged in
    if (document.body.getAttribute('sg-user_name')) {
	    $.ajax({
	    	url: serviceBase + albumElement.dataset.albumId + '/',
	    	dataType: 'json'
	    }).done(function(data) {
	    	data.photos.forEach(function(descriptor) {
	    		var anchor = albumElement.querySelector('[id^="thumb-' + descriptor.number + '"] > a');

	    		anchor.setAttribute('href', descriptor.urls.original)
	    	});
	    });
	}

})();