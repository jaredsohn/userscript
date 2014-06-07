// ==UserScript==
// @name           4Chan big pix
// @namespace      Default
// @include        http://boards.4chan.org/b/
// ==/UserScript==

var images = document.getElementsByTagName("img");
for (i=0;i<images.length;i++){
	if (images[i].src.indexOf("s.")>0){
		images[i].src = images[i].parentNode.href;
	}
}