// ==UserScript==
// @name           NeoGAF pic hider
// @namespace      http://www.neogaf.com/*
// @description    Hides pics
// @include        http://www.neogaf.com/*
// ==/UserScript==
n = document.evaluate("//img", document, null, 6, null);
for(i=0; i<n.snapshotLength; i++){
n.snapshotItem(i).src="";
}