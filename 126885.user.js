// ==UserScript==
// @name           Larger images on EroProfile
// @namespace      EroProfile
// @description    Larger images on photo albums.
// @include        http://www.eroprofile.com/m/photos/view/*
// ==/UserScript==

//Define maximum image width (fraction of screen resolution)
var MaxWidth = screen.width - 410;
var MaxHeight = screen.height - 200;
var PageContentRightWidth = screen.width - 400;
var imgURL = "initialized";
var i = 0;

//use CSS to set max image width & make posts fill 100% width of screen
var styleString = "img { max-width:" + MaxWidth + "px; max-height:" + MaxHeight + "px;  } .page { width:100% !important; }	#pageContent, #pageNavHistory, #pageNavHistory {width:100%} #pageContentRight {width:" + PageContentRightWidth + "px;} div.viewPhotoContainer div.photo {width:" + PageContentRightWidth + "px;}";
GM_addStyle(styleString);

//Replace thumbnails with full sized attachment
var linker = document.getElementsByTagName('a');
var imgs = document.getElementsByTagName('img');
var imglen = imgs.length;
var len = linker.length;
for (i = 0; i < len; i++) {
	  if (Left(linker[i].href, 32) == "http://www.eroprofile.com/media/") {
			for (x = 0; x < imglen; x++) {
	  		if (Left(imgs[x].src, 32) == "http://www.eroprofile.com/media/") {
		  		imgs[x].src = linker[i].href;
  	  	}
  		}
    }
}
function Left(str, n){
if (n <= 0)
return "";
else if (n > String(str).length)
return str;
else
return String(str).substring(0,n);
}