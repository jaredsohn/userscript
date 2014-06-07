// ==UserScript==
// @name           MangaFox Dynamic Resize
// @namespace      Faleij
// @description    Dynamicly resizes manga image to fit browser size
// @include        http://www.mangafox.com/manga/*/*
// ==/UserScript==
var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
    
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
        //alert($); // check if the dollar (jquery) function works
        //alert($().jquery); // check jQuery version
		$("#topad").remove();
		$("#bottom_ads").remove();
		if($("#image").length)
		{
			$("#image").removeAttr("width");
			if(unsafeWindow.current_page != unsafeWindow.total_pages)
				$("#image").parent().removeAttr("onclick");
			doShit();
			$('html, body').animate({scrollLeft: $("#image").offset().left}, 800);
			$(window.parent).bind('resize', function() {doShit();});
		}
    }
	
	function doShit() {
			$("#image").height($(window.parent).height());
			$('html, body').animate({scrollTop: $("#image").offset().top}, 800);
	}