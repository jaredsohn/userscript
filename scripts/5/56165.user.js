// ==UserScript==
// @name           Shacknews Screenshot Fix
// @author         gmonkey
// @version        0.1
// @description    Changes the default Full Size function to pop up a new window displaying only the image
// @include        http://*.shacknews.com/screenshots.x*
// ==/UserScript==

// hijack the original resize() js function

var orgResize = unsafeWindow.resize;

unsafeWindow.resize = function(thumb_real_id)
{
	//orgResize(thumb_real_id);

	var url = unsafeWindow.document.getElementById('fullshot').getElementsByTagName("img")[0].attributes.getNamedItem("src").value;
	var wtitle;
	var attribs = "resizable=yes,scrollbars=yes";

	// resize popup to image size (add some extra margin for scrollbars, will likely screw up with fancy themes)
	var width = parseInt(unsafeWindow.thumb_dw[thumb_real_id]) + parseInt(32);
	var height = parseInt(unsafeWindow.thumb_dh[thumb_real_id]) + parseInt(32);

	attribs += ",width=" + width + ",height=" + height;

	// attempt to center
	if (screen.width > width)
		attribs += ",screenX=" + (screen.width-width)/2;
	if (screen.height > height)
		attribs += ",screenY=" + (screen.height-height)/2;

	window.open(url,wtitle,attribs);
};
