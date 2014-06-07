// ==UserScript==
// @name           Disable New Popup Facebook Image View
// @namespace      http://whector.info
// @description    Disables the new style popup facebook iamge view and simply views the page like before
// @include        *facebook.com/*
// @version        1.2.2
// ==/UserScript==

// @resource       Jquery http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js';
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
	var process=true;

// All your GM code must be inside this function
    function letsJQuery() {
		/*$('a').live("mousedown",function(e) {
			window.setTimeout(processimages, 100);
		});
		$('a[rel="theater"]').each(function(index) {
			$(this).replaceWith('<span style="cursor:pointer" class="newclickclass '+$(this).attr("class")+'" href='+$(this).attr('href')+'>'+$(this).html()+'</span>');
		});*/
		window.setTimeout(processimages, 200);
		$(document).mousemove(function() {
			if (process==false) {
				process=true;
				window.setTimeout(processimages, 100);
			}
		});
		
		
		$('.newclickclass').live("click",function(e) {
			window.location.href = $(this).attr('href');
		});
    }
	function processimages() {
		var extrastyle='';
		$('a[rel="theater"]').each(function(index) {
			if ($(this).hasClass('fbProfilePhotoThumb')) { extrastyle=' border: medium none; padding: 0;'; $(this).children().css("height","68px"); $(this).children().css("width","97px"); } else { extrastyle=''; }
			$(this).replaceWith('<div style="cursor:pointer; '+extrastyle+'" class="newclickclass '+$(this).attr("class")+'" href='+$(this).attr('href')+'>'+$(this).html()+'</div>');
		});
		process=false;
	}
