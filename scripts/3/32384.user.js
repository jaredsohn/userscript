// ==UserScript==
// @name           Remove Images From Any Site
// @namespace      ~dkhal~
// @copyright dkhal
// ==/UserScript==

// Thanks to JoeSimmons
var di=document.images;
for(var i=0;i<di.length;i++){
di[i].parentNode.removeChild(di[i]);
}