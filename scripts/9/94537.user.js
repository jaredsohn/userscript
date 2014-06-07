// ==UserScript==
// @name           Bing Images
// @namespace
// @include        http://www.bing.com/images/*
// @version       1.0
// @description   Open images directly.
// @copyright     2011, nohype
// @license       Creative Commons Attribution 3.0
// ==/UserScript==

unsafeWindow.SGExt.clickEvent = function (e) {
	var metadata = unsafeWindow.SG.getMetadata(unsafeWindow.SG.active);
	var link = metadata.imgurl;
	var page = metadata.surl;
	if(e.ctrlKey)
		window.open(link);
	else if(e.altKey)
		window.location = link;
	else if(e.shiftKey)
		window.open(page);
	else
		window.location = link;
	return; 
};
