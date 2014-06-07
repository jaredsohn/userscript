// ==UserScript==
// @name           image fix
// @namespace      n
// @include        http://*
// ==/UserScript==

var a=document.createElement('style');
var b=document.createTextNode('img:-moz-broken{-moz-force-broken-image-icon:1;width:24px;height:24px;}');
var c=document.getElementsByTagName('head')[0];
a.setAttribute('type','text/css');
a.appendChild(b);
c.appendChild(a);

var imgs=document.images;

function checkBroken(img){
	return document.defaultView.getComputedStyle(img,null).getPropertyValue("-moz-force-broken-image-icon");
}

function load(d){
	d.src=d.src+"#";
	return;
}

function reloadImg(){
	for(var i=0;i<imgs.length;i++)
		if(checkBroken(imgs[i])*1)
			load(imgs[i]);
}

function getKey(e){
	if(e.keyCode==82 && e.altKey)
		reloadImg();
}

document.addEventListener("keyup",function(event){getKey(event);},false);
