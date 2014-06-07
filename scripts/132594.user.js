// ==UserScript==
// @name           Facebook External Link Permission Bypass
// @version        0.9.4
// @namespace      http://thegallagher.net
// @include        *://www.facebook.com/*
// @description    This script allows you to access social reader and other external links on Facebook without giving any app permissions. 
// ==/UserScript==

// CONSTANTS/SETTINGS
// Hopefully if anything changes in Facebook then you will only need to change these.
var PERMISSION_LINK	= '/connect/uiserver.php';
var REDIRECT_MATCH	= /redirect_uri=([^&]+)/;
var REDIRECT_CLEAN	= /&?fb_[^=]+=[^&]+/gi;

// Chrome and Firefox compatable window reference
// Thanks to mathiasbynens and hateradio https://gist.github.com/1143845
var gm_win = (function(){
    var a;
    try {
        a = unsafeWindow === window ? false : unsafeWindow;
    } finally {
        return a || (function(){
            var e = document.createElement('p');
            e.setAttribute('onclick', 'return window;');
            return e.onclick();
        }());
    }
}());

// Find all new links and add an event listener to them.
var links, i, href, searchSelector = 'a[href^="' + PERMISSION_LINK + '"]';
function fixLinks() {
	links = document.body.querySelectorAll(searchSelector);
	for (i = 0; i < links.length; i++) {
		if (!links[i].realLink) {
			links[i].realLink = true;
			href = getLink(links[i].href);
			if (href) {
				links[i].href = getLink(links[i].href);
				links[i].addEventListener('click', stopEvents, false);
			}
		}
	}
}

// Stop the default events.
function stopEvents(e) {
	e.stopImmediatePropagation();
}

// Get the external link from a permission page link.
function getLink(url) {
	var match = url.match(REDIRECT_MATCH); // Grab the redirect URI
	if (match[1]) {
		var url = decodeURIComponent(match[1]); // Decode the URI
		url = url.replace(REDIRECT_CLEAN, ''); // Get rid of any variables which show the link source was Facebook
		return url.replace(/\?$/, ''); // Fix trailing question mark then return
	}
	return false;
}

if (window.location.pathname == PERMISSION_LINK) {
	// If we are already on the permissions page then redirect straight away.
	// Most likely the user middle clicked. Do not confirm in this instance to give the option to skip the confirmation.
	var url = getLink(window.location.href);
	if (url) {
		window.location.href = url;
	}
} else if (gm_win.self == gm_win.top && gm_win.Arbiter.inform && gm_win.onloadRegister_DEPRECATED) { // Make sure we are not running in an iframe
	function ready() {
		// Override Facebooks event trigger function.
		// Would be better to use Arbiter.subscribe('event', func) if I can get it to work.
		var inform = gm_win.Arbiter.inform;
		gm_win.Arbiter.inform = function(action) {
			// console.log(action + ' ' + document.body.querySelectorAll(searchSelector).length);
			switch (action) {
				// case 'pagelet_stream_pager_displayed': // Home feed. Works fine but pagelet_onload will be called anyway.
				case 'pagelet_onload': // This event hits quite often. Find a better one if possible. Needed for timeline.
					fixLinks();
					break;
			}
			inform.apply(this, arguments); // Call the original function.
		};
	}
	// Facebook onload
	gm_win.onloadRegister_DEPRECATED(ready);
}