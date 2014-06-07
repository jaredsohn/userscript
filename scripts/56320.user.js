// ==UserScript==
// @name           BACKEND PHOTO FIX
// @namespace      https://www.audio-video-furniture.com/
// @include        http*://*.audio-video-furniture.com/*
// ==/UserScript==

var array=document.evaluate("//img[starts-with(@src,'/common/product/images')]",document,null,6,null);
for(var i=0,item; (item=array.snapshotItem(i)); i++) item.src="http://media.cymaxstores.com/images"+item.src.substring(59);