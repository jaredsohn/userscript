// ==UserScript==
// @name          Flickr link images to original size
// @namespace     http://henrik.nyh.se
// @description   Links "normal sized" Flickr images to the page displaying the original size image, where available.
// @include       http://www.flickr.com/photos/*/*
// @include       http://flickr.com/photos/*/*
// ==/UserScript==

function xps(query, root) { return document.evaluate(query, root || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue; }

var photo_id = unsafeWindow.page_photo_id;
var zoom_url = unsafeWindow.global_photos[photo_id].zoomUrl;

if (!photo_id || !zoom_url || zoom_url.indexOf("&size=o") == -1)
	return;
	
var photo = xps('//div[@class="photoImgDiv"]/img');
var photo_div = photo.parentNode;

var link = document.createElement("a");
link.appendChild(photo);
link.href = zoom_url;
photo_div.appendChild(link);
