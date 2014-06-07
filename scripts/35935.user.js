// ==UserScript==
// @name           Animation Factory
// @namespace      #UzE
// @description    Lets you view all the images on AnimationFactory.com in fullsize without watermarks.
// @version        0.1.2
// @author         znerp, avg
// @include        http://www.animationfactory.com/*
// ==/UserScript==
var imgs=document.evaluate("//img[contains(@src,'_sm_')]",document,null,6,null), l=img.snapshotLength, img;
while(img=imgs.snapshotItem(--i)) {
	var link=img.parentNode;
	img.src=link.getAttribute("onmouseover").match(/'([^']+)/)[1];
	link.href=img.src;
	link.removeAttribute("onmouseover");
	link.target="_blank";
}