// ==UserScript==
// @name          faceimgdown
// @namespace     http://code.jquery.com/
// @description   A basic example of Greasemonkey that causes an alert at each page load.
// @require       http://code.jquery.com/jquery-latest.js
// @include       https://*facebook.com/*/photos*
// ==/UserScript==

// Add jQuery 
var GM_JQ = document.createElement('script'); 
GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
GM_JQ.type = 'text/javascript'; 
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


function letsJQuery() {
if (unsafeWindow.$ != 'undefined') {
	jQuery.noConflict(true);
}
GM_log("Hello");
alert(jQuery('a').toString());
}

// Check if jQuery's loaded 
function GM_wait() { 
    GM_log(window.$.toString());
    if(typeof jQuery == 'undefined') 
{ GM_log('lol\n');window.setTimeout(GM_wait,100); } 
        else { letsJQuery(); } 
} 
GM_wait();
