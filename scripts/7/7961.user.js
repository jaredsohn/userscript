// ==UserScript==
// @name           cornerBookmarks @ Google in same window
// @description	Makes bookmark in the top left corner on googlepages open in the same window.
// @namespace      http://arvixx.blogspot.com
// @include        https://*.google.com/*
// @include        http://*.google.com/*
// @include        https://google.com/*
// @include        http://google.com/*
// ==/UserScript==

function $x(xpath, root) { // From Johan Sundström
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}

window.addEventListener('load', function () {
	var cornerbookmarks = $x("//table[@class='bookmarks']//a[starts-with(@id, 'cornerBookmarks')]");
	cornerbookmarks.forEach(function(v,i,a) {
		v.setAttribute('target', '_top');
	});
}, true);