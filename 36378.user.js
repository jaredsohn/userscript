// ==UserScript==
// @name          IMDb Fix Right Click (v1.0)
// @namespace     http://www.brooksworks.com
// @description   Fixes right click on images, allows download and drag and drop.
// @include       http://*.imdb.com/*
// @include       http://imdb.com/*
// ==/UserScript==


var images = document.getElementById('principal').getElementsByTagName('img');

for (var i=0; i<images.length; i++) { 
	var oldImg = images[i];
	var newImg = document.createElement('img');
	newImg.setAttribute("src", oldImg.src);
	oldImg.parentNode.replaceChild(newImg,oldImg);
}
