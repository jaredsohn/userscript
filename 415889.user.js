// ==UserScript==
// @name           nhac trẻ remix
// @author         mvhd
// @namespace      mvhd.net
// @description    nhac trẻ remix,nhac trẻ remix
// @include        http://*.bing.com/images/search*
// ==/UserScript==

function closest(element, tagName) {
	while (element) {
		try {
			if (element.tagName.toLowerCase() == tagName) {
				return element;
			}
		}
		catch (e) {
			return null;
		}

		try {
			element = element.parentNode;
		}
		catch (e) {
			return null;
		}
	}

	return null;
};


unsafeWindow.document.addEventListener("click", function(event) {
	var link = closest(event.target, "a");

	if (link && link.href.indexOf("#view=detail") != -1 && link.children[0] && link.children[0].tagName.toLowerCase() === "img") {
		link.target = "_blank";
		var data = unsafeWindow.eval("(" + link.getAttribute("m") + ")");
		link.href = data.imgurl;
		event.stopPropagation();
	}
}, true);