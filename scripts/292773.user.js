// ==UserScript==
// @name        imagefap automatic redirect to photo
// @namespace   imagefap
// @description Automatic redirect to the big photo in imagefap.com
// @include     http://www.imagefap.com/photo*
// @version     1.0.0
// @grant       dtk12345
// ==/UserScript==

window.onload=function(){
		var imgSrc=$(".image-wrapper a>img").attr('src');
	if(imgSrc!=null & imgSrc!="" & imgSrc!=undefined & imgSrc!="undefined"){
		window.location=imgSrc;
	}
	else{
		alert(imgSrc);
	}
}