// ==UserScript==
// @name            Nagarjuns Rediffmail v0.1 
// @namespace      http://nagrjunv.blogspot.com
// @description    new ad free rediffmail with google talk
// @include        http://*/rediffmail.com/* 
// @include        http://*/rediff.com/*
// ==/UserScript==

var adSidebar = document.getElementById('banner'); 
if (adSidebar) { 
    adSidebar.parentNode.removeChild(adSidebar); 
}
var mad= document.getElementById('shopdiv1'); 
if (mad) { 
    mad.parentNode.removeChild(mad); 
}
var mid= document.getElementById('ind_middle'); 
if (mid) { 
    mid.parentNode.removeChild(mid); 
}


var x = document.getElementsByTagName("img");
for (var i=0;i<x.length;i++)
  { 
	imlogo=x[0]}

if(imlogo.title='Rediffmail'){
imlogo.parentNode.removeChild(imlogo); 
  }
var main, inmain,newElement; 

main = document.getElementById('MiddleAd'); 
inmain= document.getElementById('folderlistparent'); 

if (main) {     
newElement = document.createElement('div');
newElement.innerHTML='<div id="gtalk" style="width:180;height:150;overflow:none;"><iframe src="http://talkgadget.google.com/talkgadget/client?fid=gtalk29&relay=http%3A%2F%2Fwww.google.com" width=180;height=150;scrolling=yes></iframe></div>'; 

     main.parentNode.insertBefore(newElement, main); 
}
else if(inmain){     
newElement = document.createElement('div');
newElement.innerHTML='<div id="gtalk" style="width:170;height:150;overflow:none;"><iframe src="http://talkgadget.google.com/talkgadget/client?fid=gtalk29&relay=http%3A%2F%2Fwww.google.com" width=170;height=150;scrolling=yes></iframe></div>'; 

     inmain.parentNode.insertBefore(newElement, inmain); 
}