// ==UserScript==....................................
// @name           TexAgs GM - Image Resizer
// @namespace      texags
// @description    Resizes large images on TexAgs.com and myBCS.com
// @include        http://texags.com/main/forum.*
// @include        http://www.texags.com/main/forum.*
// @include        http://mybcs.com/Content/Forums/Replies.*
// @include        http://www.mybcs.com/Content/Forums/Replies.
// ==/UserScript==

var maxImgSize = 1000;

var allImages = document.getElementsByTagName('img');
for (i=0; i < allImages.length; i++) 
	if(allImages[i].width > maxImgSize) 
		allImages[i].width = maxImgSize;
