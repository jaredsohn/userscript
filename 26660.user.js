// ==UserScript==
// @author        ACMB
// @name          Google Images Direct Link II
// @description   Adds a direct link to image file in google images
// @include  http://images.google.*/*
// ==/UserScript==
//  - Add http://images.google.*/* to your Noscript exceptions for this
//  - to work with that add-on enabled

var a = document.getElementById('ImgContent');
if (a){
var b=a.getElementsByTagName("a");
var i=0;
var tmpurl="";
for (i=0;i<b.length;i++){
tmpurl=b[i].href;
if (tmpurl){ tmpurl=tmpurl.split("imgurl=")[1];};
if (tmpurl){ tmpurl=tmpurl.split("&imgrefurl")[0];};
if (tmpurl){
	c="tDataText"+b[i].offsetParent.id.substr(10,3);
	d=document.getElementById(c);
	var e;
	for (e in d.childNodes[0].childNodes)
	  {
	  if(d.childNodes[0].childNodes[e].className=="f") {d.childNodes[0].childNodes[e].innerHTML = '<a href="'+unescape(tmpurl)+'">'+d.childNodes[0].childNodes[e].innerHTML+'</a>';};
	  }
	};}};