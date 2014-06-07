// ==UserScript==
// @name           FAZED Watched Auto Update
// @namespace      Fazed.org
// @description    Jquery update your 'watched' threads live.
// @include      http://*fazed.net/forum/*
// @include	 	 http://*fazed.org/forum/*
// @include 	 http://*skill.org/forum/*
// ==/UserScript==



// Add jQuery courtesy of http://joanpiedra.com/

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
   if(typeof unsafeWindow.jQuery == 'undefined') {
      window.setTimeout(GM_wait,100);
   } else {
      $ = unsafeWindow.jQuery; letsJQuery();
   }
}

GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
     
//alert($); // check if the dollar (jquery) function works
// This is where the magic happens. They said you cant autorefresh the contents 
//of a  DIV without PHP or the like. POPPYCOCK. 

//make any element with class 'forum' refresh every 5 seconds.

$(document).ready(function(){
    
    setInterval(function() {
    $('.forum').load(location.href+' .forum>*');
    }, 5000);
	
    
});


}