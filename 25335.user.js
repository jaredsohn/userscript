// ==UserScript==
// @name          Google Images Direct Link
// @description   Replaces links in google images with direct link to image file
// @include  http://images.google.com/*
// ==/UserScript==

var a = document.getElementById('ImgContent');
if (a){
var b=a.getElementsByTagName("a");
var i=0;
var tmpurl="";
for (i=0;i<b.length;i++){
tmpurl=b[i].href;
if (tmpurl){ tmpurl=tmpurl.split("imgurl=")[1];};
if (tmpurl){ tmpurl=tmpurl.split("&imgrefurl")[0];};
if (tmpurl){b[i].href=tmpurl};}};