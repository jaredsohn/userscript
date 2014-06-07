// ==UserScript==
// @name           Linkbucks Skipper
// @namespace      http://turnor.co.uk/scripts/
// @description    Skips Linkbuck intermediate pages.
// @include        http://*.linkbucks.com/
// ==/UserScript==

(function() {
	window.location.replace(unsafeWindow.Linkbucks.TargetUrl);
})();
