// ==UserScript==
// @name           Big Dabr Tools
// @namespace      http://userscripts.org/users/112771
// @description    定制大波界面，自动刷新，更多功能增加中……
// @include        http://*dabr.co.uk/*
// ==/UserScript==
// bigdabrtools.user.js

delay=120;

timer=null;
startTimer=function(){timer=window.setTimeout(function(){window.location.reload();}, delay*1000);};
stopTimer=function(){window.clearTimeout(timer);};
restartTimer=function(){stopTimer(); startTimer();};

startTimer();

GM_addStyle('	body{padding:0 20%}\
				body>div,body>table,body>form,body>p{}\
				table.timeline tr.odd>td,table.timeline tr.even>td\
				{padding:0.5em 0.5em;line-height:1.5;}\
				table.timeline tr.odd>td:last-child>br,\
				table.timeline tr.even>td:last-child>br\
				{line-height:2em;vertical-align:top}');

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
//		var s = imgName.search(/http\:\/\/s3\.amazonaws\.com\/twitter\_production\/profile\_images\/[^\/]*\/\d+\_normal\.(jpg|gif|png)$/);
		var s = imgName.search(/http\:\/\/.*\_normal\.(jpg|gif|png|jpeg)$/);
//		var s = imgName.search(/http\:\/\/img\-p\d\.pe\.imagevz\.net\/profile1\/[^\/]+\/[^\/]+\/[^\/]+\/[^\-]*\-[^\-]*\-(s|m)\.(jpg|gif|png)$/);
// http://s3.amazonaws.com/twitter_production/profile_images/258485269/studi_twitter_normal.png
		if( s != -1) {
			newImg = document.createElement("img");

			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/\_normal/, "");
//					newImg.src=this.src.replace(/\-(s|m)\./, ".");
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
