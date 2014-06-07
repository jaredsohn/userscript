// ==UserScript==
// @name           Twitter -  Move dashboard to right.
// @namespace      com.codebycoffee.greasemonkey
// @description    Moves the twitter dashboard to the right, so the timeline is on the left.
// @include        https://twitter.com
// @include        http://twitter.com
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://www.twitter.com/*
// @include        https://www.twitter.com/*
// ==/UserScript==

// Checks the DOM and updates styles for the target elements
function gm_reorient(){
	try{
		var el = document.getElementsByClassName('dashboard')[0];
		el.style.cssFloat = "right";
		el = document.getElementsByClassName('content-main')[0];
		el.style.cssFloat = "left";

		// Twitter uses jQuery. Listen for hash changes so we can update the dom 
		// after a user has changed views.
		if (typeof jQuery != 'undefined') {
			jQuery(window).bind('hashchange', gm_reorient);
		};

	} catch(e){
		return false;
	}
	window.removeEventListener('DOMNodeInserted', gm_reorient);
	return true;

}
// Try right away. 
// Some pages load the dom late so the first attempt may fail. 
// Listen for changes in the dom and continue to try until success.
if (!gm_reorient()) window.addEventListener('DOMNodeInserted', gm_reorient, true);
