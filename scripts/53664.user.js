// ==UserScript==
// @name           Remove Crunchyroll comments
// @namespace      http://userscripts.org/users/86200
// @include        http://*.crunchyroll.com/*
// @grant          none
// @description    Removes the user comments sidebar on video pages. No more annoying commentary!
// ==/UserScript==

(function() {

var classToRemove="guestbook comments box";

var xp=document.evaluate("//*[@class='"+classToRemove+"']",document,null,6,null);
for(var i=xp.snapshotLength-1;i>=0;--i) {
 var cur=xp.snapshotItem(i);
 cur.parentNode.removeChild(cur);
}

})();
