// ==UserScript==
// @name           Newgrounds Direct Audio Link
// @description    (Modified fixed 25/10/2012)
// @include        http://*.newgrounds.com/*
// @include        http://newgrounds.com/*
// ==/UserScript==
//
//	Foxsan48
//
//	THIS	http://www.newgrounds.com/audio/listen/447060
//	TO
//	THIS	http://www.newgrounds.com/audio/download/447060

// Add jQuery to doc
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery is loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// Run Jquery Code
function letsJQuery() {
    //checks if the link is a listen url changes listen to download
	//$('a:first').each(function(i){
    $('a').each(function(i){
        var pattern = new RegExp(/http:\/\/www\.newgrounds\.com\/audio\/listen\/\d+/g);
        //alert(pattern.test($('a')[i].href)+' link '+$('a')[i].href);
        if((pattern.test($('a')[i].href))==true){$('a')[i].href = $('a')[i].href.replace('listen','download');}
	});
}

