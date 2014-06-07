/**
 * @author	Allen Choong
 * @date	2013-11-30
 *
 * Auto expand the image only
 *
 * Changelog
 * 2014-02-05	1.2		Updated with the latest interface
 * 2013-12-03	1.1		Expand summary
 *
 */
// ==UserScript==
// @name        Twitter image expand
// @namespace   http://allencch.wordpress.com
// @description Expand the image automatically
// @include     http*://twitter.com/*
// @version     1.2
// @grant       none
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function expand() {
	var images = $(".Icon--photo").filter(":visible");
	images.each(function(index) {
		var visible = $(this);
		if(!visible.hasClass("myExpanded")) {
			visible.parents('div.tweet').click();
			visible.addClass("myExpanded");
		}
	});
	
	
}


function expandSummary() {
	var summary = $(".Icon--summary").filter(":visible");
	summary.each(function(index) {
		var visible = $(this);
		if(!visible.hasClass("myExpanded")) {
			visible.parents('div.tweet').click();
			visible.addClass("myExpanded");
		}
	});
}


window.setInterval(function() { 
	expand(); 
	expandSummary();
},2000);