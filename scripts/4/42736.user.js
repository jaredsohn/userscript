// ==UserScript==
// @name           Lynda downloader
// @namespace      
// @include        http://www.lynda.com/home/*
// @description    Download the .mov files. Just need to in Firefox aplications choose Quicktime movie to keep the file.
// ==/UserScript==

var a=document.getElementsByTagName("param");

  for(var i=0;i<a.length;i++){
	  if(a[i].getAttribute("autoplay")=="True"){
		  a[i].setAttribute("autoplay","False")
		  }
	  }
	  
	  
var a=document.getElementsByTagName("embed");

  for(var i=0;i<a.length;i++){
	  if(a[i].getAttribute("autoplay")=="True"){
		  a[i].setAttribute("autoplay","False")
		  var location=a[i].getAttribute("src");
		  window.location=location
		  }
		  
	  }