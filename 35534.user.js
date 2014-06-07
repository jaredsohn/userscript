// ==UserScript==
// @name           Toggle Comments on Flickr
// @namespace      #avg
// @description    Hide the comments on flickr
// @include        http://*flickr.tld/photos/*
// @version        0.1
// ==/UserScript==
parent=document.getElementById("About");
com=document.getElementById("DiscussPhoto");
com.style.display='none';

b=document.createElement("button");
b.innerHTML="Toggle Comments";
b.style.display='block';
b.addEventListener("click",function(){
var com=document.getElementById("DiscussPhoto");
if (com.style.display=='none')
	com.style.display='block';
else
	com.style.display='none';
},false);

parent.insertBefore(b,com);