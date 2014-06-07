// ==UserScript==
// @name           BinGross Image Mouse Over
// @namespace      zas-kar
// @description    zeigt großes Bild wenn man mit der Maus über die Vorschaubilder auf www.bingross.de V1/V2 fährt 
// @include        http://*.bingross.de/*
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
		var s = imgName.search(/\/(photos|uploads_user)\/.+\_(med|small|thumb)?(,\d+)?\.(jpeg|jpg)$/);
		if( s != -1) {
			bigimage=imgName.replace(/\_(med|small|thumb)?(,\d+)?\./, ".");
			newImg = document.createElement("img");
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/\_(med|small|thumb)?(,\d+)?\./, ".");
					newImg.style.width = "400px";
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-170).toString() + 'px';
					newImg.style.left=(newX+170).toString() + 'px';
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
