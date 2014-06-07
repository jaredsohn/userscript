// ==UserScript==
// @name        Getty Images Flickr Helper
// @namespace   http://userscripts.org/users/163777
// @include     https://contribute.gettyimages.com/producer/images/flickr/*
// @require 	http://code.jquery.com/jquery.min.js
// @version     1.01
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var currentPhoto = '', stylesAdded = false;

var checkPhoto = function () {
	var photoLink = $('#detail-actions a');
	if (photoLink.length != 2) {
		return;
	}
	
	photoLink = photoLink.eq(1);
	if (photoLink.attr('href').indexOf('flickr') < 0 || currentPhoto == photoLink.attr('href')) {
		return;
	}

	currentPhoto = photoLink.attr('href');
	$('div.photo-data').remove();

	$('#detail-actions').append('<span class="pipe">|</span> <a href="#metadata" class="loadingMetadata"><img src="/producer/images/ajax-loader.gif"></a>');

	GM_xmlhttpRequest({
		method: "GET",
		url: currentPhoto.replace("http://www.","https://secure.") + 'meta/',
		onload: function (response) {
			var response$ = $(response.responseText);
			if (!stylesAdded) {
				stylesAdded = true;
				$('head').append(response.responseText.match(/<link[^>]+combo[^>]+>/));
			}
			response$.find('div.photo-data').appendTo('#imageDetails');
			$('div.photo-data h2:eq(0)').append('<a name="metadata" />');
			$('#detail-actions .loadingMetadata').text('Metadata loaded');
		}
	});
};

var eventTimeout;
$("#imageDetails").bind('DOMSubtreeModified', function () {
	clearTimeout(eventTimeout);
	eventTimeout = setTimeout(checkPhoto, 100);
}).trigger('DOMSubtreeModified');

