// ==UserScript==
// @name           Disable Kill Notifications
// @namespace      http://userscripts.org/users/88506
// @include        http://www.dotapod.com/*
// @include        http://dotapod.com/*
// ==/UserScript==

// Check if jQuery's loaded  
function GM_wait() {  
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }  
    else { $ = unsafeWindow.jQuery; letsJQuery(); }  
}  
GM_wait();

function letsJQuery() {  
$(document).ready(
function() {
	$('#growl').remove();
});
}  

