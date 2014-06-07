// ==UserScript==
// @name           Nice To Have @ Google Search
// @namespace      http://userscripts.org/scripts/show/92620
// @description    Turn instant search off automatically
// @include        http://www.google.*/search*
// @exclude
// @svc:version    [0.1.0]
// ==/UserScript==

var offInstantSearch = true;

if (offInstantSearch) {
	if (top != self) return;
	var target = document.getElementById("po-off");
	if (!target) return;

	var className = target.className;
	if (!className) return;

	if (/unselected/.test(className))window.location = target.href;
}
