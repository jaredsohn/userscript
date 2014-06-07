// ==UserScript==
// @name           Indeed visited hider
// @namespace      http://robkohr.com/indeed
// @description    Hides any jobs that you have clicked on
// @include        http://www.indeed.com/*
// ==/UserScript==


var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// All your GM code must be inside this function
var letsJQuery = function() {
  hide_visited();
}

// Check if jQuery's loaded
function GM_wait() {
     if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
     else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();


function hide_visited(){
  $('.row').each(function(){
      var row = $(this);
      $(this).find('.visits').each(function(){
	  row.css('background', 'red').hide('slow');
	});

    });

}
