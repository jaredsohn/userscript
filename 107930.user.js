// ==UserScript==
// @name           Kandorya - Ignore List
// @namespace      kandorya_forum_ignore-list
// @include        http://forum.kandorya.com*
// @require		 http://code.jquery.com/jquery-1.6.2.min.js
// ==/UserScript==


jQuery(document).ready(function(){
	jQuery("table.tablebg").each(function(){
		if( jQuery(this).find(".postauthor") && jQuery(this).find(".postauthor").html() == "Hebius" ) {
			jQuery(this).hide();
		}
	});
});