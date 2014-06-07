// ==UserScript==
// @name        Wok
// @namespace   156
// @description Put Wok in your daily life!
// @include     http://facepunch.com/*
// @version     1
// @grant       none
// ==/UserScript==
imgs = document.getElementsByTagName('img');
for(i=0;i<imgs.length;++i){
	origX = imgs[i].width;
	origY = imgs[i].height;
	imgs[i].src="http://www.asiannoodlehouse.ca/news/images/20067251056.jpg";
	imgs[i].style.width=origX+"px";
	imgs[i].style.height=origY+"px";
	
	
	}