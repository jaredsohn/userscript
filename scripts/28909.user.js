// ==UserScript==
// @name           WoW Forums clickable links
// @namespace      http://dani.pew.cc
// @description    Makes links clickable even if Blizzard disabled that.
// @include        http://eu.battle.net/wow/*/forum/topic/*
// @include        https://eu.battle.net/wow/*/forum/topic/*
// @include        https://forums.wow-europe.com/thread.html?=*
// ==/UserScript==

regex= /[^"](https?:\/\/([-\wäöü\.]+)+(:\d+)?(\/([-=_\w\.\%\@\#\~;:,\(\)\/\+]*(\?[^<>\s]+)?)?)?)/gi;

// Add jQuery (battle.net already uses jQuery, don't add it twice
//var GM_JQ = document.createElement('script');
//GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
//GM_JQ.type = 'text/javascript';
//document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	$(".post-detail").each(function(i) {
		// Remove wbr, because they may cut links in half
		this.innerHTML = this.innerHTML.replace(/<wbr>/g, '');
		// Replace links
		this.innerHTML = this.innerHTML.replace(regex, '<a href="$1">$1</a>');
	});
}