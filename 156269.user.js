// ==UserScript==
// @name        Coralize imgur
// @namespace   http://userscripts.org/users/206653
// @description Uses coral network for imgur links.
// @include     /^https?://www\.google\.com/reader/.*$/
// @version     1.01
// @require     http://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

$ = jQuery.noConflict();

function debug(str) {
	//console.log("US_DEBUG> "+str);
}

function patchLinks(o) {
	o.attr('href', function(i,val){
		//debug(val);
		new_val = val.replace(/\/imgur.com\//,'/imgur.com.nyud.net/');
		debug(new_val);
		return new_val;
	} );
}

function patchAllLinks() {
	debug('patching links');
	patchLinks($('a[href*="/imgur.com/"]'));
}

function patchNode(event) {
	debug('patching node');
	//console.log($(event.target).filter('div.entry-container')); // line for debug purposes
	patchLinks($(event.target).filter('div.entry-container').find('a'));
}

window.onload = function() {
	debug("window.onload event");
	patchAllLinks();
	$('#entries').on('DOMNodeInserted', patchNode);
};
