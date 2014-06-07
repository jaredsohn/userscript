// ==UserScript==
// @name           Avoid Reddit's Mobile Pages
// @namespace      UhlBjsjJde
// @description    Redirects m.reddit.com and strips .mobile from the URL
// @lastupdated    2010-07-11
// @version        1.0
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 3.6
// @include        http://www.reddit.com/*
// @include        http://www.reddit.com/r/*
// @include        https://pay.reddit.com/r/*
// @include        http://m.reddit.com/*
// ==/UserScript==

// Requested on /r/GreaseMonkey - see http://is.gd/dnR7l

if (/m.reddit.com/.test(window.location.host)) {
	window.location.href = window.location.href.replace(/m.reddit.com/,'www.reddit.com');
}

if (/.mobile/.test(window.location.href)) {
	window.location.href = window.location.href.replace(/.mobile/,'');
}