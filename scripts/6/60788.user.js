// ==UserScript==
// @name          Hide YouTube on Facebook
// @description   Hides all posts with youtube videos on you profile
// @require       http://gmconfig.googlecode.com/svn/trunk/fb_gm_frame.js
// @include       http://*.facebook.com/*
// ==/UserScript==

function doit(e) {
var node=(e?e.parentNode:null)||document.body||document,
	array=document.evaluate(".//div[starts-with(@class,'UIImageBlock clearfix') and contains(.,'www.soundcloud.com')]",node,null,6,null);
for(var i=0,item; (item=array.snapshotItem(i)); i++) item.parentNode.removeChild(item);
}

doit();
window.addEventListener("load", function(){
doit();
window.addEventListener("DOMNodeInserted", function(e){doit(e.currentTarget);}, false);
}, false);