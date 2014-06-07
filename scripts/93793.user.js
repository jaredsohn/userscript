// ==UserScript==

// @name           Google SVG

// @namespace      Custopootimus

// @description    Replace Google Logo With Solid SVG

// @include        http://honamericanliterature.wikispaces.com/*

// @include        http://honamericanliterature.wikispaces.com/

// @exclude        http://honamericanliterature.wikispaces.com

// ==/UserScript==

var image_elements = document.getElementsByTagName('img');		
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	if(image_element.src.toLowerCase().match("/space/showlogo/1292864893/logo.jpg")) {
		image_element.src="http://farm6.static.flickr.com/5048/5305412514_4ac6759d47_m.jpg";
    	}
}