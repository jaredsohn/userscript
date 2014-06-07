// ==UserScript==
// @name          OpenBC UserImages MouseOver
// @namespace     
// @description	  Shows big images when hovering over userImages in OpenBC/Xing.
// @include       *xing.com/*
// ==/UserScript==
// OpenBCUserImages.user.js

/*
This is a Greasemonkey user script.

To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts,
select "OpenBCImageSize", and click Uninstall.
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
		var s = imgName.search(/\/img\/users\/.+\_s(1|2|3)?\.(jpg|gif|png)$/);
		if( s != -1) {
			bigimage=imgName.replace(/\_s(1|2|3)?\./, ".");
			newImg = document.createElement("img");

			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/\_s(1|2|3)?\./, ".");
					newImg.style.width="140px";
					newImg.style.height = "185px";
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-185/2).toString() + 'px';
					newImg.style.left=(newX+ow).toString() + 'px';
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

