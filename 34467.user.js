// ==UserScript==
// @name           FriendFeed Endless Scrolling
// @namespace      muhqu
// @description    Endless scrolling for friendfeed user pages. If you scroll down on a friendfeed page and the page includes these page 1 2 3... links, this script will automaticaly load the content of these pages and appends it to the site. jQuery supported ;-)
// @include        http://friendfeed.com/*
// ==/UserScript==

var code = (function(){
	if (!window.jQuery) return; // no jQuery, no fun!
	if (!jQuery('div.pager').length) return; // no pager on this page...
		
	// fix some style issue
	jQuery('#body').height('auto');
	
	// find pager and append our loading indicator
	jQuery('div.pager').eq(0).append('<b id="endless-scroll-loading">&nbsp;&nbsp;<img class="loading" src="http://friendfeed.com/static/images/loading.gif?v=1"> loading...</b>');
	var loadingIndicator = jQuery('#endless-scroll-loading');
	loadingIndicator.hide();
	
	var pagesfeteched = 0;
	var inaction = 0;
	var reachedTheBottom = function () {
		if (inaction) return; // avoid double requests...
		
		inaction = 1;
		var nextLink = jQuery('div.pager a.page:not(.selected)').eq(0);
		if (!nextLink.length) return; // no further pages...
		
		loadingIndicator.fadeIn();
		nextLink.addClass('selected');
		jQuery.ajax({
			url: nextLink.attr('href'),
			success: function(pagehtml){
				//$("#results").append(html);
				var feeditemhtml = pagehtml.split('<div class="feed" id="feed1">')[1].split('<div class="pager">')[0]
				jQuery('#feed1').append(feeditemhtml);
				inaction = 0;
				loadingIndicator.hide();
			}
		});
	}
	
	// monitor users scroll activity
	jQuery(window).scroll(function(e){
		
		// bottom reached?!
		if (jQuery('html')[0].scrollTop >= jQuery('#body').height() - jQuery(window).height()){
			reachedTheBottom();
		}
	});
})

// evaluate the Code after jQuery has been loaded...
window.addEventListener("load", function(){
	var scripts = document.getElementsByTagName('script');
	var lastScript = scripts[scripts.length-1];
	var newElement = document.createElement('script');
	newElement.innerHTML = '('+code+')()';
	lastScript.parentNode.insertBefore(newElement, lastScript.nextSibling);
}, false);
	
