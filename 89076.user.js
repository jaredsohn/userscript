// ==UserScript==
// @name			Https for youtube
// @namespace		youtube.com
// @description		Plays videos in secure mode / Reproduce videos en modo seguro
// @include			*youtube.com/watch*
// @exclude			https*
// ==/UserScript==

(function(){window.location.href=window.location.href.replace(/^http:/,'https:')})()