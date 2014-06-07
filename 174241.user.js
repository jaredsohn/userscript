// ==UserScript==
// @name          Bandcamp-CC-filter
// @namespace     javafant
// @description	  Shows the license in the track overview
// @include       http://bandcamp.com/*
// @include       https://bandcamp.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         GM_xmlhttpRequest
// ==/UserScript==

$(function() {
    $('li.item').each(function(index, element) {
	GM_xmlhttpRequest({
	    method: "GET",
	    url: $(this).find('a').attr('href'),
	    onload: function(data) {
		var license = $(data.responseText).find('#license');
		license.attr("id", "license" + index);
		$(element).find('a').append(license);
	    }
	});
    });
});

