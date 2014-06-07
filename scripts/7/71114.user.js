// ==UserScript==
// @name           Schneckenhof.de ImageZoom
// @namespace      shimgzoom
// @description	  Zooms Profile and Gallery Pictures on Schneckenhof.de
// @include        http://*.schneckenhof.de/*
// ==/UserScript==

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
		
		if( imgName.indexOf("/tn_") != -1) {
			newImg = document.createElement("img");

			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					var bigImage=this.src;
					// Profilbilder
					if (bigImage.indexOf("/profileimages/") != -1) {
						bigImage = "http://mannheim.schneckenhof.de/ProfileImage?username=" + bigImage.substring(bigImage.indexOf("tn_")+3,bigImage.lastIndexOf("_")) + "&image=" + bigImage.substr(bigImage.lastIndexOf("_")+1, 16);
						newImg.src=bigImage;
						newImg.style.width = "auto";
						newImg.style.height = "auto";
						if (location.href.indexOf("ProfileShow?") != -1) {
							newImg.style.top=(65).toString() + 'px';
							newImg.style.left=(191).toString() + 'px';
						} else {
							newImg.style.top=(newY-200/2).toString() + 'px';
							newImg.style.left=(newX+this.width).toString() + 'px';
						}
						// Galeriebilder
					} else if (bigImage.indexOf("/image_dirs/") != -1) {
						bigImage=bigImage.replace("tn_", "");
						bigImage=bigImage.replace("thumbs", "images");
						bigImage=bigImage.replace("_jpg", "");
						newImg.src=bigImage;
						this.title = "";
						if (newX<(document.body.clientWidth/2)) {
						newImg.style.top=(newY-200/2).toString() + 'px';
						newImg.style.left=(newX+this.width).toString() + 'px';
						} else {
						newImg.style.top=(newY-200/2).toString() + 'px';
							if (this.width>this.height) {
								newImg.style.left=(newX-400).toString() + 'px';
							} else {
								newImg.style.left=(newX-(400/this.height*this.width)).toString() + 'px';
							}
						}
						
						if (this.width>this.height) {
							newImg.style.width = "400px";
							newImg.style.height = "auto";
						} else {
							newImg.style.width = "auto";
							newImg.style.height = "400px";
						}
					}

					newImg.style.position="absolute";
					newImg.style.zIndex='999';

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
