// ==UserScript==
// @name           TB Image Hide
// @description	 Hides images and various other presentational flair to make TB
//						 less noticable to a passerby. Great for work!
// @namespace      http://userscripts.org/users/66015
// @include        http://forums.turbobricks.com/*
// @include			 http://*turbobricks.com/forums/*
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
    
			// Hide header banner
			$($("body table")[0]).hide();
    
			// Widen page
			$("div.page").width("auto");
    
			// Hide images
			var imgs = $("div.page img");

			for (i=0; i < imgs.length; i++) {
				var img = $(imgs[i]);
				var w = img.width();
				var h = img.height();
				var s = img.attr("src");
				img.attr("rel", s);
				img.attr("src", "http://placehold.it/" + w + "x" + h);
				img.mouseenter(function() {
				var s = $(this).attr("rel");
				$(this).attr("rel", $(this).attr("src"));
				$(this).attr("src", s);
				});
				img.mouseleave(function() {
				var s = $(this).attr("rel");
				$(this).attr("rel", $(this).attr("src"));
				$(this).attr("src", s);
				});
			}
			
			// Hide embedded objects
			var objs = $("embed, iframe");
			
			for (i=0; i < objs.length; i++) {
				$(objs[i]).hide();
			}
    }