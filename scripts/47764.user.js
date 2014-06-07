// ==UserScript==
// @name           SocialKloud
// @namespace      cpoteet
// @include        http://socialkloud.com/*
// ==/UserScript==


// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
    
    var isHome = $('.top_menu_item_current').html();
    
    if (isHome == "Home") {
    
        $('div.post:first').hide().addClass('addPost');
        
        $('#content').prepend('<p class=show>Add Post</p>');
        
        $('.show').click(function() {
        	$('.addPost').slideToggle("medium", function() {
            	$(this).prev().toggleClass("toggled");
			}); 
		return false;
		});
    
    }
    
	$('input[name=note_link], input[name=note_what], input[name=note_where], input[name=note_when_time]').click( function() {
		$(this).val('');
	});
    

}