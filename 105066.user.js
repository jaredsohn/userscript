// ==UserScript==
// @name           Dpreview auto-resize images for FireFox
// @namespace      http://userscripts.org/users/lorriman
// @description    Resizes forum images to your browser height.
// @include        http://forums.dpreview.com/forums/*
// @require         http://userscripts.org/scripts/source/95009.user.js
// @require       	http://userscripts.org/scripts/source/95007.user.js
// @version .2
// ==/UserScript==

ScriptUpdater.check(105066, ".2");

var resize_factor=0.95;//reduces image to slightly less than viewport size, 95%


function get_viewport_height(){
	var elem = (document.compatMode === "CSS1Compat") ? 
	    document.documentElement :
	    document.body;

	var max_height = elem.clientHeight;
	var width = elem.clientWidth;
		return max_height;
}

function get_viewport_width(){
	var elem = (document.compatMode === "CSS1Compat") ? 
	    document.documentElement :
	    document.body;

	var max_height = elem.clientHeight;
	var width = elem.clientWidth;
		return width;
}

max_height=get_viewport_height()*resize_factor;
max_width=get_viewport_width();

function imageZoom(unzoomed,zoomed){
	this.unzoomed=unzoomed;
	this.zoomed=zoomed;
}


imageZoomers=document.getElementsByClassName('imageZoomer');
imagePairs= new Array();
for(iz=0;iz<imageZoomers.length;iz++){
	var unzoomed;
	var zoomed;
	imageZoomer=imageZoomers[iz];
	imgs=imageZoomer.getElementsByClassName('viewport')[0].getElementsByTagName('img');
	for(i=0;i<imgs.length;i++){
		img=imgs[i];
		if(img.getAttribute('class')=='zoom first last'){
			unzoomed=img;
		}
	}
	imgs=imageZoomer.getElementsByClassName('expandedViewport')[0].getElementsByTagName('img');
	for(i=0;i<imgs.length;i++){
		img=imgs[i];
		if(img.getAttribute('class')!='contractIcon'){
			zoomed=img;
		}
	}
	imagePairs.push(new imageZoom(unzoomed,zoomed));
}

for(ip=0;ip<imagePairs.length;ip++){
	imagePair=imagePairs[ip];
	if(imagePair.unzoomed.height>max_height){
		imagePair.zoomed.removeAttribute('width');
		imagePair.unzoomed.removeAttribute('width');
		imagePair.unzoomed.setAttribute('height',max_height);
		imagePair.unzoomed.addEventListener('click',function(event){ imagePair.zoomed.setAttribute('height',max_height);},false)
	}
}
