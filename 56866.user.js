// ==UserScript==
// @name          Hide YouTube on Facebook
// @description   Hides all posts with youtube videos on you profile
// @require       http://sizzlemctwizzle.com/updater.php?id=55410
// @version       1.0.7
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*

// ==/UserScript==

function doit(e) {
var node=(e?e.parentNode:null)||document.body||document,
	array=document.evaluate(".//li[starts-with(@id,'stream_story') and contains(.,'www.youtube.com')]",node,null,6,null);
for(var i=0,item; (item=array.snapshotItem(i)); i++) item.parentNode.removeChild(item);
}

doit();
window.addEventListener("load", function(){
doit();
window.addEventListener("DOMNodeInserted", function(e){doit(e.currentTarget);}, false);
}, false);