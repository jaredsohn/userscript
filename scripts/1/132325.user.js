// ==UserScript==
// @name          Block Tumblr on Facebook
// @description   Blocks posts linking to tumblr on Facebook.
// @version       0.0.1
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*

// ==/UserScript==

function doit(e) {
var node=(e?e.parentNode:null)||document.body||document,
	array=document.evaluate(".//li[starts-with(@id,'stream_story') and contains(.,'tumblr.com')]",node,null,6,null);
for(var i=0,item; (item=array.snapshotItem(i)); i++) item.parentNode.removeChild(item);
}

doit();
window.addEventListener("load", function(){
doit();
window.addEventListener("DOMNodeInserted", function(e){doit(e.currentTarget);}, false);
}, false);