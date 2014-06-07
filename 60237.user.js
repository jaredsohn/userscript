// ==UserScript==
// @name           blog.de Images MouseOver
// @namespace      com.sobeos
// @include       *blog.de/*
// @include       *http://sobeos.blog.de/*
// ==/UserScript==
// blogdeimagesmouseover.user.js

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
   GM_log('Enhancing images with Greasemonkey');

    	var imgList = document.getElementsByTagName("img");
	for( i=0; i < imgList.length; i++) {		
		var imgName = imgList[i].src;
		var s = imgName.search(/http\:\/\/data\d\.blog\.de\/media\/.*_(s|m|l|o)\.(jpeg|jpg|gif|png)$/);
		if( s != -1) {
			GM_log('Found image - ' + imgName);
			newImg = document.createElement("img");

			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					//newImg.src=this.src.replace(/_(s|m|l|o)/, "_o");	
					newImg.src=this.src;		
					GM_log('Changed image src to - ' + this.src);					
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

