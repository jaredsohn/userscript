// ==UserScript==
// @name           At Ease Fixer
// @namespace      #aVg
// @include        http://*ateaseweb.com/*
// @version        0.1
// ==/UserScript==
if(document.title=="Radiohead At Ease » Page not found") {
	var a=document.evaluate("./h1",document.getElementById("content"),null,9,null).singleNodeValue;
	if (a) {
		document.title="At Ease - "+a.textContent;
	}
}