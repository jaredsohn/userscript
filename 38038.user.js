// ==UserScript==
// @name AddTo Google Reader
// @namespace http://pulq.ustc.googlepages.com/
// @include http://*
// ==/UserScript==

window.addEventListener("keyup", function(e) {
try {
// F4
if(e.keyCode != 115){
return;
}

var b = document.body;
if(b && !document.xmlVersion){
var z=document.createElement("script");
z.src="http://www.google.com/reader/ui/link-bookmarklet.js";
b.appendChild(z);
document.addEventListener("DOMNodeInserted", function(evt){
var targetNode = evt.target;
if(targetNode.nodeName == "form" || targetNode.nodeName == "FORM"){
targetNode.setAttributeNS(null, "action", "http://www.google.com/reader/link-frame");
}

}, false);
}
}catch(e){/*alert(e);*/}

}, false);