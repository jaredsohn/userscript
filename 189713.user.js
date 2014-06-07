// ==UserScript==
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @name Reddit Link User Flair
// @author UrAContra
// @description Make text flairs into clickable anchors
// @version 1
// @updateURL http://userscripts.org/scripts/source/145990.meta.js
// @downloadURL 
// @include *://*.reddit.com/r/pcmasterrace/*
// @include *://*.reddit.com/r/pcmasterrace
// ==/UserScript==

	(function($){
	    $.fn.urlToLink = function(options) {
	        var options = $.extend({}, $.fn.urlToLink.defaults, options); 
	        return this.each(function(){
	            var element = $(this),
	                expression = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	            // The magic
	            return element.html( element.text().replace(expression, "<a href='$1' target='"+options.target+"'>$1</a>") );
	        });
	    }
	    /**
	     * Default configuration
	     */
	    $.fn.urlToLink.defaults = {
	        target : '_self'         // Link target
	    }
	})(jQuery);
	    
	$(document).ready(function(){
		$('.flair').urlToLink();	
	}); 