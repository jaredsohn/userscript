// ==UserScript==
// @name           1live FK Image Mouse Over
// @description    vergrößert Vorschaubilder beim überfahren mit der Maus
// @include        */freundeskreis.einslive.de/*
// ==/UserScript==
//
//Dieses Skript vergrößert die kleinen Vorschaubilder beim überfahren mit der Maus.




///////////////////////////////////////
// ChatLeiste hinter MouseOver legen //
///////////////////////////////////////

GM_addStyle('#gd-chatcontent-zone { z-index:998 !important }');



///////////////
// MouseOver //
///////////////


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
    	var imgList = document.getElementsByTagName('img');
		for( i=0; i < imgList.length; i++) {	
			var imgName = imgList[i].src;
			if (imgName.match("user") == "user" ) {
				imgName=imgName.replace(/user/,'/user/');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/user/,/user/);
					newImg.style.width = "240px";
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-160).toString() + 'px';
					newImg.style.left=(newX+80).toString() + 'px';
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

