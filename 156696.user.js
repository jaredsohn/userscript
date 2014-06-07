// ==UserScript==
// @name        Reddit Censure
// @namespace    
// @include     http://www.reddit.com*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant		none
// @version     1
// @UpdateVersion 1
// @downloadURL http://userscripts.org/scripts/source/156696.user.js
// @updateURL   http://userscripts.org.nyud.net/scripts/source/156696.meta.js
// ==/UserScript==

var ignoreList = ["imgur.com" ]

jQuery('div.thing.odd').each(function(){
	if(jQuery.inArray(jQuery(this).find('.domain').html(),ignoreList) -1) {
		jQuery(this).remove();
	}
});

jQuery('div.thing.even').each(function(){
	if(jQuery.inArray(jQuery(this).find('.domain').html(),ignoreList) -1) {
		jQuery(this).remove();
});
	}