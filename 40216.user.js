// ==UserScript==
// @name          mobile.de carImages MouseOver
// @namespace     
// @description	  Shows enlarged images when hovering over user's pictures in "mobile.de". (v1.0 28.12.2008). 
//                Original source is the XING OnMouseOver from Daniel Lange (http://daniel-lange.com/archives/24-Greasemonkey-to-enlarge-Xing-pictures.html)
//                So the props go out to him
// @author         MarshallMar http://marshallmar.blogspot.com
// @include       *ebayimg.com/*
// @include       *mobile.de/*
// ==/UserScript==
// mobileEnlargeUserImages.user.js

/*
This is a Greasemonkey user script.

To install, you need Greasemonkey: http://www.greasespot.net/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts,
select "mobileEnlargeUserImages", and click Uninstall.
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
		var s = imgName.search(/_14.(JPG|jpg)/); 
		if( s != -1) {
			bigimage=imgName.replace(/_14./, "_24.");
			newImg = document.createElement("img");

			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/_14./, "_24.");
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
