// ==UserScript==
// @name          H&V remove posts
// @namespace     http://www.joanpiedra.com/jquery/greasemonkey
// @description	  Rmove posts from H&V
// @author        
// @homepage      
// @include       *
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
	//alert($); // check if the dollar (jquery) function works
	//$('.postdetails').parent().css({'background-color' : 'yellow'});
	//$('.name').append("<strong>Coopers Injury</strong>");
	
	
	$(".name").each(function() {
    var Name = $('strong',this) .text();
	if (Name == 'Coopers Injury'){
	$(this).parent().parent().fadeOut("slow");
	}
	if
	(Name == 'gregnash'){
	$(this).parent().parent().fadeOut("slow");
	}

	});

}