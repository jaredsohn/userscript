// ==UserScript==

// @name           Expand All FChan Images

// @description    Expands images by default at this site, including PNGs and GIFs.

// @include        http://fchan.us/*
// @grant          none
// ==/UserScript==



var image_elements = document.getElementsByTagName('img');
for(var i=0; i<image_elements.length; i++) {
	var image_element = image_elements[i];
	if (image_element.parentNode.href)
	{
		if (image_element.parentNode.href.substring(16, 19) == 'src')
    		{
			image_element.src = image_element.parentNode.href;
        		image_element.removeAttribute('height');
        		image_element.removeAttribute('width');
        	}
	}
}
