// ==UserScript==
// @name           UR
// @include        http://*.urban-rivals.com/*
// ==/UserScript==

var array=document.evaluate("//img[contains(@src,'_GRAY.')]", document, null, 6, null);
for(let i=0,item; (item=array.snapshotItem(i)); i++) item.src=item.src.replace("_GRAY.", ".");