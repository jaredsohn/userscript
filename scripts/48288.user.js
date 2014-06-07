// ==UserScript==
// @name          schulerSave
// @namespace     http://www.schuelervz.net
// @description   Makes images on schuelervz.net right-clickable.
// @include       http://schuelervz.net/*
// @include       http://www.schuelervz.net/*
// ==/UserScript== 
//alert("hai");
var imgs = document.getElementsByTagName("img");
var i;
for(i = 0; i < imgs.length; i ++){
	imgs[i].removeAttribute("oncontextmenu");
	imgs[i].setAttribute("title", "Made right-clickable by schulerSave - Created by Darkimmortal");
}