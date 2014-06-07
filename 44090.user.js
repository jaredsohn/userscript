// ==UserScript==
// @name           Twitter Follower Count
// @namespace      http://stackoverflow.com/users/4481/elijah-manor
// @include        http://twitter.com/home
// ==/UserScript==

//BEGIN - Load jQuery http://internetducttape.com/2008/05/08/greasemonkey-ninja-jquery/
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
//END - Load jQuery http://internetducttape.com/2008/05/08/greasemonkey-ninja-jquery/
    
// All your GM code must be inside this function
function letsJQuery() {
	unsafeWindow.console.log('BEGIN letsJQuery');	

	var followers = $("#follower_count").html();
	var following = $("#following_count").html();
	var updates = $("#update_count").html();
	document.title = 'FI: ' + $.trim(following) + '; FE: ' + $.trim(followers) + '; UD: ' + $.trim(updates);
	
	unsafeWindow.console.log('END letsJQuery');
}

unsafeWindow.alert = function alert(message) {
	//do nothing
};	
	



