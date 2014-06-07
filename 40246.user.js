// ==UserScript==
// @name           Direct Links (Throw away redirection)
// @namespace      http://userscripts.org/users/23652
// @description    Rewrites redirection links to the direct links
// @include        http://*
// @include        https://*
// @include        file://*
// @exclude        http://*.facebook.com/*
// @exclude        https://*.facebook.com/*
// @exclude        http://*.google.com/*
// @exclude        https://*.google.com/*
// @exclude        http://*.youtube.com/*
// @copyright   JoeSimmons
// @version     1.0.7
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require    http://usocheckup.dune.net/40246.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

/* CHANGELOG ////////////////

1.0.7
	- Made it compatible in Opera & Chrome

1.0.6
	- Updated the regular expressions
	- Made it work with window.open (onClick) & location.href= (href)
	- Changed the script updater
	- added 'facebook.com' to the exclude list. this script makes it very slow

*////////////////////////////





// Make sure it's running on the main page, no frames
if(window.self !== window.top) {
	throw "This is not an error. The script was stopped on a frame.";
}

var is_indirect = /(https?|file):\/\/[^&?]+\?[^=]+=(https?:\/\/([^\.]+\.)*([^\.]+\.)[^\.]+\/?[^&'"]*)/i,
	url_exp = /https?:\/\/([^\.]+\.)*([^\.]+\.)[^\.]+\/?[^&'"]*/i,
	open = /(window\.)?open\(['"]([^'"]+)['"][^\)]*\)/i,
	loc = /location\.href\s*=\s*['"]([^'"]+)['"]/i,
	str8_link = /^[?&]\w+=(.*)/;

function pageChanged(e) {

	var links=document.evaluate("//a[(contains(@href,'?') and contains(@href,'=')) or (contains(@onclick, 'open') and contains(@href, 'void')) or (contains(@href, 'location.href'))]", document, null, 6, null);

	for(var i=0, l, h, o; (l=links.snapshotItem(i)); i++) {

		h = unescape(l.href);
		o = unescape(l.getAttribute("onclick"));
		
		if(is_indirect.test(h)) {

			l.setAttribute("href", h.match(is_indirect)[2]);

		} else if(open.test(o) && url_exp.test(o)) {

			l.setAttribute("href", o.match(open)[2]);
			l.removeAttribute("onclick");

		} else if(loc.test(h) && url_exp.test(h)) {

			l.setAttribute("href", h.match(loc)[1]);

		}

	}

}


pageChanged();

document.body.addEventListener("DOMSubtreeModified", pageChanged, false);