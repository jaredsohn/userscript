// ==UserScript==
// @name        Google Plus NSFW Filter
// @namespace   http://userscripts.org/users/423875
// @description Filters out posts with a #NSFW tag
// @require     http://code.jquery.com/jquery-latest.min.js
// @include     https://plus.google.com/*
// @include     http://plus.google.com/*
// @version     1.4
// ==/UserScript==

var init = function() {
	jQuery.expr[":"].icontains = function(obj, index, meta, stack){return (obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase().indexOf(meta[3].toLowerCase()) >= 0;};
	jQuery(function() {
		var filter     = "div.Tg:icontains(#NSFW)";
		var contentdiv = "#contentPane>div";
		var postspage  = "div.g-Ua-z9";				// triggered on tab select on profile page
		var feed       = "div.ow";					// triggered when loading more posts
		jQuery(filter, jQuery(feed)).hide();
		jQuery(document).on({
			"DOMNodeInserted": function(evt) {
				//console.log(evt.relatedNode);		// debug
				if (evt.relatedNode.nodeName == "DIV") {
					relatedNode = jQuery(evt.relatedNode);
					if (relatedNode.is(feed)) {
						var target = jQuery(evt.target)
						if (target.is(filter)) {
							target.hide();
						}
					} else if (relatedNode.is(contentdiv) || relatedNode.is(postspage)) {
						jQuery(filter, jQuery(feed)).hide();
					}
				}
			},
		});
	});
}

if (typeof jQuery === "undefined") { // Chrome
	var script = document.createElement("script");
	script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "jQuery.noConflict();(" + init.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
} else { // Greasemonkey
	init();
}