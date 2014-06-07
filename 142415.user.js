// ==UserScript==
// @name          BB VITTUUN
// @description   Piilottaa Big Brother-aiheiset FB-statukset
// @version       1.0
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @grant         none

// ==/UserScript==

function doit(e) {
var node=(e?e.parentNode:null)||document.body||document,
	array=document.evaluate(".//li[starts-with(@id,'stream_story') and contains(.,'Big Brother')]",node,null,6,null);
for(var i=0,item; (item=array.snapshotItem(i)); i++) item.parentNode.removeChild(item);
}

doit();
window.addEventListener("load", function(){
doit();
window.addEventListener("DOMNodeInserted", function(e){doit(e.currentTarget);}, false);
}, false);