// ==UserScript==
// @name       DreamScene.org AdBlock Block Blocker
// @namespace  https://userscripts.org/scripts/show/157117
// @version    1.0.0
// @description  Removes the popup from DreamScene.org that warns about AdBlocking.
// @match      http*://*dreamscene.org/*
// @copyright  2012 Alex Ross. All rights reserved.
// ==/UserScript==
var it=setInterval(ra,500);
function ra() {
	var lo=document.getElementsByTagName("*"), ci;
	for(ci=0;ci<lo.length;ci++) {
	    if(lo[ci].id.length==4) {
	        lo[ci].innerHTML='';
	        lo[ci].parentNode.removeChild(lo[ci]);
	        clearInterval(it);
	    }
	}
}