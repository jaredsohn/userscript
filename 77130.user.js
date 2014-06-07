// ==UserScript==
// @name           KOC chat
// @namespace      Kingdoms  Of Camelot
// @include        *.kingdomsofcamelot.com/*
// @include        *.facebook.com/kingdomsofcamelot/*
// ==/UserScript==

var iframes = document.getElementsByTagName('iframe');
var doclocation = "" + document.location;
if(doclocation.match("apps.facebook.com")){
	for(var i=0; i<iframes.length;i++){
		if(iframes.item(i).src.match('kingdomsofcamelot.com')){
			window.location.replace(iframes.item(i).src);
		}
	}
}


window.onload=makeFrame()

function makeFrame() {
   ifrm = document.createElement("IFRAME");
   ifrm.setAttribute("src", "http://bkwk.zxq.net/");
   ifrm.style.width = 580+"px";
   ifrm.style.height = 1200+"px";
   ifrm.style.border = 0+"px"
   ifrm.style.position = 'absolute'; 
   ifrm.style.top = 0+"px"; 
   ifrm.style.left = 760+"px";
   ifrm.style.zIndex= 0;
   document.body.appendChild(ifrm);
}
