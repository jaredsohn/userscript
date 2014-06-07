// ==UserScript==
// @name       Like Notification Killer
// @grant       none
// @include     http*
// @namespace  http://msadeghi.ir/
// @version    0.1
// @description  Removes useless like notifications
// @version        1.0
// @include        http*://facebook.com/*
// @include        http*://facebook.com
// @include        http*://facebook.com?*
// @include        http*://facebook.com#*
// @include        http*://*.facebook.com/*
// @include        http*://*.facebook.com
// @include        http*://*.facebook.com?*
// @include        http*://*.facebook.com#*
// @match      http://*/*
// @copyright  2012+, Mahdi Sadeghi
// ==/UserScript==


console.log('This script grants no special privileges, so it runs without security limitations.');

//console.log('GM_info: ' + GM_info);

function deleteLikeNotifications(){
	// Find notification entries
	var matches = document.querySelectorAll("div .uiScrollableAreaContent ul li");
    	console.debug("Like Killer - Function called, number of matches:" + matches.length);
    
	for(var i = 0; i < matches.length; i++) {
		var atr = matches[i].getAttribute("data-gt");
		// TODO: add option to select what to remove, e.g: group activity, like, etc.
	    if(atr != null){
			if(atr.search("notif_type\":\"like") > 0){
				// Delete element if it is a like notification
				//if(matches[i].id != null){
					console.debug("Like Killer: wants to delete a node:" + matches[i]);
					//var element = document.getElementById(matches[i].id);
					matches[i].parentNode.removeChild(matches[i]);
					console.debug("Like Killer: Element deleted");
					}else{
						console.debug("Deleted:" + matches[i]);
						}
				//}
    		}
	}
}

document.addEventListener("DOMNodeInserted", deleteLikeNotifications, true);
