// Convert a clicked A entry with a title of 'Show a Map of this Location' from a Yahoo URL to a Google URL. From this:
// http://maps.yahoo.com/py/maps.py?addr=[ROAD]&csz=[CITYSTATEZIP]
// To this:
// http://maps.google.com/?q=[ROAD], [CITYSTATEZIP]
// 
// Because of how specific it is, it only works with Wufoo links.
//
// ==UserScript==
// @name           Yahoo to Google map link
// @namespace      http://www.dotnet.com/grease/
// @description    Changes a Yahoo map link into a Google map link.
// @include        https://*.wufoo.com/*
// @include        http://*.wufoo.com/*
// @include        https://wufoo.com/*
// @include        http://wufoo.com/*
// ==/UserScript==

window.myrddinFindParent = function(element,elementType) {
	if (element.tagName.toLowerCase() == elementType.toLowerCase()) {
		return element;
	} else {
		if (element.parentNode != null) {
			return window.myrddinFindParent(element.parentNode, elementType);
		} else {
			return null;
		}
	}
}

document.addEventListener('click', function(event) {
	anchor = window.myrddinFindParent(event.target, 'a');
	if (anchor != null && 'Show a Map of this Location' == anchor.title) {
		if (anchor.href.match(/http:\/\/maps\.yahoo\.com.+addr=([^&]+)\&csz=([^&]+)/)) {
			anchor.href = "http://maps.google.com/maps?q=" + RegExp.$1 + ", " + RegExp.$2;
		}
	}
}, true);

