// ==UserScript==
// @name        Direktlink's
// @namespace   PaveLow45
// @include     http://www.pic-upload.de/view*
// @include     http://www.myimg.de/*
// @include     http://www.imagebanana.com/view/*
// @include     http://www.fotos-hochladen.net/view/*
// @include	*directupload.net/file*
// @include 	*abload.de/image.php?img*
// @include	*tinypic.com/view.php?pic=*
// @include	*bubblepic.de/view.php?filename=*
// @version     1
// ==/UserScript==

if(document.URL.search(/pic-upload/) != -1){
	location.href = document.getElementsByTagName("img")[2].src;
}
else if(document.URL.search(/myimg/) != -1){
	location.href = document.getElementsByTagName("img")[1].src;
}
else if(document.URL.search(/imagebanana/) != -1){
	location.href = document.getElementsByTagName("img")[1].src;
}
else if(document.URL.search(/fotos-hochladen/) != -1){
	location.href = document.getElementsByTagName("img")[1].src;
}
else if(document.URL.search(/directupload/) != -1){	
	location.href = document.getElementsByTagName("img")[1].src;
}
else if(document.URL.search(/abload/) != -1){
	location.href = document.getElementsByTagName("img")[1].src;
}
else if(document.URL.search(/tinypic/) != -1){
	location.href = document.getElementsByTagName("img")[1].src;
}
else if(document.URL.search(/bubblepic/) != -1){
	location.href = document.getElementsByTagName("img")[1].src;
}