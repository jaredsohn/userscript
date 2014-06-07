// ==UserScript==
// @name          douban Photo Viewer
// @author        kl
// @description   直接显示豆瓣中的大图片
// @include       http://www.douban.com/*
// @include       http://movie.douban.com/subject/*/photos*
// @include       http://www.douban.com/photos/album/*
// @include       http://site.douban.com/widget/photos/*
// @include       http://site.douban.com/widget/public_album/*
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.0.2
// @history       0.0.2 2012-03-10
// @history       0.0.1 2011-12-28
// ==/UserScript==

var bljg="";
var blimg;
var blsrc;
var blparent;
var i;
var bldiv;

bldiv=document.querySelectorAll('div.photo_wrap,div.photo-item');
for (i=0;i<bldiv.length;i++){
	blimg=bldiv[i].querySelector('img[src*="/thumb/"]');
	if (blimg){
		blsrc=blimg.getAttribute("src");
		blimg.setAttribute("src",blsrc.replace("/thumb/","/photo/"));
		bljg=bljg+'<p>'+bldiv[i].innerHTML;
	}
}

blparent=document.querySelector('div[class="photolst clearfix"],div.event-photo-list');
if (blparent && !bljg==""){
	blparent.innerHTML=bljg;
	bljg="";
}

var blimg=document.querySelectorAll('img[src*="/view/photo/icon/"]');
for (i=0;i<blimg.length;i++){
	blsrc=blimg[i].getAttribute("src");
	blimg[i].setAttribute("src",blsrc.replace("/icon/","/photo/"));
}

bljg="";
bldiv=document.querySelectorAll('ul[class*="clearfix"] > li');
for (i=0;i<bldiv.length;i++){
	blimg=bldiv[i].querySelector('img[src*="/thumb/"]');
	if (blimg){
		blsrc=blimg.getAttribute("src");
		blimg.setAttribute("src",blsrc.replace("/thumb/","/photo/"));
		bljg=bljg+bldiv[i].innerHTML;
	}
}

if (bljg!==""){
	bldiv=document.querySelector('ul[class*="clearfix"]');
	var blobject=document.createElement("div");
	blobject.innerHTML=bljg;
	blparent=bldiv.parentNode;
	blparent.insertBefore(blobject,bldiv);
	blparent.removeChild(bldiv);
}