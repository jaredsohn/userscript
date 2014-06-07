// ==UserScript==
// @name          Flickr Beta Map Toggle
// @namespace     http://github.com/jufemaiz/jmc_flickr_gm_flickr-map-hideshow
// @description   Toggle the appearance of the map on the new flickr page.
// @include       http://*flickr.com/photos/*
//
// ==/UserScript==
//

var $;

    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');
			
		// ...then load up the jQuery interface
        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();

	// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

	// Load 'em up!
	function letsJQuery(){
		// Element holding the photo-story-map
		var mapContainer = $('#photo-story-map');
		// Textual element
		var locationInformation = $('#photoGeolocation-storylink');
		// Location Toggler
		var locationToggle = $('<span> (<a href="#toggleMap" id="photoGeolocation-storyToggle">Show Map</a>) </span>');
		
		// First let's hide the map
		mapContainer.css({'display':'none'});
		
		// Add the toggler
		locationToggle.insertAfter(locationInformation);
		locationToggler = $('#photoGeolocation-storyToggle');
		
		locationToggler.toggle(
			function() {
				$(this).html('Hide Map');
		  		$('#photo-story-map').css({'display':'block'});
			}, function() {
				$(this).html('Show Map');
		  		$('#photo-story-map').css({'display':'none'});
			}
		);
		
		// Finally, prefetch properly the images
		$('#photo-story-map #photoGeolocation-smallmap img').each(function(){
			$(this).attr('src',$(this).attr('data-defer-src'));
		});
		
	}