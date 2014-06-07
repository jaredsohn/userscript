// ==UserScript==
// @name       Gearside Reddit Styler
// @namespace  http://gearside.com
// @version    0.41
// @description  Various style adjustments for Reddit
// @match      http://www.reddit.com/*
// @copyright 2013, Chris Blakley
// @updateURL	http://gearsidecreative.com/userscripts/gearside_reddit_styler.user.js
// @downloadURL	http://gearsidecreative.com/userscripts/gearside_reddit_styler.user.js
// @require	http://code.jquery.com/jquery-latest.js
// @resource css http://gearsidecreative.com/userscripts/style/reddit.css
// @grant         GM_addStyle
// ==/UserScript==


//var cssTxt = GM_getResourceText("css");
//GM_addStyle(cssTxt);


jQuery(function($) {
        
	jQuery(document).ready(function() {
        
        jQuery("<link/>", {
   		rel: "stylesheet",
   		type: "text/css",
   		href: "http://gearsidecreative.com/userscripts/style/reddit.css"
		}).appendTo("head");
                
    });      
    
});