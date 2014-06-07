// ==UserScript==
// @name           Teamliquid - Highlighted posts filter
// @namespace      TL
// @description    Adds a toggle to show only highlighted posts in teamliquid.net forum threads
// @include        http://www.teamliquid.net/forum/*
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
	main();
    }
}

function apply_filter(toggle) {

    // Look at each post on the page
    $('table[width="610"]').each(function (i) {
	    var $posttable = $(this);

	    // Check if it's highlighted
	    var highlighted = false;
	    $('tr td', $posttable).each(function (i) {
		    var $postbody = $(this);
		    
		    if ($postbody.css('backgroundColor') == "rgb(193, 211, 224)") {
			highlighted = true;
		    }		    
		});	    
	    
	    if(toggle) {
		// Hide
		if(!highlighted) {
		    $posttable.parent().hide();
		}		
	    } else {
		// Show
		if(!highlighted) {
		    $posttable.parent().show();
		}		
	    }
	});

}

function main() {
    $(".apply_highlight_filter").live('click', function(){
	    apply_filter(true);
	    $('#filter_toggle').html('<strong>Show all posts</strong>');
	    $('#filter_toggle').toggleClass("remove_highlight_filter", true);
	    $('#filter_toggle').toggleClass("apply_highlight_filter", false);
	});

    $(".remove_highlight_filter").live('click', function(){
	    apply_filter(false);
	    $('#filter_toggle').html('<strong>Only show highlighted posts</strong>');
	    $('#filter_toggle').toggleClass("remove_highlight_filter", false);
	    $('#filter_toggle').toggleClass("apply_highlight_filter", true);
	});

    // Add the initial toggle text
    $('td[align="right"][width="380"]').each(function (i) {
	    $(this).parent().after('<tr><td id="filter_toggle" class="apply_highlight_filter" onmouseover="this.style.cursor=\'pointer\'"><strong>Only show highlighted posts</strong></td></tr>');
	});  
}
