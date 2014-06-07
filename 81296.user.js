// ==UserScript==
// @name          Flickr Smallerifier
// @namespace     http://github.com/jufemaiz/jmc_flickr_gm_flickr-smaller
// @description   Smallifiers the images on the flickr beta photopage back to 500px max and alters notes accordingly
// @include       http://*flickr.com/photos/*
//
// ==/UserScript==
// NOTE: THIS SCRIPT WILL NOT ALLOW YOU TO CORRECTLY POSITION NEW OR EDIT EXISTING NOTES

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
		// Photo element
		var image = $($('#photo .photo-div img')[0]);
		image.attr('src',image.attr('src').replace(/_z\./, "."));
		
		// Resize stuff based on 640 -> 500
		var ratio = 500/640;
		image.attr('height',ratio * image.attr('height'));
		image.attr('width',ratio * image.attr('width'));
		
		// Reposition notes
		var notes = $('#notes li');
		notes.each(function(){
			var li = $(this);
			li.css({
				'left' : ratio * li.css('left').replace(/px/, "") + 'px',
				'top' : ratio * li.css('top').replace(/px/, "") + 'px',
				'height' : ratio * li.css('height').replace(/px/, "") + 'px',
				'width' : ratio * li.css('width').replace(/px/, "") + 'px'
			});
		});
		
		// Reposition photo proxy dragger
		var photoDragProxy = $('#photo-drag-proxy');
		photoDragProxy.css({
			'height' : ratio * photoDragProxy.css('height').replace(/px/, "") + 'px',
			'width' : ratio * photoDragProxy.css('width').replace(/px/, "") + 'px'
		});
		
	}