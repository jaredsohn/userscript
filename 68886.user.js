// ==UserScript==
// @name           Facebook Gadget Ad-Remover
// @namespace      fijimunkii.facebook.gmail.whatup
// @description    Removes the embedded ad side-bar from the gmail facebook gadget
// ==/UserScript==

// Version 1.0

var classToRemove="adsSide";

var xp=document.evaluate("//*[@class='"+classToRemove+"']",document,null,6,null);
for(var i=xp.snapshotLength-1;i>=0;--i) {
 var cur=xp.snapshotItem(i);
 cur.parentNode.removeChild(cur);
}