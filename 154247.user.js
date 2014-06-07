// ==UserScript==
// @name        Steam Market Info Script
// @namespace   userscripts.mattie.net
// @description Shows additional info in Steam Community Market, such as crate numbers, etc.
// @include     http://steamcommunity.com/market/*
// @version     2
// ==/UserScript==

// store the original version for hooking
var oldCreateItemHoverFromContainer = window.CreateItemHoverFromContainer;

(function() {

// Localize jQuery variable
var market_jquery = {};

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.5.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    market_jquery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    market_jquery = window.jQuery.noConflict(true);
    // Call our main function
    main(); 
}

function market_addSuffixesToCrates(text) {
	var regx = /CreateItemHoverFromContainer\( g_rgAssets, '([^']*_name)', 440, 2, ([0-9]*)/g;
	while(found = regx.exec(text)) {
		if (found != null)
		{
			var name= g_rgAssets[440][2][found[2]]['descriptions'][0]['value'];
			if (name.indexOf("Crate")<0) continue;
			var elem = market_jquery("#" + found[1]);
			//elem.after("<br/><small>"+name+"</small>");
			//market_jquery("head").append("<style>.market_listing_item_name_block { margin-top: 12px; }</style>");
			elem.text(name.substr(name.length-3) + " " + elem.text());
		}
	}
}

function main() {
	// We need to use a regex hack to get the first items listed because we can't replace item hover fast enough
    market_jquery(function() { market_addSuffixesToCrates(market_jquery('script').last().text()) });
	// Hook CreateItemHoverFromContainer so we can put our crate info into place.
	window.CreateItemHoverFromContainer = myCreateItemHoverFromContainer;
}
// trying to override this
function myCreateItemHoverFromContainer( container, id, appid, contextid, assetid, amount )
{
    try {
		var name= g_rgAssets[appid][contextid][assetid]['descriptions'][0]['value'];
		if (name.indexOf("Crate")>=0) {
			var elem = market_jquery("#" + id);
			elem.text(name.substr(name.length-3) + " " + elem.text());
		}
		return oldCreateItemHoverFromContainer(container, id, appid, contextid, assetid, amount);
	}
	catch (e) {
		console.debug(e);
	}
}
})();
