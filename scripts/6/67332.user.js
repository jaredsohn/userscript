// ==UserScript==
// @name          deviantart UserImages MouseOver
// @namespace     
// @description	  Shows big images when hovering over userImages in DeviantART
// @include       *deviantart.com/*
// ==/UserScript==
// deviantartLargeImagesHover.user.js

/*
This is a Greasemonkey user script.

To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.
*/

(function() {
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}


   window.addEventListener("load", function(e) {
    	var imgList = document.getElementsByTagName("img");
	for( i=0; i < imgList.length; i++) {
		var imgName = imgList[i].src;
		var s = imgName.search(/http\:\/\/th(.*)\.deviantart\.net\/fs(.*)\.(jpg|gif|png)$/);
		if( s != -1) {
			newImg = document.createElement("img");

			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/http\:\/\/th/, "http://fc");
					newImg.src=newImg.src.replace(/\/150\//, "/");
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-newImg.height/2+this.height/2).toString() + 'px';
					newImg.style.left=(newX+this.width).toString() + 'px';
					document.body.appendChild(newImg);
				},false);
			imgList[i].addEventListener("mouseout",
				function(e){
					document.body.removeChild(newImg);
				},false);

		}
	}
	return;
  }, false);
})();

