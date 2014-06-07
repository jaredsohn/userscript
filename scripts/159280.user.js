// ==UserScript==
// @name           Facebook Ad Eraser
// @namespace      http://www.darkcoast.com
// @description	   Hides all Facebook advertising. 
// @icon           http://www.darkcoast.com/icons/facebook_eraser.png
// @updateURL	   http://userscripts.org/scripts/source/159280.meta.js
// @downloadURL	   http://userscripts.org/scripts/source/159280.user.js
// @version        1.0
// @grant          metadata
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://*.facebook.com/ajax/*
// ==/UserScript==


function removeAdvertising() {
	var nodes = document.body.getElementsByClassName('clearfix storyContent');
	
	if (nodes != null && typeof nodes !== "undefined" ) {
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].innerHTML.indexOf("href=\"/about/ads\"") != -1) {
				nodes[i].innerHTML = '';             
            }
		}
	}
    
    
    var nodesSide = document.body.getElementsByClassName('ego_column');
    if (nodesSide != null && typeof nodesSide !== "undefined" ) 
	{
        for (var i = 0; i < nodesSide.length; i++) {
            nodesSide[i].style.display = "none";
        }
    }
}

document.addEventListener("DOMNodeInserted", removeAdvertising, true);