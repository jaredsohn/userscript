// ==UserScript==
// @name        Imgure: Move View All Images in Album to the top
// @namespace   http://userscripts.org/users/62850
// @include     http://imgur.com/gallery/*
// @version     1
// ==/UserScript==
var link=document.getElementById('album-truncated');
if(link){
	var img=document.getElementById('image');
	img.insertBefore(link,img.childNodes[0]);
}
