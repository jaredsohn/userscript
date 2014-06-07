// ==UserScript==
// @name           Copy-able Google Link
// @namespace      tburke
// @description    Make results on Google more copy-able: when you select "Copy link location", it parses out the real url.
// @include        *.google.com/search?*
// ==/UserScript==

/*
	Huh. So I was all ready to go through each link, parse out the real URL
	from the mangled href, re-write the href to the real URL, and
	optionally play nice by hijacking the onclick event to use the original
	google-redirect. But apparently, Google sends backa  page full of good
	URLS, then mangles them user-side.
*/
var i, a = unsafeWindow.document.links, l = a.length;
for (i = 0; i < l; ++i) {
	if (a[i].onmousedown) {
		a[i].onmousedown = function () { return true; };
	}
}
