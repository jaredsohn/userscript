// ==UserScript==
// @name        9gag watermark removal
// @namespace   faleij
// @include     http://9gag.com/*
// @include     http://*.9gag.com/*
// @include     https://9gag.com/*
// @include     https://*.9gag.com/*
// @version     1.1
// ==/UserScript==
var logos = document.getElementsByClassName("logo");
for(var i = 0; i < logos.length; i++) logos[i].style.background = 'url("http://i.imgur.com/2Ku8g.png") no-repeat scroll -10px 0 transparent';

function crop(image)
{
	var sx=0,sy=0,sw=image.width,sh=image.height-30,dx=0,dy=0,dw=sw,dh=sh;
	
	var canvas = document.createElement("canvas");
	canvas.width = dw;
	canvas.height = dh;
	
	var context = canvas.getContext("2d");
	context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
	
	image.parentNode.replaceChild(canvas,image);
}

var dicks = document.getElementsByClassName("fatbigdick");
for(var i = 0; i < dicks.length; i++) dicks[i].style.backgroundColor = "rgba(0,0,0,0)";

var imgs = document.querySelectorAll(".img-wrap>a>img");
for(var i = 0; i < imgs.length; i++) crop(imgs[i]);