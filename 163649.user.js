// ==UserScript==
// @name        BingImagesLink2Original
// @namespace   http://userscripts.org/users/440089
// @description Makes Bing Images link to the original full size image versus intemediary page.  Sadly (currently) only works with first batch of images not those added when scrolling (perhaps someone can update me on how to do that so I can update the code, don't have time to research it myself right now).  Other scripts that say they do this no longer work, this one does for now anyhow.
// @include     http://www.bing.com/images/*
// @version     1
// @grant       none
// ==/UserScript==

var images = document.images;
for (var i=0; i<images.length; i++){
 	if (images[i].parentNode.tagName.toLowerCase() == 'a') {
     	var iPos = images[i].parentNode.parentNode.innerHTML.indexOf("oi:&quot;");
     	if (iPos > 0) {
     		iPos += 9;
     		var iPosEnd = images[i].parentNode.parentNode.innerHTML.indexOf("&quot;", iPos);
     		if (iPosEnd > 0){
	     		images[i].parentNode.href = images[i].parentNode.parentNode.innerHTML.substring(iPos, iPosEnd);
	     	}
     	}
	}
}