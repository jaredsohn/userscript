// ==UserScript==
// @name        Open Original Image
// @namespace   eph
// @description Open original image in Google+
// @include     https://plus.google.com/*
// @grant       none
// @version     1.3
// ==/UserScript==


var gpoi_menu = document.createElement("menu");
gpoi_menu.id = "gpoi_menu";
gpoi_menu.type = "context";
document.body.appendChild(gpoi_menu);

var gpoi_menuitem = document.createElement("menuitem");
gpoi_menuitem.label = "View original size image";
gpoi_menuitem.icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAk5JREFUeNqkk7tuE0EUhv/Zqy9rgw1eLG5CjgI0EAgSEh0SkmmoKKl4BJq8B6Kgo6FIQU+DqJBSBImCBoQiWYJgO8TBdmyv1zs7F87shvgBPNJZzc6Z+eZc/mFaa6wymAF82dvXb3d+ICiXwRjLHEpJaKHyeZpCCWOC5hJRNMez9iYe3r3OHLPhW3+CVx9/AWGN/nwyCWgOcJlfs0hObEFrAhgMsb520QCQAYKgAO9qA+cadbSaHUzjC5jMQyjJs/OcQDJZQBJEJQLjeoDqmWrms8yn6HuoNWq4dtlGe2MPd9a6cPwCeZzMZKrB54CIeQYxkQmllwDPtaHsIhZWD53ZGH94B73hDBHNjbVab+Cx75gPOKZ9iur3IdhxNwNkKRwMFxCH+3h+8zNaBBaVCeqUyu6EI7z0Dn45RkD1GXRu4FZ1F0/D19isbNHJJyc1kANs336P9lkLkSzBYQqP1nfQjYZ4GTfxNTqA8ga4H37AVriNyegIcV6eHLBR+glW7qFPhdOgKlMrlUqzDS+KMVhSwlF9hsK9T9SJJo7dMkqU9ilgPB7BGg1R0YoAVBZKQ0sJT+TXiDRByBfgpAGjjyIS8Hi6BAjtI/Ye0HIA26IliyAuCUjmOpCugHCpAyQoSYJKnAjV4vklQFkBSlcew/dL8Dwftu2AEYSdyFVRZEaJgpQoKKo05aTIaAmIozHk5C8c1yPLAVYGyHtt5K6UgqTwpYFQSsZ/CnDpVs2TLOREzsnJYDErK+b/YSDaREICMtHZnrd8TCu/xlXGPwEGAPlLKWd11eL/AAAAAElFTkSuQmCC";
gpoi_menu.appendChild(gpoi_menuitem);

function getOriginalURL(base_url) {
	
	// Type 1: common image
	a = /(https?:\/\/lh\d+\.googleusercontent\.com\/([0-9a-zA-Z_-]{10,}\/){4})[^\/]+(\/.+)/.exec(base_url);
	if (a) return a[1] + "s0" + a[3];
	
	// Type 2: link image
	a = /https?:\/\/[^\/]+\.googleusercontent\.com\/gadgets\/proxy\?url=([^&]+).*/.exec(base_url);
	if (a) return unescape(a[1]);
	
	return null;
}

document.addEventListener("contextmenu", function(e) {
	var n = e.target;
	if (n.nodeType == 1 && n.tagName == "IMG") {
		var original_url = getOriginalURL(n.src);
		if (original_url) {
			n.setAttribute("contextmenu", "gpoi_menu");
			gpoi_menuitem.onclick = function () { window.open(original_url).focus(); };
		}
	}
}, false);
