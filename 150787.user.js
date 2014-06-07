// ==UserScript==
// @name        Facebook: convert map links from bing to google
// @description Changes map links on facebook from bing maps to google maps
// @namespace   dylandylan1
// @version     1.3
// @downloadURL http://userscripts.org/scripts/source/150787.user.js
// @updateURL   http://userscripts.org/scripts/source/150787.meta.js
// @require     http://code.jquery.com/jquery-1.8.2.min.js
// @include     *://www.facebook.com/*
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(document).on('mouseenter', "a", function(){ 
	var url_orig = decodeURIComponent($(this).attr('href'));
	if (url_orig.indexOf('rtp=adr') != -1) {
		var url_parts = url_orig.match(/pos\.([\d\.-]*?)_([\d\.-]*?)[^\d\.-]/);
		var url_new = 'http://maps.google.com/?q=' + url_parts[1] + '+' + url_parts[2];
		$(this).attr('onmouseover','LinkshimAsyncLink.swap(this, "'+url_new+'");');		
		$(this).attr('onclick','LinkshimAsyncLink.swap(this, "'+url_new+'");');
		$(this).attr('href',url_new);
		$(this).attr('target','_blank');
		$(this).attr('rel','');

	}
	if (url_orig.indexOf('where1') != -1) {
		var url_parts = url_orig.match(/where1=(.*?)&FORM/);
		var url_new = 'http://maps.google.com/?q=' + url_parts[1];
		$(this).attr('onmouseover','LinkshimAsyncLink.swap(this, "'+url_new+'");');		
		$(this).attr('onclick','LinkshimAsyncLink.swap(this, "'+url_new+'");');
		$(this).attr('href',url_new);
		$(this).attr('target','_blank');
		$(this).attr('rel','');
	}
})
